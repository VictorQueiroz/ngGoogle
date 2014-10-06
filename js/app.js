angular.module('app', ['ui.router', 'google'])

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/home/index');
	$locationProvider.hashPrefix('!@');
	$stateProvider
		.state('home', {
			url: '/home',
			template: '<div class="container"><div class="row"><div class="col-lg-12"><h2>ngGoogle</h2> <div ui-view></div></div></div></div>'
		})
		.state('home.index', {
			url: '/index',
			templateUrl: 'templates/index.tpl.html',
			controller: 'MyMapCtrl'
		});
})

.controller('MyMapCtrl', function ($scope, $http){
	$scope.map = new Object;
	$http.get('js/app.js').then(function (res) {
		$scope.code = res.data.replace(/\n/g, "\n");
	});

	$scope.markers = [{
		position: [45.3984494586924, 20.66528281249999]
	}, {
		position: [57.13623891916378, 51.07543906249999]
	}, {
		position: [56.75272246790809, 8.536376562499987]
	}, {
		position: [51.508742, -0.120850]
	}, {
		position: [45.64476770240144, 5.592040624999988]
	}, {
		position: [45.64476770240144, 5.592040624999988]
	}, {
		position: [49.78126358219004, 10.909423437499987]
	}, {
		position: [41.57436075452492, -3.5046390625000123]
	}, {
		position: [48.66194235917708, 28.531493749999985]
	}, {
		position: [50.70863393401267, 60.21606406249999]
	}, {
		position: [60.82349397317409, 64.69848593749998]
	}, {
		position: [59.31076757980736, 82.93579062499998]
	}];

	$scope.$on('map:zoom_changed', function (event, map) {
		if(map.getZoom()!==$scope.map.zoom) {
			$scope.$apply(function () {
				$scope.map.zoom = map.getZoom();
			});
		}
	});

	$scope.$on('map:dragend', function (event, map) {
		var center = map.getCenter();

		$scope.$apply(function () {
			$scope.map.center = [center.lat(), center.lng()];
		});

		console.log('You moved the map!');
	});

	$scope.$on('map:click', function (event, map) {
		console.log('You clicked in the map', map);
	});

	$scope.$on('marker:click', function (event, marker) {
		marker.setMap(null);

		console.log('You clicked in this marker.');
	});

	$scope.$on('marker:mouseover', function (event, marker) {
		console.log('Your mouse is hover the marker', marker);
	});
});

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});