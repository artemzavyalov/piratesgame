/*!
 * CanJS - 2.0.4
 * http://canjs.us/
 * Copyright (c) 2014 Bitovi
 * Sat, 04 Jan 2014 11:40:30 GMT
 * Licensed MIT
 * Includes: can/component/component.js,can/construct/construct.js,can/map/map.js,can/list/list.js,can/compute/compute.js,can/model/model.js,can/view/view.js,can/control/control.js,can/route/route.js,can/control/route/route.js,can/view/mustache/mustache.js,can/view/ejs/ejs.js,can/route/pushstate/pushstate.js,can/model/queue/queue.js,can/construct/super/super.js,can/construct/proxy/proxy.js,can/map/delegate/delegate.js,can/map/setter/setter.js,can/map/attributes/attributes.js,can/map/validations/validations.js,can/map/backup/backup.js,can/map/list/list.js,can/map/sort/sort.js,can/control/plugin/plugin.js,can/view/modifiers/modifiers.js,can/util/object/object.js,can/util/fixture/fixture.js
 * Download from: http://bitbuilder.herokuapp.com/can.custom.js?configuration=jquery&minify=true&plugins=can%2Fcomponent%2Fcomponent.js&plugins=can%2Fconstruct%2Fconstruct.js&plugins=can%2Fmap%2Fmap.js&plugins=can%2Flist%2Flist.js&plugins=can%2Fcompute%2Fcompute.js&plugins=can%2Fmodel%2Fmodel.js&plugins=can%2Fview%2Fview.js&plugins=can%2Fcontrol%2Fcontrol.js&plugins=can%2Froute%2Froute.js&plugins=can%2Fcontrol%2Froute%2Froute.js&plugins=can%2Fview%2Fmustache%2Fmustache.js&plugins=can%2Fview%2Fejs%2Fejs.js&plugins=can%2Froute%2Fpushstate%2Fpushstate.js&plugins=can%2Fmodel%2Fqueue%2Fqueue.js&plugins=can%2Fconstruct%2Fsuper%2Fsuper.js&plugins=can%2Fconstruct%2Fproxy%2Fproxy.js&plugins=can%2Fmap%2Fdelegate%2Fdelegate.js&plugins=can%2Fmap%2Fsetter%2Fsetter.js&plugins=can%2Fmap%2Fattributes%2Fattributes.js&plugins=can%2Fmap%2Fvalidations%2Fvalidations.js&plugins=can%2Fmap%2Fbackup%2Fbackup.js&plugins=can%2Fmap%2Flist%2Flist.js&plugins=can%2Fmap%2Fsort%2Fsort.js&plugins=can%2Fcontrol%2Fplugin%2Fplugin.js&plugins=can%2Fview%2Fmodifiers%2Fmodifiers.js&plugins=can%2Futil%2Fobject%2Fobject.js&plugins=can%2Futil%2Ffixture%2Ffixture.js
 */
