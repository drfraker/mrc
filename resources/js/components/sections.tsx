import type { ReactNode } from 'react';
import HeroScene from '@/components/hero-scene';

export function Eyebrow({
    children,
    bright = false,
}: {
    children: ReactNode;
    bright?: boolean;
}) {
    return (
        <p className={`eyebrow mb-[1.1rem] ${bright ? 'eyebrow-bright' : ''}`}>
            {children}
        </p>
    );
}

/* Short hero used on interior pages. */
export function SubHero({
    eyebrow,
    title,
    lede,
}: {
    eyebrow: string;
    title: ReactNode;
    lede: ReactNode;
}) {
    return (
        <section className="hero-bg hero-floor relative flex items-center overflow-hidden pt-[clamp(8rem,15vh,10.5rem)] pb-[clamp(3rem,7vh,4.5rem)] text-ice">
            <HeroScene />
            <div className="container-page relative z-2">
                <div className="max-w-[44rem]">
                    <Eyebrow bright>{eyebrow}</Eyebrow>
                    <h1 className="mb-[0.45em] text-[clamp(2.2rem,5vw,3.4rem)] font-bold text-white">
                        {title}
                    </h1>
                    <p className="max-w-[40rem] text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.7] text-ice/80">
                        {lede}
                    </p>
                </div>
            </div>
        </section>
    );
}

export function CtaBand({
    title,
    text,
    children,
}: {
    title: string;
    text: string;
    children: ReactNode;
}) {
    return (
        <div className="cta-band reveal flex flex-wrap items-center justify-between gap-x-10 gap-y-6 overflow-hidden rounded-card p-[clamp(2.6rem,6vw,4rem)] text-ice">
            <div>
                <h2 className="mb-[0.3em] text-[clamp(1.6rem,3vw,2.2rem)] text-white">
                    {title}
                </h2>
                <p className="max-w-[34rem] text-ice/80">{text}</p>
            </div>
            <div className="flex flex-wrap gap-[0.9rem]">{children}</div>
        </div>
    );
}

export function CheckItem({ children }: { children: ReactNode }) {
    return (
        <li className="flex items-start gap-[0.7rem] text-[0.99rem]">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-[0.18rem] size-5 shrink-0 text-teal-deep"
            >
                <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>{children}</span>
        </li>
    );
}
