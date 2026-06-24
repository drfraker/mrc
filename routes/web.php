<?php

use App\Http\Controllers\Consultant\ComplianceCaseController;
use App\Http\Controllers\Consultant\FacilityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProviderIntakeController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::inertia('/services', 'services')->name('services');
Route::inertia('/working-with-mrc', 'working')->name('working');
Route::inertia('/resources', 'resources')->name('resources');
Route::inertia('/contact', 'contact')->name('contact');

Route::get('/provider/intake/submitted', [ProviderIntakeController::class, 'submitted'])->name('provider-intake.submitted');
Route::get('/facilities/{facility:slug}/intake/{token}', [ProviderIntakeController::class, 'create'])->name('facility-intake.create');
Route::post('/facilities/{facility:slug}/intake/{token}', [ProviderIntakeController::class, 'store'])->name('facility-intake.store');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
        Route::get('facilities', [FacilityController::class, 'index'])->name('facilities.index');
        Route::post('facilities', [FacilityController::class, 'store'])->name('facilities.store');
        Route::patch('facilities/{facility}', [FacilityController::class, 'update'])->name('facilities.update');
        Route::post('facilities/{facility}/rotate-link', [FacilityController::class, 'rotateLink'])->name('facilities.rotate-link');
        Route::get('reviews', [ComplianceCaseController::class, 'index'])->name('reviews.index');
        Route::get('reviews/{complianceCase}', [ComplianceCaseController::class, 'show'])->name('reviews.show');
        Route::patch('reviews/{complianceCase}/status', [ComplianceCaseController::class, 'updateStatus'])->name('reviews.status');
        Route::post('reviews/{complianceCase}/draft', [ComplianceCaseController::class, 'draft'])->name('reviews.draft');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
