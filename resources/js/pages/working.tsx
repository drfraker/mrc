import { Link } from '@inertiajs/react';
import { ArrowRight, Clock, CreditCard, FileCheck, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CtaBand, Kicker, PageHero } from '@/components/sections';
import Seo, { breadcrumbSchema } from '@/components/seo';
import { CONTACT } from '@/lib/site';

const CADENCE = [
    {
        when: 'Mon',
        title: 'Weekly skilled review',
        sub: 'Every Part A patient, with your team',
        dot: 'bg-brand',
        accent: true,
    },
    {
        when: 'Tue–Fri',
        title: 'Consultants on call',
        sub: 'Questions answered in the flow of work',
        dot: 'bg-azure',
        accent: false,
    },
    {
        when: 'EOM',
        title: 'Reports & abstracts',
        sub: 'Per-patient itemization delivered',
        dot: 'bg-[#0a7a4a]',
        accent: false,
    },
];

const STEPS = [
    {
        title: 'Review before risk compounds',
        body: 'We meet with your team about every skilled Medicare patient, verifying Part A coverage criteria before small uncertainties become denials, missed notices, or late rework.',
    },
    {
        title: 'Documentation without the scramble',
        body: 'Patient abstracts are completed and delivered when Medicare coverage concludes, giving your facility cleaner records without assigning more documentation cleanup to internal staff.',
    },
    {
        title: 'Answers at the point of need',
        body: 'Your staff can call our consultants with Medicare questions — MDS scheduling, Consolidated Billing, payment classification, and more — instead of losing hours to research.',
    },
    {
        title: 'Outside review without the search',
        body: 'Our physicians review Inpatient, Emergency Department, and Office Visit charts, helping you avoid the time and uncertainty of finding independent reviewers case by case.',
    },
];

type Billing = { icon: LucideIcon; kind: string; title: string; body: string };

const BILLING: Billing[] = [
    {
        icon: CreditCard,
        kind: 'Monthly Retainer',
        title: 'Predictable access to Medicare expertise',
        body: 'A monthly retainer covers weekly reviews and unlimited facility calls, giving you specialist support without adding a full internal compliance role.',
    },
    {
        icon: FileCheck,
        kind: 'Per Patient',
        title: 'Fees tied to completed records',
        body: 'End-of-month reports itemize a per-patient fee for each patient removed from Medicare coverage, so documentation cost stays tied to completed work.',
    },
    {
        icon: Clock,
        kind: 'Hourly',
        title: 'Appeal spend matched to case value',
        body: 'RAC consulting is billed hourly, so you can test appeal viability first and pay only for the support the claim actually warrants.',
    },
];

