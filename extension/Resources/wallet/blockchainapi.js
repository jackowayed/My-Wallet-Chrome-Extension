var BlockchainAPI = new function() {
        var a = this;
        this.get_history = function(e, b, d, c) {
            MyWallet.setLoadingText("Loading transactions");
            $.ajax({
                type: "POST",
                dataType: "json",
                url: root + "multiaddr",
                data: {
                    active: MyWallet.getActiveAddresses().join("|"),
                    format: "json",
                    filter: d,
                    offset: c * 50
                },
                success: function(f) {
                    if (f.error != null) {
                        MyWallet.makeNotice("error", "misc-error", f.error)
                    }
                    try {
                        if (c == 0 && d == 0) {
                            MyStore.put("multiaddr", JSON.stringify(f))
                        }
                        e(f)
                    } catch (g) {
                        MyWallet.makeNotice("error", "misc-error", g);
                        b()
                    }
                },
                error: function(f) {
                    if (f.responseText) {
                        MyWallet.makeNotice("error", "misc-error", f.responseText)
                    } else {
                        MyWallet.makeNotice("error", "misc-error", "Error Downloading Wallet Balance")
                    }
                    b()
                }
            })
        };
        this.get_balances = function(d, c, b) {
            MyWallet.setLoadingText("Getting Balances");
            $.ajax({
                type: "POST",
                url: root + "multiaddr",
                dataType: "json",
                data: {
                    active: d.join("|"),
                    simple: true,
                    format: "json"
                },
                success: function(f) {
                    for (var e in f) {
                        if (MyWallet.addressExists(e)) {
                            MyWallet.setAddressBalance(e, f[e].final_balance)
                        }
                    }
                    c(f)
                },
                error: function(f) {
                    b(f.responseText)
                }
            })
        };
        this.get_balance = function(d, c, b) {
            MyWallet.setLoadingText("Getting Balance");
            this.get_balances(d, function(g) {
                var f = 0;
                for (var e in g) {
                    f += g[e].final_balance
                }
                c(f)
            }, b)
        };
        this.get_ticker = function() {
            MyWallet.setLoadingText("Getting Ticker Data");
            $.ajax({
                type: "GET",
                dataType: "json",
                url: root + "ticker",
                data: {
                    format: "json"
                },
                success: function(d) {
                    var b = $("#send-ticker ul").empty();
                    for (var c in d) {
                        b.append('<li><div style="width:35px;padding-left:10px;font-weight:bold;display:inline-block">' + c + '</div>  <i class="icon-user" style="background-image:url(' + resource + ((d[c]["15m"] >= d[c]["24h"]) ? "up_green.png" : "down_red.png") + ');width:14px;background-position:0px"></i>' + d[c]["15m"] + "</li>")
                    }
                },
                error: function(b) {
                    console.log(b)
                }
            })
        };
        this.resolve_firstbits = function(d, c, b) {
            MyWallet.setLoadingText("Querying Firstbits");
            $.ajax({
                type: "GET",
                url: root + "q/resolvefirstbits/" + d,
                data: {
                    format: "plain"
                },
                success: function(e) {
                    if (e == null || e.length == 0) {
                        b()
                    } else {
                        c(e)
                    }
                },
                error: function(f) {
                    b(f.responseText)
                }
            })
        };
        this.get_rejection_reason = function(e, b, c, d) {
            MyWallet.setLoadingText("Querying Rejection Reason");
            $.ajax({
                type: "GET",
                url: root + "q/rejected/" + e,
                data: {
                    format: "plain"
                },
                success: function(f) {
                    if (f == null || f.length == 0) {
                        d()
                    } else {
                        b(f)
                    }
                },
                error: function(f) {
                    if (f.status == 404) {
                        c()
                    } else {
                        d(f.responseText)
                    }
                }
            })
        };
        this.push_tx = function(g, j, m, k) {
            try {
                MyWallet.setLoadingText("Pushing Transaction");
                var o = MyWallet.getTransactions();
                if (o.length > 0) {
                    var h = o[0].txIndex
                }
                var q = g.serialize();
                var n = Crypto.util.bytesToHex(Crypto.SHA256(Crypto.SHA256(q, {
                    asBytes: true
                }), {
                    asBytes: true
                }).reverse());

                function p() {
                    m();

                    function e() {
                        MyWallet.get_history(function() {
                            if (o.length == 0 || o[0].txIndex == h) {
                                a.get_rejection_reason(n, function(r) {
                                    MyWallet.makeNotice("error", "tx-error", r)
                                }, function() {
                                    if (o.length == 0 || o[0].txIndex == h) {
                                        MyWallet.get_history()
                                    }
                                }, function() {
                                    if (o.length == 0 || o[0].txIndex == h) {
                                        MyWallet.makeNotice("error", "tx-error", "Unknown Error Pushing Transaction")
                                    }
                                })
                            } else {
                                playSound("beep")
                            }
                        }, function() {
                            MyWallet.makeNotice("error", "tx-error", "Unable to determine if transaction was submitted. Please re-login.")
                        })
                    }
                    setTimeout(function() {
                        if (o.length == 0 || o[0].txIndex == h) {
                            e()
                        }
                    }, 3000)
                }

                function l() {
                    var e = Crypto.util.bytesToHex(q);
                    var r = {
                        format: "plain",
                        tx: e,
                        hash: n
                    };
                    if (j) {
                        r.note = j
                    }
                    $.ajax({
                        type: "POST",
                        url: root + "pushtx",
                        data: r,
                        success: function() {
                            p()
                        },
                        error: function(s) {
                            k(s ? s.responseText : null)
                        }
                    })
                }
                try {
                    var f = new ArrayBuffer(q.length);
                    var c = new Int8Array(f);
                    c.set(q);
                    var b = new Blob([f], {
                        type: "application/octet-stream"
                    });
                    if (b.size != q.length) {
                        throw "Inconsistent Data Sizes (blob : " + b.size + " s : " + q.length + " buffer : " + f.byteLength + ")"
                    }
                    var d = new FormData();
                    d.append("txbytes", b);
                    if (j) {
                        d.append("note", j)
                    }
                    d.append("format", "plain");
                    d.append("hash", n);
                    $.ajax({
                        url: root + "pushtx",
                        data: d,
                        processData: false,
                        contentType: false,
                        type: "POST",
                        success: function() {
                            p()
                        },
                        error: function(r) {
                            if (!r.responseText || r.responseText.indexOf("Parse:") == 0) {
                                l()
                            } else {
                                k(r ? r.responseText : null)
                            }
                        }
                    })
                } catch (i) {
                    console.log(i);
                    l()
                }
            } catch (i) {
                console.log(i);
                k(i)
            }
        };
        this.get_unspent = function(c, d, b) {
            MyWallet.setLoadingText("Getting Unspent Outputs");
            $.ajax({
                type: "POST",
                dataType: "json",
                url: root + "unspent",
                data: {
                    active: c.join("|"),
                    format: "json"
                },
                success: function(g) {
                    try {
                        if (g.error != null) {
                            throw g.error
                        }
                        if (g.notice != null) {
                            MyWallet.makeNotice("notice", "misc-notice", g.notice)
                        }
                        MyStore.put("unspent", JSON.stringify(g));
                        d(g)
                    } catch (f) {
                        b(f)
                    }
                },
                error: function(e) {
                    MyStore.get("unspent", function(f) {
                        try {
                            if (f != null) {
                                var h = $.parseJSON(f);
                                d(h)
                            } else {
                                if (e.responseText) {
                                    throw e.responseText
                                } else {
                                    throw "Error Contacting Server. No unspent outputs available in cache."
                                }
                            }
                        } catch (g) {
                            b(g)
                        }
                    })
                }
            })
        }
    };
