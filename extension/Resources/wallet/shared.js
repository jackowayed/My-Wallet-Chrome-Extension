var satoshi = 100000000;
var show_adv = false;
var adv_rule;
var symbol_btc = {
    code: "BTC",
    symbol: "BTC",
    name: "Bitcoin",
    conversion: satoshi,
    symbolAppearsAfter: true,
    local: false
};
var symbol_local;
var symbol = symbol_btc;
var root = "/";
var resource = "/Resources/";
var war_checksum;
var min = true;
var isExtension = false;
var APP_VERSION = "1.0";
var APP_NAME = "javascript_web";
var IMPORTED_APP_NAME = "external";
var IMPORTED_APP_VERSION = "0";

function stripHTML(a) {
    return $.trim($("<div>" + a.replace(/(<([^>]+)>)/ig, "") + "</div>").text())
}

function setLocalSymbol(a) {
    if (!a) {
        return
    }
    if (symbol === symbol_local) {
        symbol_local = a;
        symbol = symbol_local;
        calcMoney()
    } else {
        symbol_local = a
    }
}

function setBTCSymbol(a) {
    if (!a) {
        return
    }
    if (symbol === symbol_btc) {
        symbol_btc = a;
        symbol = symbol_btc;
        calcMoney()
    } else {
        symbol_btc = a
    }
}
$.fn.center = function() {
    scrollTo(0, 0);
    this.css("top", Math.max(($(window).height() / 2) - (this.height() / 2), 0) + "px");
    this.css("left", Math.max(($(window).width() / 2) - (this.width() / 2), 0) + "px");
    return this
};
if (!window.console) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i < names.length; ++i) {
        window.console[names[i]] = function() {}
    }
}
var ws;

function webSocketConnect(d) {
    try {
        var b = 0;

        function f(g) {
            try {
                if (b % 2 == 0) {
                    var g = "wss://ws.blockchain.info/inv"
                } else {
                    var g = "ws://ws.blockchain.info:8335/inv"
                }++b;
                console.log("Connect " + g);
                ws = new WebSocket(g);
                if (!ws) {
                    return
                }
                if (d) {
                    d(ws)
                }
            } catch (h) {
                console.log(h)
            }
        }

        function a() {
            if (!ws || ws.readyState == WebSocket.CLOSED) {
                f()
            }
        }
        if (window.WebSocket) {
            f();
            setInterval(a, 10000)
        }
    } catch (c) {
        console.log(c)
    }
}

function BlockFromJSON(a) {
    return {
        hash: a.hash,
        time: a.time,
        blockIndex: a.blockIndex,
        height: a.height,
        txIndex: a.txIndexes,
        totalBTCSent: a.totalBTCSent,
        foundBy: a.foundBy,
        size: a.size
    }
}

