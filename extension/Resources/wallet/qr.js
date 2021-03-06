var gCtx = null;
var gCanvas = null;
var imageData = null;
var c = 0;

function passLine(h) {
    var d = h.split("-");
    for (var a = 0; a < 320; a++) {
        var f = parseInt(d[a]);
        r = (f >> 16) & 255;
        g = (f >> 8) & 255;
        b = (f) & 255;
        imageData.data[c + 0] = r;
        imageData.data[c + 1] = g;
        imageData.data[c + 2] = b;
        imageData.data[c + 3] = 255;
        c += 4
    }
    if (c >= 320 * 240 * 4) {
        c = 0;
        gCtx.putImageData(imageData, 0, 0);
        try {
            qrcode.decode()
        } catch (j) {}
    }
}

function captureToCanvas() {
    try {
        flash = document.getElementById("embedflash");
        if (!flash) {
            return
        }
        flash.ccCapture()
    } catch (a) {
        console.log(a)
    }
}
var QRCodeReader = {
    video: "",
    container: "",
    canvas: "",
    ctx: "",
    out: "",
    found: false,
    timer: "",
    _stream: null,
    isCanvasSupported: function() {
        var a = document.createElement("canvas");
        return !!(a.getContext && a.getContext("2d"))
    },
    loop: function() {
        QRCodeReader.captureToCanvas()
    },
    captureToCanvas: function() {
        QRCodeReader.ctx.drawImage(QRCodeReader.video, 0, 0, QRCodeReader.video.videoWidth, QRCodeReader.video.videoHeight, 0, 0, QRCodeReader.canvas.width, QRCodeReader.canvas.height);
        qrcode.decode(QRCodeReader.canvas.toDataURL())
    },
    canvasInit: function() {
        QRCodeReader.canvas = document.createElement("canvas");
        QRCodeReader.canvas.width = QRCodeReader.video.videoWidth;
        QRCodeReader.canvas.height = QRCodeReader.video.videoHeight;
        QRCodeReader.ctx = QRCodeReader.canvas.getContext("2d");
        QRCodeReader.interval = setInterval(QRCodeReader.loop, 500)
    },
    stop: function() {
        if (QRCodeReader.interval) {
            clearInterval(QRCodeReader.interval);
            QRCodeReader.interval = null
        }
        if (QRCodeReader.reader_container) {
            QRCodeReader.reader_container.empty();
            QRCodeReader.reader_container = null
        }
        try {
            if (this._stream) {
                this._stream.stop();
                this._stream = null
            }
        } catch (a) {
            console.log(a)
        }
    },
    init: function(h, j, d) {
        if (!QRCodeReader.isCanvasSupported()) {
            d("Sorry your browser does not support canvas. Please try Firefox, Chrome or safari.");
            return
        }
        var a = false;
        try {
            var f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            if (f) {
                a = true
            }
        } catch (i) {
            if (navigator.mimeTypes["application/x-shockwave-flash"] != undefined) {
                a = true
            }
        }
        loadScript("wallet/llqrcode", function() {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
            window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
            QRCodeReader.reader_container = h.find(".qr-code-reader");
            if (navigator.getUserMedia) {
                QRCodeReader.reader_container.html('<video style="width:320px;height:240px" autoplay id="sourcevid"></video>');
                QRCodeReader.video = QRCodeReader.reader_container.find("video").get(0);
                QRCodeReader.flash = null;
                navigator.getUserMedia({
                    video: true
                }, function(m) {
                    QRCodeReader._stream = m;
                    QRCodeReader.video.src = window.URL.createObjectURL(m) || m;
                    setTimeout(QRCodeReader.canvasInit, 250)
                }, d)
            } else {
                if (a) {
                    function k(p, n) {
                        gCanvas = document.getElementById("qr-canvas");
                        var m = p;
                        var o = n;
                        gCanvas.style.width = m + "px";
                        gCanvas.style.height = o + "px";
                        gCanvas.width = m;
                        gCanvas.height = o;
                        gCtx = gCanvas.getContext("2d");
                        gCtx.clearRect(0, 0, m, o);
                        imageData = gCtx.getImageData(0, 0, 320, 240)
                    }

                    function e(m) {
                        return $('<embed style="z-index:10;" allowScriptAccess="always" id="embedflash" src="' + m + 'camcanvas.swf" quality="high" width="1" height="1" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" mayscript="true"  />')
                    }

                    function l() {
                        return $('<canvas style="z-index:-1;width:800px;height:600px; display:none;" id="qr-canvas" width="800" height="600"></canvas>')
                    }
                    QRCodeReader.reader_container.html(e(resource + "wallet/").width(320).height(240));
                    QRCodeReader.reader_container.append(l());
                    k(800, 600);
                    QRCodeReader.interval = setInterval(captureToCanvas, 1000)
                } else {
                    d("Sorry your browser is not supported. Please try Firefox, Chrome or safari.")
                }
            }
            qrcode.callback = function(m) {
                if (m) {
                    QRCodeReader.stop();
                    j(m)
                }
            }
        })
    }
};
