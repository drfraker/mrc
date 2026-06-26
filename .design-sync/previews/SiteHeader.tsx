import { SiteHeader } from 'mrc';

// Sticky top navigation: brand lockup, nav links, and the "Speak with a
// consultant" CTA. Rendered on the light page background it sits on; captured
// wide so the desktop nav (lg breakpoint) shows instead of the mobile menu.
export const Default = () => (
    <div style={{ background: '#f8f9fa', minHeight: 160 }}>
        <SiteHeader />
    </div>
);
