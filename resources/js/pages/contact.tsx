import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { SubHero } from '@/components/sections';
import { CONTACT } from '@/lib/site';

const fieldClass =
    'rounded-[10px] border-[1.5px] border-line bg-paper px-[0.95rem] py-3 text-[0.98rem] text-ink transition-colors focus:border-teal focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,200,181,0.18)] focus:outline-none';
const labelClass = 'text-[0.88rem] font-semibold text-ink';

export default function Contact() {
    const [method, setMethod] = useState('Phone');

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const lines = [
            `Name: ${data.get('name') ?? ''}`,
            `Organization: ${data.get('organization') ?? ''}`,
            `Phone: ${data.get('phone') ?? ''}`,
            `Email: ${data.get('email') ?? ''}`,
            `Preferred contact: ${data.get('contact-method') ?? ''}`,
            `Best day/time: ${data.get('best-time') ?? ''}`,
            '',
            String(data.get('message') ?? ''),
        ];
        const subject = encodeURIComponent(
            'Inquiry from medreviewconsultants.com',
        );
        const body = encodeURIComponent(lines.join('\n'));
        window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    }

    return (
        <>
            <Head title="Contact">
                <meta
                    name="description"
                    content="Reach Medical Review Consultants in Bozeman, Montana — by phone, email, or the contact form. Primary contact: Chelsea Embry, RN, BSN."
                />
            </Head>

            <SubHero
                eyebrow="Contact"
                title={
                    <>
                        Let's{' '}
                        <em className="text-teal-bright not-italic">talk</em>
                    </>
                }
                lede="Questions about utilization review, a chart that needs an independent opinion, or a RAC letter you'd rather not face alone — we'd be glad to hear from you."
            />

            <section className="bg-paper py-[clamp(4rem,9vw,6.5rem)]">
                <div className="container-page grid items-start gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[5fr_7fr]">
                    {/* Contact details */}
                    <aside className="contact-card-bg reveal rounded-card p-[2.3rem_2rem] text-ice">
                        <h2 className="text-[1.55rem] text-white">
                            Reach us directly
                        </h2>
                        <p className="mt-2 text-[0.98rem] text-ice/75">
                            We're a small team, which means you talk to the
                            people who do the work.
                        </p>
                        <ul className="mt-7 grid list-none gap-[1.15rem] p-0">
                            <li className="flex items-start gap-[0.9rem]">
                                <Phone
                                    className="mt-[0.15rem] size-[1.3rem] shrink-0 text-teal-bright"
                                    strokeWidth={2}
                                />
                                <div>
                                    <strong className="block text-[0.8rem] font-semibold tracking-[0.12em] text-ice/55 uppercase">
                                        Phone
                                    </strong>
                                    <a
                                        href={CONTACT.phonePrimaryHref}
                                        className="font-medium text-ice no-underline hover:text-teal-bright"
                                    >
                                        {CONTACT.phonePrimary}
                                    </a>
                                    <br />
                                    <a
                                        href={CONTACT.phoneSecondaryHref}
                                        className="font-medium text-ice no-underline hover:text-teal-bright"
                                    >
                                        {CONTACT.phoneSecondary}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-[0.9rem]">
                                <Mail
                                    className="mt-[0.15rem] size-[1.3rem] shrink-0 text-teal-bright"
                                    strokeWidth={2}
                                />
                                <div>
                                    <strong className="block text-[0.8rem] font-semibold tracking-[0.12em] text-ice/55 uppercase">
                                        Email
                                    </strong>
                                    <a
                                        href={`mailto:${CONTACT.email}`}
                                        className="font-medium text-ice no-underline hover:text-teal-bright"
                                    >
                                        {CONTACT.email}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-[0.9rem]">
                                <MapPin
                                    className="mt-[0.15rem] size-[1.3rem] shrink-0 text-teal-bright"
                                    strokeWidth={2}
                                />
                                <div>
                                    <strong className="block text-[0.8rem] font-semibold tracking-[0.12em] text-ice/55 uppercase">
                                        Mail
                                    </strong>
                                    <span className="font-medium text-ice">
                                        {CONTACT.address[0]}
                                        <br />
                                        {CONTACT.address[1]}
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-8 flex items-center gap-4 border-t border-ice/15 pt-6">
                            <span className="grid size-[3.2rem] shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal to-teal-deep text-[1.05rem] font-bold text-navy-950">
                                CE
                            </span>
                            <div>
                                <strong className="block text-white">
                                    {CONTACT.person}
                                </strong>
                                <span className="text-[0.88rem] text-ice/65">
                                    Primary contact
                                </span>
                            </div>
                        </div>
                    </aside>

                    {/* Form */}
                    <div className="card reveal p-[clamp(1.6rem,3.5vw,2.4rem)]">
                        <h2 className="text-[1.55rem]">Send us a message</h2>
                        <p className="mt-2 mb-6 text-[0.98rem] text-muted">
                            Tell us a little about your facility and what you
                            need — we'll get back to you promptly.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="grid gap-[1.1rem] sm:grid-cols-2"
                            noValidate
                        >
                            <div className="flex flex-col gap-[0.4rem]">
                                <label className={labelClass} htmlFor="cf-name">
                                    Full name
                                </label>
                                <input
                                    className={fieldClass}
                                    id="cf-name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-[0.4rem]">
                                <label className={labelClass} htmlFor="cf-org">
                                    Facility / organization
                                </label>
                                <input
                                    className={fieldClass}
                                    id="cf-org"
                                    name="organization"
                                    type="text"
                                    autoComplete="organization"
                                />
                            </div>
                            <div className="flex flex-col gap-[0.4rem]">
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
                                />
                            </div>
                            <div className="flex flex-col gap-[0.4rem]">
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
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-[0.4rem]">
                                <span className={labelClass}>
                                    Preferred contact method
                                </span>
                                <div className="flex gap-6 pt-[0.3rem]">
                                    {['Phone', 'Email'].map((opt) => (
                                        <label
                                            key={opt}
                                            className="inline-flex cursor-pointer items-center gap-2 text-[0.95rem] font-medium"
                                        >
                                            <input
                                                type="radio"
                                                name="contact-method"
                                                value={opt}
                                                checked={method === opt}
                                                onChange={() => setMethod(opt)}
                                                className="size-[1.05rem] accent-teal-deep"
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-[0.4rem]">
                                <label className={labelClass} htmlFor="cf-time">
                                    Best day / time{' '}
                                    <small className="font-normal text-muted">
                                        (optional)
                                    </small>
                                </label>
                                <input
                                    className={fieldClass}
                                    id="cf-time"
                                    name="best-time"
                                    type="text"
                                    placeholder="e.g. weekday mornings"
                                />
                            </div>
                            <div className="flex flex-col gap-[0.4rem] sm:col-span-2">
                                <label
                                    className={labelClass}
                                    htmlFor="cf-message"
                                >
                                    Message
                                </label>
                                <textarea
                                    className={`${fieldClass} min-h-[8.5rem] resize-y`}
                                    id="cf-message"
                                    name="message"
                                    required
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:col-span-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Send Message
                                </button>
                                <p className="min-w-[14rem] flex-1 text-[0.86rem] text-muted">
                                    Submitting opens your email client with the
                                    message addressed to us — or write directly
                                    to{' '}
                                    <a
                                        href={`mailto:${CONTACT.email}`}
                                        className="font-semibold text-teal-deep"
                                    >
                                        {CONTACT.email}
                                    </a>
                                    .
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
