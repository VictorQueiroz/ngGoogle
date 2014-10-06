ngGoogle
========

A bunch of Google JavaScript API adaptations to AngularJS.

### Bower
```
bower install --save ng-google
```

### Importing the module
```
angular.module('app', ['ngGoogle']);
```

### Google Maps

#### Geolocalization
```js
.controller('MyMapsCtrl', function (Geocoder, LatLng) {
	var geocoder = new Geocoder;

	geocoder.geocode({
		latLng: new LatLng(203.40, -109.34)
	}).then(function (results) {
		$scope.results = results;
	}).catch(function (status){
		console.log(status);
	}).finally(function () {
		console.log('We are done! :D');
	});
})
```

#### Directive
```html
<google-maps
	data-center="[
		-200.30,
		-22.48
	]"
	data-on-click="onClick($map, paramOne, paramTwo)">
	<marker
		ng-repeat="marker in markers"
		data-position="[
			{{ marker.position.latitude }},
			{{ marker.position.longitude }}
		]"
		data-on-drag="marker.onDrag($marker, [..])"
		data-on-click="marker.onClick([..], $marker, [..])"
		data-on-mouseover="marker.onMouseover($marker, [..])">
	</marker>
</google-maps>
```

```js
angular
	.module('app', ['ngGoogle'])

	.controller('MyCtrl', function ($scope) {
		$scope.markers = [{
			onDrag: function ($marker) {
				$marker.setMap(null); // it's will destroy the marker when you drag it
			},
			onClick: function ($marker) {
				alert('You clicked me! :o');
			},
			position: {
				latitude: -40.357,
				longitude: 140.2
			}
		}, {...}, {...}];

		$scope.$on('marker:dragend', function (event, marker) {
			// do something with the dragged marker
			// it will activate everytime you drag in any marker
		});

		$scope.$on('map:click', function (event, map) {
			// do something with the clicked map
			// it will activate everytime you click in any map
		});
	});
```