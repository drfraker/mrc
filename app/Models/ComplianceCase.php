<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $uuid
 * @property int|null $team_id
 * @property int|null $reviewed_by_id
 * @property string $status
 * @property string $review_type
 * @property string $facility_name
 * @property string $facility_state
 * @property string|null $submitter_name
 * @property string|null $submitter_email
 * @property string|null $patient_reference_code
 * @property array<string, mixed> $case_payload
 * @property array<int, array<string, mixed>>|null $findings
 * @property array<string, mixed>|null $ai_draft
 * @property Carbon|null $submitted_at
 * @property Carbon|null $reviewed_at
 * @property Carbon|null $ai_drafted_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'uuid',
    'team_id',
    'reviewed_by_id',
    'status',
    'review_type',
    'facility_name',
    'facility_state',
    'submitter_name',
    'submitter_email',
    'patient_reference_code',
    'case_payload',
    'findings',
    'ai_draft',
    'submitted_at',
    'reviewed_at',
    'ai_drafted_at',
])]
class ComplianceCase extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::creating(function (ComplianceCase $case): void {
            $case->uuid ??= (string) Str::uuid();
            $case->submitted_at ??= now();
        });
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    /**
     * @return BelongsTo<Team, $this>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function reviewedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by_id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'case_payload' => 'array',
            'findings' => 'array',
            'ai_draft' => 'array',
            'submitted_at' => 'datetime',
            'reviewed_at' => 'datetime',
            'ai_drafted_at' => 'datetime',
        ];
    }
}
