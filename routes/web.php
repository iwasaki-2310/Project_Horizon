<?php

use App\Events\TestEvent;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use App\Http\Middleware\CheckOfficeMembership;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    TestEvent::dispatch('Hello, Reverb!');
    return Inertia::render('Welcome', [
        'greeting' => 'Hello',
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::resource('/login', AuthenticatedSessionController::class);

Route::get('/about', function () {
    return Inertia::render('About', [
        'greeting' => '私たちについて'
    ]);
})->name('about');

Route::resource('/users', UsersController::class);

Route::prefix('dashboard')->group(function () {
    // return Inertia::render('Dashboard');
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');
    Route::post('/create-office', [DashboardController::class, 'createOffice'])->name('dashboard.createOffice');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])
    ->prefix('/office')
    ->group(function() {
        Route::middleware([CheckOfficeMembership::class])
            ->group(function() {
                Route::get('/{office_id}/top', [OfficeController::class, 'show'])->name('office.show');
                Route::get('/{office_id}/password', [OfficeController::class, 'showInputPassword'])->name('office.password');
                Route::post('/{office_id}/join', [OfficeController::class, 'joinOffice'])->name('office.joinOffice');
                Route::get('/{office_id}/seats-status', [OfficeController::class, 'getSeatsStatus'])->name('office.getSeatsStatus');
                Route::get('/{office_id}/{seat_id}/seats-status', [OfficeController::class, 'getSelectedSeatStatus'])->name('office.getSelectedSeatStatus');
            });
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
