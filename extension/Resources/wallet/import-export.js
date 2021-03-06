function _ImportExport() {
    this.init = function(l, n, m) {
        MyWallet.setLoadingText("Loading Import Export View");
        if (!l.is(":empty")) {
            d();
            n();
            return
        }
        $.ajax({
            type: "GET",
            url: root + "wallet/import-export-template",
            data: {
                format: "plain",
                language: MyWallet.getLanguage()
            },
            success: function(o) {
                try {
                    l.html(o);
                    d();
                    n()
                } catch (p) {
                    console.log(p);
                    m()
                }
            },
            error: function() {
                MyWallet.makeNotice("error", "misc-error", "Error Downloading Import Export Template");
                m()
            }
        })
    };

    function e(l, n) {
        var m = $("#watch-only-modal");
        m.modal({
            keyboard: true,
            backdrop: "static",
            show: true
        });
        m.center();
        m.find(".address").text(l);
        m.find(".btn.btn-secondary").unbind().click(function() {
            m.modal("hide")
        });
        m.find(".btn.btn-primary").unbind().click(function() {
            n();
            m.modal("hide")
        })
    }

    function f(l, m, o) {
        var n = $("#import-private-key-warning-modal");
        n.modal({
            keyboard: true,
            backdrop: "static",
            show: true
        });
        n.center();
        n.find(".address").text(l);
        BlockchainAPI.get_balance([l], function(p) {
            n.find(".address").text(l + " - " + formatBTC(p))
        }, function(p) {
            MyWallet.makeNotice("error", "misc-error", p)
        });
        n.find(".btn.btn-secondary").unbind().click(function() {
            m();
            n.modal("hide")
        });
        n.find(".btn.btn-primary").unbind().click(function() {
            o();
            n.modal("hide")
        })
    }

    function d() {
        $('a[data-toggle="tab"]').unbind().on("show", function(l) {
            $(l.target.hash).trigger("show")
        });
        $("#import-json-btn").unbind().click(function() {
            $(this).prop("disabled", true);
            i($("#import-json"));
            $(this).prop("disabled", false)
        });
        $("#import-address-btn").unbind().click(function() {
            var m = $.trim($("#import-address-address").val());
            if (m.length = 0) {
                MyWallet.makeNotice("error", "misc-error", "You must enter an address to import");
                return
            }
            try {
                var l = new Bitcoin.Address(m);
                if (l.toString() != m) {
                    throw "Inconsistency between addresses"
                }
                $("#import-address-address").val("");
                e(m, function() {
                    try {
                        if (MyWallet.addWatchOnlyAddress(m)) {
                            MyWallet.makeNotice("success", "added-address", "Successfully Added Address " + l);
                            try {
                                ws.send('{"op":"addr_sub", "addr":"' + l + '"}')
                            } catch (o) {}
                            MyWallet.backupWallet("update", function() {
                                MyWallet.get_history()
                            })
                        } else {
                            throw "Wallet Full Or Addresses Exists"
                        }
                    } catch (o) {
                        MyWallet.makeNotice("error", "misc-error", o)
                    }
                })
            } catch (n) {
                MyWallet.makeNotice("error", "misc-error", "Error importing address: " + n);
                return
            }
        });
        $("#import-private-scan").unbind().click(function() {
            MyWallet.getSecondPassword(function() {
                loadScript("wallet/signer", function() {
                    showPrivateKeyModal(function(l) {
                        if (MyWallet.addPrivateKey(l, {
                            compressed: false,
                            app_name: IMPORTED_APP_NAME,
                            app_version: IMPORTED_APP_VERSION
                        })) {
                            MyWallet.backupWallet("update", function() {
                                MyWallet.get_history()
                            });
                            MyWallet.makeNotice("success", "added-address", "Imported Bitcoin Address " + l.getBitcoinAddress())
                        } else {
                            throw "Unable to add private key for bitcoin address " + l.getBitcoinAddress()
                        }
                    }, function(l) {
                        MyWallet.makeNotice("error", "misc-error", l)
                    }, "Any Private Key")
                })
            })
        });
        $("#import-private-btn").unbind().click(function() {
            var l = $("#import-private-key");
            try {
                a($.trim(l.val()))
            } catch (m) {
                MyWallet.makeNotice("error", "misc-error", "Error importing private key: " + m)
            }
            l.val("")
        });
        $("#import-brain-wallet-btn").unbind().click(function() {
            var n = $("#import-brain-wallet");
            var l = $.trim(n.val());
            if (l.length < 15) {
                MyWallet.makeNotice("error", "misc-error", "The passphrase must be at least 15 characters long");
                return
            }
            var m = Crypto.SHA256(l, {
                asBytes: true
            });
            try {
                a(Bitcoin.Base58.encode(m), "Brain Wallet", "brain_wallet")
            } catch (o) {
                MyWallet.makeNotice("error", "misc-error", "Error importing private key: " + o)
            }
            n.val("")
        });
        $("#export-priv-format").change(function(l) {
            $("#json-unencrypted-export").val(MyWallet.makeWalletJSON($("#export-priv-format").val()))
        });
        $("#export-crypted").on("show", function() {
            $("#json-crypted-export").val(MyWallet.getEncryptedWalletData())
        });
        $("#export-unencrypted").on("show", function() {
            MyWallet.getSecondPassword(function() {
                $("#export-priv-format").val("base58");
                $("#json-unencrypted-export").val(MyWallet.makeWalletJSON($("#export-priv-format").val()))
            })
        });
        $("#import-backup").on("show", function() {
            var l = this;
            k($(l))
        });
        $(".paper-wallet-btn").unbind().click(function() {
            loadScript("wallet/paper-wallet", function() {
                PaperWallet.showModal()
            })
        })
    }
    this.importJSON = function(o, m, w, s) {
        try {
            var n = 0;
            if (o == null || o.length == 0) {
                throw "No import data provided!"
            }
            var q = null;
            try {
                q = $.parseJSON(o);
                if (q == null) {
                    throw "null input_text"
                }
            } catch (r) {
                MyWallet.decrypt(o, m.main_password, MyWallet.getDefaultPbkdf2Iterations(), function(x) {
                    try {
                        q = $.parseJSON(x);
                        return (q != null)
                    } catch (y) {
                        return false
                    }
                })
            }
            var u = 0;
            var p = function() {
                try {
                    var x = q.keys[u];
                    var B = x.addr;
                    if (B != null && B.length > 0 && B != "undefined") {
                        try {
                            if (x.reserve) {
                                throw "Ignoring Reserve Key"
                            }
                            var G = x.priv;
                            if (!G) {
                                G = x.sec
                            }
                            if (G != null) {
                                var C = MyWallet.getDefaultPbkdf2Iterations();
                                if (q.options && q.options.pbkdf2_iterations) {
                                    C = q.options.pbkdf2_iterations
                                }
                                if (q.double_encryption) {
                                    if (m.second_password) {
                                        var F = MyWallet.decrypt(G, q.sharedKey + m.second_password, C, MyWallet.isBase58);
                                        if (F == null) {
                                            throw "Error decrypting private key for address " + B
                                        }
                                        G = F
                                    } else {
                                        MyWallet.getPassword($("#import-second-password-modal"), function(H) {
                                            m.second_password = H;
                                            ImportExport.importJSON(o, m, w, s)
                                        });
                                        return
                                    }
                                }
                                var D = MyWallet.detectPrivateKeyFormat(G);
                                var E = MyWallet.privateKeyStringToKey(G, D);
                                if (E.getBitcoinAddress().toString() == B || E.getBitcoinAddressCompressed().toString() == B) {
                                    try {
                                        MyWallet.addPrivateKey(E, {
                                            compressed: D == "compsipa",
                                            app_name: q.created_device_name ? q.created_device_name : IMPORTED_APP_NAME,
                                            app_version: q.created_device_version ? q.created_device_version : IMPORTED_APP_VERSION,
                                            created_time: q.created_time ? q.created_time : 0
                                        })
                                    } catch (A) {}++n
                                } else {
                                    throw "Not importing " + B + " because it is inconsistent with the decoded address "
                                }
                            }
                            if (MyWallet.addressExists(B)) {
                                if (x.label && $.trim(x.label.length) > 0) {
                                    MyWallet.setAddressLabel(B, $.trim(x.label))
                                }
                                if (x.tag) {
                                    MyWallet.setAddressTag(B, x.tag)
                                } else {
                                    if (x.reserve) {
                                        MyWallet.setAddressTag(B, 2)
                                    } else {
                                        MyWallet.setAddressTag(B, 1)
                                    }
                                }
                            }
                        } catch (A) {
                            console.log(A)
                        }
                    }
                    if (u < q.keys.length - 1) {
                        ++u;
                        setTimeout(p, 10);
                        return
                    }
                    if (q.address_book != null) {
                        for (var y = 0; y < q.address_book.length; ++y) {
                            var z = q.address_book[y];
                            if (z.addr && z.label) {
                                MyWallet.addAddressBookEntry(z.addr, z.label)
                            }
                        }
                    }
                    $("#import-input_text").val("");
                    if (n > 0) {
                        w()
                    } else {
                        throw "No Private Keys Imported. Unknown Format Incorrect Password"
                    }
                } catch (A) {
                    console.log(A);
                    try {
                        s(A)
                    } catch (A) {}
                }
            };
            if (q == null) {
                n = c(o);
                $("#import-input_text").val("");
                if (n > 0) {
                    w()
                } else {
                    throw "No Private Keys Imported. Unknown Format or Incorrect Password"
                }
            } else {
                if (q != null && q.keys != null && q.keys.length > 0) {
                    if (q.keys.length > 1000) {
                        MyWallet.makeNotice("info", "keys-skipped", "Some keys may have been skipped");
                        var v = 0;
                        var t = [];
                        var l = function() {
                            try {
                                for (; v < q.keys.length; ++v) {
                                    var x = q.keys[v];
                                    var z = x.addr;
                                    if (z == null || z.length == 0 || z == "undefined") {
                                        continue
                                    }
                                    if (x.reserve || x.tag == 2) {
                                        t.push(x.addr)
                                    }
                                    if (t.length == 1000 || (v == q.keys.length - 1 && t.length > 0)) {
                                        BlockchainAPI.get_balances(t, function(A) {
                                            try {
                                                for (var C in A) {
                                                    if (A[C].final_balance == 0) {
                                                        for (var B = 0; B < q.keys.length; ++B) {
                                                            var E = q.keys[B].addr;
                                                            if (E == C) {
                                                                if (q.keys.length > 1) {
                                                                    q.keys.splice(B, 1)
                                                                }--v
                                                            }
                                                        }
                                                    }
                                                }
                                                setTimeout(l, 10)
                                            } catch (D) {
                                                console.log(D);
                                                try {
                                                    s(D)
                                                } catch (D) {}
                                            }
                                        }, function(A) {
                                            console.log(A);
                                            try {
                                                s(A)
                                            } catch (A) {}
                                        });
                                        t = [];
                                        return
                                    }
                                }
                            } catch (y) {
                                console.log(y);
                                try {
                                    s(y)
                                } catch (y) {}
                            }
                            p()
                        };
                        l()
                    } else {
                        p()
                    }
                } else {
                    throw "Unknown Format"
                }
            }
        } catch (r) {
            console.log(r);
            try {
                s(r)
            } catch (r) {}
        }
    };

    function c(n) {
        var p = n.split(/\W+/g);
        try {
            var m = 0;
            for (var o in p) {
                var l = p[o];
                try {
                    var s = MyWallet.detectPrivateKeyFormat(l);
                    var t = MyWallet.privateKeyStringToKey(l, s);
                    var q = s == "compsipa";
                    try {
                        MyWallet.addPrivateKey(t, {
                            compressed: q,
                            app_name: IMPORTED_APP_NAME,
                            app_version: IMPORTED_APP_VERSION
                        })
                    } catch (r) {}++m
                } catch (r) {}
            }
            return m
        } catch (r) {
            MyWallet.makeNotice("error", "misc-error", r)
        }
        return false
    }

    function i(l) {
        MyWallet.getMainPassword(function(m) {
            MyWallet.getSecondPassword(function(n) {
                ImportExport.importJSON(l.val(), {
                    main_password: m,
                    second_password: n
                }, function() {
                    MyWallet.backupWallet("update", function() {
                        MyWallet.get_history()
                    })
                }, function(o) {
                    MyWallet.makeNotice("error", "misc-error", o)
                })
            })
        })
    }

    function b(n, l) {
        var m = $("#compressed-private-key-modal");
        m.modal({
            keyboard: true,
            backdrop: "static",
            show: true
        });
        m.center();
        m.find(".btn.btn-secondary").unbind().click(function() {
            n();
            m.modal("hide")
        });
        m.find(".btn.btn-primary").unbind().click(function() {
            l();
            m.modal("hide")
        })
    }

    function h(l) {
        MyWallet.setLoadingText("Importing Backup");
        MyWallet.securePost("wallet", {
            method: "get-backup",
            id: l,
            format: "json"
        }, function(o) {
            try {
                var n = o.payload;
                MyWallet.getMainPassword(function(p) {
                    MyWallet.getSecondPassword(function(q) {
                        ImportExport.importJSON(n, {
                            main_password: p,
                            second_password: q
                        }, function() {
                            MyWallet.backupWallet("update", function() {
                                MyWallet.get_history()
                            })
                        }, function(r) {
                            MyWallet.makeNotice("error", "misc-error", r)
                        })
                    })
                })
            } catch (m) {
                MyWallet.makeNotice("error", "misc-error", m)
            }
        }, function(m) {
            MyWallet.makeNotice("error", "misc-error", m.responseText)
        })
    }

    function k(l) {
        MyWallet.setLoadingText("Loading Backup List");
        MyWallet.securePost("wallet", {
            method: "list-backups",
            format: "json"
        }, function(s) {
            try {
                if (s == null) {
                    throw "Failed to get backups"
                }
                var n = l.find("table tbody").empty();
                var p = s.results;
                if (p.length == 0) {
                    throw "No backups found"
                }
                for (var o in p) {
                    var m = p[o];
                    var q = $("<tr><td>" + m.name + "</td><td>" + dateToString(new Date(m.last_modified)) + "</td><td>" + m.size + '</td><td><a class="act-import">Import</a></td></tr>');
                    (function(t) {
                        q.find(".act-import").click(function() {
                            h(t.id)
                        })
                    })(m);
                    n.append(q)
                }
            } catch (r) {
                MyWallet.makeNotice("error", "misc-error", r)
            }
        }, function(m) {
            MyWallet.makeNotice("error", "misc-error", m.responseText)
        })
    }

    function a(n, l, o, m) {
        MyWallet.getSecondPassword(function() {
            try {
                if (!n || n.length == 0) {
                    throw "You must enter a private key to import"
                }

                function q(w, v) {
                    if (MyWallet.addPrivateKey(w, {
                        compressed: v,
                        app_name: m ? m : IMPORTED_APP_NAME,
                        app_version: IMPORTED_APP_VERSION
                    })) {
                        var x = v ? w.getBitcoinAddressCompressed().toString() : w.getBitcoinAddress().toString();
                        if (l && l.length > 0) {
                            MyWallet.setAddressLabel(x, l)
                        }
                        MyWallet.backupWallet("update", function() {
                            MyWallet.get_history()
                        });
                        if (o) {
                            o()
                        }
                        MyWallet.makeNotice("success", "added", "Added Bitcoin Address " + x)
                    }
                }
                var t = MyWallet.detectPrivateKeyFormat(n);
                if (t == "bip38") {
                    MyWallet.getPassword($("#import-private-key-password"), function(v) {
                        ImportExport.parseBIP38toECKey(n, v, function(w, x) {
                            q(w, x)
                        }, function(w) {
                            MyWallet.makeNotice("error", "misc-error", w)
                        })
                    });
                    return
                }
                var p = MyWallet.privateKeyStringToKey(n, t);
                var u = null;
                if (t == "compsipa") {
                    u = p.getBitcoinAddressCompressed().toString()
                } else {
                    u = p.getBitcoinAddress().toString()
                } if (u == null || u.length == 0 || u == "undefined") {
                    throw "Unable to decode bitcoin addresses from private key"
                }
                if (MyWallet.addressExists(u) && !MyWallet.isWatchOnly(u)) {
                    throw "Address already exists in the wallet"
                }

                function r() {
                    loadScript("wallet/signer", function() {
                        BlockchainAPI.get_balance([u], function(v) {
                            var w = initNewTx();
                            w.fee = w.base_fee;
                            w.to_addresses.push({
                                address: new Bitcoin.Address(MyWallet.getPreferredAddress()),
                                value: BigInteger.valueOf(v).subtract(w.fee)
                            });
                            w.from_addresses = [u];
                            w.extra_private_keys[u] = B58.encode(p.priv);
                            w.start()
                        }, function() {
                            MyWallet.makeNotice("error", "misc-error", "Error Getting Address Balance")
                        })
                    })
                }
                f(u, function() {
                    if (t == "compsipa") {
                        b(function() {
                            q(p, true)
                        }, function() {
                            r()
                        })
                    } else {
                        if (MyWallet.addPrivateKey(p, {
                            compressed: false,
                            app_name: m ? m : IMPORTED_APP_NAME,
                            app_version: IMPORTED_APP_VERSION
                        })) {
                            q(p, false)
                        } else {
                            throw "Unable to add private key for bitcoin address " + u
                        }
                    }
                }, function() {
                    r()
                })
            } catch (s) {
                MyWallet.makeNotice("error", "misc-error", "Error importing private key: " + s)
            }
        })
    }
    this.parseBIP38toECKey = function(n, B, x, u) {
        var p;
        try {
            p = Bitcoin.Base58.decode(n)
        } catch (r) {
            u("Invalid Private Key");
            return
        }
        if (p.length != 43) {
            u("Invalid Private Key");
            return
        } else {
            if (p[0] != 1) {
                u("Invalid Private Key");
                return
            }
        }
        var t = p.slice(-4);
        p = p.slice(0, -4);
        var s = Crypto.SHA256(Crypto.SHA256(p, {
            asBytes: true
        }), {
            asBytes: true
        });
        if (s[0] != t[0] || s[1] != t[1] || s[2] != t[2] || s[3] != t[3]) {
            u("Invalid Private Key");
            return
        }
        var v = false;
        var q = false;
        var o = false;
        if (p[1] == 66) {
            if (p[2] == 224) {
                v = true
            } else {
                if (p[2] != 192) {
                    u("Invalid Private Key");
                    return
                }
            }
        } else {
            if (p[1] == 67) {
                q = true;
                v = (p[2] & 32) != 0;
                o = (p[2] & 4) != 0;
                if ((p[2] & 36) != p[2]) {
                    u("Invalid Private Key");
                    return
                }
            } else {
                u("Invalid Private Key");
                return
            }
        }
        var w;
        var A = {
            mode: new Crypto.mode.ECB(Crypto.pad.NoPadding),
            asBytes: true
        };
        var z = function() {
            var D = new Bitcoin.ECKey(w);
            var C = v ? D.getBitcoinAddressCompressed() : D.getBitcoinAddress();
            s = Crypto.SHA256(Crypto.SHA256(C.toString(), {
                asBytes: true
            }), {
                asBytes: true
            });
            if (s[0] != p[3] || s[1] != p[4] || s[2] != p[5] || s[3] != p[6]) {
                u("Incorrect Passphrase");
                return
            }
            x(D, v)
        };
        if (!q) {
            var l = p.slice(3, 7);
            ImportExport.Crypto_scrypt(B, l, 16384, 8, 8, 64, function(E) {
                var D = E.slice(32, 32 + 32);
                w = Crypto.AES.decrypt(p.slice(7, 7 + 32), D, A);
                for (var C = 0; C < 32; C++) {
                    w[C] ^= E[C]
                }
                z()
            })
        } else {
            var m = p.slice(7, 7 + 8);
            var y = !o ? m : m.slice(0, 4);
            ImportExport.Crypto_scrypt(B, y, 16384, 8, 8, 32, function(E) {
                var I;
                if (!o) {
                    I = E
                } else {
                    var D = E.concat(m);
                    I = Crypto.SHA256(Crypto.SHA256(D, {
                        asBytes: true
                    }), {
                        asBytes: true
                    })
                }
                var G = new Bitcoin.ECKey(I);
                var C = G.getPubCompressed();
                var F = p.slice(23, 23 + 16);
                var H = p.slice(3, 3 + 12);
                ImportExport.Crypto_scrypt(C, H, 1024, 1, 1, 64, function(K) {
                    var M = K.slice(32);
                    var Q = Crypto.AES.decrypt(F, M, A);
                    for (var N = 0; N < 16; N++) {
                        Q[N] ^= K[N + 16]
                    }
                    var L = p.slice(15, 15 + 8).concat(Q.slice(0, 0 + 8));
                    var R = Crypto.AES.decrypt(L, M, A);
                    for (var N = 0; N < 16; N++) {
                        R[N] ^= K[N]
                    }
                    var P = R.slice(0, 0 + 16).concat(Q.slice(8, 8 + 8));
                    var O = Crypto.SHA256(Crypto.SHA256(P, {
                        asBytes: true
                    }), {
                        asBytes: true
                    });
                    var J = secp256k1();
                    var S = BigInteger.fromByteArrayUnsigned(I).multiply(BigInteger.fromByteArrayUnsigned(O)).remainder(J.getN());
                    w = S.toByteArrayUnsigned();
                    z()
                })
            })
        }
    };
    var j = 2147483647;
    var g = null;
    this.Crypto_scrypt = function(q, v, x, m, o, C, z) {
        if (x == 0 || (x & (x - 1)) != 0) {
            throw Error("N must be > 0 and a power of 2")
        }
        if (x > j / 128 / m) {
            throw Error("Parameter N is too large")
        }
        if (m > j / 128 / o) {
            throw Error("Parameter r is too large")
        }
        var t = {
            iterations: 1,
            hasher: Crypto.SHA256,
            asBytes: true
        };
        var n = Crypto.PBKDF2(q, v, o * 128 * m, t);
        try {
            var u = 0;
            var A = 0;
            var y = function() {
                if (!g) {
                    var r = "(" + s.toString() + ")()";
                    var p;
                    try {
                        p = new Blob([r], {
                            type: "text/javascript"
                        })
                    } catch (B) {
                        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                        p = new BlobBuilder();
                        p.append(r);
                        p = p.getBlob("text/javascript")
                    }
                    g = URL.createObjectURL(p)
                }
                var D = new Worker(g);
                D.onmessage = function(I) {
                    var F = I.data[0],
                        J = I.data[1];
                    A++;
                    if (u < o) {
                        D.postMessage([x, m, o, n, u++])
                    }
                    var H = J.length,
                        E = F * 128 * m,
                        G = 0;
                    while (H--) {
                        n[E++] = J[G++]
                    }
                    if (A == o) {
                        z(Crypto.PBKDF2(q, n, C, t))
                    }
                };
                return D
            };
            var l = [y(), y()];
            l[0].postMessage([x, m, o, n, u++]);
            if (o > 1) {
                l[1].postMessage([x, m, o, n, u++])
            }
        } catch (w) {
            window.setTimeout(function() {
                s();
                z(Crypto.PBKDF2(q, n, C, t))
            }, 0)
        }

        function s() {
            var E = [],
                p = [];
            if (typeof n === "undefined") {
                onmessage = function(O) {
                    var P = O.data;
                    var S = P[0],
                        M = P[1],
                        Q = P[2],
                        T = P[3],
                        L = P[4];
                    var R = [];
                    H(T, L * 128 * M, R, 0, 128 * M);
                    J(R, 0, M, S, p, E);
                    postMessage([L, R])
                }
            } else {
                for (var D = 0; D < o; D++) {
                    J(n, D * 128 * m, m, x, p, E)
                }
            }

            function J(M, S, L, U, O, T) {
                var W = 0;
                var R = 128 * L;
                var Q;
                H(M, S, T, W, R);
                for (Q = 0; Q < U; Q++) {
                    H(T, W, O, Q * R, R);
                    r(T, W, R, L)
                }
                for (Q = 0; Q < U; Q++) {
                    var P = I(T, W, L) & (U - 1);
                    K(O, P * R, T, W, R);
                    r(T, W, R, L)
                }
                H(T, W, M, S, R)
            }

            function r(P, M, O, N) {
                var Q = [];
                var L;
                H(P, M + (2 * N - 1) * 64, Q, 0, 64);
                for (L = 0; L < 2 * N; L++) {
                    K(P, L * 64, Q, 0, 64);
                    G(Q);
                    H(Q, 0, P, O + (L * 64), 64)
                }
                for (L = 0; L < N; L++) {
                    H(P, O + (L * 2) * 64, P, M + (L * 64), 64)
                }
                for (L = 0; L < N; L++) {
                    H(P, O + (L * 2 + 1) * 64, P, M + (L + N) * 64, 64)
                }
            }

            function B(M, L) {
                return (M << L) | (M >>> (32 - L))
            }

            function G(P) {
                var O = new Array(32);
                var L = new Array(32);
                var N;
                for (N = 0; N < 16; N++) {
                    O[N] = (P[N * 4 + 0] & 255) << 0;
                    O[N] |= (P[N * 4 + 1] & 255) << 8;
                    O[N] |= (P[N * 4 + 2] & 255) << 16;
                    O[N] |= (P[N * 4 + 3] & 255) << 24
                }
                F(O, 0, L, 0, 16);
                for (N = 8; N > 0; N -= 2) {
                    L[4] ^= B(L[0] + L[12], 7);
                    L[8] ^= B(L[4] + L[0], 9);
                    L[12] ^= B(L[8] + L[4], 13);
                    L[0] ^= B(L[12] + L[8], 18);
                    L[9] ^= B(L[5] + L[1], 7);
                    L[13] ^= B(L[9] + L[5], 9);
                    L[1] ^= B(L[13] + L[9], 13);
                    L[5] ^= B(L[1] + L[13], 18);
                    L[14] ^= B(L[10] + L[6], 7);
                    L[2] ^= B(L[14] + L[10], 9);
                    L[6] ^= B(L[2] + L[14], 13);
                    L[10] ^= B(L[6] + L[2], 18);
                    L[3] ^= B(L[15] + L[11], 7);
                    L[7] ^= B(L[3] + L[15], 9);
                    L[11] ^= B(L[7] + L[3], 13);
                    L[15] ^= B(L[11] + L[7], 18);
                    L[1] ^= B(L[0] + L[3], 7);
                    L[2] ^= B(L[1] + L[0], 9);
                    L[3] ^= B(L[2] + L[1], 13);
                    L[0] ^= B(L[3] + L[2], 18);
                    L[6] ^= B(L[5] + L[4], 7);
                    L[7] ^= B(L[6] + L[5], 9);
                    L[4] ^= B(L[7] + L[6], 13);
                    L[5] ^= B(L[4] + L[7], 18);
                    L[11] ^= B(L[10] + L[9], 7);
                    L[8] ^= B(L[11] + L[10], 9);
                    L[9] ^= B(L[8] + L[11], 13);
                    L[10] ^= B(L[9] + L[8], 18);
                    L[12] ^= B(L[15] + L[14], 7);
                    L[13] ^= B(L[12] + L[15], 9);
                    L[14] ^= B(L[13] + L[12], 13);
                    L[15] ^= B(L[14] + L[13], 18)
                }
                for (N = 0; N < 16; ++N) {
                    O[N] = L[N] + O[N]
                }
                for (N = 0; N < 16; N++) {
                    var M = N * 4;
                    P[M + 0] = (O[N] >> 0 & 255);
                    P[M + 1] = (O[N] >> 8 & 255);
                    P[M + 2] = (O[N] >> 16 & 255);
                    P[M + 3] = (O[N] >> 24 & 255)
                }
            }

            function K(N, O, Q, P, L) {
                var M = L >> 6;
                while (M--) {
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++];
                    Q[P++] ^= N[O++]
                }
            }

            function I(O, L, M) {
                var N;
                L += (2 * M - 1) * 64;
                N = (O[L + 0] & 255) << 0;
                N |= (O[L + 1] & 255) << 8;
                N |= (O[L + 2] & 255) << 16;
                N |= (O[L + 3] & 255) << 24;
                return N
            }

            function F(P, N, M, L, O) {
                while (O--) {
                    M[L++] = P[N++]
                }
            }

            function H(Q, O, M, L, P) {
                var N = P >> 5;
                while (N--) {
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++];
                    M[L++] = Q[O++]
                }
            }
        }
    }
}
var ImportExport = new _ImportExport();
