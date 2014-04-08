/*
#**********************************************************
#* Filename: UI.tooltip
#* Creator: Angel
#* Description: UI.tooltip
#* Date: 20140115
# **********************************************************
# (c) Copyright 2014 Madeiracloud  All Rights Reserved
# **********************************************************
*/

define('UI.tooltip',["jquery"], function(){


(function ()
{
	var tooltip = function (event)
	{
		var target = $(this),
			content = $.trim(target.data('tooltip')),
			tooltip_box = $('#tooltip_box'),
			docElem = document.documentElement,
			target_offset,
			width,
			height,
			target_width,
			target_height,
			tooltip_timer;

		if (content !== '' && !target.hasClass('parsley-error'))
		{
			if (!tooltip_box[0])
			{
				$(document.body).append('<div id="tooltip_box"></div>');
				tooltip_box = $('#tooltip_box');
			}

			tooltip_box.text(content).show();

			if (target.prop('namespaceURI') === 'http://www.w3.org/2000/svg')
			{
				target_offset = target[0].getBoundingClientRect();
				target_width = target_offset.width;
				target_height = target_offset.height;
			}
			else
			{
				target_offset = target.offset();
				target_width = target.innerWidth();
				target_height = target.innerHeight();
			}

			width = tooltip_box.width();
			height = tooltip_box.height();

			tooltip_box.css({
				'left': target_offset.left + target_width + width - docElem.scrollLeft > window.innerWidth ?
					target_offset.left + target_width - width - 20 :
					target_offset.left + 5,
				'top': target_offset.top + target_height + height - docElem.scrollTop + 45 > window.innerHeight ?
					target_offset.top - height - 15 :
					target_offset.top + target_height + 8
			});

			$(document.body).on('mouseleave', '.tooltip', tooltip.clear);

			tooltip.timer.push(
				setInterval(function ()
				{
					if (target.closest('html').length === 0)
					{
						tooltip.clear();
					}
				}, 1000)
			);
		}

		return true;
	};

	tooltip.timer = [],

	tooltip.clear = function ()
	{
		$(document.body).off('mouseleave', '.tooltip', tooltip.clear);
		$('#tooltip_box').remove();

		$.each(tooltip.timer, function (index, timer)
		{
			clearInterval(timer);
		});

		return false;
	};

	$(document).ready(function ()
	{
		$(document.body).on('mouseenter', '.tooltip', tooltip);
	});
})();

});

/*
#**********************************************************
#* Filename: UI.scrollbar
#* Creator: Angel
#* Description: UI.scrollbar
#* Date: 20140307
# **********************************************************
# (c) Copyright 2014 Madeiracloud  All Rights Reserved
# **********************************************************
*/

define('UI.scrollbar',["jquery"], function(){


(function (document) {

var style = document.documentElement.style,
	isTransform = false,
	cssTransform;

$.each([
	'webkitTransform',
	'MozTransform',
	'OTransform',
	'msTransform',
	'transform'
], function (i, cssName)
{
	if (cssName in style)
	{
		isTransform = true;
		cssTransform = cssName;
	}
});

var scrollbar = {
	init: function ()
	{
		var doc_scroll_wrap = document.getElementsByClassName('scroll-wrap');

		$(document)
			.on('mousewheel', '.scroll-wrap', scrollbar.wheel)
			.on('DOMMouseScroll', '.scroll-wrap', scrollbar.wheel)
			.on('mousedown', '.scrollbar-veritical-thumb', {'direction': 'veritical'}, scrollbar.mousedown)
			.on('mousedown', '.scrollbar-horizontal-thumb', {'direction': 'horizontal'}, scrollbar.mousedown);

		setInterval(function ()
		{
			var length = doc_scroll_wrap.length;

			while (length--)
			{
				var target = doc_scroll_wrap[ length ],
					wrap = $(target),
					children = wrap.children(),
					veritical_thumb = children[0] ? $(children[0].firstChild) : undefined,
					horizontal_thumb = children[1] ? $(children[1].firstChild) : undefined,
					scroll_content = target.getElementsByClassName('scroll-content')[0],
					offsetHeight = target.offsetHeight,
					offsetWidth = target.offsetWidth,
					scrollbar_height,
					scrollbar_width,
					wrap_height,
					wrap_width;

				if (
					scroll_content &&
					wrap.css('display') === 'block' &&
					!wrap.hasClass('scrolling')
				)
				{
					scrollbar_height = scroll_content.scrollHeight > 0 ? offsetHeight * offsetHeight / scroll_content.scrollHeight : 0;
					scrollbar_width = scroll_content.scrollWidth > 0 ? offsetWidth * offsetWidth / scroll_content.scrollWidth : 0;

					if (veritical_thumb && veritical_thumb.hasClass('scrollbar-veritical-thumb'))
					{
						wrap_height = wrap.height();

						if (scrollbar_height <= offsetHeight * 2 - scroll_content.scrollHeight || scrollbar_height > wrap_height)
						{
							veritical_thumb.parent().hide();

							if (isTransform)
							{
								scroll_content.style[ cssTransform ] = 'translate(' + (scroll_content.realScrollLeft ? scroll_content.realScrollLeft : 0) + ', 0)';
							}
							else
							{
								scroll_content.style.top = '0px';
							}

							scroll_content.realScrollTop = 0;
							veritical_thumb[0].style.top = '0px';
						}
						else
						{
							veritical_thumb.parent().show();
							veritical_thumb[0].style.height = scrollbar_height + 'px';

							if (
								scroll_content.realScrollTop !== 0 &&
								wrap_height - scroll_content.realScrollTop > scroll_content.scrollHeight
							)
							{
								scrollbar.scrollTop({
									'scroll_content': scroll_content,
									'scrollbar_wrap': children[0],
									'thumb': veritical_thumb[0],
									'scroll_target': wrap
								}, scroll_content.scrollHeight);
							}
						}
					}

					if (horizontal_thumb && horizontal_thumb.hasClass('scrollbar-horizontal-thumb'))
					{
						wrap_width = wrap.width();

						if (scrollbar_width <= offsetWidth * 2 - scroll_content.scrollWidth || scrollbar_width > wrap_width)
						{
							horizontal_thumb.parent().hide();
							if (isTransform)
							{
								scroll_content.style[ cssTransform ] = 'translate(0, ' + (scroll_content.realScrollTop ? scroll_content.realScrollTop : 0) + 'px)';
							}
							else
							{
								scroll_content.style.left = '0px';
							}

							scroll_content.realScrollLeft = 0;
							horizontal_thumb[0].style.left = '0px';
						}
						else
						{
							horizontal_thumb.parent().show();
							horizontal_thumb[0].style.width = scrollbar_width + 'px';

							if (
								scroll_content.realScrollLeft !== 0 &&
								wrap_width - scroll_content.realScrollLeft > scroll_content.scrollWidth
							)
							{
								scrollbar.scrollLeft({
									'scroll_content': scroll_content,
									'scrollbar_wrap': children[1],
									'thumb': horizontal_thumb[0],
									'scroll_target': wrap
								}, scroll_content.scrollWidth);
							}
						}
					}

					if (target.scrollTop !== 0)
					{
						scrollbar.scrollTop({
							'scroll_content': scroll_content,
							'scrollbar_wrap': children[0],
							'thumb': veritical_thumb[0],
							'scroll_target': wrap
						}, target.scrollTop);

						target.scrollTop = 0;
					}

					if (target.scrollLeft !== 0)
					{
						scrollbar.scrollLeft({
							'scroll_content': scroll_content,
							'scrollbar_wrap': children[0],
							'thumb': veritical_thumb[0],
							'scroll_target': wrap
						}, target.scrollLeft);

						target.scrollLeft = 0;
					}
				}
			}
		}, 800);

		return true;
	},

	mousedown: function (event)
	{
		var thumb = $(this),
			target = thumb.parent().parent(),
			direction = event.data.direction;

		$(document.body).append('<div id="overlayer"></div>');

		target
			.addClass('scrolling')
			.trigger('scroll');

		$(document)
			.on({
				'mousemove': scrollbar.mousemove,
				'mouseup': scrollbar.mouseup
			}, {
				'scroll_target': target,
				'direction': direction,
				'scrollbar_wrap': target.find('.scrollbar-' + direction + '-wrap').first(),
				'scroll_content': target.find('.scroll-content').first()[0],
				'thumb': thumb[0],
				'thumbPos': direction === 'veritical' ? event.clientY - thumb.offset().top : event.clientX - thumb.offset().left
			});

		// return false;
	},

	mousemove: function (event)
	{
		var event_data = event.data,
			target = event_data.scroll_target,
			direction = event_data.direction,
			thumbPos = event_data.thumbPos;

		if (direction === 'veritical')
		{
			scrollbar.scrollTop(event_data, event.clientY - event_data.scrollbar_wrap.offset().top - thumbPos);
		}

		if (direction === 'horizontal')
		{
			scrollbar.scrollLeft(event_data, event.clientX - event_data.scrollbar_wrap.offset().left - thumbPos);
		}

		return false;
	},

	mouseup: function (event)
	{
		$(document).off({
			'mousemove': scrollbar.mousemove,
			'mouseup': scrollbar.mouseup
		});

		$('#overlayer').remove();

		event.data.scroll_target.removeClass('scrolling');

		return true;
	},

	scrollTo: function (target, direction)
	{
		var scroll_content = target.find('.scroll-content').first(),
			scrollbar_wrap,
			thumb;

		if (direction.left >= 0)
		{
			thumb = target.find('.scrollbar-horizontal-thumb').first();
			scrollbar_wrap = target.find('.scrollbar-horizontal-wrap').first();

			if (thumb[0] && scrollbar_wrap[0])
			{
				scrollbar.scrollLeft({
					'scroll_content': scroll_content[0],
					'scrollbar_wrap': scrollbar_wrap,
					'thumb': thumb[0],
					'scroll_target': target
				}, direction.left / (scroll_content[0].scrollWidth / scrollbar_wrap.width()));
			}
		}

		if (direction.top >= 0)
		{
			thumb = target.find('.scrollbar-veritical-thumb').first();
			scrollbar_wrap = target.find('.scrollbar-veritical-wrap').first();

			if (thumb[0] && scrollbar_wrap[0])
			{
				scrollbar.scrollTop({
					'scroll_content': scroll_content[0],
					'scrollbar_wrap': scrollbar_wrap,
					'thumb': thumb[0],
					'scroll_target': target
				}, direction.top / (scroll_content[0].scrollHeight / scrollbar_wrap.height()));
			}
		}

		return true;
	},

	scrollLeft: function (data, scroll_left)
	{
		var scroll_content = data.scroll_content,
			horizontal_thumb = data.thumb,
			scroll_wrap_width = data.scroll_target.width(),
			max_scroll = scroll_content.scrollWidth - scroll_wrap_width,
			scale = scroll_content.scrollWidth / scroll_wrap_width,
			thumb_max = max_scroll / scale,
			scroll_value;

		if (max_scroll < 0)
		{
			return true;
		}

		if (scroll_left > 0 && scroll_left < thumb_max)
		{
			horizontal_thumb.style.left = scroll_left + 'px';
			scroll_value = -(scroll_left * scale);
		}
		else
		{
			if (scroll_left <= 0)
			{
				horizontal_thumb.style.left = '0px';
				scroll_value = 0;
			}
			if (scroll_left >= thumb_max)
			{
				horizontal_thumb.style.left = thumb_max + 'px';
				scroll_value = -max_scroll;
			}
		}

		scroll_value = Math.round(scroll_value);

		if (isTransform)
		{
			scroll_content.style[ cssTransform ] = 'translate(' + scroll_value + 'px, ' + (scroll_content.realScrollTop ? scroll_content.realScrollTop : 0) + 'px)';
		}
		else
		{
			scroll_content.style.left = scroll_value + 'px';
		}

		scroll_content.realScrollLeft = scroll_value;

		return true;
	},

	scrollTop: function (data, scroll_top)
	{
		var scroll_content = data.scroll_content,
			veritical_thumb = data.thumb,
			scroll_wrap_height = data.scroll_target.height(),
			max_scroll = scroll_content.scrollHeight - scroll_wrap_height,
			scale = scroll_content.scrollHeight / scroll_wrap_height,
			thumb_max = max_scroll / scale,
			scroll_value;

		if (max_scroll < 0)
		{
			return true;
		}

		if (scroll_top > 0 && scroll_top < thumb_max)
		{
			veritical_thumb.style.top = scroll_top + 'px';
			scroll_value = -(scroll_top * scale);
		}
		else
		{
			if (scroll_top <= 0)
			{
				veritical_thumb.style.top = '0px';
				scroll_value = 0;
			}
			if (scroll_top >= thumb_max)
			{
				veritical_thumb.style.top = thumb_max + 'px';
				scroll_value = -max_scroll;
			}
		}

		scroll_value = Math.round(scroll_value);

		if (isTransform)
		{
			scroll_content.style[ cssTransform ] = 'translate(' + (scroll_content.realScrollLeft ? scroll_content.realScrollLeft : 0) + 'px, ' + scroll_value + 'px)';
		}
		else
		{
			scroll_content.style.top = scroll_value + 'px';
		}

		scroll_content.realScrollTop = scroll_value;

		return true;
	},

	wheel: function (event, delta)
	{
		var target = $(this),
			event_target = event.target,
			originalEvent = event.originalEvent,
			scroll_content = target.find('.scroll-content').first(),
			thumb,
			scrollbar_wrap,
			wrap_height,
			scrollTop,
			max_scroll,
			scale,
			thumb_max;

		if (
			event_target.tagName.toLowerCase() === 'textarea' &&
			event_target.scrollHeight > event_target.offsetHeight
		)
		{
			return true;
		}

		if (
			originalEvent.wheelDeltaX ||
			originalEvent.axis === 1
		)
		{
			target.trigger('onscroll');

			thumb = target.find('.scrollbar-horizontal-thumb').first();

			if (thumb[0])
			{
				delta = originalEvent.wheelDeltaX ? originalEvent.wheelDeltaX / 120 : -originalEvent.detail / 3;
				scrollbar_wrap = target.find('.scrollbar-horizontal-wrap').first();
				wrap_width = target.width();
				scrollLeft = thumb[0].offsetLeft - (delta * 12);
				max_scroll = scroll_content[0].scrollWidth - wrap_width;
				scale = scroll_content[0].scrollWidth / wrap_width;
				thumb_max = max_scroll / scale;

				if (scrollbar_wrap.css('display') === 'block')
				{
					scrollbar.scrollLeft({
						'scroll_content': scroll_content[0],
						'scrollbar_wrap': scrollbar_wrap,
						'thumb': thumb[0],
						'scroll_target': target
					}, scrollLeft);

					return (scrollLeft < 0 || scrollLeft > thumb_max);
				}
				else
				{
					return true;
				}
			}
		}

		if (
			originalEvent.wheelDeltaY ||
			originalEvent.wheelDelta ||
			originalEvent.detail
		)
		{
			target.trigger('scroll');

			thumb = target.find('.scrollbar-veritical-thumb').first();

			if (thumb[0])
			{
				delta = originalEvent.wheelDelta ? originalEvent.wheelDelta / 120 : originalEvent.wheelDeltaY ? originalEvent.wheelDeltaY / 120 : -originalEvent.detail / 3;
				scrollbar_wrap = target.find('.scrollbar-veritical-wrap').first();
				wrap_height = target.height();
				scrollTop = thumb[0].offsetTop - (delta * 12);
				max_scroll = scroll_content[0].scrollHeight - wrap_height;
				scale = scroll_content[0].scrollHeight / wrap_height;
				thumb_max = max_scroll / scale;

				if (scrollbar_wrap.css('display') === 'block')
				{
					scrollbar.scrollTop({
						'scroll_content': scroll_content[0],
						'scrollbar_wrap': scrollbar_wrap,
						'thumb': thumb[0],
						'scroll_target': target
					}, scrollTop);

					return (scrollTop < 0 || scrollTop > thumb_max);
				}
				else
				{
					return true;
				}
			}
		}
	}
};

window.scrollbar = scrollbar;

$(document).ready(function ()
{
	scrollbar.init();
});

})(document);

});

/*
#**********************************************************
#* Filename: UI.tabbar
#* Creator: Angel
#* Description: UI.tabbar
#* Date: 20140218
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/
define('UI.tabbar',["jquery"], function(){

var Tabbar = window.Tabbar = {
	// Default
	current: 'dashboard',

	mousedown: function (event)
	{
		if (event.which === 1)
		{
			if ($(event.target).hasClass('icon-close'))
			{
				return false;
			}

			if (this.id === 'tab-bar-dashboard')
			{
				Tabbar.open('dashboard');
				// return false;
			}

			var target = $(this),
				position = target.position(),
				tab_list = $('#tab-bar li'),
				dragging_tab = target.clone();

			dragging_tab.css({
				'position': 'absolute',
				'left': position.left
			});

			$('#tab-bar ul').append(dragging_tab);
			target.css('visibility', 'hidden');

			$(document.body).append('<div id="overlayer"></div>');

			$(document)
				.on('mousemove', {
					'target': target,
					'dragging_tab': dragging_tab,
					'offset_left': event.pageX - target.offset().left - 117,
					'tab_list': tab_list,
					'tab_width': tab_list.last().width(),
					'tabbar_offsetLeft': $('#tab-bar').offset().left
				}, Tabbar.mousemove)
				.on('mouseup', {
					'target': target,
					'dragging_tab': dragging_tab
				}, Tabbar.mouseup);

			MC.canvas.volume.close();
			MC.canvas.event.clearList(event);
		}

		// return false;
	},

	mousemove: function (event)
	{
		var left = event.pageX - event.data.offset_left,
			tabbar_offsetLeft = event.data.tabbar_offsetLeft,
			index = Math.round((left - tabbar_offsetLeft - 117) / event.data.tab_width),
			length = event.data.tab_list.length;

		left = left > tabbar_offsetLeft ? left : tabbar_offsetLeft;

		if (left < 162)
		{
			left = 162;
		}

		event.data.dragging_tab.css('left', left - 117);

		if (index > 0)
		{
			if (index >= length)
			{
				event.data.tab_list.eq(length - 1).after(event.data.target);
			}
			else
			{
				event.data.tab_list.eq(index).before(event.data.target);
			}
		}

		return false;
	},

	mouseup: function (event)
	{
		event.data.dragging_tab.remove();
		event.data.target.css('visibility', 'visible');

		$('#overlayer').remove();

		$(document).off({
			'mousemove': Tabbar.mousemove,
			'mouseup': Tabbar.mouseup
		});
		//modify by kenshin
		Tabbar.open(event.data.target.attr('id').replace('tab-bar-', ''), event.target.title, event);

		return false;
	},

	add: function (tab_id, tab_name)
	{
		var tab_type = tab_id.match(/(appview|app\-edit|app|stack|new|process)*/ig)[0];

		$('#tab-bar ul').append(
			MC.template.tab.item({
				'tab_id': tab_id,
				'tab_name': tab_name,
				'tab_type': tab_type
			})
		);

		Tabbar.open(tab_id, tab_name);
		Tabbar.resize($('#tab-bar').width());
		$('#tab-bar').trigger('NEW_TAB', tab_id);

		return tab_id;
	},

	open: function (tab_id, tab_name, event)
	{
		var tab_bar = $('#tab-bar'),
			tab_item = $('#tab-bar-' + tab_id),
			original_tab = $('#tab-bar .active')[0],
			original_tab_id = null;

		//add by kenshin
		if (!original_tab && event)
		{
			tab_bar.find( 'ul' ).append( event.data.target );
			original_tab = $('#tab-bar .active' )[0];
			//tab_item = $('#tab-bar-' + tab_id);
		}

		if (!tab_item[0])
		{
			Tabbar.add(tab_id, tab_name);

			return false;
		}

		if (original_tab)
		{
			original_tab_id = original_tab.id.replace('tab-bar-', '');
		}

		$('#tab-bar li').removeClass('active');
		tab_item.addClass('active');

		if (tab_id === 'dashboard')
		{
			Tabbar.current = 'dashboard';
		}
		else
		{
			Tabbar.current = tab_item.data('tab-type');
		}

		tab_bar.trigger('OPEN_TAB', [original_tab_id, tab_id]);

		if (tab_id === 'dashboard')
		{
			scrollbar.scrollTo($('#global-region-wrap'), {'top': 1});
		}

		return tab_id;
	},

	updateState : function( tab_id, tab_type )
	{
		var $tab = $( "#tab-bar-" + tab_id );
		if ( $tab.hasClass("active") ) {
			Tabbar.current = tab_type;
		}
		$tab.data("tab-type", tab_type);
		return true;
	},

	closeTabRestriction : function(event)
	{

		if (event.which === 1)
		{
			var target = $(this).parent(),
				tab_name = target.find('a').attr('title').replace(' - stack', ''),
				tab_id = target.attr('id').replace('tab-bar-', '');

			$('#tab-bar').trigger('CLOSE_TAB_RESTRICTION', [ target, tab_name, tab_id ]);
		}

	},

	close: function (event)
	{
		event.stopImmediatePropagation();

		if (event.which === 1 || $(event.currentTarget).hasClass('auto-close') )
		{
			var target = $(this).parent(),
				tab_id = target.attr('id').replace('tab-bar-', '');

			target.remove();
			Tabbar.open($('#tab-bar li:last').attr('id').replace('tab-bar-', ''));

			$('#tab-bar').trigger('CLOSE_TAB', tab_id);

			Tabbar.resize($('#tab-bar').width());
		}

		return false;
	},

	resize: function (tabbar_width)
	{
		var tabs = $('#tab-bar li'),
			tabs_link = $('#tab-bar li a.tab-bar-truncate'),

			// Except for the first tab
			tabs_count = tabs.length - 1,

			// tabbar - first tab width + margin-right
			tab_item_width = (tabbar_width - (117 + 5) - (tabs_count * 5)) / tabs_count;

		tab_item_width = tab_item_width > 220 ? 220 : tab_item_width;
		tabs.css('width', tab_item_width);
		tabs_link.css('width', tab_item_width - 30);

		return true;
	}
};

$(document).ready(function ()
{
	$('#tab-bar')
		.on('click', '.close-restriction', Tabbar.closeTabRestriction)
		.on('mousedown', 'li', Tabbar.mousedown)
		.on('click', '.close-tab', Tabbar.close);

	$(window).resize(function ()
	{
		Tabbar.resize($('#tab-bar').width());
	});
});

});

/*
#**********************************************************
#* Filename: UI.bubble
#* Creator: Angel
#* Description: UI.bubble
#* Date: 20140116
# **********************************************************
# (c) Copyright 2014 Madeiracloud  All Rights Reserved
# **********************************************************
*/

define('UI.bubble',["jquery"], function(){

(function ()
{
	var bubble = function (event)
	{
		if (event.type === 'mouseleave')
		{
			bubble.clear();

			return false;
		}

		var target = $(this),
			content = target.data('bubble-template'),
			data = target.data('bubble-data'),
			bubble_box = $('#bubble-box'),
			coordinate = {},
			docElem = document.documentElement,
			width,
			height,
			target_offset,
			target_width,
			target_height;

		if ($.trim(content) !== '')
		{
			if (!bubble_box[0])
			{
				$(document.body).append('<div id="bubble-box"><div class="arrow"></div><div id="bubble-content"></div></div>');
				bubble_box = $('#bubble-box');
			}

			$('#bubble-content').html(
				MC.template[ content ]( data )
			);

			target_offset = target.offset();
			target_width = target.innerWidth();
			target_height = target.innerHeight();

			width = bubble_box.width();
			height = bubble_box.height();

			if (target_offset.left + target_width + width - docElem.scrollLeft > window.innerWidth)
			{
				coordinate.left = target_offset.left - width - 15;
				bubble_box.addClass('bubble-right');
			}
			else
			{
				coordinate.left = target_offset.left + target_width + 15;
				bubble_box.addClass('bubble-left');
			}

			coordinate.top = target_offset.top - ((height - target_height) / 2);

			bubble_box.css(coordinate).show();
		}

		bubble.timer = setInterval(function ()
		{
			if (target.closest('html').length === 0)
			{
				bubble.clear();
			}
		}, 1000);
	};

	bubble.clear = function ()
	{
		$('#bubble-box').remove();

		clearInterval(bubble.timer);
	};

	$(document).ready(function ()
	{
		$(document.body).on('mouseenter mouseleave', '.bubble', bubble);
	});
})();

});

/*
#**********************************************************
#* Filename: UI.modal
#* Creator: Angel
#* Description: UI.modal
#* Date: 20140213
# **********************************************************
# (c) Copyright 2014 Madeiracloud  All Rights Reserved
# **********************************************************
*/

