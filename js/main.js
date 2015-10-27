/**
 * Main app initialization and initial auth check
 */
// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	'shim': {
		'underscore': {
			'exports': '_'
		},
		'backbone': {
			'deps': [
				'underscore',
				'jquery'
			],
			'exports': 'Backbone'
		}
	},
	'paths': {
		'jquery': 'bower_components/jquery/dist/jquery',
		'underscore': 'bower_components/underscore/underscore',
		'backbone': 'bower_components/backbone/backbone',
		'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
		'text': 'bower_components/text/text'
	}
});
require([
    "jquery", "underscore", "bootstrap"
],
function($, _, B$) {

});