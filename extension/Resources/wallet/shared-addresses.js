var forwards;

function extendForwarding(a) {
    MyWallet.securePost("forwarder", {
        method: "extend",
        input_address: a,
        time: 86400000
    }, function(b) {
        MyWallet.makeNotice("success", "misc-success", b);
        buildSharedTable($("#shared-addresses"))
    }, function(b) {
        MyWallet.makeNotice("error", "misc-error", b.responseText)
    })
}

function buildSharedTable(b) {
    var a = b.find("table");
    var c = a.find("tbody");
    MyWallet.securePost("forwarder", {
        method: "get",
        format: "json"
    }, function(j) {
        MyWallet.setLoadingText("Loading Shared Addresses");
        c.empty();
        forwards = j.forwards;
        if (forwards && forwards.length > 0) {
            for (var g in forwards) {
                var f = forwards[g];
                var k = f.expires - new Date().getTime();

                function e(m) {
                    var p = m / 1000;
                    var i = Math.floor((p % 31536000) / 86400);
                    if (i) {
                        return i + " day" + ((i > 1) ? "s" : "")
                    }
                    var o = Math.floor(((p % 31536000) % 86400) / 3600);
                    if (o) {
                        return o + " hour" + ((o > 1) ? "s" : "")
                    }
                    var n = Math.floor((((p % 31536000) % 86400) % 3600) / 60);
                    if (n) {
                        return n + " minute" + ((n > 1) ? "s" : "")
                    }
                    return '<font color="red">Pending Deletion</font>'
                }
                if (MyWallet.addressExists(f.destination_address)) {
                    var l;
                    if (MyWallet.getAddressLabel(f.destination_address)) {
                        l = MyWallet.getAddressLabel(f.destination_address)
                    } else {
                        l = f.destination_address
                    } if (f.taint < 100) {
                        l += ' <font color="green">(Shared)</font>'
                    } else {
                        l += " <small>(Not Shared)</small>"
                    } if (MyWallet.isWatchOnly(f.destination_address)) {
                        l += ' <font color="red">(Watch Only!)</font>'
                    }
                    if (f.expires == -1) {
                        var d = '<font color="green">Never</font>'
                    } else {
                        if (f.expires == 0) {
                            var d = '<font color="red">6 Confirmations</font>'
                        } else {
                            var d = e(k) + ' <a class="pull-right hidden-phone act-extend" href="#">(extend)</a>'
                        }
                    }
                    var h = $('<tr><td><a class="short-addr" href="' + root + "address/" + f.input_address + '" target="new">' + f.input_address + '</a></td><td class="hidden-phone">' + l + "</td><td>" + d + "</td></tr>");
                    (function(i) {
                        h.find(".act-extend").click(function() {
                            extendForwarding(i.input_address)
                        })
                    })(f);
                    c.append(h)
                }
            }
        } else {
            c.append('<tr><td colspan="3">No Shared Addresses</td></tr>')
        }
    }, function(d) {
        MyWallet.makeNotice("error", "misc-error", d.responseText);
        c.empty().append('<tr><td colspan="3">No Shared Addresses</td></tr>')
    });
    $("#shared-address").unbind().click(function() {
        var d = MyWallet.getPreferredAddress();
        MyWallet.setLoadingText("Creating Forwarding Address");
        MyWallet.securePost("forwarder", {
            action: "create-mix",
            shared: true,
            address: d,
            expires: new Date().getTime() + (345600000),
            format: "json"
        }, function(e) {
            if (e.destination != d) {
                throw "Mismatch between requested and returned destination address"
            }
            buildSharedTable($("#shared-addresses"))
        }, function(e) {
            MyWallet.makeNotice("error", "misc-error", e.responseText)
        })
    })
};
