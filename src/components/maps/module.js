angular
	.module('google.maps', [
		'google.maps.controllers', 
		'google.maps.services',
		'google.maps.directives'
	])

	.value('googleMapsConfig', {
		center: [-34.397, 150.644],
		zoom: 5
	});