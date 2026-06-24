<?php

namespace App\Http\Controllers;

use App\Models\ComplianceCase;
use App\Models\TeamInvitation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $email = strtolower($request->user()->email);

        $pendingInvitations = TeamInvitation::query()
            ->with(['inviter', 'team'])
            ->whereRaw('LOWER(email) = ?', [$email])
            ->whereNull('accepted_at')
            ->where(fn ($query) => $query
                ->whereNull('expires_at')
                ->orWhere('expires_at', '>=', now()))
            ->latest()
            ->get()
            ->map(fn (TeamInvitation $invitation) => [
                'code' => $invitation->code,
                'inviterName' => $invitation->inviter->name,
                'team' => [
                    'name' => $invitation->team->name,
                    'slug' => $invitation->team->slug,
                ],
            ]);

        $caseCounts = [
            'submitted' => ComplianceCase::query()->where('status', 'submitted')->count(),
            'needsInformation' => ComplianceCase::query()->where('status', 'needs_information')->count(),
            'reviewed' => ComplianceCase::query()->where('status', 'reviewed')->count(),
            'finalized' => ComplianceCase::query()->where('status', 'finalized')->count(),
        ];

        $recentCases = ComplianceCase::query()
            ->latest()
            ->limit(6)
            ->get()
            ->map(fn (ComplianceCase $case) => [
                'uuid' => $case->uuid,
                'facilityName' => $case->facility_name,
                'reviewType' => $case->review_type,
                'status' => $case->status,
                'submittedAt' => $case->submitted_at?->diffForHumans(),
            ]);

        return Inertia::render('dashboard', [
            'pendingInvitations' => $pendingInvitations,
            'caseCounts' => $caseCounts,
            'recentCases' => $recentCases,
        ]);
    }
}
