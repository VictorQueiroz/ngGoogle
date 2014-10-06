angular
	.module('google.maps.directives.marker', [])

	.directive('marker', function () {
		return {
			restrict: 'E',
			controller: 'MarkerCtrl',
			require: ['?^googleMaps', 'marker'],
			link: function (scope, element, attrs, controllers) {
				var mapCtrl = controllers[0];
				var markerCtrl = controllers[1];

				markerCtrl.start(mapCtrl);
			}
		};
	});