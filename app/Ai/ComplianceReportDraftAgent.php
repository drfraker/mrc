<?php

namespace App\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Attributes\Model;
use Laravel\Ai\Attributes\Provider;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Enums\Lab;
use Laravel\Ai\Promptable;

#[Provider(Lab::OpenAI)]
#[Model('gpt-4.1-mini')]
class ComplianceReportDraftAgent implements Agent, HasStructuredOutput
{
    use Promptable;

    public function instructions(): string
    {
        return <<<'INSTRUCTIONS'
You draft consultant-facing Medicare Part A skilled nursing facility compliance report language.
Use only the provided de-identified case payload, deterministic rule findings, and provided citations.
Do not invent patient facts, dates, names, identifiers, rules, or citations.
Separate compliance issues from evidence gaps. Say "needs consultant review" when clinical judgment is required.
Never ask for or output PHI.
INSTRUCTIONS;
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'executive_summary' => $schema->string()->required(),
            'compliance_risks' => $schema->array()->items($schema->string())->required(),
            'evidence_gaps' => $schema->array()->items($schema->string())->required(),
            'next_questions' => $schema->array()->items($schema->string())->required(),
            'report_draft' => $schema->string()->required(),
        ];
    }
}
