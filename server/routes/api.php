<?php

use App\Http\Controllers\Api\v1\AssignmentController;
use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\ProjectController;
use App\Http\Controllers\Api\v1\SelectionController;
use App\Http\Controllers\Api\v1\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [AuthController::class, 'register']);
});

Route::apiResource('users', UserController::class);
Route::apiResource('projects', ProjectController::class);
Route::apiResource('selections', SelectionController::class);
Route::apiResource('assignments', AssignmentController::class);

Route::middleware('auth:sanctum')->group(function () {
});
