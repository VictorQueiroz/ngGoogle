angular
	.module('google.maps.directives.googleMaps', [])

	.directive('googleMaps', function () {
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: 'maps/google-maps.directive.tpl.html',
			controller: 'MapCtrl',
			require: '?googleMaps',
			link: function postLink (scope, element, attrs, mapCtrl) {
				mapCtrl.initialize();
			}
		};
	});