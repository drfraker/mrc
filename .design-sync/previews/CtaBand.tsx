import { CtaBand } from 'mrc';

// Dark call-to-action band, shown in the centered layout used at the foot of the
// home page. Pass align="split" for a heading-left / actions-right layout.
export const Default = () => (
    <div
        className="surface-light"
        style={{ padding: 28, background: '#f8f9fa' }}
    >
        <CtaBand
            align="center"
            title="Want to compare MRC with doing this in-house?"
            text="We'll help you think through the cost of staff time, training, compliance exposure, and appeal risk — so you can choose the right level of support."
        >
            <a href="#" className="cta cta-azure">
                Contact us
            </a>
            <a href="#" className="cta cta-dark-ghost">
                Call 406.219.3366
            </a>
        </CtaBand>
    </div>
);
