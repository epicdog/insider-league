<?php

namespace App\Repositories;

use App\Interfaces\FixtureRepositoryInterface;
use App\Models\FixtureMatch;
use App\Models\FixtureTeam;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CacheFixtureRepository  implements FixtureRepositoryInterface
{
    public function getTeams(Request $request)
    {
        $cached_teams = Cache::rememberForever('teams', function () use ($request) {
            return $this->select_teams($request);
        });
        $teams = [];
        foreach ($cached_teams as $team) {
            $teams[] = (new Team)->fill((array)$team);
        }
        return $teams;
    }

    public function getTeam($team_id){
        $teams = Cache::get('teams');
        $team = collect($teams)->where('id', $team_id)->first();
        return  (new Team)->fill((array)$team);
    }

    public function deleteTeams()
    {
        Cache::forget('teams');
        Cache::forget('fixtures');
        Cache::forget('week');
    }

    public function getMatches()
    {
        $fixtures = Cache::get('fixtures') ?? [];
        $matches = [];
        foreach ($fixtures as $match) {
            $matches[] = (new FixtureMatch())->fill((array)$match);
        }

        return collect($matches)->sortBy([
            ['week', 'asc'],
            ['id', 'asc'],
        ])->map(function ($item, $key) {
            $item['id'] = $key;
            return $item;
        });
    }

    public function deleteFixtures()
    {
        Cache::forget('fixtures');
        Cache::forget('week');
    }

    public function createMatch(array $match)
    {
        $fixture = Cache::get('fixtures');
        $fixture[] = $match;
        Cache::put('fixtures', $fixture);
    }

    public function getMatch($id)
    {
        return Cache::get('fixtures')[$id];
    }

    public function updateMatch($id, array $match)
    {
        $fixtures = Cache::get('fixtures');
        $fixtures[$id] = $match;
        Cache::put('fixtures', $fixtures);
    }

    public function getWeek()
    {
        return Cache::get('week', 0);
    }

    public function setWeek($week)
    {
        Cache::put('week', $week);
    }

    private function select_teams(Request $request)
    {
        $teams = collect(config('teams'));

        if ($request->get('team_selection', config('simulation.team_selection', 'sequantial')) == 'random') {
            $teams = $teams->shuffle();
        }

        return $teams->take((int)$request->get('group_size', config('simulation.group_size', 4)));
    }
}
