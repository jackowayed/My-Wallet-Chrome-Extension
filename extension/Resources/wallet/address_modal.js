function showAddressModalQRCode(a) {
    var b = $("#qr-code-modal");
    b.modal({
        keyboard: true,
        backdrop: "static",
        show: true
    });
    loadScript("wallet/jquery.qrcode", function() {
        b.find(".address-qr-code").empty().qrcode({
            width: 300,
            height: 300,
            text: a
        })
    });
    b.find(".address").text(a);
    b.find(".btn.btn-secondary").unbind().click(function() {
        b.modal("hide")
    })
}

function verifyMessageModal() {
    var d = $("#verify-message-modal");
    d.modal({
        keyboard: true,
        backdrop: "static",
        show: true
    });
    d.find(".address-result").hide();
    var b = d.find('input[name="address"]');
    var a = d.find('textarea[name="message"]');
    var c = d.find('textarea[name="signature"]');
    d.find(".btn.btn-secondary").unbind().click(function() {
        d.modal("hide")
    });
    d.find("textarea").bind("change", function() {
        d.find(".address-result").hide()
    });
    d.find(".btn.btn-primary").unbind().click(function() {
        try {
            var g = $.trim(b.val());
            if (!g || g.length == 0) {
                throw "Please enter a Bitcoin Address"
            }
            try {
                new Bitcoin.Address(g)
            } catch (i) {
                throw "Invalid Bitcoin Address"
            }
            var h = $.trim(a.val());
            if (!h || h.length == 0) {
                throw "You Must Enter A Message To Verify"
            }
            var f = $.trim(c.val());
            if (!f || f.length == 0) {
                throw "You Must Enter A Signature To Verify"
            }
            if (Bitcoin.Message.verifyMessage(g, f, h)) {
                d.find(".address-result-txt").html('<font color="green">Message Successfully Verified</font>')
            } else {
                d.find(".address-result-txt").html('<font color="red">Error Verifying Message!</font>')
            }
            d.find(".address-result").show(200)
        } catch (i) {
            MyWallet.makeNotice("error", "misc-error", "Error Verifying Message" + i);
            d.modal("hide");
            return
        }
    })
}

function showAddressModalSignMessage(a) {
    MyWallet.getSecondPassword(function() {
        var c = $("#sign-message-modal");
        c.modal({
            keyboard: true,
            backdrop: "static",
            show: true
        });
        c.find(".signature").hide();
        var b = c.find('textarea[name="message"]');
        c.find(".address").text(a);
        c.find(".btn.btn-secondary").unbind().click(function() {
            c.modal("hide")
        });
        b.bind("change", function() {
            c.find(".signature").hide()
        });
        c.find(".btn.btn-primary").unbind().click(function() {
            var e = $.trim(b.val());
            if (!e || e.length == 0) {
                MyWallet.makeNotice("error", "misc-error", "You Must Enter A Message To Sign");
                return
            }
            var d = MyWallet.signmessage(a, e);
            c.find(".signature").show(200);
            c.find(".signature-result").text(d)
        })
    })
}

function showLabelAddressModal(c) {
    var a = $("#label-address-modal");
    a.modal({
        keyboard: true,
        backdrop: "static",
        show: true
    });
    var b = a.find('input[name="label"]');
    a.find(".address").text(c);
    b.val("");
    a.find(".btn.btn-primary").unbind().click(function() {
        a.modal("hide");
        var d = stripHTML(b.val());
        if (d.length == 0) {
            MyWallet.makeNotice("error", "misc-error", "You must enter a label for the address");
            return false
        }
        if (d.indexOf('"') != -1) {
            MyWallet.makeNotice("error", "misc-error", "Label cannot contain double quotes");
            return false
        }
        MyWallet.setLabel(c, d)
    });
    a.find(".btn.btn-secondary").unbind().click(function() {
        a.modal("hide")
    })
};
