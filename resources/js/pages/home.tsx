import { Link } from '@inertiajs/react';
import {
    BookOpen,
    ClipboardCheck,
    Clock,
    GraduationCap,
    Mountain,
    Scale,
    ShieldCheck,
    Stethoscope,
} from 'lucide-react';
import type { ReactNode } from 'react';
import HeroScene from '@/components/hero-scene';
import { CheckItem, CtaBand, Eyebrow } from '@/components/sections';
import Seo from '@/components/seo';
import { CONTACT } from '@/lib/site';

const SERVICES = [
    {
        icon: ClipboardCheck,
        title: 'Medicare Utilization Review',
        body: 'Catch coverage changes early, support defensible Part A decisions, and reduce the staff hours spent interpreting Medicare rules week after week.',
        href: '/services#utilization-review',
    },
    {
        icon: Stethoscope,
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

const STATS = [
    {
        value: 'Lower overhead',
        label: 'specialized Medicare help without adding a full internal role',
    },
    {
        value: 'Less risk',
        label: 'coverage and documentation issues addressed before they grow',
    },
    {
        value: 'More time',
        label: 'clinical leaders spend fewer hours chasing changing rules',
    },
    {
        value: 'Current guidance',
        label: 'consultant access keeps staff aligned with Medicare standards',
    },
];

const FEATURES = [
    {
        icon: ShieldCheck,
        title: 'Avoid building the expertise from scratch',
        body: 'Hiring, training, and retaining someone who stays current on Medicare review standards is expensive. MRC gives you that depth on demand.',
    },
    {
        icon: BookOpen,
        title: 'Reduce preventable compliance exposure',
        body: 'Weekly reviews and real-time guidance help your team catch coverage, notice, billing, and documentation issues before they become costly problems.',
    },
    {
        icon: Mountain,
        title: 'Protect high-value staff time',
        body: 'Your nurses and leaders should not have to spend hours researching every Medicare question. We help them move faster with clearer answers.',
    },
    {
        icon: Clock,
        title: 'Make hard decisions defensible',
        body: 'Independent review, clean abstracts, and practical education give your facility a stronger record when coverage, payment, or appeal decisions are questioned.',
    },
];

function SectionHead({
    eyebrow,
    title,
    lede,
    dark = false,
}: {
    eyebrow: string;
    title: ReactNode;
    lede?: ReactNode;
    dark?: boolean;
}) {
    return (
        <div className="reveal mb-[clamp(2.2rem,5vw,3.2rem)] max-w-[46rem]">
            <Eyebrow bright={dark}>{eyebrow}</Eyebrow>
            <h2
                className={`text-[clamp(1.8rem,3.6vw,2.6rem)] ${dark ? 'text-white' : 'text-ink'}`}
            >
                {title}
            </h2>
            {lede && (
                <p
                    className={`mt-3 text-[1.15rem] ${dark ? 'text-ice/80' : 'text-muted'}`}
                >
                    {lede}
                </p>
            )}
        </div>
    );
}

export default function Home() {
    return (
        <>
            <Seo
                title="Medicare Compliance Consulting for Skilled Nursing Facilities"
                description="Medical Review Consultants helps SNFs, Critical Access Hospitals, and rural providers reduce Medicare compliance risk, protect reimbursement, and save staff time."
                image="/images/working.png"
            />

            {/* Hero */}
            <section className="hero-bg hero-floor relative flex min-h-[96svh] items-center overflow-hidden pt-[clamp(8rem,16vh,11rem)] pb-[clamp(3.5rem,8vh,6rem)] text-ice">
                <HeroScene />
                <div className="container-page relative z-2">
                    <div className="max-w-[44rem]">
                        <Eyebrow bright>
                            Medicare Review &amp; Compliance Consulting
                        </Eyebrow>
                        <h1 className="mb-[0.45em] text-[clamp(2.4rem,5.6vw,4rem)] font-bold text-white">
                            Reduce Medicare compliance risk without building an{' '}
                            <em className="text-teal-bright not-italic">
                                in-house compliance bench
                            </em>
                            .
                        </h1>
                        <p className="max-w-[40rem] text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.7] text-ice/80">
                            Medical Review Consultants gives skilled nursing
                            facilities, Critical Access Hospitals, and rural
                            providers current Medicare expertise on demand —
                            helping protect reimbursement, prevent compliance
                            surprises, and free your team to focus on patient
                            care.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-[0.9rem]">
                            <Link href="/services" className="btn btn-primary">
                                Explore Our Services
                            </Link>
                            <Link href="/contact" className="btn btn-ghost">
                                Speak with a Consultant
                            </Link>
                        </div>
                    </div>

                    <div className="relative z-2 mt-[clamp(3rem,7vh,4.5rem)] grid grid-cols-1 overflow-hidden rounded-card border border-ice/15 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
                        {STATS.map((s) => (
                            <div
                                key={s.label}
                                className="border-ice/15 bg-navy-900/55 p-[1.4rem_1.6rem] not-last:border-b sm:not-last:border-b lg:border-b-0 lg:not-last:border-r sm:[&:nth-child(odd)]:border-r"
                            >
                                <strong className="block font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-bold text-teal-bright">
                                    {s.value}
                                </strong>
                                <span className="text-[0.88rem] text-ice/70">
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What we do */}
            <section className="bg-paper py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page">
                    <SectionHead
                        eyebrow="What We Do"
                        title="Specialized Medicare support that saves money before problems surface"
                        lede="MRC helps facilities avoid the hidden cost of doing this work alone: staff research time, retraining, missed coverage signals, weak documentation, and avoidable appeal exposure."
                    />
                    <div className="grid gap-[1.4rem] sm:grid-cols-2 lg:grid-cols-4">
                        {SERVICES.map(({ icon: Icon, title, body, href }) => (
                            <article
                                key={title}
                                className="card card-hover reveal flex flex-col p-[1.9rem_1.7rem]"
                            >
                                <span className="icon-chip mb-5 size-[3.1rem]">
                                    <Icon className="size-6" strokeWidth={2} />
                                </span>
                                <h3 className="mb-[0.45em] text-[1.28rem]">
                                    {title}
                                </h3>
                                <p className="flex-1 text-[0.98rem] text-muted">
                                    {body}
                                </p>
                                <Link
                                    href={href}
                                    className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-teal-deep no-underline"
                                >
                                    Learn more <span aria-hidden>→</span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why MRC */}
            <section className="section-dark py-[clamp(4rem,9vw,6.5rem)] text-ice">
                <div className="container-page">
                    <SectionHead
                        dark
                        eyebrow="Why MRC"
                        title="The value is not just what we do. It is what your facility no longer has to carry alone."
                        lede="Medicare rules change constantly. Our job is to absorb that complexity, support your staff in the moment, and help leadership avoid expensive surprises."
                    />
                    <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                        {FEATURES.map(({ icon: Icon, title, body }) => (
                            <div
                                key={title}
                                className="reveal flex items-start gap-[1.1rem]"
                            >
                                <span className="icon-chip icon-chip-dark size-[3.1rem] shrink-0">
                                    <Icon className="size-6" strokeWidth={2} />
                                </span>
                                <div>
                                    <h3 className="mb-[0.35em] text-[1.15rem] text-white">
                                        {title}
                                    </h3>
                                    <p className="text-[0.96rem] text-ice/70">
                                        {body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Montana split */}
            <section className="py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page">
                    <div className="grid items-center gap-[clamp(2.2rem,5vw,4.5rem)] lg:grid-cols-2">
                        <div className="reveal relative overflow-hidden rounded-card shadow-lift">
                            <img
                                src="/images/montana.png"
                                alt="Sunrise over mountain ridgelines near Bozeman, Montana"
                                width={1536}
                                height={1024}
                                loading="lazy"
                                className="aspect-[3/2] size-full object-cover"
                            />
                        </div>
                        <div className="reveal">
                            <Eyebrow>Rooted in Montana</Eyebrow>
                            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)]">
                                Built for lean healthcare teams with no room for
                                Medicare missteps
                            </h2>
                            <p className="mt-3 text-[1.1rem] text-muted">
                                Based in Bozeman, Montana, MRC understands the
                                pressures rural and community providers face —
                                lean teams, heavy regulation, and no room for
                                costly Medicare missteps or another internal
                                training burden.
                            </p>
                            <ul className="mt-6 grid list-none gap-[0.7rem] p-0">
                                <CheckItem>
                                    Medicare specialists working directly with
                                    leadership and floor staff
                                </CheckItem>
                                <CheckItem>
                                    Independent physician review without the
                                    search and scheduling burden
                                </CheckItem>
                                <CheckItem>
                                    Ongoing education that keeps your team
                                    aligned as standards change
                                </CheckItem>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-paper py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page">
                    <CtaBand
                        title="Want to compare MRC with doing this in-house?"
                        text="We'll help you think through the cost of staff time, training, compliance exposure, and appeal risk so you can choose the right level of support."
                    >
                        <Link href="/contact" className="btn btn-primary">
                            Contact Us
                        </Link>
                        <a
                            href={CONTACT.phonePrimaryHref}
                            className="btn btn-ghost"
                        >
                            Call {CONTACT.phonePrimary}
                        </a>
                    </CtaBand>
                </div>
            </section>
        </>
    );
}
