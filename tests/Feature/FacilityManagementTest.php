<?php

namespace Tests\Feature;

use App\Models\Facility;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class FacilityManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_consultants_can_view_facilities_for_their_team(): void
    {
        $user = User::factory()->create();
        $team = $user->currentTeam()->firstOrFail();

        $facility = Facility::factory()->create([
            'team_id' => $team->id,
            'name' => 'Gallatin SNF',
            'state' => 'MT',
        ]);

        $response = $this
            ->actingAs($user)
            ->get(route('facilities.index', ['current_team' => $team]));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('consultant/facilities/index')
            ->where('currentTeamSlug', $team->slug)
            ->has('facilities', 1)
            ->where('facilities.0.name', 'Gallatin SNF')
            ->where('facilities.0.slug', $facility->slug),
        );
    }

    public function test_consultants_can_create_facilities_and_receive_intake_link(): void
    {
        $user = User::factory()->create();
        $team = $user->currentTeam()->firstOrFail();

        $response = $this
            ->actingAs($user)
            ->post(route('facilities.store', ['current_team' => $team]), [
                'name' => 'Gallatin SNF',
                'state' => 'mt',
                'contactName' => 'Facility Nurse',
                'contactEmail' => 'nurse@example.com',
            ]);

        $facility = Facility::query()->firstOrFail();

        $response->assertRedirect();
        $response->assertSessionHas('facility_intake_url');
        $this->assertDatabaseHas('facilities', [
            'id' => $facility->id,
            'team_id' => $team->id,
            'name' => 'Gallatin SNF',
            'state' => 'MT',
            'contact_name' => 'Facility Nurse',
            'contact_email' => 'nurse@example.com',
            'is_active' => true,
        ]);
        $this->assertNotNull($facility->intake_token_hash);
        $this->assertStringContainsString(
            "/facilities/{$facility->slug}/intake/",
            session('facility_intake_url'),
        );
    }

    public function test_consultants_can_rotate_facility_links(): void
    {
        $user = User::factory()->create();
        $team = $user->currentTeam()->firstOrFail();
        $facility = Facility::factory()->create(['team_id' => $team->id]);
        $oldToken = $facility->rotateIntakeToken();
        $oldHash = $facility->intake_token_hash;

        $response = $this
            ->actingAs($user)
            ->post(route('facilities.rotate-link', [
                'current_team' => $team,
                'facility' => $facility,
            ]));

        $facility->refresh();

        $response->assertRedirect();
        $response->assertSessionHas('facility_intake_url');
        $this->assertNotSame($oldHash, $facility->intake_token_hash);
        $this->get(route('facility-intake.create', [
            'facility' => $facility,
            'token' => $oldToken,
        ]))->assertNotFound();
    }

    public function test_facilities_from_other_teams_cannot_be_managed(): void
    {
        $user = User::factory()->create();
        $team = $user->currentTeam()->firstOrFail();
        $facility = Facility::factory()->create();

        $this
            ->actingAs($user)
            ->post(route('facilities.rotate-link', [
                'current_team' => $team,
                'facility' => $facility,
            ]))
            ->assertNotFound();
    }
}
