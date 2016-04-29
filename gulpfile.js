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
            'controllers/commentController.js',
            'controllers/postController.js',
            'controllers/adminController.js'
    	], 'public/js/controllers.js');

    mix.scripts([
        'models/userModel.js',
        'models/apiModel.js'
    ], 'public/js/models.js');

    mix.version([
    	'js/app.js',
    	'js/factories.js',
    	'js/controllers.js',
        'js/models.js'
    ]);
});
