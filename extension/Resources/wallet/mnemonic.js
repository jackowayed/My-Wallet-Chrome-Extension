function decodeV2(e, d, c) {
    if (mn_v2_words.indexOf(e.toLowerCase()) == -1) {
        throw "Unknown word " + e
    }
    if (mn_v2_words.indexOf(d.toLowerCase()) == -1) {
        throw "Unknown word " + d
    }
    if (mn_v2_words.indexOf(c.toLowerCase()) == -1) {
        throw "Unknown word " + c
    }
    var g = mn_v2_words.length;
    var b = mn_v2_words.indexOf(e.toLowerCase());
    var a = (mn_v2_words.indexOf(d.toLowerCase())) % g;
    var f = (mn_v2_words.indexOf(c.toLowerCase())) % g;
    return b + g * mn_mod((a - b), g) + g * g * mn_mod((f - a), g)
}

function encodeV2(b) {
    var e = mn_v2_words.length;
    var c = (b % e);
    var a = (Math.floor(b / e) + c) % e;
    var d = (Math.floor(Math.floor(b / e) / e) + a) % e;
    return [mn_v2_words[c], mn_v2_words[a], mn_v2_words[d]]
}

function decodeV3(g, f, e) {
    var d = e.indexOf(g.toLowerCase());
    if (f == null) {
        if (d == -1) {
            throw "Unknown Word " + g
        }
        var b = Crypto.util.wordsToBytes([d]);
        return Crypto.util.bytesToWords([b[2], b[3], 0, 0])
    } else {
        var c = e.indexOf(f.toLowerCase());
        if (d == -1 || c == -1) {
            throw "Unknown Word " + g + " or " + f
        }
        var b = Crypto.util.wordsToBytes([d]);
        var a = Crypto.util.wordsToBytes([c]);
        return Crypto.util.bytesToWords([b[2], b[3], a[2], a[3]])
    }
}

function encodeV3(a, e) {
    var f = e.length;
    var c = Crypto.util.wordsToBytes([a]);
    var d = Crypto.util.bytesToWords([0, 0, c[0], c[1]]);
    var b = Crypto.util.bytesToWords([0, 0, c[2], c[3]]);
    if (d > e.length || b > e.length) {
        throw "Value out of range " + b + " || " + d + " > " + e.length
    }
    if (b == 0) {
        return [e[d]]
    } else {
        return [e[d], e[b]]
    }
}

function mn_encode_pass(f, g, d) {
    var b = 3;
    var e = UTF8.stringToBytes(f.password);
    if (f.guid) {
        var a = Crypto.util.hexToBytes(f.guid.replace(/-/g, ""));
        if (a.length != 16) {
            throw "guid_bytes invalid length"
        }
        e = a.concat(e);
        b = 4
    } else {
        if (f.created) {
            e = Crypto.util.wordsToBytes([f.created]).concat(e);
            b = 5
        }
    }

    function c() {
        mn_encode_pass_v2(e, function(i) {
            b = 2;
            var j = Crypto.util.bytesToWords([b].concat(Crypto.SHA256(e, {
                asBytes: true
            }).slice(0, 4)))[0];
            if (j < 0) {
                j = -j
            }
            var k = encodeV2(j).join(" ");
            var h = k + " " + i;
            mn_decode_pass(h, function(l) {
                g(h)
            }, d)
        }, d)
    }
    mn_encode_pass_v3(e, function(i) {
        try {
            var j = Crypto.util.bytesToWords([b].concat(Crypto.SHA256(e, {
                asBytes: true
            }).slice(0, 4)))[0];
            if (j < 0) {
                j = -j
            }
            var l = encodeV2(j).join(" ");
            var h = l + " " + i;
            mn_decode_pass(h, function(m) {
                g(h)
            }, c)
        } catch (k) {
            c()
        }
    }, function(h) {
        c()
    })
}

function mn_encode_pass_v2(e, g, c) {
    var f = Crypto.util.bytesToWords(new BigInteger(e).toByteArrayUnsigned());
    var b = [];
    for (var d = 0; d < f.length; d++) {
        b = b.concat(encodeV2(f[d]))
    }
    var a = b.join(" ");
    g(a)
}

