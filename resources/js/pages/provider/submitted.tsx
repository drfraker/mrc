import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import Seo from '@/components/seo';

export default function Submitted() {
    return (
        <>
            <Head title="Submission received" />
            <Seo
                title="Submission received"
                description="MRC received the de-identified provider intake submission."
            />
            <section className="hero-bg min-h-[72svh] pt-[clamp(8rem,16vh,11rem)] pb-16 text-ice">
                <div className="container-page max-w-3xl">
                    <div className="rounded-card border border-ice/15 bg-navy-900/75 p-8 shadow-lift backdrop-blur">
                        <CheckCircle2 className="size-10 text-teal-bright" />
                        <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-white">
                            Submission received
                        </h1>
                        <p className="mt-4 text-ice/80">
                            MRC received the de-identified review. A consultant
                            can now review the deterministic rule findings and
                            evidence gaps.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/" className="btn btn-ghost">
                                Return to MRC
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
