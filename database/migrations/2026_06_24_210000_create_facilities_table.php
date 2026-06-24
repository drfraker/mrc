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
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('state', 2);
            $table->string('contact_name')->nullable();
            $table->string('contact_email')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('intake_token_hash', 64)->nullable();
            $table->timestamp('intake_token_rotated_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['team_id', 'is_active']);
        });

        Schema::table('compliance_cases', function (Blueprint $table) {
            $table->foreignId('facility_id')
                ->nullable()
                ->after('team_id')
                ->constrained()
                ->nullOnDelete();

            $table->index(['team_id', 'facility_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('compliance_cases', function (Blueprint $table) {
            $table->dropConstrainedForeignId('facility_id');
        });

        Schema::dropIfExists('facilities');
    }
};
