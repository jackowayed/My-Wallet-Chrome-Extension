function exceptionToString(b) {
    var a = "";
    for (var c in b) {
        a += "property: " + c + " value: [" + b[c] + "]\n"
    }
    return "toString():  value: [" + b.toString() + "]"
}

function generateNewMiniPrivateKey() {
    while (true) {
        var c = new Bitcoin.ECKey(false);
        var b = "S" + Bitcoin.Base58.encode(c.priv).substr(0, 21);
        var f = Crypto.SHA256(b + "?", {
            asBytes: true
        });
        if (f[0] == 0) {
            var a = Crypto.SHA256(b, {
                asBytes: true
            });
            var d = new Bitcoin.ECKey(a);
            if (MyWallet.addPrivateKey(d)) {
                return {
                    key: d,
                    miniKey: b
                }
            }
        }
    }
}

function IsCanonicalSignature(c) {
    if (c.length < 9) {
        throw "Non-canonical signature: too short"
    }
    if (c.length > 73) {
        throw "Non-canonical signature: too long"
    }
    var b = c[c.length - 1] & (~(SIGHASH_ANYONECANPAY));
    if (b < SIGHASH_ALL || b > SIGHASH_SINGLE) {
        throw "Non-canonical signature: unknown hashtype byte"
    }
    if (c[0] != 48) {
        throw "Non-canonical signature: wrong type"
    }
    if (c[1] != c.length - 3) {
        throw "Non-canonical signature: wrong length marker"
    }
    var a = c[3];
    if (5 + a >= c.length) {
        throw "Non-canonical signature: S length misplaced"
    }
    var f = c[5 + a];
    if (a + f + 7 != c.length) {
        throw "Non-canonical signature: R+S length mismatch"
    }
    var d = 4;
    if (c[d - 2] != 2) {
        throw "Non-canonical signature: R value type mismatch"
    }
    if (a == 0) {
        throw "Non-canonical signature: R length is zero"
    }
    if (c[d + 0] & 128) {
        throw "Non-canonical signature: R value negative"
    }
    if (a > 1 && (c[d + 0] == 0) && !(c[d + 1] & 128)) {
        throw "Non-canonical signature: R value excessively padded"
    }
    var d = 6 + a;
    if (c[d - 2] != 2) {
        throw "Non-canonical signature: S value type mismatch"
    }
    if (f == 0) {
        throw "Non-canonical signature: S length is zero"
    }
    if (c[d + 0] & 128) {
        throw "Non-canonical signature: S value negative"
    }
    if (f > 1 && (c[d + 0] == 0) && !(c[d + 1] & 128)) {
        throw "Non-canonical signature: S value excessively padded"
    }
    return true
}
try {
    if (typeof window == "undefined" || !window) {
        self.addEventListener("message", function(g) {
            var f = g.data;
            switch (f.cmd) {
                case "seed":
                    var b = Crypto.util.bytesToWords(Crypto.util.hexToBytes(f.seed));
                    for (var d in b) {
                        rng_seed_int(b[d])
                    }
                    break;
                case "load_resource":
                    importScripts(f.path);
                    break;
                case "sign_input":
                    try {
                        var a = new Bitcoin.Transaction(f.tx);
                        var c = new Bitcoin.Script(f.connected_script);
                        var h = signInput(a, f.outputN, f.priv_to_use, c);
                        if (h) {
                            self.postMessage({
                                cmd: "on_sign",
                                script: h,
                                outputN: f.outputN
                            })
                        } else {
                            throw "Unknown Error Signing Script " + f.outputN
                        }
                    } catch (g) {
                        self.postMessage({
                            cmd: "on_error",
                            e: exceptionToString(g)
                        })
                    }
                    break;
                default:
                    self.postMessage({
                        cmd: "on_error",
                        e: "Unknown Command"
                    })
            }
        }, false)
    }
} catch (e) {}

function showPrivateKeyModal(g, a, h) {
    var c = $("#private-key-modal");
    c.modal({
        keyboard: true,
        backdrop: "static",
        show: true
    });
    c.center();
    c.find(".address").text(h);
    var d = null;
    var b = null;
    var f = c.find('input[name="key"]');
    f.val("");
    c.find(".qrcodeicon span").click(function() {
        c.modal("hide");
        MyWallet.scanQRCode(function(i) {
            console.log("Scanned " + i);
            try {
                d = MyWallet.privateKeyStringToKey(i, MyWallet.detectPrivateKeyFormat(i));
                if (d == null) {
                    b = "Error decoding private key"
                }
            } catch (j) {
                b = "Error decoding private key " + j
            }
            c.modal("show");
            f.val(i)
        }, function(i) {
            c.modal("show");
            MyWallet.makeNotice("error", "misc-error", i)
        })
    });
    c.find(".btn.btn-primary").unbind().click(function() {
        var i = $.trim(f.val());
        try {
            if (i.length == 0) {
                throw "You must enter a private key to import"
            }
            d = MyWallet.privateKeyStringToKey(i, MyWallet.detectPrivateKeyFormat(i));
            if (d == null) {
                throw "Could not decode private key"
            }
        } catch (j) {
            b = "Error importing private key " + j
        }
        c.modal("hide");
        if (d) {
            g(d)
        } else {
            a(b)
        }
    });
    c.find(".btn.btn-secondary").unbind().click(function() {
        c.modal("hide");
        a("User Cancelled")
    })
}

