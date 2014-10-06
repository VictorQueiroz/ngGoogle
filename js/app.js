angular.module('app', ['ui.router', 'google'])

.config(function ($stateProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			template: '<div class="container"><div class="row"><div class="col-lg-12" ui-view></div></div></div>'
		})
		.state('home.index', {
			url: '/index',
			templateUrl: 'index.tpl.html'
		})
});

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});