<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/



Route::resource('posts', 'PostController');
Route::resource('user', 'UserController');

Route::get('/', 'PageController@getMaster');

Route::post('/auth', 'UserController@checkAuth');


Route::post( '/api/v1/posts', 'PostController@store' );
Route::delete( '/api/v1/posts/{pid}', 'PostController@destroy' );
Route::get ('/api/v1/posts/view', 'PageController@getView' );

Route::get( '/api/v1/posts/{pid?}', 'PostController@index' );
Route::get( '/api/v1/posts/test/{pid}', 'PostController@test');
//$router->post('/api/v1/posts', 'PostController@store', ['middleware' => 'JsonApiMiddleware']);


Route::get( '/api/v1/comments/{pid}', 'CommentController@getCommentsByPost');
Route::post('/api/v1/comments', 'CommentController@store' );



Route::group(['middleware' => ['web']], function () {

	

	
}
);