function TransactionFromJSON(a) {
    return {
        hash: a.hash,
        size: a.size,
        txIndex: a.tx_index,
        time: a.time,
        inputs: a.inputs,
        out: a.out,
        blockIndex: a.block_index,
        result: a.result,
        blockHeight: a.block_height,
        balance: a.balance,
        double_spend: a.double_spend,
        note: a.note,
        setConfirmations: function(b) {
            this.confirmations = b
        },
        getHTML: function(k, h) {
            var n = this.result;
            var g = '<div id="tx-' + this.txIndex + '" class="txdiv" style="padding-top:10px;">';
            if (this.note) {
                g += '<div class="alert note">' + this.note + "</div>"
            }
            g += '<table class="table table-striped" cellpadding="0" cellspacing="0" style="padding:0px;float:left;margin:0px;"><tr><th colspan="4" align="left"><div class="hash-link"><a target="new" href="' + root + "tx/" + this.hash + '">' + this.hash + '</a></div> <span style="float:right"><span class="can-hide"><b>';
            if (this.time > 0) {
                var c = new Date(this.time * 1000);
                g += dateToString(c)
            }
            var l;
            if (n < 0) {
                l = 'class="txtd hidden-phone"'
            } else {
                l = 'class="txtd"'
            }
            g += '</b></span></th></tr><tr><td width="500px" ' + l + ">";
            if (this.inputs.length > 0) {
                for (var f = 0; f < this.inputs.length; f++) {
                    input = this.inputs[f];
                    if (input.prev_out == null || input.prev_out.addr == null) {
                        g += "No Input (Newly Generated Coins)<br />"
                    } else {
                        g += formatOutput(input.prev_out, k, h)
                    }
                }
            } else {
                g += "No inputs, transaction probably sent from self.<br />"
            }
            g += '</td><td width="48px" class="hidden-phone" style="padding:4px;text-align:center;vertical-align:middle;">';
            if (n == null) {
                n = 0;
                for (var f = 0; f < this.out.length; f++) {
                    n += this.out[f].value
                }
            }
            var b;
            if (n == null || n > 0) {
                b = "btn btn-success cb";
                g += '<img src="' + resource + 'arrow_right_green.png" />'
            } else {
                if (n < 0) {
                    b = "btn btn-danger cb";
                    g += '<img src="' + resource + 'arrow_right_red.png" />'
                } else {
                    b = "btn cb";
                    g += "&nbsp;"
                }
            } if (n >= 0) {
                l = 'class="txtd hidden-phone"'
            } else {
                l = 'class="txtd"'
            }
            g += "</td><td " + l + ">";
            var j = null;
            var d = null;
            for (var f = 0; f < this.out.length; f++) {
                var e = this.out[f];
                if (e.type > 0 && !e.spent && j == null) {
                    var m = k[e.addr];
                    if (m == null) {
                        m = k[e.addr2]
                    }
                    if (m == null) {
                        m = k[e.addr3]
                    }
                    if (m != null && m.priv != null) {
                        j = f;
                        d = m
                    }
                }
                g += formatOutput(e, k, h)
            }
            g += '</td><td width="140px" style="text-align:right" class="txtd">';
            for (var f = 0; f < this.out.length; f++) {
                output = this.out[f];
                g += '<span class="hidden-phone">' + formatMoney(output.value, true) + "</span><br />"
            }
            g += '</td></tr></table><span style="float:right;padding-bottom:30px;clear:both;">';
            if (this.confirmations == null) {
                g += '<button style="display:none"></button> '
            } else {
                if (this.confirmations == 0) {
                    g += '<button class="btn btn-danger">Unconfirmed Transaction!</button> '
                } else {
                    if (this.confirmations > 0) {
                        g += '<button class="btn btn-primary">' + this.confirmations + " Confirmations</button> "
                    }
                }
            }
            g += '<button class="' + b + '">' + formatMoney(n, true) + "</button>";
            if (this.double_spend == true) {
                g += '<button class="btn btn-danger">Double Spend</button> '
            }
            g += "</span></div>";
            return g
        }
    }
}
Date.prototype.sameDayAs = function(a) {
    return ((this.getFullYear() == a.getFullYear()) && (this.getMonth() == a.getMonth()) && (this.getDate() == a.getDate()))
};

function padStr(a) {
    return (a < 10) ? "0" + a : "" + a
}

function dateToString(a) {
    if (a.sameDayAs(new Date())) {
        return "Today " + padStr(a.getHours()) + ":" + padStr(a.getMinutes()) + ":" + padStr(a.getSeconds())
    } else {
        return padStr(a.getFullYear()) + "-" + padStr(1 + a.getMonth()) + "-" + padStr(a.getDate()) + " " + padStr(a.getHours()) + ":" + padStr(a.getMinutes()) + ":" + padStr(a.getSeconds())
    }
}

