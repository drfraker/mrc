<?php

namespace App\Services\Compliance;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class PatientDataAnonymizer
{
    /**
     * Fields that should never be accepted inside the clinical case payload.
     * Actual dates are converted client-side into relative counts before submit.
     *
     * @var array<int, string>
     */
    private array $blockedKeyFragments = [
        'patient_name',
        'resident_name',
        'beneficiary_name',
        'first_name',
        'last_name',
        'date_of_birth',
        'dob',
        'birthdate',
        'ssn',
        'social_security',
        'medicare_number',
        'mbi',
        'hicn',
        'medical_record_number',
        'mrn',
        'room_number',
        'address',
        'phone',
        'email',
        'admit_date',
        'discharge_date',
        'service_date',
        'certification_date',
        'recertification_date',
    ];

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    public function sanitizePayload(array $payload): array
    {
        $sanitized = [];

        foreach ($payload as $key => $value) {
            if ($this->isBlockedKey((string) $key)) {
                $sanitized[$key] = '[redacted]';

                continue;
            }

            $sanitized[$key] = $this->sanitizeValue($value);
        }

        return $sanitized;
    }

    public function sanitizeReference(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $clean = $this->sanitizeText($value);
        $clean = Str::of($clean)
            ->replaceMatches('/[^A-Za-z0-9_ -]/', '')
            ->squish()
            ->limit(48, '')
            ->toString();

        return $clean !== '' ? $clean : null;
    }

    public function containsLikelyPhi(array $payload): bool
    {
        return Arr::where($payload, fn ($value) => $this->valueContainsLikelyPhi($value)) !== [];
    }

    private function sanitizeValue(mixed $value): mixed
    {
        if (is_array($value)) {
            return $this->sanitizePayload($value);
        }

        if (is_string($value)) {
            return $this->sanitizeText($value);
        }

        return $value;
    }

    private function sanitizeText(string $value): string
    {
        $patterns = [
            '/\b\d{3}-\d{2}-\d{4}\b/' => '[redacted-ssn]',
            '/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/' => '[redacted-phone]',
            '/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i' => '[redacted-email]',
            '/\b[1-9][A-HJ-NP-Z][A-HJ-NP-Z0-9][0-9]-?[A-HJ-NP-Z][A-HJ-NP-Z0-9][0-9]-?[A-HJ-NP-Z]{2}[0-9]{2}\b/i' => '[redacted-mbi]',
            '/\b(?:MRN|HICN|MBI|SSN)[:#]?\s*[A-Z0-9-]{4,}\b/i' => '[redacted-identifier]',
        ];

        foreach ($patterns as $pattern => $replacement) {
            $value = preg_replace($pattern, $replacement, $value) ?? $value;
        }

        return str($value)
            ->squish()
            ->limit(5000)
            ->toString();
    }

    private function isBlockedKey(string $key): bool
    {
        $normalized = Str::of($key)->snake()->lower()->toString();

        foreach ($this->blockedKeyFragments as $fragment) {
            if (str_contains($normalized, $fragment)) {
                return true;
            }
        }

        return false;
    }

    private function valueContainsLikelyPhi(mixed $value): bool
    {
        if (is_array($value)) {
            foreach ($value as $nested) {
                if ($this->valueContainsLikelyPhi($nested)) {
                    return true;
                }
            }

            return false;
        }

        if (! is_string($value)) {
            return false;
        }

        return preg_match('/\b\d{3}-\d{2}-\d{4}\b|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b(?:MRN|HICN|MBI|SSN)[:#]?\s*[A-Z0-9-]{4,}\b/i', $value) === 1;
    }
}
