$( function () {
	var container = $('.config-details'),
			$window = $(window),
			$header = $('.header'),
			$footer = $('.footer'),
			$footerLinks = $('.footer-links');

	$.each(details, function (key, value) {
		var configGroup = $('<div class="config-group" />').attr('id', value.id);
		var groupTitle = $('<div class="config-group-title" />').html(key);
		var groupDesc = $('<div class="config-group-desc" />').append($('<p />').html(value.desc));

		var groupContent = $('<div class="config-group-content" />');
		$.each(value.properties, function (idx, data) {
			var propGroup = $('<div class="prop-group" />');
			var propTitle = $('<div class="prop-group-title" />').html(data.name);
			var propDesc = $('<div class="prop-group-desc" />').append($('<p />').html(data.desc));
			var propInfo = $('<div class="prop-group-info" />').html(
				'<strong>Type:</strong> ' + data.type + ' | <strong>Range:</strong> ' + data.range + ' | <strong>Default:</strong> ' + data.default
			);

			propGroup.append(propTitle).append(propInfo).append(propDesc);
			groupContent.append(propGroup);
		});

		configGroup.append(groupTitle).append(groupDesc).append(groupContent);
		container.append(configGroup);
	});

	$window.scroll( function (e) {
		var footerTop = $footer.position().top,
				docMenu = $('.doc-menu'),
				menuHeight = docMenu.height();

		if ( +menuHeight + 94 + $window.scrollTop() >= footerTop ) {
			$('.doc-menu').hide();
		} else {
			$('.doc-menu').show();
		}

		$('.doc-group, .config-group, .doc-subgroup').each( function () {
			var elmt = $(this),
					navId = elmt.attr('id'),
					top = elmt.position().top,
					height = elmt.height(),
					scrollDistance = $window.scrollTop() + 10;

			if (scrollDistance >= top && scrollDistance < top + height) {
				docMenu.find('.doc-nav-link, .doc-nav-header').removeClass('active');
				docMenu.find('a[href="#' + navId + '"]').closest('.doc-nav-link, .doc-nav-header').addClass('active');
			}
		});

		if ($window.scrollTop() < 10) {
			$header.addClass('attop');
		} else {
			$header.removeClass('attop');
		}

		// checkOffset();

		// if($window.scrollTop() > 300){
		// 	$('.go-top').fadeIn(200);
		// }else{
		// 	$('.go-top').fadeOut(200);
		// }

		// $('.go-top').unbind('click').click(function (event) {
		// 	event.preventDefault();
		// 	$('html body').animate({scrollTop:0},300);
		// });

		// function checkOffset() {
		// 	if($('.go-top').offset().top + $('.go-top').height() >= $('.footer').offset().top - 10){
		// 		$('.go-top').css('position', 'absolute');
		// 		$('.go-top').css('top', $('.footer').offset().top - 43);
		// 	}
		// 	if($(document).scrollTop() + window.innerHeight < $('.footer').offset().top){
		// 		$('.go-top').css('position', 'fixed');
		// 		$('.go-top').css('top', "");
		// 	}
		// }
	});

	$('.doc-menu').find('a').off('click').on('click', function (e) {
		e.preventDefault();

		var elmtId = $(this).attr('href'),
				elmt = $(elmtId);

		var top = elmt.position().top;
		window.scrollTo(0, +top );
	});

	// $footerLinks.off('mouseenter').on('mouseenter', function (e) {
	// 	var elmt = $(this),
	// 			blockLinks = elmt.find('.block-links').slideDown('fast');
	// });

	// $footerLinks.off('mouseleave').on('mouseleave', function (e) {
	// 	var elmt = $(this),
	// 			blockLinks = elmt.find('.block-links').slideUp('fast');
	// });
});