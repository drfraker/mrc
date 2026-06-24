<?php

namespace App\Services\Compliance;

use App\Ai\ComplianceReportDraftAgent;
use App\Models\ComplianceCase;
use Throwable;

class ComplianceReportDraftService
{
    /**
     * @return array<string, mixed>
     */
    public function draft(ComplianceCase $case): array
    {
        if (! $this->hasConfiguredProvider()) {
            return $this->disabledDraft();
        }

        $prompt = json_encode([
            'case_payload' => $case->case_payload,
            'findings' => $case->findings,
            'source_guardrails' => [
                'scope' => 'Medicare Part A SNF coverage support only, not full Montana licensure/survey compliance.',
                'phi_policy' => 'Payload is expected to be de-identified; do not request or output PHI.',
            ],
        ], JSON_PRETTY_PRINT);

        try {
            return ComplianceReportDraftAgent::make()->prompt($prompt ?: '{}', timeout: 45)->toArray();
        } catch (Throwable $exception) {
            report($exception);

            return [
                'executive_summary' => 'AI draft failed. Deterministic findings are still available for consultant review.',
                'compliance_risks' => [],
                'evidence_gaps' => ['AI draft unavailable: '.$exception->getMessage()],
                'next_questions' => [],
                'report_draft' => 'Use the rule findings table as the source of truth and draft the report manually.',
            ];
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function disabledDraft(): array
    {
        return [
            'executive_summary' => 'AI drafting is not configured. Add an AI provider key to enable consultant-only draft generation.',
            'compliance_risks' => [],
            'evidence_gaps' => [],
            'next_questions' => [],
            'report_draft' => 'No AI draft was generated. Deterministic rule findings remain available.',
        ];
    }

    private function hasConfiguredProvider(): bool
    {
        $default = config('ai.default', 'openai');
        $provider = config("ai.providers.{$default}", []);

        return filled($provider['key'] ?? null) || ($provider['driver'] ?? null) === 'ollama';
    }
}
