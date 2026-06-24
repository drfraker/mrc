<?php

namespace Database\Factories;

use App\Models\ComplianceCase;
use App\Models\Facility;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ComplianceCase>
 */
class ComplianceCaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $facility = Facility::factory()->create();

        return [
            'team_id' => $facility->team_id,
            'facility_id' => $facility->id,
            'status' => 'submitted',
            'review_type' => 'continued_stay',
            'facility_name' => $facility->name,
            'facility_state' => $facility->state,
            'submitter_name' => fake()->name(),
            'submitter_email' => fake()->safeEmail(),
            'patient_reference_code' => fake()->bothify('Case ##??'),
            'case_payload' => ['reviewType' => 'continued_stay'],
            'findings' => [],
            'submitted_at' => now(),
        ];
    }
}