define('UI.modal',["jquery"], function(){


var modal = window.modal = function (template, dismiss, callback, options)
{
	var modal_wrap = $('#modal-wrap');

	if (!modal_wrap[0])
	{
		$(document.body).append('<div id="modal-wrap"></div>');
		modal_wrap = $('#modal-wrap');
	}

	if (options && options.opacity)
	{
		modal_wrap.css('background-color', 'rgba(0, 0, 0, ' + options.opacity + ')');
	}

	modal_wrap.html('<div id="modal-box">' + template + '</div>');

	var newStyle = '';
	var newClass = '';

	var $source = null;

	if (options && options.$source) {
		$source = options.$source
	}

	if ($source) {
		var srcLeft = $source.offset().left;
		var srcTop = $source.offset().top;
		var srcWidth = $source.width();
		var srcHeight = $source.height();

		newStyle = "overflow:hidden;opacity:0;left:" +
			srcLeft + "px;top:" + srcTop + "px;width:" +
			srcWidth + "px;height:" + srcHeight + "px;";

		newClass = "modal-transition-animation";
	}

	modal_wrap.html('<div id="modal-box" class="' + newClass + '" style="' + newStyle + '">' + template + '</div>');

	$modal = $('#modal-box');

	$modal.show();
	$modal.children(':first').show();

	if ($source) {
		$modal.css({
			'opacity': 1,
			'width': $modal.find('div').width(),
			'height': $modal.find('div').height()
		});

		$modal.on('webkitTransitionEnd transitionend oTransitionEnd', function() {
			$modal.removeClass('modal-transition-animation');
		});
	}

	modal.position($source);

	if (dismiss === true)
	{
		$("#modal-wrap")
			.on('click', modal.dismiss);
		$(document)
			.on('keyup', modal.keyup);
	}

	$(window).on('resize', modal.position);

	// $('#wrapper').addClass('blur-effect');

	$("#modal-box")
		.on('click', '.modal-close', modal.close)
		.on('mousedown', '.modal-header', {'options': options}, modal.drag.mousedown);

	if (callback)
	{
		callback();
	}

	return true;
};

modal.open = function (event)
{
	var target = $(this),
		target_template = target.data('modal-template'),
		target_data = target.data('modal-data');

	if (target_template)
	{
		if (target_data === undefined)
		{
			target_data = '';
		}

		modal(
			MC.template[ target_template ]( target_data ),
			target.data('modal-dismiss')
		);

		target.trigger('modal-shown');

		$('#modal-wrap').one('closed', function ()
		{
			target.trigger('modal-closed');
		});
	}

	return true;
};

modal.keyup = function (event)
{
	if (event.which === 27)
	{
		modal.close();
	}

	// else if ( event.which == 13 ) {
	// 	var btns = $("#modal-wrap").find(".modal-footer").find(".btn").filter(":not(.btn-silver,.modal-close)")
	// 	if ( btns.length == 1 ) {
	// 		btns.click()
	// 	}
	// }

	return false;
};

modal.dismiss = function (event)
{
	if (event.target.id === 'modal-wrap')
	{
		modal.close();
	}
};

modal.close = function ( evt )
{
	$(window).off('resize', modal.position);

	// $('#wrapper').removeClass('blur-effect');

	$(document).off('keyup', modal.keyup);
	// 	.off('click', '.modal-close', modal.close)
	// 	.off('mousedown', '.modal-header', modal.drag.mousedown)
	// 	.off('click', modal.dismiss)

	$('#modal-wrap')
		.trigger('closed')
		.remove();

	if ( evt && evt.target.tagName === "A" && evt.preventDefault ) {
		evt.preventDefault();
	}
};

modal.isPopup = function ()
{
	// if ($('#modal-box').html() === void 0) {
	// 	return false;
	// } else {
	// 	return true;
	// }
	return $('#modal-box').html() !== void 0
};

modal.drag = {
	mousedown: function (event)
	{
		var target = $('#modal-box'),
			target_position = target.position();

		$(document).on({
			'mousemove': modal.drag.mousemove,
			'mouseup': modal.drag.mouseup
		}, {
			'target': target,
			'left': event.pageX - target_position.left,
			'top': event.pageY - target_position.top,
			'options': event.data.options
		});

		event.preventDefault();
		// return false;
	},

	mousemove: function (event)
	{
		event.data.target.css({
			'top': event.pageY - event.data.top,
			'left': event.pageX - event.data.left
		});

		return false;
	},

	mouseup: function (event)
	{
		var target = event.data.target,
			options = event.data.options,
			position = target.position(),
			height = target.height(),
			width = target.width(),
			prop = {};

		if (options && options.conflict === 'loose')
		{
			if (position.top < 0)
			{
				prop['top'] = 10;
			}

			if (position.left < -width * 0.8)
			{
				prop['left'] = 10;
			}

			if (position.top > window.innerHeight - height + (height * 0.7))
			{
				prop['top'] = window.innerHeight - height - 10;
			}

			if (position.left > window.innerWidth - width + (width * 0.8))
			{
				prop['left'] = window.innerWidth - width - 25;
			}
		}
		else
		{
			if (position.top < 0)
			{
				prop['top'] = 10;
			}

			if (position.left < 0)
			{
				prop['left'] = 10;
			}

			if (position.top > window.innerHeight - height)
			{
				prop['top'] = window.innerHeight - height - 10;
			}

			if (position.left > window.innerWidth - width)
			{
				prop['left'] = window.innerWidth - width - 25;
			}
		}

		if (!$.isEmptyObject(prop))
		{
			target.animate(prop, 300);
		}

		$(document).off({
			'mousemove': modal.drag.mousemove,
			'mouseup': modal.drag.mouseup
		});

		return false;
	}
};

modal.position = function ($source)
{
	var modal_box = $('#modal-box');

	var top = 0;
	var left = 0;

	if ($source) {
		top = (window.innerHeight - modal_box.find('div').height()) / 2;
		left = (window.innerWidth - modal_box.find('div').width()) / 2;
	} else {
		top = (window.innerHeight - modal_box.height()) / 2;
		left = (window.innerWidth - modal_box.width()) / 2;
		if (top > 200) { top = 200; }
	}

	modal_box.css({
		'top': top,
		'left': left
	});

	return true;
};

$(document).ready(function ()
{
	$(document).on('click', '.modal', modal.open);
});

});

/*
#**********************************************************
#* Filename: UI.table
#* Creator: Angel
#* Description: UI.table
#* Date: 20130917
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/

define('UI.table',["jquery"], function(){


(function ()
{
	var table = {
		edit: function (event)
		{
			if (event.target.tagName.toLowerCase() === 'input')
			{
				return false;
			}
			else
			{
				var row = $(this),
					row_height = row.css('height'),
					input = row.html('<input class="table-input" type="text" value="' + row.text() + '"/>').children(':first');

				$(input)
					.css({
						'color': row.css('color'),
						'font-size': row.css('font-size')
					})
					.focus();
			}

			return true;
		},

		update: function (event)
		{
			$(this).parent().text(this.value);

			return true;
		},

		sort: function (event)
		{
			var target = $(this),
				index = target.index() + 1,
				thead = target.parent().parent(),
				table = thead.parent(),
				order = target.hasClass('desc-sort') ? 'DESC' : 'ASC',
				fragment = document.createDocumentFragment(),
				stack = [],
				is_datetime = false,
				tbody,
				rows;

			if (table.attr("data-target"))
			{
				table = $("#"+table.attr("data-target"));
			}

			if (table.hasClass('table-head'))
			{
				tbody = table.parent().find('.table tbody');
				rows = tbody.find('tr');
			}
			else
			{
				tbody = table.find('tbody');
				rows = tbody.find('tr');
			}

			thead.find('.active').removeClass('active');
			target.addClass('active');

			rows.map(function ()
			{
				stack.push({
					'item': this,
					'value': $(this).find('td:nth-child(' + index + ')').text().toLowerCase()
				});
			});

			if (target.data('row-type') === 'datetime')
			{
				is_datetime = true;
			}

			if (order === 'DESC')
			{
				stack.sort(function (a, b)
				{
					if (is_datetime)
					{
						return new Date(a.value) - new Date(b.value);
					}

					if (!isNaN(parseInt(a.value)))
					{
						return a.value - b.value;
					}

					if (typeof a.value === 'string')
					{
						return a.value.localeCompare(b.value);
					}
				});
				target.removeClass('desc-sort');
			}
			else
			{
				stack.sort(function (a, b)
				{
					if (is_datetime)
					{
						return new Date(b.value) - new Date(a.value);
					}

					if (!isNaN(parseInt(a.value)))
					{
						return b.value - a.value;
					}

					if (typeof a.value === 'string')
					{
						return b.value.localeCompare(a.value);
					}
				});
				target.addClass('desc-sort');
			}

			$.each(stack, function (i, row)
			{
				fragment.appendChild(row.item);
			});

			tbody.empty().append(fragment);

			fragment = null;

			return true;
		}
	};

	$(document).ready(function ()
	{
		$(document.body)
			.on('click', '.table td.editable', table.edit)
			.on('click', '.table .sortable, .table-head .sortable', table.sort)
			.on('blur', '.table-input', table.update);
	});
})();

});

/*
#**********************************************************
#* Filename: UI.tablist
#* Creator: Cinde
#* Description: UI.tablist
#* Date: 20130620
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/
/* A modified version to reduce redundant html code by Morris */
define('UI.tablist',["jquery"], function(){

var tab = window.tab = {
    update : function ( event ) {
        var $target = $( event.currentTarget );
        if ( $target.hasClass("active") )
            return false;

        var $previous_selected =
                $target.addClass("active")
                       .siblings(".active").removeClass("active");

        $($previous_selected.attr("data-tab-target")).removeClass("active");
        $($target.attr("data-tab-target")).addClass("active");

        return false;
    }
};
$(function(){
    $(document.body).on('click', '.tab [data-tab-target]', tab.update );
});

});

/*
#**********************************************************
#* Filename: UI.selectbox
#* Creator: Cinde
#* Description: UI.selectbox
#* Date: 20130627
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/

/* A modified version to reduce redundant html code by Morris */
/* In-coporate the toggle-dropdown functions from bootstrap-dropdown */

define('UI.selectbox',["jquery"], function(){

var selectbox = window.selectbox = {
    init : function () {
        $(".selectbox").each(function () {
            var $this = $(this);
            var $selected = $this.find(".selected");

            // If there's no item selected, select the first one.
            if ( $selected.length == 0 ) {
                $selected = $this.find(".item:first-child").addClass("selected");
            }

            $this.find(".selection").html( $selected.html() );
        });
    }
};

(function(){

    function toggle ( event ) {

        var $selectbox = $( event.currentTarget ).closest(".selectbox");

        if ( $selectbox.hasClass('open') ) {
            $selectbox.removeClass('open');
            return false;
        }

        // Close other opened dropdown
        $(".selectbox.open").removeClass('open');

        var $dropdown  = $selectbox.addClass('open')
                                   .find(".dropdown");

        $dropdown.find(".focused")
                 .removeClass('focused');

        $dropdown.find(".selected")
                 .focus().addClass('focused');


        // Close dropdown during next click.
        $(document.body).one('click', function( event ){
            $selectbox.removeClass('open');
        });

        $selectbox.trigger("OPTION_SHOW");
        return false;

    }

    function select ( event ) {

        // Update Selected Item
        var $this = $( event.currentTarget ).addClass('selected');
        var $prev = $this.siblings(".selected").removeClass('selected');

        // Set the value to select and close dropdown
        var $selectbox = $this.closest(".selectbox").removeClass('open');

        var $selection = $selectbox.find(".selection").html( $this.html() );

        var evt = $.Event("OPTION_CHANGE")

        $selectbox.trigger( evt, $this.attr('data-id') );

        if ( evt.isDefaultPrevented() ) {
            // Revert
            $this.removeClass("selected");
            $prev.addClass("selected");
            $selection.html( $prev.html() );
        }

        return true;
    }

    function keydown ( event ) {

        if( !/(38|40|13|27)/.test(event.which) )
            return;

        var $dropdown = $( event.currentTarget );

        if ( event.which == 27 ) {
            // Esc
            $dropdown.closest(".selectbox").removeClass('open');
            return false;
        }

        if ( event.which == 13 ) {
            // Enter
            if ( !$dropdown.hasClass('selected') ) {
                event.currentTarget = $dropdown.find(".focused");
                select( event );
            }

            return false;
        }

        var $options  = $dropdown.children();
        var index     = $options.filter(".focused").removeClass('focused').index();

        if ( event.which == 40 ) {
            index = index < $options.length - 1 ? index + 1 : 0;
        } else {
            index = index > 1 ? index - 1 : $options.length - 1;
        }

        $options.eq( index ).addClass('focused').focus();

        return false;
    }

    function edit () {
        $(this).hide().siblings(".edit").show();
        return false;
    }

    function submit ( event ) {
        var $edit      = $( event.currentTarget ).closest(".edit");
        var $selectbox = $edit.closest(".selectbox");
        var $input     = $edit.find(".input");
        var newValue   = $input.val();

        if ( !newValue || newValue.length == 0 ) {
            $selectbox.trigger("EDIT_UPDATE", "");
            return;
        }

        // Reset Editor
        $input.val("");
        $edit.hide().siblings(".editbtn").show();

        event = $.Event("EDIT_UPDATE");
        $selectbox.trigger(event, newValue);
        if ( event.isDefaultPrevented() )
            return

        var id = event.id || newValue;

        // Add Entry to Dropdown List
        $selectbox.find(".selection").html( newValue );
        var $lastSelection = $selectbox.find(".dropdown")
                                       .find(".selected").removeClass("selected");
        $lastSelection.parent().append('<li class="item selected" data-id="' + id + '">' + newValue + '</li>');

        $selectbox.trigger("EDIT_FINISHED")
                  .trigger("OPTION_CHANGE", id)
                  .removeClass("open");
    }

    $(function(){
        selectbox.init();
        $(document.body)
            .on('click',   ".selectbox .editor .editbtn", edit)
            .on('click',   ".selectbox .editor .btn",     submit)
            .on('click',   ".selectbox .editor",          function(e){ e.stopPropagation(); })
            .on('click',   ".selectbox .selection",       toggle)
            .on('click',   ".selectbox .dropdown .item",  select)
            .on('keydown', ".selectbox.open .dropdown",   keydown)

            /* Below are functions that's in bootstrap-dropdown */
            .on('click',   ".js-toggle-dropdown",        toggleDropdown)
    });



    /* Functions took from bootstrap-dropdown, it simple toggles "open" class */
    var dropDownBound = false;
    function toggleDropdown ( event ) {

        var $target = $( event.currentTarget );

        if ( $target.is('.disabled, :disabled') ) return;

        var $dropdown = $target.attr( "data-target" );
        if ( $dropdown ) {
            $dropdown = $( $dropdown );
        }
        if ( !$dropdown ) {
            $dropdown = $target.parent();
        }
        var opened    = $dropdown.hasClass("open");

        if ( opened ) {
            $dropdown.removeClass("open");
            $target.trigger("DROPDOWN_CLOSE");
        } else {

            if ( $target.attr("data-toggle") != "self-only") {
                // Bind click event to close popup
                // Close other dropdown and fires event
                if ( !dropDownBound ) {
                    closeDropdown();
                    dropDownBound = true;
                    $( document.body ).one("click", closeDropdown);
                } else {
                    closeDropdown();
                }
            }

            $dropdown.addClass("open");
            $target.trigger("DROPDOWN_OPEN");
        }

        return false;
    }

    function closeDropdown() {
        var $dropdownBtn = $(".js-toggle-dropdown");
        $dropdownBtn.each(function(){
            var $this = $(this);

            if ($this.attr("data-toggle") == "self-only")
                return;

            var $dropdown = $this.attr( "data-target" );
            if ( $dropdown ) {
                $dropdown = $( $dropdown );
            }
            if ( !$dropdown ) {
                $dropdown = $this.parent();
            }
            if ( $dropdown.hasClass("open") ) {
                $dropdown.removeClass("open");
                $this.trigger("DROPDOWN_CLOSE");
            }
        });
        dropDownBound = false;
    }

})();

});

/*
#**********************************************************
#* Filename: UI.searchbar
#* Creator: Cinde
#* Description: UI.searchbar
#* Date: 20130627
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/
define('UI.searchbar',["jquery"], function(){

var searchbar = window.searchbar = {

    init: function () {
        $(document)
            .on('click', '.search-bar .icon-search', searchbar.show)
            .on('click', '.search-bar .icon-cancel', searchbar.hide)
            .on('keyup', '.search-bar input', searchbar.change);
    },

    show: function (event) {
        var me = $(this),
            cur_bar = me.parent(),
            cur_input = cur_bar.find('input'),
            cur_cancel = cur_bar.find('.icon-cancel'),
            // total_width = me.outerWidth() + cur_input.outerWidth() + cur_cancel.outerWidth() - 14;
            total_width = 246; // Resource Panel width

        cur_bar.animate({
            width: total_width + 'px'
        }, {
            duration: 100,

            complete: function () {
                $(this).addClass('open');
                cur_input.focus();
                cur_bar.trigger("SEARCHBAR_SHOW");
            }
        });

        return false;
    },

    hide: function (event) {
        var me = $(this),
            cur_bar = me.parent(),
            cur_input = cur_bar.find('input'),
            cur_search = cur_bar.find('.icon-search'),
            sub_width = cur_search.outerWidth();

        cur_bar.animate({
            width: sub_width + 'px'
        }, {
            duration: 100,

            complete: function () {
                $(this).removeClass('open');
                cur_input.val('');
                cur_bar.trigger("SEARCHBAR_HIDE");
            }
        });

        return false;
    },

    change: function (event) {
        var me = $(this),
            cur_value = me.val();

        me.trigger("SEARCHBAR_CHANGE", [cur_value]);

        return false;
    }
};

$(document).ready(function () {
    searchbar.init();
});

});

/*
#**********************************************************
#* Filename: UI.filter
#* Creator: Cinde
#* Description: UI.filter
#* Date: 20130627
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/
define('UI.filter',["jquery"], function(){

window.filter = {
    update: function (dom, valueset) {
        if (!valueset || ((!valueset.type) && valueset.value == '')) {
            dom.trigger("FILTER_RESET");
            dom.find('.item').each(function () {
                $(this).removeClass('hide');
            });
        } else {
            dom.trigger("FILTER_SET");
            dom.find('.item').each(function () {
                var is_match = true,
                    target_id = $(this).data('id'),
                    dom = $(this);

                if (valueset.value) {
                    if (target_id.toLowerCase().indexOf(valueset.value.toLowerCase()) < 0) {
                        is_match = false;
                    }
                }

                if (valueset.type && is_match) {
                    var type_result = true,
                        type_set = valueset.type;

                    $.each(type_set, function (key, value) {
                        if (type_set.hasOwnProperty(key)) {
                            var target_value = dom.data(key);

                            if (!target_value && value) {
                                type_result = false;
                            } else if (value && String(target_value).toLowerCase() != String(value).toLowerCase()) {
                                type_result = false;
                            }
                        }
                    });

                    is_match = type_result;
                }
                $(this).toggleClass('hide', !is_match);
            });
        }
    }
};
});

/*
#**********************************************************
#* Filename: UI.radiobuttons
#* Creator: Cinde
#* Description: UI.radiobuttons
#* Date: 20130629
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/
define('UI.radiobuttons',["jquery"], function(){

var radiobuttons = window.radiobuttons = {

    init: function () {
        $(document).on('click', '.radiobuttons button', radiobuttons.click);
    },

    click: function (event) {
        var me = $(this),
            btns = me.parent(),
            is_active = me.hasClass('active'),
            pre_active = btns.find('.active'),
            cur_value = me.data('radio');

        if (cur_value == undefined) {
            cur_value = me.text();
        }

        if (!is_active) {
            if (pre_active.length > 0) {
                pre_active.removeClass('active');
            }
            me.addClass('active');

            me.trigger("RADIOBTNS_CLICK", [cur_value]);
        }

        return false;
    },

    data: function (dom) {
        var pre_active = dom.find('.active');

        if (pre_active.length > 0) {
            cur_value = pre_active.data('radio');

            if (cur_value == undefined) {
                cur_value = pre_active.text();
            }

            return cur_value;
        } else {
            return '';
        }
    }
};

$(document).ready(function () {
    radiobuttons.init();
});

});

/*
#**********************************************************
#* Filename: UI.notification
#* Creator: Cinde
#* Description: UI.notification
#* Date: 20130607
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/

define('UI.notification',["jquery"], function(){


(function(){
    var NOTIFICATION_TYPES = {
        "error"   : true,
        "warning" : true,
        "info"    : true
    };
    window.notification = function ( type, template, auto_close ) {
        if ( !NOTIFICATION_TYPES[ type ] )
            return;

        var notification_wrap = $('#notification_wrap');
        if ( notification_wrap.length == 0 ) {

            var close = function () {
                $(this)
                    .closest(".notification_item")
                    .addClass("closing")
                    .slideUp('fast', function () {
                        $(this).remove();
                    });
            }
            notification_wrap =
                $('<div id="notification_wrap"></div>')
                    .appendTo( $(document.body) )
                    .on('click', ".notification_close", close)
                    .on('CLOSE_ITEM', ".notification_item", close);
        }

        var item_temp = MC.template.notification.item({
            'type': type,
            'template': template,
            'should_stay': auto_close
        });

        var item_dom = $(item_temp).appendTo( notification_wrap );

        if ( !auto_close ) {
            timeout_close( item_dom, type === "error", template.length );
        }

        // Try to remove old duplicated notification when there're more than 3
        var items = notification_wrap.children(":not(.closing)");
        var item_count = items.length - 1;
        if ( item_count >= 3 ) {
            for ( var i = 0; i < item_count; ++ i ) {
                var item = items.eq( i )
                if ( item.children("span").text() === template ) {
                    // Find duplicated one, remove it.
                    to = item.trigger("CLOSE_ITEM").data( "close_to" )
                    if ( to ) { clearTimeout( to ); }
                    break;
                }
            }
        }
    };

    var timeout_close = function (target_dom, is_error, text_length) {
        stay_time = text_length * 80;
        if (is_error) {
            stay_time = stay_time + 2000
        }
        var to = setTimeout(function () { target_dom.trigger('CLOSE_ITEM'); }, stay_time);
        target_dom.data( "close_to", to );
    };
})();

});

/*
#**********************************************************
#* Filename : UI.multiinputbox
#* Creator  : Morris
#* Desc     : Multiple Input Box
#* Date     : 20130715
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/

// 1. Component is identified by class ".multi-input"
// 2. Options are set via data-*, possible options are :
//    data-max-row : number

define('UI.multiinputbox',["jquery"], function(){


var multiinputbox;
(function(){
   multiinputbox = {
    init : function( baseParent ) {
      $( baseParent )
        .on("click", ".multi-input .icon-add", add)
        .on("click", ".multi-input .icon-del", del);
    },
    update : function( target ) {
      var $wrapper = $( target );
      var max = parseInt($wrapper.attr("data-max-row"));
      $wrapper.toggleClass("max", max && max <= $wrapper.children().length );
    }
  };

  function add () {
    var $wrapper = $(this).closest(".multi-input");
    var tmpl     = $wrapper.data("row-tmpl");

    // Get first row's html as template
    if ( !tmpl ) {
      var $clone = $("<p>").append($wrapper.children().eq(0).clone());
      $clone.find("input").removeAttr("value");
      tmpl = $clone.html();
      $wrapper.data("row-tmpl", tmpl);
    }

    $wrapper.append(tmpl).trigger("ADD_ROW");

    var max = parseInt($wrapper.attr("data-max-row"));
    if ( max && max <= $wrapper.children().length ) {
      $wrapper.addClass("max");
    }

    return false;
  }

  function del () {
    var $t       = $(this);
    var $wrapper = $t.closest(".multi-input").removeClass("max");

    var $target  = $t.closest(".multi-ipt-row");
    var value    = $target.find("input").val();
    var event    = $.Event( "BEFORE_REMOVE_ROW", { value : value } )

    $wrapper.trigger( event )
    if ( event.isDefaultPrevented() )
      return false;

    $target.remove();
    $wrapper.trigger("REMOVE_ROW", value );

    return false;
  }
})();

$(function(){ multiinputbox.init( document.body ); });

window.multiinputbox = multiinputbox;

});

/*
 * canvg.js - Javascript SVG parser and renderer on Canvas
 * MIT Licensed
 * Gabe Lerner (gabelerner@gmail.com)
 * http://code.google.com/p/canvg/
 *
 */

