/* ============================================================
 * Pages Sidebar
 * ============================================================ */

(function($) {
	'use strict';
	// SIDEBAR CLASS DEFINITION
	// ======================

	var Sidebar = function(element, options) {
		this.$element = $(element);
		this.options = $.extend(true, {}, $.fn.sidebar.defaults, options);

		this.bezierEasing = [0.05, 0.74, 0.27, 0.99];
		this.cssAnimation = true;
		this.css3d = true;

		this.sideBarWidthCondensed = 170;

		this.$sidebarMenu = this.$element.find('.m-sidebar__menu > ul');
		this.$pageContainer = $(this.options.pageContainer);
		this.$body = $('body');

		if (!this.$sidebarMenu.length) return;

		if (!Modernizr.csstransitions) {
			this.cssAnimation = false;
		}

		if (!Modernizr.csstransforms3d) {
			this.css3d = false;
		}

		// Bind events
		// Toggle sub menus
		// In Angular Binding is done using a pg-sidebar directive
		$(document).on('click', '.m-sidebar__menu a', function(e) {
			if (
				$(this)
					.parent()
					.children('.sub-menu') === false
			) {
				return;
			}

			var el = $(this),
				parent = $(this)
					.parent()
					.parent(),
				li = $(this).parent(),
				sub = $(this)
					.parent()
					.children('.sub-menu');

			if (li.hasClass('open active')) {
				el.children('.title')
					.children('.arrow')
					.removeClass('open active');
				sub.slideUp(200, function() {
					sub.removeAttr('style');
					li.removeClass('open active');
				});
			} else {
				parent
					.children('li.open')
					.children('.sub-menu')
					.slideUp(200);
				parent
					.children('li.open')
					.children('a')
					.children('.title')
					.children('.arrow')
					.removeClass('open active');
				parent.children('li.open').removeClass('open active');
				el.children('.title')
					.children('.arrow')
					.addClass('open active');
				sub.slideDown(200, function() {
					li.addClass('open active');
					parent
						.children('li.open')
						.children('.sub-menu')
						.removeAttr('style');
				});
			}
		});

		this.menuOpenCSS =
			this.css3d === true
				? 'translate3d(' + this.sideBarWidthCondensed + 'px, 0,0)'
				: 'translate(' + this.sideBarWidthCondensed + 'px, 0)';
		this.menuClosedCSS = this.css3d === true ? 'translate3d(0, 0,0)' : 'translate(0, 0)';

		var _this = this,
			matchMedia = window.matchMedia('(max-width: 991px)');

		onQueryChange(matchMedia);
		matchMedia.addListener(onQueryChange);

		function sidebarMouseEnter() {
			if ($('.close-sidebar').data('clicked')) {
				return;
			}
			if (_this.$body.hasClass('menu-pin')) {
				_this.$body.removeClass('sidebar-visible');
				return;
			}

			if (_this.cssAnimation) {
				_this.$element.css({
					transform: _this.menuOpenCSS,
				});
				_this.$body.addClass('sidebar-visible');
			} else {
				_this.$element.stop().animate(
					{
						left: '0px',
					},
					400,
					$.bez(_this.bezierEasing),
					function() {
						_this.$body.addClass('sidebar-visible');
					}
				);
			}
		}

		function sidebarMouseLeave(e) {
			if (typeof e !== 'undefined') {
				var target = $(e.target);
				if (target.parent('.m-sidebar').length) {
					return;
				}
			}

			if (_this.$body.hasClass('menu-pin')) {
				_this.$body.removeClass('sidebar-visible');
				return;
			}

			if (_this.cssAnimation) {
				_this.$element.css({
					transform: _this.menuClosedCSS,
				});

				_this.$body.removeClass('sidebar-visible');
			} else {
				_this.$element.stop().animate(
					{
						left: '-' + _this.sideBarWidthCondensed + 'px',
					},
					400,
					$.bez(_this.bezierEasing),
					function() {
						_this.$body.removeClass('sidebar-visible');
					}
				);
			}
		}

		function onQueryChange(query) {
			onChangeMatches(!!query.matches);
		}

		function onChangeMatches(matches) {
			if (!matches) {
				_this.$element.bind('mouseenter mouseleave', sidebarMouseEnter);
				_this.$pageContainer.bind('mouseover', sidebarMouseLeave);
			} else {
				_this.$element.unbind('mouseenter mouseleave', sidebarMouseEnter);
				_this.$pageContainer.unbind('mouseover', sidebarMouseLeave);
			}
		}
	};

	// Toggle sidebar for mobile view
	Sidebar.prototype.toggleSidebar = function() {
		var sidebarIsOpen = this.$body.hasClass('sidebar-open');

		if (sidebarIsOpen) {
			Sidebar.prototype.closeSidebar.call(this);
		} else {
			Sidebar.prototype.openSidebar.call(this);
		}
	};

	Sidebar.prototype.openSidebar = function() {
		var event = new CustomEvent('sidebar-open');

		setTimeout(
			function() {
				this.$element.addClass('visible');
			}.bind(this),
			400
		);

		setTimeout(
			function() {
				this.$body.addClass('sidebar-open');
			}.bind(this),
			10
		);

		document.body.dispatchEvent(event);
	};

	Sidebar.prototype.closeSidebar = function() {
		var event = new CustomEvent('sidebar-close');

		this.$body.removeClass('sidebar-open');

		setTimeout(
			function() {
				this.$element.removeClass('visible');
			}.bind(this),
			400
		);

		document.body.dispatchEvent(event);
	};

	Sidebar.prototype.togglePinSidebar = function() {
		this.$body.toggleClass('menu-pin');
		if (this.$body.hasClass('menu-pin')) {
			localStorage.setItem('landlord.menu-pin', true);
			localStorage.setItem('tenant.menu-pin', true);
			localStorage.setItem('professional.menu-pin', true);
			localStorage.setItem('admin.menu-pin', true);
			localStorage.setItem('owner.menu-pin', true);
		} else {
			this.$body.removeClass('menu-pin');
			localStorage.setItem('landlord.menu-pin', false);
			localStorage.setItem('tenant.menu-pin', false);
			localStorage.setItem('professional.menu-pin', false);
			localStorage.setItem('admin.menu-pin', false);
			localStorage.setItem('owner.menu-pin', false);
		}
	};

	// SIDEBAR PLUGIN DEFINITION
	// =======================
	function Plugin(option) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data('pg.sidebar'),
				options = typeof option === 'object' && option;

			if (!data) $this.data('pg.sidebar', (data = new Sidebar(this, options)));
			if (typeof option === 'string') data[option]();
		});
	}

	var old = $.fn.sidebar;

	$.fn.sidebar = Plugin;
	$.fn.sidebar.Constructor = Sidebar;

	$.fn.sidebar.defaults = {
		pageContainer: '.l-container',
	};

	// SIDEBAR PROGRESS NO CONFLICT
	// ====================

	$.fn.sidebar.noConflict = function() {
		$.fn.sidebar = old;
		return this;
	};

	// SIDEBAR PROGRESS DATA API
	//===================
	$(document).on('click.pg.sidebar', '[data-toggle-pin="sidebar"]', function(e) {
		e.preventDefault();

		$('[data-pages="sidebar"]')
			.data('pg.sidebar')
			.togglePinSidebar();

		return false;
	});

	$(document).on('click.pg.sidebar touchend', '[data-toggle="sidebar"]', function(e) {
		e.preventDefault();

		var sidebar = $('[data-pages="sidebar"]');

		if (sidebar && sidebar.data('pg.sidebar')) {
			sidebar.data('pg.sidebar').toggleSidebar();
		}

		return false;
	});
})(window.jQuery);
