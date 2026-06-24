<?php

namespace App\Models;

use Database\Factories\FacilityFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $team_id
 * @property string $name
 * @property string $slug
 * @property string $state
 * @property string|null $contact_name
 * @property string|null $contact_email
 * @property bool $is_active
 * @property string|null $intake_token_hash
 * @property Carbon|null $intake_token_rotated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable([
    'team_id',
    'name',
    'slug',
    'state',
    'contact_name',
    'contact_email',
    'is_active',
    'intake_token_hash',
    'intake_token_rotated_at',
])]
#[Hidden(['intake_token_hash'])]
class Facility extends Model
{
    /** @use HasFactory<FacilityFactory> */
    use HasFactory, SoftDeletes;

    protected static function booted(): void
    {
        static::creating(function (Facility $facility): void {
            if (empty($facility->slug)) {
                $facility->slug = static::uniqueSlug($facility->name);
            }

            $facility->state = strtoupper($facility->state);
        });

        static::updating(function (Facility $facility): void {
            if ($facility->isDirty('name')) {
                $facility->slug = static::uniqueSlug($facility->name, $facility->id);
            }

            if ($facility->isDirty('state')) {
                $facility->state = strtoupper($facility->state);
            }
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * @return BelongsTo<Team, $this>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * @return HasMany<ComplianceCase, $this>
     */
    public function complianceCases(): HasMany
    {
        return $this->hasMany(ComplianceCase::class);
    }

    public function rotateIntakeToken(): string
    {
        $token = Str::random(48);

        $this->forceFill([
            'intake_token_hash' => static::hashIntakeToken($token),
            'intake_token_rotated_at' => now(),
        ])->save();

        return $token;
    }

    public function matchesIntakeToken(string $token): bool
    {
        if (! $this->intake_token_hash) {
            return false;
        }

        return hash_equals($this->intake_token_hash, static::hashIntakeToken($token));
    }

    public function intakeUrl(string $token): string
    {
        return route('facility-intake.create', [
            'facility' => $this,
            'token' => $token,
        ]);
    }

    public static function hashIntakeToken(string $token): string
    {
        return hash('sha256', $token);
    }

    protected static function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name) ?: 'facility';
        $slug = $base;
        $counter = 2;

        while (static::query()
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->where('slug', $slug)
            ->withTrashed()
            ->exists()) {
            $slug = "{$base}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'intake_token_rotated_at' => 'datetime',
        ];
    }
}
