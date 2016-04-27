<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\FacadesValidator;

use App\Http\Requests;

use App\Vote;

use DB;

class CommentController extends Controller
{

	 public function store(Request $request)
    {
       
        $this->validate($request, array(
            'v_pid' => 'required',
            'votescore' => 'required'
        ));

        $vote = new Vote;
        
        $vote->v_pid = $request->input('v_pid');
        $vote->votescore = $request->input('votescore');
        $vote->save();
    }
}