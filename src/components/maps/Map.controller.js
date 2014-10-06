angular
	.module('google.maps.controllers.Map', [])

	.controller('MapCtrl', function ($scope, $element, $attrs, $transclude, $q, $timeout, $document, Map, LatLng, googleMapsConfig, Map) {
		var self = this,
		ms = 800,
		options = {},
		markers = [];

		this.start = function () {
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
				if($attrs.onZoomChanged) {
					var fn = $parse($attrs.onZoomChanged);

					fn($scope, {
						$map: this
					});
				}
				$scope.$emit('map:zoom_changed', map);
			});

			google.maps.event.addListener(map, 'click', function () {
				if($attrs.onClick) {
					var fn = $parse($attrs.onClick);

					fn($scope, {
						$map: this
					});
				}
				$scope.$emit('map:click', map);
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
	})