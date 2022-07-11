<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MatchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
         'id' => $this->id ?? 1,
         'week' => $this->week ,
         'home_id' => $this->home_id ?? null,
         'away_id' => $this->away_id ?? null,
         'home_score' => $this->home_score ?? 0,
         'away_score' => $this->away_score ?? 0,
         'is_completed' => $this->is_completed ?? false,
         'is_dummy' => $this->is_dummy ?? false,
        ];
    }
}
