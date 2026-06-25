import type { SVGProps } from 'react';

/*
 * The two-stroke "review wave" brand mark used in the light (redesigned)
 * chrome. Strokes inherit currentColor, so set the color with a text-* class.
 */
export default function MrcMark({
    className,
    ...props
}: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
            {...props}
        >
            <path d="M3 15 C6 11, 9 13, 12 9 C15 5, 18 7, 21 4" />
            <path d="M3 19 C6 15, 9 17, 12 13 C15 9, 18 11, 21 8" />
        </svg>
    );
}
