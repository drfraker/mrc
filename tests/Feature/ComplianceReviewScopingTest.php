<?php

namespace Tests\Feature;

use App\Models\ComplianceCase;
use App\Models\Facility;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ComplianceReviewScopingTest extends TestCase
{
    use RefreshDatabase;

    public function test_review_queue_only_includes_current_team_cases(): void
    {
        $user = User::factory()->create();
        $team = $user->currentTeam()->firstOrFail();
        $facility = Facility::factory()->create(['team_id' => $team->id]);
        $otherFacility = Facility::factory()->create();

        $case = $this->caseForFacility($facility);
        $this->caseForFacility($otherFacility);

        $response = $this
            ->actingAs($user)
            ->get(route('reviews.index', ['current_team' => $team]));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->has('cases.data', 1)
            ->where('cases.data.0.uuid', $case->uuid)
            ->where('cases.data.0.facilityName', $facility->name),
        );
    }

    public function test_review_detail_cannot_cross_team_boundaries(): void
    {
        $user = User::factory()->create();
        $team = $user->currentTeam()->firstOrFail();
        $otherFacility = Facility::factory()->create();
        $otherCase = $this->caseForFacility($otherFacility);

        $this
            ->actingAs($user)
            ->get(route('reviews.show', [
                'current_team' => $team,
                'complianceCase' => $otherCase,
            ]))
            ->assertNotFound();
    }

    private function caseForFacility(Facility $facility): ComplianceCase
    {
        return ComplianceCase::query()->create([
            'team_id' => $facility->team_id,
            'facility_id' => $facility->id,
            'status' => 'submitted',
            'review_type' => 'continued_stay',
            'facility_name' => $facility->name,
            'facility_state' => $facility->state,
            'case_payload' => ['reviewType' => 'continued_stay'],
            'findings' => [],
        ]);
    }
}
