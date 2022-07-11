<?php

return [
     /*
    * This is the driver to use for data.
    * 'cache' - use the cache driver. (default)
    * 'db' - use the database driver. 
    */
    'driver' => env('SIMULATION_DRIVER', 'cache'),

    /*
    * This is the number of teams which will be in the simulation.
    * minumum: 1, maximum: 20 (default: 4)
    */
    'group_size' => env('SIMULATION_GROUP_SIZE', 4),

    /*
    * Type of team selection.
    * 'random' - random selection of teams
    * 'sequential' - sequential selection of teams (default, no randomness, begins from top)
    */
    'team_selection' => env('SIMULATION_TEAM_SELECTION', 'sequential'),
];
