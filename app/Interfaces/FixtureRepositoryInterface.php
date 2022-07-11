<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface FixtureRepositoryInterface 
{
    public function getTeams(Request $request);
    public function getTeam($team_id);
    public function deleteTeams();
    public function getMatches();
    public function deleteFixtures();
    public function createMatch(array $match);
    public function getMatch($id);
    public function getWeek();
    public function setWeek($week);
    public function updateMatch($id, array $match);
}