function resolveAddress(a) {
    a = $.trim(a);
    try {
        return new Bitcoin.Address(a).toString()
    } catch (f) {}
    a = a.toLowerCase();
    var h = MyWallet.getAddressBook();
    for (var c in h) {
        var d = MyWallet.getAddressBookLabel(c);
        if (d.toLowerCase() == a) {
            return $.trim(c)
        }
    }
    var g = MyWallet.getAllAddresses();
    for (var b = 0; b < g.length; ++b) {
        var c = g[b];
        var d = MyWallet.getAddressLabel(c);
        if (d && d.toLowerCase() == a) {
            return c
        }
    }
    return null
}

function startTxUI(a, j, f, c) {
    function l() {
        a.find('input[name="send-value"]').val("");
        a.find('input[name="send-to-address"]').val("")
    }
    try {
        $(".send-value,.send-value-usd,.send").prop("disabled", true);
        var g = 0;
        a.find('input[name="send-value"]').each(function() {
            g += parseFloat($(this).val())
        });
        var d = true;
        if (g > precisionFromBTC(10)) {
            if (j == "email" || j == "sms") {
                throw "Cannot Send More Than 10 BTC via email or sms"
            } else {
                if (j == "quick") {
                    j = "custom";
                    d = false
                }
            }
        } else {
            if (j == "shared" && g < precisionFromBTC(0.2)) {
                throw "The Minimum Amount You Can Send Shared is " + formatPrecision(precisionFromBTC(0.2))
            } else {
                if (j == "shared" && g > precisionFromBTC(250)) {
                    throw "The Maximum Amount You Can Send Shared is " + formatPrecision(precisionFromBTC(250))
                }
            }
        } if (MyWallet.getMixerFee() < 0 && (j == "custom" || j == "quick") && g >= precisionFromBTC(5) && getCookie("shared-never-ask") != "true" && !c) {
            var i = getCookie("shared-accepted-time");
            if (!i || parseInt(i) < new Date().getTime() - 43200000) {
                var m = $("#ask-for-shared");
                m.find(".bonus-percent").text(-MyWallet.getMixerFee());
                m.find(".bonus-value").text(formatPrecision((g / 100) * -MyWallet.getMixerFee()));
                var k = m.find(".delay");
                if (g <= precisionFromBTC(10)) {
                    k.text("20 Seconds")
                } else {
                    if (g <= precisionFromBTC(25)) {
                        k.text("10 Minutes")
                    } else {
                        if (g <= precisionFromBTC(250)) {
                            k.text("20 Minutes")
                        } else {
                            k.text("1 hour")
                        }
                    }
                }
                m.modal({
                    keyboard: false,
                    backdrop: "static",
                    show: true
                });
                m.find(".btn.btn-primary").unbind().click(function() {
                    var n = startTxUI(a, "shared", f);
                    n.addListener({
                        on_success: function() {
                            SetCookie("shared-accepted-time", new Date().getTime())
                        }
                    });
                    m.modal("hide")
                });
                m.find(".btn.btn-secondary").unbind().click(function() {
                    m.modal("hide");
                    startTxUI(a, j, f, true)
                });
                return
            }
        }
        var b = {};
        if (j == "custom" || j == "shared") {
            var b = {
                on_error: function(n) {
                    if (this.modal) {
                        this.modal.modal("hide")
                    }
                },
                on_success: function() {
                    l()
                },
                on_start: function() {
                    var n = this;
                    this.modal = $("#new-transaction-modal");
                    this.modal.modal({
                        keyboard: false,
                        backdrop: "static",
                        show: true
                    });
                    this.modal.find(".offline-transaction").hide();
                    this.modal.find("#missing-private-key").hide();
                    this.modal.find("#review-tx").hide();
                    this.modal.find(".modal-header h3").html("Creating transaction");
                    this.modal.find("#tx-sign-progress").hide();
                    this.modal.find(".btn.btn-primary").prop("disabled", true);
                    this.modal.find(".btn.btn-primary").text("Send Transaction");
                    this.modal.find(".btn.btn-secondary").unbind().click(function() {
                        if (n.modal) {
                            n.modal.modal("hide")
                        }
                        n.cancel()
                    })
                },
                on_begin_signing: function() {
                    $("#tx-sign-progress").show().find(".t").text(this.tx.ins.length)
                },
                on_sign_progress: function(n) {
                    $("#tx-sign-progress").find(".n").text(n)
                },
                on_finish_signing: function() {
                    $("#tx-sign-progress").hide()
                }
            };
            f.addListener(b);
            if (d) {
                f.ask_for_fee = function(q, p) {
                    var n = this;
                    if (n.modal) {
                        n.modal.modal("hide")
                    }
                    var o = $("#ask-for-fee");
                    o.modal({
                        keyboard: false,
                        backdrop: "static",
                        show: true
                    });
                    o.find(".btn.btn-primary").unbind().click(function() {
                        o.modal("hide");
                        q()
                    });
                    o.find(".btn.btn-secondary").unbind().click(function() {
                        o.modal("hide");
                        p()
                    });
                    o.unbind().on("hidden", function() {
                        if (n.modal) {
                            n.modal.modal("show")
                        }
                    })
                }
            }
            f.ask_to_send = function() {
                var n = this;
                try {
                    n.modal.find(".modal-header h3").html(n.ready_to_send_header);
                    n.modal.find("#missing-private-key").hide();
                    n.modal.find("#review-tx").show();
                    setReviewTransactionContent(n.modal, n.tx, n.type);
                    setAdv(false);
                    n.modal.center();
                    var o = n.modal.find(".btn.btn-primary");
                    MyWallet.setLoadingText("Checking Connectivity");
                    $.ajax({
                        type: "GET",
                        url: root + "ping",
                        data: {
                            format: "plain",
                            date: new Date().getTime()
                        },
                        success: function() {
                            o.removeAttr("disabled");
                            o.text("Send Transaction");
                            o.unbind().click(function() {
                                o.prop("disabled", true);
                                if (n.modal) {
                                    n.modal.modal("hide")
                                }
                                n.send()
                            })
                        },
                        error: function() {
                            n.modal.find(".modal-header h3").html("Created Offline Transaction.");
                            o.removeAttr("disabled");
                            o.text("Show Offline Instructions");
                            o.unbind().click(function() {
                                o.prop("disabled", true);
                                n.modal.find("#missing-private-key").hide();
                                n.modal.find("#review-tx").hide();
                                n.modal.find(".offline-transaction").show();
                                var q = n.tx.serialize();
                                var r = Crypto.util.bytesToHex(q);
                                n.modal.find('.offline-transaction textarea[name="data"]').val(r)
                            });
                            n.modal.center()
                        }
                    })
                } catch (p) {
                    n.error(p)
                }
            }
        } else {
            if (j == "quick" || j == "email" || j == "dice" || j == "sms") {
                var b = {
                    on_error: function(n) {
                        a.find(".send").show();
                        if (this.p) {
                            this.p.hide()
                        }
                    },
                    on_success: function() {
                        try {
                            a.find(".send").show();
                            if (j != "dice") {
                                l()
                            }
                            if (this.p) {
                                this.p.hide()
                            }
                        } catch (n) {
                            console.log(n)
                        }
                    },
                    on_start: function() {
                        this.p = a.find(".progress");
                        a.find(".send").hide();
                        this.p.show();
                        this.p.children().css("width", "10%")
                    },
                    on_begin_signing: function() {
                        this.p.children().css("width", "25%")
                    },
                    on_sign_progress: function(n) {
                        this.p.children().css("width", 25 + ((100 / this.tx.ins.length) * n) + "%")
                    },
                    on_finish_signing: function() {
                        this.p.children().css("width", "100%")
                    }
                };
                f.addListener(b);
                if (j == "sms") {
                    f.ask_to_send = function() {
                        try {
                            var n = this;
                            MyWallet.securePost("send-via", {
                                type: "sms",
                                to: n.sms_data.number,
                                priv: n.sms_data.miniKey,
                                hash: Crypto.util.bytesToHex(n.tx.getHash().reverse())
                            }, function() {
                                n.send()
                            }, function(p) {
                                n.error(p ? p.responseText : null)
                            })
                        } catch (o) {
                            n.error(o)
                        }
                    }
                } else {
                    if (j == "email") {
                        f.ask_to_send = function() {
                            var n = this;
                            var o = $("#send-email-modal");
                            try {
                                MyWallet.securePost("wallet", {
                                    method: "get-info",
                                    format: "json"
                                }, function(q) {
                                    try {
                                        o.modal({
                                            keyboard: true,
                                            backdrop: "static",
                                            show: true
                                        });
                                        var s = q.alias;
                                        if (s == null) {
                                            s = q.email
                                        }
                                        if (s == null) {
                                            s = "Shared"
                                        }
                                        o.find(".amount").text(formatBTC(n.email_data.amount.toString()));
                                        o.find(".email").text(n.email_data.email);
                                        o.find(".frame").html('<iframe frameBorder="0" style="box-sizing:border-box;width:100%;height:100%" src="' + root + "email-template?from_name=" + s + "&amount=" + n.email_data.amount + '&priv=Preview&type=send-bitcoins-get"></iframe>');
                                        o.find(".btn.btn-secondary").unbind().click(function() {
                                            n.cancel();
                                            o.modal("hide")
                                        });
                                        o.find(".btn.btn-primary").unbind().click(function() {
                                            o.modal("hide");
                                            try {
                                                MyWallet.securePost("send-via", {
                                                    type: "email",
                                                    to: n.email_data.email,
                                                    priv: n.email_data.priv,
                                                    hash: Crypto.util.bytesToHex(n.tx.getHash().reverse())
                                                }, function(u) {
                                                    n.send()
                                                }, function(u) {
                                                    n.error(u ? u.responseText : null)
                                                })
                                            } catch (t) {
                                                n.error(t)
                                            }
                                        })
                                    } catch (r) {
                                        o.modal("hide");
                                        n.error(r)
                                    }
                                }, function(q) {
                                    o.modal("hide");
                                    n.error("Error Getting Account Data")
                                })
                            } catch (p) {
                                o.modal("hide");
                                n.error(p)
                            }
                        }
                    }
                }
            }
        }
        f.insufficient_funds = function(p, n, s, r) {
            var o = this;
            if (o.modal) {
                o.modal.modal("hide")
            }
            var q = $("#insufficient-funds");
            q.find(".amount-required").text(formatBTC(p));
            q.find(".amount-available").text(formatBTC(n));
            q.modal({
                keyboard: false,
                backdrop: "static",
                show: true
            });
            q.find(".btn.btn-primary").unbind().click(function() {
                q.modal("hide");
                s()
            });
            q.find(".btn.btn-secondary").unbind().click(function() {
                q.modal("hide");
                r()
            });
            q.unbind().on("hidden", function() {
                if (o.modal) {
                    o.modal.modal("show")
                }
            })
        };
        f.ask_for_private_key = function(p, o, q) {
            var n = this;
            if (n.modal) {
                n.modal.modal("hide")
            }
            showPrivateKeyModal(function(r) {
                if (n.modal) {
                    n.modal.modal("show")
                }
                p(r)
            }, function(r) {
                if (n.modal) {
                    n.modal.modal("show")
                }
                o(r)
            }, q)
        };
        f.type = j;
        if (MyWallet.getFeePolicy() == 1) {
            f.base_fee = BigInteger.valueOf(100000);
            f.fee = BigInteger.valueOf(100000)
        } else {
            if (MyWallet.getFeePolicy() == -1) {
                f.base_fee = BigInteger.valueOf(10000);
                f.ask_for_fee = function(o, n) {
                    n()
                }
            }
        }
        MyWallet.getSecondPassword(function() {
            try {
                var o = a.find('select[name="from"]');
                var t = o.val();
                if (t == null || t == "any") {
                    f.from_addresses = MyWallet.getActiveAddresses()
                } else {
                    if (o.attr("multiple") == "multiple") {
                        f.from_addresses = t
                    } else {
                        f.from_addresses = [t]
                    }
                }
                var w = a.find('textarea[name="public-note"]').val();
                if (w != null && w.length > 0) {
                    if (w.length > 255) {
                        throw "Notes are restricted to 255 characters in length"
                    }
                    f.note = w
                }
                var s = $.trim(a.find('select[name="change"]').val());
                if (s.length > 0) {
                    if (s == "new") {
                        var x = MyWallet.generateNewKey();
                        var q = x.getBitcoinAddress();
                        f.change_address = q;
                        f.generated_addresses.push(q.toString())
                    } else {
                        if (s != "any") {
                            try {
                                f.change_address = new Bitcoin.Address(s)
                            } catch (v) {
                                throw "Invalid change address: " + v
                            }
                        }
                    }
                }
                var n = precisionToSatoshiBN(a.find('input[name="fees"]').val());
                if (n.compareTo(BigInteger.ZERO) > 0) {
                    f.fee = n
                }
                var p = a.find(".recipient");
                if (p.length == 0) {
                    throw "A transaction must have at least one recipient"
                }
                var u = p.length;
                var r = function() {
                    if (u == 0) {
                        f.error("Nothing to send.");
                        return
                    }
                    if (f.to_addresses.length < u) {
                        return
                    }
                    if (f.to_addresses.length > u) {
                        f.error("We seem to have more recipients than required. Unknown error");
                        return
                    }
                    f.start()
                };
                p.each(function() {
                    try {
                        var z = $(this);
                        var A = z.find('input[name="send-value"]');
                        var L = z.find('input[name="send-to-address"]');
                        var G = z.find('input[name="send-to-email"]');
                        var B = z.find('input[name="send-to-sms"]');
                        var I = 0;
                        try {
                            I = precisionToSatoshiBN(A.val());
                            if (I == null || I.compareTo(BigInteger.ZERO) <= 0) {
                                throw "You must enter a value greater than zero"
                            }
                        } catch (E) {
                            if (A.data("optional") == true) {
                                --u;
                                return true
                            } else {
                                throw "Invalid send amount"
                            }
                        }
                        if (L.length > 0) {
                            var C = $.trim(L.val()).replace(/[\u200B-\u200D\uFEFF]/g, "");
                            if (C == null || C.length == 0) {
                                throw "You must enter a bitcoin address for each recipient"
                            } else {
                                var H = resolveAddress(C);
                                if (j == "shared") {
                                    if (!H) {
                                        throw "Invalid Bitcoin Address"
                                    }
                                    MyWallet.setLoadingText("Creating Forwarding Address");
                                    MyWallet.securePost("forwarder", {
                                        action: "create-mix",
                                        address: H,
                                        shared: true,
                                        format: "json"
                                    }, function(N) {
                                        try {
                                            if (N.destination != H) {
                                                throw "Mismatch between requested and returned destination address"
                                            }
                                            if (N.fee_percent != MyWallet.getMixerFee()) {
                                                MyWallet.get_history();
                                                throw "The mixer fee may have changed"
                                            }
                                            f.to_addresses.push({
                                                address: new Bitcoin.Address(N.input_address),
                                                value: I
                                            });
                                            r()
                                        } catch (M) {
                                            f.error(M)
                                        }
                                    }, function(M) {
                                        f.error(M ? M.responseText : null)
                                    })
                                } else {
                                    if (H) {
                                        f.to_addresses.push({
                                            address: new Bitcoin.Address(H),
                                            value: I
                                        })
                                    } else {
                                        if (C.length < 10) {
                                            BlockchainAPI.resolve_firstbits(C, function(M) {
                                                try {
                                                    f.to_addresses.push({
                                                        address: new Bitcoin.Address(M),
                                                        value: I
                                                    });
                                                    r()
                                                } catch (N) {
                                                    f.error(N)
                                                }
                                            }, function() {
                                                f.error("Invalid to address: " + C)
                                            });
                                            return false
                                        } else {
                                            f.error("Invalid to address: " + C)
                                        }
                                    }
                                }
                            }
                        } else {
                            if (B.length > 0) {
                                var D = $.trim(B.val());
                                if (D.charAt(0) == "0") {
                                    D = D.substring(1)
                                }
                                if (D.charAt(0) != "+") {
                                    D = "+" + z.find('select[name="sms-country-code"]').val() + D
                                }
                                var F = generateNewMiniPrivateKey();
                                var H = F.key.getBitcoinAddress().toString();
                                MyWallet.setAddressTag(H, 2);
                                MyWallet.setAddressLabel(H, D + " (Sent Via SMS)");
                                f.generated_addresses.push(H);
                                f.to_addresses.push({
                                    address: new Bitcoin.Address(H),
                                    value: I
                                });
                                if (f.sms_data) {
                                    throw "Cannot send to more than one SMS recipient at a time"
                                }
                                f.sms_data = {
                                    number: D,
                                    miniKey: F.miniKey
                                }
                            } else {
                                if (G.length > 0) {
                                    var K = $.trim(G.val());

                                    function y(O) {
                                        var N = O.lastIndexOf("@");
                                        var M = O.lastIndexOf(".");
                                        return (N < M && N > 0 && O.indexOf("@@") == -1 && M > 2 && (O.length - M) > 2)
                                    }
                                    if (y(K)) {
                                        var J = MyWallet.generateNewKey();
                                        var H = J.getBitcoinAddress().toString();
                                        MyWallet.setAddressTag(H, 2);
                                        MyWallet.setAddressLabel(H, K + " (Sent Via Email)");
                                        f.generated_addresses.push(H);
                                        f.to_addresses.push({
                                            address: new Bitcoin.Address(H),
                                            value: I
                                        });
                                        if (f.email_data) {
                                            throw "Cannot send to more than one email recipient at a time"
                                        }
                                        f.email_data = {
                                            email: K,
                                            priv: B58.encode(J.priv),
                                            amount: I
                                        }
                                    } else {
                                        throw "Invalid Email Address"
                                    }
                                }
                            }
                        }
                    } catch (E) {
                        console.log(E);
                        f.error(E)
                    }
                });
                r()
            } catch (v) {
                f.error(v)
            }
        }, function() {
            f.error()
        })
    } catch (h) {
        f.error(h)
    }
    return f
}

