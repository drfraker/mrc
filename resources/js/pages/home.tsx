import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    ClipboardCheck,
    Clock,
    GraduationCap,
    Phone,
    Scale,
    ShieldCheck,
    Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CtaBand, Kicker } from '@/components/sections';
import Seo from '@/components/seo';
import { CONTACT } from '@/lib/site';

type Service = { icon: LucideIcon; title: string; body: string; href: string };

const SERVICES: Service[] = [
    {
        icon: ClipboardCheck,
        title: 'Medicare Utilization Review',
        body: 'Catch coverage changes early, support defensible Part A decisions, and reduce the staff hours spent interpreting Medicare rules week after week.',
        href: '/services#utilization-review',
    },
    {
        icon: Users,
        title: 'Physician Peer Review',
        body: 'Get credible outside review without spending leadership time searching for qualified, independent physicians every time a case needs another set of eyes.',
        href: '/services#peer-review',
    },
    {
        icon: Scale,
        title: 'RAC Appeals Assistance',
        body: 'Decide quickly whether an appeal is worth pursuing, then focus effort on the clinical and legal arguments most likely to protect reimbursement.',
        href: '/services#rac-appeals',
    },
    {
        icon: GraduationCap,
        title: 'Medicare Staff Education & Support',
        body: 'Give your team practical answers from Medicare specialists instead of asking internal staff to train, retrain, and track every standards update alone.',
        href: '/services#education',
    },
];

const OUTCOMES = [
    {
        title: 'Lower overhead',
        body: 'Specialized Medicare help without adding a full internal role.',
    },
    {
        title: 'Less risk',
        body: 'Coverage & documentation issues addressed before they grow.',
    },
    {
        title: 'More time',
        body: 'Clinical leaders spend fewer hours chasing changing rules.',
    },
    {
        title: 'Current guidance',
        body: 'Consultant access keeps staff aligned with Medicare standards.',
    },
];

type ProofRow = {
    icon: LucideIcon;
    title: string;
    sub: string;
    status: string;
    tone: 'green' | 'blue';
};

const PROOF: ProofRow[] = [
    {
        icon: ClipboardCheck,
        title: 'Part A review',
        sub: 'Defensible coverage decisions',
        status: 'Cleared',
        tone: 'green',
    },
    {
        icon: ShieldCheck,
        title: 'Documentation gap',
        sub: 'Flagged before billing',
        status: 'Resolved',
        tone: 'blue',
    },
    {
        icon: Scale,
        title: 'RAC appeal',
        sub: 'Pursued only where it pays — and won',
        status: 'Recovered',
        tone: 'green',
    },
];

type Step = { n: string; title: string; body: string; highlight?: boolean };

const STEPS: Step[] = [
    {
        n: '1',
        title: 'Scoping call',
        body: 'We map where coverage, documentation, and appeal exposure actually sit in your workflow.',
    },
    {
        n: '2',
        title: 'Right-sized support',
        body: 'Choose only the services you need — utilization review, peer review, appeals, or education.',
    },
    {
        n: '3',
        title: 'Ongoing review',
        body: 'Regular reviews and real-time answers catch issues before they reach a payer or auditor.',
    },
    {
        n: '4',
        title: 'Defensible record',
        body: 'Clean abstracts and independent review leave you a stronger position when decisions are questioned.',
        highlight: true,
    },
];

type Feature = { icon: LucideIcon; title: string; body: string };

const FEATURES: Feature[] = [
    {
        icon: GraduationCap,
        title: 'Avoid building the expertise from scratch',
        body: 'Hiring, training, and retaining someone who stays current on Medicare review standards is expensive. MRC gives you that depth on demand.',
    },
    {
        icon: ShieldCheck,
        title: 'Reduce preventable compliance exposure',
        body: 'Regular reviews and real-time guidance help your team catch coverage, notice, billing, and documentation issues before they become costly problems.',
    },
    {
        icon: Clock,
        title: 'Protect high-value staff time',
        body: 'Your nurses and leaders should not have to spend hours researching every Medicare question. We help them move faster with clearer answers.',
    },
    {
        icon: Scale,
        title: 'Make hard decisions defensible',
        body: 'Independent review, clean abstracts, and practical education give your facility a stronger record when coverage, payment, or appeal decisions are questioned.',
    },
];

