angular
	.module('google.maps.controllers.Marker', [])

	.controller('MarkerCtrl', function ($scope, $element, $attrs, google, Marker, LatLng) {
		var self = this,
		options = {},
		marker;

		this.start = function (mapCtrl) {
			if($attrs.position) {
				options.position = $scope.$eval($attrs.position);
			}

			if($attrs.title) {
				options.title = $scope.$eval($attrs.title);
			}

			options.position = new LatLng(options.position[0], options.position[1]);

			marker = self.marker = new Marker(options);

			mapCtrl.getMap().then(function (map) {
				marker.setMap(map);
			});

			mapCtrl.addMarker(marker);

			google.maps.event.addListener(marker, 'mouseover', function () {
				if($attrs.onMouseover) {
					var fn = $parse($attrs.onMouseover);

					fn($scope, {
						$marker: this
					});
				}

				$scope.$emit('marker:mouseover', marker);
			});

			google.maps.event.addListener(marker, 'click', function () {
				if($attrs.onClick) {
					var fn = $parse($attrs.onClick);

					fn($scope, {
						$marker: this
					});
				}

				$scope.$emit('marker:click', marker);
			});

			google.maps.event.addListener(marker, 'dragend', function () {
				if($attrs.onDragEnd) {
					var fn = $parse($attrs.onDragEnd);

					fn($scope, {
						$marker: this
					});
				}

				$scope.$emit('marker:dragend', marker);
			});
		};
	})