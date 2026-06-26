import { SiteLayout, PageHero, CtaBand, CheckRow, Kicker } from 'mrc';

// Full page shell: sticky SiteHeader + main content + SiteFooter. This is the
// template the design agent composes new MRC pages from — shown here with a
// realistic interior page (hero, a check-list section, and a centered CTA band).
export const Page = () => (
    <SiteLayout>
        <div className="surface-light">
            <PageHero
                eyebrow="Services"
                title={
                    <>
                        Medicare support built around{' '}
                        <span className="text-brand">
                            saved time and lower risk
                        </span>
                    </>
                }
                lede="Four focused services, one business case: avoid the cost of building this expertise alone while giving your staff current, practical guidance when Medicare decisions matter."
            />

            <section className="container-page py-[clamp(3rem,6vw,4.5rem)]">
                <div className="mb-8 max-w-[640px]">
                    <Kicker>Why MRC</Kicker>
                    <h2 className="mt-3 font-sans text-[clamp(1.6rem,3.4vw,2rem)] font-extrabold tracking-[-0.025em] text-graphite">
                        What your facility no longer has to carry alone
                    </h2>
                </div>
                <div className="grid max-w-[640px] gap-3">
                    <CheckRow>
                        Weekly Medicare Part A utilization review
                    </CheckRow>
                    <CheckRow>
                        Independent physician review without the scheduling
                        burden
                    </CheckRow>
                    <CheckRow>
                        Ongoing education that keeps your team aligned as
                        standards change
                    </CheckRow>
                </div>
            </section>

            <section className="container-page pb-[clamp(4rem,8vw,5.5rem)]">
                <CtaBand
                    align="center"
                    title="Want to compare MRC with doing this in-house?"
                    text="We'll help you think through the cost of staff time, training, compliance exposure, and appeal risk."
                >
                    <a href="#" className="cta cta-azure">
                        Contact us
                    </a>
                    <a href="#" className="cta cta-dark-ghost">
                        Call 406.219.3366
                    </a>
                </CtaBand>
            </section>
        </div>
    </SiteLayout>
);
