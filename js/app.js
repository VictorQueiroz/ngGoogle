angular.module('app', ['ui.router', 'google'])

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/home/index');
	$locationProvider.hashPrefix('!@');
	$stateProvider
		.state('home', {
			url: '/home',
			template: '<div class="container"><div class="row"><div class="col-lg-12" ui-view></div></div></div>'
		})
		.state('home.index', {
			url: '/index',
			templateUrl: 'templates/index.tpl.html'
		});
})

.controller('MyMapCtrl', function ($scope){
	$scope.$on('map:dragend', function (event, map) {
		var center = map.getCenter();

		$scope.map.center.lat = center.lat();
		$scope.map.center.lng = center.lng();

		console.log('You moved the map!');
	});
});

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});