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
    for (i = 0; i < step + 1; i++) {
        var x = w / step * i;
        context.moveTo(x, 0);
        context.lineTo(x, h);
    }

    context.stroke();

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = "#ff8878";

    for (i in config.data) {
        var item = config.data[i];
        console.log(item);
    }

    component.append(canvas);

    return component;
}