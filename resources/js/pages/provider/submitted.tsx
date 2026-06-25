import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import Seo from '@/components/seo';

export default function Submitted() {
    return (
        <div className="surface-light bg-[radial-gradient(120%_70%_at_88%_-6%,rgba(98,181,229,0.16),transparent_46%),linear-gradient(180deg,#f8f9fa_0%,#ffffff_42%,#f8f9fa_100%)] text-graphite">
            <Head title="Submission received" />
            <Seo
                title="Submission received"
                description="MRC received the de-identified provider intake submission."
            />
            <section className="container-page flex min-h-[60svh] items-center py-[clamp(3rem,8vw,5rem)]">
                <div className="mx-auto w-full max-w-2xl rounded-[22px] bg-white p-[clamp(1.75rem,4vw,2.5rem)] shadow-[0_20px_60px_rgba(25,28,29,0.08)]">
                    <span className="flex size-16 items-center justify-center rounded-full bg-[#10b981]/12 text-[#0a7a4a]">
                        <CheckCircle2 className="size-9" strokeWidth={2} />
                    </span>
                    <h1 className="mt-5 text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.025em] text-graphite">
                        Submission received
                    </h1>
                    <p className="mt-4 text-[1rem] leading-[1.7] text-pewter">
                        MRC received the de-identified review. A consultant can
                        now review the deterministic rule findings and evidence
                        gaps.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/" className="cta cta-brand">
                            Return to MRC
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
