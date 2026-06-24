import { Link } from '@inertiajs/react';
import { CheckItem, CtaBand, Eyebrow, SubHero } from '@/components/sections';
import Seo, { breadcrumbSchema, serviceListSchema } from '@/components/seo';

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
        lede: 'Protect reimbursement decisions before they turn into denials, missed notices, or hours of staff rework.',
        body: 'Each week, our consultants meet with your team to review every skilled Medicare patient. We help verify that Part A coverage remains defensible, flag when a Notice of Non-Coverage may be required, and answer the Medicare questions that would otherwise pull your nurses and leaders away from care operations.',
        image: '/images/svc-utilization.png',
        alt: 'A nurse consultant reviewing patient records with facility staff',
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
        title: 'Physician Peer Review',
        lede: 'Get credible outside opinions without asking your team to chase scarce, unbiased reviewers.',
        body: 'MRC partners with two experienced physicians — one in General Practice, one in Internal Medicine — each with more than 25 years of active patient care. They review Inpatient, Emergency Department, and Office Visit charts and deliver clear professional opinions on care decisions, giving your facility independent support when a record needs to stand on its own.',
        image: '/images/svc-peer-review.png',
        alt: 'A senior physician carefully reviewing a patient chart',
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
        title: 'RAC Appeals Assistance',
        lede: 'Spend appeal dollars only where the claim is worth defending, then build the strongest case you can.',
        body: 'A Recovery Audit Contractor appeal can consume leadership time fast. Our consultants start with an honest viability analysis: is the underlying claim meritorious, and what legal and clinical defenses apply? From there, we guide your facility through each stage with a clear strategy, so you do not waste effort on weak arguments or miss the ones that matter.',
        image: '/images/svc-rac.png',
        alt: 'A consultant organizing documentation for a Medicare appeal',
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
        title: 'Staff Education & Ongoing Support',
        lede: 'Turn Medicare questions into quick answers, not another staff research project.',
        body: 'Your team has direct access to our consultants for Medicare questions — MDS scheduling, Consolidated Billing, payment classification, coverage criteria, and more. Instead of carrying the full burden of training and retraining internal staff as standards change, your facility gets practical education in the flow of daily work.',
        image: '/images/svc-education.png',
        alt: 'A consultant leading an education session with nursing staff',
        points: [
            'Unlimited consultant calls under your monthly retainer',
            'MDS scheduling and Consolidated Billing guidance',
            'Medicare payment system and classification education',
            'Practical answers that reduce uncertainty the same day',
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
            <Seo
                title="Medicare Utilization Review, Peer Review & RAC Appeals"
                description="Medicare Part A utilization review, physician peer review, RAC appeal assistance, and staff education for SNFs, Critical Access Hospitals, and rural providers."
                path="/services"
                image="/images/svc-utilization.png"
                jsonLd={[
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                    ]),
                    serviceListSchema(),
                ]}
            />

            <SubHero
                eyebrow="Services"
                title={
                    <>
                        Medicare support built around saved time, lower risk,
                        and{' '}
                        <em className="text-teal-bright not-italic">
                            stronger reimbursement decisions
                        </em>
                    </>
                }
                lede="Four focused services, one business case: avoid the cost of building this expertise alone while giving your staff current, practical guidance when Medicare decisions matter."
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
                        title="Not sure where the savings are?"
                        text="Tell us what your facility is carrying now. We'll help identify whether staff time, compliance exposure, appeals, or review volume is the best place to start."
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
