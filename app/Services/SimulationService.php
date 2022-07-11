<?php

namespace App\Services;

class SimulationService
{
    private $home_team;
    private $away_team;
    public $home_score = 0;
    public $away_score = 0;

    public function simulate($home_team, $away_team)
    {
        $this->home_team = $home_team;
        $this->away_team = $away_team;
        $this->home_score = 0;
        $this->away_score = 0;
        for ($i = 0; $i < 90; $i++) {
            $possession = $this->possession();
            if ($possession) {
                $attack = $this->attack($possession);
                if ($attack) {
                    $this->{$possession . "_score"}++;
                }
            }
        }
        return $this;
    }

    private function possession()
    {
        $rand = mt_rand(0, 200);
        if ($rand <= $this->home_team->ova) {
            return "home";
        } elseif (
            $rand <= ($this->home_team->ova + $this->away_team->ova)
        ) {
            return "away";
        }
        return false;
    }

    private function attack($attack)
    {
        $attacker = $attack == "home" ? $this->home_team : $this->away_team;
        $defender = $attack == "home" ? $this->away_team : $this->home_team;

        $att_rand = mt_rand(0, 100);
        if ($att_rand >= $attacker->att) {
            return;
        }
        $def_rand = mt_rand(0, 100);
        if ($def_rand < $defender->mid) {
            return;
        }

        $shot_rand = mt_rand(0, 100);
        if ($shot_rand >= $attacker->att) {
            return;
        }

        $def_rand = mt_rand(0, 100);
        if ($def_rand < $defender->def) {
            return;
        }

        $goal_rand = mt_rand(0, 100);
        if ($goal_rand >= $attacker->att) {
            return;
        }

        return true;
    }
}
