import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    ClipboardCheck,
    GraduationCap,
    Scale,
    Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { CheckRow, CtaBand, PageHero } from '@/components/sections';
import Seo, { breadcrumbSchema, serviceListSchema } from '@/components/seo';

type Service = {
    id: string;
    index: string;
    icon: LucideIcon;
    title: string;
    lede: string;
    body: string;
    points: string[];
};

const SERVICES: Service[] = [
    {
        id: 'utilization-review',
        index: 'Service 01',
        icon: ClipboardCheck,
        title: 'Medicare Part A Utilization Review',
        lede: 'Protect reimbursement decisions before they turn into denials, missed notices, or hours of staff rework.',
        body: 'Each week, our consultants meet with your team to review every skilled Medicare patient. We help verify that Part A coverage remains defensible, flag when a Notice of Non-Coverage may be required, and answer the Medicare questions that would otherwise pull your nurses and leaders away from care operations.',
        points: [
            'Weekly reviews that catch coverage changes early',
            'Notice of Non-Coverage guidance to reduce compliance exposure',
            'Discharge abstracts that create cleaner records when questions arise',
            'MDS and payment guidance that saves internal research time',
        ],
    },
    {
        id: 'peer-review',
        index: 'Service 02',
        icon: Users,
        title: 'Physician Peer Review',
        lede: 'Get credible outside opinions without asking your team to chase scarce, unbiased reviewers.',
        body: 'MRC partners with two experienced physicians — one in General Practice, one in Internal Medicine — each with more than 25 years of active patient care. They review Inpatient, Emergency Department, and Office Visit charts and deliver clear professional opinions on care decisions, giving your facility independent support when a record needs to stand on its own.',
        points: [
            'Reviewers with 25+ years of active practice each',
            'Inpatient, Emergency Department, and Office Visit charts',
            'Reviews typically completed within two weeks',
            'Independent support for Critical Access and rural hospitals',
        ],
    },
    {
        id: 'rac-appeals',
        index: 'Service 03',
        icon: Scale,
        title: 'RAC Appeals Assistance',
        lede: 'Spend appeal dollars only where the claim is worth defending, then build the strongest case you can.',
        body: 'A Recovery Audit Contractor appeal can consume leadership time fast. Our consultants start with an honest viability analysis: is the underlying claim meritorious, and what legal and clinical defenses apply? From there, we guide your facility through each stage with a clear strategy, so you do not waste effort on weak arguments or miss the ones that matter.',
        points: [
            'Up-front viability analysis before you invest more time',
            'Clear identification of why the claim is worth defending',
            'Focused strategy through each level of appeal',
            'Hourly billing so appeal costs stay tied to actual need',
        ],
    },
    {
        id: 'education',
        index: 'Service 04',
        icon: GraduationCap,
        title: 'Staff Education & Ongoing Support',
        lede: 'Turn Medicare questions into quick answers, not another staff research project.',
        body: 'Your team has direct access to our consultants for Medicare questions — MDS scheduling, Consolidated Billing, payment classification, coverage criteria, and more. Instead of carrying the full burden of training and retraining internal staff as standards change, your facility gets practical education in the flow of daily work.',
        points: [
            'Unlimited consultant calls under your monthly retainer',
            'MDS scheduling and Consolidated Billing guidance',
            'Medicare payment system and classification education',
            'Practical answers that reduce uncertainty the same day',
        ],
    },
];

const ANCHORS = [
    { href: '#utilization-review', label: '01 · Utilization Review' },
    { href: '#peer-review', label: '02 · Peer Review' },
    { href: '#rac-appeals', label: '03 · RAC Appeals' },
    { href: '#education', label: '04 · Education' },
];

const cardClass =
    'rounded-[20px] bg-white p-[22px] shadow-[0_20px_60px_rgba(25,28,29,0.08)]';
const cardLabel =
    'text-[0.75rem] font-bold tracking-[0.12em] text-brand uppercase';

function Pill({
    tone,
    children,
}: {
    tone: 'green' | 'amber' | 'blue';
    children: ReactNode;
}) {
    const tones = {
        green: 'bg-[#10b981]/14 text-[#0a7a4a]',
        amber: 'bg-[#f59e0b]/16 text-[#9a6a00]',
        blue: 'bg-azure/18 text-[#1d6f9c]',
    };

    return (
        <span
            className={`rounded-full px-[9px] py-1 text-[0.6875rem] font-bold ${tones[tone]}`}
        >
            {children}
        </span>
    );
}