define('UI.canvg',["jquery"], function(){

(function(){
/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
function RGBColor(color_string)
{
    this.ok = false;

    // strip any leading #
    if (color_string.charAt(0) == '#') { // remove # if any
        color_string = color_string.substr(1,6);
    }

    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred : 'cd5c5c',
        indigo : '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    for (var key in simple_colors) {
        if (color_string == key) {
            color_string = simple_colors[key];
        }
    }
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            this.ok = true;
        }

    }

    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }
}

  // canvg(target, s)
  // empty parameters: replace all 'svg' elements on page with 'canvas' elements
  // target: canvas element or the id of a canvas element
  // s: svg string, url to svg file, or xml document
  // opts: optional hash of options
  //     ignoreDimensions: true => does not try to resize canvas
  //     offsetX: int => draws at a x offset
  //     offsetY: int => draws at a y offset
  //     scaleWidth: int => scales horizontally to width
  //     scaleHeight: int => scales vertically to height
  //     renderCallback: function => will call the function after the first render is completed
  //     forceRedraw: function => will call the function on every frame, if it returns true, will redraw
  window.canvg = function (target, s, opts) {

    // no parameters
    if ( !target ) { return; }

    opts = opts || {};

    if (typeof target == 'string') {
      target = document.getElementById(target);
    }

    // store class on canvas
    var svg = build();
    // on i.e. 8 for flash canvas, we can't assign the property so check for it
    if (!(target.childNodes.length == 1 && target.childNodes[0].nodeName == 'OBJECT')) target.svg = svg;
    svg.opts = opts;
    svg.loadXml(target.getContext('2d'), s);
  }

  function build() {
    var svg = { };

    svg.MAX_VIRTUAL_PIXELS = 30000;

    // globals
    svg.init = function(ctx) {
      var uniqueId = 0;
      svg.UniqueId = function () { uniqueId++; return 'canvg' + uniqueId; };
      svg.Definitions = {};
      svg.Styles = {};
      svg.Animations = [];
      svg.Images = [];
      svg.ctx = ctx;
      svg.ViewPort = new (function () {
        this.viewPorts = [];
        this.Clear = function() { this.viewPorts = []; }
        this.SetCurrent = function(width, height) { this.viewPorts.push({ width: width, height: height }); }
        this.RemoveCurrent = function() { this.viewPorts.pop(); }
        this.Current = function() { return this.viewPorts[this.viewPorts.length - 1]; }
        this.width = function() { return this.Current().width; }
        this.height = function() { return this.Current().height; }
        this.ComputeSize = function(d) {
          if (d != null && typeof(d) == 'number') return d;
          if (d == 'x') return this.width();
          if (d == 'y') return this.height();
          return Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2);
        }
      });
    }
    svg.init();

    // trim
    svg.trim = function(s) { return s.replace(/^\s+|\s+$/g, ''); }

    // compress spaces
    svg.compressSpaces = function(s) { return s.replace(/[\s\r\t\n]+/gm,' '); }

    // parse xml
    svg.parseXml = function(xml, secondTime) {
        doc = null;

        try {
          if (window.DOMParser)
          {
            var parser = new DOMParser();
            doc = parser.parseFromString(xml, 'text/xml');
          }
          else
          {
            xml = xml.replace(/<!DOCTYPE svg[^>]*>/, '');
            doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = 'false';
            doc.loadXML(xml);
          }
        } catch ( e ) {
          if (secondTime) {
            console.warn("We still cannot parse the SVG.");
            return svg.parseXml("<svg></svg>");
          }
          // our xml has xmlns namespace which will cause IE to throw error
          // so once we catch it, we remove the namespace
          console.warn("Retry to parse the svg, this should only happen in IE.");
          var svgTag = xml.match(/<svg[^>]+>/);
          if ( !svgTag ) return null;
          svgTag = svgTag[0];

          newSvgTag = svgTag.replace(/xmlns=[^\s>]+/,"").replace(/[^\s]+:[^=]+=[^\s>]+/g, "");
          xml = xml.replace( svgTag, newSvgTag );

          return svg.parseXml(xml, true);
        }

        return doc;
    }

    svg.Property = function(name, value) {
      this.name = name;
      this.value = value;
    }
      svg.Property.prototype.getValue = function() {
        return this.value;
      }

      svg.Property.prototype.hasValue = function() {
        return (this.value != null && this.value !== '');
      }

      // return the numerical value of the property
      svg.Property.prototype.numValue = function() {
        if (!this.hasValue()) return 0;

        var n = parseFloat(this.value);
        if ((this.value + '').match(/%$/)) {
          n = n / 100.0;
        }
        return n;
      }

      svg.Property.prototype.valueOrDefault = function(def) {
        if (this.hasValue()) return this.value;
        return def;
      }

      svg.Property.prototype.numValueOrDefault = function(def) {
        if (this.hasValue()) return this.numValue();
        return def;
      }

      // color extensions
        // augment the current color value with the opacity
        svg.Property.prototype.addOpacity = function(opacity) {
          var newValue = this.value;
          if (opacity != null && opacity != '' && typeof(this.value)=='string') { // can only add opacity to colors, not patterns
            if (this.value.indexOf("rgba(") != -1 ) {
              color = this.value.split(",")
              color[3] = parseFloat( color[3] ) * opacity
              newValue = color.join(",") + ")"
            } else {
              var color = new RGBColor(this.value);
              if (color.ok) {
                newValue = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacity + ')';
              }
            }
          }
          return new svg.Property(this.name, newValue);
        }

      // definition extensions
        // get the definition from the definitions table
        svg.Property.prototype.getDefinition = function() {
          var name = this.value.match(/#([^\)'"]+)/);
          if (name) { name = name[1]; }
          if (!name) { name = this.value; }
          return svg.Definitions[name];
        }

        svg.Property.prototype.isUrlDefinition = function() {
          return this.value.indexOf('url(') == 0
        }

        svg.Property.prototype.getFillStyleDefinition = function(e, opacityProp) {
          var def = this.getDefinition();

          // gradient
          if (def != null && def.createGradient) {
            return def.createGradient(svg.ctx, e, opacityProp);
          }

          // pattern
          if (def != null && def.createPattern) {
            if (def.getHrefAttribute().hasValue()) {
              var pt = def.attribute('patternTransform');
              def = def.getHrefAttribute().getDefinition();
              if (pt.hasValue()) { def.attribute('patternTransform', true).value = pt.value; }
            }
            return def.createPattern(svg.ctx, e);
          }

          return null;
        }

      // length extensions
        svg.Property.prototype.getDPI = function(viewPort) {
          return 96.0; // TODO: compute?
        }

        svg.Property.prototype.getEM = function(viewPort) {
          var em = 12;

          var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
          if (fontSize.hasValue()) em = fontSize.toPixels(viewPort);

          return em;
        }

        svg.Property.prototype.getUnits = function() {
          var s = this.value+'';
          return s.replace(/[0-9\.\-]/g,'');
        }

        // get the length as pixels
        svg.Property.prototype.toPixels = function(viewPort, processPercent) {
          if (!this.hasValue()) return 0;
          var s = this.value+'';
          if (s.match(/em$/)) return this.numValue() * this.getEM(viewPort);
          if (s.match(/ex$/)) return this.numValue() * this.getEM(viewPort) / 2.0;
          if (s.match(/px$/)) return this.numValue();
          if (s.match(/pt$/)) return this.numValue() * this.getDPI(viewPort) * (1.0 / 72.0);
          if (s.match(/pc$/)) return this.numValue() * 15;
          if (s.match(/cm$/)) return this.numValue() * this.getDPI(viewPort) / 2.54;
          if (s.match(/mm$/)) return this.numValue() * this.getDPI(viewPort) / 25.4;
          if (s.match(/in$/)) return this.numValue() * this.getDPI(viewPort);
          if (s.match(/%$/)) return this.numValue() * svg.ViewPort.ComputeSize(viewPort);
          var n = this.numValue();
          if (processPercent && n < 1.0) return n * svg.ViewPort.ComputeSize(viewPort);
          return n;
        }

      // time extensions
        // get the time as milliseconds
        svg.Property.prototype.toMilliseconds = function() {
          if (!this.hasValue()) return 0;
          var s = this.value+'';
          if (s.match(/s$/)) return this.numValue() * 1000;
          if (s.match(/ms$/)) return this.numValue();
          return this.numValue();
        }

      // angle extensions
        // get the angle as radians
        svg.Property.prototype.toRadians = function() {
          if (!this.hasValue()) return 0;
          var s = this.value+'';
          if (s.match(/deg$/)) return this.numValue() * (Math.PI / 180.0);
          if (s.match(/grad$/)) return this.numValue() * (Math.PI / 200.0);
          if (s.match(/rad$/)) return this.numValue();
          return this.numValue() * (Math.PI / 180.0);
        }

    // fonts
    svg.Font = new (function() {
      this.Styles = 'normal|italic|oblique|inherit';
      this.Variants = 'normal|small-caps|inherit';
      this.Weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

      this.CreateFont = function(fontStyle, fontWeight, fontSize, inherit) {
        var f = this.Parse( inherit ? inherit : svg.ctx.font );
        if ( !fontStyle   ) { fontStyle   = f.fontStyle || ""; }
        if ( !fontWeight  ) { fontWeight  = f.fontWeight || ""; }
        if ( !fontSize    ) { fontSize    = f.fontSize || ""; }
        return [ fontStyle, "normal", fontWeight, fontSize, '"Lato", "Helvetica Neue", Arial, sans-serif' ].join(" ");
      }

      var that = this;
      this.Parse = function(s) {
        var f = {};
        var d = svg.trim(svg.compressSpaces(s || '')).split(' ');
        var set = { fontSize: false, fontStyle: false, fontWeight: false, fontVariant: false }
        var ff = '';
        for (var i=0; i<d.length; i++) {
          if (!set.fontStyle && that.Styles.indexOf(d[i]) != -1) { if (d[i] != 'inherit') f.fontStyle = d[i]; set.fontStyle = true; }
          else if (!set.fontVariant && that.Variants.indexOf(d[i]) != -1) { if (d[i] != 'inherit') f.fontVariant = d[i]; set.fontStyle = set.fontVariant = true;  }
          else if (!set.fontWeight && that.Weights.indexOf(d[i]) != -1) { if (d[i] != 'inherit') f.fontWeight = d[i]; set.fontStyle = set.fontVariant = set.fontWeight = true; }
          else if (!set.fontSize) { if (d[i] != 'inherit') f.fontSize = d[i].split('/')[0]; set.fontStyle = set.fontVariant = set.fontWeight = set.fontSize = true; }
          else { if (d[i] != 'inherit') ff += d[i]; }
        } if (ff != '') f.fontFamily = ff;
        return f;
      }
    });

    // points and paths
    svg.ToNumberArray = function(s) {
      var a = svg.trim(svg.compressSpaces((s || '').replace(/,/g, ' '))).split(' ');
      for (var i=0; i<a.length; i++) {
        var b = parseFloat(a[i]);
        if ( isNaN(b) ) b = 0;
        a[i] = b;
      }
      return a;
    }
    svg.Point = function(x, y) {
      this.x = x;
      this.y = y;
    }
      svg.Point.prototype.angleTo = function(p) {
        return Math.atan2(p.y - this.y, p.x - this.x);
      }

      svg.Point.prototype.applyTransform = function(v) {
        var xp = this.x * v[0] + this.y * v[2] + v[4];
        var yp = this.x * v[1] + this.y * v[3] + v[5];
        this.x = xp;
        this.y = yp;
      }

    svg.CreatePoint = function(s) {
      var a = svg.ToNumberArray(s);
      return new svg.Point(a[0], a[1]);
    }
    svg.CreatePath = function(s) {
      var a = svg.ToNumberArray(s);
      var path = [];
      for (var i=0; i<a.length; i+=2) {
        path.push(new svg.Point(a[i], a[i+1]));
      }
      return path;
    }

    // bounding box
    svg.BoundingBox = function(x1, y1, x2, y2) { // pass in initial points if you want
      this.x1 = Number.NaN;
      this.y1 = Number.NaN;
      this.x2 = Number.NaN;
      this.y2 = Number.NaN;

      this.x = function() { return this.x1; }
      this.y = function() { return this.y1; }
      this.width = function() { return this.x2 - this.x1; }
      this.height = function() { return this.y2 - this.y1; }

      this.addPoint = function(x, y) {
        if (x != null) {
          if (isNaN(this.x1) || isNaN(this.x2)) {
            this.x1 = x;
            this.x2 = x;
          }
          if (x < this.x1) this.x1 = x;
          if (x > this.x2) this.x2 = x;
        }

        if (y != null) {
          if (isNaN(this.y1) || isNaN(this.y2)) {
            this.y1 = y;
            this.y2 = y;
          }
          if (y < this.y1) this.y1 = y;
          if (y > this.y2) this.y2 = y;
        }
      }
      this.addX = function(x) { this.addPoint(x, null); }
      this.addY = function(y) { this.addPoint(null, y); }

      this.addBoundingBox = function(bb) {
        this.addPoint(bb.x1, bb.y1);
        this.addPoint(bb.x2, bb.y2);
      }

      this.addQuadraticCurve = function(p0x, p0y, p1x, p1y, p2x, p2y) {
        var cp1x = p0x + 2/3 * (p1x - p0x); // CP1 = QP0 + 2/3 *(QP1-QP0)
        var cp1y = p0y + 2/3 * (p1y - p0y); // CP1 = QP0 + 2/3 *(QP1-QP0)
        var cp2x = cp1x + 1/3 * (p2x - p0x); // CP2 = CP1 + 1/3 *(QP2-QP0)
        var cp2y = cp1y + 1/3 * (p2y - p0y); // CP2 = CP1 + 1/3 *(QP2-QP0)
        this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y);
      }

      this.addBezierCurve = function(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
        // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
        var p0 = [p0x, p0y], p1 = [p1x, p1y], p2 = [p2x, p2y], p3 = [p3x, p3y];
        this.addPoint(p0[0], p0[1]);
        this.addPoint(p3[0], p3[1]);

        for (i=0; i<=1; i++) {
          var f = function(t) {
            return Math.pow(1-t, 3) * p0[i]
            + 3 * Math.pow(1-t, 2) * t * p1[i]
            + 3 * (1-t) * Math.pow(t, 2) * p2[i]
            + Math.pow(t, 3) * p3[i];
          }

          var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
          var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
          var c = 3 * p1[i] - 3 * p0[i];

          if (a == 0) {
            if (b == 0) continue;
            var t = -c / b;
            if (0 < t && t < 1) {
              if (i == 0) this.addX(f(t));
              if (i == 1) this.addY(f(t));
            }
            continue;
          }

          var b2ac = Math.pow(b, 2) - 4 * c * a;
          if (b2ac < 0) continue;
          var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
          if (0 < t1 && t1 < 1) {
            if (i == 0) this.addX(f(t1));
            if (i == 1) this.addY(f(t1));
          }
          var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
          if (0 < t2 && t2 < 1) {
            if (i == 0) this.addX(f(t2));
            if (i == 1) this.addY(f(t2));
          }
        }
      }

      this.isPointInBox = function(x, y) {
        return (this.x1 <= x && x <= this.x2 && this.y1 <= y && y <= this.y2);
      }

      this.addPoint(x1, y1);
      this.addPoint(x2, y2);
    }

    // transforms
    svg.Transform = function(v) {
      var that = this;
      this.Type = {}

      // translate
      this.Type.translate = function(s) {
        this.p = svg.CreatePoint(s);
        this.apply = function(ctx) {
          ctx.translate(this.p.x || 0.0, this.p.y || 0.0);
        }
        this.unapply = function(ctx) {
          ctx.translate(-1.0 * this.p.x || 0.0, -1.0 * this.p.y || 0.0);
        }
        this.applyToPoint = function(p) {
          p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
        }
      }

      // rotate
      this.Type.rotate = function(s) {
        var a = svg.ToNumberArray(s);
        this.angle = new svg.Property('angle', a[0]);
        this.cx = a[1] || 0;
        this.cy = a[2] || 0;
        this.apply = function(ctx) {
          ctx.translate(this.cx, this.cy);
          ctx.rotate(this.angle.toRadians());
          ctx.translate(-this.cx, -this.cy);
        }
        this.unapply = function(ctx) {
          ctx.translate(this.cx, this.cy);
          ctx.rotate(-1.0 * this.angle.toRadians());
          ctx.translate(-this.cx, -this.cy);
        }
        this.applyToPoint = function(p) {
          var a = this.angle.toRadians();
          p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
          p.applyTransform([Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0]);
          p.applyTransform([1, 0, 0, 1, -this.p.x || 0.0, -this.p.y || 0.0]);
        }
      }

      this.Type.scale = function(s) {
        this.p = svg.CreatePoint(s);
        this.apply = function(ctx) {
          ctx.scale(this.p.x || 1.0, this.p.y || this.p.x || 1.0);
        }
        this.unapply = function(ctx) {
          ctx.scale(1.0 / this.p.x || 1.0, 1.0 / this.p.y || this.p.x || 1.0);
        }
        this.applyToPoint = function(p) {
          p.applyTransform([this.p.x || 0.0, 0, 0, this.p.y || 0.0, 0, 0]);
        }
      }

      this.Type.matrix = function(s) {
        this.m = svg.ToNumberArray(s);
        this.apply = function(ctx) {
          ctx.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
        }
        this.applyToPoint = function(p) {
          p.applyTransform(this.m);
        }
      }

      this.Type.SkewBase = function(s) {
        this.base = that.Type.matrix;
        this.base(s);
        this.angle = new svg.Property('angle', s);
      }
      this.Type.SkewBase.prototype = new this.Type.matrix;

      this.Type.skewX = function(s) {
        this.base = that.Type.SkewBase;
        this.base(s);
        this.m = [1, 0, Math.tan(this.angle.toRadians()), 1, 0, 0];
      }
      this.Type.skewX.prototype = new this.Type.SkewBase;

      this.Type.skewY = function(s) {
        this.base = that.Type.SkewBase;
        this.base(s);
        this.m = [1, Math.tan(this.angle.toRadians()), 0, 1, 0, 0];
      }
      this.Type.skewY.prototype = new this.Type.SkewBase;

      this.transforms = [];

      this.apply = function(ctx) {
        for (var i=0; i<this.transforms.length; i++) {
          this.transforms[i].apply(ctx);
        }
      }

      this.unapply = function(ctx) {
        for (var i=this.transforms.length-1; i>=0; i--) {
          this.transforms[i].unapply(ctx);
        }
      }

      this.applyToPoint = function(p) {
        for (var i=0; i<this.transforms.length; i++) {
          this.transforms[i].applyToPoint(p);
        }
      }

      var data = svg.trim(svg.compressSpaces(v)).replace(/\)(\s?,\s?)/g,') ').split(/\s(?=[a-z])/);
      for (var i=0; i<data.length; i++) {
        var type = svg.trim(data[i].split('(')[0]);
        var s = data[i].split('(')[1].replace(')','');
        var transform = new this.Type[type](s);
        transform.type = type;
        this.transforms.push(transform);
      }
    }

    // aspect ratio
    svg.AspectRatio = function(ctx, aspectRatio, width, desiredWidth, height, desiredHeight, minX, minY, refX, refY) {
      // aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
      aspectRatio = svg.compressSpaces(aspectRatio);
      aspectRatio = aspectRatio.replace(/^defer\s/,''); // ignore defer
      var align = aspectRatio.split(' ')[0] || 'xMidYMid';
      var meetOrSlice = aspectRatio.split(' ')[1] || 'meet';

      // calculate scale
      var scaleX = width / desiredWidth;
      var scaleY = height / desiredHeight;
      var scaleMin = Math.min(scaleX, scaleY);
      var scaleMax = Math.max(scaleX, scaleY);
      if (meetOrSlice == 'meet') { desiredWidth *= scaleMin; desiredHeight *= scaleMin; }
      if (meetOrSlice == 'slice') { desiredWidth *= scaleMax; desiredHeight *= scaleMax; }

      refX = new svg.Property('refX', refX);
      refY = new svg.Property('refY', refY);
      if (refX.hasValue() && refY.hasValue()) {
        ctx.translate(-scaleMin * refX.toPixels('x'), -scaleMin * refY.toPixels('y'));
      }
      else {
        // align
        if (align.match(/^xMid/) && ((meetOrSlice == 'meet' && scaleMin == scaleY) || (meetOrSlice == 'slice' && scaleMax == scaleY))) ctx.translate(width / 2.0 - desiredWidth / 2.0, 0);
        if (align.match(/YMid$/) && ((meetOrSlice == 'meet' && scaleMin == scaleX) || (meetOrSlice == 'slice' && scaleMax == scaleX))) ctx.translate(0, height / 2.0 - desiredHeight / 2.0);
        if (align.match(/^xMax/) && ((meetOrSlice == 'meet' && scaleMin == scaleY) || (meetOrSlice == 'slice' && scaleMax == scaleY))) ctx.translate(width - desiredWidth, 0);
        if (align.match(/YMax$/) && ((meetOrSlice == 'meet' && scaleMin == scaleX) || (meetOrSlice == 'slice' && scaleMax == scaleX))) ctx.translate(0, height - desiredHeight);
      }

      // scale
      if (align == 'none') ctx.scale(scaleX, scaleY);
      else if (meetOrSlice == 'meet') ctx.scale(scaleMin, scaleMin);
      else if (meetOrSlice == 'slice') ctx.scale(scaleMax, scaleMax);

      // translate
      ctx.translate(minX == null ? 0 : -minX, minY == null ? 0 : -minY);
    }

    // elements
    svg.Element = {}

    svg.EmptyProperty = new svg.Property('EMPTY', '');

    svg.Element.ElementBase = function(node) {
      this.attributes = {};
      this.styles = {};
      this.children = [];

      if (node != null && node.nodeType == 1) { //ELEMENT_NODE
        // add children
        for (var i=0; i<node.childNodes.length; i++) {
          var childNode = node.childNodes[i];
          if (childNode.nodeType == 1) this.addChild(childNode, true); //ELEMENT_NODE
          if (this.captureTextNodes && childNode.nodeType == 3) {
            var text = childNode.nodeValue || childNode.text || '';
            if (svg.trim(svg.compressSpaces(text)) != '') {
              this.addChild(new svg.Element.tspan(childNode), false); // TEXT_NODE
            }
          }
        }

        // add attributes
        for (var i=0; i<node.attributes.length; i++) {
          var attribute = node.attributes[i];
          this.attributes[attribute.nodeName] = new svg.Property(attribute.nodeName, attribute.nodeValue);
        }

        // add tag styles
        // var styles = svg.Styles[node.nodeName];
        // if (styles != null) {
        //   for (var name in styles) {
        //     this.styles[name] = styles[name];
        //   }
        // }

        // add class styles
        // if (this.attribute('class').hasValue()) {
        //   var classes = svg.compressSpaces(this.attribute('class').value).split(' ');
        //   for (var j=0; j<classes.length; j++) {
        //     styles = svg.Styles['.'+classes[j]];
        //     if (styles != null) {
        //       for (var name in styles) {
        //         this.styles[name] = styles[name];
        //       }
        //     }
        //     styles = svg.Styles[node.nodeName+'.'+classes[j]];
        //     if (styles != null) {
        //       for (var name in styles) {
        //         this.styles[name] = styles[name];
        //       }
        //     }
        //   }
        // }

        // // add id styles
        // if (this.attribute('id').hasValue()) {
        //   var styles = svg.Styles['#' + this.attribute('id').value];
        //   if (styles != null) {
        //     for (var name in styles) {
        //       this.styles[name] = styles[name];
        //     }
        //   }
        // }

        // add inline styles // hacked version
        var styles = this.attribute('stylez').value.split(";");
        for (var i=0; i<styles.length; i++) {
          if ( styles[i].indexOf(':') != -1 ) {
            var s = styles[i].split(':');
            var name = svg.trim(s[0]);
            this.styles[name] = new svg.Property(name, svg.trim(s[1]));
          }
        }

        // add id
        // if (this.attribute('id').hasValue()) {
        //   if (svg.Definitions[this.attribute('id').value] == null) {
        //     svg.Definitions[this.attribute('id').value] = this;
        //   }
        // }
      }
    }

      // get or create attribute
      svg.Element.ElementBase.prototype.attribute = function(name, createIfNotExists) {
        var a = this.attributes[name];
        if (a != null) return a;

        if (createIfNotExists == true) { a = new svg.Property(name, ''); this.attributes[name] = a; }
        return a || svg.EmptyProperty;
      }

      svg.Element.ElementBase.prototype.getHrefAttribute = function() {
        for (var a in this.attributes) {
          if (a.match(/:href$/)) {
            return this.attributes[a];
          }
        }
        return this.attributes.href || svg.EmptyProperty();
      }

      // get or create style, crawls up node tree
      svg.Element.ElementBase.prototype.style = function(name, createIfNotExists) {
        var s = this.styles[name];
        if (s != null) return s;

        var a = this.attribute(name);
        if (a != null && a.hasValue()) {
          this.styles[name] = a; // move up to me to cache
          return a;
        }

        // var p = this.parent;
        // if (p != null) {
        //   var ps = p.style(name);
        //   if (ps != null && ps.hasValue()) {
        //     return ps;
        //   }
        // }

        if (createIfNotExists == true) { s = new svg.Property(name, ''); this.styles[name] = s; }
        return s || svg.EmptyProperty;
      }

      // base render
      svg.Element.ElementBase.prototype.render = function(ctx) {
        // // don't render display=none
        // if (this.style('display').value == 'none') return;

        // // don't render visibility=hidden
        // if (this.attribute('visibility').value == 'hidden') return;

        ctx.save();
        // if (this.attribute('mask').hasValue()) { // mask
        //   var mask = this.attribute('mask').getDefinition();
        //   if (mask != null) mask.apply(ctx, this);
        // }
        // else if (this.style('filter').hasValue()) { // filter
        //   var filter = this.style('filter').getDefinition();
        //   if (filter != null) filter.apply(ctx, this);
        // }
        // else {
          this.setContext(ctx);
          try{
            this.renderChildren(ctx);
          } catch(e) {
            console.warn("Error occur when rendering svg in canvas", e);
          }
          this.clearContext(ctx);
        // }
        ctx.restore();
      }

      // base set context
      svg.Element.ElementBase.prototype.setContext = function(ctx) {
        // OVERRIDE ME!
      }

      // base clear context
      svg.Element.ElementBase.prototype.clearContext = function(ctx) {
        // OVERRIDE ME!
      }

      // base render children
      svg.Element.ElementBase.prototype.renderChildren = function(ctx) {
        for (var i=0; i<this.children.length; i++) {
          this.children[i].render(ctx);
        }
      }

      svg.Element.ElementBase.prototype.addChild = function(childNode, create) {
        var child = childNode;
        if (create) child = svg.CreateElement(childNode);
        child.parent = this;
        this.children.push(child);
      }


    svg.Element.RenderedElementBase = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
    }
      svg.Element.RenderedElementBase.prototype = new svg.Element.ElementBase;

      svg.Element.RenderedElementBase.prototype.setContext = function(ctx) {
        // fill
        if (this.style('fill').isUrlDefinition()) {
          var fs = this.style('fill').getFillStyleDefinition(this, this.style('fill-opacity'));
          if (fs != null) ctx.fillStyle = fs;
        }
        else if (this.style('fill').hasValue()) {
          var fillStyle = this.style('fill');
          if (fillStyle.value == 'currentColor') fillStyle.value = this.style('color').value;
          ctx.fillStyle = (fillStyle.value == 'none' ? 'rgba(0,0,0,0)' : fillStyle.value);
        }

        fillOpacity = this.style('fill-opacity')
        if (fillOpacity.hasValue()) {
          if ( fillOpacity.value + "" != "1" ) {
            var fillStyle = new svg.Property('fill', ctx.fillStyle);
            fillStyle = fillStyle.addOpacity(fillOpacity.value);
            ctx.fillStyle = fillStyle.value;
          }
        }

        // stroke
        if (this.style('stroke').isUrlDefinition()) {
          var fs = this.style('stroke').getFillStyleDefinition(this, this.style('stroke-opacity'));
          if (fs != null) ctx.strokeStyle = fs;
        }
        else if (this.style('stroke').hasValue()) {
          var strokeStyle = this.style('stroke');
          if (strokeStyle.value == 'currentColor') strokeStyle.value = this.style('color').value;
          ctx.strokeStyle = (strokeStyle.value == 'none' ? 'rgba(0,0,0,0)' : strokeStyle.value);
        }
        if (this.style('stroke-opacity').hasValue()) {
          var strokeStyle = new svg.Property('stroke', ctx.strokeStyle);
          strokeStyle = strokeStyle.addOpacity(this.style('stroke-opacity').value);
          ctx.strokeStyle = strokeStyle.value;
        }
        if (this.style('stroke-width').hasValue()) {
          var newLineWidth = this.style('stroke-width').toPixels();
          ctx.lineWidth = newLineWidth == 0 ? 0.001 : newLineWidth; // browsers don't respect 0
          }
        if (this.style('stroke-linecap').hasValue()) ctx.lineCap = this.style('stroke-linecap').value;
        if (this.style('stroke-linejoin').hasValue()) ctx.lineJoin = this.style('stroke-linejoin').value;
        if (this.style('stroke-miterlimit').hasValue()) ctx.miterLimit = this.style('stroke-miterlimit').value;
        if (this.style('stroke-dasharray').hasValue()) {
          var gaps = svg.ToNumberArray(this.style('stroke-dasharray').value);
          if ( gaps.length > 1 || gaps[0] != 0 ) {
            if (typeof(ctx.setLineDash) != 'undefined') { ctx.setLineDash(gaps); }
            else if (typeof(ctx.webkitLineDash) != 'undefined') { ctx.webkitLineDash = gaps; }
            else if (typeof(ctx.mozDash ) != 'undefined') { ctx.mozDash  = gaps; }

            var offset = this.style('stroke-dashoffset').numValueOrDefault(1);
            if (typeof(ctx.lineDashOffset) != 'undefined') { ctx.lineDashOffset = offset; }
            else if (typeof(ctx.webkitLineDashOffset) != 'undefined') { ctx.webkitLineDashOffset = offset; }
            else if (typeof(ctx.mozDashOffset) != 'undefined') { ctx.mozDashOffset = offset; }
          }
        }

        // transform
        if (this.attribute('transform').hasValue()) {
          var transform = new svg.Transform(this.attribute('transform').value);
          transform.apply(ctx);
        }

        // clip
        if (this.style('clip-path').hasValue()) {
          var clip = this.style('clip-path').getDefinition();
          if (clip != null) clip.apply(ctx);
        }

        // opacity
        if (this.style('opacity').hasValue()) {
          ctx.globalAlpha = this.style('opacity').numValue();
        }
      }

    svg.Element.PathElementBase = function(node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.path = function(ctx) {
        if (ctx != null) ctx.beginPath();
        return new svg.BoundingBox();
      }

      this.renderChildren = function(ctx) {
        this.path(ctx);
        if (ctx.fillStyle != '') {
          if (this.attribute('fill-rule').hasValue()) { ctx.fill(this.attribute('fill-rule').value); }
          else { ctx.fill(); }
        }
        if (ctx.strokeStyle != '') ctx.stroke();

        var markers = this.getMarkers();
        if (markers != null) {
          if (this.style('marker-start').isUrlDefinition()) {
            var marker = this.style('marker-start').getDefinition();
            marker.render(ctx, markers[0][0], markers[0][1]);
          }
          if (this.style('marker-mid').isUrlDefinition()) {
            var marker = this.style('marker-mid').getDefinition();
            for (var i=1;i<markers.length-1;i++) {
              marker.render(ctx, markers[i][0], markers[i][1]);
            }
          }
          if (this.style('marker-end').isUrlDefinition()) {
            var marker = this.style('marker-end').getDefinition();
            marker.render(ctx, markers[markers.length-1][0], markers[markers.length-1][1]);
          }
        }
      }

      this.getBoundingBox = function() {
        return this.path();
      }

      this.getMarkers = function() {
        return null;
      }
    }
    svg.Element.PathElementBase.prototype = new svg.Element.RenderedElementBase;

    // svg element
    svg.Element.svg = function(node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.baseClearContext = this.clearContext;
      this.clearContext = function(ctx) {
        this.baseClearContext(ctx);
        svg.ViewPort.RemoveCurrent();
      }

      this.baseSetContext = this.setContext;
      this.setContext = function(ctx) {
        // initial values
        ctx.strokeStyle = 'rgba(0,0,0,0)';
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 4;

        this.baseSetContext(ctx);

        // create new view port
        if (!this.attribute('x').hasValue()) this.attribute('x', true).value = 0;
        if (!this.attribute('y').hasValue()) this.attribute('y', true).value = 0;
        ctx.translate(this.attribute('x').toPixels('x'), this.attribute('y').toPixels('y'));

        var width = svg.ViewPort.width();
        var height = svg.ViewPort.height();

        if (!this.attribute('width').hasValue()) this.attribute('width', true).value = '100%';
        if (!this.attribute('height').hasValue()) this.attribute('height', true).value = '100%';
        if (typeof(this.root) == 'undefined') {
          width = this.attribute('width').toPixels('x');
          height = this.attribute('height').toPixels('y');

          var x = 0;
          var y = 0;
          if (this.attribute('refX').hasValue() && this.attribute('refY').hasValue()) {
            x = -this.attribute('refX').toPixels('x');
            y = -this.attribute('refY').toPixels('y');
          }

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(width, y);
          ctx.lineTo(width, height);
          ctx.lineTo(x, height);
          ctx.closePath();
          ctx.clip();
        }
        svg.ViewPort.SetCurrent(width, height);

        // viewbox
        // if (this.attribute('viewBox').hasValue()) {
        //   var viewBox = svg.ToNumberArray(this.attribute('viewBox').value);
        //   var minX = viewBox[0];
        //   var minY = viewBox[1];
        //   width = viewBox[2];
        //   height = viewBox[3];

        //   svg.AspectRatio(ctx,
        //           this.attribute('preserveAspectRatio').value,
        //           svg.ViewPort.width(),
        //           width,
        //           svg.ViewPort.height(),
        //           height,
        //           minX,
        //           minY,
        //           this.attribute('refX').value,
        //           this.attribute('refY').value);

        //   svg.ViewPort.RemoveCurrent();
        //   svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);
        // }
      }
    }
    svg.Element.svg.prototype = new svg.Element.RenderedElementBase;

    // rect element
    svg.Element.rect = function(node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.path = function(ctx) {
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');
        var rx = this.attribute('rx').toPixels('x');
        var ry = this.attribute('ry').toPixels('y');
        if (this.attribute('rx').hasValue() && !this.attribute('ry').hasValue()) ry = rx;
        if (this.attribute('ry').hasValue() && !this.attribute('rx').hasValue()) rx = ry;
        rx = Math.min(rx, width / 2.0);
        ry = Math.min(ry, height / 2.0);
        if (ctx != null) {
          ctx.beginPath();
          ctx.moveTo(x + rx, y);
          ctx.lineTo(x + width - rx, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + ry)
          ctx.lineTo(x + width, y + height - ry);
          ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height)
          ctx.lineTo(x + rx, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - ry)
          ctx.lineTo(x, y + ry);
          ctx.quadraticCurveTo(x, y, x + rx, y)
          ctx.closePath();
        }

        return new svg.BoundingBox(x, y, x + width, y + height);
      }
    }
    svg.Element.rect.prototype = new svg.Element.PathElementBase;

    // circle element
    svg.Element.circle = function(node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.path = function(ctx) {
        var cx = this.attribute('cx').toPixels('x');
        var cy = this.attribute('cy').toPixels('y');
        var r = this.attribute('r').toPixels();

        if (ctx != null) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
          ctx.closePath();
        }

        return new svg.BoundingBox(cx - r, cy - r, cx + r, cy + r);
      }
    }
    svg.Element.circle.prototype = new svg.Element.PathElementBase;

    // ellipse element
    svg.Element.ellipse = function(node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.path = function(ctx) {
        var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
        var rx = this.attribute('rx').toPixels('x');
        var ry = this.attribute('ry').toPixels('y');
        var cx = this.attribute('cx').toPixels('x');
        var cy = this.attribute('cy').toPixels('y');

        if (ctx != null) {
          ctx.beginPath();
          ctx.moveTo(cx, cy - ry);
          ctx.bezierCurveTo(cx + (KAPPA * rx), cy - ry,  cx + rx, cy - (KAPPA * ry), cx + rx, cy);
          ctx.bezierCurveTo(cx + rx, cy + (KAPPA * ry), cx + (KAPPA * rx), cy + ry, cx, cy + ry);
          ctx.bezierCurveTo(cx - (KAPPA * rx), cy + ry, cx - rx, cy + (KAPPA * ry), cx - rx, cy);
          ctx.bezierCurveTo(cx - rx, cy - (KAPPA * ry), cx - (KAPPA * rx), cy - ry, cx, cy - ry);
          ctx.closePath();
        }

        return new svg.BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
      }
    }
    svg.Element.ellipse.prototype = new svg.Element.PathElementBase;

    // line element
    svg.Element.line = function(node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.getPoints = function() {
        return [
          new svg.Point(this.attribute('x1').toPixels('x'), this.attribute('y1').toPixels('y')),
          new svg.Point(this.attribute('x2').toPixels('x'), this.attribute('y2').toPixels('y'))];
      }

      this.path = function(ctx) {
        var points = this.getPoints();

        if (ctx != null) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(points[1].x, points[1].y);
        }

        return new svg.BoundingBox(points[0].x, points[0].y, points[1].x, points[1].y);
      }

      this.getMarkers = function() {
        var points = this.getPoints();
        var a = points[0].angleTo(points[1]);
        return [[points[0], a], [points[1], a]];
      }
    }
    svg.Element.line.prototype = new svg.Element.PathElementBase;

    // polyline element
    svg.Element.polyline = function(node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.points = svg.CreatePath(this.attribute('points').value);
      this.path = function(ctx) {
        var bb = new svg.BoundingBox(this.points[0].x, this.points[0].y);
        if (ctx != null) {
          ctx.beginPath();
          ctx.moveTo(this.points[0].x, this.points[0].y);
        }
        for (var i=1; i<this.points.length; i++) {
          bb.addPoint(this.points[i].x, this.points[i].y);
          if (ctx != null) ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        return bb;
      }

      this.getMarkers = function() {
        var markers = [];
        for (var i=0; i<this.points.length - 1; i++) {
          markers.push([this.points[i], this.points[i].angleTo(this.points[i+1])]);
        }
        markers.push([this.points[this.points.length-1], markers[markers.length-1][1]]);
        return markers;
      }
    }
    svg.Element.polyline.prototype = new svg.Element.PathElementBase;

    // polygon element
    svg.Element.polygon = function(node) {
      this.base = svg.Element.polyline;
      this.base(node);

      this.basePath = this.path;
      this.path = function(ctx) {
        var bb = this.basePath(ctx);
        if (ctx != null) {
          ctx.lineTo(this.points[0].x, this.points[0].y);
          ctx.closePath();
        }
        return bb;
      }
    }
    svg.Element.polygon.prototype = new svg.Element.polyline;

    // path element
    svg.Element.path = function(node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      var d = this.attribute('d').value;
      // TODO: convert to real lexer based on http://www.w3.org/TR/SVG11/paths.html#PathDataBNF
      d = d.replace(/,/gm,' '); // get rid of all commas
      d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from commands
      d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from commands
      d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm,'$1 $2'); // separate commands from points
      d = d.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from points
      d = d.replace(/([0-9])([+\-])/gm,'$1 $2'); // separate digits when no comma
      d = d.replace(/(\.[0-9]*)(\.)/gm,'$1 $2'); // separate digits when no comma
      d = d.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,'$1 $3 $4 '); // shorthand elliptical arc path syntax
      d = svg.compressSpaces(d); // compress multiple spaces
      d = svg.trim(d);
      this.PathParser = new (function(d) {
        this.tokens = d.split(' ');

        this.reset = function() {
          this.i = -1;
          this.command = '';
          this.previousCommand = '';
          this.start = new svg.Point(0, 0);
          this.control = new svg.Point(0, 0);
          this.current = new svg.Point(0, 0);
          this.points = [];
          this.angles = [];
        }

        this.isEnd = function() {
          return this.i >= this.tokens.length - 1;
        }

        this.isCommandOrEnd = function() {
          if (this.isEnd()) return true;
          return this.tokens[this.i + 1].match(/^[A-Za-z]$/) != null;
        }

        this.isRelativeCommand = function() {
          switch(this.command)
          {
            case 'm':
            case 'l':
            case 'h':
            case 'v':
            case 'c':
            case 's':
            case 'q':
            case 't':
            case 'a':
            case 'z':
              return true;
              break;
          }
          return false;
        }

        this.getToken = function() {
          this.i++;
          return this.tokens[this.i];
        }

        this.getScalar = function() {
          return parseFloat(this.getToken());
        }

        this.nextCommand = function() {
          this.previousCommand = this.command;
          this.command = this.getToken();
        }

        this.getPoint = function() {
          var p = new svg.Point(this.getScalar(), this.getScalar());
          return this.makeAbsolute(p);
        }

        this.getAsControlPoint = function() {
          var p = this.getPoint();
          this.control = p;
          return p;
        }

        this.getAsCurrentPoint = function() {
          var p = this.getPoint();
          this.current = p;
          return p;
        }

        this.getReflectedControlPoint = function() {
          if (this.previousCommand.toLowerCase() != 'c' &&
              this.previousCommand.toLowerCase() != 's' &&
            this.previousCommand.toLowerCase() != 'q' &&
            this.previousCommand.toLowerCase() != 't' ){
            return this.current;
          }

          // reflect point
          var p = new svg.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);
          return p;
        }

        this.makeAbsolute = function(p) {
          if (this.isRelativeCommand()) {
            p.x += this.current.x;
            p.y += this.current.y;
          }
          return p;
        }

        this.addMarker = function(p, from, priorTo) {
          // if the last angle isn't filled in because we didn't have this point yet ...
          if (priorTo != null && this.angles.length > 0 && this.angles[this.angles.length-1] == null) {
            this.angles[this.angles.length-1] = this.points[this.points.length-1].angleTo(priorTo);
          }
          this.addMarkerAngle(p, from == null ? null : from.angleTo(p));
        }

        this.addMarkerAngle = function(p, a) {
          this.points.push(p);
          this.angles.push(a);
        }

        this.getMarkerPoints = function() { return this.points; }
        this.getMarkerAngles = function() {
          for (var i=0; i<this.angles.length; i++) {
            if (this.angles[i] == null) {
              for (var j=i+1; j<this.angles.length; j++) {
                if (this.angles[j] != null) {
                  this.angles[i] = this.angles[j];
                  break;
                }
              }
            }
          }
          return this.angles;
        }
      })(d);

      this.path = function(ctx) {
        var pp = this.PathParser;
        pp.reset();

        var bb = new svg.BoundingBox();
        if (ctx != null) ctx.beginPath();
        while (!pp.isEnd()) {
          pp.nextCommand();
          switch (pp.command) {
          case 'M':
          case 'm':
            var p = pp.getAsCurrentPoint();
            pp.addMarker(p);
            bb.addPoint(p.x, p.y);
            if (ctx != null) ctx.moveTo(p.x, p.y);
            pp.start = pp.current;
            while (!pp.isCommandOrEnd()) {
              var p = pp.getAsCurrentPoint();
              pp.addMarker(p, pp.start);
              bb.addPoint(p.x, p.y);
              if (ctx != null) ctx.lineTo(p.x, p.y);
            }
            break;
          case 'L':
          case 'l':
            while (!pp.isCommandOrEnd()) {
              var c = pp.current;
              var p = pp.getAsCurrentPoint();
              pp.addMarker(p, c);
              bb.addPoint(p.x, p.y);
              if (ctx != null) ctx.lineTo(p.x, p.y);
            }
            break;
          case 'H':
          case 'h':
            while (!pp.isCommandOrEnd()) {
              var newP = new svg.Point((pp.isRelativeCommand() ? pp.current.x : 0) + pp.getScalar(), pp.current.y);
              pp.addMarker(newP, pp.current);
              pp.current = newP;
              bb.addPoint(pp.current.x, pp.current.y);
              if (ctx != null) ctx.lineTo(pp.current.x, pp.current.y);
            }
            break;
          case 'V':
          case 'v':
            while (!pp.isCommandOrEnd()) {
              var newP = new svg.Point(pp.current.x, (pp.isRelativeCommand() ? pp.current.y : 0) + pp.getScalar());
              pp.addMarker(newP, pp.current);
              pp.current = newP;
              bb.addPoint(pp.current.x, pp.current.y);
              if (ctx != null) ctx.lineTo(pp.current.x, pp.current.y);
            }
            break;
          case 'C':
          case 'c':
            while (!pp.isCommandOrEnd()) {
              var curr = pp.current;
              var p1 = pp.getPoint();
              var cntrl = pp.getAsControlPoint();
              var cp = pp.getAsCurrentPoint();
              pp.addMarker(cp, cntrl, p1);
              bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
              if (ctx != null) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
            }
            break;
          case 'S':
          case 's':
            while (!pp.isCommandOrEnd()) {
              var curr = pp.current;
              var p1 = pp.getReflectedControlPoint();
              var cntrl = pp.getAsControlPoint();
              var cp = pp.getAsCurrentPoint();
              pp.addMarker(cp, cntrl, p1);
              bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
              if (ctx != null) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
            }
            break;
          case 'Q':
          case 'q':
            while (!pp.isCommandOrEnd()) {
              var curr = pp.current;
              var cntrl = pp.getAsControlPoint();
              var cp = pp.getAsCurrentPoint();
              pp.addMarker(cp, cntrl, cntrl);
              bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
              if (ctx != null) ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
            }
            break;
          case 'T':
          case 't':
            while (!pp.isCommandOrEnd()) {
              var curr = pp.current;
              var cntrl = pp.getReflectedControlPoint();
              pp.control = cntrl;
              var cp = pp.getAsCurrentPoint();
              pp.addMarker(cp, cntrl, cntrl);
              bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
              if (ctx != null) ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
            }
            break;
          case 'A':
          case 'a':
            while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
              var rx = pp.getScalar();
              var ry = pp.getScalar();
              var xAxisRotation = pp.getScalar() * (Math.PI / 180.0);
              var largeArcFlag = pp.getScalar();
              var sweepFlag = pp.getScalar();
              var cp = pp.getAsCurrentPoint();

              // Conversion from endpoint to center parameterization
              // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
              // x1', y1'
              var currp = new svg.Point(
                Math.cos(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.sin(xAxisRotation) * (curr.y - cp.y) / 2.0,
                -Math.sin(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.cos(xAxisRotation) * (curr.y - cp.y) / 2.0
              );
              // adjust radii
              var l = Math.pow(currp.x,2)/Math.pow(rx,2)+Math.pow(currp.y,2)/Math.pow(ry,2);
              if (l > 1) {
                rx *= Math.sqrt(l);
                ry *= Math.sqrt(l);
              }
              // cx', cy'
              var s = (largeArcFlag == sweepFlag ? -1 : 1) * Math.sqrt(
                ((Math.pow(rx,2)*Math.pow(ry,2))-(Math.pow(rx,2)*Math.pow(currp.y,2))-(Math.pow(ry,2)*Math.pow(currp.x,2))) /
                (Math.pow(rx,2)*Math.pow(currp.y,2)+Math.pow(ry,2)*Math.pow(currp.x,2))
              );
              if (isNaN(s)) s = 0;
              var cpp = new svg.Point(s * rx * currp.y / ry, s * -ry * currp.x / rx);
              // cx, cy
              var centp = new svg.Point(
                (curr.x + cp.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y,
                (curr.y + cp.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y
              );
              // vector magnitude
              var m = function(v) { return Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2)); }
              // ratio between two vectors
              var r = function(u, v) { return (u[0]*v[0]+u[1]*v[1]) / (m(u)*m(v)) }
              // angle between two vectors
              var a = function(u, v) { return (u[0]*v[1] < u[1]*v[0] ? -1 : 1) * Math.acos(r(u,v)); }
              // initial angle
              var a1 = a([1,0], [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry]);
              // angle delta
              var u = [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry];
              var v = [(-currp.x-cpp.x)/rx,(-currp.y-cpp.y)/ry];
              var ad = a(u, v);
              if (r(u,v) <= -1) ad = Math.PI;
              if (r(u,v) >= 1) ad = 0;

              // for markers
              var dir = 1 - sweepFlag ? 1.0 : -1.0;
              var ah = a1 + dir * (ad / 2.0);
              var halfWay = new svg.Point(
                centp.x + rx * Math.cos(ah),
                centp.y + ry * Math.sin(ah)
              );
              pp.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
              pp.addMarkerAngle(cp, ah - dir * Math.PI);

              bb.addPoint(cp.x, cp.y); // TODO: this is too naive, make it better
              if (ctx != null) {
                var r = rx > ry ? rx : ry;
                var sx = rx > ry ? 1 : rx / ry;
                var sy = rx > ry ? ry / rx : 1;

                ctx.translate(centp.x, centp.y);
                ctx.rotate(xAxisRotation);
                ctx.scale(sx, sy);
                ctx.arc(0, 0, r, a1, a1 + ad, 1 - sweepFlag);
                ctx.scale(1/sx, 1/sy);
                ctx.rotate(-xAxisRotation);
                ctx.translate(-centp.x, -centp.y);
              }
            }
            break;
          case 'Z':
          case 'z':
            if (ctx != null) ctx.closePath();
            pp.current = pp.start;
          }
        }

        return bb;
      }

      this.getMarkers = function() {
        var points = this.PathParser.getMarkerPoints();
        var angles = this.PathParser.getMarkerAngles();

        var markers = [];
        for (var i=0; i<points.length; i++) {
          markers.push([points[i], angles[i]]);
        }
        return markers;
      }
    }
    svg.Element.path.prototype = new svg.Element.PathElementBase;

    // pattern element
    svg.Element.pattern = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.createPattern = function(ctx, element) {
        var width = this.attribute('width').toPixels('x', true);
        var height = this.attribute('height').toPixels('y', true);

        // render me using a temporary svg element
        var tempSvg = new svg.Element.svg();
        tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
        tempSvg.attributes['width'] = new svg.Property('width', width + 'px');
        tempSvg.attributes['height'] = new svg.Property('height', height + 'px');
        tempSvg.attributes['transform'] = new svg.Property('transform', this.attribute('patternTransform').value);
        tempSvg.children = this.children;

        var c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        var cctx = c.getContext('2d');
        if (this.attribute('x').hasValue() && this.attribute('y').hasValue()) {
          cctx.translate(this.attribute('x').toPixels('x', true), this.attribute('y').toPixels('y', true));
        }
        // render 3x3 grid so when we transform there's no white space on edges
        for (var x=-1; x<=1; x++) {
          for (var y=-1; y<=1; y++) {
            cctx.save();
            cctx.translate(x * c.width, y * c.height);
            tempSvg.render(cctx);
            cctx.restore();
          }
        }
        var pattern = ctx.createPattern(c, 'repeat');
        return pattern;
      }
    }
    svg.Element.pattern.prototype = new svg.Element.ElementBase;

    // marker element
    svg.Element.marker = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.baseRender = this.render;
      this.render = function(ctx, point, angle) {
        ctx.translate(point.x, point.y);
        if (this.attribute('orient').valueOrDefault('auto') == 'auto') ctx.rotate(angle);
        if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') ctx.scale(ctx.lineWidth, ctx.lineWidth);
        ctx.save();

        // render me using a temporary svg element
        var tempSvg = new svg.Element.svg();
        tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
        tempSvg.attributes['refX'] = new svg.Property('refX', this.attribute('refX').value);
        tempSvg.attributes['refY'] = new svg.Property('refY', this.attribute('refY').value);
        tempSvg.attributes['width'] = new svg.Property('width', this.attribute('markerWidth').value);
        tempSvg.attributes['height'] = new svg.Property('height', this.attribute('markerHeight').value);
        tempSvg.attributes['fill'] = new svg.Property('fill', this.attribute('fill').valueOrDefault('black'));
        tempSvg.attributes['stroke'] = new svg.Property('stroke', this.attribute('stroke').valueOrDefault('none'));
        tempSvg.children = this.children;
        tempSvg.render(ctx);

        ctx.restore();
        if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') ctx.scale(1/ctx.lineWidth, 1/ctx.lineWidth);
        if (this.attribute('orient').valueOrDefault('auto') == 'auto') ctx.rotate(-angle);
        ctx.translate(-point.x, -point.y);
      }
    }
    svg.Element.marker.prototype = new svg.Element.ElementBase;

    // definitions element
    svg.Element.defs = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.render = function(ctx) {
        // NOOP
      }
    }
    svg.Element.defs.prototype = new svg.Element.ElementBase;

    // base for gradients
    svg.Element.GradientBase = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.gradientUnits = this.attribute('gradientUnits').valueOrDefault('objectBoundingBox');

      this.stops = [];
      for (var i=0; i<this.children.length; i++) {
        var child = this.children[i];
        if (child.type == 'stop') this.stops.push(child);
      }

      this.getGradient = function() {
        // OVERRIDE ME!
      }

      this.createGradient = function(ctx, element, parentOpacityProp) {
        var stopsContainer = this;
        if (this.getHrefAttribute().hasValue()) {
          stopsContainer = this.getHrefAttribute().getDefinition();
        }

        var addParentOpacity = function (color) {
          if (parentOpacityProp.hasValue()) {
            var p = new svg.Property('color', color);
            return p.addOpacity(parentOpacityProp.value).value;
          }
          return color;
        };

        var g = this.getGradient(ctx, element);
        if (g == null) return addParentOpacity(stopsContainer.stops[stopsContainer.stops.length - 1].color);
        for (var i=0; i<stopsContainer.stops.length; i++) {
          g.addColorStop(stopsContainer.stops[i].offset, addParentOpacity(stopsContainer.stops[i].color));
        }

        if (this.attribute('gradientTransform').hasValue()) {
          // render as transformed pattern on temporary canvas
          var rootView = svg.ViewPort.viewPorts[0];

          var rect = new svg.Element.rect();
          rect.attributes['x'] = new svg.Property('x', -svg.MAX_VIRTUAL_PIXELS/3.0);
          rect.attributes['y'] = new svg.Property('y', -svg.MAX_VIRTUAL_PIXELS/3.0);
          rect.attributes['width'] = new svg.Property('width', svg.MAX_VIRTUAL_PIXELS);
          rect.attributes['height'] = new svg.Property('height', svg.MAX_VIRTUAL_PIXELS);

          var group = new svg.Element.g();
          group.attributes['transform'] = new svg.Property('transform', this.attribute('gradientTransform').value);
          group.children = [ rect ];

          var tempSvg = new svg.Element.svg();
          tempSvg.attributes['x'] = new svg.Property('x', 0);
          tempSvg.attributes['y'] = new svg.Property('y', 0);
          tempSvg.attributes['width'] = new svg.Property('width', rootView.width);
          tempSvg.attributes['height'] = new svg.Property('height', rootView.height);
          tempSvg.children = [ group ];

          var c = document.createElement('canvas');
          c.width = rootView.width;
          c.height = rootView.height;
          var tempCtx = c.getContext('2d');
          tempCtx.fillStyle = g;
          tempSvg.render(tempCtx);
          return tempCtx.createPattern(c, 'no-repeat');
        }

        return g;
      }
    }
    svg.Element.GradientBase.prototype = new svg.Element.ElementBase;

    // linear gradient element
    svg.Element.linearGradient = function(node) {
      this.base = svg.Element.GradientBase;
      this.base(node);

      this.getGradient = function(ctx, element) {
        var bb = element.getBoundingBox();

        if (!this.attribute('x1').hasValue()
         && !this.attribute('y1').hasValue()
         && !this.attribute('x2').hasValue()
         && !this.attribute('y2').hasValue()) {
          this.attribute('x1', true).value = 0;
          this.attribute('y1', true).value = 0;
          this.attribute('x2', true).value = 1;
          this.attribute('y2', true).value = 0;
         }

        var x1 = (this.gradientUnits == 'objectBoundingBox'
          ? bb.x() + bb.width() * this.attribute('x1').numValue()
          : this.attribute('x1').toPixels('x'));
        var y1 = (this.gradientUnits == 'objectBoundingBox'
          ? bb.y() + bb.height() * this.attribute('y1').numValue()
          : this.attribute('y1').toPixels('y'));
        var x2 = (this.gradientUnits == 'objectBoundingBox'
          ? bb.x() + bb.width() * this.attribute('x2').numValue()
          : this.attribute('x2').toPixels('x'));
        var y2 = (this.gradientUnits == 'objectBoundingBox'
          ? bb.y() + bb.height() * this.attribute('y2').numValue()
          : this.attribute('y2').toPixels('y'));

        if (x1 == x2 && y1 == y2) return null;
        return ctx.createLinearGradient(x1, y1, x2, y2);
      }
    }
    svg.Element.linearGradient.prototype = new svg.Element.GradientBase;

    // radial gradient element
    svg.Element.radialGradient = function(node) {
      this.base = svg.Element.GradientBase;
      this.base(node);

      this.getGradient = function(ctx, element) {
        var bb = element.getBoundingBox();

        if (!this.attribute('cx').hasValue()) this.attribute('cx', true).value = '50%';
        if (!this.attribute('cy').hasValue()) this.attribute('cy', true).value = '50%';
        if (!this.attribute('r').hasValue()) this.attribute('r', true).value = '50%';

        var cx = (this.gradientUnits == 'objectBoundingBox'
          ? bb.x() + bb.width() * this.attribute('cx').numValue()
          : this.attribute('cx').toPixels('x'));
        var cy = (this.gradientUnits == 'objectBoundingBox'
          ? bb.y() + bb.height() * this.attribute('cy').numValue()
          : this.attribute('cy').toPixels('y'));

        var fx = cx;
        var fy = cy;
        if (this.attribute('fx').hasValue()) {
          fx = (this.gradientUnits == 'objectBoundingBox'
          ? bb.x() + bb.width() * this.attribute('fx').numValue()
          : this.attribute('fx').toPixels('x'));
        }
        if (this.attribute('fy').hasValue()) {
          fy = (this.gradientUnits == 'objectBoundingBox'
          ? bb.y() + bb.height() * this.attribute('fy').numValue()
          : this.attribute('fy').toPixels('y'));
        }

        var r = (this.gradientUnits == 'objectBoundingBox'
          ? (bb.width() + bb.height()) / 2.0 * this.attribute('r').numValue()
          : this.attribute('r').toPixels());

        return ctx.createRadialGradient(fx, fy, 0, cx, cy, r);
      }
    }
    svg.Element.radialGradient.prototype = new svg.Element.GradientBase;

    // gradient stop element
    svg.Element.stop = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.offset = this.attribute('offset').numValue();
      if (this.offset < 0) this.offset = 0;
      if (this.offset > 1) this.offset = 1;

      var stopColor = this.style('stop-color');
      if (this.style('stop-opacity').hasValue()) stopColor = stopColor.addOpacity(this.style('stop-opacity').value);
      this.color = stopColor.value;
    }
    svg.Element.stop.prototype = new svg.Element.ElementBase;

    // font element
    svg.Element.font = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.horizAdvX = this.attribute('horiz-adv-x').numValue();

      this.isRTL = false;
      this.isArabic = false;
      this.fontFace = null;
      this.missingGlyph = null;
      this.glyphs = [];
      for (var i=0; i<this.children.length; i++) {
        var child = this.children[i];
        if (child.type == 'font-face') {
          this.fontFace = child;
          if (child.style('font-family').hasValue()) {
            svg.Definitions[child.style('font-family').value] = this;
          }
        }
        else if (child.type == 'missing-glyph') this.missingGlyph = child;
        else if (child.type == 'glyph') {
          if (child.arabicForm != '') {
            this.isRTL = true;
            this.isArabic = true;
            if (typeof(this.glyphs[child.unicode]) == 'undefined') this.glyphs[child.unicode] = [];
            this.glyphs[child.unicode][child.arabicForm] = child;
          }
          else {
            this.glyphs[child.unicode] = child;
          }
        }
      }
    }
    svg.Element.font.prototype = new svg.Element.ElementBase;

    // font-face element
    svg.Element.fontface = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.ascent = this.attribute('ascent').value;
      this.descent = this.attribute('descent').value;
      this.unitsPerEm = this.attribute('units-per-em').numValue();
    }
    svg.Element.fontface.prototype = new svg.Element.ElementBase;

    // missing-glyph element
    svg.Element.missingglyph = function(node) {
      this.base = svg.Element.path;
      this.base(node);

      this.horizAdvX = 0;
    }
    svg.Element.missingglyph.prototype = new svg.Element.path;

    // glyph element
    svg.Element.glyph = function(node) {
      this.base = svg.Element.path;
      this.base(node);

      this.horizAdvX = this.attribute('horiz-adv-x').numValue();
      this.unicode = this.attribute('unicode').value;
      this.arabicForm = this.attribute('arabic-form').value;
    }
    svg.Element.glyph.prototype = new svg.Element.path;

    // text element
    svg.Element.text = function(node) {
      this.captureTextNodes = true;
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.baseSetContext = this.setContext;
      this.setContext = function(ctx) {
        this.baseSetContext(ctx);
        if (this.style('dominant-baseline').hasValue()) ctx.textBaseline = this.style('dominant-baseline').value;
        if (this.style('alignment-baseline').hasValue()) ctx.textBaseline = this.style('alignment-baseline').value;

        if ( !this.style('fill').hasValue() ) {
          ctx.fillStyle = "#000000";
        }

        // font
        if ( typeof(ctx.font) != 'undefined' ) {
          ctx.font = svg.Font.CreateFont(
            this.style('font-style').value,
            this.style('font-variant').value,
            this.style('font-weight').value,
            this.style('font-size').hasValue() ? this.style('font-size').toPixels() + 'px' : '12px',
            this.style('font-family').value)
        }
      }

      this.getBoundingBox = function () {
        // TODO: implement
        return new svg.BoundingBox(this.attribute('x').toPixels('x'), this.attribute('y').toPixels('y'), 0, 0);
      }

      this.renderChildren = function(ctx) {
        this.x = this.attribute('x').toPixels('x');
        this.y = this.attribute('y').toPixels('y');
        this.x += this.getAnchorDelta(ctx, this, 0);
        for (var i=0; i<this.children.length; i++) {
          this.renderChild(ctx, this, i);
        }
      }

      this.getAnchorDelta = function (ctx, parent, startI) {
        var textAnchor = this.style('text-anchor').valueOrDefault('start');
        if (textAnchor != 'start') {
          var width = 0;
          for (var i=startI; i<parent.children.length; i++) {
            var child = parent.children[i];
            if (i > startI && child.attribute('x').hasValue()) break; // new group
            width += child.measureTextRecursive(ctx);
          }
          return -1 * (textAnchor == 'end' ? width : width / 2.0);
        }
        return 0;
      }

      this.renderChild = function(ctx, parent, i) {
        var child = parent.children[i];
        if (child.attribute('x').hasValue()) {
          child.x = child.attribute('x').toPixels('x') + this.getAnchorDelta(ctx, parent, i);
        }
        else {
          if (this.attribute('dx').hasValue()) this.x += this.attribute('dx').toPixels('x');
          if (child.attribute('dx').hasValue()) this.x += child.attribute('dx').toPixels('x');
          child.x = this.x;
        }
        this.x = child.x + child.measureText(ctx);

        if (child.attribute('y').hasValue()) {
          child.y = child.attribute('y').toPixels('y');
        }
        else {
          if (this.attribute('dy').hasValue()) this.y += this.attribute('dy').toPixels('y');
          if (child.attribute('dy').hasValue()) this.y += child.attribute('dy').toPixels('y');
          child.y = this.y;
        }
        this.y = child.y;

        child.render(ctx);

        for (var i=0; i<child.children.length; i++) {
          this.renderChild(ctx, child, i);
        }
      }
    }
    svg.Element.text.prototype = new svg.Element.RenderedElementBase;

    // text base
    svg.Element.TextElementBase = function(node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.getGlyph = function(font, text, i) {
        var c = text[i];
        var glyph = null;
        if (font.isArabic) {
          var arabicForm = 'isolated';
          if ((i==0 || text[i-1]==' ') && i<text.length-2 && text[i+1]!=' ') arabicForm = 'terminal';
          if (i>0 && text[i-1]!=' ' && i<text.length-2 && text[i+1]!=' ') arabicForm = 'medial';
          if (i>0 && text[i-1]!=' ' && (i == text.length-1 || text[i+1]==' ')) arabicForm = 'initial';
          if (typeof(font.glyphs[c]) != 'undefined') {
            glyph = font.glyphs[c][arabicForm];
            if (glyph == null && font.glyphs[c].type == 'glyph') glyph = font.glyphs[c];
          }
        }
        else {
          glyph = font.glyphs[c];
        }
        if (glyph == null) glyph = font.missingGlyph;
        return glyph;
      }

      this.renderChildren = function(ctx) {
        var customFont = this.parent.style('font-family').getDefinition();
        if (customFont != null) {
          var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
          var fontStyle = this.parent.style('font-style').valueOrDefault(svg.Font.Parse(svg.ctx.font).fontStyle);
          var text = this.getText();
          if (customFont.isRTL) text = text.split("").reverse().join("");

          var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
          for (var i=0; i<text.length; i++) {
            var glyph = this.getGlyph(customFont, text, i);
            var scale = fontSize / customFont.fontFace.unitsPerEm;
            ctx.translate(this.x, this.y);
            ctx.scale(scale, -scale);
            var lw = ctx.lineWidth;
            ctx.lineWidth = ctx.lineWidth * customFont.fontFace.unitsPerEm / fontSize;
            if (fontStyle == 'italic') ctx.transform(1, 0, .4, 1, 0, 0);
            glyph.render(ctx);
            if (fontStyle == 'italic') ctx.transform(1, 0, -.4, 1, 0, 0);
            ctx.lineWidth = lw;
            ctx.scale(1/scale, -1/scale);
            ctx.translate(-this.x, -this.y);

            this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / customFont.fontFace.unitsPerEm;
            if (typeof(dx[i]) != 'undefined' && !isNaN(dx[i])) {
              this.x += dx[i];
            }
          }
          return;
        }

        if (ctx.fillStyle != '') ctx.fillText(svg.compressSpaces(this.getText()), this.x, this.y);
        if (ctx.strokeStyle != '') ctx.strokeText(svg.compressSpaces(this.getText()), this.x, this.y);
      }

      this.getText = function() {
        // OVERRIDE ME
      }

      this.measureTextRecursive = function(ctx) {
        var width = this.measureText(ctx);
        for (var i=0; i<this.children.length; i++) {
          width += this.children[i].measureTextRecursive(ctx);
        }
        return width;
      }

      this.measureText = function(ctx) {
        var customFont = this.parent.style('font-family').getDefinition();
        if (customFont != null) {
          var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
          var measure = 0;
          var text = this.getText();
          if (customFont.isRTL) text = text.split("").reverse().join("");
          var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
          for (var i=0; i<text.length; i++) {
            var glyph = this.getGlyph(customFont, text, i);
            measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
            if (typeof(dx[i]) != 'undefined' && !isNaN(dx[i])) {
              measure += dx[i];
            }
          }
          return measure;
        }

        var textToMeasure = svg.compressSpaces(this.getText());
        if (!ctx.measureText) return textToMeasure.length * 10;

        ctx.save();
        this.setContext(ctx);
        var width = ctx.measureText(textToMeasure).width;
        ctx.restore();
        return width;
      }
    }
    svg.Element.TextElementBase.prototype = new svg.Element.RenderedElementBase;

    // tspan
    svg.Element.tspan = function(node) {
      this.captureTextNodes = true;
      this.base = svg.Element.TextElementBase;
      this.base(node);

      this.text = node.nodeValue || node.text || '';
      this.getText = function() {
        return this.text;
      }
    }
    svg.Element.tspan.prototype = new svg.Element.TextElementBase;

    // tref
    svg.Element.tref = function(node) {
      this.base = svg.Element.TextElementBase;
      this.base(node);

      this.getText = function() {
        var element = this.getHrefAttribute().getDefinition();
        if (element != null) return element.children[0].getText();
      }
    }
    svg.Element.tref.prototype = new svg.Element.TextElementBase;

    // a element
    svg.Element.a = function(node) {
      this.base = svg.Element.TextElementBase;
      this.base(node);

      this.hasText = true;
      for (var i=0; i<node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType != 3) this.hasText = false;
      }

      // this might contain text
      this.text = this.hasText ? node.childNodes[0].nodeValue : '';
      this.getText = function() {
        return this.text;
      }

      this.baseRenderChildren = this.renderChildren;
      this.renderChildren = function(ctx) {
        if (this.hasText) {
          // render as text element
          this.baseRenderChildren(ctx);
        }
        else {
          // render as temporary group
          var g = new svg.Element.g();
          g.children = this.children;
          g.parent = this;
          g.render(ctx);
        }
      }

      this.onclick = function() {
        window.open(this.getHrefAttribute().value);
      }

      this.onmousemove = function() {
        svg.ctx.canvas.style.cursor = 'pointer';
      }
    }
    svg.Element.a.prototype = new svg.Element.TextElementBase;

    // image element
    svg.Element.image = function(node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      var href = this.getHrefAttribute().value;

      svg.Images.push(this);
      this.loaded = false;
      this.img = document.createElement('img');
      var self = this;
      this.img.onerror = this.img.onload = function() {
        self.loaded = true;
        svg.onImageLoaded();
      }
      this.img.src = href;

      this.renderChildren = function(ctx) {
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');

        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');
        if (width == 0 || height == 0) return;

        ctx.save();
        ctx.translate(x, y);
        svg.AspectRatio(ctx,
                this.attribute('preserveAspectRatio').value,
                width,
                this.img.width,
                height,
                this.img.height,
                0,
                0);
        ctx.drawImage(this.img, 0, 0);
        ctx.restore();
      }

      this.getBoundingBox = function() {
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');
        return new svg.BoundingBox(x, y, x + width, y + height);
      }
    }
    svg.Element.image.prototype = new svg.Element.RenderedElementBase;

    // group element
    svg.Element.g = function(node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.getBoundingBox = function() {
        var bb = new svg.BoundingBox();
        for (var i=0; i<this.children.length; i++) {
          bb.addBoundingBox(this.children[i].getBoundingBox());
        }
        return bb;
      };
    }
    svg.Element.g.prototype = new svg.Element.RenderedElementBase;

    // symbol element
    svg.Element.symbol = function(node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.baseSetContext = this.setContext;
      this.setContext = function(ctx) {
        this.baseSetContext(ctx);

        // viewbox
        if (this.attribute('viewBox').hasValue()) {
          var viewBox = svg.ToNumberArray(this.attribute('viewBox').value);
          var minX = viewBox[0];
          var minY = viewBox[1];
          width = viewBox[2];
          height = viewBox[3];

          svg.AspectRatio(ctx,
                  this.attribute('preserveAspectRatio').value,
                  this.attribute('width').toPixels('x'),
                  width,
                  this.attribute('height').toPixels('y'),
                  height,
                  minX,
                  minY);

          svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);
        }
      }
    }
    svg.Element.symbol.prototype = new svg.Element.RenderedElementBase;

    // style element
    svg.Element.style = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      // text, or spaces then CDATA
      var css = ''
      for (var i=0; i<node.childNodes.length; i++) {
        css += node.childNodes[i].nodeValue;
      }
      css = css.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, ''); // remove comments
      css = svg.compressSpaces(css); // replace whitespace
      var cssDefs = css.split('}');
      for (var i=0; i<cssDefs.length; i++) {
        if (svg.trim(cssDefs[i]) != '') {
          var cssDef = cssDefs[i].split('{');
          var cssClasses = cssDef[0].split(',');
          var cssProps = cssDef[1].split(';');
          for (var j=0; j<cssClasses.length; j++) {
            var cssClass = svg.trim(cssClasses[j]);
            if (cssClass != '') {
              var props = {};
              for (var k=0; k<cssProps.length; k++) {
                var prop = cssProps[k].indexOf(':');
                var name = cssProps[k].substr(0, prop);
                var value = cssProps[k].substr(prop + 1, cssProps[k].length - prop);
                if (name != null && value != null) {
                  props[svg.trim(name)] = new svg.Property(svg.trim(name), svg.trim(value));
                }
              }
              svg.Styles[cssClass] = props;
              // if (cssClass == '@font-face') {
              //   var fontFamily = props['font-family'].value.replace(/"/g,'');
              //   var srcs = props['src'].value.split(',');
              //   for (var s=0; s<srcs.length; s++) {
              //     if (srcs[s].indexOf('format("svg")') > 0) {
              //       var urlStart = srcs[s].indexOf('url');
              //       var urlEnd = srcs[s].indexOf(')', urlStart);
              //       var url = srcs[s].substr(urlStart + 5, urlEnd - urlStart - 6);
              //       var doc = svg.parseXml(svg.ajax(url));
              //       var fonts = doc.getElementsByTagName('font');
              //       for (var f=0; f<fonts.length; f++) {
              //         var font = svg.CreateElement(fonts[f]);
              //         svg.Definitions[fontFamily] = font;
              //       }
              //     }
              //   }
              // }
            }
          }
        }
      }
    }
    svg.Element.style.prototype = new svg.Element.ElementBase;

    // use element
    svg.Element.use = function(node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.baseSetContext = this.setContext;
      this.setContext = function(ctx) {
        this.baseSetContext(ctx);
        if (this.attribute('x').hasValue()) ctx.translate(this.attribute('x').toPixels('x'), 0);
        if (this.attribute('y').hasValue()) ctx.translate(0, this.attribute('y').toPixels('y'));
      }

      this.getDefinition = function() {
        var element = this.getHrefAttribute().getDefinition();
        if (this.attribute('width').hasValue()) element.attribute('width', true).value = this.attribute('width').value;
        if (this.attribute('height').hasValue()) element.attribute('height', true).value = this.attribute('height').value;
        return element;
      }

      this.path = function(ctx) {
        var element = this.getDefinition();
        if (element != null) element.path(ctx);
      }

      this.getBoundingBox = function() {
        var element = this.getDefinition();
        if (element != null) return element.getBoundingBox();
      }

      this.renderChildren = function(ctx) {
        var element = this.getDefinition();
        if (element != null) {
          // temporarily detach from parent and render
          var oldParent = element.parent;
          element.parent = null;
          element.render(ctx);
          element.parent = oldParent;
        }
      }
    }
    svg.Element.use.prototype = new svg.Element.RenderedElementBase;

    // mask element
    svg.Element.mask = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function(ctx, element) {
        // render as temp svg
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');

        if (width == 0 && height == 0) {
          var bb = new svg.BoundingBox();
          for (var i=0; i<this.children.length; i++) {
            bb.addBoundingBox(this.children[i].getBoundingBox());
          }
          var x = Math.floor(bb.x1);
          var y = Math.floor(bb.y1);
          var width = Math.floor(bb.width());
          var height = Math.floor(bb.height());
        }

        // temporarily remove mask to avoid recursion
        var mask = element.attribute('mask').value;
        element.attribute('mask').value = '';

          var cMask = document.createElement('canvas');
          cMask.width = x + width;
          cMask.height = y + height;
          var maskCtx = cMask.getContext('2d');
          this.renderChildren(maskCtx);

          var c = document.createElement('canvas');
          c.width = x + width;
          c.height = y + height;
          var tempCtx = c.getContext('2d');
          element.render(tempCtx);
          tempCtx.globalCompositeOperation = 'destination-in';
          tempCtx.fillStyle = maskCtx.createPattern(cMask, 'no-repeat');
          tempCtx.fillRect(0, 0, x + width, y + height);

          ctx.fillStyle = tempCtx.createPattern(c, 'no-repeat');
          ctx.fillRect(0, 0, x + width, y + height);

        // reassign mask
        element.attribute('mask').value = mask;
      }

      this.render = function(ctx) {
        // NO RENDER
      }
    }
    svg.Element.mask.prototype = new svg.Element.ElementBase;

    // clip element
    svg.Element.clipPath = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function(ctx) {
        for (var i=0; i<this.children.length; i++) {
          var child = this.children[i];
          if (typeof(child.path) != 'undefined') {
            var transform = null;
            if (child.attribute('transform').hasValue()) {
              transform = new svg.Transform(child.attribute('transform').value);
              transform.apply(ctx);
            }
            child.path(ctx);
            ctx.clip();
            if (transform) { transform.unapply(ctx); }
          }
        }
      }

      this.render = function(ctx) {
        // NO RENDER
      }
    }
    svg.Element.clipPath.prototype = new svg.Element.ElementBase;

    // filters
    svg.Element.filter = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function(ctx, element) {
        // render as temp svg
        var bb = element.getBoundingBox();
        var x = Math.floor(bb.x1);
        var y = Math.floor(bb.y1);
        var width = Math.floor(bb.width());
        var height = Math.floor(bb.height());

        // temporarily remove filter to avoid recursion
        var filter = element.style('filter').value;
        element.style('filter').value = '';

        var px = 0, py = 0;
        for (var i=0; i<this.children.length; i++) {
          var efd = this.children[i].extraFilterDistance || 0;
          px = Math.max(px, efd);
          py = Math.max(py, efd);
        }

        var c = document.createElement('canvas');
        c.width = width + 2*px;
        c.height = height + 2*py;
        var tempCtx = c.getContext('2d');
        tempCtx.translate(-x + px, -y + py);
        element.render(tempCtx);

        // apply filters
        for (var i=0; i<this.children.length; i++) {
          this.children[i].apply(tempCtx, 0, 0, width + 2*px, height + 2*py);
        }

        // render on me
        ctx.drawImage(c, 0, 0, width + 2*px, height + 2*py, x - px, y - py, width + 2*px, height + 2*py);

        // reassign filter
        element.style('filter', true).value = filter;
      }

      this.render = function(ctx) {
        // NO RENDER
      }
    }
    svg.Element.filter.prototype = new svg.Element.ElementBase;

    svg.Element.feMorphology = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function(ctx, x, y, width, height) {
        // TODO: implement
      }
    }
    svg.Element.feMorphology.prototype = new svg.Element.ElementBase;

    svg.Element.feColorMatrix = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      function imGet(img, x, y, width, height, rgba) {
        return img[y*width*4 + x*4 + rgba];
      }

      function imSet(img, x, y, width, height, rgba, val) {
        img[y*width*4 + x*4 + rgba] = val;
      }

      this.apply = function(ctx, x, y, width, height) {
        // only supporting grayscale for now per Issue 195, need to extend to all matrix
        // assuming x==0 && y==0 for now
        var srcData = ctx.getImageData(0, 0, width, height);
        for (var y = 0; y < height; y++) {
          for (var x = 0; x < width; x++) {
            var r = imGet(srcData.data, x, y, width, height, 0);
            var g = imGet(srcData.data, x, y, width, height, 1);
            var b = imGet(srcData.data, x, y, width, height, 2);
            var gray = (r + g + b) / 3;
            imSet(srcData.data, x, y, width, height, 0, gray);
            imSet(srcData.data, x, y, width, height, 1, gray);
            imSet(srcData.data, x, y, width, height, 2, gray);
          }
        }
        ctx.clearRect(0, 0, width, height);
        ctx.putImageData(srcData, 0, 0);
      }
    }
    svg.Element.feColorMatrix.prototype = new svg.Element.ElementBase;

    svg.Element.feGaussianBlur = function(node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.blurRadius = Math.floor(this.attribute('stdDeviation').numValue());
      this.extraFilterDistance = this.blurRadius;

      this.apply = function(ctx, x, y, width, height) {
        if (typeof(stackBlurCanvasRGBA) == 'undefined') {
          if ( console && console.warn ) {
            console.warn('ERROR: StackBlur.js must be included for blur to work');
          }
          return;
        }

        // StackBlur requires canvas be on document
        ctx.canvas.id = svg.UniqueId();
        ctx.canvas.style.display = 'none';
        document.body.appendChild(ctx.canvas);
        stackBlurCanvasRGBA(ctx.canvas.id, x, y, width, height, this.blurRadius);
        document.body.removeChild(ctx.canvas);
      }
    }
    svg.Element.feGaussianBlur.prototype = new svg.Element.ElementBase;

    // title element, do nothing
    svg.Element.title = function(node) {
    }
    svg.Element.title.prototype = new svg.Element.ElementBase;

    // desc element, do nothing
    svg.Element.desc = function(node) {
    }
    svg.Element.desc.prototype = new svg.Element.ElementBase;

    svg.Element.MISSING = function(node) {}
    svg.Element.MISSING.prototype = new svg.Element.ElementBase;

    // element factory
    svg.CreateElement = function(node) {
      var className = node.nodeName.replace(/^[^:]+:/,''); // remove namespace
      className = className.replace(/\-/g,''); // remove dashes
      var e = null;
      if (typeof(svg.Element[className]) != 'undefined') {
        e = new svg.Element[className](node);
      }
      else {
        e = new svg.Element.MISSING(node);
      }

      e.type = node.nodeName;
      return e;
    }

    // load from xml
    svg.loadXml = function(ctx, xml) {
      svg.loadXmlDoc(ctx, svg.parseXml(xml));
    }

    svg.loadXmlDoc = function(ctx, dom) {
      svg.init(ctx);

      var e = svg.CreateElement(dom.documentElement);
      e.root = true;

      // render loop
      var isFirstRender = true;
      var draw = function() {
        svg.ViewPort.Clear();
        // if (ctx.canvas.parentNode) svg.ViewPort.SetCurrent(ctx.canvas.parentNode.clientWidth, ctx.canvas.parentNode.clientHeight);

        // if (svg.opts['ignoreDimensions'] != true) {
        //   // set canvas size
        //   if (e.style('width').hasValue()) {
        //     ctx.canvas.width = e.style('width').toPixels('x');
        //     ctx.canvas.style.width = ctx.canvas.width + 'px';
        //   }
        //   if (e.style('height').hasValue()) {
        //     ctx.canvas.height = e.style('height').toPixels('y');
        //     ctx.canvas.style.height = ctx.canvas.height + 'px';
        //   }
        // }
        var cWidth  = ctx.canvas.clientWidth  || ctx.canvas.width;
        var cHeight = ctx.canvas.clientHeight || ctx.canvas.height;
        // if (svg.opts['ignoreDimensions'] == true && e.style('width').hasValue() && e.style('height').hasValue()) {
        //   cWidth = e.style('width').toPixels('x');
        //   cHeight = e.style('height').toPixels('y');
        // }
        svg.ViewPort.SetCurrent(cWidth, cHeight);

        // if (svg.opts['offsetX'] != null) e.attribute('x', true).value = svg.opts['offsetX'];
        // if (svg.opts['offsetY'] != null) e.attribute('y', true).value = svg.opts['offsetY'];
        if (svg.opts['scaleWidth'] != null && svg.opts['scaleHeight'] != null) {
          var xRatio = 1, yRatio = 1, viewBox = svg.ToNumberArray(e.attribute('viewBox').value);
          if (e.attribute('width').hasValue()) xRatio = e.attribute('width').toPixels('x') / svg.opts['scaleWidth'];
          else if (!isNaN(viewBox[2])) xRatio = viewBox[2] / svg.opts['scaleWidth'];
          if (e.attribute('height').hasValue()) yRatio = e.attribute('height').toPixels('y') / svg.opts['scaleHeight'];
          else if (!isNaN(viewBox[3])) yRatio = viewBox[3] / svg.opts['scaleHeight'];

          e.attribute('width', true).value = svg.opts['scaleWidth'];
          e.attribute('height', true).value = svg.opts['scaleHeight'];
          e.attribute('viewBox', true).value = '0 0 ' + (cWidth * xRatio) + ' ' + (cHeight * yRatio);
          e.attribute('preserveAspectRatio', true).value = 'none';
        }

        // clear and render
        // ctx.clearRect(0, 0, cWidth, cHeight);

        if ( svg.opts.beforeRender ) {
          svg.opts.beforeRender( ctx );
        }

        e.render(ctx);

        if ( svg.opts.afterRender ) {
          svg.opts.afterRender();
        }
      }

      svg.imageLoadedCount = 0;
      svg.checkImageID     = null;

      if ( svg.Images.length ) {
        svg.onImageLoaded = function() {
            ++svg.imageLoadedCount;

            if ( svg.checkImageID ) {
                clearTimeout( svg.checkImageID );
                svg.checkImageID = null;
            }

            if ( svg.imageLoadedCount >= svg.Images.length ) {
                draw();
            } else {
                svg.checkImageID = setTimeout(draw, 800);
            }
        };
      } else {
        svg.onImageLoaded = function() {}
        draw();
      }

    }

    return svg;
  }
})();

});

