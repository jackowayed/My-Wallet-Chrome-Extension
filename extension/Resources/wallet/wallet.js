function precisionToSatoshiBN(a) {
    return Bitcoin.Util.parseValue(a).divide(BigInteger.valueOf(Math.pow(10, sShift(symbol_btc)).toString()))
}

function precisionToBTC(a) {
    return Bitcoin.Util.formatValue(precisionToSatoshiBN(a))
}

function precisionFromBTC(a) {
    return Bitcoin.Util.formatValue(Bitcoin.Util.parseValue(a).multiply(BigInteger.valueOf(Math.pow(10, sShift(symbol_btc)))))
}

function formatPrecision(a) {
    return formatBTC(precisionToSatoshiBN(a).toString())
}
var MyWallet = new function() {
        var h = this;
        this.skip_init = false;
        var D = "abcaa314-6f67-6705-b384-5d47fbe9d7cc";
        var ag;
        var M;
        var j;
        var aD;
        var ai;
        var w;
        var d;
        var au = 0;
        var Q = 0;
        var ao = 0;
        var K = 0;
        var aO = 0;
        var aB;
        var g = {};
        var E = [];
        var F = false;
        var ar = 0;
        var an = 0;
        var ax = 1000;
        var I = {};
        var av;
        var ak;
        var x = 0.5;
        var ad = 10;
        var b = {};
        var aJ = 0;
        var q;
        var S;
        var W = [];
        var B;
        var N = 60000;
        var A = false;
        var X;
        var am = false;
        var V = "en";
        var s = {
            pbkdf2_iterations: 10,
            fee_policy: 0,
            html5_notifications: false,
            logout_time: 600000,
            tx_display: 0,
            always_keep_local_backup: false
        };
        this.setEncryptedWalletData = function(aQ) {
            if (!aQ || aQ.length == 0) {
                ag = null;
                av = null;
                return
            }
            ag = aQ;
            av = ae();
            try {
                if (aJ == 0 || s.always_keep_local_backup) {
                    MyStore.put("payload", ag)
                }
            } catch (aR) {
                console.log(aR)
            }
        };
        this.setRealAuthType = function(aQ) {
            aJ = aQ
        };
        this.getLanguage = function() {
            return V
        };
        this.addEventListener = function(aQ) {
            W.push(aQ)
        };
        this.getLogoutTime = function() {
            return s.logout_time
        };
        this.getDefaultPbkdf2Iterations = function() {
            return ad
        };
        this.getPbkdf2Iterations = function() {
            return s.pbkdf2_iterations
        };
        this.setLogoutTime = function(aQ) {
            s.logout_time = aQ;
            clearInterval(S);
            S = setTimeout(h.logout, h.getLogoutTime())
        };
        this.getDoubleEncryption = function() {
            return F
        };
        this.getEncryptedWalletData = function() {
            return ag
        };
        this.getFeePolicy = function() {
            return s.fee_policy
        };
        this.setFeePolicy = function(aQ) {
            s.fee_policy = parseInt(aQ)
        };
        this.setAlwaysKeepLocalBackup = function(aQ) {
            s.always_keep_local_backup = aQ
        };
        this.getAlwaysKeepLocalBackup = function() {
            return s.always_keep_local_backup
        };
        this.getGuid = function() {
            return M
        };
        this.getHTML5Notifications = function() {
            return s.html5_notifications
        };
        this.setHTML5Notifications = function(aQ) {
            s.html5_notifications = aQ
        };
        this.getTransactions = function() {
            return E
        };
        this.addressExists = function(aQ) {
            return I[aQ] != null
        };
        this.getAddressTag = function(aQ) {
            return I[aQ].tag
        };
        this.setAddressTag = function(aR, aQ) {
            I[aR].tag = aQ
        };
        this.getAddressBook = function() {
            return g
        };
        this.getAddressLabel = function(aQ) {
            return I[aQ].label
        };
        this.setAddressLabel = function(aQ, aR) {
            I[aQ].label = aR
        };
        this.setAddressBalance = function(aQ, aR) {
            I[aQ].balance = aR
        };
        this.getAddressBookLabel = function(aQ) {
            return g[aQ]
        };
        this.isWatchOnly = function(aQ) {
            return !I[aQ] || I[aQ].priv == null
        };
        this.getAddressBalance = function(aQ) {
            return I[aQ].balance
        };
        this.getMixerFee = function() {
            return x
        };
        this.deleteAddress = function(aQ) {
            delete I[aQ]
        };
        this.addAddressBookEntry = function(aR, aQ) {
            g[aR] = aQ
        };
        this.getPrivateKey = function(aQ) {
            return I[aQ].priv
        };
        this.setLabel = function(aQ, aR) {
            I[aQ].label = aR;
            af();
            c()
        };
        this.securePost = function(aR, aS, aT, aQ) {
            var aU = jQuery.extend({}, aS);
            if (d == null || d.length == 0 || d.length != 36) {
                throw "Shared key is invalid"
            }
            aU.sharedKey = d;
            aU.guid = M;
            aU.format = aS.format ? aS.format : "plain";
            $.ajax({
                dataType: aS.format ? aS.format : "text",
                type: "POST",
                url: root + aR,
                data: aU,
                success: function(aV) {
                    aT(aV)
                },
                error: function(aV) {
                    aQ(aV)
                }
            })
        };
        this.isCorrectMainPassword = function(aQ) {
            return aD == aQ
        };

        function ab(aR, aT) {
            var aQ = Crypto.SHA256(aR, {
                asBytes: true
            });
            for (var aS = 1; aS < aT; ++aS) {
                aQ = Crypto.SHA256(aQ, {
                    asBytes: true
                })
            }
            return Crypto.util.bytesToHex(aQ)
        }
        this.setPbkdf2Iterations = function(aQ, aS) {
            var aR = function(aT) {
                console.log("Panic " + aT)
            };
            h.getSecondPassword(function() {
                try {
                    if (F) {
                        try {
                            for (var aT in I) {
                                var aV = I[aT];
                                if (aV.priv) {
                                    aV.priv = h.encrypt(h.decryptPK(aV.priv), d + ai, aQ);
                                    if (!aV.priv) {
                                        throw "addr.priv is null"
                                    }
                                }
                            }
                            s.pbkdf2_iterations = aQ;
                            w = ab(d + ai, s.pbkdf2_iterations);
                            h.checkAllKeys();
                            h.backupWallet("update", function() {
                                aS()
                            }, function() {
                                aR(aU)
                            })
                        } catch (aU) {
                            aR(aU)
                        }
                    } else {
                        h.backupWallet("update", function() {
                            aS()
                        }, function() {
                            aR(aU)
                        })
                    }
                } catch (aU) {
                    aR(aU)
                }
            }, function(aT) {
                aR(aT)
            })
        };
        this.setDoubleEncryption = function(aS, aQ, aU) {
            var aR = function(aV) {
                console.log("Panic " + aV);
                window.location.reload()
            };
            try {
                if (F == aS) {
                    return
                }
                if (aS) {
                    h.getSecondPassword(function() {
                        try {
                            F = true;
                            ai = aQ;
                            for (var aV in I) {
                                var aX = I[aV];
                                if (aX.priv) {
                                    aX.priv = i(B58.decode(aX.priv));
                                    if (!aX.priv) {
                                        throw "addr.priv is null"
                                    }
                                }
                            }
                            w = ab(d + ai, s.pbkdf2_iterations);
                            ai = null;
                            h.getSecondPassword(function() {
                                try {
                                    h.checkAllKeys();
                                    h.backupWallet("update", function() {
                                        aU()
                                    }, function() {
                                        aR(aY)
                                    })
                                } catch (aY) {
                                    aR(aY)
                                }
                            }, function(aY) {
                                aR(aY)
                            })
                        } catch (aW) {
                            aR(aW)
                        }
                    }, function(aV) {
                        aR(aV)
                    })
                } else {
                    h.getSecondPassword(function() {
                        try {
                            for (var aV in I) {
                                var aX = I[aV];
                                if (aX.priv) {
                                    aX.priv = h.decryptPK(aX.priv);
                                    if (!aX.priv) {
                                        throw "addr.priv is null"
                                    }
                                }
                            }
                            F = false;
                            ai = null;
                            h.checkAllKeys();
                            h.backupWallet("update", function() {
                                aU()
                            }, function() {
                                aR(aW)
                            })
                        } catch (aW) {
                            aR(aW)
                        }
                    }, function(aV) {
                        aR(aV)
                    })
                }
            } catch (aT) {
                aR(aT)
            }
        };
        this.unArchiveAddr = function(aQ) {
            var aQ = I[aQ];
            if (aQ.tag == 2) {
                aQ.tag = null;
                c();
                af("update", function() {
                    h.get_history()
                })
            } else {
                h.makeNotice("error", "add-error", "Cannot Unarchive This Address")
            }
        };
        this.archiveAddr = function(aQ) {
            if (h.getActiveAddresses().length <= 1) {
                h.makeNotice("error", "add-error", "You must leave at least one active address");
                return
            }
            var aQ = I[aQ];
            if (aQ.tag == null || aQ.tag == 0) {
                aQ.tag = 2;
                c();
                af("update", function() {
                    h.get_history()
                })
            } else {
                h.makeNotice("error", "add-error", "Cannot Archive This Address")
            }
        };
        this.addWatchOnlyAddress = function(aQ) {
            return aM(aQ)
        };
        this.addPrivateKey = function(aQ, aS) {
            if (ah()) {
                return false
            }
            if (aQ == null) {
                throw "Cannot add null key."
            }
            if (aS == null) {
                aS = {}
            }
            var aV = aS.compressed ? aQ.getBitcoinAddressCompressed().toString() : aQ.getBitcoinAddress().toString();
            var aU = i(aQ.priv);
            if (aU == null) {
                throw "Error Encoding key"
            }
            var aR = new Bitcoin.ECKey(h.decodePK(aU));
            if (aV != aR.getBitcoinAddress().toString() && aV != aR.getBitcoinAddressCompressed().toString()) {
                throw "Decoded Key address does not match generated address"
            }
            if (aM(aV, aU)) {
                I[aV].tag = 1;
                I[aV].created_time = aS.created_time ? aS.created_time : 0;
                I[aV].created_device_name = aS.app_name ? aS.app_name : APP_NAME;
                I[aV].created_device_version = aS.app_version ? aS.app_version : APP_VERSION;
                if (I[aV].priv != aU) {
                    throw "Address priv does not match encoded"
                }
                try {
                    ws.send('{"op":"addr_sub", "addr":"' + aV + '"}')
                } catch (aT) {}
            } else {
                throw "Unable to add generated bitcoin address."
            }
            return aV
        };
        this._seed = function(aS) {
            rng_seed_time();
            if (aD || aS) {
                var aQ = Crypto.util.bytesToWords(Crypto.SHA256(aD ? aD : aS, {
                    asBytes: true
                }));
                for (var aR in aQ) {
                    rng_seed_int(aQ[aR])
                }
            }
            if (!X) {
                X = $("body").data("extra-seed")
            }
            if (X) {
                var aQ = Crypto.util.bytesToWords(Crypto.util.hexToBytes(X));
                for (var aR in aQ) {
                    rng_seed_int(aQ[aR])
                }
            }
        };
        this.generateNewKey = function(aR) {
            h._seed(aR);
            var aQ = new Bitcoin.ECKey(false);
            if (h.addPrivateKey(aQ)) {
                return aQ
            }
        };
        this.setLoadingText = function(aQ) {
            $(".loading-text").text(aQ)
        };

        function L() {
            try {
                $(".popover").remove()
            } catch (aQ) {}
        }
        $(window).resize(function() {
            $(".modal:visible").center();
            L()
        });

        function aL(aR, aQ) {
            aR.click(function() {
                z(aQ.txIndex, aQ.result)
            });
            aR.find(".show-note").mouseover(function() {
                var aS = aQ.note ? aQ.note : b[aQ.hash];
                aG(this, aS, aQ.hash)
            });
            aR.find(".add-note").mouseover(function() {
                m(this, aQ.hash)
            });
            return aR
        }

        function t(aR, aX) {
            var aQ = 0;
            for (var aT = 0; aT < aR.inputs.length; ++aT) {
                var aS = aR.inputs[aT].prev_out;
                if (!aS || !aS.addr) {
                    continue
                }
                var aW = I[aS.addr];
                if (aW) {
                    var aV = parseInt(aS.value);
                    aQ -= aV;
                    if (aX) {
                        Q += aV;
                        aW.balance -= aV
                    }
                }
            }
            for (var aU = 0; aU < aR.out.length; ++aU) {
                var aS = aR.out[aU];
                if (!aS || !aS.addr) {
                    continue
                }
                var aW = I[aS.addr];
                if (aW) {
                    var aV = parseInt(aS.value);
                    aQ += aV;
                    if (aX) {
                        ao += aV;
                        aW.balance += aV
                    }
                }
            }
            return aQ
        }

        function ae() {
            return Crypto.util.bytesToHex(Crypto.SHA256(ag, {
                asBytes: true
            }))
        }

        function y(aQ) {
            aQ.onmessage = function(aX) {
                try {
                    var aU = $.parseJSON(aX.data);
                    if (aU.op == "on_change") {
                        var aY = ae();
                        var aW = aU.checksum;
                        console.log("On change old " + aY + " ==  new " + aW);
                        if (aY != aW) {
                            setTimeout(J, 150)
                        }
                    } else {
                        if (aU.op == "utx") {
                            var aV = TransactionFromJSON(aU.x);
                            for (var a0 in E) {
                                if (E[a0].txIndex == aV.txIndex) {
                                    return
                                }
                            }
                            var a2 = t(aV, true);
                            if (h.getHTML5Notifications()) {
                                h.showNotification({
                                    title: a2 > 0 ? "Payment Received" : "Payment Sent",
                                    body: "Transaction Value " + formatBTC(a2),
                                    iconUrl: resource + "cube48.png"
                                })
                            }
                            aV.result = a2;
                            au += a2;
                            K++;
                            aV.setConfirmations(0);
                            playSound("beep");
                            if (an == 0 && ar == 0) {
                                E.unshift(aV);
                                var aZ = false;
                                if (E.length > 50) {
                                    E.pop();
                                    aZ = true
                                }
                            }
                            var aS = T();
                            if ("my-transactions" == aS) {
                                if (an == 0 && ar == 0) {
                                    $("#no-transactions").hide();
                                    if (s.tx_display == 0) {
                                        var aR = $("#transactions-compact").show();
                                        aL($(C(aV, I, g)), aV).prependTo(aR.find("tbody")).find("div").hide().slideDown("slow");
                                        if (aZ) {
                                            aR.find("tbody tr:last-child").remove()
                                        }
                                    } else {
                                        var aR = $("#transactions-detailed").show();
                                        aR.prepend(aV.getHTML(I, g));
                                        if (aZ) {
                                            aR.find("div:last-child").remove()
                                        }
                                        setupSymbolToggle()
                                    }
                                }
                            } else {
                                c()
                            }
                        } else {
                            if (aU.op == "block") {
                                for (var aT = 0; aT < aU.x.txIndexes.length; ++aT) {
                                    for (var a1 = 0; a1 < E.length; ++a1) {
                                        if (E[a1].txIndex == aU.x.txIndexes[aT]) {
                                            if (E[a1].blockHeight == null || E[a1].blockHeight == 0) {
                                                E[a1].blockHeight = aU.x.height;
                                                break
                                            }
                                        }
                                    }
                                }
                                at(BlockFromJSON(aU.x));
                                U()
                            }
                        }
                    }
                } catch (aX) {
                    console.log(aX);
                    console.log(aX.data)
                }
            };
            aQ.onopen = function() {
                ap("ok");
                var aU = '{"op":"blocks_sub"}';
                if (M != null) {
                    aU += '{"op":"wallet_sub","guid":"' + M + '"}'
                }
                try {
                    var aS = h.getActiveAddresses();
                    for (var aR in aS) {
                        aU += '{"op":"addr_sub", "addr":"' + aS[aR] + '"}'
                    }
                } catch (aT) {
                    alert(aT)
                }
                aQ.send(aU)
            };
            aQ.onclose = function() {
                ap("error")
            }
        }
        var aK = "ok";

        function ap(aR) {
            var aQ = $("#logout");
            if (aR == "loading_start") {
                aQ.attr("src", resource + "logout-orange.png");
                return
            } else {
                if (aR != "loading_stop") {
                    aK = aR
                }
            } if (aK == "ok") {
                aQ.attr("src", resource + "logout.png")
            } else {
                if (aK == "error") {
                    aQ.attr("src", resource + "logout-red.png")
                }
            }
        }
        this.showNotification = function(aQ) {
            try {
                if (window.webkitNotifications && navigator.userAgent.indexOf("Chrome") > -1) {
                    if (webkitNotifications.checkPermission() == 0) {
                        webkitNotifications.createNotification(aQ.iconUrl, aQ.title, aQ.body).show()
                    }
                } else {
                    if (window.Notification) {
                        if (Notification.permissionLevel() == "granted") {
                            new Notification(aQ.title, aQ).show()
                        }
                    }
                }
            } catch (aR) {}
        };
        this.makeNotice = function(aR, aU, aT, aS) {
            if (aT == null || aT.length == 0) {
                return
            }
            console.log(aT);
            if (aS == null) {
                aS = 5000
            }
            var aQ = $('<div class="alert alert-block alert-' + aR + '"></div>');
            aQ.text("" + aT);
            if ($("#" + aU).length > 0) {
                aQ.attr("id", aU);
                return
            }
            $("#notices").append(aQ).hide().fadeIn(200);
            if (aS > 0) {
                (function() {
                    var aV = aQ;
                    setTimeout(function() {
                        aV.fadeOut(250, function() {
                            $(this).remove()
                        })
                    }, aS)
                })()
            }
        };
        this.pkBytesToSipa = function(aQ, aU) {
            var aR = new Bitcoin.ECKey(aQ);
            while (aQ.length < 32) {
                aQ.unshift(0)
            }
            aQ.unshift(128);
            if (aR.getBitcoinAddress().toString() == aU) {} else {
                if (aR.getBitcoinAddressCompressed().toString() == aU) {
                    aQ.push(1)
                } else {
                    throw "Private Key does not match bitcoin address" + aU
                }
            }
            var aS = Crypto.SHA256(Crypto.SHA256(aQ, {
                asBytes: true
            }), {
                asBytes: true
            });
            aQ = aQ.concat(aS.slice(0, 4));
            var aT = B58.encode(aQ);
            return aT
        };

        function aA(aQ) {
            return aQ
        }

        function aq(aQ) {
            return h.decryptPK(aQ)
        }

        function Z(aQ) {
            var aR = h.decodePK(aQ);
            return Crypto.util.bytesToBase64(aR)
        }

        function k(aQ) {
            var aR = h.decodePK(aQ);
            return Crypto.util.bytesToHex(aR)
        }
        this.base58ToSipa = function(aQ, aR) {
            return h.pkBytesToSipa(h.decodePK(aQ), aR)
        };
        this.makeWalletJSON = function(aQ) {
            return h.makeCustomWalletJSON(aQ, M, d)
        };
        this.makeCustomWalletJSON = function(aV, aR, aX) {
            var aU = aA;
            if (aV == "base64") {
                aU = Z
            } else {
                if (aV == "hex") {
                    aU = k
                } else {
                    if (aV == "sipa") {
                        aU = h.base58ToSipa
                    } else {
                        if (aV == "base58") {
                            aU = aq
                        }
                    }
                }
            }
            var aQ = '{\n	"guid" : "' + aR + '",\n	"sharedKey" : "' + aX + '",\n';
            if (F && w != null && aU == aA) {
                aQ += '	"double_encryption" : ' + F + ',\n	"dpasswordhash" : "' + w + '",\n'
            }
            if (s) {
                aQ += '	"options" : ' + JSON.stringify(s) + ",\n"
            }
            aQ += '	"keys" : [\n';
            for (var aT in I) {
                var aW = $.extend({}, I[aT]);
                if (aW.priv != null) {
                    aW.priv = aU(aW.priv, aW.addr)
                }
                for (var aS in aW) {
                    if (aW[aS] === null || aW[aS] === undefined) {
                        delete aW[aS]
                    }
                }
                delete aW.balance;
                aQ += JSON.stringify(aW) + ",\n";
                atLeastOne = true
            }
            if (atLeastOne) {
                aQ = aQ.substring(0, aQ.length - 2)
            }
            aQ += "\n	]";
            if (az(g) > 0) {
                aQ += ',\n	"address_book" : [\n';
                for (var aT in g) {
                    aQ += '	{"addr" : "' + aT + '",\n';
                    aQ += '	 "label" : "' + g[aT] + '"},\n'
                }
                aQ = aQ.substring(0, aQ.length - 2);
                aQ += "\n	]"
            }
            if (az(b) > 0) {
                aQ += ',\n	"tx_notes" : ' + JSON.stringify(b)
            }
            aQ += "\n}";
            return aQ
        };
        this.get_history = function(aR, aQ) {
            BlockchainAPI.get_history(function(aS) {
                H(aS, false);
                c();
                if (aR) {
                    aR()
                }
            }, function() {
                if (aQ) {
                    aQ()
                }
            }, an, ar)
        };
        this.deleteAddressBook = function(aQ) {
            delete g[aQ];
            af();
            $("#send-coins").find(".tab-pane").trigger("show", true)
        };

        function u(aQ) {
            $("#send-coins").find(".tab-pane.active").trigger("show", aQ);
            if (aQ) {
                BlockchainAPI.get_ticker();
                $(".send").prop("disabled", false)
            }
        }

        function l(aQ, aR, aV) {
            var aU = aQ.val();
            aQ.empty();
            for (var aT in I) {
                var aW = I[aT];
                if (!aW || aW.tag == 2) {
                    continue
                }
                var aS = aW.label;
                if (!aS) {
                    aS = aW.addr.substring(0, 15) + "..."
                }
                if (aR || aW.balance > 0) {
                    aQ.prepend('<option value="' + aW.addr + '">' + aS + " - " + formatBTC(aW.balance) + "</option>")
                }
            }
            aQ.prepend('<option value="any" selected>Any Address</option>');
            if (!aV && aU) {
                aQ.val(aU)
            }
        }

        function r(aS, aT) {
            l(aS.find('select[name="from"]'), false, aT);
            l(aS.find('select[name="change"]'), true, aT);
            aS.find('select[name="change"]').prepend('<option value="new">New Address</option>');
            aS.find(".local-symbol").text(symbol_local.symbol);
            aS.find(".btc-symbol").text(symbol_btc.symbol);
            if (aT) {
                aS.find("input").val("");
                aS.find(".send-value-usd").text(formatSymbol(0, symbol_local)).val("");
                aS.find(".amount-needed").text(0)
            }
            var aR = aS.find(".recipient-container");
            if (aT) {
                var aV = aR.find(".recipient:first-child").clone();
                aR.empty().append(aV)
            }

            function aQ() {
                var aW = BigInteger.ZERO;
                aS.find('input[name="send-value"]').each(function() {
                    aW = aW.add(precisionToSatoshiBN($(this).val()))
                });
                return aW
            }

            function aU(aW) {
                aW.find('input[name="send-to-address"]').typeahead({
                    source: aw()
                }).next().click(function() {
                    var aX = $(this).prev();
                    h.scanQRCode(function(aY) {
                        console.log(aY);
                        try {
                            new Bitcoin.Address(aY);
                            aX.val(aY)
                        } catch (aZ) {
                            aE(aY, aW)
                        }
                    }, function(aY) {
                        h.makeNotice("error", "misc-error", aY)
                    })
                });
                aW.find('input[name="send-value"]').unbind().bind("keyup change", function(aX) {
                    if (aX.keyCode == "9") {
                        return
                    }
                    aS.find(".amount-needed").text(formatBTC(aQ().toString()));
                    aW.find(".send-value-usd").val(convert($(this).val() * symbol_btc.conversion, symbol_local.conversion)).text(formatSymbol($(this).val() * symbol_btc.conversion, symbol_local))
                });
                aW.find(".send-value-usd").text(formatSymbol(0, symbol_local)).unbind().bind("keyup change", function(aX) {
                    if (aX.keyCode == "9") {
                        return
                    }
                    aW.find('input[name="send-value"]').val(formatSatoshi(parseFloat($(this).val()) * symbol_local.conversion, sShift(symbol_btc), true))
                })
            }
            aR.find(".recipient").each(function() {
                aU($(this))
            });
            aS.find(".remove-recipient").unbind().click(function() {
                var aW = aR.find(".recipient").length;
                if (aW > 1) {
                    if (aW == 2) {
                        $(this).hide(200)
                    }
                    aR.find(".recipient:last-child").remove()
                }
            });
            aS.find(".add-recipient").unbind().click(function() {
                var aW = aR.find(".recipient:first-child").clone();
                aW.appendTo(aR);
                aU(aW);
                aS.find(".remove-recipient").show(200)
            })
        }
        this.getAllAddresses = function() {
            var aR = [];
            for (var aQ in I) {
                aR.push(aQ)
            }
            return aR
        };
        this.getPreferredAddress = function() {
            var aR = null;
            for (var aQ in I) {
                var aS = I[aQ];
                if (aR == null) {
                    aR = aS
                }
                if (aS.priv != null) {
                    if (aR == null) {
                        aR = aS
                    }
                    if (aS.tag == null || aS.tag == 0) {
                        aR = aS;
                        break
                    }
                }
            }
            return aR.addr
        };

        function aN() {
            var aQ = $("#restore-backup-modal");
            aQ.modal({
                keyboard: true,
                backdrop: "static",
                show: true
            });
            aQ.find(".btn.btn-secondary").unbind().click(function() {
                aQ.modal("hide")
            })
        }
        this.scanQRCode = function(aS, aQ) {
            var aR = $("#qr-code-reader-modal");
            aR.modal({
                keyboard: false,
                backdrop: "static",
                show: true
            });
            loadScript("wallet/qr.code.reader", function() {
                QRCodeReader.init(aR, function(aT) {
                    aR.modal("hide");
                    aS(aT)
                }, function(aT) {
                    aR.modal("hide");
                    aQ(aT)
                })
            }, aQ);
            aR.find(".btn.btn-secondary").unbind().click(function() {
                QRCodeReader.stop();
                aR.modal("hide");
                aQ()
            })
        };
        this.getActiveAddresses = function() {
            var aS = [];
            for (var aQ in I) {
                var aR = I[aQ];
                if (aR.tag != 2) {
                    aS.push(aR.addr)
                }
            }
            return aS
        };
        this.getArchivedAddresses = function() {
            var aS = [];
            for (var aQ in I) {
                var aR = I[aQ];
                if (aR.tag == 2) {
                    aS.push(aR.addr)
                }
            }
            return aS
        };

        function at(aT) {
            if (aT != null) {
                aB = aT;
                for (var aR in E) {
                    var aQ = E[aR];
                    if (aQ.blockHeight != null && aQ.blockHeight > 0) {
                        var aS = aB.height - aQ.blockHeight + 1;
                        if (aS <= 100) {
                            aQ.setConfirmations(aB.height - aQ.blockHeight + 1)
                        } else {
                            aQ.setConfirmations(null)
                        }
                    } else {
                        aQ.setConfirmations(0)
                    }
                }
            }
        }

        function z(aR, aQ) {
            loadScript("wallet/frame-modal", function() {
                showFrameModal({
                    title: "Transaction Summary",
                    description: "",
                    src: root + "tx-summary/" + aR + "?result=" + aQ + "&guid=" + M
                })
            })
        }
        this.deleteNote = function(aQ) {
            delete b[aQ];
            c();
            af()
        };

        function m(aQ, aR) {
            (function(aT, aV) {
                aT = $(aT);
                if (!aT.data("popover")) {
                    aT.popover({
                        title: 'Add Note <span style="float:right"><i class="icon-remove-sign"></i></span>',
                        trigger: "manual",
                        content: '<textarea style="width:97%;height:50px;margin-top:2px" placeholder="Enter the note here..."></textarea><div style="text-align:right"><button class="btn btn-small">Save</button></div>'
                    })
                } else {
                    if (aT.data("popover").tip().is(":visible")) {
                        return
                    }
                }
                aT.popover("show");
                aT.mouseleave(function() {
                    if (!aT.__timeout) {
                        aT.__timeout = setTimeout(function() {
                            aT.popover("hide")
                        }, 250)
                    }
                });

                function aS() {
                    if (aT.__timeout) {
                        clearTimeout(aT.__timeout);
                        aT.__timeout = null
                    }
                }
                var aU = aT.data("popover").tip().mouseenter(aS);
                aU.find("textarea").focus(aS);
                aU.mouseleave(function() {
                    aT.__timeout = setTimeout(function() {
                        aT.popover("hide")
                    }, 250)
                });
                aU.find("i").unbind().click(function() {
                    aT.popover("hide")
                });
                aU.find("button").click(function() {
                    var aW = stripHTML(aU.find("textarea").val()).replace(/'/g, "").replace(/"/g, "");
                    if (aW.length > 0) {
                        b[aV] = aW;
                        af()
                    }
                    c()
                })
            })(aQ, aR)
        }

        function aG(aQ, aR, aS) {
            (function(aT, aU, aW) {
                aT = $(aT);
                if (!aT.data("popover")) {
                    var aX = "Note";
                    if (b[aW]) {
                        aX += ' <span style="float:right"><img src="' + resource + 'delete.png" /></span>'
                    }
                    $(aT).popover({
                        title: aX,
                        trigger: "manual",
                        content: aU
                    })
                } else {
                    if (aT.data("popover").tip().is(":visible")) {
                        return
                    }
                }
                aT.popover("show");
                aT.mouseleave(function() {
                    if (!aT.__timeout) {
                        aT.__timeout = setTimeout(function() {
                            aT.popover("hide")
                        }, 250)
                    }
                });
                var aV = aT.data("popover").tip().mouseenter(function() {
                    if (aT.__timeout) {
                        clearTimeout(aT.__timeout);
                        aT.__timeout = null
                    }
                });
                aV.find("img").unbind().click(function() {
                    h.deleteNote(aW)
                });
                aV.mouseleave(function() {
                    aT.__timeout = setTimeout(function() {
                        aT.popover("hide")
                    }, 250)
                })
            })(aQ, aR, aS)
        }

        function C(aT, aY, aV) {
            var aZ = aT.result;
            var aU = '<tr class="pointer" id="tx-' + aT.txIndex + '"><td class="hidden-phone" style="width:365px"><div><ul style="margin-left:0px;" class="short-addr">';
            var aR = true;
            if (aZ >= 0) {
                for (var aS = 0; aS < aT.inputs.length; ++aS) {
                    var aQ = aT.inputs[aS].prev_out;
                    if (!aQ || !aQ.addr) {
                        aR = false;
                        aU += '<span class="label">Newly Generated Coins</span>'
                    } else {
                        var aW = aY[aQ.addr];
                        if (aW) {
                            continue
                        }
                        aR = false;
                        aU += formatOutput(aQ, aY, aV)
                    }
                }
            } else {
                if (aZ < 0) {
                    for (var aS = 0; aS < aT.out.length; ++aS) {
                        var aQ = aT.out[aS];
                        var aW = aY[aQ.addr];
                        if (aW && aQ.type == 0) {
                            continue
                        }
                        aR = false;
                        aU += formatOutput(aQ, aY, aV)
                    }
                }
            } if (aR) {
                aU += '<span class="label">Moved Between Wallet</info>'
            }
            aU += "</ul></div></td><td><div>";
            var aX = aT.note ? aT.note : b[aT.hash];
            if (aX) {
                aU += '<img src="' + resource + 'note.png" class="show-note"> '
            } else {
                aU += '<img src="' + resource + 'note_grey.png" class="add-note"> '
            } if (aT.time > 0) {
                aU += dateToString(new Date(aT.time * 1000))
            }
            if (aT.confirmations == 0) {
                aU += ' <span class="label label-important hidden-phone">Unconfirmed Transaction!</span> '
            } else {
                if (aT.confirmations > 0) {
                    aU += ' <span class="label label-info hidden-phone">' + aT.confirmations + " Confirmations</span> "
                }
            }
            aU += "</div></td>";
            if (aZ > 0) {
                aU += '<td style="color:green"><div>' + formatMoney(aZ, true) + "</div></td>"
            } else {
                if (aZ < 0) {
                    aU += '<td style="color:red"><div>' + formatMoney(aZ, true) + "</div></td>"
                } else {
                    aU += "<td><div>" + formatMoney(aZ, true) + "</div></td>"
                }
            } if (aT.balance == null) {
                aU += "<td></td></tr>"
            } else {
                aU += '<td class="hidden-phone"><div>' + formatMoney(aT.balance) + "</div></td></tr>"
            }
            return aU
        }

        function T() {
            L();
            if (au == null) {
                $("#balance").html("Loading...")
            } else {
                $("#balance").html(formatSymbol(au, symbol, true));
                $("#balance2").html(formatSymbol(au, (symbol === symbol_local) ? symbol_btc : symbol_local), true)
            }
            return j.attr("id")
        }

        function c(aQ) {
            var aR = T();
            if ("send-coins" == aR) {
                u(aQ)
            } else {
                if ("home-intro" == aR) {
                    f(aQ)
                } else {
                    if ("receive-coins" == aR) {
                        aP(aQ)
                    } else {
                        if ("my-transactions" == aR) {
                            U(aQ)
                        }
                    }
                }
            }
        }

        function f(aQ) {
            $("#summary-n-tx").html(K);
            $("#summary-received").html(formatMoney(ao, true));
            $("#summary-sent").html(formatMoney(Q, true));
            $("#summary-balance").html(formatMoney(au, symbol));
            var aS = h.getPreferredAddress();
            $("#tweet-for-btc").unbind().click(function() {
                window.open("https://twitter.com/share?url=https://blockchain.info/wallet&hashtags=tweet4btc,bitcoin," + aS + "&text=Sign Up For a Free Bitcoin Wallet @ Blockchain.info", "", "toolbar=0, status=0, width=650, height=360")
            });
            $(".paper-wallet-btn").unbind().click(function() {
                loadScript("wallet/paper-wallet", function() {
                    PaperWallet.showModal()
                })
            });
            if (h.isWatchOnly(aS)) {
                $(".no-watch-only").hide()
            } else {
                $(".no-watch-only").show();
                var aR = $("#my-primary-address");
                if (aR.text() != aS) {
                    aR.text(aS);
                    loadScript("wallet/jquery.qrcode", function() {
                        $("#my-primary-addres-qr-code").empty().qrcode({
                            width: 125,
                            height: 125,
                            text: aS
                        })
                    })
                }
            }
        }

        function R() {
            var aQ = $("#export-warning").show();
            var aR = $("#import-export-content").hide();
            $("#show-import-export").unbind().click(function() {
                h.getMainPassword(function() {
                    aQ.hide();
                    loadScript("wallet/import-export", function() {
                        ImportExport.init(aR, function() {
                            aR.show()
                        }, function() {
                            ac($("#home-intro"))
                        })
                    }, function(aS) {
                        h.makeNotice("error", "misc-error", aS);
                        ac($("#home-intro"))
                    })
                }, function() {
                    ac($("#home-intro"))
                })
            })
        }

        function U() {
            var aR = null;
            var aT = 0;
            if (aR != null) {
                clearInterval(aR);
                aR = null
            }
            var aQ;
            if (s.tx_display == 0) {
                $("#transactions-detailed").hide();
                aQ = $("#transactions-compact").show().find("tbody").empty()
            } else {
                $("#transactions-compact").hide();
                aQ = $("#transactions-detailed").empty().show()
            } if (E.length == 0) {
                $("#transactions-detailed, #transactions-compact").hide();
                $("#no-transactions").show();
                return
            } else {
                $("#no-transactions").hide()
            }
            var aS = function() {
                for (var aX = aT; aX < E.length && aX < (aT + 10); ++aX) {
                    var aW = E[aX];
                    if (s.tx_display == 0) {
                        aQ.append(aL($(C(aW, I, g)), aW))
                    } else {
                        aQ.append(aW.getHTML(I, g))
                    }
                }
                aT += 10;
                if (aT < E.length) {
                    aR = setTimeout(aS, 15)
                } else {
                    setupSymbolToggle();
                    L();
                    var aV = $(".pagination ul").empty();
                    if (ar == 0 && E.length < 50) {
                        aV.hide();
                        return
                    } else {
                        aV.show()
                    }
                    var aU = Math.ceil(aO / 50);
                    var aY = " disabled";
                    if (ar > 0) {
                        aY = ""
                    }
                    aV.append($('<li class="prev' + aY + '"><a>&larr; Previous</a></li>').click(function() {
                        h.setPage(ar - 1)
                    }));
                    for (var aX = 0; aX < aU && aX <= 10; ++aX) {
                        (function(aZ) {
                            var a0 = "";
                            if (ar == aZ) {
                                a0 = ' class="active"'
                            }
                            aV.append($("<li" + a0 + '><a class="hidden-phone">' + aZ + "</a></li>").click(function() {
                                h.setPage(aZ)
                            }))
                        })(aX)
                    }
                    var aY = " disabled";
                    if (ar < aU) {
                        aY = ""
                    }
                    aV.append($('<li class="next' + aY + '"><a>Next &rarr;</a></li>').click(function() {
                        h.setPage(ar + 1)
                    }))
                }
            };
            aS()
        }
        this.setPage = function(aQ) {
            ar = aQ;
            scroll(0, 0);
            h.get_history()
        };

        function v() {
            loadScript("wallet/frame-modal", function() {
                showFrameModal({
                    title: "Export History",
                    description: "",
                    src: root + "export-history?active=" + h.getActiveAddresses().join("|") + "&archived=" + h.getArchivedAddresses().join("|")
                })
            })
        }

        function H(aT, aS) {
            if (!aS && aT.mixer_fee) {
                x = aT.mixer_fee
            }
            if (aT.disable_mixer) {
                $("#shared-addresses,#send-shared").hide()
            }
            E.length = 0;
            if (aT.wallet == null) {
                ao = 0;
                Q = 0;
                au = 0;
                K = 0;
                aO = 0;
                return
            }
            ao = aT.wallet.total_received;
            Q = aT.wallet.total_sent;
            au = aT.wallet.final_balance;
            K = aT.wallet.n_tx;
            aO = aT.wallet.n_tx_filtered;
            for (var aR = 0; aR < aT.addresses.length; ++aR) {
                if (I[aT.addresses[aR].address]) {
                    I[aT.addresses[aR].address].balance = aT.addresses[aR].final_balance
                }
            }
            for (var aR = 0; aR < aT.txs.length; ++aR) {
                var aQ = TransactionFromJSON(aT.txs[aR]);
                aQ.result = t(aQ, false);
                E.push(aQ)
            }
            if (aT.info) {
                $("#nodes-connected").html(aT.info.nconnected);
                if (aT.info.latest_block) {
                    at(aT.info.latest_block)
                }
                if (aT.info.symbol_local) {
                    setLocalSymbol(aT.info.symbol_local)
                }
                if (aT.info.symbol_btc) {
                    setBTCSymbol(aT.info.symbol_btc)
                }
            }
        }

        function aE(aR, aQ) {
            loadScript("wallet/jsuri-1.1.1", function() {
                try {
                    var aT = new Uri(aR);
                    var aS = new Bitcoin.Address(aT.host());
                    aQ.find('input[name="send-to-address"]').val(aS.toString());
                    aQ.find('input[name="send-value"]').val(parseFloat(aT.getQueryParamValue("amount")))
                } catch (aU) {
                    h.makeNotice("error", "error", "Invalid Bitcoin Address or URI")
                }
            }, function() {
                h.makeNotice("error", "error", "Invalid Bitcoin Address or URI")
            })
        }

        function aH() {
            S = setTimeout(h.logout, h.getLogoutTime());
            for (var aS in W) {
                W[aS]("did_decrypt")
            }
            MyStore.get("multiaddr", function(aU) {
                if (aU != null) {
                    H($.parseJSON(aU), true);
                    c()
                }
            });
            h.get_history();
            $("#initial_error,#initial_success").remove();
            var aT = decodeURI(window.location.hash.replace("#", ""));
            if (aT.indexOf("bitcoin:") == 0) {
                var aQ = $("#send-coins");
                ac(aQ);
                var aR = aQ.find(".tab-pane.active").find(".recipient").first();
                aE(aT, aR)
            } else {
                ac($("#home-intro"))
            }
            window.location.hash = ""
        }

        function J(aT, aQ) {
            for (var aR in I) {
                var aU = I[aR];
                if (aU.tag == 1) {
                    alert("Warning! wallet data may have changed but cannot sync as you have un-saved keys");
                    return
                }
            }
            console.log("Get wallet with checksum " + av);
            var aS = {
                guid: M,
                sharedKey: d,
                format: "plain"
            };
            if (av && av.length > 0) {
                aS.checksum = av
            }
            $.ajax({
                type: "GET",
                url: root + "wallet/wallet.aes.json",
                data: aS,
                success: function(aV) {
                    if (aV == null || aV.length == 0 || aV == "Not modified") {
                        if (aT) {
                            aT()
                        }
                        return
                    }
                    console.log("Wallet data modified");
                    h.setEncryptedWalletData(aV);
                    if (Y()) {
                        h.get_history();
                        c();
                        if (aT) {
                            aT()
                        }
                    } else {
                        window.location.reload();
                        if (aQ) {
                            aQ()
                        }
                    }
                },
                error: function() {
                    if (aQ) {
                        aQ()
                    }
                }
            })
        }

        function Y() {
            try {
                if (ag == null || ag.length == 0) {
                    h.makeNotice("error", "misc-error", "No Wallet Data To Decrypt");
                    return false
                }
                var aT = null;
                h.decrypt(ag, aD, h.getDefaultPbkdf2Iterations(), function(aU) {
                    try {
                        aT = $.parseJSON(aU);
                        return (aT != null)
                    } catch (aV) {
                        return false
                    }
                });
                if (aT == null) {
                    throw "Error Decrypting Wallet. Please check your password is correct."
                }
                if (aT.double_encryption && aT.dpasswordhash) {
                    F = aT.double_encryption;
                    w = aT.dpasswordhash
                }
                if (aT.options) {
                    $.extend(s, aT.options)
                }
                I = {};
                for (var aR = 0; aR < aT.keys.length; ++aR) {
                    var aQ = aT.keys[aR];
                    if (aQ.addr == null || aQ.addr.length == 0 || aQ.addr == "undefined") {
                        h.makeNotice("error", "null-error", "Your wallet contains an undefined address. This is a sign of possible corruption, please double check all your BTC is accounted for. Backup your wallet to remove this error.", 15000);
                        continue
                    }
                    if (aQ.tag == 1) {
                        aQ.tag = null
                    }
                    I[aQ.addr] = aQ
                }
                g = {};
                if (aT.address_book) {
                    for (var aR = 0; aR < aT.address_book.length; ++aR) {
                        h.addAddressBookEntry(aT.address_book[aR].addr, aT.address_book[aR].label)
                    }
                }
                if (aT.tx_notes) {
                    b = aT.tx_notes
                }
                d = aT.sharedKey;
                if (d == null || d.length == 0 || d.length != 36) {
                    throw "Shared Key is invalid"
                }
                if (av == null || av.length == 0) {
                    av = ae()
                }
                J();
                e();
                return true
            } catch (aS) {
                h.makeNotice("error", "misc-error", aS)
            }
            return false
        }
        this.getPassword = function(aV, aW, aT) {
            if (!aV.is(":visible")) {
                aV.trigger("hidden");
                aV.unbind()
            }
            aV.modal({
                keyboard: false,
                backdrop: "static",
                show: true
            });
            aV.center();
            var aU = aV.find('input[name="password"]');
            var aY = aU,
                aQ = false,
                aX = false;
            aV.find(".vkeyboard li").unbind().click(function() {
                var a1 = $(this),
                    a0 = a1.html();
                if (a1.hasClass("left-shift") || a1.hasClass("right-shift")) {
                    $(".letter").toggleClass("uppercase");
                    $(".symbol span").toggle();
                    aQ = (aQ === true) ? false : true;
                    aX = false;
                    return false
                }
                if (a1.hasClass("capslock")) {
                    $(".letter").toggleClass("uppercase");
                    aX = true;
                    return false
                }
                if (a1.hasClass("delete")) {
                    var aZ = aY.val();
                    aY.val(aZ.substr(0, aZ.length - 1));
                    return false
                }
                if (a1.hasClass("symbol")) {
                    a0 = $("span:visible", a1).html()
                }
                if (a1.hasClass("space")) {
                    a0 = " "
                }
                if (a1.hasClass("tab")) {
                    a0 = "\t"
                }
                if (a1.hasClass("return")) {
                    a0 = "\n"
                }
                if (a1.hasClass("uppercase")) {
                    a0 = a0.toUpperCase()
                }
                if (aQ === true) {
                    $(".symbol span").toggle();
                    if (aX === false) {
                        $(".letter").toggleClass("uppercase")
                    }
                    aQ = false
                }
                aY.val(aY.val() + a0)
            });
            aU.keypress(function(aZ) {
                if (aZ.keyCode == 13) {
                    aZ.preventDefault();
                    aV.find(".btn.btn-primary").click()
                }
            });
            aU.val("");
            var aR = aV.find(".btn.btn-primary");
            aR.click(function() {
                if (aW) {
                    aT = null;
                    var aZ = aW;
                    aW = null;
                    setTimeout(function() {
                        aV.modal("hide");
                        aZ(aU.val())
                    }, 10)
                } else {
                    aV.modal("hide")
                }
            });
            var aS = aV.find(".btn.btn-secondary");
            aS.click(function() {
                if (aT) {
                    var aZ = aT;
                    aT = null;
                    aW = null;
                    setTimeout(function() {
                        aV.modal("hide");
                        try {
                            aZ()
                        } catch (a0) {
                            h.makeNotice("error", "misc-error", a0)
                        }
                    }, 10)
                } else {
                    aV.modal("hide")
                }
            });
            aV.on("hidden", function() {
                aU.unbind();
                aS.unbind();
                aR.unbind();
                aV.unbind();
                if (aT) {
                    var aZ = aT;
                    aT = null;
                    aW = null;
                    setTimeout(function() {
                        try {
                            aZ()
                        } catch (a0) {
                            h.makeNotice("error", "misc-error", a0)
                        }
                    }, 10)
                }
            })
        };
        this.makePairingQRCode = function(aR, aQ) {
            h.getMainPassword(function() {
                loadScript("wallet/jquery.qrcode", function() {
                    try {
                        if (aQ == 1) {
                            h.securePost("wallet", {
                                method: "pairing-encryption-password"
                            }, function(aT) {
                                aR($("<div></div>").qrcode({
                                    width: 300,
                                    height: 300,
                                    text: "1|" + M + "|" + h.encrypt(d + "|" + Crypto.util.bytesToHex(UTF8.stringToBytes(aD)), aT, ad)
                                }))
                            }, function(aT) {
                                h.makeNotice("error", "misc-error", aT)
                            })
                        } else {
                            if (aQ == 0) {
                                aR($("<div></div>").qrcode({
                                    width: 300,
                                    height: 300,
                                    text: M + "|" + d + "|" + aD
                                }))
                            }
                        }
                    } catch (aS) {
                        h.makeNotice("error", "misc-error", aS)
                    }
                })
            }, function() {
                h.logout()
            })
        };
        this.getMainPassword = function(aR, aQ) {
            if (B > new Date().getTime() - N) {
                return aR(aD)
            }
            h.getPassword($("#main-password-modal"), function(aS) {
                if (aD == aS) {
                    B = new Date().getTime();
                    if (aR) {
                        try {
                            aR(aD)
                        } catch (aT) {
                            h.makeNotice("error", "misc-error", aT)
                        }
                    }
                } else {
                    h.makeNotice("error", "misc-error", "Password incorrect.");
                    if (aQ) {
                        try {
                            aQ()
                        } catch (aT) {
                            h.makeNotice("error", "misc-error", aT)
                        }
                    }
                }
            }, aQ)
        };
        this.getSecondPassword = function(aS, aQ) {
            if (!F || ai != null) {
                if (aS) {
                    try {
                        aS(ai)
                    } catch (aR) {
                        h.makeNotice("error", "misc-error", aR)
                    }
                }
                return
            }
            h.getPassword($("#second-password-modal"), function(aT) {
                try {
                    if (aF(aT)) {
                        if (aS) {
                            try {
                                aS(aT)
                            } catch (aU) {
                                console.log(aU);
                                h.makeNotice("error", "misc-error", aU)
                            }
                        }
                    } else {
                        h.makeNotice("error", "misc-error", "Password incorrect.");
                        if (aQ) {
                            try {
                                aQ()
                            } catch (aU) {
                                h.makeNotice("error", "misc-error", aU)
                            }
                        }
                    }
                } catch (aU) {
                    if (aQ) {
                        try {
                            aQ()
                        } catch (aU) {
                            h.makeNotice("error", "misc-error", aU)
                        }
                    }
                }
            }, aQ)
        };

        function a() {
            if (A) {
                return
            }
            var aQ = $("#restore-password");
            aD = aQ.val();
            aQ.val("");
            B = new Date().getTime();
            if (ag == null || ag.length == 0) {
                h.setLoadingText("Validating Authentication key");
                var aR = $.trim($(".auth-" + q).find(".code").val());
                if (aR.length == 0 || aR.length > 255) {
                    h.makeNotice("error", "misc-error", "You must enter a Two Factor Authentication code");
                    return false
                }
                $.ajax({
                    type: "POST",
                    url: root + "wallet",
                    data: {
                        guid: M,
                        payload: aR,
                        length: aR.length,
                        method: "get-wallet",
                        format: "plain"
                    },
                    success: function(aS) {
                        try {
                            if (aS == null || aS.length == 0) {
                                h.makeNotice("error", "misc-error", "Server Return Empty Wallet Data");
                                return
                            }
                            h.setEncryptedWalletData(aS);
                            $(".auth-" + q).hide();
                            $(".auth-0").show();
                            if (Y()) {
                                n();
                                aH()
                            }
                        } catch (aT) {
                            h.makeNotice("error", "misc-error", aT)
                        }
                    },
                    error: function(aS) {
                        h.makeNotice("error", "misc-error", aS.responseText)
                    }
                })
            } else {
                if (Y()) {
                    n();
                    aH()
                }
            }
            return true
        }

        function O() {
            $("#not-synced-warning-modal").modal("show").find(".btn.btn-danger").unbind().click(function() {
                $(this).modal("hide");
                am = true;
                c()
            })
        }

        function e() {
            ap("error");
            webSocketConnect(y);
            A = true;
            $("#tech-faq").hide();
            $("#intro-text").hide();
            $("#large-summary").show()
        }
        this.quickSendNoUI = function(aS, aR, aQ) {
            loadScript("wallet/signer", function() {
                h.getSecondPassword(function() {
                    try {
                        var aU = initNewTx();
                        aU.from_addresses = h.getActiveAddresses();
                        aU.to_addresses.push({
                            address: new Bitcoin.Address(aS),
                            value: Bitcoin.Util.parseValue(aR)
                        });
                        aU.addListener(aQ);
                        aU.start()
                    } catch (aT) {
                        aQ.on_error(aT)
                    }
                }, function(aT) {
                    aQ.on_error(aT)
                })
            })
        };

        function G() {
            h.setLoadingText("Sending email backup");
            $.ajax({
                type: "POST",
                url: root + "wallet",
                data: {
                    guid: M,
                    sharedKey: d,
                    method: "email-backup",
                    format: "plain"
                },
                success: function(aQ) {
                    h.makeNotice("success", "backup-success", aQ)
                },
                error: function(aQ) {
                    h.makeNotice("error", "misc-error", aQ.responseText)
                }
            })
        }

        function af(aT, aS, aR, aQ) {
            if (ak) {
                clearInterval(ak);
                ak = null
            }
            ak = setTimeout(function() {
                h.backupWallet(aT, aS, aR, aQ)
            }, 3000)
        }
        this.backupWallet = function(aX, aW, aQ) {
            if (ak) {
                clearInterval(ak);
                ak = null
            }
            try {
                if (aX == null) {
                    aX = "update"
                }
                if (az(I) == 0) {
                    return
                }
                var aS = h.makeWalletJSON();
                var aV = h.encrypt(aS, aD, ad);
                if (aV.length == 0) {
                    throw "Error encrypting the JSON output"
                }
                var aU = null;
                h.decrypt(aV, aD, h.getDefaultPbkdf2Iterations(), function(aY) {
                    try {
                        aU = $.parseJSON(aY);
                        return (aU != null)
                    } catch (aZ) {
                        return false
                    }
                });
                if (aU == null) {
                    throw "Error Decrypting Previously encrypted JSON. Not Saving Wallet."
                }
                var aR = av;
                h.setLoadingText("Saving wallet");
                h.setEncryptedWalletData(aV);
                $.ajax({
                    type: "POST",
                    url: root + "wallet",
                    data: {
                        guid: M,
                        length: aV.length,
                        payload: aV,
                        sharedKey: d,
                        checksum: av,
                        old_checksum: aR,
                        method: aX
                    },
                    converters: {
                        "* text": window.String,
                        "text html": true,
                        "text json": window.String,
                        "text xml": window.String
                    },
                    success: function(aZ) {
                        var a1 = false;
                        for (var aY in I) {
                            var a0 = I[aY];
                            if (a0.tag == 1) {
                                a0.tag = null;
                                a1 = true
                            }
                        }
                        h.makeNotice("success", "misc-success", aZ);
                        c();
                        if (aW != null) {
                            aW()
                        }
                    },
                    error: function(aZ) {
                        for (var aY in I) {
                            var a0 = I[aY];
                            if (a0.tag == 1) {
                                O();
                                break
                            }
                        }
                        if (aZ.responseText == null) {
                            h.makeNotice("error", "misc-error", "Error Saving Wallet", 10000)
                        } else {
                            h.makeNotice("error", "misc-error", aZ.responseText, 10000)
                        }
                        c();
                        if (aQ != null) {
                            aQ()
                        }
                    }
                })
            } catch (aT) {
                h.makeNotice("error", "misc-error", "Error Saving Wallet: " + aT, 10000);
                c();
                if (aQ != null) {
                    aQ(aT)
                } else {
                    throw aT
                }
            }
        };

        function aI(aQ) {
            if (F) {
                if (ai == null) {
                    throw "Cannot encrypt private key without a password"
                }
                return h.encrypt(aQ, d + ai, s.pbkdf2_iterations)
            } else {
                return aQ
            }
            return null
        }
        this.isBase58 = function(aS, aR) {
            for (var aQ = 0; aQ < aS.length; ++aQ) {
                if (aS[aQ] < 0 || aS[aQ] > 58) {
                    return false
                }
            }
            return true
        };
        this.encrypt = function(aS, aR, aQ) {
            return Crypto.AES.encrypt(aS, aR, {
                mode: new Crypto.mode.CBC(Crypto.pad.iso10126),
                iterations: aQ
            })
        };
        this.decrypt = function(aU, aT, aR, aW, aS) {
            try {
                var aQ = Crypto.AES.decrypt(aU, aT, {
                    mode: new Crypto.mode.CBC(Crypto.pad.iso10126),
                    iterations: aR
                });
                if (aQ != null && aQ.length > 0) {
                    if (aW(aQ)) {
                        return aQ
                    }
                }
            } catch (aV) {
                console.log(aV)
            }
            if (aR != 10) {
                try {
                    var aQ = Crypto.AES.decrypt(aU, aT, {
                        mode: new Crypto.mode.CBC(Crypto.pad.iso10126),
                        iterations: 10
                    });
                    if (aQ != null && aQ.length > 0) {
                        if (aW(aQ)) {
                            return aQ
                        }
                    }
                } catch (aV) {
                    console.log(aV)
                }
            }
            try {
                var aQ = Crypto.AES.decrypt(aU, aT);
                if (aQ != null && aQ.length > 0) {
                    if (aW(aQ)) {
                        return aQ
                    }
                }
            } catch (aV) {
                console.log(aV)
            }
            try {
                var aQ = Crypto.AES.decrypt(aU, aT, {
                    mode: new Crypto.mode.OFB(Crypto.pad.iso7816),
                    iterations: 1
                });
                if (aQ != null && aQ.length > 0) {
                    if (aW(aQ)) {
                        return aQ
                    }
                }
            } catch (aV) {
                console.log(aV)
            }
            try {
                var aQ = Crypto.AES.decrypt(aU, aT, {
                    mode: new Crypto.mode.CBC(Crypto.pad.iso10126),
                    iterations: 1
                });
                if (aQ != null && aQ.length > 0) {
                    if (aW(aQ)) {
                        return aQ
                    }
                }
            } catch (aV) {
                console.log(aV)
            }
            if (aS != null) {
                aS()
            }
            return null
        };
        this.setGUID = function(aS, aQ) {
            console.log("Set GUID " + aS);
            if (A) {
                throw "Cannot Set GUID Once Initialized"
            }
            h.setLoadingText("Changing Wallet Identifier");
            $("#initial_error,#initial_success").remove();
            var aR = $("#restore-wallet-continue");
            aR.prop("disabled", true);
            $.ajax({
                type: "GET",
                dataType: "json",
                url: root + "wallet/" + aS,
                data: {
                    format: "json",
                    resend_code: aQ
                },
                success: function(aT) {
                    aR.prop("disabled", false);
                    $(".auth-" + q).hide();
                    X = aT.extra_seed;
                    M = aT.guid;
                    q = aT.auth_type;
                    aJ = aT.real_auth_type;
                    if (aT.language) {
                        V = aT.language
                    }
                    h.setEncryptedWalletData(aT.payload);
                    war_checksum = aT.war_checksum;
                    setLocalSymbol(aT.symbol_local);
                    $("#restore-guid").val(M);
                    $(".auth-" + q).show();
                    $(".recover-wallet-btn").prop("disabled", false).click(function() {
                        window.location = root + "wallet/forgot-password?guid=" + M
                    });
                    $("#reset-two-factor-btn").prop("disabled", false).show().click(function() {
                        window.location = root + "wallet/reset-two-factor?guid=" + M
                    });
                    if (aT.initial_error) {
                        h.makeNotice("error", "misc-error", aT.initial_error)
                    }
                    if (aT.initial_success) {
                        h.makeNotice("success", "misc-success", aT.initial_success)
                    }
                    MyStore.get("guid", function(aU) {
                        if (aU != M) {
                            MyStore.clear();
                            if (M != D) {
                                MyStore.put("guid", M)
                            }
                        }
                    })
                },
                error: function(aT) {
                    console.log("Set GUID Success");
                    aR.prop("disabled", false);
                    MyStore.get("guid", function(aU) {
                        if (aU == aS && ag) {
                            h.makeNotice("error", "misc-error", "Error Contacting Server. Using Local Wallet Cache.");
                            M = aU;
                            av = ae();
                            q = 0;
                            $("#restore-guid").val(M);
                            $(".auth-" + q).show();
                            return
                        }
                        try {
                            var aW = $.parseJSON(aV.responseText);
                            if (aW.initial_error) {
                                h.makeNotice("error", "misc-error", aW.initial_error);
                                return
                            }
                        } catch (aV) {}
                        if (aV.responseText) {
                            h.makeNotice("error", "misc-error", aV.responseText)
                        } else {
                            h.makeNotice("error", "misc-error", "Error changing wallet identifier")
                        }
                    })
                }
            })
        };

        function i(aQ) {
            var aR = B58.encode(aQ);
            return aI(aR)
        }
        this.decryptPK = function(aQ) {
            if (F) {
                if (ai == null) {
                    throw "Cannot decrypt private key without a password"
                }
                return h.decrypt(aQ, d + ai, s.pbkdf2_iterations, h.isBase58)
            } else {
                return aQ
            }
            return null
        };
        this.decodePK = function(aR) {
            if (!aR) {
                throw "null PK passed to decodePK"
            }
            var aQ = h.decryptPK(aR);
            if (aQ != null) {
                return B58.decode(aQ)
            }
            return null
        };
        this.signmessage = function(aQ, aS) {
            var aU = I[aQ];
            if (!aU.priv) {
                throw "Cannot sign a watch only address"
            }
            var aT = h.decodePK(aU.priv);
            var aR = new Bitcoin.ECKey(aT);
            return Bitcoin.Message.signMessage(aR, aS, aU.addr)
        };

        function aF(aR) {
            var aQ = Crypto.SHA256(d + aR, {
                asBytes: true
            });
            var aU = ab(aQ, s.pbkdf2_iterations - 1);
            if (aU == w) {
                ai = aR;
                return true
            }
            if (s.pbkdf2_iterations != 10) {
                var aS = ab(aQ, 10 - 1);
                if (aS == w) {
                    ai = aR;
                    w = aU;
                    return true
                }
            }
            if (Crypto.util.bytesToHex(aQ) == w) {
                ai = aR;
                w = aU;
                return true
            }
            var aT = Crypto.SHA256(aR);
            if (aT == w) {
                ai = aR;
                w = aU;
                return true
            }
            return false
        }
        this.runCompressedCheck = function() {
            var aQ = [];
            var aS = {};
            for (var aT in I) {
                var aX = I[aT];
                if (aX.priv != null) {
                    var aW = h.decodePK(aX.priv);
                    var aU = new Bitcoin.ECKey(aW);
                    var aR = aU.getBitcoinAddress().toString();
                    var aV = aU.getBitcoinAddressCompressed().toString();
                    if (aX.addr != aR) {
                        aS[aR] = aX.priv;
                        aQ.push(aR)
                    }
                    if (aX.addr != aV) {
                        aS[aV] = aX.priv;
                        aQ.push(aV)
                    }
                }
            }
            if (aQ.length == 0) {
                alert("to_check length == 0")
            }
            BlockchainAPI.get_balances(aQ, function(aZ) {
                var a0 = 0;
                for (var aY in aZ) {
                    var a1 = aZ[aY].final_balance;
                    if (a1 > 0) {
                        alert(formatBTC(a1) + " claimable in address " + aY + " (Import PK : " + h.base58ToSipa(aS[aY], aY) + ")")
                    }
                    a0 += a1
                }
                alert(formatBTC(a1) + " found in compressed addresses")
            })
        };
        this.checkAllKeys = function(aQ) {
            for (var aR in I) {
                var aV = I[aR];
                if (aV.addr == null) {
                    throw "Null Address Found in wallet " + aR
                }
                if (aV.addr.toString() == null) {
                    throw "Error decoding wallet address " + aV.addr
                }
                if (aV.priv != null) {
                    var aU = h.decodePK(aV.priv);
                    var aT = new Bitcoin.ECKey(aU);
                    var aS = aT.getBitcoinAddress().toString();
                    if (aS != aV.addr && aT.getBitcoinAddressCompressed().toString() != aV.addr) {
                        throw "Private key does not match bitcoin address " + aV.addr + " != " + aS
                    }
                    if (aQ) {
                        aV.priv = i(aU)
                    }
                }
            }
            h.makeNotice("success", "wallet-success", "Wallet verified.")
        };
        this.setMainPassword = function(aQ) {
            h.getMainPassword(function() {
                aD = aQ;
                h.backupWallet("update", function() {
                    h.logout()
                }, function() {
                    h.logout()
                })
            })
        };

        function ac(aQ) {
            if (aQ === j) {
                return
            }
            if (j != null) {
                if ($("#" + j.attr("id") + "-btn").length > 0) {
                    $("#" + j.attr("id") + "-btn").parent().attr("class", "")
                }
                j.hide()
            }
            j = aQ;
            j.show();
            if ($("#" + j.attr("id") + "-btn").length > 0) {
                $("#" + j.attr("id") + "-btn").parent().attr("class", "active")
            }
            c(true)
        }

        function az(aS) {
            var aR = 0,
                aQ;
            for (aQ in aS) {
                aR++
            }
            return aR
        }

        function aa(aQ) {
            I[aQ].priv = null
        }

        function ah() {
            if (az(I) >= ax) {
                h.makeNotice("error", "misc-error", "We currently support a maximum of " + ax + " private keys, please remove some unused ones.");
                return true
            }
            return false
        }

        function aM(aS, aQ) {
            var aR = I[aS];
            if (!aR || aR.length == 0) {
                I[aS] = {
                    addr: aS,
                    priv: aQ,
                    balance: 0
                };
                return true
            } else {
                if (!aR.priv && aQ) {
                    aR.priv = aQ;
                    return true
                }
            }
            return false
        }

        function o() {
            var aS = $("#add-address-book-entry-modal");
            aS.modal({
                keyboard: true,
                backdrop: "static",
                show: true
            });
            var aQ = aS.find('input[name="label"]');
            var aR = aS.find('input[name="address"]');
            aQ.val("");
            aR.val("");
            aS.find(".btn.btn-primary").unbind().click(function() {
                aS.modal("hide");
                var aU = stripHTML(aQ.val());
                var aT = stripHTML(aR.val());
                if (aU.length == 0 || aT.length == 0) {
                    h.makeNotice("error", "misc-error", "You must enter an address and label for the address book entry");
                    return false
                }
                var aW;
                try {
                    aW = new Bitcoin.Address(aT);
                    if (aW == null) {
                        throw "Null address"
                    }
                } catch (aV) {
                    h.makeNotice("error", "misc-error", "Bitcoin address invalid, please make sure you entered it correctly");
                    return false
                }
                if (g[aT] != null) {
                    h.makeNotice("error", "misc-error", "Bitcoin address already exists");
                    return false
                }
                h.makeNotice("success", "misc-success", "Added Address book entry");
                h.addAddressBookEntry(aT, aU);
                af();
                $("#send-coins").find(".tab-pane").trigger("show", true)
            });
            aS.find(".btn.btn-secondary").unbind().click(function() {
                aS.modal("hide")
            })
        }
        this.logout = function() {
            if (S) {
                clearTimeout(S)
            }
            if (M == D) {
                window.location = root + "wallet/logout"
            } else {
                $.ajax({
                    type: "GET",
                    url: root + "wallet/logout",
                    data: {
                        format: "plain"
                    },
                    success: function(aQ) {
                        window.location.reload()
                    },
                    error: function() {
                        window.location.reload()
                    }
                })
            }
        };

        function al(aW) {
            var aY = $("#delete-address-modal");
            aY.modal({
                keyboard: true,
                backdrop: "static",
                show: true
            });
            aY.find(".btn.btn-primary").hide();
            aY.find(".btn.btn-danger").hide();
            $("#change-mind").hide();
            aY.find("#to-delete-address").html(aW.join(" "));
            aY.find("#delete-balance").empty();
            var aS = aY.find("#delete-balance");
            var aQ = [];
            for (var aV in aW) {
                var aX = aW[aV];
                if (I[aX] && I[aX].priv) {
                    aQ.push(aW[aV])
                }
            }
            BlockchainAPI.get_balance(aQ, function(aZ) {
                aY.find(".btn.btn-primary").show(200);
                aY.find(".btn.btn-danger").show(200);
                aS.html("Balance " + formatBTC(aZ));
                if (aZ > 0) {
                    aS.css("color", "red")
                } else {
                    aS.css("color", "black")
                }
            }, function() {
                aY.find(".btn.btn-primary").show(200);
                aY.find(".btn.btn-danger").show(200);
                aS.text("Error Fetching Balance")
            });
            var aT = false;
            var aV = 0;
            var aR = null;
            var aU = 10;
            changeMind = function() {
                $("#change-mind").show();
                $("#change-mind-time").text(aU - aV)
            };
            aY.find(".btn.btn-primary").unbind().click(function() {
                changeMind();
                aY.find(".btn.btn-primary").hide();
                aY.find(".btn.btn-danger").hide();
                aR = setInterval(function() {
                    if (aT) {
                        return
                    }++aV;
                    changeMind();
                    if (aV == aU) {
                        $("#delete-address-modal").modal("hide");
                        h.makeNotice("warning", "warning-deleted", "Private Key Removed From Wallet");
                        for (var aZ in aW) {
                            aa(aW[aZ])
                        }
                        c();
                        h.backupWallet();
                        clearInterval(aR)
                    }
                }, 1000)
            });
            aY.find(".btn.btn-danger").unbind().click(function() {
                changeMind();
                aY.find(".btn.btn-primary").hide();
                aY.find(".btn.btn-danger").hide();
                aR = setInterval(function() {
                    if (aT) {
                        return
                    }++aV;
                    changeMind();
                    if (aV == aU) {
                        try {
                            $("#delete-address-modal").modal("hide");
                            h.makeNotice("warning", "warning-deleted", "Address & Private Key Removed From Wallet");
                            for (var aZ in aW) {
                                h.deleteAddress(aW[aZ])
                            }
                            c();
                            h.backupWallet("update", function() {
                                h.get_history()
                            })
                        } finally {
                            clearInterval(aR)
                        }
                    }
                }, 1000)
            });
            aY.unbind().on("hidden", function() {
                if (aR) {
                    aT = true;
                    clearInterval(aR);
                    aR = null
                }
            });
            aY.find(".btn.btn-secondary").unbind().click(function() {
                aY.modal("hide")
            })
        }

        function aw() {
            var aS = [];
            for (var aQ in g) {
                aS.push(g[aQ])
            }
            for (var aQ in I) {
                var aR = I[aQ];
                if (aR.tag != 2 && aR.label) {
                    aS.push(aR.label)
                }
            }
            return aS
        }

        function P(aQ) {
            h.getSecondPassword(function() {
                var aS = $("#sweep-address-modal");
                aS.modal("show");
                BlockchainAPI.get_balance(aQ, function(aT) {
                    aS.find(".balance").text("Amount: " + formatBTC(aT))
                }, function() {
                    aS.find(".balance").text("Error Fetching Balance")
                });
                var aR = aS.find('select[name="change"]');
                l(aR, true);
                aS.find(".btn.btn-primary").unbind().click(function() {
                    loadScript("wallet/signer", function() {
                        BlockchainAPI.get_balance(aQ, function(aT) {
                            var aU = initNewTx();
                            aU.fee = aU.base_fee;
                            aU.to_addresses.push({
                                address: new Bitcoin.Address($.trim(aR.val())),
                                value: BigInteger.valueOf(aT).subtract(aU.fee)
                            });
                            aU.from_addresses = aQ;
                            aU.start()
                        }, function() {
                            h.makeNotice("error", "misc-error", "Error Getting Address Balance")
                        })
                    });
                    aS.modal("hide")
                });
                aS.find(".btn.btn-secondary").unbind().click(function() {
                    aS.modal("hide")
                })
            })
        }

        function ay() {
            try {
                $(".pop").popover({
                    offset: 10,
                    placement: "bottom"
                })
            } catch (aQ) {}
        }

        function n() {
            $("#add-address-book-entry-btn").click(function() {
                o()
            });
            $("#home-intro-btn").click(function() {
                ac($("#home-intro"))
            });
            $("#my-transactions-btn").click(function() {
                ac($("#my-transactions"))
            });
            $("#send-coins-btn").click(function() {
                ac($("#send-coins"))
            });
            $("#import-export-btn").click(function() {
                ac($("#import-export"));
                R()
            });
            $("#chord-diagram").click(function() {
                window.open(root + "taint/" + h.getActiveAddresses().join("|"), null, "width=850,height=850")
            });
            $("#verify-message").click(function() {
                loadScript("wallet/address_modal", function() {
                    verifyMessageModal()
                })
            });
            $("#generate-cold-storage").click(function() {
                loadScript("wallet/paper-wallet", function() {
                    PaperWallet.showColdStorageModal()
                }, null, true)
            });
            $("#group-received").click(function() {
                loadScript("wallet/taint_grouping", function() {
                    try {
                        loadTaintData()
                    } catch (aQ) {
                        h.makeNotice("error", "misc-error", "Unable To Load Taint Grouping Data")
                    }
                })
            });
            $("#my-account-btn").click(function() {
                ac($("#my-account"));
                var aQ = $("#account-settings-warning").show();
                var aR = $("#my-account-content").hide();
                $("#show-account-settings").unbind().click(function() {
                    h.getMainPassword(function() {
                        aQ.hide();
                        loadScript("wallet/account", function() {
                            AccountSettings.init(aR, function() {
                                aR.show()
                            }, function() {
                                ac($("#home-intro"))
                            })
                        }, function(aS) {
                            h.makeNotice("error", "misc-error", aS);
                            ac($("#home-intro"))
                        })
                    }, function() {
                        ac($("#home-intro"))
                    })
                })
            });
            $("#enable_archived_checkbox").change(function() {
                var aQ = $(this).is(":checked");
                $(".archived_checkbox").prop("checked", false);
                $(".archived_checkbox").prop("disabled", !aQ);
                $("#archived-sweep").prop("disabled", !aQ);
                $("#archived-delete").prop("disabled", !aQ)
            });
            $("#shared-addresses").on("show", function() {
                var aQ = $(this);
                loadScript("wallet/shared-addresses", function() {
                    buildSharedTable(aQ)
                })
            });
            $("#active-addresses").on("show", function() {
                var aW = $(this).find("table:first");
                aW.find("tbody:gt(0)").remove();
                var aT = aW.find("tbody").empty();
                for (var aV in I) {
                    var aX = I[aV];
                    if (aX.tag == 2 || (aX.tag == 1 && !am)) {
                        continue
                    }
                    var aU = "";
                    if (aX.tag == 1) {
                        aU = ' <font color="red" class="pop" title="Not Synced" data-content="This is a new address which has not yet been synced with our the server. Do not used this address yet.">(Not Synced)</font>'
                    } else {
                        if (aX.priv == null) {
                            aU = ' <font color="red" class="pop" title="Watch Only" data-content="Watch Only means there is no private key associated with this bitcoin address. <br /><br /> Unless you have the private key stored elsewhere you do not own the funds at this address and can only observe the transactions.">(Watch Only)</font>'
                        }
                    }
                    var aQ = "";
                    var aS = aX.addr;
                    if (aX.label != null) {
                        aS = aX.label;
                        aQ = '<span class="hidden-phone"> - ' + aX.addr + "</span>"
                    }
                    var aR = $('<tr><td><div class="short-addr"><a href="' + root + "address/" + aX.addr + '" target="new">' + aS + "</a>" + aQ + " " + aU + '<div></td><td><span style="color:green">' + formatMoney(aX.balance, true) + '</span></td>            <td><div class="btn-group pull-right"><a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#"><span class="hidden-phone">Actions </span><span class="caret"></span></a><ul class="dropdown-menu">             <li><a href="#" class="pop act-archive" title="Archive Address" data-content="Click this button to hide the address from the main view. You can restore or delete later by finding it in the Archived addresses tab.">Archive Address</a></li>            <li><a href="#" class="pop act-label" title="Label Address" data-content="Set the label for this address.">Label Address</a></li>            <li><a href="#" class="pop act-qr" title="Show QR Code" data-content="Show a QR Code for this address.">QR Code</a></li>            <li><a href="#" class="pop act-sign" title="Sign Message" data-content="Sign A message with this address.">Sign Message</a></li>            <li><a href="#" class="pop act-request" title="Request Payment" data-content="Click here to create a new QR Code payment request. The QR Code can be scanned using most popular bitcoin software and mobile apps.">Create Payment Request</a></li>            <li><a href="#" class="pop act-pubkey">Show Public Key</a></li>            </ul></div></td></tr>');
                    (function(aY) {
                        aR.find(".act-archive").click(function() {
                            h.archiveAddr(aY)
                        });
                        aR.find(".act-label").click(function() {
                            loadScript("wallet/address_modal", function() {
                                showLabelAddressModal(aY)
                            })
                        });
                        aR.find(".act-qr").click(function() {
                            loadScript("wallet/address_modal", function() {
                                showAddressModalQRCode(aY)
                            })
                        });
                        aR.find(".act-pubkey").click(function() {
                            h.getSecondPassword(function() {
                                var aZ = h.getPrivateKey(aY);
                                if (aZ == null) {
                                    h.makeNotice("eror", "misc-error", "Public Key Unknown");
                                    return
                                }
                                var a0 = new Bitcoin.ECKey(h.decodePK(aZ));
                                if (a0.getBitcoinAddressCompressed().toString() == aY) {
                                    var a1 = a0.getPubCompressed()
                                } else {
                                    var a1 = a0.getPub()
                                }
                                h.makeNotice("success", "pub-key", "Public Key of " + aY + " is " + Crypto.util.bytesToHex(a1), 20000)
                            })
                        });
                        aR.find(".act-sign").click(function() {
                            loadScript("wallet/address_modal", function() {
                                showAddressModalSignMessage(aY)
                            })
                        });
                        aR.find(".act-request").click(function() {
                            loadScript("wallet/frame-modal", function() {
                                showFrameModal({
                                    title: "Create Payment Request",
                                    description: "Request Payment into address <b>" + aY + "</b>",
                                    src: root + "payment_request?address=" + aY
                                })
                            })
                        })
                    })(aX.addr);
                    if (aX.balance > 0 && aX.priv) {
                        aW.prepend(aR)
                    } else {
                        aW.append(aR)
                    }
                }
                ay()
            });
            $("#archived-addresses").on("show", function() {
                $("#enable_archived_checkbox").prop("checked", false);
                $("#archived-delete").prop("disabled", true);
                $("#archived-sweep").prop("disabled", true);
                $("#archived-addr tbody").empty();
                var aR = $(this).find("tbody");
                var aQ = h.getArchivedAddresses();
                var aS = function() {
                    aR.empty();
                    for (var aW in aQ) {
                        var aY = I[aQ[aW]];
                        if (aY.tag != 2 || (aY.tag == 1 && !am)) {
                            continue
                        }
                        var aV = "";
                        if (aY.priv == null) {
                            aV = ' <font color="red">(Watch Only)</font>'
                        }
                        var aT = "";
                        var aU = aY.addr;
                        if (aY.label != null) {
                            aU = aY.label;
                            aT = '<span class="hidden-phone"> - ' + aY.addr + "</span>"
                        }
                        var aX = $('<tr><td style="width:20px;"><input type="checkbox" class="archived_checkbox" value="' + aY.addr + '" disabled></td><td><div class="short-addr"><a href="' + root + "address/" + aY.addr + '" target="new">' + aU + "</a>" + aT + " " + aV + '<div></td><td><span style="color:green">' + formatBTC(aY.balance) + '</span></td><td style="width:16px"><img src="' + resource + 'unarchive.png" class="act-unarchive" /></td></tr>');
                        (function(aZ) {
                            aX.find(".act-unarchive").click(function() {
                                h.unArchiveAddr(aZ)
                            })
                        })(aY.addr);
                        if (aY.balance > 0 && aY.priv) {
                            aR.prepend(aX)
                        } else {
                            aR.append(aX)
                        }
                    }
                };
                aS();
                BlockchainAPI.get_balances(aQ, function(aT) {
                    aS()
                }, function(aT) {
                    h.makeNotice("error", "misc-error", aT)
                })
            });
            $("#archived-sweep").click(function() {
                var aQ = [];
                $(".archived_checkbox:checked").each(function() {
                    var aR = I[$(this).val()];
                    if (aR.priv == null) {
                        h.makeNotice("error", "misc-error", "Cannot Sweep Watch Only Address");
                        return
                    }
                    aQ.push(aR.addr)
                });
                if (aQ.length == 0) {
                    return
                }
                P(aQ)
            });
            $("#archived-delete").click(function() {
                var aQ = [];
                $(".archived_checkbox:checked").each(function() {
                    aQ.push($(this).val())
                });
                if (aQ.length == 0) {
                    return
                }
                al(aQ)
            });
            $("#shared-never-ask").click(function() {
                SetCookie("shared-never-ask", $(this).is(":checked"))
            });
            $(".bitstamp-btn").click(function() {
                window.open(root + "r?url=https://www.bitstamp.net/?blockchaininfo=1", null, "scroll=1,status=1,location=1,toolbar=1,width=1000,height=700")
            });
            $(".deposit-btn").click(function() {
                var aS = $(this);
                var aR = h.getPreferredAddress();
                var aQ = aS.data("extra");
                if (aQ == null) {
                    aQ = ""
                }
                loadScript("wallet/frame-modal", function() {
                    showFrameModal({
                        title: aS.data("title"),
                        description: "Deposit into address <b>" + aR + "</b>",
                        top_right: 'Have Questions? Read <a href="' + aS.data("link") + '" target="new">How It Works</a>',
                        src: root + "deposit?address=" + aR + "&ptype=" + aS.data("type") + "&guid=" + M + "&sharedKey=" + d + aQ
                    })
                })
            });
            $(".withdraw-btn").click(function() {
                var aQ = $(this);
                h.getSecondPassword(function() {
                    var aR = h.getPreferredAddress();
                    loadScript("wallet/frame-modal", function() {
                        showFrameModal({
                            title: aQ.data("title"),
                            description: "Your Wallet Balance is <b>" + formatBTC(au) + "</b>",
                            src: root + "withdraw?method=" + aQ.data("type") + "&address=" + aR + "&balance=" + au + "&guid=" + M + "&sharedKey=" + d
                        })
                    })
                })
            });
            $("#logout").click(h.logout);
            $("#refresh").click(function() {
                J();
                h.get_history()
            });
            $("#summary-n-tx-chart").click(function() {
                window.open(root + "charts/n-transactions?show_header=false&address=" + h.getActiveAddresses().join("|"), null, "scroll=0,status=0,location=0,toolbar=0,width=1000,height=700")
            });
            $("#summary-received-chart").click(function() {
                window.open(root + "charts/received-per-day?show_header=false&address=" + h.getActiveAddresses().join("|"), null, "scroll=0,status=0,location=0,toolbar=0,width=1000,height=700")
            });
            $("#summary-balance-chart").click(function() {
                window.open(root + "charts/balance?show_header=false&address=" + h.getActiveAddresses().join("|"), null, "scroll=0,status=0,location=0,toolbar=0,width=1000,height=700")
            });
            $("#new-addr").click(function() {
                try {
                    J(function() {
                        h.getSecondPassword(function() {
                            var aS = h.generateNewKey();
                            if (!aS) {
                                return
                            }
                            var aR = aS.getBitcoinAddress().toString();
                            h.backupWallet("update", function() {
                                h.makeNotice("info", "new-address", "Generated new Bitcoin Address " + aR);
                                loadScript("wallet/address_modal", function() {
                                    showLabelAddressModal(aR)
                                })
                            })
                        })
                    })
                } catch (aQ) {
                    h.makeNotice("error", "misc-error", aQ)
                }
            });
            $(".tx_filter a").click(function() {
                ar = 0;
                an = $(this).data("value");
                h.get_history()
            });
            $(".tx_display a").click(function() {
                var aQ = $(this).data("value");
                if (aQ == "export") {
                    v();
                    return
                }
                s.tx_display = aQ;
                c();
                af()
            });
            $("#email-backup-btn").click(function() {
                G()
            });
            $("#dropbox-backup-btn").click(function() {
                window.open(root + "wallet/dropbox-login?guid=" + M + "&sharedKey=" + d)
            });
            $("#gdrive-backup-btn").click(function() {
                window.open(root + "wallet/gdrive-login?guid=" + M + "&sharedKey=" + d)
            });
            $("#large-summary").click(function() {
                toggleSymbol();
                c()
            });
            $("#send-quick").on("show", function(aS, aR) {
                var aQ = $(this);
                r(aQ, aR);
                aQ.find(".send").unbind().click(function() {
                    loadScript("wallet/signer", function() {
                        startTxUI(aQ, "quick", initNewTx())
                    })
                })
            });
            $("#send-email").on("show", function(aS, aR) {
                var aQ = $(this);
                r(aQ, aR);
                aQ.find(".send").unbind().click(function() {
                    loadScript("wallet/signer", function() {
                        startTxUI(aQ, "email", initNewTx())
                    })
                })
            });
            $("#send-shared").on("show", function(aS, aR) {
                var aQ = $(this);
                r(aQ, aR);
                aQ.find(".mixer_fee").text(x);
                aQ.find(".fees,.free,.bonus").show();
                if (x < 0) {
                    aQ.find(".fees,.free").hide()
                } else {
                    if (x == 0) {
                        aQ.find(".fees,.bonus").hide()
                    } else {
                        aQ.find(".free,.bonus").hide()
                    }
                }
                aQ.find(".send").unbind().click(function() {
                    loadScript("wallet/signer", function() {
                        startTxUI(aQ, "shared", initNewTx())
                    })
                });
                aQ.find(".shared-fees").text("0.00");
                aQ.find('input[name="send-before-fees"]').unbind().bind("keyup change", function() {
                    var aU = parseFloat($(this).val());
                    var aT = 0;
                    if (aU > 0) {
                        if (x > 0) {
                            aT = parseFloat(aU + ((aU / 100) * x))
                        } else {
                            aT = parseFloat(aU);
                            aQ.find(".bonus-value").text(formatPrecision((Math.min(aU, precisionFromBTC(200)) / 100) * x))
                        }
                    }
                    if (precisionToBTC(aU) < 0.1 || precisionToBTC(aU) > 250) {
                        aQ.find(".shared-fees").text("0.00");
                        aQ.find(".send").prop("disabled", true)
                    } else {
                        aQ.find(".shared-fees").text(formatBTC(aT * symbol_btc.conversion));
                        aQ.find(".send").prop("disabled", false)
                    }
                    aQ.find('input[name="send-value"]').val(aT).trigger("keyup")
                })
            });
            $("#send-custom").on("show", function(aS, aR) {
                var aQ = $(this);
                r(aQ, aR);
                aQ.find(".send").unbind().click(function() {
                    loadScript("wallet/signer", function() {
                        startTxUI(aQ, "custom", initNewTx())
                    })
                });
                aQ.find('select[name="from"]').unbind().change(function() {
                    var aV = 0;
                    var aT = $(this).val();
                    for (var aU in aT) {
                        if (aT[aU] == "any") {
                            $(this).val("any");
                            aV = au;
                            break
                        } else {
                            var aW = I[aT[aU]];
                            if (aW && aW.balance) {
                                aV += aW.balance
                            }
                        }
                    }
                    aQ.find(".amount-available").text(formatBTC(aV))
                }).trigger("change");
                aQ.find(".reset").unbind().click(function() {
                    r(aQ, true);
                    aQ.find('select[name="from"]').trigger("change")
                })
            });
            $("#send-satoshi-dice,#send-btcdice-dice").on("show", function(aS, aR) {
                var aQ = this;
                loadScript("wallet/dicegames", function() {
                    try {
                        DICEGame.init($(aQ))
                    } catch (aT) {
                        h.makeNotice("error", "misc-error", "Unable To Load Dice Bets")
                    }
                }, function(aT) {
                    h.makeNotice("error", "misc-error", aT)
                })
            });
            $("#send-sms").on("show", function(aS, aR) {
                if (aR) {
                    return
                }
                var aQ = $(this);
                r(aQ);
                $.ajax({
                    type: "GET",
                    url: resource + "wallet/country_codes.html",
                    success: function(aT) {
                        aQ.find('select[name="sms-country-code"]').html(aT)
                    },
                    error: function() {
                        h.makeNotice("error", "misc-error", "Error Downloading SMS Country Codes")
                    }
                });
                aQ.find(".send").unbind().click(function() {
                    loadScript("wallet/signer", function() {
                        var aT = initNewTx();
                        startTxUI(aQ, "sms", aT)
                    })
                })
            });
            $("#address-book").on("show", function() {
                var aR = $("#address-book-tbl tbody");
                if (az(g) > 0) {
                    aR.empty();
                    for (var aQ in g) {
                        var aS = $("<tr><td>" + g[aQ] + '</td><td><div class="addr-book-entry">' + aQ + '</div></td><td style="width:16px" class="hidden-phone"><img src="' + resource + 'delete.png" class="act-delete" /></td></tr>');
                        (function(aT) {
                            aS.find(".act-delete").click(function() {
                                h.deleteAddressBook(aT)
                            })
                        })(aQ);
                        aR.append(aS)
                    }
                }
            });
            $('a[data-toggle="tab"]').unbind().on("show", function(aQ) {
                $(aQ.target.hash).trigger("show")
            });
            $("#receive-coins-btn").click(function() {
                ac($("#receive-coins"))
            });
            $(".show_adv").click(function() {
                $(".modal:visible").center()
            });
            $(".download-backup-btn").show();
            ay()
        }

        function p() {
            $(".resend-code").click(function() {
                h.setGUID(M, true)
            });
            $(".download-backup-btn").toggle(ag != null).click(function() {
                $(this).attr("download", "wallet.aes.json");
                if (!ag) {
                    h.makeNotice("error", "error", "No Wallet Data to Download");
                    return
                }
                var aR = ("download" in document.createElement("a"));
                if (window.Blob && window.URL && aR) {
                    var aS = new Blob([ag]);
                    var aT = window.URL.createObjectURL(aS);
                    $(this).attr("href", aT)
                } else {
                    var aQ = window.open(null, null, "width=700,height=800,toolbar=0");
                    aQ.document.write('<!DOCTYPE html><html><head></head><body><div style="word-wrap:break-word;" >' + ag + "</div></body></html>")
                }
                aN()
            });
            $(".auth-0,.auth-1,.auth-2,.auth-3,.auth-4,.auth-5").unbind().keypress(function(aQ) {
                if (aQ.keyCode == 13) {
                    aQ.preventDefault();
                    $("#restore-wallet-continue").click()
                }
            });
            $("#restore-wallet-continue").unbind().click(function(aR) {
                aR.preventDefault();
                var aQ = $.trim($("#restore-guid").val());
                if (aQ.length == 0) {
                    return
                }
                if (M != aQ) {
                    h.setGUID(aQ, false)
                } else {
                    a()
                }
            });
            $(".modal").on("show", function() {
                L();
                $(this).center()
            }).on("shown", function() {
                L();
                $(this).center()
            })
        }

        function aj(aR) {
            var aS = Crypto.SHA256(aR + "?");
            switch (aS.slice(0, 2)) {
                case "00":
                    var aT = Crypto.SHA256(aR, {
                        asBytes: true
                    });
                    return aT;
                    break;
                case "01":
                    var aQ = Crypto.util.hexToBytes(aS.slice(2, 4))[0];
                    var aU = Math.round(Math.pow(2, (aQ / 4)));
                    var aT = Crypto.PBKDF2(aR, "Satoshi Nakamoto", 32, {
                        iterations: aU,
                        asBytes: true
                    });
                    return aT;
                    break;
                default:
                    console.log("invalid key");
                    break
            }
        }

        function aC() {
            var aS, aQ = "";
            if (window.getSelection) {
                aS = window.getSelection();
                if (aS.rangeCount) {
                    var aT = aS.getRangeAt(0).cloneContents();
                    var aR = document.createElement("div");
                    aR.appendChild(aT);
                    aQ = aR.innerText
                }
            } else {
                if (document.selection && document.selection.type == "Text") {
                    aQ = document.selection.createRange().htmlText
                }
            }
            return aQ
        }
        this.detectPrivateKeyFormat = function(aR) {
            if (/^5[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{50}$/.test(aR)) {
                return "sipa"
            }
            if (/^[LK][123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{51}$/.test(aR)) {
                return "compsipa"
            }
            if (/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{44}$/.test(aR) || /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43}$/.test(aR)) {
                return "base58"
            }
            if (/^[A-Fa-f0-9]{64}$/.test(aR)) {
                return "hex"
            }
            if (/^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=+\/]{44}$/.test(aR)) {
                return "base64"
            }
            if (/^6P[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{56}$/.test(aR)) {
                return "bip38"
            }
            if (/^S[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21}$/.test(aR) || /^S[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{25}$/.test(aR) || /^S[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{29}$/.test(aR) || /^S[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{30}$/.test(aR)) {
                var aQ = Crypto.SHA256(aR + "?", {
                    asBytes: true
                });
                if (aQ[0] === 0 || aQ[0] === 1) {
                    return "mini"
                }
            }
            throw "Unknown Key Format " + aR
        };
        this.privateKeyStringToKey = function(aR, aT) {
            var aQ = null;
            if (aT == "base58") {
                aQ = B58.decode(aR)
            } else {
                if (aT == "base64") {
                    aQ = Crypto.util.base64ToBytes(aR)
                } else {
                    if (aT == "hex") {
                        aQ = Crypto.util.hexToBytes(aR)
                    } else {
                        if (aT == "mini") {
                            aQ = aj(aR)
                        } else {
                            if (aT == "sipa") {
                                var aS = B58.decode(aR);
                                aS.shift();
                                aQ = aS.slice(0, aS.length - 4)
                            } else {
                                if (aT == "compsipa") {
                                    var aS = B58.decode(aR);
                                    aS.shift();
                                    aS.pop();
                                    aQ = aS.slice(0, aS.length - 4)
                                } else {
                                    throw "Unsupported Key Format"
                                }
                            }
                        }
                    }
                }
            } if (aQ.length != 32) {
                throw "Result not 32 bytes in length"
            }
            return new Bitcoin.ECKey(aQ)
        };
        $(document).ready(function() {
            if (!$.isEmptyObject({})) {
                h.makeNotice("error", "error", "Object.prototype has been extended by a browser extension. Please disable this extensions and reload the page.");
                return
            }
            $("input,button,select").attr("autocomplete", "off");
            var aR = $(document.body);

            function aS() {
                if (M && M.length == 36) {
                    setTimeout(function() {
                        h.setGUID(M, false)
                    }, 10)
                }
            }
            M = aR.data("guid");
            d = aR.data("sharedkey");
            if (h.skip_init) {
                return
            }
            MyStore.get("payload", function(aX) {
                if (ag == null && aX != null) {
                    ag = aX;
                    av = ae()
                }
            });
            if ((!M || M.length == 0) && (isExtension || window.location.href.indexOf("/login") > 0)) {
                MyStore.get("guid", function(aX) {
                    M = aX;
                    aS()
                })
            } else {
                aS()
            } if (top.location != self.location) {
                top.location = self.location.href
            }
            aR.click(function() {
                if (S) {
                    clearTimeout(S);
                    S = setTimeout(h.logout, h.getLogoutTime())
                }
                rng_seed_time()
            }).keypress(function() {
                if (S) {
                    clearTimeout(S);
                    S = setTimeout(h.logout, h.getLogoutTime())
                }
                rng_seed_time()
            }).mousemove(function(aX) {
                if (aX) {
                    rng_seed_int(aX.clientX * aX.clientY)
                }
            });
            p();
            $(".auth-" + q).show();
            j = $("#restore-wallet");
            j.show();
            var aT = false;
            var aW = 17,
                aV = 86,
                aQ = 67,
                aU = 67;
            $(document).keydown(function(aY) {
                try {
                    if (aY.keyCode == aW || aY.keyCode == aU) {
                        aT = true
                    }
                    if (aT && aY.keyCode == aQ) {
                        var aX = $.trim(aC());
                        var aZ = I[aX];
                        if (aZ != null) {
                            if (aZ.priv == null) {
                                $("#watch-only-copy-warning-modal").modal("show")
                            } else {
                                if (aZ.tag == 1) {
                                    O()
                                }
                            }
                        }
                    }
                } catch (aY) {
                    console.log(aY)
                }
            }).keyup(function(aX) {
                if (aX.keyCode == aW || aX.keyCode == aU) {
                    aT = false
                }
            }).ajaxStart(function() {
                ap("loading_start");
                $(".loading-indicator").fadeIn(200)
            }).ajaxStop(function() {
                ap("loading_stop");
                $(".loading-indicator").hide()
            })
        });

        function aP() {
            $("#receive-coins").find(".tab-pane.active").trigger("show");
            setupToggle()
        }
    };
