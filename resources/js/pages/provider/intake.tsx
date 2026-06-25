import { Head, router, usePage } from '@inertiajs/react';
import { AlertTriangle, Calculator, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { PageHero } from '@/components/sections';
import Seo from '@/components/seo';

type Boolish = 'unknown' | 'yes' | 'no';

type FormState = {
    submitterName: string;
    submitterEmail: string;
    patientReferenceCode: string;
    reviewType: string;
    medicalAppropriatenessException: boolean;
    conditionRelatedToHospitalStay: Boolish;
    skilledServiceBasis:
        | 'nursing_or_combined'
        | 'therapy_only'
        | 'restorative_nursing';
    skilledDaysPerWeek: number;
    therapyDaysPerWeek: number;
    restorativeDaysPerWeek: number;
    requiresInpatientSnfAsPracticalMatter: Boolish;
    initialCertificationPresent: Boolish;
    firstRecertificationDay: string;
    maxSubsequentRecertificationIntervalDays: string;
    narrative: string;
    documentationChecks: Record<string, boolean>;
    phiAcknowledgement: boolean;
};

type FacilityContext = {
    name: string;
    state: string;
};

type LocalDates = {
    hospitalAdmitDate: string;
    hospitalDischargeDate: string;
    snfAdmissionDate: string;
};

const documentationOptions = [
    ['physicianOrders', 'Physician orders are present'],
    ['skilledServicesProvided', 'Skilled services provided are documented'],
    ['patientResponse', 'Patient response is documented'],
    ['futureCarePlan', 'Future-care plan and rationale are documented'],
    [
        'skilledRationale',
        'Detailed rationale explains why skilled personnel are required',
    ],
    [
        'serviceComplexity',
        'Service complexity or patient complications are documented',
    ],
    [
        'objectiveMeasures',
        'Objective measures or clinical indicators are included',
    ],
] as const;

const initialForm: FormState = {
    submitterName: '',
    submitterEmail: '',
    patientReferenceCode: '',
    reviewType: 'continued_stay',
    medicalAppropriatenessException: false,
    conditionRelatedToHospitalStay: 'unknown',
    skilledServiceBasis: 'nursing_or_combined',
    skilledDaysPerWeek: 7,
    therapyDaysPerWeek: 5,
    restorativeDaysPerWeek: 0,
    requiresInpatientSnfAsPracticalMatter: 'unknown',
    initialCertificationPresent: 'unknown',
    firstRecertificationDay: '',
    maxSubsequentRecertificationIntervalDays: '',
    narrative: '',
    documentationChecks: Object.fromEntries(
        documentationOptions.map(([key]) => [key, false]),
    ),
    phiAcknowledgement: false,
};

const initialDates: LocalDates = {
    hospitalAdmitDate: '',
    hospitalDischargeDate: '',
    snfAdmissionDate: '',
};

export default function ProviderIntake({
    facility,
    submitUrl,
}: {
    facility: FacilityContext;
    submitUrl: string;
}) {
    const [form, setForm] = useState<FormState>(initialForm);
    const [dates, setDates] = useState<LocalDates>(initialDates);
    const [processing, setProcessing] = useState(false);
    const { errors = {} } = usePage().props as {
        errors?: Record<string, string>;
    };

    const derived = useMemo(() => {
        const hospitalStayDays = daysBetween(
            dates.hospitalAdmitDate,
            dates.hospitalDischargeDate,
        );
        const daysToSnfAdmission = daysBetween(
            dates.hospitalDischargeDate,
            dates.snfAdmissionDate,
        );

        return { hospitalStayDays, daysToSnfAdmission };
    }, [dates]);

    const redactedNarrative = useMemo(
        () => redactText(form.narrative),
        [form.narrative],
    );

    function update<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((current) => ({ ...current, [key]: value }));
    }

    function submit(event: FormEvent) {
        event.preventDefault();
        setProcessing(true);

        router.post(
            submitUrl,
            {
                submitterName: form.submitterName,
                submitterEmail: form.submitterEmail,
                patientReferenceCode: redactText(form.patientReferenceCode),
                reviewType: form.reviewType,
                phiAcknowledgement: form.phiAcknowledgement,
                caseData: {
                    reviewType: form.reviewType,
                    hospitalStayDays: derived.hospitalStayDays,
                    daysToSnfAdmission: derived.daysToSnfAdmission,
                    medicalAppropriatenessException:
                        form.medicalAppropriatenessException,
                    conditionRelatedToHospitalStay: boolishToValue(
                        form.conditionRelatedToHospitalStay,
                    ),
                    skilledServiceBasis: form.skilledServiceBasis,
                    skilledDaysPerWeek: form.skilledDaysPerWeek,
                    therapyDaysPerWeek: form.therapyDaysPerWeek,
                    restorativeDaysPerWeek: form.restorativeDaysPerWeek,
                    requiresInpatientSnfAsPracticalMatter: boolishToValue(
                        form.requiresInpatientSnfAsPracticalMatter,
                    ),
                    initialCertificationPresent: boolishToValue(
                        form.initialCertificationPresent,
                    ),
                    firstRecertificationDay: toIntOrNull(
                        form.firstRecertificationDay,
                    ),
                    maxSubsequentRecertificationIntervalDays: toIntOrNull(
                        form.maxSubsequentRecertificationIntervalDays,
                    ),
                    documentationChecks: form.documentationChecks,
                    narrative: redactedNarrative,
                },
            },
            {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            },
        );
    }

    return (
        <div className="surface-light bg-[radial-gradient(120%_70%_at_88%_-6%,rgba(98,181,229,0.16),transparent_46%),linear-gradient(180deg,#f8f9fa_0%,#ffffff_42%,#f8f9fa_100%)] text-graphite">
            <Head title="Provider Intake" />
            <Seo
                title="Provider SNF Medicare Review Intake"
                description="Submit de-identified SNF Medicare review facts to Medical Review Consultants."
            />

            <PageHero
                eyebrow="Provider intake"
                title="De-identified SNF Medicare review submission"
                lede="Use this form for Medicare Part A skilled nursing facility coverage review. Dates entered here are used only in your browser to calculate relative timing values before submit."
            />

            <section className="py-10">
                <div className="container-page">
                    <div className="mb-6 rounded-card border border-amber-300 bg-amber-50 p-5 text-amber-950">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
                            <div>
                                <h2 className="font-sans text-base font-semibold">
                                    Do not enter PHI
                                </h2>
                                <p className="mt-1 text-sm leading-6">
                                    Do not include names, MRNs, Medicare
                                    numbers, dates of birth, addresses, phone
                                    numbers, or exact service dates in free-text
                                    fields. This MVP stores only de-identified
                                    case data and relative timing values.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={submit}
                        className="grid gap-6 lg:grid-cols-[1fr_22rem]"
                    >
                        <div className="space-y-6">
                            <Panel title="Facility and review">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <ReadOnlyField
                                        label="Facility"
                                        value={facility.name}
                                    />
                                    <ReadOnlyField
                                        label="State"
                                        value={facility.state}
                                    />
                                    <TextField
                                        label="Your name"
                                        value={form.submitterName}
                                        error={errors.submitterName}
                                        onChange={(value) =>
                                            update('submitterName', value)
                                        }
                                    />
                                    <TextField
                                        label="Your email"
                                        type="email"
                                        value={form.submitterEmail}
                                        error={errors.submitterEmail}
                                        onChange={(value) =>
                                            update('submitterEmail', value)
                                        }
                                    />
                                    <TextField
                                        label="Anonymous case reference"
                                        help="Do not use MRN, Medicare number, DOB, room number, or initials."
                                        value={form.patientReferenceCode}
                                        error={errors.patientReferenceCode}
                                        onChange={(value) =>
                                            update(
                                                'patientReferenceCode',
                                                value,
                                            )
                                        }
                                    />
                                    <SelectField
                                        label="Review type"
                                        value={form.reviewType}
                                        onChange={(value) =>
                                            update('reviewType', value)
                                        }
                                        options={[
                                            ['admission', 'Admission review'],
                                            [
                                                'continued_stay',
                                                'Continued-stay review',
                                            ],
                                            ['discharge', 'Discharge review'],
                                            ['appeal', 'Appeal/RAC support'],
                                            [
                                                'retrospective',
                                                'Retrospective audit',
                                            ],
                                        ]}
                                    />
                                </div>
                            </Panel>

                            <Panel title="Hospital qualification timing">
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <DateField
                                        label="Hospital inpatient admit date"
                                        value={dates.hospitalAdmitDate}
                                        onChange={(value) =>
                                            setDates((d) => ({
                                                ...d,
                                                hospitalAdmitDate: value,
                                            }))
                                        }
                                    />
                                    <DateField
                                        label="Hospital discharge date"
                                        value={dates.hospitalDischargeDate}
                                        onChange={(value) =>
                                            setDates((d) => ({
                                                ...d,
                                                hospitalDischargeDate: value,
                                            }))
                                        }
                                    />
                                    <DateField
                                        label="SNF admission date"
                                        value={dates.snfAdmissionDate}
                                        onChange={(value) =>
                                            setDates((d) => ({
                                                ...d,
                                                snfAdmissionDate: value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    <DerivedValue
                                        icon={Calculator}
                                        label="Stored qualifying inpatient days"
                                        value={derived.hospitalStayDays}
                                    />
                                    <DerivedValue
                                        icon={Calculator}
                                        label="Stored days from discharge to SNF"
                                        value={derived.daysToSnfAdmission}
                                    />
                                </div>
                                <label className="mt-4 flex items-start gap-3 text-sm">
                                    <input
                                        type="checkbox"
                                        className="mt-1"
                                        checked={
                                            form.medicalAppropriatenessException
                                        }
                                        onChange={(e) =>
                                            update(
                                                'medicalAppropriatenessException',
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    <span>
                                        Admission was after 30 days, but the
                                        medical-appropriateness exception may
                                        apply.
                                    </span>
                                </label>
                            </Panel>

                            <Panel title="Skilled need">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <SelectField
                                        label="SNF skilled condition related to qualifying hospital stay?"
                                        value={
                                            form.conditionRelatedToHospitalStay
                                        }
                                        onChange={(value) =>
                                            update(
                                                'conditionRelatedToHospitalStay',
                                                value as Boolish,
                                            )
                                        }
                                        options={boolishOptions}
                                    />
                                    <SelectField
                                        label="Skilled-service basis"
                                        value={form.skilledServiceBasis}
                                        onChange={(value) =>
                                            update(
                                                'skilledServiceBasis',
                                                value as FormState['skilledServiceBasis'],
                                            )
                                        }
                                        options={[
                                            [
                                                'nursing_or_combined',
                                                'Skilled nursing or combined services',
                                            ],
                                            [
                                                'therapy_only',
                                                'Therapy-only skilled status',
                                            ],
                                            [
                                                'restorative_nursing',
                                                'Restorative nursing basis',
                                            ],
                                        ]}
                                    />
                                    <NumberField
                                        label="Skilled service days per week"
                                        value={form.skilledDaysPerWeek}
                                        min={0}
                                        max={7}
                                        onChange={(value) =>
                                            update('skilledDaysPerWeek', value)
                                        }
                                    />
                                    <NumberField
                                        label="Therapy days per week"
                                        value={form.therapyDaysPerWeek}
                                        min={0}
                                        max={7}
                                        onChange={(value) =>
                                            update('therapyDaysPerWeek', value)
                                        }
                                    />
                                    <NumberField
                                        label="Restorative nursing days per week"
                                        value={form.restorativeDaysPerWeek}
                                        min={0}
                                        max={7}
                                        onChange={(value) =>
                                            update(
                                                'restorativeDaysPerWeek',
                                                value,
                                            )
                                        }
                                    />
                                    <SelectField
                                        label="Requires inpatient SNF as a practical matter?"
                                        value={
                                            form.requiresInpatientSnfAsPracticalMatter
                                        }
                                        onChange={(value) =>
                                            update(
                                                'requiresInpatientSnfAsPracticalMatter',
                                                value as Boolish,
                                            )
                                        }
                                        options={boolishOptions}
                                    />
                                </div>
                            </Panel>

                            <Panel title="Certification and documentation">
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <SelectField
                                        label="Initial certification present and timely?"
                                        value={form.initialCertificationPresent}
                                        onChange={(value) =>
                                            update(
                                                'initialCertificationPresent',
                                                value as Boolish,
                                            )
                                        }
                                        options={boolishOptions}
                                    />
                                    <TextField
                                        label="First recertification day number"
                                        type="number"
                                        value={form.firstRecertificationDay}
                                        onChange={(value) =>
                                            update(
                                                'firstRecertificationDay',
                                                value,
                                            )
                                        }
                                    />
                                    <TextField
                                        label="Longest later recert interval in days"
                                        type="number"
                                        value={
                                            form.maxSubsequentRecertificationIntervalDays
                                        }
                                        onChange={(value) =>
                                            update(
                                                'maxSubsequentRecertificationIntervalDays',
                                                value,
                                            )
                                        }
                                    />
                                </div>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    {documentationOptions.map(
                                        ([key, label]) => (
                                            <label
                                                key={key}
                                                className="flex items-start gap-3 rounded-lg border bg-white p-3 text-sm"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="mt-1"
                                                    checked={
                                                        form
                                                            .documentationChecks[
                                                            key
                                                        ]
                                                    }
                                                    onChange={(event) =>
                                                        update(
                                                            'documentationChecks',
                                                            {
                                                                ...form.documentationChecks,
                                                                [key]: event
                                                                    .target
                                                                    .checked,
                                                            },
                                                        )
                                                    }
                                                />
                                                <span>{label}</span>
                                            </label>
                                        ),
                                    )}
                                </div>
                            </Panel>

                            <Panel title="De-identified clinical summary">
                                <textarea
                                    value={form.narrative}
                                    onChange={(event) =>
                                        update('narrative', event.target.value)
                                    }
                                    rows={7}
                                    className="w-full rounded-lg border border-line bg-white p-3 text-sm outline-none focus:border-brand"
                                    placeholder="Summarize skilled need, service complexity, and evidence gaps. Do not enter patient identifiers or exact dates."
                                />
                                <div className="mt-4 rounded-lg border border-line bg-white p-4">
                                    <p className="text-sm font-semibold text-ink">
                                        Redacted preview stored on submit
                                    </p>
                                    <p className="mt-2 text-sm whitespace-pre-wrap text-muted">
                                        {redactedNarrative ||
                                            'No narrative entered.'}
                                    </p>
                                </div>
                            </Panel>
                        </div>

                        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                            <div className="rounded-card border border-line bg-white p-5 shadow-soft">
                                <ShieldCheck className="size-7 text-brand" />
                                <h2 className="mt-3 font-sans text-lg font-semibold">
                                    Submission guardrails
                                </h2>
                                <ul className="mt-3 space-y-2 text-sm text-muted">
                                    <li>Actual dates are not submitted.</li>
                                    <li>
                                        Known identifiers are redacted before
                                        storage.
                                    </li>
                                    <li>
                                        Consultants see rule findings and
                                        evidence gaps.
                                    </li>
                                    <li>
                                        Final compliance opinions require
                                        consultant review.
                                    </li>
                                </ul>
                                <label className="mt-5 flex items-start gap-3 text-sm">
                                    <input
                                        type="checkbox"
                                        className="mt-1"
                                        checked={form.phiAcknowledgement}
                                        onChange={(e) =>
                                            update(
                                                'phiAcknowledgement',
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    <span>
                                        I confirm this submission does not
                                        include patient identifiers or PHI.
                                    </span>
                                </label>
                                {errors.phiAcknowledgement && (
                                    <p className="mt-2 text-sm text-red-700">
                                        {errors.phiAcknowledgement}
                                    </p>
                                )}
                                <button
                                    disabled={processing}
                                    className="cta cta-brand mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing
                                        ? 'Submitting...'
                                        : 'Submit de-identified case'}
                                </button>
                            </div>
                        </aside>
                    </form>
                </div>
            </section>
        </div>
    );
}

const boolishOptions = [
    ['unknown', 'Unknown / needs review'],
    ['yes', 'Yes'],
    ['no', 'No'],
] as const;

function Panel({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="rounded-card border border-line bg-white p-5 shadow-soft">
            <h2 className="mb-4 font-sans text-lg font-semibold text-ink">
                {title}
            </h2>
            {children}
        </section>
    );
}

function TextField({
    label,
    value,
    onChange,
    type = 'text',
    required = false,
    error,
    help,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    required?: boolean;
    error?: string;
    help?: string;
}) {
    return (
        <label className="block text-sm font-medium text-ink">
            {label}
            <input
                required={required}
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 outline-none focus:border-brand"
            />
            {help && (
                <span className="mt-1 block text-xs font-normal text-muted">
                    {help}
                </span>
            )}
            {error && (
                <span className="mt-1 block text-xs text-red-700">{error}</span>
            )}
        </label>
    );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
    return (
        <div className="block text-sm font-medium text-ink">
            {label}
            <div className="mt-1 min-h-10 rounded-lg border border-line bg-paper px-3 py-2 text-ink">
                {value}
            </div>
        </div>
    );
}

function DateField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <TextField
            label={label}
            type="date"
            value={value}
            onChange={onChange}
        />
    );
}

function NumberField({
    label,
    value,
    min,
    max,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}) {
    return (
        <label className="block text-sm font-medium text-ink">
            {label}
            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 outline-none focus:border-brand"
            />
        </label>
    );
}

function SelectField({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: readonly (readonly [string, string])[];
}) {
    return (
        <label className="block text-sm font-medium text-ink">
            {label}
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 outline-none focus:border-brand"
            >
                {options.map(([optionValue, label]) => (
                    <option key={optionValue} value={optionValue}>
                        {label}
                    </option>
                ))}
            </select>
        </label>
    );
}

function DerivedValue({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Calculator;
    label: string;
    value: number | null;
}) {
    return (
        <div className="flex items-center gap-3 rounded-lg border border-line bg-white p-3">
            <Icon className="size-5 text-brand" />
            <div>
                <p className="text-xs text-muted">{label}</p>
                <p className="font-semibold text-ink">
                    {value ?? 'Enter dates'}
                </p>
            </div>
        </div>
    );
}

function daysBetween(start: string, end: string): number | null {
    if (!start || !end) {
        return null;
    }

    const startDate = new Date(`${start}T00:00:00`);
    const endDate = new Date(`${end}T00:00:00`);
    const diff = Math.round(
        (endDate.getTime() - startDate.getTime()) / 86_400_000,
    );

    return Number.isFinite(diff) && diff >= 0 ? diff : null;
}

function boolishToValue(value: Boolish): boolean | null {
    if (value === 'yes') {
        return true;
    }

    if (value === 'no') {
        return false;
    }

    return null;
}

function toIntOrNull(value: string): number | null {
    if (!value) {
        return null;
    }

    const parsed = Number.parseInt(value, 10);

    return Number.isFinite(parsed) ? parsed : null;
}

function redactText(value: string): string {
    return value
        .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[redacted-ssn]')
        .replace(
            /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
            '[redacted-phone]',
        )
        .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
        .replace(
            /\b(?:MRN|HICN|MBI|SSN)[:#]?\s*[A-Z0-9-]{4,}\b/gi,
            '[redacted-identifier]',
        )
        .trim();
}
