window.onload = function () {
    var mypapers = [];
    var colors = {
        yellow: 'yellow',
        darkblue: '#000251',
        lightgreen: '#93ff99',
        lightergrey: '#eaeaea',
        lightblue: '#e5e6ff',
        darkred: '#6b0000',
        darkgrey: '#3a3a3a',
        lightgrey: 'lightgrey'
    };

    var anim = function (id, canvasElement) {
        mypapers[id] = new paper.PaperScope();
        paper = mypapers[id];
        paper.setup(canvasElement);

        var count;
        var speed = 8;

        id === 0 ?
            count = 20 : count = 50;
        var path;

        var createCircle = function () {
            // this function is called on resize, so we have to re-fetch the scope!

            // Create a symbol, which we will use to place instances of later:
            path = new paper.Path.Circle({
                center: [0, 0],
                radius: 10,
                fillColor: 'yellow'
            });

            id === 0 ? path.fillColor = colors.yellow : path.fillColor = colors.lightgrey;

            var symbol = new paper.Symbol(path);

            // Place the instances of the symbol:
            for (var i = 0; i < count; i++) {
                // The center position is a random point in the view:
                var rand = paper.Point.random();
                var centX = rand.x * paper.view.size.width;
                var centY = rand.y * paper.view.size.height;
                var center = new paper.Point(centX, centY);

                var placedSymbol = symbol.place(center);

                placedSymbol.setPosition(center);

                if (id === 0) {
                    placedSymbol.scale(4 * i / count);
                } else {
                    placedSymbol.scale(2 * i / count);
                }
            }
        }
        createCircle();

        var colorChange = function (color) {
            fade(path.fillColor, color, 125);
        }

        function lerp(a, b, u) {
            return (1 - u) * a + u * b;
        };

        function fade(start, end, duration) {
            var endColor = new paper.Color(end);

            var interval = 10;
            var steps = duration / interval;
            var step_u = 1.0 / steps;
            var u = 0.0;
            speed = .05;
            var theInterval = setInterval(function () {
                if (u >= 1.0) {
                    speed = 8;
                    clearInterval(theInterval);
                }
                var r = parseFloat(lerp(start.red, endColor.red, u));
                var g = parseFloat(lerp(start.green, endColor.green, u));
                var b = parseFloat(lerp(start.blue, endColor.blue, u));
                var colorname = new paper.Color(r, g, b);
                path.fillColor = colorname;
                u += step_u;
            }, interval);
        };

        var update = function (id) {
            return function () {
                var count;
                id === 0 ? count = topAnim.count : count = bottomAnim.count;
                for (var i = 0; i < count; i++) {
                    var item = mypapers[id].project.activeLayer.children[i];

                    // Move the item 1/20th of its width to the right. This way
                    // larger circles move faster than smaller circles:     item.position.x += item.bounds.width / 200;
                    if (id === 0) {
                        item.position.x += Math.sin(item.bounds.width) / speed;
                        item.position.y += Math.cos(item.bounds.height) / speed;
                    } else {
                        item.position.x -= Math.sin(item.bounds.width) / speed;
                        item.position.y -= Math.cos(item.bounds.height) / speed;
                    }
                    if (item.bounds.left > mypapers[id].view.size.width) {
                        item.position.x -= mypapers[id].view.size.width + item.bounds.width
                    } else if (item.bounds.top > mypapers[id].view.size.height) {
                        item.position.y -= mypapers[id].view.size.height + item.bounds.height;
                    } else if (item.bounds.right < 0) {
                        item.position.x += mypapers[id].view.size.width + item.bounds.width;
                    } else if (item.bounds.bottom < 0) {
                        item.position.y += mypapers[id].view.size.height + item.bounds.height;
                    }
                }
            }
        }

        return {
            colorChange: colorChange,
            update: update,
            count: count
        };
    };

    var topAnim = anim(0, $("#canvas")[0]);
    var bottomAnim = anim(1, $("#canvas2")[0]);

    mypapers[0].view.onFrame = topAnim.update(0);
    mypapers[1].view.onFrame = bottomAnim.update(1);



    var observer = new MutationObserver(function (mutations) {
        if ($('#info-button').hasClass('on')) {
            topAnim.colorChange(colors.lightblue);
            bottomAnim.colorChange(colors.darkblue);
        } else if ($('#work-button').hasClass('on')) {
            topAnim.colorChange(colors.lightgreen);
            bottomAnim.colorChange(colors.darkred);
        } else if ($('#contact-button').hasClass('on')) {
            topAnim.colorChange(colors.lightergrey);
            bottomAnim.colorChange(colors.darkgrey);
        } else {
            topAnim.colorChange(colors.yellow);
            bottomAnim.colorChange(colors.lightgrey);
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
}
