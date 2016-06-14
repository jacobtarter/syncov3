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
        $user = $request->input('uid');
        $post = $request->input('v_pid');
       	$DATA = (array)DB::select( "SELECT * FROM votes WHERE uid = '$user' AND v_pid = '$post'");
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
        else {
            return response("User has already voted");
        }
    }

    public function index($uid, $v_pid)
    {
        //$user = $request->input('uid');
        //$post = $request->input('v_pid');
        $DATA = (array)DB::select( "SELECT * FROM votes WHERE uid = '$uid' AND v_pid = '$v_pid'");
        $upVotes=0;
        $downVotes=0;
        foreach ($DATA as $row){
            $value = $row->votescore;
            if ($value == 1)
            {
                $upVotes++;
            }
            if ($value == -1)
            {
                $downVotes++;
            }
        }
        return response ("Upvotes: " + $upVotes + " Downvotes: " + $downVotes);


    }
}