/*
 * HTML5 Sortable jQuery Plugin
 * http://farhadi.ir/projects/html5sortable
 *
 * Copyright 2012, Ali Farhadi
 * Released under the MIT license.
 */
define('UI.sortable',["jquery"], function(){

(function($) {
var dragging, placeholders = $();
$.fn.sortable = function(options) {
  var method = String(options);
  options = $.extend({
    connectWith: false
  }, options);
  return this.each(function() {
    if (/^enable|disable|destroy$/.test(method)) {
      var items = $(this).children($(this).data('items')).attr('draggable', method == 'enable');
      if (method == 'destroy') {
        items.add(this).removeData('connectWith items')
          .off('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
      }
      return;
    }
    var isHandle, index, items = $(this).children(options.items);
    var placeholder = $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="sortable-placeholder">');
    items.find(options.handle).mousedown(function() {
      isHandle = true;
    }).mouseup(function() {
      isHandle = false;
    });
    $(this).data('items', options.items)
    placeholders = placeholders.add(placeholder);
    if (options.connectWith) {
      $(options.connectWith).add(this).data('connectWith', options.connectWith);
    }
    items.attr('draggable', 'true').on('dragstart.h5s', function(e) {
      if (options.handle && !isHandle) {
        return false;
      }
      isHandle = false;
      var dt = e.originalEvent.dataTransfer;
      dt.effectAllowed = 'move';
      dt.setData('Text', 'dummy');
      index = (dragging = $(this)).addClass('sortable-dragging').index();
    }).on('dragend.h5s', function() {
      if (!dragging) {
        return;
      }
      dragging.removeClass('sortable-dragging').show();
      placeholders.detach();
      if (index != dragging.index()) {
        dragging.parent().trigger('sortupdate', {item: dragging});
      }
      dragging = null;
    }).not('a[href], img').on('selectstart.h5s', function() {
      this.dragDrop && this.dragDrop();
      return false;
    }).end().add([this, placeholder]).on('dragover.h5s dragenter.h5s drop.h5s', function(e) {
      if (!items.is(dragging) && options.connectWith !== $(dragging).parent().data('connectWith')) {
        return true;
      }
      if (e.type == 'drop') {
        e.stopPropagation();
        placeholders.filter(':visible').after(dragging);
        dragging.trigger('dragend.h5s');
        return false;
      }
      e.preventDefault();
      e.originalEvent.dataTransfer.dropEffect = 'move';
      if (items.is(this)) {
        if (options.forcePlaceholderSize) {
          placeholder.height(dragging.outerHeight());
        }
        dragging.hide();
        $(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
        placeholders.not(placeholder).detach();
      } else if (!placeholders.is(this) && !$(this).children(options.items).length) {
        placeholders.detach();
        $(this).append(placeholder);
      }
      return false;
    });
  });
};
})(jQuery);

});

/*
#**********************************************************
#* Filename: UI.parsley
#* Creator: Tim
#* Description: UI.parsley
#* Date: 20130813
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/
define('UI.parsley',["jquery"], function(){

!function($) {

  var Util = {

    runOnceInSametime: function( func, context ) {
      var runs = 0;
      return function() {
        runs ++;
        context = context || this;
        var args = arguments;
        setTimeout( function() {
          runs --;
          if ( runs > 0 ) {
            return;
          }
          func.apply( context, args );
        }, 50);

      }
    },

    getCaretPosition: function( oField ) {
      // Initialize
      var iCaretPos = 0;

      // IE Support
      if (document.selection) {

        // Set focus on the element
        oField.focus ();

        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange ();

        // Move selection start to 0 position
        oSel.moveStart ('character', -oField.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
      }

      // Firefox support
      else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionStart;

      // Return results
      return (iCaretPos);

    },
    setCaretPosition: function( elem, caretPos ) {
      if ( elem instanceof $ )
        elem = elem.get( 0 );

      if (elem != null) {
          if(elem.createTextRange) {
              var range = elem.createTextRange();
              range.move('character', caretPos);
              range.select();
          } else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            } else {
                elem.focus();
            }
          }
      }
    },

    prefixMatch : function(regex, input, pattern){
      pattern = pattern || '';
      var start = regex.slice(0, 1) === '^' ? 1 : 0;
      var end = regex.slice(-1) === '$' ? '': '$';
      for (var i = start; i <= regex.length; i ++){
        var prefix_regex = regex.slice(0, i);
        try {
          var match = new RegExp(prefix_regex + end, pattern).test(input)
        } catch( e ) {
          continue;
        }
        if(match) return true;
      }
      return false;
    },

    getCharFromKeyEvent: function( e ) {
      var c, keyType;
      var keyCode = e.which;
      var shift = e.shiftKey;
      var ctrl = e.ctrlKey || e.metaKey;

      var isLetterKey = keyCode >= 65 && keyCode <= 90;
      var isNumKey = keyCode  >= 48 && keyCode <= 57;
      var isSmallNumKey = keyCode  >= 96 && keyCode <= 105;


      var controlCodeList = [8,9,13,16,19,20,27,33,34,35,36,37,38,39,40,45,46,112,113,114,115,116,117,118,119,120,121,122,123,144,145];
      var controlNameList = ['BackSpace','Tab','Enter','Shift','Pause','CapsLock','Escape','PageUp','PageDown','End','Move','Left','Up','Right','Down','Insert','Delete','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','NumsLock','Home'];

      var shiftMap = {
        192: '~',
        49: '!',
        50: '@',
        51: '#',
        52: '$',
        53: '%',
        54: '^',
        55: '&',
        56: '*',
        57: '(',
        48: ')',
        189: '_',
        187: '+',
        219: '{',
        221: '}',
        220: '|',
        186: ':',
        222: '"',
        188: '<',
        190: '>',
        191: '?'
        };

      var otherMap = {
        //other key in small keyboard
        106: '*',
        107: '+',
        108: 'Enter',
        109: '-',
        110: '.',
        111: '/',
        //other key in main keyboard
        192: '`',
        189: '-',
        187: '=',
        219: '[',
        221: ']',
        220: '\\',
        186: ';',
        222: "'",
        188: ',',
        190: '.',
        191: '/',
        32: ' '
      }



      if ( isLetterKey ) {
        if ( ctrl ) {
          c = 'ctrlFunc';
        } else {
          c = String.fromCharCode( keyCode );
        }
      } else if ( isNumKey && !shift ) {
        c = String.fromCharCode( keyCode );
      } else if ( isSmallNumKey ){
        c = String.fromCharCode( keyCode - 48 );
      } else if ( $.inArray( keyCode, controlCodeList ) !== -1 ) {
        var index = $.inArray( keyCode, controlCodeList );
        c = controlNameList[ index ];
      } else if ( shift ) {
        c = shiftMap[ keyCode ];
      } else if ( keyCode in otherMap ) {
        c = otherMap[ keyCode ];
      }

      return c;

    }
  }
/*
 * Parsley.js allows you to verify your form inputs frontend side, without writing a line of javascript. Or so..
 *
 * Author: Guillaume Potier - @guillaumepotier
*/

!function ($, Util) {

  

  /**
  * Validator class stores all constraints functions and associated messages.
  * Provides public interface to add, remove or modify them
  *
  * @class Validator
  * @constructor
  */
  var Validator = function ( options ) {
    /**
    * Error messages
    *
    * @property messages
    * @type {Object}
    */
    this.messages = {
        defaultMessage: "This value seems to be invalid."
      , type: {
            email:      "This value should be a valid email."
          , url:        "This value should be a valid url."
          , urlstrict:  "This value should be a valid url."
          , number:     "This value should be a valid number."
          , digits:     "This value should be digits."
          , dateIso:    "This value should be a valid date (YYYY-MM-DD)."
          , alphanum:   "This value should be alphanumeric."
          , phone:      "This value should be a valid phone number."
          , usPhone:    "This value should be a valid US phone number."

         // hack
          , ipaddress: "This value should be a valid ip address."
          , ipv4:      "This value should be a valid IPv4 address."
          , cidr:      "This value should be a valid CIDR."
          , awsCidr:   "This value should be a valid CIDR and the netmask ('16') must be between 16 and 28."
          , awsName:   "This value should be a valid AWS name."
          , domain:    "This value should be a valid domain."
          , ascii:     "This value should be a valid ascii."

        }
      , notnull:        "This value should not be null."
      , notblank:       "This value should not be blank."
      , required:       "This value is required."
      , regexp:         "This value seems to be invalid."
      , min:            "This value should be greater than or equal to %s."
      , max:            "This value should be lower than or equal to %s."
      , range:          "This value should be between %s and %s."
      , minlength:      "This value is too short. It should have %s characters or more."
      , maxlength:      "This value is too long. It should have %s characters or less."
      , rangelength:    "This value length is invalid. It should be between %s and %s characters long."
      , mincheck:       "You must select at least %s choices."
      , maxcheck:       "You must select %s choices or less."
      , rangecheck:     "You must select between %s and %s choices."
      , equalto:        "This value should be the same."
    },

    this.init( options );
  };

  Validator.prototype = {

    constructor: Validator

    /**
    * Validator list. Built-in validators functions
    *
    * @property validators
    * @type {Object}
    */
    , validators: {
      notnull: function ( val ) {
        return val.length > 0;
      }

      , notblank: function ( val ) {
        return 'string' === typeof val && '' !== val.replace( /^\s+/g, '' ).replace( /\s+$/g, '' );
      }

      // Works on all inputs. val is object for checkboxes
      , required: function ( val ) {

        // for checkboxes and select multiples. Check there is at least one required value
        if ( 'object' === typeof val ) {
          for ( var i in val ) {
            if ( this.required( val[ i ] ) ) {
              return true;
            }
          }

          return false;
        }

        return this.notnull( val ) && this.notblank( val );
      },

      custom: function ( val, option , context ) {
        var thisArg, now, result;
        thisArg = option.thisArg || window;
        result = option.validator.call( thisArg, val );

        if ( result ) {
          context.Validator.addMessage( 'custom', result );
          return false;
        } else {
          return true;
        }
      }

      , type: function ( val, type ) {
        var regExp;

        switch ( type ) {
          case 'number':
            regExp = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
            break;
          case 'digits':
            regExp = /^\d+$/;
            break;
          case 'alphanum':
            regExp = /^\w+$/;
            break;
          case 'email':
            regExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
            break;
          case 'url':
            val = new RegExp( '(https?|s?ftp|git)', 'i' ).test( val ) ? val : 'http://' + val;
            /* falls through */
          case 'urlstrict':
            regExp = /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
            break;
          case 'dateIso':
            regExp = /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/;
            break;
          case 'phone':
            regExp = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
            break;

          // hack
          case 'ipaddress':
            regExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(\d|[1-2]\d|3[0-2]))?$/;
            break;

          case 'ipv4':
            regExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
            break;

          case 'cidr':
            regExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(\d|[1-2]\d|3[0-2]))$/;
            break;

          case 'awsCidr':
            regExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([1][6789]|[2]\d|3[0-2]))$/;
            break;

         case 'awsName':
           regExp = /^[a-zA-Z0-9][a-zA-Z0-9-]*$/;
           break;

          case 'domain':
           regExp = /^([a-zA-Z0-9-\u4e00-\u9fa5]+\.)+([a-zA-Z-\u4e00-\u9fa5]+)$/;
           break;

          case 'ascii':
           regExp = /^[\x00-\x7F]+$/;
           break;

          case 'usPhone':
           regExp = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
           break;

          default:
            return false;
        }

        // test regExp if not null
        return '' !== val ? regExp.test( val ) : false;
      }

      , regexp: function ( val, regExp, self ) {
        return new RegExp( regExp, self.options.regexpFlag || '' ).test( val );
      }

      , minlength: function ( val, min ) {
        return val.length >= min;
      }

      , maxlength: function ( val, max ) {
        return val.length <= max;
      }

      , rangelength: function ( val, arrayRange ) {
        return this.minlength( val, arrayRange[ 0 ] ) && this.maxlength( val, arrayRange[ 1 ] );
      }

      , min: function ( val, min ) {
        return Number( val ) >= min;
      }

      , max: function ( val, max ) {
        return Number( val ) <= max;
      }

      , range: function ( val, arrayRange ) {
        return val >= arrayRange[ 0 ] && val <= arrayRange[ 1 ];
      }

      , equalto: function ( val, elem, self ) {
        self.options.validateIfUnchanged = true;

        return val === $( elem ).val();
      }

      , remote: function ( val, url, self ) {
        var result = null
          , data = {}
          , dataType = {};

        data[ self.$element.attr( 'name' ) ] = val;

        if ( 'undefined' !== typeof self.options.remoteDatatype ) {
          dataType = { dataType: self.options.remoteDatatype };
        }

        var manage = function ( isConstraintValid, message ) {
          // remove error message if we got a server message, different from previous message
          if ( 'undefined' !== typeof message && 'undefined' !== typeof self.Validator.messages.remote && message !== self.Validator.messages.remote ) {
            $( self.ulError + ' .remote' ).remove();
          }

          self.updtConstraint( { name: 'remote', valid: isConstraintValid }, message );
          self.manageValidationResult();
        };

        // transform string response into object
        var handleResponse = function ( response ) {
          if ( 'object' === typeof response ) {
            return response;
          }

          try {
            response = $.parseJSON( response );
          } catch ( err ) {}

          return response;
        }

        var manageErrorMessage = function ( response ) {
          return 'object' === typeof response && null !== response ? ( 'undefined' !== typeof response.error ? response.error : ( 'undefined' !== typeof response.message ? response.message : null ) ) : null;
        }

        $.ajax( $.extend( {}, {
            url: url
          , data: data
          , type: self.options.remoteMethod || 'GET'
          , success: function ( response ) {
            response = handleResponse( response );
            manage( 1 === response || true === response || ( 'object' === typeof response && null !== response && 'undefined' !== typeof response.success ), manageErrorMessage( response )
            );
          }
          , error: function ( response ) {
            response = handleResponse( response );
            manage( false, manageErrorMessage( response ) );
          }
        }, dataType ) );

        return result;
      }

      /**
      * Aliases for checkboxes constraints
      */
      , mincheck: function ( obj, val ) {
        return this.minlength( obj, val );
      }

      , maxcheck: function ( obj, val ) {
        return this.maxlength( obj, val);
      }

      , rangecheck: function ( obj, arrayRange ) {
        return this.rangelength( obj, arrayRange );
      }
    }

    /*
    * Register custom validators and messages
    */
    , init: function ( options ) {
      var customValidators = options.validators
        , customMessages = options.messages;

      var key;
      for ( key in customValidators ) {
        this.addValidator(key, customValidators[ key ]);
      }

      for ( key in customMessages ) {
        this.addMessage(key, customMessages[ key ]);
      }
    }

    /**
    * Replace %s placeholders by values
    *
    * @method formatMesssage
    * @param {String} message Message key
    * @param {Mixed} args Args passed by validators functions. Could be string, number or object
    * @return {String} Formatted string
    */
    , formatMesssage: function ( message, args ) {

      if ( 'object' === typeof args ) {
        for ( var i in args ) {
          message = this.formatMesssage( message, args[ i ] );
        }

        return message;
      }

      return 'string' === typeof message ? message.replace( new RegExp( '%s', 'i' ), args ) : '';
    }

    /**
    * Add / override a validator in validators list
    *
    * @method addValidator
    * @param {String} name Validator name. Will automatically bindable through data-name=''
    * @param {Function} fn Validator function. Must return {Boolean}
    */
    , addValidator: function ( name, fn ) {
      this.validators[ name ] = fn;
    }

    /**
    * Add / override error message
    *
    * @method addMessage
    * @param {String} name Message name. Will automatically be binded to validator with same name
    * @param {String} message Message
    */
    , addMessage: function ( key, message, type ) {

      if ( 'undefined' !== typeof type && true === type ) {
        this.messages.type[ key ] = message;
        return;
      }

      // custom types messages are a bit tricky cuz' nested ;)
      if ( 'type' === key ) {
        for ( var i in message ) {
          this.messages.type[ i ] = message[ i ];
        }

        return;
      }

      this.messages[ key ] = message;
    }
  };

  /**
  * ParsleyField class manage each form field inside a validated Parsley form.
  * Returns if field valid or not depending on its value and constraints
  * Manage field error display and behavior, event triggers and more
  *
  * @class ParsleyField
  * @constructor
  */
  var ParsleyField = function ( element, options, type ) {
    this.options = options;
    this.Validator = new Validator( options );

    // if type is ParsleyFieldMultiple, just return this. used for clone
    if ( type === 'ParsleyFieldMultiple' ) {
      return this;
    }

    this.init( element, type || 'ParsleyField' );
  };

  ParsleyField.prototype = {

    constructor: ParsleyField

    /**
    * Set some properties, bind constraint validators and validation events
    *
    * @method init
    * @param {Object} element
    * @param {Object} options
    */
    , init: function ( element, type ) {
      this.type = type;
      this.valid = true;
      this.element = element;
      this.validatedOnce = false;
      this.$element = $( element );
      this.val = this.$element.val();
      this.isRequired = false;
      this.isRequiredRollback = false;
      this.constraints = {};

      // overriden by ParsleyItemMultiple if radio or checkbox input
      if ( 'undefined' === typeof this.isRadioOrCheckbox ) {
        this.isRadioOrCheckbox = false;
        this.hash = this.generateHash();
        this.errorClassHandler = this.options.errors.classHandler( element, this.isRadioOrCheckbox ) || this.$element;
      }

      // error ul dom management done only once at init
      this.ulErrorManagement();

      // bind some html5 properties
      this.bindHtml5Constraints();

      // bind validators to field
      this.addConstraints();

      // bind parsley events if validators have been registered
      if ( this.hasConstraints() ) {
        this.bindValidationEvents();
        var result = this.Validator.validators['required']( this.val );
      }

        // hack
        var that = this;

        // required rollback function
        if (this.$element.data('required-rollback') === true) {
          this.isRequiredRollback = true;


          this.$element
            .on('focus', function() {
              $(this).data('pre-value', $(this).val());
            })
            .on('blur', function(){
              var result = that.Validator.validators[ 'required' ]( $(this).val() );

              if (!result) {
                $(this).val($(this).data('pre-value'));
               $(this).parsley('validate');
              }
            });

        }

        // hack
        // Ignore disallowed input
        var that = this;
        var controlCodeList = [8,9,13,16,19,20,27,33,34,35,36,37,38,39,40,45,46,112,113,114,115,116,117,118,119,120,121,122,123,144,145];

        if ( this.$element.data( 'ignore' ) === true ) {
          var regExp, regMap, vlidateType;
          regMap = {
            cidr: '^[0-9]?$|^[0-9][0-9./]+$',
            awsCidr: '^[0-9]?$|^[0-9][0-9./]+$',
            ipv4: '^[0-9]*$|^[0-9][0-9.]+$',
            ipaddress: '^[0-9]*$|^[0-9][0-9./]+$',
            domain: '^[a-zA-Z0-9]+[a-zA-Z0-9.-]*$',
            digits: '^[0-9]*$',
            ascii: '^[\x00-\x7F]*$',
            number: '^-?[0-9]*$|^-?[0-9]+\\.[0-9]*$'
          };

          vlidateType = this.options.type;

          regExp = regExp || this.$element.data('ignore-regexp') || regMap[ vlidateType ] || '^[0-9a-zA-Z]+[0-9a-zA-Z-]*$';

          var symbols = [ ['。', '.'], ['、', '/'] ];

          var wholeReg = this.options.regexp;
          // delay handler function
          var delayHandlerFactory = function(origin, context, times) {
            var getResult = function(val) {
              return that.Validator.validators[ 'regexp' ]( val, regExp, that );
            };

            return function( e ) {
                // run specify times
                if ( (times -= 1) < 0 ) {
                  return;
                }
                var value = $( context ).val();
                if ( value === '' ) {
                  return;
                }

                var result = getResult( value );

                if ( !result ) {
                  $( context ).val( origin ).parsley( 'validate' );
                }
              };

          };

          // Handle paste and drop
          this.$element.on( 'drop paste', function( e ) {
            var origin = $( this ).val();
            var delayHandler = delayHandlerFactory( origin, this, 1 );
            setTimeout( delayHandler, 1 );
          });

          // Handle Chinese
          var keydownHandler = function(e) {
            if ( e.which === 229 ) {
              var origin = $( this ).val();
              var delayHandler = delayHandlerFactory( origin, this, 1 );
              $( this ).one( 'keyup', delayHandler );
              return false;
            }
          };

          var transformSymbol = function(charStr) {
            for ( var i=0; i<symbols.length; i++ ) {
              if ( symbols[ i ][ 0 ] === charStr )
                return symbols[ i ][ 1 ];
            }
          }

          // Handle keypress( main )
          var ignoreHandler = function(e) {

            var inputChar, isLegal;
            // control key green light
            if (e.which in controlCodeList) return true;

            inputChar = String.fromCharCode( e.which );

            var transform = transformSymbol( inputChar )

            if ( transform ) {
              inputChar = transform;
            }

            var valueArray = this.value.split( '' );
            var pos = Util.getCaretPosition( this );
            valueArray.splice( pos, 0, inputChar );



            var newValue = valueArray.join( '' );
            isLegal = new RegExp( regExp, "i" ).test(newValue);

            if ( !isLegal ) return false;
            if ( transform ) {
              this.value = newValue;
              Util.setCaretPosition( this, pos + 1 );
              return false;
            }

          };

          this.$element.on( 'keypress', ignoreHandler );
          this.$element.on( 'keydown', keydownHandler );

        }


      }


    , setParent: function ( elem ) {
      this.$parent = $( elem );
    }

    , getParent: function () {
      return this.$parent;
    }

    /**
    * Bind some extra html5 types / validators
    *
    * @private
    * @method bindHtml5Constraints
    */
    , bindHtml5Constraints: function () {
      // add html5 required support + class required support
      if ( this.$element.hasClass( 'required' ) || this.$element.prop( 'required' ) ) {
        this.options.required = true;
      }

      // add html5 supported types & options
      if ( 'undefined' !== typeof this.$element.attr( 'type' ) && new RegExp( this.$element.attr( 'type' ), 'i' ).test( 'email url number range' ) ) {
        this.options.type = this.$element.attr( 'type' );

        // number and range types could have min and/or max values
        if ( new RegExp( this.options.type, 'i' ).test( 'number range' ) ) {
          this.options.type = 'number';

          // double condition to support jQuery and Zepto.. :(
          if ( 'undefined' !== typeof this.$element.attr( 'min' ) && this.$element.attr( 'min' ).length ) {
            this.options.min = this.$element.attr( 'min' );
          }

          if ( 'undefined' !== typeof this.$element.attr( 'max' ) && this.$element.attr( 'max' ).length ) {
            this.options.max = this.$element.attr( 'max' );
          }
        }
      }

      if ( 'string' === typeof this.$element.attr( 'pattern' ) && this.$element.attr( 'pattern' ).length ) {
          this.options.regexp = this.$element.attr( 'pattern' );
      }

    }

    /**
    * Attach field validators functions passed through data-api
    *
    * @private
    * @method addConstraints
    */
    , addConstraints: function () {
      for ( var constraint in this.options ) {
        var addConstraint = {};
        addConstraint[ constraint ] = this.options[ constraint ];
        this.addConstraint( addConstraint, true );
      }
    }

    /**
    * Dynamically add a new constraint to a field
    *
    * @method addConstraint
    * @param {Object} constraint { name: requirements }
    */
    , addConstraint: function ( constraint, doNotUpdateValidationEvents ) {
        for ( var name in constraint ) {
          name = name.toLowerCase();

          if ( 'function' === typeof this.Validator.validators[ name ] ) {
            this.constraints[ name ] = {
                name: name
              , requirements: constraint[ name ]
              , valid: null
            }

            if ( name === 'required' ) {
              this.isRequired = true;
            }

            this.addCustomConstraintMessage( name );
          }
        }

        // force field validation next check and reset validation events
        if ( 'undefined' === typeof doNotUpdateValidationEvents ) {
          this.bindValidationEvents();
        }
    }

    /**
    * Dynamically update an existing constraint to a field.
    * Simple API: { name: requirements }
    *
    * @method updtConstraint
    * @param {Object} constraint
    */
    , updateConstraint: function ( constraint, message ) {
      for ( var name in constraint ) {
        this.updtConstraint( { name: name, requirements: constraint[ name ], valid: null }, message );
      }
    }

    /**
    * Dynamically update an existing constraint to a field.
    * Complex API: { name: name, requirements: requirements, valid: boolean }
    *
    * @method updtConstraint
    * @param {Object} constraint
    */
    , updtConstraint: function ( constraint, message ) {
      this.constraints[ constraint.name ] = $.extend( true, this.constraints[ constraint.name ], constraint );

      if ( 'string' === typeof message ) {
        this.Validator.messages[ constraint.name ] = message ;
      }

      // force field validation next check and reset validation events
      this.bindValidationEvents();
    }

    /**
    * Dynamically remove an existing constraint to a field.
    *
    * @method removeConstraint
    * @param {String} constraintName
    */
    , removeConstraint: function ( constraintName ) {
      var constraintName = constraintName.toLowerCase();

      delete this.constraints[ constraintName ];

      if ( constraintName === 'required' ) {
        this.isRequired = false;
      }

      // if there are no more constraint, destroy parsley instance for this field
      if ( !this.hasConstraints() ) {
        // in a form context, remove item from parent
        if ( 'ParsleyForm' === typeof this.getParent() ) {
          this.getParent().removeItem( this.$element );
          return;
        }

        this.destroy();
        return;
      }

      this.bindValidationEvents();
    }

    /**
    * Add custom constraint message, passed through data-API
    *
    * @private
    * @method addCustomConstraintMessage
    * @param constraint
    */
    , addCustomConstraintMessage: function ( constraint ) {
      // custom message type data-type-email-message -> typeEmailMessage | data-minlength-error => minlengthMessage
      var customMessage = constraint
        + ( 'type' === constraint && 'undefined' !== typeof this.options[ constraint ] ? this.options[ constraint ].charAt( 0 ).toUpperCase() + this.options[ constraint ].substr( 1 ) : '' )
        + 'Message';

      if ( 'undefined' !== typeof this.options[ customMessage ] ) {
        this.Validator.addMessage( 'type' === constraint ? this.options[ constraint ] : constraint, this.options[ customMessage ], 'type' === constraint );
      }
    }

    /**
    * Bind validation events on a field
    *
    * @private
    * @method bindValidationEvents
    */
    , bindValidationEvents: function () {
      // this field has validation events, that means it has to be validated
      this.valid = null;
      this.$element.addClass( 'parsley-validated' );

      // remove eventually already binded events
      this.$element.off( '.' + this.type );

      // force add 'change' event if async remote validator here to have result before form submitting
      if ( this.options.remote && !new RegExp( 'change', 'i' ).test( this.options.trigger ) ) {
        this.options.trigger = !this.options.trigger ? 'change' : ' change';
      }

      // alaways bind keyup event, for better UX when a field is invalid
      var triggers = ( !this.options.trigger ? '' : this.options.trigger )
        + ( new RegExp( 'key', 'i' ).test( this.options.trigger ) ? '' : ' keyup' );

      // alaways bind change event, for better UX when a select is invalid
      if ( this.$element.is( 'select' ) ) {
        triggers += new RegExp( 'change', 'i' ).test( triggers ) ? '' : ' change';
      }

      // trim triggers to bind them correctly with .on()
      triggers = triggers.replace( /^\s+/g , '' ).replace( /\s+$/g , '' );

      this.$element.on( ( triggers + ' ' ).split( ' ' ).join( '.' + this.type + ' ' ), false, $.proxy( this.eventValidation, this ) );
    }

    /**
    * Hash management. Used for ul error
    *
    * @method generateHash
    * @returns {String} 5 letters unique hash
    */
    , generateHash: function () {
      return 'parsley-' + ( Math.random() + '' ).substring( 2 );
    }

    /**
    * Public getHash accessor
    *
    * @method getHash
    * @returns {String} hash
    */
    , getHash: function () {
      return this.hash;
    }

    /**
    * Returns field val needed for validation
    * Special treatment for radio & checkboxes
    *
    * @method getVal
    * @returns {String} val
    */
    , getVal: function () {
      return this.$element.data('value') || this.$element.val();
    }

    /**
    * Called when validation is triggered by an event
    * Do nothing if val.length < this.options.validationMinlength
    *
    * @method eventValidation
    * @param {Object} event jQuery event
    */
    , eventValidation: function ( event ) {
      var val = this.getVal();


      // do nothing on keypress event if not explicitely passed as data-trigger and if field has not already been validated once
      if ( event.type === 'keyup' && !/keyup/i.test( this.options.trigger ) && !this.validatedOnce ) {
        return true;
      }

      // do nothing on change event if not explicitely passed as data-trigger and if field has not already been validated once
      if ( event.type === 'change' && !/change/i.test( this.options.trigger ) && !this.validatedOnce ) {
        return true;
      }

      // start validation process only if field has enough chars and validation never started
      if ( !this.isRadioOrCheckbox && val.length < this.options.validationMinlength && !this.validatedOnce ) {
        return true;
      }

      // hack

      var result = this.validate();

      // if trigger is focus and not validate then refocus
      var target = $( event.currentTarget );
      if ( !result && event.type === 'focusout' && target.data('focus-back') === true ) {
        target.focus();
      }
      // hackend
    }

    /**
    * Return if field verify its constraints
    *
    * @method isValid
    * @return {Boolean} Is field valid or not
    */
    , isValid: function () {
      return this.validate( false );
    }

    /**
    * Return if field has constraints
    *
    * @method hasConstraints
    * @return {Boolean} Is field has constraints or not
    */
    , hasConstraints: function () {
      for ( var constraint in this.constraints ) {
        return true;
      }

      return false;
    }

    /**
    * Validate a field & display errors
    *
    * @method validate
    * @param {Boolean} errorBubbling set to false if you just want valid boolean without error bubbling next to fields
    * @return {Boolean} Is field valid or not
    */
    , validate: function ( errorBubbling ) {
      var val = this.getVal()
        , valid = null;

      // do not even bother trying validating a field w/o constraints
      if ( !this.hasConstraints() && !this.isRequiredRollback ) {
        //return null;
        return true;
      }

      // reset Parsley validation if onFieldValidate returns true, or if field is empty and not required
      if ( this.options.listeners.onFieldValidate( this.element, this ) || ( '' === val && !this.isRequired && !this.isRequiredRollback ) ) {
        this.reset();
        //return null;
        return true;
      }

      // do not validate a field already validated and unchanged !
      if ( !this.needsValidation( val ) ) {
        return this.valid;
      }

      valid = this.applyValidators();

      if ( 'undefined' !== typeof errorBubbling ? errorBubbling : this.options.showErrors ) {
        this.manageValidationResult();
      }

      if ( valid === null ) valid = true;

      if ( valid && this.isRequiredRollback ) {
        valid = this.Validator.validators[ 'required' ]( val );
      }

      return valid;
    }

    , validateForm: function () {
      var parent = this.getParent();
      if ( parent ) {
        parent = parent[ 0 ];

      } else {
        parent = this.$element.closest('form, [data-bind=true]');
        parent = parent.parsley();
      }

      for ( var i in parent.items ) {
        var item = parent.items[ i ];
        item.options.validateIfUnchanged = true;
      }
      return parent.validate();
    }
    /**
    * Check if value has changed since previous validation
    *
    * @method needsValidation
    * @param value
    * @return {Boolean}
    */
    , needsValidation: function ( val ) {
      if ( !this.options.validateIfUnchanged && this.valid !== null && this.val === val && this.validatedOnce ) {
        return false;
      }

      this.val = val;
      return this.validatedOnce = true;
    }

    /**
    * Loop through every fields validators
    * Adds errors after unvalid fields
    *
    * @method applyValidators
    * @return {Mixed} {Boolean} If field valid or not, null if not validated
    */
    , applyValidators: function () {
      var valid = null;

      for ( var constraint in this.constraints ) {
        var result = this.Validator.validators[ this.constraints[ constraint ].name ]( this.val, this.constraints[ constraint ].requirements, this );

        if ( false === result ) {
          valid = false;
          this.constraints[ constraint ].valid = valid;
          this.options.listeners.onFieldError( this.element, this.constraints, this );
        } else if ( true === result ) {
          this.constraints[ constraint ].valid = true;
          valid = false !== valid;
          this.options.listeners.onFieldSuccess( this.element, this.constraints, this );
        }
      }

      return valid;
    }

    /**
    * Fired when all validators have be executed
    * Returns true or false if field is valid or not
    * Display errors messages below failed fields
    * Adds parsley-success or parsley-error class on fields
    *
    * @method manageValidationResult
    * @return {Boolean} Is field valid or not
    */
    , manageValidationResult: function () {
      var valid = null;

      for ( var constraint in this.constraints ) {
        if ( false === this.constraints[ constraint ].valid ) {
          this.manageError( this.constraints[ constraint ] );
          valid = false;
        } else if ( true === this.constraints[ constraint ].valid ) {
          this.removeError( this.constraints[ constraint ].name );
          valid = false !== valid;
        }
      }

      this.valid = valid;

      if ( true === this.valid ) {
        this.removeErrors();
        this.errorClassHandler.removeClass( this.options.errorClass ).addClass( this.options.successClass );
        errortip.purge( this.hash );
        return true;
      } else if ( false === this.valid ) {
        this.errorClassHandler.removeClass( this.options.successClass ).addClass( this.options.errorClass );
        errortip.first( this.element );
        return false;
      }

      return valid;
    }

    // hack for manual error control
    , showError: function ( message ) {
      if ( message ) {
        this.options.errorMessage = message;
      }

      this.manageError( {} );
    }

    , hideError: function () {
        this.removeErrors();
        this.errorClassHandler.removeClass( this.options.errorClass ).addClass( this.options.successClass );
    }

    // hack for manual error control end
    , custom: function ( option ) {
      //for ( var constraint in this.constraints ) {
        //this.removeConstraint( constraint );
        //delete this.options[ constraint ];
      //}
      //this.$element.addClass( 'parsley-validated' );
      var validator, now, thisArg;

      if ( typeof option === 'function' ) {
        validator = option;
      } else {
        validator = option.validator;
        now = option.now;
        thisArg = option.thisArg;
      }


      var addConstraint = {};
      addConstraint.custom = { validator: validator, thisArg: thisArg };
      this.addConstraint( addConstraint, true );
      this.bindValidationEvents();

      if ( now ) {
        this.validate();
      }

    }
    // hack for custom validate function

    // hack for custom validate function end

    /**
    * Manage ul error Container
    *
    * @private
    * @method ulErrorManagement
    */
    , ulErrorManagement: function () {
      this.ulError = '#' + this.hash;
      this.ulTemplate = $( this.options.errors.errorsWrapper )
                          .attr( 'id', this.hash )
                          .addClass( 'parsley-error-list' );
    }

    /**
    * Remove li / ul error
    *
    * @method removeError
    * @param {String} constraintName Method Name
    */
    , removeError: function ( constraintName ) {
      var liError = this.ulError + ' .' + constraintName
        , that = this;

      this.options.animate ? $( liError ).fadeOut( this.options.animateDuration, function () {
        $( this ).remove();

        if ( that.ulError && $( that.ulError ).children().length === 0 ) {
          that.removeErrors();
        } } ) : $( liError ).remove();

      // remove li error, and ul error if no more li inside
      if ( this.ulError && $( this.ulError ).children().length === 0 ) {
        this.removeErrors();
      }
    }

    /**
    * Add li error
    *
    * @method addError
    * @param {Object} { minlength: "error message for minlength constraint" }
    */
    , addError: function ( error ) {
      for ( var constraint in error ) {
        var liTemplate = $( this.options.errors.errorElem ).addClass( constraint );

        $( this.ulError ).append( this.options.animate ? $( liTemplate ).html( error[ constraint ] ).hide().fadeIn( this.options.animateDuration ) : $( liTemplate ).html( error[ constraint ] ) );
      }
    }

    /**
    * Remove all ul / li errors
    *
    * @method removeErrors
    */
    , removeErrors: function () {
      this.options.animate ? $( this.ulError ).fadeOut( this.options.animateDuration, function () { $( this ).remove(); } ) : $( this.ulError ).remove();
    }

    /**
    * Remove ul errors and parsley error or success classes
    *
    * @method reset
    */
    , reset: function () {
      this.valid = null;
      this.removeErrors();
      this.validatedOnce = false;
      this.errorClassHandler.removeClass( this.options.successClass ).removeClass( this.options.errorClass );

      for ( var constraint in this.constraints ) {
        this.constraints[ constraint ].valid = null;
      }

      return this;
    }

    /**
    * Add li / ul errors messages
    *
    * @method manageError
    * @param {Object} constraint
    */
    , manageError: function ( constraint ) {
      // display ulError container if it has been removed previously (or never shown)
      if ( !$( this.ulError ).length ) {
        this.manageErrorContainer();
      }
      this.ulTemplate.data( 'uid', ( Math.random() + '' ).substring( 2 ) + $.now() );
      // TODO: refacto properly
      // if required constraint but field is not null, do not display
      if ( 'required' === constraint.name && null !== this.getVal() && this.getVal().length > 0 ) {
        return;
      // if empty required field and non required constraint fails, do not display
      } else if ( this.isRequired && 'required' !== constraint.name && ( null === this.getVal() || 0 === this.getVal().length ) ) {
        return;
      }

      // TODO: refacto error name w/ proper & readable function
      var constraintName = constraint.name
        , liClass = false !== this.options.errorMessage ? 'custom-error-message' : constraintName
        , liError = {}
        , message = false !== this.options.errorMessage ? this.options.errorMessage : ( constraint.name === 'type' ?
            this.Validator.messages[ constraintName ][ constraint.requirements ] : ( 'undefined' === typeof this.Validator.messages[ constraintName ] ?
              this.Validator.messages.defaultMessage : this.Validator.formatMesssage( this.Validator.messages[ constraintName ], constraint.requirements ) ) );


      // add liError if not shown. Do not add more than once custom errorMessage if exist
      if ( !$( this.ulError + ' .' + liClass ).length ) {
        liError[ liClass ] = message;
        this.addError( liError );
      } else if ( liClass === 'custom' ) {
        $( this.ulError + ' .' + liClass ).text( message );
      }
    }

    /**
    * Create ul error container
    *
    * @method manageErrorContainer
    */
    , manageErrorContainer: function () {
      var errorContainer = this.options.errorContainer || this.options.errors.container( this.element, this.isRadioOrCheckbox )
        , ulTemplate = this.options.animate ? this.ulTemplate.show() : this.ulTemplate;

      if ( 'undefined' !== typeof errorContainer ) {
        $( errorContainer ).append( ulTemplate );
        return;
      }

      !this.isRadioOrCheckbox ? this.$element.after( ulTemplate ) : this.$element.parent().after( ulTemplate );
    }

    /**
    * Add custom listeners
    *
    * @param {Object} { listener: function () {} }, eg { onFormSubmit: function ( valid, event, focus ) { ... } }
    */
    , addListener: function ( object ) {
      for ( var listener in object ) {
        this.options.listeners[ listener ] = object[ listener ];
      }
    }

    /**
    * Destroy parsley field instance
    *
    * @private
    * @method destroy
    */
    , destroy: function () {
      this.$element.removeClass( 'parsley-validated' );
      this.reset().$element.off( '.' + this.type ).removeData( this.type );
    }
  };

  /**
  * ParsleyFieldMultiple override ParsleyField for checkbox and radio inputs
  * Pseudo-heritance to manage divergent behavior from ParsleyItem in dedicated methods
  *
  * @class ParsleyFieldMultiple
  * @constructor
  */
  var ParsleyFieldMultiple = function ( element, options, type ) {
    this.initMultiple( element, options );
    this.inherit( element, options );
    this.Validator = new Validator( options );

    // call ParsleyField constructor
    this.init( element, type || 'ParsleyFieldMultiple' );
  };

  ParsleyFieldMultiple.prototype = {

    constructor: ParsleyFieldMultiple

    /**
    * Set some specific properties, call some extra methods to manage radio / checkbox
    *
    * @method init
    * @param {Object} element
    * @param {Object} options
    */
    , initMultiple: function ( element, options ) {
      this.element = element;
      this.$element = $( element );
      this.group = options.group || false;
      this.hash = this.getName();
      this.siblings = this.group ? '[data-group="' + this.group + '"]' : 'input[name="' + this.$element.attr( 'name' ) + '"]';
      this.isRadioOrCheckbox = true;
      this.isRadio = this.$element.is( 'input[type=radio]' );
      this.isCheckbox = this.$element.is( 'input[type=checkbox]' );
      this.errorClassHandler = options.errors.classHandler( element, this.isRadioOrCheckbox ) || this.$element.parent();
    }

    /**
    * Set specific constraints messages, do pseudo-heritance
    *
    * @private
    * @method inherit
    * @param {Object} element
    * @param {Object} options
    */
    , inherit: function ( element, options ) {
      var clone = new ParsleyField( element, options, 'ParsleyFieldMultiple' );

      for ( var property in clone ) {
        if ( 'undefined' === typeof this[ property ] ) {
          this[ property ] = clone [ property ];
        }
      }
    }

    /**
    * Set specific constraints messages, do pseudo-heritance
    *
    * @method getName
    * @returns {String} radio / checkbox hash is cleaned 'name' or data-group property
    */
   , getName: function () {
     if ( this.group ) {
       return 'parsley-' + this.group;
     }

     if ( 'undefined' === typeof this.$element.attr( 'name' ) ) {
       //throw "A radio / checkbox input must have a data-group attribute or a name to be Parsley validated !";
       return 'parsley-' + ( Math.random() + '' ).substring( 2 );
     }

     return 'parsley-' + this.$element.attr( 'name' ).replace( /(:|\.|\[|\])/g, '' );
   }

   /**
   * Special treatment for radio & checkboxes
   * Returns checked radio or checkboxes values
   *
   * @method getVal
   * @returns {String} val
   */
   , getVal: function () {
      if ( this.isRadio ) {
        return $( this.siblings + ':checked' ).val() || '';
      }

      if ( this.isCheckbox ) {
        var values = [];

        $( this.siblings + ':checked' ).each( function () {
          values.push( $( this ).val() );
        } );

        return values;
      }
   }

   /**
   * Bind validation events on a field
   *
   * @private
   * @method bindValidationEvents
   */
   , bindValidationEvents: function () {
     // this field has validation events, that means it has to be validated
     this.valid = null;
     this.$element.addClass( 'parsley-validated' );

     // remove eventually already binded events
     this.$element.off( '.' + this.type );

      // alaways bind keyup event, for better UX when a field is invalid
      var self = this
        , triggers = ( !this.options.trigger ? '' : this.options.trigger )
        + ( new RegExp( 'change', 'i' ).test( this.options.trigger ) ? '' : ' change' );

      // trim triggers to bind them correctly with .on()
      triggers = triggers.replace( /^\s+/g , '' ).replace( /\s+$/g ,'' );

     // bind trigger event on every siblings
     $( this.siblings ).each(function () {
       $( this ).on( triggers.split( ' ' ).join( '.' + self.type + ' ' ) , false, $.proxy( self.eventValidation, self ) );
     } )
   }
  };

  /**
  * ParsleyForm class manage Parsley validated form.
  * Manage its fields and global validation
  *
  * @class ParsleyForm
  * @constructor
  */
  var ParsleyForm = function ( element, options, type ) {
    this.init( element, options, type || 'parsleyForm' );
  };

  ParsleyForm.prototype = {

    constructor: ParsleyForm

    /* init data, bind jQuery on() actions */
    , init: function ( element, options, type ) {
      this.type = type;
      this.items = [];
      this.$element = $( element );
      this.options = options;
      var self = this;

      this.$element.find( options.inputs ).each( function () {
        self.addItem( this );
      });

      this.$element.on( 'submit.' + this.type , false, $.proxy( this.validate, this ) );

      // hack
      this.$element.addClass( 'parsley-validated' );
    }

    /**
    * Add custom listeners
    *
    * @param {Object} { listener: function () {} }, eg { onFormSubmit: function ( valid, event, focus ) { ... } }
    */
    , addListener: function ( object ) {
      for ( var listener in object ) {
        if ( new RegExp( 'Field' ).test( listener ) ) {
          for ( var item = 0; item < this.items.length; item++ ) {
            this.items[ item ].addListener( object );
          }
        } else {
          this.options.listeners[ listener ] = object[ listener ];
        }
      }
    }

    /**
    * Adds a new parsleyItem child to ParsleyForm
    *
    * @method addItem
    * @param elem
    */
    , addItem: function ( elem ) {
      if ( $( elem ).is( this.options.excluded ) ) {
        return false;
      }

      var ParsleyField = $( elem ).parsley( this.options );
      ParsleyField.setParent( this );

      this.items.push( ParsleyField );
    }

    /**
    * Removes a parsleyItem child from ParsleyForm
    *
    * @method removeItem
    * @param elem
    * @return {Boolean}
    */
    , removeItem: function ( elem ) {
      var parsleyItem = $( elem ).parsley();

      // identify & remove item if same Parsley hash
      for ( var i = 0; i < this.items.length; i++ ) {
        if ( this.items[ i ].hash === parsleyItem.hash ) {
          this.items[ i ].destroy();
          this.items.splice( i, 1 );
          return true;
        }
      }

      return false;
    }

    /**
    * Process each form field validation
    * Display errors, call custom onFormSubmit() function
    *
    * @method validate
    * @param {Object} event jQuery Event
    * @return {Boolean} Is form valid or not
    */
    , validate: function ( event ) {
      var valid = true;
      this.focusedField = false;

      for ( var item = 0; item < this.items.length; item++ ) {
        if ( this.items[ item ].$element.is( ':hidden' ) )
          continue;
        if ( 'undefined' !== typeof this.items[ item ] && false === this.items[ item ].validate() ) {
          valid = false;

          if ( !this.focusedField && 'first' === this.options.focus || 'last' === this.options.focus ) {
            this.focusedField = this.items[ item ].$element;
          }
        }
      }

      // form is invalid, focus an error field depending on focus policy
      if ( this.focusedField && !valid ) {
        this.focusedField.focus();
      }

      this.options.listeners.onFormSubmit( valid, event, this );

      return valid;
    }

    , isValid: function () {
      for ( var item = 0; item < this.items.length; item++ ) {
        if ( false === this.items[ item ].isValid() ) {
          return false;
        }
      }

      return true;
    }

    /**
    * Remove all errors ul under invalid fields
    *
    * @method removeErrors
    */
    , removeErrors: function () {
      for ( var item = 0; item < this.items.length; item++ ) {
        this.items[ item ].parsley( 'reset' );
      }
    }

    /**
    * destroy Parsley binded on the form and its fields
    *
    * @method destroy
    */
    , destroy: function () {
      for ( var item = 0; item < this.items.length; item++ ) {
        this.items[ item ].destroy();
      }

      this.$element.off( '.' + this.type ).removeData( this.type );
    }

    /**
    * reset Parsley binded on the form and its fields
    *
    * @method reset
    */
    , reset: function () {
      for ( var item = 0; item < this.items.length; item++ ) {
        this.items[ item ].reset();
      }
    }
  };

  /**
  * Parsley plugin definition
  * Provides an interface to access public Validator, ParsleyForm and ParsleyField functions
  *
  * @class Parsley
  * @constructor
  * @param {Mixed} Options. {Object} to configure Parsley or {String} method name to call a public class method
  * @param {Function} Callback function
  * @return {Mixed} public class method return
  */
  $.fn.parsley = function ( option, fn ) {
    var options = $.extend( true, {}, $.fn.parsley.defaults, 'undefined' !== typeof window.ParsleyConfig ? window.ParsleyConfig : {}, option, this.data() )
      , newInstance = null;

    function bind ( self, type ) {
      var parsleyInstance = $( self ).data( type );

      // if data never binded or we want to clone a build (for radio & checkboxes), bind it right now!
      if ( !parsleyInstance ) {
        switch ( type ) {
          case 'parsleyForm':
            parsleyInstance = new ParsleyForm( self, options, 'parsleyForm' );
            break;
          case 'parsleyField':
            parsleyInstance = new ParsleyField( self, options, 'parsleyField' );
            break;
          case 'parsleyFieldMultiple':
            parsleyInstance = new ParsleyFieldMultiple( self, options, 'parsleyFieldMultiple' );
            break;
          default:
            return;
        }

        $( self ).data( type, parsleyInstance );
      }

      // here is our parsley public function accessor
      if ( 'string' === typeof option && 'function' === typeof parsleyInstance[ option ] ) {
        var response = parsleyInstance[ option ]( fn );

        return 'undefined' !== typeof response ? response : $( self );
      }

      return parsleyInstance;
    }

    // if a form elem is given, bind all its input children
    if ( $( this ).is( 'form' ) || true === $( this ).data( 'bind' ) ) {
      newInstance = bind ( $( this ), 'parsleyForm' );

    // if it is a Parsley supported single element, bind it too, except inputs type hidden
    // add here a return instance, cuz' we could call public methods on single elems with data[ option ]() above
    } else if ( $( this ).is( options.inputs ) && !$( this ).is( options.excluded ) ) {
      newInstance = bind( $( this ), !$( this ).is( 'input[type=radio], input[type=checkbox]' ) ? 'parsleyField' : 'parsleyFieldMultiple' );
    }

    if ( option === 'custom') {
      return newInstance
    }
    else {
      return 'function' === typeof fn ? fn() : newInstance;
    }
  };

  $.fn.parsley.Constructor = ParsleyForm;

  /**
  * Parsley plugin configuration
  *
  * @property $.fn.parsley.defaults
  * @type {Object}
  */
  $.fn.parsley.defaults = {
    // basic data-api overridable properties here..
    inputs: 'input, textarea, select, [contenteditable="true"]'           // Default supported inputs.
    , excluded: 'input[type=hidden], input[type=file], :disabled' // Do not validate input[type=hidden] & :disabled.
    , trigger: false                            // $.Event() that will trigger validation. eg: keyup, change..
    , animate: false                             // fade in / fade out error messages
    , animateDuration: 300                      // fadein/fadout ms time
    , focus: 'first'                            // 'fist'|'last'|'none' which error field would have focus first on form validation
    , validationMinlength: 1                    // If trigger validation specified, only if value.length > validationMinlength
    , successClass: 'parsley-success'           // Class name on each valid input
    , errorClass: 'parsley-error'               // Class name on each invalid input
    , errorMessage: false                       // Customize an unique error message showed if one constraint fails
    , validators: {}                            // Add your custom validators functions
    , showErrors: true                          // Set to false if you don't want Parsley to display error messages
    , messages: {}                              // Add your own error messages here

    //some quite advanced configuration here..
    , validateIfUnchanged: true                                          // false: validate once by field value change
    , errors: {
        classHandler: function ( elem, isRadioOrCheckbox ) {}             // specify where parsley error-success classes are set
      , container: function ( elem, isRadioOrCheckbox ) {}                // specify an elem where errors will be **apened**
      , errorsWrapper: '<ul></ul>'                                        // do not set an id for this elem, it would have an auto-generated id
      , errorElem: '<li></li>'                                            // each field constraint fail in an li
      }
    , listeners: {
        onFieldValidate: function ( elem, ParsleyForm ) { return false; } // Executed on validation. Return true to ignore field validation
      , onFormSubmit: function ( isFormValid, event, ParsleyForm ) {}     // Executed once on form validation
      , onFieldError: function ( elem, constraints, ParsleyField ) {}     // Executed when a field is detected as invalid
      , onFieldSuccess: function ( elem, constraints, ParsleyField ) {}   // Executed when a field passes validation
    }
  };

  /* PARSLEY auto-bind DATA-API + Global config retrieving
  * =================================================== */
  $( window ).on( 'load', function () {
    $( '[data-validate="parsley"]' ).each( function () {
      $( this ).parsley();
    } );
  } );





