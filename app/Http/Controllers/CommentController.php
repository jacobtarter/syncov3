<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\FacadesValidator;

use App\Http\Requests;

use App\Comment;

use DB;

class CommentController extends Controller
{

	public function getCommentsByPost($pid)
    {
		$WHERE= "
	                SELECT c.cid, c.ctext, c.name, c.c_pid, c.created_at, c.updated_at
	                FROM comments c 
	                
	                WHERE c.c_pid = '$pid';
	            ";
	    $DATA = (array)DB::select( "$WHERE" );
	    echo json_encode($DATA);
	}

	 public function store(Request $request)
    {
       
        $this->validate($request, array(
            'ctext' => 'required',
            'c_pid' => 'required'
        ));

        $comment = new Comment;
        
        $comment->ctext = $request->input('ctext');
        $comment->c_pid = $request->input('c_pid');
        $comment->save();
    }
}