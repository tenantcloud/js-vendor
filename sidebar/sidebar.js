/* ============================================================
 * Pages Sidebar
 * ============================================================ */
(function($) {
	'use strict';
	// SIDEBAR CLASS DEFINITION
	// ======================
	const Sidebar = function(element, options) {
		this.$element = $(element);
		this.options = $.extend(true, {}, $.fn.sidebar.defaults, options);
		this.$sidebarMenu = this.$element.find('.m-sidebar__menu > ul');
		this.$pageContainer = $(this.options.pageContainer);
		this.$body = $('body');
		if (!this.$sidebarMenu.length) return;
		// Bind events
		// Toggle sub menus
		// In Angular Binding is done using a pg-sidebar directive
		$(document).on('click', '.m-sidebar__menu a', function(e) {
			if (
				$(this)
					.parent()
					.children('.sub-menu-items') === false
			) {
				return;
			}
			const el = $(this),
				parent = $(this)
					.parent()
					.parent(), //ul.menu-items
				li = $(this).parent(),
				subMenu = $(this)
					.parent()
					.children('.sub-menu-items');
			if (li.hasClass('open active')) {
				el.children('.title')
					.children('.arrow')
					.removeClass('open');
				subMenu.slideUp(200, function() {
					subMenu.removeAttr('style');
					li.removeClass('open active');
				});
			} else {
				parent
					.children('li.open')
					.children('.sub-menu-items')
					.slideUp(200);
				parent
					.children('li.open')
					.children('a')
					.children('.title')
					.children('.arrow')
					.removeClass('open');
				parent.children('li.open').removeClass('open active');
				el.children('.title')
					.children('.arrow')
					.addClass('open');
				subMenu.slideDown(200, function() {
					li.addClass('open active');
					parent
						.children('li.open')
						.children('.sub-menu-items')
						.removeAttr('style');
				});
			}
		});
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
		this.$element.addClass('visible');
		this.$body.addClass('sidebar-open');
		document.body.dispatchEvent(event);ч
	};
	Sidebar.prototype.closeSidebar = function() {
		var event = new CustomEvent('sidebar-close');
		this.$body.removeClass('sidebar-open');
		this.$element.removeClass('visible');
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
