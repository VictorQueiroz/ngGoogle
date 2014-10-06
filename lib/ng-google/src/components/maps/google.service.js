angular
	.module('google.maps.services.google', [])

	.factory('google', function ($window) {
		return $window.google;
	});