(function (undefined) {
  var __m4 = function () {
    var t = window.can || {};
    ("undefined" == typeof GLOBALCAN || GLOBALCAN !== !1) && (window.can = t), t.isDeferred = function (t) {
      var e = this.isFunction;
      return t && e(t.then) && e(t.pipe)
    };
    var e = 0;
    return t.cid = function (t, n) {
      return t._cid ? t._cid : t._cid = (n || "") + ++e
    }, t.VERSION = "@EDGE", t.simpleExtend = function (t, e) {
      for (var n in e)t[n] = e[n];
      return t
    }, t
  }(), __m5 = function (t) {
    return t.each = function (e, n, r) {
      var i, a = 0;
      if (e)if ("number" == typeof e.length && e.pop)for (e.attr && e.attr("length"), i = e.length; i > a && n.call(r || e[a], e[a], a, e) !== !1; a++); else if (e.hasOwnProperty) {
        t.Map && e instanceof t.Map && (t.__reading && t.__reading(e, "__keys"), e = e.__get());
        for (i in e)if (e.hasOwnProperty(i) && n.call(r || e[i], e[i], i, e) === !1)break
      }
      return e
    }, t
  }(__m4), __m6 = function (t) {
    t.inserted = function (e) {
      e = t.makeArray(e);
      for (var n, r, i = !1, a = 0; (r = e[a]) !== undefined; a++) {
        if (!i) {
          if (!r.getElementsByTagName)continue;
          if (!t.has(t.$(document), r).length)return;
          i = !0
        }
        if (i && r.getElementsByTagName) {
          n = t.makeArray(r.getElementsByTagName("*")), t.trigger(r, "inserted", [], !1);
          for (var s, o = 0; (s = n[o]) !== undefined; o++)t.trigger(s, "inserted", [], !1)
        }
      }
    }, t.appendChild = function (e, n) {
      if (11 === n.nodeType)var r = t.makeArray(n.childNodes); else var r = [n];
      e.appendChild(n), t.inserted(r)
    }, t.insertBefore = function (e, n, r) {
      if (11 === n.nodeType)var i = t.makeArray(n.childNodes); else var i = [n];
      e.insertBefore(n, r), t.inserted(i)
    }
  }(__m4), __m7 = function (t) {
    return t.addEvent = function (t, e) {
      var n = this.__bindEvents || (this.__bindEvents = {}), r = n[t] || (n[t] = []);
      return r.push({handler: e, name: t}), this
    }, t.listenTo = function (e, n, r) {
      var i = this.__listenToEvents;
      i || (i = this.__listenToEvents = {});
      var a = t.cid(e), s = i[a];
      s || (s = i[a] = {obj: e, events: {}});
      var o = s.events[n];
      o || (o = s.events[n] = []), o.push(r), t.bind.call(e, n, r)
    }, t.stopListening = function (e, n, r) {
      var i = this.__listenToEvents, a = i, s = 0;
      if (!i)return this;
      if (e) {
        var o = t.cid(e);
        if ((a = {})[o] = i[o], !i[o])return this
      }
      for (var u in a) {
        var c, h = a[u];
        e = i[u].obj, n ? (c = {})[n] = h.events[n] : c = h.events;
        for (var l in c) {
          var f = c[l] || [];
          for (s = 0; f.length > s;)r && r === f[s] || !r ? (t.unbind.call(e, l, f[s]), f.splice(s, 1)) : s++;
          f.length || delete h.events[l]
        }
        t.isEmptyObject(h.events) && delete i[u]
      }
      return this
    }, t.removeEvent = function (t, e) {
      if (!this.__bindEvents)return this;
      for (var n, r = this.__bindEvents[t] || [], i = 0, a = "function" == typeof e; r.length > i;)n = r[i], a && n.handler === e || !a && n.cid === e ? r.splice(i, 1) : i++;
      return this
    }, t.dispatch = function (t, e) {
      if (this.__bindEvents) {
        "string" == typeof t && (t = {type: t});
        for (var n, r = t.type, i = (this.__bindEvents[r] || []).slice(0), e = [t].concat(e || []), a = 0, s = i.length; s > a; a++)n = i[a], n.handler.apply(this, e)
      }
    }, t
  }(__m4), __m2 = function (t, e) {
    var n = function (t) {
      return t.nodeName && (1 == t.nodeType || 9 == t.nodeType) || t == window
    };
    t.extend(e, t, {trigger: function (n, r, i) {
      n.nodeName || n === window ? t.event.trigger(r, i, n, !0) : n.trigger ? n.trigger(r, i) : ("string" == typeof r && (r = {type: r}), r.target = r.target || n, e.dispatch.call(n, r, i))
    }, addEvent: e.addEvent, removeEvent: e.removeEvent, buildFragment: function (e, n) {
      var r, i = t.buildFragment;
      return e = [e], n = n || document, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, r = i.call(jQuery, e, n), r.cacheable ? t.clone(r.fragment) : r.fragment || r
    }, $: t, each: e.each, bind: function (r, i) {
      return this.bind && this.bind !== e.bind ? this.bind(r, i) : n(this) ? t.event.add(this, r, i) : e.addEvent.call(this, r, i), this
    }, unbind: function (r, i) {
      return this.unbind && this.unbind !== e.unbind ? this.unbind(r, i) : n(this) ? t.event.remove(this, r, i) : e.removeEvent.call(this, r, i), this
    }, delegate: function (e, r, i) {
      return this.delegate ? this.delegate(e, r, i) : n(this) && t(this).delegate(e, r, i), this
    }, undelegate: function (e, r, i) {
      return this.undelegate ? this.undelegate(e, r, i) : n(this) && t(this).undelegate(e, r, i), this
    }, proxy: function (t, e) {
      return function () {
        return t.apply(e, arguments)
      }
    }}), e.on = e.bind, e.off = e.unbind, t.each(["append", "filter", "addClass", "remove", "data", "get", "has"], function (t, n) {
      e[n] = function (t) {
        return t[n].apply(t, e.makeArray(arguments).slice(1))
      }
    });
    var r = t.cleanData;
    t.cleanData = function (n) {
      t.each(n, function (t, n) {
        n && e.trigger(n, "removed", [], !1)
      }), r(n)
    };
    var i, a = t.fn.domManip;
    return t.fn.domManip = function () {
      for (var t = 1; arguments.length > t; t++)if ("function" == typeof arguments[t]) {
        i = t;
        break
      }
      return a.apply(this, arguments)
    }, t(document.createElement("div")).append(document.createElement("div")), t.fn.domManip = 2 == i ? function (t, n, r) {
      return a.call(this, t, n, function (t) {
        if (11 === t.nodeType)var n = e.makeArray(t.childNodes);
        var i = r.apply(this, arguments);
        return e.inserted(n ? n : [t]), i
      })
    } : function (t, n) {
      return a.call(this, t, function (t) {
        if (11 === t.nodeType)var r = e.makeArray(t.childNodes);
        var i = n.apply(this, arguments);
        return e.inserted(r ? r : [t]), i
      })
    }, t.event.special.inserted = {}, t.event.special.removed = {}, e
  }(jQuery, __m4, __m5, __m6, __m7), __m10 = function (t) {
    var e = /_|-/, n = /\=\=/, r = /([A-Z]+)([A-Z][a-z])/g, i = /([a-z\d])([A-Z])/g, a = /([a-z\d])([A-Z])/g, s = /\{([^\}]+)\}/g, o = /"/g, u = /'/g, c = /-+(.)?/g, h = /[a-z][A-Z]/g, l = function (t, e, n) {
      var r = t[e];
      return r === undefined && n === !0 && (r = t[e] = {}), r
    }, f = function (t) {
      return/^f|^o/.test(typeof t)
    }, p = function (t) {
      var e = null === t || t === undefined || isNaN(t) && "NaN" == "" + t;
      return"" + (e ? "" : t)
    };
    return t.extend(t, {esc: function (t) {
      return p(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(o, "&#34;").replace(u, "&#39;")
    }, getObject: function (e, n, r) {
      var i, a, s, o, u = e ? e.split(".") : [], c = u.length, h = 0;
      if (n = t.isArray(n) ? n : [n || window], o = n.length, !c)return n[0];
      for (h; o > h; h++) {
        for (i = n[h], s = undefined, a = 0; c > a && f(i); a++)s = i, i = l(s, u[a]);
        if (s !== undefined && i !== undefined)break
      }
      if (r === !1 && i !== undefined && delete s[u[a - 1]], r === !0 && i === undefined)for (i = n[0], a = 0; c > a && f(i); a++)i = l(i, u[a], !0);
      return i
    }, capitalize: function (t) {
      return t.charAt(0).toUpperCase() + t.slice(1)
    }, camelize: function (t) {
      return p(t).replace(c, function (t, e) {
        return e ? e.toUpperCase() : ""
      })
    }, hyphenate: function (t) {
      return p(t).replace(h, function (t) {
        return t.charAt(0) + "-" + t.charAt(1).toLowerCase()
      })
    }, underscore: function (t) {
      return t.replace(n, "/").replace(r, "$1_$2").replace(i, "$1_$2").replace(a, "_").toLowerCase()
    }, sub: function (e, n, r) {
      var i = [];
      return e = e || "", i.push(e.replace(s, function (e, a) {
        var s = t.getObject(a, n, r === !0 ? !1 : undefined);
        return s === undefined || null === s ? (i = null, "") : f(s) && i ? (i.push(s), "") : "" + s
      })), null === i ? i : 1 >= i.length ? i[0] : i
    }, replacer: s, undHash: e}), t
  }(__m2), __m9 = function (t) {
    var e = 0;
    return t.Construct = function () {
      return arguments.length ? t.Construct.extend.apply(t.Construct, arguments) : undefined
    }, t.extend(t.Construct, {constructorExtends: !0, newInstance: function () {
      var t, e = this.instance();
      return e.setup && (t = e.setup.apply(e, arguments)), e.init && e.init.apply(e, t || arguments), e
    }, _inherit: function (e, n, r) {
      t.extend(r || e, e || {})
    }, _overwrite: function (t, e, n, r) {
      t[n] = r
    }, setup: function (e) {
      this.defaults = t.extend(!0, {}, e.defaults, this.defaults)
    }, instance: function () {
      e = 1;
      var t = new this;
      return e = 0, t
    }, extend: function (n, r, i) {
      function a() {
        return e ? undefined : this.constructor !== a && arguments.length && a.constructorExtends ? arguments.callee.extend.apply(arguments.callee, arguments) : a.newInstance.apply(a, arguments)
      }

      "string" != typeof n && (i = r, r = n, n = null), i || (i = r, r = null), i = i || {};
      var s, o, u, c, h = this, l = this.prototype;
      c = this.instance(), t.Construct._inherit(i, l, c);
      for (s in h)h.hasOwnProperty(s) && (a[s] = h[s]);
      if (t.Construct._inherit(r, h, a), n) {
        var f = n.split("."), o = f.pop(), p = t.getObject(f.join("."), window, !0), u = p, d = t.underscore(n.replace(/\./g, "_")), g = t.underscore(o);
        p[o] = a
      }
      t.extend(a, {constructor: a, prototype: c, namespace: u, _shortName: g, fullName: n, _fullName: d}), o !== undefined && (a.shortName = o), a.prototype.constructor = a;
      var m = [h].concat(t.makeArray(arguments)), _ = a.setup.apply(a, m);
      return a.init && a.init.apply(a, _ || m), a
    }}), t.Construct.prototype.setup = function () {
    }, t.Construct.prototype.init = function () {
    }, t.Construct
  }(__m10), __m8 = function (t) {
    var e, n = function (e, n, r) {
      return t.bind.call(e, n, r), function () {
        t.unbind.call(e, n, r)
      }
    }, r = t.isFunction, i = t.extend, a = t.each, s = [].slice, o = /\{([^\}]+)\}/g, u = t.getObject("$.event.special", [t]) || {}, c = function (e, n, r, i) {
      return t.delegate.call(e, n, r, i), function () {
        t.undelegate.call(e, n, r, i)
      }
    }, h = function (e, r, i, a) {
      return a ? c(e, t.trim(a), r, i) : n(e, r, i)
    }, l = t.Control = t.Construct({setup: function () {
      if (t.Construct.setup.apply(this, arguments), t.Control) {
        var e, n = this;
        n.actions = {};
        for (e in n.prototype)n._isAction(e) && (n.actions[e] = n._action(e))
      }
    }, _shifter: function (e, n) {
      var i = "string" == typeof n ? e[n] : n;
      return r(i) || (i = e[i]), function () {
        return e.called = n, i.apply(e, [this.nodeName ? t.$(this) : this].concat(s.call(arguments, 0)))
      }
    }, _isAction: function (t) {
      var e = this.prototype[t], n = typeof e;
      return"constructor" !== t && ("function" == n || "string" == n && r(this.prototype[e])) && !!(u[t] || f[t] || /[^\w]/.test(t))
    }, _action: function (n, r) {
      if (o.lastIndex = 0, r || !o.test(n)) {
        var i = r ? t.sub(n, this._lookup(r)) : n;
        if (!i)return null;
        var a = t.isArray(i), s = a ? i[1] : i, u = s.split(/\s+/g), c = u.pop();
        return{processor: f[c] || e, parts: [s, u.join(" "), c], delegate: a ? i[0] : undefined}
      }
    }, _lookup: function (t) {
      return[t, window]
    }, processors: {}, defaults: {}}, {setup: function (e, n) {
      var r, a = this.constructor, s = a.pluginName || a._fullName;
      return this.element = t.$(e), s && "can_control" !== s && this.element.addClass(s), (r = t.data(this.element, "controls")) || t.data(this.element, "controls", r = []), r.push(this), this.options = i({}, a.defaults, n), this.on(), [this.element, this.options]
    }, on: function (e, n, r, i) {
      if (!e) {
        this.off();
        var a, s, o = this.constructor, u = this._bindings, c = o.actions, l = this.element, f = t.Control._shifter(this, "destroy");
        for (a in c)c.hasOwnProperty(a) && (s = c[a] || o._action(a, this.options)) && u.push(s.processor(s.delegate || l, s.parts[2], s.parts[1], a, this));
        return t.bind.call(l, "removed", f), u.push(function (e) {
          t.unbind.call(e, "removed", f)
        }), u.length
      }
      return"string" == typeof e && (i = r, r = n, n = e, e = this.element), i === undefined && (i = r, r = n, n = null), "string" == typeof i && (i = t.Control._shifter(this, i)), this._bindings.push(h(e, r, i, n)), this._bindings.length
    }, off: function () {
      var t = this.element[0];
      a(this._bindings || [], function (e) {
        e(t)
      }), this._bindings = []
    }, destroy: function () {
      if (null !== this.element) {
        var e, n = this.constructor, r = n.pluginName || n._fullName;
        this.off(), r && "can_control" !== r && this.element.removeClass(r), e = t.data(this.element, "controls"), e.splice(t.inArray(this, e), 1), t.trigger(this, "destroyed"), this.element = null
      }
    }}), f = t.Control.processors, e = function (e, n, r, i, a) {
      return h(e, n, t.Control._shifter(a, i), r)
    };
    return a(["change", "click", "contextmenu", "dblclick", "keydown", "keyup", "keypress", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "reset", "resize", "scroll", "select", "submit", "focusin", "focusout", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchcancel", "touchend", "touchleave"], function (t) {
      f[t] = e
    }), l
  }(__m2, __m9), __m13 = function (t) {
    return t.bindAndSetup = function () {
      return t.addEvent.apply(this, arguments), this._init || (this._bindings ? this._bindings++ : (this._bindings = 1, this._bindsetup && this._bindsetup())), this
    }, t.unbindAndTeardown = function () {
      return t.removeEvent.apply(this, arguments), null == this._bindings ? this._bindings = 0 : this._bindings--, this._bindings || this._bindteardown && this._bindteardown(), this
    }, t
  }(__m2), __m14 = function (t) {
    var e = 1, n = 0, r = [], i = [];
    t.batch = {start: function (t) {
      n++, t && i.push(t)
    }, stop: function (a, s) {
      if (a ? n = 0 : n--, 0 == n) {
        var o = r.slice(0), u = i.slice(0);
        r = [], i = [], e++, s && t.batch.start(), t.each(o, function (e) {
          t.trigger.apply(t, e)
        }), t.each(u, function (t) {
          t()
        })
      }
    }, trigger: function (i, a, s) {
      if (!i._init) {
        if (0 == n)return t.trigger(i, a, s);
        a = "string" == typeof a ? {type: a} : a, a.batchNum = e, r.push([i, a, s])
      }
    }}
  }(__m4), __m12 = function (t) {
    var e = function (e, n, r) {
      t.listenTo.call(r, e, "change", function () {
        var i = t.makeArray(arguments), a = i.shift();
        i[0] = ("*" === n ? [r.indexOf(e), i[0]] : [n, i[0]]).join("."), a.triggeredNS = a.triggeredNS || {}, a.triggeredNS[r._cid] || (a.triggeredNS[r._cid] = !0, t.trigger(r, a, i))
      })
    }, n = function (e, n) {
      return n ? [e] : t.isArray(e) ? e : ("" + e).split(".")
    }, r = function (t) {
      return function () {
        var n = this;
        this._each(function (r, i) {
          r && r.bind && e(r, t || i, n)
        })
      }
    }, i = null, a = function () {
      for (var t in i)i[t].added && delete i[t].obj._cid;
      i = null
    }, s = function (t) {
      return i && i[t._cid] && i[t._cid].instance
    }, o = t.Map = t.Construct.extend({setup: function () {
      if (t.Construct.setup.apply(this, arguments), t.Map) {
        this.defaults || (this.defaults = {}), this._computes = [];
        for (var e in this.prototype)"function" != typeof this.prototype[e] ? this.defaults[e] = this.prototype[e] : this.prototype[e].isComputed && this._computes.push(e)
      }
      !t.List || this.prototype instanceof t.List || (this.List = o.List({Map: this}, {}))
    }, _computes: [], bind: t.bindAndSetup, on: t.bindAndSetup, unbind: t.unbindAndTeardown, off: t.unbindAndTeardown, id: "id", helpers: {addToMap: function (e, n) {
      var r;
      i || (r = a, i = {});
      var s = e._cid, o = t.cid(e);
      return i[o] || (i[o] = {obj: e, instance: n, added: !s}), r
    }, canMakeObserve: function (e) {
      return e && !t.isDeferred(e) && (t.isArray(e) || t.isPlainObject(e) || e instanceof t.Map)
    }, unhookup: function (e, n) {
      return t.each(e, function (e) {
        e && e.unbind && t.stopListening.call(n, e, "change")
      })
    }, hookupBubble: function (n, r, i, a, u) {
      return a = a || o, u = u || o.List, n instanceof o ? i._bindings && o.helpers.unhookup([n], i) : n = t.isArray(n) ? s(n) || new u(n) : s(n) || new a(n), i._bindings && e(n, r, i), n
    }, serialize: function (e, n, r) {
      return e.each(function (e, i) {
        r[i] = o.helpers.canMakeObserve(e) && t.isFunction(e[n]) ? e[n]() : e
      }), r
    }, makeBindSetup: r}, keys: function (e) {
      var n = [];
      t.__reading && t.__reading(e, "__keys");
      for (var r in e._data)n.push(r);
      return n
    }}, {setup: function (e) {
      this._data = {}, t.cid(this, ".map"), this._init = 1, this._setupComputes();
      var n = e && t.Map.helpers.addToMap(e, this), r = t.extend(t.extend(!0, {}, this.constructor.defaults || {}), e);
      this.attr(r), n && n(), this.bind("change", t.proxy(this._changes, this)), delete this._init
    }, _setupComputes: function () {
      var t = this.constructor._computes;
      this._computedBindings = {};
      for (var e, n = 0, r = t.length; r > n; n++)e = t[n], this[e] = this[e].clone(this), this._computedBindings[e] = {count: 0}
    }, _bindsetup: r(), _bindteardown: function () {
      var t = this;
      this._each(function (e) {
        o.helpers.unhookup([e], t)
      })
    }, _changes: function (e, n, r, i, a) {
      t.batch.trigger(this, {type: n, batchNum: e.batchNum}, [i, a])
    }, _triggerChange: function () {
      t.batch.trigger(this, "change", t.makeArray(arguments))
    }, _each: function (t) {
      var e = this.__get();
      for (var n in e)e.hasOwnProperty(n) && t(e[n], n)
    }, attr: function (e, n) {
      var r = typeof e;
      return"string" !== r && "number" !== r ? this._attrs(e, n) : 1 === arguments.length ? (t.__reading && t.__reading(this, e), this._get(e)) : (this._set(e, n), this)
    }, each: function () {
      return t.__reading && t.__reading(this, "__keys"), t.each.apply(undefined, [this.__get()].concat(t.makeArray(arguments)))
    }, removeAttr: function (e) {
      var r = t.List && this instanceof t.List, i = n(e), a = i.shift(), s = r ? this[a] : this._data[a];
      return i.length ? s.removeAttr(i) : (r ? this.splice(a, 1) : a in this._data && (delete this._data[a], a in this.constructor.prototype || delete this[a], t.batch.trigger(this, "__keys"), this._triggerChange(a, "remove", undefined, s)), s)
    }, _get: function (t) {
      var e = "string" == typeof t && !!~t.indexOf(".") && this.__get(t);
      if (e)return e;
      var r = n(t), i = this.__get(r.shift());
      return r.length ? i ? i._get(r) : undefined : i
    }, __get: function (e) {
      return e ? this[e] && this[e].isComputed && t.isFunction(this.constructor.prototype[e]) ? this[e]() : this._data[e] : this._data
    }, _set: function (t, e, r) {
      var i = n(t, r), a = i.shift(), s = this.__get(a);
      if (o.helpers.canMakeObserve(s) && i.length)s._set(i, e); else {
        if (i.length)throw"can.Map: Object does not exist";
        this.__convert && (e = this.__convert(a, e)), this.__set(a, e, s)
      }
    }, __set: function (e, n, r) {
      if (n !== r) {
        var i = this.__get().hasOwnProperty(e) ? "set" : "add";
        this.___set(e, o.helpers.canMakeObserve(n) ? o.helpers.hookupBubble(n, e, this) : n), "add" == i && t.batch.trigger(this, "__keys", undefined), this._triggerChange(e, i, n, r), r && o.helpers.unhookup([r], this)
      }
    }, ___set: function (e, n) {
      this[e] && this[e].isComputed && t.isFunction(this.constructor.prototype[e]) && this[e](n), this._data[e] = n, t.isFunction(this.constructor.prototype[e]) || (this[e] = n)
    }, bind: function (e) {
      var n = this._computedBindings && this._computedBindings[e];
      if (n)if (n.count)n.count++; else {
        n.count = 1;
        var r = this;
        n.handler = function (n, i, a) {
          t.batch.trigger(r, {type: e, batchNum: n.batchNum}, [i, a])
        }, this[e].bind("change", n.handler)
      }
      return t.bindAndSetup.apply(this, arguments)
    }, unbind: function (e) {
      var n = this._computedBindings && this._computedBindings[e];
      return n && (1 == n.count ? (n.count = 0, this[e].unbind("change", n.handler), delete n.handler) : n.count++), t.unbindAndTeardown.apply(this, arguments)
    }, serialize: function () {
      return t.Map.helpers.serialize(this, "serialize", {})
    }, _attrs: function (e, n) {
      if (e === undefined)return o.helpers.serialize(this, "attr", {});
      e = t.simpleExtend({}, e);
      var r, i, a = this;
      t.batch.start(), this.each(function (r, s) {
        if ("_cid" !== s) {
          if (i = e[s], i === undefined)return n && a.removeAttr(s), undefined;
          a.__convert && (i = a.__convert(s, i)), i instanceof t.Map ? a.__set(s, i, r) : o.helpers.canMakeObserve(r) && o.helpers.canMakeObserve(i) && r.attr ? r.attr(i, n) : r != i && a.__set(s, i, r), delete e[s]
        }
      });
      for (var r in e)"_cid" !== r && (i = e[r], this._set(r, i, !0));
      return t.batch.stop(), this
    }, compute: function (e) {
      return t.isFunction(this.constructor.prototype[e]) ? t.compute(this[e], this) : t.compute(this, e)
    }});
    return o.prototype.on = o.prototype.bind, o.prototype.off = o.prototype.unbind, o
  }(__m2, __m13, __m9, __m14), __m15 = function (t, e) {
    var n = [].splice, r = function () {
      var t = {0: "a", length: 1};
      return n.call(t, 0, 1), !t[0]
    }(), i = e({Map: e}, {setup: function (e, n) {
      if (this.length = 0, t.cid(this, ".map"), this._init = 1, e = e || [], t.isDeferred(e))this.replace(e); else {
        var r = e.length && t.Map.helpers.addToMap(e, this);
        this.push.apply(this, t.makeArray(e || []))
      }
      r && r(), this.bind("change", t.proxy(this._changes, this)), t.simpleExtend(this, n), delete this._init
    }, _triggerChange: function (n, r, i, a) {
      e.prototype._triggerChange.apply(this, arguments), ~n.indexOf(".") || ("add" === r ? (t.batch.trigger(this, r, [i, +n]), t.batch.trigger(this, "length", [this.length])) : "remove" === r ? (t.batch.trigger(this, r, [a, +n]), t.batch.trigger(this, "length", [this.length])) : t.batch.trigger(this, r, [i, +n]))
    }, __get: function (t) {
      return t ? this[t] : this
    }, ___set: function (t, e) {
      this[t] = e, +t >= this.length && (this.length = +t + 1)
    }, _each: function (t) {
      for (var e = this.__get(), n = 0; e.length > n; n++)t(e[n], n)
    }, _bindsetup: e.helpers.makeBindSetup("*"), serialize: function () {
      return e.helpers.serialize(this, "serialize", [])
    }, splice: function (i, a) {
      var s, o = t.makeArray(arguments);
      for (s = 2; o.length > s; s++) {
        var u = o[s];
        e.helpers.canMakeObserve(u) && (o[s] = e.helpers.hookupBubble(u, "*", this, this.constructor.Map, this.constructor))
      }
      a === undefined && (a = o[1] = this.length - i);
      var c = n.apply(this, o);
      if (!r)for (var s = this.length; c.length + this.length > s; s++)delete this[s];
      return t.batch.start(), a > 0 && (this._triggerChange("" + i, "remove", undefined, c), e.helpers.unhookup(c, this)), o.length > 2 && this._triggerChange("" + i, "add", o.slice(2), c), t.batch.stop(), c
    }, _attrs: function (n, r) {
      return n === undefined ? e.helpers.serialize(this, "attr", []) : (n = t.makeArray(n), t.batch.start(), this._updateAttrs(n, r), t.batch.stop(), undefined)
    }, _updateAttrs: function (t, n) {
      for (var r = Math.min(t.length, this.length), i = 0; r > i; i++) {
        var a = this[i], s = t[i];
        e.helpers.canMakeObserve(a) && e.helpers.canMakeObserve(s) ? a.attr(s, n) : a != s && this._set(i, s)
      }
      t.length > this.length ? this.push.apply(this, t.slice(this.length)) : t.length < this.length && n && this.splice(t.length)
    }}), a = function (e) {
      return e[0] && t.isArray(e[0]) ? e[0] : t.makeArray(e)
    };
    return t.each({push: "length", unshift: 0}, function (t, n) {
      var r = [][n];
      i.prototype[n] = function () {
        var n, i, a = [], s = t ? this.length : 0, o = arguments.length;
        for (this.constructor; o--;)i = arguments[o], a[o] = e.helpers.canMakeObserve(i) ? e.helpers.hookupBubble(i, "*", this, this.constructor.Map, this.constructor) : i;
        return n = r.apply(this, a), (!this.comparator || a.length) && this._triggerChange("" + s, "add", a, undefined), n
      }
    }), t.each({pop: "length", shift: 0}, function (e, n) {
      i.prototype[n] = function () {
        var r = a(arguments), i = e && this.length ? this.length - 1 : 0, s = [][n].apply(this, r);
        return this._triggerChange("" + i, "remove", undefined, [s]), s && s.unbind && t.stopListening.call(this, s, "change"), s
      }
    }), t.extend(i.prototype, {indexOf: function (e, n) {
      return this.attr("length"), t.inArray(e, this, n)
    }, join: function () {
      return[].join.apply(this.attr(), arguments)
    }, reverse: [].reverse, slice: function () {
      var t = Array.prototype.slice.apply(this, arguments);
      return new this.constructor(t)
    }, concat: function () {
      var e = [];
      return t.each(t.makeArray(arguments), function (n, r) {
        e[r] = n instanceof t.List ? n.serialize() : n
      }), new this.constructor(Array.prototype.concat.apply(this.serialize(), e))
    }, forEach: function (e, n) {
      return t.each(this, e, n || this)
    }, replace: function (e) {
      return t.isDeferred(e) ? e.then(t.proxy(this.replace, this)) : this.splice.apply(this, [0, this.length].concat(t.makeArray(e || []))), this
    }}), t.List = e.List = i, t.List
  }(__m2, __m12), __m16 = function (t) {
    var e = ["__reading", "__clearReading", "__setReading"], n = function (n) {
      for (var r = {}, i = 0; e.length > i; i++)r[e[i]] = t[e[i]];
      return t.__reading = function (t, e) {
        n.push({obj: t, attr: e + ""})
      }, t.__clearReading = function () {
        return n.splice(0, n.length)
      }, t.__setReading = function (t) {
        [].splice.apply(n, [0, n.length].concat(t))
      }, r
    }, r = function () {
    }, i = function (e, r) {
      var i = [], a = n(i), s = e.call(r);
      return t.simpleExtend(t, a), {value: s, observed: i}
    }, a = function (e, n, r, a) {
      var s, o = {}, u = !0, c = {value: undefined, teardown: function () {
        for (var t in o) {
          var e = o[t];
          e.observe.obj.unbind(e.observe.attr, h), delete o[t]
        }
      }}, h = function (t) {
        if (!(a && !a.bound || t.batchNum !== undefined && t.batchNum === s)) {
          var e = c.value, n = l();
          c.value = n, n !== e && r(n, e), s = s = t.batchNum
        }
      }, l = function () {
        var t, r = i(e, n), a = r.observed, s = r.value;
        u = !u;
        for (var c = 0, l = a.length; l > c; c++)t = a[c], o[t.obj._cid + "|" + t.attr] ? o[t.obj._cid + "|" + t.attr].matched = u : (o[t.obj._cid + "|" + t.attr] = {matched: u, observe: t}, t.obj.bind(t.attr, h));
        for (var f in o) {
          var t = o[f];
          t.matched !== u && (t.observe.obj.unbind(t.observe.attr, h), delete o[f])
        }
        return s
      };
      return c.value = l(), c.isListening = !t.isEmptyObject(o), c
    };
    t.compute = function (e, n, s) {
      if (e && e.isComputed)return e;
      var o, u, c, h, l = {bound: !1, hasDependencies: !1}, f = r, p = r, d = function () {
        return c
      }, g = function (t) {
        c = t
      }, m = !0, _ = t.makeArray(arguments), v = function (e, n) {
        c = e, t.batch.trigger(u, "change", [e, n])
      };
      if (u = function (e) {
        if (arguments.length) {
          var r = c, i = g.call(n, e, r);
          return u.hasDependencies ? d.call(n) : (c = i === undefined ? d.call(n) : i, r !== c && t.batch.trigger(u, "change", [c, r]), c)
        }
        return t.__reading && m && (t.__reading(u, "change"), !l.bound && t.compute.temporarilyBind(u)), l.bound ? c : d.call(n)
      }, "function" == typeof e)g = e, d = e, m = s === !1 ? !1 : !0, u.hasDependencies = !1, f = function (t) {
        o = a(e, n || this, t, l), u.hasDependencies = o.isListening, c = o.value
      }, p = function () {
        o && o.teardown()
      }; else if (n)if ("string" == typeof n) {
        var b = n, y = e instanceof t.Map;
        y && (u.hasDependencies = !0), d = function () {
          return y ? e.attr(b) : e[b]
        }, g = function (t) {
          y ? e.attr(b, t) : e[b] = t
        };
        var w;
        f = function (n) {
          w = function () {
            n(d(), c)
          }, t.bind.call(e, s || b, w), c = i(d).value
        }, p = function () {
          t.unbind.call(e, s || b, w)
        }
      } else if ("function" == typeof n)c = e, g = n, n = s, h = "setter"; else {
        c = e;
        var x = n;
        d = x.get || d, g = x.set || g, f = x.on || f, p = x.off || p
      } else c = e;
      return t.cid(u, "compute"), t.simpleExtend(u, {isComputed: !0, _bindsetup: function () {
        l.bound = !0;
        var e = t.__reading;
        delete t.__reading, f.call(this, v), t.__reading = e
      }, _bindteardown: function () {
        p.call(this, v), l.bound = !1
      }, bind: t.bindAndSetup, unbind: t.unbindAndTeardown, clone: function (e) {
        return e && ("setter" == h ? _[2] = e : _[1] = e), t.compute.apply(t, _)
      }})
    };
    var s, o = function () {
      for (var t = 0, e = s.length; e > t; t++)s[t].unbind("change", r);
      s = null
    };
    return t.compute.temporarilyBind = function (t) {
      t.bind("change", r), s || (s = [], setTimeout(o, 10)), s.push(t)
    }, t.compute.binder = a, t.compute.truthy = function (e) {
      return t.compute(function () {
        var t = e();
        return"function" == typeof t && (t = t()), !!t
      })
    }, t.compute
  }(__m2, __m13, __m14), __m11 = function (t) {
    return t.Observe = t.Map, t.Observe.startBatch = t.batch.start, t.Observe.stopBatch = t.batch.stop, t.Observe.triggerBatch = t.batch.trigger, t
  }(__m2, __m12, __m15, __m16), __m19 = function (t) {
    var e = t.isFunction, n = t.makeArray, r = 1, i = t.view = t.template = function (n, r, a, s) {
      e(a) && (s = a, a = undefined);
      var o = function (t) {
        return i.frag(t)
      }, u = e(s) ? function (t) {
        s(o(t))
      } : null, c = e(n) ? n(r, a, u) : i.render(n, r, a, u), h = t.Deferred();
      return e(c) ? c : t.isDeferred(c) ? (c.then(function (t, e) {
        h.resolve.call(h, o(t), e)
      }, function () {
        h.fail.apply(h, arguments)
      }), h) : o(c)
    };
    t.extend(i, {frag: function (t, e) {
      return i.hookup(i.fragment(t), e)
    }, fragment: function (e) {
      var n = t.buildFragment(e, document.body);
      return n.childNodes.length || n.appendChild(document.createTextNode("")), n
    }, toId: function (e) {
      return t.map(("" + e).split(/\/|\./g),function (t) {
        return t ? t : undefined
      }).join("_")
    }, hookup: function (e, n) {
      var r, a, s = [];
      return t.each(e.childNodes ? t.makeArray(e.childNodes) : e, function (e) {
        1 === e.nodeType && (s.push(e), s.push.apply(s, t.makeArray(e.getElementsByTagName("*"))))
      }), t.each(s, function (t) {
        t.getAttribute && (r = t.getAttribute("data-view-id")) && (a = i.hookups[r]) && (a(t, n, r), delete i.hookups[r], t.removeAttribute("data-view-id"))
      }), e
    }, hookups: {}, hook: function (t) {
      return i.hookups[++r] = t, " data-view-id='" + r + "'"
    }, cached: {}, cachedRenderers: {}, cache: !0, register: function (t) {
      this.types["." + t.suffix] = t
    }, types: {}, ext: ".ejs", registerScript: function () {
    }, preload: function () {
    }, render: function (r, a, c, h) {
      e(c) && (h = c, c = undefined);
      var l = o(a);
      if (l.length) {
        var f = new t.Deferred, p = t.extend({}, a);
        return l.push(s(r, !0)), t.when.apply(t, l).then(function (e) {
          var r, i = n(arguments), s = i.pop();
          if (t.isDeferred(a))p = u(e); else for (var o in a)t.isDeferred(a[o]) && (p[o] = u(i.shift()));
          r = s(p, c), f.resolve(r, p), h && h(r, p)
        }, function () {
          f.reject.apply(f, arguments)
        }), f
      }
      if (t.__reading) {
        var d = t.__reading;
        t.__reading = null
      }
      var g, m = e(h), f = s(r, m);
      if (t.Map && t.__reading && (t.__reading = d), m)g = f, f.then(function (t) {
        h(a ? t(a, c) : t)
      }); else {
        if ("resolved" === f.state() && f.__view_id) {
          var _ = i.cachedRenderers[f.__view_id];
          return a ? _(a, c) : _
        }
        f.then(function (t) {
          g = a ? t(a, c) : t
        })
      }
      return g
    }, registerView: function (e, n, r, a) {
      var s = (r || i.types[i.ext]).renderer(e, n);
      return a = a || new t.Deferred, i.cache && (i.cached[e] = a, a.__view_id = e, i.cachedRenderers[e] = s), a.resolve(s)
    }});
    var a = function (t, e) {
      if (!t.length)throw"can.view: No template or empty template:" + e
    }, s = function (e, n) {
      var r, s, o, u = "string" == typeof e ? e : e.url, c = e.engine || u.match(/\.[\w\d]+$/);
      if (u.match(/^#/) && (u = u.substr(1)), (s = document.getElementById(u)) && (c = "." + s.type.match(/\/(x\-)?(.+)/)[2]), c || i.cached[u] || (u += c = i.ext), t.isArray(c) && (c = c[0]), o = i.toId(u), u.match(/^\/\//)) {
        var h = u.substr(2);
        u = window.steal ? steal.config().root.mapJoin("" + steal.id(h)) : h
      }
      if (r = i.types[c], i.cached[o])return i.cached[o];
      if (s)return i.registerView(o, s.innerHTML, r);
      var l = new t.Deferred;
      return t.ajax({async: n, url: u, dataType: "text", error: function (t) {
        a("", u), l.reject(t)
      }, success: function (t) {
        a(t, u), i.registerView(o, t, r, l)
      }}), l
    }, o = function (e) {
      var n = [];
      if (t.isDeferred(e))return[e];
      for (var r in e)t.isDeferred(e[r]) && n.push(e[r]);
      return n
    }, u = function (e) {
      return t.isArray(e) && "success" === e[1] ? e[0] : e
    };
    return window.steal && steal.type("view js", function (t, e) {
      var n = i.types["." + t.type], r = i.toId(t.id);
      t.text = "steal('" + (n.plugin || "can/view/" + t.type) + "',function(can){return " + "can.view.preload('" + r + "'," + t.text + ");\n})", e()
    }), t.extend(i, {register: function (t) {
      this.types["." + t.suffix] = t, window.steal && steal.type(t.suffix + " view js", function (t, e) {
        var n = i.types["." + t.type], r = i.toId(t.id + "");
        t.text = n.script(r, t.text), e()
      }), i[t.suffix] = function (e, n) {
        if (!n) {
          var r = function () {
            return i.frag(r.render.apply(this, arguments))
          };
          return r.render = function () {
            var n = t.renderer(null, e);
            return n.apply(n, arguments)
          }, r
        }
        return i.preload(e, t.renderer(e, n))
      }
    }, registerScript: function (t, e, n) {
      return"can.view.preload('" + e + "'," + i.types["." + t].script(e, n) + ");"
    }, preload: function (e, n) {
      function r() {
        return i.frag(n.apply(this, arguments))
      }

      var a = i.cached[e] = (new t.Deferred).resolve(function (t, e) {
        return n.call(t, t, e)
      });
      return r.render = n, a.__view_id = e, i.cachedRenderers[e] = n, r
    }}), t
  }(__m2), __m18 = function (t) {
    var e = function (e) {
      return e instanceof t.Map || e && e.__get
    }, n = /(\\)?\./g, r = /\\\./g, i = function (t) {
      var e = [], i = 0;
      return t.replace(n, function (n, a, s) {
        a || (e.push(t.slice(i, s).replace(r, ".")), i = s + n.length)
      }), e.push(t.slice(i).replace(r, ".")), e
    }, a = t.Construct.extend({read: function (n, r, i) {
      i = i || {};
      for (var a, s, o, u = n, c = 0, h = r.length; h > c; c++)if (s = u, s && s.isComputed && (i.foundObservable && i.foundObservable(s, c), s = s()), e(s) ? (!o && i.foundObservable && i.foundObservable(s, c), o = 1, u = "function" == typeof s[r[c]] && s.constructor.prototype[r[c]] === s[r[c]] ? i.returnObserveMethods ? u[r[c]] : s[r[c]].apply(s, i.args || []) : u.attr(r[c])) : u = s[r[c]], u && u.isComputed && !i.isArgument && h - 1 > c && (!o && i.foundObservable && i.foundObservable(s, c + 1), u = u()), a = typeof u, r.length - 1 > c && (null == u || "function" != a && "object" != a))return i.earlyExit && i.earlyExit(s, c, u), {value: undefined, parent: s};
      return u === undefined && i.earlyExit && i.earlyExit(s, c - 1), "function" == typeof u && (i.isArgument ? u.isComputed || i.proxyMethods === !1 || (u = t.proxy(u, s)) : (u.isComputed && !o && i.foundObservable && i.foundObservable(u, c), u = u.call(s))), {value: u, parent: s}
    }}, {init: function (t, e) {
      this._context = t, this._parent = e
    }, attr: function (t) {
      return this.read(t, {isArgument: !0, returnObserveMethods: !0, proxyMethods: !1}).value
    }, add: function (t) {
      return t !== this._context ? new this.constructor(t, this) : this
    }, computeData: function (e, n) {
      n = n || {args: []};
      var r, i, s = this, o = {compute: t.compute(function (t) {
        if (!arguments.length) {
          if (r)return a.read(r, i, n).value;
          var u = s.read(e, n);
          return r = u.rootObserve, i = u.reads, o.scope = u.scope, o.initialValue = u.value, u.value
        }
        if (r.isComputed && !i.length)r(t); else {
          var c = i.length - 1;
          a.read(r, i.slice(0, c)).value.attr(i[c], t)
        }
      })};
      return o
    }, read: function (e, n) {
      if ("../" === e.substr(0, 3))return this._parent.read(e.substr(3), n);
      if (".." == e)return{value: this._parent._context};
      if ("." == e || "this" == e)return{value: this._context};
      for (var r, s, o, u, c, h, l = -1 == e.indexOf("\\.") ? e.split(".") : i(e), f = (l.length, this), p = [], d = -1; f;) {
        if (r = f._context, null != r) {
          var g = a.read(r, l, t.simpleExtend({foundObservable: function (t, e) {
            c = t, h = l.slice(e)
          }, earlyExit: function (e, n) {
            n > d && (s = c, p = h, d = n, u = f, o = t.__clearReading && t.__clearReading())
          }}, n));
          if (g.value !== undefined)return{scope: f, rootObserve: c, value: g.value, reads: h}
        }
        t.__clearReading && t.__clearReading(), f = f._parent
      }
      return s ? (t.__setReading && t.__setReading(o), {scope: u, rootObserve: s, reads: p, value: undefined}) : {names: l, value: undefined}
    }});
    return t.view.Scope = a, a
  }(__m2, __m9, __m12, __m15, __m19, __m16), __m21 = function () {
    var t = {tagToContentPropMap: {option: "textContent"in document.createElement("option") ? "textContent" : "innerText", textarea: "value"}, attrMap: {"class": "className", value: "value", innerText: "innerText", textContent: "textContent", checked: !0, disabled: !0, readonly: !0, required: !0, src: function (t, e) {
      null == e || "" == e ? t.removeAttribute("src") : t.setAttribute("src", e)
    }}, attrReg: /([^\s]+)[\s]*=[\s]*/, defaultValue: ["input", "textarea"], tagMap: {"": "span", table: "tbody", tr: "td", ol: "li", ul: "li", tbody: "tr", thead: "tr", tfoot: "tr", select: "option", optgroup: "option"}, reverseTagMap: {tr: "tbody", option: "select", td: "tr", th: "tr", li: "ul"}, getParentNode: function (t, e) {
      return e && 11 === t.parentNode.nodeType ? e : t.parentNode
    }, setAttr: function (e, n, r) {
      var i = ("" + e.nodeName).toLowerCase(), a = t.attrMap[n];
      "function" == typeof a ? a(e, r) : a === !0 ? e[n] = !0 : a ? (e[a] = r, "value" === a && can.inArray(i, t.defaultValue) >= 0 && (e.defaultValue = r)) : e.setAttribute(n, r)
    }, getAttr: function (e, n) {
      return(t.attrMap[n] && e[t.attrMap[n]] ? e[t.attrMap[n]] : e.getAttribute(n)) || ""
    }, removeAttr: function (e, n) {
      var r = t.attrMap[n];
      "function" == typeof prop && prop(e, undefined), r === !0 ? e[n] = !1 : "string" == typeof r ? e[r] = "" : e.removeAttribute(n)
    }, contentText: function (t) {
      return"string" == typeof t ? t : t || 0 === t ? "" + t : ""
    }, after: function (t, e) {
      var n = t[t.length - 1];
      n.nextSibling ? can.insertBefore(n.parentNode, e, n.nextSibling) : can.appendChild(n.parentNode, e)
    }, replace: function (e, n) {
      t.after(e, n), can.remove(can.$(e))
    }};
    return function () {
      var e = document.createElement("div");
      e.setAttribute("style", "width: 5px"), e.setAttribute("style", "width: 10px"), t.attrMap.style = function (t, e) {
        t.style.cssText = e || ""
      }
    }(), t
  }(), __m20 = function (can, elements) {
    var newLine = /(\r|\n)+/g, clean = function (t) {
      return t.split("\\").join("\\\\").split("\n").join("\\n").split('"').join('\\"').split("	").join("\\t")
    }, getTag = function (t, e, n) {
      if (t)return t;
      for (; e.length > n;) {
        if ("<" == e[n] && elements.reverseTagMap[e[n + 1]])return elements.reverseTagMap[e[n + 1]];
        n++
      }
      return""
    }, bracketNum = function (t) {
      return--t.split("{").length - --t.split("}").length
    }, myEval = function (script) {
      eval(script)
    }, attrReg = /([^\s]+)[\s]*=[\s]*$/, startTxt = "var ___v1ew = [];", finishTxt = "return ___v1ew.join('')", put_cmd = "___v1ew.push(\n", insert_cmd = put_cmd, htmlTag = null, quote = null, beforeQuote = null, rescan = null, getAttrName = function () {
      var t = beforeQuote.match(attrReg);
      return t && t[1]
    }, status = function () {
      return quote ? "'" + getAttrName() + "'" : htmlTag ? 1 : 0
    }, top = function (t) {
      return t[t.length - 1]
    }, automaticCustomElementCharacters = /[-\:]/, Scanner;
    return can.view.Scanner = Scanner = function (t) {
      can.extend(this, {text: {}, tokens: []}, t), this.text.options = this.text.options || "", this.tokenReg = [], this.tokenSimple = {"<": "<", ">": ">", '"': '"', "'": "'"}, this.tokenComplex = [], this.tokenMap = {};
      for (var e, n = 0; e = this.tokens[n]; n++)e[2] ? (this.tokenReg.push(e[2]), this.tokenComplex.push({abbr: e[1], re: RegExp(e[2]), rescan: e[3]})) : (this.tokenReg.push(e[1]), this.tokenSimple[e[1]] = e[0]), this.tokenMap[e[0]] = e[1];
      this.tokenReg = RegExp("(" + this.tokenReg.slice(0).concat(["<", ">", '"', "'"]).join("|") + ")", "g")
    }, Scanner.attributes = {}, Scanner.regExpAttributes = {}, Scanner.attribute = function (t, e) {
      "string" == typeof t ? Scanner.attributes[t] = e : Scanner.regExpAttributes[t] = {match: t, callback: e}
    }, Scanner.hookupAttributes = function (t, e) {
      can.each(t && t.attrs || [], function (n) {
        t.attr = n, Scanner.attributes[n] ? Scanner.attributes[n](t, e) : can.each(Scanner.regExpAttributes, function (r) {
          r.match.test(n) && r.callback(t, e)
        })
      })
    }, Scanner.tag = function (t, e) {
      window.html5 && (html5.elements += " " + t, html5.shivDocument()), Scanner.tags[t.toLowerCase()] = e
    }, Scanner.tags = {}, Scanner.hookupTag = function (t) {
      var e = can.view.getHooks();
      return can.view.hook(function (n) {
        can.each(e, function (t) {
          t(n)
        });
        var r = t.tagName, i = t.options.read("helpers._tags." + r, {isArgument: !0, proxyMethods: !1}).value, a = i || Scanner.tags[r], s = t.scope, o = a ? a(n, t) : s;
        if (o && t.subtemplate) {
          s !== o && (s = s.add(o));
          var u = can.view.frag(t.subtemplate(s, t.options));
          can.appendChild(n, u)
        }
        can.view.Scanner.hookupAttributes(t, n)
      })
    }, Scanner.prototype = {helpers: [], scan: function (t, e) {
      var n = [], r = 0, i = this.tokenSimple, a = this.tokenComplex;
      t = t.replace(newLine, "\n"), this.transform && (t = this.transform(t)), t.replace(this.tokenReg, function (e, s) {
        var o = arguments[arguments.length - 2];
        if (o > r && n.push(t.substring(r, o)), i[e])n.push(e); else for (var u, c = 0; u = a[c]; c++)if (u.re.test(e)) {
          n.push(u.abbr), u.rescan && n.push(u.rescan(s));
          break
        }
        r = o + s.length
      }), t.length > r && n.push(t.substr(r));
      var s, o, u, c, h = "", l = [startTxt + (this.text.start || "")], f = function (t, e) {
        l.push(put_cmd, '"', clean(t), '"' + (e || "") + ");")
      }, p = [], d = null, g = !1, m = {attributeHookups: [], tagHookups: []}, _ = "", v = [], b = !1, y = !1, w = 0, x = this.tokenMap;
      for (htmlTag = quote = beforeQuote = null; (u = n[w++]) !== undefined;) {
        if (null === d)switch (u) {
          case x.left:
          case x.escapeLeft:
          case x.returnLeft:
            g = htmlTag && 1;
          case x.commentLeft:
            d = u, h.length && f(h), h = "";
            break;
          case x.escapeFull:
            g = htmlTag && 1, rescan = 1, d = x.escapeLeft, h.length && f(h), rescan = n[w++], h = rescan.content || rescan, rescan.before && f(rescan.before), n.splice(w, 0, x.right);
            break;
          case x.commentFull:
            break;
          case x.templateLeft:
            h += x.left;
            break;
          case"<":
            0 !== n[w].indexOf("!--") && (htmlTag = 1, g = 0), h += u;
            break;
          case">":
            htmlTag = 0;
            var k = "/" == h.substr(h.length - 1) || "--" == h.substr(h.length - 2), A = "";
            if (m.attributeHookups.length && (A = "attrs: ['" + m.attributeHookups.join("','") + "'], ", m.attributeHookups = []), _ === top(m.tagHookups))k && (h = h.substr(0, h.length - 1)), l.push(put_cmd, '"', clean(h), '"', ",can.view.Scanner.hookupTag({tagName:'" + _ + "'," + A + "scope: " + (this.text.scope || "this") + this.text.options), k ? (l.push("}));"), h = "/>", m.tagHookups.pop()) : "<" === n[w] && n[w + 1] === "/" + _ ? (l.push("}));"), h = u, m.tagHookups.pop()) : (l.push(",subtemplate: function(" + this.text.argNames + "){\n" + startTxt + (this.text.start || "")), h = ""); else if (g || !b && elements.tagToContentPropMap[v[v.length - 1]] || A) {
              var M = ",can.view.pending({" + A + "scope: " + (this.text.scope || "this") + this.text.options + '}),"';
              k ? f(h.substr(0, h.length - 1), M + '/>"') : f(h, M + '>"'), h = "", g = 0
            } else h += u;
            (k || b) && (v.pop(), _ = v[v.length - 1], b = !1), m.attributeHookups = [];
            break;
          case"'":
          case'"':
            if (htmlTag)if (quote && quote === u) {
              quote = null;
              var N = getAttrName();
              if (Scanner.attributes[N] ? m.attributeHookups.push(N) : can.each(Scanner.regExpAttributes, function (t) {
                t.match.test(N) && m.attributeHookups.push(N)
              }), y) {
                h += u, f(h), l.push(finishTxt, "}));\n"), h = "", y = !1;
                break
              }
            } else if (null === quote && (quote = u, beforeQuote = s, c = getAttrName(), "img" == _ && "src" == c || "style" === c)) {
              f(h.replace(attrReg, "")), h = "", y = !0, l.push(insert_cmd, "can.view.txt(2,'" + getTag(_, n, w) + "'," + status() + ",this,function(){", startTxt), f(c + "=" + u);
              break
            }
          default:
            if ("<" === s) {
              _ = "!--" === u.substr(0, 3) ? "!--" : u.split(/\s/)[0];
              var C = !1;
              if (0 === _.indexOf("/")) {
                C = !0;
                var T = _.substr(1)
              }
              C ? (top(v) === T && (_ = T, b = !0), top(m.tagHookups) == T && (f(h.substr(0, h.length - 1)), l.push(finishTxt + "}}) );"), h = "><", m.tagHookups.pop())) : (_.lastIndexOf("/") === _.length - 1 && (_ = _.substr(0, _.length - 1)), "!--" !== _ && (Scanner.tags[_] || automaticCustomElementCharacters.test(_)) && ("content" === _ && elements.tagMap[top(v)] && (u = u.replace("content", elements.tagMap[top(v)])), m.tagHookups.push(_)), v.push(_))
            }
            h += u
        } else switch (u) {
          case x.right:
          case x.returnRight:
            switch (d) {
              case x.left:
                o = bracketNum(h), 1 == o ? (l.push(insert_cmd, "can.view.txt(0,'" + getTag(_, n, w) + "'," + status() + ",this,function(){", startTxt, h), p.push({before: "", after: finishTxt + "}));\n"})) : (r = p.length && -1 == o ? p.pop() : {after: ";"}, r.before && l.push(r.before), l.push(h, ";", r.after));
                break;
              case x.escapeLeft:
              case x.returnLeft:
                o = bracketNum(h), o && p.push({before: finishTxt, after: "}));\n"});
                for (var j = d === x.escapeLeft ? 1 : 0, O = {insert: insert_cmd, tagName: getTag(_, n, w), status: status(), specialAttribute: y}, L = 0; this.helpers.length > L; L++) {
                  var S = this.helpers[L];
                  if (S.name.test(h)) {
                    h = S.fn(h, O), S.name.source == /^>[\s]*\w*/.source && (j = 0);
                    break
                  }
                }
                "object" == typeof h ? h.raw && l.push(h.raw) : y ? l.push(insert_cmd, h, ");") : l.push(insert_cmd, "can.view.txt(\n" + j + ",\n'" + _ + "',\n" + status() + ",\nthis,\nfunction(){ " + (this.text.escape || "") + "return ", h, o ? startTxt : "}));\n"), rescan && rescan.after && rescan.after.length && (f(rescan.after.length), rescan = null)
            }
            d = null, h = "";
            break;
          case x.templateLeft:
            h += x.left;
            break;
          default:
            h += u
        }
        s = u
      }
      h.length && f(h), l.push(";");
      var E = l.join(""), R = {out: (this.text.outStart || "") + E + " " + finishTxt + (this.text.outEnd || "")};
      return myEval.call(R, "this.fn = (function(" + this.text.argNames + "){" + R.out + "});\r\n//@ sourceURL=" + e + ".js"), R
    }}, can.view.Scanner.tag("content", function (t, e) {
      return e.scope
    }), Scanner
  }(__m19, __m21), __m24 = function (t) {
    var e = !0;
    try {
      document.createTextNode("")._ = 0
    } catch (n) {
      e = !1
    }
    var r = {}, i = {}, a = "ejs_" + Math.random(), s = 0, o = function (t) {
      if (e || 3 !== t.nodeType)return t[a] ? t[a] : t[a] = (t.nodeName ? "element_" : "obj_") + ++s;
      for (var n in i)if (i[n] === t)return n;
      return i["text_" + ++s] = t, "text_" + s
    }, u = [].splice, c = {id: o, update: function (e, n) {
      t.each(e.childNodeLists, function (t) {
        c.unregister(t)
      }), e.childNodeLists = [], t.each(e, function (t) {
        delete r[o(t)]
      });
      var n = t.makeArray(n);
      t.each(n, function (t) {
        r[o(t)] = e
      });
      var i = e.length, a = e[0];
      u.apply(e, [0, i].concat(n));
      for (var s = e; s = s.parentNodeList;)u.apply(s, [t.inArray(a, s), i].concat(n))
    }, register: function (t, e, n) {
      if (t.unregistered = e, t.childNodeLists = [], !n) {
        if (t.length > 1)throw"does not work";
        var i = o(t[0]);
        n = r[i]
      }
      return t.parentNodeList = n, n && n.childNodeLists.push(t), t
    }, unregister: function (e) {
      e.isUnregistered || (e.isUnregistered = !0, delete e.parentNodeList, t.each(e, function (t) {
        var e = o(t);
        delete r[e]
      }), e.unregistered && e.unregistered(), t.each(e.childNodeLists, function (t) {
        c.unregister(t)
      }))
    }, nodeMap: r};
    return c
  }(__m2, __m21), __m23 = function (t, e, n, r) {
    var i = function (e, n, r) {
      var i = !1, a = function () {
        return i || (i = !0, r(s), t.unbind.call(e, "removed", a)), !0
      }, s = {teardownCheck: function (t) {
        return t ? !1 : a()
      }};
      return t.bind.call(e, "removed", a), n(s), s
    }, a = function (t, e, n) {
      return i(t, function () {
        e.bind("change", n)
      }, function (t) {
        e.unbind("change", n), t.nodeList && r.unregister(t.nodeList)
      })
    }, s = function (t) {
      return(t || "").replace(/['"]/g, "").split("=")
    }, o = [].splice, u = {list: function (n, a, s, c, h) {
      var l, f = [n], p = [], d = [], g = function (n, i, a) {
        var u = document.createDocumentFragment(), h = [], l = [];
        if (t.each(i, function (e, n) {
          var i = t.compute(n + a), o = s.call(c, e, i), p = t.view.fragment(o);
          h.push(r.register(t.makeArray(p.childNodes), undefined, f)), u.appendChild(t.view.hookup(p)), l.push(i)
        }), p[a]) {
          var g = p[a][0];
          t.insertBefore(g.parentNode, u, g)
        } else e.after(0 == a ? [_] : p[a - 1], u);
        o.apply(p, [a, 0].concat(h)), o.apply(d, [a, 0].concat(l));
        for (var m = a + l.length, v = d.length; v > m; m++)d[m](m)
      }, m = function (e, n, i, a) {
        if (a || !y.teardownCheck(_.parentNode)) {
          var s = p.splice(i, n.length), o = [];
          t.each(s, function (t) {
            [].push.apply(o, t), r.update(t, []), r.unregister(t)
          }), d.splice(i, n.length);
          for (var u = i, c = d.length; c > u; u++)d[u](u);
          t.remove(t.$(o))
        }
      }, h = e.getParentNode(n, h), _ = document.createTextNode(""), v = function () {
        l && l.unbind && l.unbind("add", g).unbind("remove", m), m({}, {length: p.length}, 0, !0)
      }, b = function (t, e) {
        v(), l = e || [], l.bind && l.bind("add", g).bind("remove", m), g({}, l, 0)
      }, y = i(h, function () {
        t.isFunction(a) && a.bind("change", b)
      }, function () {
        t.isFunction(a) && a.unbind("change", b), v()
      });
      u.replace(f, _, y.teardownCheck), b({}, t.isFunction(a) ? a() : a)
    }, html: function (n, i, s) {
      var s = e.getParentNode(n, s), o = a(s, i, function (t, e) {
        var n = u[0].parentNode;
        n && c(e), o.teardownCheck(u[0].parentNode)
      }), u = [n], c = function (n) {
        var i = t.view.fragment("" + n), a = t.makeArray(u);
        r.update(u, i.childNodes), i = t.view.hookup(i, s), e.replace(a, i)
      };
      o.nodeList = u, r.register(u, o.teardownCheck), c(i())
    }, replace: function (n, i, a) {
      var s, o = n.slice(0);
      return r.register(n, a), "string" == typeof i ? s = t.view.fragment(i) : 11 !== i.nodeType ? (s = document.createDocumentFragment(), s.appendChild(i)) : s = i, r.update(n, s.childNodes), "string" == typeof i && (s = t.view.hookup(s, n[0].parentNode)), e.replace(o, s), n
    }, text: function (t, n, r) {
      var i = e.getParentNode(t, r), s = a(i, n, function (t, e) {
        "unknown" != typeof o.nodeValue && (o.nodeValue = "" + e), s.teardownCheck(o.parentNode)
      }), o = document.createTextNode(n());
      u.replace([t], o, s.teardownCheck)
    }, attributes: function (t, n, r) {
      var i = function (n) {
        var r = s(n), i = r.shift();
        i != o && o && e.removeAttr(t, o), i && (e.setAttr(t, i, r.join("=")), o = i)
      };
      if (a(t, n, function (t, e) {
        i(e)
      }), arguments.length >= 3)var o = s(r)[0]; else i(n())
    }, attributePlaceholder: "__!!__", attributeReplace: /__!!__/g, attribute: function (n, r, i) {
      a(n, i, function () {
        e.setAttr(n, r, c.render())
      });
      var s, o = t.$(n);
      s = t.data(o, "hooks"), s || t.data(o, "hooks", s = {});
      var c, h = e.getAttr(n, r), l = h.split(u.attributePlaceholder), f = [];
      f.push(l.shift(), l.join(u.attributePlaceholder)), s[r] ? s[r].computes.push(i) : s[r] = {render: function () {
        var t = 0, n = h ? h.replace(u.attributeReplace, function () {
          return e.contentText(c.computes[t++]())
        }) : e.contentText(c.computes[t++]());
        return n
      }, computes: [i], batchNum: undefined}, c = s[r], f.splice(1, 0, i()), e.setAttr(n, r, f.join(""))
    }, specialAttribute: function (t, n, r) {
      a(t, r, function (r, i) {
        e.setAttr(t, n, h(i))
      }), e.setAttr(t, n, h(r()))
    }}, c = /(\r|\n)+/g, h = function (t) {
      return t = t.replace(e.attrReg, "").replace(c, ""), /^["'].*["']$/.test(t) ? t.substr(1, t.length - 2) : t
    };
    return t.view.live = u, t.view.nodeLists = r, t.view.elements = e, u
  }(__m2, __m21, __m19, __m24), __m22 = function (t, e, n) {
    var r, i = [], a = function (t) {
      var n = e.tagMap[t] || "span";
      return"span" === n ? "@@!!@@" : "<" + n + ">" + a(n) + "</" + n + ">"
    }, s = function (e, n) {
      if ("string" == typeof e)return e;
      if (!e && 0 !== e)return"";
      var r = e.hookup && function (t, n) {
        e.hookup.call(e, t, n)
      } || "function" == typeof e && e;
      return r ? n ? "<" + n + " " + t.view.hook(r) + "></" + n + ">" : (i.push(r), "") : "" + e
    }, o = function (e, n) {
      return"string" == typeof e || "number" == typeof e ? t.esc(e) : s(e, n)
    }, u = !1, c = function () {
    };
    return t.extend(t.view, {live: n, setupLists: function () {
      var e, n = t.view.lists;
      return t.view.lists = function (t, n) {
        return e = {list: t, renderer: n}, Math.random()
      }, function () {
        return t.view.lists = n, e
      }
    }, pending: function (e) {
      var n = t.view.getHooks();
      return t.view.hook(function (r) {
        t.each(n, function (t) {
          t(r)
        }), t.view.Scanner.hookupAttributes(e, r)
      })
    }, getHooks: function () {
      var t = i.slice(0);
      return r = t, i = [], t
    }, onlytxt: function (t, e) {
      return o(e.call(t))
    }, txt: function (h, l, f, p, d) {
      var g, m = e.tagMap[l] || "span", _ = !1;
      if (u)g = d.call(p); else {
        ("string" == typeof f || 1 === f) && (u = !0);
        var v = t.view.setupLists(), b = function () {
          y.unbind("change", c)
        }, y = t.compute(d, p, !1);
        y.bind("change", c);
        var w = v();
        g = y(), u = !1, _ = y.hasDependencies
      }
      if (w)return b && b(), "<" + m + t.view.hook(function (t, e) {
        n.list(t, w.list, w.renderer, p, e)
      }) + "></" + m + ">";
      if (!_ || "function" == typeof g)return b && b(), (!h && "string" != typeof f || 2 === h ? s : o)(g, 0 === f && m);
      var x = e.tagToContentPropMap[l];
      if (0 !== f || x) {
        if (1 === f)return i.push(function (t) {
          n.attributes(t, y, y()), b()
        }), y();
        if (2 === h) {
          var k = f;
          return i.push(function (t) {
            n.specialAttribute(t, k, y), b()
          }), y()
        }
        var k = 0 === f ? x : f;
        return(0 === f ? r : i).push(function (t) {
          n.attribute(t, k, y), b()
        }), n.attributePlaceholder
      }
      return"<" + m + t.view.hook(h && "object" != typeof g ? function (t, e) {
        n.text(t, y, e), b()
      } : function (t, e) {
        n.html(t, y, e), b()
      }) + ">" + a(m) + "</" + m + ">"
    }}), t
  }(__m19, __m21, __m23, __m10), __m17 = function (t) {
    t.view.ext = ".mustache";
    var e = "scope", n = "___h4sh", r = "{scope:" + e + ",options:options}", i = e + ",options", a = /((([^\s]+?=)?('.*?'|".*?"))|.*?)\s/g, s = /^(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)|((.+?)=(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false)|(.+))))$/, o = function (t) {
      return'{get:"' + t.replace(/"/g, '\\"') + '"}'
    }, u = function (t) {
      return t && "string" == typeof t.get
    }, c = function (e) {
      return e instanceof t.Map || e && !!e._get
    }, h = function (t) {
      return t && t.splice && "number" == typeof t.length
    }, l = function (e, n, r) {
      return function (i, a) {
        return i === undefined || i instanceof t.view.Scope || (i = n.add(i)), a === undefined || a instanceof d || (a = r.add(a)), e(i, a || r)
      }
    };
    Mustache = function (e) {
      if (this.constructor != Mustache) {
        var n = new Mustache(e);
        return function (t, e) {
          return n.render(t, e)
        }
      }
      return"function" == typeof e ? (this.template = {fn: e}, undefined) : (t.extend(this, e), this.template = this.scanner.scan(this.text, this.name), undefined)
    }, t.Mustache = window.Mustache = Mustache, Mustache.prototype.render = function (e, n) {
      return e instanceof t.view.Scope || (e = new t.view.Scope(e || {})), n instanceof d || (n = new d(n || {})), n = n || {}, this.template.fn.call(e, e, n)
    }, t.extend(Mustache.prototype, {scanner: new t.view.Scanner({text: {start: "", scope: e, options: ",options: options", argNames: i}, tokens: [
      ["returnLeft", "{{{", "{{[{&]"],
      ["commentFull", "{{!}}", "^[\\s\\t]*{{!.+?}}\\n"],
      ["commentLeft", "{{!", "(\\n[\\s\\t]*{{!|{{!)"],
      ["escapeFull", "{{}}", "(^[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}$)", function (t) {
        return{before: /^\n.+?\n$/.test(t) ? "\n" : "", content: t.match(/\{\{(.+?)\}\}/)[1] || ""}
      }],
      ["escapeLeft", "{{"],
      ["returnRight", "}}}"],
      ["right", "}}"]
    ], helpers: [
      {name: /^>[\s]*\w*/, fn: function (e) {
        var n = t.trim(e.replace(/^>\s?/, "")).replace(/["|']/g, "");
        return"can.Mustache.renderPartial('" + n + "'," + i + ")"
      }},
      {name: /^\s*data\s/, fn: function (t) {
        var n = t.match(/["|'](.*)["|']/)[1];
        return"can.proxy(function(__){can.data(can.$(__),'" + n + "', this.attr('.')); }, " + e + ")"
      }},
      {name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/, fn: function (t) {
        var n = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, r = t.match(n);
        return"can.proxy(function(__){var " + r[1] + "=can.$(__);with(" + e + ".attr('.')){" + r[2] + "}}, this);"
      }},
      {name: /^.*$/, fn: function (e, u) {
        var c = !1, h = [];
        if (e = t.trim(e), e.length && (c = e.match(/^([#^/]|else$)/))) {
          switch (c = c[0]) {
            case"#":
            case"^":
              u.specialAttribute ? h.push(u.insert + "can.view.onlytxt(this,function(){ return ") : h.push(u.insert + "can.view.txt(0,'" + u.tagName + "'," + u.status + ",this,function(){ return ");
              break;
            case"/":
              return{raw: 'return ___v1ew.join("");}}])}));'}
          }
          e = e.substring(1)
        }
        if ("else" != c) {
          var l, f = [], p = 0;
          h.push("can.Mustache.txt(\n" + r + ",\n" + (c ? '"' + c + '"' : "null") + ",");
          var f = [], d = [];
          (t.trim(e) + " ").replace(a, function (t, e) {
            p && (l = e.match(s)) ? l[2] ? f.push(l[0]) : d.push(l[4] + ":" + (l[6] ? l[6] : o(l[5]))) : f.push(o(e)), p++
          }), h.push(f.join(",")), d.length && h.push(",{" + n + ":{" + d.join(",") + "}}")
        }
        switch (c && "else" != c && h.push(",[\n\n"), c) {
          case"#":
            h.push("{fn:function(" + i + "){var ___v1ew = [];");
            break;
          case"else":
            h.push('return ___v1ew.join("");}},\n{inverse:function(' + i + "){\nvar ___v1ew = [];");
            break;
          case"^":
            h.push("{inverse:function(" + i + "){\nvar ___v1ew = [];");
            break;
          default:
            h.push(")")
        }
        return h = h.join(""), c ? {raw: h} : h
      }}
    ]})});
    for (var f = t.view.Scanner.prototype.helpers, p = 0; f.length > p; p++)Mustache.prototype.scanner.helpers.unshift(f[p]);
    Mustache.txt = function (e, r, i) {
      for (var a, s = e.scope, o = e.options, f = [], p = {fn: function () {
      }, inverse: function () {
      }}, d = s.attr("."), g = !0, m = 3; arguments.length > m; m++) {
        var _ = arguments[m];
        if (r && t.isArray(_))p = t.extend.apply(t, [p].concat(_)); else if (_ && _[n]) {
          a = _[n];
          for (var v in a)u(a[v]) && (a[v] = Mustache.get(a[v].get, e))
        } else _ && u(_) ? f.push(Mustache.get(_.get, e, !1, !0)) : f.push(_)
      }
      if (u(i)) {
        var b = i.get;
        i = Mustache.get(i.get, e, f.length, !1), g = b === i
      }
      if (p.fn = l(p.fn, s, o), p.inverse = l(p.inverse, s, o), y = g && "string" == typeof i && Mustache.getHelper(i, o) || t.isFunction(i) && !i.isComputed && {fn: i})return t.extend(p, {context: d, scope: s, contexts: s, hash: a}), f.push(p), y.fn.apply(d, f) || "";
      t.isFunction(i) && i.isComputed && (i = i());
      var m, y, w, _, x = f.length ? f : [i], k = !0, A = [];
      if (r)for (m = 0; x.length > m; m++)_ = x[m], w = _ !== undefined && c(_), h(_) ? "#" == r ? k = k && !!(w ? _.attr("length") : _.length) : "^" == r && (k = k && !(w ? _.attr("length") : _.length)) : k = "#" == r ? k && !!_ : "^" == r ? k && !_ : k;
      if (k)switch (r) {
        case"#":
          if (h(i)) {
            var M = c(i);
            for (m = 0; i.length > m; m++)A.push(p.fn(i[m])), M && i.attr("" + m);
            return A.join("")
          }
          return p.fn(i || {}) || "";
        case"^":
          return p.inverse(i || {}) || "";
        default:
          return"" + (i != undefined ? i : "")
      }
      return""
    }, Mustache.get = function (e, n, r, i) {
      var a = n.scope.attr("."), s = n.options || {};
      if (r) {
        if (Mustache.getHelper(e, s))return e;
        if (n.scope && t.isFunction(a[e]))return a[e]
      }
      var o = n.scope.computeData(e, {isArgument: i, args: [a, n.scope]}), u = o.compute;
      t.compute.temporarilyBind(u);
      var c = o.initialValue;
      return c !== undefined && o.scope == n.scope || !Mustache.getHelper(e, s) ? u.hasDependencies ? u : c : e
    }, Mustache.resolve = function (e) {
      return c(e) && h(e) && e.attr("length") ? e : t.isFunction(e) ? e() : e
    };
    var d = t.view.Scope.extend({init: function (e) {
      e.helpers || e.partials || (e = {helpers: e}), t.view.Scope.prototype.init.apply(this, arguments)
    }});
    return Mustache._helpers = {}, Mustache.registerHelper = function (t, e) {
      this._helpers[t] = {name: t, fn: e}
    }, Mustache.getHelper = function (t, e) {
      var n = e.attr("helpers." + t);
      return n ? {fn: n} : this._helpers[t]
    }, Mustache.render = function (e, n) {
      return!t.view.cached[e] && n.attr("partial") && (e = n.attr("partial")), t.view.render(e, n)
    }, Mustache.safeString = function (t) {
      return{toString: function () {
        return t
      }}
    }, Mustache.renderPartial = function (e, n, r) {
      var i = r.attr("partials." + e);
      return i ? i.render ? i.render(n, r) : i(n, r) : t.Mustache.render(e, n, r)
    }, t.each({"if": function (e, n) {
      var r;
      return r = t.isFunction(e) ? t.compute.truthy(e)() : !!Mustache.resolve(e), r ? n.fn(n.contexts || this) : n.inverse(n.contexts || this)
    }, unless: function (t, e) {
      return Mustache.resolve(t) ? undefined : e.fn(e.contexts || this)
    }, each: function (e, n) {
      var r = Mustache.resolve(e);
      if (r instanceof t.List)return t.view.lists && t.view.lists(e, function (t, e) {
        return n.fn(n.scope.add({"@index": e}).add(t))
      });
      if (e = r, e && h(e)) {
        for (var i = [], a = 0; e.length > a; a++) {
          var s = function () {
            return a
          };
          i.push(n.fn(n.scope.add({"@index": s}).add(e[a])))
        }
        return i.join("")
      }
      if (c(e)) {
        for (var i = [], o = t.Map.keys(e), a = 0; o.length > a; a++) {
          var u = o[a];
          i.push(n.fn(n.scope.add({"@key": u}).add(e[u])))
        }
        return i.join("")
      }
      if (e instanceof Object) {
        var i = [];
        for (var u in e)i.push(n.fn(n.scope.add({"@key": u}).add(e[u])));
        return i.join("")
      }
    }, "with": function (t, e) {
      var n = t;
      return t = Mustache.resolve(t), t ? e.fn(n) : undefined
    }, log: function (t, e) {
      console !== undefined && (e ? console.log(t, e.context) : console.log(t.context))
    }}, function (t, e) {
      Mustache.registerHelper(e, t)
    }), t.view.register({suffix: "mustache", contentType: "x-mustache-template", script: function (t, e) {
      return"can.Mustache(function(" + i + ") { " + new Mustache({text: e, name: t}).template.out + " })"
    }, renderer: function (t, e) {
      return Mustache({text: e, name: t})
    }}), t
  }(__m2, __m18, __m19, __m20, __m16, __m22), __m25 = function (t) {
    t.view.Scanner.attribute("can-value", function (e, i) {
      var a = i.getAttribute("can-value"), s = e.scope.computeData(a, {args: []}).compute;
      if ("input" === i.nodeName.toLowerCase()) {
        if ("checkbox" === i.type) {
          if (i.hasAttribute("can-true-value"))var o = e.scope.compute(i.getAttribute("can-true-value")); else var o = t.compute(!0);
          if (i.hasAttribute("can-false-value"))var u = e.scope.compute(i.getAttribute("can-false-value")); else var u = t.compute(!1)
        }
        if ("checkbox" === i.type || "radio" === i.type)return new r(i, {value: s, trueValue: o, falseValue: u}), undefined
      }
      new n(i, {value: s})
    });
    var e = {enter: function (t, e, n) {
      return{event: "keyup", handler: function (t) {
        return 13 == t.keyCode ? n.call(this, t) : undefined
      }}
    }};
    t.view.Scanner.attribute(/can-[\w\.]+/, function (n, r) {
      var i = n.attr, a = n.attr.substr("can-".length), s = function (e) {
        var a = r.getAttribute(i), s = n.scope.read(a, {returnObserveMethods: !0, isArgument: !0});
        return s.value.call(s.parent, n.scope._context, t.$(this), e)
      };
      if (e[a]) {
        var o = e[a](n, r, s);
        s = o.handler, a = o.event
      }
      t.bind.call(r, a, s)
    });
    var n = t.Control.extend({init: function () {
      "SELECT" === this.element[0].nodeName.toUpperCase() ? setTimeout(t.proxy(this.set, this), 1) : this.set()
    }, "{value} change": "set", set: function () {
      if (this.element) {
        var t = this.options.value();
        this.element[0].value = t === undefined ? "" : t
      }
    }, change: function () {
      this.element && this.options.value(this.element[0].value)
    }}), r = t.Control.extend({init: function () {
      this.isCheckebox = "checkbox" == this.element[0].type.toLowerCase(), this.check()
    }, "{value} change": "check", "{trueValue} change": "check", "{falseValue} change": "check", check: function () {
      if (this.isCheckebox) {
        var t = this.options.value(), e = this.options.trueValue() || !0;
        this.options.falseValue() || !1, this.element[0].checked = t == e
      } else this.element[0].checked = this.options.value() === this.element[0].value ? !0 : !1
    }, change: function () {
      this.isCheckebox ? this.options.value(this.element[0].checked ? this.options.trueValue() : this.options.falseValue()) : this.element[0].checked && this.options.value(this.element[0].value)
    }})
  }(__m2, __m17, __m8), __m1 = function (t) {
    var e = /dataViewId|class|id/i, n = t.Component = t.Construct.extend({setup: function () {
      if (t.Construct.setup.apply(this, arguments), t.Component) {
        var e = this;
        this.Control = t.Control.extend({_lookup: function (t) {
          return[t.scope, t, window]
        }}, t.extend({setup: function (e, n) {
          var r = t.Control.prototype.setup.call(this, e, n);
          this.scope = n.scope;
          var i = this;
          return this.on(this.scope, "change", function () {
            i.on(), i.on(i.scope, "change", arguments.callee)
          }), r
        }}, this.prototype.events));
        var n = {};
        if (t.each(this.prototype.scope, function (t, e) {
          "@" === t && (n[e] = e)
        }), this.attributeScopeMappings = n, this.prototype.scope && "object" != typeof this.prototype.scope ? this.prototype.scope.prototype instanceof t.Map && (this.Map = this.prototype.scope) : this.Map = t.Map.extend(this.prototype.scope || {}), this.prototype.template)if ("function" == typeof this.prototype.template) {
          var r = this.prototype.template;
          this.renderer = function () {
            return t.view.frag(r.apply(null, arguments))
          }
        } else this.renderer = t.view.mustache(this.prototype.template);
        t.view.Scanner.tag(this.prototype.tag, function (t, n) {
          new e(t, n)
        })
      }
    }}, {setup: function (n, r) {
      var i, a, s = {}, o = this, u = {};
      if (t.each(this.constructor.attributeScopeMappings, function (e, r) {
        s[r] = n.getAttribute(t.hyphenate(e))
      }), t.each(t.makeArray(n.attributes), function (c) {
        var h = t.camelize(c.nodeName.toLowerCase()), l = c.value;
        if (!o.constructor.attributeScopeMappings[h] && !e.test(h)) {
          var f = r.scope.computeData(l, {args: []}), p = f.compute, d = function (t, e) {
            i = h, a.attr(h, e), i = null
          };
          p.bind("change", d), s[h] = p(), p.hasDependencies ? (t.bind.call(n, "removed", function () {
            p.unbind("change", d)
          }), u[h] = f) : p.unbind("change", d)
        }
      }), this.constructor.Map)a = new this.constructor.Map(s); else if (this.scope instanceof t.Map)a = this.scope; else if (t.isFunction(this.scope)) {
        var c = this.scope(s, r.scope, n);
        a = c instanceof t.Map ? c : c.prototype instanceof t.Map ? new c(s) : new (t.Map.extend(c))(s)
      }
      var h = {};
      t.each(u, function (t, e) {
        h[e] = function (n, r) {
          i !== e && t.compute(r)
        }, a.bind(e, h[e])
      }), t.bind.call(n, "removed", function () {
        t.each(h, function (t, e) {
          a.unbind(e, h[e])
        })
      }), this.scope = a, t.data(t.$(n), "scope", this.scope);
      var l = r.scope.add(this.scope), f = {};
      if (t.each(this.helpers || {}, function (e, n) {
        t.isFunction(e) && (f[n] = function () {
          return e.apply(a, arguments)
        })
      }), this._control = new this.constructor.Control(n, {scope: this.scope}), this.constructor.renderer) {
        f._tags || (f._tags = {}), f._tags.content = function (e, n) {
          var i = r.subtemplate || n.subtemplate;
          i && (delete f._tags.content, t.view.live.replace([e], i(n.scope, n.options)), f._tags.content = arguments.callee)
        };
        var p = this.constructor.renderer(l, r.options.add(f))
      } else var p = t.view.frag(r.subtemplate ? r.subtemplate(l, r.options.add(f)) : "");
      t.appendChild(n, p)
    }});
    return window.$ && $.fn && ($.fn.scope = function (t) {
      return t ? this.data("scope").attr(t) : this.data("scope")
    }), t.scope = function (e, n) {
      var e = t.$(e);
      return n ? t.data(e, "scope").attr(n) : t.data(e, "scope")
    }, n
  }(__m2, __m8, __m11, __m17, __m25), __m26 = function (t) {
    var e = function (e, n, r) {
      var i = new t.Deferred;
      return e.then(function () {
        var e = t.makeArray(arguments), a = !0;
        try {
          e[0] = n[r](e[0])
        } catch (s) {
          a = !1, i.rejectWith(i, [s].concat(e))
        }
        a && i.resolveWith(i, e)
      }, function () {
        i.rejectWith(this, arguments)
      }), "function" == typeof e.abort && (i.abort = function () {
        return e.abort()
      }), i
    }, n = 0, r = function (e) {
      return t.__reading && t.__reading(e, e.constructor.id), e.__get(e.constructor.id)
    }, i = function (e, n, r, i, a, s) {
      var o = {};
      if ("string" == typeof e) {
        var u = e.split(/\s+/);
        o.url = u.pop(), u.length && (o.type = u.pop())
      } else t.extend(o, e);
      return o.data = "object" != typeof n || t.isArray(n) ? n : t.extend(o.data || {}, n), o.url = t.sub(o.url, o.data, !0), t.ajax(t.extend({type: r || "post", dataType: i || "json", success: a, error: s}, o))
    }, a = function (e, n, i, a, s) {
      var o;
      t.isArray(e) ? (o = e[1], e = e[0]) : o = e.serialize(), o = [o];
      var u, c, h = e.constructor;
      return"create" !== n && o.unshift(r(e)), c = h[n].apply(h, o), u = c.pipe(function (t) {
        return e[s || n + "d"](t, c), e
      }), c.abort && (u.abort = function () {
        c.abort()
      }), u.then(i, a), u
    }, s = {models: function (e) {
      return function (n, r) {
        if (t.Model._reqs++, n) {
          if (n instanceof this.List)return n;
          var i = this, a = [], s = r instanceof t.List ? r : new (i.List || c), o = t.isArray(n), u = n instanceof c, h = o ? n : u ? n.serialize() : t.getObject(e || "data", n);
          if (h === undefined)throw Error("Could not get any raw data while converting using .models");
          return s.length && s.splice(0), t.each(h, function (t) {
            a.push(i.model(t))
          }), s.push.apply(s, a), o || t.each(n, function (t, e) {
            "data" !== e && s.attr(e, t)
          }), setTimeout(t.proxy(this._clean, this), 1), s
        }
      }
    }, model: function (e) {
      return function (n) {
        if (n) {
          "function" == typeof n.serialize && (n = n.serialize()), e && (n = t.getObject(e || "data", n));
          var r = n[this.id], i = (r || 0 === r) && this.store[r] ? this.store[r].attr(n, this.removeAttr || !1) : new this(n);
          return i
        }
      }
    }}, o = {create: {url: "_shortName", type: "post"}, update: {data: function (e, n) {
      n = n || {};
      var r = this.id;
      return n[r] && n[r] !== e && (n["new" + t.capitalize(e)] = n[r], delete n[r]), n[r] = e, n
    }, type: "put"}, destroy: {type: "delete", data: function (t, e) {
      return e = e || {}, e.id = e[this.id] = t, e
    }}, findAll: {url: "_shortName"}, findOne: {}}, u = function (t, e) {
      return function (n) {
        return n = t.data ? t.data.apply(this, arguments) : n, i(e || this[t.url || "_url"], n, t.type || "get")
      }
    };
    t.Model = t.Map({fullName: "can.Model", _reqs: 0, setup: function (e) {
      if (this.store = {}, t.Map.setup.apply(this, arguments), t.Model) {
        this.List = c({Map: this}, {});
        var r = this, i = t.proxy(this._clean, r);
        t.each(o, function (n, a) {
          if (t.isFunction(r[a]) || (r[a] = u(n, r[a])), r["make" + t.capitalize(a)]) {
            var s = r["make" + t.capitalize(a)](r[a]);
            t.Construct._overwrite(r, e, a, function () {
              t.Model._reqs++;
              var e = s.apply(this, arguments), n = e.then(i, i);
              return n.abort = e.abort, n
            })
          }
        }), t.each(s, function (n, i) {
          "string" == typeof r[i] && t.Construct._overwrite(r, e, i, n(r[i]))
        }), "can.Model" != r.fullName && r.fullName || (r.fullName = "Model" + ++n), t.Model._reqs = 0, this._url = this._shortName + "/{" + this.id + "}"
      }
    }, _ajax: u, _makeRequest: a, _clean: function () {
      if (t.Model._reqs--, !t.Model._reqs)for (var e in this.store)this.store[e]._bindings || delete this.store[e];
      return arguments[0]
    }, models: s.models("data"), model: s.model()}, {setup: function (e) {
      var n = e && e[this.constructor.id];
      t.Model._reqs && null != n && (this.constructor.store[n] = this), t.Map.prototype.setup.apply(this, arguments)
    }, isNew: function () {
      var t = r(this);
      return!(t || 0 === t)
    }, save: function (t, e) {
      return a(this, this.isNew() ? "create" : "update", t, e)
    }, destroy: function (e, n) {
      if (this.isNew()) {
        var r = this, i = t.Deferred();
        return i.then(e, n), i.done(function (t) {
          r.destroyed(t)
        }).resolve(r)
      }
      return a(this, "destroy", e, n, "destroyed")
    }, _bindsetup: function () {
      return this.constructor.store[this.__get(this.constructor.id)] = this, t.Map.prototype._bindsetup.apply(this, arguments)
    }, _bindteardown: function () {
      return delete this.constructor.store[r(this)], t.Map.prototype._bindteardown.apply(this, arguments)
    }, ___set: function (e, n) {
      t.Map.prototype.___set.call(this, e, n), e === this.constructor.id && this._bindings && (this.constructor.store[r(this)] = this)
    }}), t.each({makeFindAll: "models", makeFindOne: "model", makeCreate: "model", makeUpdate: "model"}, function (n, r) {
      t.Model[r] = function (r) {
        return function () {
          var i = t.makeArray(arguments), a = t.isFunction(i[1]) ? i.splice(0, 1) : i.splice(0, 2), s = e(r.apply(this, a), this, n);
          return s.then(i[0], i[1]), s
        }
      }
    }), t.each(["created", "updated", "destroyed"], function (e) {
      t.Model.prototype[e] = function (n) {
        var r, i = this.constructor;
        r = n && "object" == typeof n && this.attr(n.attr ? n.attr() : n), t.trigger(this, "change", e), t.trigger(i, e, this)
      }
    });
    var c = t.Model.List = t.List({setup: function (e) {
      t.isPlainObject(e) && !t.isArray(e) ? (t.List.prototype.setup.apply(this), this.replace(this.constructor.Map.findAll(e))) : t.List.prototype.setup.apply(this, arguments)
    }, _changes: function (e, n) {
      if (t.List.prototype._changes.apply(this, arguments), /\w+\.destroyed/.test(n)) {
        var r = this.indexOf(e.target);
        -1 != r && this.splice(r, 1)
      }
    }});
    return t.Model
  }(__m2, __m12, __m15), __m28 = function (t) {
    var e = /^\d+$/, n = /([^\[\]]+)|(\[\])/g, r = /([^?#]*)(#.*)?$/, i = function (t) {
      return decodeURIComponent(t.replace(/\+/g, " "))
    };
    return t.extend(t, {deparam: function (a) {
      var s, o, u = {};
      return a && r.test(a) && (s = a.split("&"), t.each(s, function (t) {
        var r = t.split("="), a = i(r.shift()), s = i(r.join("=")), c = u;
        if (a) {
          r = a.match(n);
          for (var h = 0, l = r.length - 1; l > h; h++)c[r[h]] || (c[r[h]] = e.test(r[h + 1]) || "[]" == r[h + 1] ? [] : {}), c = c[r[h]];
          o = r.pop(), "[]" == o ? c.push(s) : c[o] = s
        }
      })), u
    }}), t
  }(__m2, __m10), __m27 = function (t) {
    var e, n, r, i, a = /\:([\w\.]+)/g, s = /^(?:&[^=]+=[^&]*)+/, o = function (e) {
      var n = [];
      return t.each(e, function (e, r) {
        n.push(("className" === r ? "class" : r) + '="' + ("href" === r ? e : t.esc(e)) + '"')
      }), n.join(" ")
    }, u = function (t, e) {
      var n = 0, r = 0, i = {};
      for (var a in t.defaults)t.defaults[a] === e[a] && (i[a] = 1, n++);
      for (; t.names.length > r; r++) {
        if (!e.hasOwnProperty(t.names[r]))return-1;
        i[t.names[r]] || n++
      }
      return n
    }, c = window.location, h = function (t) {
      return(t + "").replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1")
    }, l = t.each, f = t.extend, p = function (e) {
      return e && "object" == typeof e ? (e = e instanceof t.Map ? e.attr() : t.isFunction(e.slice) ? e.slice() : t.extend({}, e), t.each(e, function (t, n) {
        e[n] = p(t)
      })) : e !== undefined && null !== e && t.isFunction(e.toString) && (e = "" + e), e
    }, d = function (t) {
      return t.replace(/\\/g, "")
    }, g = function () {
      i = 1, clearTimeout(e), e = setTimeout(function () {
        i = 0;
        var e = t.route.data.serialize(), n = t.route.param(e, !0);
        t.route._call("setURL", n), r = n
      }, 10)
    };
    t.route = function (e, n) {
      var r = t.route._call("root");
      r.lastIndexOf("/") == r.length - 1 && 0 === e.indexOf("/") && (e = e.substr(1)), n = n || {};
      for (var i, s, o = [], u = "", c = a.lastIndex = 0, l = t.route._call("querySeparator"); i = a.exec(e);)o.push(i[1]), u += d(e.substring(c, a.lastIndex - i[0].length)), s = "\\" + (d(e.substr(a.lastIndex, 1)) || l), u += "([^" + s + "]" + (n[i[1]] ? "*" : "+") + ")", c = a.lastIndex;
      return u += e.substr(c).replace("\\", ""), t.route.routes[e] = {test: RegExp("^" + u + "($|" + h(l) + ")"), route: e, names: o, defaults: n, length: e.split("/").length}, t.route
    }, f(t.route, {param: function (e, n) {
      var r, i, s = 0, o = e.route, c = 0;
      if (delete e.route, l(e, function () {
        c++
      }), l(t.route.routes, function (t) {
        return i = u(t, e), i > s && (r = t, s = i), i >= c ? !1 : undefined
      }), t.route.routes[o] && u(t.route.routes[o], e) === s && (r = t.route.routes[o]), r) {
        var h, p = f({}, e), d = r.route.replace(a,function (t, n) {
          return delete p[n], e[n] === r.defaults[n] ? "" : encodeURIComponent(e[n])
        }).replace("\\", "");
        return l(r.defaults, function (t, e) {
          p[e] === t && delete p[e]
        }), h = t.param(p), n && t.route.attr("route", r.route), d + (h ? t.route._call("querySeparator") + h : "")
      }
      return t.isEmptyObject(e) ? "" : t.route._call("querySeparator") + t.param(e)
    }, deparam: function (e) {
      var n = t.route._call("root");
      n.lastIndexOf("/") == n.length - 1 && 0 === e.indexOf("/") && (e = e.substr(1));
      var r = {length: -1}, i = t.route._call("querySeparator"), a = t.route._call("paramsMatcher");
      if (l(t.route.routes, function (t) {
        t.test.test(e) && t.length > r.length && (r = t)
      }), r.length > -1) {
        var s = e.match(r.test), o = s.shift(), u = e.substr(o.length - (s[s.length - 1] === i ? 1 : 0)), c = u && a.test(u) ? t.deparam(u.slice(1)) : {};
        return c = f(!0, {}, r.defaults, c), l(s, function (t, e) {
          t && t !== i && (c[r.names[e]] = decodeURIComponent(t))
        }), c.route = r.route, c
      }
      return e.charAt(0) !== i && (e = i + e), a.test(e) ? t.deparam(e.slice(1)) : {}
    }, data: new t.Map({}), routes: {}, ready: function (e) {
      return e !== !0 && (t.route._setup(), t.route.setState()), t.route
    }, url: function (e, n) {
      return n && (e = t.extend({}, t.route.deparam(t.route._call("matchingPartOfURL")), e)), t.route._call("root") + t.route.param(e)
    }, link: function (e, n, r, i) {
      return"<a " + o(f({href: t.route.url(n, i)}, r)) + ">" + e + "</a>"
    }, current: function (e) {
      return this._call("matchingPartOfURL") === t.route.param(e)
    }, bindings: {hashchange: {paramsMatcher: s, querySeparator: "&", bind: function () {
      t.bind.call(window, "hashchange", m)
    }, unbind: function () {
      t.unbind.call(window, "hashchange", m)
    }, matchingPartOfURL: function () {
      return c.href.split(/#!?/)[1] || ""
    }, setURL: function (t) {
      return c.hash = "#!" + t, t
    }, root: "#!"}}, defaultBinding: "hashchange", currentBinding: null, _setup: function () {
      t.route.currentBinding || (t.route._call("bind"), t.route.bind("change", g), t.route.currentBinding = t.route.defaultBinding)
    }, _teardown: function () {
      t.route.currentBinding && (t.route._call("unbind"), t.route.unbind("change", g), t.route.currentBinding = null), clearTimeout(e), i = 0
    }, _call: function () {
      var e = t.makeArray(arguments), n = e.shift(), r = t.route.bindings[t.route.currentBinding || t.route.defaultBinding];
      return method = r[n], "function" == typeof method ? method.apply(r, e) : method
    }}), l(["bind", "unbind", "on", "off", "delegate", "undelegate", "removeAttr", "compute", "_get", "__get"], function (e) {
      t.route[e] = function () {
        return t.route.data[e] ? t.route.data[e].apply(t.route.data, arguments) : undefined
      }
    }), t.route.attr = function (e, n) {
      var r, i = typeof e;
      return r = n === undefined ? arguments : "string" !== i && "number" !== i ? [p(e), n] : [e, p(n)], t.route.data.attr.apply(t.route.data, r)
    };
    var m = t.route.setState = function () {
      var e = t.route._call("matchingPartOfURL");
      n = t.route.deparam(e), i && e === r || t.route.attr(n, !0)
    };
    return t.route
  }(__m2, __m12, __m28), __m29 = function (t) {
    return t.Control.processors.route = function (e, n, r, i, a) {
      r = r || "", t.route.routes[r] || t.route(r);
      var s, o = function (e) {
        if (t.route.attr("route") === r && (e.batchNum === undefined || e.batchNum !== s)) {
          s = e.batchNum;
          var n = t.route.attr();
          delete n.route, t.isFunction(a[i]) ? a[i](n) : a[a[i]](n)
        }
      };
      return t.route.bind("change", o), function () {
        t.route.unbind("change", o)
      }
    }, t
  }(__m2, __m27, __m8), __m30 = function (t) {
    var e = t.extend, n = function (t) {
      if (this.constructor != n) {
        var r = new n(t);
        return function (t, e) {
          return r.render(t, e)
        }
      }
      return"function" == typeof t ? (this.template = {fn: t}, undefined) : (e(this, t), this.template = this.scanner.scan(this.text, this.name), undefined)
    };
    return t.EJS = n, n.prototype.render = function (t, e) {
      return t = t || {}, this.template.fn.call(t, t, new n.Helpers(t, e || {}))
    }, e(n.prototype, {scanner: new t.view.Scanner({text: {outStart: "with(_VIEW) { with (_CONTEXT) {", outEnd: "}}", argNames: "_CONTEXT,_VIEW"}, tokens: [
      ["templateLeft", "<%%"],
      ["templateRight", "%>"],
      ["returnLeft", "<%=="],
      ["escapeLeft", "<%="],
      ["commentLeft", "<%#"],
      ["left", "<%"],
      ["right", "%>"],
      ["returnRight", "%>"]
    ], helpers: [
      {name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/, fn: function (t) {
        var e = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, n = t.match(e);
        return"can.proxy(function(__){var " + n[1] + "=can.$(__);" + n[2] + "}, this);"
      }}
    ], transform: function (t) {
      return t.replace(/<%([\s\S]+?)%>/gm, function (t, e) {
        var n, r, i = [];
        e.replace(/[{}]/gm, function (t, e) {
          i.push([t, e])
        });
        do for (n = !1, r = i.length - 2; r >= 0; r--)if ("{" == i[r][0] && "}" == i[r + 1][0]) {
          i.splice(r, 2), n = !0;
          break
        } while (n);
        if (i.length >= 2) {
          var a, s = ["<%"], o = 0;
          for (r = 0; a = i[r]; r++)s.push(e.substring(o, o = a[1])), "{" == a[0] && i.length - 1 > r || "}" == a[0] && r > 0 ? s.push("{" == a[0] ? "{ %><% " : " %><% }") : s.push(a[0]), ++o;
          return s.push(e.substring(o), "%>"), s.join("")
        }
        return"<%" + e + "%>"
      })
    }})}), n.Helpers = function (t, n) {
      this._data = t, this._extras = n, e(this, n)
    }, n.Helpers.prototype = {list: function (e, n) {
      t.each(e, function (t, r) {
        n(t, r, e)
      })
    }, each: function (e, n) {
      t.isArray(e) ? this.list(e, n) : t.view.lists(e, n)
    }}, t.view.register({suffix: "ejs", script: function (t, e) {
      return"can.EJS(function(_CONTEXT,_VIEW) { " + new n({text: e, name: t}).template.out + " })"
    }, renderer: function (t, e) {
      return n({text: e, name: t})
    }}), t
  }(__m2, __m19, __m10, __m16, __m20, __m22), __m31 = function (t) {
    "use strict";
    if (window.history && history.pushState) {
      t.route.bindings.pushstate = {root: "/", paramsMatcher: /^\?(?:[^=]+=[^&]*&)*[^=]+=[^&]*/, querySeparator: "?", bind: function () {
        t.delegate.call(t.$(document.documentElement), "a", "click", e), t.each(["pushState", "replaceState"], function (e) {
          r[e] = window.history[e], window.history[e] = function () {
            var n = r[e].apply(window.history, arguments);
            return t.route.setState(), n
          }
        }), t.bind.call(window, "popstate", t.route.setState)
      }, unbind: function () {
        t.undelegate.call(t.$(document.documentElement), "click", "a", e), t.each(["pushState", "replaceState"], function (t) {
          window.history[t] = r[t]
        }), t.unbind.call(window, "popstate", t.route.setState)
      }, matchingPartOfURL: function () {
        var t = n(), e = location.pathname + location.search, r = e.indexOf(t);
        return e.substr(r + t.length)
      }, setURL: function (e) {
        i && -1 == e.indexOf("#") && window.location.hash && (e += window.location.hash), window.history.pushState(null, null, t.route._call("root") + e)
      }};
      var e = function (e) {
        if (!(e.isDefaultPrevented ? e.isDefaultPrevented() : e.defaultPrevented === !0)) {
          var n = this._node || this, r = n.host || window.location.host;
          if (window.location.host == r) {
            var a = t.route.deparam(n.pathname + n.search);
            a.hasOwnProperty("route") && (i = !0, window.history.pushState(null, null, n.href), e.preventDefault && e.preventDefault())
          }
        }
      }, n = function () {
        var e = location.protocol + "//" + location.host, n = t.route._call("root"), r = n.indexOf(e);
        return 0 == r ? t.route.root.substr(e.length) : n
      }, r = {}, i = !1;
      t.route.defaultBinding = "pushstate"
    }
    return t
  }(__m2, __m27), __m34 = function (t) {
    var e = t.isArray, n = function (t) {
      var e = 0;
      for (var n in t)e++;
      return e
    };
    t.Object = {};
    var r = t.Object.same = function (n, a, s, o, u, c) {
      var h, l = typeof n, f = e(n), p = typeof s;
      if (("string" == p || null === s) && (s = i[s], p = "function"), "function" == p)return s(n, a, o, u);
      if (s = s || {}, n instanceof Date)return n === a;
      if (-1 === c)return"object" === l || n === a;
      if (l !== typeof a || f !== e(a))return!1;
      if (n === a)return!0;
      if (f) {
        if (n.length !== a.length)return!1;
        for (var d = 0; n.length > d; d++)if (h = s[d] === undefined ? s["*"] : s[d], !r(n[d], a[d], n, a, h))return!1;
        return!0
      }
      if ("object" === l || "function" === l) {
        var g = t.extend({}, a);
        for (var m in n) {
          if (h = s[m] === undefined ? s["*"] : s[m], !r(n[m], a[m], h, n, a, c === !1 ? -1 : undefined))return!1;
          delete g[m]
        }
        for (m in g)if (s[m] === undefined || !r(undefined, a[m], s[m], n, a, c === !1 ? -1 : undefined))return!1;
        return!0
      }
      return!1
    };
    t.Object.subsets = function (e, r, i) {
      var a = r.length, s = [];
      n(e);
      for (var o = 0; a > o; o++) {
        var u = r[o];
        t.Object.subset(e, u, i) && s.push(u)
      }
      return s
    }, t.Object.subset = function (t, e, n) {
      var n = n || {};
      for (var i in e)if (!r(t[i], e[i], n[i], t, e))return!1;
      return!0
    };
    var i = {"null": function () {
      return!0
    }, i: function (t, e) {
      return("" + t).toLowerCase() == ("" + e).toLowerCase()
    }};
    return t.Object
  }(__m2), __m33 = function (t) {
    var e = function (t, e) {
      var n = {};
      for (var r in t)n[r] = "object" != typeof t[r] || null === t[r] || t[r]instanceof Date ? t[r] : e.attr(r);
      return n
    };
    return t.extend(t.Map.prototype, {backup: function () {
      return this._backupStore = this._attrs(), this
    }, isDirty: function (e) {
      return this._backupStore && !t.Object.same(this._attrs(), this._backupStore, undefined, undefined, undefined, !!e)
    }, restore: function (t) {
      var n = t ? this._backupStore : e(this._backupStore, this);
      return this.isDirty(t) && this._attrs(n, !0), this
    }}), t.Map
  }(__m2, __m12, __m34), __m32 = function (t) {
    var e = function (e, n) {
      var r, i, a = t.extend(!0, {}, n);
      if (e)for (var s = 0; e.length > s; s++) {
        for (r = a, i = e[s].split("."); i.length > 1;)r = r && r[i.shift()];
        r && delete r[i.shift()]
      }
      return a
    }, n = function (e, n, r, i) {
      this._changedAttrs = this._changedAttrs || [];
      var a, s, o = new t.Deferred, u = this, c = this.serialize(), h = this._requestQueue, l = this._changedAttrs;
      return a = function (t, e, n, r) {
        return function () {
          return t.constructor._makeRequest([t, c], e || (t.isNew() ? "create" : "update"), n, r, i)
        }
      }(this, r, function () {
        o.resolveWith(u, arguments), h.splice(0, 1), h.length > 0 ? h[0] = h[0]() : l.splice(0)
      }, function () {
        o.rejectWith(u, arguments), h.splice(0), l.splice(0)
      }), s = h.push(a) - 1, 1 === h.length && (h[0] = h[0]()), o.abort = function () {
        var t;
        return t = h[s].abort && h[s].abort(), h.splice(s), 0 === h.length && l.splice(0), t
      }, o.then(e, n), o
    }, r = t.Model.prototype._changes, i = t.Model.prototype.destroy, a = t.Model.prototype.setup;
    return t.each(["created", "updated", "destroyed"], function (n) {
      var r = t.Model.prototype[n];
      t.Model.prototype[n] = function (t) {
        t && "object" == typeof t && (t = t.attr ? t.attr() : t, this._backupStore = t, t = e(this._changedAttrs || [], t)), r.call(this, t)
      }
    }), t.extend(t.Model.prototype, {setup: function () {
      a.apply(this, arguments), this._requestQueue = new t.List
    }, _changes: function (t, e) {
      this._changedAttrs && this._changedAttrs.push(e), r.apply(this, arguments)
    }, hasQueuedRequests: function () {
      return this._requestQueue.attr("length") > 1
    }, save: function () {
      return n.apply(this, arguments)
    }, destroy: function (t, e) {
      return this.isNew() ? i.call(this, t, e) : n.call(this, t, e, "destroy", "destroyed")
    }}), t
  }(__m2, __m26, __m33), __m35 = function (t) {
    var e = t.isFunction, n = /xyz/.test(function () {
    }) ? /\b_super\b/ : /.*/;
    return t.Construct._overwrite = function (t, r, i, a) {
      t[i] = e(a) && e(r[i]) && n.test(a) ? function (t, e) {
        return function () {
          var n, i = this._super;
          return this._super = r[t], n = e.apply(this, arguments), this._super = i, n
        }
      }(i, a) : a
    }, t.Construct._inherit = function (e, n, r) {
      r = r || e;
      for (var i in e)t.Construct._overwrite(r, n, i, e[i])
    }, t
  }(__m2, __m9), __m36 = function (t) {
    var e = (t.isFunction, t.isArray), n = t.makeArray, r = function (t) {
      var r, i = n(arguments);
      return t = i.shift(), e(t) || (t = [t]), r = this, function () {
        for (var a, s, o = i.concat(n(arguments)), u = t.length, c = 0; u > c; c++)s = t[c], s && (a = "string" == typeof s, o = (a ? r[s] : s).apply(r, o || []), u - 1 > c && (o = !e(o) || o._use_call ? [o] : o));
        return o
      }
    };
    t.Construct.proxy = t.Construct.prototype.proxy = r;
    for (var i = [t.Map, t.Control, t.Model], a = 0; i.length > a; a++)i[a] && (i[a].proxy = r);
    return t
  }(__m2, __m9), __m37 = function (t) {
    var e = function (t, e) {
      var n, r = t.length, i = 0, a = [];
      for (i; r > i; i++) {
        if (n = e[i], "string" != typeof n)return null;
        if ("**" == t[i])return e.join(".");
        if ("*" == t[i])a.push(n); else {
          if (n !== t[i])return null;
          a.push(n)
        }
      }
      return a.join(".")
    }, n = function (n, r, i, a, s) {
      var o, u, c, h, l, f = r.split("."), p = (this._observe_delegates || []).slice(0);
      n.attr = r, n.lastAttr = f[f.length - 1];
      for (var d = 0; o = p[d++];)if (!(n.batchNum && o.batchNum === n.batchNum || o.undelegated)) {
        h = undefined, l = !0;
        for (var g = 0; o.attrs.length > g; g++)u = o.attrs[g], (c = e(u.parts, f)) && (h = c), u.value && l ? l = u.value === "" + this.attr(u.attr) : l && o.attrs.length > 1 && (l = this.attr(u.attr) !== undefined);
        if (h && l) {
          var m = r.replace(h + ".", "");
          n.batchNum && (o.batchNum = n.batchNum), "change" === o.event ? (arguments[1] = m, n.curAttr = h, o.callback.apply(this.attr(h), t.makeArray(arguments))) : o.event === i ? o.callback.apply(this.attr(h), [n, a, s, m]) : "set" === o.event && "add" == i && o.callback.apply(this.attr(h), [n, a, s, m])
        }
      }
    };
    return t.extend(t.Map.prototype, {delegate: function (e, r, i) {
      e = t.trim(e);
      for (var a, s = this._observe_delegates || (this._observe_delegates = []), o = [], u = /([^\s=,]+)(?:=("[^",]*"|'[^',]*'|[^\s"',]*))?(,?)\s*/g; a = u.exec(e);)a[2] && t.inArray(a[2].substr(0, 1), ['"', "'"]) >= 0 && (a[2] = a[2].substr(1, -1)), o.push({attr: a[1], parts: a[1].split("."), value: a[2], or: "," === a[3]});
      return s.push({selector: e, attrs: o, callback: i, event: r}), 1 === s.length && this.bind("change", n), this
    }, undelegate: function (e, r, i) {
      e = e && t.trim(e);
      var a, s = 0, o = this._observe_delegates || [];
      if (e)for (; o.length > s;)a = o[s], a.callback === i || !i && a.selector === e ? (a.undelegated = !0, o.splice(s, 1)) : s++; else o = [];
      return o.length || this.unbind("change", n), this
    }}), t.Map.prototype.delegate.matches = e, t.Map
  }(__m2, __m12), __m39 = function (t) {
    return t.each([t.Map, t.Model], function (e) {
      if (e !== undefined) {
        var n = function (t) {
          return"object" == typeof t && null !== t && t
        };
        t.extend(e, {attributes: {}, convert: {date: function (t) {
          var e = typeof t;
          return"string" === e ? (t = Date.parse(t), isNaN(t) ? null : new Date(t)) : "number" === e ? new Date(t) : t
        }, number: function (t) {
          return parseFloat(t)
        }, "boolean": function (t) {
          return"false" !== t && "0" !== t && t ? !0 : !1
        }, "default": function (e, n, r, i) {
          if (t.Map.prototype.isPrototypeOf(i.prototype) && "function" == typeof i.model && "function" == typeof i.models)return i[t.isArray(e) ? "models" : "model"](e);
          if (t.Map.prototype.isPrototypeOf(i.prototype))return t.isArray(e) && "function" == typeof i.List ? new i.List(e) : new i(e);
          if ("function" == typeof i)return i(e, n);
          var a, s = t.getObject(i), o = window;
          return i.indexOf(".") >= 0 && (a = i.substring(0, i.lastIndexOf(".")), o = t.getObject(a)), "function" == typeof s ? s.call(o, e, n) : e
        }}, serialize: {"default": function (t) {
          return n(t) && t.serialize ? t.serialize() : t
        }, date: function (t) {
          return t && t.getTime()
        }}});
        var r = e.setup;
        e.setup = function (e, n, i) {
          var a = this;
          r.call(a, e, n, i), t.each(["attributes"], function (t) {
            a[t] && e[t] !== a[t] || (a[t] = {})
          }), t.each(["convert", "serialize"], function (n) {
            e[n] != a[n] && (a[n] = t.extend({}, e[n], a[n]))
          })
        }
      }
    }), t.Map.prototype.__convert = function (t, e) {
      var n, r, i = this.constructor, a = this.attr(t);
      return i.attributes && (n = i.attributes[t], r = i.convert[n] || i.convert["default"]), null !== e && n ? r.call(i, e, a, function () {
      }, n) : e
    }, t.List.prototype.serialize = function () {
      return t.makeArray(t.Map.prototype.serialize.apply(this, arguments))
    }, t.Map.prototype.serialize = function (e, n) {
      var r = {}, i = this.constructor, a = {};
      return n = t.isArray(n) ? n : [], n.push(this._cid), e !== undefined ? a[e] = this[e] : a = this.__get(), t.each(a, function (e, a) {
        var s, o;
        e instanceof t.Map && t.inArray(e._cid, n) > -1 ? r[a] = e.attr("id") : (s = i.attributes ? i.attributes[a] : 0, o = i.serialize ? i.serialize[s] : 0, r[a] = e && "function" == typeof e.serialize ? e.serialize(undefined, n) : o ? o(e, s) : e)
      }), a.length !== undefined && (r.length = a.length), e != undefined ? r[e] : r
    }, t.Map
  }(__m2, __m12, __m15), __m38 = function (t) {
    t.classize = function (e, n) {
      for (var r = e.split(t.undHash), i = 0; r.length > i; i++)r[i] = t.capitalize(r[i]);
      return r.join(n || "")
    };
    var e = t.classize, n = t.Map.prototype, r = n.__set;
    return n.__set = function (n, i, a, s, o) {
      var u = e(n), c = "set" + u, h = function (e) {
        var r = o && o.call(l, e);
        return r !== !1 && t.trigger(l, "error", [n, e], !0), !1
      }, l = this;
      if (!this[c] || (i = this[c](i, function (t) {
        r.call(l, n, t, a, s, h)
      }, h)) !== undefined)return r.call(l, n, i, a, s, h), this
    }, t.Map
  }(__m2, __m39), __m40 = function (t) {
    var e = function (e, n, r) {
      if (r || (r = n, n = {}), n = n || {}, e = "string" == typeof e ? [e] : t.makeArray(e), !n.testIf || n.testIf.call(this)) {
        var i = this;
        t.each(e, function (t) {
          i.validations[t] || (i.validations[t] = []), i.validations[t].push(function (e) {
            var i = r.call(this, e, t);
            return i === undefined ? undefined : n.message || i
          })
        })
      }
    }, n = t.Map.prototype.__set;
    return t.Map.prototype.__set = function (e, r, i, a, s) {
      var o = this, u = o.constructor.validations, c = function (n) {
        var r = s && s.call(o, n);
        return r !== !1 && t.trigger(o, "error", [e, n], !0), !1
      };
      if (n.call(o, e, r, i, a, c), u && u[e]) {
        var h = o.errors(e);
        h && c(h)
      }
      return this
    }, t.each([t.Map, t.Model], function (n) {
      if (n !== undefined) {
        var r = n.setup;
        t.extend(n, {setup: function (t) {
          r.apply(this, arguments), this.validations && t.validations !== this.validations || (this.validations = {})
        }, validate: e, validationMessages: {format: "is invalid", inclusion: "is not a valid option (perhaps out of range)", lengthShort: "is too short", lengthLong: "is too long", presence: "can't be empty", range: "is out of range", numericality: "must be a number"}, validateFormatOf: function (t, n, r) {
          e.call(this, t, r, function (t) {
            return t !== undefined && null !== t && "" !== t && null == (t + "").match(n) ? this.constructor.validationMessages.format : undefined
          })
        }, validateInclusionOf: function (t, n, r) {
          e.call(this, t, r, function (t) {
            if (t !== undefined) {
              for (var e = 0; n.length > e; e++)if (n[e] == t)return;
              return this.constructor.validationMessages.inclusion
            }
          })
        }, validateLengthOf: function (t, n, r, i) {
          e.call(this, t, i, function (t) {
            return(t === undefined || null === t) && n > 0 || t !== undefined && null !== t && n > t.length ? this.constructor.validationMessages.lengthShort + " (min=" + n + ")" : t !== undefined && null !== t && t.length > r ? this.constructor.validationMessages.lengthLong + " (max=" + r + ")" : undefined
          })
        }, validatePresenceOf: function (t, n) {
          e.call(this, t, n, function (t) {
            return t === undefined || "" === t || null === t ? this.constructor.validationMessages.presence : undefined
          })
        }, validateRangeOf: function (t, n, r, i) {
          e.call(this, t, i, function (t) {
            return(t === undefined || null === t) && n > 0 || t !== undefined && null !== t && (n > t || t > r) ? this.constructor.validationMessages.range + " [" + n + "," + r + "]" : undefined
          })
        }, validatesNumericalityOf: function (t) {
          e.call(this, t, function (t) {
            var e = !isNaN(parseFloat(t)) && isFinite(t);
            return e ? undefined : this.constructor.validationMessages.numericality
          })
        }})
      }
    }), t.extend(t.Map.prototype, {errors: function (e, n) {
      e && (e = t.isArray(e) ? e : [e]);
      var r = {}, i = this, a = function (e, a) {
        t.each(a, function (t) {
          var a = t.call(i, o ? i.__convert ? i.__convert(e, n) : n : i.attr(e));
          a && (r[e] || (r[e] = []), r[e].push(a))
        })
      }, s = this.constructor.validations, o = e && 1 === e.length && 2 === arguments.length;
      return t.each(e || s || {}, function (t, e) {
        "number" == typeof e && (e = t, t = s[e]), a(e, t || [])
      }), t.isEmptyObject(r) ? null : o ? r[e[0]] : r
    }}), t.Map
  }(__m2, __m39), __m41 = function (t) {
    return t.extend(t.List.prototype, {filter: function (e) {
      var n = new this.constructor, r = this, i = function (i) {
        var a = function (t, e) {
          var r = n.indexOf(i);
          e || -1 === r || n.splice(r, 1), e && -1 === r && n.push(i)
        }, s = t.compute(function () {
          return e(i, r.indexOf(i), r)
        });
        s.bind("change", a), a(null, s())
      };
      return this.bind("add", function (e, n, r) {
        t.each(n, function (t, e) {
          i(t, r + e)
        })
      }), this.bind("remove", function (e, r) {
        t.each(r, function (t) {
          var e = n.indexOf(t);
          -1 !== e && n.splice(e, 1)
        })
      }), this.forEach(i), n
    }, map: function (e) {
      var n = new t.List, r = this, i = function (i, a) {
        var s = t.compute(function () {
          return e(i, a, r)
        });
        s.bind("change", function (t, e) {
          n.splice(a, 1, e)
        }), n.splice(a, 0, s())
      };
      return this.forEach(i), this.bind("add", function (e, n, r) {
        t.each(n, function (t, e) {
          i(t, r + e)
        })
      }), this.bind("remove", function (t, e, r) {
        n.splice(r, e.length)
      }), n
    }}), t.List
  }(__m2, __m12, __m15, __m16), __m42 = function (t) {
    var e = t.List.prototype, n = e._changes, r = e.setup;
    t.extend(e, {comparator: undefined, sortIndexes: [], sortedIndex: function (t) {
      for (var e, n = t.attr(this.comparator), r = 0, e = 0, i = this.length; i > e; e++)if (t !== this[e]) {
        if (this[e].attr(this.comparator) >= n)return e + r
      } else r = -1;
      return e + r
    }, sort: function (e, n) {
      var r = this.comparator, i = r ? [function (t, e) {
        return t = "function" == typeof t[r] ? t[r]() : t[r], e = "function" == typeof e[r] ? e[r]() : e[r], t === e ? 0 : e > t ? -1 : 1
      }] : [e];
      [].sort.apply(this, i), !n && t.trigger(this, "reset")
    }});
    var i = function (e) {
      return e[0] && t.isArray(e[0]) ? e[0] : t.makeArray(e)
    };
    return t.each({push: "length", unshift: 0}, function (e, n) {
      var r = t.List.prototype, a = r[n];
      r[n] = function () {
        var n = i(arguments), r = e ? this.length : 0, s = a.apply(this, arguments);
        return this.comparator && n.length && (this.sort(null, !0), t.batch.trigger(this, "reset", [n]), this._triggerChange("" + r, "add", n, undefined)), s
      }
    }), e._changes = function (e, r, i, a, s) {
      if (this.comparator && /^\d+./.test(r)) {
        var o = +/^\d+/.exec(r)[0], u = this[o];
        if (u !== undefined) {
          var c = this.sortedIndex(u);
          if (c !== o)return[].splice.call(this, o, 1), [].splice.call(this, c, 0, u), t.trigger(this, "move", [u, c, o]), t.trigger(this, "change", [r.replace(/^\d+/, c), i, a, s]), undefined
        }
      }
      n.apply(this, arguments)
    }, e.setup = function () {
      r.apply(this, arguments), this.comparator && this.sort()
    }, t.Map
  }(__m2, __m15), __m43 = function (t, e) {
    var n, r = function (t, e) {
      var r = t.constructor.pluginName || t.constructor._shortName;
      for (n = 0; e.length > n; n++)if ("string" == typeof e[n] ? r == e[n] : t instanceof e[n])return!0;
      return!1
    }, i = e.makeArray, a = e.Control.setup;
    return e.Control.setup = function () {
      if (this !== e.Control) {
        var t = this.pluginName || this._fullName;
        "can_control" !== t && this.plugin(t), a.apply(this, arguments)
      }
    }, t.fn.extend({controls: function () {
      var t, n, a = i(arguments), s = [];
      return this.each(function () {
        if (t = e.$(this).data("controls"))for (var i = 0; t.length > i; i++)n = t[i], (!a.length || r(n, a)) && s.push(n)
      }), s
    }, control: function () {
      return this.controls.apply(this, arguments)[0]
    }}), e.Control.plugin = function (n) {
      var r = this;
      t.fn[n] || (t.fn[n] = function (n) {
        var a, s = i(arguments), o = "string" == typeof n && t.isFunction(r.prototype[n]), u = s[0];
        return this.each(function () {
          var t = e.$(this).control(r);
          t ? o ? a = t[u].apply(t, s.slice(1)) : t.update.apply(t, s) : r.newInstance.apply(r, [this].concat(s))
        }), a !== undefined ? a : this
      })
    }, e.Control.prototype.update = function (t) {
      e.extend(this.options, t), this.on()
    }, e
  }(jQuery, __m2, __m8), __m44 = function (t, e) {
    var n, r, i, a, s, o, u = {val: !0, text: !0};
    return n = function (n) {
      var a = t.fn[n];
      t.fn[n] = function () {
        var t, s, c, h = e.makeArray(arguments), l = this;
        if (e.isDeferred(h[0]))return h[0].done(function (t) {
          r.call(l, [t], a)
        }), this;
        if (i(h)) {
          if (t = o(h))return s = h[t], h[t] = function (t) {
            r.call(l, [t], a), s.call(l, t)
          }, e.view.apply(e.view, h), this;
          if (c = e.view.apply(e.view, h), e.isDeferred(c))return c.done(function (t) {
            r.call(l, [t], a)
          }), this;
          h = [c]
        }
        return u[n] ? a.apply(this, h) : r.call(this, h, a)
      }
    }, r = function (t, n) {
      var r;
      for (var i in e.view.hookups)break;
      return i && t[0] && a(t[0]) && (t[0] = e.view.frag(t[0]).childNodes), r = n.apply(this, t)
    }, i = function (t) {
      var e = typeof t[1];
      return"string" == typeof t[0] && ("object" == e || "function" == e) && !s(t[1])
    }, s = function (t) {
      return t.nodeType || t[0] && t[0].nodeType
    }, a = function (t) {
      return s(t) ? !0 : "string" == typeof t ? (t = e.trim(t), "<" === t.substr(0, 1) && ">" === t.substr(t.length - 1, 1) && t.length >= 3) : !1
    }, o = function (t) {
      return"function" == typeof t[3] ? 3 : "function" == typeof t[2] && 2
    }, t.fn.hookup = function () {
      return e.view.frag(this), this
    }, e.each(["prepend", "append", "after", "before", "text", "html", "replaceWith", "val"], function (t) {
      n(t)
    }), e
  }(jQuery, __m19), __m45 = function (t) {
    var e = function (e) {
      return"undefined" != typeof steal ? t.isFunction(steal.config) ? "" + steal.config().root.mapJoin(e) : "" + steal.root.join(e) : (t.fixture.rootUrl || "") + e
    }, n = function (n, r) {
      if (t.fixture.on) {
        var i = function () {
          "undefined" != typeof steal && steal.dev && steal.dev.log("fixture INFO: " + Array.prototype.slice.call(arguments).join(" "))
        };
        n.type = n.type || n.method || "GET";
        var a = u(n);
        if (!n.fixture)return"file:" === window.location.protocol && i("ajax request to " + n.url + ", no fixture found"), undefined;
        if ("string" == typeof n.fixture && t.fixture[n.fixture] && (n.fixture = t.fixture[n.fixture]), "string" == typeof n.fixture) {
          var s = n.fixture;
          /^\/\//.test(s) && (s = e(n.fixture.substr(2))), a && (s = t.sub(s, a)), delete n.fixture, n.url = s, n.data = null, n.type = "GET", n.error || (n.error = function (t, e, n) {
            throw"fixtures.js Error " + e + " " + n
          })
        } else n.dataTypes && n.dataTypes.splice(0, 0, "fixture"), a && r && t.extend(r.data, a)
      }
    }, r = function (t, e, n, r) {
      return"number" != typeof t && (r = e, n = t, e = "success", t = 200), "string" != typeof e && (r = n, n = e, e = "success"), t >= 400 && 599 >= t && (this.dataType = "text"), [t, e, i(this, n), r]
    }, i = function (t, e) {
      var n = t.dataTypes ? t.dataTypes[0] : t.dataType || "json";
      if (!e || !e[n]) {
        var r = {};
        r[n] = e, e = r
      }
      return e
    };
    if (t.ajaxPrefilter && t.ajaxTransport)t.ajaxPrefilter(n), t.ajaxTransport("fixture", function (e, n) {
      e.dataTypes.shift();
      var a, s = !1;
      return{send: function (o, u) {
        a = setTimeout(function () {
          var t = function () {
            s === !1 && u.apply(null, r.apply(e, arguments))
          }, a = e.fixture(n, t, o, e);
          a !== undefined && u(200, "success", i(e, a), {})
        }, t.fixture.delay)
      }, abort: function () {
        s = !0, clearTimeout(a)
      }}
    }); else {
      var a = t.ajax;
      t.ajax = function (e) {
        if (n(e, e), e.fixture) {
          var i, s = new t.Deferred, o = !1;
          return s.getResponseHeader = function () {
          }, s.then(e.success, e.fail), s.abort = function () {
            clearTimeout(i), o = !0, s.reject(s)
          }, i = setTimeout(function () {
            var t = function () {
              var t = r.apply(e, arguments), n = t[0];
              (n >= 200 && 300 > n || 304 === n) && o === !1 ? s.resolve(t[2][e.dataType]) : s.reject(s, "error", t[1])
            }, n = e.fixture(e, t, e.headers, e);
            n !== undefined && s.resolve(n)
          }, t.fixture.delay), s
        }
        return a(e)
      }
    }
    var s = [], o = function (t, e) {
      for (var n = 0; s.length > n; n++)if (h._similar(t, s[n], e))return n;
      return-1
    }, u = function (t) {
      var e = o(t);
      return e > -1 ? (t.fixture = s[e].fixture, h._getData(s[e].url, t.url)) : undefined
    }, c = function (t) {
      var e = t.data.id;
      return e === undefined && "number" == typeof t.data && (e = t.data), e === undefined && t.url.replace(/\/(\d+)(\/|$|\.)/g, function (t, n) {
        e = n
      }), e === undefined && (e = t.url.replace(/\/(\w+)(\/|$|\.)/g, function (t, n) {
        "update" != n && (e = n)
      })), e === undefined && (e = Math.round(1e3 * Math.random())), e
    }, h = t.fixture = function (e, n) {
      if (n !== undefined) {
        if ("string" == typeof e) {
          var r = e.match(/(GET|POST|PUT|DELETE) (.+)/i);
          e = r ? {url: r[2], type: r[1]} : {url: e}
        }
        var i = o(e, !!n);
        if (i > -1 && s.splice(i, 1), null == n)return;
        e.fixture = n, s.push(e)
      } else t.each(e, function (t, e) {
        h(e, t)
      })
    }, l = t.replacer;
    return t.extend(t.fixture, {_similar: function (e, n, r) {
      return r ? t.Object.same(e, n, {fixture: null}) : t.Object.subset(e, n, t.fixture._compare)
    }, _compare: {url: function (t, e) {
      return!!h._getData(e, t)
    }, fixture: null, type: "i"}, _getData: function (e, n) {
      var r = [], i = e.replace(".", "\\.").replace("?", "\\?"), a = RegExp(i.replace(l, function (t, e) {
        return r.push(e), "([^/]+)"
      }) + "$").exec(n), s = {};
      return a ? (a.shift(), t.each(r, function (t) {
        s[t] = a.shift()
      }), s) : null
    }, store: function (e, n, r, i) {
      var a = [], s = 0, o = function (t) {
        for (var e = 0; a.length > e; e++)if (t == a[e].id)return a[e]
      }, u = {};
      "string" == typeof e ? e = [e + "s", e] : t.isArray(e) || (i = r, r = n, n = e), t.extend(u, {findAll: function (e) {
        e = e || {};
        var n = a.slice(0);
        e.data = e.data || {}, t.each((e.data.order || []).slice(0).reverse(), function (t) {
          var e = t.split(" ");
          n = n.sort(function (t, n) {
            return"ASC" !== e[1].toUpperCase() ? t[e[0]] < n[e[0]] ? 1 : t[e[0]] == n[e[0]] ? 0 : -1 : t[e[0]] < n[e[0]] ? -1 : t[e[0]] == n[e[0]] ? 0 : 1
          })
        }), t.each((e.data.group || []).slice(0).reverse(), function (t) {
          var e = t.split(" ");
          n = n.sort(function (t, n) {
            return t[e[0]] > n[e[0]]
          })
        });
        var r = parseInt(e.data.offset, 10) || 0, s = parseInt(e.data.limit, 10) || a.length - r, o = 0;
        for (var u in e.data)if (o = 0, e.data[u] !== undefined && (-1 != u.indexOf("Id") || -1 != u.indexOf("_id")))for (; n.length > o;)e.data[u] != n[o][u] ? n.splice(o, 1) : o++;
        if (i)for (o = 0; n.length > o;)i(n[o], e) ? o++ : n.splice(o, 1);
        return{count: n.length, limit: e.data.limit, offset: e.data.offset, data: n.slice(r, r + s)}
      }, findOne: function (t, e) {
        var n = o(c(t));
        e(n ? n : undefined)
      }, update: function (e, n) {
        var r = c(e);
        t.extend(o(r), e.data), n({id: c(e)}, {location: e.url || "/" + c(e)})
      }, destroy: function (e) {
        for (var n = c(e), r = 0; a.length > r; r++)if (a[r].id == n) {
          a.splice(r, 1);
          break
        }
        return t.extend(o(n) || {}, e.data), {}
      }, create: function (e, n) {
        var i = r(a.length, a);
        t.extend(i, e.data), i.id || (i.id = s++), a.push(i), n({id: i.id}, {location: e.url + "/" + i.id})
      }});
      var h = function () {
        a = [];
        for (var i = 0; n > i; i++) {
          var o = r(i, a);
          o.id || (o.id = i), s = Math.max(o.id + 1, s + 1) || a.length, a.push(o)
        }
        t.isArray(e) && (t.fixture["~" + e[0]] = a, t.fixture["-" + e[0]] = u.findAll, t.fixture["-" + e[1]] = u.findOne, t.fixture["-" + e[1] + "Update"] = u.update, t.fixture["-" + e[1] + "Destroy"] = u.destroy, t.fixture["-" + e[1] + "Create"] = u.create)
      };
      return h(), t.extend({getId: c, find: function (t) {
        return o(c(t))
      }, reset: h}, u)
    }, rand: function (t, e, n) {
      if ("number" == typeof t)return"number" == typeof e ? t + Math.floor(Math.random() * (e - t)) : Math.floor(Math.random() * t);
      var r = arguments.callee;
      if (e === undefined)return r(t, r(t.length + 1));
      var i = [];
      t = t.slice(0), n || (n = e), n = e + Math.round(r(n - e));
      for (var a = 0; n > a; a++)i.push(t.splice(r(t.length), 1)[0]);
      return i
    }, xhr: function (e) {
      return t.extend({}, {abort: t.noop, getAllResponseHeaders: function () {
        return""
      }, getResponseHeader: function () {
        return""
      }, open: t.noop, overrideMimeType: t.noop, readyState: 4, responseText: "", responseXML: null, send: t.noop, setRequestHeader: t.noop, status: 200, statusText: "OK"}, e)
    }, on: !0}), t.fixture.delay = 200, t.fixture.rootUrl = e(""), t.fixture["-handleFunction"] = function (e) {
      return"string" == typeof e.fixture && t.fixture[e.fixture] && (e.fixture = t.fixture[e.fixture]), "function" == typeof e.fixture ? (setTimeout(function () {
        e.success && e.success.apply(null, e.fixture(e, "success")), e.complete && e.complete.apply(null, e.fixture(e, "complete"))
      }, t.fixture.delay), !0) : !1
    }, t.fixture.overwrites = s, t.fixture.make = t.fixture.store, t.fixture
  }(__m2, __m10, __m34);
  window.can = __m4
})();