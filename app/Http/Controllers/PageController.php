<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class PageController extends Controller
{
    //
	public function getIndex() {
		return view('pages.syncohome');
	}
	public function getRegister() {
		return view('auth.register');
	}

	public function getView() {
		return view('pages.viewpost');
	}
	public function getMaster() {
		return view('master');
	}



	public funtion getScitechMain(){
		return view('scitechmain');
	}
	public function getPlanet() {
		return view('planet');
	}
}
