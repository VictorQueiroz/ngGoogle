angular
	.module('google.maps.services.Map', [])

	.factory('Map', function () {
		return google.maps.Map;
	})