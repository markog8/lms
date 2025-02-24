<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LeagueResource;
use App\Http\Requests\StoreLeagueRequest;
use App\Models\League;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LeagueController extends Controller
{
    /**
     * Display a listing of the leagues.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return LeagueResource::collection(League::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created league in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreLeagueRequest $request)
    {
        $data = $request->validated();
        $data['code'] = Str::uuid();
        $data['created_by_user_id'] = $request->user()->id;

        $league = League::create($data);
        return response(new LeagueResource($league), 201);
    }

    /**
     * Remove the specified league from storage.
     *
     * @param  \App\Models\League  $league
     * @return \Illuminate\Http\Response
     */
    public function destroy(League $league)
    {
        $league->delete();
        return response()->json(null, 204);
    }

    /**
     * Add a user to the specified league.
     *
     * @param  \App\Models\League  $league
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addUser($leagueId, Request $request)
    {
        $request->user()->leagues()->syncWithoutDetaching($leagueId);

        return response()->json(null, 204);
    }
}
