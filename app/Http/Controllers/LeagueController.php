<?php

namespace App\Http\Controllers;

use App\Http\Resources\FixtureResource;
use App\Http\Resources\TeamResource;
use App\Services\FixtureService;
use Illuminate\Http\Request;

class LeagueController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function teams(FixtureService $fixtureService)
    {
        return TeamResource::collection($fixtureService->teams);
    }

    public function fixtures(FixtureService $fixtureService)
    {
        return new FixtureResource($fixtureService);
    }

    public function reset_teams(FixtureService $fixtureService, Request $request)
    {
        $fixtureService->reset_teams($request);
        return new FixtureResource($fixtureService);
    }

    public function reset_fixtures(FixtureService $fixtureService)
    {
        $fixtureService->reset_fixtures();
        return new FixtureResource($fixtureService);
    }

    public function simulate_week(FixtureService $fixtureService)
    {
        $error = false;
        try {
            $fixtureService->simulate_week();
        } catch (\Throwable $th) {
            $error  = $th->getMessage();
        }
        return response()->json([
            'fixtures' => new FixtureResource($fixtureService),
            'error' => $error,
        ]);
    }

    public function simulate_all(FixtureService $fixtureService)
    {
        $error = false;
        try {
            $fixtureService->simulate_all();
        } catch (\Throwable $th) {
            $error  = $th->getMessage();
        }
        return response()->json([
            'fixtures' => new FixtureResource($fixtureService),
            'error' => $error,
        ]);
    }

    public function generate_fixtures(FixtureService $fixtureService)
    {
        $error = false;
        try {
            $fixtureService->generate_fixtures();
        } catch (\Throwable $th) {
            $error  = $th->getMessage();
        }
        return response()->json([
            'fixtures' => new FixtureResource($fixtureService),
            'error' => $error,
        ]);
    }
}
