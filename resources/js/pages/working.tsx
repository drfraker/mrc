import { Link } from '@inertiajs/react';
import { CtaBand, Eyebrow, SubHero } from '@/components/sections';
import Seo, { breadcrumbSchema } from '@/components/seo';
import { CONTACT } from '@/lib/site';

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

const BILLING = [
    {
        kind: 'Monthly Retainer',
        title: 'Predictable access to Medicare expertise',
        body: 'A monthly retainer covers weekly reviews and unlimited facility calls, giving you specialist support without adding a full internal compliance role.',
    },
    {
        kind: 'Per Patient',
        title: 'Fees tied to completed records',
        body: 'End-of-month reports itemize a per-patient fee for each patient removed from Medicare coverage, so documentation cost stays tied to completed work.',
    },
    {
        kind: 'Hourly',
        title: 'Appeal spend matched to case value',
        body: 'RAC consulting is billed hourly, so you can test appeal viability first and pay only for the support the claim actually warrants.',
    },
];

export default function Working() {
    return (
        <>
            <Seo
                title="Medicare Review Support That Reduces Staff Burden"
                description="How MRC helps facilities save internal time, reduce Medicare compliance burden, and use predictable support for utilization review, education, and appeals."
                path="/working-with-mrc"
                image="/images/working.png"
                jsonLd={breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Working with MRC', path: '/working-with-mrc' },
                ])}
            />

            <SubHero
                eyebrow="Working with MRC"
                title={
                    <>
                        A lower-burden way to keep Medicare work{' '}
                        <em className="text-teal-bright not-italic">current</em>
                    </>
                }
                lede="Instead of asking an employee to master, monitor, and teach changing Medicare standards alone, MRC gives your facility a steady review rhythm and direct access to experienced consultants."
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
                            A steady weekly rhythm that protects staff time and
                            reimbursement decisions
                        </h2>
                        <p className="mt-3 text-[1.1rem] text-muted">
                            Every engagement is built around a consistent weekly
                            review of your skilled Medicare patients, backed by
                            consultants who are a phone call away the rest of
                            the week. That structure helps your team make timely
                            decisions without turning every Medicare question
                            into an internal research project.
                        </p>
                        <p className="mt-4 text-muted">
                            During each review we work through every skilled
                            patient with your team, assessing whether each one
                            continues to meet Medicare Part A coverage
                            guidelines — or whether a Notice of Non-Coverage is
                            required. When a patient's coverage concludes, we
                            complete a patient abstract and deliver it to your
                            facility, creating a stronger record with less
                            burden on your staff.
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
                            How an engagement creates value
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
                            Predictable support beats unpredictable internal
                            cost
                        </h2>
                        <p className="mt-3 text-[1.15rem] text-ice/80">
                            You know what the support costs and what it covers,
                            while avoiding the hidden expense of constant
                            retraining, staff research, and last-minute cleanup.
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
                        title="Ready to reduce the Medicare burden on your team?"
                        text="We'll walk through where your facility is spending time now and what MRC support would replace."
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
