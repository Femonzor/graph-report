var componentPie = function (name, config) {
    var component = new componentBase(name, config);
    var w = config.width;
    var h = config.height;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    $(canvas).css("zIndex", 1);
    component.append(canvas);

    var r = w / 2;
    // 加入一个底图
    context.beginPath();
    context.fillStyle = "#eee";
    context.strokeStyle = "#eee";
    context.lineWidth = 1;
    context.arc(r, r, r, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    // 绘制一个数据层
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    $(canvas).css("zIndex", 2);
    component.append(canvas);

    var colors = ["red", "green", "blue", "#a00", "orange"];   //备用颜色
    var sAngel = 1.5 * Math.PI;
    var eAngel = 0;
    var aAngel = Math.PI * 2;
        
    var step = config.data.length;
    for (var i = 0; i < step; i++) {
        var item = config.data[i];
        var color = item[2] || (item[2] = colors.pop());

        eAngel = sAngel + aAngel * item[1];
        context.beginPath();
        context.fillStyle = color;
        context.strokeStyle = color;
        context.lineWidth = .1;
        context.moveTo(r, r);
        context.arc(r, r, r, sAngel, eAngel);
        context.fill();
        context.stroke();

        sAngel = eAngel;

        // 加入所有的项目文本以及百分比
        var text = $('<div class="text">');
        text.text(config.data[i][0]);
        var per = $('<div class="per">');
        per.text(config.data[i][1] * 100 + "%");
        text.append(per);

        var x = r + Math.sin(.5 * Math.PI - sAngel) * r;
        var y = r + Math.cos(.5 * Math.PI - sAngel) * r;

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
        if (config.data[i][2]) text.css("color", config.data[i][2]);
        text.css("opacity", 0);
        component.append(text);
    }

    // 加入一个蒙版层
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    $(canvas).css("zIndex", 3);
    component.append(canvas);

    
    context.fillStyle = "#eee";
    context.strokeStyle = "#eee";
    context.lineWidth = 1;

    // 生长动画
    function draw(per) {
        context.clearRect(0, 0, w, h);
        context.beginPath();
        context.moveTo(r, r);
        if (per <= 0) {
            context.arc(r, r, r, 0, 2 * Math.PI);
            component.find(".text").css("opacity", 0);
        } else {
            context.arc(r, r, r, sAngel, sAngel + 2 * Math.PI * per, true);
        }
        context.fill();
        context.stroke();
        if (per >= 1) {
            component.find(".text").css("opacity", 1);
        }
    }

    draw(0);

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