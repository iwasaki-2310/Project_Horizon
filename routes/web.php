<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
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

Route::prefix('/office')->group(function () {
    Route::get('/{officeName}', [OfficeController::class, 'show'])->name('office.show');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
