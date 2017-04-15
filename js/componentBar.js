var componentBar = function (name, config) {
    var component = new componentBase(name, config);
    $.each(config.data, function (idx, item) {
        var line = $('<div class="line">');
        var name = $('<div class="name">');
        var rate = $('<div class="rate">');
        var per = $('<div class="per">');
        var width = item[1] * 100 + "%";
        var bgStyle = "";
        
        if (item[2]) bgStyle = 'style="background:' + item[2] + '"';

        rate.css("width", width);
        rate.html('<div class="bg" ' + bgStyle + '></div>');
        name.text(item[0]);
        per.text(width);
        line.append(name).append(rate).append(per);
        component.append(line);
    });
    return component;
}