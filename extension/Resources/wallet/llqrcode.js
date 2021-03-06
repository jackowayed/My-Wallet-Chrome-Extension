_x10 = {};
_x10._x11 = function(m, n) {
    var o = qrcode.width;
    var i = qrcode.height;
    var q = true;
    for (var l = 0; l < n.Length && q; l += 2) {
        var j = Math.floor(n[l]);
        var k = Math.floor(n[l + 1]);
        if (j < -1 || j > o || k < -1 || k > i) {
            throw "Error._x11 "
        }
        q = false;
        if (j == -1) {
            n[l] = 0;
            q = true
        } else {
            if (j == o) {
                n[l] = o - 1;
                q = true
            }
        } if (k == -1) {
            n[l + 1] = 0;
            q = true
        } else {
            if (k == i) {
                n[l + 1] = i - 1;
                q = true
            }
        }
    }
    q = true;
    for (var l = n.Length - 2; l >= 0 && q; l -= 2) {
        var j = Math.floor(n[l]);
        var k = Math.floor(n[l + 1]);
        if (j < -1 || j > o || k < -1 || k > i) {
            throw "Error._x11 "
        }
        q = false;
        if (j == -1) {
            n[l] = 0;
            q = true
        } else {
            if (j == o) {
                n[l] = o - 1;
                q = true
            }
        } if (k == -1) {
            n[l + 1] = 0;
            q = true
        } else {
            if (k == i) {
                n[l + 1] = i - 1;
                q = true
            }
        }
    }
};
_x10._x15 = function(x, v, y) {
    var m = new _x12(v);
    var n = new Array(v << 1);
    for (var s = 0; s < v; s++) {
        var r = n.length;
        var o = s + 0.5;
        for (var q = 0; q < r; q += 2) {
            n[q] = (q >> 1) + 0.5;
            n[q + 1] = o
        }
        y._x13(n);
        _x10._x11(x, n);
        try {
            for (var q = 0; q < r; q += 2) {
                var u = (Math.floor(n[q]) * 4) + (Math.floor(n[q + 1]) * qrcode.width * 4);
                var t = x[Math.floor(n[q]) + qrcode.width * Math.floor(n[q + 1])];
                qrcode.imagedata.data[u] = t ? 255 : 0;
                qrcode.imagedata.data[u + 1] = t ? 255 : 0;
                qrcode.imagedata.data[u + 2] = 0;
                qrcode.imagedata.data[u + 3] = 255;
                if (t) {
                    m._x6f(q >> 1, s)
                }
            }
        } catch (w) {
            throw "Error._x11"
        }
    }
    return m
};
_x10._x17 = function(F, y, B, C, w, x, O, P, I, J, z, A, u, v, K, N, D, E) {
    var G = _x14._x16(B, C, w, x, O, P, I, J, z, A, u, v, K, N, D, E);
    return _x10._x15(F, y, G)
};

function _x20(c, d) {
    this.count = c;
    this._x91 = d;
    this.__defineGetter__("Count", function() {
        return this.count
    });
    this.__defineGetter__("_x69", function() {
        return this._x91
    })
}

function _x21(e, f, d) {
    this._x39 = e;
    if (d) {
        this._x6b = new Array(f, d)
    } else {
        this._x6b = new Array(f)
    }
    this.__defineGetter__("_x3b", function() {
        return this._x39
    });
    this.__defineGetter__("_x6a", function() {
        return this._x39 * this._x9d
    });
    this.__defineGetter__("_x9d", function() {
        var a = 0;
        for (var b = 0; b < this._x6b.length; b++) {
            a += this._x6b[b].length
        }
        return a
    });
    this._x90 = function() {
        return this._x6b
    }
}

function _x22(m, i, o, q, r, s) {
    this._x3e = m;
    this._x23 = i;
    this._x6b = new Array(o, q, r, s);
    var n = 0;
    var v = o._x3b;
    var w = o._x90();
    for (var t = 0; t < w.length; t++) {
        var u = w[t];
        n += u.Count * (u._x69 + v)
    }
    this._x3d = n;
    this.__defineGetter__("_x92", function() {
        return this._x3e
    });
    this.__defineGetter__("_x24", function() {
        return this._x23
    });
    this.__defineGetter__("_x6c", function() {
        return this._x3d
    });
    this.__defineGetter__("_x57", function() {
        return 17 + 4 * this._x3e
    });
    this._x25 = function() {
        var c = this._x57;
        var e = new _x12(c);
        e._x3f(0, 0, 9, 9);
        e._x3f(c - 8, 0, 8, 9);
        e._x3f(0, c - 8, 9, 8);
        var f = this._x23.length;
        for (var a = 0; a < f; a++) {
            var d = this._x23[a] - 2;
            for (var b = 0; b < f; b++) {
                if ((a == 0 && (b == 0 || b == f - 1)) || (a == f - 1 && b == 0)) {
                    continue
                }
                e._x3f(this._x23[b] - 2, d, 5, 5)
            }
        }
        e._x3f(6, 9, 1, c - 17);
        e._x3f(9, 6, c - 17, 1);
        if (this._x3e > 6) {
            e._x3f(c - 11, 0, 3, 6);
            e._x3f(0, c - 11, 6, 3)
        }
        return e
    };
    this._x40 = function(a) {
        return this._x6b[a.ordinal()]
    }
}
_x22._x41 = new Array(31892, 34236, 39577, 42195, 48118, 51042, 55367, 58893, 63784, 68472, 70749, 76311, 79154, 84390, 87683, 92361, 96236, 102084, 102881, 110507, 110734, 117786, 119615, 126325, 127568, 133589, 136944, 141498, 145311, 150283, 152622, 158308, 161089, 167017);
_x22.VERSIONS = _x2b();
_x22._x27 = function(b) {
    if (b < 1 || b > 40) {
        throw "_xbc"
    }
    return _x22.VERSIONS[b - 1]
};
_x22._x28 = function(c) {
    if (c % 4 != 1) {
        throw "Error _x28"
    }
    try {
        return _x22._x27((c - 17) >> 2)
    } catch (d) {
        throw "Error _x27"
    }
};
_x22._x29 = function(k) {
    var g = 4294967295;
    var i = 0;
    for (var l = 0; l < _x22._x41.length; l++) {
        var h = _x22._x41[l];
        if (h == k) {
            return this._x27(l + 7)
        }
        var j = _x2a._xb0(k, h);
        if (j < g) {
            i = l + 7;
            g = j
        }
    }
    if (g <= 3) {
        return this._x27(i)
    }
    return null
};

