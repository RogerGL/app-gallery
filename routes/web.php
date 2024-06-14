<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CheckUserLevel;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'home');
Route::get('/home', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth', 'verified'])->name('home');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy')->middleware(CheckUserLevel::class.':2');
    
    // Category CRUD routes
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index')->middleware(CheckUserLevel::class.':2');
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create')->middleware(CheckUserLevel::class.':2');;
    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit')->middleware(CheckUserLevel::class.':2');;
    Route::post('/categories/store', [CategoryController::class, 'store'])->name('categories.store')->middleware(CheckUserLevel::class.':2');;
    Route::delete('/categories/{category}/delete', [CategoryController::class, 'delete'])->name('categories.delete')->middleware(CheckUserLevel::class.':2');;
    Route::put('/categories/{category}/update', [CategoryController::class, 'update'])->name('categories.update')->middleware(CheckUserLevel::class.':2');;
    Route::patch('/categories/{category}/toggle-content', [CategoryController::class, 'toggleContent'])
    ->name('categories.toggleContent');

    // Content CRUD routes

    Route::get('/contents', [ContentController::class, 'index'])->name('contents.index')->middleware(CheckUserLevel::class.':2');
    Route::get('/contents/create', [ContentController::class, 'create'])->name('contents.create');
    Route::put('/contents/{content}', [ContentController::class, 'update'])->name('contents.update');

    Route::get('/contents/{content}/edit', [ContentController::class, 'edit'])->name('contents.edit')->middleware(CheckUserLevel::class.':2');
    Route::post('/contents/store', [ContentController::class, 'store'])->name('contents.store')->middleware(CheckUserLevel::class.':2');
    Route::delete('/contents/{content}/delete', [ContentController::class, 'delete'])->name('contents.delete')->middleware(CheckUserLevel::class.':2');



    //Event view
    Route::get('/events', [EventController::class, 'index'])->name('events.index')->middleware(CheckUserLevel::class.':3');
    Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');
    

});

require __DIR__.'/auth.php';
