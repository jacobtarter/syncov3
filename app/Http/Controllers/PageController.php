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



	public function getScitechMain(){
		return view('scitechmain');
	}
	public function getPlanet() {
		return view('planet');
	}
	public function getStars() {
		return view('stars');
	}
	public function getAsteroids(){
		return view('asteroids');
	}
	public function getSolarSys(){
		return view('solarsys');
	}
	public function getPlanetSci(){
		return view('planetsci');
	}
	public function getPlanetSize(){
		return view('planetsize');
	}
	public function getMoons(){
		return view('moons');
	}
	public function getGalaxy(){
		return view('galaxy');
	}
	public function getDarkMatter(){
		return view('darkmatter');
	}
}
