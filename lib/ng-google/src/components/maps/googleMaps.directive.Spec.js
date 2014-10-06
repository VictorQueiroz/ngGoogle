describe('googleMaps directive', function () {
	var $rootScope, $compile, $browse, scope, element, MapCtrl;

	beforeEach(module('google'));
	beforeEach(module('google.maps.directives.googleMaps'));
	beforeEach(module('google.templates'));

	beforeEach(inject(function ($injector) {
		$rootScope = $injector.get('$rootScope');
		$compile = $injector.get('$compile');
		var s = $rootScope.$new();
		s.markers = [{
			position: {
				latitude: -40.357,
				longitude: 140.2
			}
		}, {
			position: {
				latitude: -20.237,
				longitude: 110.444
			}
		}, {
			position: {
				latitude: -44.237,
				longitude: 230.444
			}
		}];
		s.$digest();

		var html ="<google-maps data-center=\"[\n-85.10, 100.00]\">\n" +
							"\t<marker ng-repeat=\"marker in markers\" data-position=\"[\n" +
							"\t\t{{ marker.position.latitude }},\n" +
							"\t\t{{ marker.position.longitude }}\n" +
							"\t]\"></marker>\n" +
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

	it('should retrieve the map', function () {
		MapCtrl.getMap().then(function (map) {
			expect(typeof map.getCenter().lat()).toBe('number');
		});
	});

	it('should retrive the markers', function () {
		MapCtrl.getMarkers().then(function (markers) {
			expect(markers instanceof Array).toBe(true);
			expect(markers.length).toBe(3);
		});
	});

	it('should pass the center through element attributes', function () {
		MapCtrl.getMap().then(function (map) {
			expect(map.getCenter().lat()).toBe(-85.1)
			expect(map.getCenter().lng()).toBe(100);
		});
	});

	it('should have ng-scope class', function (done) {
		expect(element.hasClass('ng-scope')).toBe(true);
	});

	it('should detect zoom changes', function () {
		MapCtrl.getMap().then(function (map) {
			
		});
	});
});