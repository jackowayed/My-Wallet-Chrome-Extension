function removeGrouping() {
    $("#active-addresses").trigger("show")
}

function buildTable(b) {
    var a = $("#active-addresses");
    var n = a.find("table");
    var f = n.find("tbody").empty();
    for (var e in b) {
        var l = b[e];
        if (e == 0) {
            var g = $("<tr><th>Group #" + e + '</th><th colspan="2"><a href="#" class="act-hide">Hide Grouping</a></th></tr>');
            (function() {
                g.find(".act-hide").click(function() {
                    removeGrouping()
                })
            })();
            f.append(g)
        } else {
            f.append('<tr><th colspan="3">Group #' + e + "</th></tr>")
        }
        for (var m in l) {
            var k = l[m];
            if (!MyWallet.addressExists(k)) {
                continue
            }
            var j = "";
            if (MyWallet.isWatchOnly(k)) {
                j = ' <font color="red" title="Watch Only">(Watch Only)</font>'
            }
            var c = "";
            var h = k;
            if (MyWallet.getAddressLabel(k) != null) {
                h = MyWallet.getAddressLabel(k);
                c = '<span class="hidden-phone"> - ' + k + "</span>"
            }
            var d = '<tr style="background-color:#FFFFFF;"><td style="background-color:#FFFFFF;"><div class="short-addr"><a href="' + root + "address/" + k + '" target="new">' + h + "</a>" + c + " " + j + '<div></td><td style="background-color:#FFFFFF;" colspan="2"><span style="color:green">' + formatBTC(MyWallet.getAddressBalance(k)) + "</span></td></tr>";
            f.append(d)
        }
    }
}

function loadTaintData() {
    MyWallet.setLoadingText("Loading Taint Data");
    var a = MyWallet.getAllAddresses();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: root + "taint/" + a.join("|"),
        data: {
            format: "json"
        },
        success: function(h) {
            var e = [];
            var k = h.filteredTaints;
            for (var m in k) {
                var c = k[m];
                var n = -1;
                for (var f in c) {
                    var d = c[f];
                    for (var g in e) {
                        if (g != n && $.inArray(f, e[g])) {
                            if (n >= 0) {
                                var l = e.splice(n, 1);
                                var j = e.splice(g, 1);
                                e.push(l.concat(j))
                            } else {
                                e[g].push(m)
                            }
                            n = g
                        }
                        if (n >= 0) {
                            break
                        }
                    }
                }
                if (n == -1) {
                    e.push([m])
                }
            }
            buildTable(e);
            BlockchainAPI.get_balances(a, function(b) {
                buildTable(e)
            }, function(b) {
                MyWallet.makeNotice("error", "misc-error", b)
            })
        },
        error: function() {
            MyWallet.makeNotice("error", "misc-error", "Error Downloading Taint Data")
        }
    })
};
