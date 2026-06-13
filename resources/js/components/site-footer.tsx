import { Link } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import { CONTACT, NAV_ITEMS, SERVICE_LINKS } from '@/lib/site';

export default function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-navy-950 pt-[clamp(3.2rem,7vw,4.8rem)] pb-7 text-[0.94rem] text-ice/70">
            <div className="container-page">
                <div className="grid gap-10 border-b border-ice/15 pb-10 md:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1.6fr]">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 text-ice no-underline"
                        >
                            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-teal to-teal-deep">
                                <ShieldCheck
                                    className="size-6 text-navy-950"
                                    strokeWidth={2}
                                />
                            </span>
                            <span className="font-display leading-tight">
                                <span className="block text-[1.08rem] font-bold">
                                    Medical Review Consultants
                                </span>
                                <span className="block font-sans text-[0.67rem] font-medium tracking-[0.22em] text-ice/60 uppercase">
                                    Bozeman, Montana
                                </span>
                            </span>
                        </Link>
                        <p className="mt-5 max-w-[22rem] text-[0.92rem]">
                            Consulting support for healthcare facilities serving
                            Medicare patients — utilization review, physician
                            peer review, RAC appeals, and staff education.
                        </p>
                    </div>

                    <nav aria-label="Footer navigation">
                        <h4 className="mb-4 font-sans text-[0.8rem] font-semibold tracking-[0.15em] text-ice/50 uppercase">
                            Navigate
                        </h4>
                        <ul className="grid list-none gap-[0.55rem] p-0">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-ice/80 no-underline hover:text-teal-bright"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h4 className="mb-4 font-sans text-[0.8rem] font-semibold tracking-[0.15em] text-ice/50 uppercase">
                            Services
                        </h4>
                        <ul className="grid list-none gap-[0.55rem] p-0">
                            {SERVICE_LINKS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-ice/80 no-underline hover:text-teal-bright"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-sans text-[0.8rem] font-semibold tracking-[0.15em] text-ice/50 uppercase">
                            Contact
                        </h4>
                        <ul className="grid list-none gap-[0.55rem] p-0">
                            <li>
                                <a
                                    href={CONTACT.phonePrimaryHref}
                                    className="text-ice/80 no-underline hover:text-teal-bright"
                                >
                                    {CONTACT.phonePrimary}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={CONTACT.phoneSecondaryHref}
                                    className="text-ice/80 no-underline hover:text-teal-bright"
                                >
                                    {CONTACT.phoneSecondary}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    className="text-ice/80 no-underline hover:text-teal-bright"
                                >
                                    {CONTACT.email}
                                </a>
                            </li>
                            <li>{CONTACT.address.join(', ')}</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between gap-2 pt-6 text-[0.84rem] text-ice/45">
                    <span>
                        © 2014–{year} Medical Review Consultants, LLC. All
                        rights reserved.
                    </span>
                    <span>
                        Serving skilled nursing facilities, Critical Access
                        Hospitals, and rural providers.
                    </span>
                </div>
            </div>
        </footer>
    );
}
