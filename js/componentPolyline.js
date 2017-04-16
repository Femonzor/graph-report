var componentPolyline = function (name, config) {
    var component = new componentBase(name, config);
    
    var w = config.width;
    var h = config.height;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    component.append(canvas);

    var step = 10;
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "#aaa";

    window.context = context;
    for (var i = 0; i < step + 1; i++) {
        var y = h / step * i;
        context.moveTo(0, y);
        context.lineTo(w, y);
    }

    step = config.data.length + 1;
    var textWidth = w / step >> 0;
    for (i = 0; i < step + 1; i++) {
        var x = w / step * i;
        context.moveTo(x, 0);
        context.lineTo(x, h);
        if (config.data[i]) {
            var text = $('<div class="text">');
            text.text(config.data[i][0]);
            text.css("width", textWidth / 2).css("left", x / 2 + textWidth / 4);
            component.append(text);
        }
    }

    context.stroke();

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = context.width = w;
    canvas.height = context.height = h;

    function draw(per) {
        context.clearRect(0, 0, w, h);
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = "#ff8878";

        var x = 0;
        var y = 0;
        // 画点
        var rowWidth = w / (config.data.length + 1);
        for (i in config.data) {
            var item = config.data[i];
            x = rowWidth * (+i + 1);
            y = h * (1 - item[1] * per);
            context.moveTo(x, y);
            context.arc(x, y, 5, 0, 2 * Math.PI);
            // console.log(item);
        }
        // 连线
        context.moveTo(rowWidth, h * (1 - config.data[0][1] * per));
        for (i in config.data) {
            var item = config.data[i];
            x = rowWidth * (+i + 1);
            y = h * (1 - item[1] * per);
            context.lineTo(x, y);
        }
        context.stroke();
        context.lineWidth = 1;
        context.strokeStyle = "rgba(255, 255, 255, 0)";
        // 绘制阴影
        context.lineTo(x, h);
        context.lineTo(rowWidth, h);
        context.fillStyle = "rgba(255, 136, 120, .2)";
        context.fill();
        // 写数据
        for (i in config.data) {
            var item = config.data[i];
            x = rowWidth * (+i + 1);
            y = h * (1 - item[1] * per);
            context.fillStyle = item[2] ? item[2] : "#595959";
            context.fillText(((item[1] * 100) >> 0) + "%", x - 10, y - 10);
        }
        context.stroke();
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

    component.append(canvas);

    return component;
}