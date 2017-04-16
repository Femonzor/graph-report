var componentRadar = function (name, config) {
    var component = new componentBase(name, config);
    var w = config.width;
    var h = config.height;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    component.append(canvas);
    var r = w / 2;
    var step = config.data.length;

    // 计算一个圆上的坐标
    // 已知：圆心坐标(a, b)、半径：r、角度：deg
    // rad = (2 * Math.PI / 360) * (360 / step) * i;
    // x = a + Math.sin(rad) * r;
    // y = b + Math.cos(rad) * r;
    
    // 绘制网格背景（分面绘制，分为10份）
    var isBlue = false;
    for (var s = 10; s > 0; s--) {
        context.beginPath();
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin(rad) * r * s / 10;
            var y = r + Math.cos(rad) * r * s / 10;
            context.lineTo(x, y);
        }
        context.closePath();
        context.fillStyle = (isBlue = !isBlue) ? "#99c0ff" : "#f1f9ff";
        context.fill();
    }
    for (var i = 0; i < step; i++) {
        var rad = (2 * Math.PI / 360) * (360 / step) * i;
        var x = r + Math.sin(rad) * r;
        var y = r + Math.cos(rad) * r;
        context.moveTo(r, r);
        context.lineTo(x, y);
        // 输出文字
        var text = $('<div class="text">');
        text.text(config.data[i][0]);
        text.css("transition", "all .5s " + i * .1 + "s");
        // text.css("left", x / 2);
        // text.css("top", y / 2);
        if (x > w / 2) {
            text.css("left", x / 2);
        } else {
            text.css("right", (w - x) / 2);
        }

        if (y > h / 2) {
            text.css("top", y / 2);
        } else {
            text.css("bottom", (h - y) / 2);
        }
        if (config.data[i][2]) {
            text.css("color", config.data[i][2]);
        }
        component.append(text);
    }
    context.strokeStyle = "#e0e0e0";
    context.stroke();

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    component.append(canvas);
    context.strokeStyle = "#f00";
    function draw(per) {
        if (per < 1) {
            component.find(".text").css("opacity", 0);
        }
        if (per >= 1) {
            component.find(".text").css("opacity", 1);
        }
        context.clearRect(0, 0, w, h);
        // 输出数据的折线
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / 360) * (360 / step) * i;
            var rate = config.data[i][1] * per;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            context.lineTo(x, y);
        }
        context.closePath();
        context.stroke();

        // 输出数据的点
        context.fillStyle = "#ff7676";
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / 360) * (360 / step) * i;
            var rate = config.data[i][1] * per;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
    }

    component.on("afterLoad", function () {
        var s = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s += .01;
                draw(s);
            }, i * 10 + 500);
        }
    });
    component.on("onLeave", function () {
        var s = 1;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s -= .01;
                draw(s);
            }, i * 10);
        }
    });

    return component;
};