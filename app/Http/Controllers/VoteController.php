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
       	$upvote=0;
        $downvote=0;
        $voteid;
        foreach ($DATA as $row){
            if ($row->votescore == 1)
            {
                $upvote++;
                $voteid = $row->id;
            }
            if ($row->votescore == -1)
            {
                $downvote++;
                $voteid = $row->id;
            }
        }
        if(($upvote + $downvote) < 1)
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
        else if ($downvote == 1 && $request->input('votescore') == 1)
        {
            $vote = Vote::find($voteid);

            $vote->votescore = 1;
            $vote->save();
            return response("vote changed to upvote");
        }
        else if ($upvote == 1 && $request->input('votescore') == -1)
        {
            $vote = Vote::find($voteid);

            $vote->votescore = -1;
            $vote->save();
            return response("vote changed to downvote");
            
        }
        else {
            return response("User has already voted");
        }
    }

    public function update(Request $request, $id)
    {
        $vote = Post::find($id);

        $vote->title = $request->input('title');
        $vote->ptext = $request->input('ptext');
        $vote->save();

        return "Sucess updating vote #" . $post->id;
    }

    public function index($uid)
    {
        //$user = $request->input('uid');
        //$post = $request->input('v_pid');
        $DATA = (array)DB::select( "SELECT * FROM votes WHERE uid = '$uid'");
        
        $voteTotal = [];
        foreach ($DATA as $row){
            $currentRow = [];
            $upVotes=0;
            $downVotes=0;
            $value = $row->votescore;
            if ($value == 1)
            {
                $upVotes++;
            }
            if ($value == -1)
            {
                $downVotes++;
            }
            $currentRow['v_pid'] = $row->v_pid;
            $currentRow['upvotes']= $upVotes;
            $currentRow['downvotes']= $downVotes;
            $voteTotal[] = $currentRow;
        }
        
        
        return response ($voteTotal);


    }
}