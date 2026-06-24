import { Head, Link, usePage } from '@inertiajs/react';
import { Building2, ClipboardCheck, Inbox, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import PendingInvitationsModal from '@/components/pending-invitations-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';
import type { DashboardInvitation } from '@/types';

type RecentCase = {
    uuid: string;
    facilityName: string;
    reviewType: string;
    status: string;
    submittedAt: string | null;
};

type Props = {
    pendingInvitations?: DashboardInvitation[];
    caseCounts: {
        submitted: number;
        needsInformation: number;
        reviewed: number;
        finalized: number;
    };
    recentCases: RecentCase[];
};

const statusLabel: Record<string, string> = {
    submitted: 'Submitted',
    needs_information: 'Needs info',
    reviewed: 'Reviewed',
    finalized: 'Finalized',
    archived: 'Archived',
};

export default function Dashboard({
    pendingInvitations = [],
    caseCounts,
    recentCases,
}: Props) {
    const [showInvitations, setShowInvitations] = useState(
        pendingInvitations.length > 0,
    );
    const { props } = usePage();
    const currentTeam = props.currentTeam as { slug?: string } | null;
    const reviewsUrl = currentTeam?.slug ? `/${currentTeam.slug}/reviews` : '/';
    const facilitiesUrl = currentTeam?.slug
        ? `/${currentTeam.slug}/facilities`
        : '/';

    return (
        <>
            <Head title="Dashboard" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Compliance dashboard
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                            Review de-identified provider submissions, rule
                            findings, evidence gaps, and consultant draft
                            reports.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={facilitiesUrl}
                            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
                        >
                            <Building2 className="size-4" />
                            Facilities
                        </Link>
                        <Link
                            href={reviewsUrl}
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            <ClipboardCheck className="size-4" />
                            View reviews
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Metric
                        title="Submitted"
                        value={caseCounts.submitted}
                        icon={Inbox}
                    />
                    <Metric
                        title="Needs information"
                        value={caseCounts.needsInformation}
                        icon={TriangleAlert}
                    />
                    <Metric
                        title="Reviewed"
                        value={caseCounts.reviewed}
                        icon={ClipboardCheck}
                    />
                    <Metric
                        title="Finalized"
                        value={caseCounts.finalized}
                        icon={ClipboardCheck}
                    />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent provider submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentCases.length === 0 ? (
                            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                                No compliance cases have been submitted yet.
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
                                                Status
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Submitted
                                            </th>
                                            <th className="px-4 py-3 font-medium" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentCases.map((caseRecord) => (
                                            <tr
                                                key={caseRecord.uuid}
                                                className="border-t"
                                            >
                                                <td className="px-4 py-3 font-medium">
                                                    {caseRecord.facilityName}
                                                </td>
                                                <td className="px-4 py-3 capitalize">
                                                    {caseRecord.reviewType.replace(
                                                        '_',
                                                        ' ',
                                                    )}
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
                                                        href={`${reviewsUrl}/${caseRecord.uuid}`}
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
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function Metric({
    title,
    value,
    icon: Icon,
}: {
    title: string;
    value: number;
    icon: typeof ClipboardCheck;
}) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between p-5">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="mt-1 text-3xl font-semibold">{value}</p>
                </div>
                <span className="grid size-10 place-items-center rounded-md bg-muted">
                    <Icon className="size-5" />
                </span>
            </CardContent>
        </Card>
    );
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});