type MontanaPoint = { icon: LucideIcon; text: string };

const MONTANA: MontanaPoint[] = [
    {
        icon: Users,
        text: 'Medicare specialists working directly with leadership and floor staff',
    },
    {
        icon: Scale,
        text: 'Independent physician review without the search and scheduling burden',
    },
    {
        icon: GraduationCap,
        text: 'Ongoing education that keeps your team aligned as standards change',
    },
];

const TESTIMONIALS = [
    {
        quote: 'We were spending whole afternoons chasing Medicare questions internally. MRC gave us a straight answer the same day and the documentation to back it up.',
        initials: 'DN',
        role: 'Director of Nursing',
        org: '25-bed Critical Access Hospital',
    },
    {
        quote: 'Before an appeal, they tell us honestly whether it’s worth pursuing. That candor has saved us from chasing cases we’d never have won.',
        initials: 'AD',
        role: 'Administrator',
        org: 'Skilled Nursing Facility',
    },
    {
        quote: 'Hiring a full-time compliance specialist was never realistic for a facility our size. MRC gives us that expertise for a fraction of the cost.',
        initials: 'CF',
        role: 'CFO',
        org: 'Rural health system',
    },
];

const FAQS = [
    {
        q: 'Do we have to replace any of our current staff or systems?',
        a: 'No. MRC works alongside your existing team and EHR. We supply the Medicare expertise; your staff keep running day-to-day operations.',
    },
    {
        q: 'Can we use just one service instead of everything?',
        a: 'Yes. Most facilities start with the single area causing the most risk — often utilization review or appeals — and add services later as needs change.',
    },
    {
        q: 'How fast can your team answer a Medicare question?',
        a: 'Most day-to-day questions get a practical answer the same business day, so your staff are not stuck waiting to make a coverage or documentation decision.',
    },
    {
        q: 'Are your physician reviewers truly independent?',
        a: 'Yes. Peer review is performed by qualified physicians with no involvement in the case, giving your decisions a credible, independent record.',
    },
];

