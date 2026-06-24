<?php

namespace Database\Factories;

use App\Models\Facility;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Facility>
 */
class FacilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'team_id' => Team::factory(),
            'name' => fake()->company().' SNF',
            'state' => fake()->randomElement(['MT', 'WY', 'ID', 'ND', 'SD']),
            'contact_name' => fake()->name(),
            'contact_email' => fake()->safeEmail(),
            'is_active' => true,
        ];
    }
}
