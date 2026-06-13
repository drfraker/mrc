import { Head, Link } from '@inertiajs/react';
import { CheckItem, CtaBand, Eyebrow, SubHero } from '@/components/sections';

type Service = {
    id: string;
    index: string;
    title: string;
    lede: string;
    body: string;
    image: string;
    alt: string;
    points: string[];
};

const SERVICES: Service[] = [
    {
        id: 'utilization-review',
        index: 'Service 01',
        title: 'Medicare Part A Utilization Review',
        lede: 'Ongoing consultation with certified Medicare specialists who work directly with your facility’s leadership and floor staff.',
        body: 'Each week, our consultants meet with your team to review every skilled Medicare patient — verifying that each one continues to meet skilled care criteria, and flagging when a Notice of Non-Coverage may be required. We’re also on call between reviews for immediate questions about skilled admissions, extended stays, payment classification, and MDS guidelines.',
        image: '/images/svc-utilization.png',
        alt: 'A nurse consultant reviewing patient records with facility staff',
        points: [
            'Weekly skilled-patient assessments with your staff',
            'Coverage determinations and Notice of Non-Coverage guidance',
            'Progress abstracts prepared for every patient at discharge',
            'Guidance on MDS schedules and Medicare payment classification',
        ],
    },
    {
        id: 'peer-review',
        index: 'Service 02',
        title: 'Physician Peer Review',
        lede: 'Independent, unbiased clinical review from physicians who have spent their careers caring for patients.',
        body: 'MRC partners with two experienced physicians — one in General Practice, one in Internal Medicine — each with more than 25 years of active patient care. They review Inpatient, Emergency Department, and Office Visit charts and deliver clear professional opinions on the appropriateness of treatment decisions and care plans. For Critical Access Hospitals and rural facilities, where finding a qualified outside reviewer is hard, this service fills a real gap.',
        image: '/images/svc-peer-review.png',
        alt: 'A senior physician carefully reviewing a patient chart',
        points: [
            'Reviewers with 25+ years of active practice each',
            'Inpatient, Emergency Department, and Office Visit charts',
            'Reviews typically completed within two weeks',
            'Particularly suited to Critical Access and rural hospitals',
        ],
    },
    {
        id: 'rac-appeals',
        index: 'Service 03',
        title: 'RAC Appeals Assistance',
        lede: 'A Recovery Audit Contractor appeal can be confusing, time-demanding, and expensive. We help you decide whether to fight — and how to win.',
        body: 'Our consultants start with an honest viability analysis: is the underlying claim meritorious, and what legal and clinical defenses apply? From there, we guide your facility through each stage of the appeals process with a clear strategy, so you spend effort only where it counts.',
        image: '/images/svc-rac.png',
        alt: 'A consultant organizing documentation for a Medicare appeal',
        points: [
            'Up-front analysis of appeal viability',
            'Identification of why the underlying claim is meritorious',
            'Strategy and support through each level of appeal',
            'Hourly billing — pay only for the help you need',
        ],
    },
    {
        id: 'education',
        index: 'Service 04',
        title: 'Staff Education & Ongoing Support',
        lede: 'The best compliance program is a staff that understands the rules. We make sure yours does.',
        body: 'Your team has direct access to our consultants for any Medicare question — MDS scheduling, Consolidated Billing, payment classification, coverage criteria, and more. Nursing staff consistently tell us this ongoing education helps them do their jobs more effectively and with far more confidence.',
        image: '/images/svc-education.png',
        alt: 'A consultant leading an education session with nursing staff',
        points: [
            'Unlimited consultant calls under your monthly retainer',
            'MDS scheduling and Consolidated Billing guidance',
            'Medicare payment system and classification education',
            'Practical answers your staff can apply the same day',
        ],
    },
];

function ServiceDetail({
    service,
    reverse,
}: {
    service: Service;
    reverse: boolean;
}) {
    const media = (
        <div className="reveal relative overflow-hidden rounded-card shadow-lift">
            <img
                src={service.image}
                alt={service.alt}
                width={1536}
                height={1024}
                loading="lazy"
                className="aspect-[3/2] size-full object-cover"
            />
        </div>
    );
    const copy = (
        <div className="reveal">
            <Eyebrow>{service.index}</Eyebrow>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)]">
                {service.title}
            </h2>
            <p className="mt-3 text-[1.1rem] text-muted">{service.lede}</p>
            <p className="mt-4 text-muted">{service.body}</p>
            <ul className="mt-6 grid list-none gap-[0.7rem] p-0">
                {service.points.map((p) => (
                    <CheckItem key={p}>{p}</CheckItem>
                ))}
            </ul>
        </div>
    );

    return (
        <article
            id={service.id}
            className="grid scroll-mt-26 items-center gap-[clamp(2.2rem,5vw,4.5rem)] lg:grid-cols-2"
        >
            {reverse ? (
                <>
                    <div className="lg:order-2">{media}</div>
                    <div className="lg:order-1">{copy}</div>
                </>
            ) : (
                <>
                    {media}
                    {copy}
                </>
            )}
        </article>
    );
}

export default function Services() {
    return (
        <>
            <Head title="Services">
                <meta
                    name="description"
                    content="Medicare Part A utilization review, physician peer review, RAC appeals assistance, and staff education for skilled nursing facilities and rural hospitals."
                />
            </Head>

            <SubHero
                eyebrow="Services"
                title={
                    <>
                        Experienced eyes on every{' '}
                        <em className="text-teal-bright not-italic">
                            Medicare decision
                        </em>
                    </>
                }
                lede="Four focused services, one goal: keeping your facility's Medicare program accurate, defensible, and well understood by your staff."
            />

            <section className="py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page grid gap-[clamp(4rem,9vw,6.5rem)]">
                    {SERVICES.map((service, idx) => (
                        <ServiceDetail
                            key={service.id}
                            service={service}
                            reverse={idx % 2 === 1}
                        />
                    ))}
                </div>
            </section>

            <section className="bg-paper py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page">
                    <CtaBand
                        title="Not sure which service fits?"
                        text="Tell us what your facility is facing and we'll point you in the right direction — no obligation."
                    >
                        <Link href="/contact" className="btn btn-primary">
                            Contact Us
                        </Link>
                        <Link
                            href="/working-with-mrc"
                            className="btn btn-ghost"
                        >
                            How We Work
                        </Link>
                    </CtaBand>
                </div>
            </section>
        </>
    );
}
