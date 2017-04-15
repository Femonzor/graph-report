var componentPoint = function (name, config) {
    var component = new componentBase(name, config);
    var base = config.data[0][1];
    $.each(config.data, function (idx, item) {
        var point = $('<div class="point point-' + idx + '">');
        var name = $('<div class="name">' + item[0] + '</div>');
        var rate = $('<div class="rate">' + (item[1] * 100) + '%</div>');
        name.append(rate);
        point.append(name);
        var per = item[1] / base * 100 + "%";
        console.log(per);
        point.width(per).height(per);
        item[2] && point.css("backgroundColor", item[2]);
        if (typeof item[3] !== "undefined" && typeof item[4] !== "undefined") {
            point.css("left", item[3]).css("top", item[4]);
        }
        point.css("transition", "all 1s " + idx * .5 + "s");
        component.append(point);
    });
    return component;
};