function _x2b() {
    return new Array(new _x22(1, new Array(), new _x21(7, new _x20(1, 19)), new _x21(10, new _x20(1, 16)), new _x21(13, new _x20(1, 13)), new _x21(17, new _x20(1, 9))), new _x22(2, new Array(6, 18), new _x21(10, new _x20(1, 34)), new _x21(16, new _x20(1, 28)), new _x21(22, new _x20(1, 22)), new _x21(28, new _x20(1, 16))), new _x22(3, new Array(6, 22), new _x21(15, new _x20(1, 55)), new _x21(26, new _x20(1, 44)), new _x21(18, new _x20(2, 17)), new _x21(22, new _x20(2, 13))), new _x22(4, new Array(6, 26), new _x21(20, new _x20(1, 80)), new _x21(18, new _x20(2, 32)), new _x21(26, new _x20(2, 24)), new _x21(16, new _x20(4, 9))), new _x22(5, new Array(6, 30), new _x21(26, new _x20(1, 108)), new _x21(24, new _x20(2, 43)), new _x21(18, new _x20(2, 15), new _x20(2, 16)), new _x21(22, new _x20(2, 11), new _x20(2, 12))), new _x22(6, new Array(6, 34), new _x21(18, new _x20(2, 68)), new _x21(16, new _x20(4, 27)), new _x21(24, new _x20(4, 19)), new _x21(28, new _x20(4, 15))), new _x22(7, new Array(6, 22, 38), new _x21(20, new _x20(2, 78)), new _x21(18, new _x20(4, 31)), new _x21(18, new _x20(2, 14), new _x20(4, 15)), new _x21(26, new _x20(4, 13), new _x20(1, 14))), new _x22(8, new Array(6, 24, 42), new _x21(24, new _x20(2, 97)), new _x21(22, new _x20(2, 38), new _x20(2, 39)), new _x21(22, new _x20(4, 18), new _x20(2, 19)), new _x21(26, new _x20(4, 14), new _x20(2, 15))), new _x22(9, new Array(6, 26, 46), new _x21(30, new _x20(2, 116)), new _x21(22, new _x20(3, 36), new _x20(2, 37)), new _x21(20, new _x20(4, 16), new _x20(4, 17)), new _x21(24, new _x20(4, 12), new _x20(4, 13))), new _x22(10, new Array(6, 28, 50), new _x21(18, new _x20(2, 68), new _x20(2, 69)), new _x21(26, new _x20(4, 43), new _x20(1, 44)), new _x21(24, new _x20(6, 19), new _x20(2, 20)), new _x21(28, new _x20(6, 15), new _x20(2, 16))), new _x22(11, new Array(6, 30, 54), new _x21(20, new _x20(4, 81)), new _x21(30, new _x20(1, 50), new _x20(4, 51)), new _x21(28, new _x20(4, 22), new _x20(4, 23)), new _x21(24, new _x20(3, 12), new _x20(8, 13))), new _x22(12, new Array(6, 32, 58), new _x21(24, new _x20(2, 92), new _x20(2, 93)), new _x21(22, new _x20(6, 36), new _x20(2, 37)), new _x21(26, new _x20(4, 20), new _x20(6, 21)), new _x21(28, new _x20(7, 14), new _x20(4, 15))), new _x22(13, new Array(6, 34, 62), new _x21(26, new _x20(4, 107)), new _x21(22, new _x20(8, 37), new _x20(1, 38)), new _x21(24, new _x20(8, 20), new _x20(4, 21)), new _x21(22, new _x20(12, 11), new _x20(4, 12))), new _x22(14, new Array(6, 26, 46, 66), new _x21(30, new _x20(3, 115), new _x20(1, 116)), new _x21(24, new _x20(4, 40), new _x20(5, 41)), new _x21(20, new _x20(11, 16), new _x20(5, 17)), new _x21(24, new _x20(11, 12), new _x20(5, 13))), new _x22(15, new Array(6, 26, 48, 70), new _x21(22, new _x20(5, 87), new _x20(1, 88)), new _x21(24, new _x20(5, 41), new _x20(5, 42)), new _x21(30, new _x20(5, 24), new _x20(7, 25)), new _x21(24, new _x20(11, 12), new _x20(7, 13))), new _x22(16, new Array(6, 26, 50, 74), new _x21(24, new _x20(5, 98), new _x20(1, 99)), new _x21(28, new _x20(7, 45), new _x20(3, 46)), new _x21(24, new _x20(15, 19), new _x20(2, 20)), new _x21(30, new _x20(3, 15), new _x20(13, 16))), new _x22(17, new Array(6, 30, 54, 78), new _x21(28, new _x20(1, 107), new _x20(5, 108)), new _x21(28, new _x20(10, 46), new _x20(1, 47)), new _x21(28, new _x20(1, 22), new _x20(15, 23)), new _x21(28, new _x20(2, 14), new _x20(17, 15))), new _x22(18, new Array(6, 30, 56, 82), new _x21(30, new _x20(5, 120), new _x20(1, 121)), new _x21(26, new _x20(9, 43), new _x20(4, 44)), new _x21(28, new _x20(17, 22), new _x20(1, 23)), new _x21(28, new _x20(2, 14), new _x20(19, 15))), new _x22(19, new Array(6, 30, 58, 86), new _x21(28, new _x20(3, 113), new _x20(4, 114)), new _x21(26, new _x20(3, 44), new _x20(11, 45)), new _x21(26, new _x20(17, 21), new _x20(4, 22)), new _x21(26, new _x20(9, 13), new _x20(16, 14))), new _x22(20, new Array(6, 34, 62, 90), new _x21(28, new _x20(3, 107), new _x20(5, 108)), new _x21(26, new _x20(3, 41), new _x20(13, 42)), new _x21(30, new _x20(15, 24), new _x20(5, 25)), new _x21(28, new _x20(15, 15), new _x20(10, 16))), new _x22(21, new Array(6, 28, 50, 72, 94), new _x21(28, new _x20(4, 116), new _x20(4, 117)), new _x21(26, new _x20(17, 42)), new _x21(28, new _x20(17, 22), new _x20(6, 23)), new _x21(30, new _x20(19, 16), new _x20(6, 17))), new _x22(22, new Array(6, 26, 50, 74, 98), new _x21(28, new _x20(2, 111), new _x20(7, 112)), new _x21(28, new _x20(17, 46)), new _x21(30, new _x20(7, 24), new _x20(16, 25)), new _x21(24, new _x20(34, 13))), new _x22(23, new Array(6, 30, 54, 74, 102), new _x21(30, new _x20(4, 121), new _x20(5, 122)), new _x21(28, new _x20(4, 47), new _x20(14, 48)), new _x21(30, new _x20(11, 24), new _x20(14, 25)), new _x21(30, new _x20(16, 15), new _x20(14, 16))), new _x22(24, new Array(6, 28, 54, 80, 106), new _x21(30, new _x20(6, 117), new _x20(4, 118)), new _x21(28, new _x20(6, 45), new _x20(14, 46)), new _x21(30, new _x20(11, 24), new _x20(16, 25)), new _x21(30, new _x20(30, 16), new _x20(2, 17))), new _x22(25, new Array(6, 32, 58, 84, 110), new _x21(26, new _x20(8, 106), new _x20(4, 107)), new _x21(28, new _x20(8, 47), new _x20(13, 48)), new _x21(30, new _x20(7, 24), new _x20(22, 25)), new _x21(30, new _x20(22, 15), new _x20(13, 16))), new _x22(26, new Array(6, 30, 58, 86, 114), new _x21(28, new _x20(10, 114), new _x20(2, 115)), new _x21(28, new _x20(19, 46), new _x20(4, 47)), new _x21(28, new _x20(28, 22), new _x20(6, 23)), new _x21(30, new _x20(33, 16), new _x20(4, 17))), new _x22(27, new Array(6, 34, 62, 90, 118), new _x21(30, new _x20(8, 122), new _x20(4, 123)), new _x21(28, new _x20(22, 45), new _x20(3, 46)), new _x21(30, new _x20(8, 23), new _x20(26, 24)), new _x21(30, new _x20(12, 15), new _x20(28, 16))), new _x22(28, new Array(6, 26, 50, 74, 98, 122), new _x21(30, new _x20(3, 117), new _x20(10, 118)), new _x21(28, new _x20(3, 45), new _x20(23, 46)), new _x21(30, new _x20(4, 24), new _x20(31, 25)), new _x21(30, new _x20(11, 15), new _x20(31, 16))), new _x22(29, new Array(6, 30, 54, 78, 102, 126), new _x21(30, new _x20(7, 116), new _x20(7, 117)), new _x21(28, new _x20(21, 45), new _x20(7, 46)), new _x21(30, new _x20(1, 23), new _x20(37, 24)), new _x21(30, new _x20(19, 15), new _x20(26, 16))), new _x22(30, new Array(6, 26, 52, 78, 104, 130), new _x21(30, new _x20(5, 115), new _x20(10, 116)), new _x21(28, new _x20(19, 47), new _x20(10, 48)), new _x21(30, new _x20(15, 24), new _x20(25, 25)), new _x21(30, new _x20(23, 15), new _x20(25, 16))), new _x22(31, new Array(6, 30, 56, 82, 108, 134), new _x21(30, new _x20(13, 115), new _x20(3, 116)), new _x21(28, new _x20(2, 46), new _x20(29, 47)), new _x21(30, new _x20(42, 24), new _x20(1, 25)), new _x21(30, new _x20(23, 15), new _x20(28, 16))), new _x22(32, new Array(6, 34, 60, 86, 112, 138), new _x21(30, new _x20(17, 115)), new _x21(28, new _x20(10, 46), new _x20(23, 47)), new _x21(30, new _x20(10, 24), new _x20(35, 25)), new _x21(30, new _x20(19, 15), new _x20(35, 16))), new _x22(33, new Array(6, 30, 58, 86, 114, 142), new _x21(30, new _x20(17, 115), new _x20(1, 116)), new _x21(28, new _x20(14, 46), new _x20(21, 47)), new _x21(30, new _x20(29, 24), new _x20(19, 25)), new _x21(30, new _x20(11, 15), new _x20(46, 16))), new _x22(34, new Array(6, 34, 62, 90, 118, 146), new _x21(30, new _x20(13, 115), new _x20(6, 116)), new _x21(28, new _x20(14, 46), new _x20(23, 47)), new _x21(30, new _x20(44, 24), new _x20(7, 25)), new _x21(30, new _x20(59, 16), new _x20(1, 17))), new _x22(35, new Array(6, 30, 54, 78, 102, 126, 150), new _x21(30, new _x20(12, 121), new _x20(7, 122)), new _x21(28, new _x20(12, 47), new _x20(26, 48)), new _x21(30, new _x20(39, 24), new _x20(14, 25)), new _x21(30, new _x20(22, 15), new _x20(41, 16))), new _x22(36, new Array(6, 24, 50, 76, 102, 128, 154), new _x21(30, new _x20(6, 121), new _x20(14, 122)), new _x21(28, new _x20(6, 47), new _x20(34, 48)), new _x21(30, new _x20(46, 24), new _x20(10, 25)), new _x21(30, new _x20(2, 15), new _x20(64, 16))), new _x22(37, new Array(6, 28, 54, 80, 106, 132, 158), new _x21(30, new _x20(17, 122), new _x20(4, 123)), new _x21(28, new _x20(29, 46), new _x20(14, 47)), new _x21(30, new _x20(49, 24), new _x20(10, 25)), new _x21(30, new _x20(24, 15), new _x20(46, 16))), new _x22(38, new Array(6, 32, 58, 84, 110, 136, 162), new _x21(30, new _x20(4, 122), new _x20(18, 123)), new _x21(28, new _x20(13, 46), new _x20(32, 47)), new _x21(30, new _x20(48, 24), new _x20(14, 25)), new _x21(30, new _x20(42, 15), new _x20(32, 16))), new _x22(39, new Array(6, 26, 54, 82, 110, 138, 166), new _x21(30, new _x20(20, 117), new _x20(4, 118)), new _x21(28, new _x20(40, 47), new _x20(7, 48)), new _x21(30, new _x20(43, 24), new _x20(22, 25)), new _x21(30, new _x20(10, 15), new _x20(67, 16))), new _x22(40, new Array(6, 30, 58, 86, 114, 142, 170), new _x21(30, new _x20(19, 118), new _x20(6, 119)), new _x21(28, new _x20(18, 47), new _x20(31, 48)), new _x21(30, new _x20(34, 24), new _x20(34, 25)), new _x21(30, new _x20(20, 15), new _x20(61, 16))))
}

