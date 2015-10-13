$(function() {
  $.fn.swipe = function( callback ) {
    var touchDown = false,
      originalPosition = null,
      $el = $( this );

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
      touchDown = true;
      originalPosition = {
        x: event.originalEvent.touches[0].clientX,
        y: event.originalEvent.touches[0].clientY
      };
    } );

    $el.on( "touchend mouseup", function () {
      touchDown = false;
      originalPosition = null;
    } );

    $el.on( "touchmove mousemove", function ( event ) {
      if ( !touchDown ) { return;}
      var info = swipeInfo( event );
      console.log( info.direction, info.offset );
    } );

    return true;
  };
});