export default function Home() {
    return (
        <div className="surface-light bg-[radial-gradient(120%_80%_at_88%_-6%,rgba(98,181,229,0.16),transparent_46%),linear-gradient(180deg,#f8f9fa_0%,#ffffff_46%,#f8f9fa_100%)] text-graphite">
            <Seo
                title="Medicare Compliance Consulting for Skilled Nursing Facilities"
                description="Medical Review Consultants helps SNFs, Critical Access Hospitals, and rural providers reduce Medicare compliance risk, protect reimbursement, and save staff time."
                image="/images/working.jpg"
            />

            {/* ===================== HERO ===================== */}
            <section className="relative overflow-hidden">
                <div className="relative overflow-hidden">
                    <svg
                        viewBox="0 0 720 460"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 right-0 hidden h-full w-[58%] opacity-50 lg:block"
                    >
                        <g
                            fill="none"
                            stroke="#62b5e5"
                            strokeWidth={1.4}
                            strokeOpacity={0.55}
                        >
                            <path d="M40,360 C200,300 320,346 470,286 C600,234 690,272 760,232" />
                            <path d="M40,396 C200,336 320,382 470,322 C600,270 690,308 760,268" />
                            <path d="M40,432 C200,372 320,418 470,358 C600,306 690,344 760,304" />
                            <path d="M40,318 C210,266 320,300 460,250 C590,206 690,236 760,200" />
                            <path d="M40,276 C220,236 330,260 450,220 C580,180 690,200 760,172" />
                        </g>
                        <g
                            fill="none"
                            stroke="#003b5c"
                            strokeWidth={1.4}
                            strokeOpacity={0.14}
                        >
                            <path d="M40,236 C230,206 340,224 444,194 C566,160 690,170 760,150" />
                            <path d="M40,200 C240,178 350,190 440,168 C560,140 690,144 760,128" />
                        </g>
                    </svg>

                    <div className="container-page relative grid items-center gap-10 pt-[clamp(2.5rem,5vw,4rem)] pb-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-[52px]">
                        <div>
                            <span className="inline-flex items-center gap-[9px] rounded-full bg-white/80 px-[15px] py-2 font-sans text-[0.75rem] font-bold tracking-[0.14em] text-brand uppercase shadow-[0_1px_3px_rgba(25,28,29,0.06)] backdrop-blur">
                                <span className="size-[7px] rounded-full bg-azure" />
                                {'For SNFs, CAHs & rural providers'}
                            </span>
                            <h1 className="mt-[22px] mb-[18px] font-sans text-[clamp(2.1rem,5.4vw,3.375rem)] leading-[1.04] font-extrabold tracking-[-0.028em] text-graphite">
                                {'Carry less Medicare risk —'}
                                <br />
                                {'without hiring a '}
                                <span className="relative whitespace-nowrap text-brand">
                                    compliance bench
                                    <svg
                                        viewBox="0 0 240 12"
                                        preserveAspectRatio="none"
                                        aria-hidden="true"
                                        className="absolute -bottom-1.5 left-0 h-[9px] w-full"
                                    >
                                        <path
                                            d="M2 8 C60 2, 180 2, 238 7"
                                            fill="none"
                                            stroke="#62b5e5"
                                            strokeWidth={3.5}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                .
                            </h1>
                            <p className="max-w-[524px] text-[1.125rem] leading-[1.7] text-pewter">
                                On-demand Medicare expertise for skilled nursing
                                facilities, Critical Access Hospitals, and rural
                                providers — protecting reimbursement, heading
                                off compliance surprises, and freeing your team
                                to focus on patient care.
                            </p>
                            <div className="mt-7 flex flex-wrap gap-[13px]">
                                <Link
                                    href="/services"
                                    className="cta cta-brand"
                                >
                                    Explore our services
                                    <ArrowRight
                                        className="size-4"
                                        strokeWidth={2.2}
                                    />
                                </Link>
                                <a
                                    href={CONTACT.phonePrimaryHref}
                                    className="cta cta-outline"
                                >
                                    <Phone className="size-4" strokeWidth={2} />
                                    {CONTACT.phonePrimary}
                                </a>
                            </div>
                        </div>

                        {/* Proof card */}
                        <div className="relative rounded-[20px] border border-white/70 bg-white/75 p-[22px] shadow-[0_20px_60px_rgba(25,28,29,0.12)] backdrop-blur-xl">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="inline-flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.15em] text-[#0a7a4a] uppercase">
                                    <span className="size-2 animate-pulse rounded-full bg-[#10b981]" />
                                    Coverage protected
                                </span>
                                <span className="text-[0.75rem] font-semibold text-pewter-soft">
                                    This week
                                </span>
                            </div>
                            <div className="flex flex-col gap-[9px]">
                                {PROOF.map(
                                    ({
                                        icon: Icon,
                                        title,
                                        sub,
                                        status,
                                        tone,
                                    }) => (
                                        <div
                                            key={title}
                                            className="flex items-center gap-3 rounded-xl bg-white p-[13px_15px] shadow-[0_1px_3px_rgba(25,28,29,0.05)]"
                                        >
                                            <span
                                                className={`flex size-[38px] shrink-0 items-center justify-center rounded-[10px] ${
                                                    tone === 'blue'
                                                        ? 'bg-azure/16 text-[#1d6f9c]'
                                                        : 'bg-brand/8 text-brand'
                                                }`}
                                            >
                                                <Icon
                                                    className="size-[19px]"
                                                    strokeWidth={1.8}
                                                />
                                            </span>
                                            <span className="flex-1">
                                                <span className="block text-[0.84rem] font-bold text-graphite">
                                                    {title}
                                                </span>
                                                <span className="block text-[0.75rem] text-pewter-soft">
                                                    {sub}
                                                </span>
                                            </span>
                                            <span
                                                className={`rounded-full px-[9px] py-1 text-[0.6875rem] font-bold ${
                                                    tone === 'blue'
                                                        ? 'bg-azure/18 text-[#1d6f9c]'
                                                        : 'bg-[#10b981]/12 text-[#0a7a4a]'
                                                }`}
                                            >
                                                {status}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outcome bar */}
                <div className="container-page pb-[clamp(2.5rem,5vw,3.5rem)]">
                    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand/8 shadow-[0_1px_3px_rgba(25,28,29,0.05)] lg:grid-cols-4">
                        {OUTCOMES.map((o) => (
                            <div
                                key={o.title}
                                className="bg-white p-[clamp(1.1rem,2vw,1.4rem)]"
                            >
                                <div className="mb-[6px] font-sans text-[0.875rem] font-extrabold tracking-[-0.01em] text-brand">
                                    {o.title}
                                </div>
                                <div className="text-[0.8125rem] leading-[1.55] text-pewter-soft">
                                    {o.body}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== WHAT WE DO ===================== */}
            <section className="container-page pt-2 pb-[clamp(3.5rem,7vw,5rem)]">
                <div className="mb-9 max-w-[760px]">
                    <Kicker>What we do</Kicker>
                    <h2 className="mt-[14px] mb-[14px] font-sans text-[clamp(1.75rem,3.6vw,2.125rem)] leading-[1.15] font-extrabold tracking-[-0.025em] text-graphite">
                        Specialized Medicare support that saves money before
                        problems surface
                    </h2>
                    <p className="text-[1.0625rem] leading-[1.7] text-pewter">
                        MRC helps facilities avoid the hidden cost of doing this
                        work alone: staff research time, retraining, missed
                        coverage signals, weak documentation, and avoidable
                        appeal exposure.
                    </p>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                    {SERVICES.map(({ icon: Icon, title, body, href }) => (
                        <Link
                            key={title}
                            href={href}
                            className="group relative block overflow-hidden rounded-2xl bg-white p-7 no-underline shadow-[0_1px_3px_rgba(25,28,29,0.06)] transition-shadow hover:shadow-[0_18px_44px_rgba(25,28,29,0.12)]"
                        >
                            <span className="mb-[18px] flex size-[50px] items-center justify-center rounded-[14px] bg-brand/8 text-brand">
                                <Icon className="size-6" strokeWidth={1.6} />
                            </span>
                            <h3 className="mb-2 font-sans text-[1.25rem] font-bold tracking-[-0.01em] text-graphite">
                                {title}
                            </h3>
                            <p className="text-[0.9rem] leading-[1.65] text-pewter">
                                {body}
                            </p>
                            <span className="mt-4 inline-flex items-center gap-[7px] text-[0.875rem] font-bold text-brand">
                                Learn more
                                <ArrowRight
                                    className="size-[15px] transition-transform group-hover:translate-x-1"
                                    strokeWidth={2.2}
                                />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ===================== PROCESS ===================== */}
            <section className="container-page pt-2 pb-[clamp(3.5rem,7vw,5rem)]">
                <div className="rounded-[24px] bg-white p-[clamp(1.75rem,4vw,3rem)] shadow-[0_1px_3px_rgba(25,28,29,0.06)]">
                    <div className="mb-9 max-w-[720px]">
                        <Kicker>How engagement works</Kicker>
                        <h2 className="mt-[14px] mb-3 font-sans text-[clamp(1.6rem,3.4vw,2rem)] leading-[1.15] font-extrabold tracking-[-0.025em] text-graphite">
                            Plug us in where the risk is. Nothing to staff,
                            nothing to build.
                        </h2>
                        <p className="text-[1rem] leading-[1.7] text-pewter">
                            {
                                'No long onboarding, no new headcount. We scope the gaps, slot in alongside your team, and stay current so they don’t have to.'
                            }
                        </p>
                    </div>
                    <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2">
                        <div
                            aria-hidden="true"
                            className="absolute top-[21px] right-[11%] left-[11%] hidden h-0.5 bg-gradient-to-r from-brand/15 via-azure/50 to-brand/15 lg:block"
                        />
                        {STEPS.map((step) => (
                            <div key={step.n} className="relative lg:pr-[14px]">
                                <span
                                    className={`flex size-[44px] items-center justify-center rounded-full font-sans text-[1rem] font-extrabold ${
                                        step.highlight
                                            ? 'bg-azure text-brand-ink shadow-[0_8px_20px_rgba(98,181,229,0.3)]'
                                            : 'bg-brand text-white shadow-[0_8px_20px_rgba(0,59,92,0.22)]'
                                    }`}
                                >
                                    {step.n}
                                </span>
                                <h3 className="mt-[18px] mb-[7px] font-sans text-[1rem] font-bold text-graphite">
                                    {step.title}
                                </h3>
                                <p className="text-[0.84rem] leading-[1.6] text-pewter-soft">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== WHY MRC ===================== */}
            <section className="container-page pt-2 pb-[clamp(3.5rem,7vw,5rem)]">
                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
                    <div className="lg:sticky lg:top-[100px] lg:self-start">
                        <Kicker>Why MRC</Kicker>
                        <h2 className="mt-[14px] mb-[14px] font-sans text-[clamp(1.7rem,3.5vw,2.0625rem)] leading-[1.18] font-extrabold tracking-[-0.025em] text-graphite">
                            {
                                'The value isn’t just what we do. It’s what your facility no longer has to carry alone.'
                            }
                        </h2>
                        <p className="mb-6 text-[1rem] leading-[1.7] text-pewter">
                            Medicare rules change constantly. Our job is to
                            absorb that complexity, support your staff in the
                            moment, and help leadership avoid expensive
                            surprises.
                        </p>
                        <Link
                            href="/working-with-mrc"
                            className="cta cta-brand"
                        >
                            See how working with MRC feels
                            <ArrowRight className="size-4" strokeWidth={2.2} />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-[14px]">
                        {FEATURES.map(({ icon: Icon, title, body }) => (
                            <div
                                key={title}
                                className="flex gap-[18px] rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(25,28,29,0.06)]"
                            >
                                <span className="flex size-[46px] shrink-0 items-center justify-center rounded-xl bg-azure/16 text-[#1d6f9c]">
                                    <Icon
                                        className="size-[22px]"
                                        strokeWidth={1.7}
                                    />
                                </span>
                                <div>
                                    <h3 className="mb-[6px] font-sans text-[1.0625rem] font-bold text-graphite">
                                        {title}
                                    </h3>
                                    <p className="text-[0.9rem] leading-[1.65] text-pewter">
                                        {body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== ROOTED IN MONTANA ===================== */}
            <section className="relative overflow-hidden bg-[radial-gradient(120%_120%_at_14%_0%,rgba(98,181,229,0.2),transparent_52%),linear-gradient(160deg,#003b5c_0%,#00263c_72%)] text-white">
                <svg
                    viewBox="0 0 1200 360"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
                >
                    <g
                        fill="none"
                        stroke="#62b5e5"
                        strokeWidth={1.3}
                        strokeOpacity={0.3}
                    >
                        <path d="M0,300 C220,250 360,288 560,236 C760,186 940,222 1200,176" />
                        <path d="M0,330 C220,280 360,318 560,266 C760,216 940,252 1200,206" />
                        <path d="M0,270 C240,224 380,256 560,210 C760,170 940,198 1200,156" />
                        <path d="M0,240 C250,200 390,224 560,184 C760,150 940,170 1200,134" />
                    </g>
                </svg>
                <div className="container-page relative grid items-center gap-10 py-[clamp(3.5rem,7vw,4.5rem)] lg:grid-cols-2 lg:gap-12">
                    <div>
                        <Kicker tone="azure">Rooted in Montana</Kicker>
                        <h2 className="mt-[14px] mb-4 font-sans text-[clamp(1.7rem,3.5vw,2.0625rem)] leading-[1.18] font-extrabold tracking-[-0.025em] text-white">
                            Built for lean healthcare teams with no room for
                            Medicare missteps
                        </h2>
                        <p className="text-[1rem] leading-[1.72] text-[#cfe0ec]">
                            Based in Bozeman, Montana, MRC understands the
                            pressures rural and community providers face — lean
                            teams, heavy regulation, and no room for costly
                            Medicare missteps or another internal training
                            burden.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {MONTANA.map(({ icon: Icon, text }) => (
                            <div
                                key={text}
                                className="flex items-center gap-[14px] rounded-[14px] border border-white/12 bg-white/6 p-[18px_20px]"
                            >
                                <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] bg-azure/18 text-azure-soft">
                                    <Icon
                                        className="size-[19px]"
                                        strokeWidth={1.8}
                                    />
                                </span>
                                <span className="text-[0.9375rem] leading-[1.5] text-[#eaf2f8]">
                                    {text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== TESTIMONIALS ===================== */}
            <section className="container-page py-[clamp(3.5rem,7vw,4.5rem)]">
                <div className="mb-9 max-w-[720px]">
                    <Kicker>In their words</Kicker>
                    <h2 className="mt-[14px] font-sans text-[clamp(1.6rem,3.4vw,2rem)] leading-[1.15] font-extrabold tracking-[-0.025em] text-graphite">
                        What leaders say after they stop carrying it alone
                    </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                    {TESTIMONIALS.map((t) => (
                        <figure
                            key={t.initials}
                            className="m-0 rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(25,28,29,0.06)]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                fill="currentColor"
                                className="mb-[14px] size-[30px] text-azure opacity-50"
                            >
                                <path d="M10 11H6.5a.5.5 0 0 1-.5-.5V8c0-1.5 1-2.5 2.5-2.5h.5a1 1 0 0 0 0-2h-.5A4.5 4.5 0 0 0 4 8v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm9 0h-3.5a.5.5 0 0 1-.5-.5V8c0-1.5 1-2.5 2.5-2.5h.5a1 1 0 0 0 0-2h-.5A4.5 4.5 0 0 0 13 8v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2z" />
                            </svg>
                            <blockquote className="m-0 mb-5 text-[0.96rem] leading-[1.7] text-graphite">
                                {`“${t.quote}”`}
                            </blockquote>
                            <figcaption className="flex items-center gap-3">
                                <span className="flex size-[42px] items-center justify-center rounded-full bg-brand text-[0.875rem] font-extrabold text-azure">
                                    {t.initials}
                                </span>
                                <span>
                                    <span className="block text-[0.875rem] font-bold text-graphite">
                                        {t.role}
                                    </span>
                                    <span className="block text-[0.8125rem] text-pewter-soft">
                                        {t.org}
                                    </span>
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
                <p className="mt-[22px] text-[0.78rem] text-pewter-faint">
                    Representative of the outcomes MRC clients describe.
                </p>
            </section>

            {/* ===================== FAQ ===================== */}
            <section className="container-page pt-2 pb-[clamp(3.5rem,7vw,5rem)]">
                <div className="mb-[30px] max-w-[720px]">
                    <Kicker>Frequently asked</Kicker>
                    <h2 className="mt-[14px] font-sans text-[clamp(1.6rem,3.4vw,2rem)] leading-[1.15] font-extrabold tracking-[-0.025em] text-graphite">
                        Questions facilities ask before they engage
                    </h2>
                </div>
                <dl className="grid gap-4 md:grid-cols-2">
                    {FAQS.map((f) => (
                        <div
                            key={f.q}
                            className="rounded-2xl bg-white p-[26px] shadow-[0_1px_3px_rgba(25,28,29,0.06)]"
                        >
                            <dt className="mb-2 font-sans text-[1rem] font-bold text-graphite">
                                {f.q}
                            </dt>
                            <dd className="m-0 text-[0.9rem] leading-[1.65] text-pewter">
                                {f.a}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* ===================== CTA BAND ===================== */}
            <section className="container-page pt-2 pb-[clamp(4rem,8vw,5.5rem)]">
                <CtaBand
                    align="center"
                    title="Want to compare MRC with doing this in-house?"
                    text={
                        'We’ll help you think through the cost of staff time, training, compliance exposure, and appeal risk — so you can choose the right level of support.'
                    }
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