function _x14(j, m, q, k, n, r, l, o, s) {
    this.a11 = j;
    this.a12 = k;
    this.a13 = l;
    this.a21 = m;
    this.a22 = n;
    this.a23 = o;
    this.a31 = q;
    this.a32 = r;
    this.a33 = s;
    this._x13 = function(y) {
        var D = y.length;
        var d = this.a11;
        var x = this.a12;
        var B = this.a13;
        var a = this.a21;
        var b = this.a22;
        var c = this.a23;
        var f = this.a31;
        var h = this.a32;
        var i = this.a33;
        for (var e = 0; e < D; e += 2) {
            var C = y[e];
            var E = y[e + 1];
            var g = B * C + c * E + i;
            y[e] = (d * C + a * E + f) / g;
            y[e + 1] = (x * C + b * E + h) / g
        }
    };
    this._x9e = function(a, c) {
        var e = a.length;
        for (var b = 0; b < e; b++) {
            var d = a[b];
            var f = c[b];
            var g = this.a13 * d + this.a23 * f + this.a33;
            a[b] = (this.a11 * d + this.a21 * f + this.a31) / g;
            c[b] = (this.a12 * d + this.a22 * f + this.a32) / g
        }
    };
    this._x9f = function() {
        return new _x14(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21)
    };
    this.times = function(a) {
        return new _x14(this.a11 * a.a11 + this.a21 * a.a12 + this.a31 * a.a13, this.a11 * a.a21 + this.a21 * a.a22 + this.a31 * a.a23, this.a11 * a.a31 + this.a21 * a.a32 + this.a31 * a.a33, this.a12 * a.a11 + this.a22 * a.a12 + this.a32 * a.a13, this.a12 * a.a21 + this.a22 * a.a22 + this.a32 * a.a23, this.a12 * a.a31 + this.a22 * a.a32 + this.a32 * a.a33, this.a13 * a.a11 + this.a23 * a.a12 + this.a33 * a.a13, this.a13 * a.a21 + this.a23 * a.a22 + this.a33 * a.a23, this.a13 * a.a31 + this.a23 * a.a32 + this.a33 * a.a33)
    }
}
_x14._x16 = function(v, G, w, I, x, J, y, K, D, u, z, F, N, B, C, t) {
    var E = this._x31(v, G, w, I, x, J, y, K);
    var A = this._x32(D, u, z, F, N, B, C, t);
    return A.times(E)
};
_x14._x32 = function(m, k, o, l, i, n, j, q) {
    dy2 = q - n;
    dy3 = k - l + n - q;
    if (dy2 == 0 && dy3 == 0) {
        return new _x14(o - m, i - o, m, l - k, n - l, k, 0, 0, 1)
    } else {
        dx1 = o - i;
        dx2 = j - i;
        dx3 = m - o + i - j;
        dy1 = l - n;
        _x6d = dx1 * dy2 - dx2 * dy1;
        a13 = (dx3 * dy2 - dx2 * dy3) / _x6d;
        a23 = (dx1 * dy3 - dx3 * dy1) / _x6d;
        return new _x14(o - m + a13 * o, j - m + a23 * j, m, l - k + a13 * l, q - k + a23 * q, k, a13, a23, 1)
    }
};
_x14._x31 = function(m, k, o, l, i, n, j, q) {
    return this._x32(m, k, o, l, i, n, j, q)._x9f()
};

function _x33(c, d) {
    this.bits = c;
    this.points = d
}

function Detector(b) {
    this.image = b;
    this._x1c = null;
    this._x35 = function(D, E, R, S) {
        var P = Math.abs(S - E) > Math.abs(R - D);
        if (P) {
            var y = D;
            D = E;
            E = y;
            y = R;
            R = S;
            S = y
        }
        var G = Math.abs(R - D);
        var I = Math.abs(S - E);
        var A = -G >> 1;
        var a = E < S ? 1 : -1;
        var N = D < R ? 1 : -1;
        var O = 0;
        for (var J = D, K = E; J != R; J += N) {
            var w = P ? K : J;
            var x = P ? J : K;
            if (O == 1) {
                if (this.image[w + x * qrcode.width]) {
                    O++
                }
            } else {
                if (!this.image[w + x * qrcode.width]) {
                    O++
                }
            } if (O == 3) {
                var B = J - D;
                var C = K - E;
                return Math.sqrt((B * B + C * C))
            }
            A += I;
            if (A > 0) {
                if (K == S) {
                    break
                }
                K += a;
                A -= G
            }
        }
        var F = R - D;
        var z = S - E;
        return Math.sqrt((F * F + z * z))
    };
    this._x34 = function(j, l, k, m) {
        var a = this._x35(j, l, k, m);
        var n = 1;
        var o = j - (k - j);
        if (o < 0) {
            n = j / (j - o);
            o = 0
        } else {
            if (o >= qrcode.width) {
                n = (qrcode.width - 1 - j) / (o - j);
                o = qrcode.width - 1
            }
        }
        var q = Math.floor(l - (m - l) * n);
        n = 1;
        if (q < 0) {
            n = l / (l - q);
            q = 0
        } else {
            if (q >= qrcode.height) {
                n = (qrcode.height - 1 - l) / (q - l);
                q = qrcode.height - 1
            }
        }
        o = Math.floor(j + (o - j) * n);
        a += this._x35(j, l, o, q);
        return a - 1
    };
    this._x36 = function(h, g) {
        var a = this._x34(Math.floor(h.X), Math.floor(h.Y), Math.floor(g.X), Math.floor(g.Y));
        var f = this._x34(Math.floor(g.X), Math.floor(g.Y), Math.floor(h.X), Math.floor(h.Y));
        if (isNaN(a)) {
            return f / 7
        }
        if (isNaN(f)) {
            return a / 7
        }
        return (a + f) / 14
    };
    this._x37 = function(e, f, a) {
        return (this._x36(e, f) + this._x36(e, a)) / 2
    };
    this.distance = function(d, a) {
        xDiff = d.X - a.X;
        yDiff = d.Y - a.Y;
        return Math.sqrt((xDiff * xDiff + yDiff * yDiff))
    };
    this._x43 = function(j, k, m, l) {
        var a = Math.round(this.distance(j, k) / l);
        var n = Math.round(this.distance(j, m) / l);
        var i = ((a + n) >> 1) + 7;
        switch (i & 3) {
            case 0:
                i++;
                break;
            case 2:
                i--;
                break;
            case 3:
                throw "Error"
        }
        return i
    };
    this._x38 = function(o, q, s, l) {
        var a = Math.floor(l * o);
        var n = Math.max(0, q - a);
        var m = Math.min(qrcode.width - 1, q + a);
        if (m - n < o * 3) {
            throw "Error"
        }
        var u = Math.max(0, s - a);
        var t = Math.min(qrcode.height - 1, s + a);
        var r = new _x1a(this.image, n, u, m - n, t - u, o, this._x1c);
        return r.find()
    };
    this._xc5 = function(a, q, m, w, r) {
        var n = r - 3.5;
        var o;
        var s;
        var t;
        var v;
        if (w != null) {
            o = w.X;
            s = w.Y;
            t = v = n - 3
        } else {
            o = (q.X - a.X) + m.X;
            s = (q.Y - a.Y) + m.Y;
            t = v = n
        }
        var u = _x14._x16(3.5, 3.5, n, 3.5, t, v, 3.5, n, a.X, a.Y, q.X, q.Y, o, s, m.X, m.Y);
        return u
    };
    this._x45 = function(f, a, g) {
        var h = _x10;
        return h._x15(f, g, a)
    };
    this._x49 = function(w) {
        var D = w._xb9;
        var E = w._xb8;
        var z = w._xb6;
        var J = this._x37(D, E, z);
        if (J < 1) {
            throw "Error"
        }
        var v = this._x43(D, E, z, J);
        var N = _x22._x28(v);
        var C = N._x57 - 7;
        var B = null;
        if (N._x24.length > 0) {
            var G = E.X - D.X + z.X;
            var I = E.Y - D.Y + z.Y;
            var K = 1 - 3 / C;
            var a = Math.floor(D.X + K * (G - D.X));
            var i = Math.floor(D.Y + K * (I - D.Y));
            for (var x = 4; x <= 16; x <<= 1) {
                B = this._x38(J, a, i, x);
                break
            }
        }
        var F = this._xc5(D, E, z, B, v);
        var A = this._x45(this.image, F, v);
        var y;
        if (B == null) {
            y = new Array(z, D, E)
        } else {
            y = new Array(z, D, E, B)
        }
        return new _x33(A, y)
    };
    this.detect = function() {
        var a = new _x48()._x4a(this.image);
        return this._x49(a)
    }
}
var _x46 = 21522;
var _x47 = new Array(new Array(21522, 0), new Array(20773, 1), new Array(24188, 2), new Array(23371, 3), new Array(17913, 4), new Array(16590, 5), new Array(20375, 6), new Array(19104, 7), new Array(30660, 8), new Array(29427, 9), new Array(32170, 10), new Array(30877, 11), new Array(26159, 12), new Array(25368, 13), new Array(27713, 14), new Array(26998, 15), new Array(5769, 16), new Array(5054, 17), new Array(7399, 18), new Array(6608, 19), new Array(1890, 20), new Array(597, 21), new Array(3340, 22), new Array(2107, 23), new Array(13663, 24), new Array(12392, 25), new Array(16177, 26), new Array(14854, 27), new Array(9396, 28), new Array(8579, 29), new Array(11994, 30), new Array(11245, 31));
var _x4d = new Array(0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4);

