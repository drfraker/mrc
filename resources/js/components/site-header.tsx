import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import MrcMark from '@/components/mrc-mark';
import { NAV_ITEMS } from '@/lib/site';

/* Primary nav links (Contact is rendered as the CTA, not a plain link). */
const NAV = NAV_ITEMS.filter((item) => item.href !== '/contact');

function Brand() {
    return (
        <Link href="/" className="flex items-center gap-[13px] no-underline">
            <span className="flex size-[42px] items-center justify-center rounded-[11px] bg-brand">
                <MrcMark className="size-[23px] text-azure" />
            </span>
            <span className="leading-[1.05]">
                <span className="block font-sans text-[1rem] font-extrabold tracking-[-0.02em] text-graphite">
                    Medical Review Consultants
                </span>
                <span className="mt-[2px] block font-sans text-[0.6875rem] font-semibold tracking-[0.13em] text-pewter-soft uppercase">
                    Medicare Review &amp; Compliance
                </span>
            </span>
        </Link>
    );
}

export default function SiteHeader() {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) =>
        href === '/' ? url === '/' : url.startsWith(href);

    return (
        <header className="sticky top-0 z-50 border-b border-brand/8 bg-white/85 backdrop-blur-xl">
            <div className="container-page flex h-[74px] items-center justify-between gap-6">
                <Brand />

                <nav
                    className="hidden items-center gap-1 lg:flex"
                    aria-label="Main navigation"
                >
                    {NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={
                                isActive(item.href) ? 'page' : undefined
                            }
                            className={`rounded-full px-[14px] py-[9px] text-[0.875rem] no-underline transition-colors ${
                                isActive(item.href)
                                    ? 'font-semibold text-brand'
                                    : 'font-medium text-pewter hover:bg-brand/5 hover:text-brand'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="ml-2 inline-flex items-center gap-2 rounded-full bg-brand px-[18px] py-[10px] text-[0.875rem] font-semibold text-white no-underline shadow-[0_10px_22px_rgba(0,59,92,0.18)] transition-transform hover:-translate-y-px"
                    >
                        Speak with a consultant
                        <ArrowRight className="size-[14px]" strokeWidth={2.2} />
                    </Link>
                </nav>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-label="Toggle navigation"
                    className="inline-flex rounded-xl border-[1.5px] border-brand/15 p-2 text-brand lg:hidden"
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
                        className="mb-3 flex flex-col gap-1 rounded-card border border-brand/10 bg-white p-3 shadow-[0_18px_44px_rgba(25,28,29,0.12)]"
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
                                className={`rounded-xl px-4 py-3 text-[0.95rem] no-underline ${
                                    isActive(item.href)
                                        ? 'bg-brand/8 font-semibold text-brand'
                                        : 'font-medium text-pewter hover:bg-brand/5'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setOpen(false)}
                            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-[0.95rem] font-semibold text-white no-underline"
                        >
                            Speak with a consultant
                            <ArrowRight
                                className="size-[1.05em]"
                                strokeWidth={2.2}
                            />
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