function ReviewRosterCard() {
    const rows = [
        {
            code: 'A1',
            title: 'Skilled · Part A day 12',
            sub: 'Coverage criteria met',
            tag: 'Continue',
            tone: 'green' as const,
        },
        {
            code: 'B4',
            title: 'Skilled · Part A day 20',
            sub: 'Plateau in progress notes',
            tag: 'NOMNC?',
            tone: 'amber' as const,
        },
        {
            code: 'C2',
            title: 'Coverage concluded',
            sub: 'Abstract delivered to facility',
            tag: 'Abstract',
            tone: 'blue' as const,
        },
    ];

    return (
        <div className={cardClass}>
            <div className="mb-[14px] flex items-center justify-between">
                <span className={cardLabel}>Weekly skilled review</span>
                <span className="text-[0.75rem] font-semibold text-pewter-soft">
                    Mon · 9:00 AM
                </span>
            </div>
            <div className="flex flex-col gap-2">
                {rows.map((r) => (
                    <div
                        key={r.code}
                        className="flex items-center gap-3 rounded-[11px] bg-[#f3f4f5] p-[12px_14px]"
                    >
                        <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[9px] bg-brand text-[0.75rem] font-extrabold text-azure">
                            {r.code}
                        </span>
                        <div className="flex-1">
                            <div className="text-[0.8125rem] font-bold text-graphite">
                                {r.title}
                            </div>
                            <div className="text-[0.72rem] text-pewter-soft">
                                {r.sub}
                            </div>
                        </div>
                        <Pill tone={r.tone}>{r.tag}</Pill>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ReviewersCard() {
    const reviewers = [
        { code: 'GP', title: 'General Practice' },
        { code: 'IM', title: 'Internal Medicine' },
    ];

    return (
        <div className={cardClass}>
            <span className={cardLabel}>Independent reviewers</span>
            <div className="mt-[14px] flex flex-col gap-[10px]">
                {reviewers.map((r) => (
                    <div
                        key={r.code}
                        className="flex items-center gap-[13px] rounded-[13px] bg-[#f3f4f5] p-[14px_16px]"
                    >
                        <span className="flex size-[44px] shrink-0 items-center justify-center rounded-full bg-brand text-[0.875rem] font-extrabold text-azure">
                            {r.code}
                        </span>
                        <div className="flex-1">
                            <div className="text-[0.875rem] font-bold text-graphite">
                                {r.title}
                            </div>
                            <div className="text-[0.75rem] text-pewter-soft">
                                25+ years active patient care
                            </div>
                        </div>
                        <Pill tone="green">Available</Pill>
                    </div>
                ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-[11px] bg-brand/6 p-[13px_16px]">
                <span className="text-[0.8125rem] font-semibold text-brand">
                    Inpatient · ED · Office Visit charts
                </span>
                <span className="text-[0.75rem] font-bold text-[#1d6f9c]">
                    ~2 wk turnaround
                </span>
            </div>
        </div>
    );
}

function ViabilityCard() {
    const rows = [
        {
            label: 'Clinical merit',
            value: 'Documented',
            tone: 'text-[#0a7a4a]',
        },
        { label: 'Legal defense', value: 'Applicable', tone: 'text-[#0a7a4a]' },
        {
            label: 'Estimated effort',
            value: 'Proportionate',
            tone: 'text-[#1d6f9c]',
        },
    ];

    return (
        <div className={`${cardClass} p-[24px]`}>
            <span className={cardLabel}>Appeal viability</span>
            <div className="mt-[18px] flex items-end gap-[14px]">
                <span className="text-[50px] leading-none font-extrabold tracking-[-0.03em] text-[#0a7a4a]">
                    Strong
                </span>
                <span className="pb-2 text-[0.8125rem] text-pewter-soft">
                    recommend appeal
                </span>
            </div>
            <div className="mt-4 h-[10px] overflow-hidden rounded-full bg-[#f3f4f5]">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-azure to-[#0a7a4a]" />
            </div>
            <div className="mt-[18px] flex flex-col gap-[9px]">
                {rows.map((r) => (
                    <div
                        key={r.label}
                        className="flex items-center justify-between text-[0.8125rem]"
                    >
                        <span className="text-pewter">{r.label}</span>
                        <span className={`font-bold ${r.tone}`}>{r.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function QnaCard() {
    const tags = [
        'MDS scheduling',
        'Consolidated Billing',
        'Coverage criteria',
    ];

    return (
        <div className={cardClass}>
            <span className={cardLabel}>Same-day answers</span>
            <div className="mt-4 flex flex-col gap-3">
                <div className="max-w-[84%] self-start rounded-[14px] rounded-bl-[4px] bg-[#f3f4f5] p-[12px_15px]">
                    <div className="mb-1 text-[0.6875rem] font-bold tracking-[0.1em] text-pewter-soft uppercase">
                        Your DON
                    </div>
                    <div className="text-[0.8125rem] leading-[1.5] text-graphite">
                        Does this therapy stay under Consolidated Billing?
                    </div>
                </div>
                <div className="max-w-[84%] self-end rounded-[14px] rounded-br-[4px] bg-brand p-[12px_15px]">
                    <div className="mb-1 text-[0.6875rem] font-bold tracking-[0.1em] text-azure-soft uppercase">
                        MRC consultant
                    </div>
                    <div className="text-[0.8125rem] leading-[1.5] text-[#eaf2f8]">
                        {
                            'Yes — it’s bundled. Here’s the exclusion list and the MDS timing that applies.'
                        }
                    </div>
                </div>
            </div>
            <div className="mt-[14px] flex flex-wrap gap-2">
                {tags.map((t) => (
                    <span
                        key={t}
                        className="rounded-full bg-azure/16 px-[11px] py-[5px] text-[0.72rem] font-semibold text-[#1d6f9c]"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
}

const ABSTRACTS = [ReviewRosterCard, ReviewersCard, ViabilityCard, QnaCard];

function ServiceCopy({ service }: { service: Service }) {
    const { icon: Icon } = service;

    return (
        <div>
            <div className="mb-4 flex items-center gap-3">
                <span className="flex size-[46px] items-center justify-center rounded-[12px] bg-brand/8 text-brand">
                    <Icon className="size-[22px]" strokeWidth={1.6} />
                </span>
                <span className="text-[0.75rem] font-bold tracking-[0.2em] text-pewter-soft uppercase">
                    {service.index}
                </span>
            </div>
            <h2 className="mb-3 text-[clamp(1.6rem,3.2vw,1.875rem)] leading-[1.18] font-extrabold tracking-[-0.025em] text-graphite">
                {service.title}
            </h2>
            <p className="mb-[14px] text-[1.0625rem] leading-[1.6] font-semibold text-brand">
                {service.lede}
            </p>
            <p className="mb-[22px] text-[0.97rem] leading-[1.72] text-pewter">
                {service.body}
            </p>
            <div className="flex flex-col gap-[11px]">
                {service.points.map((p) => (
                    <CheckRow key={p}>{p}</CheckRow>
                ))}
            </div>
        </div>
    );
}

export default function Services() {
    return (
        <div className="surface-light bg-[radial-gradient(120%_70%_at_88%_-6%,rgba(98,181,229,0.16),transparent_46%),linear-gradient(180deg,#f8f9fa_0%,#ffffff_40%,#f8f9fa_100%)] text-graphite">
            <Seo
                title="Medicare Utilization Review, Peer Review & RAC Appeals"
                description="Medicare Part A utilization review, physician peer review, RAC appeal assistance, and staff education for SNFs, Critical Access Hospitals, and rural providers."
                path="/services"
                image="/images/svc-utilization.jpg"
                jsonLd={[
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                    ]),
                    serviceListSchema(),
                ]}
            />

            <PageHero
                eyebrow="Services"
                title={
                    <>
                        Medicare support built around saved time, lower risk,
                        and{' '}
                        <span className="text-brand">
                            stronger reimbursement decisions
                        </span>
                    </>
                }
                lede="Four focused services, one business case: avoid the cost of building this expertise alone while giving your staff current, practical guidance when Medicare decisions matter."
            >
                <div className="mt-[26px] flex flex-wrap gap-[10px]">
                    {ANCHORS.map((a) => (
                        <a
                            key={a.href}
                            href={a.href}
                            className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-4 py-[9px] text-[0.84rem] font-semibold text-brand no-underline shadow-[0_1px_3px_rgba(25,28,29,0.05)] transition-colors hover:border-brand/30"
                        >
                            {a.label}
                        </a>
                    ))}
                </div>
            </PageHero>

            <div className="container-page flex flex-col gap-[clamp(2.25rem,5vw,3rem)] py-[clamp(1.5rem,3vw,2.25rem)]">
                {SERVICES.map((service, idx) => {
                    const Abstract = ABSTRACTS[idx];
                    const reverse = idx % 2 === 1;

                    return (
                        <section
                            key={service.id}
                            id={service.id}
                            className="grid scroll-mt-[90px] items-center gap-[clamp(2rem,4vw,3rem)] lg:grid-cols-2"
                        >
                            <div className={reverse ? 'lg:order-2' : undefined}>
                                <ServiceCopy service={service} />
                            </div>
                            <div className={reverse ? 'lg:order-1' : undefined}>
                                <Abstract />
                            </div>
                        </section>
                    );
                })}
            </div>

            <section className="container-page pt-6 pb-[clamp(4rem,8vw,5.5rem)]">
                <CtaBand
                    title="Not sure where the savings are?"
                    text="Tell us what your facility is carrying now. We'll help identify whether staff time, compliance exposure, appeals, or review volume is the best place to start."
                >
                    <Link href="/contact" className="cta cta-azure">
                        Contact us
                        <ArrowRight className="size-4" strokeWidth={2.4} />
                    </Link>
                    <Link
                        href="/working-with-mrc"
                        className="cta cta-dark-ghost"
                    >
                        How we work
                    </Link>
                </CtaBand>
            </section>
        </div>
    );
}
