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



//Resource routes, will probably be deleted
//Route::resource('posts', 'PostController');
//Route::resource('user', 'UserController');

/*

//Home route, directs to main template page
Route::get('/', 'PageController@getMaster');

//Route for checking authorization on login

Route::post('/auth', 'UserController@checkAuth');

//--Posts
//Create
Route::post( '/api/v1/posts', 'PostController@store' )->middleware('throttle: 5,10');
//Read
Route::get( '/api/v1/posts/{pid?}', 'PostController@index' );
//Update
Route::post ( 'api/v1/posts/{id}', 'PostController@update' );
//Destroy
Route::delete( '/api/v1/posts/{pid}', 'PostController@destroy' );

//--Comments
//Create
Route::post( '/api/v1/comments', 'CommentController@store' );
//Read
Route::get( '/api/v1/comments/{pid}', 'CommentController@getCommentsByPost');

//--Votes
//Create
Route::post( '/api/v1/votes', 'VoteController@store' );
//Read
Route::get ( '/api/v1/votes/{uid}', 'VoteController@index');
//Update
Route::post ( '/api/v1/votes/{id}', 'VoteController@update');

//Register user
Route::post('authentication/register', 'UserController@store');
//Route::get('authentication/register', 'UserController@create');
//Route::get('auth/register', 'Auth\AuthController@getRegister');

Route::controllers([
	'password' => 'Auth\PasswordController',
]);

Route::delete( '/admin/posts', 'PostController@destroyByUser' );

*/

Route::get('/', 'PageController@getScitechMain');
Route::get ('scitech/planet', 'PageController@getPlanet');
Route::get ('scitech/stars', 'PageController@getStars');
Route::get ('scitech/asteroids', 'PageController@getAsteroids');
Route::get ('scitech/solarsys', 'PageController@getSolarSys');
Route::get ('scitech/planetsci', 'PageController@getPlanetSci');
Route::get ('scitech/planetsize', 'PageController@getPlanetSize');
Route::get ('scitech/moons', 'PageController@getMoons');
Route::get ('scitech/galaxy', 'PageController@getGalaxy');
Route::get ('scitech/darkmatter', 'PageController@getDarkMatter');
Route::get ('scitech/telescope', 'PageController@getTelescope');



//$router->post('/api/v1/posts', 'PostController@store', ['middleware' => 'JsonApiMiddleware']);
//Route::get( '/api/v1/posts/test/{pid}', 'PostController@test');
//Route::get ('/api/v1/posts/view', 'PageController@getView' );
Route::group(['middleware' => ['web']], function () {




}
);

//Route::auth();

//Route::get('/home', 'HomeController@index');

Route::auth();

Route::get('/home', 'HomeController@index');