// This plugin works with jQuery or Zepto (with data extension built for Zepto.)
}(window.jQuery || window.Zepto, Util);

// global bind some event
// focus, submit
var globalBindList = 'focus';
var bindElements = 'form[data-validate="parsley"] input, [data-bind="true"] input, form[data-validate="parsley"] textarea, [data-bind="true"] textarea, [data-bind="true"]';

var isBind = function( elem ) {
  elem = elem instanceof $ ? elem : $( elem );
  return elem.hasClass( 'parsley-validated' );
}

var getForm = function( context ) {
  if ( context.nodeName === 'form' || true === $( context ).data( 'bind' ) ) {
    form = $( context );
  } else {
    var form = $( context ).closest('form, [data-bind="true"]');
  }

  return form;
}

var formAddItem = function( form, target ) {
  var parsleyInstance = form.data( 'parsleyForm' );
  for ( var i in parsleyInstance.items ) {
    var item = parsleyInstance.items[ i ];
    if ( item.element.get( 0 ) === target ) return;
  }
  parsleyInstance.addItem(target);
}

var bindForm = function( e ) {
  var form = getForm(this);

  if ( !isBind( form ) ) {
    form.parsley();
  } else {
    var inputs = form.find('input[type=text], input[type=radio], input[type=checkbox], [contenteditable="true"]');
    inputs.each( function (index) {
      if ( !isBind( this ) ) {
        formAddItem( form, this );
      }
    });
  }

}

