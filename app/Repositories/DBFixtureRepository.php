<?php

namespace App\Repositories;

use App\Interfaces\FixtureRepositoryInterface;
use App\Models\FixtureMatch;
use App\Models\FixtureTeam;
use App\Models\Team;
use Illuminate\Http\Request;

class DBFixtureRepository  implements FixtureRepositoryInterface
{
    public function getTeams(Request $request)
    {
        $teams = FixtureTeam::with('team')->get()->pluck('team');
        if ($teams->count() < 1) {
            $teams = $this->select_teams($request);
        }
        return $teams;
    }

    public function getTeam($team_id){
        return Team::find($team_id);
    }

    public function deleteTeams()
    {
        FixtureTeam::truncate();
        FixtureMatch::truncate();
    }

    public function getMatches()
    {
        return FixtureMatch::all();
    }

    public function deleteFixtures()
    {
        FixtureMatch::truncate();
    }

    public function createMatch(array $match)
    {
        return FixtureMatch::create($match);
    }

    public function getMatch($id)
    {
        return FixtureMatch::find($id);
    }

    public function updateMatch($id, array $match)
    {
        FixtureMatch::find($id)->update($match);
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
        $db_teams = [];
        $teams = Team::select('id as team_id')->limit((int)$request->get('group_size', config('simulation.group_size')));

        if ($request->get('team_selection', config('simulation.team_selection')) == 'random') {
            $teams = $teams->inRandomOrder();
        }
        foreach ($teams->get()->toArray() as $team) {
            $db_teams[] = FixtureTeam::create($team);
        }
        return $db_teams;
    }
}
