require.config({
	paths: {
		jquery: 'jquery/dist/jquery',
		underscore: 'underscore/underscore',
		backbone: 'backbone/backbone',
		handlebars: 'handlebars/handlebars',
		views: 'views/views',
		collections: 'collections/collections',
		models: 'models/models',
		helpers: 'helpers/helpers',
		bootstrap: 'bootstrap/dist/js/bootstrap'
	},
	shim: {
		handlebars: {
			exports: 'Handlebars'
		},
        bootstrap: {
            deps: ['jquery']
        }
	}
});

require(

	['app', 'jquery', 'bootstrap'], 

	function (App) {
		App.initialize();
	}
)