import { MrcMark } from 'mrc';

// The two-stroke "review wave" brand mark. Strokes inherit currentColor, so its
// color is set with a text-* class. Shown in the header lockup (azure mark on a
// deep-ocean tile) and standalone in brand color.
export const Default = () => (
    <div
        style={{
            padding: 40,
            background: '#f8f9fa',
            display: 'flex',
            gap: 24,
            alignItems: 'center',
        }}
    >
        <span
            style={{
                display: 'flex',
                width: 56,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 14,
                background: 'var(--color-brand)',
            }}
        >
            <MrcMark className="text-azure" style={{ width: 30, height: 30 }} />
        </span>
        <MrcMark className="text-brand" style={{ width: 40, height: 40 }} />
    </div>
);
