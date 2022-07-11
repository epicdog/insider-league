<?php

use App\Http\Controllers\LeagueController;
use App\Http\Controllers\MonteCarloController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/fixtures', [LeagueController::class, 'fixtures'])->name('fixtures');
Route::get('/predictions', [MonteCarloController::class, 'process'])->name('predictions');
Route::post('/fixtures/generate', [LeagueController::class, 'generate_fixtures'])->name('fixtures.generate');
Route::post('/fixtures/reset', [LeagueController::class, 'reset_fixtures'])->name('fixtures.reset');
Route::get('/teams/reset', [LeagueController::class, 'reset_teams'])->name('teams.reset');
Route::post('/fixtures/simulate/week', [LeagueController::class, 'simulate_week'])->name('fixtures.simulate.week');
Route::post('/fixtures/simulate/all', [LeagueController::class, 'simulate_all'])->name('fixtures.simulate.all');
