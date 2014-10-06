angular
	.module('google.maps.services', [])

	.factory('google', function ($window) {
		return $window.google;
	})

	.factory('Map', function () {
		return google.maps.Map;
	})

	.factory('LatLng', function () {
		return google.maps.LatLng;
	});