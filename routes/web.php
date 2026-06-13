<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::inertia('/services', 'services')->name('services');
Route::inertia('/working-with-mrc', 'working')->name('working');
Route::inertia('/resources', 'resources')->name('resources');
Route::inertia('/contact', 'contact')->name('contact');
