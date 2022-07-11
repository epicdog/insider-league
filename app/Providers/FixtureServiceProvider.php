<?php

namespace App\Providers;

use App\Interfaces\FixtureRepositoryInterface as FixtureRepository;
use App\Repositories\CacheFixtureRepository;
use App\Repositories\DBFixtureRepository;
use App\Services\SimulationService;
use Illuminate\Support\ServiceProvider;

class FixtureServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(FixtureRepository::class, function ($app) {
            config('simulation.driver') == 'db' ?
                $repository = new DBFixtureRepository() :
                $repository = new CacheFixtureRepository();
            return $repository;
        });

        $this->app->singleton(SimulationService::class, SimulationService::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
