var componentPie = function (name, config) {
    var component = new componentBase(name, config);
    var w = config.width;
    var h = config.height;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = context.width = w;
    canvas.height = context.height = h;
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
    component.append(canvas);

    var colors = ["red", "green", "blue", "orange", "gray"];   //备用颜色
    var sAngel = 1.5;

    function draw(per) {
    }
    return component;
};