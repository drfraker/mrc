import { Head } from '@inertiajs/react';
import { CONTACT } from '@/lib/site';

const SITE_NAME = 'Medical Review Consultants';
const SITE_URL =
    (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
    'https://www.medreviewconsultants.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/working.png`;

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

type SeoProps = {
    title: string;
    description: string;
    path?: string;
    image?: string;
    type?: 'website' | 'article';
    jsonLd?: JsonLd;
};

function absoluteUrl(path = '/') {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${SITE_URL}${normalizedPath}`;
}

function imageUrl(image?: string) {
    if (!image) {
        return DEFAULT_IMAGE;
    }

    return image.startsWith('http') ? image : absoluteUrl(image);
}

function baseOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        image: DEFAULT_IMAGE,
        telephone: CONTACT.phonePrimary,
        email: CONTACT.email,
        founder: CONTACT.person,
        address: {
            '@type': 'PostalAddress',
            postOfficeBoxNumber: CONTACT.address[0].replace('PO Box ', ''),
            addressLocality: 'Bozeman',
            addressRegion: 'MT',
            postalCode: '59771',
            addressCountry: 'US',
        },
        areaServed: [
            'Montana',
            'Rural healthcare facilities',
            'Skilled nursing facilities',
            'Critical Access Hospitals',
        ],
        knowsAbout: [
            'Medicare compliance consulting',
            'Medicare Part A utilization review',
            'Skilled nursing facility Medicare review',
            'RAC appeals assistance',
            'Physician peer review',
            'MDS scheduling',
            'SNF Consolidated Billing',
        ],
    };
}

function webPageSchema(title: string, description: string, url: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        publisher: {
            '@id': `${SITE_URL}/#organization`,
        },
    };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

export function serviceListSchema() {
    const services = [
        {
            name: 'Medicare Part A Utilization Review',
            path: '/services#utilization-review',
            description:
                'Weekly skilled-patient Medicare Part A utilization review for coverage decisions, notices, discharge abstracts, MDS schedules, and payment classification guidance.',
        },
        {
            name: 'Physician Peer Review',
            path: '/services#peer-review',
            description:
                'Independent physician peer review for Inpatient, Emergency Department, and Office Visit charts, including support for Critical Access Hospitals and rural providers.',
        },
        {
            name: 'RAC Appeals Assistance',
            path: '/services#rac-appeals',
            description:
                'Recovery Audit Contractor appeal consulting, claim viability analysis, and appeal strategy for Medicare reimbursement disputes.',
        },
        {
            name: 'Medicare Staff Education and Support',
            path: '/services#education',
            description:
                'Ongoing Medicare education and consultant access for MDS scheduling, SNF Consolidated Billing, payment classification, and coverage criteria.',
        },
    ];

    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: services.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Service',
                name: service.name,
                url: absoluteUrl(service.path),
                description: service.description,
                provider: {
                    '@id': `${SITE_URL}/#organization`,
                },
                areaServed: 'United States',
                serviceType: service.name,
            },
        })),
    };
}

export default function Seo({
    title,
    description,
    path = '/',
    image,
    type = 'website',
    jsonLd,
}: SeoProps) {
    const canonicalUrl = absoluteUrl(path);
    const ogImage = imageUrl(image);
    const schemas = [
        baseOrganizationSchema(),
        webPageSchema(title, description, canonicalUrl),
        ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
    ];

    return (
        <Head title={title}>
            <meta
                head-key="description"
                name="description"
                content={description}
            />
            <link head-key="canonical" rel="canonical" href={canonicalUrl} />

            <meta head-key="og:type" property="og:type" content={type} />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content={SITE_NAME}
            />
            <meta head-key="og:title" property="og:title" content={title} />
            <meta
                head-key="og:description"
                property="og:description"
                content={description}
            />
            <meta head-key="og:url" property="og:url" content={canonicalUrl} />
            <meta head-key="og:image" property="og:image" content={ogImage} />
            <meta head-key="og:locale" property="og:locale" content="en_US" />

            <meta
                head-key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                head-key="twitter:title"
                name="twitter:title"
                content={title}
            />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={description}
            />
            <meta
                head-key="twitter:image"
                name="twitter:image"
                content={ogImage}
            />

            <script
                head-key="json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
        </Head>
    );
}
