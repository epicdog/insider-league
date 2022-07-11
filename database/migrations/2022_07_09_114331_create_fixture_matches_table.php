<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fixture_matches', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('week', false, true);
            $table->tinyInteger('home_id', false, true);
            $table->tinyInteger('away_id', false, true);
            $table->tinyInteger('home_score', false, true)->default(0);
            $table->tinyInteger('away_score', false, true)->default(0);
            $table->boolean('is_completed')->default(false);
            $table->boolean('is_dummy')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fixture_matches');
    }
};