function readVarInt(c) {
    var a, b;
    a = c.splice(0, 1)[0];
    if (a < 253) {
        b = [a]
    } else {
        if (a == 253) {
            b = c.splice(0, 2)
        } else {
            if (a == 254) {
                b = c.splice(0, 4)
            } else {
                b = c.splice(0, 8)
            }
        }
    }
    return new BigInteger(b)
}

function readUInt32(a) {
    return new BigInteger(a.splice(0, 4).reverse()).intValue()
}

function signInput(i, c, b, l) {
    var a = l.simpleOutPubKeyHash();
    var d = new Bitcoin.Address(a).toString();
    var m = new Bitcoin.ECKey(b);
    var j;
    if (m.getBitcoinAddress().toString() == d.toString()) {
        j = false
    } else {
        if (m.getBitcoinAddressCompressed().toString() == d.toString()) {
            j = true
        } else {
            throw "Private key does not match bitcoin address " + d.toString() + " = " + m.getBitcoinAddress().toString() + " | " + m.getBitcoinAddressCompressed().toString()
        }
    }
    var h = i.hashTransactionForSignature(l, c, SIGHASH_ALL);
    var g = m.sign(h);
    var f = Bitcoin.ECDSA.serializeSig(g.r, g.s);
    f.push(SIGHASH_ALL);
    if (!IsCanonicalSignature(f)) {
        throw "IsCanonicalSignature returned false"
    }
    var k;
    if (j) {
        k = Bitcoin.Script.createInputScript(f, m.getPubCompressed())
    } else {
        k = Bitcoin.Script.createInputScript(f, m.getPub())
    } if (k == null) {
        throw "Error creating input script"
    }
    return k
}