function _x2a(b) {
    this._x4b = _x4c.forBits((b >> 3) & 3);
    this._x93 = (b & 7);
    this.__defineGetter__("_x4c", function() {
        return this._x4b
    });
    this.__defineGetter__("_x73", function() {
        return this._x93
    });
    this._xc6 = function() {
        return (this._x4b.ordinal() << 3) | _x93
    };
    this.Equals = function(d) {
        var a = d;
        return this._x4b == a._x4b && this._x93 == a._x93
    }
}
_x2a._xb0 = function(a, b) {
    a ^= b;
    return _x4d[a & 15] + _x4d[(_x8b(a, 4) & 15)] + _x4d[(_x8b(a, 8) & 15)] + _x4d[(_x8b(a, 12) & 15)] + _x4d[(_x8b(a, 16) & 15)] + _x4d[(_x8b(a, 20) & 15)] + _x4d[(_x8b(a, 24) & 15)] + _x4d[(_x8b(a, 28) & 15)]
};
_x2a._x4e = function(d) {
    var c = _x2a._x4f(d);
    if (c != null) {
        return c
    }
    return _x2a._x4f(d ^ _x46)
};
_x2a._x4f = function(m) {
    var h = 4294967295;
    var i = 0;
    for (var n = 0; n < _x47.length; n++) {
        var j = _x47[n];
        var k = j[0];
        if (k == m) {
            return new _x2a(j[1])
        }
        var l = this._xb0(m, k);
        if (l < h) {
            i = j[1];
            h = l
        }
    }
    if (h <= 3) {
        return new _x2a(i)
    }
    return null
};

function _x4c(e, f, d) {
    this._x94 = e;
    this.bits = f;
    this.name = d;
    this.__defineGetter__("Bits", function() {
        return this.bits
    });
    this.__defineGetter__("Name", function() {
        return this.name
    });
    this.ordinal = function() {
        return this._x94
    }
}
_x4c.forBits = function(b) {
    if (b < 0 || b >= FOR_BITS.Length) {
        throw "_xbc"
    }
    return FOR_BITS[b]
};
var L = new _x4c(0, 1, "L");
var M = new _x4c(1, 0, "M");
var Q = new _x4c(2, 3, "Q");
var H = new _x4c(3, 2, "H");
var FOR_BITS = new Array(M, L, H, Q);

function _x12(g, f) {
    if (!f) {
        f = g
    }
    if (g < 1 || f < 1) {
        throw "Both dimensions must be greater than 0"
    }
    this.width = g;
    this.height = f;
    var h = g >> 5;
    if ((g & 31) != 0) {
        h++
    }
    this.rowSize = h;
    this.bits = new Array(h * f);
    for (var e = 0; e < this.bits.length; e++) {
        this.bits[e] = 0
    }
    this.__defineGetter__("Width", function() {
        return this.width
    });
    this.__defineGetter__("Height", function() {
        return this.height
    });
    this.__defineGetter__("Dimension", function() {
        if (this.width != this.height) {
            throw "Can't call getDimension() on a non-square matrix"
        }
        return this.width
    });
    this._x6e = function(c, a) {
        var b = a * this.rowSize + (c >> 5);
        return ((_x8b(this.bits[b], (c & 31))) & 1) != 0
    };
    this._x6f = function(c, a) {
        var b = a * this.rowSize + (c >> 5);
        this.bits[b] |= 1 << (c & 31)
    };
    this.flip = function(c, a) {
        var b = a * this.rowSize + (c >> 5);
        this.bits[b] ^= 1 << (c & 31)
    };
    this.clear = function() {
        var b = this.bits.length;
        for (var a = 0; a < b; a++) {
            this.bits[a] = 0
        }
    };
    this._x3f = function(q, d, r, a) {
        if (d < 0 || q < 0) {
            throw "Left and top must be nonnegative"
        }
        if (a < 1 || r < 1) {
            throw "Height and width must be at least 1"
        }
        var b = q + r;
        var s = d + a;
        if (s > this.height || b > this.width) {
            throw "The region must fit inside the matrix"
        }
        for (var n = d; n < s; n++) {
            var o = n * this.rowSize;
            for (var c = q; c < b; c++) {
                this.bits[o + (c >> 5)] |= 1 << (c & 31)
            }
        }
    }
}

function _x68(d, c) {
    this._x71 = d;
    this._x72 = c;
    this.__defineGetter__("_x70", function() {
        return this._x71
    });
    this.__defineGetter__("Codewords", function() {
        return this._x72
    })
}
_x68._xb4 = function(P, I, z) {
    if (P.length != I._x6c) {
        throw "_xbc"
    }
    var G = I._x40(z);
    var N = 0;
    var O = G._x90();
    for (var A = 0; A < O.length; A++) {
        N += O[A].Count
    }
    var F = new Array(N);
    var D = 0;
    for (var C = 0; C < O.length; C++) {
        var K = O[C];
        for (var A = 0; A < K.Count; A++) {
            var E = K._x69;
            var y = G._x3b + E;
            F[D++] = new _x68(E, new Array(y))
        }
    }
    var x = F[0]._x72.length;
    var R = F.length - 1;
    while (R >= 0) {
        var i = F[R]._x72.length;
        if (i == x) {
            break
        }
        R--
    }
    R++;
    var J = x - G._x3b;
    var S = 0;
    for (var A = 0; A < J; A++) {
        for (var C = 0; C < D; C++) {
            F[C]._x72[A] = P[S++]
        }
    }
    for (var C = R; C < D; C++) {
        F[C]._x72[J] = P[S++]
    }
    var B = F[0]._x72.length;
    for (var A = J; A < B; A++) {
        for (var C = 0; C < D; C++) {
            var j = C < R ? A : A + 1;
            F[C]._x72[j] = P[S++]
        }
    }
    return F
};

function _x51(d) {
    var c = d.Dimension;
    if (c < 21 || (c & 3) != 1) {
        throw "Error _x51"
    }
    this._x26 = d;
    this._x56 = null;
    this._x54 = null;
    this._x67 = function(b, f, a) {
        return this._x26._x6e(b, f) ? (a << 1) | 1 : a << 1
    };
    this._x52 = function() {
        if (this._x54 != null) {
            return this._x54
        }
        var a = 0;
        for (var h = 0; h < 6; h++) {
            a = this._x67(h, 8, a)
        }
        a = this._x67(7, 8, a);
        a = this._x67(8, 8, a);
        a = this._x67(8, 7, a);
        for (var j = 5; j >= 0; j--) {
            a = this._x67(8, j, a)
        }
        this._x54 = _x2a._x4e(a);
        if (this._x54 != null) {
            return this._x54
        }
        var b = this._x26.Dimension;
        a = 0;
        var i = b - 8;
        for (var h = b - 1; h >= i; h--) {
            a = this._x67(h, 8, a)
        }
        for (var j = b - 7; j < b; j++) {
            a = this._x67(8, j, a)
        }
        this._x54 = _x2a._x4e(a);
        if (this._x54 != null) {
            return this._x54
        }
        throw "Error _x52"
    };
    this._x55 = function() {
        if (this._x56 != null) {
            return this._x56
        }
        var a = this._x26.Dimension;
        var i = (a - 17) >> 2;
        if (i <= 6) {
            return _x22._x27(i)
        }
        var b = 0;
        var j = a - 11;
        for (var l = 5; l >= 0; l--) {
            for (var k = a - 9; k >= j; k--) {
                b = this._x67(k, l, b)
            }
        }
        this._x56 = _x22._x29(b);
        if (this._x56 != null && this._x56._x57 == a) {
            return this._x56
        }
        b = 0;
        for (var k = 5; k >= 0; k--) {
            for (var l = a - 9; l >= j; l--) {
                b = this._x67(k, l, b)
            }
        }
        this._x56 = _x22._x29(b);
        if (this._x56 != null && this._x56._x57 == a) {
            return this._x56
        }
        throw "Error _x55"
    };
    this._xb1 = function() {
        var a = this._x52();
        var i = this._x55();
        var B = _x73._xb2(a._x73);
        var y = this._x26.Dimension;
        B._x66(this._x26, y);
        var v = i._x25();
        var j = true;
        var C = new Array(i._x6c);
        var t = 0;
        var b = 0;
        var w = 0;
        for (var z = y - 1; z > 0; z -= 2) {
            if (z == 6) {
                z--
            }
            for (var u = 0; u < y; u++) {
                var x = j ? y - 1 - u : u;
                for (var A = 0; A < 2; A++) {
                    if (!v._x6e(z - A, x)) {
                        w++;
                        b <<= 1;
                        if (this._x26._x6e(z - A, x)) {
                            b |= 1
                        }
                        if (w == 8) {
                            C[t++] = b;
                            w = 0;
                            b = 0
                        }
                    }
                }
            }
            j ^= true
        }
        if (t != i._x6c) {
            throw "Error _xb1"
        }
        return C
    }
}
_x73 = {};
_x73._xb2 = function(b) {
    if (b < 0 || b > 7) {
        throw "System._xbc"
    }
    return _x73._x74[b]
};

function _x95() {
    this._x66 = function(h, g) {
        for (var e = 0; e < g; e++) {
            for (var f = 0; f < g; f++) {
                if (this._xa4(e, f)) {
                    h.flip(f, e)
                }
            }
        }
    };
    this._xa4 = function(c, d) {
        return ((c + d) & 1) == 0
    }
}

function _x96() {
    this._x66 = function(h, g) {
        for (var e = 0; e < g; e++) {
            for (var f = 0; f < g; f++) {
                if (this._xa4(e, f)) {
                    h.flip(f, e)
                }
            }
        }
    };
    this._xa4 = function(c, d) {
        return (c & 1) == 0
    }
}

function _x97() {
    this._x66 = function(h, g) {
        for (var e = 0; e < g; e++) {
            for (var f = 0; f < g; f++) {
                if (this._xa4(e, f)) {
                    h.flip(f, e)
                }
            }
        }
    };
    this._xa4 = function(c, d) {
        return d % 3 == 0
    }
}

function _x98() {
    this._x66 = function(h, g) {
        for (var e = 0; e < g; e++) {
            for (var f = 0; f < g; f++) {
                if (this._xa4(e, f)) {
                    h.flip(f, e)
                }
            }
        }
    };
    this._xa4 = function(c, d) {
        return (c + d) % 3 == 0
    }
}