export default function Working() {
    return (
        <div className="surface-light bg-[radial-gradient(120%_70%_at_88%_-6%,rgba(98,181,229,0.16),transparent_46%),linear-gradient(180deg,#f8f9fa_0%,#ffffff_42%,#f8f9fa_100%)] text-graphite">
            <Seo
                title="Medicare Review Support That Reduces Staff Burden"
                description="How MRC helps facilities save internal time, reduce Medicare compliance burden, and use predictable support for utilization review, education, and appeals."
                path="/working-with-mrc"
                image="/images/working.jpg"
                jsonLd={breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Working with MRC', path: '/working-with-mrc' },
                ])}
            />

            <PageHero
                eyebrow="Working with MRC"
                title={
                    <>
                        A lower-burden way to keep Medicare work{' '}
                        <span className="text-brand">current</span>
                    </>
                }
                lede="Instead of asking an employee to master, monitor, and teach changing Medicare standards alone, MRC gives your facility a steady review rhythm and direct access to experienced consultants."
            />

            {/* Our approach */}
            <section className="container-page py-[clamp(2rem,4vw,3rem)]">
                <div className="grid items-center gap-[clamp(2rem,4vw,3rem)] lg:grid-cols-2">
                    <div>
                        <Kicker>Our approach</Kicker>
                        <h2 className="mt-[14px] mb-4 text-[clamp(1.6rem,3.2vw,1.9375rem)] leading-[1.18] font-extrabold tracking-[-0.025em] text-graphite">
                            A steady weekly rhythm that protects staff time and
                            reimbursement decisions
                        </h2>
                        <p className="mb-4 text-[1rem] leading-[1.72] text-pewter">
                            Every engagement is built around a consistent weekly
                            review of your skilled Medicare patients, backed by
                            consultants who are a phone call away the rest of
                            the week. That structure helps your team make timely
                            decisions without turning every Medicare question
                            into an internal research project.
                        </p>
                        <p className="text-[1rem] leading-[1.72] text-pewter">
                            During each review we work through every skilled
                            patient with your team, assessing whether each one
                            continues to meet Medicare Part A coverage
                            guidelines — or whether a Notice of Non-Coverage is
                            required. When a patient&rsquo;s coverage concludes,
                            we complete a patient abstract and deliver it to
                            your facility, creating a stronger record with less
                            burden on your staff.
                        </p>
                    </div>
                    <div className="rounded-[20px] bg-white p-[24px] shadow-[0_20px_60px_rgba(25,28,29,0.08)]">
                        <div className="mb-4">
                            <span className="text-[0.75rem] font-bold tracking-[0.12em] text-brand uppercase">
                                Engagement cadence
                            </span>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            {CADENCE.map((c) => (
                                <div
                                    key={c.when}
                                    className="flex items-center gap-[13px] rounded-[12px] bg-[#f3f4f5] p-[14px_16px]"
                                >
                                    <span
                                        className={`w-[58px] shrink-0 text-[0.6875rem] font-extrabold tracking-[0.08em] uppercase ${
                                            c.accent
                                                ? 'text-brand'
                                                : 'text-pewter-soft'
                                        }`}
                                    >
                                        {c.when}
                                    </span>
                                    <div className="flex-1">
                                        <div className="text-[0.84rem] font-bold text-graphite">
                                            {c.title}
                                        </div>
                                        <div className="text-[0.75rem] text-pewter-soft">
                                            {c.sub}
                                        </div>
                                    </div>
                                    <span
                                        className={`size-2 shrink-0 rounded-full ${c.dot}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* The process */}
            <section className="container-page py-[clamp(2rem,4vw,3rem)]">
                <div className="mb-9 max-w-[720px]">
                    <Kicker>The process</Kicker>
                    <h2 className="mt-[14px] text-[clamp(1.6rem,3.2vw,1.9375rem)] leading-[1.15] font-extrabold tracking-[-0.025em] text-graphite">
                        How an engagement creates value
                    </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                    {STEPS.map((step, idx) => (
                        <div
                            key={step.title}
                            className="rounded-[18px] bg-white p-7 shadow-[0_1px_3px_rgba(25,28,29,0.06)]"
                        >
                            <div className="mb-[14px] flex items-center gap-[14px]">
                                <span
                                    className={`flex size-[44px] items-center justify-center rounded-[12px] text-[1rem] font-extrabold ${
                                        idx === STEPS.length - 1
                                            ? 'bg-azure text-brand-ink'
                                            : 'bg-brand text-azure'
                                    }`}
                                >
                                    {`0${idx + 1}`}
                                </span>
                                <h3 className="text-[1.1875rem] font-bold tracking-[-0.01em] text-graphite">
                                    {step.title}
                                </h3>
                            </div>
                            <p className="text-[0.9rem] leading-[1.68] text-pewter">
                                {step.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Billing */}
            <section className="container-page py-[clamp(2rem,4vw,3rem)]">
                <div className="mb-9 max-w-[720px]">
                    <Kicker>Billing</Kicker>
                    <h2 className="mt-[14px] mb-3 text-[clamp(1.6rem,3.2vw,1.9375rem)] leading-[1.15] font-extrabold tracking-[-0.025em] text-graphite">
                        Predictable support beats unpredictable internal cost
                    </h2>
                    <p className="text-[1rem] leading-[1.7] text-pewter">
                        You know what the support costs and what it covers,
                        while avoiding the hidden expense of constant
                        retraining, staff research, and last-minute cleanup.
                    </p>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                    {BILLING.map(({ icon: Icon, kind, title, body }) => (
                        <div
                            key={kind}
                            className="rounded-[18px] bg-white p-[30px] shadow-[0_1px_3px_rgba(25,28,29,0.06)]"
                        >
                            <span className="mb-[18px] flex size-[48px] items-center justify-center rounded-[13px] bg-brand/8 text-brand">
                                <Icon
                                    className="size-[23px]"
                                    strokeWidth={1.6}
                                />
                            </span>
                            <div className="mb-2 text-[0.75rem] font-bold tracking-[0.16em] text-pewter-soft uppercase">
                                {kind}
                            </div>
                            <h3 className="mb-2 text-[1.125rem] font-bold tracking-[-0.01em] text-graphite">
                                {title}
                            </h3>
                            <p className="text-[0.875rem] leading-[1.65] text-pewter">
                                {body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container-page pt-6 pb-[clamp(4rem,8vw,5.5rem)]">
                <CtaBand
                    align="center"
                    title="Ready to reduce the Medicare burden on your team?"
                    text="We'll walk through where your facility is spending time now and what MRC support would replace."
                >
                    <Link href="/contact" className="cta cta-azure">
                        Contact us
                        <ArrowRight className="size-4" strokeWidth={2.4} />
                    </Link>
                    <a
                        href={CONTACT.phonePrimaryHref}
                        className="cta cta-dark-ghost"
                    >
                        <Phone className="size-4" strokeWidth={2} />
                        Call {CONTACT.phonePrimary}
                    </a>
                </CtaBand>
            </section>
        </div>
    );
}
