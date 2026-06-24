<?php

namespace Tests\Feature;

use App\Models\ComplianceCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProviderIntakeTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_intake_form_is_publicly_available(): void
    {
        $response = $this->get(route('provider-intake.create'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('provider/intake'));
    }

    public function test_provider_intake_stores_deidentified_payload_and_findings(): void
    {
        $response = $this->post(route('provider-intake.store'), [
            'facilityName' => 'Gallatin SNF',
            'facilityState' => 'MT',
            'submitterName' => 'Facility Nurse',
            'submitterEmail' => 'nurse@example.com',
            'patientReferenceCode' => 'Case A',
            'reviewType' => 'continued_stay',
            'phiAcknowledgement' => true,
            'caseData' => [
                'reviewType' => 'continued_stay',
                'hospitalStayDays' => 3,
                'daysToSnfAdmission' => 1,
                'medicalAppropriatenessException' => false,
                'conditionRelatedToHospitalStay' => true,
                'skilledServiceBasis' => 'therapy_only',
                'skilledDaysPerWeek' => 5,
                'therapyDaysPerWeek' => 5,
                'restorativeDaysPerWeek' => 0,
                'requiresInpatientSnfAsPracticalMatter' => true,
                'initialCertificationPresent' => true,
                'firstRecertificationDay' => 14,
                'maxSubsequentRecertificationIntervalDays' => 30,
                'documentationChecks' => [
                    'physicianOrders' => true,
                    'skilledServicesProvided' => true,
                    'patientResponse' => true,
                    'futureCarePlan' => true,
                    'skilledRationale' => true,
                    'serviceComplexity' => true,
                    'objectiveMeasures' => true,
                ],
                'narrative' => 'Contact patient@example.com about MRN: ABC1234.',
            ],
        ]);

        $case = ComplianceCase::query()->firstOrFail();

        $response->assertRedirect(route('provider-intake.submitted', $case));
        $this->assertSame('Gallatin SNF', $case->facility_name);
        $this->assertSame(3, $case->case_payload['hospitalStayDays']);
        $this->assertStringContainsString('[redacted-email]', $case->case_payload['narrative']);
        $this->assertStringNotContainsString('patient@example.com', $case->case_payload['narrative']);
        $this->assertStringContainsString('[redacted-identifier]', $case->case_payload['narrative']);
        $this->assertNotEmpty($case->findings);
    }
}
