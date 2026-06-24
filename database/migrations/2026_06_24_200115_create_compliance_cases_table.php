<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('compliance_cases', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('team_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('reviewed_by_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status')->default('submitted')->index();
            $table->string('review_type')->default('continued_stay');
            $table->string('facility_name');
            $table->string('facility_state', 2)->default('MT');
            $table->string('submitter_name')->nullable();
            $table->string('submitter_email')->nullable();
            $table->string('patient_reference_code')->nullable();
            $table->json('case_payload');
            $table->json('findings')->nullable();
            $table->json('ai_draft')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('ai_drafted_at')->nullable();
            $table->timestamps();

            $table->index(['team_id', 'status']);
            $table->index(['created_at', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compliance_cases');
    }
};
