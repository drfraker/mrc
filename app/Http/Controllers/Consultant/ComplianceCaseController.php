<?php

namespace App\Http\Controllers\Consultant;

use App\Http\Controllers\Controller;
use App\Models\ComplianceCase;
use App\Models\Team;
use App\Services\Compliance\ComplianceCaseEvaluator;
use App\Services\Compliance\ComplianceReportDraftService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ComplianceCaseController extends Controller
{
    public function index(Team $currentTeam, ComplianceCaseEvaluator $evaluator): Response
    {
        $cases = ComplianceCase::query()
            ->where('team_id', $currentTeam->id)
            ->latest()
            ->paginate(20)
            ->through(fn (ComplianceCase $case) => [
                'uuid' => $case->uuid,
                'facilityName' => $case->facility_name,
                'facilityState' => $case->facility_state,
                'reviewType' => $case->review_type,
                'status' => $case->status,
                'patientReferenceCode' => $case->patient_reference_code,
                'submittedAt' => $case->submitted_at?->toIso8601String(),
                'findingCounts' => $evaluator->counts($case->findings ?? []),
            ]);

        return Inertia::render('consultant/reviews/index', [
            'cases' => $cases,
            'currentTeamSlug' => $currentTeam->slug,
        ]);
    }

    public function show(Team $currentTeam, ComplianceCase $complianceCase): Response
    {
        $this->ensureCaseBelongsToTeam($complianceCase, $currentTeam);

        return Inertia::render('consultant/reviews/show', [
            'caseRecord' => [
                'uuid' => $complianceCase->uuid,
                'facilityName' => $complianceCase->facility_name,
                'facilityState' => $complianceCase->facility_state,
                'reviewType' => $complianceCase->review_type,
                'status' => $complianceCase->status,
                'submitterName' => $complianceCase->submitter_name,
                'submitterEmail' => $complianceCase->submitter_email,
                'patientReferenceCode' => $complianceCase->patient_reference_code,
                'submittedAt' => $complianceCase->submitted_at?->toDayDateTimeString(),
                'payload' => $complianceCase->case_payload,
                'findings' => $complianceCase->findings ?? [],
                'aiDraft' => $complianceCase->ai_draft,
            ],
            'currentTeamSlug' => $currentTeam->slug,
        ]);
    }

    public function updateStatus(Request $request, Team $currentTeam, ComplianceCase $complianceCase): RedirectResponse
    {
        $this->ensureCaseBelongsToTeam($complianceCase, $currentTeam);

        $validated = $request->validate([
            'status' => ['required', Rule::in(['submitted', 'needs_information', 'reviewed', 'finalized', 'archived'])],
        ]);

        $complianceCase->forceFill([
            'status' => $validated['status'],
            'reviewed_by_id' => $request->user()->id,
            'reviewed_at' => now(),
        ])->save();

        return back();
    }

    public function draft(Team $currentTeam, ComplianceCase $complianceCase, ComplianceReportDraftService $drafts): RedirectResponse
    {
        $this->ensureCaseBelongsToTeam($complianceCase, $currentTeam);

        $complianceCase->forceFill([
            'ai_draft' => $drafts->draft($complianceCase),
            'ai_drafted_at' => now(),
        ])->save();

        return back();
    }

    private function ensureCaseBelongsToTeam(ComplianceCase $case, Team $team): void
    {
        abort_unless($case->team_id === $team->id, 404);
    }
}