function _x99() {
    this._x66 = function(h, g) {
        for (var e = 0; e < g; e++) {
            for (var f = 0; f < g; f++) {
                if (this._xa4(e, f)) {
                    h.flip(f, e)
                }
            }
        }
    };
    this._xa4 = function(c, d) {
        return (((_x8b(c, 1)) + (d / 3)) & 1) == 0
    }
}

function _x9a() {
    this._x66 = function(h, g) {
        for (var e = 0; e < g; e++) {
            for (var f = 0; f < g; f++) {
                if (this._xa4(e, f)) {
                    h.flip(f, e)
                }
            }
        }
    };
    this._xa4 = function(f, d) {
        var e = f * d;
        return (e & 1) + (e % 3) == 0
    }
}

function _x9b() {
    this._x66 = function(h, g) {
        for (var e = 0; e < g; e++) {
            for (var f = 0; f < g; f++) {
                if (this._xa4(e, f)) {
                    h.flip(f, e)
                }
            }
        }
    };
    this._xa4 = function(f, d) {
        var e = f * d;
        return (((e & 1) + (e % 3)) & 1) == 0
    }
}

function _x9c() {
    this._x66 = function(h, g) {
        for (var e = 0; e < g; e++) {
            for (var f = 0; f < g; f++) {
                if (this._xa4(e, f)) {
                    h.flip(f, e)
                }
            }
        }
    };
    this._xa4 = function(c, d) {
        return ((((c + d) & 1) + ((c * d) % 3)) & 1) == 0
    }
}
_x73._x74 = new Array(new _x95(), new _x96(), new _x97(), new _x98(), new _x99(), new _x9a(), new _x9b(), new _x9c());

function _x5e(_x8f) {
    this._x8f = _x8f;
    this.decode = function(received, _xa3) {
        var poly = new _x3c(this._x8f, received);
        var _x64 = new Array(_xa3);
        for (var i = 0; i < _x64.length; i++) {
            _x64[i] = 0
        }
        var _xa1 = false;
        var noError = true;
        for (var i = 0; i < _xa3; i++) {
            var eval = poly.evaluateAt(this._x8f.exp(_xa1 ? i + 1 : i));
            _x64[_x64.length - 1 - i] = eval;
            if (eval != 0) {
                noError = false
            }
        }
        if (noError) {
            return
        }
        var _xa2 = new _x3c(this._x8f, _x64);
        var _x63 = this._x77(this._x8f._x2d(_xa3, 1), _xa2, _xa3);
        var sigma = _x63[0];
        var omega = _x63[1];
        var _x75 = this._x8d(sigma);
        var _x76 = this._x65(omega, _x75, _xa1);
        for (var i = 0; i < _x75.length; i++) {
            var position = received.length - 1 - this._x8f.log(_x75[i]);
            if (position < 0) {
                throw "ReedSolomonException Bad error location"
            }
            received[position] = _x2c._x30(received[position], _x76[i])
        }
    };
    this._x77 = function(a, b, R) {
        if (a._x78 < b._x78) {
            var temp = a;
            a = b;
            b = temp
        }
        var rLast = a;
        var r = b;
        var sLast = this._x8f.One;
        var s = this._x8f.Zero;
        var tLast = this._x8f.Zero;
        var t = this._x8f.One;
        while (r._x78 >= Math.floor(R / 2)) {
            var rLastLast = rLast;
            var _xa8 = sLast;
            var _xa9 = tLast;
            rLast = r;
            sLast = s;
            tLast = t;
            if (rLast.Zero) {
                throw "r_{i-1} was zero"
            }
            r = rLastLast;
            var q = this._x8f.Zero;
            var _x62 = rLast._x8c(rLast._x78);
            var _xa6 = this._x8f.inverse(_x62);
            while (r._x78 >= rLast._x78 && !r.Zero) {
                var _xa5 = r._x78 - rLast._x78;
                var scale = this._x8f.multiply(r._x8c(r._x78), _xa6);
                q = q._x30(this._x8f._x2d(_xa5, scale));
                r = r._x30(rLast._x5f(_xa5, scale))
            }
            s = q.multiply1(sLast)._x30(_xa8);
            t = q.multiply1(tLast)._x30(_xa9)
        }
        var _x61 = t._x8c(0);
        if (_x61 == 0) {
            throw "ReedSolomonException sigmaTilde(0) was zero"
        }
        var inverse = this._x8f.inverse(_x61);
        var sigma = t.multiply2(inverse);
        var omega = r.multiply2(inverse);
        return new Array(sigma, omega)
    };
    this._x8d = function(_x8e) {
        var _xa7 = _x8e._x78;
        if (_xa7 == 1) {
            return new Array(_x8e._x8c(1))
        }
        var result = new Array(_xa7);
        var e = 0;
        for (var i = 1; i < 256 && e < _xa7; i++) {
            if (_x8e.evaluateAt(i) == 0) {
                result[e] = this._x8f.inverse(i);
                e++
            }
        }
        if (e != _xa7) {
            throw "Error locator degree does not match number of roots"
        }
        return result
    };
    this._x65 = function(_xa0, _x75, _xa1) {
        var s = _x75.length;
        var result = new Array(s);
        for (var i = 0; i < s; i++) {
            var _xaa = this._x8f.inverse(_x75[i]);
            var _x6d = 1;
            for (var j = 0; j < s; j++) {
                if (i != j) {
                    _x6d = this._x8f.multiply(_x6d, _x2c._x30(1, this._x8f.multiply(_x75[j], _xaa)))
                }
            }
            result[i] = this._x8f.multiply(_xa0.evaluateAt(_xaa), this._x8f.inverse(_x6d));
            if (_xa1) {
                result[i] = this._x8f.multiply(result[i], _xaa)
            }
        }
        return result
    }
}

function _x3c(i, j) {
    if (j == null || j.length == 0) {
        throw "System._xbc"
    }
    this._x8f = i;
    var l = j.length;
    if (l > 1 && j[0] == 0) {
        var k = 1;
        while (k < l && j[k] == 0) {
            k++
        }
        if (k == l) {
            this._x60 = i.Zero._x60
        } else {
            this._x60 = new Array(l - k);
            for (var g = 0; g < this._x60.length; g++) {
                this._x60[g] = 0
            }
            for (var h = 0; h < this._x60.length; h++) {
                this._x60[h] = j[k + h]
            }
        }
    } else {
        this._x60 = j
    }
    this.__defineGetter__("Zero", function() {
        return this._x60[0] == 0
    });
    this.__defineGetter__("_x78", function() {
        return this._x60.length - 1
    });
    this.__defineGetter__("Coefficients", function() {
        return this._x60
    });
    this._x8c = function(a) {
        return this._x60[this._x60.length - 1 - a]
    };
    this.evaluateAt = function(d) {
        if (d == 0) {
            return this._x8c(0)
        }
        var a = this._x60.length;
        if (d == 1) {
            var e = 0;
            for (var b = 0; b < a; b++) {
                e = _x2c._x30(e, this._x60[b])
            }
            return e
        }
        var c = this._x60[0];
        for (var b = 1; b < a; b++) {
            c = _x2c._x30(this._x8f.multiply(d, c), this._x60[b])
        }
        return c
    };
    this._x30 = function(f) {
        if (this._x8f != f._x8f) {
            throw "GF256Polys do not have same _x2c _x8f"
        }
        if (this.Zero) {
            return f
        }
        if (f.Zero) {
            return this
        }
        var q = this._x60;
        var r = f._x60;
        if (q.length > r.length) {
            var d = q;
            q = r;
            r = d
        }
        var e = new Array(r.length);
        var c = r.length - q.length;
        for (var a = 0; a < c; a++) {
            e[a] = r[a]
        }
        for (var b = c; b < r.length; b++) {
            e[b] = _x2c._x30(q[b - c], r[b])
        }
        return new _x3c(i, e)
    };
    this.multiply1 = function(c) {
        if (this._x8f != c._x8f) {
            throw "GF256Polys do not have same _x2c _x8f"
        }
        if (this.Zero || c.Zero) {
            return this._x8f.Zero
        }
        var a = this._x60;
        var u = a.length;
        var f = c._x60;
        var d = f.length;
        var b = new Array(u + d - 1);
        for (var e = 0; e < u; e++) {
            var t = a[e];
            for (var s = 0; s < d; s++) {
                b[e + s] = _x2c._x30(b[e + s], this._x8f.multiply(t, f[s]))
            }
        }
        return new _x3c(this._x8f, b)
    };
    this.multiply2 = function(d) {
        if (d == 0) {
            return this._x8f.Zero
        }
        if (d == 1) {
            return this
        }
        var b = this._x60.length;
        var a = new Array(b);
        for (var c = 0; c < b; c++) {
            a[c] = this._x8f.multiply(this._x60[c], d)
        }
        return new _x3c(this._x8f, a)
    };
    this._x5f = function(a, e) {
        if (a < 0) {
            throw "System._xbc"
        }
        if (e == 0) {
            return this._x8f.Zero
        }
        var c = this._x60.length;
        var b = new Array(c + a);
        for (var d = 0; d < b.length; d++) {
            b[d] = 0
        }
        for (var d = 0; d < c; d++) {
            b[d] = this._x8f.multiply(this._x60[d], e)
        }
        return new _x3c(this._x8f, b)
    };
    this.divide = function(d) {
        if (this._x8f != d._x8f) {
            throw "GF256Polys do not have same _x2c _x8f"
        }
        if (d.Zero) {
            throw "Divide by 0"
        }
        var f = this._x8f.Zero;
        var a = this;
        var s = d._x8c(d._x78);
        var b = this._x8f.inverse(s);
        while (a._x78 >= d._x78 && !a.Zero) {
            var c = a._x78 - d._x78;
            var r = this._x8f.multiply(a._x8c(a._x78), b);
            var q = d._x5f(c, r);
            var e = this._x8f._x2d(c, r);
            f = f._x30(e);
            a = a._x30(q)
        }
        return new Array(f, a)
    }
}

