/*
 * https://github.com/legalthings/signature-pad-angular
 * Copyright (c) 2015 ; Licensed MIT
 */

angular.module('signature', []);

angular.module('signature').directive('signaturePad', [
	'$interval',
	'$timeout',
	'$window',
	function($interval, $timeout, $window) {
		'use strict';

		var EMPTY_IMAGE = null;

		return {
			restrict: 'EA',
			replace: true,
			template:
				'<div class="signature" style="width: 100%; max-width:{{width}}px; height: 100%; max-height:{{height}}px;"><canvas style="display: block; margin: 0 auto;" ng-mouseup="onMouseup()" ng-mouseleave="onMouseup()" ng-mousedown="notifyDrawing({ drawing: true })"></canvas></div>',
			scope: {
				accept: '=?',
				clear: '=?',
				dataurl: '=?',
				defaulturl: '=?',
				options: '=?',
				height: '@',
				width: '@',
				notifyDrawing: '&onDrawing',
			},
			controller: [
				'$scope',
				function($scope) {
					$scope.accept = function() {
						return {
							isEmpty: $scope.dataurl === EMPTY_IMAGE,
							dataUrl: $scope.dataurl,
						};
					};

					$scope.onMouseup = function() {
						$scope.updateModel();

						// notify that drawing has ended
						$scope.notifyDrawing({ drawing: false });
					};

					$scope.updateModel = function() {
						/*
						 defer handling mouseup event until $scope.signaturePad handles
						 first the same event
						 */
						$timeout().then(function() {
							$scope.dataurl = $scope.signaturePad.isEmpty()
								? EMPTY_IMAGE
								: $scope.signaturePad.toDataURL();
						});
					};

					$scope.clear = function() {
						$scope.signaturePad.clear();
						$scope.dataurl = EMPTY_IMAGE;
					};

					$scope.$watch('dataurl', function(dataUrl) {
						if (!dataUrl || $scope.signaturePad.toDataURL() === dataUrl) {
							return;
						}

						$scope.setDataUrl(dataUrl);
					});
				},
			],
			link: function(scope, element) {
				var canvas = element.find('canvas')[0],
					parent = canvas.parentElement,
					scale = 0,
					ctx = canvas.getContext('2d'),
					width = parseInt(scope.width, 10),
					height = parseInt(scope.height, 10),
					signatureOptions = scope.options ? scope.options : { maxWidth: 1 };

				canvas.width = width;
				canvas.height = height;

				scope.signaturePad = new SignaturePad(canvas, signatureOptions);

				scope.setDataUrl = function(dataUrl) {
					var ratio = Math.max(window.devicePixelRatio || 1, 1);

					ctx.setTransform(1, 0, 0, 1, 0, 0);
					ctx.scale(ratio, ratio);

					scope.signaturePad.clear();
					scope.signaturePad.fromDataURL(dataUrl);

					if (_.has(scope, 'defaulturl')) {
						scope.defaulturl = dataUrl;
					}

					$timeout().then(function() {
						ctx.setTransform(1, 0, 0, 1, 0, 0);
						ctx.scale(1 / scale, 1 / scale);
					});
				};

				var calculateScale = function() {
					var scaleWidth = Math.min(parent.clientWidth / width, 1);
					var scaleHeight = Math.min(parent.clientHeight / height, 1);

					var newScale = Math.min(scaleWidth, scaleHeight);

					if (newScale === scale) {
						return;
					}

					var newWidth = width * newScale;
					var newHeight = height * newScale;
					canvas.style.height = Math.round(newHeight) + 'px';
					canvas.style.width = Math.round(newWidth) + 'px';

					scale = newScale;
					ctx.setTransform(1, 0, 0, 1, 0, 0);
					ctx.scale(1 / scale, 1 / scale);
				};

				var resizeIH = $interval(calculateScale, 200);
				scope.$on('$destroy', function() {
					$interval.cancel(resizeIH);
					resizeIH = null;
				});

				angular.element($window).bind('resize', calculateScale);
				scope.$on('$destroy', function() {
					angular.element($window).unbind('resize', calculateScale);
				});

				calculateScale();

				element.on('touchstart', onTouchstart);
				element.on('touchend', onTouchend);

				function onTouchstart() {
					scope.$apply(function() {
						// notify that drawing has started
						scope.notifyDrawing({ drawing: true });
					});
				}

				function onTouchend() {
					scope.$apply(function() {
						// updateModel
						scope.updateModel();

						// notify that drawing has ended
						scope.notifyDrawing({ drawing: false });
					});
				}
			},
		};
	},
]);

// Backward compatibility
angular.module('ngSignaturePad', ['signature']);