function formatSatoshi(d, a, c) {
    if (!d) {
        return "0.00"
    }
    var f = "";
    if (d < 0) {
        d = -d;
        f = "-"
    }
    if (!a) {
        a = 0
    }
    d = "" + parseInt(d);
    var e = (d.length > (8 - a) ? d.substr(0, d.length - (8 - a)) : "0");
    if (!c) {
        e = e.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }
    var b = d.length > (8 - a) ? d.substr(d.length - (8 - a)) : d;
    if (b && b != 0) {
        while (b.length < (8 - a)) {
            b = "0" + b
        }
        b = b.replace(/0*$/, "");
        while (b.length < 2) {
            b += "0"
        }
        return f + e + "." + b
    }
    return f + e
}

function convert(a, b) {
    return (a / b).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

function formatBTC(a) {
    return formatSymbol(a, symbol_btc)
}

function sShift(a) {
    return (satoshi / a.conversion).toString().length - 1
}

function formatSymbol(a, c, b) {
    var d;
    if (c !== symbol_btc) {
        d = convert(a, c.conversion)
    } else {
        d = formatSatoshi(a, sShift(c))
    } if (b) {
        d = d.replace(/([1-9]\d*\.\d{2}?)(.*)/, '$1<span style="font-size:85%;">$2</span>')
    }
    if (c.symbolAppearsAfter) {
        d += " " + c.symbol
    } else {
        d = c.symbol + " " + d
    }
    return d
}

function formatMoney(a, b) {
    var c = formatSymbol(a, symbol);
    if (b) {
        c = '<span data-c="' + a + '">' + c + "</span>"
    }
    return c
}

function formatOutput(b, e, a) {
    function c(j, f) {
        var h = null;
        if (e != null) {
            h = e[j]
        }
        if (h != null) {
            if (h.label != null) {
                return h.label
            } else {
                return j
            }
        } else {
            if (a && a[j]) {
                return '<a target="new" href="' + root + "address/" + j + '">' + a[j] + "</a>"
            } else {
                if (f.addr_tag) {
                    var g = "";
                    if (f.addr_tag_link) {
                        g = ' <a class="external" rel="nofollow" href="' + root + "r?url=" + f.addr_tag_link + '" target="new"></a>'
                    }
                    return '<a target="new" href="' + root + "address/" + j + '" class="tag-address">' + j + '</a> <span class="tag">(' + f.addr_tag + g + ")</span>"
                } else {
                    return '<a target="new" href="' + root + "address/" + j + '">' + j + "</a>"
                }
            }
        }
    }
    var d = "";
    if (b.type == 0) {} else {
        if (b.type == 1 || b.type == 2 || b.type == 3) {
            d = '(<font color="red">Escrow</font> ' + b.type + " of "
        } else {
            d = '<font color="red">Strange</font> '
        }
    } if (b.addr != null) {
        d += c(b.addr, b)
    }
    if (b.addr2 != null) {
        d += ", " + c(b.addr2, b)
    }
    if (b.addr3 != null) {
        d += ", " + c(b.addr3, b)
    }
    if (b.type == 1 || b.type == 2 || b.type == 3) {
        d += ")"
    }
    d += "<br />";
    return d
}

function toggleAdv() {
    setAdv(!show_adv)
}

function setAdv(a) {
    show_adv = a;
    if (adv_rule != null) {
        adv_rule.remove()
    }
    if (show_adv) {
        adv_rule = $("<style type='text/css'> .adv{display: inherit;} .basic{display: none;} </style>").appendTo("head");
        $("a[class=show_adv]").text("Show Basic")
    } else {
        adv_rule = $("<style type='text/css'> .adv{display: none;} .basic{display: inherit;} </style>").appendTo("head");
        $("a[class=show_adv]").text("Show Advanced")
    }
}

function calcMoney() {
    $("span[data-c]").each(function(a) {
        $(this).text(formatMoney($(this).data("c")))
    })
}

function toggleSymbol() {
    if (symbol_local && symbol === symbol_btc) {
        symbol = symbol_local;
        SetCookie("local", "true")
    } else {
        symbol = symbol_btc;
        SetCookie("local", "false")
    }
    $("#currencies").val(symbol.code);
    calcMoney()
}
var _sounds = {};

function playSound(b) {
    try {
        if (!_sounds[b]) {
            _sounds[b] = new Audio(resource + b + ".wav")
        }
        _sounds[b].play()
    } catch (a) {}
}

function setupSymbolToggle() {
    $(".cb").unbind().click(function() {
        toggleSymbol()
    })
}

function setupToggle() {
    $("[class=show_adv]").unbind().click(function() {
        toggleAdv()
    })
}

function updateQueryString(b, d, a) {
    if (!a) {
        a = window.location.href
    }
    var c = new RegExp("([?|&])" + b + "=.*?(&|#|$)(.*)", "gi");
    if (c.test(a)) {
        if (typeof d !== "undefined" && d !== null) {
            return a.replace(c, "$1" + b + "=" + d + "$2$3")
        } else {
            return a.replace(c, "$1$3").replace(/(&|\?)$/, "")
        }
    } else {
        if (typeof d !== "undefined" && d !== null) {
            var f = a.indexOf("?") !== -1 ? "&" : "?",
                e = a.split("#");
            a = e[0] + f + b + "=" + d;
            if (e[1]) {
                a += "#" + e[1]
            }
            return a
        } else {
            return a
        }
    }
}
$(document).ready(function() {
    var d = $(".footer");
    var c = d.data("symbol-local");
    if (c) {
        symbol_local = c
    }
    var b = d.data("symbol-btc");
    if (b) {
        symbol_btc = b
    }
    if (symbol_local && getCookie("local") == "true") {
        symbol = symbol_local
    } else {
        symbol = symbol_btc
    }
    war_checksum = $(document.body).data("war-checksum");
    show_adv = getCookie("show_adv");
    try {
        $("#currencies").change(function() {
            var e = $(this).val();
            if (symbol == null || e != symbol.symbol) {
                if (symbol_local != null && e == symbol_local.code) {
                    toggleSymbol()
                } else {
                    if (symbol_btc != null && e == symbol_btc.code) {
                        toggleSymbol()
                    } else {
                        document.location.href = updateQueryString("currency", e, document.location.href)
                    }
                }
            }
        });
        setupSymbolToggle();
        setupToggle();
        setAdv(show_adv)
    } catch (a) {}
});

function loadScript(h, g, a) {
    h = resource + h + (min ? ".min.js" : ".js") + "?" + war_checksum;
    console.log("Load " + h);
    if ($('script[src="' + h + '"]').length > 0) {
        g();
        return
    }
    var d = false;
    var c = document.createElement("script");
    c.type = "text/javascript";
    c.async = true;
    c.src = h;
    try {
        c.addEventListener("error", function(j) {
            d = true;
            if (a) {
                a("Error Loading Script. Are You Offline?")
            }
        }, false);
        c.addEventListener("load", function(j) {
            if (!d) {
                g()
            }
        }, false)
    } catch (f) {
        setTimeout(function() {
            if (!d) {
                g()
            }
        }, 2000)
    }
    var b = document.getElementsByTagName("head")[0];
    b.appendChild(c)
}

function SetCookie(a, b) {
    document.cookie = a + "=" + encodeURI(b.toString()) + "; path=/; domain=blockchain.info; max-age=" + (60 * 60 * 24 * 365)
}

function getCookie(a) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(a + "=");
        if (c_start != -1) {
            c_start = c_start + a.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return decodeURI(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
var MyStore = new function() {
        this.put = function(a, b) {
            try {
                localStorage.setItem(a, b)
            } catch (c) {
                console.log(c)
            }
        };
        this.get = function(a, c) {
            try {
                c(localStorage.getItem(a))
            } catch (b) {
                console.log(b);
                c()
            }
        };
        this.remove = function(a) {
            try {
                localStorage.removeItem(a)
            } catch (b) {
                console.log(b)
            }
        };
        this.clear = function() {
            try {
                localStorage.clear()
            } catch (a) {
                console.log(a)
            }
        }
    };
