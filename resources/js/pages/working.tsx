import { Head, Link } from '@inertiajs/react';
import { CtaBand, Eyebrow, SubHero } from '@/components/sections';
import { CONTACT } from '@/lib/site';

const STEPS = [
    {
        title: 'Weekly patient review',
        body: 'We meet with your team about every skilled Medicare patient, verifying Part A coverage criteria and flagging when a Notice of Non-Coverage may be needed.',
    },
    {
        title: 'Clear documentation',
        body: 'Weekly patient abstracts are completed and delivered to your facility when each patient’s Medicare coverage concludes — clean records, ready when you need them.',
    },
    {
        title: 'Always-on support',
        body: 'Your staff can call our consultants any time with Medicare questions — MDS scheduling, Consolidated Billing, payment classification, and more.',
    },
    {
        title: 'Peer review on demand',
        body: 'Our physicians review Inpatient, Emergency Department, and Office Visit charts, with the review process usually completed within two weeks.',
    },
];

const BILLING = [
    {
        kind: 'Monthly Retainer',
        title: 'Utilization review & support',
        body: 'A monthly retainer covers your weekly reviews and unlimited calls from your facility — every question your staff has, answered.',
    },
    {
        kind: 'Per Patient',
        title: 'Discharge abstracts',
        body: 'End-of-month reports itemize a per-patient fee for each patient removed from Medicare coverage, so the invoice always matches the work.',
    },
    {
        kind: 'Hourly',
        title: 'RAC appeal consulting',
        body: 'RAC consulting is billed hourly — you pay only for the time your appeal actually requires. Contact us for current rates.',
    },
];

export default function Working() {
    return (
        <>
            <Head title="Working with MRC">
                <meta
                    name="description"
                    content="How an engagement with Medical Review Consultants works: weekly reviews, clear documentation, always-on support, and straightforward billing."
                />
            </Head>

            <SubHero
                eyebrow="Working with MRC"
                title={
                    <>
                        Efficient, pleasant, and{' '}
                        <em className="text-teal-bright not-italic">
                            genuinely supportive
                        </em>
                    </>
                }
                lede="Beyond providing the best support available, we work hard to make every engagement easy on your team — predictable rhythms, clear documentation, and no surprises on the invoice."
            />

            {/* Approach */}
            <section className="py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page grid items-center gap-[clamp(2.2rem,5vw,4.5rem)] lg:grid-cols-2">
                    <div className="reveal relative overflow-hidden rounded-card shadow-lift">
                        <img
                            src="/images/working.png"
                            alt="A consultant meeting with a facility's nursing team"
                            width={1536}
                            height={1024}
                            loading="lazy"
                            className="aspect-[3/2] size-full object-cover"
                        />
                    </div>
                    <div className="reveal">
                        <Eyebrow>Our Approach</Eyebrow>
                        <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)]">
                            A steady weekly rhythm your team can count on
                        </h2>
                        <p className="mt-3 text-[1.1rem] text-muted">
                            Every engagement is built around a consistent weekly
                            review of your skilled Medicare patients, backed by
                            consultants who are a phone call away the rest of
                            the week.
                        </p>
                        <p className="mt-4 text-muted">
                            During each review we work through every skilled
                            patient with your team, assessing whether each one
                            continues to meet Medicare Part A coverage
                            guidelines — or whether a Notice of Non-Coverage is
                            required. When a patient's coverage concludes, we
                            complete a patient abstract and deliver it to your
                            facility.
                        </p>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="bg-paper py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page">
                    <div className="reveal mb-[clamp(2.2rem,5vw,3.2rem)] max-w-[46rem]">
                        <Eyebrow>The Process</Eyebrow>
                        <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)]">
                            How an engagement works
                        </h2>
                    </div>
                    <div className="grid gap-[1.4rem] sm:grid-cols-2 lg:grid-cols-4">
                        {STEPS.map((step, idx) => (
                            <div
                                key={step.title}
                                className="card reveal p-[1.8rem_1.6rem]"
                            >
                                <span className="mb-[0.9rem] block font-display text-[1rem] font-bold tracking-[0.08em] text-teal-deep">
                                    {`0${idx + 1}`}
                                </span>
                                <h3 className="text-[1.18rem]">{step.title}</h3>
                                <p className="mt-2 text-[0.96rem] text-muted">
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Billing */}
            <section className="section-dark py-[clamp(4rem,9vw,6.5rem)] text-ice">
                <div className="container-page">
                    <div className="reveal mb-[clamp(2.2rem,5vw,3.2rem)] max-w-[46rem]">
                        <Eyebrow bright>Billing</Eyebrow>
                        <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] text-white">
                            Straightforward billing, no surprises
                        </h2>
                        <p className="mt-3 text-[1.15rem] text-ice/80">
                            You'll always know what an engagement costs and what
                            you're getting for it.
                        </p>
                    </div>
                    <div className="grid gap-[1.4rem] md:grid-cols-3">
                        {BILLING.map((b) => (
                            <div
                                key={b.title}
                                className="reveal rounded-card border border-ice/15 bg-ice/5 p-[2rem_1.7rem]"
                            >
                                <span className="mb-[0.8rem] block text-[0.78rem] font-semibold tracking-[0.14em] text-teal-bright uppercase">
                                    {b.kind}
                                </span>
                                <h3 className="text-[1.2rem] text-white">
                                    {b.title}
                                </h3>
                                <p className="mt-2 text-[0.96rem] text-ice/75">
                                    {b.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page">
                    <CtaBand
                        title="Ready to put MRC to work?"
                        text="We'll walk you through exactly what an engagement would look like for your facility."
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
