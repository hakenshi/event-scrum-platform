<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ScrumBoardController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Events
Route::apiResource('events', EventController::class);

// Scrum Boards
Route::post('events/{event}/scrum-boards', [ScrumBoardController::class, 'store']);
Route::get('scrum-boards/{scrumBoard}', [ScrumBoardController::class, 'show']);
Route::patch('scrum-boards/{scrumBoard}/tasks/{task}/status', [ScrumBoardController::class, 'updateTaskStatus']);
