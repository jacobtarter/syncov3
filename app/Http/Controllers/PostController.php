<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\FacadesValidator;

use App\Http\Requests;

use App\Post;

use DB;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($pid = null)
    {
    
        if(!is_null($pid))
        {
            $DATA = (array)DB::select( "SELECT * FROM posts WHERE id = '$pid'");
        }
        else
        {
           $DATA = (array)DB::select( "SELECT * FROM posts" ); 
        }

        $responseArray=[];
        foreach($DATA as $row){
            $current = [];
            $id = $row->id;
            $COMMENTS = (array)DB::select( "SELECT * FROM comments WHERE c_pid = '$id'");
            $commentCount=0;
            foreach($COMMENTS as $commentRow)
            {
                $commentCount++;
            }
            $VOTES = (array)DB::select( "SELECT * FROM votes WHERE v_pid = '$id'");
            $upvotes=0;
            $downvotes=0;
            foreach($VOTES as $voteRow)
            {
                if($voteRow->votescore == 1)
                {
                    $upvotes++;
                }
                if($voteRow->votescore == -1)
                {
                    $downvotes++;
                }
            }
            $current['id']=$row->id;
            $current['title']=$row->title;
            $current['ptext']=$row->ptext;
            $current['name']=$row->name;
            $current['created_at']=$row->created_at;
            $current['updated_at']=$row->updated_at;
            $current['comment_count']=$commentCount;
            $current['upvotes']=$upvotes;
            $current['downvotes']=$downvotes;
            $current['vote_score']=$upvotes-$downvotes;
            $responseArray[] = $current;

        }


        echo json_encode($responseArray);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
	return view('posts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // store in database
        $this->validate($request, array(
            'title' => 'required',
            'ptext' => 'required',
            'name' => 'required',
            'uid' => 'required'
        ));

        $post = new Post;
        $post->title = $request->input('title');
        $post->ptext = $request->input('ptext');
        $post->name = $request->input('name');
        $post->uid = $request->input('uid');
        $post->save();
        //return redirect('/');	
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        $post->title = $request->input('title');
        $post->ptext = $request->input('ptext');
        $post->save();

        return "Sucess updating post #" . $post->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    /*
    public function destroy(Request $request, $pid) 
    {
        //$pid = $request->input('pid');
    	$post = Post::find($pid);
        $post->delete();
        return "Post successfully deleted at post ID: " . $request->input('pid');
        //Session::flash('success', 'The post was deleted.');
        //console.log( "sql: " + $DEL );
        //$affected = Post::where('pid', '=', $pid)->delete();
        //return $affected;
    }
    */

    public function destroy($id) 
    { 
        $post = Post::find($id);
        

        $post->delete();

        DB::delete("DELETE FROM comments WHERE c_pid = '$id'");
        DB::delete("DELETE FROM votes WHERE v_pid = '$id'");

        return "true";
    }

    public function destroyByUser(Request $request)
    {
        $id = $request->input('uid');
        $posts = DB::delete("DELETE FROM posts WHERE uid = '$id'");
        return response("$posts");
    }

    public function test($pid)
    {
        $result = Post::find($pid);
        print (json_encode($result));
    }
    
}
