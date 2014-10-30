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


	var tooltip = function (event)
	{
		var target = $(event.currentTarget),
			content = $.trim(target.attr('data-tooltip')),
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

            if (target.data('tooltip-type') === "html"){
                tooltip_box.html(content).show();
            }else{
                tooltip_box.text(content).show();
            }

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


	if (template === Object(template)) {
		modal_wrap
			.html('<div id="modal-box" class="' + newClass + '" style="' + newStyle + '"></div>')
			.find('#modal-box')
			.html(template);
	} else {
		modal_wrap.html('<div id="modal-box" class="' + newClass + '" style="' + newStyle + '">' + template + '</div>');
	}

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

	// $(window).on('resize', modal.position);

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
	// if (event.which === 27)
	// {
	// 	modal.close();
	// }

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
		if (top > 250) { top = 250; }
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
				rowType = '',
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

			rowType = target.data('rowType')

			if (order === 'DESC')
			{
				stack.sort(function (a, b)
				{
					if (rowType === 'datetime')
					{
						return new Date(a.value) - new Date(b.value);
					}

					intA = parseInt(a.value)
					intB = parseInt(b.value)
					if (rowType !== 'string' && !isNaN(intA) && !isNaN(intB))
					{
						return intA - intB;
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
					if (rowType === 'datetime')
					{
						return new Date(b.value) - new Date(a.value);
					}

					intA = parseInt(a.value)
					intB = parseInt(b.value)
					if (rowType !== 'string' && !isNaN(intA) && !isNaN(intB))
					{
						return intB - intA;
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
        var silentClose = $selectbox.data('silent-close');

        if ( $selectbox.hasClass('open') ) {
            $selectbox.removeClass('open');
            return false;
        }

        // Close other opened dropdown
        $(".selectbox.open").not('.multiopen').removeClass('open');

        var $dropdown  = $selectbox.addClass('open')
                                   .find(".dropdown");

        $dropdown.find(".focused")
                 .removeClass('focused');

        $dropdown.find(".selected")
                 .focus().addClass('focused');


        var removeOpen = function( event ){
            var needRemove = true;

            if (silentClose && ($(event.target).closest(silentClose).size() || $(event.target).is(':hidden')) )
                needRemove = false

            if (needRemove) {
                $selectbox.removeClass('open');
                $(document.body).off('click', removeOpen);
            }

        };

        // Close dropdown during next click.
        $(document.body).on('click', removeOpen);

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

        $selectbox.trigger( evt, [ $this.attr('data-id'), $this.data() ] );

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


    var NOTIFICATION_TYPES = {
        "error"   : true,
        "warning" : true,
        "info"    : true
    };
    window.notification = function ( type, template, auto_close ) {
        if ( !NOTIFICATION_TYPES[ type ] || !template )
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

define('UI.multiinputbox',["jquery"], function($){


var multiinputbox = {
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

define('UI.canvg',[], function(){

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
        if (this.attribute('id').hasValue()) {
          if (svg.Definitions[this.attribute('id').value] == null) {
            svg.Definitions[this.attribute('id').value] = this;
          }
        }
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

});

/*
 * HTML5 Sortable jQuery Plugin
 * http://farhadi.ir/projects/html5sortable
 *
 * Copyright 2012, Ali Farhadi
 * Released under the MIT license.
 */
define('UI.sortable',["jquery"], function($){

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
          , database:  "This value should be a valid name"
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

          case 'database':
           regExp = /(?=[a-zA-Z0-9-]{2,25}$)^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
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
      this.hasCustom = false;
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

            if ( name === 'custom' ) {
              this.hasCustom = true;
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
      if ( this.options.listeners.onFieldValidate( this.element, this ) || ( '' === val && !this.isRequired && !this.isRequiredRollback && !this.hasCustom ) ) {
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

    , validateForm: function ( errorBubbling ) {
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
      return parent.validate( 'undefined' !== typeof errorBubbling ? errorBubbling : this.options.showErrors );
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

      // Do not support submit event
      //this.$element.on( 'submit.' + this.type , false, $.proxy( this.validate, this ) );

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

      var errorBubbling = event === true || event === false  ? event : true

      for ( var item = 0; item < this.items.length; item++ ) {
        if ( this.items[ item ].$element.is( ':hidden' ) )
          continue;
        if ( 'undefined' !== typeof this.items[ item ] && false === this.items[ item ].validate( errorBubbling ) ) {
          valid = false;

          if ( !this.focusedField && 'first' === this.options.focus || 'last' === this.options.focus ) {
            this.focusedField = this.items[ item ].$element;
          }
        }
      }

      // form is invalid, focus an error field depending on focus policy
      if ( this.focusedField && !valid && errorBubbling ) {
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

// Do not support submit
// form submit auto bind
//$(document.body).on( 'submit', 'form[data-validate="parsley"]', bindForm);

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
define('UI.errortip',["jquery"], function($){

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
        }, 1000);

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

  var findScrollableParent = function( target ) {
    if ( target.parent().prop( 'tagName' ) === 'BODY' ) return null;

    var overflow = target.parent().css( 'overflow' );
    if ( overflow === 'auto' || overflow === 'scroll' ) return target.parent();

    return findScrollableParent( target.parent() );

  };

  // Public Methods

  var first = function( target ) {

    setTimeout(function() {
      if ( $( target ).is(':hidden') ) return;
      errortip.call( target )

      id = getEid( target )
      firstTimer[ id ] = setTimeout(function() {
        purge({currentTarget: target});
      }, 2000);

      $(window).one('resize', function() {
        purge({currentTarget: target});
      });

      scrollableParent = findScrollableParent( $(target) );
      scrollableParent && scrollableParent.one('scroll', function() {
        purge({currentTarget: target});
      });

    }, 1);

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

});

(function() {
  define('UI.dnd',["jquery"], function($) {
    var cancelDnd, cloneElement, defaultOptions, detectDrag, emptyFunction, onMouseMove, onMouseUp, startDrag;
    cloneElement = function(data) {
      if (data.noShadow) {
        return $();
      } else {
        return $("<div id='DndItem'></div>").appendTo(document.body).html(data.source.html()).attr("class", data.source.attr("class").replace("bubble", "").replace("tooltip", ""));
      }
    };
    emptyFunction = function() {};
    defaultOptions = {
      clone: cloneElement,
      eventPrefix: "",
      minDistance: 4,
      lockToCenter: true,
      noShadow: false,
      onDragStart: emptyFunction,
      onDrag: emptyFunction,
      onDragEnd: emptyFunction
    };
    $.fn.dnd = function(mouseDownEvent, options) {
      console.assert(options.dropTargets);
      console.assert(options.dataTransfer);
      options = $.extend({
        source: this,
        startX: mouseDownEvent.pageX,
        startY: mouseDownEvent.pageY
      }, defaultOptions, options);
      $(document).on({
        "mousemove.uidnd": detectDrag,
        "mousedown.uidnd": cancelDnd,
        "mouseup.uidnd": cancelDnd,
        "urlroute.uidnd": cancelDnd
      }, options);
      return this;
    };
    cancelDnd = function(evt) {
      var data;
      $(document).off(".uidnd");
      data = evt.data;

      /*
       * If we need to style the drag shadow, we can temporary comment out this line.
       */
      if (data.shadow) {
        data.shadow.remove();
      }
      if (data.hoverZone) {
        data.hoverZone.removeClass("dragOver").triggerHandler("" + data.eventPrefix + "dragleave", data);
      }
      if (data.onDragCancel && evt.type === "urlroute") {
        data.onDragCancel(evt);
      }
    };
    detectDrag = function(evt) {
      var data;
      data = evt.data;
      if (Math.pow(evt.pageX - data.startX, 2) + Math.pow(evt.pageY - data.startY, 2) >= 4) {
        $(document).off("mousemove.uidnd").on({
          "mousemove.uidnd": onMouseMove,
          "mouseup.uidnd": onMouseUp
        }, data);
        startDrag(data, evt);
      }
      return false;
    };
    startDrag = function(data, evt) {
      var offset, shadow;
      data.shadow = shadow = data.clone(data);
      data.onDragStart(data);
      if (data.lockToCenter) {
        data.offsetX = shadow.outerWidth() / 2;
        data.offsetY = shadow.outerHeight() / 2;
      } else {
        offset = data.source.offset();
        data.offsetX = data.startX - offset.left;
        data.offsetY = data.startY - offset.top;
      }
      shadow.css({
        left: evt.pageX - data.offsetX,
        top: evt.pageY - data.offsetY
      });
      data.dropZones = _.map(data.dropTargets, function(tgt) {
        var $tgt;
        $tgt = $(tgt);
        offset = $tgt.offset();
        return {
          x1: offset.left,
          y1: offset.top,
          x2: offset.left + $tgt.outerWidth(),
          y2: offset.top + $tgt.outerHeight()
        };
      });
    };
    onMouseMove = function(evt) {
      var data, dz, hoverZone, idx, newZone, _i, _len, _ref, _ref1, _ref2;
      data = evt.data;
      data.pageX = evt.pageX;
      data.pageY = evt.pageY;
      _ref = data.dropZones;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        dz = _ref[idx];
        if ((dz.x1 <= (_ref1 = evt.pageX) && _ref1 <= dz.x2) && (dz.y1 <= (_ref2 = evt.pageY) && _ref2 <= dz.y2)) {
          newZone = data.dropTargets.eq(idx);
          data.zoneDimension = dz;
          break;
        }
      }
      hoverZone = data.hoverZone;
      if (hoverZone && newZone && newZone[0] === hoverZone[0]) {
        newZone.triggerHandler("" + data.eventPrefix + "dragover", data);
      } else {
        if (hoverZone) {
          hoverZone.removeClass("dragOver").triggerHandler("" + data.eventPrefix + "dragleave", data);
        }
        if (newZone) {
          newZone.addClass("dragOver").triggerHandler("" + data.eventPrefix + "dragenter", data);
        }
        data.shadow.toggleClass("dragOver", !!newZone);
        data.hoverZone = newZone;
      }
      data.shadow.css({
        left: evt.pageX - data.offsetX,
        top: evt.pageY - data.offsetY
      });
      data.onDrag(evt);
      return false;
    };
    onMouseUp = function(evt) {
      var data;
      data = evt.data;
      cancelDnd(evt);
      data.pageX = evt.pageX;
      data.pageY = evt.pageY;
      data.onDragEnd(evt);
      if (data.hoverZone) {
        data.hoverZone.triggerHandler("" + data.eventPrefix + "drop", data);
      }
    };
    return null;
  });

}).call(this);

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

 define('jqpagination',["jquery"], function($){

	

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

});

// jQuery List DragSort v0.5.1
// Website: http://dragsort.codeplex.com/
// License: http://dragsort.codeplex.com/license

// Modified version. This plugin can only drag horizontally or vertically.

define('jquerysort',["jquery"], function($) {

	$.browser = $.support;
	$.fn.dragsort = function(options) {
		if (options == "destroy") {
			$(this.selector).trigger("dragsort-uninit");
			return;
		}

		var opts = $.extend({}, $.fn.dragsort.defaults, options);
		var lists = [];
		var list = null, lastPos = null;

		this.each(function(i, cont) {

			//if list container is table, the browser automatically wraps rows in tbody if not specified so change list container to tbody so that children returns rows as user expected
			if ($(cont).is("table") && $(cont).children().size() == 1 && $(cont).children().is("tbody"))
				cont = $(cont).children().get(0);

			var newList = {
				draggedItem: null,
				placeHolderItem: null,
				pos: null,
				offset: null,
				offsetLimit: null,
				scroll: null,
				container: cont,

				init: function() {
					//set options to default values if not set
					var tagName = $(this.container).children().size() == 0 ? "li" : $(this.container).children(":first").get(0).tagName.toLowerCase();
					if (opts.itemSelector == "")
						opts.itemSelector = tagName;
					if (opts.dragSelector == "")
						opts.dragSelector = tagName;
					if (opts.placeHolderTemplate == "")
						opts.placeHolderTemplate = "<" + tagName + ">&nbsp;</" + tagName + ">";

					//listidx allows reference back to correct list variable instance
					$(this.container).attr("data-listidx", i).mousedown(this.grabItem).bind("dragsort-uninit", this.uninit);
					this.styleDragHandlers(true);
				},

				uninit: function() {
					var list = lists[$(this).attr("data-listidx")];
					$(list.container).unbind("mousedown", list.grabItem).unbind("dragsort-uninit");
					list.styleDragHandlers(false);
				},

				getItems: function() {
					return $(this.container).children(opts.itemSelector);
				},

				styleDragHandlers: function(cursor) {
					this.getItems().map(function() { return $(this).is(opts.dragSelector) ? this : $(this).find(opts.dragSelector).get(); }); //.css("cursor", cursor ? "pointer" : "");
				},

				grabItem: function(e) {
					//if not left click or if clicked on excluded element (e.g. text box) or not a moveable list item return
					if (e.which != 1 || $(e.target).is(opts.dragSelectorExclude) || $(e.target).closest(opts.dragSelectorExclude).size() > 0 || $(e.target).closest(opts.itemSelector).size() == 0)
						return;

					//prevents selection, stops issue on Fx where dragging hyperlink doesn't work and on IE where it triggers mousemove even though mouse hasn't moved,
					//does also stop being able to click text boxes hence dragging on text boxes by default is disabled in dragSelectorExclude
					e.preventDefault();

					//change cursor to move while dragging
					var dragHandle = e.target;
					while (!$(dragHandle).is(opts.dragSelector)) {
						if (dragHandle == this) return;
						dragHandle = dragHandle.parentNode;
					}
					$(dragHandle).attr("data-cursor", $(dragHandle).css("cursor"));
					$(dragHandle).css("cursor", "move");

					//on mousedown wait for movement of mouse before triggering dragsort script (dragStart) to allow clicking of hyperlinks to work
					var list = lists[$(this).attr("data-listidx")];
					var item = this;

					var startX = e.pageX;
					var startY = e.pageY;
					var detect = function( e ) {
						if ( Math.pow( e.pageX - startX, 2 ) + Math.pow( e.pageY - startY, 2 ) >= 4 ) {
							$(list.container).unbind("mousemove", detect);
							list.dragStart.call(item, e);
						}
					};

					$(list.container).mousemove(detect).mouseup(function() {
						$(list.container).unbind("mousemove", detect);
						$(dragHandle).css("cursor", $(dragHandle).attr("data-cursor"));
					});
				},

				dragStart: function(e) {

					if (list != null && list.draggedItem != null)
						list.dropItem();

					list = lists[$(this).attr("data-listidx")];
					list.draggedItem = $(e.target).closest(opts.itemSelector);

					opts.dragStart.apply(list.draggedItem);
					list.oldIndex = $(list.draggedItem).index()

					//record current position so on dragend we know if the dragged item changed position or not
					list.draggedItem.attr("data-origpos", $(this).attr("data-listidx") + "-" + list.getItems().index(list.draggedItem));

					//calculate mouse offset relative to draggedItem
					var mt = parseInt(list.draggedItem.css("marginTop"));
					var ml = parseInt(list.draggedItem.css("marginLeft"));
					list.offset = list.draggedItem.offset();
					list.offset.top = e.pageY - list.offset.top + (isNaN(mt) ? 0 : mt) - 1;
					list.offset.left = e.pageX - list.offset.left + (isNaN(ml) ? 0 : ml) - 1;

					//calculate box the dragged item can't be dragged outside of
					if (!opts.dragBetween) {
						var containerHeight = $(list.container).outerHeight() == 0 ? Math.max(1, Math.round(0.5 + list.getItems().size() * list.draggedItem.outerWidth() / $(list.container).outerWidth())) * list.draggedItem.outerHeight() : $(list.container).outerHeight();
						list.offsetLimit = $(list.container).offset();
						list.offsetLimit.right = list.offsetLimit.left + $(list.container).outerWidth() - list.draggedItem.outerWidth();
						list.offsetLimit.bottom = list.offsetLimit.top + containerHeight - list.draggedItem.outerHeight();
					}

					//create placeholder item
					var h = list.draggedItem.height();
					var w = list.draggedItem.width();
					if (opts.itemSelector == "tr") {
						list.draggedItem.children().each(function() { $(this).width($(this).width()); });
						list.placeHolderItem = list.draggedItem.clone().attr("data-placeholder", true);
						list.draggedItem.after(list.placeHolderItem);
						list.placeHolderItem.children().each(function() { $(this).css({ borderWidth:0, width: $(this).width() + 1, height: $(this).height() + 1 }).html("&nbsp;"); });
					} else {
						list.draggedItem.after(opts.placeHolderTemplate);
						list.placeHolderItem = list.draggedItem.next().css({ height: h, width: w }).attr("data-placeholder", true);
					}

					if (opts.itemSelector == "td") {
						var listTable = list.draggedItem.closest("table").get(0);
						$("<table id='" + listTable.id + "' style='border-width: 0px;' class='dragSortItem " + listTable.className + "'><tr></tr></table>").appendTo("body").children().append(list.draggedItem);
					}

					//style draggedItem while dragging
					var orig = list.draggedItem.attr("style");
					list.draggedItem.attr("data-origstyle", orig ? orig : "");
					list.draggedItem.css({ position: "absolute", opacity: 0.8, "z-index": 999, height: h, width: w });

					//auto-scroll setup
					list.scroll = { moveX: 0, moveY: 0, maxX: $(document).width() - $(window).width(), maxY: $(document).height() - $(window).height() };
					list.scroll.scrollY = window.setInterval(function() {
						if (opts.scrollContainer != window) {
							$(opts.scrollContainer).scrollTop($(opts.scrollContainer).scrollTop() + list.scroll.moveY);
							return;
						}
						var t = $(opts.scrollContainer).scrollTop();
						if (list.scroll.moveY > 0 && t < list.scroll.maxY || list.scroll.moveY < 0 && t > 0) {
							$(opts.scrollContainer).scrollTop(t + list.scroll.moveY);
							list.draggedItem.css("top", list.draggedItem.offset().top + list.scroll.moveY + 1);
						}
					}, 10);
					list.scroll.scrollX = window.setInterval(function() {
						if (opts.scrollContainer != window) {
							$(opts.scrollContainer).scrollLeft($(opts.scrollContainer).scrollLeft() + list.scroll.moveX);
							return;
						}
						var l = $(opts.scrollContainer).scrollLeft();
						if (list.scroll.moveX > 0 && l < list.scroll.maxX || list.scroll.moveX < 0 && l > 0) {
							$(opts.scrollContainer).scrollLeft(l + list.scroll.moveX);
							list.draggedItem.css("left", list.draggedItem.offset().left + list.scroll.moveX + 1);
						}
					}, 10);

					//misc
					$(lists).each(function(i, l) { l.createDropTargets(); l.buildPositionTable(); });
					list.setPos(e.pageX, e.pageY);
					$(document).bind("mousemove", list.swapItems);
					$(document).bind("mouseup", list.dropItem);
					if (opts.scrollContainer != window)
						$(window).bind("DOMMouseScroll mousewheel", list.wheel);
				},

				//set position of draggedItem
				setPos: function(x, y) {
					//remove mouse offset so mouse cursor remains in same place on draggedItem instead of top left corner
					var top = y - this.offset.top;
					var left = x - this.offset.left;

					//limit top, left to within box draggedItem can't be dragged outside of
					if (!opts.dragBetween) {
						top = Math.min(this.offsetLimit.bottom, Math.max(top, this.offsetLimit.top));
						left = Math.min(this.offsetLimit.right, Math.max(left, this.offsetLimit.left));
					}

					//adjust top, left calculations to parent element instead of window if it's relative or absolute
					this.draggedItem.parents().each(function() {
						if ($(this).css("position") != "static" && (!$.browser.mozilla || $(this).css("display") != "table")) {
							var offset = $(this).offset();
							top -= offset.top;
							left -= offset.left;
							return false;
						}
					});

					//set x or y auto-scroll amount
					if (opts.scrollContainer == window) {
						y -= $(window).scrollTop();
						x -= $(window).scrollLeft();
						y = Math.max(0, y - $(window).height() + 5) + Math.min(0, y - 5);
						x = Math.max(0, x - $(window).width() + 5) + Math.min(0, x - 5);
					} else {
						var cont = $(opts.scrollContainer);
						var offset = cont.offset();
						y = Math.max(0, y - cont.height() - offset.top) + Math.min(0, y - offset.top);
						x = Math.max(0, x - cont.width() - offset.left) + Math.min(0, x - offset.left);
					}

					list.scroll.moveX = x == 0 ? 0 : x * opts.scrollSpeed / Math.abs(x);
					list.scroll.moveY = y == 0 ? 0 : y * opts.scrollSpeed / Math.abs(y);

					//move draggedItem to new mouse cursor location
					if (opts.horizontal)
						this.draggedItem.css({ left: left + $(this.container).scrollLeft() });
					else
						this.draggedItem.css({ top: top + $(this.container).scrollTop() });
				},

				//if scroll container is a div allow mouse wheel to scroll div instead of window when mouse is hovering over
				wheel: function(e) {
					if (($.browser.safari || $.browser.mozilla) && list && opts.scrollContainer != window) {
						var cont = $(opts.scrollContainer);
						var offset = cont.offset();
						if (e.pageX > offset.left && e.pageX < offset.left + cont.width() && e.pageY > offset.top && e.pageY < offset.top + cont.height()) {
							var delta = e.detail ? e.detail * 5 : e.wheelDelta / -2;
							cont.scrollTop(cont.scrollTop() + delta);
							e.preventDefault();
						}
					}
				},

				//build a table recording all the positions of the moveable list items
				buildPositionTable: function() {
					var pos = [];
					this.getItems().not([list.draggedItem[0], list.placeHolderItem[0]]).each(function(i) {
						var loc = $(this).offset();
						loc.right = loc.left + $(this).outerWidth();
						loc.bottom = loc.top + $(this).outerHeight();
						loc.elm = this;
						pos[i] = loc;
					});
					this.pos = pos;
				},

				dropItem: function() {
					if (list.draggedItem == null)
						return;

					//list.draggedItem.attr("style", "") doesn't work on IE8 and jQuery 1.5 or lower
					//list.draggedItem.removeAttr("style") doesn't work on chrome and jQuery 1.6 (works jQuery 1.5 or lower)
					var orig = list.draggedItem.attr("data-origstyle");
					list.draggedItem.attr("style", orig);
					if (orig == "")
						list.draggedItem.removeAttr("style");
					list.draggedItem.removeAttr("data-origstyle");

					list.styleDragHandlers(true);

					list.placeHolderItem.before(list.draggedItem);
					list.placeHolderItem.remove();

					$("[data-droptarget], .dragSortItem").remove();

					window.clearInterval(list.scroll.scrollY);
					window.clearInterval(list.scroll.scrollX);

					//if position changed call dragEnd
					if (list.draggedItem.attr("data-origpos") != $(lists).index(list) + "-" + list.getItems().index(list.draggedItem))
						opts.dragEnd(list.draggedItem, list.oldIndex);
					list.draggedItem.removeAttr("data-origpos");

					list.draggedItem = null;
					$(document).unbind("mousemove", list.swapItems);
					$(document).unbind("mouseup", list.dropItem);
					if (opts.scrollContainer != window)
						$(window).unbind("DOMMouseScroll mousewheel", list.wheel);
					return false;
				},

				//swap the draggedItem (represented visually by placeholder) with the list item the it has been dragged on top of
				swapItems: function(e) {
					if (list.draggedItem == null)
						return false;

					//move draggedItem to mouse location
					list.setPos(e.pageX, e.pageY);

					//retrieve list and item position mouse cursor is over
					var ei = list.findPos(e.pageX, e.pageY);
					var nlist = list;
					for (var i = 0; ei == -1 && opts.dragBetween && i < lists.length; i++) {
						ei = lists[i].findPos(e.pageX, e.pageY);
						nlist = lists[i];
					}

					//if not over another moveable list item return
					if (ei == -1)
						return false;

					//save fixed items locations
					var children = function() { return $(nlist.container).children().not(nlist.draggedItem); };
					var fixed = children().not(opts.itemSelector).each(function(i) { this.idx = children().index(this); });

					//if moving draggedItem up or left place placeHolder before list item the dragged item is hovering over otherwise place it after
					if (lastPos == null || lastPos.top > list.draggedItem.offset().top || lastPos.left > list.draggedItem.offset().left)
						$(nlist.pos[ei].elm).before(list.placeHolderItem);
					else
						$(nlist.pos[ei].elm).after(list.placeHolderItem);

					//restore fixed items location
					fixed.each(function() {
						var elm = children().eq(this.idx).get(0);
						if (this != elm && children().index(this) < this.idx)
							$(this).insertAfter(elm);
						else if (this != elm)
							$(this).insertBefore(elm);
					});

					//misc
					$(lists).each(function(i, l) { l.createDropTargets(); l.buildPositionTable(); });
					lastPos = list.draggedItem.offset();
					return false;
				},

				//returns the index of the list item the mouse is over
				findPos: function(x, y) {
					for (var i = 0; i < this.pos.length; i++) {
						if (this.pos[i].left < x && this.pos[i].right > x && this.pos[i].top < y && this.pos[i].bottom > y)
							return i;
					}
					return -1;
				},

				//create drop targets which are placeholders at the end of other lists to allow dragging straight to the last position
				createDropTargets: function() {
					if (!opts.dragBetween)
						return;

					$(lists).each(function() {
						var ph = $(this.container).find("[data-placeholder]");
						var dt = $(this.container).find("[data-droptarget]");
						if (ph.size() > 0 && dt.size() > 0)
							dt.remove();
						else if (ph.size() == 0 && dt.size() == 0) {
							if (opts.itemSelector == "td")
								$(opts.placeHolderTemplate).attr("data-droptarget", true).appendTo(this.container);
							else
								//list.placeHolderItem.clone().removeAttr("data-placeholder") crashes in IE7 and jquery 1.5.1 (doesn't in jquery 1.4.2 or IE8)
								$(this.container).append(list.placeHolderItem.removeAttr("data-placeholder").clone().attr("data-droptarget", true));

							list.placeHolderItem.attr("data-placeholder", true);
						}
					});
				}
			};

			newList.init();
			lists.push(newList);
		});

		return this;
	};

	$.fn.dragsort.defaults = {
		itemSelector: "",
		dragSelector: "",
		dragSelectorExclude: "input, textarea, .editable-area",
		dragEnd: function() { },
		dragStart: function() { },
		dragBetween: false,
		placeHolderTemplate: "",
		scrollContainer: window,
		scrollSpeed: 5
	};

});

/************************
jquery-timepicker v1.4.5
http://jonthornton.github.com/jquery-timepicker/

requires jQuery 1.7+
************************/


(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define('jqtimepicker',['jquery'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	var _baseDate = _generateBaseDate();
	var _ONE_DAY = 86400;
	var _defaults =	{
		className: null,
		minTime: null,
		maxTime: null,
		durationTime: null,
		step: 30,
		showDuration: false,
		showOnFocus: true,
		timeFormat: 'g:ia',
		scrollDefault: null,
		selectOnBlur: false,
		disableTouchKeyboard: false,
		forceRoundTime: false,
		appendTo: 'body',
		orientation: 'ltr',
		disableTimeRanges: [],
		closeOnWindowScroll: false,
		typeaheadHighlight: true,
		noneOption: false
	};
	var _lang = {
		am: 'am',
		pm: 'pm',
		AM: 'AM',
		PM: 'PM',
		decimal: '.',
		mins: 'mins',
		hr: 'hr',
		hrs: 'hrs'
	};

	var methods =
	{
		init: function(options)
		{
			return this.each(function()
			{
				var self = $(this);

				// pick up settings from data attributes
				var attributeOptions = [];
				for (var key in _defaults) {
					if (self.data(key))  {
						attributeOptions[key] = self.data(key);
					}
				}

				var settings = $.extend({}, _defaults, attributeOptions, options);

				if (settings.lang) {
					_lang = $.extend(_lang, settings.lang);
				}

				settings = _parseSettings(settings);
				self.data('timepicker-settings', settings);
				self.addClass('ui-timepicker-input');

				if (settings.useSelect) {
					_render(self);
				} else {
					self.prop('autocomplete', 'off');
					self.on('click.timepicker focus.timepicker', methods.show);
					self.on('change.timepicker', _formatValue);
					self.on('keydown.timepicker', _keydownhandler);
					self.on('keyup.timepicker', _keyuphandler);

					_formatValue.call(self.get(0));
				}
			});
		},

		show: function(e)
		{
			var self = $(this);
			var settings = self.data('timepicker-settings');

			if (e) {
				if (!settings.showOnFocus) {
					return true;
				}

				e.preventDefault();
			}

			if (settings.useSelect) {
				self.data('timepicker-list').focus();
				return;
			}

			if (_hideKeyboard(self)) {
				// block the keyboard on mobile devices
				self.blur();
			}

			var list = self.data('timepicker-list');

			// check if input is readonly
			if (self.prop('readonly')) {
				return;
			}

			// check if list needs to be rendered
			if (!list || list.length === 0 || typeof settings.durationTime === 'function') {
				_render(self);
				list = self.data('timepicker-list');
			}

			if (list.is(':visible')) {
				return;
			}

			// make sure other pickers are hidden
			methods.hide();

			// position the dropdown relative to the input
			list.show();
			var listOffset = {};

			if (settings.orientation == 'rtl') {
				// right-align the dropdown
				listOffset.left = self.offset().left + self.outerWidth() - list.outerWidth() + parseInt(list.css('marginLeft').replace('px', ''), 10);
			} else {
				// left-align the dropdown
				listOffset.left = self.offset().left + parseInt(list.css('marginLeft').replace('px', ''), 10);
			}

			if ((self.offset().top + self.outerHeight(true) + list.outerHeight()) > $(window).height() + $(window).scrollTop()) {
				// position the dropdown on top
				listOffset.top = self.offset().top - list.outerHeight() + parseInt(list.css('marginTop').replace('px', ''), 10);
			} else {
				// put it under the input
				listOffset.top = self.offset().top + self.outerHeight() + parseInt(list.css('marginTop').replace('px', ''), 10);
			}

			list.offset(listOffset);

			// position scrolling
			var selected = list.find('.ui-timepicker-selected');

			if (!selected.length) {
				if (_getTimeValue(self)) {
					selected = _findRow(self, list, _time2int(_getTimeValue(self)));
				} else if (settings.scrollDefault) {
					selected = _findRow(self, list, settings.scrollDefault);
				}
			}

			if (selected && selected.length) {
				var topOffset = list.scrollTop() + selected.position().top - selected.outerHeight();
				list.scrollTop(topOffset);
			} else {
				list.scrollTop(0);
			}

			// attach close handlers
			$(document).on('touchstart.ui-timepicker mousedown.ui-timepicker', _closeHandler);
			if (settings.closeOnWindowScroll) {
				$(document).on('scroll.ui-timepicker', _closeHandler);
			}

			self.trigger('showTimepicker');

			return this;
		},

		hide: function(e)
		{
			var self = $(this);
			var settings = self.data('timepicker-settings');

			if (settings && settings.useSelect) {
				self.blur();
			}

			$('.ui-timepicker-wrapper:visible').each(function() {
				var list = $(this);
				var self = list.data('timepicker-input');
				var settings = self.data('timepicker-settings');

				if (settings && settings.selectOnBlur) {
					_selectValue(self);
				}

				list.hide();
				self.trigger('hideTimepicker');
			});

			return this;
		},

		option: function(key, value)
		{
			return this.each(function(){
				var self = $(this);
				var settings = self.data('timepicker-settings');
				var list = self.data('timepicker-list');

				if (typeof key == 'object') {
					settings = $.extend(settings, key);

				} else if (typeof key == 'string' && typeof value != 'undefined') {
					settings[key] = value;

				} else if (typeof key == 'string') {
					return settings[key];
				}

				settings = _parseSettings(settings);

				self.data('timepicker-settings', settings);

				if (list) {
					list.remove();
					self.data('timepicker-list', false);
				}

				if (settings.useSelect) {
					_render(self);
				}
			});
		},

		getSecondsFromMidnight: function()
		{
			return _time2int(_getTimeValue(this));
		},

		getTime: function(relative_date)
		{
			var self = this;

			var time_string = _getTimeValue(self);
			if (!time_string) {
				return null;
			}

			if (!relative_date) {
				relative_date = new Date();
			}
			var offset = _time2int(time_string);

			// construct a Date with today's date, and offset's time
			var time = new Date(relative_date);
			time.setHours(offset / 3600);
			time.setMinutes(offset % 3600 / 60);
			time.setSeconds(offset % 60);
			time.setMilliseconds(0);

			return time;
		},

		setTime: function(value)
		{
			var self = this;
			var settings = self.data('timepicker-settings');

			if (settings.forceRoundTime) {
				var prettyTime = _roundAndFormatTime(value, settings)
			} else {
				var prettyTime = _int2time(_time2int(value), settings.timeFormat);
			}

			_setTimeValue(self, prettyTime);
			if (self.data('timepicker-list')) {
				_setSelected(self, self.data('timepicker-list'));
			}

			return this;
		},

		remove: function()
		{
			var self = this;

			// check if this element is a timepicker
			if (!self.hasClass('ui-timepicker-input')) {
				return;
			}

			var settings = self.data('timepicker-settings');
			self.removeAttr('autocomplete', 'off');
			self.removeClass('ui-timepicker-input');
			self.removeData('timepicker-settings');
			self.off('.timepicker');

			// timepicker-list won't be present unless the user has interacted with this timepicker
			if (self.data('timepicker-list')) {
				self.data('timepicker-list').remove();
			}

			if (settings.useSelect) {
				self.show();
			}

			self.removeData('timepicker-list');

			return this;
		}
	};

	// private methods

	function _parseSettings(settings)
	{
		if (settings.minTime) {
			settings.minTime = _time2int(settings.minTime);
		}

		if (settings.maxTime) {
			settings.maxTime = _time2int(settings.maxTime);
		}

		if (settings.durationTime && typeof settings.durationTime !== 'function') {
			settings.durationTime = _time2int(settings.durationTime);
		}

		if (settings.scrollDefault == 'now') {
			settings.scrollDefault = _time2int(new Date());
		} else if (settings.scrollDefault) {
			settings.scrollDefault = _time2int(settings.scrollDefault);
		} else if (settings.minTime) {
			settings.scrollDefault = settings.minTime;
		}

		if (settings.scrollDefault) {
			settings.scrollDefault = _roundTime(settings.scrollDefault, settings);
		}

		if (settings.timeFormat.match(/[gh]/)) {
			settings._twelveHourTime = true;
		}

		if (settings.disableTimeRanges.length > 0) {
			// convert string times to integers
			for (var i in settings.disableTimeRanges) {
				settings.disableTimeRanges[i] = [
					_time2int(settings.disableTimeRanges[i][0]),
					_time2int(settings.disableTimeRanges[i][1])
				];
			}

			// sort by starting time
			settings.disableTimeRanges = settings.disableTimeRanges.sort(function(a, b){
				return a[0] - b[0];
			});

			// merge any overlapping ranges
			for (var i = settings.disableTimeRanges.length-1; i > 0; i--) {
				if (settings.disableTimeRanges[i][0] <= settings.disableTimeRanges[i-1][1]) {
					settings.disableTimeRanges[i-1] = [
						Math.min(settings.disableTimeRanges[i][0], settings.disableTimeRanges[i-1][0]),
						Math.max(settings.disableTimeRanges[i][1], settings.disableTimeRanges[i-1][1])
					];
					settings.disableTimeRanges.splice(i, 1);
				}
			}
		}

		return settings;
	}

	function _render(self)
	{
		var settings = self.data('timepicker-settings');
		var list = self.data('timepicker-list');

		if (list && list.length) {
			list.remove();
			self.data('timepicker-list', false);
		}

		if (settings.useSelect) {
			list = $('<select />', { 'class': 'ui-timepicker-select' });
			var wrapped_list = list;
		} else {
			list = $('<ul />', { 'class': 'ui-timepicker-list' });

			var wrapped_list = $('<div />', { 'class': 'ui-timepicker-wrapper', 'tabindex': -1 });
			wrapped_list.css({'display':'none', 'position': 'absolute' }).append(list);
		}

		if (settings.noneOption) {
			if (settings.noneOption === true) {
				settings.noneOption = (settings.useSelect) ? 'Time...' : 'None';
			}

			if ($.isArray(settings.noneOption)) {
				for (var i in settings.noneOption) {
					if (parseInt(i, 10) === i){
						var noneElement = _generateNoneElement(settings.noneOption[i], settings.useSelect);
						list.append(noneElement);
					}
				}
			} else {
				var noneElement = _generateNoneElement(settings.noneOption, settings.useSelect);
				list.append(noneElement);
			}
		}

		if (settings.className) {
			wrapped_list.addClass(settings.className);
		}

		if ((settings.minTime !== null || settings.durationTime !== null) && settings.showDuration) {
			wrapped_list.addClass('ui-timepicker-with-duration');
			wrapped_list.addClass('ui-timepicker-step-'+settings.step);
		}

		var durStart = settings.minTime;
		if (typeof settings.durationTime === 'function') {
			durStart = _time2int(settings.durationTime());
		} else if (settings.durationTime !== null) {
			durStart = settings.durationTime;
		}
		var start = (settings.minTime !== null) ? settings.minTime : 0;
		var end = (settings.maxTime !== null) ? settings.maxTime : (start + _ONE_DAY - 1);

		if (end <= start) {
			// make sure the end time is greater than start time, otherwise there will be no list to show
			end += _ONE_DAY;
		}

		if (end === _ONE_DAY-1 && settings.timeFormat.indexOf('H') !== -1) {
			// show a 24:00 option when using military time
			end = _ONE_DAY;
		}

		var dr = settings.disableTimeRanges;
		var drCur = 0;
		var drLen = dr.length;

		for (var i=start; i <= end; i += settings.step*60) {
			var timeInt = i;
			var timeString = _int2time(timeInt, settings.timeFormat);

			if (settings.useSelect) {
				var row = $('<option />', { 'value': timeString });
				row.text(timeString);
			} else {
				var row = $('<li />');
				row.data('time', (timeInt <= 86400 ? timeInt : timeInt % 86400));
				row.text(timeString);
			}

			if ((settings.minTime !== null || settings.durationTime !== null) && settings.showDuration) {
				var durationString = _int2duration(i - durStart, settings.step);
				if (settings.useSelect) {
					row.text(row.text()+' ('+durationString+')');
				} else {
					var duration = $('<span />', { 'class': 'ui-timepicker-duration' });
					duration.text(' ('+durationString+')');
					row.append(duration);
				}
			}

			if (drCur < drLen) {
				if (timeInt >= dr[drCur][1]) {
					drCur += 1;
				}

				if (dr[drCur] && timeInt >= dr[drCur][0] && timeInt < dr[drCur][1]) {
					if (settings.useSelect) {
						row.prop('disabled', true);
					} else {
						row.addClass('ui-timepicker-disabled');
					}
				}
			}

			list.append(row);
		}

		wrapped_list.data('timepicker-input', self);
		self.data('timepicker-list', wrapped_list);

		if (settings.useSelect) {
			list.val(_roundAndFormatTime(self.val(), settings));
			list.on('focus', function(){
				$(this).data('timepicker-input').trigger('showTimepicker');
			});
			list.on('blur', function(){
				$(this).data('timepicker-input').trigger('hideTimepicker');
			});
			list.on('change', function(){
				_setTimeValue(self, $(this).val(), 'select');
			});

			self.hide().after(list);
		} else {
			var appendTo = settings.appendTo;
			if (typeof appendTo === 'string') {
				appendTo = $(appendTo);
			} else if (typeof appendTo === 'function') {
				appendTo = appendTo(self);
			}
			appendTo.append(wrapped_list);
			_setSelected(self, list);

			list.on('mousedown', 'li', function(e) {

				// hack: temporarily disable the focus handler
				// to deal with the fact that IE fires 'focus'
				// events asynchronously
				self.off('focus.timepicker');
				self.on('focus.timepicker-ie-hack', function(){
					self.off('focus.timepicker-ie-hack');
					self.on('focus.timepicker', methods.show);
				});

				if (!_hideKeyboard(self)) {
					self[0].focus();
				}

				// make sure only the clicked row is selected
				list.find('li').removeClass('ui-timepicker-selected');
				$(this).addClass('ui-timepicker-selected');

				if (_selectValue(self)) {
					self.trigger('hideTimepicker');
					wrapped_list.hide();
				}
			});
		}
	}

	function _generateNoneElement(optionValue, useSelect)
	{
		var label, className, value;

		if (typeof optionValue == 'object') {
			label = optionValue.label;
			className = optionValue.className;
			value = optionValue.value;
		} else if (typeof optionValue == 'string') {
			label = optionValue;
		} else {
			$.error('Invalid noneOption value');
		}

		if (useSelect) {
			return $('<option />', {
					'value': value,
					'class': className,
					'text': label
				});
		} else {
			return $('<li />', {
					'class': className,
					'text': label
				}).data('time', value);
		}
	}

	function _roundTime(seconds, settings)
	{
		if (!$.isNumeric(seconds)) {
			seconds = _time2int(seconds);
		}

		if (seconds === null) {
			return null;
		} else {
			var offset = seconds % (settings.step*60); // step is in minutes

			if (offset >= settings.step*30) {
				// if offset is larger than a half step, round up
				seconds += (settings.step*60) - offset;
			} else {
				// round down
				seconds -= offset;
			}

			return seconds;
		}
	}

	function _roundAndFormatTime(seconds, settings)
	{
		seconds = _roundTime(seconds, settings);
		if (seconds !== null) {
			return _int2time(seconds, settings.timeFormat);
		}
	}

	function _generateBaseDate()
	{
		return new Date(1970, 1, 1, 0, 0, 0);
	}

	// event handler to decide whether to close timepicker
	function _closeHandler(e)
	{
		var target = $(e.target);
		var input = target.closest('.ui-timepicker-input');
		if (input.length === 0 && target.closest('.ui-timepicker-wrapper').length === 0) {
			methods.hide();
			$(document).unbind('.ui-timepicker');
		}
	}

	function _hideKeyboard(self)
	{
		var settings = self.data('timepicker-settings');
		return ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && settings.disableTouchKeyboard);
	}

	function _findRow(self, list, value)
	{
		if (!value && value !== 0) {
			return false;
		}

		var settings = self.data('timepicker-settings');
		var out = false;
		var halfStep = settings.step*30;

		// loop through the menu items
		list.find('li').each(function(i, obj) {
			var jObj = $(obj);
			if (typeof jObj.data('time') != 'number') {
				return;
			}

			var offset = jObj.data('time') - value;

			// check if the value is less than half a step from each row
			if (Math.abs(offset) < halfStep || offset == halfStep) {
				out = jObj;
				return false;
			}
		});

		return out;
	}

	function _setSelected(self, list)
	{
		list.find('li').removeClass('ui-timepicker-selected');

		var timeValue = _time2int(_getTimeValue(self), self.data('timepicker-settings'));
		if (timeValue === null) {
			return;
		}

		var selected = _findRow(self, list, timeValue);
		if (selected) {

			var topDelta = selected.offset().top - list.offset().top;

			if (topDelta + selected.outerHeight() > list.outerHeight() || topDelta < 0) {
				list.scrollTop(list.scrollTop() + selected.position().top - selected.outerHeight());
			}

			selected.addClass('ui-timepicker-selected');
		}
	}


	function _formatValue(e)
	{
		if (this.value === '') {
			return;
		}

		var self = $(this);
		var list = self.data('timepicker-list');

		if (self.is(':focus') && (!e || e.type != 'change')) {
			return;
		}

		var seconds = _time2int(this.value);

		if (seconds === null) {
			self.trigger('timeFormatError');
			return;
		}

		var settings = self.data('timepicker-settings');
		var rangeError = false;
		// check that the time in within bounds
		if (settings.minTime !== null && seconds < settings.minTime) {
			rangeError = true;
		} else if (settings.maxTime !== null && seconds > settings.maxTime) {
			rangeError = true;
		}

		// check that time isn't within disabled time ranges
		$.each(settings.disableTimeRanges, function(){
			if (seconds >= this[0] && seconds < this[1]) {
				rangeError = true;
				return false;
			}
		});

		if (settings.forceRoundTime) {
			var offset = seconds % (settings.step*60); // step is in minutes

			if (offset >= settings.step*30) {
				// if offset is larger than a half step, round up
				seconds += (settings.step*60) - offset;
			} else {
				// round down
				seconds -= offset;
			}
		}

		var prettyTime = _int2time(seconds, settings.timeFormat);

		if (rangeError) {
			if (_setTimeValue(self, prettyTime, 'error')) {
				self.trigger('timeRangeError');
			}
		} else {
			_setTimeValue(self, prettyTime);
		}
	}

	function _getTimeValue(self)
	{
		if (self.is('input')) {
			return self.val();
		} else {
			// use the element's data attributes to store values
			return self.data('ui-timepicker-value');
		}
	}

	function _setTimeValue(self, value, source)
	{
		if (self.is('input')) {
			self.val(value);

			var settings = self.data('timepicker-settings');
			if (settings.useSelect) {
				self.data('timepicker-list').val(_roundAndFormatTime(value, settings));
			}
		}

		if (self.data('ui-timepicker-value') != value) {
			self.data('ui-timepicker-value', value);
			if (source == 'select') {
				self.trigger('selectTime').trigger('changeTime').trigger('change');
			} else if (source != 'error') {
				self.trigger('changeTime');
			}

			return true;
		} else {
			self.trigger('selectTime');
			return false;
		}
	}

	/*
	*  Keyboard navigation via arrow keys
	*/
	function _keydownhandler(e)
	{
		var self = $(this);
		var list = self.data('timepicker-list');

		if (!list || !list.is(':visible')) {
			if (e.keyCode == 40) {
				// show the list!
				methods.show.call(self.get(0));
				list = self.data('timepicker-list');
				if (!_hideKeyboard(self)) {
					self.focus();
				}
			} else {
				return true;
			}
		}

		switch (e.keyCode) {

			case 13: // return
				if (_selectValue(self)) {
					methods.hide.apply(this);
				}

				e.preventDefault();
				return false;

			case 38: // up
				var selected = list.find('.ui-timepicker-selected');

				if (!selected.length) {
					list.find('li').each(function(i, obj) {
						if ($(obj).position().top > 0) {
							selected = $(obj);
							return false;
						}
					});
					selected.addClass('ui-timepicker-selected');

				} else if (!selected.is(':first-child')) {
					selected.removeClass('ui-timepicker-selected');
					selected.prev().addClass('ui-timepicker-selected');

					if (selected.prev().position().top < selected.outerHeight()) {
						list.scrollTop(list.scrollTop() - selected.outerHeight());
					}
				}

				return false;

			case 40: // down
				selected = list.find('.ui-timepicker-selected');

				if (selected.length === 0) {
					list.find('li').each(function(i, obj) {
						if ($(obj).position().top > 0) {
							selected = $(obj);
							return false;
						}
					});

					selected.addClass('ui-timepicker-selected');
				} else if (!selected.is(':last-child')) {
					selected.removeClass('ui-timepicker-selected');
					selected.next().addClass('ui-timepicker-selected');

					if (selected.next().position().top + 2*selected.outerHeight() > list.outerHeight()) {
						list.scrollTop(list.scrollTop() + selected.outerHeight());
					}
				}

				return false;

			case 27: // escape
				list.find('li').removeClass('ui-timepicker-selected');
				methods.hide();
				break;

			case 9: //tab
				methods.hide();
				break;

			default:
				return true;
		}
	}

	/*
	*	Time typeahead
	*/
	function _keyuphandler(e)
	{
		var self = $(this);
		var list = self.data('timepicker-list');

		if (!list || !list.is(':visible')) {
			return true;
		}

		if (!self.data('timepicker-settings').typeaheadHighlight) {
			list.find('li').removeClass('ui-timepicker-selected');
			return true;
		}

		switch (e.keyCode) {

			case 96: // numpad numerals
			case 97:
			case 98:
			case 99:
			case 100:
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 48: // numerals
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 65: // a
			case 77: // m
			case 80: // p
			case 186: // colon
			case 8: // backspace
			case 46: // delete
				_setSelected(self, list);
				break;

			default:
				// list.find('li').removeClass('ui-timepicker-selected');
				return;
		}
	}

	function _selectValue(self)
	{
		var settings = self.data('timepicker-settings');
		var list = self.data('timepicker-list');
		var timeValue = null;

		var cursor = list.find('.ui-timepicker-selected');

		if (cursor.hasClass('ui-timepicker-disabled')) {
			return false;
		}

		if (cursor.length) {
			// selected value found
			timeValue = cursor.data('time');
		}

		if (timeValue !== null) {
			if (typeof timeValue == 'string') {
				self.val(timeValue);
			} else {
				var timeString = _int2time(timeValue, settings.timeFormat);
				_setTimeValue(self, timeString, 'select');
			}
		}

		//self.trigger('change').trigger('selectTime');
		return true;
	}

	function _int2duration(seconds, step)
	{
		seconds = Math.abs(seconds);
		var minutes = Math.round(seconds/60),
			duration = [],
			hours, mins;

		if (minutes < 60) {
			// Only show (x mins) under 1 hour
			duration = [minutes, _lang.mins];
		} else {
			hours = Math.floor(minutes/60);
			mins = minutes%60;

			// Show decimal notation (eg: 1.5 hrs) for 30 minute steps
			if (step == 30 && mins == 30) {
				hours += _lang.decimal + 5;
			}

			duration.push(hours);
			duration.push(hours == 1 ? _lang.hr : _lang.hrs);

			// Show remainder minutes notation (eg: 1 hr 15 mins) for non-30 minute steps
			// and only if there are remainder minutes to show
			if (step != 30 && mins) {
				duration.push(mins);
				duration.push(_lang.mins);
			}
		}

		return duration.join(' ');
	}

	function _int2time(seconds, format)
	{
		if (seconds === null) {
			return;
		}

		var time = new Date(_baseDate.valueOf() + (seconds*1000));

		if (isNaN(time.getTime())) {
			return;
		}

		var output = '';
		var hour, code;

		for (var i=0; i<format.length; i++) {

			code = format.charAt(i);
			switch (code) {

				case 'a':
					output += (time.getHours() > 11) ? _lang.pm : _lang.am;
					break;

				case 'A':
					output += (time.getHours() > 11) ? _lang.PM : _lang.AM;
					break;

				case 'g':
					hour = time.getHours() % 12;
					output += (hour === 0) ? '12' : hour;
					break;

				case 'G':
					output += time.getHours();
					break;

				case 'h':
					hour = time.getHours() % 12;

					if (hour !== 0 && hour < 10) {
						hour = '0'+hour;
					}

					output += (hour === 0) ? '12' : hour;
					break;

				case 'H':
					hour = time.getHours();
					if (seconds === _ONE_DAY) hour = 24;
					output += (hour > 9) ? hour : '0'+hour;
					break;

				case 'i':
					var minutes = time.getMinutes();
					output += (minutes > 9) ? minutes : '0'+minutes;
					break;

				case 's':
					seconds = time.getSeconds();
					output += (seconds > 9) ? seconds : '0'+seconds;
					break;

				default:
					output += code;
			}
		}

		return output;
	}

	function _time2int(timeString, settings)
	{
		if (timeString === '') return null;
		if (!timeString || timeString+0 == timeString) return timeString;

		if (typeof(timeString) == 'object') {
			return timeString.getHours()*3600 + timeString.getMinutes()*60 + timeString.getSeconds();
		}

		timeString = timeString.toLowerCase();

		var d = new Date(0);
		var time;

		// try to parse time input
		time = timeString.match(/^([0-2]?[0-9])\W?([0-5][0-9])?\W?([0-5][0-9])?\s*([pa]?)m?$/);

		if (!time) {
			return null;
		}

		var hour = parseInt(time[1]*1, 10);
		var ampm = time[4];
		var hours = hour;

		if (ampm) {
			if (hour == 12) {
				hours = (time[4] == 'p') ? 12 : 0;
			} else {
				hours = (hour + (time[4] == 'p' ? 12 : 0));
			}
		}

		var minutes = ( time[2]*1 || 0 );
		var seconds = ( time[3]*1 || 0 );
		var timeInt = hours*3600 + minutes*60 + seconds;

		// if no am/pm provided, intelligently guess based on the scrollDefault
		if (!ampm && settings && settings._twelveHourTime && settings.scrollDefault) {
			var delta = timeInt - settings.scrollDefault;
			if (delta < 0 && delta >= _ONE_DAY / -2) {
				timeInt = (timeInt + (_ONE_DAY / 2)) % _ONE_DAY;
			}
		}

		return timeInt
	}

	function _pad2(n) {
		return ("0" + n).slice(-2);
	}

	// Plugin entry
	$.fn.timepicker = function(method)
	{
		if (!this.length) return this;
		if (methods[method]) {
			// check if this element is a timepicker
			if (!this.hasClass('ui-timepicker-input')) {
				return this;
			}
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof method === "object" || !method) { return methods.init.apply(this, arguments); }
		else { $.error("Method "+ method + " does not exist on jQuery.timepicker"); }
	};
}));

/**
 * @preserve jQuery DateTimePicker plugin v2.3.4
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * (c) 2014, Chupurnov Valeriy.
 */
define('jqdatetimepicker',["jquery"], function($){

(function( $ ) {
	
	var default_options  = {
		i18n:{
			ar: { // Arabic
				months: [
					"كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
				],
				dayOfWeek: [
					"ن", "ث", "ع", "خ", "ج", "س", "ح"
				]
			},
			ro: { // Romanian
				months: [
					"ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"
				],
				dayOfWeek: [
					"l", "ma", "mi", "j", "v", "s", "d"
				]
			},
			id: { // Indonesian
				months: [
					"Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
				],
				dayOfWeek: [
					"Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"
				]
			},
			bg:{ // Bulgarian
				months:[
					"Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
				],
				dayOfWeek:[
					"Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
				]
			},
			fa:{ // Persian/Farsi
				months:[
					'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
				],
				dayOfWeek:[
					'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
				]
			},
			ru:{ // Russian
				months:[
					'Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
				],
				dayOfWeek:[
					"Вск", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
				]
			},
			uk:{ // Ukrainian
				months:[
					'Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'
				],
				dayOfWeek:[
					"Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"
				]
			},
			en:{ // English
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeek: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				]
			},
			el:{ // Ελληνικά
				months: [
					"Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
				],
				dayOfWeek: [
					"Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"
				]
			},
			de:{ // German
				months:[
					'Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'
				],
				dayOfWeek:[
					"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
				]
			},
			nl:{ // Dutch
				months:[
					"januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
				],
				dayOfWeek:[
					"zo", "ma", "di", "wo", "do", "vr", "za"
				]
			},
			tr:{ // Turkish
				months:[
					"Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
				],
				dayOfWeek:[
					"Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"
				]
			},
			fr:{ //French
				months:[
			    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
				],
				dayOfWeek:[
					"Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
				]
			},
			es:{ // Spanish
				months: [
					"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
				],
				dayOfWeek: [
					"Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
				]
			},
			th:{ // Thai
				months:[
					'มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'
				],
				dayOfWeek:[
					'อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.'
				]
			},
			pl:{ // Polish
				months: [
					"styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
				],
				dayOfWeek: [
					"nd", "pn", "wt", "śr", "cz", "pt", "sb"
				]
			},
			pt:{ // Portuguese
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeek: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
				]
			},
			ch:{ // Simplified Chinese
				months: [
					"一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"
				],
				dayOfWeek: [
					"日", "一","二","三","四","五","六"
				]
			},
			se:{ // Swedish
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September","Oktober", "November", "December"
				],
				dayOfWeek: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				]
			},
			kr:{ // Korean
				months: [
					"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
				],
				dayOfWeek: [
					"일", "월", "화", "수", "목", "금", "토"
				]
			},
			it:{ // Italian
				months: [
					"Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
				],
				dayOfWeek: [
					"Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
				]
			},
			da:{ // Dansk
				months: [
					"January", "Februar", "Marts", "April", "Maj", "Juni", "July", "August", "September", "Oktober", "November", "December"
				],
				dayOfWeek: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				]
			},
			no:{ // Norwegian
				months: [
					"Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"
				],
				dayOfWeek: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				]
			},
			ja:{ // Japanese
				months: [
					"1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
				],
				dayOfWeek: [
					"日", "月", "火", "水", "木", "金", "土"
				]
			},
			vi:{ // Vietnamese
				months: [
					"Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
				],
				dayOfWeek: [
					"CN", "T2", "T3", "T4", "T5", "T6", "T7"
				]
			},
			sl:{ // Slovenščina
				months: [
					"Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"
				],
				dayOfWeek: [
					"Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"
				]
			},
			cs:{ // Čeština
				months: [
					"Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
				],
				dayOfWeek: [
					"Ne", "Po", "Út", "St", "Čt", "Pá", "So"
				]
			},
			hu:{ // Hungarian
			    months: [
					"Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
			    ],
			    dayOfWeek: [
					"Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"
			    ]
			}
		},
		value:'',
		lang:'en',
		
		format:	'Y/m/d H:i',
		formatTime:	'H:i',
		formatDate:	'Y/m/d',
		
		startDate:	false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05', 
		
		step:60,
		monthChangeSpinner:true,
		closeOnDateSelect:false,
		closeOnWithoutClick:true,
		closeOnInputClick: true,
		
		timepicker:true,
		datepicker:true,
		weeks:false,
		
		defaultTime:false,		// use formatTime format (ex. '10:00' for formatTime:	'H:i')
		defaultDate:false, 		// use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')
		
		minDate:false,
		maxDate:false,
		minTime:false,
		maxTime:false,
		
		allowTimes:[],
		opened:false,
		initTime:true,
		inline:false,
		
		onSelectDate:function() {},
		onSelectTime:function() {},
		onChangeMonth:function() {},
		onChangeDateTime:function() {},
		onShow:function() {},
		onClose:function() {},
		onGenerate:function() {},
		
		withoutCopyright:true,
		
		inverseButton:false,
		hours12:false,
		next:	'xdsoft_next',
		prev : 'xdsoft_prev',
		dayOfWeekStart:0,
		
		timeHeightInTimePicker:25,
		timepickerScrollbar:true,
		
		todayButton:true, // 2.1.0
		defaultSelect:true, // 2.1.0
		
		scrollMonth:true,
		scrollTime:true,
		scrollInput:true,
		
		lazyInit:false,
		
		mask:false,
		validateOnBlur:true,
		allowBlank:true,
		
		yearStart:1950,
		yearEnd:2050,
		
		style:'',
		id:'',
		
		fixed: false,
		
		roundTime:'round', // ceil, floor
		className:'',
		
		weekends	: 	[],
		yearOffset:0,
		beforeShowDay: null
	};
	
	// fix for ie8
	if ( !Array.prototype.indexOf ) {
		Array.prototype.indexOf = function(obj, start) {
			 for (var i = (start || 0), j = this.length; i < j; i++) {
				 if (this[i] === obj) { return i; }
			 }
			 return -1;
		}
	}
	
	Date.prototype.countDaysInMonth = function(){
		return new Date(this.getFullYear(), this.getMonth()+1, 0).getDate();
	};
	
	$.fn.xdsoftScroller = function( _percent ) {
		return this.each(function() {
			var timeboxparent = $(this);
			if( !$(this).hasClass('xdsoft_scroller_box') ) {
				var pointerEventToXY = function( e ) {
						var out = {x:0, y:0};
						if( e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel' ) {
							var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
							out.x = touch.pageX;
							out.y = touch.pageY;
						}else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
							out.x = e.pageX;
							out.y = e.pageY;
						}
						return out;
					},
					move = 0,
					timebox = timeboxparent.children().eq(0),
					parentHeight = timeboxparent[0].clientHeight,
					height = timebox[0].offsetHeight,
					scrollbar = $('<div class="xdsoft_scrollbar"></div>'),
					scroller = $('<div class="xdsoft_scroller"></div>'),
					maximumOffset = 100,
					start = false;

				scrollbar.append(scroller);

				timeboxparent.addClass('xdsoft_scroller_box').append(scrollbar);
				scroller.on('mousedown.xdsoft_scroller',function ( event ) {
					if( !parentHeight )
						timeboxparent.trigger('resize_scroll.xdsoft_scroller',[_percent]);
					var pageY = event.pageY,
						top = parseInt(scroller.css('margin-top')),
						h1 = scrollbar[0].offsetHeight;
					$(document.body).addClass('xdsoft_noselect');
					$([document.body,window]).on('mouseup.xdsoft_scroller',function arguments_callee() {
						$([document.body,window]).off('mouseup.xdsoft_scroller',arguments_callee)
							.off('mousemove.xdsoft_scroller',move)
							.removeClass('xdsoft_noselect');
					});
					$(document.body).on('mousemove.xdsoft_scroller',move = function(event) {
						var offset = event.pageY-pageY+top;
						if( offset<0 )
							offset = 0;
						if( offset+scroller[0].offsetHeight>h1 )
							offset = h1-scroller[0].offsetHeight;
						timeboxparent.trigger('scroll_element.xdsoft_scroller',[maximumOffset?offset/maximumOffset:0]);
					});
				});

				timeboxparent
					.on('scroll_element.xdsoft_scroller',function( event,percent ) {
						if( !parentHeight )
							timeboxparent.trigger('resize_scroll.xdsoft_scroller',[percent,true]);
						percent = percent>1?1:(percent<0||isNaN(percent))?0:percent;
						scroller.css('margin-top',maximumOffset*percent);
						timebox.css('marginTop',-parseInt((height-parentHeight)*percent))
					})
					.on('resize_scroll.xdsoft_scroller',function( event,_percent,noTriggerScroll ) {
						parentHeight = timeboxparent[0].clientHeight;
						height = timebox[0].offsetHeight;
						var percent = parentHeight/height,
							sh = percent*scrollbar[0].offsetHeight;
						if( percent>1 )
							scroller.hide();
						else{
							scroller.show();
							scroller.css('height',parseInt(sh>10?sh:10));
							maximumOffset = scrollbar[0].offsetHeight-scroller[0].offsetHeight;
							if( noTriggerScroll!==true )
								timeboxparent.trigger('scroll_element.xdsoft_scroller',[_percent?_percent:Math.abs(parseInt(timebox.css('marginTop')))/(height-parentHeight)]);
						}
					});
				timeboxparent.mousewheel&&timeboxparent.mousewheel(function(event, delta, deltaX, deltaY) {
					var top = Math.abs(parseInt(timebox.css('marginTop')));
					timeboxparent.trigger('scroll_element.xdsoft_scroller',[(top-delta*20)/(height-parentHeight)]);
					event.stopPropagation();
					return false;
				});
				timeboxparent.on('touchstart',function( event ) {
					start = pointerEventToXY(event);
				});
				timeboxparent.on('touchmove',function( event ) {
					if( start ) {
						var coord = pointerEventToXY(event), top = Math.abs(parseInt(timebox.css('marginTop')));
						timeboxparent.trigger('scroll_element.xdsoft_scroller',[(top-(coord.y-start.y))/(height-parentHeight)]);
						event.stopPropagation();
						event.preventDefault();
						start = pointerEventToXY(event);
					}
				});
				timeboxparent.on('touchend touchcancel',function( event ) {
					start = false;
				});
			}
			timeboxparent.trigger('resize_scroll.xdsoft_scroller',[_percent]);
		});
	};
	$.fn.datetimepicker = function( opt ) {
		var KEY0 = 48,
			KEY9 = 57,
			_KEY0 = 96,
			_KEY9 = 105,
			CTRLKEY = 17,
			DEL = 46,
			ENTER = 13,
			ESC = 27,
			BACKSPACE = 8,
			ARROWLEFT = 37,
			ARROWUP = 38,
			ARROWRIGHT = 39,
			ARROWDOWN = 40,
			TAB = 9,
			F5 = 116,
			AKEY = 65,
			CKEY = 67,
			VKEY = 86,
			ZKEY = 90,
			YKEY = 89,
			ctrlDown	=	false,
			options = ($.isPlainObject(opt)||!opt)?$.extend(true,{},default_options,opt):$.extend({},default_options),

			lazyInitTimer = 0,

			lazyInit = function( input ){
				input
					.on('open.xdsoft focusin.xdsoft mousedown.xdsoft',function initOnActionCallback(event) {
						if( input.is(':disabled')||input.is(':hidden')||!input.is(':visible')||input.data( 'xdsoft_datetimepicker') )
							return;
				
						clearTimeout(lazyInitTimer);
						
						lazyInitTimer = setTimeout(function() {

							if( !input.data( 'xdsoft_datetimepicker') )
								createDateTimePicker(input);
								
							input
								.off('open.xdsoft focusin.xdsoft mousedown.xdsoft',initOnActionCallback)
								.trigger('open.xdsoft');
						},100);
						
					});
			},
			
			createDateTimePicker = function( input ) {
				
				var datetimepicker = $('<div '+(options.id?'id="'+options.id+'"':'')+' '+(options.style?'style="'+options.style+'"':'')+' class="xdsoft_datetimepicker xdsoft_noselect '+(options.weeks?' xdsoft_showweeks':'')+options.className+'"></div>'),
					xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
					datepicker = $('<div class="xdsoft_datepicker active"></div>'),
					mounth_picker = $('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span></div><div class="xdsoft_label xdsoft_year"><span></span></div><button type="button" class="xdsoft_next"></button></div>'),
					calendar = $('<div class="xdsoft_calendar"></div>'),
					timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
					timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
					timebox = $('<div class="xdsoft_time_variant"></div>'),
					scrollbar = $('<div class="xdsoft_scrollbar"></div>'),
					scroller = $('<div class="xdsoft_scroller"></div>'),
					monthselect =$('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
					yearselect =$('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>');

				//constructor lego
				mounth_picker
					.find('.xdsoft_month span')
						.after(monthselect);
				mounth_picker
					.find('.xdsoft_year span')
						.after(yearselect);

				mounth_picker
					.find('.xdsoft_month,.xdsoft_year')
						.on('mousedown.xdsoft',function(event) {
							mounth_picker
								.find('.xdsoft_select')
									.hide();
									
							var select = $(this).find('.xdsoft_select').eq(0),
								val = 0,
								top = 0;

							if( _xdsoft_datetime.currentTime )
								val = _xdsoft_datetime.currentTime[$(this).hasClass('xdsoft_month')?'getMonth':'getFullYear']();

							select.show();
							
							for(var items = select.find('div.xdsoft_option'),i = 0;i<items.length;i++) {
								if( items.eq(i).data('value')==val ) {
									break;
								}else top+=items[0].offsetHeight;
							}

							select.xdsoftScroller(top/(select.children()[0].offsetHeight-(select[0].clientHeight)));
							event.stopPropagation();
							
							return false;
						});

				mounth_picker
					.find('.xdsoft_select')
						.xdsoftScroller()
						.on('mousedown.xdsoft',function( event ) {
							event.stopPropagation();
							event.preventDefault();
						})
						.on('mousedown.xdsoft','.xdsoft_option',function( event ) {
							if( _xdsoft_datetime&&_xdsoft_datetime.currentTime )
								_xdsoft_datetime.currentTime[$(this).parent().parent().hasClass('xdsoft_monthselect')?'setMonth':'setFullYear']($(this).data('value'));
							
							$(this).parent().parent().hide();
							
							datetimepicker.trigger('xchange.xdsoft');
							options.onChangeMonth&&options.onChangeMonth.call&&options.onChangeMonth.call(datetimepicker,_xdsoft_datetime.currentTime,datetimepicker.data('input'));
						});


				// set options
				datetimepicker.setOptions = function( _options ) {
					options = $.extend(true,{},options,_options);
					
					if( _options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length ){
						options['allowTimes'] = $.extend(true,[],_options.allowTimes);
					}
					
					if( _options.weekends && $.isArray(_options.weekends) && _options.weekends.length ){
						options['weekends'] = $.extend(true,[],_options.weekends);
					}
					
					if( (options.open||options.opened)&&(!options.inline) ) {
						input.trigger('open.xdsoft');
					}

					if( options.inline ) {
						triggerAfterOpen = true;
						datetimepicker.addClass('xdsoft_inline');
						input.after(datetimepicker).hide();
					}

					if( options.inverseButton ) {
						options.next = 'xdsoft_prev';
						options.prev = 'xdsoft_next';
					}

					if( options.datepicker )
						datepicker.addClass('active');
					else
						datepicker.removeClass('active');

					if( options.timepicker )
						timepicker.addClass('active');
					else
						timepicker.removeClass('active');

					if( options.value ){
						input&&input.val&&input.val(options.value);
						_xdsoft_datetime.setCurrentTime(options.value);
					}

					if( isNaN(options.dayOfWeekStart) )
						options.dayOfWeekStart = 0;
					else
						options.dayOfWeekStart = parseInt(options.dayOfWeekStart)%7;

					if( !options.timepickerScrollbar )
						scrollbar.hide();
					
					if( options.minDate && /^-(.*)$/.test(options.minDate) ){
						options.minDate = _xdsoft_datetime.strToDateTime(options.minDate).dateFormat( options.formatDate );
					}
					
					if( options.maxDate &&  /^\+(.*)$/.test(options.maxDate) ) {
						options.maxDate = _xdsoft_datetime.strToDateTime(options.maxDate).dateFormat( options.formatDate );
					}
					
					mounth_picker
						.find('.xdsoft_today_button')
							.css('visibility',!options.todayButton?'hidden':'visible');

					if( options.mask ) {
						var e,
							getCaretPos = function ( input ) {
								try{
									if ( document.selection && document.selection.createRange ) {
										var range = document.selection.createRange();
										return range.getBookmark().charCodeAt(2) - 2;
									}else
										if ( input.setSelectionRange )
											return input.selectionStart;
								}catch(e) {
									return 0;
								}
							},
							setCaretPos = function ( node,pos ) {
								node = (typeof node == "string" || node instanceof String) ? document.getElementById(node) : node;
								if(!node) {
									return false;
								}else if(node.createTextRange) {
									var textRange = node.createTextRange();
									textRange.collapse(true);
									textRange.moveEnd(pos);
									textRange.moveStart(pos);
									textRange.select();
									return true;
								}else if(node.setSelectionRange) {
									node.setSelectionRange(pos,pos);
									return true;
								}
								return false;
							},
							isValidValue = function ( mask,value ) {
								var reg = mask
									.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g,'\\$1')
									.replace(/_/g,'{digit+}')
									.replace(/([0-9]{1})/g,'{digit$1}')
									.replace(/\{digit([0-9]{1})\}/g,'[0-$1_]{1}')
									.replace(/\{digit[\+]\}/g,'[0-9_]{1}');
								return RegExp(reg).test(value);
							};
						input.off('keydown.xdsoft');
						switch(true) {
							case ( options.mask===true ):
							
								options.mask = options.format
									.replace(/Y/g,'9999')
									.replace(/F/g,'9999')
									.replace(/m/g,'19')
									.replace(/d/g,'39')
									.replace(/H/g,'29')
									.replace(/i/g,'59')
									.replace(/s/g,'59');
									
							case ( $.type(options.mask) == 'string' ):
							
								if( !isValidValue( options.mask,input.val() ) )
									input.val(options.mask.replace(/[0-9]/g,'_'));

								input.on('keydown.xdsoft',function( event ) {
									var val = this.value,
										key = event.which;
										
									switch(true) {
										case (( key>=KEY0&&key<=KEY9 )||( key>=_KEY0&&key<=_KEY9 ))||(key==BACKSPACE||key==DEL):
											var pos = getCaretPos(this),
												digit = ( key!=BACKSPACE&&key!=DEL )?String.fromCharCode((_KEY0 <= key && key <= _KEY9)? key-KEY0 : key):'_';
											
											if( (key==BACKSPACE||key==DEL)&&pos ) {
												pos--;
												digit='_';
											}
											
											while( /[^0-9_]/.test(options.mask.substr(pos,1))&&pos<options.mask.length&&pos>0 )
												pos+=( key==BACKSPACE||key==DEL )?-1:1;

											val = val.substr(0,pos)+digit+val.substr(pos+1);
											if( $.trim(val)=='' ){
												val = options.mask.replace(/[0-9]/g,'_');
											}else{
												if( pos==options.mask.length )
													break;
											}
											
											pos+=(key==BACKSPACE||key==DEL)?0:1;
											while( /[^0-9_]/.test(options.mask.substr(pos,1))&&pos<options.mask.length&&pos>0 )
												pos+=(key==BACKSPACE||key==DEL)?-1:1;
												
											if( isValidValue( options.mask,val ) ) {
												this.value = val;
												setCaretPos(this,pos);
											}else if( $.trim(val)=='' )
												this.value = options.mask.replace(/[0-9]/g,'_');
											else{
												input.trigger('error_input.xdsoft');
											}
										break;
										case ( !!~([AKEY,CKEY,VKEY,ZKEY,YKEY].indexOf(key))&&ctrlDown ):
										 case !!~([ESC,ARROWUP,ARROWDOWN,ARROWLEFT,ARROWRIGHT,F5,CTRLKEY,TAB,ENTER].indexOf(key)):
										return true;
									}
									event.preventDefault();
									return false;
								});
							break;
						}
					}
					if( options.validateOnBlur ) {
						input
							.off('blur.xdsoft')
							.on('blur.xdsoft', function() {
								if( options.allowBlank && !$.trim($(this).val()).length ) {
									$(this).val(null);
									datetimepicker.data('xdsoft_datetime').empty();
								}else if( !Date.parseDate( $(this).val(), options.format ) ) {
									$(this).val((_xdsoft_datetime.now()).dateFormat( options.format ));
									datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
								}
								else{
									datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
 								}
								datetimepicker.trigger('changedatetime.xdsoft');
							});
					}
					options.dayOfWeekStartPrev = (options.dayOfWeekStart==0)?6:options.dayOfWeekStart-1;
					
					datetimepicker
						.trigger('xchange.xdsoft')
						.trigger('afterOpen.xdsoft')
				};

				datetimepicker
					.data('options',options)
					.on('mousedown.xdsoft',function( event ) {
						event.stopPropagation();
						event.preventDefault();
						yearselect.hide();
						monthselect.hide();
						return false;
					});

				var scroll_element = timepicker.find('.xdsoft_time_box');
				scroll_element.append(timebox);
				scroll_element.xdsoftScroller();
				
				datetimepicker.on('afterOpen.xdsoft',function() {
					scroll_element.xdsoftScroller();
				});

				datetimepicker
					.append(datepicker)
					.append(timepicker);

				if( options.withoutCopyright!==true )
					datetimepicker
						.append(xdsoft_copyright);

				datepicker
					.append(mounth_picker)
					.append(calendar);

				$('body').append(datetimepicker);

				var _xdsoft_datetime = new function() {
					var _this = this;
					_this.now = function( norecursion ) {
						var d = new Date();
						
						if( !norecursion && options.defaultDate  ){
							var date = _this.strToDate(options.defaultDate);
							d.setFullYear( date.getFullYear() );
							d.setMonth( date.getMonth() );
							d.setDate( date.getDate() );
						}
						
						if( options.yearOffset  ){
							d.setFullYear(d.getFullYear()+options.yearOffset);
						}
						
						if( !norecursion && options.defaultTime ){
							var time = _this.strtotime(options.defaultTime);
							d.setHours( time.getHours() );
							d.setMinutes( time.getMinutes() );
						}
							
						return d;
					};

					
					_this.isValidDate = function (d) {
						if ( Object.prototype.toString.call(d) !== "[object Date]" )
							return false;
						return !isNaN(d.getTime());
					};

					_this.setCurrentTime = function( dTime ) {
						_this.currentTime = (typeof dTime == 'string')? _this.strToDateTime(dTime) : _this.isValidDate(dTime) ? dTime: _this.now();
						datetimepicker.trigger('xchange.xdsoft');
					};

					_this.empty = function() {
						_this.currentTime = null;
					};

					_this.getCurrentTime = function( dTime) {
						return _this.currentTime;
					};

					_this.nextMonth = function() {
						var month = _this.currentTime.getMonth()+1;
						if( month==12 ) {
							_this.currentTime.setFullYear(_this.currentTime.getFullYear()+1);
							month = 0;
						}
						_this.currentTime.setDate(
							Math.min(
								// Day 0 is the last day in the previous month, but we want to know the number of days in the current month, so we need to evaluate the subsequent month (month+1)
								new Date(_this.currentTime.getFullYear(), month+1, 0).getDate(),
								_this.currentTime.getDate()
							)
						);
						_this.currentTime.setMonth(month);
						options.onChangeMonth&&options.onChangeMonth.call&&options.onChangeMonth.call(datetimepicker,_xdsoft_datetime.currentTime,datetimepicker.data('input'));
						datetimepicker.trigger('xchange.xdsoft');
						return month;
					};

					_this.prevMonth = function() {
						var month = _this.currentTime.getMonth()-1;
						if( month==-1 ) {
							_this.currentTime.setFullYear(_this.currentTime.getFullYear()-1);
							month = 11;
						}
						_this.currentTime.setDate(
							Math.min(
								// Day 0 is the last day in the previous month, but we want to know the number of days in the current month, so we need to evaluate the subsequent month (month+1)
								new Date(_this.currentTime.getFullYear(), month+1, 0).getDate(),
								_this.currentTime.getDate()
							)
						);
						_this.currentTime.setMonth(month);
						options.onChangeMonth&&options.onChangeMonth.call&&options.onChangeMonth.call(datetimepicker,_xdsoft_datetime.currentTime,datetimepicker.data('input'));
						datetimepicker.trigger('xchange.xdsoft');
						return month;
					};

					_this.strToDateTime = function( sDateTime ) {
						if( sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime) )
							return sDateTime;
						
						var tmpDate = [],timeOffset,currentTime;
					
						if( ( tmpDate = /^(\+|\-)(.*)$/.exec(sDateTime) )  && ( tmpDate[2]=Date.parseDate(tmpDate[2], options.formatDate) ) ) {
							timeOffset = tmpDate[2].getTime()-(tmpDate[2].getTimezoneOffset())*60000;
							currentTime = new Date((_xdsoft_datetime.now()).getTime()+parseInt(tmpDate[1]+'1')*timeOffset);
						}else
							currentTime = sDateTime?Date.parseDate(sDateTime, options.format):_this.now();
							
						if( !_this.isValidDate(currentTime) )
							currentTime = _this.now();
							
						return currentTime;
					};

					_this.strToDate = function( sDate ) {
						if( sDate && sDate instanceof Date && _this.isValidDate(sDate) )
							return sDate;
						
						var currentTime = sDate?Date.parseDate(sDate, options.formatDate):_this.now(true);
						if( !_this.isValidDate(currentTime) )
							currentTime = _this.now(true);
							
						return currentTime;
					};

					_this.strtotime = function( sTime ) {
						if( sTime && sTime instanceof Date && _this.isValidDate(sTime) )
							return sTime;
							
						var currentTime = sTime?Date.parseDate(sTime, options.formatTime):_this.now();
						if( !_this.isValidDate(currentTime) )
							currentTime = _this.now(true);
							
						return currentTime;
					};

					_this.str = function() {
						return _this.currentTime.dateFormat(options.format);
					};
					
					_this.currentTime = this.now();
				};
				mounth_picker
					.find('.xdsoft_today_button')
						.on('mousedown.xdsoft',function() {
							datetimepicker.data('changed',true);
							_xdsoft_datetime.setCurrentTime(0);
							datetimepicker.trigger('afterOpen.xdsoft');
						}).on('dblclick.xdsoft',function(){
							input.val( _xdsoft_datetime.str() );
							datetimepicker.trigger('close.xdsoft');
						});
				mounth_picker
					.find('.xdsoft_prev,.xdsoft_next')
						.on('mousedown.xdsoft',function() {
							var $this = $(this),
								timer = 0,
								stop = false;

							(function arguments_callee1(v) {
								var month =  _xdsoft_datetime.currentTime.getMonth();
								if( $this.hasClass( options.next ) ) {
									_xdsoft_datetime.nextMonth();
								}else if( $this.hasClass( options.prev ) ) {
									_xdsoft_datetime.prevMonth();
								}
								if (options.monthChangeSpinner) {
									!stop&&(timer = setTimeout(arguments_callee1,v?v:100));
								}
							})(500);

							$([document.body,window]).on('mouseup.xdsoft',function arguments_callee2() {
								clearTimeout(timer);
								stop = true;
								$([document.body,window]).off('mouseup.xdsoft',arguments_callee2);
							});
						});

				timepicker
					.find('.xdsoft_prev,.xdsoft_next')
						.on('mousedown.xdsoft',function() {
							var $this = $(this),
								timer = 0,
								stop = false,
								period = 110;
							(function arguments_callee4(v) {
								var pheight = timeboxparent[0].clientHeight,
									height = timebox[0].offsetHeight,
									top = Math.abs(parseInt(timebox.css('marginTop')));
								if( $this.hasClass(options.next) && (height-pheight)- options.timeHeightInTimePicker>=top ) {
									timebox.css('marginTop','-'+(top+options.timeHeightInTimePicker)+'px')
								}else if( $this.hasClass(options.prev) && top-options.timeHeightInTimePicker>=0  ) {
									timebox.css('marginTop','-'+(top-options.timeHeightInTimePicker)+'px')
								}
								timeboxparent.trigger('scroll_element.xdsoft_scroller',[Math.abs(parseInt(timebox.css('marginTop'))/(height-pheight))]);
								period= ( period>10 )?10:period-10;
								!stop&&(timer = setTimeout(arguments_callee4,v?v:period));
							})(500);
							$([document.body,window]).on('mouseup.xdsoft',function arguments_callee5() {
								clearTimeout(timer);
								stop = true;
								$([document.body,window])
									.off('mouseup.xdsoft',arguments_callee5);
							});
						});

				var xchangeTimer = 0;
				// base handler - generating a calendar and timepicker
				datetimepicker
					.on('xchange.xdsoft',function( event ) {
						clearTimeout(xchangeTimer);
						xchangeTimer = setTimeout(function(){
							var table 	=	'',
									start	= new Date(_xdsoft_datetime.currentTime.getFullYear(),_xdsoft_datetime.currentTime.getMonth(),1, 12, 0, 0),
									i = 0,
									today = _xdsoft_datetime.now();
								
								while( start.getDay()!=options.dayOfWeekStart )
									start.setDate(start.getDate()-1);

								//generate calendar
								table+='<table><thead><tr>';

								if(options.weeks) {
									table+='<th></th>';
								}

								// days
								for(var j = 0; j<7; j++) {
									table+='<th>'+options.i18n[options.lang].dayOfWeek[(j+options.dayOfWeekStart)%7]+'</th>';
								}

								table+='</tr></thead>';
								table+='<tbody>';
								var maxDate = false, minDate = false;
								
								if( options.maxDate!==false ) {
									maxDate = _xdsoft_datetime.strToDate(options.maxDate);
									maxDate = new Date(maxDate.getFullYear(),maxDate.getMonth(),maxDate.getDate(),23,59,59,999);
								}
								
								if( options.minDate!==false ) {
									minDate = _xdsoft_datetime.strToDate(options.minDate);
									minDate = new Date(minDate.getFullYear(),minDate.getMonth(),minDate.getDate());
								}
								
								var d,y,m,w,classes = [],customDateSettings,newRow=true;
								
								while( i<_xdsoft_datetime.currentTime.countDaysInMonth()||start.getDay()!=options.dayOfWeekStart||_xdsoft_datetime.currentTime.getMonth()==start.getMonth() ) {
									classes = [];
									i++;

									d = start.getDate(); y = start.getFullYear(); m = start.getMonth(); w = start.getWeekOfYear();

									classes.push('xdsoft_date');

									if ( options.beforeShowDay && options.beforeShowDay.call ) {
										customDateSettings = options.beforeShowDay.call(datetimepicker, start);
									} else {
										customDateSettings = null;
									}

									if( ( maxDate!==false && start > maxDate )||(  minDate!==false && start < minDate )||(customDateSettings && customDateSettings[0] === false) ){
										classes.push('xdsoft_disabled');
									}

									if ( customDateSettings && customDateSettings[1] != "" ) {
										classes.push(customDateSettings[1]);
									}

									if( _xdsoft_datetime.currentTime.getMonth()!=m ) classes.push('xdsoft_other_month');

									if( (options.defaultSelect||datetimepicker.data('changed')) && _xdsoft_datetime.currentTime.dateFormat( options.formatDate )==start.dateFormat( options.formatDate ) ) {
										classes.push('xdsoft_current');
									}

									if( today.dateFormat( options.formatDate )==start.dateFormat( options.formatDate ) ) {
										classes.push('xdsoft_today');
									}

									if( start.getDay()==0||start.getDay()==6||~options.weekends.indexOf(start.dateFormat( options.formatDate )) ) {
										classes.push('xdsoft_weekend');
									}

									if(options.beforeShowDay && typeof options.beforeShowDay == 'function') {
										classes.push(options.beforeShowDay(start))
									}

									if(newRow) {
										table+='<tr>';
										newRow = false;
										
										if(options.weeks) {
											table+='<th>'+w+'</th>';
										}
									}

									table+='<td data-date="'+d+'" data-month="'+m+'" data-year="'+y+'"'+' class="xdsoft_date xdsoft_day_of_week'+start.getDay()+' '+ classes.join(' ')+'">'+
												'<div>'+d+'</div>'+
											'</td>';

									if( start.getDay()==options.dayOfWeekStartPrev ) {
										table+='</tr>';
										newRow = true;
									}

									start.setDate(d+1);
								}
								table+='</tbody></table>';

								calendar.html(table);

								mounth_picker.find('.xdsoft_label span').eq(0).text(options.i18n[options.lang].months[_xdsoft_datetime.currentTime.getMonth()]);
								mounth_picker.find('.xdsoft_label span').eq(1).text(_xdsoft_datetime.currentTime.getFullYear());

								// generate timebox
								var time = '',
									h = '',
									m ='',
									line_time = function line_time( h,m ) {
										var now = _xdsoft_datetime.now();
										now.setHours(h);
										h = parseInt(now.getHours());
										now.setMinutes(m);
										m = parseInt(now.getMinutes());

										classes = [];
										if( (options.maxTime!==false&&_xdsoft_datetime.strtotime(options.maxTime).getTime()<now.getTime())||(options.minTime!==false&&_xdsoft_datetime.strtotime(options.minTime).getTime()>now.getTime()))
											classes.push('xdsoft_disabled');
										if( (options.initTime||options.defaultSelect||datetimepicker.data('changed')) && parseInt(_xdsoft_datetime.currentTime.getHours())==parseInt(h)&&(options.step>59||Math[options.roundTime](_xdsoft_datetime.currentTime.getMinutes()/options.step)*options.step==parseInt(m))) {
											if( options.defaultSelect||datetimepicker.data('changed')) {
												classes.push('xdsoft_current');
											} else if( options.initTime ) {
												classes.push('xdsoft_init_time');
											}
										}
										if( parseInt(today.getHours())==parseInt(h)&&parseInt(today.getMinutes())==parseInt(m))
											classes.push('xdsoft_today');
										time+= '<div class="xdsoft_time '+classes.join(' ')+'" data-hour="'+h+'" data-minute="'+m+'">'+now.dateFormat(options.formatTime)+'</div>';
									};

								if( !options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length ) {
									for( var i=0,j=0;i<(options.hours12?12:24);i++ ) {
										for( j=0;j<60;j+=options.step ) {
											h = (i<10?'0':'')+i;
											m = (j<10?'0':'')+j;
											line_time( h,m );
										}
									}
								}else{
									for( var i=0;i<options.allowTimes.length;i++ ) {
										h = _xdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
										m = _xdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
										line_time( h,m );
									}
								}

								timebox.html(time);

								var opt = '',
									i = 0;

								for( i = parseInt(options.yearStart,10)+options.yearOffset;i<= parseInt(options.yearEnd,10)+options.yearOffset;i++ ) {
									opt+='<div class="xdsoft_option '+(_xdsoft_datetime.currentTime.getFullYear()==i?'xdsoft_current':'')+'" data-value="'+i+'">'+i+'</div>';
								}
								yearselect.children().eq(0)
														.html(opt);

								for( i = 0,opt = '';i<= 11;i++ ) {
									opt+='<div class="xdsoft_option '+(_xdsoft_datetime.currentTime.getMonth()==i?'xdsoft_current':'')+'" data-value="'+i+'">'+options.i18n[options.lang].months[i]+'</div>';
								}
								monthselect.children().eq(0).html(opt);
								$(datetimepicker)
									.trigger('generate.xdsoft');
						},10);
						event.stopPropagation();
					})
					.on('afterOpen.xdsoft',function() {
						if( options.timepicker ) {
							var classType;
							if( timebox.find('.xdsoft_current').length ) {
								classType = '.xdsoft_current';
							} else if( timebox.find('.xdsoft_init_time').length ) {
								classType = '.xdsoft_init_time';
							}
							
							if( classType ) {
								var pheight = timeboxparent[0].clientHeight,
									height = timebox[0].offsetHeight,
									top = timebox.find(classType).index()*options.timeHeightInTimePicker+1;
								if( (height-pheight)<top )
									top = height-pheight;
								timeboxparent.trigger('scroll_element.xdsoft_scroller',[parseInt(top)/(height-pheight)]);
							}else{
								timeboxparent.trigger('scroll_element.xdsoft_scroller',[0]);
							}
						}
					});
				
				var timerclick = 0;
				
				calendar
					.on('click.xdsoft', 'td', function (xdevent) {
					  xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
						timerclick++;
						var $this = $(this),
							currentTime = _xdsoft_datetime.currentTime;
						
						if( currentTime===undefined||currentTime===null ){
                            _xdsoft_datetime.currentTime = _xdsoft_datetime.now();
                            currentTime = _xdsoft_datetime.currentTime;
                        }
						
						if( $this.hasClass('xdsoft_disabled') )
							return false;

						currentTime.setDate( 1 );
						currentTime.setFullYear( $this.data('year') );
						currentTime.setMonth( $this.data('month') );
						currentTime.setDate( $this.data('date') );
						
						datetimepicker.trigger('select.xdsoft',[currentTime]);

						input.val( _xdsoft_datetime.str() );
						if( (timerclick>1||(options.closeOnDateSelect===true||( options.closeOnDateSelect===0&&!options.timepicker )))&&!options.inline ) {
							datetimepicker.trigger('close.xdsoft');
						}

						if( options.onSelectDate &&	options.onSelectDate.call ) {
							options.onSelectDate.call(datetimepicker,_xdsoft_datetime.currentTime,datetimepicker.data('input'));
						}

						datetimepicker.data('changed',true);
						datetimepicker.trigger('xchange.xdsoft');
						datetimepicker.trigger('changedatetime.xdsoft');
						setTimeout(function(){
							timerclick = 0;
						},200);
					});

				timebox
					.on('click.xdsoft', 'div', function (xdevent) {
					    xdevent.stopPropagation(); // NAJ: Prevents closing of Pop-ups, Modals and Flyouts
						var $this = $(this),
							currentTime = _xdsoft_datetime.currentTime;
						
						if( currentTime===undefined||currentTime===null ){
                            _xdsoft_datetime.currentTime = _xdsoft_datetime.now();
                            currentTime = _xdsoft_datetime.currentTime;
                        }
						
						if( $this.hasClass('xdsoft_disabled') )
							return false;
						currentTime.setHours($this.data('hour'));
						currentTime.setMinutes($this.data('minute'));
						datetimepicker.trigger('select.xdsoft',[currentTime]);

						datetimepicker.data('input').val( _xdsoft_datetime.str() );

						!options.inline&&datetimepicker.trigger('close.xdsoft');

						if( options.onSelectTime&&options.onSelectTime.call ) {
							options.onSelectTime.call(datetimepicker,_xdsoft_datetime.currentTime,datetimepicker.data('input'));
						}
						datetimepicker.data('changed',true);
						datetimepicker.trigger('xchange.xdsoft');
						datetimepicker.trigger('changedatetime.xdsoft');
					});

				datetimepicker.mousewheel&&datepicker.mousewheel(function(event, delta, deltaX, deltaY) {
					if( !options.scrollMonth )
						return true;
					if( delta<0 )
						_xdsoft_datetime.nextMonth();
					else
						_xdsoft_datetime.prevMonth();
					return false;
				});

				datetimepicker.mousewheel&&timeboxparent.unmousewheel().mousewheel(function(event, delta, deltaX, deltaY) {
					if( !options.scrollTime )
						return true;
					var pheight = timeboxparent[0].clientHeight,
						height = timebox[0].offsetHeight,
						top = Math.abs(parseInt(timebox.css('marginTop'))),
						fl = true;
					if( delta<0 && (height-pheight)-options.timeHeightInTimePicker>=top ) {
						timebox.css('marginTop','-'+(top+options.timeHeightInTimePicker)+'px');
						fl = false;
					}else if( delta>0&&top-options.timeHeightInTimePicker>=0 ) {
						timebox.css('marginTop','-'+(top-options.timeHeightInTimePicker)+'px');
						fl = false;
					}
					timeboxparent.trigger('scroll_element.xdsoft_scroller',[Math.abs(parseInt(timebox.css('marginTop'))/(height-pheight))]);
					event.stopPropagation();
					return fl;
				});
				
				var triggerAfterOpen = false;
				datetimepicker
					.on('changedatetime.xdsoft',function() {
						if( options.onChangeDateTime&&options.onChangeDateTime.call ) {
							var $input = datetimepicker.data('input');
							options.onChangeDateTime.call(datetimepicker, _xdsoft_datetime.currentTime, $input);
							delete options.value;
							$input.trigger('change');
						}
					})
					.on('generate.xdsoft',function() {
						if( options.onGenerate&&options.onGenerate.call )
							options.onGenerate.call(datetimepicker,_xdsoft_datetime.currentTime,datetimepicker.data('input'));
						if( triggerAfterOpen ){
							datetimepicker.trigger('afterOpen.xdsoft');
							triggerAfterOpen = false;
						}
					})
					.on( 'click.xdsoft', function( xdevent )
					{
						xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
					});

				var current_time_index = 0;
				input.mousewheel&&input.mousewheel(function( event, delta, deltaX, deltaY ) {
					if( !options.scrollInput )
						return true;
					if( !options.datepicker && options.timepicker ) {
						current_time_index = timebox.find('.xdsoft_current').length?timebox.find('.xdsoft_current').eq(0).index():0;
						if( current_time_index+delta>=0&&current_time_index+delta<timebox.children().length )
							current_time_index+=delta;
						timebox.children().eq(current_time_index).length&&timebox.children().eq(current_time_index).trigger('mousedown');
						return false;
					}else if( options.datepicker && !options.timepicker ) {
						datepicker.trigger( event, [delta, deltaX, deltaY]);
						input.val&&input.val( _xdsoft_datetime.str() );
						datetimepicker.trigger('changedatetime.xdsoft');
						return false;
					}
				});
				var setPos = function() {
					var offset = datetimepicker.data('input').offset(), top = offset.top+datetimepicker.data('input')[0].offsetHeight-1, left = offset.left, position = "absolute";
					if (options.fixed) {
						top -= $(window).scrollTop();
						left -= $(window).scrollLeft();
						position = "fixed";
					}else {
						if( top+datetimepicker[0].offsetHeight>$(window).height()+$(window).scrollTop() )
							top = offset.top-datetimepicker[0].offsetHeight+1;
							if (top < 0)
								top = 0;
						if( left+datetimepicker[0].offsetWidth>$(window).width() )
							left = offset.left-datetimepicker[0].offsetWidth+datetimepicker.data('input')[0].offsetWidth;
					}
					datetimepicker.css({
						left:left,
						top:top,
						position: position
					});
				};
				datetimepicker
					.on('open.xdsoft', function() {
						var onShow = true;
						if( options.onShow&&options.onShow.call) {
							onShow = options.onShow.call(datetimepicker,_xdsoft_datetime.currentTime,datetimepicker.data('input'));
						}
						if( onShow!==false ) {
							datetimepicker.show();
							setPos();
							$(window)
								.off('resize.xdsoft',setPos)
								.on('resize.xdsoft',setPos);

							if( options.closeOnWithoutClick ) {
								$([document.body,window]).on('mousedown.xdsoft',function arguments_callee6() {
									datetimepicker.trigger('close.xdsoft');
									$([document.body,window]).off('mousedown.xdsoft',arguments_callee6);
								});
							}
						}
					})
					.on('close.xdsoft', function( event ) {
						var onClose = true;
						if( options.onClose&&options.onClose.call ) {
							onClose=options.onClose.call(datetimepicker,_xdsoft_datetime.currentTime,datetimepicker.data('input'));
						}
						if( onClose!==false&&!options.opened&&!options.inline ) {
							datetimepicker.hide();
						}
						event.stopPropagation();
					})
					.data('input',input);

				var timer = 0,
					timer1 = 0;

				datetimepicker.data('xdsoft_datetime',_xdsoft_datetime);
				datetimepicker.setOptions(options);
				
				function getCurrentValue(){

					var ct = false;

                    if ( options.startDate ) {
                        ct = _xdsoft_datetime.strToDate(options.startDate);
                    } else {
                        ct = options.value?options.value:(input&&input.val&&input.val())?input.val():'';
						if( ct ) {
							ct = _xdsoft_datetime.strToDateTime(ct);
						} else if ( options.defaultDate ) {
							ct = _xdsoft_datetime.strToDate(options.defaultDate);
						}
                    }

					if ( ct && _xdsoft_datetime.isValidDate(ct) ) {
						datetimepicker.data('changed',true);
					} else {
                        ct = '';
                    }
					
					return ct?ct:0;
				}
				//debugger
				_xdsoft_datetime.setCurrentTime( getCurrentValue() );

				input
					.data( 'xdsoft_datetimepicker',datetimepicker )
					.on('open.xdsoft focusin.xdsoft mousedown.xdsoft',function(event) {
						if( input.is(':disabled')||input.is(':hidden')||!input.is(':visible')||(input.data('xdsoft_datetimepicker').is(':visible') && options.closeOnInputClick) )
							return;
						clearTimeout(timer);
						timer = setTimeout(function() {
							if( input.is(':disabled')||input.is(':hidden')||!input.is(':visible') )
								return;
								
							triggerAfterOpen = true;
							_xdsoft_datetime.setCurrentTime(getCurrentValue());
							
							datetimepicker.trigger('open.xdsoft');
						},100);
					})
					.on('keydown.xdsoft',function( event ) {
						var val = this.value,
							key = event.which;
						switch(true) {
							case !!~([ENTER].indexOf(key)):
								var elementSelector = $("input:visible,textarea:visible");
								datetimepicker.trigger('close.xdsoft');
								elementSelector.eq(elementSelector.index(this) + 1).focus();
							return false;
							case !!~[TAB].indexOf(key):
								datetimepicker.trigger('close.xdsoft');
							return true;
						}
					});
			},
			destroyDateTimePicker = function( input ) {
				var datetimepicker = input.data('xdsoft_datetimepicker');
				if( datetimepicker ) {
					datetimepicker.data('xdsoft_datetime',null);
					datetimepicker.remove();
					input
						.data( 'xdsoft_datetimepicker',null )
						.off( 'open.xdsoft focusin.xdsoft focusout.xdsoft mousedown.xdsoft blur.xdsoft keydown.xdsoft' );
					$(window).off('resize.xdsoft');
					$([window,document.body]).off('mousedown.xdsoft');
					input.unmousewheel&&input.unmousewheel();
				}
			};
		$(document)
			.off('keydown.xdsoftctrl keyup.xdsoftctrl')
			.on('keydown.xdsoftctrl',function(e) {
				if ( e.keyCode == CTRLKEY )
					ctrlDown = true;
			})
			.on('keyup.xdsoftctrl',function(e) {
				if ( e.keyCode == CTRLKEY )
					ctrlDown = false;
			});
		return this.each(function() {
			var datetimepicker;
			if( datetimepicker = $(this).data('xdsoft_datetimepicker') ) {
				if( $.type(opt) === 'string' ) {
					switch(opt) {
						case 'show':
							$(this).select().focus();
							datetimepicker.trigger( 'open.xdsoft' );
						break;
						case 'hide':
							datetimepicker.trigger('close.xdsoft');
						break;
						case 'destroy':
							destroyDateTimePicker($(this));
						break;
						case 'reset':
							this.value = this.defaultValue;
							if(!this.value || !datetimepicker.data('xdsoft_datetime').isValidDate(Date.parseDate(this.value, options.format)))
								datetimepicker.data('changed',false);
							datetimepicker.data('xdsoft_datetime').setCurrentTime(this.value);
						break;
					}
				}else{
					datetimepicker
						.setOptions(opt);
				}
				return 0;
			}else
				if( ($.type(opt) !== 'string') ){
					if( !options.lazyInit||options.open||options.inline ){
						createDateTimePicker($(this));
					}else
						lazyInit($(this));
				}
		});
	};
	$.fn.datetimepicker.defaults = default_options;
})( jQuery );

});

// Parse and Format Library
//http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/
/*
 * Copyright (C) 2004 Baron Schwartz <baron at sequent dot org>
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the
 * Free Software Foundation, version 2.1.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 */

Date.parseFunctions={count:0};Date.parseRegexes=[];Date.formatFunctions={count:0};Date.prototype.dateFormat=function(b){if(b=="unixtime"){return parseInt(this.getTime()/1000);}if(Date.formatFunctions[b]==null){Date.createNewFormat(b);}var a=Date.formatFunctions[b];return this[a]();};Date.createNewFormat=function(format){var funcName="format"+Date.formatFunctions.count++;Date.formatFunctions[format]=funcName;var code="Date.prototype."+funcName+" = function() {return ";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true;}else{if(special){special=false;code+="'"+String.escape(ch)+"' + ";}else{code+=Date.getFormatCode(ch);}}}eval(code.substring(0,code.length-3)+";}");};Date.getFormatCode=function(a){switch(a){case"d":return"String.leftPad(this.getDate(), 2, '0') + ";case"D":return"Date.dayNames[this.getDay()].substring(0, 3) + ";case"j":return"this.getDate() + ";case"l":return"Date.dayNames[this.getDay()] + ";case"S":return"this.getSuffix() + ";case"w":return"this.getDay() + ";case"z":return"this.getDayOfYear() + ";case"W":return"this.getWeekOfYear() + ";case"F":return"Date.monthNames[this.getMonth()] + ";case"m":return"String.leftPad(this.getMonth() + 1, 2, '0') + ";case"M":return"Date.monthNames[this.getMonth()].substring(0, 3) + ";case"n":return"(this.getMonth() + 1) + ";case"t":return"this.getDaysInMonth() + ";case"L":return"(this.isLeapYear() ? 1 : 0) + ";case"Y":return"this.getFullYear() + ";case"y":return"('' + this.getFullYear()).substring(2, 4) + ";case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";case"g":return"((this.getHours() %12) ? this.getHours() % 12 : 12) + ";case"G":return"this.getHours() + ";case"h":return"String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";case"H":return"String.leftPad(this.getHours(), 2, '0') + ";case"i":return"String.leftPad(this.getMinutes(), 2, '0') + ";case"s":return"String.leftPad(this.getSeconds(), 2, '0') + ";case"O":return"this.getGMTOffset() + ";case"T":return"this.getTimezone() + ";case"Z":return"(this.getTimezoneOffset() * -60) + ";default:return"'"+String.escape(a)+"' + ";}};Date.parseDate=function(a,c){if(c=="unixtime"){return new Date(!isNaN(parseInt(a))?parseInt(a)*1000:0);}if(Date.parseFunctions[c]==null){Date.createParser(c);}var b=Date.parseFunctions[c];return Date[b](a);};Date.createParser=function(format){var funcName="parse"+Date.parseFunctions.count++;var regexNum=Date.parseRegexes.length;var currentGroup=1;Date.parseFunctions[format]=funcName;var code="Date."+funcName+" = function(input) {\nvar y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, z = -1;\nvar d = new Date();\ny = d.getFullYear();\nm = d.getMonth();\nd = d.getDate();\nvar results = input.match(Date.parseRegexes["+regexNum+"]);\nif (results && results.length > 0) {";var regex="";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true;}else{if(special){special=false;regex+=String.escape(ch);}else{obj=Date.formatCodeToRegex(ch,currentGroup);currentGroup+=obj.g;regex+=obj.s;if(obj.g&&obj.c){code+=obj.c;}}}}code+="if (y > 0 && z > 0){\nvar doyDate = new Date(y,0);\ndoyDate.setDate(z);\nm = doyDate.getMonth();\nd = doyDate.getDate();\n}";code+="if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n{return new Date(y, m, d, h, i, s);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n{return new Date(y, m, d, h, i);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0)\n{return new Date(y, m, d, h);}\nelse if (y > 0 && m >= 0 && d > 0)\n{return new Date(y, m, d);}\nelse if (y > 0 && m >= 0)\n{return new Date(y, m);}\nelse if (y > 0)\n{return new Date(y);}\n}return null;}";Date.parseRegexes[regexNum]=new RegExp("^"+regex+"$");eval(code);};Date.formatCodeToRegex=function(b,a){switch(b){case"D":return{g:0,c:null,s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};case"j":case"d":return{g:1,c:"d = parseInt(results["+a+"], 10);\n",s:"(\\d{1,2})"};case"l":return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"};case"S":return{g:0,c:null,s:"(?:st|nd|rd|th)"};case"w":return{g:0,c:null,s:"\\d"};case"z":return{g:1,c:"z = parseInt(results["+a+"], 10);\n",s:"(\\d{1,3})"};case"W":return{g:0,c:null,s:"(?:\\d{2})"};case"F":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+a+"].substring(0, 3)], 10);\n",s:"("+Date.monthNames.join("|")+")"};case"M":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+a+"]], 10);\n",s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};case"n":case"m":return{g:1,c:"m = parseInt(results["+a+"], 10) - 1;\n",s:"(\\d{1,2})"};case"t":return{g:0,c:null,s:"\\d{1,2}"};case"L":return{g:0,c:null,s:"(?:1|0)"};case"Y":return{g:1,c:"y = parseInt(results["+a+"], 10);\n",s:"(\\d{4})"};case"y":return{g:1,c:"var ty = parseInt(results["+a+"], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"};case"a":return{g:1,c:"if (results["+a+"] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(am|pm)"};case"A":return{g:1,c:"if (results["+a+"] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(AM|PM)"};case"g":case"G":case"h":case"H":return{g:1,c:"h = parseInt(results["+a+"], 10);\n",s:"(\\d{1,2})"};case"i":return{g:1,c:"i = parseInt(results["+a+"], 10);\n",s:"(\\d{2})"};case"s":return{g:1,c:"s = parseInt(results["+a+"], 10);\n",s:"(\\d{2})"};case"O":return{g:0,c:null,s:"[+-]\\d{4}"};case"T":return{g:0,c:null,s:"[A-Z]{3}"};case"Z":return{g:0,c:null,s:"[+-]\\d{1,5}"};default:return{g:0,c:null,s:String.escape(b)};}};Date.prototype.getTimezone=function(){return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3");};Date.prototype.getGMTOffset=function(){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset())/60),2,"0")+String.leftPad(Math.abs(this.getTimezoneOffset())%60,2,"0");};Date.prototype.getDayOfYear=function(){var a=0;Date.daysInMonth[1]=this.isLeapYear()?29:28;for(var b=0;b<this.getMonth();++b){a+=Date.daysInMonth[b];}return a+this.getDate();};Date.prototype.getWeekOfYear=function(){var b=this.getDayOfYear()+(4-this.getDay());var a=new Date(this.getFullYear(),0,1);var c=(7-a.getDay()+4);return String.leftPad(Math.ceil((b-c)/7)+1,2,"0");};Date.prototype.isLeapYear=function(){var a=this.getFullYear();return((a&3)==0&&(a%100||(a%400==0&&a)));};Date.prototype.getFirstDayOfMonth=function(){var a=(this.getDay()-(this.getDate()-1))%7;return(a<0)?(a+7):a;};Date.prototype.getLastDayOfMonth=function(){var a=(this.getDay()+(Date.daysInMonth[this.getMonth()]-this.getDate()))%7;return(a<0)?(a+7):a;};Date.prototype.getDaysInMonth=function(){Date.daysInMonth[1]=this.isLeapYear()?29:28;return Date.daysInMonth[this.getMonth()];};Date.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};String.escape=function(a){return a.replace(/('|\\)/g,"\\$1");};String.leftPad=function(d,b,c){var a=new String(d);if(c==null){c=" ";}while(a.length<b){a=c+a;}return a;};Date.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Date.y2kYear=50;Date.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};Date.patterns={ISO8601LongPattern:"Y-m-d H:i:s",ISO8601ShortPattern:"Y-m-d",ShortDatePattern:"n/j/Y",LongDatePattern:"l, F d, Y",FullDateTimePattern:"l, F d, Y g:i:s A",MonthDayPattern:"F d",ShortTimePattern:"g:i A",LongTimePattern:"g:i:s A",SortableDateTimePattern:"Y-m-d\\TH:i:s",UniversalSortableDateTimePattern:"Y-m-d H:i:sO",YearMonthPattern:"F, Y"};
(function() {
  var modalGroup;

  modalGroup = [];

  define('UI.modalplus',['backbone', 'i18n!/nls/lang.js'], function(Backbone, lang) {
    var Modal;
    Modal = (function() {
      function Modal(option) {
        var body, isFirst, _ref, _ref1, _ref2, _ref3;
        this.option = option;
        _.extend(this, Backbone.Events);
        isFirst = false;
        if ($('#modal-wrap').size() > 0) {
          isFirst = false;
          this.wrap = $("#modal-wrap");
        } else {
          isFirst = true;
          this.wrap = $("<div id='modal-wrap'>").appendTo($('body'));
        }
        if (isFirst) {
          modalGroup = [];
        }
        this.tpl = $(MC.template.modalTemplate({
          title: this.option.title || "",
          hideClose: this.option.hideClose,
          template: typeof this.option.template === "object" ? "" : this.option.template,
          confirm: {
            text: ((_ref = this.option.confirm) != null ? _ref.text : void 0) || "Submit",
            color: ((_ref1 = this.option.confirm) != null ? _ref1.color : void 0) || "blue",
            disabled: (_ref2 = this.option.confirm) != null ? _ref2.disabled : void 0,
            hide: (_ref3 = this.option.confirm) != null ? _ref3.hide : void 0
          },
          cancel: _.isString(this.option.cancel) ? {
            text: this.option.cancel || lang.IDE.POP_LBL_CANCEL
          } : _.isObject(this.option.cancel) ? this.option.cancel : {
            text: "Cancel"
          },
          hasFooter: !this.option.disableFooter,
          hasScroll: !!this.option.maxHeight || this.option.hasScroll,
          compact: this.option.compact,
          mode: this.option.mode || "normal"
        }));
        body = this.tpl.find(".modal-body");
        if (typeof this.option.template === "object") {
          body.html(this.option.template);
        }
        if (this.option.maxHeight) {
          body.css({
            "max-height": this.option.maxHeight
          });
        }
        if (this.option.width) {
          body.parent().width(this.option.width);
        }
        this.tpl.appendTo(this.wrap);
        modalGroup.push(this);
        if (modalGroup.length === 1 || this.option.mode === "panel") {
          this.tpl.addClass('bounce');
          window.setTimeout((function(_this) {
            return function() {
              return _this.tpl.removeClass('bounce');
            };
          })(this), 1);
          this.trigger("show", this);
          this.trigger('shown', this);
        }
        this.show();
        this.bindEvent();
        this;
      }

      Modal.prototype.close = function() {
        var _base;
        if (this.isMoving) {
          return false;
        }
        if (this.parentModal) {
          return false;
        }
        if (modalGroup.length > 1) {
          this.back();
        } else if (modalGroup.length <= 1) {
          modalGroup = [];
          this.trigger('close', this);
          if (typeof (_base = this.option).onClose === "function") {
            _base.onClose(this);
          }
          this.tpl.addClass('bounce');
          window.setTimeout((function(_this) {
            return function() {
              _this.tpl.remove();
              _this.wrap.remove();
              return _this.trigger('closed', _this);
            };
          })(this), this.option.delay || 300);
          this.wrap.fadeOut(this.option.delay || 300);
        }
        return null;
      };

      Modal.prototype.show = function() {
        var _base;
        this.wrap.removeClass("hide");
        if (modalGroup.length > 1) {
          this.getLast().resize(1);
          this.getLast()._slideIn();
          this.getLastButOne()._fadeOut();
        } else {
          this.resize();
        }
        if (typeof (_base = this.option).onShow === "function") {
          _base.onShow(this);
        }
        return this;
      };

      Modal.prototype.bindEvent = function() {
        var diffX, diffY, dragable;
        this.tpl.find('.modal-confirm').click((function(_this) {
          return function(e) {
            var _base;
            if (typeof (_base = _this.option).onConfirm === "function") {
              _base.onConfirm(_this.tpl, e);
            }
            return _this.trigger('confirm', _this);
          };
        })(this));
        this.tpl.find('.btn.modal-close').click((function(_this) {
          return function(e) {
            var _base, _ref;
            if (typeof (_base = _this.option).onCancel === "function") {
              _base.onCancel(_this.tpl, e);
            }
            _this.trigger('cancel', _this);
            if (!_this.option.preventClose) {
              return (_ref = modalGroup[0]) != null ? _ref.back() : void 0;
            }
          };
        })(this));
        this.tpl.find("i.modal-close").click(function(e) {
          var _ref;
          return (_ref = modalGroup[0]) != null ? _ref.back() : void 0;
        });
        if (!this.option.disableClose) {
          this.getFirst().wrap.off('click');
          this.getFirst().wrap.on('click', (function(_this) {
            return function(e) {
              var _ref;
              if (e.target === e.currentTarget) {
                return (_ref = _this.getFirst()) != null ? _ref.back() : void 0;
              }
            };
          })(this));
        }
        $(window).resize((function(_this) {
          return function() {
            var _ref;
            return _this != null ? (_ref = _this.getLast()) != null ? _ref.resize() : void 0 : void 0;
          };
        })(this));
        $(document).keyup((function(_this) {
          return function(e) {
            var _ref;
            if (e.which === 27 && !_this.option.disableClose) {
              if ((_this != null ? _this.getFirst() : void 0) != null) {
                e.preventDefault();
                return _this != null ? (_ref = _this.getFirst()) != null ? _ref.back() : void 0 : void 0;
              }
            }
          };
        })(this));
        if (!(this.option.disableDrag || (this.option.mode === 'panel'))) {
          diffX = 0;
          diffY = 0;
          dragable = false;
          this.tpl.find(".modal-header h3").mousedown((function(_this) {
            return function(e) {
              var originalLayout;
              dragable = true;
              originalLayout = _this.getLast().tpl.offset();
              diffX = originalLayout.left - e.clientX;
              diffY = originalLayout.top - e.clientY;
              return null;
            };
          })(this));
          $(document).mousemove((function(_this) {
            return function(e) {
              if (dragable && _this.getLast()) {
                _this.getLast().tpl.css({
                  top: e.clientY + diffY,
                  left: e.clientX + diffX
                });
                if (window.getSelection) {
                  if (window.getSelection().empty) {
                    return window.getSelection().empty();
                  } else if (window.getSelection().removeAllRanges) {
                    return window.getSelection().removeAllRanges();
                  } else if (document.selection) {
                    return document.selection.empty();
                  }
                }
              }
            };
          })(this));
          return $(document).mouseup((function(_this) {
            return function(e) {
              var left, maxHeight, maxRight, top;
              if (dragable) {
                top = e.clientY + diffY;
                left = e.clientX + diffX;
                maxHeight = $(window).height() - _this.getLast().tpl.height();
                maxRight = $(window).width() - _this.getLast().tpl.width();
                if (top < 0) {
                  top = 0;
                }
                if (left < 0) {
                  left = 0;
                }
                if (top > maxHeight) {
                  top = maxHeight;
                }
                if (left > maxRight) {
                  left = maxRight;
                }
                _this.getLast().tpl.css({
                  top: top,
                  left: left
                });
              }
              dragable = false;
              diffX = 0;
              diffY = 0;
              return null;
            };
          })(this));
        }
      };

      Modal.prototype.resize = function(slideIn) {
        var height, left, top, width, windowHeight, windowWidth, _ref, _ref1, _ref2, _ref3;
        if (this.option.mode === 'panel') {
          this.trigger('resize', this);
          return false;
        }
        windowWidth = $(window).width();
        windowHeight = $(window).height();
        width = ((_ref = this.option.width) != null ? (_ref1 = _ref.toString()) != null ? _ref1.toLowerCase().replace('px', '') : void 0 : void 0) || this.tpl.width();
        height = ((_ref2 = this.option.height) != null ? (_ref3 = _ref2.toString()) != null ? _ref3.toLowerCase().replace('px', '') : void 0 : void 0) || this.tpl.height();
        top = (windowHeight - height) * 0.4;
        left = (windowWidth - width) / 2;
        if (slideIn) {
          left = windowWidth + left;
        }
        this.tpl.css({
          top: top > 0 ? top : 10,
          left: left
        });
        return this.trigger('resize', {
          top: top,
          left: left
        });
      };

      Modal.prototype.getFirst = function() {
        return modalGroup != null ? modalGroup[0] : void 0;
      };

      Modal.prototype.getLast = function() {
        return modalGroup[modalGroup.length - 1];
      };

      Modal.prototype.getLastButOne = function() {
        if (this.parentModal) {
          return this.parentModal.getLastButOne();
        } else {
          return modalGroup[modalGroup.length - 2];
        }
      };

      Modal.prototype.isOpen = function() {
        return !this.isClosed;
      };

      Modal.prototype.isCurrent = function() {
        return this === this.getLast();
      };

      Modal.prototype.next = function(optionConfig) {
        var lastModal, newModal, _base, _ref, _ref1;
        if ((modalGroup != null ? modalGroup.length : void 0) >= 1) {
          newModal = new Modal(optionConfig);
          this.trigger("next", this);
          lastModal = this.getLastButOne();
          if ((_ref = this.getFirst()) != null) {
            if (typeof (_base = _ref.option).onNext === "function") {
              _base.onNext();
            }
          }
          newModal.parentModal = lastModal;
          lastModal.childModal = newModal;
          if ((_ref1 = lastModal.parentModal) != null) {
            _ref1.option.disableClose = true;
          }
          this.isMoving = true;
          window.setTimeout((function(_this) {
            return function() {
              _this.isMoving = false;
              newModal.trigger('shown', newModal);
              return null;
            };
          })(this), this.option.delay || 300);
          return newModal;
        } else {
          return false;
        }
      };

      Modal.prototype.back = function() {
        var toRemove, _base;
        if (this.parentModal || this.isMoving) {
          return false;
        }
        if (modalGroup.length === 1) {
          modalGroup.pop();
          this.close();
          this.isClosed = true;
          return false;
        } else {
          this.getLast().trigger("close", this.getLast());
          this.getLastButOne()._fadeIn();
          this.getLast()._slideOut();
          toRemove = modalGroup.pop();
          if (toRemove.option.mode === 'panel') {
            toRemove.tpl.addClass('bounce');
          }
          toRemove.isClosed = true;
          this.getLast().childModal = null;
          if (typeof (_base = toRemove.option).onClose === "function") {
            _base.onClose();
          }
          this.isMoving = true;
          return window.setTimeout((function(_this) {
            return function() {
              _this.isMoving = false;
              toRemove.tpl.remove();
              return toRemove.trigger('closed', toRemove);
            };
          })(this), this.option.delay || 300);
        }
      };

      Modal.prototype.toggleConfirm = function(disabled) {
        this.tpl.find(".modal-confirm").attr('disabled', !!disabled);
        return this;
      };

      Modal.prototype.setContent = function(content) {
        var selector;
        if (this.option.hasScroll || this.option.maxHeight) {
          selector = ".scroll-content";
        } else {
          selector = ".modal-body";
        }
        this.tpl.find(selector).html(content);
        this.resize();
        return this;
      };

      Modal.prototype.setWidth = function(width) {
        var body;
        body = this.tpl.find('.modal-body');
        body.parent().css({
          width: width
        });
        this.resize();
        return this;
      };

      Modal.prototype.compact = function() {
        this.tpl.find('.modal-body').css({
          padding: 0
        });
        return this;
      };

      Modal.prototype._fadeOut = function() {
        if (this.option.mode === 'panel') {
          return false;
        }
        return this.tpl.animate({
          left: "-=" + $(window).width()
        }, this.option.delay || 100);
      };

      Modal.prototype._fadeIn = function() {
        if (this.option.mode === 'panel') {
          return false;
        }
        return this.tpl.animate({
          left: "+=" + $(window).width()
        }, this.option.delay || 100);
      };

      Modal.prototype._slideIn = function() {
        if (this.option.mode === 'panel') {
          return false;
        }
        return this.tpl.animate({
          left: "-=" + $(window).width()
        }, this.option.delay || 300);
      };

      Modal.prototype._slideOut = function() {
        if (this.option.mode === 'panel') {
          return false;
        }
        return this.tpl.animate({
          left: "+=" + $(window).width()
        }, this.option.delay || 300);
      };

      Modal.prototype.find = function(selector) {
        return this.tpl.find(selector);
      };

      Modal.prototype.$ = function(selector) {
        return this.tpl.find(selector);
      };

      Modal.prototype.setTitle = function(title) {
        this.tpl.find(".modal-header h3").text(title);
        return this;
      };

      return Modal;

    })();
    return Modal;
  });

}).call(this);

(function() {
  define('UI.nanoscroller',["jquery"], function($) {
    
    var BROWSER_IS_IE7, BROWSER_SCROLLBAR_HEIGHT, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, KEYDOWN, KEYUP, LEFT, MOUSEDOWN, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, PANERIGHT, RESIZE, RIGHT, SCROLL, SCROLLBAR, TOUCHMOVE, UP, WHEEL, defaults, getBrowserScrollbarSizes;
    defaults = {

      /**
        a classname for the pane element.
        @property paneClass
        @type String
        @default 'pane'
       */
      paneClass: 'nano-pane',

      /**
        a classname for the pane-y element.
        @property paneClassY
        @type String
        @default 'pane-y'
       */
      paneClassY: 'pane-y',

      /**
        a classname for the pane-x element.
        @property paneClassX
        @type String
        @default 'pane-x'
       */
      paneClassX: 'pane-x',

      /**
        a classname for the slider element.
        @property sliderClass
        @type String
        @default 'slider'
       */
      sliderClass: 'nano-slider',

      /**
        a classname for the slider-y element.
        @property sliderClassY
        @type String
        @default 'slider-y'
       */
      sliderClassY: 'slider-y',

      /**
        a classname for the slider-x element.
        @property sliderClassX
        @type String
        @default 'slider-x'
       */
      sliderClassX: 'slider-x',

      /**
        a classname for the content element.
        @property contentClass
        @type String
        @default 'content'
       */
      contentClass: 'nano-content',

      /**
        a setting to enable native scrolling in iOS devices.
        @property iOSNativeScrolling
        @type Boolean
        @default false
       */
      iOSNativeScrolling: false,

      /**
        a setting to prevent the rest of the page being
        scrolled when user scrolls the `.content` element.
        @property preventPageScrolling
        @type Boolean
        @default false
       */
      preventPageScrolling: false,

      /**
        a setting to disable binding to the resize event.
        @property disableResize
        @type Boolean
        @default false
       */
      disableResize: false,

      /**
        a setting to make the scrollbar always visible.
        @property alwaysVisible
        @type Boolean
        @default false
       */
      alwaysVisible: false,

      /**
        a default timeout for the `flash()` method.
        @property flashDelay
        @type Number
        @default 1500
       */
      flashDelay: 1500,

      /**
        a minimum height for the `.slider` element.
        @property sliderMinHeight
        @type Number
        @default 20
       */
      sliderMinHeight: 20,

      /**
        a maximum height for the `.slider` element.
        @property sliderMaxHeight
        @type Number
        @default null
       */
      sliderMaxHeight: null
    };

    /**
      @property SCROLLBAR
      @type String
      @static
      @final
      @private
     */
    SCROLLBAR = 'scrollbar';

    /**
      @property SCROLL
      @type String
      @static
      @final
      @private
     */
    SCROLL = 'scroll';

    /**
      @property MOUSEDOWN
      @type String
      @final
      @private
     */
    MOUSEDOWN = 'mousedown';

    /**
      @property MOUSEMOVE
      @type String
      @static
      @final
      @private
     */
    MOUSEMOVE = 'mousemove';

    /**
      @property MOUSEWHEEL
      @type String
      @final
      @private
     */
    MOUSEWHEEL = 'mousewheel';

    /**
      @property MOUSEUP
      @type String
      @static
      @final
      @private
     */
    MOUSEUP = 'mouseup';

    /**
      @property RESIZE
      @type String
      @final
      @private
     */
    RESIZE = 'resize';

    /**
      @property DRAG
      @type String
      @static
      @final
      @private
     */
    DRAG = 'drag';

    /**
      @property UP
      @type String
      @static
      @final
      @private
     */
    UP = 'up';

    /**
      @property PANEDOWN
      @type String
      @static
      @final
      @private
     */
    PANEDOWN = 'panedown';

    /**
      @property LEFT
      @type String
      @static
      @final
      @private
     */
    LEFT = 'left';

    /**
      @property PANERIGHT
      @type String
      @static
      @final
      @private
     */
    PANERIGHT = 'paneright';

    /**
      @property DOMSCROLL
      @type String
      @static
      @final
      @private
     */
    DOMSCROLL = 'DOMMouseScroll';

    /**
      @property DOWN
      @type String
      @static
      @final
      @private
     */
    DOWN = 'down';

    /**
      @property RIGHT
      @type String
      @static
      @final
      @private
     */
    RIGHT = 'right';

    /**
      @property WHEEL
      @type String
      @static
      @final
      @private
     */
    WHEEL = 'wheel';

    /**
      @property KEYDOWN
      @type String
      @static
      @final
      @private
     */
    KEYDOWN = 'keydown';

    /**
      @property KEYUP
      @type String
      @static
      @final
      @private
     */
    KEYUP = 'keyup';

    /**
      @property TOUCHMOVE
      @type String
      @static
      @final
      @private
     */
    TOUCHMOVE = 'touchmove';

    /**
      @property BROWSER_IS_IE7
      @type Boolean
      @static
      @final
      @private
     */
    BROWSER_IS_IE7 = window.navigator.appName === 'Microsoft Internet Explorer' && /msie 7./i.test(window.navigator.appVersion) && window.ActiveXObject;

    /**
      @property BROWSER_SCROLLBAR_WIDTH
      @type Number
      @static
      @default null
      @private
     */
    BROWSER_SCROLLBAR_WIDTH = null;

    /**
      @property BROWSER_SCROLLBAR_HEIGHT
      @type Number
      @static
      @default null
      @private
     */
    BROWSER_SCROLLBAR_HEIGHT = null;

    /**
      Returns browser's native scrollbar width
      @method getBrowserScrollbarSizes
      @return {Number} the scrollbar width in pixels
      @static
      @private
     */
    getBrowserScrollbarSizes = function() {
      var outer, outerStyle, scrollbarHeight, scrollbarWidth;
      outer = document.createElement('div');
      outerStyle = outer.style;
      outerStyle.position = 'absolute';
      outerStyle.width = '100px';
      outerStyle.height = '100px';
      outerStyle.overflow = SCROLL;
      outerStyle.top = '-9999px';
      document.body.appendChild(outer);
      scrollbarWidth = outer.offsetWidth - outer.clientWidth;
      scrollbarHeight = outer.offsetHeight - outer.clientHeight;
      document.body.removeChild(outer);
      return [scrollbarWidth, scrollbarHeight];
    };

    /**
      @class NanoScroll
      @param element {HTMLElement|Node} the main element
      @param options {Object} nanoScroller's options
      @constructor
     */
    NanoScroll = (function() {
      function NanoScroll(el, options) {
        var _ref;
        this.el = el;
        this.options = options;
        if (!BROWSER_SCROLLBAR_WIDTH || !BROWSER_SCROLLBAR_HEIGHT) {
          _ref = getBrowserScrollbarSizes(), BROWSER_SCROLLBAR_WIDTH = _ref[0], BROWSER_SCROLLBAR_HEIGHT = _ref[1];
        }
        this.$el = $(this.el);
        this.doc = $(document);
        this.win = $(window);
        this.$content = this.$el.children("." + options.contentClass);
        this.$content.attr('tabindex', 0);
        this.content = this.$content[0];
        if (this.options.iOSNativeScrolling && (this.el.style.WebkitOverflowScrolling != null)) {
          this.nativeScrolling();
        } else {
          this.generate();
        }
        this.createEvents();
        this.addEvents();
        this.reset();
      }


      /**
        Prevents the rest of the page being scrolled
        when user scrolls the `.content` element.
        @method preventVerticalScrolling
        @param event {Event}
        @param direction {String} Scroll direction (up or down)
        @private
       */

      NanoScroll.prototype.preventVerticalScrolling = function(e, direction) {
        if (!this.isActiveY) {
          return;
        }
        if (e.type === DOMSCROLL) {
          if (direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) {
            e.preventDefault();
          }
        } else if (e.type === MOUSEWHEEL) {
          if (!e.originalEvent || !e.originalEvent.wheelDelta) {
            return;
          }
          if (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) {
            e.preventDefault();
          }
        }
      };


      /**
        Prevents the rest of the page being scrolled
        when user scrolls the `.content` element.
        @method preventHorizontalScrolling
        @param event {Event}
        @param direction {String} Scroll direction (left or right)
        @private
       */

      NanoScroll.prototype.preventHorizontalScrolling = function(e, direction) {
        if (!this.isActiveX) {
          return;
        }
        if (e.type === DOMSCROLL) {
          if (direction === RIGHT && e.originalEvent.detail > 0 || direction === LEFT && e.originalEvent.detail < 0) {
            e.preventDefault();
          }
        } else if (e.type === MOUSEWHEEL) {
          if (!e.originalEvent || !e.originalEvent.wheelDelta) {
            return;
          }
          if (direction === RIGHT && e.originalEvent.wheelDelta < 0 || direction === LEFT && e.originalEvent.wheelDelta > 0) {
            e.preventDefault();
          }
        }
      };


      /**
        Enable iOS native scrolling
       */

      NanoScroll.prototype.nativeScrolling = function() {
        this.$content.css({
          WebkitOverflowScrolling: 'touch'
        });
        this.iOSNativeScrolling = true;
        this.isActiveX = true;
        this.isActiveY = true;
      };


      /**
        Updates those nanoScroller properties that
        are related to current scrollbar position.
        @method updateVerticalScrollValues
        @private
       */

      NanoScroll.prototype.updateVerticalScrollValues = function() {
        var content;
        content = this.content;
        if (!content) {
          return;
        }
        this.maxScrollTop = content.scrollHeight - content.clientHeight;
        this.contentScrollTop = content.scrollTop;
        if (!this.iOSNativeScrolling) {
          this.maxSliderTop = this.yPaneHeight - this.ySliderHeight;
          this.ySliderTop = this.contentScrollTop * this.maxSliderTop / this.maxScrollTop;
        }
      };


      /**
        Updates those nanoScroller properties that
        are related to current scrollbar position.
        @method updateVerticalScrollValues
        @private
       */

      NanoScroll.prototype.updateHorizontalScrollValues = function() {
        var content;
        content = this.content;
        if (!content) {
          return;
        }
        this.maxScrollLeft = content.scrollWidth - content.clientWidth;
        this.contentScrollLeft = content.scrollLeft;
        if (!this.iOSNativeScrolling) {
          this.maxSliderLeft = this.xPaneWidth - this.xSliderWidth;
          this.xSliderLeft = this.contentScrollLeft * this.maxSliderLeft / this.maxScrollLeft;
        }
      };


      /**
        Creates event related methods
        @method createEvents
        @private
       */

      NanoScroll.prototype.createEvents = function() {
        this.yEvents = {
          down: (function(_this) {
            return function(e) {
              _this.isYBeingDragged = true;
              _this.offsetY = e.pageY - _this.ySlider.offset().top;
              _this.yPane.addClass('active');
              _this.doc.bind(MOUSEMOVE, _this.yEvents[DRAG]).bind(MOUSEUP, _this.yEvents[UP]);
              return false;
            };
          })(this),
          drag: (function(_this) {
            return function(e) {
              _this.ySliderY = e.pageY - _this.$el.offset().top - _this.offsetY;
              _this.scrollY();
              _this.updateVerticalScrollValues();
              if (_this.contentScrollTop >= _this.maxScrollTop) {
                _this.$el.trigger('scrollend');
              } else if (_this.contentScrollTop === 0) {
                _this.$el.trigger('scrolltop');
              }
              return false;
            };
          })(this),
          up: (function(_this) {
            return function(e) {
              _this.isYBeingDragged = false;
              _this.yPane.removeClass('active');
              _this.doc.unbind(MOUSEMOVE, _this.yEvents[DRAG]).unbind(MOUSEUP, _this.yEvents[UP]);
              return false;
            };
          })(this),
          resize: (function(_this) {
            return function(e) {
              _this.reset();
            };
          })(this),
          panedown: (function(_this) {
            return function(e) {
              _this.ySliderY = (e.offsetY || e.originalEvent.layerY) - (_this.ySliderHeight * 0.5);
              _this.scrollY();
              _this.yEvents.down(e);
              return false;
            };
          })(this),
          scroll: (function(_this) {
            return function(e) {
              if (_this.isYBeingDragged) {
                return;
              }
              _this.updateVerticalScrollValues();
              if (!_this.iOSNativeScrolling) {
                _this.ySliderY = _this.ySliderTop;
                _this.ySlider.css({
                  top: _this.ySliderTop
                });
              }
              if (e == null) {
                return;
              }
              if (_this.contentScrollTop >= _this.maxScrollTop) {
                if (_this.options.preventPageScrolling) {
                  _this.preventVerticalScrolling(e, DOWN);
                }
                _this.$el.trigger('scrollend');
              } else if (_this.contentScrollTop === 0) {
                if (_this.options.preventPageScrolling) {
                  _this.preventVerticalScrolling(e, UP);
                }
                _this.$el.trigger('scrolltop');
              }
            };
          })(this),
          wheel: (function(_this) {
            return function(e) {
              if (e == null) {
                return;
              }
              _this.ySliderY += -e.wheelDeltaY || -e.delta;
              _this.scrollY();
              return false;
            };
          })(this)
        };
        this.xEvents = {
          down: (function(_this) {
            return function(e) {
              _this.isXBeingDragged = true;
              _this.offsetX = e.pageX - _this.xSlider.offset().left;
              _this.xPane.addClass('active');
              _this.doc.bind(MOUSEMOVE, _this.xEvents[DRAG]).bind(MOUSEUP, _this.xEvents[UP]);
              return false;
            };
          })(this),
          drag: (function(_this) {
            return function(e) {
              _this.xSliderX = e.pageX - _this.$el.offset().left - _this.offsetX;
              _this.scrollX();
              _this.updateHorizontalScrollValues();
              if (_this.contentScrollLeft >= _this.maxScrollLeft) {
                _this.$el.trigger('scrollend');
              } else if (_this.contentScrollLeft === 0) {
                _this.$el.trigger('scrollleft');
              }
              return false;
            };
          })(this),
          up: (function(_this) {
            return function(e) {
              _this.isXBeingDragged = false;
              _this.xPane.removeClass('active');
              _this.doc.unbind(MOUSEMOVE, _this.xEvents[DRAG]).unbind(MOUSEUP, _this.xEvents[UP]);
              return false;
            };
          })(this),
          resize: (function(_this) {
            return function(e) {
              _this.reset();
            };
          })(this),
          panedown: (function(_this) {
            return function(e) {
              _this.xSliderX = (e.offsetX || e.originalEvent.layerX) - (_this.xSliderWidth * 0.5);
              _this.scrollX();
              _this.xEvents.down(e);
              return false;
            };
          })(this),
          scroll: (function(_this) {
            return function(e) {
              if (_this.isXBeingDragged) {
                return;
              }
              _this.updateHorizontalScrollValues();
              if (!_this.iOSNativeScrolling) {
                _this.xSliderX = _this.xSliderLeft;
                _this.xSlider.css({
                  left: _this.xSliderLeft
                });
              }
              if (e == null) {
                return;
              }
              if (_this.contentScrollLeft >= _this.maxScrollLeft) {
                if (_this.options.preventPageScrolling) {
                  _this.preventHorizontalScrolling(e, RIGHT);
                }
                _this.$el.trigger('scrollend');
              } else if (_this.contentScrollLeft === 0) {
                if (_this.options.preventPageScrolling) {
                  _this.preventHorizontalScrolling(e, LEFT);
                }
                _this.$el.trigger('scrollleft');
              }
            };
          })(this),
          wheel: (function(_this) {
            return function(e) {
              if (e == null) {
                return;
              }
              _this.xSliderX += -e.wheelDeltaX || -e.delta;
              _this.scrollX();
              return false;
            };
          })(this)
        };
      };


      /**
        Adds event listeners with jQuery.
        @method addEvents
        @private
       */

      NanoScroll.prototype.addEvents = function() {
        var xEvents, yEvents;
        this.removeEvents();
        yEvents = this.yEvents;
        xEvents = this.xEvents;
        if (!this.options.disableResize) {
          this.win.bind(RESIZE, yEvents[RESIZE]).bind(RESIZE, xEvents[RESIZE]);
        }
        if (!this.iOSNativeScrolling) {
          this.ySlider.bind(MOUSEDOWN, yEvents[DOWN]);
          this.xSlider.bind(MOUSEDOWN, xEvents[DOWN]);
          this.yPane.bind(MOUSEDOWN, yEvents[PANEDOWN]).bind("" + MOUSEWHEEL + " " + DOMSCROLL, yEvents[WHEEL]);
          this.xPane.bind(MOUSEDOWN, xEvents[PANEDOWN]).bind("" + MOUSEWHEEL + " " + DOMSCROLL, xEvents[WHEEL]);
        }
        this.$content.bind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, yEvents[SCROLL]).bind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, xEvents[SCROLL]);
      };


      /**
        Removes event listeners with jQuery.
        @method removeEvents
        @private
       */

      NanoScroll.prototype.removeEvents = function() {
        var xEvents, yEvents;
        yEvents = this.yEvents;
        xEvents = this.xEvents;
        this.win.unbind(RESIZE, yEvents[RESIZE]).unbind(RESIZE, xEvents[RESIZE]);
        if (!this.iOSNativeScrolling) {
          this.ySlider.unbind();
          this.xSlider.unbind();
          this.yPane.unbind();
          this.xPane.unbind();
        }
        this.$content.unbind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, yEvents[SCROLL]).unbind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, xEvents[SCROLL]);
      };


      /**
        Generates nanoScroller's scrollbar and elements for it.
        @method generate
        @chainable
        @private
       */

      NanoScroll.prototype.generate = function() {
        var contentClass, cssRuleX, cssRuleY, options, paneClass, paneClassX, paneClassY, sliderClass, sliderClassX, sliderClassY;
        options = this.options;
        paneClass = options.paneClass, paneClassY = options.paneClassY, paneClassX = options.paneClassX, sliderClass = options.sliderClass, sliderClassY = options.sliderClassY, sliderClassX = options.sliderClassX, contentClass = options.contentClass;
        if (!this.$el.find("" + paneClassY).length && !this.$el.find("" + sliderClassY).length) {
          this.$el.append("<div class=\"" + paneClass + " " + paneClassY + "\"><div class=\"" + sliderClass + " " + sliderClassY + "\" /></div>");
        }
        if (!this.$el.find("" + paneClassX).length && !this.$el.find("" + sliderClassX).length) {
          this.$el.append("<div class=\"" + paneClass + " " + paneClassX + "\"><div class=\"" + sliderClass + " " + sliderClassX + "\" /></div>");
        }
        this.yPane = this.$el.children("." + paneClassY);
        this.xPane = this.$el.children("." + paneClassX);
        this.ySlider = this.yPane.find("." + sliderClassY);
        this.xSlider = this.xPane.find("." + sliderClassX);
        if (BROWSER_SCROLLBAR_WIDTH) {
          cssRuleY = this.$el.css('direction') === 'rtl' ? {
            left: -BROWSER_SCROLLBAR_WIDTH
          } : {
            right: -BROWSER_SCROLLBAR_WIDTH
          };
          this.$el.addClass('has-scrollbar');
          this.$content.css(cssRuleY);
        }
        if (BROWSER_SCROLLBAR_HEIGHT) {
          cssRuleX = {
            bottom: -BROWSER_SCROLLBAR_HEIGHT
          };
          this.$el.addClass('has-scrollbar');
          this.$content.css(cssRuleX);
        }
        return this;
      };


      /**
        @method restore
        @private
       */

      NanoScroll.prototype.restore = function() {
        this.stopped = false;
        this.yPane.show();
        this.xPane.show();
        this.addEvents();
      };


      /**
        Resets nanoScroller's scrollbar.
        @method reset
        @chainable
        @example
            $(".nano").nanoScroller();
       */

      NanoScroll.prototype.reset = function() {
        var content, contentHeight, contentStyle, contentStyleOverflowX, contentStyleOverflowY, contentWidth, paneBottom, paneHeight, paneLeft, paneOuterHeight, paneOuterWidth, paneRight, paneTop, paneWidth, sliderHeight, sliderWidth;
        if (!this.content) {
          return;
        }
        if (this.iOSNativeScrolling) {
          this.contentHeight = this.content.scrollHeight;
          this.contentWidth = this.content.scrollWidth;
          return;
        }
        this.$el.removeClass('has-scrollbar-x');
        this.$el.removeClass('has-scrollbar-y');
        if (!this.$el.find("." + this.options.paneClassY).length && !this.$el.find("." + this.options.paneClassX).length) {
          this.generate().stop();
        }
        if (this.stopped) {
          this.restore();
        }
        content = this.content;
        contentStyle = content.style;
        contentStyleOverflowY = contentStyle.overflowY;
        contentStyleOverflowX = contentStyle.overflowX;
        if (BROWSER_IS_IE7) {
          this.$content.css({
            height: this.$content.height(),
            width: this.$content.height()
          });
        }
        contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH;
        contentWidth = content.scrollWidth + BROWSER_SCROLLBAR_HEIGHT;
        if (content.scrollWidth > this.xPane.outerWidth(true)) {
          this.$el.addClass('has-scrollbar-x');
        }
        if (content.scrollHeight > this.yPane.outerHeight(true)) {
          this.$el.addClass('has-scrollbar-y');
        }
        paneHeight = this.yPane.outerHeight();
        paneTop = parseInt(this.yPane.css('top'), 10);
        paneBottom = parseInt(this.yPane.css('bottom'), 10);
        paneOuterHeight = paneHeight + paneTop + paneBottom;
        paneWidth = this.xPane.outerWidth();
        paneLeft = parseInt(this.xPane.css('left'), 10);
        paneRight = parseInt(this.xPane.css('right'), 10);
        paneOuterWidth = paneWidth + paneLeft + paneRight;
        sliderHeight = Math.round(paneOuterHeight / contentHeight * paneOuterHeight);
        if (sliderHeight < this.options.sliderMinHeight) {
          sliderHeight = this.options.sliderMinHeight;
        } else if ((this.options.sliderMaxHeight != null) && sliderHeight > this.options.sliderMaxHeight) {
          sliderHeight = this.options.sliderMaxHeight;
        }
        if (contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL) {
          sliderHeight += BROWSER_SCROLLBAR_WIDTH;
        }
        sliderWidth = Math.round(paneOuterWidth / contentWidth * paneOuterWidth);
        if (sliderWidth < this.options.sliderMinWidth) {
          sliderWidth = this.options.sliderMinWidth;
        } else if ((this.options.sliderMaxWidth != null) && sliderWidth > this.options.sliderMaxWidth) {
          sliderWidth = this.options.sliderMaxWidth;
        }
        if (contentStyleOverflowX === SCROLL && contentStyle.overflowY !== SCROLL) {
          sliderWidth += BROWSER_SCROLLBAR_HEIGHT;
        }
        this.maxSliderTop = paneOuterHeight - sliderHeight;
        this.maxSliderLeft = paneOuterWidth - sliderWidth;
        this.contentHeight = contentHeight;
        this.contentWidth = contentWidth;
        this.yPaneHeight = paneHeight;
        this.xPaneWidth = paneWidth;
        this.yPaneOuterHeight = paneOuterHeight;
        this.xPaneOuterWidth = paneOuterWidth;
        this.ySliderHeight = sliderHeight;
        this.xSliderWidth = sliderWidth;
        this.ySlider.height(sliderHeight);
        this.xSlider.width(sliderWidth);
        this.yEvents.scroll();
        this.xEvents.scroll();
        this.yPane.show();
        this.isActiveY = true;
        if ((content.scrollHeight === content.clientHeight) || (this.yPane.outerHeight(true) >= content.scrollHeight && contentStyleOverflowY !== SCROLL)) {
          this.yPane.hide();
          this.$el.removeClass('has-scrollbar-y');
          this.isActiveY = false;
        } else if (this.el.clientHeight === content.scrollHeight && contentStyleOverflowY === SCROLL) {
          this.ySlider.hide();
        } else {
          this.ySlider.show();
        }
        this.xPane.show();
        this.isActiveX = true;
        if ((content.scrollWidth === content.clientWidth) || (this.xPane.outerWidth(true) >= content.scrollWidth && contentStyleOverflowX !== SCROLL)) {
          this.xPane.hide();
          this.$el.removeClass('has-scrollbar-x');
          this.isActiveX = false;
        } else if (this.el.clientWidth === content.scrollWidth && contentStyleOverflowX === SCROLL) {
          this.xSlider.hide();
        } else {
          this.xSlider.show();
        }
        this.yPane.css({
          opacity: (this.options.alwaysVisible ? 1 : ''),
          visibility: (this.options.alwaysVisible ? 'visible' : '')
        });
        this.xPane.css({
          opacity: (this.options.alwaysVisible ? 1 : ''),
          visibility: (this.options.alwaysVisible ? 'visible' : '')
        });
        return this;
      };


      /**
        @method scroll
        @private
        @example
            $(".nano").nanoScroller({ scroll: 'top' });
       */

      NanoScroll.prototype.scroll = function() {
        return this.scrollY();
      };


      /**
        @method scrollY
        @private
        @example
            $(".nano").nanoScroller({ scrollY: 'top' });
       */

      NanoScroll.prototype.scrollY = function() {
        if (!this.isActiveY) {
          return;
        }
        this.ySliderY = Math.max(0, this.ySliderY);
        this.ySliderY = Math.min(this.maxSliderTop, this.ySliderY);
        this.$content.scrollTop((this.yPaneHeight - this.contentHeight + BROWSER_SCROLLBAR_WIDTH) * this.ySliderY / this.maxSliderTop * -1);
        if (!this.iOSNativeScrolling) {
          this.ySlider.css({
            top: this.ySliderY
          });
        }
        return this;
      };


      /**
        @method scrollX
        @private
        @example
            $(".nano").nanoScroller({ scrollX: 'top' });
       */

      NanoScroll.prototype.scrollX = function() {
        if (!this.isActiveX) {
          return;
        }
        this.xSliderX = Math.max(0, this.xSliderX);
        this.xSliderX = Math.min(this.maxSliderLeft, this.xSliderX);
        this.$content.scrollLeft((this.xPaneWidth - this.contentWidth + BROWSER_SCROLLBAR_HEIGHT) * this.xSliderX / this.maxSliderLeft * -1);
        if (!this.iOSNativeScrolling) {
          this.xSlider.css({
            left: this.xSliderX
          });
        }
        return this;
      };


      /**
        Scroll at the bottom with an offset value
        @method scrollBottom
        @param offsetY {Number}
        @chainable
        @example
            $(".nano").nanoScroller({ scrollBottom: value });
       */

      NanoScroll.prototype.scrollBottom = function(offsetY) {
        if (!this.isActiveY) {
          return;
        }
        this.reset();
        this.$content.scrollTop(this.contentHeight - this.$content.height() - offsetY).trigger(MOUSEWHEEL);
        return this;
      };


      /**
        Scroll at the right with an offset value
        @method scrollRight
        @param offsetX {Number}
        @chainable
        @example
            $(".nano").nanoScroller({ scrollRight: value });
       */

      NanoScroll.prototype.scrollRight = function(offsetX) {
        if (!this.isActiveX) {
          return;
        }
        this.reset();
        this.$content.scrollLeft(this.contentWidth - this.$content.width() - offsetX).trigger(MOUSEWHEEL);
        return this;
      };


      /**
        Scroll at the top with an offset value
        @method scrollTop
        @param offsetY {Number}
        @chainable
        @example
            $(".nano").nanoScroller({ scrollTop: value });
       */

      NanoScroll.prototype.scrollTop = function(offsetY) {
        if (!this.isActiveY) {
          return;
        }
        this.reset();
        this.$content.scrollTop(+offsetY).trigger(MOUSEWHEEL);
        return this;
      };


      /**
        Scroll at the left with an offset value
        @method scrollLeft
        @param offsetX {Number}
        @chainable
        @example
            $(".nano").nanoScroller({ scrollLeft: value });
       */

      NanoScroll.prototype.scrollLeft = function(offsetX) {
        if (!this.isActiveX) {
          return;
        }
        this.reset();
        this.$content.scrollLeft(+offsetX).trigger(MOUSEWHEEL);
        return this;
      };


      /**
        Scroll to an element
        @method scrollTo
        @param node {Node} A node to scroll to.
        @chainable
        @example
            $(".nano").nanoScroller({ scrollTo: $('#a_node') });
       */

      NanoScroll.prototype.scrollTo = function(node) {
        var n;
        if (!(this.isActiveY || this.isActiveX)) {
          return;
        }
        this.reset();
        n = $(node).get(0);
        if (this.isActiveY) {
          this.scrollTop(n.offsetTop);
        }
        if (this.isActiveX) {
          this.scrollLeft(n.offsetLeft);
        }
        return this;
      };


      /**
        To stop the operation.
        This option will tell the plugin to disable all event bindings and hide the gadget scrollbar from the UI.
        @method stop
        @chainable
        @example
            $(".nano").nanoScroller({ stop: true });
       */

      NanoScroll.prototype.stop = function() {
        this.stopped = true;
        this.removeEvents();
        this.yPane.hide();
        this.xPane.hide();
        return this;
      };


      /**
        To flash the scrollbar gadget for an amount of time defined in plugin settings (defaults to 1,5s).
        Useful if you want to show the user (e.g. on pageload) that there is more content waiting for him.
        @method flash
        @chainable
        @example
            $(".nano").nanoScroller({ flash: true });
       */

      NanoScroll.prototype.flash = function() {
        if (!(this.isActiveY || this.isActiveX)) {
          return;
        }
        this.reset();
        if (this.isActiveY) {
          this.yPane.addClass('flashed');
        }
        if (this.isActiveX) {
          this.xPane.addClass('flashed');
        }
        setTimeout((function(_this) {
          return function() {
            if (_this.isActiveY) {
              _this.yPane.removeClass('flashed');
            }
            if (_this.isActiveX) {
              _this.xPane.removeClass('flashed');
            }
          };
        })(this), this.options.flashDelay);
        return this;
      };

      return NanoScroll;

    })();
    $.fn.nanoScroller = function(settings) {
      return this.each(function() {
        var options, scrollbar;
        if (!(scrollbar = this.nanoscroller)) {
          options = $.extend({}, defaults, settings);
          this.nanoscroller = scrollbar = new NanoScroll(this, options);
        }
        if (settings && typeof settings === "object") {
          $.extend(scrollbar.options, settings);
          if (settings.scrollBottom) {
            return scrollbar.scrollBottom(settings.scrollBottom);
          }
          if (settings.scrollTop) {
            return scrollbar.scrollTop(settings.scrollTop);
          }
          if (settings.scrollRight) {
            return scrollbar.scrollRight(settings.scrollRight);
          }
          if (settings.scrollLeft) {
            return scrollbar.scrollLeft(settings.scrollLeft);
          }
          if (settings.scrollTo) {
            return scrollbar.scrollTo(settings.scrollTo);
          }
          if (settings.scroll === 'bottom') {
            return scrollbar.scrollBottom(0);
          }
          if (settings.scroll === 'top') {
            return scrollbar.scrollTop(0);
          }
          if (settings.scroll === 'right') {
            return scrollbar.scrollRight(0);
          }
          if (settings.scroll === 'left') {
            return scrollbar.scrollLeft(0);
          }
          if (settings.scroll && settings.scroll instanceof $) {
            return scrollbar.scrollTo(settings.scroll);
          }
          if (settings.stop) {
            return scrollbar.stop();
          }
          if (settings.flash) {
            return scrollbar.flash();
          }
        }
        return scrollbar.reset();
      });
    };
  });

}).call(this);


define("ui/ui", function(){});
