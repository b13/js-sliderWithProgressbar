/**
 * image video slider
 */

define([
	"jquery"
	, "slick-carousel"
], function($) {

	return (function(options, sliderOptions, previewSliderOptions) {
		var
			me = this
			, currentSliderIndex = ''

				// default options
			, opts = $.extend({
				sliderSelector          : '.bJS_slider'
				, previewSliderSelector : '.bJS_previewSlider'
				, progressBarSelector   : '.bJS_progressBar'

				, $slider          : {}
				, $previewSlider   : {}

				, progressInterval : ''
			}, options);

				// slick slider options
				// see: https://kenwheeler.github.io/slick/
			opts.sliderOptions = $.extend({
				slidesToShow   : 1,
				slidesToScroll : 1,
				arrows         : false,
				fade           : true,
				autoplay       : true
			}, sliderOptions);

			opts.previewSliderOptions = $.extend({
				slidesToShow   : 3,
				slidesToScroll : 1,
				dots           : false,
				focusOnSelect  : true,
				centerMode     : true
			}, previewSliderOptions);


		function initialize() {

			console.log(opts);

			// init main slider
			opts.$slider = $(opts.sliderSelector).slick($.extend(opts.sliderOptions, {asNavFor: opts.previewSliderSelector}));

			// init preview slider
			opts.$previewSlider = $(opts.previewSliderSelector).slick($.extend(opts.previewSliderOptions, {asNavFor: opts.sliderSelector}));

			// update progess bar
			updateProgressBar(0);
			opts.$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
				currentSliderIndex = nextSlide;
				updateProgressBar(nextSlide);
			});
			return me;
		}


			/**
			 * update progress bar
			 * @param index
			 */
		function updateProgressBar(index) {
			var
				width           = 0
				, $slider       = opts.$previewSlider.find('[data-slick-index="'+index+'"]')
				, $progressBar  = opts.$previewSlider.find('[data-slick-index="'+index+'"]').find(opts.progressBarSelector)
				, autoplaySpeed = opts.$slider[0].slick.slickGetOption('autoplaySpeed');

			$slider.prevUntil().find(opts.progressBarSelector).css('width', '100%');
			$slider.nextUntil().find(opts.progressBarSelector).css('width', '0%');
			$progressBar.css('width', '0%');

			clearInterval(opts.progressInterval);
			opts.progressInterval = setInterval(function() {
				if (width <= 100) {
					width++;
					$progressBar.css({width: width + '%'});
				} else {
					clearInterval(opts.progressInterval);
				}
			}, (autoplaySpeed/100));
		}


			/**
			 * pause slider
			 */
		me.pause = function() {
			clearInterval(opts.progressInterval);
			opts.$slider[0].slick.slickPause();
		};


			/**
			 * resume slider
			 */
		me.resume = function() {
			updateProgressBar(currentSliderIndex);
			opts.$slider[0].slick.slickPlay();
		};

			/**
			 * get reference to slick slider
			 */
		me.getSlick = function() {
			return opts.$slider[0].slick;
		};

		return initialize();
	});
});