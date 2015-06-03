require.config({
	paths: {
		bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
		jquery: '../../bower_components/jquery/dist/jquery',
		requirejs: '../../bower_components/requirejs/require',
		'slick-carousel': '../../bower_components/slick-carousel/slick/slick.min',
		'js-sliderWithProgressbar': '../../src/js-sliderWithProgressbar'
	},
	packages: [

	]
});

require(['main']);