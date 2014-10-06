ngGoogle
========

A bunch of Google JavaScript API adaptations to AngularJS.

### Google Maps
```html
<google-maps data-center="[
	-200.30,
	-22.48
]">
	<marker
		ng-repeat="marker in markers"
		data-position="[
			{{ marker.position.latitude }},
			{{ marker.position.longitude }}
		]"></marker>
</google-maps>
```