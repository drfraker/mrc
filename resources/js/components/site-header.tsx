import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    LogIn,
    Menu,
    Phone,
    ShieldCheck,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { CONTACT, NAV_ITEMS } from '@/lib/site';

function Brand() {
    return (
        <Link
            href="/"
            className="group inline-flex items-center gap-3 text-ice no-underline"
        >
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-teal to-teal-deep shadow-[0_4px_14px_rgba(46,200,181,0.35)]">
                <ShieldCheck className="size-6 text-navy-950" strokeWidth={2} />
            </span>
            <span className="font-display leading-tight">
                <span className="block text-[1.08rem] font-bold tracking-tight">
                    Medical Review Consultants
                </span>
                <span className="block font-sans text-[0.67rem] font-medium tracking-[0.22em] text-ice/60 uppercase">
                    Medicare Review &amp; Compliance
                </span>
            </span>
        </Link>
    );
}

export default function SiteHeader() {
    const { url, props } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const auth = props.auth as { user?: unknown } | undefined;
    const currentTeam = props.currentTeam as
        | { slug?: string }
        | null
        | undefined;
    const consultantHref =
        auth?.user && currentTeam?.slug
            ? `/${currentTeam.slug}/dashboard`
            : '/login';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isActive = (href: string) =>
        href === '/' ? url === '/' : url.startsWith(href);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-100 border-b transition-colors duration-300 ${
                scrolled
                    ? 'border-ice/15 bg-navy-900/90 backdrop-blur-md'
                    : 'border-transparent'
            }`}
        >
            <div className="container-page flex items-center justify-between gap-6 py-[0.9rem]">
                <Brand />

                <nav
                    className="hidden items-center gap-1 lg:flex"
                    aria-label="Main navigation"
                >
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={
                                isActive(item.href) ? 'page' : undefined
                            }
                            className={`rounded-full px-[0.85rem] py-2 text-[0.95rem] font-medium no-underline transition-colors ${
                                isActive(item.href)
                                    ? 'bg-teal/12 text-teal-bright'
                                    : 'text-ice/85 hover:bg-ice/10 hover:text-white'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-2 lg:flex">
                    <Link
                        href={consultantHref}
                        className="inline-flex items-center gap-2 rounded-full border border-ice/25 px-4 py-2 text-[0.92rem] font-semibold text-ice no-underline transition-colors hover:border-teal-bright hover:text-teal-bright"
                    >
                        {auth?.user ? (
                            <LayoutDashboard
                                className="size-[1.05em]"
                                strokeWidth={2}
                            />
                        ) : (
                            <LogIn className="size-[1.05em]" strokeWidth={2} />
                        )}
                        {auth?.user ? 'Dashboard' : 'Consultant Login'}
                    </Link>
                    <a
                        href={CONTACT.phonePrimaryHref}
                        className="btn btn-primary whitespace-nowrap"
                    >
                        <Phone className="size-[1.05em]" strokeWidth={2} />
                        {CONTACT.phonePrimary}
                    </a>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-label="Toggle navigation"
                    className="inline-flex rounded-xl border-[1.5px] border-ice/40 p-2 text-ice lg:hidden"
                >
                    {open ? (
                        <X className="size-6" />
                    ) : (
                        <Menu className="size-6" />
                    )}
                </button>
            </div>

            {open && (
                <div className="container-page lg:hidden">
                    <nav
                        className="mb-3 flex flex-col gap-1 rounded-card border border-ice/15 bg-navy-900 p-3 shadow-lift"
                        aria-label="Mobile navigation"
                    >
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                aria-current={
                                    isActive(item.href) ? 'page' : undefined
                                }
                                className={`rounded-xl px-4 py-3 text-[0.95rem] font-medium no-underline ${
                                    isActive(item.href)
                                        ? 'bg-teal/12 text-teal-bright'
                                        : 'text-ice/85 hover:bg-ice/10'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href={consultantHref}
                            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-ice/20 px-4 py-3 text-[0.95rem] font-semibold text-ice no-underline"
                            onClick={() => setOpen(false)}
                        >
                            {auth?.user ? (
                                <LayoutDashboard
                                    className="size-[1.05em]"
                                    strokeWidth={2}
                                />
                            ) : (
                                <LogIn
                                    className="size-[1.05em]"
                                    strokeWidth={2}
                                />
                            )}
                            {auth?.user ? 'Dashboard' : 'Consultant Login'}
                        </Link>
                        <a
                            href={CONTACT.phonePrimaryHref}
                            className="btn btn-primary mt-2 justify-center"
                            onClick={() => setOpen(false)}
                        >
                            <Phone className="size-[1.05em]" strokeWidth={2} />
                            {CONTACT.phonePrimary}
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
