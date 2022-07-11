<?php

namespace App\Services;

use App\Exceptions\FixtureException;
use App\Interfaces\FixtureRepositoryInterface as FixtureRepository;
use App\Models\Team;
use Illuminate\Http\Request;

class FixtureService
{
    protected $repository;
    protected $simulator;
    public $teams;
    public $matches;
    public $week = 0;

    public function __construct(FixtureRepository $repository, SimulationService $simulator, Request $request)
    {
        $this->repository = $repository;
        $this->simulator = $simulator;
        $this->teams = $repository->getTeams($request);
        $this->matches = $repository->getMatches();
        $this->week = $repository->getWeek();
    }

    public function generate_fixtures()
    {
        if (count($this->matches) > 0) {
            throw new FixtureException("A fixture already exists");
        }

        if (count($this->teams) < 2) {
            throw new FixtureException("At least 2 teams needed to build tournament");
        }

        $this->repository->deleteFixtures();
        $fixture = [];
        $teamIDs = collect($this->teams)->pluck('id')->shuffle();

        if (count($teamIDs) % 2 == 1) {
            $teamIDs[] = "dummy"; // if number of teams is even, add a dummy team that means 'this team don't play this round'
        }

        for ($round = 0; $round < count($teamIDs) - 1; ++$round) {
            $fixture[] = $this->match_teams($teamIDs);
            $teamIDs = $this->rotate_teams($teamIDs);
        }

        $weeksDiff = count($fixture);
        foreach ($fixture as $week => $matches) {
            foreach ($matches as $match) {
                $match['week'] = $week + 1;
                $awayMatches[] = [
                    'week' => $week + 1 + $weeksDiff,
                    'home_id' => $match['away_id'],
                    'away_id' => $match['home_id'],
                    'is_dummy' => $match['is_dummy'] ?? false,
                ];
                $this->matches[] = $this->repository->createMatch($match);
            }
        }

        foreach ($awayMatches as $key => $match) {
            $this->matches[] = $this->repository->createMatch($match);
        }

        $this->matches = $this->repository->getMatches();
        return $this;
    }

    public function reset_fixtures()
    {
        $this->week = 0;
        $this->repository->setWeek($this->week);
        $this->repository->deleteFixtures();
        $this->matches = $this->repository->getMatches();
        return $this;
    }

    public function reset_teams(Request $request)
    {
        $this->repository->deleteTeams();
        $this->matches = $this->repository->getMatches();
        return $this;
    }

    public function simulate_week()
    {
        $week = $this->repository->getWeek();
        if (((count($this->teams) - 1) * 2) <= $week) {
            return $this;
        }
        $week++;

        $matches = collect($this->matches)->filter(function ($match, $key) use ($week) {
            return $match->week == $week;
        });

        foreach ($matches as $match) {
            if ($match->is_dummy) {
                break;
            }
            $home_team = $this->repository->getTeam($match->home_id);
            $away_team = $this->repository->getTeam($match->away_id);
            $result = $this->simulator->simulate($home_team, $away_team);
            $match->home_score = $result->home_score;
            $match->away_score = $result->away_score;
            $match->is_completed = true;
            $this->repository->updateMatch($match->id, $match->toArray());
        }

        $this->repository->setWeek($week);
        $this->week = $week;
        $this->matches = $this->repository->getMatches();
        return $this;
    }

    public function simulate_all()
    {
        foreach ($this->matches as $match) {
            if ($match->is_dummy || $match->is_completed) {
                break;
            }
            $home_team = Team::find($match->home_id);
            $away_team = Team::find($match->away_id);
            $result = $this->simulator->simulate($home_team, $away_team);
            $match->home_score = $result->home_score;
            $match->away_score = $result->away_score;
            $match->is_completed = true;
            $this->repository->updateMatch($match->id, $match->toArray());
        }

        $week = ((count($this->teams) - 1) * 2);
        $this->repository->setWeek($week);
        $this->week = $week;
        $this->matches = $this->repository->getMatches();
        return $this;
    }

    private function match_teams($teams)
    {
        $matches = [];
        for ($i = 0; $i < count($teams) / 2; ++$i) {
            $opponent = count($teams) - 1 - $i;

            if ($teams[$i] == 'dummy') {
                $match = [
                    'home_id' => 0,
                    'away_id' => $teams[$opponent],
                    'is_dummy' => true
                ];
            } elseif ($teams[$opponent] == 'dummy') {
                $match = [
                    'home_id' => $teams[$i],
                    'away_id' => 0,
                    'is_dummy' => true
                ];
            } else {
                $match = [
                    'home_id' => $teams[$i],
                    'away_id' => $teams[$opponent]
                ];
            }
            $matches[] = $match;
        }

        return $matches;
    }

    // rotate all teams but the first one
    private function rotate_teams($teams)
    {
        $result = $teams;

        $tmp = $result[count($result) - 1];
        for ($i = count($result) - 1; $i > 1; --$i) {
            $result[$i] = $result[$i - 1];
        }
        $result[1] = $tmp;

        return $result;
    }
}
