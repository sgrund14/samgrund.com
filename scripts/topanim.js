// The amount of circles we want to make:
var count = 20;
var colors = {
    yellow: 'yellow',
    darkblue: '#00296b',
    darkgreen: '#016b00',
    lightgrey: '#e0e0e0'
};

// Create a symbol, which we will use to place instances of later:
var path = new Path.Circle({
    center: [0, 0],
    radius: 10,
    fillColor: 'yellow',
});

var symbol = new Symbol(path);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
    // The center position is a random point in the view:
    var center = Point.random() * view.size;
    var placedSymbol = symbol.place(center);
    placedSymbol.scale(4 * i / count);
}

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
    //    // Run through the active layer's children list and change
    //    // the position of the placed symbols:

    for (var i = 0; i < count; i++) {
        var item = project.activeLayer.children[i];

        // Move the item 1/20th of its width to the right. This way
        // larger circles move faster than smaller circles:
        item.position.x += item.bounds.width / 200;
        item.position.y += item.bounds.height / 200;

        // If the item has left the view on the right, move it back
        // to the left:
        if (item.bounds.left > view.size.width) {
            item.position.x = -item.bounds.width;
        }
        if (item.bounds.top > view.size.height) {
            item.position.y = -item.bounds.height;
        }
    }
}

var observer = new MutationObserver(function (mutations) {
    if ($('#info-button').hasClass('on')) {
        fade(path.fillColor, colors.darkblue, 125)
    } else if ($('#work-button').hasClass('on')) {
        fade(path.fillColor, colors.darkgreen, 125)
    } else if ($('#contact-button').hasClass('on')) {
        fade(path.fillColor, colors.lightgrey, 125)
    } else {
        fade(path.fillColor, colors.yellow, 125)
    }
});

// Notify me of everything!
var observerConfig = {
    attributes: true,
};

// Node, config
// In this case we'll listen to all changes to body and child nodes
var infoNode = document.getElementById('info-button');
var workNode = document.getElementById('work-button');
var contactNode = document.getElementById('contact-button');
observer.observe(infoNode, observerConfig);
observer.observe(workNode, observerConfig);
observer.observe(contactNode, observerConfig);

lerp = function (a, b, u) {
    return (1 - u) * a + u * b;
};

fade = function (start, end, duration) {
    var endColor = new Color(end);

    var interval = 10;
    var steps = duration / interval;
    var step_u = 1.0 / steps;
    var u = 0.0;
    var theInterval = setInterval(function () {
        if (u >= 1.0) {
            clearInterval(theInterval)
        }
        var r = parseFloat(lerp(start.red, endColor.red, u));
        var g = parseFloat(lerp(start.green, endColor.green, u));
        var b = parseFloat(lerp(start.blue, endColor.blue, u));
        var colorname = new Color(r, g, b);
        console.log(colorname)
            //        el.style.setProperty(property, colorname);
        path.fillColor = colorname;
        u += step_u;
    }, interval);
};
