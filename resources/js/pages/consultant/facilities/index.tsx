import { Head, router } from '@inertiajs/react';
import {
    Building2,
    CheckCircle2,
    Copy,
    Power,
    PowerOff,
    RefreshCw,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClipboard } from '@/hooks/use-clipboard';

type FacilityRow = {
    id: number;
    name: string;
    slug: string;
    state: string;
    contactName: string | null;
    contactEmail: string | null;
    isActive: boolean;
    casesCount: number;
    intakeTokenRotatedAt: string | null;
};

type NewIntakeLink = {
    facilityName: string;
    url: string;
};

type Props = {
    facilities: FacilityRow[];
    currentTeamSlug: string;
    newIntakeLink: NewIntakeLink | null;
    errors?: Record<string, string>;
};

const emptyFacility = {
    name: '',
    state: 'MT',
    contactName: '',
    contactEmail: '',
};

export default function FacilitiesIndex({
    facilities,
    currentTeamSlug,
    newIntakeLink,
    errors = {},
}: Props) {
    const [copiedText, copy] = useClipboard();
    const [form, setForm] = useState(emptyFacility);
    const [processing, setProcessing] = useState(false);

    function update<K extends keyof typeof emptyFacility>(
        key: K,
        value: (typeof emptyFacility)[K],
    ) {
        setForm((current) => ({ ...current, [key]: value }));
    }

    function createFacility(event: FormEvent) {
        event.preventDefault();
        setProcessing(true);

        router.post(`/${currentTeamSlug}/facilities`, form, {
            preserveScroll: true,
            onSuccess: () => setForm(emptyFacility),
            onFinish: () => setProcessing(false),
        });
    }

    function rotateLink(facility: FacilityRow) {
        router.post(
            `/${currentTeamSlug}/facilities/${facility.slug}/rotate-link`,
            {},
            { preserveScroll: true },
        );
    }

    function toggleFacility(facility: FacilityRow) {
        router.patch(
            `/${currentTeamSlug}/facilities/${facility.slug}`,
            {
                name: facility.name,
                state: facility.state,
                contactName: facility.contactName,
                contactEmail: facility.contactEmail,
                isActive: !facility.isActive,
            },
            { preserveScroll: true },
        );
    }

    return (
        <>
            <Head title="Facilities" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <Heading
                        variant="small"
                        title="Facilities"
                        description="Create facility-specific intake links for de-identified provider submissions."
                    />
                </div>

                {newIntakeLink && (
                    <Card className="border-emerald-200 bg-emerald-50">
                        <CardContent className="flex flex-col gap-3 p-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-3 text-emerald-900">
                                <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                                <div>
                                    <p className="font-medium">
                                        Intake link ready for{' '}
                                        {newIntakeLink.facilityName}
                                    </p>
                                    <p className="text-sm text-emerald-800">
                                        Copy this link now. It will not be shown
                                        again after you leave this page.
                                    </p>
                                </div>
                            </div>
                            <div className="flex min-w-0 flex-1 gap-2 lg:max-w-2xl">
                                <Input
                                    readOnly
                                    value={newIntakeLink.url}
                                    className="min-w-0 bg-white"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => copy(newIntakeLink.url)}
                                >
                                    <Copy className="size-4" />
                                    {copiedText === newIntakeLink.url
                                        ? 'Copied'
                                        : 'Copy'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="size-5" />
                            Add facility
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={createFacility}
                            className="grid gap-4 md:grid-cols-[minmax(12rem,1.4fr)_7rem_minmax(10rem,1fr)_minmax(12rem,1.2fr)_auto]"
                        >
                            <Field label="Facility name" error={errors.name}>
                                <Input
                                    value={form.name}
                                    onChange={(event) =>
                                        update('name', event.target.value)
                                    }
                                    required
                                />
                            </Field>
                            <Field label="State" error={errors.state}>
                                <Input
                                    value={form.state}
                                    onChange={(event) =>
                                        update(
                                            'state',
                                            event.target.value
                                                .toUpperCase()
                                                .slice(0, 2),
                                        )
                                    }
                                    required
                                />
                            </Field>
                            <Field label="Contact" error={errors.contactName}>
                                <Input
                                    value={form.contactName}
                                    onChange={(event) =>
                                        update(
                                            'contactName',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>
                            <Field
                                label="Contact email"
                                error={errors.contactEmail}
                            >
                                <Input
                                    type="email"
                                    value={form.contactEmail}
                                    onChange={(event) =>
                                        update(
                                            'contactEmail',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>
                            <div className="flex items-end">
                                <Button type="submit" disabled={processing}>
                                    Add
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Managed facilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {facilities.length === 0 ? (
                            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                                No facilities have been added yet.
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
                                                Contact
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Cases
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Link
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 font-medium" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {facilities.map((facility) => (
                                            <tr
                                                key={facility.id}
                                                className="border-t align-top"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="font-medium">
                                                        {facility.name}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {facility.state} ·{' '}
                                                        {facility.slug}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    <div>
                                                        {facility.contactName ??
                                                            'No contact'}
                                                    </div>
                                                    {facility.contactEmail && (
                                                        <div className="text-xs">
                                                            {
                                                                facility.contactEmail
                                                            }
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {facility.casesCount}
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {facility.intakeTokenRotatedAt
                                                        ? `Rotated ${facility.intakeTokenRotatedAt}`
                                                        : 'No link generated'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`rounded-full border px-2 py-0.5 text-xs ${
                                                            facility.isActive
                                                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                                                : 'border-slate-200 bg-slate-50 text-slate-700'
                                                        }`}
                                                    >
                                                        {facility.isActive
                                                            ? 'Active'
                                                            : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                rotateLink(
                                                                    facility,
                                                                )
                                                            }
                                                        >
                                                            <RefreshCw className="size-4" />
                                                            Rotate
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                toggleFacility(
                                                                    facility,
                                                                )
                                                            }
                                                        >
                                                            {facility.isActive ? (
                                                                <PowerOff className="size-4" />
                                                            ) : (
                                                                <Power className="size-4" />
                                                            )}
                                                            {facility.isActive
                                                                ? 'Deactivate'
                                                                : 'Activate'}
                                                        </Button>
                                                    </div>
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

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            {children}
            <InputError message={error} />
        </div>
    );
}

FacilitiesIndex.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: 'Facilities',
            href: props.currentTeam
                ? `/${props.currentTeam.slug}/facilities`
                : '/',
        },
    ],
});
