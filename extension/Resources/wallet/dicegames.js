function _DICEGame() {
    function b(e) {
        MyWallet.setLoadingText("Calculating Profit / Loss");
        var d = e.find('input[name="send-to-address"]');
        var c = [];
        $(d).each(function() {
            c.push($(this).val())
        });
        if (c.length == 0) {
            return
        }
        $.ajax({
            type: "GET",
            dataType: "json",
            url: root + "walletprofitloss",
            data: {
                input_address: MyWallet.getActiveAddresses().join("|"),
                output_address: c.join("|"),
                format: "plain"
            },
            success: function(h) {
                var f = e.find(".profit-loss").show(200);
                f.find(".n-bets").text(h.n_sent);
                var g = h.result;
                if (g > 0) {
                    f.find(".winnings").html('<font color="green">' + formatMoney(g, true) + "</font>")
                } else {
                    if (g < 0) {
                        f.find(".winnings").html('<font color="red">' + formatMoney(g, true) + "</font>")
                    } else {
                        f.find(".winnings").html(formatMoney(g, true))
                    }
                }
                f.find(".refresh").unbind().click(function() {
                    b(e)
                })
            }
        })
    }

    function a(f, e, c) {
        var d = $('<div class="modal hide">        <div class="modal-header">            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>            <h3>Confirm Multiple Bets</h3>        </div>        <div class="modal-body">            <p>This bet will be repeated <b class="times"></b> times. Please confirm this is correct.</p>        </div>        <div class="modal-footer">            <a href="#" class="btn btn-secondary">Cancel</a>            <a href="#" class="btn btn-primary">Continue</a>        </div>    </div>');
        $("body").append(d);
        d.modal({
            keyboard: true,
            backdrop: "static",
            show: true
        });
        d.find(".times").text(f);
        d.center();
        d.find(".btn.btn-primary").unbind().click(function() {
            d.modal("hide");
            d.remove();
            if (e) {
                e()
            }
        });
        d.find(".btn.btn-secondary").unbind().click(function() {
            d.modal("hide");
            d.remove();
            if (c) {
                c()
            }
        })
    }
    this.init = function(d) {
        var c = d.find(".recipient-container");
        if (!c.is(":empty")) {
            return
        }
        $.ajax({
            type: "GET",
            dataType: "json",
            url: root + "dicegames",
            data: {
                game: d.data("name"),
                format: "plain"
            },
            success: function(l) {
                c.empty();
                var f = $('<div class="control-group"><label class="control-label">Win Odds</label><div class="controls"><p>Enter the amounts you wish to bet below:</p></div></div>');
                c.append(f);
                for (var h in l) {
                    var g = l[h];
                    if (g.popular) {
                        c.append('<div class="control-group recipient"><label class="control-label">' + g.odds + '%</label><div class="controls"><input name="send-to-address" type="hidden" value="' + g.address + '" /><div class="input-append input-prepend"><span class="add-on btc-symbol">' + symbol_btc.symbol + '</span><input class="send-value" style="width:auto;max-width:145px;" data-optional="true" name="send-value" data-multiplier="' + g.multiplier + '" data-minbet="' + g.minBet + '" data-maxbet="' + g.maxBet + '" placeholder="Bet Amount" type="text" /><span class="add-on send-win-amount">No Bet</span> </div></div></div>')
                    }
                }

                function k(e) {
                    if (e.val() > 0) {
                        e.parent().find(".send-win-amount").html("Win Amount: " + formatPrecision((parseFloat(e.val()) * parseFloat(e.data("multiplier")))))
                    } else {
                        e.parent().find(".send-win-amount").html("No Bet")
                    }
                }
                c.find('input[name="send-value"]').bind("change", function() {
                    var i = parseFloat($(this).val());
                    var e = precisionFromBTC($(this).data("maxbet"));
                    var m = precisionFromBTC($(this).data("minbet"));
                    if (i > e) {
                        $(this).val(e);
                        MyWallet.makeNotice("error", "misc-error", "The Maximum Bet is " + formatPrecision(e))
                    }
                    if (i == 0) {
                        $(this).val("")
                    } else {
                        if (i < m) {
                            $(this).val(m);
                            MyWallet.makeNotice("error", "misc-error", "The Minimum Bet is " + formatPrecision(m))
                        }
                    }
                    k($(this))
                });
                c.find('input[name="send-value"]').keyup(function() {
                    k($(this))
                });
                d.find(".send").unbind().click(function() {
                    var e = 0;
                    var m = $(this).data("repeat");
                    if (!m) {
                        m = 0
                    } else {
                        m = parseInt(m)
                    }
                    var i = {
                        on_success: function() {
                            ++e;
                            if (e < m) {
                                setTimeout(n, 100)
                            }
                        }
                    };
                    var n = function() {
                        console.log("Send Called");
                        var o = initNewTx();
                        o.allow_adjust = false;
                        o.addListener(i);
                        startTxUI(d, "dice", o)
                    };
                    if (m > 1) {
                        a(m, function() {
                            loadScript("wallet/signer", function() {
                                n()
                            })
                        })
                    } else {
                        loadScript("wallet/signer", function() {
                            n()
                        })
                    }
                });
                try {
                    b(d)
                } catch (j) {
                    console.log(j)
                }
            },
            error: function(f) {
                MyWallet.makeNotice("error", "misc-error", f.responseText)
            }
        })
    }
}
var DICEGame = new _DICEGame();