function _x2c(f) {
    this._xae = new Array(256);
    this._xaf = new Array(256);
    var g = 1;
    for (var h = 0; h < 256; h++) {
        this._xae[h] = g;
        g <<= 1;
        if (g >= 256) {
            g ^= f
        }
    }
    for (var h = 0; h < 255; h++) {
        this._xaf[this._xae[h]] = h
    }
    var i = new Array(1);
    i[0] = 0;
    this.zero = new _x3c(this, new Array(i));
    var j = new Array(1);
    j[0] = 1;
    this.one = new _x3c(this, new Array(j));
    this.__defineGetter__("Zero", function() {
        return this.zero
    });
    this.__defineGetter__("One", function() {
        return this.one
    });
    this._x2d = function(a, d) {
        if (a < 0) {
            throw "System._xbc"
        }
        if (d == 0) {
            return zero
        }
        var b = new Array(a + 1);
        for (var c = 0; c < b.length; c++) {
            b[c] = 0
        }
        b[0] = d;
        return new _x3c(this, b)
    };
    this.exp = function(a) {
        return this._xae[a]
    };
    this.log = function(a) {
        if (a == 0) {
            throw "System._xbc"
        }
        return this._xaf[a]
    };
    this.inverse = function(a) {
        if (a == 0) {
            throw "System.ArithmeticException"
        }
        return this._xae[255 - this._xaf[a]]
    };
    this.multiply = function(a, b) {
        if (a == 0 || b == 0) {
            return 0
        }
        if (a == 1) {
            return b
        }
        if (b == 1) {
            return a
        }
        return this._xae[(this._xaf[a] + this._xaf[b]) % 255]
    }
}
_x2c._x2e = new _x2c(285);
_x2c._x2f = new _x2c(301);
_x2c._x30 = function(a, b) {
    return a ^ b
};
Decoder = {};
Decoder.rsDecoder = new _x5e(_x2c._x2e);
Decoder.correctErrors = function(j, h) {
    var m = j.length;
    var k = new Array(m);
    for (var l = 0; l < m; l++) {
        k[l] = j[l] & 255
    }
    var i = j.length - h;
    try {
        Decoder.rsDecoder.decode(k, i)
    } catch (n) {
        throw n
    }
    for (var l = 0; l < h; l++) {
        j[l] = k[l]
    }
};
Decoder.decode = function(i) {
    var D = new _x51(i);
    var s = D._x55();
    var C = D._x52()._x4c;
    var j = D._xb1();
    var E = _x68._xb4(j, s, C);
    var z = 0;
    for (var w = 0; w < E.Length; w++) {
        z += E[w]._x70
    }
    var A = new Array(z);
    var t = 0;
    for (var x = 0; x < E.length; x++) {
        var u = E[x];
        var B = u.Codewords;
        var y = u._x70;
        Decoder.correctErrors(B, y);
        for (var w = 0; w < y; w++) {
            A[t++] = B[w]
        }
    }
    var v = new QRCodeDataBlockReader(A, s._x92, C.Bits);
    return v
};
qrcode = {};
qrcode.imagedata = null;
qrcode.width = 0;
qrcode.height = 0;
qrcode.qrCodeSymbol = null;
qrcode._x84 = [
    [10, 9, 8, 8],
    [12, 11, 16, 10],
    [14, 13, 16, 12]
];
qrcode.callback = null;
qrcode.decode = function(g) {
    if (arguments.length == 0) {
        var e = document.getElementById("qr-canvas");
        var f = e.getContext("2d");
        qrcode.width = e.width;
        qrcode.height = e.height;
        qrcode.imagedata = f.getImageData(0, 0, qrcode.width, qrcode.height);
        qrcode.result = qrcode.process(f);
        if (qrcode.callback != null) {
            qrcode.callback(qrcode.result)
        }
        return qrcode.result
    } else {
        var h = new Image();
        h.onload = function() {
            var b = document.createElement("canvas");
            var c = b.getContext("2d");
            var k = document.getElementById("out-canvas");
            if (k != null) {
                var d = k.getContext("2d");
                d.clearRect(0, 0, 320, 240);
                d.drawImage(h, 0, 0, 320, 240)
            }
            b.width = h.width;
            b.height = h.height;
            c.drawImage(h, 0, 0);
            qrcode.width = h.width;
            qrcode.height = h.height;
            try {
                qrcode.imagedata = c.getImageData(0, 0, h.width, h.height)
            } catch (a) {
                qrcode.result = "Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!";
                if (qrcode.callback != null) {
                    qrcode.callback(qrcode.result)
                }
                return
            }
            try {
                qrcode.result = qrcode.process(c)
            } catch (a) {
                console.log(a);
                qrcode.result = null
            }
            if (qrcode.callback != null) {
                qrcode.callback(qrcode.result)
            }
        };
        h.src = g
    }
};
qrcode.process = function(i) {
    var A = new Date().getTime();
    var y = qrcode.grayScaleToBitmap(qrcode.grayscale());
    var q = new _x48()._x4a(y);
    var t = new Detector(y);
    var j = t.detect();
    i.putImageData(qrcode.imagedata, 0, 0);
    var s = Decoder.decode(j.bits);
    var u = s.DataByte;
    var r = "";
    for (var v = 0; v < u.length; v++) {
        for (var w = 0; w < u[v].length; w++) {
            r += String.fromCharCode(u[v][w])
        }
    }
    var x = new Date().getTime();
    var z = x - A;
    console.log(z);
    return r
};
qrcode.getPixel = function(d, c) {
    if (qrcode.width < d) {
        throw "point error"
    }
    if (qrcode.height < c) {
        throw "point error"
    }
    point = (d * 4) + (c * qrcode.width * 4);
    p = (qrcode.imagedata.data[point] * 30 + qrcode.imagedata.data[point + 1] * 59 + qrcode.imagedata.data[point + 2] * 11) / 100;
    return p
};
qrcode.binarize = function(i) {
    var j = new Array(qrcode.width * qrcode.height);
    for (var h = 0; h < qrcode.height; h++) {
        for (var f = 0; f < qrcode.width; f++) {
            var g = qrcode.getPixel(f, h);
            j[f + h * qrcode.width] = g <= i ? true : false
        }
    }
    return j
};
qrcode._x82 = function(z) {
    var A = 4;
    var t = Math.floor(qrcode.width / A);
    var u = Math.floor(qrcode.height / A);
    var x = new Array(A);
    for (var w = 0; w < A; w++) {
        x[w] = new Array(A);
        for (var y = 0; y < A; y++) {
            x[w][y] = new Array(0, 0)
        }
    }
    for (var i = 0; i < A; i++) {
        for (var C = 0; C < A; C++) {
            x[C][i][0] = 255;
            for (var s = 0; s < u; s++) {
                for (var q = 0; q < t; q++) {
                    var v = z[t * C + q + (u * i + s) * qrcode.width];
                    if (v < x[C][i][0]) {
                        x[C][i][0] = v
                    }
                    if (v > x[C][i][1]) {
                        x[C][i][1] = v
                    }
                }
            }
        }
    }
    var r = new Array(A);
    for (var B = 0; B < A; B++) {
        r[B] = new Array(A)
    }
    for (var i = 0; i < A; i++) {
        for (var C = 0; C < A; C++) {
            r[C][i] = Math.floor((x[C][i][0] + x[C][i][1]) / 2)
        }
    }
    return r
};
qrcode.grayScaleToBitmap = function(o) {
    var k = qrcode._x82(o);
    var t = k.length;
    var q = Math.floor(qrcode.width / t);
    var r = Math.floor(qrcode.height / t);
    var s = new Array(qrcode.height * qrcode.width);
    for (var l = 0; l < t; l++) {
        for (var u = 0; u < t; u++) {
            for (var n = 0; n < r; n++) {
                for (var m = 0; m < q; m++) {
                    s[q * u + m + (r * l + n) * qrcode.width] = (o[q * u + m + (r * l + n) * qrcode.width] < k[u][l]) ? true : false
                }
            }
        }
    }
    return s
};
qrcode.grayscale = function() {
    var h = new Array(qrcode.width * qrcode.height);
    for (var g = 0; g < qrcode.height; g++) {
        for (var e = 0; e < qrcode.width; e++) {
            var f = qrcode.getPixel(e, g);
            h[e + g * qrcode.width] = f
        }
    }
    return h
};

function _x8b(d, c) {
    if (d >= 0) {
        return d >> c
    } else {
        return (d >> c) + (2 << ~c)
    }
}
ArrayRemove = function(g, f, d) {
    var e = g.slice((d || f) + 1 || g.length);
    g.length = f < 0 ? g.length + f : f;
    return g.push.apply(g, e)
};
var _xad = 3;
var _x7d = 57;
var _x81 = 8;
var _x7c = 2;
qrcode._x86 = function(s) {
    function t(a, b) {
        xDiff = a.X - b.X;
        yDiff = a.Y - b.Y;
        return Math.sqrt((xDiff * xDiff + yDiff * yDiff))
    }

    function r(c, d, e) {
        var a = d.x;
        var b = d.y;
        return ((e.x - a) * (c.y - b)) - ((e.y - b) * (c.x - a))
    }
    var l = t(s[0], s[1]);
    var o = t(s[1], s[2]);
    var q = t(s[0], s[2]);
    var u, k, m;
    if (o >= l && o >= q) {
        k = s[0];
        u = s[1];
        m = s[2]
    } else {
        if (q >= o && q >= l) {
            k = s[1];
            u = s[0];
            m = s[2]
        } else {
            k = s[2];
            u = s[0];
            m = s[1]
        }
    } if (r(u, k, m) < 0) {
        var n = u;
        u = m;
        m = n
    }
    s[0] = u;
    s[1] = k;
    s[2] = m
};

