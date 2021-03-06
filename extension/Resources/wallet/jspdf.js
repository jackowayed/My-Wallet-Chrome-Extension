var jsPDF = (function() {
    if (typeof btoa === "undefined") {
        window.btoa = function(m) {
            var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                s = h.split(""),
                g, f, e, q, p, o, n, t, l = 0,
                u = 0,
                k = "",
                j = [],
                d;
            do {
                g = m.charCodeAt(l++);
                f = m.charCodeAt(l++);
                e = m.charCodeAt(l++);
                t = g << 16 | f << 8 | e;
                q = t >> 18 & 63;
                p = t >> 12 & 63;
                o = t >> 6 & 63;
                n = t & 63;
                j[u++] = s[q] + s[p] + s[o] + s[n]
            } while (l < m.length);
            k = j.join("");
            d = m.length % 3;
            return (d ? k.slice(0, d - 3) : k) + "===".slice(d || 3)
        }
    }
    if (typeof atob === "undefined") {
        window.atob = function(l) {
            var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                f, e, d, p, o, n, m, q, k = 0,
                r = 0,
                h = "",
                j = [];
            if (!l) {
                return l
            }
            l += "";
            do {
                p = g.indexOf(l.charAt(k++));
                o = g.indexOf(l.charAt(k++));
                n = g.indexOf(l.charAt(k++));
                m = g.indexOf(l.charAt(k++));
                q = p << 18 | o << 12 | n << 6 | m;
                f = q >> 16 & 255;
                e = q >> 8 & 255;
                d = q & 255;
                if (n === 64) {
                    j[r++] = String.fromCharCode(f)
                } else {
                    if (m === 64) {
                        j[r++] = String.fromCharCode(f, e)
                    } else {
                        j[r++] = String.fromCharCode(f, e, d)
                    }
                }
            } while (k < l.length);
            h = j.join("");
            return h
        }
    }
    var c = typeof Object.keys === "function" ? function(d) {
            return Object.keys(d).length
        } : function(d) {
            var f = 0,
                g;
            for (g in d) {
                if (d.hasOwnProperty(g)) {
                    f++
                }
            }
            return f
        }, a = function(d) {
            this.topics = {};
            this.context = d;
            this.publish = function(h, m) {
                if (this.topics[h]) {
                    var j = this.topics[h],
                        o = [],
                        n, g, e, f, k = function() {};
                    m = Array.prototype.slice.call(arguments, 1);
                    for (g = 0, e = j.length; g < e; g++) {
                        f = j[g];
                        n = f[0];
                        if (f[1]) {
                            f[0] = k;
                            o.push(g)
                        }
                        n.apply(this.context, m)
                    }
                    for (g = 0, e = o.length; g < e; g++) {
                        j.splice(o[g], 1)
                    }
                }
            };
            this.subscribe = function(e, g, f) {
                if (!this.topics[e]) {
                    this.topics[e] = [
                        [g, f]
                    ]
                } else {
                    this.topics[e].push([g, f])
                }
                return {
                    topic: e,
                    callback: g
                }
            };
            this.unsubscribe = function(h) {
                if (this.topics[h.topic]) {
                    var f = this.topics[h.topic],
                        g, e;
                    for (g = 0, e = f.length; g < e; g++) {
                        if (f[g][0] === h.callback) {
                            f.splice(g, 1)
                        }
                    }
                }
            }
        };

    function b(D, ad, L, U) {
        if (typeof D === "undefined") {
            D = "p"
        } else {
            D = D.toString().toLowerCase()
        } if (typeof ad === "undefined") {
            ad = "mm"
        }
        if (typeof L === "undefined") {
            L = "a4"
        }
        if (typeof U === "undefined" && typeof zpipe === "undefined") {
            U = false
        }
        var aq = L.toString().toLowerCase(),
            am = "20120619",
            s = [],
            E = 0,
            at = U,
            T = "1.3",
            M = {
                a3: [841.89, 1190.55],
                a4: [595.28, 841.89],
                a5: [420.94, 595.28],
                letter: [612, 792],
                legal: [612, 1008]
            }, ac = "0 g",
            G = "0 G",
            g = 0,
            f = [],
            m = 2,
            u = false,
            C = [],
            ag = {}, P = {}, ah = 16,
            d, y = 0.200025,
            A, B, ai, N = {
                title: "",
                subject: "",
                author: "",
                keywords: "",
                creator: ""
            }, Q = 0,
            S = 0,
            O = {}, F = new a(O),
            ae, ao, o = function(i) {
                return i.toFixed(2)
            }, n = function(i) {
                return i.toFixed(3)
            }, z = function(i) {
                var k = (i).toFixed(0);
                if (i < 10) {
                    return "0" + k
                } else {
                    return k
                }
            }, q = function(i) {
                var k = (i).toFixed(0);
                if (k.length < 10) {
                    return new Array(11 - k.length).join("0") + k
                } else {
                    return k
                }
            }, aa = function(i) {
                if (u) {
                    f[g].push(i)
                } else {
                    s.push(i);
                    E += i.length + 1
                }
            }, v = function() {
                m++;
                C[m] = E;
                aa(m + " 0 obj");
                return m
            }, J = function(i) {
                aa("stream");
                aa(i);
                aa("endstream")
            }, ak, R, an, aj, Z = function() {
                ak = B * ai;
                R = A * ai;
                var az, ay, k, au, av, ax, aw;
                for (az = 1; az <= g; az++) {
                    v();
                    aa("<</Type /Page");
                    aa("/Parent 1 0 R");
                    aa("/Resources 2 0 R");
                    aa("/Contents " + (m + 1) + " 0 R>>");
                    aa("endobj");
                    ay = f[az].join("\n");
                    v();
                    if (at) {
                        k = [];
                        for (av = 0; av < ay.length; ++av) {
                            k[av] = ay.charCodeAt(av)
                        }
                        aw = adler32cs.from(ay);
                        ax = new Deflater(6);
                        ax.append(new Uint8Array(k));
                        ay = ax.flush();
                        k = [new Uint8Array([120, 156]), new Uint8Array(ay), new Uint8Array([aw & 255, (aw >> 8) & 255, (aw >> 16) & 255, (aw >> 24) & 255])];
                        ay = "";
                        for (av in k) {
                            if (k.hasOwnProperty(av)) {
                                ay += String.fromCharCode.apply(null, k[av])
                            }
                        }
                        aa("<</Length " + ay.length + " /Filter [/FlateDecode]>>")
                    } else {
                        aa("<</Length " + ay.length + ">>")
                    }
                    J(ay);
                    aa("endobj")
                }
                C[1] = E;
                aa("1 0 obj");
                aa("<</Type /Pages");
                an = "/Kids [";
                for (av = 0; av < g; av++) {
                    an += (3 + 2 * av) + " 0 R "
                }
                aa(an + "]");
                aa("/Count " + g);
                aa("/MediaBox [0 0 " + o(ak) + " " + o(R) + "]");
                aa(">>");
                aa("endobj")
            }, W = function(i) {
                i.objectNumber = v();
                aa("<</BaseFont/" + i.PostScriptName + "/Type/Font");
                if (typeof i.encoding === "string") {
                    aa("/Encoding/" + i.encoding)
                }
                aa("/Subtype/Type1>>");
                aa("endobj")
            }, I = function() {
                var i;
                for (i in ag) {
                    if (ag.hasOwnProperty(i)) {
                        W(ag[i])
                    }
                }
            }, K = function() {
                F.publish("putXobjectDict")
            }, w = function() {
                aa("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]");
                aa("/Font <<");
                var i;
                for (i in ag) {
                    if (ag.hasOwnProperty(i)) {
                        aa("/" + i + " " + ag[i].objectNumber + " 0 R")
                    }
                }
                aa(">>");
                aa("/XObject <<");
                K();
                aa(">>")
            }, h = function() {
                I();
                F.publish("putResources");
                C[2] = E;
                aa("2 0 obj");
                aa("<<");
                w();
                aa(">>");
                aa("endobj");
                F.publish("postPutResources")
            }, l = function(au, k, av) {
                var i;
                if (P[k] === i) {
                    P[k] = {}
                }
                P[k][av] = au
            }, ar = {}, t = function(i, av, ax, au) {
                var aw = "F" + (c(ag) + 1).toString(10),
                    k = ag[aw] = {
                        id: aw,
                        PostScriptName: i,
                        fontName: av,
                        fontStyle: ax,
                        encoding: au,
                        metadata: {}
                    };
                l(aw, av, ax);
                F.publish("addFont", k);
                return aw
            }, e = function() {
                var k = "helvetica",
                    aD = "times",
                    aF = "courier",
                    aC = "normal",
                    aB = "bold",
                    aA = "italic",
                    aE = "bolditalic",
                    au = "StandardEncoding",
                    ax = [
                        ["Helvetica", k, aC],
                        ["Helvetica-Bold", k, aB],
                        ["Helvetica-Oblique", k, aA],
                        ["Helvetica-BoldOblique", k, aE],
                        ["Courier", aF, aC],
                        ["Courier-Bold", aF, aB],
                        ["Courier-Oblique", aF, aA],
                        ["Courier-BoldOblique", aF, aE],
                        ["Times-Roman", aD, aC],
                        ["Times-Bold", aD, aB],
                        ["Times-Italic", aD, aA],
                        ["Times-BoldItalic", aD, aE]
                    ],
                    az, av, ay, aw;
                for (az = 0, av = ax.length; az < av; az++) {
                    ay = t(ax[az][0], ax[az][1], ax[az][2], au);
                    aw = ax[az][0].split("-");
                    l(ay, aw[0], aw[1] || "")
                }
                F.publish("addFonts", {
                    fonts: ag,
                    dictionary: P
                })
            }, r = function(aE, av) {
                var aA, ay, ax, aw, aC, aB, au, aD, k, az;
                if (av === ax) {
                    av = {}
                }
                aw = av.sourceEncoding ? aw : "Unicode";
                aB = av.outputEncoding;
                if ((av.autoencode || aB) && ag[d].metadata && ag[d].metadata[aw] && ag[d].metadata[aw].encoding) {
                    aC = ag[d].metadata[aw].encoding;
                    if (!aB && ag[d].encoding) {
                        aB = ag[d].encoding
                    }
                    if (!aB && aC.codePages) {
                        aB = aC.codePages[0]
                    }
                    if (typeof aB === "string") {
                        aB = aC[aB]
                    }
                    if (aB) {
                        aD = false;
                        au = [];
                        for (aA = 0, ay = aE.length; aA < ay; aA++) {
                            k = aB[aE.charCodeAt(aA)];
                            if (k) {
                                au.push(String.fromCharCode(k))
                            } else {
                                au.push(aE[aA])
                            } if (au[aA].charCodeAt(0) >> 8) {
                                aD = true
                            }
                        }
                        aE = au.join("")
                    }
                }
                aA = aE.length;
                while (aD === ax && aA !== 0) {
                    if (aE.charCodeAt(aA - 1) >> 8) {
                        aD = true
                    }
                    aA--
                }
                if (!aD) {
                    return aE
                } else {
                    au = av.noBOM ? [] : [254, 255];
                    for (aA = 0, ay = aE.length; aA < ay; aA++) {
                        k = aE.charCodeAt(aA);
                        az = k >> 8;
                        if (az >> 8) {
                            throw new Error("Character at position " + aA.toString(10) + " of string '" + aE + "' exceeds 16bits. Cannot be encoded into UCS-2 BE")
                        }
                        au.push(az);
                        au.push(k - (az << 8))
                    }
                    return String.fromCharCode.apply(ax, au)
                }
            }, Y = function(k, i) {
                return r(k, i).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")
            }, X = function() {
                aa("/Producer (jsPDF " + am + ")");
                if (N.title) {
                    aa("/Title (" + Y(N.title) + ")")
                }
                if (N.subject) {
                    aa("/Subject (" + Y(N.subject) + ")")
                }
                if (N.author) {
                    aa("/Author (" + Y(N.author) + ")")
                }
                if (N.keywords) {
                    aa("/Keywords (" + Y(N.keywords) + ")")
                }
                if (N.creator) {
                    aa("/Creator (" + Y(N.creator) + ")")
                }
                var i = new Date();
                aa("/CreationDate (D:" + [i.getFullYear(), z(i.getMonth() + 1), z(i.getDate()), z(i.getHours()), z(i.getMinutes()), z(i.getSeconds())].join("") + ")")
            }, V = function() {
                aa("/Type /Catalog");
                aa("/Pages 1 0 R");
                aa("/OpenAction [3 0 R /FitH null]");
                aa("/PageLayout /OneColumn");
                F.publish("putCatalog")
            }, j = function() {
                aa("/Size " + (m + 1));
                aa("/Root " + m + " 0 R");
                aa("/Info " + (m - 1) + " 0 R")
            }, ap = function() {
                g++;
                u = true;
                f[g] = []
            }, af = function() {
                ap();
                aa(o(y * ai) + " w");
                aa(G);
                if (Q !== 0) {
                    aa(Q.toString(10) + " J")
                }
                if (S !== 0) {
                    aa(S.toString(10) + " j")
                }
                F.publish("addPage", {
                    pageNumber: g
                })
            }, x = function(au, aw) {
                var i, k;
                if (au === k) {
                    au = ag[d].fontName
                }
                if (aw === k) {
                    aw = ag[d].fontStyle
                }
                try {
                    i = P[au][aw]
                } catch (av) {
                    i = k
                }
                if (!i) {
                    throw new Error("Unable to look up font label for font '" + au + "', '" + aw + "'. Refer to getFontList() for available fonts.")
                }
                return i
            }, p = function() {
                u = false;
                s = [];
                C = [];
                aa("%PDF-" + T);
                Z();
                h();
                v();
                aa("<<");
                X();
                aa(">>");
                aa("endobj");
                v();
                aa("<<");
                V();
                aa(">>");
                aa("endobj");
                var au = E,
                    k;
                aa("xref");
                aa("0 " + (m + 1));
                aa("0000000000 65535 f ");
                for (k = 1; k <= m; k++) {
                    aa(q(C[k]) + " 00000 n ")
                }
                aa("trailer");
                aa("<<");
                j();
                aa(">>");
                aa("startxref");
                aa(au);
                aa("%%EOF");
                u = true;
                return s.join("\n")
            }, ab = function(i) {
                var k = "S";
                if (i === "F") {
                    k = "f"
                } else {
                    if (i === "FD" || i === "DF") {
                        k = "B"
                    }
                }
                return k
            }, H = function(ax, au) {
                var aw, az, ay, aA, av, k;
                switch (ax) {
                    case aw:
                        return p();
                    case "save":
                        if (navigator.getUserMedia) {
                            if (window.URL === undefined) {
                                return O.output("dataurlnewwindow")
                            } else {
                                if (window.URL.createObjectURL === undefined) {
                                    return O.output("dataurlnewwindow")
                                }
                            }
                        }
                        az = p();
                        ay = az.length;
                        aA = new Uint8Array(new ArrayBuffer(ay));
                        for (av = 0; av < ay; av++) {
                            aA[av] = az.charCodeAt(av)
                        }
                        k = new Blob([aA], {
                            type: "application/pdf"
                        });
                        saveAs(k, au);
                        break;
                    case "datauristring":
                    case "dataurlstring":
                        return "data:application/pdf;base64," + btoa(p());
                    case "datauri":
                    case "dataurl":
                        document.location.href = "data:application/pdf;base64," + btoa(p());
                        break;
                    case "dataurlnewwindow":
                        return window.open("data:application/pdf;base64," + btoa(p()));
                        break;
                    default:
                        throw new Error('Output type "' + ax + '" is not supported.')
                }
            };
        if (ad === "pt") {
            ai = 1
        } else {
            if (ad === "mm") {
                ai = 72 / 25.4
            } else {
                if (ad === "cm") {
                    ai = 72 / 2.54
                } else {
                    if (ad === "in") {
                        ai = 72
                    } else {
                        throw ("Invalid unit: " + ad)
                    }
                }
            }
        } if (M.hasOwnProperty(aq)) {
            A = M[aq][1] / ai;
            B = M[aq][0] / ai
        } else {
            try {
                A = L[1];
                B = L[0]
            } catch (al) {
                throw ("Invalid format: " + L)
            }
        } if (D === "p" || D === "portrait") {
            D = "p";
            if (B > A) {
                ae = B;
                B = A;
                A = ae
            }
        } else {
            if (D === "l" || D === "landscape") {
                D = "l";
                if (A > B) {
                    ae = B;
                    B = A;
                    A = ae
                }
            } else {
                throw ("Invalid orientation: " + D)
            }
        }
        O.internal = {
            pdfEscape: Y,
            getStyle: ab,
            getFont: function() {
                return ag[x.apply(O, arguments)]
            },
            getFontSize: function() {
                return ah
            },
            btoa: btoa,
            write: function(i, av, au, k) {
                aa(arguments.length === 1 ? i : Array.prototype.join.call(arguments, " "))
            },
            getCoordinateString: function(i) {
                return o(i * ai)
            },
            getVerticalCoordinateString: function(i) {
                return o((A - i) * ai)
            },
            collections: {},
            newObject: v,
            putStream: J,
            events: F,
            scaleFactor: ai,
            pageSize: {
                width: B,
                height: A
            },
            output: function(k, i) {
                return H(k, i)
            }
        };
        O.addPage = function() {
            af();
            return this
        };
        O.text = function(aD, aC, aA, au) {
            var av, ay, ax, aB, k, az, aw;
            if (typeof aD === "number") {
                ay = aA;
                ax = aD;
                aB = aC;
                aD = ay;
                aC = ax;
                aA = aB
            }
            if (typeof aD === "string" && aD.match(/[\n\r]/)) {
                aD = aD.split(/\r\n|\r|\n/g)
            }
            if (typeof au === "undefined") {
                au = {
                    noBOM: true,
                    autoencode: true
                }
            } else {
                if (au.noBOM === av) {
                    au.noBOM = true
                }
                if (au.autoencode === av) {
                    au.autoencode = true
                }
            } if (typeof aD === "string") {
                az = Y(aD, au)
            } else {
                if (aD instanceof Array) {
                    k = aD.concat();
                    for (aw = k.length - 1; aw !== -1; aw--) {
                        k[aw] = Y(k[aw], au)
                    }
                    az = k.join(") Tj\nT* (")
                } else {
                    throw new Error('Type of text must be string or Array. "' + aD + '" is not recognized.')
                }
            }
            aa("BT\n/" + d + " " + ah + " Tf\n" + ah + " TL\n" + ac + "\n" + o(aC * ai) + " " + o((A - aA) * ai) + " Td\n(" + az + ") Tj\nET");
            return this
        };
        O.line = function(k, av, i, au) {
            aa(o(k * ai) + " " + o((A - av) * ai) + " m " + o(i * ai) + " " + o((A - au) * ai) + " l S");
            return this
        };
        O.lines = function(k, aD, aC, aM, aI) {
            var aw, aK, aA, aB, az, ay, aG, aE, aL, aJ, ax, aH, av, aF, au;
            if (typeof k === "number") {
                aK = aC;
                aA = k;
                aB = aD;
                k = aK;
                aD = aA;
                aC = aB
            }
            aI = ab(aI);
            aM = aM === aw ? [1, 1] : aM;
            aa(n(aD * ai) + " " + n((A - aC) * ai) + " m ");
            az = aM[0];
            ay = aM[1];
            aE = k.length;
            aF = aD;
            au = aC;
            for (aG = 0; aG < aE; aG++) {
                aL = k[aG];
                if (aL.length === 2) {
                    aF = aL[0] * az + aF;
                    au = aL[1] * ay + au;
                    aa(n(aF * ai) + " " + n((A - au) * ai) + " l")
                } else {
                    aJ = aL[0] * az + aF;
                    ax = aL[1] * ay + au;
                    aH = aL[2] * az + aF;
                    av = aL[3] * ay + au;
                    aF = aL[4] * az + aF;
                    au = aL[5] * ay + au;
                    aa(n(aJ * ai) + " " + n((A - ax) * ai) + " " + n(aH * ai) + " " + n((A - av) * ai) + " " + n(aF * ai) + " " + n((A - au) * ai) + " c")
                }
            }
            aa(aI);
            return this
        };
        O.rect = function(i, ax, k, av, au) {
            var aw = ab(au);
            aa([o(i * ai), o((A - ax) * ai), o(k * ai), o(-av * ai), "re", aw].join(" "));
            return this
        };
        O.triangle = function(av, ay, k, aw, i, au, ax) {
            this.lines([
                [k - av, aw - ay],
                [i - k, au - aw],
                [av - i, ay - au]
            ], av, ay, [1, 1], ax);
            return this
        };
        O.roundedRect = function(k, az, au, aw, ay, ax, av) {
            var i = 4 / 3 * (Math.SQRT2 - 1);
            this.lines([
                [(au - 2 * ay), 0],
                [(ay * i), 0, ay, ax - (ax * i), ay, ax],
                [0, (aw - 2 * ax)],
                [0, (ax * i), -(ay * i), ax, -ay, ax],
                [(-au + 2 * ay), 0],
                [-(ay * i), 0, -ay, -(ax * i), -ay, -ax],
                [0, (-aw + 2 * ax)],
                [0, -(ax * i), (ay * i), -ax, ay, -ax]
            ], k + ay, az, [1, 1], av);
            return this
        };
        O.ellipse = function(i, az, ax, aw, k) {
            var ay = ab(k),
                av = 4 / 3 * (Math.SQRT2 - 1) * ax,
                au = 4 / 3 * (Math.SQRT2 - 1) * aw;
            aa([o((i + ax) * ai), o((A - az) * ai), "m", o((i + ax) * ai), o((A - (az - au)) * ai), o((i + av) * ai), o((A - (az - aw)) * ai), o(i * ai), o((A - (az - aw)) * ai), "c"].join(" "));
            aa([o((i - av) * ai), o((A - (az - aw)) * ai), o((i - ax) * ai), o((A - (az - au)) * ai), o((i - ax) * ai), o((A - az) * ai), "c"].join(" "));
            aa([o((i - ax) * ai), o((A - (az + au)) * ai), o((i - av) * ai), o((A - (az + aw)) * ai), o(i * ai), o((A - (az + aw)) * ai), "c"].join(" "));
            aa([o((i + av) * ai), o((A - (az + aw)) * ai), o((i + ax) * ai), o((A - (az + au)) * ai), o((i + ax) * ai), o((A - az) * ai), "c", ay].join(" "));
            return this
        };
        O.circle = function(i, av, au, k) {
            return this.ellipse(i, av, au, au, k)
        };
        O.setProperties = function(i) {
            var k;
            for (k in N) {
                if (N.hasOwnProperty(k) && i[k]) {
                    N[k] = i[k]
                }
            }
            return this
        };
        O.setFontSize = function(i) {
            ah = i;
            return this
        };
        O.setFont = function(i, k) {
            d = x(i, k);
            return this
        };
        O.setFontStyle = O.setFontType = function(k) {
            var i;
            d = x(i, k);
            return this
        };
        O.getFontList = function() {
            var au = {}, k, av, i;
            for (k in P) {
                if (P.hasOwnProperty(k)) {
                    au[k] = i = [];
                    for (av in P[k]) {
                        if (P[k].hasOwnProperty(av)) {
                            i.push(av)
                        }
                    }
                }
            }
            return au
        };
        O.setLineWidth = function(i) {
            aa((i * ai).toFixed(2) + " w");
            return this
        };
        O.setDrawColor = function(aw, av, au, i) {
            var k;
            if (av === undefined || (i === undefined && aw === av === au)) {
                if (typeof aw === "string") {
                    k = aw + " G"
                } else {
                    k = o(aw / 255) + " G"
                }
            } else {
                if (i === undefined) {
                    if (typeof aw === "string") {
                        k = [aw, av, au, "RG"].join(" ")
                    } else {
                        k = [o(aw / 255), o(av / 255), o(au / 255), "RG"].join(" ")
                    }
                } else {
                    if (typeof aw === "string") {
                        k = [aw, av, au, i, "K"].join(" ")
                    } else {
                        k = [o(aw), o(av), o(au), o(i), "K"].join(" ")
                    }
                }
            }
            aa(k);
            return this
        };
        O.setFillColor = function(aw, av, au, i) {
            var k;
            if (av === undefined || (i === undefined && aw === av === au)) {
                if (typeof aw === "string") {
                    k = aw + " g"
                } else {
                    k = o(aw / 255) + " g"
                }
            } else {
                if (i === undefined) {
                    if (typeof aw === "string") {
                        k = [aw, av, au, "rg"].join(" ")
                    } else {
                        k = [o(aw / 255), o(av / 255), o(au / 255), "rg"].join(" ")
                    }
                } else {
                    if (typeof aw === "string") {
                        k = [aw, av, au, i, "k"].join(" ")
                    } else {
                        k = [o(aw), o(av), o(au), o(i), "k"].join(" ")
                    }
                }
            }
            aa(k);
            return this
        };
        O.setTextColor = function(au, k, i) {
            if ((au === 0 && k === 0 && i === 0) || (typeof k === "undefined")) {
                ac = n(au / 255) + " g"
            } else {
                ac = [n(au / 255), n(k / 255), n(i / 255), "rg"].join(" ")
            }
            return this
        };
        O.CapJoinStyles = {
            0: 0,
            butt: 0,
            but: 0,
            bevel: 0,
            1: 1,
            round: 1,
            rounded: 1,
            circle: 1,
            2: 2,
            projecting: 2,
            project: 2,
            square: 2,
            milter: 2
        };
        O.setLineCap = function(i) {
            var k = this.CapJoinStyles[i];
            if (k === undefined) {
                throw new Error("Line cap style of '" + i + "' is not recognized. See or extend .CapJoinStyles property for valid styles")
            }
            Q = k;
            aa(k.toString(10) + " J");
            return this
        };
        O.setLineJoin = function(i) {
            var k = this.CapJoinStyles[i];
            if (k === undefined) {
                throw new Error("Line join style of '" + i + "' is not recognized. See or extend .CapJoinStyles property for valid styles")
            }
            S = k;
            aa(k.toString(10) + " j");
            return this
        };
        O.output = H;
        O.save = function(i) {
            O.output("save", i)
        };
        for (ao in b.API) {
            if (b.API.hasOwnProperty(ao)) {
                if (ao === "events" && b.API.events.length) {
                    (function(av, ax) {
                        var aw, au, k;
                        for (k = ax.length - 1; k !== -1; k--) {
                            aw = ax[k][0];
                            au = ax[k][1];
                            av.subscribe.apply(av, [aw].concat(typeof au === "function" ? [au] : au))
                        }
                    }(F, b.API.events))
                } else {
                    O[ao] = b.API[ao]
                }
            }
        }
        e();
        d = "F1";
        af();
        F.publish("initialized");
        return O
    }
    b.API = {
        events: []
    };
    return b
}());
(function(f) {
    var c = "addImage_";
    var e = function(m) {
        var l, h;
        if (!m.charCodeAt(0) === 255 || !m.charCodeAt(1) === 216 || !m.charCodeAt(2) === 255 || !m.charCodeAt(3) === 224 || !m.charCodeAt(6) === "J".charCodeAt(0) || !m.charCodeAt(7) === "F".charCodeAt(0) || !m.charCodeAt(8) === "I".charCodeAt(0) || !m.charCodeAt(9) === "F".charCodeAt(0) || !m.charCodeAt(10) === 0) {
            throw new Error("getJpegSize requires a binary jpeg file")
        }
        var j = m.charCodeAt(4) * 256 + m.charCodeAt(5);
        var k = 4,
            g = m.length;
        while (k < g) {
            k += j;
            if (m.charCodeAt(k) !== 255) {
                throw new Error("getJpegSize could not find the size of the image")
            }
            if (m.charCodeAt(k + 1) === 192) {
                h = m.charCodeAt(k + 5) * 256 + m.charCodeAt(k + 6);
                l = m.charCodeAt(k + 7) * 256 + m.charCodeAt(k + 8);
                return [l, h]
            } else {
                k += 2;
                j = m.charCodeAt(k) * 256 + m.charCodeAt(k + 1)
            }
        }
    }, b = function(g) {
            var m = this.internal.newObject(),
                h = this.internal.write,
                l = this.internal.putStream;
            g.n = m;
            h("<</Type /XObject");
            h("/Subtype /Image");
            h("/Width " + g.w);
            h("/Height " + g.h);
            if (g.cs === "Indexed") {
                h("/ColorSpace [/Indexed /DeviceRGB " + (g.pal.length / 3 - 1) + " " + (m + 1) + " 0 R]")
            } else {
                h("/ColorSpace /" + g.cs);
                if (g.cs === "DeviceCMYK") {
                    h("/Decode [1 0 1 0 1 0 1 0]")
                }
            }
            h("/BitsPerComponent " + g.bpc);
            if ("f" in g) {
                h("/Filter /" + g.f)
            }
            if ("dp" in g) {
                h("/DecodeParms <<" + g.dp + ">>")
            }
            if ("trns" in g && g.trns.constructor == Array) {
                var k = "";
                for (var j = 0; j < g.trns.length; j++) {
                    k += (g[k][j] + " " + g.trns[j] + " ");
                    h("/Mask [" + k + "]")
                }
            }
            if ("smask" in g) {
                h("/SMask " + (m + 1) + " 0 R")
            }
            h("/Length " + g.data.length + ">>");
            l(g.data);
            h("endobj")
        }, d = function() {
            var g = this.internal.collections[c + "images"];
            for (var h in g) {
                b.call(this, g[h])
            }
        }, a = function() {
            var g = this.internal.collections[c + "images"],
                h = this.internal.write,
                k;
            for (var j in g) {
                k = g[j];
                h("/I" + k.i, k.n, "0", "R")
            }
        };
    f.addImage = function(g, s, q, p, t, l) {
        if (typeof g === "object" && g.nodeType === 1) {
            var j = document.createElement("canvas");
            j.width = g.clientWidth;
            j.height = g.clientHeight;
            var u = j.getContext("2d");
            if (!u) {
                throw ("addImage requires canvas to be supported by browser.")
            }
            u.drawImage(g, 0, 0, j.width, j.height);
            g = j.toDataURL("image/jpeg");
            s = "JPEG"
        }
        if (s.toUpperCase() !== "JPEG") {
            throw new Error("addImage currently only supports format 'JPEG', not '" + s + "'")
        }
        var i, n = this.internal.collections[c + "images"],
            m = this.internal.getCoordinateString,
            o = this.internal.getVerticalCoordinateString;
        if (g.substring(0, 23) === "data:image/jpeg;base64,") {
            g = atob(g.replace("data:image/jpeg;base64,", ""))
        }
        if (n) {
            i = Object.keys ? Object.keys(n).length : (function(w) {
                var h = 0;
                for (var v in w) {
                    if (w.hasOwnProperty(v)) {
                        h++
                    }
                }
                return h
            })(n)
        } else {
            i = 0;
            this.internal.collections[c + "images"] = n = {};
            this.internal.events.subscribe("putResources", d);
            this.internal.events.subscribe("putXobjectDict", a)
        }
        var r = e(g);
        var k = {
            w: r[0],
            h: r[1],
            cs: "DeviceRGB",
            bpc: 8,
            f: "DCTDecode",
            i: i,
            data: g
        };
        n[i] = k;
        if (!t && !l) {
            t = -96;
            l = -96
        }
        if (t < 0) {
            t = (-1) * k.w * 72 / t / this.internal.scaleFactor
        }
        if (l < 0) {
            l = (-1) * k.h * 72 / l / this.internal.scaleFactor
        }
        if (t === 0) {
            t = l * k.w / k.h
        }
        if (l === 0) {
            l = t * k.h / k.w
        }
        this.internal.write("q", m(t), "0 0", m(l), m(q), o(p + l), "cm /I" + k.i, "Do Q");
        return this
    }
})(jsPDF.API);
(function(k) {
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, "")
        }
    }
    if (!String.prototype.trimLeft) {
        String.prototype.trimLeft = function() {
            return this.replace(/^\s+/g, "")
        }
    }
    if (!String.prototype.trimRight) {
        String.prototype.trimRight = function() {
            return this.replace(/\s+$/g, "")
        }
    }

    function i(v) {
        var p = 0,
            n = v.length,
            o, u = false,
            s = false;
        while (!u && p !== n) {
            o = v[p] = v[p].trimLeft();
            if (o) {
                u = true
            }
            p++
        }
        p = n - 1;
        while (n && !s && p !== -1) {
            o = v[p] = v[p].trimRight();
            if (o) {
                s = true
            }
            p--
        }
        var q = /\s+$/g,
            t = true;
        for (p = 0; p !== n; p++) {
            o = v[p].replace(/\s+/g, " ");
            if (t) {
                o = o.trimLeft()
            }
            if (o) {
                t = q.test(o)
            }
            v[p] = o
        }
        return v
    }

    function d(o, n, q, p) {
        this.pdf = o;
        this.x = n;
        this.y = q;
        this.settings = p;
        this.init();
        return this
    }
    d.prototype.init = function() {
        this.paragraph = {
            text: [],
            style: []
        };
        this.pdf.internal.write("q")
    };
    d.prototype.dispose = function() {
        this.pdf.internal.write("Q");
        return {
            x: this.x,
            y: this.y
        }
    };
    d.prototype.splitFragmentsIntoLines = function(x, B) {
        var r = 12,
            s = this.pdf.internal.scaleFactor,
            n = {}, q, t, o, v, p, z, A, u, D = [],
            C = [D],
            w = 0,
            y = this.settings.width;
        while (x.length) {
            v = x.shift();
            p = B.shift();
            if (v) {
                q = p["font-family"];
                t = p["font-style"];
                o = n[q + t];
                if (!o) {
                    o = this.pdf.internal.getFont(q, t).metadata.Unicode;
                    n[q + t] = o
                }
                z = {
                    widths: o.widths,
                    kerning: o.kerning,
                    fontSize: p["font-size"] * r,
                    textIndent: w
                };
                A = this.pdf.getStringUnitWidth(v, z) * z.fontSize / s;
                if (w + A > y) {
                    u = this.pdf.splitTextToSize(v, y, z);
                    D.push([u.shift(), p]);
                    while (u.length) {
                        D = [
                            [u.shift(), p]
                        ];
                        C.push(D)
                    }
                    w = this.pdf.getStringUnitWidth(D[0][0], z) * z.fontSize / s
                } else {
                    D.push([v, p]);
                    w += A
                }
            }
        }
        return C
    };
    d.prototype.RenderTextFragment = function(q, o) {
        var p = 12,
            n = this.pdf.internal.getFont(o["font-family"], o["font-style"]);
        this.pdf.internal.write("/" + n.id, (p * o["font-size"]).toFixed(2), "Tf", "(" + this.pdf.internal.pdfEscape(q) + ") Tj")
    };
    d.prototype.renderParagraph = function() {
        var w = i(this.paragraph.text),
            y = this.paragraph.style,
            v = this.paragraph.blockstyle,
            t = this.paragraph.blockstyle || {};
        this.paragraph = {
            text: [],
            style: [],
            blockstyle: {},
            priorblockstyle: v
        };
        if (!w.join("").trim()) {
            return
        }
        var z = this.splitFragmentsIntoLines(w, y),
            A, u, n = 12,
            s = n / this.pdf.internal.scaleFactor,
            x = (Math.max((v["margin-top"] || 0) - (t["margin-bottom"] || 0), 0) + (v["padding-top"] || 0)) * s,
            r = ((v["margin-bottom"] || 0) + (v["padding-bottom"] || 0)) * s,
            p = this.pdf.internal.write,
            q, o;
        this.y += x;
        p("q", "BT", this.pdf.internal.getCoordinateString(this.x), this.pdf.internal.getVerticalCoordinateString(this.y), "Td");
        while (z.length) {
            A = z.shift();
            u = 0;
            for (q = 0, o = A.length; q !== o; q++) {
                if (A[q][0].trim()) {
                    u = Math.max(u, A[q][1]["line-height"], A[q][1]["font-size"])
                }
            }
            p(0, (-1 * n * u).toFixed(2), "Td");
            for (q = 0, o = A.length; q !== o; q++) {
                if (A[q][0]) {
                    this.RenderTextFragment(A[q][0], A[q][1])
                }
            }
            this.y += u * s
        }
        p("ET", "Q");
        this.y += r
    };
    d.prototype.setBlockBoundary = function() {
        this.renderParagraph()
    };
    d.prototype.setBlockStyle = function(n) {
        this.paragraph.blockstyle = n
    };
    d.prototype.addText = function(o, n) {
        this.paragraph.text.push(o);
        this.paragraph.style.push(n)
    };
    var g = {
        helvetica: "helvetica",
        "sans-serif": "helvetica",
        serif: "times",
        times: "times",
        "times new roman": "times",
        monospace: "courier",
        courier: "courier"
    }, c = {
            "100": "normal",
            "200": "normal",
            "300": "normal",
            "400": "normal",
            "500": "bold",
            "600": "bold",
            "700": "bold",
            "800": "bold",
            "900": "bold",
            normal: "normal",
            bold: "bold",
            bolder: "bold",
            lighter: "normal"
        }, m = {
            normal: "normal",
            italic: "italic",
            oblique: "italic"
        }, a = {
            normal: 1
        };

    function e(n) {
        var p, q = n.split(","),
            o = q.shift();
        while (!p && o) {
            p = g[o.trim().toLowerCase()];
            o = q.shift()
        }
        return p
    }

    function f(n) {
        var o, q = 16,
            p = a[n];
        if (p) {
            return p
        }
        p = ({
            "xx-small": 9,
            "x-small": 11,
            small: 13,
            medium: 16,
            large: 19,
            "x-large": 23,
            "xx-large": 28,
            auto: 0
        })[n];
        if (p !== o) {
            return a[n] = p / q
        }
        if (p = parseFloat(n)) {
            return a[n] = p / q
        }
        p = n.match(/([\d\.]+)(px)/);
        if (p.length === 3) {
            return a[n] = parseFloat(p[1]) / q
        }
        return a[n] = 1
    }

    function h(q) {
        var n = $(q),
            p = {}, o;
        p["font-family"] = e(n.css("font-family")) || "times";
        p["font-style"] = m[n.css("font-style")] || "normal";
        o = c[n.css("font-weight")] || "normal";
        if (o === "bold") {
            if (p["font-style"] === "normal") {
                p["font-style"] = o
            } else {
                p["font-style"] = o + p["font-style"]
            }
        }
        p["font-size"] = f(n.css("font-size")) || 1;
        p["line-height"] = f(n.css("line-height")) || 1;
        p.display = n.css("display") === "inline" ? "inline" : "block";
        if (p.display === "block") {
            p["margin-top"] = f(n.css("margin-top")) || 0;
            p["margin-bottom"] = f(n.css("margin-bottom")) || 0;
            p["padding-top"] = f(n.css("padding-top")) || 0;
            p["padding-bottom"] = f(n.css("padding-bottom")) || 0
        }
        return p
    }

    function j(s, u, v) {
        var r = false;
        var q, n, p, o = v["#" + s.id];
        if (o) {
            if (typeof o === "function") {
                r = o(s, u)
            } else {
                q = 0;
                n = o.length;
                while (!r && q !== n) {
                    r = o[q](s, u);
                    q++
                }
            }
        }
        o = v[s.nodeName];
        if (!r && o) {
            if (typeof o === "function") {
                r = o(s, u)
            } else {
                q = 0;
                n = o.length;
                while (!r && q !== n) {
                    r = o[q](s, u);
                    q++
                }
            }
        }
        return r
    }

    function l(r, t, n) {
        var o = r.childNodes,
            u, v = h(r),
            p = v.display === "block";
        if (p) {
            t.setBlockBoundary();
            t.setBlockStyle(v)
        }
        for (var s = 0, q = o.length; s < q; s++) {
            u = o[s];
            if (typeof u === "object") {
                if (u.nodeType === 1 && u.nodeName != "SCRIPT") {
                    if (!j(u, t, n)) {
                        l(u, t, n)
                    }
                } else {
                    if (u.nodeType === 3) {
                        t.addText(u.nodeValue, v)
                    }
                }
            } else {
                if (typeof u === "string") {
                    t.addText(u, v)
                }
            }
        }
        if (p) {
            t.setBlockBoundary()
        }
    }

    function b(p, q, n, u, s) {
        if (typeof q === "string") {
            q = (function(w) {
                var v = "jsPDFhtmlText" + Date.now().toString() + (Math.random() * 1000).toFixed(0),
                    r = "position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;",
                    x = $('<div style="' + r + '"><iframe style="height:1px;width:1px" name="' + v + '" /></div>').appendTo(document.body),
                    y = window.frames[v];
                return $(y.document.body).html(w)[0]
            })(q)
        }
        var t = new d(p, n, u, s),
            o = l(q, t, s.elementHandlers);
        return t.dispose()
    }
    k.fromHTML = function(p, n, q, o) {
        return b(this, p, n, q, o)
    }
})(jsPDF.API);
(function(a) {
    a.addSVG = function(c, m, k, n, s) {
        var b;
        if (m === b || m === b) {
            throw new Error("addSVG needs values for 'x' and 'y'")
        }

        function u(l, h) {
            var i = h.createElement("style");
            i.type = "text/css";
            if (i.styleSheet) {
                i.styleSheet.cssText = l
            } else {
                i.appendChild(h.createTextNode(l))
            }
            h.getElementsByTagName("head")[0].appendChild(i)
        }

        function e(h) {
            var i = "childframe",
                l = h.createElement("iframe");
            u(".jsPDF_sillysvg_iframe {display:none;position:absolute;}", h);
            l.name = i;
            l.setAttribute("width", 0);
            l.setAttribute("height", 0);
            l.setAttribute("frameborder", "0");
            l.setAttribute("scrolling", "no");
            l.setAttribute("seamless", "seamless");
            l.setAttribute("class", "jsPDF_sillysvg_iframe");
            h.body.appendChild(l);
            return l
        }

        function o(h, l) {
            var i = (l.contentWindow || l.contentDocument).document;
            i.write(h);
            i.close();
            return i.getElementsByTagName("svg")[0]
        }

        function j(B) {
            var l = parseFloat(B[1]),
                C = parseFloat(B[2]),
                w = [],
                i = 3,
                h = B.length;
            while (i < h) {
                if (B[i] === "c") {
                    w.push([parseFloat(B[i + 1]), parseFloat(B[i + 2]), parseFloat(B[i + 3]), parseFloat(B[i + 4]), parseFloat(B[i + 5]), parseFloat(B[i + 6])]);
                    i += 7
                } else {
                    if (B[i] === "l") {
                        w.push([parseFloat(B[i + 1]), parseFloat(B[i + 2])]);
                        i += 3
                    } else {
                        i += 1
                    }
                }
            }
            return [l, C, w]
        }
        var z = e(document),
            g = o(c, z),
            A = [1, 1],
            v = parseFloat(g.getAttribute("width")),
            f = parseFloat(g.getAttribute("height"));
        if (v && f) {
            if (n && s) {
                A = [n / v, s / f]
            } else {
                if (n) {
                    A = [n / v, n / v]
                } else {
                    if (s) {
                        A = [s / f, s / f]
                    }
                }
            }
        }
        var r, q, t, d, p = g.childNodes;
        for (r = 0, q = p.length; r < q; r++) {
            t = p[r];
            if (t.tagName && t.tagName.toUpperCase() === "PATH") {
                d = j(t.getAttribute("d").split(" "));
                d[0] = d[0] * A[0] + m;
                d[1] = d[1] * A[1] + k;
                this.lines.call(this, d[2], d[0], d[1], A)
            }
        }
        return this
    }
})(jsPDF.API);
(function(c) {
    var b = c.getCharWidthsArray = function(s, u) {
        if (!u) {
            u = {}
        }
        var h = u.widths ? u.widths : this.internal.getFont().metadata.Unicode.widths,
            r = h.fof ? h.fof : 1,
            n = u.kerning ? u.kerning : this.internal.getFont().metadata.Unicode.kerning,
            p = n.fof ? n.fof : 1;
        var m, j, o, k, q = 0,
            t = h[0] || r,
            g = [];
        for (m = 0, j = s.length; m < j; m++) {
            o = s.charCodeAt(m);
            g.push((h[o] || t) / r + (n[o] && n[o][q] || 0) / p);
            q = o
        }
        return g
    };
    var e = function(j) {
        var h = j.length,
            g = 0;
        while (h) {
            h--;
            g += j[h]
        }
        return g
    };
    var a = c.getStringUnitWidth = function(h, g) {
        return e(b.call(this, h, g))
    };
    var d = function(g, n, h, j) {
        var q = [];
        var m = 0,
            k = g.length,
            p = 0;
        while (m !== k && p + n[m] < h) {
            p += n[m];
            m++
        }
        q.push(g.slice(0, m));
        var o = m;
        p = 0;
        while (m !== k) {
            if (p + n[m] > j) {
                q.push(g.slice(o, m));
                p = 0;
                o = m
            }
            p += n[m];
            m++
        }
        if (o !== m) {
            q.push(g.slice(o, m))
        }
        return q
    };
    var f = function(s, k, v) {
        if (!v) {
            v = {}
        }
        var t = b(" ", v)[0];
        var r = s.split(" ");
        var w = [],
            x = [w],
            h = v.textIndent || 0,
            u = 0,
            p = 0,
            g, q;
        var o, m, n;
        for (o = 0, m = r.length; o < m; o++) {
            g = r[o];
            q = b(g, v);
            p = e(q);
            if (h + u + p > k) {
                if (p > k) {
                    n = d(g, q, k - (h + u), k);
                    w.push(n.shift());
                    w = [n.pop()];
                    while (n.length) {
                        x.push([n.shift()])
                    }
                    p = e(q.slice(g.length - w[0].length))
                } else {
                    w = [g]
                }
                x.push(w);
                h = p;
                u = t
            } else {
                w.push(g);
                h += u + p;
                u = t
            }
        }
        var j = [];
        for (o = 0, m = x.length; o < m; o++) {
            j.push(x[o].join(" "))
        }
        return j
    };
    c.splitTextToSize = function(q, m, r) {
        if (!r) {
            r = {}
        }
        var h = r.fontSize || this.internal.getFontSize(),
            g = (function(l) {
                var t = {
                    0: 1
                }, i = {};
                if (!l.widths || !l.kerning) {
                    var u = this.internal.getFont(l.fontName, l.fontStyle),
                        s = "Unicode";
                    if (u.metadata[s]) {
                        return {
                            widths: u.metadata[s].widths || t,
                            kerning: u.metadata[s].kerning || i
                        }
                    }
                } else {
                    return {
                        widths: l.widths,
                        kerning: l.kerning
                    }
                }
                return {
                    widths: t,
                    kerning: i
                }
            }).call(this, r);
        var p;
        if (q.match(/[\n\r]/)) {
            p = q.split(/\r\n|\r|\n/g)
        } else {
            p = [q]
        }
        var j = 1 * this.internal.scaleFactor * m / h;
        g.textIndent = r.textIndent ? r.textIndent * 1 * this.internal.scaleFactor / h : 0;
        var o, n, k = [];
        for (o = 0, n = p.length; o < n; o++) {
            k = k.concat(f(p[o], j, g))
        }
        return k
    }
})(jsPDF.API);
(function(a) {
    var e = function(q) {
        var w = "0123456789abcdef",
            o = "klmnopqrstuvwxyz",
            h = {};
        for (var r = 0; r < o.length; r++) {
            h[o[r]] = w[r]
        }
        var p, m = {}, n = 1,
            t, k = m,
            g = [],
            s, l = "",
            u = "",
            v, j = q.length - 1,
            f;
        r = 1;
        while (r != j) {
            f = q[r];
            r += 1;
            if (f == "'") {
                if (t) {
                    v = t.join("");
                    t = p
                } else {
                    t = []
                }
            } else {
                if (t) {
                    t.push(f)
                } else {
                    if (f == "{") {
                        g.push([k, v]);
                        k = {};
                        v = p
                    } else {
                        if (f == "}") {
                            s = g.pop();
                            s[0][s[1]] = k;
                            v = p;
                            k = s[0]
                        } else {
                            if (f == "-") {
                                n = -1
                            } else {
                                if (v === p) {
                                    if (h.hasOwnProperty(f)) {
                                        l += h[f];
                                        v = parseInt(l, 16) * n;
                                        n = +1;
                                        l = ""
                                    } else {
                                        l += f
                                    }
                                } else {
                                    if (h.hasOwnProperty(f)) {
                                        u += h[f];
                                        k[v] = parseInt(u, 16) * n;
                                        n = +1;
                                        v = p;
                                        u = ""
                                    } else {
                                        u += f
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return m
    };
    var d = {
        codePages: ["WinAnsiEncoding"],
        WinAnsiEncoding: e("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")
    }, c = {
            Unicode: {
                Courier: d,
                "Courier-Bold": d,
                "Courier-BoldOblique": d,
                "Courier-Oblique": d,
                Helvetica: d,
                "Helvetica-Bold": d,
                "Helvetica-BoldOblique": d,
                "Helvetica-Oblique": d,
                "Times-Roman": d,
                "Times-Bold": d,
                "Times-BoldItalic": d,
                "Times-Italic": d
            }
        }, b = {
            Unicode: {
                "Courier-Oblique": e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                "Times-BoldItalic": e("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),
                "Helvetica-Bold": e("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
                Courier: e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                "Courier-BoldOblique": e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                "Times-Bold": e("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),
                Helvetica: e("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),
                "Helvetica-BoldOblique": e("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
                "Courier-Bold": e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                "Times-Italic": e("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),
                "Times-Roman": e("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),
                "Helvetica-Oblique": e("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")
            }
        };
    a.events.push(["addFonts",
        function(i) {
            var f, g, h, k, j = "Unicode",
                l;
            for (g in i.fonts) {
                if (i.fonts.hasOwnProperty(g)) {
                    f = i.fonts[g];
                    h = b[j][f.PostScriptName];
                    if (h) {
                        if (f.metadata[j]) {
                            k = f.metadata[j]
                        } else {
                            k = f.metadata[j] = {}
                        }
                        k.widths = h.widths;
                        k.kerning = h.kerning
                    }
                    l = c[j][f.PostScriptName];
                    if (l) {
                        if (f.metadata[j]) {
                            k = f.metadata[j]
                        } else {
                            k = f.metadata[j] = {}
                        }
                        k.encoding = l;
                        if (l.codePages && l.codePages.length) {
                            f.encoding = l.codePages[0]
                        }
                    }
                }
            }
        }
    ])
})(jsPDF.API);
/*! @source http://purl.eligrey.com/github/BlobBuilder.js/blob/master/BlobBuilder.js */
var BlobBuilder = BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder || (function(k) {
    var c = function(v) {
        return Object.prototype.toString.call(v).match(/^\[object\s(.*)\]$/)[1]
    }, u = function() {
            this.data = []
        }, t = function(x, v, w) {
            this.data = x;
            this.size = x.length;
            this.type = v;
            this.encoding = w
        }, l = u.prototype,
        s = t.prototype,
        o = k.FileReaderSync,
        a = function(v) {
            this.code = this[this.name = v]
        }, m = ("NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR").split(" "),
        r = m.length,
        g = k.URL || k.webkitURL || k,
        p = g.createObjectURL,
        b = g.revokeObjectURL,
        e = g,
        j = k.btoa,
        f = k.atob,
        n = false,
        i = function(v) {
            n = !v
        }, d = k.ArrayBuffer,
        h = k.Uint8Array;
    u.fake = s.fake = true;
    while (r--) {
        a.prototype[m[r]] = r + 1
    }
    try {
        if (h) {
            i.apply(0, new h(1))
        }
    } catch (q) {}
    if (!g.createObjectURL) {
        e = k.URL = {}
    }
    e.createObjectURL = function(w) {
        var x = w.type,
            v;
        if (x === null) {
            x = "application/octet-stream"
        }
        if (w instanceof t) {
            v = "data:" + x;
            if (w.encoding === "base64") {
                return v + ";base64," + w.data
            } else {
                if (w.encoding === "URI") {
                    return v + "," + decodeURIComponent(w.data)
                }
            } if (j) {
                return v + ";base64," + j(w.data)
            } else {
                return v + "," + encodeURIComponent(w.data)
            }
        } else {
            if (p) {
                return p.call(g, w)
            }
        }
    };
    e.revokeObjectURL = function(v) {
        if (v.substring(0, 5) !== "data:" && b) {
            b.call(g, v)
        }
    };
    l.append = function(z) {
        var B = this.data;
        if (h && z instanceof d) {
            if (n) {
                B.push(String.fromCharCode.apply(String, new h(z)))
            } else {
                var A = "",
                    w = new h(z),
                    x = 0,
                    y = w.length;
                for (; x < y; x++) {
                    A += String.fromCharCode(w[x])
                }
            }
        } else {
            if (c(z) === "Blob" || c(z) === "File") {
                if (o) {
                    var v = new o;
                    B.push(v.readAsBinaryString(z))
                } else {
                    throw new a("NOT_READABLE_ERR")
                }
            } else {
                if (z instanceof t) {
                    if (z.encoding === "base64" && f) {
                        B.push(f(z.data))
                    } else {
                        if (z.encoding === "URI") {
                            B.push(decodeURIComponent(z.data))
                        } else {
                            if (z.encoding === "raw") {
                                B.push(z.data)
                            }
                        }
                    }
                } else {
                    if (typeof z !== "string") {
                        z += ""
                    }
                    B.push(unescape(encodeURIComponent(z)))
                }
            }
        }
    };
    l.getBlob = function(v) {
        if (!arguments.length) {
            v = null
        }
        return new t(this.data.join(""), v, "raw")
    };
    l.toString = function() {
        return "[object BlobBuilder]"
    };
    s.slice = function(y, v, x) {
        var w = arguments.length;
        if (w < 3) {
            x = null
        }
        return new t(this.data.slice(y, w > 1 ? v : this.data.length), x, this.encoding)
    };
    s.toString = function() {
        return "[object Blob]"
    };
    return u
}(self));
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs || (navigator.msSaveBlob && navigator.msSaveBlob.bind(navigator)) || (function(h) {
    var r = h.document,
        l = function() {
            return h.URL || h.webkitURL || h
        }, e = h.URL || h.webkitURL || h,
        n = r.createElementNS("http://www.w3.org/1999/xhtml", "a"),
        g = "download" in n,
        j = function(t) {
            var s = r.createEvent("MouseEvents");
            s.initMouseEvent("click", true, false, h, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            return t.dispatchEvent(s)
        }, o = h.webkitRequestFileSystem,
        p = h.requestFileSystem || o || h.mozRequestFileSystem,
        m = function(s) {
            (h.setImmediate || h.setTimeout)(function() {
                throw s
            }, 0)
        }, c = "application/octet-stream",
        k = 0,
        b = [],
        i = function() {
            var t = b.length;
            while (t--) {
                var s = b[t];
                if (typeof s === "string") {
                    e.revokeObjectURL(s)
                } else {
                    s.remove()
                }
            }
            b.length = 0
        }, q = function(t, s, w) {
            s = [].concat(s);
            var v = s.length;
            while (v--) {
                var x = t["on" + s[v]];
                if (typeof x === "function") {
                    try {
                        x.call(t, w || t)
                    } catch (u) {
                        m(u)
                    }
                }
            }
        }, f = function(t, u) {
            var v = this,
                B = t.type,
                E = false,
                x, w, s = function() {
                    var F = l().createObjectURL(t);
                    b.push(F);
                    return F
                }, A = function() {
                    q(v, "writestart progress write writeend".split(" "))
                }, D = function() {
                    if (E || !x) {
                        x = s(t)
                    }
                    if (w) {
                        w.location.href = x
                    }
                    v.readyState = v.DONE;
                    A()
                }, z = function(F) {
                    return function() {
                        if (v.readyState !== v.DONE) {
                            return F.apply(this, arguments)
                        }
                    }
                }, y = {
                    create: true,
                    exclusive: false
                }, C;
            v.readyState = v.INIT;
            if (!u) {
                u = "download"
            }
            if (g) {
                x = s(t);
                n.href = x;
                n.download = u;
                if (j(n)) {
                    v.readyState = v.DONE;
                    A();
                    return
                }
            }
            if (h.chrome && B && B !== c) {
                C = t.slice || t.webkitSlice;
                t = C.call(t, 0, t.size, c);
                E = true
            }
            if (o && u !== "download") {
                u += ".download"
            }
            if (B === c || o) {
                w = h
            } else {
                w = h.open()
            } if (!p) {
                D();
                return
            }
            k += t.size;
            p(h.TEMPORARY, k, z(function(F) {
                F.root.getDirectory("saved", y, z(function(G) {
                    var H = function() {
                        G.getFile(u, y, z(function(I) {
                            I.createWriter(z(function(J) {
                                J.onwriteend = function(K) {
                                    w.location.href = I.toURL();
                                    b.push(I);
                                    v.readyState = v.DONE;
                                    q(v, "writeend", K)
                                };
                                J.onerror = function() {
                                    var K = J.error;
                                    if (K.code !== K.ABORT_ERR) {
                                        D()
                                    }
                                };
                                "writestart progress write abort".split(" ").forEach(function(K) {
                                    J["on" + K] = v["on" + K]
                                });
                                J.write(t);
                                v.abort = function() {
                                    J.abort();
                                    v.readyState = v.DONE
                                };
                                v.readyState = v.WRITING
                            }), D)
                        }), D)
                    };
                    G.getFile(u, {
                        create: false
                    }, z(function(I) {
                        I.remove();
                        H()
                    }), z(function(I) {
                        if (I.code === I.NOT_FOUND_ERR) {
                            H()
                        } else {
                            D()
                        }
                    }))
                }), D)
            }), D)
        }, d = f.prototype,
        a = function(s, t) {
            return new f(s, t)
        };
    d.abort = function() {
        var s = this;
        s.readyState = s.DONE;
        q(s, "abort")
    };
    d.readyState = d.INIT = 0;
    d.WRITING = 1;
    d.DONE = 2;
    d.error = d.onwritestart = d.onprogress = d.onwrite = d.onabort = d.onerror = d.onwriteend = null;
    h.addEventListener("unload", i, false);
    return a
}(self));
var MAX_BITS = 15;
var D_CODES = 30;
var BL_CODES = 19;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = (LITERALS + 1 + LENGTH_CODES);
var HEAP_SIZE = (2 * L_CODES + 1);
var END_BLOCK = 256;
var MAX_BL_BITS = 7;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var Buf_size = 8 * 2;
var Z_DEFAULT_COMPRESSION = -1;
var Z_FILTERED = 1;
var Z_HUFFMAN_ONLY = 2;
var Z_DEFAULT_STRATEGY = 0;
var Z_NO_FLUSH = 0;
var Z_PARTIAL_FLUSH = 1;
var Z_FULL_FLUSH = 3;
var Z_FINISH = 4;
var Z_OK = 0;
var Z_STREAM_END = 1;
var Z_NEED_DICT = 2;
var Z_STREAM_ERROR = -2;
var Z_DATA_ERROR = -3;
var Z_BUF_ERROR = -5;
var _dist_code = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29];

function Tree() {
    var b = this;

    function d(u) {
        var v = b.dyn_tree;
        var t = b.stat_desc.static_tree;
        var j = b.stat_desc.extra_bits;
        var e = b.stat_desc.extra_base;
        var r = b.stat_desc.max_length;
        var o;
        var g, i;
        var q;
        var l;
        var p;
        var k = 0;
        for (q = 0; q <= MAX_BITS; q++) {
            u.bl_count[q] = 0
        }
        v[u.heap[u.heap_max] * 2 + 1] = 0;
        for (o = u.heap_max + 1; o < HEAP_SIZE; o++) {
            g = u.heap[o];
            q = v[v[g * 2 + 1] * 2 + 1] + 1;
            if (q > r) {
                q = r;
                k++
            }
            v[g * 2 + 1] = q;
            if (g > b.max_code) {
                continue
            }
            u.bl_count[q]++;
            l = 0;
            if (g >= e) {
                l = j[g - e]
            }
            p = v[g * 2];
            u.opt_len += p * (q + l);
            if (t) {
                u.static_len += p * (t[g * 2 + 1] + l)
            }
        }
        if (k === 0) {
            return
        }
        do {
            q = r - 1;
            while (u.bl_count[q] === 0) {
                q--
            }
            u.bl_count[q]--;
            u.bl_count[q + 1] += 2;
            u.bl_count[r]--;
            k -= 2
        } while (k > 0);
        for (q = r; q !== 0; q--) {
            g = u.bl_count[q];
            while (g !== 0) {
                i = u.heap[--o];
                if (i > b.max_code) {
                    continue
                }
                if (v[i * 2 + 1] != q) {
                    u.opt_len += (q - v[i * 2 + 1]) * v[i * 2];
                    v[i * 2 + 1] = q
                }
                g--
            }
        }
    }

    function c(g, e) {
        var f = 0;
        do {
            f |= g & 1;
            g >>>= 1;
            f <<= 1
        } while (--e > 0);
        return f >>> 1
    }

    function a(f, l, g) {
        var i = [];
        var h = 0;
        var j;
        var k;
        var e;
        for (j = 1; j <= MAX_BITS; j++) {
            i[j] = h = ((h + g[j - 1]) << 1)
        }
        for (k = 0; k <= l; k++) {
            e = f[k * 2 + 1];
            if (e === 0) {
                continue
            }
            f[k * 2] = c(i[e]++, e)
        }
    }
    b.build_tree = function(h) {
        var f = b.dyn_tree;
        var j = b.stat_desc.static_tree;
        var g = b.stat_desc.elems;
        var l, e;
        var k = -1;
        var i;
        h.heap_len = 0;
        h.heap_max = HEAP_SIZE;
        for (l = 0; l < g; l++) {
            if (f[l * 2] !== 0) {
                h.heap[++h.heap_len] = k = l;
                h.depth[l] = 0
            } else {
                f[l * 2 + 1] = 0
            }
        }
        while (h.heap_len < 2) {
            i = h.heap[++h.heap_len] = k < 2 ? ++k : 0;
            f[i * 2] = 1;
            h.depth[i] = 0;
            h.opt_len--;
            if (j) {
                h.static_len -= j[i * 2 + 1]
            }
        }
        b.max_code = k;
        for (l = Math.floor(h.heap_len / 2); l >= 1; l--) {
            h.pqdownheap(f, l)
        }
        i = g;
        do {
            l = h.heap[1];
            h.heap[1] = h.heap[h.heap_len--];
            h.pqdownheap(f, 1);
            e = h.heap[1];
            h.heap[--h.heap_max] = l;
            h.heap[--h.heap_max] = e;
            f[i * 2] = (f[l * 2] + f[e * 2]);
            h.depth[i] = Math.max(h.depth[l], h.depth[e]) + 1;
            f[l * 2 + 1] = f[e * 2 + 1] = i;
            h.heap[1] = i++;
            h.pqdownheap(f, 1)
        } while (h.heap_len >= 2);
        h.heap[--h.heap_max] = h.heap[1];
        d(h);
        a(f, b.max_code, h.bl_count)
    }
}
Tree._length_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28];
Tree.base_length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0];
Tree.base_dist = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576];
Tree.d_code = function(a) {
    return ((a) < 256 ? _dist_code[a] : _dist_code[256 + ((a) >>> 7)])
};
Tree.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
Tree.extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
Tree.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
Tree.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

function StaticTree(d, c, b, a, f) {
    var e = this;
    e.static_tree = d;
    e.extra_bits = c;
    e.extra_base = b;
    e.elems = a;
    e.max_length = f
}
StaticTree.static_ltree = [12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8, 130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42, 8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8, 22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8, 222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113, 8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8, 69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8, 173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9, 51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9, 427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379, 9, 251, 9, 507, 9, 7, 9, 263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23, 9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9, 399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9, 223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7, 40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8, 99, 8, 227, 8];
StaticTree.static_dtree = [0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5, 25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5];
StaticTree.static_l_desc = new StaticTree(StaticTree.static_ltree, Tree.extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
StaticTree.static_d_desc = new StaticTree(StaticTree.static_dtree, Tree.extra_dbits, 0, D_CODES, MAX_BITS);
StaticTree.static_bl_desc = new StaticTree(null, Tree.extra_blbits, 0, BL_CODES, MAX_BL_BITS);
var MAX_MEM_LEVEL = 9;
var DEF_MEM_LEVEL = 8;

function Config(a, f, b, e, d) {
    var c = this;
    c.good_length = a;
    c.max_lazy = f;
    c.nice_length = b;
    c.max_chain = e;
    c.func = d
}
var STORED = 0;
var FAST = 1;
var SLOW = 2;
var config_table = [new Config(0, 0, 0, 0, STORED), new Config(4, 4, 8, 4, FAST), new Config(4, 5, 16, 8, FAST), new Config(4, 6, 32, 32, FAST), new Config(4, 4, 16, 16, SLOW), new Config(8, 16, 32, 32, SLOW), new Config(8, 16, 128, 128, SLOW), new Config(8, 32, 128, 256, SLOW), new Config(32, 128, 258, 1024, SLOW), new Config(32, 258, 258, 4096, SLOW)];
var z_errmsg = ["need dictionary", "stream end", "", "", "stream error", "data error", "", "buffer error", "", ""];
var NeedMore = 0;
var BlockDone = 1;
var FinishStarted = 2;
var FinishDone = 3;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var Z_DEFLATED = 8;
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

function smaller(c, f, b, e) {
    var d = c[f * 2];
    var a = c[b * 2];
    return (d < a || (d == a && e[f] <= e[b]))
}

function Deflate() {
    var M = this;
    var B;
    var K;
    var ad;
    var t;
    var g;
    var h;
    var S;
    var w;
    var ao;
    var a;
    var G;
    var A;
    var U;
    var q;
    var ab;
    var I;
    var au;
    var at;
    var aj;
    var H;
    var m;
    var av;
    var N;
    var D;
    var d;
    var s;
    var W;
    var ac;
    var b;
    var i;
    var r;
    var ag;
    var y;
    var f;
    var u = new Tree();
    var ar = new Tree();
    var ai = new Tree();
    M.depth = [];
    var V;
    var al;
    var Z;
    var e;
    var o;
    var aa;
    var J;
    var n;
    M.bl_count = [];
    M.heap = [];
    ag = [];
    y = [];
    f = [];

    function O() {
        var aw;
        a = 2 * h;
        A[q - 1] = 0;
        for (aw = 0; aw < q - 1; aw++) {
            A[aw] = 0
        }
        W = config_table[ac].max_lazy;
        i = config_table[ac].good_length;
        r = config_table[ac].nice_length;
        s = config_table[ac].max_chain;
        av = 0;
        at = 0;
        D = 0;
        aj = d = MIN_MATCH - 1;
        m = 0;
        U = 0
    }

    function P() {
        var aw;
        for (aw = 0; aw < L_CODES; aw++) {
            ag[aw * 2] = 0
        }
        for (aw = 0; aw < D_CODES; aw++) {
            y[aw * 2] = 0
        }
        for (aw = 0; aw < BL_CODES; aw++) {
            f[aw * 2] = 0
        }
        ag[END_BLOCK * 2] = 1;
        M.opt_len = M.static_len = 0;
        Z = o = 0
    }

    function am() {
        u.dyn_tree = ag;
        u.stat_desc = StaticTree.static_l_desc;
        ar.dyn_tree = y;
        ar.stat_desc = StaticTree.static_d_desc;
        ai.dyn_tree = f;
        ai.stat_desc = StaticTree.static_bl_desc;
        J = 0;
        n = 0;
        aa = 8;
        P()
    }
    M.pqdownheap = function(aw, ay) {
        var aA = M.heap;
        var ax = aA[ay];
        var az = ay << 1;
        while (az <= M.heap_len) {
            if (az < M.heap_len && smaller(aw, aA[az + 1], aA[az], M.depth)) {
                az++
            }
            if (smaller(aw, ax, aA[az], M.depth)) {
                break
            }
            aA[ay] = aA[az];
            ay = az;
            az <<= 1
        }
        aA[ay] = ax
    };

    function X(aE, aD) {
        var ax;
        var aB = -1;
        var aw;
        var az = aE[0 * 2 + 1];
        var aA = 0;
        var ay = 7;
        var aC = 4;
        if (az === 0) {
            ay = 138;
            aC = 3
        }
        aE[(aD + 1) * 2 + 1] = 65535;
        for (ax = 0; ax <= aD; ax++) {
            aw = az;
            az = aE[(ax + 1) * 2 + 1];
            if (++aA < ay && aw == az) {
                continue
            } else {
                if (aA < aC) {
                    f[aw * 2] += aA
                } else {
                    if (aw !== 0) {
                        if (aw != aB) {
                            f[aw * 2]++
                        }
                        f[REP_3_6 * 2]++
                    } else {
                        if (aA <= 10) {
                            f[REPZ_3_10 * 2]++
                        } else {
                            f[REPZ_11_138 * 2]++
                        }
                    }
                }
            }
            aA = 0;
            aB = aw;
            if (az === 0) {
                ay = 138;
                aC = 3
            } else {
                if (aw == az) {
                    ay = 6;
                    aC = 3
                } else {
                    ay = 7;
                    aC = 4
                }
            }
        }
    }

    function E() {
        var aw;
        X(ag, u.max_code);
        X(y, ar.max_code);
        ai.build_tree(M);
        for (aw = BL_CODES - 1; aw >= 3; aw--) {
            if (f[Tree.bl_order[aw] * 2 + 1] !== 0) {
                break
            }
        }
        M.opt_len += 3 * (aw + 1) + 5 + 5 + 4;
        return aw
    }

    function c(aw) {
        M.pending_buf[M.pending++] = aw
    }

    function ae(aw) {
        c(aw & 255);
        c((aw >>> 8) & 255)
    }

    function C(aw) {
        c((aw >> 8) & 255);
        c((aw & 255) & 255)
    }

    function an(ay, ax) {
        var az, aw = ax;
        if (n > Buf_size - aw) {
            az = ay;
            J |= ((az << n) & 65535);
            ae(J);
            J = az >>> (Buf_size - n);
            n += aw - Buf_size
        } else {
            J |= (((ay) << n) & 65535);
            n += aw
        }
    }

    function L(ay, aw) {
        var ax = ay * 2;
        an(aw[ax] & 65535, aw[ax + 1] & 65535)
    }

    function Y(aE, aD) {
        var ax;
        var aB = -1;
        var aw;
        var az = aE[0 * 2 + 1];
        var aA = 0;
        var ay = 7;
        var aC = 4;
        if (az === 0) {
            ay = 138;
            aC = 3
        }
        for (ax = 0; ax <= aD; ax++) {
            aw = az;
            az = aE[(ax + 1) * 2 + 1];
            if (++aA < ay && aw == az) {
                continue
            } else {
                if (aA < aC) {
                    do {
                        L(aw, f)
                    } while (--aA !== 0)
                } else {
                    if (aw !== 0) {
                        if (aw != aB) {
                            L(aw, f);
                            aA--
                        }
                        L(REP_3_6, f);
                        an(aA - 3, 2)
                    } else {
                        if (aA <= 10) {
                            L(REPZ_3_10, f);
                            an(aA - 3, 3)
                        } else {
                            L(REPZ_11_138, f);
                            an(aA - 11, 7)
                        }
                    }
                }
            }
            aA = 0;
            aB = aw;
            if (az === 0) {
                ay = 138;
                aC = 3
            } else {
                if (aw == az) {
                    ay = 6;
                    aC = 3
                } else {
                    ay = 7;
                    aC = 4
                }
            }
        }
    }

    function ak(ax, aw, ay) {
        var az;
        an(ax - 257, 5);
        an(aw - 1, 5);
        an(ay - 4, 4);
        for (az = 0; az < ay; az++) {
            an(f[Tree.bl_order[az] * 2 + 1], 3)
        }
        Y(ag, ax - 1);
        Y(y, aw - 1)
    }

    function T() {
        if (n == 16) {
            ae(J);
            J = 0;
            n = 0
        } else {
            if (n >= 8) {
                c(J & 255);
                J >>>= 8;
                n -= 8
            }
        }
    }

    function l() {
        an(STATIC_TREES << 1, 3);
        L(END_BLOCK, StaticTree.static_ltree);
        T();
        if (1 + aa + 10 - n < 9) {
            an(STATIC_TREES << 1, 3);
            L(END_BLOCK, StaticTree.static_ltree);
            T()
        }
        aa = 7
    }

    function z(aA, ay) {
        var aw, az, ax;
        M.pending_buf[e + Z * 2] = (aA >>> 8) & 255;
        M.pending_buf[e + Z * 2 + 1] = aA & 255;
        M.pending_buf[V + Z] = ay & 255;
        Z++;
        if (aA === 0) {
            ag[ay * 2]++
        } else {
            o++;
            aA--;
            ag[(Tree._length_code[ay] + LITERALS + 1) * 2]++;
            y[Tree.d_code(aA) * 2]++
        } if ((Z & 8191) === 0 && ac > 2) {
            aw = Z * 8;
            az = av - at;
            for (ax = 0; ax < D_CODES; ax++) {
                aw += y[ax * 2] * (5 + Tree.extra_dbits[ax])
            }
            aw >>>= 3;
            if ((o < Math.floor(Z / 2)) && aw < Math.floor(az / 2)) {
                return true
            }
        }
        return (Z == al - 1)
    }

    function R(aC, az) {
        var aB;
        var ay;
        var aA = 0;
        var ax;
        var aw;
        if (Z !== 0) {
            do {
                aB = ((M.pending_buf[e + aA * 2] << 8) & 65280) | (M.pending_buf[e + aA * 2 + 1] & 255);
                ay = (M.pending_buf[V + aA]) & 255;
                aA++;
                if (aB === 0) {
                    L(ay, aC)
                } else {
                    ax = Tree._length_code[ay];
                    L(ax + LITERALS + 1, aC);
                    aw = Tree.extra_lbits[ax];
                    if (aw !== 0) {
                        ay -= Tree.base_length[ax];
                        an(ay, aw)
                    }
                    aB--;
                    ax = Tree.d_code(aB);
                    L(ax, az);
                    aw = Tree.extra_dbits[ax];
                    if (aw !== 0) {
                        aB -= Tree.base_dist[ax];
                        an(aB, aw)
                    }
                }
            } while (aA < Z)
        }
        L(END_BLOCK, aC);
        aa = aC[END_BLOCK * 2 + 1]
    }

    function ap() {
        if (n > 8) {
            ae(J)
        } else {
            if (n > 0) {
                c(J & 255)
            }
        }
        J = 0;
        n = 0
    }

    function p(ax, aw, ay) {
        ap();
        aa = 8;
        if (ay) {
            ae(aw);
            ae(~aw)
        }
        M.pending_buf.set(ao.subarray(ax, ax + aw), M.pending);
        M.pending += aw
    }

    function F(ax, ay, aw) {
        an((STORED_BLOCK << 1) + (aw ? 1 : 0), 3);
        p(ax, ay, true)
    }

    function x(az, aB, aw) {
        var ay, ax;
        var aA = 0;
        if (ac > 0) {
            u.build_tree(M);
            ar.build_tree(M);
            aA = E();
            ay = (M.opt_len + 3 + 7) >>> 3;
            ax = (M.static_len + 3 + 7) >>> 3;
            if (ax <= ay) {
                ay = ax
            }
        } else {
            ay = ax = aB + 5
        } if ((aB + 4 <= ay) && az != -1) {
            F(az, aB, aw)
        } else {
            if (ax == ay) {
                an((STATIC_TREES << 1) + (aw ? 1 : 0), 3);
                R(StaticTree.static_ltree, StaticTree.static_dtree)
            } else {
                an((DYN_TREES << 1) + (aw ? 1 : 0), 3);
                ak(u.max_code + 1, ar.max_code + 1, aA + 1);
                R(ag, y)
            }
        }
        P();
        if (aw) {
            ap()
        }
    }

    function j(aw) {
        x(at >= 0 ? at : -1, av - at, aw);
        at = av;
        B.flush_pending()
    }

    function ah() {
        var az, aw;
        var ay;
        var ax;
        do {
            ax = (a - D - av);
            if (ax === 0 && av === 0 && D === 0) {
                ax = h
            } else {
                if (ax == -1) {
                    ax--
                } else {
                    if (av >= h + h - MIN_LOOKAHEAD) {
                        ao.set(ao.subarray(h, h + h), 0);
                        N -= h;
                        av -= h;
                        at -= h;
                        az = q;
                        ay = az;
                        do {
                            aw = (A[--ay] & 65535);
                            A[ay] = (aw >= h ? aw - h : 0)
                        } while (--az !== 0);
                        az = h;
                        ay = az;
                        do {
                            aw = (G[--ay] & 65535);
                            G[ay] = (aw >= h ? aw - h : 0)
                        } while (--az !== 0);
                        ax += h
                    }
                }
            } if (B.avail_in === 0) {
                return
            }
            az = B.read_buf(ao, av + D, ax);
            D += az;
            if (D >= MIN_MATCH) {
                U = ao[av] & 255;
                U = (((U) << au) ^ (ao[av + 1] & 255)) & I
            }
        } while (D < MIN_LOOKAHEAD && B.avail_in !== 0)
    }

    function Q(aw) {
        var ay = 65535;
        var ax;
        if (ay > ad - 5) {
            ay = ad - 5
        }
        while (true) {
            if (D <= 1) {
                ah();
                if (D === 0 && aw == Z_NO_FLUSH) {
                    return NeedMore
                }
                if (D === 0) {
                    break
                }
            }
            av += D;
            D = 0;
            ax = at + ay;
            if (av === 0 || av >= ax) {
                D = (av - ax);
                av = ax;
                j(false);
                if (B.avail_out === 0) {
                    return NeedMore
                }
            }
            if (av - at >= h - MIN_LOOKAHEAD) {
                j(false);
                if (B.avail_out === 0) {
                    return NeedMore
                }
            }
        }
        j(aw == Z_FINISH);
        if (B.avail_out === 0) {
            return (aw == Z_FINISH) ? FinishStarted : NeedMore
        }
        return aw == Z_FINISH ? FinishDone : BlockDone
    }

    function aq(az) {
        var aC = s;
        var aH = av;
        var aA;
        var aB;
        var aw = d;
        var ax = av > (h - MIN_LOOKAHEAD) ? av - (h - MIN_LOOKAHEAD) : 0;
        var ay = r;
        var aD = w;
        var aF = av + MAX_MATCH;
        var aG = ao[aH + aw - 1];
        var aE = ao[aH + aw];
        if (d >= i) {
            aC >>= 2
        }
        if (ay > D) {
            ay = D
        }
        do {
            aA = az;
            if (ao[aA + aw] != aE || ao[aA + aw - 1] != aG || ao[aA] != ao[aH] || ao[++aA] != ao[aH + 1]) {
                continue
            }
            aH += 2;
            aA++;
            do {} while (ao[++aH] == ao[++aA] && ao[++aH] == ao[++aA] && ao[++aH] == ao[++aA] && ao[++aH] == ao[++aA] && ao[++aH] == ao[++aA] && ao[++aH] == ao[++aA] && ao[++aH] == ao[++aA] && ao[++aH] == ao[++aA] && aH < aF);
            aB = MAX_MATCH - (aF - aH);
            aH = aF - MAX_MATCH;
            if (aB > aw) {
                N = az;
                aw = aB;
                if (aB >= ay) {
                    break
                }
                aG = ao[aH + aw - 1];
                aE = ao[aH + aw]
            }
        } while ((az = (G[az & aD] & 65535)) > ax && --aC !== 0);
        if (aw <= D) {
            return aw
        }
        return D
    }

    function k(aw) {
        var ay = 0;
        var ax;
        while (true) {
            if (D < MIN_LOOKAHEAD) {
                ah();
                if (D < MIN_LOOKAHEAD && aw == Z_NO_FLUSH) {
                    return NeedMore
                }
                if (D === 0) {
                    break
                }
            }
            if (D >= MIN_MATCH) {
                U = (((U) << au) ^ (ao[(av) + (MIN_MATCH - 1)] & 255)) & I;
                ay = (A[U] & 65535);
                G[av & w] = A[U];
                A[U] = av
            }
            if (ay !== 0 && ((av - ay) & 65535) <= h - MIN_LOOKAHEAD) {
                if (b != Z_HUFFMAN_ONLY) {
                    aj = aq(ay)
                }
            }
            if (aj >= MIN_MATCH) {
                ax = z(av - N, aj - MIN_MATCH);
                D -= aj;
                if (aj <= W && D >= MIN_MATCH) {
                    aj--;
                    do {
                        av++;
                        U = ((U << au) ^ (ao[(av) + (MIN_MATCH - 1)] & 255)) & I;
                        ay = (A[U] & 65535);
                        G[av & w] = A[U];
                        A[U] = av
                    } while (--aj !== 0);
                    av++
                } else {
                    av += aj;
                    aj = 0;
                    U = ao[av] & 255;
                    U = (((U) << au) ^ (ao[av + 1] & 255)) & I
                }
            } else {
                ax = z(0, ao[av] & 255);
                D--;
                av++
            } if (ax) {
                j(false);
                if (B.avail_out === 0) {
                    return NeedMore
                }
            }
        }
        j(aw == Z_FINISH);
        if (B.avail_out === 0) {
            if (aw == Z_FINISH) {
                return FinishStarted
            } else {
                return NeedMore
            }
        }
        return aw == Z_FINISH ? FinishDone : BlockDone
    }

    function af(ax) {
        var az = 0;
        var ay;
        var aw;
        while (true) {
            if (D < MIN_LOOKAHEAD) {
                ah();
                if (D < MIN_LOOKAHEAD && ax == Z_NO_FLUSH) {
                    return NeedMore
                }
                if (D === 0) {
                    break
                }
            }
            if (D >= MIN_MATCH) {
                U = (((U) << au) ^ (ao[(av) + (MIN_MATCH - 1)] & 255)) & I;
                az = (A[U] & 65535);
                G[av & w] = A[U];
                A[U] = av
            }
            d = aj;
            H = N;
            aj = MIN_MATCH - 1;
            if (az !== 0 && d < W && ((av - az) & 65535) <= h - MIN_LOOKAHEAD) {
                if (b != Z_HUFFMAN_ONLY) {
                    aj = aq(az)
                }
                if (aj <= 5 && (b == Z_FILTERED || (aj == MIN_MATCH && av - N > 4096))) {
                    aj = MIN_MATCH - 1
                }
            }
            if (d >= MIN_MATCH && aj <= d) {
                aw = av + D - MIN_MATCH;
                ay = z(av - 1 - H, d - MIN_MATCH);
                D -= d - 1;
                d -= 2;
                do {
                    if (++av <= aw) {
                        U = (((U) << au) ^ (ao[(av) + (MIN_MATCH - 1)] & 255)) & I;
                        az = (A[U] & 65535);
                        G[av & w] = A[U];
                        A[U] = av
                    }
                } while (--d !== 0);
                m = 0;
                aj = MIN_MATCH - 1;
                av++;
                if (ay) {
                    j(false);
                    if (B.avail_out === 0) {
                        return NeedMore
                    }
                }
            } else {
                if (m !== 0) {
                    ay = z(0, ao[av - 1] & 255);
                    if (ay) {
                        j(false)
                    }
                    av++;
                    D--;
                    if (B.avail_out === 0) {
                        return NeedMore
                    }
                } else {
                    m = 1;
                    av++;
                    D--
                }
            }
        }
        if (m !== 0) {
            ay = z(0, ao[av - 1] & 255);
            m = 0
        }
        j(ax == Z_FINISH);
        if (B.avail_out === 0) {
            if (ax == Z_FINISH) {
                return FinishStarted
            } else {
                return NeedMore
            }
        }
        return ax == Z_FINISH ? FinishDone : BlockDone
    }

    function v(aw) {
        aw.total_in = aw.total_out = 0;
        aw.msg = null;
        M.pending = 0;
        M.pending_out = 0;
        K = BUSY_STATE;
        g = Z_NO_FLUSH;
        am();
        O();
        return Z_OK
    }
    M.deflateInit = function(aw, ay, az, ax, aB, aA) {
        if (!ax) {
            ax = Z_DEFLATED
        }
        if (!aB) {
            aB = DEF_MEM_LEVEL
        }
        if (!aA) {
            aA = Z_DEFAULT_STRATEGY
        }
        aw.msg = null;
        if (ay == Z_DEFAULT_COMPRESSION) {
            ay = 6
        }
        if (aB < 1 || aB > MAX_MEM_LEVEL || ax != Z_DEFLATED || az < 9 || az > 15 || ay < 0 || ay > 9 || aA < 0 || aA > Z_HUFFMAN_ONLY) {
            return Z_STREAM_ERROR
        }
        aw.dstate = M;
        S = az;
        h = 1 << S;
        w = h - 1;
        ab = aB + 7;
        q = 1 << ab;
        I = q - 1;
        au = Math.floor((ab + MIN_MATCH - 1) / MIN_MATCH);
        ao = new Uint8Array(h * 2);
        G = [];
        A = [];
        al = 1 << (aB + 6);
        M.pending_buf = new Uint8Array(al * 4);
        ad = al * 4;
        e = Math.floor(al / 2);
        V = (1 + 2) * al;
        ac = ay;
        b = aA;
        t = ax & 255;
        return v(aw)
    };
    M.deflateEnd = function() {
        if (K != INIT_STATE && K != BUSY_STATE && K != FINISH_STATE) {
            return Z_STREAM_ERROR
        }
        M.pending_buf = null;
        A = null;
        G = null;
        ao = null;
        M.dstate = null;
        return K == BUSY_STATE ? Z_DATA_ERROR : Z_OK
    };
    M.deflateParams = function(aw, ax, az) {
        var ay = Z_OK;
        if (ax == Z_DEFAULT_COMPRESSION) {
            ax = 6
        }
        if (ax < 0 || ax > 9 || az < 0 || az > Z_HUFFMAN_ONLY) {
            return Z_STREAM_ERROR
        }
        if (config_table[ac].func != config_table[ax].func && aw.total_in !== 0) {
            ay = aw.deflate(Z_PARTIAL_FLUSH)
        }
        if (ac != ax) {
            ac = ax;
            W = config_table[ac].max_lazy;
            i = config_table[ac].good_length;
            r = config_table[ac].nice_length;
            s = config_table[ac].max_chain
        }
        b = az;
        return ay
    };
    M.deflateSetDictionary = function(aw, aB, az) {
        var ay = az;
        var aA, ax = 0;
        if (!aB || K != INIT_STATE) {
            return Z_STREAM_ERROR
        }
        if (ay < MIN_MATCH) {
            return Z_OK
        }
        if (ay > h - MIN_LOOKAHEAD) {
            ay = h - MIN_LOOKAHEAD;
            ax = az - ay
        }
        ao.set(aB.subarray(ax, ax + ay), 0);
        av = ay;
        at = ay;
        U = ao[0] & 255;
        U = (((U) << au) ^ (ao[1] & 255)) & I;
        for (aA = 0; aA <= ay - MIN_MATCH; aA++) {
            U = (((U) << au) ^ (ao[(aA) + (MIN_MATCH - 1)] & 255)) & I;
            G[aA & w] = A[U];
            A[U] = aA
        }
        return Z_OK
    };
    M.deflate = function(ax, aw) {
        var ay, aC, aA, az, aB;
        if (aw > Z_FINISH || aw < 0) {
            return Z_STREAM_ERROR
        }
        if (!ax.next_out || (!ax.next_in && ax.avail_in !== 0) || (K == FINISH_STATE && aw != Z_FINISH)) {
            ax.msg = z_errmsg[Z_NEED_DICT - (Z_STREAM_ERROR)];
            return Z_STREAM_ERROR
        }
        if (ax.avail_out === 0) {
            ax.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
            return Z_BUF_ERROR
        }
        B = ax;
        az = g;
        g = aw;
        if (K == INIT_STATE) {
            aC = (Z_DEFLATED + ((S - 8) << 4)) << 8;
            aA = ((ac - 1) & 255) >> 1;
            if (aA > 3) {
                aA = 3
            }
            aC |= (aA << 6);
            if (av !== 0) {
                aC |= PRESET_DICT
            }
            aC += 31 - (aC % 31);
            K = BUSY_STATE;
            C(aC)
        }
        if (M.pending !== 0) {
            B.flush_pending();
            if (B.avail_out === 0) {
                g = -1;
                return Z_OK
            }
        } else {
            if (B.avail_in === 0 && aw <= az && aw != Z_FINISH) {
                B.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
                return Z_BUF_ERROR
            }
        } if (K == FINISH_STATE && B.avail_in !== 0) {
            ax.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
            return Z_BUF_ERROR
        }
        if (B.avail_in !== 0 || D !== 0 || (aw != Z_NO_FLUSH && K != FINISH_STATE)) {
            aB = -1;
            switch (config_table[ac].func) {
                case STORED:
                    aB = Q(aw);
                    break;
                case FAST:
                    aB = k(aw);
                    break;
                case SLOW:
                    aB = af(aw);
                    break;
                default:
            }
            if (aB == FinishStarted || aB == FinishDone) {
                K = FINISH_STATE
            }
            if (aB == NeedMore || aB == FinishStarted) {
                if (B.avail_out === 0) {
                    g = -1
                }
                return Z_OK
            }
            if (aB == BlockDone) {
                if (aw == Z_PARTIAL_FLUSH) {
                    l()
                } else {
                    F(0, 0, false);
                    if (aw == Z_FULL_FLUSH) {
                        for (ay = 0; ay < q; ay++) {
                            A[ay] = 0
                        }
                    }
                }
                B.flush_pending();
                if (B.avail_out === 0) {
                    g = -1;
                    return Z_OK
                }
            }
        }
        if (aw != Z_FINISH) {
            return Z_OK
        }
        return Z_STREAM_END
    }
}

function ZStream() {
    var a = this;
    a.next_in_index = 0;
    a.next_out_index = 0;
    a.avail_in = 0;
    a.total_in = 0;
    a.avail_out = 0;
    a.total_out = 0
}
ZStream.prototype = {
    deflateInit: function(c, b) {
        var a = this;
        a.dstate = new Deflate();
        if (!b) {
            b = MAX_BITS
        }
        return a.dstate.deflateInit(a, c, b)
    },
    deflate: function(a) {
        var b = this;
        if (!b.dstate) {
            return Z_STREAM_ERROR
        }
        return b.dstate.deflate(b, a)
    },
    deflateEnd: function() {
        var b = this;
        if (!b.dstate) {
            return Z_STREAM_ERROR
        }
        var a = b.dstate.deflateEnd();
        b.dstate = null;
        return a
    },
    deflateParams: function(c, b) {
        var a = this;
        if (!a.dstate) {
            return Z_STREAM_ERROR
        }
        return a.dstate.deflateParams(a, c, b)
    },
    deflateSetDictionary: function(c, b) {
        var a = this;
        if (!a.dstate) {
            return Z_STREAM_ERROR
        }
        return a.dstate.deflateSetDictionary(a, c, b)
    },
    read_buf: function(b, e, c) {
        var d = this;
        var a = d.avail_in;
        if (a > c) {
            a = c
        }
        if (a === 0) {
            return 0
        }
        d.avail_in -= a;
        b.set(d.next_in.subarray(d.next_in_index, d.next_in_index + a), e);
        d.next_in_index += a;
        d.total_in += a;
        return a
    },
    flush_pending: function() {
        var b = this;
        var a = b.dstate.pending;
        if (a > b.avail_out) {
            a = b.avail_out
        }
        if (a === 0) {
            return
        }
        b.next_out.set(b.dstate.pending_buf.subarray(b.dstate.pending_out, b.dstate.pending_out + a), b.next_out_index);
        b.next_out_index += a;
        b.dstate.pending_out += a;
        b.total_out += a;
        b.avail_out -= a;
        b.dstate.pending -= a;
        if (b.dstate.pending === 0) {
            b.dstate.pending_out = 0
        }
    }
};

function Deflater(f) {
    var c = this;
    var e = new ZStream();
    var d = 512;
    var a = Z_NO_FLUSH;
    var b = new Uint8Array(d);
    if (typeof f == "undefined") {
        f = Z_DEFAULT_COMPRESSION
    }
    e.deflateInit(f);
    e.next_out = b;
    c.append = function(k, j) {
        var i, h = [],
            n = 0,
            g = 0,
            m = 0,
            l;
        if (!k.length) {
            return
        }
        e.next_in_index = 0;
        e.next_in = k;
        e.avail_in = k.length;
        do {
            e.next_out_index = 0;
            e.avail_out = d;
            i = e.deflate(a);
            if (i != Z_OK) {
                throw "deflating: " + e.msg
            }
            if (e.next_out_index) {
                if (e.next_out_index == d) {
                    h.push(new Uint8Array(b))
                } else {
                    h.push(new Uint8Array(b.subarray(0, e.next_out_index)))
                }
            }
            m += e.next_out_index;
            if (j && e.next_in_index > 0 && e.next_in_index != n) {
                j(e.next_in_index);
                n = e.next_in_index
            }
        } while (e.avail_in > 0 || e.avail_out === 0);
        l = new Uint8Array(m);
        h.forEach(function(o) {
            l.set(o, g);
            g += o.length
        });
        return l
    };
    c.flush = function() {
        var i, h = [],
            g = 0,
            k = 0,
            j;
        do {
            e.next_out_index = 0;
            e.avail_out = d;
            i = e.deflate(Z_FINISH);
            if (i != Z_STREAM_END && i != Z_OK) {
                throw "deflating: " + e.msg
            }
            if (d - e.avail_out > 0) {
                h.push(new Uint8Array(b.subarray(0, e.next_out_index)))
            }
            k += e.next_out_index
        } while (e.avail_in > 0 || e.avail_out === 0);
        e.deflateEnd();
        j = new Uint8Array(k);
        h.forEach(function(l) {
            j.set(l, g);
            g += l.length
        });
        return j
    }
}
void
function(a, b) {
    if (typeof module === "object") {
        module.exports = b()
    } else {
        if (typeof define === "function") {
            define(b)
        } else {
            a.adler32cs = b()
        }
    }
}(this, function() {
    var h = typeof ArrayBuffer === "function" && typeof Uint8Array === "function";
    var d = null,
        a = (function() {
            if (!h) {
                return function o() {
                    return false
                }
            }
            try {
                var m = require("buffer");
                if (typeof m.Buffer === "function") {
                    d = m.Buffer
                }
            } catch (n) {}
            return function o(p) {
                return p instanceof ArrayBuffer || d !== null && p instanceof d
            }
        }());
    var b = (function() {
        if (d !== null) {
            return function m(n) {
                return new d(n, "utf8").toString("binary")
            }
        } else {
            return function m(n) {
                return unescape(encodeURIComponent(n))
            }
        }
    }());
    var f = 65521;
    var k = function k(r, n) {
        var o = r & 65535,
            m = r >>> 16;
        for (var p = 0, q = n.length; p < q; p++) {
            o = (o + (n.charCodeAt(p) & 255)) % f;
            m = (m + o) % f
        }
        return (m << 16 | o) >>> 0
    };
    var l = function l(s, r) {
        var o = s & 65535,
            n = s >>> 16;
        for (var p = 0, q = r.length, m; p < q; p++) {
            o = (o + r[p]) % f;
            n = (n + o) % f
        }
        return (n << 16 | o) >>> 0
    };
    var g = {};
    var c = g.Adler32 = (function() {
        var u = function n(w) {
            if (!(this instanceof u)) {
                throw new TypeError("Constructor cannot called be as a function.")
            }
            if (!isFinite(w = w == null ? 1 : +w)) {
                throw new Error("First arguments needs to be a finite number.")
            }
            this.checksum = w >>> 0
        };
        var q = u.prototype = {};
        q.constructor = u;
        u.from = function(w) {
            w.prototype = q;
            return w
        }(function t(w) {
            if (!(this instanceof u)) {
                throw new TypeError("Constructor cannot called be as a function.")
            }
            if (w == null) {
                throw new Error("First argument needs to be a string.")
            }
            this.checksum = k(1, w.toString())
        });
        u.fromUtf8 = function(w) {
            w.prototype = q;
            return w
        }(function o(x) {
            if (!(this instanceof u)) {
                throw new TypeError("Constructor cannot called be as a function.")
            }
            if (x == null) {
                throw new Error("First argument needs to be a string.")
            }
            var w = b(x.toString());
            this.checksum = k(1, w)
        });
        if (h) {
            u.fromBuffer = function(w) {
                w.prototype = q;
                return w
            }(function v(w) {
                if (!(this instanceof u)) {
                    throw new TypeError("Constructor cannot called be as a function.")
                }
                if (!a(w)) {
                    throw new Error("First argument needs to be ArrayBuffer.")
                }
                var x = new Uint8Array(w);
                return this.checksum = l(1, x)
            })
        }
        q.update = function p(w) {
            if (w == null) {
                throw new Error("First argument needs to be a string.")
            }
            w = w.toString();
            return this.checksum = k(this.checksum, w)
        };
        q.updateUtf8 = function m(x) {
            if (x == null) {
                throw new Error("First argument needs to be a string.")
            }
            var w = b(x.toString());
            return this.checksum = k(this.checksum, w)
        };
        if (h) {
            q.updateBuffer = function s(w) {
                if (!a(w)) {
                    throw new Error("First argument needs to be ArrayBuffer.")
                }
                var x = new Uint8Array(w);
                return this.checksum = l(this.checksum, x)
            }
        }
        q.clone = function r() {
            return new n(this.checksum)
        };
        return u
    }());
    g.from = function i(m) {
        if (m == null) {
            throw new Error("First argument needs to be a string.")
        }
        return k(1, m.toString())
    };
    g.fromUtf8 = function e(n) {
        if (n == null) {
            throw new Error("First argument needs to be a string.")
        }
        var m = b(n.toString());
        return k(1, m)
    };
    if (h) {
        g.fromBuffer = function j(m) {
            if (!a(m)) {
                throw new Error("First argument need to be ArrayBuffer.")
            }
            var n = new Uint8Array(m);
            return l(1, n)
        }
    }
    return g
});
