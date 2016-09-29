<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\FacadesValidator;

use App\Http\Requests;

use App\QR;

use DB;

class QRController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($qrid = null)
    {

        //If optional parameter of post ID is given, return that post
        if(!is_null($qrid))
        {
            $DATA = (array)DB::select( "SELECT * FROM qr WHERE qr_id = '$qrid'");
        }
        //Otherwise return all posts
        else
        {
           $DATA = (array)DB::select( "SELECT * FROM qr" );
        }

        echo json_encode($DATA);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    /*
    public function create()
    {
        //
	return view('posts.create');
    }
    */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    //Create new post
    public function store(Request $request)
    {
        // store in database
        $this->validate($request, array(
            'title' => 'required',
            'description' => 'required',
            'link' => 'required'
        ));

        $qr = new QR;
        $qr->title = $request->input('title');
        $qr->description = $request->input('description');
        $qr->link = $request->input('link');
        $qr->save();
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

    //Update a post
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


    //Destroy a post with given ID, also destroy comments and votes attached to it
    public function destroy($id)
    {
        $post = Post::find($id);


        $post->delete();

        DB::delete("DELETE FROM comments WHERE c_pid = '$id'");
        DB::delete("DELETE FROM votes WHERE v_pid = '$id'");

        return "true";
    }

    /*
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
    */

}
