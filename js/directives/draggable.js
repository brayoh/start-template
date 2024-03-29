app.directive('draggable', function($document) {
    return function(scope, element, attr) {
        var startX = 0,
            startY = 0,
            x = 0,
            y = 0;
        element.css({
            position: 'relative',
            backgroundColor: 'lightgrey',

        });
        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content

            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };
});