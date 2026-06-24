<?php

namespace Tests\Feature;

use App\Models\ComplianceCase;
use App\Models\Facility;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProviderIntakeTest extends TestCase
{
    use RefreshDatabase;

    public function test_provider_intake_form_requires_a_valid_facility_link(): void
    {
        $facility = Facility::factory()->create();
        $token = $facility->rotateIntakeToken();

        $this->get('/provider/intake')->assertNotFound();

        $this->get(route('facility-intake.create', [
            'facility' => $facility,
            'token' => 'invalid-token',
        ]))->assertNotFound();

        $response = $this->get(route('facility-intake.create', [
            'facility' => $facility,
            'token' => $token,
        ]));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('provider/intake')
            ->where('facility.name', $facility->name)
            ->where('facility.state', $facility->state)
            ->where('submitUrl', route('facility-intake.store', [
                'facility' => $facility,
                'token' => $token,
            ])),
        );
    }

    public function test_provider_intake_stores_deidentified_payload_and_findings(): void
    {
        $facility = Facility::factory()->create([
            'name' => 'Gallatin SNF',
            'state' => 'MT',
        ]);
        $token = $facility->rotateIntakeToken();

        $response = $this->post(route('facility-intake.store', [
            'facility' => $facility,
            'token' => $token,
        ]), [
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

        $response->assertRedirect(route('provider-intake.submitted'));
        $this->assertSame($facility->team_id, $case->team_id);
        $this->assertSame($facility->id, $case->facility_id);
        $this->assertSame('Gallatin SNF', $case->facility_name);
        $this->assertSame(3, $case->case_payload['hospitalStayDays']);
        $this->assertStringContainsString('[redacted-email]', $case->case_payload['narrative']);
        $this->assertStringNotContainsString('patient@example.com', $case->case_payload['narrative']);
        $this->assertStringContainsString('[redacted-identifier]', $case->case_payload['narrative']);
        $this->assertNotEmpty($case->findings);
    }

    public function test_inactive_facility_link_cannot_submit_cases(): void
    {
        $facility = Facility::factory()->create(['is_active' => false]);
        $token = $facility->rotateIntakeToken();

        $this->post(route('facility-intake.store', [
            'facility' => $facility,
            'token' => $token,
        ]), [])->assertNotFound();

        $this->assertDatabaseCount('compliance_cases', 0);
    }
}
