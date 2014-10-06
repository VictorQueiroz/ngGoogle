angular
	.module('google.maps.controllers', [])

	.controller('MarkerCtrl', function ($scope, $element, $attrs) {
		var self = this;

		this.initialize = function () {

		};
	})

	.controller('MapCtrl', function ($scope, $element, $attrs, $transclude, $q, $timeout, $document, Map, LatLng, googleMapsConfig) {
		var self = this,
		ms = 800,
		options = {};

		$attrs.$observe('center', function (center) {
			center = $scope.$eval(center);

			console.log(center);

			self.map.setCenter(new LatLng(center[0], center[1]));
		});

		this.initialize = function () {
			if($attrs.center) {
				options.center = $scope.$eval($attrs.center);
			}

			if($attrs.zoom) {
				options.zoom = $scope.$eval($attrs.zoom);
			}

			options = angular.extend(googleMapsConfig, options);
			options.center = new LatLng(options.center[0], options.center[1]);
			var map = this.map = new Map($element.children('#map')[0], options);
		};

		this.getMap = function () {
			var deferred = $q.defer();
			$timeout(function () {
				deferred.resolve(self.map);
			}, ms);
			return deferred.promise;
		};
	});