import { ContourLines } from 'mrc';

// Decorative topographic contour lines, sized/positioned by the className you
// pass. The "hero" motif sits behind page heroes on light surfaces.
export const Default = () => (
    <div
        style={{
            position: 'relative',
            height: 320,
            width: '100%',
            overflow: 'hidden',
            background:
                'radial-gradient(120% 80% at 88% -6%,rgba(98,181,229,0.16),transparent 46%),#f8f9fa',
        }}
    >
        <ContourLines className="pointer-events-none absolute top-0 right-0 h-full w-[64%] opacity-60" />
    </div>
);
