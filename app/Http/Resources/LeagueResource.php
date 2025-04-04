<?php

namespace App\Http\Resources;

use App\Http\Resources\LeagueUserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class LeagueResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'created_by_user_id' => $request->user()->id,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'users' => LeagueUserResource::collection($this->whenLoaded('users')),
        ];
    }
}
