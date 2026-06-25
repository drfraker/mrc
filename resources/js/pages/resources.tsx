import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Book,
    ClipboardList,
    ExternalLink,
    GraduationCap,
    Search,
    Shield,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CtaBand, PageHero } from '@/components/sections';
import Seo, { breadcrumbSchema } from '@/components/seo';

type Resource = {
    icon: LucideIcon;
    title: string;
    body: string;
    url: string;
    display: string;
    wide?: boolean;
};

const RESOURCES: Resource[] = [
    {
        icon: Book,
        title: 'CMS Regulations & Guidance',
        body: "The Centers for Medicare & Medicaid Services' central library of regulations, manuals, and transmittals — the source of truth for Medicare policy.",
        url: 'https://www.cms.gov/medicare/regulations-guidance',
        display: 'cms.gov',
    },
    {
        icon: Search,
        title: 'Find-A-Code',
        body: 'A fast lookup for HCPCS, CPT, and ICD codes — handy for billing questions that come up during reviews.',
        url: 'https://www.findacode.com/',
        display: 'findacode.com',
    },
    {
        icon: ClipboardList,
        title: 'SNF Consolidated Billing',
        body: "CMS's reference for skilled nursing facility Consolidated Billing, including the current lists of exclusions.",
        url: 'https://www.cms.gov/medicare/coding-billing/snf-consolidated-billing',
        display: 'cms.gov',
    },
    {
        icon: GraduationCap,
        title: 'AAPACN',
        body: 'The American Association of Post-Acute Care Nursing (formerly AANAC) — education and certification for nurse assessment coordinators.',
        url: 'https://www.aapacn.org/',
        display: 'aapacn.org',
    },
    {
        icon: Shield,
        title: 'QIO Program',
        body: 'The CMS Quality Improvement Organization program — including the Beneficiary & Family Centered Care QIOs that handle appeals and quality-of-care reviews.',
        url: 'https://qioprogram.org/',
        display: 'qioprogram.org',
        wide: true,
    },
];

export default function Resources() {
    return (
        <div className="surface-light bg-[radial-gradient(120%_70%_at_88%_-6%,rgba(98,181,229,0.16),transparent_46%),linear-gradient(180deg,#f8f9fa_0%,#ffffff_42%,#f8f9fa_100%)] text-graphite">
            <Seo
                title="Medicare Compliance Resources for Skilled Nursing Facilities"
                description="Medicare and post-acute care resources for CMS regulations, SNF Consolidated Billing, code lookups, QIO appeals, and nursing facility education."
                path="/resources"
                image="/images/svc-education.jpg"
                jsonLd={breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Resources', path: '/resources' },
                ])}
            />

            <PageHero
                eyebrow="Resources"
                title={
                    <>
                        References we{' '}
                        <span className="text-brand">rely on</span>
                    </>
                }
                lede="Tools and information we find useful — and often critical — in our work, shared in the hope your team finds them helpful too."
            />

            <section className="container-page py-[clamp(1.5rem,3vw,2.25rem)]">
                <div className="grid gap-[18px] md:grid-cols-2">
                    {RESOURCES.map(
                        ({ icon: Icon, title, body, url, display, wide }) => (
                            <a
                                key={title}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex gap-[18px] rounded-[18px] bg-white p-[26px] no-underline shadow-[0_1px_3px_rgba(25,28,29,0.06)] transition-shadow hover:shadow-[0_18px_44px_rgba(25,28,29,0.1)] ${
                                    wide ? 'md:col-span-2' : ''
                                }`}
                            >
                                <span className="flex size-[50px] shrink-0 items-center justify-center rounded-[13px] bg-brand/8 text-brand">
                                    <Icon
                                        className="size-6"
                                        strokeWidth={1.6}
                                    />
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <h2 className="text-[1.125rem] font-bold tracking-[-0.01em] text-graphite">
                                            {title}
                                        </h2>
                                        <ExternalLink
                                            className="mt-[3px] size-[17px] shrink-0 text-pewter-faint"
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <p className="mt-[7px] mb-3 max-w-[680px] text-[0.875rem] leading-[1.6] text-pewter">
                                        {body}
                                    </p>
                                    <span className="text-[0.78rem] font-bold text-brand">
                                        {display}
                                    </span>
                                </div>
                            </a>
                        ),
                    )}
                </div>
                <p className="mt-5 text-[0.78rem] text-pewter-faint">
                    {
                        'External links are provided for convenience; MRC isn’t responsible for the content of third-party sites.'
                    }
                </p>
            </section>

            <section className="container-page pt-6 pb-[clamp(4rem,8vw,5.5rem)]">
                <CtaBand
                    title="Can't find what you're looking for?"
                    text="Ask us. Pointing facilities to the right reference is part of what we do every day."
                >
                    <Link href="/contact" className="cta cta-azure">
                        Contact us
                        <ArrowRight className="size-4" strokeWidth={2.4} />
                    </Link>
                </CtaBand>
            </section>
        </div>
    );
}
