describe('googleMaps directive', function () {
	var $rootScope, $compile, $browse, scope, element, MapCtrl, s;

	beforeEach(module('google'));
	beforeEach(module('google.maps.directives.googleMaps'));
	beforeEach(module('google.templates'));

	beforeEach(inject(function ($injector) {
		$rootScope = $injector.get('$rootScope');
		$compile = $injector.get('$compile');
		s = $rootScope.$new();
		s.markers = [{
			position: {
				latitude: -40.357,
				longitude: 140.2
			}
		}, {
			position: {
				latitude: -39.357,
				longitude: 140.2
			}
		}, {
			position: {
				latitude: -38.357,
				longitude: 140.2
			}
		}, {
			position: {
				latitude: -32.357,
				longitude: 140.2
			}
		}];
		s.$digest();

		var html ="<google-maps data-center=\"[\n-85.10, 100.00]\">\n" +
							"\t<marker ng-repeat=\"marker in markers\" data-position=\"[\n" +
							"\t\t{{ marker.position.latitude }},\n" +
							"\t\t{{ marker.position.longitude }}\n" +
							"\t]\" data-title=\"Hey\"></marker>\n" +
							"</google-maps>";
		element = angular.element(html);
		element = $compile(element)(s);
		scope = element.scope();
		scope.$digest();
		MapCtrl = element.controller('googleMaps');
	}));

	afterEach(inject(function ($timeout) {
		$timeout.flush();
	}));

	it('should store all markers correct position', function () {
		MapCtrl.getMarkers().then(function (markers) {
			markers.forEach(function (marker, index) {
				console.log(markers[0].title)
				s.markers.forEach(function (m, i) {
					if(index === i) {
						expect(marker.getPosition().lng()).toMatch(m.position.longitude);
						expect(marker.getPosition().lat()).toBe(m.position.latitude);
					}
				});
			});
		});
	});
});