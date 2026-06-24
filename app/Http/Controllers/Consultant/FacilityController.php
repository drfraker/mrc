<?php

namespace App\Http\Controllers\Consultant;

use App\Enums\TeamRole;
use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function index(Team $currentTeam): Response
    {
        $facilities = $currentTeam->facilities()
            ->withCount('complianceCases')
            ->orderBy('name')
            ->get()
            ->map(fn (Facility $facility) => [
                'id' => $facility->id,
                'name' => $facility->name,
                'slug' => $facility->slug,
                'state' => $facility->state,
                'contactName' => $facility->contact_name,
                'contactEmail' => $facility->contact_email,
                'isActive' => $facility->is_active,
                'casesCount' => (int) $facility->getAttribute('compliance_cases_count'),
                'intakeTokenRotatedAt' => $facility->intake_token_rotated_at?->diffForHumans(),
            ]);

        return Inertia::render('consultant/facilities/index', [
            'facilities' => $facilities,
            'currentTeamSlug' => $currentTeam->slug,
            'newIntakeLink' => session('facility_intake_url')
                ? [
                    'facilityName' => session('facility_name'),
                    'url' => session('facility_intake_url'),
                ]
                : null,
        ]);
    }

    public function store(Request $request, Team $currentTeam): RedirectResponse
    {
        $this->authorizeFacilityManagement($request, $currentTeam);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:160'],
            'state' => ['required', 'string', 'size:2'],
            'contactName' => ['nullable', 'string', 'max:120'],
            'contactEmail' => ['nullable', 'email', 'max:160'],
        ]);

        $facility = $currentTeam->facilities()->create([
            'name' => $validated['name'],
            'state' => strtoupper($validated['state']),
            'contact_name' => $validated['contactName'] ?? null,
            'contact_email' => $validated['contactEmail'] ?? null,
            'is_active' => true,
        ]);

        $token = $facility->rotateIntakeToken();

        return back()
            ->with('facility_name', $facility->name)
            ->with('facility_intake_url', $facility->intakeUrl($token));
    }

    public function update(Request $request, Team $currentTeam, Facility $facility): RedirectResponse
    {
        $this->authorizeFacilityManagement($request, $currentTeam);
        $this->ensureFacilityBelongsToTeam($facility, $currentTeam);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:160'],
            'state' => ['required', 'string', 'size:2'],
            'contactName' => ['nullable', 'string', 'max:120'],
            'contactEmail' => ['nullable', 'email', 'max:160'],
            'isActive' => ['required', 'boolean'],
        ]);

        $facility->update([
            'name' => $validated['name'],
            'state' => strtoupper($validated['state']),
            'contact_name' => $validated['contactName'] ?? null,
            'contact_email' => $validated['contactEmail'] ?? null,
            'is_active' => $validated['isActive'],
        ]);

        return back();
    }

    public function rotateLink(Request $request, Team $currentTeam, Facility $facility): RedirectResponse
    {
        $this->authorizeFacilityManagement($request, $currentTeam);
        $this->ensureFacilityBelongsToTeam($facility, $currentTeam);

        $token = $facility->rotateIntakeToken();

        return back()
            ->with('facility_name', $facility->name)
            ->with('facility_intake_url', $facility->intakeUrl($token));
    }

    private function authorizeFacilityManagement(Request $request, Team $team): void
    {
        abort_unless(
            $request->user()?->teamRole($team)?->isAtLeast(TeamRole::Admin),
            403,
        );
    }

    private function ensureFacilityBelongsToTeam(Facility $facility, Team $team): void
    {
        abort_unless($facility->team_id === $team->id, 404);
    }
}