function _x5c(f, e, d) {
    this.x = f;
    this.y = e;
    this.count = 1;
    this._x19 = d;
    this.__defineGetter__("_x7e", function() {
        return this._x19
    });
    this.__defineGetter__("Count", function() {
        return this.count
    });
    this.__defineGetter__("X", function() {
        return this.x
    });
    this.__defineGetter__("Y", function() {
        return this.y
    });
    this._x80 = function() {
        this.count++
    };
    this._x8a = function(b, c, h) {
        if (Math.abs(c - this.y) <= b && Math.abs(h - this.x) <= b) {
            var a = Math.abs(b - this._x19);
            return a <= 1 || a / this._x19 <= 1
        }
        return false
    }
}

function _x87(b) {
    this._xb5 = b[0];
    this._xba = b[1];
    this._xb7 = b[2];
    this.__defineGetter__("_xb6", function() {
        return this._xb5
    });
    this.__defineGetter__("_xb9", function() {
        return this._xba
    });
    this.__defineGetter__("_xb8", function() {
        return this._xb7
    })
}

function _x48() {
    this.image = null;
    this._x59 = [];
    this._xac = false;
    this._x1b = new Array(0, 0, 0, 0, 0);
    this._x1c = null;
    this.__defineGetter__("_x5d", function() {
        this._x1b[0] = 0;
        this._x1b[1] = 0;
        this._x1b[2] = 0;
        this._x1b[3] = 0;
        this._x1b[4] = 0;
        return this._x1b
    });
    this._x1e = function(i) {
        var g = 0;
        for (var k = 0; k < 5; k++) {
            var j = i[k];
            if (j == 0) {
                return false
            }
            g += j
        }
        if (g < 7) {
            return false
        }
        var l = Math.floor((g << _x81) / 7);
        var h = Math.floor(l / 2);
        return Math.abs(l - (i[0] << _x81)) < h && Math.abs(l - (i[1] << _x81)) < h && Math.abs(3 * l - (i[2] << _x81)) < 3 * h && Math.abs(l - (i[3] << _x81)) < h && Math.abs(l - (i[4] << _x81)) < h
    };
    this._x1d = function(c, d) {
        return (d - c[4] - c[3]) - c[2] / 2
    };
    this._x1f = function(s, i, o, l) {
        var q = this.image;
        var k = qrcode.height;
        var r = this._x5d;
        var m = s;
        while (m >= 0 && q[i + m * qrcode.width]) {
            r[2]++;
            m--
        }
        if (m < 0) {
            return NaN
        }
        while (m >= 0 && !q[i + m * qrcode.width] && r[1] <= o) {
            r[1]++;
            m--
        }
        if (m < 0 || r[1] > o) {
            return NaN
        }
        while (m >= 0 && q[i + m * qrcode.width] && r[0] <= o) {
            r[0]++;
            m--
        }
        if (r[0] > o) {
            return NaN
        }
        m = s + 1;
        while (m < k && q[i + m * qrcode.width]) {
            r[2]++;
            m++
        }
        if (m == k) {
            return NaN
        }
        while (m < k && !q[i + m * qrcode.width] && r[3] < o) {
            r[3]++;
            m++
        }
        if (m == k || r[3] >= o) {
            return NaN
        }
        while (m < k && q[i + m * qrcode.width] && r[4] < o) {
            r[4]++;
            m++
        }
        if (r[4] >= o) {
            return NaN
        }
        var n = r[0] + r[1] + r[2] + r[3] + r[4];
        if (5 * Math.abs(n - l) >= 2 * l) {
            return NaN
        }
        return this._x1e(r) ? this._x1d(r, m) : NaN
    };
    this._x7f = function(r, s, n, k) {
        var o = this.image;
        var j = qrcode.width;
        var q = this._x5d;
        var l = r;
        while (l >= 0 && o[l + s * qrcode.width]) {
            q[2]++;
            l--
        }
        if (l < 0) {
            return NaN
        }
        while (l >= 0 && !o[l + s * qrcode.width] && q[1] <= n) {
            q[1]++;
            l--
        }
        if (l < 0 || q[1] > n) {
            return NaN
        }
        while (l >= 0 && o[l + s * qrcode.width] && q[0] <= n) {
            q[0]++;
            l--
        }
        if (q[0] > n) {
            return NaN
        }
        l = r + 1;
        while (l < j && o[l + s * qrcode.width]) {
            q[2]++;
            l++
        }
        if (l == j) {
            return NaN
        }
        while (l < j && !o[l + s * qrcode.width] && q[3] < n) {
            q[3]++;
            l++
        }
        if (l == j || q[3] >= n) {
            return NaN
        }
        while (l < j && o[l + s * qrcode.width] && q[4] < n) {
            q[4]++;
            l++
        }
        if (q[4] >= n) {
            return NaN
        }
        var m = q[0] + q[1] + q[2] + q[3] + q[4];
        if (5 * Math.abs(m - k) >= k) {
            return NaN
        }
        return this._x1e(q) ? this._x1d(q, l) : NaN
    };
    this._x58 = function(w, t, u) {
        var v = w[0] + w[1] + w[2] + w[3] + w[4];
        var i = this._x1d(w, u);
        var x = this._x1f(t, Math.floor(i), w[2], v);
        if (!isNaN(x)) {
            i = this._x7f(Math.floor(i), Math.floor(x), w[2], v);
            if (!isNaN(i)) {
                var o = v / 7;
                var j = false;
                var r = this._x59.length;
                for (var s = 0; s < r; s++) {
                    var y = this._x59[s];
                    if (y._x8a(o, x, i)) {
                        y._x80();
                        j = true;
                        break
                    }
                }
                if (!j) {
                    var q = new _x5c(i, x, o);
                    this._x59.push(q);
                    if (this._x1c != null) {
                        this._x1c._x85(q)
                    }
                }
                return true
            }
        }
        return false
    };
    this._x7a = function() {
        var g = this._x59.length;
        if (g < 3) {
            throw "Couldn't find enough finder patterns"
        }
        if (g > 3) {
            var f = 0;
            for (var j = 0; j < g; j++) {
                f += this._x59[j]._x7e
            }
            var i = f / g;
            for (var j = 0; j < this._x59.length && this._x59.length > 3; j++) {
                var h = this._x59[j];
                if (Math.abs(h._x7e - i) > 0.2 * i) {
                    ArrayRemove(this._x59, j);
                    j--
                }
            }
        }
        if (this._x59.Count > 3) {}
        return new Array(this._x59[0], this._x59[1], this._x59[2])
    };
    this._x88 = function() {
        var e = this._x59.length;
        if (e <= 1) {
            return 0
        }
        var h = null;
        for (var g = 0; g < e; g++) {
            var f = this._x59[g];
            if (f.Count >= _x7c) {
                if (h == null) {
                    h = f
                } else {
                    this._xac = true;
                    return Math.floor((Math.abs(h.X - f.X) - Math.abs(h.Y - f.Y)) / 2)
                }
            }
        }
        return 0
    };
    this._x5b = function() {
        var j = 0;
        var n = 0;
        var i = this._x59.length;
        for (var m = 0; m < i; m++) {
            var k = this._x59[m];
            if (k.Count >= _x7c) {
                j++;
                n += k._x7e
            }
        }
        if (j < 3) {
            return false
        }
        var l = n / i;
        var h = 0;
        for (var m = 0; m < i; m++) {
            k = this._x59[m];
            h += Math.abs(k._x7e - l)
        }
        return h <= 0.05 * n
    };
    this._x4a = function(w) {
        var i = false;
        this.image = w;
        var j = qrcode.height;
        var s = qrcode.width;
        var A = Math.floor((3 * j) / (4 * _x7d));
        if (A < _xad || i) {
            A = _xad
        }
        var u = false;
        var x = new Array(5);
        for (var t = A - 1; t < j && !u; t += A) {
            x[0] = 0;
            x[1] = 0;
            x[2] = 0;
            x[3] = 0;
            x[4] = 0;
            var z = 0;
            for (var v = 0; v < s; v++) {
                if (w[v + t * qrcode.width]) {
                    if ((z & 1) == 1) {
                        z++
                    }
                    x[z]++
                } else {
                    if ((z & 1) == 0) {
                        if (z == 4) {
                            if (this._x1e(x)) {
                                var y = this._x58(x, t, v);
                                if (y) {
                                    A = 2;
                                    if (this._xac) {
                                        u = this._x5b()
                                    } else {
                                        var q = this._x88();
                                        if (q > x[2]) {
                                            t += q - x[2] - A;
                                            v = s - 1
                                        }
                                    }
                                } else {
                                    do {
                                        v++
                                    } while (v < s && !w[v + t * qrcode.width]);
                                    v--
                                }
                                z = 0;
                                x[0] = 0;
                                x[1] = 0;
                                x[2] = 0;
                                x[3] = 0;
                                x[4] = 0
                            } else {
                                x[0] = x[2];
                                x[1] = x[3];
                                x[2] = x[4];
                                x[3] = 1;
                                x[4] = 0;
                                z = 3
                            }
                        } else {
                            x[++z]++
                        }
                    } else {
                        x[z]++
                    }
                }
            }
            if (this._x1e(x)) {
                var y = this._x58(x, t, s);
                if (y) {
                    A = x[0];
                    if (this._xac) {
                        u = _x5b()
                    }
                }
            }
        }
        var r = this._x7a();
        qrcode._x86(r);
        return new _x87(r)
    }
}

