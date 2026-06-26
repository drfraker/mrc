import { PageHero } from 'mrc';

// Compact light hero for interior pages. The emphasized phrase in `title` is
// wrapped in a <span className="text-brand">.
export const Default = () => (
    <div className="surface-light" style={{ background: '#ffffff' }}>
        <PageHero
            eyebrow="Services"
            title={
                <>
                    Medicare support built around{' '}
                    <span className="text-brand">saved time and lower risk</span>
                </>
            }
            lede="Four focused services, one business case: avoid the cost of building this expertise alone while giving your staff current, practical guidance when Medicare decisions matter."
        />
    </div>
);
