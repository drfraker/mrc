import { Head, Link } from '@inertiajs/react';
import { Building2, ClipboardCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type CaseRow = {
    uuid: string;
    facilityName: string;
    facilityState: string;
    reviewType: string;
    status: string;
    patientReferenceCode: string | null;
    submittedAt: string | null;
    findingCounts: {
        pass: number;
        risk: number;
        unknown: number;
        needs_review: number;
    };
};

type Paginator<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

const statusLabel: Record<string, string> = {
    submitted: 'Submitted',
    needs_information: 'Needs information',
    reviewed: 'Reviewed',
    finalized: 'Finalized',
    archived: 'Archived',
};

export default function ReviewIndex({
    cases,
    currentTeamSlug,
}: {
    cases: Paginator<CaseRow>;
    currentTeamSlug: string;
}) {
    return (
        <>
            <Head title="Compliance Reviews" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Compliance reviews
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                            De-identified provider submissions with
                            deterministic Medicare Part A SNF rule findings.
                        </p>
                    </div>
                    <Link
                        href={`/${currentTeamSlug}/facilities`}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        <Building2 className="size-4" />
                        Facilities
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardCheck className="size-5" />
                            Submitted cases
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {cases.data.length === 0 ? (
                            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                                No provider submissions yet.
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-lg border">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/60 text-left">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">
                                                Facility
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Review
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Findings
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Submitted
                                            </th>
                                            <th className="px-4 py-3 font-medium" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cases.data.map((caseRecord) => (
                                            <tr
                                                key={caseRecord.uuid}
                                                className="border-t align-top"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="font-medium">
                                                        {
                                                            caseRecord.facilityName
                                                        }
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {
                                                            caseRecord.facilityState
                                                        }
                                                        {caseRecord.patientReferenceCode
                                                            ? ` · ${caseRecord.patientReferenceCode}`
                                                            : ''}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 capitalize">
                                                    {caseRecord.reviewType.replace(
                                                        '_',
                                                        ' ',
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-wrap gap-1.5 text-xs">
                                                        <Badge tone="green">
                                                            {
                                                                caseRecord
                                                                    .findingCounts
                                                                    .pass
                                                            }{' '}
                                                            pass
                                                        </Badge>
                                                        <Badge tone="red">
                                                            {
                                                                caseRecord
                                                                    .findingCounts
                                                                    .risk
                                                            }{' '}
                                                            risk
                                                        </Badge>
                                                        <Badge tone="gray">
                                                            {
                                                                caseRecord
                                                                    .findingCounts
                                                                    .unknown
                                                            }{' '}
                                                            unknown
                                                        </Badge>
                                                        <Badge tone="amber">
                                                            {
                                                                caseRecord
                                                                    .findingCounts
                                                                    .needs_review
                                                            }{' '}
                                                            review
                                                        </Badge>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {statusLabel[
                                                        caseRecord.status
                                                    ] ?? caseRecord.status}
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {caseRecord.submittedAt ??
                                                        'Unknown'}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <Link
                                                        href={`/${currentTeamSlug}/reviews/${caseRecord.uuid}`}
                                                        className="font-medium text-primary underline-offset-4 hover:underline"
                                                    >
                                                        Open
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {cases.links.length > 3 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {cases.links.map((link, index) => (
                                    <Link
                                        key={`${link.label}-${index}`}
                                        href={link.url ?? '#'}
                                        className={`rounded-md border px-3 py-1.5 text-sm ${link.active ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'} ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function Badge({
    tone,
    children,
}: {
    tone: 'green' | 'red' | 'gray' | 'amber';
    children: ReactNode;
}) {
    const classes = {
        green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        red: 'border-red-200 bg-red-50 text-red-700',
        gray: 'border-slate-200 bg-slate-50 text-slate-700',
        amber: 'border-amber-200 bg-amber-50 text-amber-700',
    }[tone];

    return (
        <span className={`rounded-full border px-2 py-0.5 ${classes}`}>
            {children}
        </span>
    );
}

ReviewIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Compliance reviews',
            href: props.currentTeam
                ? `/${props.currentTeam.slug}/reviews`
                : '/',
        },
    ],
});