function _x18(f, e, d) {
    this.x = f;
    this.y = e;
    this.count = 1;
    this._x19 = d;
    this.__defineGetter__("_x7e", function() {
        return this._x19
    });
    this.__defineGetter__("Count", function() {
        return this.count
    });
    this.__defineGetter__("X", function() {
        return Math.floor(this.x)
    });
    this.__defineGetter__("Y", function() {
        return Math.floor(this.y)
    });
    this._x80 = function() {
        this.count++
    };
    this._x8a = function(b, c, h) {
        if (Math.abs(c - this.y) <= b && Math.abs(h - this.x) <= b) {
            var a = Math.abs(b - this._x19);
            return a <= 1 || a / this._x19 <= 1
        }
        return false
    }
}

function _x1a(j, n, h, k, i, l, m) {
    this.image = j;
    this._x59 = new Array();
    this.startX = n;
    this.startY = h;
    this.width = k;
    this.height = i;
    this._x7b = l;
    this._x1b = new Array(0, 0, 0);
    this._x1c = m;
    this._x1d = function(a, b) {
        return (b - a[2]) - a[1] / 2
    };
    this._x1e = function(a) {
        var b = this._x7b;
        var d = b / 2;
        for (var c = 0; c < 3; c++) {
            if (Math.abs(b - a[c]) >= d) {
                return false
            }
        }
        return true
    };
    this._x1f = function(t, a, f, c) {
        var g = this.image;
        var b = qrcode.height;
        var s = this._x1b;
        s[0] = 0;
        s[1] = 0;
        s[2] = 0;
        var d = t;
        while (d >= 0 && g[a + d * qrcode.width] && s[1] <= f) {
            s[1]++;
            d--
        }
        if (d < 0 || s[1] > f) {
            return NaN
        }
        while (d >= 0 && !g[a + d * qrcode.width] && s[0] <= f) {
            s[0]++;
            d--
        }
        if (s[0] > f) {
            return NaN
        }
        d = t + 1;
        while (d < b && g[a + d * qrcode.width] && s[1] <= f) {
            s[1]++;
            d++
        }
        if (d == b || s[1] > f) {
            return NaN
        }
        while (d < b && !g[a + d * qrcode.width] && s[2] <= f) {
            s[2]++;
            d++
        }
        if (s[2] > f) {
            return NaN
        }
        var e = s[0] + s[1] + s[2];
        if (5 * Math.abs(e - c) >= 2 * c) {
            return NaN
        }
        return this._x1e(s) ? this._x1d(s, d) : NaN
    };
    this._x58 = function(f, c, d) {
        var e = f[0] + f[1] + f[2];
        var w = this._x1d(f, d);
        var g = this._x1f(c, Math.floor(w), 2 * f[1], e);
        if (!isNaN(g)) {
            var x = (f[0] + f[1] + f[2]) / 3;
            var a = this._x59.length;
            for (var b = 0; b < a; b++) {
                var v = this._x59[b];
                if (v._x8a(x, g, w)) {
                    return new _x18(w, g, x)
                }
            }
            var y = new _x18(w, g, x);
            this._x59.push(y);
            if (this._x1c != null) {
                this._x1c._x85(y)
            }
        }
        return null
    };
    this.find = function() {
        var b = this.startX;
        var v = this.height;
        var a = b + k;
        var w = h + (v >> 1);
        var e = new Array(0, 0, 0);
        for (var g = 0; g < v; g++) {
            var c = w + ((g & 1) == 0 ? ((g + 1) >> 1) : -((g + 1) >> 1));
            e[0] = 0;
            e[1] = 0;
            e[2] = 0;
            var d = b;
            while (d < a && !j[d + qrcode.width * c]) {
                d++
            }
            var u = 0;
            while (d < a) {
                if (j[d + c * qrcode.width]) {
                    if (u == 1) {
                        e[u]++
                    } else {
                        if (u == 2) {
                            if (this._x1e(e)) {
                                var f = this._x58(e, c, d);
                                if (f != null) {
                                    return f
                                }
                            }
                            e[0] = e[2];
                            e[1] = 1;
                            e[2] = 0;
                            u = 1
                        } else {
                            e[++u]++
                        }
                    }
                } else {
                    if (u == 1) {
                        u++
                    }
                    e[u]++
                }
                d++
            }
            if (this._x1e(e)) {
                var f = this._x58(e, c, a);
                if (f != null) {
                    return f
                }
            }
        }
        if (!(this._x59.length == 0)) {
            return this._x59[0]
        }
        throw "Couldn't find enough alignment patterns"
    }
}

function QRCodeDataBlockReader(f, e, d) {
    this._x79 = 0;
    this._x5a = 7;
    this._xc2 = 0;
    this.blocks = f;
    this._x83 = d;
    if (e <= 9) {
        this._xc3 = 0
    } else {
        if (e >= 10 && e <= 26) {
            this._xc3 = 1
        } else {
            if (e >= 27 && e <= 40) {
                this._xc3 = 2
            }
        }
    }
    this._xab = function(q) {
        var c = 0;
        if (q < this._x5a + 1) {
            var a = 0;
            for (var r = 0; r < q; r++) {
                a += (1 << r)
            }
            a <<= (this._x5a - q + 1);
            c = (this.blocks[this._x79] & a) >> (this._x5a - q + 1);
            this._x5a -= q;
            return c
        } else {
            if (q < this._x5a + 1 + 8) {
                var i = 0;
                for (var r = 0; r < this._x5a + 1; r++) {
                    i += (1 << r)
                }
                c = (this.blocks[this._x79] & i) << (q - (this._x5a + 1));
                this._x79++;
                c += ((this.blocks[this._x79]) >> (8 - (q - (this._x5a + 1))));
                this._x5a = this._x5a - q % 8;
                if (this._x5a < 0) {
                    this._x5a = 8 + this._x5a
                }
                return c
            } else {
                if (q < this._x5a + 1 + 16) {
                    var i = 0;
                    var n = 0;
                    for (var r = 0; r < this._x5a + 1; r++) {
                        i += (1 << r)
                    }
                    var o = (this.blocks[this._x79] & i) << (q - (this._x5a + 1));
                    this._x79++;
                    var s = this.blocks[this._x79] << (q - (this._x5a + 1 + 8));
                    this._x79++;
                    for (var r = 0; r < q - (this._x5a + 1 + 8); r++) {
                        n += (1 << r)
                    }
                    n <<= 8 - (q - (this._x5a + 1 + 8));
                    var b = (this.blocks[this._x79] & n) >> (8 - (q - (this._x5a + 1 + 8)));
                    c = o + s + b;
                    this._x5a = this._x5a - (q - 8) % 8;
                    if (this._x5a < 0) {
                        this._x5a = 8 + this._x5a
                    }
                    return c
                } else {
                    return 0
                }
            }
        }
    };
    this._xc4 = function() {
        if ((this._x79 > this.blocks.length - this._x83 - 2)) {
            return 0
        } else {
            return this._xab(4)
        }
    };
    this._xc1 = function(b) {
        var a = 0;
        while (true) {
            if ((b >> a) == 1) {
                break
            }
            a++
        }
        return this._xab(qrcode._x84[this._xc3][a])
    };
    this._xbe = function(c) {
        var l = c;
        var k = 0;
        var a = "";
        var n = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":");
        do {
            if (l > 1) {
                k = this._xab(11);
                var b = Math.floor(k / 45);
                var m = k % 45;
                a += n[b];
                a += n[m];
                l -= 2
            } else {
                if (l == 1) {
                    k = this._xab(6);
                    a += n[k];
                    l -= 1
                }
            }
        } while (l > 0);
        return a
    };
    this._xbf = function(b) {
        var h = b;
        var c = 0;
        var a = "";
        do {
            if (h >= 3) {
                c = this._xab(10);
                if (c < 100) {
                    a += "0"
                }
                if (c < 10) {
                    a += "0"
                }
                h -= 3
            } else {
                if (h == 2) {
                    c = this._xab(7);
                    if (c < 10) {
                        a += "0"
                    }
                    h -= 2
                } else {
                    if (h == 1) {
                        c = this._xab(4);
                        h -= 1
                    }
                }
            }
            a += c
        } while (h > 0);
        return a
    };
    this._xc0 = function(a) {
        var c = a;
        var b = 0;
        var h = new Array();
        do {
            b = this._xab(8);
            h.push(b);
            c--
        } while (c > 0);
        return h
    };
    this._xc7 = function(b) {
        var m = b;
        var c = 0;
        var l = "";
        do {
            c = _xab(13);
            var o = c % 192;
            var n = c / 192;
            var a = (n << 8) + o;
            var q = 0;
            if (a + 33088 <= 40956) {
                q = a + 33088
            } else {
                q = a + 49472
            }
            l += String.fromCharCode(q);
            m--
        } while (m > 0);
        return l
    };
    this.__defineGetter__("DataByte", function() {
        var r = new Array();
        var t = 1;
        var s = 2;
        var u = 4;
        var a = 8;
        do {
            var j = this._xc4();
            if (j == 0) {
                if (r.length > 0) {
                    break
                } else {
                    throw "Empty data block"
                }
            }
            if (j != t && j != s && j != u && j != a) {
                throw "Invalid mode: " + j + " in (block:" + this._x79 + " bit:" + this._x5a + ")"
            }
            _xc2 = this._xc1(j);
            if (_xc2 < 1) {
                throw "Invalid data length: " + _xc2
            }
            switch (j) {
                case t:
                    var c = this._xbf(_xc2);
                    var o = new Array(c.length);
                    for (var q = 0; q < c.length; q++) {
                        o[q] = c.charCodeAt(q)
                    }
                    r.push(o);
                    break;
                case s:
                    var c = this._xbe(_xc2);
                    var o = new Array(c.length);
                    for (var q = 0; q < c.length; q++) {
                        o[q] = c.charCodeAt(q)
                    }
                    r.push(o);
                    break;
                case u:
                    var b = this._xc0(_xc2);
                    r.push(b);
                    break;
                case a:
                    var c = this._xc7(_xc2);
                    r.push(c);
                    break
            }
        } while (true);
        return r
    })
};
