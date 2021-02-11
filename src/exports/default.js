/* eslint-disable no-unused-expressions */
const importTag = `
<div id="root" style="overflow-y:hidden"></div>
<script src="https://estimator-68282.web.app/static/js/2.7749d76c.chunk.js"></script>
<script src="https://estimator-68282.web.app/static/js/main.6a4cdcc0.chunk.js"></script>
`;
const headDetails = `
<meta charset="utf-8" />
<link href="https://estimator-68282.web.app/static/css/2.72236d22.chunk.css" rel="stylesheet">
<link href="https://estimator-68282.web.app/static/css/main.3b6efe8d.chunk.css" rel="stylesheet">
`;
const container = document.querySelector("#estimatorForm");
const head = document.querySelector("head");
head.innerHTML += headDetails;
//create script tags and populate them
const script1 = document.createElement("script");
script1.setAttribute(
  "src",
  "https://estimator-68282.web.app/static/js/2.7749d76c.chunk.js"
);
script1.setAttribute(
  "type",
  "text/babel"
);
const script2 = document.createElement("script");
script2.setAttribute(
  "src",
  "https://estimator-68282.web.app/static/js/main.6a4cdcc0.chunk.js"
);
script2.setAttribute(
  "type",
  "text/bable"
);
document.body.appendChild(script1);
document.body.appendChild(script2);

const displayForm = () => {
  
  !(function (e) {
    function t(t) {
      for (
        var n, a, i = t[0], c = t[1], l = t[2], s = 0, p = [];
        s < i.length;
        s++
      )
        (a = i[s]),
          Object.prototype.hasOwnProperty.call(o, a) && o[a] && p.push(o[a][0]),
          (o[a] = 0);
      for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
      for (f && f(t); p.length; ) p.shift()();
      return u.push.apply(u, l || []), r();
    }
    function r() {
      for (var e, t = 0; t < u.length; t++) {
        for (var r = u[t], n = !0, i = 1; i < r.length; i++) {
          var c = r[i];
          0 !== o[c] && (n = !1);
        }
        n && (u.splice(t--, 1), (e = a((a.s = r[0]))));
      }
      return e;
    }
    var n = {},
      o = { 1: 0 },
      u = [];
    function a(t) {
      if (n[t]) return n[t].exports;
      var r = (n[t] = { i: t, l: !1, exports: {} });
      return e[t].call(r.exports, r, r.exports, a), (r.l = !0), r.exports;
    }
    (a.e = function (e) {
      var t = [],
        r = o[e];
      if (0 !== r)
        if (r) t.push(r[2]);
        else {
          var n = new Promise(function (t, n) {
            r = o[e] = [t, n];
          });
          t.push((r[2] = n));
          var u,
            i = document.createElement("script");
          (i.charset = "utf-8"),
            (i.timeout = 120),
            a.nc && i.setAttribute("nonce", a.nc),
            (i.src = (function (e) {
              return (
                a.p +
                "static/js/" +
                ({}[e] || e) +
                "." +
                { 3: "7901c4ca" }[e] +
                ".chunk.js"
              );
            })(e));
          var c = new Error();
          u = function (t) {
            (i.onerror = i.onload = null), clearTimeout(l);
            var r = o[e];
            if (0 !== r) {
              if (r) {
                var n = t && ("load" === t.type ? "missing" : t.type),
                  u = t && t.target && t.target.src;
                (c.message =
                  "Loading chunk " + e + " failed.\n(" + n + ": " + u + ")"),
                  (c.name = "ChunkLoadError"),
                  (c.type = n),
                  (c.request = u),
                  r[1](c);
              }
              o[e] = void 0;
            }
          };
          var l = setTimeout(function () {
            u({ type: "timeout", target: i });
          }, 12e4);
          (i.onerror = i.onload = u), document.head.appendChild(i);
        }
      return Promise.all(t);
    }),
      (a.m = e),
      (a.c = n),
      (a.d = function (e, t, r) {
        a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (a.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (a.t = function (e, t) {
        if ((1 & t && (e = a(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (a.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var n in e)
            a.d(
              r,
              n,
              function (t) {
                return e[t];
              }.bind(null, n)
            );
        return r;
      }),
      (a.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return a.d(t, "a", t), t;
      }),
      (a.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (a.p = "/"),
      (a.oe = function (e) {
        throw (console.error(e), e);
      });
    var i = (this.webpackJsonpestimator = this.webpackJsonpestimator || []),
      c = i.push.bind(i);
    // eslint-disable-next-line no-unused-expressions
    (i.push = t), (i = i.slice());
    for (var l = 0; l < i.length; l++) t(i[l]);
    var f = c;
    r();
  })([]);
};
const initForm = () => {
  container.innerHTML = importTag;
  displayForm();
};
