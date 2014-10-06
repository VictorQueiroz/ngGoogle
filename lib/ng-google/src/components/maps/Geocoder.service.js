angular
	.module('google.maps.services.Geocoder', [])

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
							deferred.reject(status);
						}
					});
				});
				return deferred.promise;
			};
		}

		return Geocoder;
	});