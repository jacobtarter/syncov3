var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');

    mix.scripts([
    		'app.js'

    	], 'public/js/app.js');

    mix.scripts([
    		'controllers/userController.js',
            'controllers/editController.js',
            'controllers/showController.js',
            'controllers/commentController.js'
    	], 'public/js/controllers.js');

    mix.version([
    	'js/all.js',
    	'js/factories.js',
    	'js/controllers.js'
    ]);
});
