import type { ReactNode } from 'react';

/* Small uppercase section label. tone="azure" for dark backgrounds. */
export function Kicker({
    children,
    tone = 'brand',
}: {
    children: ReactNode;
    tone?: 'brand' | 'azure';
}) {
    return (
        <span
            className={`font-sans text-[0.8rem] font-bold tracking-[0.2em] uppercase ${
                tone === 'azure' ? 'text-azure-soft' : 'text-brand'
            }`}
        >
            {children}
        </span>
    );
}

/* Decorative topographic contour lines (aria-hidden). */
export function ContourLines({
    className,
    variant = 'hero',
}: {
    className?: string;
    variant?: 'hero' | 'band';
}) {
    if (variant === 'band') {
        return (
            <svg
                viewBox="0 0 1100 280"
                preserveAspectRatio="none"
                aria-hidden="true"
                className={className}
            >
                <g
                    fill="none"
                    stroke="#62b5e5"
                    strokeWidth={1.3}
                    strokeOpacity={0.3}
                >
                    <path d="M0,220 C200,180 340,210 520,168 C720,122 900,150 1100,116" />
                    <path d="M0,250 C200,210 340,240 520,198 C720,152 900,180 1100,146" />
                    <path d="M0,190 C220,154 360,180 520,142 C720,110 900,128 1100,98" />
                </g>
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 720 360"
            preserveAspectRatio="none"
            aria-hidden="true"
            className={className}
        >
            <g
                fill="none"
                stroke="#62b5e5"
                strokeWidth={1.4}
                strokeOpacity={0.5}
            >
                <path d="M40,300 C200,250 320,288 470,236 C600,194 690,222 760,186" />
                <path d="M40,330 C200,280 320,318 470,266 C600,224 690,252 760,216" />
                <path d="M40,270 C210,224 320,256 460,212 C590,176 690,196 760,164" />
            </g>
        </svg>
    );
}

/* Compact light page hero for interior pages. `title` may include a
   <span className="text-brand"> for the emphasized phrase. `children`
   renders below the lede (e.g. anchor chips). */
export function PageHero({
    eyebrow,
    title,
    lede,
    children,
}: {
    eyebrow: string;
    title: ReactNode;
    lede: ReactNode;
    children?: ReactNode;
}) {
    return (
        <section className="relative overflow-hidden">
            <ContourLines className="pointer-events-none absolute top-0 right-0 hidden h-[120%] w-[54%] opacity-45 lg:block" />
            <div className="container-page relative pt-[clamp(2.25rem,5vw,3.75rem)] pb-[clamp(1.5rem,4vw,2.75rem)]">
                <Kicker>{eyebrow}</Kicker>
                <h1 className="mt-[14px] mb-[18px] max-w-[860px] text-[clamp(2rem,5vw,2.875rem)] leading-[1.07] font-extrabold tracking-[-0.028em] text-graphite">
                    {title}
                </h1>
                <p className="max-w-[680px] text-[1.125rem] leading-[1.7] text-pewter">
                    {lede}
                </p>
                {children}
            </div>
        </section>
    );
}

/* Dark CTA band. align="split" = heading left, actions right;
   align="center" = stacked and centered. Pass action buttons as children. */
export function CtaBand({
    title,
    text,
    children,
    align = 'split',
}: {
    title: string;
    text: ReactNode;
    children: ReactNode;
    align?: 'split' | 'center';
}) {
    return (
        <div className="relative overflow-hidden rounded-[24px] bg-[radial-gradient(110%_140%_at_88%_0%,rgba(98,181,229,0.24),transparent_50%),linear-gradient(150deg,#003b5c,#00263c)] px-[clamp(1.75rem,4vw,3rem)] py-[clamp(2.5rem,5vw,3.4rem)]">
            <ContourLines
                variant="band"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            />
            {align === 'center' ? (
                <div className="relative mx-auto max-w-[680px] text-center">
                    <h2 className="mb-[14px] text-[clamp(1.7rem,3.6vw,2.125rem)] leading-[1.16] font-extrabold tracking-[-0.025em] text-white">
                        {title}
                    </h2>
                    <p className="mb-7 text-[1.0625rem] leading-[1.65] text-[#cfe0ec]">
                        {text}
                    </p>
                    <div className="flex flex-wrap justify-center gap-[13px]">
                        {children}
                    </div>
                </div>
            ) : (
                <div className="relative flex flex-wrap items-center justify-between gap-8">
                    <div className="max-w-[620px]">
                        <h2 className="mb-[10px] text-[clamp(1.6rem,3.4vw,1.875rem)] leading-[1.18] font-extrabold tracking-[-0.025em] text-white">
                            {title}
                        </h2>
                        <p className="text-[1rem] leading-[1.6] text-[#cfe0ec]">
                            {text}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-[13px]">{children}</div>
                </div>
            )}
        </div>
    );
}

/* Green check + text, used in service feature lists. */
export function CheckRow({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-start gap-[11px]">
            <span className="mt-[2px] flex size-5 shrink-0 items-center justify-center rounded-full bg-[#10b981]/12">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0a7a4a"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-3"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </span>
            <span className="text-[0.9rem] leading-[1.5] text-graphite">
                {children}
            </span>
        </div>
    );
}
