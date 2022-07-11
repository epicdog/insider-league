<?php

namespace App\Http\Controllers;

use App\Services\FixtureService;
use Illuminate\Http\Request;

class MonteCarloController extends Controller
{
    public function process(FixtureService $fixtureservice, Request $request)
    {
        $teams = [];

        foreach ($fixtureservice->matches as $match) {
            if ($match->is_completed) {
                if ($match->home_score > $match->away_score) {
                    $teams[$match->home_id][] = [3, 3, 3];
                    $teams[$match->away_id][] = [0, 0, 0];
                } elseif ($match->home_score < $match->away_score) {
                    $teams[$match->home_id][] = [0, 0, 0];
                    $teams[$match->away_id][] = [3, 3, 3];
                } else {
                    $teams[$match->home_id][] = [1, 1, 1];
                    $teams[$match->away_id][] = [1, 1, 1];
                }
            } elseif (!$match->is_dummy) {
                $home = collect($fixtureservice->teams)->where('id', $match->home_id)->first();
                $away = collect($fixtureservice->teams)->where('id', $match->away_id)->first();

                if ($home->ov > $away->ov) {
                    $teams[$match->home_id][] = [3, 3, 1];
                    $teams[$match->away_id][] = [1, 0, 0];
                } elseif ($away->ov > $home->ov) {
                    $teams[$match->home_id][] = [1, 0, 0];
                    $teams[$match->away_id][] = [3, 3, 1];
                } else {
                    $teams[$match->home_id][] = [3, 1, 0];
                    $teams[$match->away_id][] = [3, 1, 0];
                }
            }
        }

        $n = $request->get("n", 1000);

        $result_set = [];
        foreach ($teams as $team_id  => $data) {
            $result_set[$team_id] = [];
            for ($i = 0; $i < $n; $i++) {
                $r = $this->walk($data);
                isset($result_set[$team_id][$r]) ?  $result_set[$team_id][$r]++ : $result_set[$team_id][$r] = 1;
            }
        }

        $max = 0;
        $min = 0;
        $leader = 0;

        foreach ($result_set as $team_id => &$data) {
            \ksort($data);
            $leader = array_key_last($data) > $max ? $team_id : $leader;
            $max = array_key_last($data) > $max ? array_key_last($data) : $max;
        }

        $min = array_key_first($result_set[$leader]);

        $probality_list = [];
        $total = 0;
        foreach ($result_set as $team_id => &$data) {
            $probality_list[$team_id] = 0;
            if (isset($data[$min])) {
                $probality_list[$team_id] = array_key_last($data) - $min + 1;
                $total += $probality_list[$team_id];
            }
        }

        
        foreach ($probality_list as $team_id => &$value) {
            $value  = ['team_id' => $team_id, 'probability' => number_format(($value / $total) * 100, 2)];
        }
        
        \arsort($probality_list);
        return response()->json($probality_list);
    }

    private function walk($arr)
    {
        $s = 0;
        foreach ($arr as $sub) {
            $s += $this->randomize($sub);
        }

        return $s;
    }

    private function randomize($arr)
    {
        $sel = \mt_rand(0, count($arr) - 1);
        return $arr[$sel];
    }
}
