<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\FacadesValidator;

use App\Http\Requests;

use App\Vote;

use DB;

class VoteController extends Controller
{

	public function store(Request $request)
    {
        $checkVotes = $request->input('uid');
       	$DATA = (array)DB::select( "SELECT * FROM votes WHERE uid = '$voteCount'");
       	$voteCount=0;
        foreach ($DATA as $row){
            $voteCount++;
        }
        if($voteCount<1)
        {
            $this->validate($request, array(
                'v_pid' => 'required',
                'votescore' => 'required'
            ));

            $vote = new Vote;
            
            $vote->v_pid = $request->input('v_pid');
            $vote->votescore = $request->input('votescore');
            $vote->uid = $request->input('uid');
            $vote->save();
        }
    }
}