function formatAddresses(b, f, a) {
    var g = "";
    if (f.length == 1) {
        var c = f[0].toString();
        if (a && MyWallet.addressExists(c) && MyWallet.getAddressLabel(c)) {
            g = MyWallet.getAddressLabel(c)
        } else {
            if (a && MyWallet.getAddressBookLabel(c)) {
                g = MyWallet.getAddressBookLabel(c)
            } else {
                g = c
            }
        }
    } else {
        g = "Escrow (<i>";
        for (var d = 0; d < f.length; ++d) {
            g += f[d].toString() + ", "
        }
        g = g.substring(0, g.length - 2);
        g += "</i> - " + b + " Required)"
    }
    return g
}

function setReviewTransactionContent(r, u, a) {
    $("#rtc-hash").html(Crypto.util.bytesToHex(u.getHash()));
    $("#rtc-version").html(u.version);
    $("#rtc-from").html("");
    $("#rtc-to").html("");
    var v = BigInteger.ZERO;
    var t = BigInteger.ZERO;
    var n = BigInteger.ZERO;
    var g = "send ";
    var q = true;
    var c = BigInteger.ZERO;
    for (var o = 0; o < u.ins.length; ++o) {
        var k = u.ins[o];
        t = t.add(k.outpoint.value);
        n = n.add(k.outpoint.value);
        var f = null;
        try {
            f = new Bitcoin.Address(k.script.simpleInPubKeyHash())
        } catch (s) {
            f = "Unable To Decode Address"
        }
        $("#rtc-from").append(f + ' <font color="green">' + formatBTC(k.outpoint.value.toString()) + " <br />")
    }
    var j = true;
    for (var o = 0; o < u.outs.length; ++o) {
        var p = u.outs[o];
        var d = p.value.slice();
        d.reverse();
        var w = new BigInteger(d);
        var h = [];
        var l = 1;
        try {
            l = p.script.extractAddresses(h)
        } catch (s) {
            console.log(s);
            h.push("Unknown Address!")
        }
        $("#rtc-to").append(formatAddresses(l, h) + ' <font color="green">' + formatBTC(w.toString()) + " </font><br />");
        v = v.add(w);
        t = t.subtract(w);
        if (h.length > 1) {
            if (!j) {
                g += " and "
            }
            g += "<b>" + formatBTC(w.toString()) + "</b> to " + formatAddresses(l, h, true);
            q = false;
            n = n.subtract(w)
        } else {
            if (h.length > 0) {
                var b = h[0].toString();
                if (!MyWallet.addressExists(b) || MyWallet.getAddressTag(b) == 2) {
                    if (w.compareTo(BigInteger.ZERO) == 0) {
                        continue
                    }
                    if (!j) {
                        g += " and "
                    }
                    if (a && a == "shared") {
                        g += "<b>" + formatBTC(w.toString()) + "</b> Shared"
                    } else {
                        g += "<b>" + formatBTC(w.toString()) + "</b> to " + formatAddresses(1, [b], true)
                    }
                    q = false
                } else {
                    n = n.subtract(w);
                    c = c.add(w)
                }
            }
        }
        j = false
    }
    if (t.compareTo(BigInteger.valueOf(1).multiply(BigInteger.valueOf(satoshi))) >= 0) {
        alert("Warning fees are very high for this transaction. Please double check each output!")
    }
    if (q == true) {
        g = "move <b>" + formatBTC(v.toString()) + "</b> between your own bitcoin addresses"
    }
    $("#rtc-basic-summary").html(g);
    $("#rtc-effect").html("-" + formatBTC(n.toString()));
    $("#rtc-fees").html(formatBTC(t.toString()));
    $("#rtc-value").html(formatBTC(v.toString()))
}

