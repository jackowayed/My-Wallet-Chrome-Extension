var AccountSettings = new function() {
        function b(o) {
            var n = o.lastIndexOf("@");
            var m = o.lastIndexOf(".");
            return (n < m && n > 0 && o.indexOf("@@") == -1 && m > 2 && (o.length - m) > 2)
        }

        function c(m) {
            try {
                var n = window.applicationCache;
                console.log("Clear Cache Manifest");
                n.addEventListener("updateready", function(p) {
                    n.swapCache();
                    if (m) {
                        m()
                    }
                }, false);
                n.addEventListener("noupdate", function(p) {
                    if (m) {
                        m()
                    }
                }, false);
                n.addEventListener("error", function(p) {
                    if (m) {
                        m()
                    }
                }, false);
                n.update()
            } catch (o) {
                console.log(o);
                if (m) {
                    m()
                }
            }
        }

        function j(n, r, p, q, o, m) {
            p = $.trim(p);
            if (p.length == 0) {
                MyWallet.makeNotice("error", "misc-error", n + ": Invalid value");
                return
            }
            if (p.length == 0) {
                MyWallet.makeNotice("error", r + "-error", data.responseText);
                if (o) {
                    o()
                }
                return
            }
            MyWallet.setLoadingText(n);
            if (!m) {
                m = ""
            }
            MyWallet.securePost("wallet" + m, {
                length: (p + "").length,
                payload: p + "",
                method: r
            }, function(s) {
                MyWallet.makeNotice("success", r + "-success", s);
                if (q) {
                    q()
                }
            }, function(s) {
                MyWallet.makeNotice("error", r + "-error", s.responseText);
                if (o) {
                    o()
                }
            })
        }

        function i() {
            if (MyWallet.getDoubleEncryption()) {
                $(".double-encryption-off").hide();
                $(".double-encryption-on").show()
            } else {
                $(".double-encryption-on").hide();
                $(".double-encryption-off").show()
            }
            $("#double-password").val("");
            $("#double-password2").val("")
        }

        function l() {
            $("#password_mnemonic1").find("span").empty();
            $("#password_mnemonic2").find("span").empty()
        }

        function g() {
            l();
            var n = $("#password_mnemonic1");
            var m = $("#password_mnemonic2");
            loadScript("wallet/mnemonic", function() {
                MyWallet.getMainPassword(function(o) {
                    MyWallet.getSecondPassword(function(p) {
                        try {
                            mn_encode_pass({
                                password: o,
                                guid: MyWallet.getGuid()
                            }, function(r) {
                                n.show().find("span").text(r)
                            }, function(r) {
                                MyWallet.makeNotice("error", "misc-error", r)
                            });
                            if (p) {
                                mn_encode_pass({
                                    password: p
                                }, function(r) {
                                    m.show().find("span").text(r)
                                }, function(r) {
                                    MyWallet.makeNotice("error", "misc-error", r)
                                })
                            } else {
                                m.hide()
                            }
                        } catch (q) {
                            console.log(q);
                            f()
                        }
                    }, function() {
                        f()
                    })
                }, function() {
                    f()
                })
            })
        }
        this.bind = function(n, m) {
            i();
            e();
            a(n, m)
        };
        this.init = function(m, o, n) {
            MyWallet.setLoadingText("Loading Account Settings");
            if (!m.is(":empty")) {
                AccountSettings.bind(o, n);
                o();
                return
            }
            $.ajax({
                type: "GET",
                url: root + "wallet/account-settings-template",
                data: {
                    format: "plain",
                    language: MyWallet.getLanguage()
                },
                success: function(p) {
                    try {
                        m.html(p);
                        AccountSettings.bind(o, n);
                        o()
                    } catch (q) {
                        console.log(q);
                        n()
                    }
                },
                error: function(p) {
                    MyWallet.makeNotice("error", "misc-error", "Error Downloading Account Settings Template");
                    n()
                }
            })
        };

        function a(n, m) {
            $('a[data-toggle="tab"]').unbind().on("show", function(o) {
                $(o.target.hash).trigger("show")
            });
            MyWallet.setLoadingText("Getting Wallet Info");
            MyWallet.securePost("wallet", {
                method: "get-info",
                format: "json"
            }, function(u) {
                if (u.email != null) {
                    $("#wallet-email").val(u.email);
                    $(".my-email").text(u.email)
                }
                $("#wallet-phrase").val(u.phrase);
                $("#two-factor-select").val(u.auth_type);
                $(".two-factor").hide();
                $(".two-factor.t" + u.auth_type).show(200);
                var v = $("#notifications-type");
                v.find(":checkbox").prop("checked", false);
                v.find('[class^="type"]').hide();
                for (var w in u.notifications_type) {
                    var x = u.notifications_type[w];
                    v.find(':checkbox[value="' + x + '"]').prop("checked", true);
                    v.find(".type-" + x).show()
                }
                $(".logl").hide();
                $(".logl.l" + u.logging_level).show();
                $("#logging-level").val(u.logging_level);
                $("#notifications-confirmations").val(u.notifications_confirmations);
                $("#notifications-on").val(u.notifications_on);
                $("#pbkdf2-iterations").val(MyWallet.getPbkdf2Iterations());
                if (u.alias != null && u.alias.length > 0) {
                    $("#wallet-alias").val(u.alias);
                    $(".alias").text("https://blockchain.info/wallet/" + u.alias);
                    $(".alias").show(200)
                }
                var p = $("#local_currency").empty();
                for (var y in u.currencies) {
                    var C = u.currencies[y];
                    p.append('<option value="' + y + '">' + C + "</option>")
                }
                p.val(u.currency);
                var z = $("#btc_currency").empty();
                for (var y in u.btc_currencies) {
                    var C = u.btc_currencies[y];
                    z.append('<option value="' + y + '">' + C + "</option>")
                }
                z.val(u.btc_currency);
                var s = $("#language_select").empty();
                for (var t in u.languages) {
                    var B = u.languages[t];
                    s.append('<option value="' + t + '">' + B + "</option>")
                }
                s.val(u.language);
                $("#auto-email-backup").prop("checked", u.auto_email_backup == 1 ? true : false);
                $("#never-save-auth-type").prop("checked", u.never_save_auth_type == 1 ? true : false);
                $("#wallet-http-url").val(u.http_url);
                $("#wallet-skype").val(u.skype_username);
                $("#wallet-boxcar").val(u.boxcar_email);
                $("#wallet-yubikey").val(u.yubikey);
                if (u.password_hint1) {
                    $("#password-hint1").val(u.password_hint1)
                }
                if (u.password_hint2) {
                    $("#password-hint2").val(u.password_hint2)
                }
                $("#ip-lock").val(u.ip_lock);
                $("#my-ip").text(u.my_ip);
                $("#ip-lock-on").prop("checked", u.ip_lock_on == 1 ? true : false);
                $("#block-tor-ips").prop("checked", u.block_tor_ips == 1 ? true : false);
                $('input[name="fee-policy"]').each(function() {
                    if (parseInt($(this).val()) == MyWallet.getFeePolicy()) {
                        $(this).prop("checked", true)
                    }
                });
                $('input[name="always-keep-local-backup"]').prop("checked", MyWallet.getAlwaysKeepLocalBackup() ? true : false);
                $('input[name="inactivity-logout-time"]').each(function() {
                    if (parseInt($(this).val()) == MyWallet.getLogoutTime()) {
                        $(this).prop("checked", true)
                    }
                });
                if (u.email_verified == 0) {
                    $(".email-unverified").show();
                    $(".email-verified").hide()
                } else {
                    $(".email-unverified").hide();
                    $(".email-verified").show()
                }
                $("#my-ip").text(u.my_ip);
                var o = "1";
                if (u.sms_number) {
                    var r = u.sms_number.split(" ");
                    if (u.sms_number[0] == "+" && r.length > 1) {
                        o = r[0].substring(1);
                        $(".wallet-sms").val(r[1])
                    } else {
                        $(".wallet-sms").val(u.sms_number)
                    }
                }
                if (u.sms_verified == 0) {
                    $(".sms-unverified").show();
                    $(".sms-verified").hide()
                } else {
                    $(".sms-verified").show().trigger("show");
                    $(".sms-unverified").hide()
                }
                $.ajax({
                    type: "GET",
                    url: resource + "wallet/country_codes.html",
                    success: function(D) {
                        $('select[class="wallet-sms-country-codes"]').html(D).val(o)
                    },
                    error: function() {
                        MyWallet.makeNotice("error", "misc-error", "Error Downloading SMS Country Codes")
                    }
                });
                var A = function(H, E, F) {
                    try {
                        if (window.webkitNotifications && navigator.userAgent.indexOf("Chrome") > -1) {
                            var D = webkitNotifications.checkPermission();
                            if (D == 1 && F) {
                                webkitNotifications.requestPermission(A)
                            } else {
                                if (D == 0) {
                                    H()
                                } else {
                                    E()
                                }
                            }
                        } else {
                            if (window.Notification) {
                                if (Notification.permissionLevel() === "default" && F) {
                                    Notification.requestPermission(A)
                                } else {
                                    if (window.Notification.permissionLevel() == "granted") {
                                        H()
                                    } else {
                                        E()
                                    }
                                }
                            } else {
                                E()
                            }
                        }
                    } catch (G) {
                        console.log(G);
                        E()
                    }
                };
                var q = $("#html5-notifications-checkbox");
                q.unbind().change(function() {
                    if ($(this).is(":checked")) {
                        A(function() {
                            MyWallet.makeNotice("success", "misc-success", "HTML5 Notifications Enabled");
                            MyWallet.setHTML5Notifications(true);
                            MyWallet.backupWallet()
                        }, function() {
                            MyWallet.makeNotice("error", "misc-error", "Error Enabling HTML5 Notifications");
                            MyWallet.setHTML5Notifications(false);
                            MyWallet.backupWallet()
                        }, true)
                    } else {
                        MyWallet.setHTML5Notifications(false);
                        MyWallet.backupWallet()
                    }
                });
                if (MyWallet.getHTML5Notifications()) {
                    q.prop("checked", true)
                } else {
                    q.prop("checked", false)
                }
            }, function(o) {
                if (o.responseText) {
                    MyWallet.makeNotice("error", "misc-error", o.responseText)
                } else {
                    MyWallet.makeNotice("error", "misc-error", "Error Downloading Account Settings")
                } if (m) {
                    m()
                }
            })
        }

        function k() {
            f();
            var m = $("#update-password-modal");
            m.modal({
                keyboard: true,
                backdrop: "static",
                show: true
            });
            m.center();
            m.find(".btn.btn-primary").unbind().click(function() {
                m.modal("hide");
                var n = $.trim($("#password").val());
                var o = $.trim($("#password2").val());
                if (n != o) {
                    MyWallet.makeNotice("error", "misc-error", "Passwords do not match.");
                    return false
                }
                if (n.length == 0 || n.length < 10 || n.length > 255) {
                    MyWallet.makeNotice("error", "misc-error", "Password length must be between least 10  & 255 characters");
                    return false
                }
                MyWallet.setMainPassword(n)
            });
            m.find(".btn.btn-secondary").unbind().click(function() {
                m.modal("hide")
            })
        }

        function f() {
            $(".accordion-body").collapse("hide")
        }

        function h() {
            MyWallet.setDoubleEncryption(false, null, function() {
                i()
            })
        }

        function d() {
            var m = $("#double-password").val();
            var n = $("#double-password2").val();
            if (m == null || m.length == 0 || m.length < 4 || m.length > 255) {
                MyWallet.makeNotice("error", "misc-error", "Password must be 4 characters or more in length");
                return
            }
            if (m != n) {
                MyWallet.makeNotice("error", "misc-error", "Passwords do not match.");
                return
            }
            if (MyWallet.isCorrectMainPassword(m)) {
                MyWallet.makeNotice("error", "misc-error", "Second password should not be the same as your main password.");
                return
            }
            MyWallet.setDoubleEncryption(true, m, function() {
                i()
            })
        }

        function e() {
            var m = $("#notifications-type");
            m.find(":checkbox").unbind().change(function() {
                var p = [];
                m.find(":checkbox:checked").each(function() {
                    p.push($(this).val())
                });
                if (!p.length) {
                    p.push(0)
                }
                j("Updating Notifications Type", "update-notifications-type", p.join("|"));
                m.find(".type-" + $(this).val()).toggle();
                MyWallet.get_history()
            });
            $("input[name=fee-policy]").unbind().change(function() {
                MyWallet.setFeePolicy($("input[name=fee-policy]:checked").val());
                MyWallet.backupWallet()
            });
            $('input[name="always-keep-local-backup"]').unbind().change(function() {
                MyWallet.setAlwaysKeepLocalBackup($(this).is(":checked"));
                MyStore.remove("payload");
                MyWallet.backupWallet()
            });
            $("input[name=inactivity-logout-time]").unbind().change(function() {
                MyWallet.setLogoutTime(parseInt($(this).val()));
                MyWallet.backupWallet()
            });
            $("#password_mnemonic").unbind().on("show", function() {
                g()
            }).on("hide", function() {
                l()
            });
            $("#pairing_code").unbind().on("show", function() {
                MyWallet.makePairingQRCode(function(p) {
                    $("#pairing-code-v0").html(p)
                }, 0);
                MyWallet.makePairingQRCode(function(p) {
                    $("#pairing-code-v1").html(p)
                }, 1);
                setTimeout(function() {
                    f()
                }, 30000)
            }).on("hide", function() {
                $("#pairing-code-v1").empty();
                $("#pairing-code-v0").empty()
            });
            $("#update-password-btn").unbind().click(function() {
                k()
            });
            $("#password-hint1").unbind().change(function() {
                j("Updating Main Password Hint", "update-password-hint1", $(this).val())
            });
            $("#password-hint2").unbind().change(function() {
                j("Updating Second Password Hint", "update-password-hint2", $(this).val())
            });
            $("#ip-lock-on").unbind().change(function() {
                j("Updating IP Lock", "update-ip-lock-on", $(this).is(":checked"))
            });
            $("#ip-lock").unbind().change(function() {
                j("Updating Locked Ip Addresses", "update-ip-lock", $(this).val())
            });
            $("#notifications-on").unbind().change(function() {
                j("Updating Notifications Settings", "update-notifications-on", $(this).val())
            });
            $("#auto-email-backup").unbind().change(function() {
                j("Updating Auto Backup Settings", "update-auto-email-backup", $(this).is(":checked"))
            });
            $("#never-save-auth-type").unbind().change(function() {
                j("Updating Auth Saving Settings", "update-never-save-auth-type", $(this).is(":checked"))
            });
            $("#wallet-google-qr-code").unbind().change(function() {
                var p = $(this).val();
                j("Updating Two Factor Authentication", "update-auth-type", 4, function() {
                    $(".two-factor.t4").children().hide().eq(0).show();
                    MyWallet.setRealAuthType(4)
                }, null, "?code=" + p)
            });
            $("#two-factor-select").unbind().change(function() {
                var q = parseInt($(this).val());
                MyStore.remove("payload");
                var p = $(".two-factor.t" + q);
                if (q == 4) {
                    p.children().hide().eq(1).show();
                    MyWallet.securePost("wallet", {
                        method: "generate-google-secret"
                    }, function(r) {
                        if (r != null && r.length > 0) {
                            loadScript("wallet/jquery.qrcode", function() {
                                $("#wallet-google-qr").empty().qrcode({
                                    width: 300,
                                    height: 300,
                                    text: r
                                })
                            })
                        }
                    }, function(r) {
                        MyWallet.makeNotice("error", "misc-error", r.responseText)
                    })
                } else {
                    j("Updating Two Factor Authentication", "update-auth-type", q, function() {
                        MyWallet.setRealAuthType(q)
                    })
                }
                $(".two-factor").hide(200);
                p.show(200)
            });
            var n = "";
            $("#wallet-email-send").click(function() {
                n = "";
                $("#wallet-email").trigger("change")
            });
            $("#wallet-email").unbind().change(function(q) {
                var p = $.trim($(this).val());
                if (p.length == 0) {
                    return
                }
                if (n == p) {
                    return
                }
                if (!b(p)) {
                    MyWallet.makeNotice("error", "misc-error", "Email address is not valid");
                    return
                }
                j("Updating Email", "update-email", p, function() {
                    n = p
                }, function() {
                    n = ""
                });
                n = p;
                $(".email-unverified").show(200);
                $(".email-verified").hide()
            });
            $("#wallet-double-encryption-enable").unbind().click(function(p) {
                f();
                d()
            });
            $("#wallet-double-encryption-disable").unbind().click(function(p) {
                f();
                h()
            });
            $("#wallet-email-code").unbind().change(function(q) {
                var p = $.trim($(this).val());
                if (p.length == 0 || p.length > 255) {
                    MyWallet.makeNotice("error", "misc-error", "You must enter a code to verify");
                    return
                }
                MyWallet.setLoadingText("Verifying Email");
                MyWallet.securePost("wallet", {
                    payload: p,
                    length: p.length,
                    method: "verify-email"
                }, function(r) {
                    MyWallet.makeNotice("success", "misc-success", r);
                    $(".email-unverified").hide();
                    $(".email-verified").show(200)
                }, function(r) {
                    MyWallet.makeNotice("error", "misc-error", r.responseText);
                    $(".email-unverified").show(200);
                    $(".email-verified").hide()
                })
            });
            $(".wallet-sms-code").unbind().change(function(q) {
                var p = $.trim($(this).val());
                if (p.length == 0 || p.length > 255) {
                    MyWallet.makeNotice("error", "misc-error", "You must enter an SMS code to verify");
                    return
                }
                MyWallet.setLoadingText("Verifying SMS Code");
                MyWallet.securePost("wallet", {
                    payload: p,
                    length: p.length,
                    method: "verify-sms"
                }, function(r) {
                    MyWallet.makeNotice("success", "misc-success", r);
                    $(".sms-unverified").hide();
                    $(".sms-verified").show(200).trigger("show")
                }, function(r) {
                    MyWallet.makeNotice("error", "misc-error", r.responseText);
                    $(".sms-verified").hide();
                    $(".sms-unverified").show(200)
                })
            });
            var o = "";
            $(".send-code").unbind().click(function() {
                o = "";
                $(this).parent().find(".wallet-sms").trigger("change")
            });
            $('select[class="wallet-sms-country-codes"]').unbind().change(function() {
                o = "";
                $(".wallet-sms").trigger("change")
            });
            $(".wallet-sms").unbind().change(function() {
                var p = $.trim($(this).val());
                if (p == null || p.length == 0) {
                    return
                }
                if (p.charAt(0) != "+") {
                    p = "+" + $(".wallet-sms-country-codes").val() + p
                }
                if (o == p) {
                    return
                }
                o = p;
                j("Updating Cell Number", "update-sms", p, function() {
                    $(".sms-unverified").show(200);
                    $(".sms-verified").hide()
                })
            });
            $("#run-key-check").unbind().click(function() {
                MyWallet.getSecondPassword(function() {
                    try {
                        MyWallet.checkAllKeys(true);
                        MyWallet.backupWallet()
                    } catch (p) {
                        MyWallet.makeNotice("error", "misc-error", p)
                    }
                })
            });
            $("#run-compressed-check").unbind().click(function() {
                MyWallet.getSecondPassword(function() {
                    try {
                        MyWallet.runCompressedCheck(true)
                    } catch (p) {
                        MyWallet.makeNotice("error", "misc-error", p)
                    }
                })
            });
            $("#register-uri-handler").unbind().click(function() {
                if (navigator && navigator.registerProtocolHandler) {
                    try {
                        navigator.registerProtocolHandler("bitcoin", window.location.protocol + "//" + window.location.hostname + "/wallet/login#%s", "Blockchain.info")
                    } catch (p) {
                        MyWallet.makeNotice("error", "misc-error", p)
                    }
                } else {
                    MyWallet.makeNotice("error", "misc-error", "Your browser does not support bitcoin links. Try google chrome.")
                }
            });
            $("#local_currency").unbind().change(function() {
                if (symbol != symbol_local) {
                    toggleSymbol()
                }
                j("Updating Local Currency", "update-currency", $(this).val(), function() {
                    MyWallet.get_history()
                })
            });
            $("#btc_currency").unbind().change(function() {
                if (symbol != symbol_btc) {
                    toggleSymbol()
                }
                j("Updating BTC Currency", "update-btc-currency", $(this).val(), function() {
                    MyWallet.get_history()
                })
            });
            $("#language_select").unbind().change(function() {
                var p = $(this).val();
                j("Updating Language", "update-language", p, function() {
                    if (isExtension) {
                        MyStore.put("language", p);
                        window.location.href = "/index.html"
                    } else {
                        c(function() {
                            window.location.reload()
                        })
                    }
                })
            });
            $("#notifications-confirmations").unbind().change(function(p) {
                j("Updating Notification Confirmations", "update-notifications-confirmations", $(this).val())
            });
            $("#account-logging").unbind().on("show", function() {
                var q = $(this).find("table").hide();
                var p = q.find("tbody");
                MyWallet.securePost("wallet", {
                    method: "list-logs",
                    format: "json"
                }, function(v) {
                    try {
                        q.show();
                        p.empty();
                        if (v == null) {
                            throw "Failed to get backups"
                        }
                        var t = v.results;
                        if (t.length == 0) {
                            throw "No logs found"
                        }
                        for (var s in t) {
                            var r = t[s];
                            p.append('<tr><td style="width:130px">' + dateToString(new Date(r.time)) + '</td><td style="width:170px">' + r.action + '</td><td style="text-overflow: ellipsis;max-width:100px;overflow: hidden;">' + r.ip_address + "</td><td>" + r.user_agent + "</td></tr>")
                        }
                    } catch (u) {
                        MyWallet.makeNotice("error", "misc-error", u)
                    }
                }, function(r) {
                    MyWallet.makeNotice("error", "misc-error", r.responseText)
                })
            });
            $("#logging-level").unbind().change(function(p) {
                $(".logl").hide();
                $(".logl.l" + $(this).val()).show();
                j("Updating Logging Level", "update-logging-level", $(this).val(), function() {
                    $("#account-logging").trigger("show")
                })
            });
            $("#block-tor-ips").unbind().change(function(p) {
                j("Updating TOR ip block", "update-block-tor-ips", $(this).is(":checked") ? 1 : 0)
            });
            $("#wallet-yubikey").unbind().change(function(p) {
                j("Updating Yubikey", "update-yubikey", $(this).val())
            });
            $("#wallet-skype").unbind().change(function(p) {
                j("Updating Skype Username", "update-skype", $(this).val())
            });
            $("#wallet-boxcar").unbind().change(function(p) {
                j("Updating Boxcar Email", "update-boxcar", $(this).val())
            });
            $("#wallet-http-url").unbind().change(function(p) {
                j("Updating HTTP url", "update-http-url", $(this).val())
            });
            $("#wallet-phrase").unbind().change(function(q) {
                var p = $.trim($(this).val());
                if (p == null || p.length == 0 || p.length > 255) {
                    MyWallet.makeNotice("error", "misc-error", "You must enter a secret phrase");
                    return
                }
                j("Updating Secret Phrase", "update-phrase", p)
            });
            $("#wallet-alias").unbind().change(function(s) {
                var r = $(this);
                var p = $.trim(r.val());
                r.val(r.val().replace(/[\.,\/ #!$%\^&\*;:{}=`~()]/g, ""));
                var q = $.trim(r.val());
                if (q.length > 0) {
                    $(".alias").fadeIn(200);
                    $(".alias").text("https://blockchain.info/wallet/" + q)
                }
                j("Updating Alias", "update-alias", q, null, function() {
                    r.val(p)
                })
            })
        }
    };
