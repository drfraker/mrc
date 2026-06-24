import { Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { CtaBand, SubHero } from '@/components/sections';
import Seo, { breadcrumbSchema } from '@/components/seo';

const RESOURCES = [
    {
        title: 'CMS Regulations & Guidance',
        body: "The Centers for Medicare & Medicaid Services' central library of regulations, manuals, and transmittals — the source of truth for Medicare policy.",
        url: 'https://www.cms.gov/medicare/regulations-guidance',
        display: 'cms.gov',
    },
    {
        title: 'Find-A-Code',
        body: 'A fast lookup for HCPCS, CPT, and ICD codes — handy for billing questions that come up during reviews.',
        url: 'https://www.findacode.com/',
        display: 'findacode.com',
    },
    {
        title: 'SNF Consolidated Billing',
        body: "CMS's reference for skilled nursing facility Consolidated Billing, including the current lists of exclusions.",
        url: 'https://www.cms.gov/medicare/coding-billing/snf-consolidated-billing',
        display: 'cms.gov',
    },
    {
        title: 'AAPACN',
        body: 'The American Association of Post-Acute Care Nursing (formerly AANAC) — education and certification for nurse assessment coordinators.',
        url: 'https://www.aapacn.org/',
        display: 'aapacn.org',
    },
    {
        title: 'QIO Program',
        body: 'The CMS Quality Improvement Organization program — including the Beneficiary & Family Centered Care QIOs that handle appeals and quality-of-care reviews.',
        url: 'https://qioprogram.org/',
        display: 'qioprogram.org',
    },
];

export default function Resources() {
    return (
        <>
            <Seo
                title="Medicare Compliance Resources for Skilled Nursing Facilities"
                description="Medicare and post-acute care resources for CMS regulations, SNF Consolidated Billing, code lookups, QIO appeals, and nursing facility education."
                path="/resources"
                image="/images/svc-education.png"
                jsonLd={breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Resources', path: '/resources' },
                ])}
            />

            <SubHero
                eyebrow="Resources"
                title={
                    <>
                        References we{' '}
                        <em className="text-teal-bright not-italic">rely on</em>
                    </>
                }
                lede="Tools and information we find useful — and often critical — in our work, shared in the hope your team finds them helpful too."
            />

            <section className="bg-paper py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page">
                    <div className="grid gap-[1.4rem] sm:grid-cols-2 lg:grid-cols-3">
                        {RESOURCES.map((r) => (
                            <a
                                key={r.title}
                                href={r.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card card-hover reveal flex flex-col gap-[0.4rem] p-[1.8rem_1.7rem] text-ink no-underline"
                            >
                                <h3 className="mb-[0.2em] flex items-center gap-[0.55rem] text-[1.15rem]">
                                    <ExternalLink
                                        className="size-[1.05rem] shrink-0 text-teal-deep"
                                        strokeWidth={2}
                                    />
                                    {r.title}
                                </h3>
                                <p className="flex-1 text-[0.95rem] text-muted">
                                    {r.body}
                                </p>
                                <span className="text-[0.85rem] font-semibold break-words text-teal-deep">
                                    {r.display}
                                </span>
                            </a>
                        ))}
                    </div>
                    <p className="reveal mt-8 text-[0.86rem] text-muted">
                        External links are provided for convenience; MRC isn't
                        responsible for the content of third-party sites.
                    </p>
                </div>
            </section>

            <section className="py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page">
                    <CtaBand
                        title="Can't find what you're looking for?"
                        text="Ask us. Pointing facilities to the right reference is part of what we do every day."
                    >
                        <Link href="/contact" className="btn btn-primary">
                            Contact Us
                        </Link>
                    </CtaBand>
                </div>
            </section>
        </>
    );
}
