angular
	.module('google.maps.services', [])

	.factory('Geocoder', function ($q, $timeout, google) {
		function Geocoder () {
			var geocoder = new google.maps.Geocoder;

			this.geocode = function (opts) {
				var deferred = $q.defer();
				$timeout(function () {
					geocoder.geocode(opts, function (results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							deferred.resolve(results);
						} else {
							deferred.resolve(status);
						}
					});
				});
				return deferred.promise;
			};
		}

		return Geocoder;
	})

	.factory('google', function ($window) {
		return $window.google;
	})

	.factory('Map', function () {
		return google.maps.Map;
	})

	.factory('LatLng', function () {
		return google.maps.LatLng;
	})

	.factory('Marker', function () {
		return google.maps.Marker;
	});