function loadV3WordList(b, a) {
    $.ajax({
        type: "GET",
        url: resource + "wallet/mnemonic_words_v3.html",
        success: function(c) {
            b(c.split("\n"))
        },
        error: function(c) {
            a(c)
        }
    })
}

function mn_encode_pass_v3(b, c, a) {
    loadV3WordList(function(h) {
        try {
            var k = Crypto.util.bytesToWords(b);
            var f = [];
            for (var g = 0; g < k.length; g++) {
                f = f.concat(encodeV3(k[g], h))
            }
            var d = f.join(" ");
            c(d)
        } catch (j) {
            a(j)
        }
    }, function(d) {
        a("Error Downloading Word List")
    })
}

function mn_mod(d, c) {
    return d < 0 ? c + d : d % c
}

function decodeV2WordList(d, a, g, b) {
    var f = [];
    for (var c = 0; c < d.length; c += 3) {
        f.push(decodeV2(d[c], d[c + 1], d[c + 2]))
    }
    var e = Crypto.util.wordsToBytes(f);
    e = $.grep(e, function(h) {
        return h != 0
    });
    if (a(e)) {
        g({
            password: UTF8.bytesToString(e)
        })
    } else {
        b("Invalid Checksum")
    }
}

function decodeV3456WordList(d, b, a, e, c) {
    loadV3WordList(function(j) {
        try {
            var n = [];
            for (var k = 0; k < d.length; k += 2) {
                n.push(decodeV3(d[k], d[k + 1], j))
            }
            var h = {};
            var p = Crypto.util.wordsToBytes(n);
            p = $.grep(p, function(i) {
                return i != 0
            });
            if (!a(p)) {
                c("Invalid Checksum");
                return
            }
            if (b == 4) {
                var f = p.splice(0, 16);
                var o = [];
                var g = {};
                for (var k = 0; k < 256; k++) {
                    o[k] = (k + 256).toString(16).substr(1);
                    g[o[k]] = k
                }

                function l(q, s) {
                    var r = s || 0,
                        t = o;
                    return t[q[r++]] + t[q[r++]] + t[q[r++]] + t[q[r++]] + "-" + t[q[r++]] + t[q[r++]] + "-" + t[q[r++]] + t[q[r++]] + "-" + t[q[r++]] + t[q[r++]] + "-" + t[q[r++]] + t[q[r++]] + t[q[r++]] + t[q[r++]] + t[q[r++]] + t[q[r++]]
                }
                h.guid = l(f)
            } else {
                if (b == 5) {
                    h.time = Crypto.util.bytesToWords(p.splice(0, 4))[0]
                }
            }
            h.password = UTF8.bytesToString(p);
            e(h)
        } catch (m) {
            console.log(m);
            c(m)
        }
    }, function(f) {
        console.log(f);
        c(f)
    })
}

