<?php

namespace Database\Seeders;

use App\Enums\TeamRole;
use App\Models\Membership;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $teamName = (string) config('consultants.team_name', 'Medical Review Consultants');
        $teamSlug = Str::slug($teamName) ?: 'medical-review-consultants';

        $team = Team::query()->firstOrCreate(
            ['slug' => $teamSlug],
            ['name' => $teamName, 'is_personal' => false],
        );

        $team->update(['name' => $teamName, 'is_personal' => false]);

        foreach (config('consultants.users', []) as $consultant) {
            $email = strtolower((string) ($consultant['email'] ?? ''));

            if ($email === '') {
                continue;
            }

            $user = User::query()->firstOrCreate(
                ['email' => $email],
                [
                    'name' => (string) ($consultant['name'] ?? $email),
                    'password' => config('consultants.initial_password') ?: Str::random(64),
                    'email_verified_at' => now(),
                ],
            );

            $user->forceFill([
                'name' => (string) ($consultant['name'] ?? $user->name),
                'email_verified_at' => $user->email_verified_at ?? now(),
            ])->save();

            Membership::query()->updateOrCreate(
                ['team_id' => $team->id, 'user_id' => $user->id],
                ['role' => TeamRole::tryFrom((string) ($consultant['role'] ?? '')) ?? TeamRole::Admin],
            );

            if (! $user->current_team_id) {
                $user->switchTeam($team);
            }
        }
    }
}
