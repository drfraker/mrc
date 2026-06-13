import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';

/* Persistent chrome + scroll-reveal observer that re-scans on navigation. */
export default function SiteLayout({ children }: { children: ReactNode }) {
    const { component } = usePage();

    useEffect(() => {
        const els = Array.from(
            document.querySelectorAll<HTMLElement>('.reveal'),
        );

        if (!els.length) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            els.forEach((el) => el.classList.add('is-visible'));

            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
        );
        els.forEach((el) => io.observe(el));

        return () => io.disconnect();
    }, [component]);

    return (
        <>
            <a
                href="#main"
                className="absolute top-0 left-[-9999px] z-200 rounded-br-xl bg-teal px-5 py-3 font-semibold text-navy-950 focus:left-0"
            >
                Skip to content
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
        </>
    );
}
