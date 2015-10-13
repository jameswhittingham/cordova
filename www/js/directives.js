angular.module('starter.directives', [])

.directive('testDirective', function() {
  return "test";
})

.directive('swipeable', function() {
  return {
  		scope: '@',
  		template: "<div class='names-container' style='z-index:{{$index}}'><h1 class='text-center'>{{obj.name}}</h1><h3>{{obj.meaning}}</h3>{{x}}</div>",
		link: function(scope, $element) {

			var touchDown = false,
				originalPosition = null,
				$el = $($element),
				info;

			function swipeInfo( event ) {
				var x = event.originalEvent.touches[0].clientX,
				y = event.originalEvent.touches[0].clientY,
				dx, dy;

				dx = ( x > originalPosition.x ) ? "right" : "left";
				dy = ( y > originalPosition.y ) ? "down" : "up";

				return {
					direction: {
						x: dx,
						y: dy
					},
					offset: {
						x: x - originalPosition.x,
						y: originalPosition.y - y
					}
				};
			}

			$el.on( "touchstart mousedown", function ( event ) {
				event.stopPropagation();
				touchDown = true;
				originalPosition = {
					x: event.originalEvent.touches[0].clientX,
					y: event.originalEvent.touches[0].clientY
				};
			});

			$el.on( "touchend mouseup", function () {
				var w = $(window).width(),
					dir = (info.offset.x > 0) ? 1 : -1,
					end = dir * w;

				$el.addClass('transition');
				$element.attr({
					'style': 'transform: translateX('+end+'px); z-index: {{$index}};',
					'direction': info.direction.x
				})

				touchDown = false;
				originalPosition = null;
				info = null;

				scope.itemRemoved($element.attr('id'), $element.attr('direction'));
			});

			$el.on( "touchmove mousemove", function ( event ) {
				if ( !touchDown ) { return;}
				event.stopPropagation();
				info = swipeInfo(event);
				console.log(info.direction, info.offset);
				
				scope.$apply(function () {
					scope.x = info.offset.x;
					scope.y = info.offset.y;

					$element.attr({
						'style': 'transform: translateX('+info.offset.x+'px); z-index: {{$index}};',
						'direction': info.direction.x
					})
				})

			});

		}
	}
});
