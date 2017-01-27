// The amount of circles we want to make:
var count = 50;

var colors = {
    lightblue: 'lightblue',
    darkred: '#6b0000',
    darkgrey: '#161616',
    lightgrey: 'lightgrey'
};
// Create a symbol, which we will use to place instances of later:
var path2 = new Path.Circle({
    center: [0, 0],
    radius: 10,
    fillColor: 'lightgrey'
});

var symbol = new Symbol(path2);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
    // The center position is a random point in the view:
    var center = Point.random() * view.size;
    var placedSymbol = symbol.place(center);
    placedSymbol.scale(i / count);
}

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
    // Run through the active layer's children list and change
    // the position of the placed symbols


    for (var i = 0; i < count; i++) {
        var item = project.activeLayer.children[i];

        // Move the item 1/20th of its width to the right. This way
        // larger circles move faster than smaller circles:
        item.position.x -= item.bounds.width / 200;
        item.position.y -= item.bounds.height / 200;

        // If the item has left the view on the right, move it back
        // to the left:
        if (item.bounds.right < view.bounds.left) {
            item.position.x = view.bounds.width - item.bounds.left;
        }
        if (item.bounds.bottom < view.bounds.top) {
            item.position.y = view.bounds.height - item.bounds.top;
        }
    }
}

var observer2 = new MutationObserver(function (mutations) {
    if ($('#info-button').hasClass('on')) {
        fade2(path2.fillColor, colors.lightblue, 250)
    } else if ($('#work-button').hasClass('on')) {
        fade2(path2.fillColor, colors.darkred, 250)
    } else if ($('#contact-button').hasClass('on')) {
        fade2(path2.fillColor, colors.darkgrey, 250)
    } else {
        fade2(path2.fillColor, colors.lightgrey, 250)
    }

});

// Notify me of everything!
var observerConfig2 = {
    attributes: true,
};

// Node, config
// In this case we'll listen to all changes to body and child nodes
var infoNode = document.getElementById('info-button');
var workNode = document.getElementById('work-button');
var contactNode = document.getElementById('contact-button');
observer2.observe(infoNode, observerConfig2);
observer2.observe(workNode, observerConfig2);
observer2.observe(contactNode, observerConfig2);

lerp2 = function (a, b, u) {
    return (1 - u) * a + u * b;
};

fade2 = function (start, end, duration) {
    var endColor = new Color(end);

    var interval = 10;
    var steps = duration / interval;
    var step_u = 1.0 / steps;
    var u = 0.0;
    var theInterval = setInterval(function () {
        if (u >= 1.0) {
            clearInterval(theInterval)
        }
        var r = parseFloat(lerp2(start.red, endColor.red, u));
        var g = parseFloat(lerp2(start.green, endColor.green, u));
        var b = parseFloat(lerp2(start.blue, endColor.blue, u));
        var colorname = new Color(r, g, b);
        console.log(colorname)
            //        el.style.setProperty(property, colorname);
        path2.fillColor = colorname;
        u += step_u;
    }, interval);
};