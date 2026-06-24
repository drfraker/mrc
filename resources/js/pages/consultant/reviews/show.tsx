import { Head, Link, router } from '@inertiajs/react';
import {
    Bot,
    ChevronLeft,
    FileText,
    ShieldCheck,
    TriangleAlert,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Finding = {
    rule_id: string;
    title: string;
    result: 'pass' | 'fail' | 'risk' | 'unknown' | 'needs_review';
    rationale: string;
    citation: string;
    missing_evidence?: string[];
};

type CaseRecord = {
    uuid: string;
    facilityName: string;
    facilityState: string;
    reviewType: string;
    status: string;
    submitterName: string | null;
    submitterEmail: string | null;
    patientReferenceCode: string | null;
    submittedAt: string | null;
    payload: Record<string, unknown>;
    findings: Finding[];
    aiDraft: null | {
        executive_summary?: string;
        compliance_risks?: string[];
        evidence_gaps?: string[];
        next_questions?: string[];
        report_draft?: string;
    };
};

const statusOptions = [
    ['submitted', 'Submitted'],
    ['needs_information', 'Needs information'],
    ['reviewed', 'Reviewed'],
    ['finalized', 'Finalized'],
    ['archived', 'Archived'],
] as const;

const resultTone: Record<Finding['result'], string> = {
    pass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    fail: 'border-red-200 bg-red-50 text-red-700',
    risk: 'border-red-200 bg-red-50 text-red-700',
    unknown: 'border-slate-200 bg-slate-50 text-slate-700',
    needs_review: 'border-amber-200 bg-amber-50 text-amber-700',
};

export default function ReviewShow({
    caseRecord,
    currentTeamSlug,
}: {
    caseRecord: CaseRecord;
    currentTeamSlug: string;
}) {
    function updateStatus(status: string) {
        router.patch(
            `/${currentTeamSlug}/reviews/${caseRecord.uuid}/status`,
            { status },
            { preserveScroll: true },
        );
    }

    function generateDraft() {
        router.post(
            `/${currentTeamSlug}/reviews/${caseRecord.uuid}/draft`,
            {},
            { preserveScroll: true },
        );
    }

    return (
        <>
            <Head title={`${caseRecord.facilityName} Review`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                        <Link
                            href={`/${currentTeamSlug}/reviews`}
                            className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ChevronLeft className="size-4" />
                            Back to reviews
                        </Link>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {caseRecord.facilityName}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {caseRecord.reviewType.replace('_', ' ')} ·{' '}
                            {caseRecord.facilityState} · Submitted{' '}
                            {caseRecord.submittedAt ?? 'unknown'}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <select
                            value={caseRecord.status}
                            onChange={(event) =>
                                updateStatus(event.target.value)
                            }
                            className="rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            {statusOptions.map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={generateDraft}
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            <Bot className="size-4" />
                            Draft with AI
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1fr_24rem]">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldCheck className="size-5" /> Rule
                                    findings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {caseRecord.findings.map((finding) => (
                                    <div
                                        key={finding.rule_id}
                                        className="rounded-lg border p-4"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <div className="text-xs font-semibold text-muted-foreground">
                                                    {finding.rule_id}
                                                </div>
                                                <h2 className="mt-1 font-medium">
                                                    {finding.title}
                                                </h2>
                                            </div>
                                            <span
                                                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${resultTone[finding.result]}`}
                                            >
                                                {finding.result.replace(
                                                    '_',
                                                    ' ',
                                                )}
                                            </span>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                            {finding.rationale}
                                        </p>
                                        {finding.missing_evidence &&
                                            finding.missing_evidence.length >
                                                0 && (
                                                <div className="mt-3 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
                                                    Missing evidence:{' '}
                                                    {finding.missing_evidence.join(
                                                        ', ',
                                                    )}
                                                </div>
                                            )}
                                        <p className="mt-3 text-xs font-medium text-foreground">
                                            Reference: {finding.citation}
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="size-5" />{' '}
                                    De-identified intake payload
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <pre className="max-h-[34rem] overflow-auto rounded-lg bg-muted p-4 text-xs leading-5">
                                    {JSON.stringify(
                                        caseRecord.payload,
                                        null,
                                        2,
                                    )}
                                </pre>
                            </CardContent>
                        </Card>
                    </div>

                    <aside className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Submission details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <Detail
                                    label="Anonymous reference"
                                    value={
                                        caseRecord.patientReferenceCode ??
                                        'None'
                                    }
                                />
                                <Detail
                                    label="Submitter"
                                    value={
                                        caseRecord.submitterName ??
                                        'Not provided'
                                    }
                                />
                                <Detail
                                    label="Submitter email"
                                    value={
                                        caseRecord.submitterEmail ??
                                        'Not provided'
                                    }
                                />
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-950">
                                    <TriangleAlert className="mb-2 size-4" />
                                    Treat this as de-identified decision-support
                                    data. Do not add PHI to status notes or AI
                                    prompts.
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="size-5" /> AI report draft
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {caseRecord.aiDraft ? (
                                    <div className="space-y-4 text-sm">
                                        <Section title="Executive summary">
                                            {
                                                caseRecord.aiDraft
                                                    .executive_summary
                                            }
                                        </Section>
                                        <List
                                            title="Compliance risks"
                                            values={
                                                caseRecord.aiDraft
                                                    .compliance_risks ?? []
                                            }
                                        />
                                        <List
                                            title="Evidence gaps"
                                            values={
                                                caseRecord.aiDraft
                                                    .evidence_gaps ?? []
                                            }
                                        />
                                        <List
                                            title="Next questions"
                                            values={
                                                caseRecord.aiDraft
                                                    .next_questions ?? []
                                            }
                                        />
                                        <Section title="Draft report">
                                            <span className="whitespace-pre-wrap">
                                                {
                                                    caseRecord.aiDraft
                                                        .report_draft
                                                }
                                            </span>
                                        </Section>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No AI draft yet. The draft action uses
                                        Laravel AI SDK only after deterministic
                                        findings are stored.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </>
    );
}

function Detail({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="text-xs font-medium text-muted-foreground">
                {label}
            </div>
            <div className="mt-0.5 font-medium">{value}</div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div>
            <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {title}
            </h3>
            <div className="mt-1 leading-6">{children}</div>
        </div>
    );
}

function List({ title, values }: { title: string; values: string[] }) {
    return (
        <Section title={title}>
            {values.length === 0 ? (
                <span className="text-muted-foreground">None listed.</span>
            ) : (
                <ul className="list-disc space-y-1 pl-5">
                    {values.map((value) => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            )}
        </Section>
    );
}

ReviewShow.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Compliance reviews',
            href: props.currentTeam
                ? `/${props.currentTeam.slug}/reviews`
                : '/',
        },
        {
            title: 'Review detail',
            href: '#',
        },
    ],
});