function initNewTx() {
    var b = {
        generated_addresses: [],
        to_addresses: [],
        fee: BigInteger.ZERO,
        extra_private_keys: {},
        listeners: [],
        is_cancelled: false,
        ask_to_send_shared: false,
        base_fee: BigInteger.valueOf(50000),
        min_free_output_size: BigInteger.valueOf(1000000),
        allow_adjust: true,
        ready_to_send_header: "Transaction Ready to Send.",
        addListener: function(c) {
            this.listeners.push(c)
        },
        invoke: function(c, f, g) {
            for (var d in this.listeners) {
                if (this.listeners[d][c]) {
                    this.listeners[d][c].call(this, f, g)
                }
            }
        },
        start: function() {
            var c = this;
            try {
                c.invoke("on_start");
                BlockchainAPI.get_unspent(c.from_addresses, function(k) {
                    try {
                        if (c.is_cancelled) {
                            throw "Transaction Cancelled"
                        }
                        if (k.unspent_outputs == null || k.unspent_outputs.length == 0) {
                            throw "No Free Outputs To Spend"
                        }
                        c.unspent = [];
                        for (var h = 0; h < k.unspent_outputs.length; ++h) {
                            var f;
                            try {
                                f = new Bitcoin.Script(Crypto.util.hexToBytes(k.unspent_outputs[h].script));
                                if (f.getOutType() == "Strange") {
                                    throw "Strange Script"
                                }
                            } catch (j) {
                                MyWallet.makeNotice("error", "misc-error", "Error decoding script: " + j);
                                continue
                            }
                            var g = {
                                script: f,
                                value: BigInteger.fromByteArrayUnsigned(Crypto.util.hexToBytes(k.unspent_outputs[h].value_hex)),
                                tx_output_n: k.unspent_outputs[h].tx_output_n,
                                tx_hash: k.unspent_outputs[h].tx_hash,
                                confirmations: k.unspent_outputs[h].confirmations
                            };
                            c.unspent.push(g)
                        }
                        c.makeTransaction()
                    } catch (j) {
                        c.error(j)
                    }
                }, function(f) {
                    c.error(f)
                })
            } catch (d) {
                c.error(d)
            }
        },
        makeTransaction: function() {
            var o = this;
            try {
                if (o.is_cancelled) {
                    throw "Transaction Cancelled"
                }
                o.selected_outputs = [];
                var k = BigInteger.ZERO;
                for (var r = 0; r < o.to_addresses.length; ++r) {
                    k = k.add(o.to_addresses[r].value)
                }
                var t = false;
                for (var r = 0; r < o.to_addresses.length; ++r) {
                    var n = o.to_addresses[r];
                    if (n.m != null) {
                        t = true;
                        break
                    }
                }
                var f = BigInteger.ZERO;
                if (o.fee != null) {
                    k = k.add(o.fee)
                }
                var x = 0;
                var d = [];
                var m = false;
                var w = false;
                var A = o.unspent.slice(0);

                function l(B) {
                    var E = new Bitcoin.Address(B.script.simpleOutPubKeyHash()).toString();
                    if (E == null) {
                        throw "Unable to decode output address from transaction hash " + B.tx_hash
                    }
                    var D = Crypto.util.hexToBytes(B.tx_hash);
                    var C = Crypto.util.bytesToBase64(Crypto.util.hexToBytes(B.tx_hash));
                    var i = new Bitcoin.TransactionIn({
                        outpoint: {
                            hash: C,
                            hexhash: D,
                            index: B.tx_output_n,
                            value: B.value
                        },
                        script: B.script,
                        sequence: 4294967295
                    });
                    return {
                        addr: E,
                        input: i
                    }
                }
                while (true) {
                    for (var r = 0; r < A.length; ++r) {
                        var s = A[r];
                        if (!s) {
                            continue
                        }
                        try {
                            var p = l(s);
                            if (!w && MyWallet.isWatchOnly(p.addr)) {
                                continue
                            }
                            if (o.from_addresses != null && $.inArray(p.addr, o.from_addresses) == -1) {
                                continue
                            }
                            if (s.value.compareTo(k) == 0 || s.value.compareTo(k.add(o.min_free_output_size)) >= 0) {
                                o.selected_outputs = [p.input];
                                A[r] = null;
                                d = [p.addr];
                                x = s.value * s.confirmations;
                                f = s.value;
                                break
                            } else {
                                o.selected_outputs.push(p.input);
                                A[r] = null;
                                d.push(p.addr);
                                x += s.value * s.confirmations;
                                f = f.add(s.value);
                                if (f.compareTo(k) == 0 || f.compareTo(k.add(o.min_free_output_size)) >= 0) {
                                    break
                                }
                            }
                        } catch (v) {
                            MyWallet.makeNotice("info", "tx-error", v)
                        }
                    }
                    if (f.compareTo(k) >= 0) {
                        break
                    }
                    if (w) {
                        break
                    }
                    w = true
                }

                function j() {
                    o.error("Insufficient funds. Value Needed " + formatBTC(k.toString()) + ". Available amount " + formatBTC(f.toString()))
                }
                var y = f.subtract(k);
                if (y.compareTo(BigInteger.ZERO) < 0) {
                    if (o.to_addresses.length == 1 && f.compareTo(BigInteger.ZERO) > 0 && o.allow_adjust) {
                        o.insufficient_funds(k, f, function() {
                            var i = o.to_addresses[0].value.add(y);
                            if (i.compareTo(BigInteger.ZERO) > 0 && i.compareTo(k) <= 0) {
                                o.to_addresses[0].value = i;
                                o.makeTransaction();
                                return
                            } else {
                                j()
                            }
                        }, function() {
                            j()
                        })
                    } else {
                        j()
                    }
                    return
                }
                if (o.selected_outputs.length == 0) {
                    o.error("No Available Outputs To Spend.");
                    return
                }
                var h = new Bitcoin.Transaction();
                for (var r = 0; r < o.selected_outputs.length; r++) {
                    h.addInput(o.selected_outputs[r])
                }
                var q = false;
                for (var r = 0; r < o.to_addresses.length; ++r) {
                    var n = o.to_addresses[r];
                    if (n.m != null) {
                        h.addOutputScript(Bitcoin.Script.createMultiSigOutputScript(n.m, n.pubkeys), n.value)
                    } else {
                        h.addOutput(n.address, n.value)
                    } if (n.value.compareTo(o.min_free_output_size) < 0) {
                        m = true
                    }
                }
                var u = f.subtract(k);
                if (u.compareTo(BigInteger.ZERO) > 0) {
                    if (o.change_address != null) {
                        h.addOutput(o.change_address, u)
                    } else {
                        if (d.length > 0) {
                            h.addOutput(new Bitcoin.Address(d[Math.floor(Math.random() * d.length)]), u)
                        } else {
                            h.addOutput(new Bitcoin.Address(MyWallet.getPreferredAddress()), u)
                        }
                    } if (u.compareTo(o.min_free_output_size) < 0) {
                        m = true
                    }
                }
                var c = h.serialize(h).length + (114 * h.ins.length);
                x /= c;
                var g = Math.max(1, Math.ceil(parseFloat(c / 1024)));
                var z = (!o.fee || o.fee.compareTo(o.base_fee) < 0);
                if (z && (m || g > 1)) {
                    o.fee = o.base_fee.multiply(BigInteger.valueOf(g));
                    o.makeTransaction()
                } else {
                    if (z && (x < 77600000 || t || q)) {
                        o.ask_for_fee(function() {
                            o.fee = o.base_fee.multiply(BigInteger.valueOf(g));
                            o.makeTransaction()
                        }, function() {
                            o.tx = h;
                            o.determinePrivateKeys(function() {
                                o.signInputs()
                            })
                        })
                    } else {
                        o.tx = h;
                        o.determinePrivateKeys(function() {
                            o.signInputs()
                        })
                    }
                }
            } catch (v) {
                this.error(v)
            }
        },
        ask_for_fee: function(d, c) {
            d()
        },
        insufficient_funds: function(d, c, g, f) {
            f()
        },
        determinePrivateKeys: function(l) {
            var c = this;
            try {
                if (c.is_cancelled) {
                    throw "Transaction Cancelled"
                }
                var j = {};
                for (var f in c.selected_outputs) {
                    var d = c.selected_outputs[f].script;
                    if (d.priv_to_use == null) {
                        var h = d.simpleOutPubKeyHash();
                        var g = new Bitcoin.Address(h).toString();
                        if (j[g]) {
                            d.priv_to_use = j[g]
                        } else {
                            if (c.extra_private_keys[g]) {
                                d.priv_to_use = Bitcoin.Base58.decode(c.extra_private_keys[g])
                            } else {
                                if (MyWallet.addressExists(g) && !MyWallet.isWatchOnly(g)) {
                                    try {
                                        d.priv_to_use = MyWallet.decodePK(MyWallet.getPrivateKey(g))
                                    } catch (k) {
                                        console.log(k)
                                    }
                                }
                            }
                        } if (d.priv_to_use == null) {
                            c.ask_for_private_key(function(i) {
                                try {
                                    if (g == i.getBitcoinAddress().toString() || g == i.getBitcoinAddressCompressed().toString()) {
                                        c.extra_private_keys[g] = Bitcoin.Base58.encode(i.priv);
                                        c.determinePrivateKeys(l)
                                    } else {
                                        throw "The private key you entered does not match the bitcoin address"
                                    }
                                } catch (m) {
                                    c.error(m)
                                }
                            }, function(i) {
                                c.from_addresses = $.grep(c.from_addresses, function(m) {
                                    return m != g
                                });
                                c.makeTransaction()
                            }, g);
                            return false
                        } else {
                            j[g] = d.priv_to_use
                        }
                    }
                }
                l()
            } catch (k) {
                c.error(k)
            }
        },
        signWebWorker: function(o, n) {
            var c = false;
            var l = function(i) {
                if (!c) {
                    n(i);
                    c = true
                }
            };
            try {
                var q = this;
                var j = 0;
                var p = Math.min(3, q.tx.ins.length);
                var d = new SecureRandom();
                q.worker = [];
                for (var f = 0; f < p; ++f) {
                    q.worker[f] = new Worker(resource + "wallet/signer" + (min ? ".min.js" : ".js"));
                    q.worker[f].addEventListener("message", function(r) {
                        var i = r.data;
                        try {
                            switch (i.cmd) {
                                case "on_sign":
                                    q.invoke("on_sign_progress", parseInt(i.outputN) + 1);
                                    q.tx.ins[i.outputN].script = new Bitcoin.Script(i.script);
                                    ++j;
                                    if (j == q.tx.ins.length) {
                                        q.terminateWorkers();
                                        o()
                                    }
                                    break;
                                case "on_message":
                                    console.log(i.message);
                                    break;
                                case "on_error":
                                    throw i.e
                            }
                        } catch (r) {
                            q.terminateWorkers();
                            l(r)
                        }
                    }, false);
                    q.worker[f].addEventListener("error", function(i) {
                        l(i)
                    });
                    q.worker[f].postMessage({
                        cmd: "load_resource",
                        path: resource + "wallet/bitcoinjs" + (min ? ".min.js" : ".js")
                    });
                    var g = new Array(32);
                    d.nextBytes(g);
                    q.worker[f].postMessage({
                        cmd: "seed",
                        seed: Crypto.util.bytesToHex(g)
                    })
                }
                for (var h in q.selected_outputs) {
                    var m = q.selected_outputs[h].script;
                    q.worker[h % p].postMessage({
                        cmd: "sign_input",
                        tx: q.tx,
                        outputN: h,
                        priv_to_use: m.priv_to_use,
                        connected_script: m
                    })
                }
            } catch (k) {
                l(k)
            }
        },
        signNormal: function(h, g) {
            var d = this;
            var c = 0;
            var f = function() {
                setTimeout(function() {
                    if (d.is_cancelled) {
                        g();
                        return
                    }
                    try {
                        d.invoke("on_sign_progress", c + 1);
                        var i = d.selected_outputs[c].script;
                        var k = signInput(d.tx, c, i.priv_to_use, i);
                        if (k) {
                            d.tx.ins[c].script = k;
                            c++;
                            if (c == d.tx.ins.length) {
                                h()
                            } else {
                                f()
                            }
                        } else {
                            throw "Unknown error signing transaction"
                        }
                    } catch (j) {
                        g(j)
                    }
                }, 1)
            };
            f()
        },
        signInputs: function() {
            var c = this;
            try {
                c.invoke("on_begin_signing");
                var f = function() {
                    c.invoke("on_finish_signing");
                    c.is_ready = true;
                    c.ask_to_send()
                };
                MyWallet._seed();
                c.signWebWorker(f, function(g) {
                    console.log(g);
                    c.signNormal(f, function(h) {
                        c.error(h)
                    })
                })
            } catch (d) {
                c.error(d)
            }
        },
        terminateWorkers: function() {
            if (this.worker) {
                for (var c in this.worker) {
                    try {
                        this.worker[c].terminate()
                    } catch (d) {}
                }
            }
        },
        cancel: function() {
            if (!this.has_pushed) {
                this.terminateWorkers();
                this.error("Transaction Cancelled")
            }
        },
        send: function() {
            var c = this;
            if (c.is_cancelled) {
                c.error("This transaction has already been cancelled");
                return
            }
            if (!c.is_ready) {
                c.error("Transaction is not ready to send yet");
                return
            }
            c.invoke("on_before_send");
            if (c.generated_addresses.length > 0) {
                c.has_saved_addresses = true;
                MyWallet.backupWallet("update", function() {
                    c.pushTx()
                }, function() {
                    c.error("Error Backing Up Wallet. Cannot Save Newly Generated Keys.")
                })
            } else {
                c.pushTx()
            }
        },
        pushTx: function() {
            var c = this;
            if (c.is_cancelled) {
                return
            }
            c.has_pushed = true;
            BlockchainAPI.push_tx(c.tx, c.note, function(d) {
                c.success(d)
            }, function(d) {
                c.error(d)
            })
        },
        ask_for_private_key: function(d, c) {
            c("Cannot ask for private key without user interaction disabled")
        },
        ask_to_send: function() {
            this.send()
        },
        error: function(c) {
            if (this.is_cancelled) {
                return
            }
            this.is_cancelled = true;
            if (!this.has_pushed && this.generated_addresses.length > 0) {
                for (var d in this.generated_addresses) {
                    MyWallet.deleteAddress(this.generated_addresses[d])
                }
                if (this.has_saved_addresses) {
                    MyWallet.backupWallet()
                }
            }
            this.invoke("on_error", c)
        },
        success: function() {
            this.invoke("on_success")
        }
    };
    var a = {
        on_error: function(c) {
            console.log(c);
            if (c) {
                MyWallet.makeNotice("error", "tx-error", c)
            }
            $(".send-value,.send-value-usd,.send").removeAttr("disabled")
        },
        on_success: function(c) {
            $(".send-value,.send-value-usd,.send").removeAttr("disabled")
        },
        on_start: function(c) {
            $(".send-value,.send-value-usd,.send").prop("disabled", true)
        },
        on_begin_signing: function() {
            this.start = new Date().getTime()
        },
        on_finish_signing: function() {
            console.log("Took " + (new Date().getTime() - this.start) + "ms")
        }
    };
    b.addListener(a);
    return b
};
