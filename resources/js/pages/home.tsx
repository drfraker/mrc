import { Head, Link } from '@inertiajs/react';
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
import { CONTACT } from '@/lib/site';

const SERVICES = [
    {
        icon: ClipboardCheck,
        title: 'Utilization Review',
        body: 'Weekly skilled-patient assessments with your staff, Medicare Part A coverage determinations, and clear discharge abstracts — guided by certified Medicare specialists.',
        href: '/services#utilization-review',
    },
    {
        icon: Stethoscope,
        title: 'Physician Peer Review',
        body: 'Independent chart review by physicians with more than 25 years in active practice, delivering unbiased professional opinions on the appropriateness of care.',
        href: '/services#peer-review',
    },
    {
        icon: Scale,
        title: 'RAC Appeals Assistance',
        body: 'Strategic guidance through Recovery Audit Contractor appeals — from an honest viability analysis to building the strongest possible case for your claim.',
        href: '/services#rac-appeals',
    },
    {
        icon: GraduationCap,
        title: 'Staff Education & Support',
        body: 'Ongoing education on Medicare procedures, MDS schedules, consolidated billing, and payment classification — real answers when your team needs them.',
        href: '/services#education',
    },
];

const STATS = [
    { value: '25+ yrs', label: 'clinical experience per reviewing physician' },
    { value: 'Weekly', label: 'skilled-patient reviews with your team' },
    { value: '~2 weeks', label: 'typical peer-review turnaround' },
    { value: 'Unlimited', label: 'consultant access under retainer' },
];

const FEATURES = [
    {
        icon: ShieldCheck,
        title: 'Independent and unbiased',
        body: 'Our reviewers have no stake in the outcome. You get a straight, professional opinion on whether care meets Medicare criteria — every time.',
    },
    {
        icon: BookOpen,
        title: 'Education first',
        body: "We don't just deliver findings — we teach your nursing staff the reasoning behind Medicare requirements, so every review makes your team stronger.",
    },
    {
        icon: Mountain,
        title: 'Built for rural healthcare',
        body: 'We know the realities of Critical Access Hospitals and rural facilities, where finding qualified, unbiased peer reviewers can be genuinely difficult.',
    },
    {
        icon: Clock,
        title: 'Responsive by design',
        body: 'A monthly retainer gives your staff unlimited access to our consultants. When a question comes up on the floor, the answer is a phone call away.',
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
            <Head>
                <meta
                    name="description"
                    content="Medical Review Consultants partners with skilled nursing facilities, Critical Access Hospitals, and rural providers for Medicare utilization review, physician peer review, and RAC appeals."
                />
            </Head>

            {/* Hero */}
            <section className="hero-bg hero-floor relative flex min-h-[96svh] items-center overflow-hidden pt-[clamp(8rem,16vh,11rem)] pb-[clamp(3.5rem,8vh,6rem)] text-ice">
                <HeroScene />
                <div className="container-page relative z-2">
                    <div className="max-w-[44rem]">
                        <Eyebrow bright>
                            Medicare Review &amp; Compliance Consulting
                        </Eyebrow>
                        <h1 className="mb-[0.45em] text-[clamp(2.4rem,5.6vw,4rem)] font-bold text-white">
                            Clarity and confidence in every{' '}
                            <em className="text-teal-bright not-italic">
                                Medicare review
                            </em>
                            .
                        </h1>
                        <p className="max-w-[40rem] text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.7] text-ice/80">
                            Medical Review Consultants partners with skilled
                            nursing facilities, Critical Access Hospitals, and
                            rural providers to manage utilization review,
                            physician peer review, and RAC appeals — so your
                            team can stay focused on patient care.
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
                        title="Specialized support for the hardest parts of Medicare"
                        lede="From weekly utilization review to high-stakes appeals, MRC gives your facility experienced, independent eyes on every decision."
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
                        title="Why facilities choose Medical Review Consultants"
                        lede="Medicare rules change constantly. Our job is to make sure your decisions stand on solid ground — and your staff understands why."
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
                                Big-sky perspective, ground-level expertise
                            </h2>
                            <p className="mt-3 text-[1.1rem] text-muted">
                                Based in Bozeman, Montana, MRC understands the
                                pressures rural and community providers face —
                                lean teams, heavy regulation, and no room for
                                costly Medicare missteps.
                            </p>
                            <ul className="mt-6 grid list-none gap-[0.7rem] p-0">
                                <CheckItem>
                                    Certified Medicare specialists working
                                    directly with your leadership
                                </CheckItem>
                                <CheckItem>
                                    Reviewing physicians in General Practice and
                                    Internal Medicine
                                </CheckItem>
                                <CheckItem>
                                    A working style that's efficient, pleasant,
                                    and genuinely supportive
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
                        title="Let's talk about your facility's needs."
                        text="Whether it's weekly utilization review or a RAC appeal that landed on your desk this morning, we're ready to help."
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
