var pages = function () {
    this.id = ("container-" + Math.random()).replace(".", "-");
    this.el = $('<div class="container" id="' + this.id + '">').hide();
    this.pages = [];
    $("body").append(this.el);
    this.addPage = function (name, text) {
        var page = $('<div class="page section">');
        name && page.addClass("page-" + name);
        text && page.text(text);
        this.el.append(page);
        this.pages.push(page);
        return this;
    };
    this.addComponent = function (name, config) {
        config = config || {};
        config = $.extend({
            type: "base"
        }, config);
        var component = null;
        var page = this.pages.slice(-1)[0];
        switch (config.type) {
            case "base":
                component = new componentBase(name, config);
                break;
            default:
                break;
        }
        page.append(component);
        return this;
    };
    this.loader = function () {
        this.el.fullpage({
            afterLoad: function (anchorLink, index) {
                $(this).find(".component").trigger("afterLoad");
            },
            onLeave: function(index, nextIndex, direction) {
                $(this).find(".component").trigger("onLeave");
            }
        });
        this.pages[0].find(".component").trigger("afterLoad");
        this.el.show();
    }
    return this;
}