function mn_decode_pass(g, i, h) {
    try {
        g = $.trim(g);
        var b = g.split(" ");
        var j = b.splice(0, 3);
        var d = decodeV2(j[0], j[1], j[2]);
        var f = Crypto.util.wordsToBytes([d])[0];

        function a(m) {
            try {
                var k = Crypto.util.bytesToWords([f].concat(Crypto.SHA256(m, {
                    asBytes: true
                }).slice(0, 3)))[0];
                if (k < 0) {
                    k = -k
                }
                if (d != k) {
                    throw "Invalid Mnemonic Checksum. Please enter it carefully."
                }
                return true
            } catch (l) {
                console.log(l);
                return false
            }
        }
        if (f == 2) {
            decodeV2WordList(b, a, i, h)
        } else {
            if (f == 3 || f == 4 || f == 5 || f == 6) {
                decodeV3456WordList(b, f, a, i, h)
            } else {
                decodeV2WordList(b, function() {
                    return true
                }, function(e) {
                    console.log(e)
                }, function(k) {
                    console.log(k)
                });
                throw "Unknown Mnemonic Version " + f
            }
        }
    } catch (c) {
        if (h) {
            h(c)
        }
    }
}
var mn_v2_words = ["like", "just", "love", "know", "never", "want", "time", "out", "there", "make", "look", "eye", "down", "only", "think", "heart", "back", "then", "into", "about", "more", "away", "still", "them", "take", "thing", "even", "through", "long", "always", "world", "too", "friend", "tell", "try", "hand", "thought", "over", "here", "other", "need", "smile", "again", "much", "cry", "been", "night", "ever", "little", "said", "end", "some", "those", "around", "mind", "people", "girl", "leave", "dream", "left", "turn", "myself", "give", "nothing", "really", "off", "before", "something", "find", "walk", "wish", "good", "once", "place", "ask", "stop", "keep", "watch", "seem", "everything", "wait", "got", "yet", "made", "remember", "start", "alone", "run", "hope", "maybe", "believe", "body", "hate", "after", "close", "talk", "stand", "own", "each", "hurt", "help", "home", "god", "soul", "new", "many", "two", "inside", "should", "true", "first", "fear", "mean", "better", "play", "another", "gone", "change", "use", "wonder", "someone", "hair", "cold", "open", "best", "any", "behind", "happen", "water", "dark", "laugh", "stay", "forever", "name", "work", "show", "sky", "break", "came", "deep", "door", "put", "black", "together", "upon", "happy", "such", "great", "white", "matter", "fill", "past", "please", "burn", "cause", "enough", "touch", "moment", "soon", "voice", "scream", "anything", "stare", "sound", "red", "everyone", "hide", "kiss", "truth", "death", "beautiful", "mine", "blood", "broken", "very", "pass", "next", "forget", "tree", "wrong", "air", "mother", "understand", "lip", "hit", "wall", "memory", "sleep", "free", "high", "realize", "school", "might", "skin", "sweet", "perfect", "blue", "kill", "breath", "dance", "against", "fly", "between", "grow", "strong", "under", "listen", "bring", "sometimes", "speak", "pull", "person", "become", "family", "begin", "ground", "real", "small", "father", "sure", "feet", "rest", "young", "finally", "land", "across", "today", "different", "guy", "line", "fire", "reason", "reach", "second", "slowly", "write", "eat", "smell", "mouth", "step", "learn", "three", "floor", "promise", "breathe", "darkness", "push", "earth", "guess", "save", "song", "above", "along", "both", "color", "house", "almost", "sorry", "anymore", "brother", "okay", "dear", "game", "fade", "already", "apart", "warm", "beauty", "heard", "notice", "question", "shine", "began", "piece", "whole", "shadow", "secret", "street", "within", "finger", "point", "morning", "whisper", "child", "moon", "green", "story", "glass", "kid", "silence", "since", "soft", "yourself", "empty", "shall", "angel", "answer", "baby", "bright", "dad", "path", "worry", "hour", "drop", "follow", "power", "war", "half", "flow", "heaven", "act", "chance", "fact", "least", "tired", "children", "near", "quite", "afraid", "rise", "sea", "taste", "window", "cover", "nice", "trust", "lot", "sad", "cool", "force", "peace", "return", "blind", "easy", "ready", "roll", "rose", "drive", "held", "music", "beneath", "hang", "mom", "paint", "emotion", "quiet", "clear", "cloud", "few", "pretty", "bird", "outside", "paper", "picture", "front", "rock", "simple", "anyone", "meant", "reality", "road", "sense", "waste", "bit", "leaf", "thank", "happiness", "meet", "men", "smoke", "truly", "decide", "self", "age", "book", "form", "alive", "carry", "escape", "damn", "instead", "able", "ice", "minute", "throw", "catch", "leg", "ring", "course", "goodbye", "lead", "poem", "sick", "corner", "desire", "known", "problem", "remind", "shoulder", "suppose", "toward", "wave", "drink", "jump", "woman", "pretend", "sister", "week", "human", "joy", "crack", "grey", "pray", "surprise", "dry", "knee", "less", "search", "bleed", "caught", "clean", "embrace", "future", "king", "son", "sorrow", "chest", "hug", "remain", "sat", "worth", "blow", "daddy", "final", "parent", "tight", "also", "create", "lonely", "safe", "cross", "dress", "evil", "silent", "bone", "fate", "perhaps", "anger", "class", "scar", "snow", "tiny", "tonight", "continue", "control", "dog", "edge", "mirror", "month", "suddenly", "comfort", "given", "loud", "quickly", "gaze", "plan", "rush", "stone", "town", "battle", "ignore", "spirit", "stood", "stupid", "yours", "brown", "build", "dust", "hey", "kept", "pay", "phone", "twist", "although", "ball", "beyond", "hidden", "nose", "taken", "fail", "float", "pure", "somehow", "wash", "wrap", "angry", "cheek", "creature", "forgotten", "heat", "rip", "single", "space", "special", "weak", "whatever", "yell", "anyway", "blame", "job", "choose", "country", "curse", "drift", "echo", "figure", "grew", "laughter", "neck", "suffer", "worse", "yeah", "disappear", "foot", "forward", "knife", "mess", "somewhere", "stomach", "storm", "beg", "idea", "lift", "offer", "breeze", "field", "five", "often", "simply", "stuck", "win", "allow", "confuse", "enjoy", "except", "flower", "seek", "strength", "calm", "grin", "gun", "heavy", "hill", "large", "ocean", "shoe", "sigh", "straight", "summer", "tongue", "accept", "crazy", "everyday", "exist", "grass", "mistake", "sent", "shut", "surround", "table", "ache", "brain", "destroy", "heal", "nature", "shout", "sign", "stain", "choice", "doubt", "glance", "glow", "mountain", "queen", "stranger", "throat", "tomorrow", "city", "either", "fish", "flame", "rather", "shape", "spin", "spread", "ash", "distance", "finish", "image", "imagine", "important", "nobody", "shatter", "warmth", "became", "feed", "flesh", "funny", "lust", "shirt", "trouble", "yellow", "attention", "bare", "bite", "money", "protect", "amaze", "appear", "born", "choke", "completely", "daughter", "fresh", "friendship", "gentle", "probably", "six", "deserve", "expect", "grab", "middle", "nightmare", "river", "thousand", "weight", "worst", "wound", "barely", "bottle", "cream", "regret", "relationship", "stick", "test", "crush", "endless", "fault", "itself", "rule", "spill", "art", "circle", "join", "kick", "mask", "master", "passion", "quick", "raise", "smooth", "unless", "wander", "actually", "broke", "chair", "deal", "favorite", "gift", "note", "number", "sweat", "box", "chill", "clothes", "lady", "mark", "park", "poor", "sadness", "tie", "animal", "belong", "brush", "consume", "dawn", "forest", "innocent", "pen", "pride", "stream", "thick", "clay", "complete", "count", "draw", "faith", "press", "silver", "struggle", "surface", "taught", "teach", "wet", "bless", "chase", "climb", "enter", "letter", "melt", "metal", "movie", "stretch", "swing", "vision", "wife", "beside", "crash", "forgot", "guide", "haunt", "joke", "knock", "plant", "pour", "prove", "reveal", "steal", "stuff", "trip", "wood", "wrist", "bother", "bottom", "crawl", "crowd", "fix", "forgive", "frown", "grace", "loose", "lucky", "party", "release", "surely", "survive", "teacher", "gently", "grip", "speed", "suicide", "travel", "treat", "vein", "written", "cage", "chain", "conversation", "date", "enemy", "however", "interest", "million", "page", "pink", "proud", "sway", "themselves", "winter", "church", "cruel", "cup", "demon", "experience", "freedom", "pair", "pop", "purpose", "respect", "shoot", "softly", "state", "strange", "bar", "birth", "curl", "dirt", "excuse", "lord", "lovely", "monster", "order", "pack", "pants", "pool", "scene", "seven", "shame", "slide", "ugly", "among", "blade", "blonde", "closet", "creek", "deny", "drug", "eternity", "gain", "grade", "handle", "key", "linger", "pale", "prepare", "swallow", "swim", "tremble", "wheel", "won", "cast", "cigarette", "claim", "college", "direction", "dirty", "gather", "ghost", "hundred", "loss", "lung", "orange", "present", "swear", "swirl", "twice", "wild", "bitter", "blanket", "doctor", "everywhere", "flash", "grown", "knowledge", "numb", "pressure", "radio", "repeat", "ruin", "spend", "unknown", "buy", "clock", "devil", "early", "false", "fantasy", "pound", "precious", "refuse", "sheet", "teeth", "welcome", "add", "ahead", "block", "bury", "caress", "content", "depth", "despite", "distant", "marry", "purple", "threw", "whenever", "bomb", "dull", "easily", "grasp", "hospital", "innocence", "normal", "receive", "reply", "rhyme", "shade", "someday", "sword", "toe", "visit", "asleep", "bought", "center", "consider", "flat", "hero", "history", "ink", "insane", "muscle", "mystery", "pocket", "reflection", "shove", "silently", "smart", "soldier", "spot", "stress", "train", "type", "view", "whether", "bus", "energy", "explain", "holy", "hunger", "inch", "magic", "mix", "noise", "nowhere", "prayer", "presence", "shock", "snap", "spider", "study", "thunder", "trail", "admit", "agree", "bag", "bang", "bound", "butterfly", "cute", "exactly", "explode", "familiar", "fold", "further", "pierce", "reflect", "scent", "selfish", "sharp", "sink", "spring", "stumble", "universe", "weep", "women", "wonderful", "action", "ancient", "attempt", "avoid", "birthday", "branch", "chocolate", "core", "depress", "drunk", "especially", "focus", "fruit", "honest", "match", "palm", "perfectly", "pillow", "pity", "poison", "roar", "shift", "slightly", "thump", "truck", "tune", "twenty", "unable", "wipe", "wrote", "coat", "constant", "dinner", "drove", "egg", "eternal", "flight", "flood", "frame", "freak", "gasp", "glad", "hollow", "motion", "peer", "plastic", "root", "screen", "season", "sting", "strike", "team", "unlike", "victim", "volume", "warn", "weird", "attack", "await", "awake", "built", "charm", "crave", "despair", "fought", "grant", "grief", "horse", "limit", "message", "ripple", "sanity", "scatter", "serve", "split", "string", "trick", "annoy", "blur", "boat", "brave", "clearly", "cling", "connect", "fist", "forth", "imagination", "iron", "jock", "judge", "lesson", "milk", "misery", "nail", "naked", "ourselves", "poet", "possible", "princess", "sail", "size", "snake", "society", "stroke", "torture", "toss", "trace", "wise", "bloom", "bullet", "cell", "check", "cost", "darling", "during", "footstep", "fragile", "hallway", "hardly", "horizon", "invisible", "journey", "midnight", "mud", "nod", "pause", "relax", "shiver", "sudden", "value", "youth", "abuse", "admire", "blink", "breast", "bruise", "constantly", "couple", "creep", "curve", "difference", "dumb", "emptiness", "gotta", "honor", "plain", "planet", "recall", "rub", "ship", "slam", "soar", "somebody", "tightly", "weather", "adore", "approach", "bond", "bread", "burst", "candle", "coffee", "cousin", "crime", "desert", "flutter", "frozen", "grand", "heel", "hello", "language", "level", "movement", "pleasure", "powerful", "random", "rhythm", "settle", "silly", "slap", "sort", "spoken", "steel", "threaten", "tumble", "upset", "aside", "awkward", "bee", "blank", "board", "button", "card", "carefully", "complain", "crap", "deeply", "discover", "drag", "dread", "effort", "entire", "fairy", "giant", "gotten", "greet", "illusion", "jeans", "leap", "liquid", "march", "mend", "nervous", "nine", "replace", "rope", "spine", "stole", "terror", "accident", "apple", "balance", "boom", "childhood", "collect", "demand", "depression", "eventually", "faint", "glare", "goal", "group", "honey", "kitchen", "laid", "limb", "machine", "mere", "mold", "murder", "nerve", "painful", "poetry", "prince", "rabbit", "shelter", "shore", "shower", "soothe", "stair", "steady", "sunlight", "tangle", "tease", "treasure", "uncle", "begun", "bliss", "canvas", "cheer", "claw", "clutch", "commit", "crimson", "crystal", "delight", "doll", "existence", "express", "fog", "football", "gay", "goose", "guard", "hatred", "illuminate", "mass", "math", "mourn", "rich", "rough", "skip", "stir", "student", "style", "support", "thorn", "tough", "yard", "yearn", "yesterday", "advice", "appreciate", "autumn", "bank", "beam", "bowl", "capture", "carve", "collapse", "confusion", "creation", "dove", "feather", "girlfriend", "glory", "government", "harsh", "hop", "inner", "loser", "moonlight", "neighbor", "neither", "peach", "pig", "praise", "screw", "shield", "shimmer", "sneak", "stab", "subject", "throughout", "thrown", "tower", "twirl", "wow", "army", "arrive", "bathroom", "bump", "cease", "cookie", "couch", "courage", "dim", "guilt", "howl", "hum", "husband", "insult", "led", "lunch", "mock", "mostly", "natural", "nearly", "needle", "nerd", "peaceful", "perfection", "pile", "price", "remove", "roam", "sanctuary", "serious", "shiny", "shook", "sob", "stolen", "tap", "vain", "void", "warrior", "wrinkle", "affection", "apologize", "blossom", "bounce", "bridge", "cheap", "crumble", "decision", "descend", "desperately", "dig", "dot", "flip", "frighten", "heartbeat", "huge", "lazy", "lick", "odd", "opinion", "process", "puzzle", "quietly", "retreat", "score", "sentence", "separate", "situation", "skill", "soak", "square", "stray", "taint", "task", "tide", "underneath", "veil", "whistle", "anywhere", "bedroom", "bid", "bloody", "burden", "careful", "compare", "concern", "curtain", "decay", "defeat", "describe", "double", "dreamer", "driver", "dwell", "evening", "flare", "flicker", "grandma", "guitar", "harm", "horrible", "hungry", "indeed", "lace", "melody", "monkey", "nation", "object", "obviously", "rainbow", "salt", "scratch", "shown", "shy", "stage", "stun", "third", "tickle", "useless", "weakness", "worship", "worthless", "afternoon", "beard", "boyfriend", "bubble", "busy", "certain", "chin", "concrete", "desk", "diamond", "doom", "drawn", "due", "felicity", "freeze", "frost", "garden", "glide", "harmony", "hopefully", "hunt", "jealous", "lightning", "mama", "mercy", "peel", "physical", "position", "pulse", "punch", "quit", "rant", "respond", "salty", "sane", "satisfy", "savior", "sheep", "slept", "social", "sport", "tuck", "utter", "valley", "wolf", "aim", "alas", "alter", "arrow", "awaken", "beaten", "belief", "brand", "ceiling", "cheese", "clue", "confidence", "connection", "daily", "disguise", "eager", "erase", "essence", "everytime", "expression", "fan", "flag", "flirt", "foul", "fur", "giggle", "glorious", "ignorance", "law", "lifeless", "measure", "mighty", "muse", "north", "opposite", "paradise", "patience", "patient", "pencil", "petal", "plate", "ponder", "possibly", "practice", "slice", "spell", "stock", "strife", "strip", "suffocate", "suit", "tender", "tool", "trade", "velvet", "verse", "waist", "witch", "aunt", "bench", "bold", "cap", "certainly", "click", "companion", "creator", "dart", "delicate", "determine", "dish", "dragon", "drama", "drum", "dude", "everybody", "feast", "forehead", "former", "fright", "fully", "gas", "hook", "hurl", "invite", "juice", "manage", "moral", "possess", "raw", "rebel", "royal", "scale", "scary", "several", "slight", "stubborn", "swell", "talent", "tea", "terrible", "thread", "torment", "trickle", "usually", "vast", "violence", "weave", "acid", "agony", "ashamed", "awe", "belly", "blend", "blush", "character", "cheat", "common", "company", "coward", "creak", "danger", "deadly", "defense", "define", "depend", "desperate", "destination", "dew", "duck", "dusty", "embarrass", "engine", "example", "explore", "foe", "freely", "frustrate", "generation", "glove", "guilty", "health", "hurry", "idiot", "impossible", "inhale", "jaw", "kingdom", "mention", "mist", "moan", "mumble", "mutter", "observe", "ode", "pathetic", "pattern", "pie", "prefer", "puff", "rape", "rare", "revenge", "rude", "scrape", "spiral", "squeeze", "strain", "sunset", "suspend", "sympathy", "thigh", "throne", "total", "unseen", "weapon", "weary"];
