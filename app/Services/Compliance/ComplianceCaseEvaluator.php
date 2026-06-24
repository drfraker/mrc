<?php

namespace App\Services\Compliance;

use Illuminate\Support\Arr;

class ComplianceCaseEvaluator
{
    /**
     * @param  array<string, mixed>  $payload
     * @return array<int, array<string, mixed>>
     */
    public function evaluate(array $payload): array
    {
        return [
            $this->hospitalStay($payload),
            $this->snfTransfer($payload),
            $this->relatedCondition($payload),
            $this->dailySkilled($payload),
            $this->practicalMatter($payload),
            $this->initialCertification($payload),
            $this->firstRecertification($payload),
            $this->subsequentRecertification($payload),
            $this->documentation($payload),
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>  $findings
     * @return array<string, int>
     */
    public function counts(array $findings): array
    {
        return [
            'pass' => collect($findings)->where('result', 'pass')->count(),
            'risk' => collect($findings)->whereIn('result', ['fail', 'risk'])->count(),
            'unknown' => collect($findings)->where('result', 'unknown')->count(),
            'needs_review' => collect($findings)->where('result', 'needs_review')->count(),
        ];
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private function hospitalStay(array $payload): array
    {
        $days = $this->int($payload, 'hospitalStayDays');

        return $this->finding(
            id: 'SNF-ELIG-001',
            title: 'Three-day qualifying inpatient hospital stay',
            result: $days === null ? 'unknown' : ($days >= 3 ? 'pass' : 'fail'),
            rationale: $days === null
                ? 'The intake did not include a derived inpatient day count.'
                : "The de-identified intake reports {$days} qualifying inpatient day(s), excluding discharge day and observation/ER time.",
            citation: '42 CFR 409.30(a); CMS Benefit Policy Manual Ch. 8 §§10, 20.1'
        );
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private function snfTransfer(array $payload): array
    {
        $days = $this->int($payload, 'daysToSnfAdmission');
        $exception = (bool) Arr::get($payload, 'medicalAppropriatenessException', false);

        return $this->finding(
            id: 'SNF-ELIG-002',
            title: 'SNF admission within 30 days or medical-appropriateness exception',
            result: $days === null ? 'unknown' : (($days <= 30 || $exception) ? 'pass' : 'fail'),
            rationale: $days === null
                ? 'The intake did not include the number of days from hospital discharge to SNF admission.'
                : "The intake reports SNF admission {$days} day(s) after hospital discharge".($exception ? ' with an asserted medical-appropriateness exception.' : '.'),
            citation: '42 CFR 409.30(b); CMS Benefit Policy Manual Ch. 8 §20.2'
        );
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private function relatedCondition(array $payload): array
    {
        $related = Arr::get($payload, 'conditionRelatedToHospitalStay');

        return $this->finding(
            id: 'SNF-ELIG-003',
            title: 'SNF skilled condition related to hospital-treated condition',
            result: $related === null ? 'unknown' : ($related ? 'pass' : 'fail'),
            rationale: $related === null
                ? 'The intake did not state whether the SNF skilled need is related to the hospital-treated condition or arose during SNF treatment of that condition.'
                : ($related ? 'The intake states the skilled need is related to the qualifying hospital stay or arose during covered SNF care.' : 'The intake states the skilled need is not related to the qualifying hospital stay.'),
            citation: '42 CFR 409.31(b)(2); CMS Benefit Policy Manual Ch. 8 §20.1'
        );
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private function dailySkilled(array $payload): array
    {
        $basis = Arr::get($payload, 'skilledServiceBasis');
        $skilledDays = $this->int($payload, 'skilledDaysPerWeek');
        $therapyDays = $this->int($payload, 'therapyDaysPerWeek');
        $restorativeDays = $this->int($payload, 'restorativeDaysPerWeek');

        $result = 'unknown';
        $rationale = 'The intake did not include enough service-frequency information to evaluate the daily skilled services rule.';

        if ($basis === 'therapy_only' && $therapyDays !== null) {
            $result = $therapyDays >= 5 ? 'pass' : 'fail';
            $rationale = "The stay is marked therapy-only and reports therapy {$therapyDays} day(s) per week.";
        } elseif ($basis === 'restorative_nursing' && $restorativeDays !== null) {
            $result = $restorativeDays >= 6 ? 'pass' : 'risk';
            $rationale = "The stay is marked restorative-nursing based and reports restorative services {$restorativeDays} day(s) per week.";
        } elseif ($skilledDays !== null) {
            $result = $skilledDays >= 7 ? 'pass' : 'needs_review';
            $rationale = "The intake reports skilled services on {$skilledDays} day(s) per week. Consultant review should confirm whether this satisfies essentially daily skilled nursing/rehab criteria and whether any missed days were isolated.";
        }

        return $this->finding(
            id: 'SNF-DAILY-001',
            title: 'Daily skilled services requirement',
            result: $result,
            rationale: $rationale,
            citation: '42 CFR 409.34; CMS Benefit Policy Manual Ch. 8 §30.6'
        );
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private function practicalMatter(array $payload): array
    {
        $practical = Arr::get($payload, 'requiresInpatientSnfAsPracticalMatter');

        return $this->finding(
            id: 'SNF-PRACT-001',
            title: 'Daily skilled care must require inpatient SNF as a practical matter',
            result: $practical === null ? 'unknown' : ($practical ? 'pass' : 'needs_review'),
            rationale: $practical === null
                ? 'The intake did not address whether available outpatient/home alternatives are practical.'
                : ($practical ? 'The intake states daily skilled care cannot practically be provided outside the SNF.' : 'The intake indicates alternatives may be practical; consultant review is needed.'),
            citation: '42 CFR 409.35; CMS Benefit Policy Manual Ch. 8 §30.7'
        );
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private function initialCertification(array $payload): array
    {
        $present = Arr::get($payload, 'initialCertificationPresent');

        return $this->finding(
            id: 'SNF-CERT-001',
            title: 'Initial physician certification content and timing',
            result: $present === null ? 'unknown' : ($present ? 'pass' : 'fail'),
            rationale: $present === null
                ? 'The intake did not indicate whether initial certification was obtained at admission or as soon as practicable.'
                : ($present ? 'The intake states initial certification was present and timely or delay-supported.' : 'The intake states the initial certification is missing or unsupported.'),
            citation: 'CMS General Information, Eligibility, and Entitlement Manual Ch. 4 §40.2; CMS Program Integrity Manual Ch. 6 §6.3'
        );
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private function firstRecertification(array $payload): array
    {
        $day = $this->int($payload, 'firstRecertificationDay');

        return $this->finding(
            id: 'SNF-CERT-002A',
            title: 'First recertification no later than day 14',
            result: $day === null ? 'unknown' : ($day <= 14 ? 'pass' : 'fail'),
            rationale: $day === null
                ? 'The intake did not include a first recertification day number.'
                : "The intake reports the first recertification on inpatient extended-care day {$day}.",
            citation: 'CMS General Information, Eligibility, and Entitlement Manual Ch. 4 §40.4'
        );
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private function subsequentRecertification(array $payload): array
    {
        $maxInterval = $this->int($payload, 'maxSubsequentRecertificationIntervalDays');

        return $this->finding(
            id: 'SNF-CERT-002B',
            title: 'Subsequent recertifications at intervals not exceeding 30 days',
            result: $maxInterval === null ? 'unknown' : ($maxInterval <= 30 ? 'pass' : 'fail'),
            rationale: $maxInterval === null
                ? 'The intake did not include the longest subsequent recertification interval.'
                : "The intake reports the longest subsequent recertification interval was {$maxInterval} day(s).",
            citation: 'CMS General Information, Eligibility, and Entitlement Manual Ch. 4 §§40.3-40.5'
        );
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private function documentation(array $payload): array
    {
        $checks = collect((array) Arr::get($payload, 'documentationChecks', []));
        $required = [
            'physicianOrders',
            'skilledServicesProvided',
            'patientResponse',
            'futureCarePlan',
            'skilledRationale',
            'serviceComplexity',
            'objectiveMeasures',
        ];
        $missing = collect($required)->reject(fn (string $key) => (bool) $checks->get($key))->values();

        return $this->finding(
            id: 'SNF-DOC-001',
            title: 'Medical record documentation supports skilled need',
            result: $missing->isEmpty() ? 'pass' : 'risk',
            rationale: $missing->isEmpty()
                ? 'The intake indicates the core documentation elements are present.'
                : 'The intake is missing or uncertain on: '.$missing->implode(', ').'.',
            citation: 'CMS Benefit Policy Manual Ch. 8 §30.2.2.1',
            missingEvidence: $missing->all()
        );
    }

    /**
     * @param  array<int, string>  $missingEvidence
     * @return array<string, mixed>
     */
    private function finding(string $id, string $title, string $result, string $rationale, string $citation, array $missingEvidence = []): array
    {
        return [
            'rule_id' => $id,
            'title' => $title,
            'result' => $result,
            'rationale' => $rationale,
            'citation' => $citation,
            'missing_evidence' => $missingEvidence,
        ];
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    private function int(array $payload, string $key): ?int
    {
        $value = Arr::get($payload, $key);

        if ($value === null || $value === '') {
            return null;
        }

        return is_numeric($value) ? (int) $value : null;
    }
}
