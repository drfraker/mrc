<?php

namespace App\Http\Controllers;

use App\Models\ComplianceCase;
use App\Services\Compliance\ComplianceCaseEvaluator;
use App\Services\Compliance\PatientDataAnonymizer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProviderIntakeController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('provider/intake');
    }

    public function store(
        Request $request,
        PatientDataAnonymizer $anonymizer,
        ComplianceCaseEvaluator $evaluator,
    ): RedirectResponse {
        $validated = $request->validate([
            'facilityName' => ['required', 'string', 'max:160'],
            'facilityState' => ['required', 'string', 'size:2'],
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

        $case = ComplianceCase::query()->create([
            'status' => 'submitted',
            'review_type' => $validated['reviewType'],
            'facility_name' => $validated['facilityName'],
            'facility_state' => strtoupper($validated['facilityState']),
            'submitter_name' => $validated['submitterName'] ?? null,
            'submitter_email' => $validated['submitterEmail'] ?? null,
            'patient_reference_code' => $anonymizer->sanitizeReference($validated['patientReferenceCode'] ?? null),
            'case_payload' => $payload,
            'findings' => $findings,
            'submitted_at' => now(),
        ]);

        return redirect()->route('provider-intake.submitted', $case);
    }

    public function submitted(ComplianceCase $complianceCase): Response
    {
        return Inertia::render('provider/submitted', [
            'caseReference' => $complianceCase->uuid,
            'facilityName' => $complianceCase->facility_name,
        ]);
    }
}
