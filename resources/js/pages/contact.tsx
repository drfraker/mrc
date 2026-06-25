import {
    ArrowRight,
    Check,
    ChevronDown,
    Mail,
    MapPin,
    Phone,
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, FormEvent } from 'react';
import { PageHero } from '@/components/sections';
import Seo, { breadcrumbSchema } from '@/components/seo';
import { CONTACT } from '@/lib/site';

const fieldClass =
    'w-full rounded-[10px] border border-[#e0e3e8] bg-white px-[14px] py-3 text-[0.9rem] text-graphite transition-colors placeholder:text-[#9aa0ac] focus:border-brand focus:shadow-[0_0_0_3px_rgba(0,59,92,0.12)] focus:outline-none';
const labelClass = 'mb-[7px] block text-[0.8125rem] font-semibold text-pewter';

const NEEDS = [
    'Medicare Utilization Review',
    'Physician Peer Review',
    'RAC Appeals Assistance',
    'Staff Education & Support',
    'Not sure yet — help me scope it',
];

const REACH: {
    icon: ComponentType<{ className?: string; strokeWidth?: number }>;
    label: string;
    value: string;
    href: string | null;
}[] = [
    {
        icon: Phone,
        label: 'Phone',
        value: CONTACT.phonePrimary,
        href: CONTACT.phonePrimaryHref,
    },
    {
        icon: Phone,
        label: 'Alternate',
        value: CONTACT.phoneSecondary,
        href: CONTACT.phoneSecondaryHref,
    },
    {
        icon: Mail,
        label: 'Email',
        value: CONTACT.email,
        href: `mailto:${CONTACT.email}`,
    },
    {
        icon: MapPin,
        label: 'Mail',
        value: CONTACT.address.join(', '),
        href: null,
    },
];

