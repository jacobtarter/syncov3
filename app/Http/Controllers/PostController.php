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
    
        /*
        if(!is_null($pid))
        {
            $WHERE= "
                SELECT p.id, p.title, p.ptext, p.name, p.created_at, c.cid, c.c_pid, c.ctext, c.name, c.created_at, v.vid, v.votescore, v.v_pid, v.name, v.created_at
                FROM posts p 
                LEFT JOIN comments c ON p.id = c.c_pid
                LEFT JOIN votes v ON p.id = v.v_pid
                WHERE p.id = '$pid';
            ";
        }
        else 
        {
            $WHERE= "
            SELECT p.id, p.title, p.ptext, p.name, p.created_at, c.cid, c.c_pid, c.ctext, c.name, c.created_at, v.vid, v.votescore, v.v_pid, v.name, v.created_at
            FROM posts p 
            LEFT JOIN comments c ON p.id = c.c_pid
            LEFT JOIN votes v ON p.id = v.v_pid;
            ";  
        }   

        $DATA = (array)DB::select( "$WHERE" );
        
        $postsFinal = array();
        $comments = array();
        $current = null;
        $previousID = null;
        $checkedPostScore=null;
        $previousComment=null;
        $previousVote=null; 
        $commentCount=0;
        $downvotes=0;
        $upvotes=0;
        $voteScore=0;
        $commentBlock=null;
        $voteBlock=null;
        
        

        foreach($DATA as $row){
            if($row->id != $previousID)
            {
                if( !is_null($current))
                {
                    $current['num_comments'] = $commentCount;
                    $current['upvotes'] = $upvotes;
                    $current['downvotes'] = $downvotes;
                    $current['post_score'] = ($upvotes-$downvotes);
                    $currentBlock['about'] = $current;
                    $currentBlock['comments'] = $commentBlock;  
                    $currentBlock['votes'] = $voteBlock;
                    $postsFinal[] = $currentBlock;
                    $current = null;
                    $votes=null;
                    $voteBlock = null;
                    $currentBlock = null;
                    $commentBlock = null;
                    $previousID = null;
                    $previousComment = null;
                    $previousVote = null;
                    $commentCount = 0;
                    $upvotes=0;
                    $downvotes=0;
                    $comments = array();
                }
            $currentBlock = array();
            $current = array();
            $checkedPostScore = null;
            $current['id'] = $row->id;
            $current['title'] = $row->title;
            $current['ptext'] = $row->ptext;
            $current['name'] = $row->name;
            $current['created_at'] = $row->created_at;

            $previousID = $current['id'];

            }

            if ($row->cid!=$previousComment)
            {
                $comments['cid'] = $row->cid;
                $comments['ctext'] = $row->ctext;
                $comments['name'] = $row->name;
                $comments['created_at'] = $row->created_at;
                $commentBlock[] = $comments;
                $previousComment = $row->cid;
                $comments = null;
                $commentCount++;
            }

            if ($row->vid!=$previousVote)
            {
                $votes['vid'] = $row->vid;
                $votes['votescore'] = $row->votescore;
                $votes['name'] = $row->name;
                $votes['created_at'] = $row->created_at;
                $voteBlock[]= $votes;
                $previousVote = $row->vid;
                if($row->votescore == 1)
                {
                    $upvotes++;
                }
                if($row->votescore == -1)
                {
                    $downvotes++;
                }
                $votes = null;  
            }

            
        }
        if (!is_null($current))
        {
            $current['num_comments'] = $commentCount;
            $current['upvotes'] = $upvotes;
            $current['downvotes'] = $downvotes;
            $current['post_score'] = ($upvotes-$downvotes);
            $currentBlock['about']=$current;
            $currentBlock['comments']=$commentBlock;
            $currentBlock['votes']=$voteBlock;
            $postsFinal[] = $currentBlock;
        }
        
        print (json_encode($postsFinal));
        //echo json_encode($DATA);
        */

        $DATA = (array)DB::select( "SELECT * FROM posts" );
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
        //
	// validate data
        /*
        $validation = Validator::make(
            $request->all(),
            [
                'title' =>'required'
                'ptext' =>'required'
            ]
        );

            
        if ($validation->fails()) {
            return response(403, "Invalid Post");
        }
        */

        // store in database
        $this->validate($request, array(
            'title' => 'required',
            'ptext' => 'required'
        ));

        $post = new Post;
        $post->title = $request->input('title');
        $post->ptext = $request->input('ptext');
        $post->name = $request->input('name');
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

    public function test($pid)
    {
        $result = Post::find($pid);
        print (json_encode($result));
    }
    
}
