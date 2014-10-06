angular
	.module('google.maps.controllers', [])

	.controller('MarkerCtrl', function ($scope, $element, $attrs, google, Marker, LatLng) {
		var self = this,
		options = {};

		this.initialize = function (mapCtrl) {
			if($attrs.position) {
				options.position = $scope.$eval($attrs.position);
			}

			if($attrs.title) {
				options.title = $scope.$eval($attrs.title);
			}

			options.position = new LatLng(options.position[0], options.position[1]);

			self.marker = new Marker(options);

			mapCtrl.getMap().then(function (map) {
				self.marker.setMap(map);
			});

			mapCtrl.addMarker(self.marker);

			google.maps.event.addListener(self.marker, 'mouseover', function () {
				$scope.$emit('marker:mouseover', self.marker);
			});
		};
	})

	.controller('MapCtrl', function ($scope, $element, $attrs, $transclude, $q, $timeout, $document, Map, LatLng, googleMapsConfig) {
		var self = this,
		ms = 800,
		options = {},
		markers = [];

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

			google.maps.event.addListener(map, 'zoom_changed', function () {
				$scope.$emit('map:zoom_changed', map);
			});
		};

		this.getMap = function () {
			var deferred = $q.defer();
			$timeout(function () {
				deferred.resolve(self.map);
			}, ms);
			return deferred.promise;
		};

		this.addMarker = function (marker) {
			markers.push(marker);
		};

		this.getMarkers = function () {
			var deferred = $q.defer();
			$timeout(function () {
				deferred.resolve(markers);
			}, ms);
			return deferred.promise;
		};
	});