const NEXT_STEPS = [
    'A consultant replies within one business day.',
    'We talk through where your time and risk sit today.',
    'You get a right-sized recommendation — no obligation.',
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const lines = [
            `Name: ${data.get('name') ?? ''}`,
            `Facility: ${data.get('facility') ?? ''}`,
            `Email: ${data.get('email') ?? ''}`,
            `Phone: ${data.get('phone') ?? ''}`,
            `Need: ${data.get('need') ?? ''}`,
            '',
            String(data.get('message') ?? ''),
        ];
        const subject = encodeURIComponent(
            'Inquiry from medreviewconsultants.com',
        );
        const body = encodeURIComponent(lines.join('\n'));
        window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
        setSubmitted(true);
    }

    return (
        <div className="surface-light bg-[radial-gradient(120%_70%_at_88%_-6%,rgba(98,181,229,0.16),transparent_46%),linear-gradient(180deg,#f8f9fa_0%,#ffffff_42%,#f8f9fa_100%)] text-graphite">
            <Seo
                title="Contact Medicare Review Consultants in Bozeman, Montana"
                description="Contact MRC for Medicare utilization review, compliance consulting, physician peer review, RAC appeals, and staff education for rural healthcare facilities."
                path="/contact"
                image="/images/montana.jpg"
                jsonLd={breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Contact', path: '/contact' },
                ])}
            />

            <PageHero
                eyebrow="Contact"
                title={
                    <>
                        Tell us what your facility is carrying. We&rsquo;ll help
                        you <span className="text-brand">lighten it</span>.
                    </>
                }
                lede="Reach out for a no-pressure conversation about utilization review, peer review, appeals, or staff education — and where MRC could save your team the most time."
            />

            <section className="container-page grid items-start gap-9 pt-[clamp(1rem,3vw,1.75rem)] pb-[clamp(4rem,8vw,5.5rem)] lg:grid-cols-[1.25fr_0.9fr]">
                {/* Form */}
                <div className="rounded-[22px] bg-white p-[clamp(1.5rem,3vw,2.25rem)] shadow-[0_20px_60px_rgba(25,28,29,0.08)]">
                    {submitted ? (
                        <div className="flex flex-col items-center px-3 py-9 text-center">
                            <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-[#10b981]/12 text-[#0a7a4a]">
                                <Check className="size-8" strokeWidth={2.4} />
                            </span>
                            <h2 className="mb-[10px] text-[1.375rem] font-extrabold tracking-[-0.02em] text-graphite">
                                Thanks — we&rsquo;ll be in touch.
                            </h2>
                            <p className="mb-[22px] max-w-[380px] text-[0.94rem] leading-[1.65] text-pewter">
                                A consultant will reach out within one business
                                day. Need to talk sooner? Call{' '}
                                <a
                                    href={CONTACT.phonePrimaryHref}
                                    className="font-bold text-brand no-underline"
                                >
                                    {CONTACT.phonePrimary}
                                </a>
                                .
                            </p>
                            <button
                                type="button"
                                onClick={() => setSubmitted(false)}
                                className="rounded-[10px] border border-brand/15 bg-white px-5 py-[11px] text-[0.875rem] font-semibold text-brand"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <h2 className="mb-[22px] text-[1.3125rem] font-extrabold tracking-[-0.02em] text-graphite">
                                Send us a message
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        className={labelClass}
                                        htmlFor="cf-name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className={fieldClass}
                                        id="cf-name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Jane Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        className={labelClass}
                                        htmlFor="cf-facility"
                                    >
                                        Facility
                                    </label>
                                    <input
                                        className={fieldClass}
                                        id="cf-facility"
                                        name="facility"
                                        type="text"
                                        autoComplete="organization"
                                        placeholder="Facility or organization"
                                    />
                                </div>
                                <div>
                                    <label
                                        className={labelClass}
                                        htmlFor="cf-email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className={fieldClass}
                                        id="cf-email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@facility.org"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        className={labelClass}
                                        htmlFor="cf-phone"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        className={fieldClass}
                                        id="cf-phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="(406) 000-0000"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        className={labelClass}
                                        htmlFor="cf-need"
                                    >
                                        What do you need help with?
                                    </label>
                                    <div className="relative">
                                        <select
                                            className={`${fieldClass} appearance-none pr-10`}
                                            id="cf-need"
                                            name="need"
                                            defaultValue={NEEDS[0]}
                                        >
                                            {NEEDS.map((n) => (
                                                <option key={n} value={n}>
                                                    {n}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown
                                            className="pointer-events-none absolute top-1/2 right-[14px] size-4 -translate-y-1/2 text-pewter-soft"
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        className={labelClass}
                                        htmlFor="cf-message"
                                    >
                                        How can we help?
                                    </label>
                                    <textarea
                                        className={`${fieldClass} min-h-[8rem] resize-y leading-[1.6]`}
                                        id="cf-message"
                                        name="message"
                                        rows={4}
                                        placeholder="Tell us a little about what your team is dealing with…"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="cta cta-brand"
                                    >
                                        Send message
                                        <ArrowRight
                                            className="size-4"
                                            strokeWidth={2.2}
                                        />
                                    </button>
                                    <p className="mt-4 text-[0.78rem] text-pewter-faint">
                                        We use your information only to respond
                                        to your inquiry. No marketing lists.
                                    </p>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-4">
                    <div className="rounded-[18px] bg-white p-[26px] shadow-[0_1px_3px_rgba(25,28,29,0.06)]">
                        <div className="mb-[18px] text-[0.75rem] font-bold tracking-[0.16em] text-pewter-soft uppercase">
                            Reach us directly
                        </div>
                        <div className="flex flex-col gap-4">
                            {REACH.map(({ icon: Icon, label, value, href }) => {
                                const inner = (
                                    <>
                                        <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[11px] bg-brand/8 text-brand">
                                            <Icon
                                                className="size-5"
                                                strokeWidth={1.8}
                                            />
                                        </span>
                                        <span>
                                            <span className="block text-[0.6875rem] font-semibold tracking-[0.08em] text-pewter-faint uppercase">
                                                {label}
                                            </span>
                                            <span className="block text-[0.97rem] font-bold text-graphite">
                                                {value}
                                            </span>
                                        </span>
                                    </>
                                );

                                return href ? (
                                    <a
                                        key={label}
                                        href={href}
                                        className="flex items-center gap-[14px] no-underline"
                                    >
                                        {inner}
                                    </a>
                                ) : (
                                    <div
                                        key={label}
                                        className="flex items-center gap-[14px]"
                                    >
                                        {inner}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[18px] bg-[radial-gradient(120%_120%_at_12%_0%,rgba(98,181,229,0.2),transparent_56%),linear-gradient(160deg,#003b5c,#00263c)] p-[26px] text-white">
                        <svg
                            viewBox="0 0 400 200"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
                        >
                            <g
                                fill="none"
                                stroke="#62b5e5"
                                strokeWidth={1.2}
                                strokeOpacity={0.3}
                            >
                                <path d="M0,150 C80,124 140,142 220,116 C300,92 350,108 400,90" />
                                <path d="M0,172 C80,146 140,164 220,138 C300,114 350,130 400,112" />
                                <path d="M0,128 C90,104 150,120 220,98 C300,76 350,90 400,74" />
                            </g>
                        </svg>
                        <div className="relative">
                            <div className="mb-[14px] text-[0.75rem] font-bold tracking-[0.16em] text-azure-soft uppercase">
                                What happens next
                            </div>
                            <div className="flex flex-col gap-3">
                                {NEXT_STEPS.map((step, idx) => (
                                    <div
                                        key={step}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-azure/20 text-[0.75rem] font-extrabold text-azure-soft">
                                            {idx + 1}
                                        </span>
                                        <span className="text-[0.875rem] leading-[1.5] text-[#eaf2f8]">
                                            {step}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
