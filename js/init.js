$(function () {
	
	olympics_config.meta.position = '#uv-graph-space1';
	uv.chart('StackedBar', olympics_data, olympics_config);
	
	india_gdp_config.meta.position = '#uv-graph-space2';
	uv.chart('Line', india_gdp_data, india_gdp_config);

	browser_wars_config.meta.position = '#uv-graph-space3';
	uv.chart('PercentArea', browser_wars_data, browser_wars_config);
	
	github_lang_config.meta.position = '#uv-graph-space4';
	uv.chart('Pie', github_lang_data, github_lang_config);


	/* Page Interaction goes below this point */
	var $window = $(window),
			$header = $('.header');

	$window.scroll( function (e) {
		if ($window.scrollTop() > 10) {
			$header.removeClass('attop');
		} else {
			$header.addClass('attop');
		}
	});

});