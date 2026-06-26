import { CheckRow } from 'mrc';

// Green-check feature row, used in service feature lists on light surfaces.
export const Default = () => (
    <div
        className="surface-light"
        style={{
            padding: 28,
            background: '#ffffff',
            display: 'grid',
            gap: 12,
            maxWidth: 560,
        }}
    >
        <CheckRow>Weekly Medicare Part A utilization review</CheckRow>
        <CheckRow>
            Independent physician review without the scheduling burden
        </CheckRow>
        <CheckRow>
            Ongoing education that keeps your team aligned as standards change
        </CheckRow>
    </div>
);
