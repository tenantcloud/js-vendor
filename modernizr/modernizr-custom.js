/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-canvas-classlist-cssanimations-csscalc-csstransforms-csstransforms3d-csstransitions-dataset-flexbox-history-lastchild-opacity-svg-willchange-setclasses-shiv !*/
!(function(e, t, n) {
	function r(e, t) {
		return typeof e === t;
	}
	function i() {
		var e, t, n, i, a, s, o;
		for (var l in x)
			if (x.hasOwnProperty(l)) {
				if (
					((e = []),
					(t = x[l]),
					t.name &&
						(e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
				)
					for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
				for (i = r(t.fn, 'function') ? t.fn() : t.fn, a = 0; a < e.length; a++)
					(s = e[a]),
						(o = s.split('.')),
						1 === o.length
							? (Modernizr[o[0]] = i)
							: (!Modernizr[o[0]] ||
									Modernizr[o[0]] instanceof Boolean ||
									(Modernizr[o[0]] = new Boolean(Modernizr[o[0]])),
							  (Modernizr[o[0]][o[1]] = i)),
						y.push((i ? '' : 'no-') + o.join('-'));
			}
	}
	function a(e) {
		var t = S.className,
			n = Modernizr._config.classPrefix || '';
		if ((w && (t = t.baseVal), Modernizr._config.enableJSClass)) {
			var r = new RegExp('(^|\\s)' + n + 'no-js(\\s|$)');
			t = t.replace(r, '$1' + n + 'js$2');
		}
		Modernizr._config.enableClasses &&
			((t += ' ' + n + e.join(' ' + n)), w ? (S.className.baseVal = t) : (S.className = t));
	}
	function s() {
		return 'function' != typeof t.createElement
			? t.createElement(arguments[0])
			: w
			? t.createElementNS.call(t, 'http://www.w3.org/2000/svg', arguments[0])
			: t.createElement.apply(t, arguments);
	}
	function o() {
		var e = t.body;
		return e || ((e = s(w ? 'svg' : 'body')), (e.fake = !0)), e;
	}
	function l(e, n, r, i) {
		var a,
			l,
			d,
			c,
			f = 'modernizr',
			u = s('div'),
			p = o();
		if (parseInt(r, 10)) for (; r--; ) (d = s('div')), (d.id = i ? i[r] : f + (r + 1)), u.appendChild(d);
		return (
			(a = s('style')),
			(a.type = 'text/css'),
			(a.id = 's' + f),
			(p.fake ? p : u).appendChild(a),
			p.appendChild(u),
			a.styleSheet ? (a.styleSheet.cssText = e) : a.appendChild(t.createTextNode(e)),
			(u.id = f),
			p.fake &&
				((p.style.background = ''),
				(p.style.overflow = 'hidden'),
				(c = S.style.overflow),
				(S.style.overflow = 'hidden'),
				S.appendChild(p)),
			(l = n(u, e)),
			p.fake
				? (p.parentNode.removeChild(p), (S.style.overflow = c), S.offsetHeight)
				: u.parentNode.removeChild(u),
			!!l
		);
	}
	function d(e, t) {
		return !!~('' + e).indexOf(t);
	}
	function c(e) {
		return e
			.replace(/([a-z])-([a-z])/g, function(e, t, n) {
				return t + n.toUpperCase();
			})
			.replace(/^-/, '');
	}
	function f(e, t) {
		return function() {
			return e.apply(t, arguments);
		};
	}
	function u(e, t, n) {
		var i;
		for (var a in e) if (e[a] in t) return n === !1 ? e[a] : ((i = t[e[a]]), r(i, 'function') ? f(i, n || t) : i);
		return !1;
	}
	function p(e) {
		return e
			.replace(/([A-Z])/g, function(e, t) {
				return '-' + t.toLowerCase();
			})
			.replace(/^ms-/, '-ms-');
	}
	function m(t, r) {
		var i = t.length;
		if ('CSS' in e && 'supports' in e.CSS) {
			for (; i--; ) if (e.CSS.supports(p(t[i]), r)) return !0;
			return !1;
		}
		if ('CSSSupportsRule' in e) {
			for (var a = []; i--; ) a.push('(' + p(t[i]) + ':' + r + ')');
			return (
				(a = a.join(' or ')),
				l('@supports (' + a + ') { #modernizr { position: absolute; } }', function(e) {
					return 'absolute' == getComputedStyle(e, null).position;
				})
			);
		}
		return n;
	}
	function h(e, t, i, a) {
		function o() {
			f && (delete P.style, delete P.modElem);
		}
		if (((a = r(a, 'undefined') ? !1 : a), !r(i, 'undefined'))) {
			var l = m(e, i);
			if (!r(l, 'undefined')) return l;
		}
		for (var f, u, p, h, v, g = ['modernizr', 'tspan', 'samp']; !P.style && g.length; )
			(f = !0), (P.modElem = s(g.shift())), (P.style = P.modElem.style);
		for (p = e.length, u = 0; p > u; u++)
			if (((h = e[u]), (v = P.style[h]), d(h, '-') && (h = c(h)), P.style[h] !== n)) {
				if (a || r(i, 'undefined')) return o(), 'pfx' == t ? h : !0;
				try {
					P.style[h] = i;
				} catch (y) {}
				if (P.style[h] != v) return o(), 'pfx' == t ? h : !0;
			}
		return o(), !1;
	}
	function v(e, t, n, i, a) {
		var s = e.charAt(0).toUpperCase() + e.slice(1),
			o = (e + ' ' + z.join(s + ' ') + s).split(' ');
		return r(t, 'string') || r(t, 'undefined')
			? h(o, t, i, a)
			: ((o = (e + ' ' + k.join(s + ' ') + s).split(' ')), u(o, t, n));
	}
	function g(e, t, r) {
		return v(e, n, n, t, r);
	}
	var y = [],
		x = [],
		C = {
			_version: '3.3.1',
			_config: { classPrefix: '', enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
			_q: [],
			on: function(e, t) {
				var n = this;
				setTimeout(function() {
					t(n[e]);
				}, 0);
			},
			addTest: function(e, t, n) {
				x.push({ name: e, fn: t, options: n });
			},
			addAsyncTest: function(e) {
				x.push({ name: null, fn: e });
			},
		},
		Modernizr = function() {};
	(Modernizr.prototype = C),
		(Modernizr = new Modernizr()),
		Modernizr.addTest('history', function() {
			var t = navigator.userAgent;
			return (-1 === t.indexOf('Android 2.') && -1 === t.indexOf('Android 4.0')) ||
				-1 === t.indexOf('Mobile Safari') ||
				-1 !== t.indexOf('Chrome') ||
				-1 !== t.indexOf('Windows Phone')
				? e.history && 'pushState' in e.history
				: !1;
		}),
		Modernizr.addTest(
			'svg',
			!!t.createElementNS && !!t.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
		);
	var S = t.documentElement;
	Modernizr.addTest('willchange', 'willChange' in S.style), Modernizr.addTest('classlist', 'classList' in S);
	var w = 'svg' === S.nodeName.toLowerCase();
	Modernizr.addTest('canvas', function() {
		var e = s('canvas');
		return !(!e.getContext || !e.getContext('2d'));
	}),
		Modernizr.addTest('dataset', function() {
			var e = s('div');
			return e.setAttribute('data-a-b', 'c'), !(!e.dataset || 'c' !== e.dataset.aB);
		});
	var b = C._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];
	(C._prefixes = b),
		Modernizr.addTest('csscalc', function() {
			var e = 'width:',
				t = 'calc(10px);',
				n = s('a');
			return (n.style.cssText = e + b.join(t + e)), !!n.style.length;
		}),
		Modernizr.addTest('opacity', function() {
			var e = s('a').style;
			return (e.cssText = b.join('opacity:.55;')), /^0.55$/.test(e.opacity);
		});
	var E = 'CSS' in e && 'supports' in e.CSS,
		T = 'supportsCSS' in e;
	Modernizr.addTest('supports', E || T);
	var _ = (C.testStyles = l);
	_(
		'#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}',
		function(e) {
			Modernizr.addTest('lastchild', e.lastChild.offsetWidth > e.firstChild.offsetWidth);
		},
		2
	);
	var N = 'Moz O ms Webkit',
		z = C._config.usePrefixes ? N.split(' ') : [];
	C._cssomPrefixes = z;
	var k = C._config.usePrefixes ? N.toLowerCase().split(' ') : [];
	C._domPrefixes = k;
	var j = { elem: s('modernizr') };
	Modernizr._q.push(function() {
		delete j.elem;
	});
	var P = { style: j.elem.style };
	Modernizr._q.unshift(function() {
		delete P.style;
	}),
		(C.testAllProps = v),
		(C.testAllProps = g),
		Modernizr.addTest('cssanimations', g('animationName', 'a', !0)),
		Modernizr.addTest('flexbox', g('flexBasis', '1px', !0)),
		Modernizr.addTest('csstransforms', function() {
			return -1 === navigator.userAgent.indexOf('Android 2.') && g('transform', 'scale(1)', !0);
		}),
		Modernizr.addTest('csstransforms3d', function() {
			var e = !!g('perspective', '1px', !0),
				t = Modernizr._config.usePrefixes;
			if (e && (!t || 'webkitPerspective' in S.style)) {
				var n,
					r = '#modernizr{width:0;height:0}';
				Modernizr.supports
					? (n = '@supports (perspective: 1px)')
					: ((n = '@media (transform-3d)'), t && (n += ',(-webkit-transform-3d)')),
					(n += '{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}'),
					_(r + n, function(t) {
						e = 7 === t.offsetWidth && 18 === t.offsetHeight;
					});
			}
			return e;
		}),
		Modernizr.addTest('csstransitions', g('transition', 'all', !0));
	w ||
		!(function(e, t) {
			function n(e, t) {
				var n = e.createElement('p'),
					r = e.getElementsByTagName('head')[0] || e.documentElement;
				return (n.innerHTML = 'x<style>' + t + '</style>'), r.insertBefore(n.lastChild, r.firstChild);
			}
			function r() {
				var e = x.elements;
				return 'string' == typeof e ? e.split(' ') : e;
			}
			function i(e, t) {
				var n = x.elements;
				'string' != typeof n && (n = n.join(' ')),
					'string' != typeof e && (e = e.join(' ')),
					(x.elements = n + ' ' + e),
					d(t);
			}
			function a(e) {
				var t = y[e[v]];
				return t || ((t = {}), g++, (e[v] = g), (y[g] = t)), t;
			}
			function s(e, n, r) {
				if ((n || (n = t), f)) return n.createElement(e);
				r || (r = a(n));
				var i;
				return (
					(i = r.cache[e]
						? r.cache[e].cloneNode()
						: h.test(e)
						? (r.cache[e] = r.createElem(e)).cloneNode()
						: r.createElem(e)),
					!i.canHaveChildren || m.test(e) || i.tagUrn ? i : r.frag.appendChild(i)
				);
			}
			function o(e, n) {
				if ((e || (e = t), f)) return e.createDocumentFragment();
				n = n || a(e);
				for (var i = n.frag.cloneNode(), s = 0, o = r(), l = o.length; l > s; s++) i.createElement(o[s]);
				return i;
			}
			function l(e, t) {
				t.cache ||
					((t.cache = {}),
					(t.createElem = e.createElement),
					(t.createFrag = e.createDocumentFragment),
					(t.frag = t.createFrag())),
					(e.createElement = function(n) {
						return x.shivMethods ? s(n, e, t) : t.createElem(n);
					}),
					(e.createDocumentFragment = Function(
						'h,f',
						'return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(' +
							r()
								.join()
								.replace(/[\w\-:]+/g, function(e) {
									return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")';
								}) +
							');return n}'
					)(x, t.frag));
			}
			function d(e) {
				e || (e = t);
				var r = a(e);
				return (
					!x.shivCSS ||
						c ||
						r.hasCSS ||
						(r.hasCSS = !!n(
							e,
							'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}'
						)),
					f || l(e, r),
					e
				);
			}
			var c,
				f,
				u = '3.7.3',
				p = e.html5 || {},
				m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
				h = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
				v = '_html5shiv',
				g = 0,
				y = {};
			!(function() {
				try {
					var e = t.createElement('a');
					(e.innerHTML = '<xyz></xyz>'),
						(c = 'hidden' in e),
						(f =
							1 == e.childNodes.length ||
							(function() {
								t.createElement('a');
								var e = t.createDocumentFragment();
								return (
									'undefined' == typeof e.cloneNode ||
									'undefined' == typeof e.createDocumentFragment ||
									'undefined' == typeof e.createElement
								);
							})());
				} catch (n) {
					(c = !0), (f = !0);
				}
			})();
			var x = {
				elements:
					p.elements ||
					'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',
				version: u,
				shivCSS: p.shivCSS !== !1,
				supportsUnknownElements: f,
				shivMethods: p.shivMethods !== !1,
				type: 'default',
				shivDocument: d,
				createElement: s,
				createDocumentFragment: o,
				addElements: i,
			};
			(e.html5 = x), d(t), 'object' == typeof module && module.exports && (module.exports = x);
		})('undefined' != typeof e ? e : this, t),
		i(),
		a(y),
		delete C.addTest,
		delete C.addAsyncTest;
	for (var A = 0; A < Modernizr._q.length; A++) Modernizr._q[A]();
	e.Modernizr = Modernizr;
})(window, document);
