<?php

namespace App\Http\Controllers;

use App\Models\ComplianceCase;
use App\Models\Facility;
use App\Services\Compliance\ComplianceCaseEvaluator;
use App\Services\Compliance\PatientDataAnonymizer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProviderIntakeController extends Controller
{
    public function create(Facility $facility, string $token): Response
    {
        $this->ensureFacilityLinkIsValid($facility, $token);

        return Inertia::render('provider/intake', [
            'facility' => [
                'name' => $facility->name,
                'state' => $facility->state,
            ],
            'submitUrl' => route('facility-intake.store', [
                'facility' => $facility,
                'token' => $token,
            ]),
        ]);
    }

    public function store(
        Request $request,
        Facility $facility,
        string $token,
        PatientDataAnonymizer $anonymizer,
        ComplianceCaseEvaluator $evaluator,
    ): RedirectResponse {
        $this->ensureFacilityLinkIsValid($facility, $token);

        $validated = $request->validate([
            'submitterName' => ['nullable', 'string', 'max:120'],
            'submitterEmail' => ['nullable', 'email', 'max:160'],
            'patientReferenceCode' => ['nullable', 'string', 'max:48'],
            'reviewType' => ['required', Rule::in(['admission', 'continued_stay', 'discharge', 'appeal', 'retrospective'])],
            'caseData' => ['required', 'array'],
            'caseData.reviewType' => ['required', 'string'],
            'caseData.hospitalStayDays' => ['nullable', 'integer', 'min:0', 'max:365'],
            'caseData.daysToSnfAdmission' => ['nullable', 'integer', 'min:0', 'max:365'],
            'caseData.medicalAppropriatenessException' => ['boolean'],
            'caseData.conditionRelatedToHospitalStay' => ['nullable', 'boolean'],
            'caseData.skilledServiceBasis' => ['nullable', Rule::in(['nursing_or_combined', 'therapy_only', 'restorative_nursing'])],
            'caseData.skilledDaysPerWeek' => ['nullable', 'integer', 'min:0', 'max:7'],
            'caseData.therapyDaysPerWeek' => ['nullable', 'integer', 'min:0', 'max:7'],
            'caseData.restorativeDaysPerWeek' => ['nullable', 'integer', 'min:0', 'max:7'],
            'caseData.requiresInpatientSnfAsPracticalMatter' => ['nullable', 'boolean'],
            'caseData.initialCertificationPresent' => ['nullable', 'boolean'],
            'caseData.firstRecertificationDay' => ['nullable', 'integer', 'min:1', 'max:365'],
            'caseData.maxSubsequentRecertificationIntervalDays' => ['nullable', 'integer', 'min:1', 'max:365'],
            'caseData.documentationChecks' => ['array'],
            'caseData.narrative' => ['nullable', 'string', 'max:5000'],
            'phiAcknowledgement' => ['accepted'],
        ]);

        $payload = $anonymizer->sanitizePayload($validated['caseData']);
        $findings = $evaluator->evaluate($payload);

        ComplianceCase::query()->create([
            'team_id' => $facility->team_id,
            'facility_id' => $facility->id,
            'status' => 'submitted',
            'review_type' => $validated['reviewType'],
            'facility_name' => $facility->name,
            'facility_state' => $facility->state,
            'submitter_name' => $validated['submitterName'] ?? null,
            'submitter_email' => $validated['submitterEmail'] ?? null,
            'patient_reference_code' => $anonymizer->sanitizeReference($validated['patientReferenceCode'] ?? null),
            'case_payload' => $payload,
            'findings' => $findings,
            'submitted_at' => now(),
        ]);

        return redirect()->route('provider-intake.submitted');
    }

    public function submitted(): Response
    {
        return Inertia::render('provider/submitted');
    }

    private function ensureFacilityLinkIsValid(Facility $facility, string $token): void
    {
        abort_unless($facility->is_active && $facility->matchesIntakeToken($token), 404);
    }
}
