import { Link, usePage } from '@inertiajs/react';
import MrcMark from '@/components/mrc-mark';
import { CONTACT, NAV_ITEMS } from '@/lib/site';

function useAdminHref() {
    const { props } = usePage();
    const auth = props.auth as { user?: unknown } | undefined;
    const currentTeam = props.currentTeam as
        | { slug?: string }
        | null
        | undefined;
    const href =
        auth?.user && currentTeam?.slug
            ? `/${currentTeam.slug}/dashboard`
            : '/login';

    return { href, signedIn: Boolean(auth?.user) };
}

export default function SiteFooter() {
    const year = new Date().getFullYear();
    const { href: adminHref, signedIn } = useAdminHref();

    return (
        <footer className="border-t border-brand/10 bg-[#f8f9fa] text-[0.875rem] text-pewter-soft">
            <div className="container-page grid gap-10 pt-[clamp(3rem,6vw,3.4rem)] pb-8 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
                <div>
                    <Link
                        href="/"
                        className="mb-4 inline-flex items-center gap-[13px] no-underline"
                    >
                        <span className="flex size-10 items-center justify-center rounded-[11px] bg-brand">
                            <MrcMark className="size-[22px] text-azure" />
                        </span>
                        <span className="leading-[1.05]">
                            <span className="block font-sans text-[0.9375rem] font-extrabold tracking-[-0.02em] text-graphite">
                                Medical Review Consultants
                            </span>
                            <span className="mt-[2px] block font-sans text-[0.6875rem] font-semibold tracking-[0.1em] text-pewter-soft uppercase">
                                Bozeman, Montana
                            </span>
                        </span>
                    </Link>
                    <p className="max-w-[21rem] text-[0.84rem] leading-[1.65] text-pewter-soft">
                        Medicare review support that helps healthcare facilities
                        reduce staff burden, protect reimbursement, and avoid
                        preventable compliance problems.
                    </p>
                </div>

                <nav aria-label="Footer navigation">
                    <h4 className="mb-[14px] font-sans text-[0.75rem] font-bold tracking-[0.14em] text-graphite uppercase">
                        Navigate
                    </h4>
                    <ul className="grid list-none gap-[10px] p-0">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-[0.875rem] text-pewter no-underline hover:text-brand"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <h4 className="mb-[14px] font-sans text-[0.75rem] font-bold tracking-[0.14em] text-graphite uppercase">
                        Contact
                    </h4>
                    <ul className="grid list-none gap-[10px] p-0">
                        <li>
                            <a
                                href={CONTACT.phonePrimaryHref}
                                className="text-[0.875rem] text-pewter no-underline hover:text-brand"
                            >
                                {CONTACT.phonePrimary}
                            </a>
                        </li>
                        <li>
                            <a
                                href={CONTACT.phoneSecondaryHref}
                                className="text-[0.875rem] text-pewter no-underline hover:text-brand"
                            >
                                {CONTACT.phoneSecondary}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`mailto:${CONTACT.email}`}
                                className="text-[0.875rem] text-pewter no-underline hover:text-brand"
                            >
                                {CONTACT.email}
                            </a>
                        </li>
                        <li className="text-[0.875rem] text-pewter-soft">
                            {CONTACT.address.join(', ')}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container-page pb-10">
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand/10 pt-[22px] text-[0.78rem] text-pewter-faint">
                    <span>
                        © 2014–{year} Medical Review Consultants, LLC. All
                        rights reserved. Helping skilled nursing facilities,
                        Critical Access Hospitals, and rural providers keep
                        Medicare work current.
                    </span>
                    <Link
                        href={adminHref}
                        className="text-pewter-faint no-underline hover:text-brand"
                    >
                        {signedIn ? 'Dashboard' : 'Admin login'}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
