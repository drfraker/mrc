import { Kicker } from 'mrc';

// Small uppercase section label. Default brand tone sits on light surfaces; the
// azure tone is the lighter accent meant for dark bands. Shown both ways.
export const Default = () => (
    <div style={{ display: 'grid' }}>
        <div className="surface-light" style={{ padding: 28, background: '#ffffff' }}>
            <Kicker>What we do</Kicker>
        </div>
        <div
            style={{
                padding: 28,
                background: 'linear-gradient(160deg,#003b5c,#00263c)',
            }}
        >
            <Kicker tone="azure">Rooted in Montana</Kicker>
        </div>
    </div>
);
