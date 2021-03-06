$.fn.center = function() {
    this.css("top", Math.max(($(window).height() - this.height()) / 2 + $(window).scrollTop(), 10) + "px");
    this.css("left", Math.max(($(window).width() - this.width()) / 2 + $(window).scrollLeft(), 10) + "px");
    return this
};
$(window).resize(function() {
    $(".modal:visible").center()
});

function showFrameModal(a) {
    var b = $("#frame-modal");
    var d = "";
    if (a.top_right) {
        d = '<span style="float:right;padding-top:5px;padding-right:10px;">' + a.top_right + "</a></span>"
    }
    try {
        b.modal("hide");
        b.remove()
    } catch (c) {
        console.log(c)
    }
    $("body").append('<div id="frame-modal" class="modal hide"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button>' + d + "<h3>" + a.title + '</h3></div><div class="modal-body" style="overflow-y:hidden;"><iframe border="0" scrolling="auto" style="overflow-y:hidden;border-style:none;"></iframe></div><div class="modal-footer btn-group">' + a.description + ' <a class="btn btn-secondary">Close</a></div></div>');
    b = $("#frame-modal");
    b.modal({
        keyboard: true,
        backdrop: "static",
        show: true
    });
    try {
        hidePopovers()
    } catch (c) {}
    if (a.width) {
        b.find(".modal-body").css("width", a.width)
    }
    if (a.height) {
        b.find("iframe").css("height", a.height)
    }
    b.find(".btn.btn-primary").unbind().click(function() {
        b.modal("hide")
    });
    b.find(".btn.btn-secondary").unbind().click(function() {
        b.modal("hide")
    });
    b.find("iframe").attr("src", a.src);
    b.center()
};
