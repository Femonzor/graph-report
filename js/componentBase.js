var componentBase = function (name, config) {
    config = config || {};
    var id = ("c-" + Math.random()).replace(".", "-");
    var className = "component-" + config.type;
    var component = $('<div class="component ' + className + ' component-name-' + name + '" id="' + id + '">');
    config.text && component.text(config.text);
    config.width && component.width(config.width / 2);
    config.height && component.height(config.height / 2);
    config.css && component.css(config.css);
    config.bg && component.css("backgroundImage", "url(" + config.bg + ")");
    if (config.center) {
        component.css({
            marginLeft: -config.width / 4,
            left: "50%"
        });
    }
    component.on("afterLoad", function () {
        component.addClass(className + "-load").removeClass(className + "-leave");
        config.animateIn && component.animate(config.animateIn);
        return false;
    });
    component.on("onLeave", function () {
        component.addClass(className + "-leave").removeClass(className + "-load");
        config.animateOut && component.animate(config.animateOut);
        return false;
    });
    return component;
}