var bindFiled = function( e ) {
  if ( isBind( this ) ) {
    return;
  }

  var form = getForm(this);
  if (form) {
    if ( isBind( form ) ) {
      formAddItem( form, this );
    } else {
      form.parsley( { validationMinlength: 1 } );
    }
  } else {
    $( this ).parsley( { validationMinlength: 1 } );
  }

}

var formValidate = function( e ) {
  var form = getForm(this);
  form.parsley('validate');
}

// form submit auto bind
$(document.body).on( 'submit', 'form[data-validate="parsley"]', bindForm);

// element.parsley-submit click auto bind
$(document.body).on( 'click', '.parsley-submit', bindForm);

// element.parsley-submit click run validate
$(document.body).on( 'click', '.parsley-submit', formValidate);

// global bind on single input
$(document.body).on( globalBindList, bindElements, bindFiled );





}(window.jQuery)

});

/*
#**********************************************************
#* Filename: UI.errortip
#* Creator: Tim
#* Description: UI.errortip
#* Date: 20140102
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/
define('UI.errortip',["jquery"], function(){

+ function() {
  var errortip = function (event)
  {
    var target = $(this),
      content = findError( target )
      , target_offset
      , width
      , height
      , target_width
      , target_height
      , tipId

    if (content.length)
    {
      id = content.attr('id');
      tipId = 'errortip-' + id;
      originTip = $('#' + tipId);

      if ( originTip.length ) {
        // if error message is changed, update the errortip and display it.
        if ( originTip.html() != content.html() ) {
          originTip.html( content.html() )
          originTip.show();
        }
        return;
      }

      errortip_box = content.clone();
      errortip_box
        .addClass('errortip_box')
        .attr('id', tipId)
        .css('z-index', content.css('z-index'))
        .appendTo(document.body);

      target_offset = target.offset();
      target_width = target.innerWidth();
      target_height = target.innerHeight();

      //width = errortip_box.width();
      //height = errortip_box.height();


      errortip_box.css({
        'left': target_offset.left,
        'top': target_offset.top + target_height + height - document.body.scrollTop + 45 > window.innerHeight ?
          target_offset.top - height - 15 + 5 :
          target_offset.top + target_height + 5,
        width: target_width - 8 - 2,

      }).show();

      timer[ id ] = setInterval(function ()
        {
          if (content.closest('html').length === 0)
          {
            purge( content.attr('id') );
          }
        }, 200);

    }
  };

  var timer = {};
  var firstTimer = {};
  var isEnter = false;
  var enterUid;

  var errorClass = 'parsley-error'
    , errorListClass = 'parsley-error-list'
    , errorsWrapper = '<ul></ul>'
    , errorElem = '<li></li>';



  var isErrorList = function( errorList ) {
    return $( errorList ).is( 'ul.' +  errorListClass );
  }

  // Internal Helper

  var genHash = function() {
    return 'parsley-' + ( Math.random() + '' ).substring( 2 );
  };

  var findError = function( $target ) {
    return $target.next('.parsley-error-list');
  };

  var getEid = function ( target ) {
    $target = target instanceof $ ? target : $( target );
    return findError( $target ).attr( 'id' )
  };

  var getUid = function ( event ) {
    var id;
    if ( event === Object( event ) ) {
      id = getEid( event.currentTarget );
    } else {
      id = event
    }
    return $( '#' + id ).data( 'uid' );
  };

  var removeInterval = function ( id ) {
    if ( id ) {
      clearInterval( timer[ id ] );
    } else {
      for ( var id in timer ) {
        clearInterval( timer[ id ] );
      }
    }
  };

  var enter = function ( event ) {
    enterUid = getUid( event );
    errortip.call( this, event );
  };

  var leave = function ( event ) {
    enterUid = false;
    purge.call( this, event );
  };

  // Public Methods

  var first = function( target ) {
    if ( $( target ).is(':hidden') ) return;

    errortip.call( target )
    id = getEid( target )
    firstTimer[ id ] = setTimeout(function() {
      purge({currentTarget: target});
    }, 2000);
  };

  var purge = function ( event )
  {
    var id, uid, force = false;
    if ( event ){
      var errorPrefix = 'errortip-';
      if ( event === Object( event ) ) {
        id = findError( $( event.currentTarget ) ).attr( 'id' );
      }
      else {
        force = true;
        id = event;
      }

      uid = getUid( id );
      setTimeout( function() {
        if ( enterUid !== uid  || force ) {
          $( '#' + errorPrefix + id ).remove();
        }
      }, 100);

    } else {
      $('.errortip_box').remove();
    }

    firstTimer[ id ] && clearInterval( firstTimer[ id ] )
    removeInterval( id )

  };

  var manager = {
    createError: function( message, criminal, hash ) {
      if ( !hash )
        hash = genHash()

      var errorList = $( errorsWrapper )
                          .attr( 'id', hash )
                          .addClass( errorListClass )
                          .data( 'uid', ( Math.random() + '' ).substring( 2 ) + $.now() );

      var content = $( errorElem ).html( message );
      errorList.append( content );

      $( criminal ).after( errorList )
                   .addClass( errorClass );
    }

    , changeError: function( message, criminal ) {
      var $error = findError( $( criminal ) );
      $error.find( 'li' ).text( message );
    }

    , removeError: function( criminalOrHash ) {
      var $criminal, $error;
      // hash
      if ( Object.prototype.toString.call( criminalOrHash ) === '[object String]' ) {
        $error = $( '#' + criminalOrHash );
        $criminal = $error.prev();

      } else { //criminal
        $criminal = $( criminalOrHash );
        $error = findError( $criminal );
      }

      $criminal.removeClass( errorClass );
      if ( isErrorList( $error ) ) {
        purge( $error.attr( 'id' ) )
      }

    }

    , hasError: function( criminal ) {
      return $( criminal ).hasClass( errorClass );
    }
  }




  errortip.first = first;
  errortip.purge = purge;

  // Extend Management Methods to Interface
  $.extend( errortip, manager );

  window.errortip = errortip;

  // Bind Global Events[ mouseenter, mouseleave ]
  $(document).ready(function ()
  {
    $(document.body).on('mouseenter', '.parsley-error', enter);
    $(document.body).on('mouseleave', '.parsley-error', leave);
  });
}();

});

/*!
 * jqPagination, a jQuery pagination plugin (obviously)
 * Version: 1.3 (26th July 2013)
 *
 * Copyright (C) 2013 Ben Everard
 *
 * http://beneverard.github.com/jqPagination
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

 define('jqpagination',["jquery"], function(){

(function ($) {
	

	$.jqPagination = function (el, options) {

		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.

		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// get input jQuery object
		base.$input = base.$el.find('input');

		// Add a reverse reference to the DOM object
		base.$el.data("jqPagination", base);

		base.init = function () {

			base.options = $.extend({}, $.jqPagination.defaultOptions, options);

			// if the user hasn't provided a max page number in the options try and find
			// the data attribute for it, if that cannot be found, use one as a max page number

			if (base.options.max_page === null) {

				if (base.$input.data('max-page') !== undefined) {
					base.options.max_page = base.$input.data('max-page');
				} else {
					base.options.max_page = 1;
				}

			}

			// if the current-page data attribute is specified this takes priority
			// over the options passed in, so long as it's a number

			if (base.$input.data('current-page') !== undefined && base.isNumber(base.$input.data('current-page'))) {
				base.options.current_page = base.$input.data('current-page');
			}

			// remove the readonly attribute as JavaScript must be working by now ;-)
			base.$input.removeAttr('readonly');

			// set the initial input value
			// pass true to prevent paged callback form being fired

			base.updateInput(true);


			 //***************
			// BIND EVENTS

			base.$input.on('focus.jqPagination mouseup.jqPagination', function (event) {

				// if event === focus, select all text...
				if (event.type === 'focus') {

					var current_page	= parseInt(base.options.current_page, 10);

					$(this).val(current_page).select();

				}

				// if event === mouse up, return false. Fixes Chrome bug
				if (event.type === 'mouseup') {
					return false;
				}

			});

			base.$input.on('blur.jqPagination keydown.jqPagination', function (event) {

				var $self			= $(this),
					current_page	= parseInt(base.options.current_page, 10);

				// if the user hits escape revert the input back to the original value
				if (event.keyCode === 27) {
					$self.val(current_page);
					$self.blur();
				}

				// if the user hits enter, trigger blur event but DO NOT set the page value
				if (event.keyCode === 13) {
					$self.blur();
				}

				// only set the page is the event is focusout.. aka blur
				if (event.type === 'blur') {
					base.setPage($self.val());
				}

			});

			base.$el.on('click.jqPagination', 'a', function (event) {

				var $self = $(this);

				// we don't want to do anything if we've clicked a disabled link
				// return false so we stop normal link action btu also drop out of this event

				if ($self.hasClass('disabled')) {
					return false;
				}

				// for mac + windows (read: other), maintain the cmd + ctrl click for new tab
				if (!event.metaKey && !event.ctrlKey) {
					event.preventDefault();
					base.setPage($self.data('action'));
				}

			});

		};

		base.setPage = function (page, prevent_paged) {

			// return current_page value if getting instead of setting
			if (page === undefined) {
				return base.options.current_page;
			}

			var current_page	= parseInt(base.options.current_page, 10),
				max_page		= parseInt(base.options.max_page, 10);

			if (isNaN(parseInt(page, 10))) {

				switch (page) {

					case 'first':
						page = 1;
						break;

					case 'prev':
					case 'previous':
						page = current_page - 1;
						break;

					case 'next':
						page = current_page + 1;
						break;

					case 'last':
						page = max_page;
						break;

				}

			}

			page = parseInt(page, 10);

			// reject any invalid page requests
			if (isNaN(page) || page < 1 || page > max_page) {

				// update the input element
				base.setInputValue(current_page);

				return false;

			}

			// update current page options
			base.options.current_page = page;
			base.$input.data('current-page', page);

			// update the input element
			base.updateInput( prevent_paged );

		};

		base.setMaxPage = function (max_page, prevent_paged) {

			// return the max_page value if getting instead of setting
			if (max_page === undefined) {
				return base.options.max_page;
			}

			// ignore if max_page is not a number
			if (!base.isNumber(max_page)) {
				console.error('jqPagination: max_page is not a number');
				return false;
			}

			// ignore if max_page is less than the current_page
			if (max_page < base.options.current_page) {
				console.error('jqPagination: max_page lower than current_page');
				return false;
			}

			// set max_page options
			base.options.max_page = max_page;
			base.$input.data('max-page', max_page);

			// update the input element
			base.updateInput( prevent_paged );

		};

		// ATTN this isn't really the correct name is it?
		base.updateInput = function (prevent_paged) {

			var current_page = parseInt(base.options.current_page, 10);

			// set the input value
			base.setInputValue(current_page);

			// set the link href attributes
			base.setLinks(current_page);

			// we may want to prevent the paged callback from being fired
			if (prevent_paged !== true) {

				// fire the callback function with the current page
				base.options.paged(current_page);

			}

		};

		base.setInputValue = function (page) {

			var page_string	= base.options.page_string,
				max_page	= base.options.max_page;

			// this looks horrible :-(
			page_string = page_string
				.replace("{current_page}", page)
				.replace("{max_page}", max_page);

			base.$input.val(page_string);

		};

		base.isNumber = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};

		base.setLinks = function (page) {

			var link_string		= base.options.link_string,
				current_page	= parseInt(base.options.current_page, 10),
				max_page		= parseInt(base.options.max_page, 10);

			if (link_string !== '') {

				// set initial page numbers + make sure the page numbers aren't out of range

				var previous = current_page - 1;
				if (previous < 1) {
					previous = 1;
				}

				var next = current_page + 1;
				if (next > max_page) {
					next = max_page;
				}

				// apply each page number to the link string, set it back to the element href attribute
				base.$el.find('a.first').attr('href', link_string.replace('{page_number}', '1'));
				base.$el.find('a.prev, a.previous').attr('href', link_string.replace('{page_number}', previous));
				base.$el.find('a.next').attr('href', link_string.replace('{page_number}', next));
				base.$el.find('a.last').attr('href', link_string.replace('{page_number}', max_page));

			}

			// set disable class on appropriate links
			base.$el.find('a').removeClass('disabled');

			if (current_page === max_page) {
				base.$el.find('.next, .last').addClass('disabled');
			}

			if (current_page === 1) {
				base.$el.find('.previous, .first').addClass('disabled');
			}

		};

		base.callMethod = function (method, key, value) {

			switch (method.toLowerCase()) {

				case 'option':

					// set default object to trigger the paged event (legacy opperation)
					var options = {'trigger': true},
					result = false;

					// if the key passed in is an object
					if($.isPlainObject(key) && !value){
						$.extend(options, key)
					}
					else{ // make the key value pair part of the default object
						options[key] = value;
					}

					var prevent_paged = (options.trigger === false);

					// if max_page property is set call setMaxPage
					if(options.max_page !== undefined){
						result = base.setMaxPage(options.max_page, prevent_paged);
					}

					// if current_page property is set call setPage
					if(options.current_page !== undefined){
						result = base.setPage(options.current_page, prevent_paged);
					}

					// if we've not got a result fire an error and return false
					if( result === false ) console.error('jqPagination: cannot get / set option ' + key);
					return result;

					break;

				case 'destroy':

					base.$el
						.off('.jqPagination')
						.find('*')
							.off('.jqPagination');

					break;

				default:

					// the function name must not exist
					console.error('jqPagination: method "' + method + '" does not exist');
					return false;

			}

		};

		// Run initializer
		base.init();

	};

	$.jqPagination.defaultOptions = {
		current_page	: 1,
		link_string		: '',
		max_page		: null,
		page_string		: 'Page {current_page} of {max_page}',
		paged			: function () {}
	};

	$.fn.jqPagination = function () {

		// get any function parameters
		var self = this,
			args = Array.prototype.slice.call(arguments),
			result = false;

		// if the first argument is a string call the desired function
		// note: we can only do this to a single element, and not a collection of elements

		if (typeof args[0] === 'string') {

			// if we're dealing with multiple elements, set for all
			$.each(self, function(){
				var $plugin = $(this).data('jqPagination');

				result = $plugin.callMethod(args[0], args[1], args[2]);
			});

			return result;
		}

		// if we're not dealing with a method, initialise plugin
		self.each(function () {
			(new $.jqPagination(this, args[0]));
		});

	};

})(jQuery);

// polyfill, provide a fallback if the console doesn't exist
if (!console) {

	var console	= {},
		func	= function () { return false; };

	console.log		= func;
	console.info	= func;
	console.warn	= func;
	console.error	= func;

}

});

/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
define('hoverIntent',["jquery"], function(){

(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)

});

/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

 define('bootstrap-carousel',["jquery"], function(){

(function ($) {
	// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	// ============================================================

	function transitionEnd() {
		var el = document.createElement('bootstrap');

		var transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd'
		, 'MozTransition'    : 'transitionend'
		, 'OTransition'      : 'oTransitionEnd otransitionend'
		, 'transition'       : 'transitionend'
		};

		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return { end: transEndEventNames[name] }
			}
		}
	}

	// http://blog.alexmaccaw.com/css-transitions
	$.fn.emulateTransitionEnd = function (duration) {
		var called = false, $el = this
		$(this).one($.support.transition.end, function () { called = true })
		var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
		setTimeout(callback, duration)
		return this
	}

	$(function () {
		$.support.transition = transitionEnd();
	});

})(window.jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

+function ($) { 

	// CAROUSEL CLASS DEFINITION
	// =========================

	var Carousel = function (element, options) {
		this.$element    = $(element)
		this.$indicators = this.$element.find('.carousel-indicators')
		this.options     = options
		this.paused      =
		this.sliding     =
		this.interval    =
		this.$active     =
		this.$items      = null

		this.options.pause == 'hover' && this.$element
			.on('mouseenter', $.proxy(this.pause, this))
			.on('mouseleave', $.proxy(this.cycle, this))
	}

	Carousel.DEFAULTS = {
		interval: 5000
	, pause: 'hover'
	, wrap: true
	}

	Carousel.prototype.cycle =  function (e) {
		e || (this.paused = false)

		this.interval && clearInterval(this.interval)

		this.options.interval
			&& !this.paused
			&& (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

		return this
	}

	Carousel.prototype.getActiveIndex = function () {
		this.$active = this.$element.find('.item.active')
		this.$items  = this.$active.parent().children()

		return this.$items.index(this.$active)
	}

	Carousel.prototype.to = function (pos) {
		var that        = this
		var activeIndex = this.getActiveIndex()

		if (pos > (this.$items.length - 1) || pos < 0) return

		if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
		if (activeIndex == pos) return this.pause().cycle()

		return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
	}

	Carousel.prototype.pause = function (e) {
		e || (this.paused = true)

		if (this.$element.find('.next, .prev').length && $.support.transition.end) {
			this.$element.trigger($.support.transition.end)
			this.cycle(true)
		}

		this.interval = clearInterval(this.interval)

		return this
	}

	Carousel.prototype.next = function () {
		if (this.sliding) return
		return this.slide('next')
	}

	Carousel.prototype.prev = function () {
		if (this.sliding) return
		return this.slide('prev')
	}

	Carousel.prototype.slide = function (type, next) {
		var $active   = this.$element.find('.item.active')
		var $next     = next || $active[type]()
		var isCycling = this.interval
		var direction = type == 'next' ? 'left' : 'right'
		var fallback  = type == 'next' ? 'first' : 'last'
		var that      = this

		if (!$next.length) {
			if (!this.options.wrap) return
			$next = this.$element.find('.item')[fallback]()
		}

		this.sliding = true

		isCycling && this.pause()

		var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

		if ($next.hasClass('active')) return

		if (this.$indicators.length) {
			this.$indicators.find('.active').removeClass('active')
			this.$element.one('slid', function () {
				var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
				$nextIndicator && $nextIndicator.addClass('active')
			})
		}

		if ($.support.transition && this.$element.hasClass('slide')) {
			this.$element.trigger(e)
			if (e.isDefaultPrevented()) return
			$next.addClass(type)
			$next[0].offsetWidth // force reflow
			$active.addClass(direction)
			$next.addClass(direction)
			$active
				.one($.support.transition.end, function () {
					$next.removeClass([type, direction].join(' ')).addClass('active')
					$active.removeClass(['active', direction].join(' '))
					that.sliding = false
					setTimeout(function () { that.$element.trigger('slid') }, 0)
				})
				.emulateTransitionEnd(600)
		} else {
			this.$element.trigger(e)
			if (e.isDefaultPrevented()) return
			$active.removeClass('active')
			$next.addClass('active')
			this.sliding = false
			this.$element.trigger('slid')
		}

		isCycling && this.cycle()

		return this
	}


	// CAROUSEL PLUGIN DEFINITION
	// ==========================

	var old = $.fn.carousel

	$.fn.carousel = function (option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.carousel')
			var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
			var action  = typeof option == 'string' ? option : options.slide

			if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
			if (typeof option == 'number') data.to(option)
			else if (action) data[action]()
			else if (options.interval) data.pause().cycle()
		})
	}

	$.fn.carousel.Constructor = Carousel


	// CAROUSEL NO CONFLICT
	// ====================

	$.fn.carousel.noConflict = function () {
		$.fn.carousel = old
		return this
	}


	// CAROUSEL DATA-API
	// =================

	$(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
		var $this   = $(this), href
		var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
		var options = $.extend({}, $target.data(), $this.data())
		var slideIndex = $this.attr('data-slide-to')
		if (slideIndex) options.interval = false

		$target.carousel(options)

		if (slideIndex = $this.attr('data-slide-to')) {
			$target.data('bs.carousel').to(slideIndex)
		}

		e.preventDefault()
	})

	$(window).on('load', function () {
		$('[data-ride="carousel"]').each(function () {
			var $carousel = $(this)
			$carousel.carousel($carousel.data())
		})
	})

}(window.jQuery);

// Bind carousel button
$(document).ready(function ()
{
	var
		carousel_previous = function ()
		{
			var target = $(this),
				target_carousel = $( target.attr('href') ),
				indicators = target_carousel.find('.carousel-indicators'),
				current_index = indicators.find('.active').index();

			if (current_index > 0)
			{
				if (youtube_player[ current_index ])
				{
					youtube_player[ current_index ].pauseVideo();
				}

				target_carousel.find('.carousel-next').show();
				target_carousel.find('.carousel-done').hide();

				target_carousel.carousel('prev');
			}

			if (current_index <= 1)
			{
				target_carousel.find('.carousel-previous').addClass('disabled');
			}
			else
			{
				target_carousel.find('.carousel-previous').removeClass('disabled');
			}

			return false;
		},

		carousel_next = function ()
		{
			var target = $(this),
				target_carousel = $( target.attr('href') ),
				indicators = target_carousel.find('.carousel-indicators'),
				current_index = indicators.find('.active').index();

			if (current_index + 2 === indicators.children().length)
			{
				target_carousel.find('.carousel-next').hide();
				target_carousel.find('.carousel-done').show();
			}

			target_carousel.find('.carousel-previous').removeClass('disabled');

			if (youtube_player[ current_index ])
			{
				youtube_player[ current_index ].pauseVideo();
			}

			target_carousel.carousel('next');

			return false;
		};

	$(document)
		.on('click', '.carousel-previous', carousel_previous)
		.on('click', '.carousel-next', carousel_next);
});

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// For controling Youtube player
var youtube_player = [];

function onYouTubePlayerAPIReady()
{
	if (youtube_player.length !== 0)
	{
		youtube_player = [];
	}

	$('.guide-class').each(function ()
	{
		var target = $(this);

		if (YT)
		{
			youtube_player.push(new YT.Player(target.attr('id'), {
				width: '870',
				height: '500',
				videoId: target.data('video-id'),
				playerVars: {
					wmode: 'transparent',
					modestbranding: 1,
					rel: 0
				}
			}));
		}
	});
}

});


define("ui/ui", function(){});
