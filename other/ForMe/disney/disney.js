function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}
function onYouTubePlayerReady(e) {
    mejs.YouTubeApi.flashReady(e)
}
var requirejs, require, define;
!
function (global) {
    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }
    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }
    function each(e, t) {
        if (e) {
            var i;
            for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1);
        }
    }
    function eachReverse(e, t) {
        if (e) {
            var i;
            for (i = e.length - 1; i > -1 && (!e[i] || !t(e[i], i, e)); i -= 1);
        }
    }
    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }
    function eachProp(e, t) {
        var i;
        for (i in e) if (e.hasOwnProperty(i) && t(e[i], i)) break
    }
    function mixin(e, t, i, n) {
        return t && eachProp(t, function (t, s) {
            (i || !hasProp(e, s)) && (n && "string" != typeof t ? (e[s] || (e[s] = {}), mixin(e[s], t, i, n)) : e[s] = t)
        }), e
    }
    function bind(e, t) {
        return function () {
            return t.apply(e, arguments)
        }
    }
    function scripts() {
        return document.getElementsByTagName("script")
    }
    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."), function (e) {
            t = t[e]
        }), t
    }
    function makeContextModuleFunc(e, t, i) {
        return function () {
            var n, s = aps.call(arguments, 0);
            return i && isFunction(n = s[s.length - 1]) && (n.__requireJsBuild = !0), s.push(t), e.apply(null, s)
        }
    }
    function addRequireMethods(e, t, i) {
        each([
            ["toUrl"],
            ["undef"],
            ["defined", "requireDefined"],
            ["specified", "requireSpecified"]
        ], function (n) {
            var s = n[1] || n[0];
            e[n[0]] = t ? makeContextModuleFunc(t[s], i) : function () {
                var e = contexts[defContextName];
                return e[s].apply(e, arguments)
            }
        })
    }
    function makeError(e, t, i, n) {
        var s = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return s.requireType = e, s.requireModules = n, i && (s.originalError = i), s
    }
    function newContext(e) {
        function t(e) {
            var t, i;
            for (t = 0; e[t]; t += 1) if (i = e[t], "." === i) e.splice(t, 1), t -= 1;
            else if (".." === i) {
                if (1 === t && (".." === e[2] || ".." === e[0])) break;
                t > 0 && (e.splice(t - 1, 2), t -= 2)
            }
        }
        function i(e, i, n) {
            var s, r, o, a, l, u, h, c, d, p, f, m = i && i.split("/"),
                g = m,
                v = C.map,
                y = v && v["*"];
            if (e && "." === e.charAt(0) && (i ? (g = C.pkgs[i] ? m = [i] : m.slice(0, m.length - 1), e = g.concat(e.split("/")), t(e), r = C.pkgs[s = e[0]], e = e.join("/"), r && e === s + "/" + r.main && (e = s)) : 0 === e.indexOf("./") && (e = e.substring(2))), n && (m || y) && v) {
                for (a = e.split("/"), l = a.length; l > 0; l -= 1) {
                    if (h = a.slice(0, l).join("/"), m) for (u = m.length; u > 0; u -= 1) if (o = v[m.slice(0, u).join("/")], o && (o = o[h])) {
                        c = o, d = l;
                        break
                    }
                    if (c) break;
                    !p && y && y[h] && (p = y[h], f = l)
                }!c && p && (c = p, d = f), c && (a.splice(0, d, c), e = a.join("/"))
            }
            return e
        }
        function n(e) {
            isBrowser && each(scripts(), function (t) {
                return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === x.contextName ? (t.parentNode.removeChild(t), !0) : void 0
            })
        }
        function s(e) {
            var t = C.paths[e];
            return t && isArray(t) && t.length > 1 ? (n(e), t.shift(), x.undef(e), x.require([e]), !0) : void 0
        }
        function r(e, t, n, s) {
            var r, o, a, l = e ? e.indexOf("!") : -1,
                u = null,
                h = t ? t.name : null,
                c = e,
                d = !0,
                p = "";
            return e || (d = !1, e = "_@r" + (j += 1)), -1 !== l && (u = e.substring(0, l), e = e.substring(l + 1, e.length)), u && (u = i(u, h, s), o = S[u]), e && (u ? p = o && o.normalize ? o.normalize(e, function (e) {
                return i(e, h, s)
            }) : i(e, h, s) : (p = i(e, h, s), r = x.nameToUrl(p))), a = !u || o || n ? "" : "_unnormalized" + ($ += 1), {
                prefix: u,
                name: p,
                parentMap: t,
                unnormalized: !! a,
                url: r,
                originalName: c,
                isDefine: d,
                id: (u ? u + "!" + p : p) + a
            }
        }
        function o(e) {
            var t = e.id,
                i = k[t];
            return i || (i = k[t] = new x.Module(e)), i
        }
        function a(e, t, i) {
            var n = e.id,
                s = k[n];
            !hasProp(S, n) || s && !s.defineEmitComplete ? o(e).on(t, i) : "defined" === t && i(S[n])
        }
        function l(e, t) {
            var i = e.requireModules,
                n = !1;
            t ? t(e) : (each(i, function (t) {
                var i = k[t];
                i && (i.error = e, i.events.error && (n = !0, i.emit("error", e)))
            }), n || req.onError(e))
        }
        function u() {
            globalDefQueue.length && (apsp.apply(P, [P.length - 1, 0].concat(globalDefQueue)), globalDefQueue = [])
        }
        function h(e, t, i) {
            var n = e && e.map,
                s = makeContextModuleFunc(i || x.require, n, t);
            return addRequireMethods(s, x, n), s.isBrowser = isBrowser, s
        }
        function c(e) {
            delete k[e], each(I, function (t, i) {
                return t.map.id === e ? (I.splice(i, 1), t.defined || (x.waitCount -= 1), !0) : void 0
            })
        }
        function d(e, t) {
            var i, n = e.map.id,
                s = e.depMaps;
            if (e.inited) return t[n] ? e : (t[n] = !0, each(s, function (e) {
                var s = e.id,
                    r = k[s];
                if (r) return r.inited && r.enabled ? i = d(r, mixin({}, t)) : (i = null, delete t[n], !0)
            }), i)
        }
        function p(e, t, i) {
            var n = e.map.id,
                s = e.depMaps;
            if (e.inited && e.map.isDefine) return t[n] ? S[n] : (t[n] = e, each(s, function (s) {
                var r, o = s.id,
                    a = k[o];
                if (!_[o] && a) {
                    if (!a.inited || !a.enabled) return void(i[n] = !0);
                    r = p(a, t, i), i[o] || e.defineDepById(o, r)
                }
            }), e.check(!0), S[n])
        }
        function f(e) {
            e.check()
        }
        function m() {
            var e, t, i, r, o = 1e3 * C.waitSeconds,
                a = o && x.startTime + o < (new Date).getTime(),
                u = [],
                h = !1,
                c = !0;
            if (!w) return w = !0, eachProp(k, function (i) {
                if (e = i.map, t = e.id, i.enabled && !i.error) if (!i.inited && a) s(t) ? (r = !0, h = !0) : (u.push(t), n(t));
                else if (!i.inited && i.fetched && e.isDefine && (h = !0, !e.prefix)) return c = !1
            }), a && u.length ? (i = makeError("timeout", "Load timeout for modules: " + u, null, u), i.contextName = x.contextName, l(i)) : (c && (each(I, function (e) {
                if (!e.defined) {
                    var t = d(e, {}),
                        i = {};
                    t && (p(t, i, {}), eachProp(i, f))
                }
            }), eachProp(k, f)), (!a || r) && h && (isBrowser || isWebWorker) && !T && (T = setTimeout(function () {
                T = 0, m()
            }, 50)), w = !1, void 0)
        }
        function g(e) {
            o(r(e[0], null, !0)).init(e[1], e[2])
        }
        function v(e, t, i, n) {
            e.detachEvent && !isOpera ? n && e.detachEvent(n, t) : e.removeEventListener(i, t, !1)
        }
        function y(e) {
            var t = e.currentTarget || e.srcElement;
            return v(t, x.onScriptLoad, "load", "onreadystatechange"), v(t, x.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }
        var w, b, x, _, T, C = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            pkgs: {},
            shim: {}
        },
            k = {},
            M = {},
            P = [],
            S = {},
            E = {},
            j = 1,
            $ = 1,
            I = [];
        return _ = {
            require: function (e) {
                return h(e)
            },
            exports: function (e) {
                return e.usingExports = !0, e.map.isDefine ? e.exports = S[e.map.id] = {} : void 0
            },
            module: function (e) {
                return e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function () {
                        return C.config && C.config[e.map.id] || {}
                    },
                    exports: S[e.map.id]
                }
            }
        }, b = function (e) {
            this.events = M[e.id] || {}, this.map = e, this.shim = C.shim[e.id], this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, b.prototype = {
            init: function (e, t, i, n) {
                n = n || {}, this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, function (e) {
                    this.emit("error", e)
                })), this.depMaps = e && e.slice(0), this.depMaps.rjsSkipMap = e.rjsSkipMap, this.errback = i, this.inited = !0, this.ignore = n.ignore, n.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDepById: function (e, t) {
                var i;
                return each(this.depMaps, function (t, n) {
                    return t.id === e ? (i = n, !0) : void 0
                }), this.defineDep(i, t)
            },
            defineDep: function (e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function () {
                if (!this.fetched) {
                    this.fetched = !0, x.startTime = (new Date).getTime();
                    var e = this.map;
                    return this.shim ? void h(this, !0)(this.shim.deps || [], bind(this, function () {
                        return e.prefix ? this.callPlugin() : this.load()
                    })) : e.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function () {
                var e = this.map.url;
                E[e] || (E[e] = !0, x.load(this.map.id, e))
            },
            check: function (e) {
                if (this.enabled && !this.enabling) {
                    var t, i, n = this.map.id,
                        s = this.depExports,
                        r = this.exports,
                        o = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(o)) {
                                    if (this.events.error) try {
                                        r = x.execCb(n, o, s, r)
                                    } catch (a) {
                                        t = a
                                    } else r = x.execCb(n, o, s, r);
                                    if (this.map.isDefine && (i = this.module, i && void 0 !== i.exports && i.exports !== this.exports ? r = i.exports : void 0 === r && this.usingExports && (r = this.exports)), t) return t.requireMap = this.map, t.requireModules = [this.map.id], t.requireType = "define", l(this.error = t)
                                } else r = o;
                                this.exports = r, this.map.isDefine && !this.ignore && (S[n] = r, req.onResourceLoad && req.onResourceLoad(x, this.map, this.depMaps)), delete k[n], this.defined = !0, x.waitCount -= 1, 0 === x.waitCount && (I = [])
                            }
                            this.defining = !1, e || this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else this.fetch()
                }
            },
            callPlugin: function () {
                var e = this.map,
                    t = e.id,
                    n = r(e.prefix, null, !1, !0);
                a(n, "defined", bind(this, function (n) {
                    var s, u, d, p = this.map.name,
                        f = this.map.parentMap ? this.map.parentMap.name : null;
                    return this.map.unnormalized ? (n.normalize && (p = n.normalize(p, function (e) {
                        return i(e, f, !0)
                    }) || ""), u = r(e.prefix + "!" + p, this.map.parentMap, !1, !0), a(u, "defined", bind(this, function (e) {
                        this.init([], function () {
                            return e
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        })
                    })), d = k[u.id], d && (this.events.error && d.on("error", bind(this, function (e) {
                        this.emit("error", e)
                    })), d.enable()), void 0) : (s = bind(this, function (e) {
                        this.init([], function () {
                            return e
                        }, null, {
                            enabled: !0
                        })
                    }), s.error = bind(this, function (e) {
                        this.inited = !0, this.error = e, e.requireModules = [t], eachProp(k, function (e) {
                            0 === e.map.id.indexOf(t + "_unnormalized") && c(e.map.id)
                        }), l(e)
                    }), s.fromText = function (e, t) {
                        var i = useInteractive;
                        i && (useInteractive = !1), o(r(e)), req.exec(t), i && (useInteractive = !0), x.completeLoad(e)
                    }, n.load(e.name, h(e.parentMap, !0, function (e, t, i) {
                        return e.rjsSkipMap = !0, x.require(e, t, i)
                    }), s, C), void 0)
                })), x.enable(n, this), this.pluginMaps[n.id] = n
            },
            enable: function () {
                this.enabled = !0, this.waitPushed || (I.push(this), x.waitCount += 1, this.waitPushed = !0), this.enabling = !0, each(this.depMaps, bind(this, function (e, t) {
                    var i, n, s;
                    if ("string" == typeof e) {
                        if (e = r(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.depMaps.rjsSkipMap), this.depMaps[t] = e, s = _[e.id], s) return void(this.depExports[t] = s(this));
                        this.depCount += 1, a(e, "defined", bind(this, function (e) {
                            this.defineDep(t, e), this.check()
                        })), this.errback && a(e, "error", this.errback)
                    }
                    i = e.id, n = k[i], !_[i] && n && !n.enabled && x.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function (e) {
                    var t = k[e.id];
                    t && !t.enabled && x.enable(e, this)
                })), this.enabling = !1, this.check()
            },
            on: function (e, t) {
                var i = this.events[e];
                i || (i = this.events[e] = []), i.push(t)
            },
            emit: function (e, t) {
                each(this.events[e], function (e) {
                    e(t)
                }), "error" === e && delete this.events[e]
            }
        }, x = {
            config: C,
            contextName: e,
            registry: k,
            defined: S,
            urlFetched: E,
            waitCount: 0,
            defQueue: P,
            Module: b,
            makeModuleMap: r,
            configure: function (e) {
                e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
                var t = C.pkgs,
                    i = C.shim,
                    n = C.paths,
                    s = C.map;
                mixin(C, e, !0), C.paths = mixin(n, e.paths, !0), e.map && (C.map = mixin(s || {}, e.map, !0, !0)), e.shim && (eachProp(e.shim, function (e, t) {
                    isArray(e) && (e = {
                        deps: e
                    }), e.exports && !e.exports.__buildReady && (e.exports = x.makeShimExports(e.exports)), i[t] = e
                }), C.shim = i), e.packages && (each(e.packages, function (e) {
                    var i;
                    e = "string" == typeof e ? {
                        name: e
                    } : e, i = e.location, t[e.name] = {
                        name: e.name,
                        location: i || e.name,
                        main: (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                    }
                }), C.pkgs = t), eachProp(k, function (e, t) {
                    !e.inited && !e.map.unnormalized && (e.map = r(t))
                }), (e.deps || e.callback) && x.require(e.deps || [], e.callback)
            },
            makeShimExports: function (e) {
                var t;
                return "string" == typeof e ? (t = function () {
                    return getGlobal(e)
                }, t.exports = e, t) : function () {
                    return e.apply(global, arguments)
                }
            },
            requireDefined: function (e, t) {
                return hasProp(S, r(e, t, !1, !0).id)
            },
            requireSpecified: function (e, t) {
                return e = r(e, t, !1, !0).id, hasProp(S, e) || hasProp(k, e)
            },
            require: function (t, i, n, s) {
                var a, h, c, d, p;
                if ("string" == typeof t) return isFunction(i) ? l(makeError("requireargs", "Invalid require call"), n) : req.get ? req.get(x, t, i) : (a = t, s = i, c = r(a, s, !1, !0), h = c.id, hasProp(S, h) ? S[h] : l(makeError("notloaded", 'Module name "' + h + '" has not been loaded yet for context: ' + e)));
                for (n && !isFunction(n) && (s = n, n = void 0), i && !isFunction(i) && (s = i, i = void 0), u(); P.length;) {
                    if (p = P.shift(), null === p[0]) return l(makeError("mismatch", "Mismatched anonymous define() module: " + p[p.length - 1]));
                    g(p)
                }
                return d = o(r(null, s)), d.init(t, i, n, {
                    enabled: !0
                }), m(), x.require
            },
            undef: function (e) {
                u();
                var t = r(e, null, !0),
                    i = k[e];
                delete S[e], delete E[t.url], delete M[e], i && (i.events.defined && (M[e] = i.events), c(e))
            },
            enable: function (e) {
                var t = k[e.id];
                t && o(e).enable()
            },
            completeLoad: function (e) {
                var t, i, n, r = C.shim[e] || {},
                    o = r.exports && r.exports.exports;
                for (u(); P.length;) {
                    if (i = P.shift(), null === i[0]) {
                        if (i[0] = e, t) break;
                        t = !0
                    } else i[0] === e && (t = !0);
                    g(i)
                }
                if (n = k[e], !t && !S[e] && n && !n.inited) {
                    if (C.enforceDefine && (!o || !getGlobal(o))) {
                        if (s(e)) return;
                        return l(makeError("nodefine", "No define call for " + e, null, [e]))
                    }
                    g([e, r.deps || [], r.exports])
                }
                m()
            },
            toUrl: function (e, t) {
                var n = e.lastIndexOf("."),
                    s = null;
                return -1 !== n && (s = e.substring(n, e.length), e = e.substring(0, n)), x.nameToUrl(i(e, t && t.id, !0), s)
            },
            nameToUrl: function (e, t) {
                var i, n, s, r, o, a, l, u, h;
                if (req.jsExtRegExp.test(e)) u = e + (t || "");
                else {
                    for (i = C.paths, n = C.pkgs, o = e.split("/"), a = o.length; a > 0; a -= 1) {
                        if (l = o.slice(0, a).join("/"), s = n[l], h = i[l], h) {
                            isArray(h) && (h = h[0]), o.splice(0, a, h);
                            break
                        }
                        if (s) {
                            r = e === s.name ? s.location + "/" + s.main : s.location, o.splice(0, a, r);
                            break
                        }
                    }
                    u = o.join("/"), u += t || (/\?/.test(u) ? "" : ".js"), u = ("/" === u.charAt(0) || u.match(/^[\w\+\.\-]+:/) ? "" : C.baseUrl) + u
                }
                return C.urlArgs ? u + ((-1 === u.indexOf("?") ? "?" : "&") + C.urlArgs) : u
            },
            load: function (e, t) {
                req.load(x, e, t)
            },
            execCb: function (e, t, i, n) {
                return t.apply(n, i)
            },
            onScriptLoad: function (e) {
                if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = y(e);
                    x.completeLoad(t.id)
                }
            },
            onScriptError: function (e) {
                var t = y(e);
                return s(t.id) ? void 0 : l(makeError("scripterror", "Script error", e, [t.id]))
            }
        }
    }
    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (e) {
            return "interactive" === e.readyState ? interactiveScript = e : void 0
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.0.5",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        aps = ap.slice,
        apsp = ap.splice,
        isBrowser = "undefined" != typeof window && !! navigator && !! document,
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" != typeof require && !isFunction(require) && (cfg = require, require = void 0), req = requirejs = function (e, t, i, n) {
            var s, r, o = defContextName;
            return !isArray(e) && "string" != typeof e && (r = e, isArray(t) ? (e = t, t = i, i = n) : e = []), r && r.context && (o = r.context), s = contexts[o], s || (s = contexts[o] = req.s.newContext(o)), r && s.configure(r), s.require(e, t, i)
        }, req.config = function (e) {
            return req(e)
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), addRequireMethods(req), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = function (e) {
            throw e
        }, req.load = function (e, t, i) {
            var n, s = e && e.config || {};
            return isBrowser ? (n = s.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), n.type = s.scriptType || "text/javascript", n.charset = "utf-8", n.async = !0, n.setAttribute("data-requirecontext", e.contextName), n.setAttribute("data-requiremodule", t), !n.attachEvent || n.attachEvent.toString && n.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (n.addEventListener("load", e.onScriptLoad, !1), n.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, n.attachEvent("onreadystatechange", e.onScriptLoad)), n.src = i, currentlyAddingScript = n, baseElement ? head.insertBefore(n, baseElement) : head.appendChild(n), currentlyAddingScript = null, n) : void(isWebWorker && (importScripts(i), e.completeLoad(t)))
        }, isBrowser && eachReverse(scripts(), function (e) {
            return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (cfg.baseUrl || (src = dataMain.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath, dataMain = mainScript), dataMain = dataMain.replace(jsSuffixRegExp, ""), cfg.deps = cfg.deps ? cfg.deps.concat(dataMain) : [dataMain], !0) : void 0
        }), define = function (e, t, i) {
            var n, s;
            "string" != typeof e && (i = t, t = e, e = null), isArray(t) || (i = t, t = []), !t.length && isFunction(i) && i.length && (i.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (e, i) {
                t.push(i)
            }), t = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(t)), useInteractive && (n = currentlyAddingScript || getInteractiveScript(), n && (e || (e = n.getAttribute("data-requiremodule")), s = contexts[n.getAttribute("data-requirecontext")])), (s ? s.defQueue : globalDefQueue).push([e, t, i])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function (text) {
            return eval(text)
        }, req(cfg)
    }
}(this), define("requireJS", function () {}), define("swipe", ["require"], function () {
    !
    function (e) {
        function t(t) {
            return t && void 0 === t.allowPageScroll && (void 0 !== t.swipe || void 0 !== t.swipeStatus) && (t.allowPageScroll = u), t || (t = {}), t = e.extend({}, e.fn.swipe.defaults, t), this.each(function () {
                var n = e(this),
                    s = n.data(_);
                s || (s = new i(this, t), n.data(_, s))
            })
        }
        function i(t, i) {
            function T(t) {
                if (!(q() || e(t.target).closest(i.excludedElements, wt).length > 0)) {
                    var n, s = t.originalEvent,
                        r = x ? s.touches[0] : s;
                    return bt = v, x ? xt = s.touches.length : t.preventDefault(), dt = 0, pt = null, yt = null, ft = 0, mt = 0, gt = 0, vt = 1, pinchDistance = 0, _t = G(), H(), !x || xt === i.fingers || i.fingers === g || R() ? (W(0, r), Tt = nt(), 2 == xt && (W(1, s.touches[1]), mt = gt = Z(_t[0].start, _t[1].start)), (i.swipeStatus || i.pinchStatus) && (n = j(s, bt))) : n = !1, n === !1 ? (bt = b, j(s, bt), n) : void U(!0)
                }
            }
            function C(e) {
                var t = e.originalEvent;
                if (bt !== w && bt !== b && !V()) {
                    var n, s = x ? t.touches[0] : t,
                        r = X(s);
                    if (Ct = nt(), x && (xt = t.touches.length), bt = y, 2 == xt && (0 == mt ? (W(1, t.touches[1]), mt = gt = Z(_t[0].start, _t[1].start)) : (X(t.touches[1]), gt = Z(_t[0].end, _t[1].end), yt = K(_t[0].end, _t[1].end)), vt = J(mt, gt), pinchDistance = Math.abs(mt - gt)), xt === i.fingers || i.fingers === g || !x || R()) {
                        if (pt = it(r.start, r.end), O(e, pt), dt = et(r.start, r.end), ft = Q(), (i.swipeStatus || i.pinchStatus) && (n = j(t, bt)), !i.triggerOnTouchEnd || i.triggerOnTouchLeave) {
                            var o = !0;
                            if (i.triggerOnTouchLeave) {
                                var a = st(this);
                                o = rt(r.end, a)
                            }!i.triggerOnTouchEnd && o ? bt = E(y) : i.triggerOnTouchLeave && !o && (bt = E(w)), (bt == b || bt == w) && j(t, bt)
                        }
                    } else bt = b, j(t, bt);
                    n === !1 && (bt = b, j(t, bt))
                }
            }
            function k(e) {
                var t = e.originalEvent;
                if (x && t.touches.length > 0) return B(), !0;
                if (V() && (xt = Mt), e.preventDefault(), Ct = nt(), i.triggerOnTouchEnd || 0 == i.triggerOnTouchEnd && bt === y) {
                    bt = w;
                    var n = xt === i.fingers || i.fingers === g || !x,
                        s = 0 !== _t[0].end.x,
                        r = n && s && (L() || N());
                    r ? j(t, bt) : (bt = b, j(t, bt))
                } else bt === y && (bt = b, j(t, bt));
                U(!1)
            }
            function M() {
                xt = 0, Ct = 0, Tt = 0, mt = 0, gt = 0, vt = 1, H(), U(!1)
            }
            function P(e) {
                var t = e.originalEvent;
                i.triggerOnTouchLeave && (bt = E(w), j(t, bt))
            }
            function S() {
                wt.unbind(at, T), wt.unbind(ct, M), wt.unbind(lt, C), wt.unbind(ut, k), ht && wt.unbind(ht, P), U(!1)
            }
            function E(e) {
                var t = e,
                    n = F(),
                    s = I();
                return n ? !s || e != y || i.triggerOnTouchEnd && !i.triggerOnTouchLeave ? !s && e == w && i.triggerOnTouchLeave && (t = b) : t = w : t = b, t
            }
            function j(e, t) {
                var i = void 0;
                return z() && (i = $(e, t, c)), R() && i !== !1 && (i = $(e, t, d)), D() && i !== !1 && (i = $(e, t, p)), t === b && M(e), t === w && (x ? 0 == e.touches.length && M(e) : M(e)), i
            }
            function $(e, t, u) {
                var h = void 0;
                if (u == c) {
                    if (i.swipeStatus && (h = i.swipeStatus.call(wt, e, t, pt || null, dt || 0, ft || 0, xt), h === !1)) return !1;
                    if (t == w && N()) {
                        if (i.swipe && (h = i.swipe.call(wt, e, pt, dt, ft, xt), h === !1)) return !1;
                        switch (pt) {
                        case n:
                            i.swipeLeft && (h = i.swipeLeft.call(wt, e, pt, dt, ft, xt));
                            break;
                        case s:
                            i.swipeRight && (h = i.swipeRight.call(wt, e, pt, dt, ft, xt));
                            break;
                        case r:
                            i.swipeUp && (h = i.swipeUp.call(wt, e, pt, dt, ft, xt));
                            break;
                        case o:
                            i.swipeDown && (h = i.swipeDown.call(wt, e, pt, dt, ft, xt))
                        }
                    }
                }
                if (u == d) {
                    if (i.pinchStatus && (h = i.pinchStatus.call(wt, e, t, yt || null, pinchDistance || 0, ft || 0, xt, vt), h === !1)) return !1;
                    if (t == w && L()) switch (yt) {
                    case a:
                        i.pinchIn && (h = i.pinchIn.call(wt, e, yt || null, pinchDistance || 0, ft || 0, xt, vt));
                        break;
                    case l:
                        i.pinchOut && (h = i.pinchOut.call(wt, e, yt || null, pinchDistance || 0, ft || 0, xt, vt))
                    }
                }
                return u == p && t === b && i.click && (1 === xt || !x) && (isNaN(dt) || 0 === dt) && (h = i.click.call(wt, e, e.target)), h
            }
            function I() {
                return null !== i.threshold ? dt >= i.threshold : !0
            }
            function A() {
                return null !== i.pinchThreshold ? pinchDistance >= i.pinchThreshold : !0
            }
            function F() {
                var e;
                return e = i.maxTimeThreshold && ft >= i.maxTimeThreshold ? !1 : !0
            }
            function O(e, t) {
                if (i.allowPageScroll === u || R()) e.preventDefault();
                else {
                    var a = i.allowPageScroll === h;
                    switch (t) {
                    case n:
                        (i.swipeLeft && a || !a && i.allowPageScroll != f) && e.preventDefault();
                        break;
                    case s:
                        (i.swipeRight && a || !a && i.allowPageScroll != f) && e.preventDefault();
                        break;
                    case r:
                        (i.swipeUp && a || !a && i.allowPageScroll != m) && e.preventDefault();
                        break;
                    case o:
                        (i.swipeDown && a || !a && i.allowPageScroll != m) && e.preventDefault()
                    }
                }
            }
            function L() {
                return A()
            }
            function R() {
                return !!(i.pinchStatus || i.pinchIn || i.pinchOut)
            }
            function N() {
                var e = F(),
                    t = I(),
                    i = t && e;
                return i
            }
            function z() {
                return !!(i.swipe || i.swipeStatus || i.swipeLeft || i.swipeRight || i.swipeUp || i.swipeDown)
            }
            function D() {
                return !!i.click
            }
            function B() {
                kt = nt(), Mt = event.touches.length + 1
            }
            function H() {
                kt = 0, Mt = 0
            }
            function V() {
                var e = !1;
                if (kt) {
                    var t = nt() - kt;
                    t <= i.fingerReleaseThreshold && (e = !0)
                }
                return e
            }
            function q() {
                return wt.data(_ + "_intouch") === !0
            }
            function U(e) {
                e === !0 ? (wt.bind(lt, C), wt.bind(ut, k), ht && wt.bind(ht, P)) : (wt.unbind(lt, C, !1), wt.unbind(ut, k, !1), ht && wt.unbind(ht, P, !1)), wt.data(_ + "_intouch", e === !0)
            }
            function W(e, t) {
                var i = void 0 !== t.identifier ? t.identifier : 0;
                return _t[e].identifier = i, _t[e].start.x = _t[e].end.x = t.pageX, _t[e].start.y = _t[e].end.y = t.pageY, _t[e]
            }
            function X(e) {
                var t = void 0 !== e.identifier ? e.identifier : 0,
                    i = Y(t);
                return i.end.x = e.pageX, i.end.y = e.pageY, i
            }
            function Y(e) {
                for (var t = 0; t < _t.length; t++) if (_t[t].identifier == e) return _t[t]
            }
            function G() {
                for (var e = [], t = 0; 5 >= t; t++) e.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                });
                return e
            }
            function Q() {
                return Ct - Tt
            }
            function Z(e, t) {
                var i = Math.abs(e.x - t.x),
                    n = Math.abs(e.y - t.y);
                return Math.round(Math.sqrt(i * i + n * n))
            }
            function J(e, t) {
                var i = t / e * 1;
                return i.toFixed(2)
            }
            function K() {
                return 1 > vt ? l : a
            }
            function et(e, t) {
                return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
            }
            function tt(e, t) {
                var i = e.x - t.x,
                    n = t.y - e.y,
                    s = Math.atan2(n, i),
                    r = Math.round(180 * s / Math.PI);
                return 0 > r && (r = 360 - Math.abs(r)), r
            }
            function it(e, t) {
                var i = tt(e, t);
                return 45 >= i && i >= 0 ? n : 360 >= i && i >= 315 ? n : i >= 135 && 225 >= i ? s : i > 45 && 135 > i ? o : r
            }
            function nt() {
                var e = new Date;
                return e.getTime()
            }
            function st(t) {
                t = e(t);
                var i = t.offset(),
                    n = {
                        left: i.left,
                        right: i.left + t.outerWidth(),
                        top: i.top,
                        bottom: i.top + t.outerHeight()
                    };
                return n
            }
            function rt(e, t) {
                return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom
            }
            var ot = x || !i.fallbackToMouseEvents,
                at = ot ? "touchstart" : "mousedown",
                lt = ot ? "touchmove" : "mousemove",
                ut = ot ? "touchend" : "mouseup",
                ht = ot ? null : "mouseleave",
                ct = "touchcancel",
                dt = 0,
                pt = null,
                ft = 0,
                mt = 0,
                gt = 0,
                vt = 1,
                yt = 0,
                wt = e(t),
                bt = "start",
                xt = 0,
                _t = null,
                Tt = 0,
                Ct = 0,
                kt = 0,
                Mt = 0;
            try {
                wt.bind(at, T), wt.bind(ct, M)
            } catch (Pt) {
                e.error("events not supported " + at + "," + ct + " on jQuery.swipe")
            }
            this.enable = function () {
                return wt.bind(at, T), wt.bind(ct, M), wt
            }, this.disable = function () {
                return S(), wt
            }, this.destroy = function () {
                return S(), wt.data(_, null), wt
            }
        }
        var n = "left",
            s = "right",
            r = "up",
            o = "down",
            a = "in",
            l = "out",
            u = "none",
            h = "auto",
            c = "swipe",
            d = "pinch",
            p = "click",
            f = "horizontal",
            m = "vertical",
            g = "all",
            v = "start",
            y = "move",
            w = "end",
            b = "cancel",
            x = "ontouchstart" in window,
            _ = "TouchSwipe",
            T = {
                fingers: 1,
                threshold: 75,
                pinchThreshold: 20,
                maxTimeThreshold: null,
                fingerReleaseThreshold: 250,
                swipe: null,
                swipeLeft: null,
                swipeRight: null,
                swipeUp: null,
                swipeDown: null,
                swipeStatus: null,
                pinchIn: null,
                pinchOut: null,
                pinchStatus: null,
                click: null,
                triggerOnTouchEnd: !0,
                triggerOnTouchLeave: !1,
                allowPageScroll: "auto",
                fallbackToMouseEvents: !0,
                excludedElements: "button, input, select, textarea, a, .noSwipe"
            };
        e.fn.swipe = function (i) {
            var n = e(this),
                s = n.data(_);
            if (s && "string" == typeof i) {
                if (s[i]) return s[i].apply(this, Array.prototype.slice.call(arguments, 1));
                e.error("Method " + i + " does not exist on jQuery.swipe")
            } else if (!(s || "object" != typeof i && i)) return t.apply(this, arguments);
            return n
        }, e.fn.swipe.defaults = T, e.fn.swipe.phases = {
            PHASE_START: v,
            PHASE_MOVE: y,
            PHASE_END: w,
            PHASE_CANCEL: b
        }, e.fn.swipe.directions = {
            LEFT: n,
            RIGHT: s,
            UP: r,
            DOWN: o,
            IN: a,
            OUT: l
        }, e.fn.swipe.pageScroll = {
            NONE: u,
            HORIZONTAL: f,
            VERTICAL: m,
            AUTO: h
        }, e.fn.swipe.fingers = {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            ALL: g
        }
    }(jQuery)
}), function (e) {
    var t, i, n, s, r, o = e.GreenSockGlobals || e,
        a = function (e) {
            var t, i = e.split("."),
                n = o;
            for (t = 0; t < i.length; t++) n[i[t]] = n = n[i[t]] || {};
            return n
        },
        l = a("com.greensock"),
        u = function () {},
        h = {},
        c = function (t, i, n, s) {
            this.sc = h[t] ? h[t].sc : [], h[t] = this, this.gsClass = null, this.func = n;
            var r = [];
            this.check = function (l) {
                for (var u, d, p, f, m = i.length, g = m; --m > -1;)(u = h[i[m]] || new c(i[m], [])).gsClass ? (r[m] = u.gsClass, g--) : l && u.sc.push(this);
                if (0 === g && n) for (d = ("com.greensock." + t).split("."), p = d.pop(), f = a(d.join("."))[p] = this.gsClass = n.apply(n, r), s && (o[p] = f, "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + t.split(".").join("/"), [], function () {
                    return f
                }) : "undefined" != typeof module && module.exports && (module.exports = f)), m = 0; m < this.sc.length; m++) this.sc[m].check()
            }, this.check(!0)
        },
        d = e._gsDefine = function (e, t, i, n) {
            return new c(e, t, i, n)
        },
        p = l._class = function (e, t, i) {
            return t = t ||
            function () {}, d(e, [], function () {
                return t
            }, i), t
        };
    d.globals = o;
    var f = [0, 0, 1, 1],
        m = [],
        g = p("easing.Ease", function (e, t, i, n) {
            this._func = e, this._type = i || 0, this._power = n || 0, this._params = t ? f.concat(t) : f
        }, !0),
        v = g.map = {},
        y = g.register = function (e, t, i, n) {
            for (var s, r, o, a, u = t.split(","), h = u.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;) for (r = u[h], s = n ? p("easing." + r, null, !0) : l.easing[r] || {}, o = c.length; --o > -1;) a = c[o], v[r + "." + a] = v[a + r] = s[a] = e.getRatio ? e : e[a] || new e
        };
    for (n = g.prototype, n._calcEnd = !1, n.getRatio = function (e) {
        if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
        var t = this._type,
            i = this._power,
            n = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
        return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === t ? 1 - n : 2 === t ? n : .5 > e ? n / 2 : 1 - n / 2
    }, t = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], i = t.length; --i > -1;) n = t[i] + ",Power" + i, y(new g(null, null, 1, i), n, "easeOut", !0), y(new g(null, null, 2, i), n, "easeIn" + (0 === i ? ",easeNone" : "")), y(new g(null, null, 3, i), n, "easeInOut");
    v.linear = l.easing.Linear.easeIn, v.swing = l.easing.Quad.easeInOut;
    var w = p("events.EventDispatcher", function (e) {
        this._listeners = {}, this._eventTarget = e || this
    });
    n = w.prototype, n.addEventListener = function (e, t, i, n, o) {
        o = o || 0;
        var a, l, u = this._listeners[e],
            h = 0;
        for (null == u && (this._listeners[e] = u = []), l = u.length; --l > -1;) a = u[l], a.c === t && a.s === i ? u.splice(l, 1) : 0 === h && a.pr < o && (h = l + 1);
        u.splice(h, 0, {
            c: t,
            s: i,
            up: n,
            pr: o
        }), this === s && !r && s.wake()
    }, n.removeEventListener = function (e, t) {
        var i, n = this._listeners[e];
        if (n) for (i = n.length; --i > -1;) if (n[i].c === t) return void n.splice(i, 1)
    }, n.dispatchEvent = function (e) {
        var t, i, n, s = this._listeners[e];
        if (s) for (t = s.length, i = this._eventTarget; --t > -1;) n = s[t], n.up ? n.c.call(n.s || i, {
            type: e,
            target: i
        }) : n.c.call(n.s || i)
    };
    var b = e.requestAnimationFrame,
        x = e.cancelAnimationFrame,
        _ = Date.now ||
    function () {
        return (new Date).getTime()
    };
    for (t = ["ms", "moz", "webkit", "o"], i = t.length; --i > -1 && !b;) b = e[t[i] + "RequestAnimationFrame"], x = e[t[i] + "CancelAnimationFrame"] || e[t[i] + "CancelRequestAnimationFrame"];
    p("Ticker", function (e, t) {
        var i, n, o, a, l, h = this,
            c = _(),
            d = t !== !1 && b,
            p = function (e) {
                h.time = (_() - c) / 1e3, (!i || h.time >= l || e === !0) && (h.frame++, l = h.time + a, h.dispatchEvent("tick")), e !== !0 && (o = n(p))
            };
        w.call(h), this.time = this.frame = 0, this.tick = function () {
            p(!0)
        }, this.sleep = function () {
            null != o && (d && x ? x(o) : clearTimeout(o), n = u, o = null, h === s && (r = !1))
        }, this.wake = function () {
            o && h.sleep(), n = 0 === i ? u : d && b ? b : function (e) {
                return setTimeout(e, 1e3 * a)
            }, h === s && (r = !0), p()
        }, this.fps = function (e) {
            return arguments.length ? (i = e, a = 1 / (i || 60), l = this.time + a, h.wake(), void 0) : i
        }, this.useRAF = function (e) {
            return arguments.length ? (d = e, void h.fps(i)) : d
        }, h.fps(e), setTimeout(function () {
            d && !o && h.useRAF(!1)
        }, 1e3)
    }), n = l.Ticker.prototype = new l.events.EventDispatcher, n.constructor = l.Ticker;
    var T = p("core.Animation", function (e, t) {
        if (this.vars = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(this.vars.delay) || 0, this._timeScale = 1, this._active = this.vars.immediateRender === !0, this.data = this.vars.data, this._reversed = this.vars.reversed === !0, L) {
            r || s.wake();
            var i = this.vars.useFrames ? O : L;
            i.add(this, i._time), this.vars.paused && this.paused(!0)
        }
    });
    s = T.ticker = new l.Ticker, n = T.prototype, n._dirty = n._gc = n._initted = n._paused = !1, n._totalTime = n._time = 0, n._rawPrevTime = -1, n._next = n._last = n._onUpdate = n._timeline = n.timeline = null, n._paused = !1, n.play = function (e, t) {
        return arguments.length && this.seek(e, t), this.reversed(!1), this.paused(!1)
    }, n.pause = function (e, t) {
        return arguments.length && this.seek(e, t), this.paused(!0)
    }, n.resume = function (e, t) {
        return arguments.length && this.seek(e, t), this.paused(!1)
    }, n.seek = function (e, t) {
        return this.totalTime(Number(e), t !== !1)
    }, n.restart = function (e, t) {
        return this.reversed(!1), this.paused(!1), this.totalTime(e ? -this._delay : 0, t !== !1)
    }, n.reverse = function (e, t) {
        return arguments.length && this.seek(e || this.totalDuration(), t), this.reversed(!0), this.paused(!1)
    }, n.render = function () {}, n.invalidate = function () {
        return this
    }, n._enabled = function (e, t) {
        return r || s.wake(), this._gc = !e, this._active = e && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration, t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
    }, n._kill = function () {
        return this._enabled(!1, !1)
    }, n.kill = function (e, t) {
        return this._kill(e, t), this
    }, n._uncache = function (e) {
        for (var t = e ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
        return this
    }, n.eventCallback = function (e, t, i, n) {
        if (null == e) return null;
        if ("on" === e.substr(0, 2)) {
            var s, r = this.vars;
            if (1 === arguments.length) return r[e];
            if (null == t) delete r[e];
            else if (r[e] = t, r[e + "Params"] = i, r[e + "Scope"] = n, i) for (s = i.length; --s > -1;)"{self}" === i[s] && (i = r[e + "Params"] = i.concat(), i[s] = this);
            "onUpdate" === e && (this._onUpdate = t)
        }
        return this
    }, n.delay = function (e) {
        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
    }, n.duration = function (e) {
        return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
    }, n.totalDuration = function (e) {
        return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
    }, n.time = function (e, t) {
        return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this.totalTime(e, t)) : this._time
    }, n.totalTime = function (e, t) {
        if (r || s.wake(), !arguments.length) return this._totalTime;
        if (this._timeline) {
            if (0 > e && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
                this._dirty && this.totalDuration();
                var i = this._totalDuration,
                    n = this._timeline;
                if (e > i && (e = i), this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? i - e : e) / this._timeScale, n._dirty || this._uncache(!1), !n._active) for (; n._timeline;) n.totalTime(n._totalTime, !0), n = n._timeline
            }
            this._gc && this._enabled(!0, !1), this._totalTime !== e && this.render(e, t, !1)
        }
        return this
    }, n.startTime = function (e) {
        return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
    }, n.timeScale = function (e) {
        if (!arguments.length) return this._timeScale;
        if (e = e || 1e-6, this._timeline && this._timeline.smoothChildTiming) {
            var t = this._pauseTime,
                i = t || 0 === t ? t : this._timeline.totalTime();
            this._startTime = i - (i - this._startTime) * this._timeScale / e
        }
        return this._timeScale = e, this._uncache(!1)
    }, n.reversed = function (e) {
        return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._totalTime, !0)), this) : this._reversed
    }, n.paused = function (e) {
        if (!arguments.length) return this._paused;
        if (e != this._paused && this._timeline) {
            !r && !e && s.wake();
            var t = this._timeline.rawTime(),
                i = t - this._pauseTime;
            !e && this._timeline.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = e ? t : null, this._paused = e, this._active = !e && this._totalTime > 0 && this._totalTime < this._totalDuration, !e && 0 !== i && this.render(this._time, !0, !0)
        }
        return this._gc && !e && this._enabled(!0, !1), this
    };
    var C = p("core.SimpleTimeline", function (e) {
        T.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
    });
    n = C.prototype = new T, n.constructor = C, n.kill()._gc = !1, n._first = n._last = null, n._sortChildren = !1, n.add = function (e, t) {
        var i, n;
        if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), i = this._last, this._sortChildren) for (n = e._startTime; i && i._startTime > n;) i = i._prev;
        return i ? (e._next = i._next, i._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = i, this._timeline && this._uncache(!0), this
    }, n.insert = n.add, n._remove = function (e, t) {
        return e.timeline === this && (t || e._enabled(!1, !0), e.timeline = null, e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), this._timeline && this._uncache(!0)), this
    }, n.render = function (e, t, i) {
        var n, s = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = e; s;) n = s._next, (s._active || e >= s._startTime && !s._paused) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (e - s._startTime) * s._timeScale, t, i) : s.render((e - s._startTime) * s._timeScale, t, i)), s = n
    }, n.rawTime = function () {
        return r || s.wake(), this._totalTime
    };
    var k = p("TweenLite", function (e, t, i) {
        if (T.call(this, t, i), null == e) throw "Cannot tween a null target.";
        this.target = e = "string" != typeof e ? e : k.selector(e) || e;
        var n, s, r, o = e.jquery || "function" == typeof e.each && e[0] && e[0].nodeType && e[0].style,
            a = this.vars.overwrite;
        if (this._overwrite = a = null == a ? F[k.defaultOverwrite] : "number" == typeof a ? a >> 0 : F[a], (o || e instanceof Array) && "number" != typeof e[0]) for (this._targets = r = o && !e.slice ? P(e) : e.slice(0), this._propLookup = [], this._siblings = [], n = 0; n < r.length; n++) s = r[n], s ? "string" != typeof s ? "function" == typeof s.each && s[0] && s[0].nodeType && s[0].style ? (r.splice(n--, 1), this._targets = r = r.concat(P(s))) : (this._siblings[n] = R(s, this, !1), 1 === a && this._siblings[n].length > 1 && N(s, this, null, 1, this._siblings[n])) : (s = r[n--] = k.selector(s), "string" == typeof s && r.splice(n + 1, 1)) : r.splice(n--, 1);
        else this._propLookup = {}, this._siblings = R(e, this, !1), 1 === a && this._siblings.length > 1 && N(e, this, null, 1, this._siblings);
        (this.vars.immediateRender || 0 === t && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
    }, !0),
        M = function (e) {
            return "function" == typeof e.each && e[0] && e[0].nodeType && e[0].style
        },
        P = function (e) {
            var t = [];
            return e.each(function () {
                t.push(this)
            }), t
        },
        S = function (e, t) {
            var i, n = {};
            for (i in e)!(A[i] || i in t && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i || !(!j[i] || j[i] && j[i]._autoCSS) || (n[i] = e[i], !delete e[i]));
            e.css = n
        };
    n = k.prototype = new T, n.constructor = k, n.kill()._gc = !1, n.ratio = 0, n._firstPT = n._targets = n._overwrittenProps = n._startAt = null, n._notifyPluginsOfEnabled = !1, k.version = "1.9.2", k.defaultEase = n._ease = new g(null, null, 1, 1), k.defaultOverwrite = "auto", k.ticker = s, k.autoSleep = !0, k.selector = e.$ || e.jQuery ||
    function (t) {
        return e.$ ? (k.selector = e.$, e.$(t)) : e.document ? e.document.getElementById("#" === t.charAt(0) ? t.substr(1) : t) : t
    };
    var E = k._internals = {},
        j = k._plugins = {},
        $ = k._tweenLookup = {},
        I = 0,
        A = E.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            orientToBezier: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1
        },
        F = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        },
        O = T._rootFramesTimeline = new C,
        L = T._rootTimeline = new C;
    L._startTime = s.time, O._startTime = s.frame, L._active = O._active = !0, T._updateRoot = function () {
        if (L.render((s.time - L._startTime) * L._timeScale, !1, !1), O.render((s.frame - O._startTime) * O._timeScale, !1, !1), !(s.frame % 120)) {
            var e, t, i;
            for (i in $) {
                for (t = $[i].tweens, e = t.length; --e > -1;) t[e]._gc && t.splice(e, 1);
                0 === t.length && delete $[i]
            }
            if (i = L._first, (!i || i._paused) && k.autoSleep && !O._first && 1 === s._listeners.tick.length) {
                for (; i && i._paused;) i = i._next;
                i || s.sleep()
            }
        }
    }, s.addEventListener("tick", T._updateRoot);
    var R = function (e, t, i) {
            var n, s, r = e._gsTweenID;
            if ($[r || (e._gsTweenID = r = "t" + I++)] || ($[r] = {
                target: e,
                tweens: []
            }), t && (n = $[r].tweens, n[s = n.length] = t, i)) for (; --s > -1;) n[s] === t && n.splice(s, 1);
            return $[r].tweens
        },
        N = function (e, t, i, n, s) {
            var r, o, a, l;
            if (1 === n || n >= 4) {
                for (l = s.length, r = 0; l > r; r++) if ((a = s[r]) !== t) a._gc || a._enabled(!1, !1) && (o = !0);
                else if (5 === n) break;
                return o
            }
            var u, h = t._startTime + 1e-10,
                c = [],
                d = 0,
                p = 0 === t._duration;
            for (r = s.length; --r > -1;)(a = s[r]) !== t && !a._gc && !a._paused && (a._timeline !== t._timeline ? (u = u || z(t, 0, p), 0 === z(a, u, p) && (c[d++] = a)) : a._startTime <= h && a._startTime + a.totalDuration() / a._timeScale + 1e-10 > h && ((p || !a._initted) && h - a._startTime <= 2e-10 || (c[d++] = a)));
            for (r = d; --r > -1;) a = c[r], 2 === n && a._kill(i, e) && (o = !0), (2 !== n || !a._firstPT && a._initted) && a._enabled(!1, !1) && (o = !0);
            return o
        },
        z = function (e, t, i) {
            for (var n = e._timeline, s = n._timeScale, r = e._startTime; n._timeline;) {
                if (r += n._startTime, s *= n._timeScale, n._paused) return -100;
                n = n._timeline
            }
            return r /= s, r > t ? r - t : i && r === t || !e._initted && 2e-10 > r - t ? 1e-10 : (r += e.totalDuration() / e._timeScale / s) > t ? 0 : r - t - 1e-10
        };
    n._init = function () {
        var e, t, i, n = this.vars,
            s = this._overwrittenProps,
            r = this._duration,
            o = n.ease;
        if (n.startAt) {
            if (n.startAt.overwrite = 0, n.startAt.immediateRender = !0, this._startAt = k.to(this.target, 0, n.startAt), n.immediateRender && (this._startAt = null, 0 === this._time && 0 !== r)) return
        } else if (n.runBackwards && n.immediateRender && 0 !== r) if (this._startAt) this._startAt.render(-1, !0), this._startAt = null;
        else if (0 === this._time) return n.overwrite = n.delay = 0, n.runBackwards = !1, this._startAt = k.to(this.target, 0, n), n.overwrite = this._overwrite, n.runBackwards = !0, n.delay = this._delay, void 0;
        if (this._ease = o ? o instanceof g ? n.easeParams instanceof Array ? o.config.apply(o, n.easeParams) : o : "function" == typeof o ? new g(o, n.easeParams) : v[o] || k.defaultEase : k.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (e = this._targets.length; --e > -1;) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], s ? s[e] : null) && (t = !0);
        else t = this._initProps(this.target, this._propLookup, this._siblings, s);
        if (t && k._onPluginEvent("_onInitAllProps", this), s && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), n.runBackwards) for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
        this._onUpdate = n.onUpdate, this._initted = !0
    }, n._initProps = function (e, t, i, n) {
        var s, r, o, a, l, u, h;
        if (null == e) return !1;
        this.vars.css || e.style && e.nodeType && j.css && this.vars.autoCSS !== !1 && S(this.vars, e);
        for (s in this.vars) {
            if (A[s]) {
                if (("onStartParams" === s || "onUpdateParams" === s || "onCompleteParams" === s || "onReverseCompleteParams" === s || "onRepeatParams" === s) && (l = this.vars[s])) for (r = l.length; --r > -1;)"{self}" === l[r] && (l = this.vars[s] = l.concat(), l[r] = this)
            } else if (j[s] && (a = new j[s])._onInitTween(e, this.vars[s], this)) {
                for (this._firstPT = u = {
                    _next: this._firstPT,
                    t: a,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: !0,
                    n: s,
                    pg: !0,
                    pr: a._priority
                }, r = a._overwriteProps.length; --r > -1;) t[a._overwriteProps[r]] = this._firstPT;
                (a._priority || a._onInitAllProps) && (o = !0), (a._onDisable || a._onEnable) && (this._notifyPluginsOfEnabled = !0)
            } else this._firstPT = t[s] = u = {
                _next: this._firstPT,
                t: e,
                p: s,
                f: "function" == typeof e[s],
                n: s,
                pg: !1,
                pr: 0
            }, u.s = u.f ? e[s.indexOf("set") || "function" != typeof e["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(e[s]), h = this.vars[s], u.c = "string" == typeof h && "=" === h.charAt(1) ? parseInt(h.charAt(0) + "1", 10) * Number(h.substr(2)) : Number(h) - u.s || 0;
            u && u._next && (u._next._prev = u)
        }
        return n && this._kill(n, e) ? this._initProps(e, t, i, n) : this._overwrite > 1 && this._firstPT && i.length > 1 && N(e, this, t, this._overwrite, i) ? (this._kill(t, e), this._initProps(e, t, i, n)) : o
    }, n.render = function (e, t, i) {
        var n, s, r, o = this._time;
        if (e >= this._duration) this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, s = "onComplete"), 0 === this._duration && ((0 === e || this._rawPrevTime < 0) && this._rawPrevTime !== e && (i = !0), this._rawPrevTime = e);
        else if (1e-7 > e) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === this._duration && this._rawPrevTime > 0) && (s = "onReverseComplete", n = this._reversed), 0 > e ? (this._active = !1, 0 === this._duration && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = e)) : this._initted || (i = !0);
        else if (this._totalTime = this._time = e, this._easeType) {
            var a = e / this._duration,
                l = this._easeType,
                u = this._easePower;
            (1 === l || 3 === l && a >= .5) && (a = 1 - a), 3 === l && (a *= 2), 1 === u ? a *= a : 2 === u ? a *= a * a : 3 === u ? a *= a * a * a : 4 === u && (a *= a * a * a * a), this.ratio = 1 === l ? 1 - a : 2 === l ? a : e / this._duration < .5 ? a / 2 : 1 - a / 2
        } else this.ratio = this._ease.getRatio(e / this._duration);
        if (this._time !== o || i) {
            if (!this._initted) {
                if (this._init(), !this._initted) return;
                this._time && !n ? this.ratio = this._ease.getRatio(this._time / this._duration) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._active || this._paused || (this._active = !0), 0 === o && (this._startAt && (e >= 0 ? this._startAt.render(e, t, i) : s || (s = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === this._duration) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || m))), r = this._firstPT; r;) r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s, r = r._next;
            this._onUpdate && (0 > e && this._startAt && this._startAt.render(e, t, i), t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || m)), s && (this._gc || (0 > e && this._startAt && !this._onUpdate && this._startAt.render(e, t, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[s] && this.vars[s].apply(this.vars[s + "Scope"] || this, this.vars[s + "Params"] || m)))
        }
    }, n._kill = function (e, t) {
        if ("all" === e && (e = null), null == e && (null == t || t === this.target)) return this._enabled(!1, !1);
        t = "string" != typeof t ? t || this._targets || this.target : k.selector(t) || t;
        var i, n, s, r, o, a, l, u;
        if ((t instanceof Array || M(t)) && "number" != typeof t[0]) for (i = t.length; --i > -1;) this._kill(e, t[i]) && (a = !0);
        else {
            if (this._targets) {
                for (i = this._targets.length; --i > -1;) if (t === this._targets[i]) {
                    o = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], n = this._overwrittenProps[i] = e ? this._overwrittenProps[i] || {} : "all";
                    break
                }
            } else {
                if (t !== this.target) return !1;
                o = this._propLookup, n = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
            }
            if (o) {
                l = e || o, u = e !== n && "all" !== n && e !== o && (null == e || e._tempKill !== !0);
                for (s in l)(r = o[s]) && (r.pg && r.t._kill(l) && (a = !0), r.pg && 0 !== r.t._overwriteProps.length || (r._prev ? r._prev._next = r._next : r === this._firstPT && (this._firstPT = r._next), r._next && (r._next._prev = r._prev), r._next = r._prev = null), delete o[s]), u && (n[s] = 1);
                this._firstPT || this._enabled(!1, !1)
            }
        }
        return a
    }, n.invalidate = function () {
        return this._notifyPluginsOfEnabled && k._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this
    }, n._enabled = function (e, t) {
        if (r || s.wake(), e && this._gc) {
            var i, n = this._targets;
            if (n) for (i = n.length; --i > -1;) this._siblings[i] = R(n[i], this, !0);
            else this._siblings = R(this.target, this, !0)
        }
        return T.prototype._enabled.call(this, e, t), this._notifyPluginsOfEnabled && this._firstPT ? k._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
    }, k.to = function (e, t, i) {
        return new k(e, t, i)
    }, k.from = function (e, t, i) {
        return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new k(e, t, i)
    }, k.fromTo = function (e, t, i, n) {
        return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new k(e, t, n)
    }, k.delayedCall = function (e, t, i, n, s) {
        return new k(t, 0, {
            delay: e,
            onComplete: t,
            onCompleteParams: i,
            onCompleteScope: n,
            onReverseComplete: t,
            onReverseCompleteParams: i,
            onReverseCompleteScope: n,
            immediateRender: !1,
            useFrames: s,
            overwrite: 0
        })
    }, k.set = function (e, t) {
        return new k(e, 0, t)
    }, k.killTweensOf = k.killDelayedCallsTo = function (e, t) {
        for (var i = k.getTweensOf(e), n = i.length; --n > -1;) i[n]._kill(t, e)
    }, k.getTweensOf = function (e) {
        if (null != e) {
            e = "string" != typeof e ? e : k.selector(e) || e;
            var t, i, n, s;
            if ((e instanceof Array || M(e)) && "number" != typeof e[0]) {
                for (t = e.length, i = []; --t > -1;) i = i.concat(k.getTweensOf(e[t]));
                for (t = i.length; --t > -1;) for (s = i[t], n = t; --n > -1;) s === i[n] && i.splice(t, 1)
            } else for (i = R(e).concat(), t = i.length; --t > -1;) i[t]._gc && i.splice(t, 1);
            return i
        }
    };
    var D = p("plugins.TweenPlugin", function (e, t) {
        this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = D.prototype
    }, !0);
    if (n = D.prototype, D.version = "1.9.1", D.API = 2, n._firstPT = null, n._addTween = function (e, t, i, n, s, r) {
        var o, a;
        null != n && (o = "number" == typeof n || "=" !== n.charAt(1) ? Number(n) - i : parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))) && (this._firstPT = a = {
            _next: this._firstPT,
            t: e,
            p: t,
            s: i,
            c: o,
            f: "function" == typeof e[t],
            n: s || t,
            r: r
        }, a._next && (a._next._prev = a))
    }, n.setRatio = function (e) {
        for (var t, i = this._firstPT, n = 1e-6; i;) t = i.c * e + i.s, i.r ? t = t + (t > 0 ? .5 : -.5) >> 0 : n > t && t > -n && (t = 0), i.f ? i.t[i.p](t) : i.t[i.p] = t, i = i._next
    }, n._kill = function (e) {
        var t, i = this._overwriteProps,
            n = this._firstPT;
        if (null != e[this._propName]) this._overwriteProps = [];
        else for (t = i.length; --t > -1;) null != e[i[t]] && i.splice(t, 1);
        for (; n;) null != e[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
        return !1
    }, n._roundProps = function (e, t) {
        for (var i = this._firstPT; i;)(e[this._propName] || null != i.n && e[i.n.split(this._propName + "_").join("")]) && (i.r = t), i = i._next
    }, k._onPluginEvent = function (e, t) {
        var i, n, s, r, o, a = t._firstPT;
        if ("_onInitAllProps" === e) {
            for (; a;) {
                for (o = a._next, n = s; n && n.pr > a.pr;) n = n._next;
                (a._prev = n ? n._prev : r) ? a._prev._next = a : s = a, (a._next = n) ? n._prev = a : r = a, a = o
            }
            a = t._firstPT = s
        }
        for (; a;) a.pg && "function" == typeof a.t[e] && a.t[e]() && (i = !0), a = a._next;
        return i
    }, D.activate = function (e) {
        for (var t = e.length; --t > -1;) e[t].API === D.API && (j[(new e[t])._propName] = e[t]);
        return !0
    }, d.plugin = function (e) {
        if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
        var t, i = e.propName,
            n = e.priority || 0,
            s = e.overwriteProps,
            r = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_roundProps",
                initAll: "_onInitAllProps"
            },
            o = p("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                D.call(this, i, n), this._overwriteProps = s || []
            }, e.global === !0),
            a = o.prototype = new D(i);
        a.constructor = o, o.API = e.API;
        for (t in r)"function" == typeof e[t] && (a[r[t]] = e[t]);
        return o.version = e.version, D.activate([o]), o
    }, t = e._gsQueue, t) {
        for (i = 0; i < t.length; i++) t[i]();
        for (n in h) h[n].func || e.console.log("GSAP encountered missing dependency: com.greensock." + n)
    }
    r = !1
}(window), define("libs/gsap/TweenLite", function () {}), (window._gsQueue || (window._gsQueue = [])).push(function () {
    window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (e, t) {
        var i, n, s, r, o = function () {
                e.call(this, "css"), this._overwriteProps.length = 0
            },
            a = {},
            l = o.prototype = new e("css");
        l.constructor = o, o.version = "1.9.2", o.API = 2, o.defaultTransformPerspective = 0, l = "px", o.suffixMap = {
            top: l,
            right: l,
            bottom: l,
            left: l,
            width: l,
            height: l,
            fontSize: l,
            padding: l,
            margin: l,
            perspective: l
        };
        var u, h, c, d, p, f, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            y = /[^\d\-\.]/g,
            w = /(?:\d|\-|\+|=|#|\.)*/g,
            b = /opacity *= *([^)]*)/,
            x = /opacity:([^;]*)/,
            _ = /alpha\(opacity *=.+?\)/i,
            T = /([A-Z])/g,
            C = /-([a-z])/gi,
            k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            M = function (e, t) {
                return t.toUpperCase()
            },
            P = /(?:Left|Right|Width)/i,
            S = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            E = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            j = /,(?=[^\)]*(?:\(|$))/gi,
            $ = Math.PI / 180,
            I = 180 / Math.PI,
            A = {},
            F = document,
            O = F.createElement("div"),
            L = F.createElement("img"),
            R = o._internals = {
                _specialProps: a
            },
            N = navigator.userAgent,
            z = function () {
                var e, t = N.indexOf("Android"),
                    i = F.createElement("div");
                return c = -1 !== N.indexOf("Safari") && -1 === N.indexOf("Chrome") && (-1 === t || Number(N.substr(t + 8, 1)) > 3), p = c && Number(N.substr(N.indexOf("Version/") + 8, 1)) < 6, d = -1 !== N.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(N), f = parseFloat(RegExp.$1), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", e = i.getElementsByTagName("a")[0], e ? /^0.55/.test(e.style.opacity) : !1
            }(),
            D = function (e) {
                return b.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            },
            B = function (e) {
                window.console && console.log(e)
            },
            H = "",
            V = "",
            q = function (e, t) {
                t = t || O;
                var i, n, s = t.style;
                if (void 0 !== s[e]) return e;
                for (e = e.charAt(0).toUpperCase() + e.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === s[i[n] + e];);
                return n >= 0 ? (V = 3 === n ? "ms" : i[n], H = "-" + V.toLowerCase() + "-", V + e) : null
            },
            U = F.defaultView ? F.defaultView.getComputedStyle : function () {},
            W = o.getStyle = function (e, t, i, n, s) {
                var r;
                return z || "opacity" !== t ? (!n && e.style[t] ? r = e.style[t] : (i = i || U(e, null)) ? (e = i.getPropertyValue(t.replace(T, "-$1").toLowerCase()), r = e || i.length ? e : i[t]) : e.currentStyle && (i = e.currentStyle, r = i[t]), null == s || r && "none" !== r && "auto" !== r && "auto auto" !== r ? r : s) : D(e)
            },
            X = function (e, t, i) {
                var n, s, r = {},
                    o = e._gsOverwrittenClassNamePT;
                if (o && !i) {
                    for (; o;) o.setRatio(0), o = o._next;
                    e._gsOverwrittenClassNamePT = null
                }
                if (t = t || U(e, null)) if (n = t.length) for (; --n > -1;) r[t[n].replace(C, M)] = t.getPropertyValue(t[n]);
                else for (n in t) r[n] = t[n];
                else if (t = e.currentStyle || e.style) for (n in t) r[n.replace(C, M)] = t[n];
                return z || (r.opacity = D(e)), s = xt(e, t, !1), r.rotation = s.rotation * I, r.skewX = s.skewX * I, r.scaleX = s.scaleX, r.scaleY = s.scaleY, r.x = s.x, r.y = s.y, bt && (r.z = s.z, r.rotationX = s.rotationX * I, r.rotationY = s.rotationY * I, r.scaleZ = s.scaleZ), r.filters && delete r.filters, r
            },
            Y = function (e, t, i, n) {
                var s, r, o, a = {},
                    l = e.style;
                for (r in i)"cssText" !== r && "length" !== r && isNaN(r) && t[r] !== (s = i[r]) && -1 === r.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (a[r] = "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[r] || "" === t[r].replace(y, "") ? s : 0, void 0 !== l[r] && (o = new ut(l, r, l[r], o)));
                if (n) for (r in n)"className" !== r && (a[r] = n[r]);
                return {
                    difs: a,
                    firstMPT: o
                }
            },
            G = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            },
            Q = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            Z = function (e, t, i) {
                var n = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
                    s = G[t],
                    r = s.length;
                for (i = i || U(e, null); --r > -1;) n -= parseFloat(W(e, "padding" + s[r], i, !0)) || 0, n -= parseFloat(W(e, "border" + s[r] + "Width", i, !0)) || 0;
                return n
            },
            J = function (e, t, i, n, s) {
                if ("px" === n || !n) return i;
                if ("auto" === n || !i) return 0;
                var r, o = P.test(t),
                    a = e,
                    l = O.style,
                    u = 0 > i;
                return u && (i = -i), "%" === n && -1 !== t.indexOf("border") ? r = i / 100 * (o ? e.clientWidth : e.clientHeight) : (l.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;", "%" !== n && a.appendChild ? l[o ? "borderLeftWidth" : "borderTopWidth"] = i + n : (a = e.parentNode || F.body, l[o ? "width" : "height"] = i + n), a.appendChild(O), r = parseFloat(O[o ? "offsetWidth" : "offsetHeight"]), a.removeChild(O), 0 === r && !s && (r = J(e, t, i, n, !0))), u ? -r : r
            },
            K = function (e, t) {
                (null == e || "" === e || "auto" === e || "auto auto" === e) && (e = "0 0");
                var i = e.split(" "),
                    n = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : i[0],
                    s = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : i[1];
                return null == s ? s = "0" : "center" === s && (s = "50%"), ("center" === n || isNaN(parseFloat(n))) && (n = "50%"), t && (t.oxp = -1 !== n.indexOf("%"), t.oyp = -1 !== s.indexOf("%"), t.oxr = "=" === n.charAt(1), t.oyr = "=" === s.charAt(1), t.ox = parseFloat(n.replace(y, "")), t.oy = parseFloat(s.replace(y, ""))), n + " " + s + (i.length > 2 ? " " + i[2] : "")
            },
            et = function (e, t) {
                return "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
            },
            tt = function (e, t) {
                return null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * Number(e.substr(2)) + t : parseFloat(e)
            },
            it = function (e, t, i, n) {
                var s, r, o, a, l, u = 1e-6;
                return null == e ? l = t : "number" == typeof e ? l = e * $ : (s = 2 * Math.PI, r = e.split("_"), o = Number(r[0].replace(y, "")) * (-1 === e.indexOf("rad") ? $ : 1) - ("=" === e.charAt(1) ? 0 : t), a = r[1], a && n && (n[i] = t + o), "short" === a ? (o %= s, o !== o % (s / 2) && (o = 0 > o ? o + s : o - s)) : "cw" === a && 0 > o ? o = (o + 9999999999 * s) % s - (o / s | 0) * s : "ccw" === a && o > 0 && (o = (o - 9999999999 * s) % s - (o / s | 0) * s), l = t + o), u > l && l > -u && (l = 0), l
            },
            nt = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            st = function (e, t, i) {
                return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 255 * (1 > 6 * e ? t + (i - t) * e * 6 : .5 > e ? i : 2 > 3 * e ? t + (i - t) * (2 / 3 - e) * 6 : t) + .5 | 0
            },
            rt = function (e) {
                var t, i, n, s, r, o;
                return e && "" !== e ? "number" == typeof e ? [e >> 16, e >> 8 & 255, 255 & e] : ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), nt[e] ? nt[e] : "#" === e.charAt(0) ? (4 === e.length && (t = e.charAt(1), i = e.charAt(2), n = e.charAt(3), e = "#" + t + t + i + i + n + n), e = parseInt(e.substr(1), 16), [e >> 16, e >> 8 & 255, 255 & e]) : "hsl" === e.substr(0, 3) ? (e = e.match(m), s = Number(e[0]) % 360 / 360, r = Number(e[1]) / 100, o = Number(e[2]) / 100, i = .5 >= o ? o * (r + 1) : o + r - o * r, t = 2 * o - i, e.length > 3 && (e[3] = Number(e[3])), e[0] = st(s + 1 / 3, t, i), e[1] = st(s, t, i), e[2] = st(s - 1 / 3, t, i), e) : (e = e.match(m) || nt.transparent, e[0] = Number(e[0]), e[1] = Number(e[1]), e[2] = Number(e[2]), e.length > 3 && (e[3] = Number(e[3])), e)) : nt.black
            },
            ot = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (l in nt) ot += "|" + l + "\\b";
        ot = new RegExp(ot + ")", "gi");
        var at = function (e, t, i, n) {
                if (null == e) return function (e) {
                    return e
                };
                var s, r = t ? (e.match(ot) || [""])[0] : "",
                    o = e.split(r).join("").match(v) || [],
                    a = e.substr(0, e.indexOf(o[0])),
                    l = ")" === e.charAt(e.length - 1) ? ")" : "",
                    u = -1 !== e.indexOf(" ") ? " " : ",",
                    h = o.length,
                    c = h > 0 ? o[0].replace(m, "") : "";
                return h ? s = t ?
                function (e) {
                    var t, d, p, f;
                    if ("number" == typeof e) e += c;
                    else if (n && j.test(e)) {
                        for (f = e.replace(j, "|").split("|"), p = 0; p < f.length; p++) f[p] = s(f[p]);
                        return f.join(",")
                    }
                    if (t = (e.match(ot) || [r])[0], d = e.split(t).join("").match(v) || [], p = d.length, h > p--) for (; ++p < h;) d[p] = i ? d[(p - 1) / 2 >> 0] : o[p];
                    return a + d.join(u) + u + t + l + (-1 !== e.indexOf("inset") ? " inset" : "")
                } : function (e) {
                    var t, r, d;
                    if ("number" == typeof e) e += c;
                    else if (n && j.test(e)) {
                        for (r = e.replace(j, "|").split("|"), d = 0; d < r.length; d++) r[d] = s(r[d]);
                        return r.join(",")
                    }
                    if (t = e.match(v) || [], d = t.length, h > d--) for (; ++d < h;) t[d] = i ? t[(d - 1) / 2 >> 0] : o[d];
                    return a + t.join(u) + l
                } : function (e) {
                    return e
                }
            },
            lt = function (e) {
                return e = e.split(","), function (t, i, n, s, r, o, a) {
                    var l, u = (i + "").split(" ");
                    for (a = {}, l = 0; 4 > l; l++) a[e[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
                    return s.parse(t, a, r, o)
                }
            },
            ut = (R._setPluginRatio = function (e) {
                this.plugin.setRatio(e);
                for (var t, i, n, s, r = this.data, o = r.proxy, a = r.firstMPT, l = 1e-6; a;) t = o[a.v], a.r ? t = t > 0 ? t + .5 >> 0 : t - .5 >> 0 : l > t && t > -l && (t = 0), a.t[a.p] = t, a = a._next;
                if (r.autoRotate && (r.autoRotate.rotation = o.rotation), 1 === e) for (a = r.firstMPT; a;) {
                    if (i = a.t, i.type) {
                        if (1 === i.type) {
                            for (s = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) s += i["xn" + n] + i["xs" + (n + 1)];
                            i.e = s
                        }
                    } else i.e = i.s + i.xs0;
                    a = a._next
                }
            }, function (e, t, i, n, s) {
                this.t = e, this.p = t, this.v = i, this.r = s, n && (n._prev = this, this._next = n)
            }),
            ht = (R._parseToProxy = function (e, t, i, n, s, r) {
                var o, a, l, u, h, c = n,
                    d = {},
                    p = {},
                    f = i._transform,
                    m = A;
                for (i._transform = null, A = t, n = h = i.parse(e, t, n, s), A = m, r && (i._transform = f, c && (c._prev = null, c._prev && (c._prev._next = null))); n && n !== c;) {
                    if (n.type <= 1 && (a = n.p, p[a] = n.s + n.c, d[a] = n.s, r || (u = new ut(n, "s", a, u, n.r), n.c = 0), 1 === n.type)) for (o = n.l; --o > 0;) l = "xn" + o, a = n.p + "_" + l, p[a] = n.data[l], d[a] = n[l], r || (u = new ut(n, l, a, u, n.rxp[l]));
                    n = n._next
                }
                return {
                    proxy: d,
                    end: p,
                    firstMPT: u,
                    pt: h
                }
            }, R.CSSPropTween = function (e, t, n, s, o, a, l, u, h, c, d) {
                this.t = e, this.p = t, this.s = n, this.c = s, this.n = l || "css_" + t, e instanceof ht || r.push(this.n), this.r = u, this.type = a || 0, h && (this.pr = h, i = !0), this.b = void 0 === c ? n : c, this.e = void 0 === d ? n + s : d, o && (this._next = o, o._prev = this)
            }),
            ct = o.parseComplex = function (e, t, i, n, s, r, o, a, l, h) {
                o = new ht(e, t, 0, 0, o, h ? 2 : 1, null, !1, a, i, n), n += "";
                var c, d, p, f, v, y, w, b, x, _, T, C, k = i.split(", ").join(",").split(" "),
                    M = n.split(", ").join(",").split(" "),
                    P = k.length,
                    S = u !== !1;
                for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (k = k.join(" ").replace(j, ", ").split(" "), M = M.join(" ").replace(j, ", ").split(" "), P = k.length), P !== M.length && (k = (r || "").split(" "), P = k.length), o.plugin = l, o.setRatio = h, c = 0; P > c; c++) if (f = k[c], v = M[c], b = parseFloat(f), b || 0 === b) o.appendXtra("", b, et(v, b), v.replace(g, ""), S && -1 !== v.indexOf("px"), !0);
                else if (s && ("#" === f.charAt(0) || 0 === f.indexOf("rgb") || nt[f] || 0 === f.indexOf("hsl"))) C = "," === v.charAt(v.length - 1) ? ")," : ")", f = rt(f), v = rt(v), x = f.length + v.length > 6, x && !z && 0 === v[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(M[c]).join("transparent")) : (z || (x = !1), o.appendXtra(x ? "rgba(" : "rgb(", f[0], v[0] - f[0], ",", !0, !0).appendXtra("", f[1], v[1] - f[1], ",", !0).appendXtra("", f[2], v[2] - f[2], x ? "," : C, !0), x && (f = f.length < 4 ? 1 : f[3], o.appendXtra("", f, (v.length < 4 ? 1 : v[3]) - f, C, !1)));
                else if (y = f.match(m)) {
                    if (w = v.match(g), !w || w.length !== y.length) return o;
                    for (p = 0, d = 0; d < y.length; d++) T = y[d], _ = f.indexOf(T, p), o.appendXtra(f.substr(p, _ - p), Number(T), et(w[d], T), "", S && "px" === f.substr(_ + T.length, 2), 0 === d), p = _ + T.length;
                    o["xs" + o.l] += f.substr(p)
                } else o["xs" + o.l] += o.l ? " " + f : f;
                if (-1 !== n.indexOf("=") && o.data) {
                    for (C = o.xs0 + o.data.s, c = 1; c < o.l; c++) C += o["xs" + c] + o.data["xn" + c];
                    o.e = C + o["xs" + c]
                }
                return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
            },
            dt = 9;
        for (l = ht.prototype, l.l = l.pr = 0; --dt > 0;) l["xn" + dt] = 0, l["xs" + dt] = "";
        l.xs0 = "", l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null, l.appendXtra = function (e, t, i, n, s, r) {
            var o = this,
                a = o.l;
            return o["xs" + a] += r && a ? " " + e : e || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = t + i, o.rxp["xn" + a] = s, o["xn" + a] = t, o.plugin || (o.xfirst = new ht(o, "xn" + a, t, i, o.xfirst || o, 0, o.n, s, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                s: t + i
            }, o.rxp = {}, o.s = t, o.c = i, o.r = s, o)) : (o["xs" + a] += t + (n || ""), o)
        };
        var pt = function (e, t) {
                t = t || {}, this.p = t.prefix ? q(e) || e : e, a[e] = a[this.p] = this, this.format = t.formatter || at(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
            },
            ft = R._registerComplexSpecialProp = function (e, t, i) {
                "object" != typeof t && (t = {
                    parser: i
                });
                var n, s, r = e.split(","),
                    o = t.defaultValue;
                for (i = i || [o], n = 0; n < r.length; n++) t.prefix = 0 === n && t.prefix, t.defaultValue = i[n] || o, s = new pt(r[n], t)
            },
            mt = function (e) {
                if (!a[e]) {
                    var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                    ft(e, {
                        parser: function (e, i, n, s, r, o, l) {
                            var u = (window.GreenSockGlobals || window).com.greensock.plugins[t];
                            return u ? (u._cssRegister(), a[n].parse(e, i, n, s, r, o, l)) : (B("Error: " + t + " js file not loaded."), r)
                        }
                    })
                }
            };
        l = pt.prototype, l.parseComplex = function (e, t, i, n, s, r) {
            var o, a, l, u, h, c, d = this.keyword;
            if (this.multi && (j.test(i) || j.test(t) ? (a = t.replace(j, "|").split("|"), l = i.replace(j, "|").split("|")) : d && (a = [t], l = [i])), l) {
                for (u = l.length > a.length ? l.length : a.length, o = 0; u > o; o++) t = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, d && (h = t.indexOf(d), c = i.indexOf(d), h !== c && (i = -1 === c ? l : a, i[o] += " " + d));
                t = a.join(", "), i = l.join(", ")
            }
            return ct(e, this.p, t, i, this.clrs, this.dflt, n, this.pr, s, r)
        }, l.parse = function (e, t, i, n, r, o) {
            return this.parseComplex(e.style, this.format(W(e, this.p, s, !1, this.dflt)), this.format(t), r, o)
        }, o.registerSpecialProp = function (e, t, i) {
            ft(e, {
                parser: function (e, n, s, r, o, a) {
                    var l = new ht(e, s, 0, 0, o, 2, s, !1, i);
                    return l.plugin = a, l.setRatio = t(e, n, r._tween, s), l
                },
                priority: i
            })
        };
        var gt = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),
            vt = q("transform"),
            yt = H + "transform",
            wt = q("transformOrigin"),
            bt = null !== q("perspective"),
            xt = function (e, t, i) {
                var n, s, r, a, l, u, h, c, d, p, f, m, g, v = i ? e._gsTransform || {
                    skewY: 0
                } : {
                    skewY: 0
                },
                    y = v.scaleX < 0,
                    w = 2e-5,
                    b = 1e5,
                    x = -Math.PI + 1e-4,
                    _ = Math.PI - 1e-4,
                    T = bt ? parseFloat(W(e, wt, t, !1, "0 0 0").split(" ")[2]) || v.zOrigin || 0 : 0;
                for (vt ? n = W(e, yt, t, !0) : e.currentStyle && (n = e.currentStyle.filter.match(S), n = n && 4 === n.length ? n[0].substr(4) + "," + Number(n[2].substr(4)) + "," + Number(n[1].substr(4)) + "," + n[3].substr(4) + "," + (v ? v.x : 0) + "," + (v ? v.y : 0) : null), s = (n || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], r = s.length; --r > -1;) a = Number(s[r]), s[r] = (l = a - (a |= 0)) ? (l * b + (0 > l ? -.5 : .5) | 0) / b + a : a;
                if (16 === s.length) {
                    var C = s[8],
                        k = s[9],
                        M = s[10],
                        P = s[12],
                        E = s[13],
                        j = s[14];
                    if (v.zOrigin && (j = -v.zOrigin, P = C * j - s[12], E = k * j - s[13], j = M * j + v.zOrigin - s[14]), !i || P !== v.x || E !== v.y || j !== v.z) {
                        var $, I, A, F, O, L, R, N, z = s[0],
                            D = s[1],
                            B = s[2],
                            H = s[3],
                            V = s[4],
                            q = s[5],
                            U = s[6],
                            X = s[7],
                            Y = s[11],
                            G = v.rotationX = Math.atan2(U, M),
                            Q = x > G || G > _;
                        G && (O = Math.cos(-G), L = Math.sin(-G), $ = V * O + C * L, I = q * O + k * L, A = U * O + M * L, F = X * O + Y * L, C = V * -L + C * O, k = q * -L + k * O, M = U * -L + M * O, Y = X * -L + Y * O, V = $, q = I, U = A), G = v.rotationY = Math.atan2(C, z), G && (R = x > G || G > _, O = Math.cos(-G), L = Math.sin(-G), $ = z * O - C * L, I = D * O - k * L, A = B * O - M * L, F = H * O - Y * L, k = D * L + k * O, M = B * L + M * O, Y = H * L + Y * O, z = $, D = I, B = A), G = v.rotation = Math.atan2(D, q), G && (N = x > G || G > _, O = Math.cos(-G), L = Math.sin(-G), z = z * O + V * L, I = D * O + q * L, q = D * -L + q * O, U = B * -L + U * O, D = I), N && Q ? v.rotation = v.rotationX = 0 : N && R ? v.rotation = v.rotationY = 0 : R && Q && (v.rotationY = v.rotationX = 0), v.scaleX = (Math.sqrt(z * z + D * D) * b + .5 >> 0) / b, v.scaleY = (Math.sqrt(q * q + k * k) * b + .5 >> 0) / b, v.scaleZ = (Math.sqrt(U * U + M * M) * b + .5 >> 0) / b, v.skewX = 0, v.perspective = Y ? 1 / (0 > Y ? -Y : Y) : 0, v.x = P, v.y = E, v.z = j
                    }
                } else if (!bt || 0 === s.length || v.x !== s[4] || v.y !== s[5] || !v.rotationX && !v.rotationY) {
                    var Z = s.length >= 6,
                        J = Z ? s[0] : 1,
                        K = s[1] || 0,
                        et = s[2] || 0,
                        tt = Z ? s[3] : 1;
                    v.x = s[4] || 0, v.y = s[5] || 0, u = Math.sqrt(J * J + K * K), h = Math.sqrt(tt * tt + et * et), c = J || K ? Math.atan2(K, J) : v.rotation || 0, d = et || tt ? Math.atan2(et, tt) + c : v.skewX || 0, p = u - Math.abs(v.scaleX || 0), f = h - Math.abs(v.scaleY || 0), Math.abs(d) > Math.PI / 2 && Math.abs(d) < 1.5 * Math.PI && (y ? (u *= -1, d += 0 >= c ? Math.PI : -Math.PI, c += 0 >= c ? Math.PI : -Math.PI) : (h *= -1, d += 0 >= d ? Math.PI : -Math.PI)), m = (c - v.rotation) % Math.PI, g = (d - v.skewX) % Math.PI, (void 0 === v.skewX || p > w || -w > p || f > w || -w > f || m > x && _ > m && m * b >> 0 !== 0 || g > x && _ > g && g * b >> 0 !== 0) && (v.scaleX = u, v.scaleY = h, v.rotation = c, v.skewX = d), bt && (v.rotationX = v.rotationY = v.z = 0, v.perspective = parseFloat(o.defaultTransformPerspective) || 0, v.scaleZ = 1)
                }
                v.zOrigin = T;
                for (r in v) v[r] < w && v[r] > -w && (v[r] = 0);
                return i && (e._gsTransform = v), v
            },
            _t = function (e) {
                var t, i, n = this.data,
                    s = -n.rotation,
                    r = s + n.skewX,
                    o = 1e5,
                    a = (Math.cos(s) * n.scaleX * o >> 0) / o,
                    l = (Math.sin(s) * n.scaleX * o >> 0) / o,
                    u = (Math.sin(r) * -n.scaleY * o >> 0) / o,
                    h = (Math.cos(r) * n.scaleY * o >> 0) / o,
                    c = this.t.style,
                    d = this.t.currentStyle;
                if (d) {
                    i = l, l = -u, u = -i, t = d.filter, c.filter = "";
                    var p, m, g = this.t.offsetWidth,
                        v = this.t.offsetHeight,
                        y = "absolute" !== d.position,
                        x = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + u + ", M22=" + h,
                        _ = n.x,
                        T = n.y;
                    if (null != n.ox && (p = (n.oxp ? g * n.ox * .01 : n.ox) - g / 2, m = (n.oyp ? v * n.oy * .01 : n.oy) - v / 2, _ += p - (p * a + m * l), T += m - (p * u + m * h)), y) p = g / 2, m = v / 2, x += ", Dx=" + (p - (p * a + m * l) + _) + ", Dy=" + (m - (p * u + m * h) + T) + ")";
                    else {
                        var C, k, M, P = 8 > f ? 1 : -1;
                        for (p = n.ieOffsetX || 0, m = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * v)) / 2 + _), n.ieOffsetY = Math.round((v - ((0 > h ? -h : h) * v + (0 > u ? -u : u) * g)) / 2 + T), dt = 0; 4 > dt; dt++) k = Q[dt], C = d[k], i = -1 !== C.indexOf("px") ? parseFloat(C) : J(this.t, k, parseFloat(C), C.replace(w, "")) || 0, M = i !== n[k] ? 2 > dt ? -n.ieOffsetX : -n.ieOffsetY : 2 > dt ? p - n.ieOffsetX : m - n.ieOffsetY, c[k] = (n[k] = Math.round(i - M * (0 === dt || 2 === dt ? 1 : P))) + "px";
                        x += ", sizingMethod='auto expand')"
                    }
                    c.filter = -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? t.replace(E, x) : x + " " + t, !(0 !== e && 1 !== e || 1 !== a || 0 !== l || 0 !== u || 1 !== h || y && -1 === x.indexOf("Dx=0, Dy=0") || b.test(t) && 100 !== parseFloat(RegExp.$1) || -1 !== t.indexOf("gradient(") || !c.removeAttribute("filter"))
                }
            },
            Tt = function () {
                var e, t, i, n, s, r, o, a, l, u = this.data,
                    h = this.t.style,
                    c = u.perspective,
                    p = u.scaleX,
                    f = 0,
                    m = 0,
                    g = 0,
                    v = 0,
                    y = u.scaleY,
                    w = 0,
                    b = 0,
                    x = 0,
                    _ = 0,
                    T = u.scaleZ,
                    C = 0,
                    k = 0,
                    M = 0,
                    P = c ? -1 / c : 0,
                    S = u.rotation,
                    E = u.zOrigin,
                    j = ",",
                    $ = 1e5;
                d && (o = h.top ? "top" : h.bottom ? "bottom" : parseFloat(W(this.t, "top", null, !1)) ? "bottom" : "top", i = W(this.t, o, null, !1), a = parseFloat(i) || 0, l = i.substr((a + "").length) || "px", u._ffFix = !u._ffFix, h[o] = (u._ffFix ? a + .05 : a - .05) + l), (S || u.skewX) && (i = p * Math.cos(S), n = y * Math.sin(S), S -= u.skewX, f = p * -Math.sin(S), y *= Math.cos(S), p = i, v = n), S = u.rotationY, S && (e = Math.cos(S), t = Math.sin(S), i = p * e, n = v * e, s = T * -t, r = P * -t, m = p * t, w = v * t, T *= e, P *= e, p = i, v = n, x = s, k = r), S = u.rotationX, S && (e = Math.cos(S), t = Math.sin(S), i = f * e + m * t, n = y * e + w * t, s = _ * e + T * t, r = M * e + P * t, m = f * -t + m * e, w = y * -t + w * e, T = _ * -t + T * e, P = M * -t + P * e, f = i, y = n, _ = s, M = r), E && (C -= E, g = m * C, b = w * C, C = T * C + E), g = (i = (g += u.x) - (g |= 0)) ? (i * $ + (0 > i ? -.5 : .5) | 0) / $ + g : g, b = (i = (b += u.y) - (b |= 0)) ? (i * $ + (0 > i ? -.5 : .5) | 0) / $ + b : b, C = (i = (C += u.z) - (C |= 0)) ? (i * $ + (0 > i ? -.5 : .5) | 0) / $ + C : C, h[vt] = "matrix3d(" + (p * $ >> 0) / $ + j + (v * $ >> 0) / $ + j + (x * $ >> 0) / $ + j + (k * $ >> 0) / $ + j + (f * $ >> 0) / $ + j + (y * $ >> 0) / $ + j + (_ * $ >> 0) / $ + j + (M * $ >> 0) / $ + j + (m * $ >> 0) / $ + j + (w * $ >> 0) / $ + j + (T * $ >> 0) / $ + j + (P * $ >> 0) / $ + j + g + j + b + j + C + j + (c ? 1 + -C / c : 1) + ")"
            },
            Ct = function () {
                var e, t, i, n, s, r, o, a, l, u = this.data,
                    h = this.t,
                    c = h.style;
                d && (e = c.top ? "top" : c.bottom ? "bottom" : parseFloat(W(h, "top", null, !1)) ? "bottom" : "top", t = W(h, e, null, !1), i = parseFloat(t) || 0, n = t.substr((i + "").length) || "px", u._ffFix = !u._ffFix, c[e] = (u._ffFix ? i + .05 : i - .05) + n), u.rotation || u.skewX ? (s = u.rotation, r = s - u.skewX, o = 1e5, a = u.scaleX * o, l = u.scaleY * o, c[vt] = "matrix(" + (Math.cos(s) * a >> 0) / o + "," + (Math.sin(s) * a >> 0) / o + "," + (Math.sin(r) * -l >> 0) / o + "," + (Math.cos(r) * l >> 0) / o + "," + u.x + "," + u.y + ")") : c[vt] = "matrix(" + u.scaleX + ",0,0," + u.scaleY + "," + u.x + "," + u.y + ")"
            };
        ft("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation", {
            parser: function (e, t, i, n, r, o, a) {
                if (n._transform) return r;
                var l, u, h, c, d, p, f, m = n._transform = xt(e, s, !0),
                    g = e.style,
                    v = 1e-6,
                    y = gt.length,
                    w = a,
                    b = {};
                if ("string" == typeof w.transform && vt) h = g.cssText, g[vt] = w.transform, g.display = "block", l = xt(e, null, !1), g.cssText = h;
                else if ("object" == typeof w) {
                    if (l = {
                        scaleX: tt(null != w.scaleX ? w.scaleX : w.scale, m.scaleX),
                        scaleY: tt(null != w.scaleY ? w.scaleY : w.scale, m.scaleY),
                        scaleZ: tt(null != w.scaleZ ? w.scaleZ : w.scale, m.scaleZ),
                        x: tt(w.x, m.x),
                        y: tt(w.y, m.y),
                        z: tt(w.z, m.z),
                        perspective: tt(w.transformPerspective, m.perspective)
                    }, f = w.directionalRotation, null != f) if ("object" == typeof f) for (h in f) w[h] = f[h];
                    else w.rotation = f;
                    l.rotation = it("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : m.rotation * I, m.rotation, "rotation", b), bt && (l.rotationX = it("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : m.rotationX * I || 0, m.rotationX, "rotationX", b), l.rotationY = it("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : m.rotationY * I || 0, m.rotationY, "rotationY", b)), l.skewX = null == w.skewX ? m.skewX : it(w.skewX, m.skewX), l.skewY = null == w.skewY ? m.skewY : it(w.skewY, m.skewY), (u = l.skewY - m.skewY) && (l.skewX += u, l.rotation += u)
                }
                for (d = m.z || m.rotationX || m.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, !d && null != w.scale && (l.scaleZ = 1); --y > -1;) i = gt[y], c = l[i] - m[i], (c > v || -v > c || null != A[i]) && (p = !0, r = new ht(m, i, m[i], c, r), i in b && (r.e = b[i]), r.xs0 = 0, r.plugin = o, n._overwriteProps.push(r.n));
                return c = w.transformOrigin, (c || bt && d && m.zOrigin) && (vt ? (p = !0, c = (c || W(e, i, s, !1, "50% 50%")) + "", i = wt, r = new ht(g, i, 0, 0, r, -1, "css_transformOrigin"), r.b = g[i], r.plugin = o, bt ? (h = m.zOrigin, c = c.split(" "), m.zOrigin = (c.length > 2 ? parseFloat(c[2]) : h) || 0, r.xs0 = r.e = g[i] = c[0] + " " + (c[1] || "50%") + " 0px", r = new ht(m, "zOrigin", 0, 0, r, -1, r.n), r.b = h, r.xs0 = r.e = m.zOrigin) : r.xs0 = r.e = g[i] = c) : K(c + "", m)), p && (n._transformType = d || 3 === this._transformType ? 3 : 2), r
            },
            prefix: !0
        }), ft("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), ft("borderRadius", {
            defaultValue: "0px",
            parser: function (e, t, i, r, o) {
                t = this.format(t);
                var a, l, u, h, c, d, p, f, m, g, v, y, w, b, x, _, T = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    C = e.style;
                for (m = parseFloat(e.offsetWidth), g = parseFloat(e.offsetHeight), a = t.split(" "), l = 0; l < T.length; l++) this.p.indexOf("border") && (T[l] = q(T[l])), c = h = W(e, T[l], s, !1, "0px"), -1 !== c.indexOf(" ") && (h = c.split(" "), c = h[0], h = h[1]), d = u = a[l], p = parseFloat(c), y = c.substr((p + "").length), w = "=" === d.charAt(1), w ? (f = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), f *= parseFloat(d), v = d.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(d), v = d.substr((f + "").length)), "" === v && (v = n[i] || y), v !== y && (b = J(e, "borderLeft", p, y), x = J(e, "borderTop", p, y), "%" === v ? (c = b / m * 100 + "%", h = x / g * 100 + "%") : "em" === v ? (_ = J(e, "borderLeft", 1, "em"), c = b / _ + "em", h = x / _ + "em") : (c = b + "px", h = x + "px"), w && (d = parseFloat(c) + f + v, u = parseFloat(h) + f + v)), o = ct(C, T[l], c + " " + h, d + " " + u, !1, "0px", o);
                return o
            },
            prefix: !0,
            formatter: at("0px 0px 0px 0px", !1, !0)
        }), ft("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (e, t, i, n, r, o) {
                var a, l, u, h, c, d, p = "background-position",
                    m = s || U(e, null),
                    g = this.format((m ? f ? m.getPropertyValue(p + "-x") + " " + m.getPropertyValue(p + "-y") : m.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                    v = this.format(t);
                if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && (d = W(e, "backgroundImage").replace(k, ""), d && "none" !== d)) {
                    for (a = g.split(" "), l = v.split(" "), L.setAttribute("src", d), u = 2; --u > -1;) g = a[u], h = -1 !== g.indexOf("%"), h !== (-1 !== l[u].indexOf("%")) && (c = 0 === u ? e.offsetWidth - L.width : e.offsetHeight - L.height, a[u] = h ? parseFloat(g) / 100 * c + "px" : parseFloat(g) / c * 100 + "%");
                    g = a.join(" ")
                }
                return this.parseComplex(e.style, g, v, r, o)
            },
            formatter: K
        }), ft("backgroundSize", {
            defaultValue: "0 0",
            formatter: K
        }), ft("perspective", {
            defaultValue: "0px",
            prefix: !0
        }), ft("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), ft("transformStyle", {
            prefix: !0
        }), ft("backfaceVisibility", {
            prefix: !0
        }), ft("margin", {
            parser: lt("marginTop,marginRight,marginBottom,marginLeft")
        }), ft("padding", {
            parser: lt("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }), ft("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (e, t, i, n, r, o) {
                var a, l, u;
                return 9 > f ? (l = e.currentStyle, u = 8 > f ? " " : ",", a = "rect(" + l.clipTop + u + l.clipRight + u + l.clipBottom + u + l.clipLeft + ")", t = this.format(t).split(",").join(u)) : (a = this.format(W(e, this.p, s, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, a, t, r, o)
            }
        }), ft("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), ft("autoRound,strictUnits", {
            parser: function (e, t, i, n, s) {
                return s
            }
        }), ft("border", {
            defaultValue: "0px solid #000",
            parser: function (e, t, i, n, r, o) {
                return this.parseComplex(e.style, this.format(W(e, "borderTopWidth", s, !1, "0px") + " " + W(e, "borderTopStyle", s, !1, "solid") + " " + W(e, "borderTopColor", s, !1, "#000")), this.format(t), r, o)
            },
            color: !0,
            formatter: function (e) {
                var t = e.split(" ");
                return t[0] + " " + (t[1] || "solid") + " " + (e.match(ot) || ["#000"])[0]
            }
        }), ft("float,cssFloat,styleFloat", {
            parser: function (e, t, i, n, s) {
                var r = e.style,
                    o = "cssFloat" in r ? "cssFloat" : "styleFloat";
                return new ht(r, o, 0, 0, s, -1, i, !1, 0, r[o], t)
            }
        });
        var kt = function (e) {
                var t, i = this.t,
                    n = i.filter,
                    s = this.s + this.c * e >> 0;
                100 === s && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") ? (i.removeAttribute("filter"), t = !W(this.data, "filter")) : (i.filter = n.replace(_, ""), t = !0)), t || (this.xn1 && (i.filter = n = n || "alpha(opacity=100)"), -1 === n.indexOf("opacity") ? i.filter += " alpha(opacity=" + s + ")" : i.filter = n.replace(b, "opacity=" + s))
            };
        ft("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function (e, t, i, n, r, o) {
                var a, l = parseFloat(W(e, "opacity", s, !1, "1")),
                    u = e.style;
                return t = parseFloat(t), "autoAlpha" === i && (a = W(e, "visibility", s), 1 === l && "hidden" === a && 0 !== t && (l = 0), r = new ht(u, "visibility", 0, 0, r, -1, null, !1, 0, 0 !== l ? "visible" : "hidden", 0 === t ? "hidden" : "visible"), r.xs0 = "visible", n._overwriteProps.push(r.n)), z ? r = new ht(u, "opacity", l, t - l, r) : (r = new ht(u, "opacity", 100 * l, 100 * (t - l), r), r.xn1 = "autoAlpha" === i ? 1 : 0, u.zoom = 1, r.type = 2, r.b = "alpha(opacity=" + r.s + ")", r.e = "alpha(opacity=" + (r.s + r.c) + ")", r.data = e, r.plugin = o, r.setRatio = kt), r
            }
        });
        var Mt = function (e) {
                if (1 === e || 0 === e) {
                    this.t.className = 1 === e ? this.e : this.b;
                    for (var t = this.data, i = this.t.style, n = i.removeProperty ? "removeProperty" : "removeAttribute"; t;) t.v ? i[t.p] = t.v : i[n](t.p.replace(T, "-$1").toLowerCase()), t = t._next
                } else this.t.className !== this.b && (this.t.className = this.b)
            };
        ft("className", {
            parser: function (e, t, n, r, o, a, l) {
                var u, h, c = e.className,
                    d = e.style.cssText;
                return o = r._classNamePT = new ht(e, n, 0, 0, o, 2), o.setRatio = Mt, o.pr = -11, i = !0, o.b = c, o.e = "=" !== t.charAt(1) ? t : "+" === t.charAt(0) ? c + " " + t.substr(2) : c.split(t.substr(2)).join(""), r._tween._duration && (h = X(e, s, !0), e.className = o.e, u = Y(e, h, X(e), l), e.className = c, o.data = u.firstMPT, e.style.cssText = d, o = o.xfirst = r.parse(e, u.difs, o, a)), o
            }
        });
        var Pt = function (e) {
                if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration) for (var t, i = "all" === this.e, n = this.t.style, s = i ? n.cssText.split(";") : this.e.split(","), r = n.removeProperty ? "removeProperty" : "removeAttribute", o = s.length, l = a.transform.parse; --o > -1;) t = s[o], i && (t = t.substr(0, t.indexOf(":")).split(" ").join("")), a[t] && (t = a[t].parse === l ? vt : a[t].p), t && n[r](t.replace(T, "-$1").toLowerCase())
            };
        for (ft("clearProps", {
            parser: function (e, t, n, s, r) {
                return r = new ht(e, n, 0, 0, r, 2), r.setRatio = Pt, r.e = t, r.pr = -10, r.data = s._tween, i = !0, r
            }
        }), l = "bezier,throwProps,physicsProps,physics2D".split(","), dt = l.length; dt--;) mt(l[dt]);
        l = o.prototype, l._firstPT = null, l._onInitTween = function (e, t, a) {
            if (!e.nodeType) return !1;
            this._target = e, this._tween = a, this._vars = t, u = t.autoRound, i = !1, n = t.suffixMap || o.suffixMap, s = U(e, ""), r = this._overwriteProps;
            var l, d, f, m, g, v, y, w, b, _ = e.style;
            if (h && "" === _.zIndex && (l = W(e, "zIndex", s), ("auto" === l || "" === l) && (_.zIndex = 0)), "string" == typeof t && (m = _.cssText, l = X(e, s), _.cssText = m + ";" + t, l = Y(e, l, X(e)).difs, !z && x.test(t) && (l.opacity = parseFloat(RegExp.$1)), t = l, _.cssText = m), this._firstPT = d = this.parse(e, t, null), this._transformType) {
                for (b = 3 === this._transformType, vt ? c && (h = !0, "" === _.zIndex && (y = W(e, "zIndex", s), ("auto" === y || "" === y) && (_.zIndex = 0)), p && (_.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (b ? "visible" : "hidden"))) : _.zoom = 1, f = d; f && f._next;) f = f._next;
                w = new ht(e, "transform", 0, 0, null, 2), this._linkCSSP(w, null, f), w.setRatio = b && bt ? Tt : vt ? Ct : _t, w.data = this._transform || xt(e, s, !0), r.pop()
            }
            if (i) {
                for (; d;) {
                    for (v = d._next, f = m; f && f.pr > d.pr;) f = f._next;
                    (d._prev = f ? f._prev : g) ? d._prev._next = d : m = d, (d._next = f) ? f._prev = d : g = d, d = v
                }
                this._firstPT = m
            }
            return !0
        }, l.parse = function (e, t, i, r) {
            var o, l, h, c, d, p, f, m, g, v, y = e.style;
            for (o in t) p = t[o], l = a[o], l ? i = l.parse(e, p, o, this, i, r, t) : (d = W(e, o, s) + "", g = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || g && !p.indexOf("rgb") ? (g || (p = rt(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = ct(y, o, d, p, !0, "transparent", i, 0, r)) : !g || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (h = parseFloat(d), f = h || 0 === h ? d.substr((h + "").length) : "", ("" === d || "auto" === d) && ("width" === o || "height" === o ? (h = Z(e, o, s), f = "px") : (h = "opacity" !== o ? 0 : 1, f = "")), v = g && "=" === p.charAt(1), v ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), m = p.replace(w, "")) : (c = parseFloat(p), m = g ? p.substr((c + "").length) || "" : ""), "" === m && (m = n[o] || f), p = c || 0 === c ? (v ? c + h : c) + m : t[o], f !== m && "" !== m && (c || 0 === c) && (h || 0 === h) && (h = J(e, o, h, f), "%" === m ? (h /= J(e, o, 100, "%") / 100, h > 100 && (h = 100), t.strictUnits !== !0 && (d = h + "%")) : "em" === m ? h /= J(e, o, 1, "em") : (c = J(e, o, c, m), m = "px"), v && (c || 0 === c) && (p = c + h + m)), v && (c += h), !h && 0 !== h || !c && 0 !== c ? p || p + "" != "NaN" && null != p ? (i = new ht(y, o, c || h || 0, 0, i, -1, "css_" + o, !1, 0, d, p), i.xs0 = "display" === o && "none" === p ? d : p) : B("invalid " + o + " tween value: " + t[o]) : (i = new ht(y, o, h, c - h, i, 0, "css_" + o, u !== !1 && ("px" === m || "zIndex" === o), 0, d, p), i.xs0 = m)) : i = ct(y, o, d, p, !0, null, i, 0, r)), r && i && !i.plugin && (i.plugin = r);
            return i
        }, l.setRatio = function (e) {
            var t, i, n, s = this._firstPT,
                r = 1e-6;
            if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (; s;) {
                if (t = s.c * e + s.s, s.r ? t = t > 0 ? t + .5 >> 0 : t - .5 >> 0 : r > t && t > -r && (t = 0), s.type) if (1 === s.type) if (n = s.l, 2 === n) s.t[s.p] = s.xs0 + t + s.xs1 + s.xn1 + s.xs2;
                else if (3 === n) s.t[s.p] = s.xs0 + t + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3;
                else if (4 === n) s.t[s.p] = s.xs0 + t + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4;
                else if (5 === n) s.t[s.p] = s.xs0 + t + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4 + s.xn4 + s.xs5;
                else {
                    for (i = s.xs0 + t + s.xs1, n = 1; n < s.l; n++) i += s["xn" + n] + s["xs" + (n + 1)];
                    s.t[s.p] = i
                } else - 1 === s.type ? s.t[s.p] = s.xs0 : s.setRatio && s.setRatio(e);
                else s.t[s.p] = t + s.xs0;
                s = s._next
            } else for (; s;) 2 !== s.type ? s.t[s.p] = s.b : s.setRatio(e), s = s._next;
            else for (; s;) 2 !== s.type ? s.t[s.p] = s.e : s.setRatio(e), s = s._next
        }, l._enableTransforms = function (e) {
            this._transformType = e || 3 === this._transformType ? 3 : 2
        }, l._linkCSSP = function (e, t, i, n) {
            return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), i ? i._next = e : !n && null === this._firstPT && (this._firstPT = e), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next), e._next = t, e._prev = i), e
        }, l._kill = function (t) {
            var i, n, s, r = t,
                o = !1;
            if (t.css_autoAlpha || t.css_alpha) {
                r = {};
                for (n in t) r[n] = t[n];
                r.css_opacity = 1, r.css_autoAlpha && (r.css_visibility = 1)
            }
            return t.css_className && (i = this._classNamePT) && (s = i.xfirst, s && s._prev ? this._linkCSSP(s._prev, i._next, s._prev._prev) : s === this._firstPT && (this._firstPT = null), i._next && this._linkCSSP(i._next, i._next._next, s._prev), this._target._gsOverwrittenClassNamePT = this._linkCSSP(i, this._target._gsOverwrittenClassNamePT), this._classNamePT = null, o = !0), e.prototype._kill.call(this, r) || o
        };
        var St = function (e, t, i) {
                var n, s, r, o;
                if (e.slice) for (s = e.length; --s > -1;) St(e[s], t, i);
                else for (n = e.childNodes, s = n.length; --s > -1;) r = n[s], o = r.type, r.style && (t.push(X(r)), i && i.push(r)), (1 === o || 9 === o || 11 === o) && r.childNodes.length && St(r, t, i)
            };
        return o.cascadeTo = function (e, i, n) {
            var s, r, o, a = t.to(e, i, n),
                l = [a],
                u = [],
                h = [],
                c = [],
                d = t._internals.reservedProps;
            for (e = a._targets || a.target, St(e, u, c), a.render(i, !0), St(e, h), a.render(0, !0), a._enabled(!0), s = c.length; --s > -1;) if (r = Y(c[s], u[s], h[s]), r.firstMPT) {
                r = r.difs;
                for (o in n) d[o] && (r[o] = n[o]);
                l.push(t.to(c[s], i, r))
            }
            return l
        }, e.activate([o]), o
    }, !0)
}), window._gsDefine && window._gsQueue.pop()(), define("libs/gsap/plugins/CSSPlugin", function () {}), (window._gsQueue || (window._gsQueue = [])).push(function () {
    window._gsDefine("easing.Back", ["easing.Ease"], function (e) {
        var t, i, n = window.GreenSockGlobals || window,
            s = n.com.greensock,
            r = 2 * Math.PI,
            o = Math.PI / 2,
            a = s._class,
            l = function (t, i) {
                var n = a("easing." + t, function () {}, !0),
                    s = n.prototype = new e;
                return s.constructor = n, s.getRatio = i, n
            },
            u = e.register ||
        function () {}, h = function (e, t, i, n) {
            var s = a("easing." + e, {
                easeOut: new t,
                easeIn: new i,
                easeInOut: new n
            }, !0);
            return u(s, e), s
        }, c = function (t, i) {
            var n = a("easing." + t, function (e) {
                this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
            }, !0),
                s = n.prototype = new e;
            return s.constructor = n, s.getRatio = i, s.config = function (e) {
                return new n(e)
            }, n
        }, d = h("Back", c("BackOut", function (e) {
            return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
        }), c("BackIn", function (e) {
            return e * e * ((this._p1 + 1) * e - this._p1)
        }), c("BackInOut", function (e) {
            return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
        })), p = a("easing.SlowMo", function (e, t, i) {
            t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
        }, !0), f = p.prototype = new e;
        return f.constructor = p, f.getRatio = function (e) {
            var t = e + (.5 - e) * this._p;
            return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
        }, p.ease = new p(.7, .7), f.config = p.config = function (e, t, i) {
            return new p(e, t, i)
        }, t = a("easing.SteppedEase", function (e) {
            e = e || 1, this._p1 = 1 / e, this._p2 = e + 1
        }, !0), f = t.prototype = new e, f.constructor = t, f.getRatio = function (e) {
            return 0 > e ? e = 0 : e >= 1 && (e = .999999999), (this._p2 * e >> 0) * this._p1
        }, f.config = t.config = function (e) {
            return new t(e)
        }, h("Bounce", l("BounceOut", function (e) {
            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }), l("BounceIn", function (e) {
            return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }), l("BounceInOut", function (e) {
            var t = .5 > e;
            return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
        })), h("Circ", l("CircOut", function (e) {
            return Math.sqrt(1 - (e -= 1) * e)
        }), l("CircIn", function (e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }), l("CircInOut", function (e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        })), i = function (t, i, n) {
            var s = a("easing." + t, function (e, t) {
                this._p1 = e || 1, this._p2 = t || n, this._p3 = this._p2 / r * (Math.asin(1 / this._p1) || 0)
            }, !0),
                o = s.prototype = new e;
            return o.constructor = s, o.getRatio = i, o.config = function (e, t) {
                return new s(e, t)
            }, s
        }, h("Elastic", i("ElasticOut", function (e) {
            return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * r / this._p2) + 1
        }, .3), i("ElasticIn", function (e) {
            return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2))
        }, .3), i("ElasticInOut", function (e) {
            return (e *= 2) < 1 ? -.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2) : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2) * .5 + 1
        }, .45)), h("Expo", l("ExpoOut", function (e) {
            return 1 - Math.pow(2, -10 * e)
        }), l("ExpoIn", function (e) {
            return Math.pow(2, 10 * (e - 1)) - .001
        }), l("ExpoInOut", function (e) {
            return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        })), h("Sine", l("SineOut", function (e) {
            return Math.sin(e * o)
        }), l("SineIn", function (e) {
            return -Math.cos(e * o) + 1
        }), l("SineInOut", function (e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        })), a("easing.EaseLookup", {
            find: function (t) {
                return e.map[t]
            }
        }, !0), u(n.SlowMo, "SlowMo", "ease,"), u(t, "SteppedEase", "ease,"), d
    }, !0)
}), window._gsDefine && window._gsQueue.pop()(), define("libs/gsap/easing/EasePack", function () {}), define("suds/oop/Class", [], function () {
    var e = !1,
        t = /xyz/.test(function () {}) ? /\b_super\b/ : /.*/,
        i = function () {};
    return i.extend = function (i) {
        function n() {
            !e && this.initialize && this.initialize.apply(this, arguments)
        }
        var s = this.prototype;
        e = !0;
        var r = new this;
        e = !1;
        for (var o in i) r[o] = "function" == typeof i[o] && "function" == typeof s[o] && t.test(i[o]) ?
        function (e, t) {
            return function () {
                var i = this._super;
                this._super = s[e];
                var n = t.apply(this, arguments);
                return this._super = i, n
            }
        }(o, i[o]) : i[o];
        return n.prototype = r, n.prototype.constructor = n, n.extend = arguments.callee, n
    }, i
}), define("suds/events/Dispatcher", ["suds/oop/Class"], function (e) {
    var t = e.extend({
        listeners: null,
        initialize: function () {
            this.listeners = []
        },
        addListener: function (e, t) {
            this.removeListener(e, t), this.listeners.push({
                name: e,
                closure: t
            })
        },
        removeListener: function (e, t) {
            for (var i, n = 0, s = this.listeners.length; s > n; n++) i = this.listeners[n], i.name === e && i.closure === t && (this.listeners.splice(n, 1), n--, s--)
        },
        dispatch: function (e, t) {
            for (var i, n = 0, s = this.listeners.length; s > n; n++) i = this.listeners[n], i && i.name === e && i.closure.call(null, t)
        },
        hasListenerFor: function (e) {
            for (var t = 0, i = this.listeners.length; i > t; t++) if (this.listeners[t].name === e) return !0;
            return !1
        },
        hasListeners: function () {
            return this.listeners.length > 0
        },
        removeAllListeners: function () {
            this.listeners = []
        },
        removeListenerFor: function (e) {
            for (var t, i = 0, n = this.listeners.length; n > i; i++) t = this.listeners[i], t.name === e && (this.listeners.splice(i, 1), i--, n--)
        }
    });
    return t
}), define("mout/function/bind", [], function () {
    function e(e, t) {
        return Array.prototype.slice.call(e, t || 0)
    }
    function t(t, i) {
        var n = e(arguments, 2);
        return function () {
            return t.apply(i, n.concat(e(arguments)))
        }
    }
    return t
}), define("suds/events/Interval", ["suds/events/Dispatcher", "mout/function/bind"], function (e, t) {
    var i = "Interval.FRAME",
        n = "Interval.ONCE",
        s = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (e) {
                window.setTimeout(e, 1e3 / 60)
            }
        }(),
        r = e.extend({
            initialize: function () {
                this._super(), this.loop()
            },
            loop: function () {
                var e, r, o = [],
                    a = this.listeners.length;
                for (r = 0; a > r; r++) e = this.listeners[r], e.name === n && o.push(e.closure);
                for (this.dispatch(i), this.removeListenerFor(n), a = o.length, r = 0; a > r; r++) o[r]();
                s(t(this.loop, this))
            }
        }),
        o = new r;
    return o.FRAME = i, o.ONCE = n, o
}), define("tween", [], function () {
    var e = e ||
    function () {
        var e = [];
        return {
            REVISION: "7",
            getAll: function () {
                return e
            },
            removeAll: function () {
                e = []
            },
            add: function (t) {
                e.push(t)
            },
            remove: function (t) {
                var i = e.indexOf(t); - 1 !== i && e.splice(i, 1)
            },
            update: function (t) {
                if (0 === e.length) return !1;
                var i = 0,
                    n = e.length;
                for (t = void 0 !== t ? t : Date.now(); n > i;) e[i].update(t) ? i++ : (e.splice(i, 1), n--);
                return !0
            }
        }
    }();
    return e.Tween = function (t) {
        var i = t,
            n = {},
            s = {},
            r = 1e3,
            o = 0,
            a = null,
            l = e.Easing.Linear.None,
            u = e.Interpolation.Linear,
            h = [],
            c = null,
            d = !1,
            p = null,
            f = null;
        this.to = function (e, t) {
            return null !== t && (r = t), s = e, this
        }, this.start = function (t) {
            e.add(this), d = !1, a = void 0 !== t ? t : Date.now(), a += o;
            for (var r in s) if (null !== i[r]) {
                if (s[r] instanceof Array) {
                    if (0 === s[r].length) continue;
                    s[r] = [i[r]].concat(s[r])
                }
                n[r] = i[r]
            }
            return this
        }, this.stop = function () {
            return e.remove(this), this
        }, this.delay = function (e) {
            return o = e, this
        }, this.easing = function (e) {
            return l = e, this
        }, this.interpolation = function (e) {
            return u = e, this
        }, this.chain = function () {
            return h = arguments, this
        }, this.onStart = function (e) {
            return c = e, this
        }, this.onUpdate = function (e) {
            return p = e, this
        }, this.onComplete = function (e) {
            return f = e, this
        }, this.update = function (e) {
            if (a > e) return !0;
            d === !1 && (null !== c && c.call(i), d = !0);
            var t = (e - a) / r;
            t = t > 1 ? 1 : t;
            var o = l(t);
            for (var m in n) {
                var g = n[m],
                    v = s[m];
                i[m] = v instanceof Array ? u(v, o) : g + (v - g) * o
            }
            if (null !== p && p.call(i, o), 1 == t) {
                null !== f && f.call(i);
                for (var y = 0, w = h.length; w > y; y++) h[y].start(e);
                return !1
            }
            return !0
        }
    }, e.Easing = {
        Linear: {
            None: function (e) {
                return e
            }
        },
        Quadratic: {
            In: function (e) {
                return e * e
            },
            Out: function (e) {
                return e * (2 - e)
            },
            InOut: function (e) {
                return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
            }
        },
        Cubic: {
            In: function (e) {
                return e * e * e
            },
            Out: function (e) {
                return --e * e * e + 1
            },
            InOut: function (e) {
                return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
            }
        },
        Quartic: {
            In: function (e) {
                return e * e * e * e
            },
            Out: function (e) {
                return 1 - --e * e * e * e
            },
            InOut: function (e) {
                return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
            }
        },
        Quintic: {
            In: function (e) {
                return e * e * e * e * e
            },
            Out: function (e) {
                return --e * e * e * e * e + 1
            },
            InOut: function (e) {
                return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
            }
        },
        Sinusoidal: {
            In: function (e) {
                return 1 - Math.cos(e * Math.PI / 2)
            },
            Out: function (e) {
                return Math.sin(e * Math.PI / 2)
            },
            InOut: function (e) {
                return .5 * (1 - Math.cos(Math.PI * e))
            }
        },
        Exponential: {
            In: function (e) {
                return 0 === e ? 0 : Math.pow(1024, e - 1)
            },
            Out: function (e) {
                return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
            },
            InOut: function (e) {
                return 0 === e ? 0 : 1 === e ? 1 : (e *= 2) < 1 ? .5 * Math.pow(1024, e - 1) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)
            }
        },
        Circular: {
            In: function (e) {
                return 1 - Math.sqrt(1 - e * e)
            },
            Out: function (e) {
                return Math.sqrt(1 - --e * e)
            },
            InOut: function (e) {
                return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
            }
        },
        Elastic: {
            In: function (e) {
                var t, i = .1,
                    n = .4;
                return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1, t = n / 4) : t = n * Math.asin(1 / i) / (2 * Math.PI), -(i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n)))
            },
            Out: function (e) {
                var t, i = .1,
                    n = .4;
                return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1, t = n / 4) : t = n * Math.asin(1 / i) / (2 * Math.PI), i * Math.pow(2, -10 * e) * Math.sin(2 * (e - t) * Math.PI / n) + 1)
            },
            InOut: function (e) {
                var t, i = .1,
                    n = .4;
                return 0 === e ? 0 : 1 === e ? 1 : (!i || 1 > i ? (i = 1, t = n / 4) : t = n * Math.asin(1 / i) / (2 * Math.PI), (e *= 2) < 1 ? -.5 * i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n) : i * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n) * .5 + 1)
            }
        },
        Back: {
            In: function (e) {
                var t = 1.70158;
                return e * e * ((t + 1) * e - t)
            },
            Out: function (e) {
                var t = 1.70158;
                return --e * e * ((t + 1) * e + t) + 1
            },
            InOut: function (e) {
                var t = 2.5949095;
                return (e *= 2) < 1 ? .5 * e * e * ((t + 1) * e - t) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
            }
        },
        Bounce: {
            In: function (t) {
                return 1 - e.Easing.Bounce.Out(1 - t)
            },
            Out: function (e) {
                return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
            },
            InOut: function (t) {
                return .5 > t ? .5 * e.Easing.Bounce.In(2 * t) : .5 * e.Easing.Bounce.Out(2 * t - 1) + .5
            }
        }
    }, e.Interpolation = {
        Linear: function (t, i) {
            var n = t.length - 1,
                s = n * i,
                r = Math.floor(s),
                o = e.Interpolation.Utils.Linear;
            return 0 > i ? o(t[0], t[1], s) : i > 1 ? o(t[n], t[n - 1], n - s) : o(t[r], t[r + 1 > n ? n : r + 1], s - r)
        },
        Bezier: function (t, i) {
            var n, s = 0,
                r = t.length - 1,
                o = Math.pow,
                a = e.Interpolation.Utils.Bernstein;
            for (n = 0; r >= n; n++) s += o(1 - i, r - n) * o(i, n) * t[n] * a(r, n);
            return s
        },
        CatmullRom: function (t, i) {
            var n = t.length - 1,
                s = n * i,
                r = Math.floor(s),
                o = e.Interpolation.Utils.CatmullRom;
            return t[0] === t[n] ? (0 > i && (r = Math.floor(s = n * (1 + i))), o(t[(r - 1 + n) % n], t[r], t[(r + 1) % n], t[(r + 2) % n], s - r)) : 0 > i ? t[0] - (o(t[0], t[0], t[1], t[1], -s) - t[0]) : i > 1 ? t[n] - (o(t[n], t[n], t[n - 1], t[n - 1], s - n) - t[n]) : o(t[r ? r - 1 : 0], t[r], t[r + 1 > n ? n : r + 1], t[r + 2 > n ? n : r + 2], s - r)
        },
        Utils: {
            Linear: function (e, t, i) {
                return (t - e) * i + e
            },
            Bernstein: function (t, i) {
                var n = e.Interpolation.Utils.Factorial;
                return n(t) / n(i) / n(t - i)
            },
            Factorial: function () {
                var e = [1];
                return function (t) {
                    var i, n = 1;
                    if (e[t]) return e[t];
                    for (i = t; i > 1; i--) n *= i;
                    return e[t] = n
                }
            }(),
            CatmullRom: function (e, t, i, n, s) {
                var r = .5 * (i - e),
                    o = .5 * (n - t),
                    a = s * s,
                    l = s * a;
                return (2 * t - 2 * i + r + o) * l + (-3 * t + 3 * i - 2 * r - o) * a + r * s + t
            }
        }
    }, e
}), define("suds/helpers/BrowserHelper", [], function () {
    function e() {
        t.width = window.innerWidth, t.height = window.innerHeight
    }
    var t = {};
    return window.addEventListener ? window.addEventListener("resize", e, !1) : window.attachEvent("onresize", e), t.width = window.innerWidth, t.height = window.innerHeight, t.webgl = function () {
        try {
            return !!window.WebGLRenderingContext && !! document.createElement("canvas").getContext("experimental-webgl")
        } catch (e) {
            return !1
        }
    }(), t.canvas = function () {
        var e = document.createElement("canvas");
        return !!e.getContext && !! e.getContext("2d")
    }(), t.pushstate = function () {
        return window.history && window.history.pushState
    }(), t.csstransitions = function () {
        var e = document.createElement("p").style,
            t = ["ms", "O", "Moz", "Webkit"];
        if ("" == e.transition) return !0;
        for (; t.length;) if (t.pop() + "Transition" in e) return !0;
        return !1
    }(), t.csstransforms3d = function () {
        return "WebkitPerspective" in document.body.style || "MozPerspective" in document.body.style || "msPerspective" in document.body.style || "OPerspective" in document.body.style || "perspective" in document.body.style
    }(), t.translate3d = function () {
        var e, t = document.createElement("p"),
            i = {
                webkitTransform: "-webkit-transform",
                OTransform: "-o-transform",
                msTransform: "-ms-transform",
                MozTransform: "-moz-transform",
                transform: "transform"
            };
        document.body.insertBefore(t, null);
        for (var n in i) void 0 !== t.style[n] && (t.style[n] = "translate3d(1px,1px,1px)", e = window.getComputedStyle(t).getPropertyValue(i[n]));
        return document.body.removeChild(t), void 0 !== e && e.length > 0 && "none" !== e
    }(), t.touchEvents = function () {
        return "ontouchstart" in window
    }(), t.firefox = function () {
        return -1 != navigator.userAgent.indexOf("Firefox") ? !0 : !1
    }(), t.ie = function () {
        for (var e = 3, t = document.createElement("b"), i = t.all || []; t.innerHTML = "<!--[if gt IE " + ++e + "]><i><![endif]-->", i[0];);
        return void 0 !== (e > 4 ? e : document.documentMode)
    }(), t.ie9 = function () {
        for (var e = 3, t = document.createElement("b"), i = t.all || []; t.innerHTML = "<!--[if gt IE " + ++e + "]><i><![endif]-->", i[0];);
        return 9 === (e > 4 ? e : document.documentMode)
    }(), t.ie10 = function () {
        for (var e = 3, t = document.createElement("b"), i = t.all || []; t.innerHTML = "<!--[if gt IE " + ++e + "]><i><![endif]-->", i[0];);
        return 10 === (e > 4 ? e : document.documentMode)
    }(), t
}), define("infinity/controllers/NavigationController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind"], function (e, t, i) {
    var n = e.extend({
        element: null,
        menuButton: null,
        active: !1,
        overlay: null,
        resizeTimeout: null,
        startY: 0,
        targetY: 0,
        chromeNav: null,
        mobileBreakPoint: null,
        MENU_WIDTH: 260,
        initialize: function () {
            this._super(), this.initViews(), this.initStyles(), this.initEvents(), this.onResize()
        },
        initViews: function () {
            this.element = $("#navigation"), this.menuButton = $("#menu-button"), overlay = $(".container .overlay"), this.chromeNav = $("body.en-us").length > 0, this.mobileBreakPoint = 768
        },
        initStyles: function () {
            $("#container").addClass("animated animate-out"), $("#navigation").addClass("animated animate-out")
        },
        initEvents: function () {
            this.menuButton.click(i(this.onMenuClick, this)), $(window).scroll(i(this.onScroll, this)), $(window).resize(i(this.onResize, this)), window.onorientationchange = i(this.onRotate, this), this.element.find(".menu").swipe({
                swipeStatus: i(this.onSwipe, this),
                preventDefaultEvents: !0
            })
        },
        onRotate: function () {
            this.active && this.toggleMenu()
        },
        onSwipe: function (e, i, n, s) {
            "start" == i ? (this.startY = this.element.find(".menu").position().top, this.startX = this.element.find(".menu").position().left, $("#navigation").removeClass("animate-out")) : "move" == i ? ("up" == n ? this.targetY = this.startY - s : "down" == n && (this.targetY = this.startY + s), this.targetY = Math.max(this.targetY, t.height - this.element.find(".menu").height()), this.targetY = Math.min(0, this.targetY)) : "end" == i && (this.startY = this.element.find(".menu").position().top, $("#navigation").addClass("animate-out"))
        },
        toggleMenu: function () {
            if (this.active) this.element.find(".menu").removeClass("active"), this.menuButton.css({
                left: 20
            }), $("#container").css({
                left: 0
            }), $("#navigation").css({
                left: 0
            }), $("body").css({
                overflow: "auto"
            }), overlay.hide(), this.active = !1, this.targetY = Math.min(0, this.targetY), this.element.find(".menu").css({
                top: this.targetY
            }), document.ontouchmove = null;
            else {
                $("ul.drop a").show(), this.element.find(".menu").addClass("active"), this.menuButton.css({
                    left: this.MENU_WIDTH + 20
                }), overlay.click(i(this.onMenuClick, this)), $("#container").css({
                    left: this.MENU_WIDTH
                }), $("#navigation").css({
                    left: 261
                }), overlay.show(), $("body").css({
                    overflow: "hidden"
                }), this.active = !0, $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                document.ontouchmove = function () {}
            }
        },
        onMenuClick: function () {
            this.toggleMenu()
        },
        onScroll: function () {},
        onResize: function () {
            $(window).innerWidth() <= this.mobileBreakPoint ? (this.element.addClass("mobile"), this.menuButton.show(), $("body").addClass("mobile-body")) : (this.menuButton.hide(), this.element.find(".menu").removeClass("active"), this.menuButton.css({
                left: 20
            }), this.element.removeClass("mobile"), $("#container").css({
                left: 0
            }), $("#navigation").css({
                left: 0
            }), $("body").css({
                overflow: "auto"
            }), overlay.hide()), this.resizeTimeout && clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(i(this.onResizeDelay, this), 1e3)
        },
        onResizeDelay: function () {
            $(window).innerWidth() <= this.mobileBreakPoint && ($("#navigation").addClass("animate-out"), this.menuButton.addClass("animate-out"))
        }
    });
    return n
}), define("suds/views/View", ["suds/events/Dispatcher", "mout/function/bind"], function (e, t) {
    var i = e.extend({
        parent: null,
        element: null,
        children: null,
        animateInDelay: 0,
        animateOutDelay: 0,
        initialize: function (e) {
            this._super(), this.element = e || $("<div>"), this.children = []
        },
        parse: function (e, t) {
            return e.replace(/{{(\w*)}}/g, function (e, i) {
                return i in t ? t[i] : ""
            })
        },
        appendView: function (e, t) {
            if (e.parent) throw new Error("View can only be child of one View");
            t = "undefined" == typeof t ? !1 : !! t, e.parent = this, t ? (this.children.unshift(e), this.element.prepend(e.element)) : (this.children.push(e), this.element.append(e.element)), e.dispatch(i.ADDED)
        },
        prependView: function (e) {
            this.appendView(e, !0)
        },
        removeView: function (e) {
            var t = this.children.indexOf(e);
            t > -1 && (this.children.splice(t, 1), e.parent = null), e.element.remove(), this.dispatch(i.REMOVED)
        },
        contains: function (e) {
            return this.children.indexOf(e) > -1
        },
        dispatch: function (e, t) {
            this._super(e, t), t && t.bubbles === !0 && this.parent && this.parent.dispatch(e, t)
        },
        animateIn: function () {
            this.animateInDelay > 0 ? setTimeout(t(this.executeAnimateIn, this), this.animateInDelay) : this.executeAnimateIn()
        },
        executeAnimateIn: function () {
            var e, t, i = this.children.length;
            for (e = 0; i > e; e++) t = this.children[e], t.animateIn.call(t)
        },
        animateOut: function () {
            this.animateOutDelay > 0 ? setTimeout(t(this.executeAnimateOut, this), this.animateOutDelay) : this.executeAnimateOut()
        },
        executeAnimateOut: function () {
            var e, t, i = this.children.length;
            for (e = 0; i > e; e++) t = this.children[e], t.animateOut.call(t)
        }
    });
    return i.ADDED = "View.ADDED", i.REMOVED = "View.REMOVED", i
}), define("infinity/views/characters/CharacterTileView", ["suds/views/View", "mout/function/bind"], function (e, t) {
    var i = e.extend({
        sparkle: null,
        initialize: function (e) {
            this._super(e), this.initStyles(), this.initEvents()
        },
        initStyles: function () {
            this.element.find("h3").css({
                opacity: .75
            })
        },
        initEvents: function () {
            this.element.hover(t(this.onHover, this))
        },
        onHover: function (e) {
            switch (e.type) {
            case "mouseenter":
                this.over();
                break;
            case "mouseleave":
                this.out()
            }
        },
        over: function () {
            TweenLite.to(this.element.find(".image.bounce"), 1, {
                css: {
                    top: -15
                },
                ease: Elastic.easeOut
            }), this.element.find("h3").css({
                opacity: 1
            })
        },
        out: function () {
            TweenLite.to(this.element.find(".image.bounce"), .8, {
                css: {
                    top: 0
                },
                ease: Bounce.easeOut
            }), this.element.find("h3").css({
                opacity: .75
            })
        }
    });
    return i
}), define("infinity/views/characters/CharactersView", ["suds/views/View", "infinity/views/characters/CharacterTileView"], function (e, t) {
    var i = e.extend({
        tiles: null,
        initialize: function (e) {
            this._super(e), this.tiles = [];
            var i = this;
            $(".playset-group .tile").each(function () {
                var e = new t($(this));
                i.tiles.push(e)
            })
        }
    });
    return i
});
var mejs = mejs || {};
mejs.version = "2.12.0", mejs.meIndex = 0, mejs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
    }],
    flash: [{
        version: [9, 0, 124],
        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube"]
    }],
    youtube: [{
        version: null,
        types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
    }],
    vimeo: [{
        version: null,
        types: ["video/vimeo", "video/x-vimeo"]
    }]
}, mejs.Utility = {
    encodeUrl: function (e) {
        return encodeURIComponent(e)
    },
    escapeHTML: function (e) {
        return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    },
    absolutizeUrl: function (e) {
        var t = document.createElement("div");
        return t.innerHTML = '<a href="' + this.escapeHTML(e) + '">x</a>', t.firstChild.href
    },
    getScriptPath: function (e) {
        for (var t, i, n, s = 0, r = "", o = "", a = document.getElementsByTagName("script"), l = a.length, u = e.length; l > s; s++) {
            for (i = a[s].src, t = i.lastIndexOf("/"), t > -1 ? (n = i.substring(t + 1), i = i.substring(0, t + 1)) : (n = i, i = ""), t = 0; u > t; t++) if (o = e[t], o = n.indexOf(o), o > -1) {
                r = i;
                break
            }
            if ("" !== r) break
        }
        return r
    },
    secondsToTimeCode: function (e, t, i, n) {
        "undefined" == typeof i ? i = !1 : "undefined" == typeof n && (n = 25);
        var s = Math.floor(e / 3600) % 24,
            r = Math.floor(e / 60) % 60,
            o = Math.floor(e % 60);
        return e = Math.floor((e % 1 * n).toFixed(3)), (t || s > 0 ? (10 > s ? "0" + s : s) + ":" : "") + (10 > r ? "0" + r : r) + ":" + (10 > o ? "0" + o : o) + (i ? ":" + (10 > e ? "0" + e : e) : "")
    },
    timeCodeToSeconds: function (e, t, i, n) {
        "undefined" == typeof i ? i = !1 : "undefined" == typeof n && (n = 25), e = e.split(":"), t = parseInt(e[0], 10);
        var s = parseInt(e[1], 10),
            r = parseInt(e[2], 10),
            o = 0,
            a = 0;
        return i && (o = parseInt(e[3]) / n), a = 3600 * t + 60 * s + r + o
    },
    convertSMPTEtoSeconds: function (e) {
        if ("string" != typeof e) return !1;
        e = e.replace(",", ".");
        var t = 0,
            i = -1 != e.indexOf(".") ? e.split(".")[1].length : 0,
            n = 1;
        e = e.split(":").reverse();
        for (var s = 0; s < e.length; s++) n = 1, s > 0 && (n = Math.pow(60, s)), t += Number(e[s]) * n;
        return Number(t.toFixed(i))
    },
    removeSwf: function (e) {
        var t = document.getElementById(e);
        t && /object|embed/i.test(t.nodeName) && (mejs.MediaFeatures.isIE ? (t.style.display = "none", function () {
            4 == t.readyState ? mejs.Utility.removeObjectInIE(e) : setTimeout(arguments.callee, 10)
        }()) : t.parentNode.removeChild(t))
    },
    removeObjectInIE: function (e) {
        if (e = document.getElementById(e)) {
            for (var t in e)"function" == typeof e[t] && (e[t] = null);
            e.parentNode.removeChild(e)
        }
    }
}, mejs.PluginDetector = {
    hasPluginVersion: function (e, t) {
        var i = this.plugins[e];
        return t[1] = t[1] || 0, t[2] = t[2] || 0, i[0] > t[0] || i[0] == t[0] && i[1] > t[1] || i[0] == t[0] && i[1] == t[1] && i[2] >= t[2] ? !0 : !1
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function (e, t, i, n, s) {
        this.plugins[e] = this.detectPlugin(t, i, n, s)
    },
    detectPlugin: function (e, t, i, n) {
        var s, r = [0, 0, 0];
        if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[e]) {
            if ((i = this.nav.plugins[e].description) && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[t] || this.nav.mimeTypes[t].enabledPlugin)) for (r = i.replace(e, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), e = 0; e < r.length; e++) r[e] = parseInt(r[e].match(/\d+/), 10)
        } else if ("undefined" != typeof window.ActiveXObject) try {
            (s = new ActiveXObject(i)) && (r = n(s))
        } catch (o) {}
        return r
    }
}, mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function (e) {
    var t = [];
    return (e = e.GetVariable("$version")) && (e = e.split(" ")[1].split(","), t = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]), t
}), mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function (e) {
    var t = [0, 0, 0, 0],
        i = function (e, t, i, n) {
            for (; e.isVersionSupported(t[0] + "." + t[1] + "." + t[2] + "." + t[3]);) t[i] += n;
            t[i] -= n
        };
    return i(e, t, 0, 1), i(e, t, 1, 1), i(e, t, 2, 1e4), i(e, t, 2, 1e3), i(e, t, 2, 100), i(e, t, 2, 10), i(e, t, 2, 1), i(e, t, 3, 1), t
}), mejs.MediaFeatures = {
    init: function () {
        var e, t = this,
            i = document,
            n = mejs.PluginDetector.nav,
            s = mejs.PluginDetector.ua.toLowerCase(),
            r = ["source", "track", "audio", "video"];
        t.isiPad = null !== s.match(/ipad/i), t.isiPhone = null !== s.match(/iphone/i), t.isiOS = t.isiPhone || t.isiPad, t.isAndroid = null !== s.match(/android/i), t.isBustedAndroid = null !== s.match(/android 2\.[12]/), t.isBustedNativeHTTPS = "https:" === location.protocol && (null !== s.match(/android [12]\./) || null !== s.match(/macintosh.* version.* safari/)), t.isIE = -1 != n.appName.toLowerCase().indexOf("microsoft"), t.isChrome = null !== s.match(/chrome/gi), t.isFirefox = null !== s.match(/firefox/gi), t.isWebkit = null !== s.match(/webkit/gi), t.isGecko = null !== s.match(/gecko/gi) && !t.isWebkit, t.isOpera = null !== s.match(/opera/gi), t.hasTouch = "ontouchstart" in window, t.svg = !! document.createElementNS && !! document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
        for (n = 0; n < r.length; n++) e = document.createElement(r[n]);
        t.supportsMediaTag = "undefined" != typeof e.canPlayType || t.isBustedAndroid;
        try {
            e.canPlayType("video/mp4")
        } catch (o) {
            t.supportsMediaTag = !1
        }
        t.hasSemiNativeFullScreen = "undefined" != typeof e.webkitEnterFullscreen, t.hasWebkitNativeFullScreen = "undefined" != typeof e.webkitRequestFullScreen, t.hasMozNativeFullScreen = "undefined" != typeof e.mozRequestFullScreen, t.hasTrueNativeFullScreen = t.hasWebkitNativeFullScreen || t.hasMozNativeFullScreen, t.nativeFullScreenEnabled = t.hasTrueNativeFullScreen, t.hasMozNativeFullScreen && (t.nativeFullScreenEnabled = e.mozFullScreenEnabled), this.isChrome && (t.hasSemiNativeFullScreen = !1), t.hasTrueNativeFullScreen && (t.fullScreenEventName = t.hasWebkitNativeFullScreen ? "webkitfullscreenchange" : "mozfullscreenchange", t.isFullScreen = function () {
            return e.mozRequestFullScreen ? i.mozFullScreen : e.webkitRequestFullScreen ? i.webkitIsFullScreen : void 0
        }, t.requestFullScreen = function (e) {
            t.hasWebkitNativeFullScreen ? e.webkitRequestFullScreen() : t.hasMozNativeFullScreen && e.mozRequestFullScreen()
        }, t.cancelFullScreen = function () {
            t.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : t.hasMozNativeFullScreen && document.mozCancelFullScreen()
        }), t.hasSemiNativeFullScreen && s.match(/mac os x 10_5/i) && (t.hasNativeFullScreen = !1, t.hasSemiNativeFullScreen = !1)
    }
}, mejs.MediaFeatures.init(), mejs.HtmlMediaElement = {
    pluginType: "native",
    isFullScreen: !1,
    setCurrentTime: function (e) {
        this.currentTime = e
    },
    setMuted: function (e) {
        this.muted = e
    },
    setVolume: function (e) {
        this.volume = e
    },
    stop: function () {
        this.pause()
    },
    setSrc: function (e) {
        for (var t = this.getElementsByTagName("source"); t.length > 0;) this.removeChild(t[0]);
        if ("string" == typeof e) this.src = e;
        else {
            var i;
            for (t = 0; t < e.length; t++) if (i = e[t], this.canPlayType(i.type)) {
                this.src = i.src;
                break
            }
        }
    },
    setVideoSize: function (e, t) {
        this.width = e, this.height = t
    }
}, mejs.PluginMediaElement = function (e, t, i) {
    this.id = e, this.pluginType = t, this.src = i, this.events = {}, this.attributes = {}
}, mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: "",
    isFullScreen: !1,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: !0,
    ended: !1,
    seeking: !1,
    duration: 0,
    error: null,
    tagName: "",
    muted: !1,
    volume: 1,
    currentTime: 0,
    play: function () {
        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
    },
    load: function () {
        null != this.pluginApi && ("youtube" != this.pluginType && this.pluginApi.loadMedia(), this.paused = !1)
    },
    pause: function () {
        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
    },
    stop: function () {
        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
    },
    canPlayType: function (e) {
        var t, i, n, s = mejs.plugins[this.pluginType];
        for (t = 0; t < s.length; t++) if (n = s[t], mejs.PluginDetector.hasPluginVersion(this.pluginType, n.version)) for (i = 0; i < n.types.length; i++) if (e == n.types[i]) return "probably";
        return ""
    },
    positionFullscreenButton: function (e, t, i) {
        null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(e), Math.floor(t), i)
    },
    hideFullscreenButton: function () {
        null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
    },
    setSrc: function (e) {
        if ("string" == typeof e) this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(e)), this.src = mejs.Utility.absolutizeUrl(e);
        else {
            var t, i;
            for (t = 0; t < e.length; t++) if (i = e[t], this.canPlayType(i.type)) {
                this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(i.src)), this.src = mejs.Utility.absolutizeUrl(e);
                break
            }
        }
    },
    setCurrentTime: function (e) {
        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.seekTo(e) : this.pluginApi.setCurrentTime(e), this.currentTime = e)
    },
    setVolume: function (e) {
        null != this.pluginApi && (this.pluginApi.setVolume("youtube" == this.pluginType ? 100 * e : e), this.volume = e)
    },
    setMuted: function (e) {
        null != this.pluginApi && ("youtube" == this.pluginType ? (e ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = e, this.dispatchEvent("volumechange")) : this.pluginApi.setMuted(e), this.muted = e)
    },
    setVideoSize: function (e, t) {
        this.pluginElement.style && (this.pluginElement.style.width = e + "px", this.pluginElement.style.height = t + "px"), null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(e, t)
    },
    setFullscreen: function (e) {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(e)
    },
    enterFullScreen: function () {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
    },
    exitFullScreen: function () {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
    },
    addEventListener: function (e, t) {
        this.events[e] = this.events[e] || [], this.events[e].push(t)
    },
    removeEventListener: function (e, t) {
        if (!e) return this.events = {}, !0;
        var n = this.events[e];
        if (!n) return !0;
        if (!t) return this.events[e] = [], !0;
        for (i = 0; i < n.length; i++) if (n[i] === t) return this.events[e].splice(i, 1), !0;
        return !1
    },
    dispatchEvent: function (e) {
        var t, i, n = this.events[e];
        if (n) for (i = Array.prototype.slice.call(arguments, 1), t = 0; t < n.length; t++) n[t].apply(null, i)
    },
    hasAttribute: function (e) {
        return e in this.attributes
    },
    removeAttribute: function (e) {
        delete this.attributes[e]
    },
    getAttribute: function (e) {
        return this.hasAttribute(e) ? this.attributes[e] : ""
    },
    setAttribute: function (e, t) {
        this.attributes[e] = t
    },
    remove: function () {
        mejs.Utility.removeSwf(this.pluginElement.id), mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
    }
}, mejs.MediaPluginBridge = {
    pluginMediaElements: {},
    htmlMediaElements: {},
    registerPluginElement: function (e, t, i) {
        this.pluginMediaElements[e] = t, this.htmlMediaElements[e] = i
    },
    unregisterPluginElement: function (e) {
        delete this.pluginMediaElements[e], delete this.htmlMediaElements[e]
    },
    initPlugin: function (e) {
        var t = this.pluginMediaElements[e],
            i = this.htmlMediaElements[e];
        if (t) {
            switch (t.pluginType) {
            case "flash":
                t.pluginElement = t.pluginApi = document.getElementById(e);
                break;
            case "silverlight":
                t.pluginElement = document.getElementById(t.id), t.pluginApi = t.pluginElement.Content.MediaElementJS
            }
            null != t.pluginApi && t.success && t.success(t, i)
        }
    },
    fireEvent: function (e, t, i) {
        var n, s;
        e = this.pluginMediaElements[e], t = {
            type: t,
            target: e
        };
        for (n in i) e[n] = i[n], t[n] = i[n];
        s = i.bufferedTime || 0, t.target.buffered = t.buffered = {
            start: function () {
                return 0
            },
            end: function () {
                return s
            },
            length: 1
        }, e.dispatchEvent(t.type, t)
    }
}, mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: !1,
    type: "",
    pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    enablePluginSmoothing: !1,
    enablePseudoStreaming: !1,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: .8,
    success: function () {},
    error: function () {}
}, mejs.MediaElement = function (e, t) {
    return mejs.HtmlMediaElementShim.create(e, t)
}, mejs.HtmlMediaElementShim = {
    create: function (e, t) {
        var i = mejs.MediaElementDefaults,
            n = "string" == typeof e ? document.getElementById(e) : e,
            s = n.tagName.toLowerCase(),
            r = "audio" === s || "video" === s,
            o = n.getAttribute(r ? "src" : "href");
        s = n.getAttribute("poster");
        var a, l = n.getAttribute("autoplay"),
            u = n.getAttribute("preload"),
            h = n.getAttribute("controls");
        for (a in t) i[a] = t[a];
        return o = "undefined" == typeof o || null === o || "" == o ? null : o, s = "undefined" == typeof s || null === s ? "" : s, u = "undefined" == typeof u || null === u || "false" === u ? "none" : u, l = "undefined" != typeof l && null !== l && "false" !== l, h = "undefined" != typeof h && null !== h && "false" !== h, a = this.determinePlayback(n, i, mejs.MediaFeatures.supportsMediaTag, r, o), a.url = null !== a.url ? mejs.Utility.absolutizeUrl(a.url) : "", "native" == a.method ? (mejs.MediaFeatures.isBustedAndroid && (n.src = a.url, n.addEventListener("click", function () {
            n.play()
        }, !1)), this.updateNative(a, i, l, u)) : "" !== a.method ? this.createPlugin(a, i, s, l, u, h) : (this.createErrorMessage(a, i, s), this)
    },
    determinePlayback: function (e, t, i, n, s) {
        var r, o, a, l, u = [],
            h = {
                method: "",
                url: "",
                htmlMediaElement: e,
                isVideo: "audio" != e.tagName.toLowerCase()
            };
        if ("undefined" != typeof t.type && "" !== t.type) if ("string" == typeof t.type) u.push({
            type: t.type,
            url: s
        });
        else for (r = 0; r < t.type.length; r++) u.push({
            type: t.type[r],
            url: s
        });
        else if (null !== s) a = this.formatType(s, e.getAttribute("type")), u.push({
            type: a,
            url: s
        });
        else for (r = 0; r < e.childNodes.length; r++) o = e.childNodes[r], 1 == o.nodeType && "source" == o.tagName.toLowerCase() && (s = o.getAttribute("src"), a = this.formatType(s, o.getAttribute("type")), o = o.getAttribute("media"), (!o || !window.matchMedia || window.matchMedia && window.matchMedia(o).matches) && u.push({
            type: a,
            url: s
        }));
        if (!n && u.length > 0 && null !== u[0].url && this.getTypeFromFile(u[0].url).indexOf("audio") > -1 && (h.isVideo = !1), mejs.MediaFeatures.isBustedAndroid && (e.canPlayType = function (e) {
            return null !== e.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
        }), i && ("auto" === t.mode || "auto_plugin" === t.mode || "native" === t.mode) && !mejs.MediaFeatures.isBustedNativeHTTPS) {
            for (n || (r = document.createElement(h.isVideo ? "video" : "audio"), e.parentNode.insertBefore(r, e), e.style.display = "none", h.htmlMediaElement = e = r), r = 0; r < u.length; r++) if ("" !== e.canPlayType(u[r].type).replace(/no/, "") || "" !== e.canPlayType(u[r].type.replace(/mp3/, "mpeg")).replace(/no/, "")) {
                h.method = "native", h.url = u[r].url;
                break
            }
            if ("native" === h.method && (null !== h.url && (e.src = h.url), "auto_plugin" !== t.mode)) return h
        }
        if ("auto" === t.mode || "auto_plugin" === t.mode || "shim" === t.mode) for (r = 0; r < u.length; r++) for (a = u[r].type, e = 0; e < t.plugins.length; e++) for (s = t.plugins[e], o = mejs.plugins[s], i = 0; i < o.length; i++) if (l = o[i], null == l.version || mejs.PluginDetector.hasPluginVersion(s, l.version)) for (n = 0; n < l.types.length; n++) if (a == l.types[n]) return h.method = s, h.url = u[r].url, h;
        return "auto_plugin" === t.mode && "native" === h.method ? h : ("" === h.method && u.length > 0 && (h.url = u[0].url), h)
    },
    formatType: function (e, t) {
        return e && !t ? this.getTypeFromFile(e) : t && ~t.indexOf(";") ? t.substr(0, t.indexOf(";")) : t
    },
    getTypeFromFile: function (e) {
        return e = e.split("?")[0], e = e.substring(e.lastIndexOf(".") + 1).toLowerCase(), (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(e) ? "video" : "audio") + "/" + this.getTypeFromExtension(e)
    },
    getTypeFromExtension: function (e) {
        switch (e) {
        case "mp4":
        case "m4v":
            return "mp4";
        case "webm":
        case "webma":
        case "webmv":
            return "webm";
        case "ogg":
        case "oga":
        case "ogv":
            return "ogg";
        default:
            return e
        }
    },
    createErrorMessage: function (e, t, i) {
        var n = e.htmlMediaElement,
            s = document.createElement("div");
        s.className = "me-cannotplay";
        try {
            s.style.width = n.width + "px", s.style.height = n.height + "px"
        } catch (r) {}
        s.innerHTML = t.customError ? t.customError : "" !== i ? '<a href="' + e.url + '"><img src="' + i + '" width="100%" height="100%" /></a>' : '<a href="' + e.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>", n.parentNode.insertBefore(s, n), n.style.display = "none", t.error(n)
    },
    createPlugin: function (e, t, i, n, s, r) {
        i = e.htmlMediaElement;
        var o, a = 1,
            l = 1,
            u = "me_" + e.method + "_" + mejs.meIndex++,
            h = new mejs.PluginMediaElement(u, e.method, e.url),
            c = document.createElement("div");
        for (h.tagName = i.tagName, o = 0; o < i.attributes.length; o++) {
            var d = i.attributes[o];
            1 == d.specified && h.setAttribute(d.name, d.value)
        }
        for (o = i.parentNode; null !== o && "body" != o.tagName.toLowerCase();) {
            if ("p" == o.parentNode.tagName.toLowerCase()) {
                o.parentNode.parentNode.insertBefore(o, o.parentNode);
                break
            }
            o = o.parentNode
        }
        switch (e.isVideo ? (a = t.pluginWidth > 0 ? t.pluginWidth : t.videoWidth > 0 ? t.videoWidth : null !== i.getAttribute("width") ? i.getAttribute("width") : t.defaultVideoWidth, l = t.pluginHeight > 0 ? t.pluginHeight : t.videoHeight > 0 ? t.videoHeight : null !== i.getAttribute("height") ? i.getAttribute("height") : t.defaultVideoHeight, a = mejs.Utility.encodeUrl(a), l = mejs.Utility.encodeUrl(l)) : t.enablePluginDebug && (a = 320, l = 240), h.success = t.success, mejs.MediaPluginBridge.registerPluginElement(u, h, i), c.className = "me-plugin", c.id = u + "_container", e.isVideo ? i.parentNode.insertBefore(c, i) : document.body.insertBefore(c, document.body.childNodes[0]), n = ["id=" + u, "isvideo=" + (e.isVideo ? "true" : "false"), "autoplay=" + (n ? "true" : "false"), "preload=" + s, "width=" + a, "startvolume=" + t.startVolume, "timerrate=" + t.timerRate, "flashstreamer=" + t.flashStreamer, "height=" + l, "pseudostreamstart=" + t.pseudoStreamingStartQueryParam], null !== e.url && n.push("flash" == e.method ? "file=" + mejs.Utility.encodeUrl(e.url) : "file=" + e.url), t.enablePluginDebug && n.push("debug=true"), t.enablePluginSmoothing && n.push("smoothing=true"), t.enablePseudoStreaming && n.push("pseudostreaming=true"), r && n.push("controls=true"), t.pluginVars && (n = n.concat(t.pluginVars)), e.method) {
        case "silverlight":
            c.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + u + '" name="' + u + '" width="' + a + '" height="' + l + '" class="mejs-shim"><param name="initParams" value="' + n.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + t.pluginPath + t.silverlightName + '" /></object>';
            break;
        case "flash":
            mejs.MediaFeatures.isIE ? (e = document.createElement("div"), c.appendChild(e), e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + u + '" width="' + a + '" height="' + l + '" class="mejs-shim"><param name="movie" value="' + t.pluginPath + t.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + n.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') : c.innerHTML = '<embed id="' + u + '" name="' + u + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + t.pluginPath + t.flashName + '" flashvars="' + n.join("&") + '" width="' + a + '" height="' + l + '" class="mejs-shim"></embed>';
            break;
        case "youtube":
            t = e.url.substr(e.url.lastIndexOf("=") + 1), youtubeSettings = {
                container: c,
                containerId: c.id,
                pluginMediaElement: h,
                pluginId: u,
                videoId: t,
                height: l,
                width: a
            }, mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
            break;
        case "vimeo":
            h.vimeoid = e.url.substr(e.url.lastIndexOf("/") + 1), c.innerHTML = '<iframe src="http://player.vimeo.com/video/' + h.vimeoid + '?portrait=0&byline=0&title=0" width="' + a + '" height="' + l + '" frameborder="0" class="mejs-shim"></iframe>'
        }
        return i.style.display = "none", h
    },
    updateNative: function (e, t) {
        var i, n = e.htmlMediaElement;
        for (i in mejs.HtmlMediaElement) n[i] = mejs.HtmlMediaElement[i];
        return t.success(n, n), n
    }
}, mejs.YouTubeApi = {
    isIframeStarted: !1,
    isIframeLoaded: !1,
    loadIframeApi: function () {
        if (!this.isIframeStarted) {
            var e = document.createElement("script");
            e.src = "//www.youtube.com/player_api";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t), this.isIframeStarted = !0
        }
    },
    iframeQueue: [],
    enqueueIframe: function (e) {
        this.isLoaded ? this.createIframe(e) : (this.loadIframeApi(), this.iframeQueue.push(e))
    },
    createIframe: function (e) {
        var t = e.pluginMediaElement,
            i = new YT.Player(e.containerId, {
                height: e.height,
                width: e.width,
                videoId: e.videoId,
                playerVars: {
                    controls: 0
                },
                events: {
                    onReady: function () {
                        e.pluginMediaElement.pluginApi = i, mejs.MediaPluginBridge.initPlugin(e.pluginId), setInterval(function () {
                            mejs.YouTubeApi.createEvent(i, t, "timeupdate")
                        }, 250)
                    },
                    onStateChange: function (e) {
                        mejs.YouTubeApi.handleStateChange(e.data, i, t)
                    }
                }
            })
    },
    createEvent: function (e, t, i) {
        if (i = {
            type: i,
            target: t
        }, e && e.getDuration) {
            t.currentTime = i.currentTime = e.getCurrentTime(), t.duration = i.duration = e.getDuration(), i.paused = t.paused, i.ended = t.ended, i.muted = e.isMuted(), i.volume = e.getVolume() / 100, i.bytesTotal = e.getVideoBytesTotal(), i.bufferedBytes = e.getVideoBytesLoaded();
            var n = i.bufferedBytes / i.bytesTotal * i.duration;
            i.target.buffered = i.buffered = {
                start: function () {
                    return 0
                },
                end: function () {
                    return n
                },
                length: 1
            }
        }
        t.dispatchEvent(i.type, i)
    },
    iFrameReady: function () {
        for (this.isIframeLoaded = this.isLoaded = !0; this.iframeQueue.length > 0;) this.createIframe(this.iframeQueue.pop())
    },
    flashPlayers: {},
    createFlash: function (e) {
        this.flashPlayers[e.pluginId] = e;
        var t, i = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + e.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
        mejs.MediaFeatures.isIE ? (t = document.createElement("div"), e.container.appendChild(t), t.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + e.pluginId + '" width="' + e.width + '" height="' + e.height + '" class="mejs-shim"><param name="movie" value="' + i + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') : e.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + e.pluginId + '" data="' + i + '" width="' + e.width + '" height="' + e.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
    },
    flashReady: function (e) {
        var t = this.flashPlayers[e],
            i = document.getElementById(e),
            n = t.pluginMediaElement;
        n.pluginApi = n.pluginElement = i, mejs.MediaPluginBridge.initPlugin(e), i.cueVideoById(t.videoId), e = t.containerId + "_callback", window[e] = function (e) {
            mejs.YouTubeApi.handleStateChange(e, i, n)
        }, i.addEventListener("onStateChange", e), setInterval(function () {
            mejs.YouTubeApi.createEvent(i, n, "timeupdate")
        }, 250)
    },
    handleStateChange: function (e, t, i) {
        switch (e) {
        case -1:
            i.paused = !0, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "loadedmetadata");
            break;
        case 0:
            i.paused = !1, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "ended");
            break;
        case 1:
            i.paused = !1, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "play"), mejs.YouTubeApi.createEvent(t, i, "playing");
            break;
        case 2:
            i.paused = !0, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "pause");
            break;
        case 3:
            mejs.YouTubeApi.createEvent(t, i, "progress")
        }
    }
}, window.mejs = mejs, window.MediaElement = mejs.MediaElement, function (e, t) {
    var i = {
        locale: {
            strings: {}
        },
        methods: {}
    };
    i.locale.getLanguage = function () {
        return i.locale || {
            language: navigator.language
        }
    }, i.locale.INIT_LANGUAGE = i.locale.getLanguage(), i.methods.checkPlain = function (e) {
        var t, i, n = {
            "&": "&amp;",
            '"': "&quot;",
            "<": "&lt;",
            ">": "&gt;"
        };
        e = String(e);
        for (t in n) n.hasOwnProperty(t) && (i = RegExp(t, "g"), e = e.replace(i, n[t]));
        return e
    }, i.methods.formatString = function (e, t) {
        for (var n in t) {
            switch (n.charAt(0)) {
            case "@":
                t[n] = i.methods.checkPlain(t[n]);
                break;
            case "!":
                break;
            default:
                t[n] = '<em class="placeholder">' + i.methods.checkPlain(t[n]) + "</em>"
            }
            e = e.replace(n, t[n])
        }
        return e
    }, i.methods.t = function (e, t, n) {
        return i.locale.strings && i.locale.strings[n.context] && i.locale.strings[n.context][e] && (e = i.locale.strings[n.context][e]), t && (e = i.methods.formatString(e, t)), e
    }, i.t = function (e, t, n) {
        if ("string" == typeof e && e.length > 0) {
            var s = i.locale.getLanguage();
            return n = n || {
                context: s.language
            }, i.methods.t(e, t, n)
        }
        throw {
            name: "InvalidArgumentException",
            message: "First argument is either not a string or empty."
        }
    }, t.i18n = i
}(document, mejs), function (e) {
    mejs.i18n.locale.language && mejs.i18n.locale.strings && (e[mejs.i18n.locale.language] = mejs.i18n.locale.strings)
}(mejs.i18n.locale.strings), function (e) {
    e.de = {
        Fullscreen: "Vollbild",
        "Go Fullscreen": "Vollbild an",
        "Turn off Fullscreen": "Vollbild aus",
        Close: "Schlie\xdfen"
    }
}(mejs.i18n.locale.strings), function (e) {
    e.zh = {
        Fullscreen: "\u5168\u87a2\u5e55",
        "Go Fullscreen": "\u5168\u5c4f\u6a21\u5f0f",
        "Turn off Fullscreen": "\u9000\u51fa\u5168\u5c4f\u6a21\u5f0f",
        Close: "\u95dc\u9589"
    }
}(mejs.i18n.locale.strings), "undefined" != typeof jQuery ? mejs.$ = jQuery : "undefined" != typeof ender && (mejs.$ = ender), function (e) {
    mejs.MepDefaults = {
        poster: "",
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        videoWidth: -1,
        videoHeight: -1,
        defaultAudioWidth: 400,
        defaultAudioHeight: 30,
        defaultSeekBackwardInterval: function (e) {
            return .05 * e.duration
        },
        defaultSeekForwardInterval: function (e) {
            return .05 * e.duration
        },
        audioWidth: -1,
        audioHeight: -1,
        startVolume: .8,
        loop: !1,
        autoRewind: !0,
        enableAutosize: !0,
        alwaysShowHours: !1,
        showTimecodeFrameCount: !1,
        framesPerSecond: 25,
        autosizeProgress: !0,
        alwaysShowControls: !1,
        hideVideoControlsOnLoad: !1,
        clickToPlayPause: !0,
        iPadUseNativeControls: !1,
        iPhoneUseNativeControls: !1,
        AndroidUseNativeControls: !1,
        features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
        isVideo: !0,
        enableKeyboard: !0,
        pauseOtherPlayers: !0,
        keyActions: [{
            keys: [32, 179],
            action: function (e, t) {
                t.paused || t.ended ? t.play() : t.pause()
            }
        }, {
            keys: [38],
            action: function (e, t) {
                t.setVolume(Math.min(t.volume + .1, 1))
            }
        }, {
            keys: [40],
            action: function (e, t) {
                t.setVolume(Math.max(t.volume - .1, 0))
            }
        }, {
            keys: [37, 227],
            action: function (e, t) {
                if (!isNaN(t.duration) && t.duration > 0) {
                    e.isVideo && (e.showControls(), e.startControlsTimer());
                    var i = Math.max(t.currentTime - e.options.defaultSeekBackwardInterval(t), 0);
                    t.setCurrentTime(i)
                }
            }
        }, {
            keys: [39, 228],
            action: function (e, t) {
                if (!isNaN(t.duration) && t.duration > 0) {
                    e.isVideo && (e.showControls(), e.startControlsTimer());
                    var i = Math.min(t.currentTime + e.options.defaultSeekForwardInterval(t), t.duration);
                    t.setCurrentTime(i)
                }
            }
        }, {
            keys: [70],
            action: function (e) {
                "undefined" != typeof e.enterFullScreen && (e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen())
            }
        }]
    }, mejs.mepIndex = 0, mejs.players = {}, mejs.MediaElementPlayer = function (t, i) {
        return this instanceof mejs.MediaElementPlayer ? (this.$media = this.$node = e(t), this.node = this.media = this.$media[0], "undefined" != typeof this.node.player ? this.node.player : (this.node.player = this, "undefined" == typeof i && (i = this.$node.data("mejsoptions")), this.options = e.extend({}, mejs.MepDefaults, i), this.id = "mep_" + mejs.mepIndex++, mejs.players[this.id] = this, this.init(), this)) : new mejs.MediaElementPlayer(t, i)
    }, mejs.MediaElementPlayer.prototype = {
        hasFocus: !1,
        controlsAreVisible: !0,
        init: function () {
            var t = this,
                i = mejs.MediaFeatures,
                n = e.extend(!0, {}, t.options, {
                    success: function (e, i) {
                        t.meReady(e, i)
                    },
                    error: function (e) {
                        t.handleError(e)
                    }
                }),
                s = t.media.tagName.toLowerCase();
            t.isDynamic = "audio" !== s && "video" !== s, t.isVideo = t.isDynamic ? t.options.isVideo : "audio" !== s && t.options.isVideo, i.isiPad && t.options.iPadUseNativeControls || i.isiPhone && t.options.iPhoneUseNativeControls ? (t.$media.attr("controls", "controls"), i.isiPad && null !== t.media.getAttribute("autoplay") && (t.media.load(), t.media.play())) : i.isAndroid && t.options.AndroidUseNativeControls || (t.$media.removeAttr("controls"), t.container = e('<div id="' + t.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(t.$media[0].className).insertBefore(t.$media), t.container.addClass((i.isAndroid ? "mejs-android " : "") + (i.isiOS ? "mejs-ios " : "") + (i.isiPad ? "mejs-ipad " : "") + (i.isiPhone ? "mejs-iphone " : "") + (t.isVideo ? "mejs-video " : "mejs-audio ")), i.isiOS ? (i = t.$media.clone(), t.container.find(".mejs-mediaelement").append(i), t.$media.remove(), t.$node = t.$media = i, t.node = t.media = i[0]) : t.container.find(".mejs-mediaelement").append(t.$media), t.controls = t.container.find(".mejs-controls"), t.layers = t.container.find(".mejs-layers"), i = t.isVideo ? "video" : "audio", s = i.substring(0, 1).toUpperCase() + i.substring(1), t.width = t.options[i + "Width"] > 0 || t.options[i + "Width"].toString().indexOf("%") > -1 ? t.options[i + "Width"] : "" !== t.media.style.width && null !== t.media.style.width ? t.media.style.width : null !== t.media.getAttribute("width") ? t.$media.attr("width") : t.options["default" + s + "Width"], t.height = t.options[i + "Height"] > 0 || t.options[i + "Height"].toString().indexOf("%") > -1 ? t.options[i + "Height"] : "" !== t.media.style.height && null !== t.media.style.height ? t.media.style.height : null !== t.$media[0].getAttribute("height") ? t.$media.attr("height") : t.options["default" + s + "Height"], t.setPlayerSize(t.width, t.height), n.pluginWidth = t.width, n.pluginHeight = t.height), mejs.MediaElement(t.$media[0], n), "undefined" != typeof t.container && t.container.trigger("controlsshown")
        },
        showControls: function (e) {
            var t = this;
            e = "undefined" == typeof e || e, t.controlsAreVisible || (e ? (t.controls.css("visibility", "visible").stop(!0, !0).fadeIn(200, function () {
                t.controlsAreVisible = !0, t.container.trigger("controlsshown")
            }), t.container.find(".mejs-control").css("visibility", "visible").stop(!0, !0).fadeIn(200, function () {
                t.controlsAreVisible = !0
            })) : (t.controls.css("visibility", "visible").css("display", "block"), t.container.find(".mejs-control").css("visibility", "visible").css("display", "block"), t.controlsAreVisible = !0, t.container.trigger("controlsshown")), t.setControlsSize())
        },
        hideControls: function (t) {
            var i = this;
            t = "undefined" == typeof t || t, i.controlsAreVisible && (t ? (i.controls.stop(!0, !0).fadeOut(200, function () {
                e(this).css("visibility", "hidden").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")
            }), i.container.find(".mejs-control").stop(!0, !0).fadeOut(200, function () {
                e(this).css("visibility", "hidden").css("display", "block")
            })) : (i.controls.css("visibility", "hidden").css("display", "block"), i.container.find(".mejs-control").css("visibility", "hidden").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")))
        },
        controlsTimer: null,
        startControlsTimer: function (e) {
            var t = this;
            e = "undefined" != typeof e ? e : 1500, t.killControlsTimer("start"), t.controlsTimer = setTimeout(function () {
                t.hideControls(), t.killControlsTimer("hide")
            }, e)
        },
        killControlsTimer: function () {
            null !== this.controlsTimer && (clearTimeout(this.controlsTimer), delete this.controlsTimer, this.controlsTimer = null)
        },
        controlsEnabled: !0,
        disableControls: function () {
            this.killControlsTimer(), this.hideControls(!1), this.controlsEnabled = !1
        },
        enableControls: function () {
            this.showControls(!1), this.controlsEnabled = !0
        },
        meReady: function (e, t) {
            var i = this,
                n = mejs.MediaFeatures,
                s = t.getAttribute("autoplay");
            s = "undefined" != typeof s && null !== s && "false" !== s;
            var r;
            if (!i.created) {
                if (i.created = !0, i.media = e, i.domNode = t, !(n.isAndroid && i.options.AndroidUseNativeControls || n.isiPad && i.options.iPadUseNativeControls || n.isiPhone && i.options.iPhoneUseNativeControls)) {
                    i.buildposter(i, i.controls, i.layers, i.media), i.buildkeyboard(i, i.controls, i.layers, i.media), i.buildoverlays(i, i.controls, i.layers, i.media), i.findTracks();
                    for (r in i.options.features) if (n = i.options.features[r], i["build" + n]) try {
                        i["build" + n](i, i.controls, i.layers, i.media)
                    } catch (o) {}
                    i.container.trigger("controlsready"), i.setPlayerSize(i.width, i.height), i.setControlsSize(), i.isVideo && (mejs.MediaFeatures.hasTouch ? i.$media.bind("touchstart", function () {
                        i.controlsAreVisible ? i.hideControls(!1) : i.controlsEnabled && i.showControls(!1)
                    }) : (mejs.MediaElementPlayer.prototype.clickToPlayPauseCallback = function () {
                        console.log("media clicked", i.media, i.media.paused), i.options.clickToPlayPause && (i.media.paused ? i.media.play() : i.media.pause())
                    }, i.media.addEventListener("click", i.clickToPlayPauseCallback), i.container.bind("mouseenter mouseover", function () {
                        i.controlsEnabled && (i.options.alwaysShowControls || (i.killControlsTimer("enter"), i.showControls(), i.startControlsTimer(2500)))
                    }).bind("mousemove", function () {
                        i.controlsEnabled && (i.controlsAreVisible || i.showControls(), i.options.alwaysShowControls || i.startControlsTimer(2500))
                    }).bind("mouseleave", function () {
                        i.controlsEnabled && !i.media.paused && !i.options.alwaysShowControls && i.startControlsTimer(1e3)
                    })), i.options.hideVideoControlsOnLoad && i.hideControls(!1), s && !i.options.alwaysShowControls && i.hideControls(), i.options.enableAutosize && i.media.addEventListener("loadedmetadata", function (e) {
                        i.options.videoHeight <= 0 && null === i.domNode.getAttribute("height") && !isNaN(e.target.videoHeight) && (i.setPlayerSize(e.target.videoWidth, e.target.videoHeight), i.setControlsSize(), i.media.setVideoSize(e.target.videoWidth, e.target.videoHeight))
                    }, !1)), e.addEventListener("play", function () {
                        for (var e in mejs.players) {
                            var t = mejs.players[e];
                            t.id != i.id && i.options.pauseOtherPlayers && !t.paused && !t.ended && t.pause(), t.hasFocus = !1
                        }
                        i.hasFocus = !0
                    }, !1), i.media.addEventListener("ended", function () {
                        if (i.options.autoRewind) try {
                            i.media.setCurrentTime(0)
                        } catch (e) {}
                        i.media.pause(), i.setProgressRail && i.setProgressRail(), i.setCurrentRail && i.setCurrentRail(), i.options.loop ? i.media.play() : !i.options.alwaysShowControls && i.controlsEnabled && i.showControls()
                    }, !1), i.media.addEventListener("loadedmetadata", function () {
                        i.updateDuration && i.updateDuration(), i.updateCurrent && i.updateCurrent(), i.isFullScreen || (i.setPlayerSize(i.width, i.height), i.setControlsSize())
                    }, !1), setTimeout(function () {
                        i.setPlayerSize(i.width, i.height), i.setControlsSize()
                    }, 50), i.globalBind("resize", function () {
                        i.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || i.setPlayerSize(i.width, i.height), i.setControlsSize()
                    }), "youtube" == i.media.pluginType && i.container.find(".mejs-overlay-play").hide()
                }
                s && "native" == e.pluginType && (e.load(), e.play()), i.options.success && ("string" == typeof i.options.success ? window[i.options.success](i.media, i.domNode, i) : i.options.success(i.media, i.domNode, i))
            }
        },
        handleError: function (e) {
            this.controls.hide(), this.options.error && this.options.error(e)
        },
        setPlayerSize: function (t, i) {
            if ("undefined" != typeof t && (this.width = t), "undefined" != typeof i && (this.height = i), this.height.toString().indexOf("%") > 0 || "100%" === this.$node.css("max-width") || this.$node[0].currentStyle && "100%" === this.$node[0].currentStyle.maxWidth) {
                var n = this.isVideo ? this.media.videoWidth && this.media.videoWidth > 0 ? this.media.videoWidth : this.options.defaultVideoWidth : this.options.defaultAudioWidth,
                    s = this.isVideo ? this.media.videoHeight && this.media.videoHeight > 0 ? this.media.videoHeight : this.options.defaultVideoHeight : this.options.defaultAudioHeight,
                    r = this.container.parent().closest(":visible").width();
                n = this.isVideo || !this.options.autosizeProgress ? parseInt(r * s / n, 10) : s, "body" === this.container.parent()[0].tagName.toLowerCase() && (r = e(window).width(), n = e(window).height()), 0 != n && 0 != r && (this.container.width(r).height(n), this.$media.add(this.container.find(".mejs-shim")).width("100%").height("100%"), this.isVideo && this.media.setVideoSize && this.media.setVideoSize(r, n), this.layers.children(".mejs-layer").width("100%").height("100%"))
            } else this.container.width(this.width).height(this.height), this.layers.children(".mejs-layer").width(this.width).height(this.height);
            r = this.layers.find(".mejs-overlay-play"), n = r.find(".mejs-overlay-button"), r.height(this.container.height() - this.controls.height()), n.css("margin-top", "-" + (n.height() / 2 - this.controls.height() / 2).toString() + "px")
        },
        setControlsSize: function () {
            var t = 0,
                i = 0,
                n = this.controls.find(".mejs-time-rail"),
                s = this.controls.find(".mejs-time-total");
            this.controls.find(".mejs-time-current"), this.controls.find(".mejs-time-loaded");
            var r = n.siblings();
            this.options && !this.options.autosizeProgress && (i = parseInt(n.css("width"))), 0 !== i && i || (r.each(function () {
                var i = e(this);
                "absolute" != i.css("position") && i.is(":visible") && (t += e(this).outerWidth(!0))
            }), i = this.controls.width() - t - (n.outerWidth(!0) - n.width())), n.width(i), s.width(i - (s.outerWidth(!0) - s.width())), this.setProgressRail && this.setProgressRail(), this.setCurrentRail && this.setCurrentRail()
        },
        buildposter: function (t, i, n, s) {
            var r = e('<div class="mejs-poster mejs-layer"></div>').appendTo(n);
            i = t.$media.attr("poster"), "" !== t.options.poster && (i = t.options.poster), "" !== i && null != i ? this.setPoster(i) : r.hide(), s.addEventListener("play", function () {
                r.hide()
            }, !1)
        },
        setPoster: function (t) {
            var i = this.container.find(".mejs-poster"),
                n = i.find("img");
            0 == n.length && (n = e('<img width="100%" height="100%" />').appendTo(i)), n.attr("src", t), i.css({
                "background-image": "url(" + t + ")"
            })
        },
        buildoverlays: function (t, i, n, s) {
            var r = this;
            if (t.isVideo) {
                var o = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(n),
                    a = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(n),
                    l = e('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(n).click(function () {
                        r.options.clickToPlayPause && (s.paused ? s.play() : s.pause())
                    });
                s.addEventListener("play", function () {
                    l.hide(), o.hide(), i.find(".mejs-time-buffering").hide(), a.hide()
                }, !1), s.addEventListener("playing", function () {
                    l.hide(), o.hide(), i.find(".mejs-time-buffering").hide(), a.hide()
                }, !1), s.addEventListener("seeking", function () {
                    o.show(), i.find(".mejs-time-buffering").show()
                }, !1), s.addEventListener("seeked", function () {
                    o.hide(), i.find(".mejs-time-buffering").hide()
                }, !1), s.addEventListener("pause", function () {
                    mejs.MediaFeatures.isiPhone || l.show()
                }, !1), s.addEventListener("waiting", function () {
                    o.show(), i.find(".mejs-time-buffering").show()
                }, !1), s.addEventListener("loadeddata", function () {
                    o.show(), i.find(".mejs-time-buffering").show()
                }, !1), s.addEventListener("canplay", function () {
                    o.hide(), i.find(".mejs-time-buffering").hide()
                }, !1), s.addEventListener("error", function () {
                    o.hide(), i.find(".mejs-time-buffering").hide(), a.show(), a.find("mejs-overlay-error").html("Error loading this resource")
                }, !1)
            }
        },
        buildkeyboard: function (t, i, n, s) {
            this.globalBind("keydown", function (e) {
                if (t.hasFocus && t.options.enableKeyboard) for (var i = 0, n = t.options.keyActions.length; n > i; i++) for (var r = t.options.keyActions[i], o = 0, a = r.keys.length; a > o; o++) if (e.keyCode == r.keys[o]) return e.preventDefault(), r.action(t, s, e.keyCode), !1;
                return !0
            }), this.globalBind("click", function (i) {
                0 == e(i.target).closest(".mejs-container").length && (t.hasFocus = !1)
            })
        },
        findTracks: function () {
            var t = this,
                i = t.$media.find("track");
            t.tracks = [], i.each(function (i, n) {
                n = e(n), t.tracks.push({
                    srclang: n.attr("srclang") ? n.attr("srclang").toLowerCase() : "",
                    src: n.attr("src"),
                    kind: n.attr("kind"),
                    label: n.attr("label") || "",
                    entries: [],
                    isLoaded: !1
                })
            })
        },
        changeSkin: function (e) {
            this.container[0].className = "mejs-container " + e, this.setPlayerSize(this.width, this.height), this.setControlsSize()
        },
        play: function () {
            this.media.play()
        },
        pause: function () {
            this.media.pause()
        },
        load: function () {
            this.media.load()
        },
        setMuted: function (e) {
            this.media.setMuted(e)
        },
        setCurrentTime: function (e) {
            this.media.setCurrentTime(e)
        },
        getCurrentTime: function () {
            return this.media.currentTime
        },
        setVolume: function (e) {
            this.media.setVolume(e)
        },
        getVolume: function () {
            return this.media.volume
        },
        setSrc: function (e) {
            this.media.setSrc(e)
        },
        remove: function () {
            var e, t;
            for (e in this.options.features) if (t = this.options.features[e], this["clean" + t]) try {
                this["clean" + t](this)
            } catch (i) {}
            "native" === this.media.pluginType ? this.$media.prop("controls", !0) : this.media.remove(), this.isDynamic || this.$node.insertBefore(this.container), delete mejs.players[this.id], this.container.remove(), this.globalUnbind(), delete this.node.player
        }
    }, function () {
        function t(t, n) {
            var s = {
                d: [],
                w: []
            };
            return e.each((t || "").split(" "), function (e, t) {
                var r = t + "." + n;
                0 === r.indexOf(".") ? (s.d.push(r), s.w.push(r)) : s[i.test(t) ? "w" : "d"].push(r)
            }), s.d = s.d.join(" "), s.w = s.w.join(" "), s
        }
        var i = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
        mejs.MediaElementPlayer.prototype.globalBind = function (i, n, s) {
            i = t(i, this.id), i.d && e(document).bind(i.d, n, s), i.w && e(window).bind(i.w, n, s)
        }, mejs.MediaElementPlayer.prototype.globalUnbind = function (i, n) {
            i = t(i, this.id), i.d && e(document).unbind(i.d, n), i.w && e(window).unbind(i.w, n)
        }
    }(), "undefined" != typeof jQuery && (jQuery.fn.mediaelementplayer = function (e) {
        return this.each(e === !1 ?
        function () {
            var e = jQuery(this).data("mediaelementplayer");
            e && e.remove(), jQuery(this).removeData("mediaelementplayer")
        } : function () {
            jQuery(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, e))
        }), this
    }), e(document).ready(function () {
        e(".mejs-player").mediaelementplayer()
    }), window.MediaElementPlayer = mejs.MediaElementPlayer
}(mejs.$), function (e) {
    e.extend(mejs.MepDefaults, {
        playpauseText: mejs.i18n.t("Play/Pause")
    }), e.extend(MediaElementPlayer.prototype, {
        buildplaypause: function (t, i, n, s) {
            var r = e('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + this.id + '" title="' + this.options.playpauseText + '" aria-label="' + this.options.playpauseText + '"></button></div>').appendTo(i).click(function (e) {
                return e.preventDefault(), s.paused ? s.play() : s.pause(), !1
            });
            s.addEventListener("play", function () {
                r.removeClass("mejs-play").addClass("mejs-pause")
            }, !1), s.addEventListener("playing", function () {
                r.removeClass("mejs-play").addClass("mejs-pause")
            }, !1), s.addEventListener("pause", function () {
                r.removeClass("mejs-pause").addClass("mejs-play")
            }, !1), s.addEventListener("paused", function () {
                r.removeClass("mejs-pause").addClass("mejs-play")
            }, !1)
        }
    })
}(mejs.$), function (e) {
    e.extend(mejs.MepDefaults, {
        stopText: "Stop"
    }), e.extend(MediaElementPlayer.prototype, {
        buildstop: function (t, i, n, s) {
            e('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + this.id + '" title="' + this.options.stopText + '" aria-label="' + this.options.stopText + '"></button></div>').appendTo(i).click(function () {
                s.paused || s.pause(), s.currentTime > 0 && (s.setCurrentTime(0), s.pause(), i.find(".mejs-time-current").width("0px"), i.find(".mejs-time-handle").css("left", "0px"), i.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0)), i.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0)), n.find(".mejs-poster").show())
            })
        }
    })
}(mejs.$), function (e) {
    e.extend(MediaElementPlayer.prototype, {
        buildprogress: function (t, i, n, s) {
            e('<div class="mejs-time-rail"><span class="mejs-time-total"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(i), i.find(".mejs-time-buffering").hide();
            var r = this,
                o = i.find(".mejs-time-total");
            n = i.find(".mejs-time-loaded");
            var a = i.find(".mejs-time-current"),
                l = i.find(".mejs-time-handle"),
                u = i.find(".mejs-time-float"),
                h = i.find(".mejs-time-float-current"),
                c = function (e) {
                    e = e.pageX;
                    var t = o.offset(),
                        i = o.outerWidth(!0),
                        n = 0,
                        r = n = 0;
                    s.duration && (e < t.left ? e = t.left : e > i + t.left && (e = i + t.left), r = e - t.left, n = r / i, n = .02 >= n ? 0 : n * s.duration, d && n !== s.currentTime && s.setCurrentTime(n), mejs.MediaFeatures.hasTouch || (u.css("left", r), h.html(mejs.Utility.secondsToTimeCode(n)), u.show()))
                },
                d = !1;
            o.bind("mousedown", function (e) {
                return 1 === e.which ? (d = !0, c(e), r.globalBind("mousemove.dur", function (e) {
                    c(e)
                }), r.globalBind("mouseup.dur", function () {
                    d = !1, u.hide(), r.globalUnbind(".dur")
                }), !1) : void 0
            }).bind("mouseenter", function () {
                r.globalBind("mousemove.dur", function (e) {
                    c(e)
                }), mejs.MediaFeatures.hasTouch || u.show()
            }).bind("mouseleave", function () {
                d || (r.globalUnbind(".dur"), u.hide())
            }), s.addEventListener("progress", function (e) {
                t.setProgressRail(e), t.setCurrentRail(e)
            }, !1), s.addEventListener("timeupdate", function (e) {
                t.setProgressRail(e), t.setCurrentRail(e)
            }, !1), r.loaded = n, r.total = o, r.current = a, r.handle = l
        },
        setProgressRail: function (e) {
            var t = void 0 != e ? e.target : this.media,
                i = null;
            t && t.buffered && t.buffered.length > 0 && t.buffered.end && t.duration ? i = t.buffered.end(0) / t.duration : t && void 0 != t.bytesTotal && t.bytesTotal > 0 && void 0 != t.bufferedBytes ? i = t.bufferedBytes / t.bytesTotal : e && e.lengthComputable && 0 != e.total && (i = e.loaded / e.total), null !== i && (i = Math.min(1, Math.max(0, i)), this.loaded && this.total && this.loaded.width(this.total.width() * i))
        },
        setCurrentRail: function () {
            if (void 0 != this.media.currentTime && this.media.duration && this.total && this.handle) {
                var e = Math.round(this.total.width() * this.media.currentTime / this.media.duration),
                    t = e - Math.round(this.handle.outerWidth(!0) / 2);
                this.current.width(e), this.handle.css("left", t)
            }
        }
    })
}(mejs.$), function (e) {
    e.extend(mejs.MepDefaults, {
        duration: -1,
        timeAndDurationSeparator: " <span> / </span> "
    }), e.extend(MediaElementPlayer.prototype, {
        buildcurrent: function (t, i, n, s) {
            e('<div class="mejs-time"><span class="mejs-currenttime">' + (t.options.alwaysShowHours ? "00:" : "") + (t.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(i), this.currenttime = this.controls.find(".mejs-currenttime"), s.addEventListener("timeupdate", function () {
                t.updateCurrent()
            }, !1)
        },
        buildduration: function (t, i, n, s) {
            i.children().last().find(".mejs-currenttime").length > 0 ? e(this.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (t.options.alwaysShowHours ? "00:" : "") + (t.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span>").appendTo(i.find(".mejs-time")) : (i.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"), e('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (t.options.alwaysShowHours ? "00:" : "") + (t.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span></div>").appendTo(i)), this.durationD = this.controls.find(".mejs-duration"), s.addEventListener("timeupdate", function () {
                t.updateDuration()
            }, !1)
        },
        updateCurrent: function () {
            this.currenttime && this.currenttime.html(mejs.Utility.secondsToTimeCode(this.media.currentTime, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
        },
        updateDuration: function () {
            this.container.toggleClass("mejs-long-video", this.media.duration > 3600), this.durationD && (this.options.duration > 0 || this.media.duration) && this.durationD.html(mejs.Utility.secondsToTimeCode(this.options.duration > 0 ? this.options.duration : this.media.duration, this.options.alwaysShowHours, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
        }
    })
}(mejs.$), function (e) {
    e.extend(mejs.MepDefaults, {
        muteText: mejs.i18n.t("Mute Toggle"),
        hideVolumeOnTouchDevices: !0,
        audioVolume: "horizontal",
        videoVolume: "vertical"
    }), e.extend(MediaElementPlayer.prototype, {
        buildvolume: function (t, i, n, s) {
            if (!mejs.MediaFeatures.hasTouch || !this.options.hideVolumeOnTouchDevices) {
                var r = this,
                    o = r.isVideo ? r.options.videoVolume : r.options.audioVolume,
                    a = "horizontal" == o ? e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + r.id + '" title="' + r.options.muteText + '" aria-label="' + r.options.muteText + '"></button></div><div class="mejs-horizontal-volume-slider"><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></div>').appendTo(i) : e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + r.id + '" title="' + r.options.muteText + '" aria-label="' + r.options.muteText + '"></button><div class="mejs-volume-slider"><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></div></div>').appendTo(i),
                    l = r.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),
                    u = r.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),
                    h = r.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),
                    c = r.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),
                    d = function (e, t) {
                        if (l.is(":visible") || "undefined" != typeof t) if (e = Math.max(0, e), e = Math.min(e, 1), 0 == e ? a.removeClass("mejs-mute").addClass("mejs-unmute") : a.removeClass("mejs-unmute").addClass("mejs-mute"), "vertical" == o) {
                            var i = u.height(),
                                n = u.position(),
                                s = i - i * e;
                            c.css("top", Math.round(n.top + s - c.height() / 2)), h.height(i - s), h.css("top", n.top + s)
                        } else i = u.width(), n = u.position(), i *= e, c.css("left", Math.round(n.left + i - c.width() / 2)), h.width(Math.round(i));
                        else l.show(), d(e, !0), l.hide()
                    },
                    p = function (e) {
                        var t = null,
                            i = u.offset();
                        if ("vertical" == o) {
                            if (t = u.height(), parseInt(u.css("top").replace(/px/, ""), 10), t = (t - (e.pageY - i.top)) / t, 0 == i.top || 0 == i.left) return
                        } else t = u.width(), t = (e.pageX - i.left) / t;
                        t = Math.max(0, t), t = Math.min(t, 1), d(t), s.setMuted(0 == t ? !0 : !1), s.setVolume(t)
                    },
                    f = !1,
                    m = !1;
                a.hover(function () {
                    l.show(), m = !0
                }, function () {
                    m = !1, !f && "vertical" == o && l.hide()
                }), l.bind("mouseover", function () {
                    m = !0
                }).bind("mousedown", function (e) {
                    return p(e), r.globalBind("mousemove.vol", function (e) {
                        p(e)
                    }), r.globalBind("mouseup.vol", function () {
                        f = !1, r.globalUnbind(".vol"), !m && "vertical" == o && l.hide()
                    }), f = !0, !1
                }), a.find("button").click(function () {
                    s.setMuted(!s.muted)
                }), s.addEventListener("volumechange", function () {
                    f || (s.muted ? (d(0), a.removeClass("mejs-mute").addClass("mejs-unmute")) : (d(s.volume), a.removeClass("mejs-unmute").addClass("mejs-mute")))
                }, !1), r.container.is(":visible") && (d(t.options.startVolume), 0 === t.options.startVolume && s.setMuted(!0), "native" === s.pluginType && s.setVolume(t.options.startVolume))
            }
        }
    })
}(mejs.$), function (e) {
    e.extend(mejs.MepDefaults, {
        usePluginFullScreen: !0,
        newWindowCallback: function () {
            return ""
        },
        fullscreenText: mejs.i18n.t("Fullscreen")
    }), e.extend(MediaElementPlayer.prototype, {
        isFullScreen: !1,
        isNativeFullScreen: !1,
        docStyleOverflow: null,
        isInIframe: !1,
        buildfullscreen: function (t, i, n, s) {
            if (t.isVideo) {
                t.isInIframe = window.location != window.parent.location, mejs.MediaFeatures.hasTrueNativeFullScreen && (n = function () {
                    mejs.MediaFeatures.isFullScreen() ? (t.isNativeFullScreen = !0, t.setControlsSize()) : (t.isNativeFullScreen = !1, t.exitFullScreen())
                }, mejs.MediaFeatures.hasMozNativeFullScreen ? t.globalBind(mejs.MediaFeatures.fullScreenEventName, n) : t.container.bind(mejs.MediaFeatures.fullScreenEventName, n));
                var r = this,
                    o = e('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + r.id + '" title="' + r.options.fullscreenText + '" aria-label="' + r.options.fullscreenText + '"></button></div>').appendTo(i);
                if ("native" === r.media.pluginType || !r.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox) o.click(function () {
                    mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || t.isFullScreen ? t.exitFullScreen() : t.enterFullScreen()
                });
                else {
                    var a = null;
                    if (function () {
                        var e = document.createElement("x"),
                            t = document.documentElement,
                            i = window.getComputedStyle;
                        return "pointerEvents" in e.style ? (e.style.pointerEvents = "auto", e.style.pointerEvents = "x", t.appendChild(e), i = i && "auto" === i(e, "").pointerEvents, t.removeChild(e), !! i) : !1
                    }() && !mejs.MediaFeatures.isOpera) {
                        var l = !1,
                            u = function () {
                                if (l) {
                                    for (var e in h) h[e].hide();
                                    o.css("pointer-events", ""), r.controls.css("pointer-events", ""), r.media.removeEventListener("click", r.clickToPlayPauseCallback), l = !1
                                }
                            },
                            h = {};
                        i = ["top", "left", "right", "bottom"];
                        var c, d = function () {
                                var e = o.offset().left - r.container.offset().left,
                                    t = o.offset().top - r.container.offset().top,
                                    i = o.outerWidth(!0),
                                    n = o.outerHeight(!0),
                                    s = r.container.width(),
                                    a = r.container.height();
                                for (c in h) h[c].css({
                                    position: "absolute",
                                    top: 0,
                                    left: 0
                                });
                                h.top.width(s).height(t), h.left.width(e).height(n).css({
                                    top: t
                                }), h.right.width(s - e - i).height(n).css({
                                    top: t,
                                    left: e + i
                                }), h.bottom.width(s).height(a - n - t).css({
                                    top: t + n
                                })
                            };
                        for (r.globalBind("resize", function () {
                            d()
                        }), c = 0, n = i.length; n > c; c++) h[i[c]] = e('<div class="mejs-fullscreen-hover" />').appendTo(r.container).mouseover(u).hide();
                        o.on("mouseover", function () {
                            if (!r.isFullScreen) {
                                var e = o.offset(),
                                    i = t.container.offset();
                                s.positionFullscreenButton(e.left - i.left, e.top - i.top, !1), o.css("pointer-events", "none"), r.controls.css("pointer-events", "none"), r.media.addEventListener("click", r.clickToPlayPauseCallback);
                                for (c in h) h[c].show();
                                d(), l = !0
                            }
                        }), s.addEventListener("fullscreenchange", function () {
                            r.isFullScreen = !r.isFullScreen, r.isFullScreen ? r.media.removeEventListener("click", r.clickToPlayPauseCallback) : r.media.addEventListener("click", r.clickToPlayPauseCallback), u()
                        }), r.globalBind("mousemove", function (e) {
                            if (l) {
                                var t = o.offset();
                                (e.pageY < t.top || e.pageY > t.top + o.outerHeight(!0) || e.pageX < t.left || e.pageX > t.left + o.outerWidth(!0)) && (o.css("pointer-events", ""), r.controls.css("pointer-events", ""), l = !1)
                            }
                        })
                    } else o.on("mouseover", function () {
                        null !== a && (clearTimeout(a), delete a);
                        var e = o.offset(),
                            i = t.container.offset();
                        s.positionFullscreenButton(e.left - i.left, e.top - i.top, !0)
                    }).on("mouseout", function () {
                        null !== a && (clearTimeout(a), delete a), a = setTimeout(function () {
                            s.hideFullscreenButton()
                        }, 1500)
                    })
                }
                t.fullscreenBtn = o, r.globalBind("keydown", function (e) {
                    (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || r.isFullScreen) && 27 == e.keyCode && t.exitFullScreen()
                })
            }
        },
        cleanfullscreen: function (e) {
            e.exitFullScreen()
        },
        containerSizeTimeout: null,
        enterFullScreen: function () {
            var t = this;
            if ("native" === t.media.pluginType || !mejs.MediaFeatures.isFirefox && !t.options.usePluginFullScreen) {
                if (docStyleOverflow = document.documentElement.style.overflow, document.documentElement.style.overflow = "hidden", normalHeight = t.container.height(), normalWidth = t.container.width(), "native" === t.media.pluginType) if (mejs.MediaFeatures.hasTrueNativeFullScreen) mejs.MediaFeatures.requestFullScreen(t.container[0]), t.isInIframe && setTimeout(function n() {
                    t.isNativeFullScreen && (e(window).width() !== screen.width ? t.exitFullScreen() : setTimeout(n, 500))
                }, 500);
                else if (mejs.MediaFeatures.hasSemiNativeFullScreen) return void t.media.webkitEnterFullscreen();
                if (t.isInIframe) {
                    var i = t.options.newWindowCallback(this);
                    if ("" !== i) {
                        if (!mejs.MediaFeatures.hasTrueNativeFullScreen) return t.pause(), void window.open(i, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                        setTimeout(function () {
                            t.isNativeFullScreen || (t.pause(), window.open(i, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no"))
                        }, 250)
                    }
                }
                t.container.addClass("mejs-container-fullscreen").width("100%").height("100%"), t.containerSizeTimeout = setTimeout(function () {
                    t.container.css({
                        width: "100%",
                        height: "100%"
                    }), t.setControlsSize()
                }, 500), "native" === t.media.pluginType ? t.$media.width("100%").height("100%") : (t.container.find(".mejs-shim").width("100%").height("100%"), t.media.setVideoSize(e(window).width(), e(window).height())), t.layers.children("div").width("100%").height("100%"), t.fullscreenBtn && t.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"), t.setControlsSize(), t.isFullScreen = !0
            }
        },
        exitFullScreen: function () {
            clearTimeout(this.containerSizeTimeout), "native" !== this.media.pluginType && mejs.MediaFeatures.isFirefox ? this.media.setFullscreen(!1) : (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || this.isFullScreen) && mejs.MediaFeatures.cancelFullScreen(), document.documentElement.style.overflow = docStyleOverflow, this.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight), "native" === this.media.pluginType ? this.$media.width(normalWidth).height(normalHeight) : (this.container.find(".mejs-shim").width(normalWidth).height(normalHeight), this.media.setVideoSize(normalWidth, normalHeight)), this.layers.children("div").width(normalWidth).height(normalHeight), this.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"), this.setControlsSize(), this.isFullScreen = !1)
        }
    })
}(mejs.$), function (e) {
    e.extend(mejs.MepDefaults, {
        startLanguage: "",
        tracksText: mejs.i18n.t("Captions/Subtitles"),
        hideCaptionsButtonWhenEmpty: !0,
        toggleCaptionsButtonWhenOnlyOne: !1,
        slidesSelector: ""
    }), e.extend(MediaElementPlayer.prototype, {
        hasChapters: !1,
        buildtracks: function (t, i, n, s) {
            if (0 != t.tracks.length) {
                for (t.chapters = e('<div class="mejs-chapters mejs-layer"></div>').prependTo(n).hide(), t.captions = e('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover"><span class="mejs-captions-text"></span></div></div>').prependTo(n).hide(), t.captionsText = t.captions.find(".mejs-captions-text"), t.captionsButton = e('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + this.id + '" title="' + this.options.tracksText + '" aria-label="' + this.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_none" value="none" checked="checked" /><label for="' + t.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(i), i = n = 0; i < t.tracks.length; i++)"subtitles" == t.tracks[i].kind && n++;
                for (this.options.toggleCaptionsButtonWhenOnlyOne && 1 == n ? t.captionsButton.on("click", function () {
                    t.setTrack(null == t.selectedTrack ? t.tracks[0].srclang : "none")
                }) : t.captionsButton.hover(function () {
                    e(this).find(".mejs-captions-selector").css("visibility", "visible")
                }, function () {
                    e(this).find(".mejs-captions-selector").css("visibility", "hidden")
                }).on("click", "input[type=radio]", function () {
                    lang = this.value, t.setTrack(lang)
                }), t.options.alwaysShowControls ? t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : t.container.bind("controlsshown", function () {
                    t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                }).bind("controlshidden", function () {
                    s.paused || t.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                }), t.trackToLoad = -1, t.selectedTrack = null, t.isLoadingTrack = !1, i = 0; i < t.tracks.length; i++)"subtitles" == t.tracks[i].kind && t.addTrackButton(t.tracks[i].srclang, t.tracks[i].label);
                t.loadNextTrack(), s.addEventListener("timeupdate", function () {
                    t.displayCaptions()
                }, !1), "" != t.options.slidesSelector && (t.slidesContainer = e(t.options.slidesSelector), s.addEventListener("timeupdate", function () {
                    t.displaySlides()
                }, !1)), s.addEventListener("loadedmetadata", function () {
                    t.displayChapters()
                }, !1), t.container.hover(function () {
                    t.hasChapters && (t.chapters.css("visibility", "visible"), t.chapters.fadeIn(200).height(t.chapters.find(".mejs-chapter").outerHeight()))
                }, function () {
                    t.hasChapters && !s.paused && t.chapters.fadeOut(200, function () {
                        e(this).css("visibility", "hidden"), e(this).css("display", "block")
                    })
                }), null !== t.node.getAttribute("autoplay") && t.chapters.css("visibility", "hidden")
            }
        },
        setTrack: function (e) {
            var t;
            if ("none" == e) this.selectedTrack = null, this.captionsButton.removeClass("mejs-captions-enabled");
            else for (t = 0; t < this.tracks.length; t++) if (this.tracks[t].srclang == e) {
                null == this.selectedTrack && this.captionsButton.addClass("mejs-captions-enabled"), this.selectedTrack = this.tracks[t], this.captions.attr("lang", this.selectedTrack.srclang), this.displayCaptions();
                break
            }
        },
        loadNextTrack: function () {
            this.trackToLoad++, this.trackToLoad < this.tracks.length ? (this.isLoadingTrack = !0, this.loadTrack(this.trackToLoad)) : (this.isLoadingTrack = !1, this.checkForTracks())
        },
        loadTrack: function (t) {
            var i = this,
                n = i.tracks[t];
            e.ajax({
                url: n.src,
                dataType: "text",
                success: function (e) {
                    n.entries = "string" == typeof e && /<tt\s+xml/gi.exec(e) ? mejs.TrackFormatParser.dfxp.parse(e) : mejs.TrackFormatParser.webvvt.parse(e), n.isLoaded = !0, i.enableTrackButton(n.srclang, n.label), i.loadNextTrack(), "chapters" == n.kind && i.media.addEventListener("play", function () {
                        i.media.duration > 0 && i.displayChapters(n)
                    }, !1), "slides" == n.kind && i.setupSlides(n)
                },
                error: function () {
                    i.loadNextTrack()
                }
            })
        },
        enableTrackButton: function (t, i) {
            "" === i && (i = mejs.language.codes[t] || t), this.captionsButton.find("input[value=" + t + "]").prop("disabled", !1).siblings("label").html(i), this.options.startLanguage == t && e("#" + this.id + "_captions_" + t).click(), this.adjustLanguageBox()
        },
        addTrackButton: function (t, i) {
            "" === i && (i = mejs.language.codes[t] || t), this.captionsButton.find("ul").append(e('<li><input type="radio" name="' + this.id + '_captions" id="' + this.id + "_captions_" + t + '" value="' + t + '" disabled="disabled" /><label for="' + this.id + "_captions_" + t + '">' + i + " (loading)</label></li>")), this.adjustLanguageBox(), this.container.find(".mejs-captions-translations option[value=" + t + "]").remove()
        },
        adjustLanguageBox: function () {
            this.captionsButton.find(".mejs-captions-selector").height(this.captionsButton.find(".mejs-captions-selector ul").outerHeight(!0) + this.captionsButton.find(".mejs-captions-translations").outerHeight(!0))
        },
        checkForTracks: function () {
            var e = !1;
            if (this.options.hideCaptionsButtonWhenEmpty) {
                for (i = 0; i < this.tracks.length; i++) if ("subtitles" == this.tracks[i].kind) {
                    e = !0;
                    break
                }
                e || (this.captionsButton.hide(), this.setControlsSize())
            }
        },
        displayCaptions: function () {
            if ("undefined" != typeof this.tracks) {
                var e, t = this.selectedTrack;
                if (null != t && t.isLoaded) for (e = 0; e < t.entries.times.length; e++) if (this.media.currentTime >= t.entries.times[e].start && this.media.currentTime <= t.entries.times[e].stop) return this.captionsText.html(t.entries.text[e]), void this.captions.show().height(0);
                this.captions.hide()
            }
        },
        setupSlides: function (e) {
            this.slides = e, this.slides.entries.imgs = [this.slides.entries.text.length], this.showSlide(0)
        },
        showSlide: function (t) {
            if ("undefined" != typeof this.tracks && "undefined" != typeof this.slidesContainer) {
                var i = this,
                    n = i.slides.entries.text[t],
                    s = i.slides.entries.imgs[t];
                "undefined" == typeof s || "undefined" == typeof s.fadeIn ? i.slides.entries.imgs[t] = s = e('<img src="' + n + '">').on("load", function () {
                    s.appendTo(i.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                }) : !s.is(":visible") && !s.is(":animated") && (console.log("showing existing slide"), s.fadeIn().siblings(":visible").fadeOut())
            }
        },
        displaySlides: function () {
            if ("undefined" != typeof this.slides) {
                var e, t = this.slides;
                for (e = 0; e < t.entries.times.length; e++) if (this.media.currentTime >= t.entries.times[e].start && this.media.currentTime <= t.entries.times[e].stop) {
                    this.showSlide(e);
                    break
                }
            }
        },
        displayChapters: function () {
            var e;
            for (e = 0; e < this.tracks.length; e++) if ("chapters" == this.tracks[e].kind && this.tracks[e].isLoaded) {
                this.drawChapters(this.tracks[e]), this.hasChapters = !0;
                break
            }
        },
        drawChapters: function (t) {
            var i, n, s = this,
                r = n = 0;
            for (s.chapters.empty(), i = 0; i < t.entries.times.length; i++) n = t.entries.times[i].stop - t.entries.times[i].start, n = Math.floor(n / s.media.duration * 100), (n + r > 100 || i == t.entries.times.length - 1 && 100 > n + r) && (n = 100 - r), s.chapters.append(e('<div class="mejs-chapter" rel="' + t.entries.times[i].start + '" style="left: ' + r.toString() + "%;width: " + n.toString() + '%;"><div class="mejs-chapter-block' + (i == t.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + t.entries.text[i] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(t.entries.times[i].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(t.entries.times[i].stop) + "</span></div></div>")), r += n;
            s.chapters.find("div.mejs-chapter").click(function () {
                s.media.setCurrentTime(parseFloat(e(this).attr("rel"))), s.media.paused && s.media.play()
            }), s.chapters.show()
        }
    }), mejs.language = {
        codes: {
            af: "Afrikaans",
            sq: "Albanian",
            ar: "Arabic",
            be: "Belarusian",
            bg: "Bulgarian",
            ca: "Catalan",
            zh: "Chinese",
            "zh-cn": "Chinese Simplified",
            "zh-tw": "Chinese Traditional",
            hr: "Croatian",
            cs: "Czech",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            et: "Estonian",
            tl: "Filipino",
            fi: "Finnish",
            fr: "French",
            gl: "Galician",
            de: "German",
            el: "Greek",
            ht: "Haitian Creole",
            iw: "Hebrew",
            hi: "Hindi",
            hu: "Hungarian",
            is: "Icelandic",
            id: "Indonesian",
            ga: "Irish",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            lv: "Latvian",
            lt: "Lithuanian",
            mk: "Macedonian",
            ms: "Malay",
            mt: "Maltese",
            no: "Norwegian",
            fa: "Persian",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            es: "Spanish",
            sw: "Swahili",
            sv: "Swedish",
            tl: "Tagalog",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            vi: "Vietnamese",
            cy: "Welsh",
            yi: "Yiddish"
        }
    }, mejs.TrackFormatParser = {
        webvvt: {
            pattern_identifier: /^([a-zA-z]+-)?[0-9]+$/,
            pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
            parse: function (t) {
                var i = 0;
                t = mejs.TrackFormatParser.split2(t, /\r?\n/);
                for (var n, s, r = {
                    text: [],
                    times: []
                }; i < t.length; i++) if (this.pattern_identifier.exec(t[i]) && (i++, (n = this.pattern_timecode.exec(t[i])) && i < t.length)) {
                    for (i++, s = t[i], i++;
                    "" !== t[i] && i < t.length;) s = s + "\n" + t[i], i++;
                    s = e.trim(s).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), r.text.push(s), r.times.push({
                        start: 0 == mejs.Utility.convertSMPTEtoSeconds(n[1]) ? .2 : mejs.Utility.convertSMPTEtoSeconds(n[1]),
                        stop: mejs.Utility.convertSMPTEtoSeconds(n[3]),
                        settings: n[5]
                    })
                }
                return r
            }
        },
        dfxp: {
            parse: function (t) {
                t = e(t).filter("tt");
                var i = 0;
                i = t.children("div").eq(0);
                var n = i.find("p");
                i = t.find("#" + i.attr("style"));
                var s, r;
                if (t = {
                    text: [],
                    times: []
                }, i.length && (r = i.removeAttr("id").get(0).attributes, r.length)) for (s = {}, i = 0; i < r.length; i++) s[r[i].name.split(":")[1]] = r[i].value;
                for (i = 0; i < n.length; i++) {
                    var o;
                    if (r = {
                        start: null,
                        stop: null,
                        style: null
                    }, n.eq(i).attr("begin") && (r.start = mejs.Utility.convertSMPTEtoSeconds(n.eq(i).attr("begin"))), !r.start && n.eq(i - 1).attr("end") && (r.start = mejs.Utility.convertSMPTEtoSeconds(n.eq(i - 1).attr("end"))), n.eq(i).attr("end") && (r.stop = mejs.Utility.convertSMPTEtoSeconds(n.eq(i).attr("end"))), !r.stop && n.eq(i + 1).attr("begin") && (r.stop = mejs.Utility.convertSMPTEtoSeconds(n.eq(i + 1).attr("begin"))), s) {
                        o = "";
                        for (var a in s) o += a + ":" + s[a] + ";"
                    }
                    o && (r.style = o), 0 == r.start && (r.start = .2), t.times.push(r), r = e.trim(n.eq(i).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), t.text.push(r), 0 == t.times.start && (t.times.start = 2)
                }
                return t
            }
        },
        split2: function (e, t) {
            return e.split(t)
        }
    }, 3 != "x\n\ny".split(/\n/gi).length && (mejs.TrackFormatParser.split2 = function (e, t) {
        var i, n = [],
            s = "";
        for (i = 0; i < e.length; i++) s += e.substring(i, i + 1), t.test(s) && (n.push(s.replace(t, "")), s = "");
        return n.push(s), n
    })
}(mejs.$), function (e) {
    e.extend(mejs.MepDefaults, {
        contextMenuItems: [{
            render: function (e) {
                return "undefined" == typeof e.enterFullScreen ? null : mejs.i18n.t(e.isFullScreen ? "Turn off Fullscreen" : "Go Fullscreen")
            },
            click: function (e) {
                e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen()
            }
        }, {
            render: function (e) {
                return mejs.i18n.t(e.media.muted ? "Unmute" : "Mute")
            },
            click: function (e) {
                e.setMuted(e.media.muted ? !1 : !0)
            }
        }, {
            isSeparator: !0
        }, {
            render: function () {
                return mejs.i18n.t("Download Video")
            },
            click: function (e) {
                window.location.href = e.media.currentSrc
            }
        }]
    }), e.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function (t) {
            t.contextMenu = e('<div class="mejs-contextmenu"></div>').appendTo(e("body")).hide(), t.container.bind("contextmenu", function (e) {
                return t.isContextMenuEnabled ? (e.preventDefault(), t.renderContextMenu(e.clientX - 1, e.clientY - 1), !1) : void 0
            }), t.container.bind("click", function () {
                t.contextMenu.hide()
            }), t.contextMenu.bind("mouseleave", function () {
                t.startContextMenuTimer()
            })
        },
        cleancontextmenu: function (e) {
            e.contextMenu.remove()
        },
        isContextMenuEnabled: !0,
        enableContextMenu: function () {
            this.isContextMenuEnabled = !0
        },
        disableContextMenu: function () {
            this.isContextMenuEnabled = !1
        },
        contextMenuTimeout: null,
        startContextMenuTimer: function () {
            var e = this;
            e.killContextMenuTimer(), e.contextMenuTimer = setTimeout(function () {
                e.hideContextMenu(), e.killContextMenuTimer()
            }, 750)
        },
        killContextMenuTimer: function () {
            var e = this.contextMenuTimer;
            null != e && (clearTimeout(e), delete e)
        },
        hideContextMenu: function () {
            this.contextMenu.hide()
        },
        renderContextMenu: function (t, i) {
            for (var n = this, s = "", r = n.options.contextMenuItems, o = 0, a = r.length; a > o; o++) if (r[o].isSeparator) s += '<div class="mejs-contextmenu-separator"></div>';
            else {
                var l = r[o].render(n);
                null != l && (s += '<div class="mejs-contextmenu-item" data-itemindex="' + o + '" id="element-' + 1e6 * Math.random() + '">' + l + "</div>")
            }
            n.contextMenu.empty().append(e(s)).css({
                top: i,
                left: t
            }).show(), n.contextMenu.find(".mejs-contextmenu-item").each(function () {
                var t = e(this),
                    i = parseInt(t.data("itemindex"), 10),
                    s = n.options.contextMenuItems[i];
                "undefined" != typeof s.show && s.show(t, n), t.click(function () {
                    "undefined" != typeof s.click && s.click(n), n.contextMenu.hide()
                })
            }), setTimeout(function () {
                n.killControlsTimer("rev3")
            }, 100)
        }
    })
}(mejs.$), function (e) {
    e.extend(mejs.MepDefaults, {
        postrollCloseText: mejs.i18n.t("Close")
    }), e.extend(MediaElementPlayer.prototype, {
        buildpostroll: function (t, i, n) {
            var s = this.container.find('link[rel="postroll"]').attr("href");
            "undefined" != typeof s && (t.postroll = e('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + this.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(n).hide(), this.media.addEventListener("ended", function () {
                e.ajax({
                    dataType: "html",
                    url: s,
                    success: function (e) {
                        n.find(".mejs-postroll-layer-content").html(e)
                    }
                }), t.postroll.show()
            }, !1))
        }
    })
}(mejs.$), define("mediaelement", function () {}), define("infinity/controllers/CharactersController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "infinity/views/characters/CharactersView", "mout/function/bind", "mediaelement"], function (e, t, i, n) {
    var s = e.extend({
        view: i,
        index: null,
        initialize: function () {
            if (this._super(), this.view = new i, this.index = -1, this.onNextFeature(), $("#character-video-player").length) {
                {
                    $("#character-video-player").data("video-id")
                }
                new MediaElementPlayer("#character-video-player", {
                    plugins: ["flash"],
                    pluginPath: "/assets/",
                    flashName: "flashmediaelement.swf",
                    success: function (e) {
                        e.addEventListener("canplay", function () {
                            e.play()
                        })
                    },
                    startVolume: 0,
                    loop: !0
                })
            }
        },
        onNextFeature: function () {
            this.index++, this.index > $(".characters-featured").size() - 1 && (this.index = 0);
            var e = this;
            $(".characters-featured").each(function (i) {
                if (i == e.index) {
                    if ($(this).addClass("active"), $(this).prepend($(".sparkles")), !t.csstransitions || t.firefox) {
                        var n = $(this).find(".image"),
                            s = $(this).find(".text-block");
                        n.css({
                            opacity: 0,
                            marginLeft: 40
                        }), TweenLite.to(n, .6, {
                            css: {
                                opacity: 1,
                                marginLeft: 0
                            },
                            delay: .6
                        }), s.css({
                            opacity: 0,
                            marginLeft: -40
                        }), TweenLite.to(s, .6, {
                            css: {
                                opacity: 1,
                                marginLeft: 0
                            },
                            delay: .2
                        })
                    }
                } else $(this).removeClass("active")
            }), setTimeout(n(this.onNextFeature, this), 7e3)
        }
    });
    return s
}), define("mout/time/now", [], function () {
    var e = "function" == typeof Date.now ? Date.now : function () {
            return +new Date
        };
    return e
}), define("mout/function/throttle", ["../time/now"], function (e) {
    function t(t, i) {
        function n() {
            c = e(), o = null, a = t.apply(r, l)
        }
        function s() {
            return r = this, l = arguments, u = e(), h = i - (u - c), 0 >= h ? (clearTimeout(o), c = u, a = t.apply(r, l)) : o || (o = setTimeout(n, h)), a
        }
        var r, o, a, l, u, h, c = 0;
        return s
    }
    return t
}), define("mout/function/debounce", [], function () {
    function e(e, t, i) {
        function n() {
            function n() {
                i || (r = e.apply(a, o)), s = null
            }
            var o = arguments,
                a = this;
            return s ? clearTimeout(s) : i && (r = e.apply(a, o)), s = setTimeout(n, t), r
        }
        var s, r;
        return n
    }
    return e
}), define("infinity/views/ui/HorizontalScrollView", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind", "mout/function/throttle", "mout/function/debounce"], function (e, t, i, n) {
    var s = e.extend({
        $container: null,
        $indicators: null,
        dots: null,
        containerWidth: null,
        itemWidth: null,
        itemCount: null,
        pageIndex: null,
        breakPoint: 768,
        itemWidth: -1,
        itemHeight: -1,
        startX: null,
        lastX: null,
        startTime: null,
        carouselContainerWidth: null,
        initialize: function (e, t, s) {
            this._super(), this.$container = e, this.$container.addClass("animate-in-out"), this.$indicators = $('<div class="indicators">'), this.$prevArrow = $('<div class="arrow prev">'), this.$nextArrow = $('<div class="arrow next">'), this.$container.parent().append(this.$indicators), $("body").is(".characters") ? (this.$container.parent().append(this.$nextArrow), this.$container.parent().append(this.$prevArrow)) : (this.$container.parent().parent().append(this.$nextArrow), this.$container.parent().parent().append(this.$prevArrow)), this.index = s, this.dots = [], this.itemWidth = this.$container.hasClass("multiple-rows") ? this.$container.find(".slide").outerWidth() : this.$container.find(".tile").outerWidth(), this.itemHeight = this.$container.hasClass("multiple-rows") ? this.$container.find(".slide").outerHeight() : this.$container.outerHeight(), this.itemCount = this.$container.hasClass("multiple-rows") ? this.$container.find(".slide").length : this.$container.find(".tile").length, this.carouselContainerWidth = this.$container.parents(".module").outerWidth(), this.pageIndex = 0, this.containerWidth = this.itemWidth * this.itemCount, this.startX = 0, this.lastX = 0, $(window).resize(i(n(this.onResize, 10), this)), this.$container.swipe({
                click: i(this.onClick, this),
                swipeStatus: i(this.onSwipe, this),
                allowPageScroll: "auto",
                preventDefaultEvents: !1
            }), this.onResize(), this.onArrowClick()
        },
        move: function (e, i) {
            if (t.translate3d) {
                var n = "translate3d(" + e + "px, 0, 0 )";
                this.$container.get(0).style.webkitTransform = n, this.$container.get(0).style.mozTransform = n, this.$container.get(0).style.msTransform = n, this.$container.get(0).style.oTransform = n, this.$container.get(0).style.transform = n
            } else i ? this.$container.animate({
                left: e
            }, 300) : this.$container.css({
                left: e
            });
            this.lastX = e, this.updateDotMarker(), this.updateArrows()
        },
        onClick: function (e) {
            $(e.originalTarget).trigger("click")
        },
        onSwipe: function (e, i, n, s) {
            if ("start" == i) this.startX = this.lastX, this.startTime = (new Date).getTime(), this.$container.removeClass("animate-in-out");
            else if ("move" == i) {
                if (this.containerWidth < t.width) return;
                var r = this.startX;
                "left" == n ? r -= s : "right" == n && (r += s), r > 0 && (r = 0), r < -this.containerWidth + t.width && (r = -this.containerWidth + t.width), this.move(r, !1)
            } else if ("end" == i || "cancel" == i) {
                if ((new Date).getTime() - this.startTime < 400 && 5 > s) if (void 0 !== e.changedTouches) {
                    var o = Math.floor((-this.lastX + e.changedTouches[0].clientX) / this.containerWidth * this.itemCount);
                    $(e.target.children[o]).attr("href") && (window.location = $(e.target.children[o]).attr("href"))
                } else {
                    var o = Math.floor((-this.lastX + e.clientX) / this.containerWidth * this.itemCount);
                    $(e.target.children[o]).attr("href") && (window.location = $(e.target.children[o]).attr("href"))
                }
                this.$container.addClass("animate-in-out"), this.startX = this.lastX
            }
        },
        setupContainerCss: function () {
            this.$container.is(".full-width") && this.$container.find(".tile").width(t.width);
            var e = this.$container.find(".tile"),
                i = this,
                n = $.Deferred(),
                s = function () {
                    i.playsetHeight = i.$container.outerHeight(), i.containerWidth = i.itemWidth * i.itemCount, i.$container.is(".home, .community, .shop") ? (i.$container.is(".shop") ? i.$container.css("width", i.containerWidth + 30 + "px") : i.$container.css("width", i.containerWidth + "px"), setTimeout(function () {
                        i.playsetHeight = i.$container.parent().outerHeight(!0), i.$indicators.css("top", i.playsetHeight - 30)
                    }, 1e3)) : t.width > i.breakPoint ? (i.$container.css("width", "auto"), $("body").is(".characters, .profile") ? i.$container.css("display", "inline") : i.$container.css("display", "inline-block")) : (i.$container.css("width", i.containerWidth + "px"), $("body").is(".profile, .characters") && i.$container.css("display", "block"), setTimeout(function () {
                        i.playsetHeight = i.$container.outerHeight(), $("body").is(".profile") ? i.$container.siblings(".indicators").eq(i.index).css("top", (i.index + 1) * i.playsetHeight + 10) : i.$container.siblings(".indicators").eq(i.index).css("top", (i.index + 1) * i.playsetHeight + 70), $("body").is(".characters") ? (i.$nextArrow.css("top", (i.index + 1) * i.playsetHeight - 80), i.$prevArrow.css("top", (i.index + 1) * i.playsetHeight - 80)) : $("body").is(".profile") && (i.$nextArrow.css("top", (i.index + 1) * i.playsetHeight - 240), i.$prevArrow.css("top", (i.index + 1) * i.playsetHeight - 240))
                    }), i.$container.siblings(".indicators").eq(i.index).css("top", (i.index + 1) * (i.playsetHeight + 110))), $("body").is(".characters") && (i.$nextArrow.css("top", (i.index + 1) * i.playsetHeight - 80), i.$prevArrow.css("top", (i.index + 1) * i.playsetHeight - 80))
                },
                r = function (t) {
                    return setTimeout(function () {
                        i.itemWidth = e.outerWidth(!0), t.resolve()
                    }), t
                };
            this.$container.hasClass("multiple-rows") ? (this.itemWidth = this.$container.find(".slide").outerWidth(), s()) : r(n).then(s)
        },
        updateDots: function () {
            var e = this.$container.find(".tile"),
                n = "",
                s = "";
            if (dot = null, this.setupContainerCss(), t.width < this.breakPoint || this.$container.is(".home, .community, .shop")) {
                for (var r = 0; r < this.dots.length; r++) this.dots[r].remove();
                this.dots = [], t.width > this.breakPoint ? (n = "disable", s = "auto") : (n = "enable", s = "none");
                for (var r = 0; r < e.length; r++) e.eq(r).css({
                    pointerEvents: s
                });
                if (this.$container.swipe(n), this.getPageCount() < 2) return void this.$indicators.hide();
                this.$indicators.show(), this.updateArrows();
                for (var r = 0; r < this.getPageCount(); r++) dot = $('<div rel="' + r + '" class="dot">'), r == this.pageIndex && dot.addClass("selected"), dot.click(i(this.onDotClick, this)), this.$indicators.append(dot), this.dots.push(dot);
                this.$indicators.css({
                    marginLeft: -(22 * this.dots.length - 10) / 2
                })
            }
        },
        updateDotMarker: function () {
            this.pageIndex = -Math.floor(this.lastX / (this.getItemsPerPage() * this.itemWidth));
            for (var e = 0; e < this.dots.length; e++) e == this.pageIndex ? this.dots[e].addClass("selected") : this.dots[e].removeClass("selected")
        },
        updateArrows: function () {
            this.pageIndex - 1 >= 0 && t.width <= this.breakPoint ? this.$prevArrow.show() : $("body").is(".homepage, .download, .community, .shop") && this.pageIndex - 1 >= 0 ? this.$prevArrow.show() : this.$prevArrow.hide(), this.pageIndex + 1 < this.getPageCount() && t.width <= this.breakPoint ? this.$nextArrow.show() : $("body").is(".homepage, .download, .community, .shop") && this.pageIndex + 1 < this.getPageCount() ? this.$nextArrow.show() : this.$nextArrow.hide()
        },
        jumpToPage: function (e) {
            this.move(-e * this.getItemsPerPage() * this.itemWidth, !0), this.pageIndex = e
        },
        getPageCount: function () {
            return Math.ceil(this.itemCount / this.getItemsPerPage())
        },
        getItemsPerPage: function () {
            return $("body").hasClass("profile") && t.width <= 480 ? 1 : this.$container.is(".multiple-rows, .full-width") ? 1 : Math.max(Math.floor(this.$container.parent(".module").width() / this.itemWidth), 2)
        },
        reset: function () {
            this.pageIndex = 0
        },
        onDotClick: function (e) {
            this.jumpToPage(Number($(e.target).attr("rel"))), this.updateDots()
        },
        onArrowClick: function () {
            var e = this;
            this.$nextArrow.click(function () {
                e.onNextArrowClick()
            }), this.$prevArrow.click(function () {
                e.onPrevArrowClick()
            })
        },
        onNextArrowClick: function () {
            var e = this.pageIndex + 1;
            this.jumpToPage(e)
        },
        onPrevArrowClick: function () {
            var e = this.pageIndex - 1;
            this.jumpToPage(e)
        },
        onResize: function () {
            this.updateDots(), this.jumpToPage(0)
        }
    });
    return s
}), define("infinity/controllers/TilesController", ["suds/events/Dispatcher", "infinity/views/ui/HorizontalScrollView", "mout/function/bind"], function (e, t, i) {
    var n = function (e) {
            this.el = e, this.PANELNAME = this.el.data("panel-name"), this.el.on("click", ".tile", i(this.handleToolClick, this))
        };
    n.prototype.handleToolClick = function (e) {
        var t = $(e.currentTarget).index(),
            i = $("." + this.PANELNAME + ":eq(" + t + ")");
        i.addClass("open"), i.find(".back").click(function () {
            i.removeClass("open")
        })
    };
    var s = e.extend({
        initialize: function () {
            for (var e = $(".playset-group"), i = $(".gadget-group"), s = $(".toys_and_tools-group"), r = null, o = 0; o < e.length; o++) itemHeight = e.eq(o).outerHeight(), r = $("body").is(".characters, .profile") ? new t(e.eq(o), (o + 1) * itemHeight, o) : new t(e.eq(o), itemHeight + 60, o);
            for (var o = 0; o < i.length; o++) r = new t(i.eq(o), 202 * (o + 1) + 100, o);
            for (var o = 0; o < s.length; o++) new n(s.eq(o))
        }
    });
    return s
}), define("suds/helpers/MouseHelper", ["suds/events/Dispatcher", "suds/events/Interval"], function (e, t) {
    var i = {},
        n = new e,
        s = -1,
        r = -1,
        o = !1,
        a = null;
    i.x = -1, i.y = -1, i.startTracking = function () {
        o || (window.addEventListener("mousemove", l, !1), o = !0)
    }, i.stopTracking = function () {
        window.removeEventListener("mousemove", l, !1), i.x = -1, i.y = -1, o = !1
    }, i.addListener = function (e, s) {
        e === i.MOUSE_MOVE && (i.startTracking(), t.addListener(t.FRAME, u)), n.addListener(e, s)
    }, i.removeListener = function (e, s) {
        n.removeListener(e, s), n.hasListenerFor(i.MOUSE_MOVE) || t.removeListener(t.FRAME, u)
    };
    var l = function (e) {
            i.x = e.pageX, i.y = e.pageY, a = e
        },
        u = function (e) {
            (i.x !== s || i.y !== r) && n.dispatch(i.MOUSE_MOVE, e), s = i.x, r = i.y
        };
    return i.MOUSE_MOVE = "MouseHelper.MOUSE_MOVE", i
}), define("suds/math/Point", ["suds/oop/Class"], function (e) {
    var t = e.extend({
        x: 0,
        y: 0,
        initialize: function (e, t) {
            this.x = e || 0, this.y = t || 0
        },
        add: function (e) {
            return this.x += e.x, this.y += e.y, this
        },
        subtract: function (e) {
            return this.x -= e.x, this.y -= e.y, this
        },
        multiply: function (e) {
            return this.x *= e, this.y *= e, this
        },
        divide: function (e) {
            return this.x /= e, this.y /= e, this
        },
        clone: function () {
            return new t(this.x, this.y)
        },
        length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        normalize: function () {
            return this.divide(this.length())
        },
        set: function (e) {
            return this.x = e.x, this.y = e.y, this
        },
        toPolar: function () {
            return {
                angle: Math.atan(this.y / this.x),
                radius: this.length()
            }
        },
        rotate: function (e) {
            var t = Math.cos(e),
                i = Math.sin(e),
                n = this.x * t - this.y * i,
                s = this.y * t + this.x * i;
            return this.x = n, this.y = s, this
        },
        flip: function () {
            return this.x = -this.x, this.y = -this.y, this
        }
    });
    return t.subtract = function (e, t) {
        return e.clone().subtract(t)
    }, t.add = function (e, t) {
        return e.clone().add(t)
    }, t.distance = function (e, t) {
        var i = e.x - t.x,
            n = e.y - t.y;
        return Math.sqrt(i * i + n * n)
    }, t.between = function (e, i) {
        return new t(i.x - e.x, i.y - e.y)
    }, t.angle = function (e, t) {
        return Math.acos((e.x * t.x + e.y * t.y) / (e.length() * t.length()))
    }, t
}), define("suds/math/Bezier", ["suds/oop/Class", "suds/math/Point"], function (e, t) {
    var i = e.extend({
        anchors: null,
        time: 0,
        speed: .1,
        pixels: null,
        x: null,
        y: null,
        pixelBased: !1,
        initialize: function (e, t, i) {
            this.anchors = [], this.pixelBased = "undefined" == typeof t ? !1 : !! t, this.accuracy = "undefined" == typeof i ? 10 : i, this.time = 0, this.speed = e || .1, this.pixels = this.speed
        },
        addAnchor: function (e) {
            if (this.anchors.push(e), this.pixelBased) {
                for (var i, n, s = this.time, r = 0, o = this.accuracy, a = 0; o > r; r++) this.time = r / o, this.calculate(), 0 !== r ? (n = i, n = new t(this.x, this.y), a += t.distance(i, n)) : i = new t(this.x, this.y);
                this.time = s, this.speed = Math.min(1, this.pixels / a)
            }
        },
        update: function () {
            this.time += this.speed, this.time > 1 && (this.time = 1), this.calculate()
        },
        calculate: function () {
            var e, t, i = this.time,
                n = this.anchors.length,
                s = [];
            for (e = 0; n > e; e++) s[e] = {
                x: this.anchors[e].x,
                y: this.anchors[e].y
            };
            for (t = 1; n > t; ++t) for (e = 0; n - t > e; ++e) s[e].x = (1 - i) * s[e].x + i * s[~~ (e + 1)].x, s[e].y = (1 - i) * s[e].y + i * s[~~ (e + 1)].y;
            this.x = s[0].x, this.y = s[0].y
        },
        isComplete: function () {
            return this.time >= 1
        },
        setPercent: function (e) {
            this.time = e, this.calculate()
        }
    });
    return i
}), define("suds/motion/Motion", ["suds/oop/Class", "suds/math/Point", "suds/math/Bezier"], function (e, t, i) {
    var n = e.extend({
        pointA: null,
        pointB: null,
        pointC: null,
        pointAB: null,
        pointBC: null,
        speed: .1,
        radius: 10,
        initialize: function (e, t, n) {
            this.radius = e || this.radius, this.speed = t || this.speed, this.accuracy = n || 10, this.bezier = new i(this.speed, !0, this.accuracy), this.pointA = this.getRandomPoint(), this.pointB = this.getRandomPoint(), this.pointC = this.getRandomPoint(), this.pointAB = this.getMiddle(this.pointA, this.pointB), this.pointBC = this.getMiddle(this.pointB, this.pointC), this.bezier.addAnchor(this.pointAB), this.bezier.addAnchor(this.pointB), this.bezier.addAnchor(this.pointBC)
        },
        update: function () {
            return this.bezier.isComplete() ? (this.bezier = new i(this.speed, !0, this.accuracy), this.bezier.addAnchor(this.pointBC), this.bezier.addAnchor(this.pointC), this.pointA = this.pointB, this.pointB = this.pointC, this.pointC = this.getRandomPoint(), this.pointAB = this.pointBC, this.pointBC = this.getMiddle(this.pointB, this.pointC), this.bezier.addAnchor(this.pointBC), this.bezier.calculate(), void 0) : void this.bezier.update()
        },
        getRandomPoint: function () {
            var e = Math.random() * Math.PI * 2;
            return new t(Math.cos(e) * (.1 + .9 * Math.random()) * this.radius, Math.sin(e) * (.1 + .9 * Math.random()) * this.radius)
        },
        getMiddle: function (e, i) {
            return t.add(e, i).divide(2)
        },
        getX: function () {
            return this.bezier.x
        },
        getY: function () {
            return this.bezier.y
        },
        getPosition: function () {
            return new t(this.bezier.x, this.bezier.y)
        }
    });
    return n
}), define("infinity/views/effects/sparkles/SparkleView", ["suds/views/View", "suds/helpers/BrowserHelper", "suds/motion/Motion", "suds/events/Interval"], function (e, t, i, n) {
    var s = e.extend({
        motion: null,
        updateCallback: null,
        count: null,
        scale: null,
        initialize: function (e, t) {
            this._super(), this.updateCallback = this.onUpdate.bind(this), this.originX = e, this.originY = t, this.motion = new i(50, 10, 30), this.initStyle(e, t), this.twinkle(), this.count = 0, n.addListener(n.FRAME, this.updateCallback)
        },
        initStyle: function (e, i) {
            var n = ["twinkle1", "twinkle2", "twinkle3"][~~ (3 * Math.random())];
            this.element.addClass("sparkle " + n), this.element.css({
                top: i,
                left: e
            }), t.ie9 && (this.scale = .2 + .8 * Math.random(), this.element.css({
                top: i + 20,
                left: e - 20
            }))
        },
        twinkle: function () {
            setTimeout(this.dispose.bind(this), 1e3)
        },
        onUpdate: function () {
            this.motion && this.motion.update(), this.element.css({
                top: this.originY + this.motion.getY(),
                left: this.originX + this.motion.getX()
            }), t.ie9 && (this.element.css({
                top: this.originY + this.motion.getY() + 20,
                left: this.originX + this.motion.getX() - 20
            }), this.count += 1, this.element.css({
                "-ms-transform": "rotate(" + 6 * this.count + "deg) scale(" + this.scale + "," + this.scale + ")",
                opacity: 1 - this.count / 40
            }))
        },
        dispose: function () {
            n.removeListener(n.FRAME, this.updateCallback), this.parent.removeView(this), this.motion = null
        }
    });
    return s
}), define("infinity/views/effects/sparkles/SparklesView", ["suds/views/View", "suds/helpers/MouseHelper", "suds/math/Point", "infinity/views/effects/sparkles/SparkleView", "mout/function/bind"], function (e, t, i, n, s) {
    var r = e.extend({
        point: null,
        initial: !0,
        initialize: function () {
            this._super($('<div class="sparkles">')), this.point = new i(0, 0), t.addListener(t.MOUSE_MOVE, s(this.onMouseMove, this))
        },
        onMouseMove: function () {
            if (this.initial) {
                this.initial = !1;
                var e = this.element.offset();
                this.offsetX = e.left, this.offsetY = e.top
            }
            for (var e, s = new i(t.x - this.offsetX, t.y - this.offsetY), r = i.distance(s, this.point), o = ~~Math.max(1, r / 20), a = i.between(this.point, s), l = 0; o > l; l++) e = a.clone().divide(o).multiply(l).add(this.point), this.appendView(new n(e.x, e.y - 40));
            this.point = s
        }
    });
    return r
}), define("mout/math/lerp", [], function () {
    function e(e, t, i) {
        return t + (i - t) * e
    }
    return e
}), define("infinity/controllers/EffectsController", ["infinity/views/effects/sparkles/SparklesView", "suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind", "mout/function/debounce", "mout/math/lerp"], function (e, t, i, n, s, r) {
    var o = t.extend({
        sparkles: null,
        characterHeroImageHeight: 770,
        playsetBackgroundImageHeight: 290,
        playsetBackgroundImageMaxOffset: 196,
        characterHeroImage: null,
        playsetBackgroundImage: null,
        playsetBackgroundImageTop: null,
        scrollTop: null,
        chromeNav: null,
        initialize: function () {
            this._super(), this.chromeNav = $("body.en-us").length > 0, $(".sparkles-container").length > 0 && this.initSparkles()
        },
        initSparkles: function () {
            this.sparkles = new e, $(".sparkles-container").prepend(this.sparkles.element)
        },
        initParallax: function () {
            this.characterHeroImage = $(".character-hero-module .image"), this.playsetBackgroundImage = $(".playsets-module-background .image"), this.playsetBackgroundImageTop = this.playsetBackgroundImage.offset().top, $(window).scroll(n(this.onScroll, this)), $(window).resize(s(n(this.onResize, this), 300))
        },
        onScroll: function () {
            if (this.scrollTop = Math.max($(window).scrollTop(), 0), this.playsetBackgroundImage && this.scrollTop + i.height > this.playsetBackgroundImageTop && this.scrollTop < this.playsetBackgroundImageTop + this.playsetBackgroundImageHeight) {
                var e = (this.scrollTop + i.height - this.playsetBackgroundImageTop) / (i.height + this.playsetBackgroundImageHeight),
                    t = r(e, -this.playsetBackgroundImageMaxOffset, 0);
                this.playsetBackgroundImage.css({
                    backgroundPosition: "center " + t + "px"
                })
            }
            this.characterHeroImage && this.scrollTop < this.characterHeroImageHeight && this.characterHeroImage.css({
                backgroundPosition: "0 " + this.scrollTop / 3 + "px"
            })
        },
        onResize: function () {
            this.playsetBackgroundImageTop = this.playsetBackgroundImage.offset().top
        }
    });
    return o
}), define("infinity/controllers/BuyController", ["suds/events/Dispatcher", "mout/function/bind"], function (e, t) {
    var i = e.extend({
        initialize: function () {
            this._super(), $(".buy-button").click(t(this.onBuyClick, this)), $("#buy-modal .close-button").click(t(this.onCloseClick, this)), $("#buy-modal .screen").click(t(this.onCloseClick, this)), $(window).on("hashchange", t(this.onHashChange, this)), this.onHashChange()
        },
        createGooglePixel: function () {
            new Image(1, 1).src = "https://www.googleadservices.com/pagead/conversion/1004508262/?value=0&amp;label=yFB7CPqNlQQQ5qj-3gM&amp;guid=ON&amp;script=0"
        },
        openModal: function () {
            $("#buy-modal").show(), $("html, body").animate({
                scrollTop: 0
            }, "slow")
        },
        closeModal: function () {
            $("#buy-modal").hide()
        },
        onHashChange: function () {
            var e = window.location.hash.substr(1);
            "buy" == e || "order" == e ? this.openModal() : "preorder" == e || "pre-order" == e ? window.location.hash = "#order" : this.closeModal()
        },
        onBuyClick: function (e) {
            window.location.hash = "order", e.preventDefault()
        },
        onCloseClick: function (e) {
            window.location.hash = "", e.preventDefault()
        }
    });
    return i
}), define("suds/events/dispatcher", ["suds/oop/Class"], function (e) {
    var t = e.extend({
        listeners: null,
        initialize: function () {
            this.listeners = []
        },
        addListener: function (e, t) {
            this.removeListener(e, t), this.listeners.push({
                name: e,
                closure: t
            })
        },
        removeListener: function (e, t) {
            for (var i, n = 0, s = this.listeners.length; s > n; n++) i = this.listeners[n], i.name === e && i.closure === t && (this.listeners.splice(n, 1), n--, s--)
        },
        dispatch: function (e, t) {
            for (var i, n = 0, s = this.listeners.length; s > n; n++) i = this.listeners[n], i && i.name === e && i.closure.call(null, t)
        },
        hasListenerFor: function (e) {
            for (var t = 0, i = this.listeners.length; i > t; t++) if (this.listeners[t].name === e) return !0;
            return !1
        },
        hasListeners: function () {
            return this.listeners.length > 0
        },
        removeAllListeners: function () {
            this.listeners = []
        },
        removeListenerFor: function (e) {
            for (var t, i = 0, n = this.listeners.length; n > i; i++) t = this.listeners[i], t.name === e && (this.listeners.splice(i, 1), i--, n--)
        }
    });
    return t
}), define("suds/loaders/ImageLoaderQueue", ["suds/events/dispatcher"], function (e) {
    var t = e.extend({
        lock: null,
        queue: null,
        cache: null,
        loaded: null,
        initialize: function () {
            this._super(), this.lock = !1, this.queue = [], this.cache = {}, this.loaded = 0
        },
        onLoaded: function () {
            this.loaded++, this.loaded === this.queue.length ? this.dispatch(t.COMPLETE) : this.dispatch(t.PROGRESS, this.loaded / this.queue.length)
        },
        onError: function () {
            this.dispatch(t.ERROR)
        },
        add: function (e) {
            if (this.lock) throw new Error("Queue started loading. No Items can be added");
            this.queue.push(e)
        },
        get: function (e) {
            if (!this.lock) throw new Error("Queue hasn't loaded");
            return this.cache[e]
        },
        load: function () {
            this.lock = !0;
            for (var e, t = 0, i = this.queue.length; i > t; t++) {
                var n = this.queue[t];
                e = new Image, e.onload = this.onLoaded.bind(this), e.onerror = this.onError.bind(this), e.src = n, this.cache[n] = e
            }
        }
    });
    return t.PROGRESS = "progress", t.COMPLETE = "complete", t.ERROR = "error", t
}), define("mout/function/partial", [], function () {
    function e(e, t) {
        return Array.prototype.slice.call(e, t || 0)
    }
    function t(t) {
        var i = e(arguments, 1);
        return function () {
            return t.apply(this, i.concat(e(arguments)))
        }
    }
    return t
}), define("mout/array/forEach", [], function () {
    function e(e, t, i) {
        if (null != e) for (var n = -1, s = e.length; ++n < s && t.call(i, e[n], n, e) !== !1;);
    }
    return e
}), define("mout/array/map", ["./forEach"], function (e) {
    function t(t, i, n) {
        var s = [];
        return null == t ? s : (e(t, function (e, t, r) {
            s[t] = i.call(n, e, t, r)
        }), s)
    }
    return t
}), define("mout/math/countSteps", [], function () {
    function e(e, t, i) {
        return e = Math.floor(e / t), i ? e % i : e
    }
    return e
}), define("infinity/views/ui/PreloaderView", ["suds/views/View", "mout/function/bind"], function (e) {
    var t = e.extend({
        gray: null,
        color: null,
        value: null,
        initialize: function () {
            this._super(), this.gray = $("<div>"), this.gray.addClass("preloader-gray"), this.gray.addClass("animate-out"), this.color = $("<div>"), this.color.addClass("preloader-color"), this.element.addClass("animate-out"), this.element.attr("id", "preloader"), this.element.append(this.color), this.element.append(this.gray)
        },
        perc: function (e) {
            return this.value = e, this.gray.height(100 - 100 * this.value), this.value >= 1 ? void this.dispatch("complete") : void 0
        },
        animateIn: function () {
            this.element.css({
                opacity: 1
            })
        },
        animateOut: function () {
            this.element.css({
                opacity: 0
            })
        }
    });
    return t
}), define("infinity/views/gallery/GalleryView", ["suds/views/View", "suds/helpers/BrowserHelper", "suds/loaders/ImageLoaderQueue", "mout/function/bind", "mout/function/partial", "mout/array/map", "mout/array/forEach", "mout/function/throttle", "mout/function/debounce", "mout/math/countSteps", "infinity/views/ui/PreloaderView", "tween"], function (e, t, i, n, s, r, o, a, l, u, h, c) {
    var d = e.extend({
        ratio: null,
        height: null,
        images: null,
        index: 0,
        thumbIndex: 0,
        amount: 0,
        showAmount: 1,
        preloader: null,
        imageLoader: null,
        IMAGE_WIDTH: 1200,
        IMAGE_HEIGHT: 600,
        initialize: function (e) {
            this._super($(e));
            var s = this;
            this.ratio = this.IMAGE_HEIGHT / this.IMAGE_WIDTH, this.height = ~~ (t.width * this.ratio), this.images = r(this.element.find(".gallery-image"), function (e) {
                return e
            }), this.element.height(this.height), this.imageLoader = new i, o(this.images, function (e, t, i) {
                var n = i[t].getAttribute("src");
                s.imageLoader.add(n)
            }), this.imageLoader.addListener(i.PROGRESS, n(this.onImagesProgress, this)), this.imageLoader.addListener(i.COMPLETE, n(this.onImagesComplete, this)), this.element.find(".images-holder").hide(), this.element.find(".left").hide(), this.element.find(".right").hide(), this.element.find(".controlls-bottom").css({
                marginTop: 0
            }), this.preloader = new h, this.preloader.element.css({
                opacity: 0,
                left: "50%",
                top: this.height / 2
            }), this.preloader.animateIn(), this.appendView(this.preloader), this.imageLoader.load()
        },
        onImagesProgress: function (e) {
            this.preloader.perc(e)
        },
        onImagesComplete: function () {
            this.preloader.perc(1), setTimeout(n(this.preloaderOut, this), 500), setTimeout(n(this.initGallery, this), 1e3)
        },
        preloaderOut: function () {
            this.preloader.animateOut()
        },
        initGallery: function () {
            this.removeView(this.preloader), this.element.find(".images-holder").show(), this.element.find(".left").fadeIn(), this.element.find(".right").fadeIn(), this.element.find(".controlls-bottom").css({
                marginTop: 13
            }), this.setSize(), this.createThumbs(), this.setMobileButtons(), $(window).resize(l(n(this.setSize, this), 200)), $(window).resize(l(n(this.setButtons, this), 200)), $(window).resize(a(n(this.setThumbsHolder, this, this.thumbIndex), 200))
        },
        setSize: function () {
            this.element.height(t.width > 768 ? ~~ (t.width * this.ratio) + 177 : ~~ (t.width * this.ratio)), this.element.find(".images-holder").height(~~ (t.width * this.ratio))
        },
        createThumbs: function () {
            var e, t, i, r = this,
                o = this.element.find(".thumbs"),
                a = this.element.find(".controlls-bottom .left"),
                l = this.element.find(".controlls-bottom .right"),
                u = 0;
            this.element.find(".gallery-image").each(function (n) {
                0 == n ? $(this).css({
                    opacity: 0
                }).animate({
                    opacity: 1
                }) : $(this).hide();
                var a = this.getAttribute("src");
                e = new Image, e.src = a, e.height = 150, e.style.left = ~~ (75 - 150 * r.inverseRatio * .5) + "px", e.style.opacity = 0, $(e).delay(300 * n).animate({
                    opacity: 1
                }, 300), i = $("<div>"), i.addClass("gallery-thumb-wrapper"), i.append(e), i.on("click", s(r.onImageClick, r, n)), 0 === n && i.addClass("selected"), t = $("<div>"), t.addClass("gallery-thumb"), t.append(i), o.append(t), u++
            }), r.setButtons(), r.amount = u, a.addClass("animate-out"), l.addClass("animate-out"), a.on("click", n(r.onLeftClick, r)), l.on("click", n(r.onRightClick, r))
        },
        onImageClick: function (e, t) {
            for (var i, n, s = 0, r = e.images.length; r > s; s++) i = e.images[s], n = $(i), e.createTween(i, 100 * -t + 100 * s, s);
            e.element.find(".gallery-thumb-wrapper").removeClass("selected"), $(this).addClass("selected"), e.index = t
        },
        createTween: function (e, t, i) {
            var n = 100 * i - 100 * this.index;
            $(e).show();
            new c.Tween({
                left: n
            }).to({
                left: t
            }, 800).easing(c.Easing.Cubic.InOut).onUpdate(function () {
                e.style.left = ~~this.left + "%"
            }).onComplete(function () {
                0 != t ? $(e).hide() : $(e).show()
            }).start()
        },
        setButtons: function () {
            var e = 166,
                i = 0,
                n = this.element.find(".gallery-image").length,
                s = this.element.find(".thumbs-holder"),
                r = this.element.find(".thumbs"),
                o = this.element.find(".controlls-bottom .left"),
                a = this.element.find(".controlls-bottom .right"),
                l = Math.min(t.width - 200, n * e + 1);
            this.showAmount = u(l, e), l = this.showAmount * e, s.width(l), r.width(n * e);
            var h = t.width / 2,
                c = l / 2;
            o.css("left", h - c - i - 100), a.css("right", h - c - i - 100)
        },
        onLeftClick: function () {
            this.setThumbsHolder(this.thumbIndex - 1)
        },
        onRightClick: function () {
            this.setThumbsHolder(this.thumbIndex + 1)
        },
        setThumbsHolder: function (e) {
            var t = this,
                i = this.element.find(".thumbs");
            0 > e ? e = 0 : e > t.amount - this.showAmount && (e = t.amount - this.showAmount), new c.Tween({
                left: 166 * -t.thumbIndex
            }).to({
                left: 166 * -e
            }, 200).easing(c.Easing.Cubic.InOut).onUpdate(function () {
                i[0].style.left = this.left + "px"
            }).start(), this.thumbIndex = e
        },
        setMobileButtons: function () {
            var e = this.element.find(".mobile-controlls .right"),
                t = this.element.find(".mobile-controlls .left");
            e.addClass("animate-out"), t.addClass("animate-out"), e.on("click", n(this.onMobileRight, this)), t.on("click", n(this.onMobileLeft, this))
        },
        onMobileLeft: function () {
            this.fakeClick(this.index - 1)
        },
        onMobileRight: function () {
            this.fakeClick(this.index + 1)
        },
        fakeClick: function (e) {
            e > this.amount - 1 ? e = amount - 1 : 0 > e && (e = 0);
            var t = this.element.find(".gallery-thumb"),
                i = $(t[e]).children()[0];
            $(i).click(), this.index = e
        }
    });
    return d
}), define("infinity/controllers/GalleriesController", ["suds/events/Dispatcher", "infinity/views/gallery/GalleryView", "tween"], function (e, t) {
    var i = e.extend({
        initialize: function () {
            var e = this;
            e._super(), $(".gallery-module").each(function () {
                new t(this)
            })
        }
    });
    return i
}), define("infinity/views/ui/CarouselView", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind", "mout/function/debounce"], function (e, t, i, n) {
    var s = e.extend({
        $homeContainer: null,
        rotator: null,
        videoContainer: null,
        video: null,
        current: -1,
        carouselTimeout: null,
        chromeNav: null,
        $slides: null,
        SLIDE_AMOUNT: 2,
        LOOP_SPEED: 7e3,
        MIN_HEIGHT: 430,
        MAX_HEIGHT: 800,
        initialize: function (e) {
            this._super(), this.$homeContainer = e, this.chromeNav = $("body.en-us").length > 0, t.ie9 && $(".video-container").find("video").width("100%"), this.rotator = this.$homeContainer.find(".video-background-rotator"), this.rotator.length > 0 && this.setup()
        },
        setup: function () {
            this.$slides = this.$homeContainer.find(".carousel"), this.SLIDE_AMOUNT = this.$slides.size(), this.videoContainer = this.$homeContainer.find(".video-container"), this.video = this.$homeContainer.find(".home-video")[0], this.video.addEventListener("canplaythrough", i(this.onCanPlayThrough, this)), this.video.addEventListener("ended", i(this.onVideoEnd, this));
            var e = this;
            this.rotator.find(".indicator").each(function (t) {
                $(this).attr("rel", t), $(this).click(i(e.onIndicatorClick, e))
            }), $(window).resize(n(i(this.onResize, this), 100)), this.init()
        },
        init: function () {
            this.onResize(), this.loop()
        },
        onVideoEnd: function () {
            this.video.currentTime = 0, this.video.play()
        },
        onCanPlayThrough: function () {
            this.video.play()
        },
        onResize: function () {
            if (t.width < 768) return this.$homeContainer.height(this.MIN_HEIGHT), this.rotator.height(this.MIN_HEIGHT), this.videoContainer.height(this.MIN_HEIGHT), void 0;
            var e = t.width / 1280 * 720;
            e = Math.min(t.height - 270 - (this.chromeNav ? 40 : 0), e), e = Math.max(this.MIN_HEIGHT, e), this.$homeContainer.height(e), this.rotator.height(e), this.videoContainer.height(e)
        },
        onIndicatorClick: function (e) {
            var t = this;
            this.rotator.find(".indicator").each(function (i) {
                $(this).attr("rel") == $(e.target).attr("rel") && (t.current = i - 1, t.loop())
            })
        },
        loop: function (e) {
            this.current = ++this.current % this.SLIDE_AMOUNT, e >= 0 && (this.current = e), this.rotator.find(".carousel").css("display", "none"), $(this.$slides[this.current]).css("display", "block");
            var t = this;
            this.rotator.find(".indicator").each(function (e) {
                t.current == e ? $(this).addClass("selected") : $(this).removeClass("selected")
            }), e >= 0 || (this.carouselTimeout && clearTimeout(this.carouselTimeout), this.carouselTimeout = setTimeout(i(this.loop, this), this.LOOP_SPEED))
        }
    });
    return s
}), define("infinity/controllers/CarouselController", ["suds/events/Dispatcher", "infinity/views/ui/CarouselView", "suds/helpers/BrowserHelper", "mout/function/bind", "mout/function/debounce"], function (e, t) {
    var i = e.extend({
        initialize: function () {
            for (var e = $(".home-container"), i = null, n = 0; n < e.length; n++) i = new t(e.eq(n), n)
        }
    });
    return i
}), define("infinity/controllers/PlaySetsController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind"], function (e, t) {
    var i = e.extend({
        initialize: function () {
            this._super(), $(".playset-module-container").length > 0 && this.init()
        },
        init: function () {
            var e = this;
            $(".playset-module-container").each(function () {
                $(this).hover(e.onHover), $(this).find(".background").addClass("animated")
            })
        },
        onHover: function (e) {
            switch (e.type) {
            case "mouseenter":
                t.csstransitions ? ($(this).find(".background").addClass("fadeInLeft"), $(this).find(".background").removeClass("fadeOutRight")) : TweenLite.to($(this).find(".background"), .4, {
                    opacity: 1
                });
                break;
            case "mouseleave":
                t.csstransitions ? ($(this).find(".background").removeClass("fadeInLeft"), $(this).find(".background").addClass("fadeOutRight")) : TweenLite.to($(this).find(".background"), .4, {
                    opacity: 0
                })
            }
        }
    });
    return i
}), define("infinity/controllers/ToyController", ["suds/events/Dispatcher", "suds/events/Interval", "suds/helpers/BrowserHelper", "suds/helpers/MouseHelper", "mout/function/bind", "mout/math/lerp"], function (e, t, i, n, s, r) {
    var o = e.extend({
        image: null,
        sprite: null,
        scale: null,
        displayWidth: null,
        displayHeight: null,
        currentFrame: null,
        targetFrame: null,
        totalFrames: null,
        centerX: null,
        captureWidth: null,
        idleCount: null,
        idleCountMax: null,
        autoRotateCount: null,
        label: null,
        touchStartX: null,
        touchStartFrame: null,
        rotateCount: null,
        rotateCountMax: null,
        stopCount: null,
        stopCountMax: null,
        params: null,
        spriteImageURL: null,
        initialize: function (e, t, i) {
            this._super(), $(".toy-module .toy").length > 0 && (this.params = {
                f: e,
                c: t,
                r: i
            }, this.spriteImageURL = $(".toy-module .toy").css("background-image").replace(/^url\(["']?/, "").replace(/["']?\)$/, ""), $(".toy-module .toy").css("background-image", ""), this.image = new Image, this.image.onload = s(this.onLoaded, this), this.image.src = this.spriteImageURL)
        },
        onLoaded: function () {
            this.init(this.params.f, this.params.c, this.params.r)
        },
        init: function (e, r, o) {
            this.sprite = $(".toy-module .toy.sprite"), this.scale = .8, this.totalFrames = null == e ? 40 : e, this.spriteColumns = null == r ? 8 : r, this.spriteRows = null == o ? 5 : o;
            var a = this.sprite.css("background-size").split(" ");
            this.displayWidth = parseInt(a[0].replace("px", "")) / this.spriteColumns * this.scale, this.displayHeight = parseInt(a[1].replace("px", "")) / this.spriteRows * this.scale, this.captureWidth = 300, this.idleCountMax = 90, this.rotateCountMax = 2, this.stopCountMax = 500, this.currentFrame = 0, this.targetFrame = 0, this.stopCount = 0, this.rotateCount = 0, this.idleCount = 0, this.autoRotateCount = 0, this.currentFrame = this.targetFrame = 0, this.sprite.css({
                width: this.displayWidth,
                height: this.displayHeight,
                backgroundSize: this.displayWidth * this.spriteColumns + "px " + this.displayHeight * this.spriteRows + "px"
            }), $(".toy-module .toy").css("background-image", "url(" + this.spriteImageURL + ")"), $(".toy-module .toy").animate({
                opacity: 1
            }), i.width > 1100 ? this.centerX = (i.width - 1100) / 2 + this.displayWidth / 2 + parseInt(this.sprite.css("margin-left").replace("px", "")) : i.width < 768 && (this.centerX = i.width / 2), t.addListener(t.FRAME, s(this.onFrame, this)), n.addListener(n.MOUSE_MOVE, s(this.onMouseMove, this)), $(".toy-module").swipe({
                swipeStatus: s(this.onSwipe, this),
                allowPageScroll: "auto",
                preventDefaultEvents: !1
            })
        },
        onFrame: function () {
            if (i.width >= 768 && (this.idleCount++, this.autoRotateCount++, this.sprite.css("margin-left", "auto")), this.idleCount >= this.idleCountMax && this.autoRotateCount > 1) {
                if (this.rotateCount > this.rotateCountMax) return this.stopCount++, void(this.stopCount > this.stopCountMax && (this.rotateCount = 1, this.stopCount = 0));
                this.targetFrame <= 0 ? (this.rotateCount++, this.targetFrame = this.currentFrame = this.totalFrames - 1) : this.targetFrame = this.currentFrame = this.targetFrame - 1, this.autoRotateCount = 0, this.currentFrame = this.targetFrame
            } else this.currentFrame += (this.targetFrame - this.currentFrame) / 8;
            this.setFrame(Math.floor(this.currentFrame))
        },
        onMouseMove: function () {
            null == this.touchStartX && n.x < this.centerX + this.captureWidth / 2 && n.x > this.centerX - this.captureWidth / 2 && n.y > this.sprite.offset().top && n.y < this.sprite.offset().top + this.sprite.height() ? (this.targetFrame = r(Math.floor((n.x - this.centerX + this.captureWidth / 2) / this.captureWidth * this.totalFrames) / this.totalFrames, 10, -10), this.targetFrame < 0 ? this.targetFrame = this.currentFrame = this.totalFrames + this.targetFrame : this.currentFrame = this.targetFrame, this.idleCount = 0) : this.idleCount < this.idleCountMax && (n.x < this.centerX && n.y > this.sprite.offset().top && n.y < this.sprite.offset().top + this.sprite.height() ? (this.targetFrame = this.totalFrames, this.rotateCount = 1) : n.y > this.sprite.offset().top && n.y < this.sprite.offset().top + this.sprite.height() && (this.targetFrame = 0, this.rotateCount = 0))
        },
        onSwipe: function (e, t, n, s) {
            if ("start" == t && (this.touchStartX = e.pageX, this.touchStartFrame = this.targetFrame), "move" == t) if ("right" == n) {
                var r = this.touchStartFrame - s / i.width * this.totalFrames;
                0 > r && (r += this.totalFrames - 1), this.targetFrame = this.currentFrame = r
            } else if ("left" == n) {
                var r = this.touchStartFrame + s / i.width * this.totalFrames;
                r >= this.totalFrames - 1 && (r -= this.totalFrames - 1), this.targetFrame = this.currentFrame = r
            }("end" == t || "cancel" == t) && (this.touchStartX = null, this.touchStartFrame = null), this.idleCount = 0
        },
        setFrame: function (e) {
            var t = e % this.spriteColumns,
                i = Math.floor(e / this.totalFrames * this.spriteRows);
            this.sprite.css({
                backgroundPosition: -this.displayWidth * t + "px " + -this.displayHeight * i + "px"
            })
        }
    });
    return o
}), define("infinity/controllers/CountrySelectorController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind"], function (e, t, i) {
    var n = e.extend({
        selected: "us",
        initialize: function () {
            this._super(), $("#country-selector select").change(i(this.onChange, this)), t.firefox && $("#country-selector select").css({
                paddingTop: 9,
                overflow: "hidden",
                width: 217
            }), t.ie && $("#country-selector select").css({
                overflow: "hidden",
                width: 220
            })
        },
        onChange: function () {
            $("#country-selector .flag").removeClass(this.selected), this.selected = $("#country-selector select").val(), $("#country-selector .flag").addClass(this.selected)
        }
    });
    return n
}), define("infinity/controllers/DidController", ["suds/events/Dispatcher", "mout/function/bind"], function (e, t) {
    var i = e.extend({
        initialize: function () {
            this._super(), $(".did-login-bind").on("click", function () {
                window.did.login()
            }), $(window).on("hashchange", t(this.onHashChange, this)), this.onHashChange()
        },
        onHashChange: function () {
            var e = window.location.hash.substr(1);
            "link" == e && window.did.networkConnect()
        }
    });
    return i
}), define("infinity/controllers/AnimationController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind"], function (e, t) {
    var i = e.extend({
        initialize: function () {
            this._super(), t.csstransitions || this.setup(), t.ie10 && $(".toy-module .toy").each(function () {
                $(this).removeClass("flipInY")
            })
        },
        setup: function () {
            $(".left-button").each(function () {
                $(this).css({
                    opacity: .75,
                    width: 100,
                    backgroundPosition: "0px 50%"
                }), $(this).hover(function (e) {
                    var t = $(this);
                    switch (e.type) {
                    case "mouseenter":
                        TweenLite.to(t, .2, {
                            css: {
                                opacity: 1,
                                width: 120,
                                backgroundPosition: "-20px 50%"
                            }
                        });
                        break;
                    case "mouseleave":
                        TweenLite.to(t, .2, {
                            css: {
                                opacity: .75,
                                width: 100,
                                backgroundPosition: "0px 50%"
                            }
                        })
                    }
                })
            }), $(".right-button").each(function () {
                $(this).css({
                    opacity: .75,
                    width: 100,
                    backgroundPosition: "0px 50%"
                }), $(this).hover(function (e) {
                    var t = $(this);
                    switch (e.type) {
                    case "mouseenter":
                        TweenLite.to(t, .2, {
                            css: {
                                width: 120,
                                opacity: 1,
                                backgroundPosition: "40px 50%"
                            }
                        });
                        break;
                    case "mouseleave":
                        TweenLite.to(t, .2, {
                            css: {
                                width: 100,
                                opacity: .75,
                                backgroundPosition: "0px 50%"
                            }
                        })
                    }
                })
            }), $(".gallery-module .left").each(function () {
                $(this).css({
                    opacity: .75,
                    width: 100,
                    backgroundPosition: "0px 50%"
                }), $(this).hover(function (e) {
                    var t = $(this);
                    switch (e.type) {
                    case "mouseenter":
                        TweenLite.to(t, .2, {
                            css: {
                                opacity: 1,
                                width: 120,
                                backgroundPosition: "-20px 50%"
                            }
                        });
                        break;
                    case "mouseleave":
                        TweenLite.to(t, .2, {
                            css: {
                                opacity: .75,
                                width: 100,
                                backgroundPosition: "0px 50%"
                            }
                        })
                    }
                })
            }), $(".gallery-module .right").each(function () {
                $(this).css({
                    opacity: .75,
                    width: 100,
                    backgroundPosition: "0px 50%"
                }), $(this).hover(function (e) {
                    var t = $(this);
                    switch (e.type) {
                    case "mouseenter":
                        TweenLite.to(t, .2, {
                            css: {
                                width: 120,
                                opacity: 1,
                                backgroundPosition: "40px 50%"
                            }
                        });
                        break;
                    case "mouseleave":
                        TweenLite.to(t, .2, {
                            css: {
                                width: 100,
                                opacity: .75,
                                backgroundPosition: "0px 50%"
                            }
                        })
                    }
                })
            })
        }
    });
    return i
}), define("infinity/controllers/FeaturedVideoController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind", "mout/function/debounce"], function (e, t, i) {
    var n = e.extend({
        container: null,
        embed: null,
        initialize: function () {
            this._super(), $("#featured-video .close-button").click(i(this.closeModal, this)), $("#featured-video .screen").click(i(this.closeModal, this)), $(window).on("hashchange", i(this.onHashChange, this)), this.onHashChange()
        },
        openModal: function () {
            $("#featured-video").show(), $("html, body").animate({
                scrollTop: 0
            }, "slow");
            var e = document.createElement("script");
            e.src = "https://www.youtube.com/iframe_api";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t), window.onYouTubeIframeAPIReady = i(this.loaded, this), window.addEventListener("orientationchange", function () {
                onYouTubeIframeAPIReady()
            }, !1)
        },
        loaded: function () {
            var e = this;
            $(".embed").width($("#featured-video .content").width() - 70), $(".embed").height(480), this.featuredVideoPlayer = new YT.Player("player", {
                height: "100%",
                width: "100%",
                videoId: $("#featured-video-container").data("featured-video"),
                playerVars: {
                    rel: 0,
                    showinfo: 0,
                    wmode: "transparent",
                    vq: "hd720",
                    autoplay: 1
                },
                events: {
                    onStateChange: function (t) {
                        t.data == YT.PlayerState.ENDED && e.closeModal()
                    }
                }
            })
        },
        onHashChange: function () {
            var e = window.location.hash.substr(1);
            "featured_video" == e ? this.openModal() : this.closeModal()
        },
        closeModal: function () {
            $("#featured-video").hide(), this.featuredVideoPlayer && (this.featuredVideoPlayer.stopVideo(), window.onYouTubeIframeAPIReady = null, window.onPlayerStateChange = null)
        }
    });
    return n
}), define("mout/array/indexOf", [], function () {
    function e(e, t, i) {
        i = i || 0;
        for (var n = e.length, s = 0 > i ? n + i : i; n > s;) {
            if (e[s] === t) return s;
            s += 1
        }
        return -1
    }
    return e
}), define("mout/array/contains", ["./indexOf"], function (e) {
    function t(t, i) {
        return -1 !== e(t, i)
    }
    return t
}), define("infinity/controllers/TabsController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/array/contains", "mout/function/bind", "mout/function/debounce"], function (e, t, i, n, s) {
    var r = e.extend({
        tabMenuModule: null,
        tabModule: null,
        tabs: null,
        hasMobileInit: null,
        carouselIndex: null,
        carouselCount: null,
        carouselItemLength: null,
        initialize: function () {
            this._super(), $(".tab-menu-module").length > 0 && this.init()
        },
        init: function () {
            this.tabMenuModule = $(".tab-menu-module"), this.tabModule = $(".tab-module"), this.tabs = new Array;
            var e = this;
            $(".tabs .tab").hover(this.onTabHover).click(this.onTabClick).each(function () {
                this.getAttribute("rel") && e.tabs.push($(this).attr("rel"))
            }), $(".tabs .tab img").click(this.onTabImgClick), this.initEvents()
        },
        initEvents: function () {
            $(window).on("hashchange", n(this.onHashChange, this)), $(window).resize(s(n(this.onResize, this), 200)), this.onResize(), this.onHashChange()
        },
        initMobileCarousel: function () {
            this.hasMobileInit || ($(".tab-menu-module .left-button").click(n(this.onLeftClick, this)), $(".tab-menu-module .right-button").click(n(this.onRightClick, this)), $(".tab-menu-module .panels").swipe({
                swipeLeft: n(this.onLeftSwipe, this),
                swipeRight: n(this.onRightSwipe, this)
            }), this.carouselIndex = 0, this.carouselCount = $(".tab-menu-module .panels .panel").size(), this.carouselItemLength = $(".tab-menu-module .panels").width() / this.carouselCount, this.hasMobileInit = !0)
        },
        selectTab: function (e) {
            var t = this;
            $(".tab-module").each(function (i) {
                var n = $(this).attr("rel");
                n == e ? ($(this).show(), TweenLite.to($(".tabs .tab." + n), .3, {
                    opacity: 1,
                    marginTop: 0
                }), $(".tab-menu-module .panels .panel." + e).addClass("selected"), $(".tab-menu-module .panels .panel." + e + " h3").addClass("selected"), t.hasMobileInit && t.jumpToCarouselItem(i)) : ($(this).hide(), TweenLite.to($(".tabs .tab." + n), .3, {
                    opacity: .5,
                    marginTop: 5
                }), $(".tab-menu-module .panels .panel." + n).removeClass("selected"), $(".tab-menu-module .panels .panel." + n + " h3").removeClass("selected"))
            })
        },
        jumpToCarouselItem: function (e) {
            this.isMobile() && (this.carouselIndex = e, $(".tab-menu-module .panels").animate({
                left: -this.carouselIndex * this.carouselItemLength
            }))
        },
        isMobile: function () {
            return t.width <= 768
        },
        nextTab: function () {
            this.carouselIndex >= this.carouselCount - 1 || (window.location.hash = this.tabs[this.carouselIndex + 1])
        },
        previousTab: function () {
            this.carouselIndex <= 0 || (window.location.hash = this.tabs[this.carouselIndex - 1])
        },
        onLeftClick: function () {
            this.isMobile() && this.previousTab()
        },
        onRightClick: function () {
            this.isMobile() && this.nextTab()
        },
        onLeftSwipe: function () {
            this.isMobile() && this.nextTab()
        },
        onRightSwipe: function () {
            this.isMobile() && this.previousTab()
        },
        onTabImgClick: function (e) {
            $(e.target).parent().trigger("click")
        },
        onTabClick: function (e) {
            var t = $(e.target).attr("rel") ||
            function () {
                if ("" == $(e.target).closest(".panel").attr("rel")) {
                    var t = $(e.target).closest(".panel").index();
                    return $(".tabs .tab:eq(" + t + ")").attr("rel")
                }
                return $(e.target).closest(".panel").attr("rel")
            }();
            void 0 !== t && (window.location.hash = t)
        },
        onTabHover: function (e) {
            switch (e.type) {
            case "mouseenter":
                TweenLite.to($(e.target), .3, {
                    marginTop: 0
                });
                break;
            case "mouseleave":
                TweenLite.to($(e.target), .3, {
                    marginTop: 5
                })
            }
        },
        onHashChange: function () {
            var e = window.location.hash.substr(1);
            return i(this.tabs, e) ? void this.selectTab(e) : "buy" != e && "preorder" != e && "pre-order" != e && "order" != e ? void(window.location.hash = this.tabs[0]) : void 0
        },
        onResize: function () {
            this.isMobile() ? (this.initMobileCarousel(), $(".tab-menu-module .panel").each(function () {
                $(this).width(t.width)
            })) : ($(".tab-menu-module .panels").css({
                left: 0
            }), $(".tab-menu-module .panels .panel").css("width", ""))
        }
    });
    return r
}), define("infinity/controllers/VideosCarouselController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind", "mout/function/debounce"], function (e, t, i, n) {
    var s = e.extend({
        carousel: null,
        index: null,
        itemsPerPage: null,
        length: null,
        initialize: function () {
            this._super(), $(".video-carousel-module .carousel").length > 0 && this.setup()
        },
        setup: function () {
            this.carousel = $(".video-carousel-module .carousel"), this.index = 0, this.itemsPerPage = 3, this.length = this.carousel.find(".item").length, this.carousel.find(".left-button").click(i(this.onLeftClick, this)), this.carousel.find(".right-button").click(i(this.onRightClick, this)), this.carousel.find(".item").click(i(this.onItemClick, this)), $(window).resize(n(i(this.onResize, this), 100)), this.onResize(), this.update()
        },
        onLeftClick: function () {
            this.index <= 0 || (this.index--, this.carousel.find(".items").animate({
                left: 268 * -this.index
            }), this.update())
        },
        onRightClick: function () {
            this.index >= this.length - this.itemsPerPage || (this.index++, this.carousel.find(".items").animate({
                left: 268 * -this.index
            }), this.update())
        },
        onItemClick: function (e) {
            var t = $(e.currentTarget).find("img").attr("data-link"),
                i = $(e.currentTarget).find("img").attr("data-media-type");
            "image" == i ? ($(".image-container img").attr("src", t), $(".embed iframe").css("display", "none"), $(".image-container").css("display", "block")) : ("en-us" == $.cookie("disney_region_locale") ? $(".embed iframe").attr("src", "https://a.dilcdn.com/_xd/video.disney.com/embed/" + t) : "ja" == $.cookie("disney_region_locale") ? $(".embed iframe").attr("src", "https://www.youtube.com/embed/" + t + "?HD=1;wmode=transparent;rel=0;showinfo=1;autoplay=1&cc_load_policy=1;") : $(".embed iframe").attr("src", "https://www.youtube.com/embed/" + t + "?HD=1;wmode=transparent;rel=0;showinfo=1;autoplay=1"), $(".image-container").css("display", "none"), $(".embed iframe").css("display", "block"))
        },
        update: function () {
            if (this.length <= this.itemsPerPage) return this.carousel.find(".left-button").hide(), void this.carousel.find(".right-button").hide();
            if (t.width < 768) return this.carousel.find(".left-button").hide(), this.carousel.find(".right-button").hide(), this.carousel.find(".item").css({
                opacity: 1
            }), this.index = 0, void 0;
            this.index <= 0 ? this.carousel.find(".left-button").hide() : this.carousel.find(".left-button").show(), this.index >= this.length - this.itemsPerPage ? this.carousel.find(".right-button").hide() : this.carousel.find(".right-button").show();
            for (var e = 0; e < this.length; e++) $(this.carousel.find(".item")[e]).animate(e < this.index ? {
                opacity: 0
            } : e >= this.index + this.itemsPerPage ? {
                opacity: 0
            } : {
                opacity: 1
            })
        },
        onResize: function () {
            t.width < 536 ? this.carousel.find(".items").css({
                left: (t.width - 254) / 2
            }) : t.width < 768 ? this.carousel.find(".items").css({
                left: (t.width - 520) / 2
            }) : t.width < 1024 ? (this.itemsPerPage = 2, this.carousel.find(".items").css({
                left: 40
            })) : (this.itemsPerPage = 3, this.carousel.find(".items").css({
                left: 0
            })), this.update()
        }
    });
    return s
}), define("infinity/controllers/VideoOverlayController", ["suds/events/Dispatcher", "mout/function/bind", "suds/helpers/BrowserHelper"], function (e, t, i) {
    var n = e.extend({
        initialize: function () {
            return this._super(), $("#video-overlay .close-button").click(t(this.closeModal, this)), $("#video-overlay .screen").click(t(this.closeModal, this)), this
        },
        openModal: function () {
            $("#video-overlay").show(), i.ie && $("#video-overlay-player").css({
                width: "100%",
                height: 400
            })
        },
        changeVideo: function (e) {
            if ("en-us" == $.cookie("disney_region_locale")) {
                var t = this;
                $("#video-overlay-container .embed iframe").attr("src", "https://a.dilcdn.com/_xd/video.disney.com/embed/" + e)
            } else {
                var t = this;
                if (window.onYouTubeIframeAPIReady = this.playVideo = function () {
                    t.player = new YT.Player("video-overlay-player", {
                        height: "100%",
                        width: "100%",
                        videoId: e,
                        playerVars: {
                            rel: 0,
                            showinfo: 0,
                            wmode: "transparent",
                            vq: "hd720",
                            autoplay: 1
                        },
                        events: {
                            onStateChange: t.onPlayerStateChange
                        }
                    })
                }, "undefined" == typeof YT) {
                    var i = document.createElement("script");
                    i.src = "https://www.youtube.com/iframe_api";
                    var n = document.getElementsByTagName("script")[0];
                    return void n.parentNode.insertBefore(i, n)
                }
                t.player && t.player.loadVideoById(e)
            }
        },
        onPlayerStateChange: function () {},
        closeModal: function () {
            return $("#video-overlay").hide(), "en-us" == $.cookie("disney_region_locale") ? $("#video-overlay-container .embed iframe").attr("src", "") : this.player && this.player.stopVideo(), !1
        }
    });
    return n
}), define("infinity/controllers/PowerDiscCarouselController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "infinity/controllers/VideoOverlayController", "mout/function/bind", "mout/function/debounce"], function (e, t, i, n, s) {
    var r = e.extend({
        carousel: null,
        discs: null,
        index: null,
        lastIndex: null,
        length: null,
        initialize: function () {
            this._super(), $(".power-disc-module .carousel").length > 0 && this.setup()
        },
        setup: function () {
            this.carousel = $(".power-disc-module .carousel"), this.discs = $(".power-disc-module .carousel .power-disc"), this.index = 0, this.length = this.carousel.find(".power-disc").length, this.carousel.find(".left-button").click(n(this.onLeftClick, this)), this.carousel.find(".right-button").click(n(this.onRightClick, this)), this.discs.find(".item.video .thumb").click(n(this.onVideoClick, this));
            for (var e = 0; e < this.length; e++) $(this.discs[e]).css(e > 0 ? {
                display: "none"
            } : {
                display: "block"
            });
            $(window).resize(s(n(this.onResize, this), 100)), this.onResize()
        },
        onLeftClick: function () {
            this.index <= 0 || (this.index--, this.update())
        },
        onRightClick: function () {
            this.index >= this.length || (this.index++, this.update())
        },
        onVideoClick: function (e) {
            this.videoOverlay || (this.videoOverlay = new i), this.videoOverlay.openModal(), this.videoOverlay.changeVideo($(e.currentTarget).parent().attr("data-youtube-id"))
        },
        update: function () {
            this.index != this.lastIndex && (this.animateIn(), this.lastIndex = this.index), this.index <= 0 ? this.carousel.find(".left-button").hide() : this.carousel.find(".left-button").show(), this.index >= this.length - 1 ? this.carousel.find(".right-button").hide() : this.carousel.find(".right-button").show();
            for (var e = 0; e < this.length; e++) $(this.discs[e]).css(this.index == e ? {
                display: "block"
            } : {
                display: "none"
            })
        },
        animateIn: function () {
            if ("undefined" != typeof this.index) {
                var e = $(this.carousel.find(".power-disc")[this.index]);
                TweenLite.set(e.find(".character"), {
                    y: -50,
                    opacity: 0
                }), TweenLite.to(e.find(".character"), .3, {
                    opacity: 1,
                    y: 0,
                    delay: .3
                }), TweenLite.set(e.find(".plus"), {
                    opacity: 0,
                    y: -50
                }), TweenLite.to(e.find(".plus"), .3, {
                    opacity: 1,
                    y: 0,
                    delay: .6
                }), TweenLite.set(e.find(".disc"), {
                    opacity: 0,
                    y: -100
                }), TweenLite.to(e.find(".disc"), .3, {
                    opacity: 1,
                    y: 0,
                    delay: .9
                }), TweenLite.set(e.find(".equals"), {
                    opacity: 0,
                    y: -100
                }), TweenLite.to(e.find(".equals"), .3, {
                    opacity: 1,
                    y: 0,
                    delay: 1.2
                }), TweenLite.set(e.find(".video"), {
                    opacity: 0,
                    y: -100
                }), TweenLite.to(e.find(".video"), .3, {
                    opacity: 1,
                    y: 0,
                    delay: 1.5
                })
            }
        },
        onResize: function () {
            t.width < 536 ? this.carousel.find(".items").css({
                left: (t.width - 254) / 2
            }) : t.width < 768 ? this.carousel.find(".items").css({
                left: (t.width - 520) / 2
            }) : t.width < 1024 ? (this.itemsPerPage = 2, this.carousel.find(".items").css({
                left: 40
            })) : (this.itemsPerPage = 3, this.carousel.find(".items").css({
                left: 0
            })), this.update()
        }
    });
    return r
}), define("infinity/controllers/CommunityController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind", "mout/function/debounce"], function (e, t, i, n) {
    var s = e.extend({
        homeContainer: null,
        community: null,
        current: -1,
        carouselTimeout: null,
        chromeNav: null,
        slides: null,
        SLIDE_AMOUNT: 3,
        LOOP_SPEED: 7e3,
        MIN_HEIGHT: 561,
        MAX_HEIGHT: 561,
        initialize: function () {
            this._super(), this.chromeNav = $("body.en-us").length > 0, this.community = $("#rotator-community"), this.community.length > 0 && this.setup(), this.shop = $("#rotator-shop"), this.shop.length > 0 && this.setup()
        },
        setup: function () {
            this.SLIDE_AMOUNT = this.community.find(".carousel").size(), this.slides = this.community.find(".carousel"), this.homeContainer = $(".home-container");
            var e = this;
            this.community.find(".indicator").each(function (t) {
                $(this).attr("rel", t), $(this).click(i(e.onIndicatorClick, e))
            }), $(window).resize(n(i(this.onResize, this), 100)), this.init()
        },
        init: function () {
            return $("body.es").length > 0 ? (this.loop(0), void this.onResize()) : $("body.de").length > 0 ? (this.loop(0), void this.onResize()) : (this.onResize(), void this.loop())
        },
        onResize: function () {
            if (t.width <= 1024) return void this.community.height(this.MIN_HEIGHT - 250);
            var e = t.width / 1280 * 720;
            e = Math.min(t.height - (this.chromeNav ? 40 : 0), e), e = Math.max(this.MIN_HEIGHT), this.homeContainer.height(e), this.community.height(e)
        },
        onIndicatorClick: function (e) {
            var t = this;
            this.community.find(".indicator").each(function (i) {
                $(this).attr("rel") == $(e.target).attr("rel") && (t.current = i - 1, t.loop())
            })
        },
        loop: function (e) {
            this.current = ++this.current % this.SLIDE_AMOUNT, e >= 0 && (this.current = e), this.community.find(".carousel").css("display", "none"), $(this.slides[this.current]).css("display", "block");
            var t = this;
            this.community.find(".indicator").each(function (e) {
                t.current == e ? $(this).addClass("selected") : $(this).removeClass("selected")
            }), e >= 0 || (this.carouselTimeout && clearTimeout(this.carouselTimeout), this.carouselTimeout = setTimeout(i(this.loop, this), this.LOOP_SPEED))
        }
    });
    return s
}), define("infinity/controllers/ShopController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind", "mout/function/debounce"], function (e, t, i, n) {
    var s = e.extend({
        homeContainer: null,
        shop: null,
        current: -1,
        carouselTimeout: null,
        chromeNav: null,
        slides: null,
        SLIDE_AMOUNT: 3,
        LOOP_SPEED: 7e3,
        MIN_HEIGHT: 561,
        MAX_HEIGHT: 561,
        initialize: function () {
            this._super(), this.chromeNav = $("body.en-us").length > 0, this.shop = $("#rotator-shop"), this.shop.length > 0 && this.setup()
        },
        setup: function () {
            this.SLIDE_AMOUNT = this.shop.find(".carousel").size(), this.slides = this.shop.find(".carousel"), this.homeContainer = $(".home-container");
            var e = this;
            this.shop.find(".indicator").each(function (t) {
                $(this).attr("rel", t), $(this).click(i(e.onIndicatorClick, e))
            }), $(window).resize(n(i(this.onResize, this), 100)), this.init()
        },
        init: function () {
            return $("body.es").length > 0 ? (this.loop(0), void this.onResize()) : $("body.de").length > 0 ? (this.loop(0), void this.onResize()) : (this.onResize(), void this.loop())
        },
        onResize: function () {
            if (t.width <= 1024) return void this.shop.height(this.MIN_HEIGHT - 250);
            var e = t.width / 1280 * 720;
            e = Math.min(t.height - (this.chromeNav ? 40 : 0), e), e = Math.max(this.MIN_HEIGHT), this.homeContainer.height(e), this.shop.height(e)
        },
        onIndicatorClick: function (e) {
            var t = this;
            this.shop.find(".indicator").each(function (i) {
                $(this).attr("rel") == $(e.target).attr("rel") && (t.current = i - 1, t.loop())
            })
        },
        loop: function (e) {
            this.current = ++this.current % this.SLIDE_AMOUNT, e >= 0 && (this.current = e), this.shop.find(".carousel").css("display", "none"), $(this.slides[this.current]).css("display", "block");
            var t = this;
            this.shop.find(".indicator").each(function (e) {
                t.current == e ? $(this).addClass("selected") : $(this).removeClass("selected")
            }), e >= 0 || (this.carouselTimeout && clearTimeout(this.carouselTimeout), this.carouselTimeout = setTimeout(i(this.loop, this), this.LOOP_SPEED))
        }
    });
    return s
}), define("infinity/controllers/MarketingAppController", ["suds/events/Dispatcher", "suds/helpers/BrowserHelper", "mout/function/bind", "mout/function/debounce"], function (e, t, i, n) {
    var s = e.extend({
        homeContainer: null,
        community: null,
        current: -1,
        carouselTimeout: null,
        chromeNav: null,
        slides: null,
        SLIDE_AMOUNT: 3,
        LOOP_SPEED: 7e3,
        MIN_HEIGHT: 561,
        MAX_HEIGHT: 561,
        initialize: function () {
            this._super(), this.chromeNav = $("body.en-us").length > 0, this.rotator = $(".admin-rotator"), this.rotator.length > 0 && this.setup()
        },
        setup: function () {
            this.SLIDE_AMOUNT = this.rotator.find(".carousel").size(), this.slides = this.rotator.find(".carousel");
            var e = this;
            this.rotator.find(".indicator").each(function (t) {
                $(this).attr("rel", t), $(this).click(i(e.onIndicatorClick, e))
            }), $(window).resize(n(i(this.onResize, this), 100)), this.init()
        },
        init: function () {
            return $("body.es").length > 0 ? (this.loop(0), void this.onResize()) : $("body.de").length > 0 ? (this.loop(0), void this.onResize()) : (this.onResize(), void this.loop())
        },
        onResize: function () {
            if (t.width <= 1024) return void this.rotator.height(this.MIN_HEIGHT - 250);
            var e = t.width / 1280 * 720;
            e = Math.min(t.height - (this.chromeNav ? 40 : 0), e), e = Math.max(this.MIN_HEIGHT), this.rotator.height(e)
        },
        onIndicatorClick: function (e) {
            var t = this;
            this.rotator.find(".indicator").each(function (i) {
                $(this).attr("rel") == $(e.target).attr("rel") && (t.current = i - 1, t.loop())
            })
        },
        loop: function (e) {
            this.current = ++this.current % this.SLIDE_AMOUNT, e >= 0 && (this.current = e), this.rotator.find(".carousel").css("display", "none"), $(this.slides[this.current]).css("display", "block");
            var t = this;
            this.rotator.find(".indicator").each(function (e) {
                t.current == e ? $(this).addClass("selected") : $(this).removeClass("selected")
            }), e >= 0 || (this.carouselTimeout && clearTimeout(this.carouselTimeout), this.carouselTimeout = setTimeout(i(this.loop, this), this.LOOP_SPEED))
        }
    });
    return s
}), define("infinity/App", ["suds/oop/Class", "suds/events/Interval", "tween", "infinity/controllers/NavigationController", "infinity/controllers/CharactersController", "infinity/controllers/TilesController", "infinity/controllers/EffectsController", "infinity/controllers/BuyController", "infinity/controllers/GalleriesController", "infinity/controllers/CarouselController", "infinity/controllers/PlaySetsController", "infinity/controllers/ToyController", "infinity/controllers/CountrySelectorController", "infinity/controllers/DidController", "infinity/controllers/AnimationController", "infinity/controllers/FeaturedVideoController", "infinity/controllers/TabsController", "infinity/controllers/VideosCarouselController", "infinity/controllers/PowerDiscCarouselController", "infinity/controllers/CommunityController", "infinity/controllers/ShopController", "infinity/controllers/MarketingAppController"], function (e, t, i, n, s, r, o, a, l, u, h, c, d, p, f, m, g, v, y, w, b, x) {
    "use strict";
    var _ = e.extend({
        initialize: function () {
            this.initTWEEN(), new n, new s, new r, new o, new a, new l, new u, new h, new c, new d, new p, new f, new m, new g, new v, new y, new w, new b, new x
        },
        initTWEEN: function () {
            t.addListener(t.FRAME, i.update)
        }
    });
    return _
}), require.config({
    urlArgs: "bust=" + (new Date).getTime(),
    paths: {
        swipe: "libs/jquery/jquery.touchSwipe",
        require: "libs/require/require",
        suds: "libs/suds/source",
        tween: "libs/tween/tween",
        mout: "libs/mout",
        mediaelement: "libs/mediaelement/mediaelement-and-player.min"
    },
    deps: ["swipe", "libs/gsap/TweenLite", "libs/gsap/plugins/CSSPlugin", "libs/gsap/easing/EasePack"]
}), require(["infinity/App"], function (e) {
    new e
}), define("main", function () {});