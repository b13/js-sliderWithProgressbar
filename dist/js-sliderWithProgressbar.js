/**
 * image video slider
 */

define([
	"jquery"
	, "slick-carousel"
], function($) {

	return (function($el, options, sliderOptions, previewSliderOptions) {
		var
			me = this
			, currentSliderIndex = 0

				// default options
			, opts = $.extend({
				progressbarSelector     : '.bJS_progressbar'
				, slideSelector         : '.bJS_slider'
				, previewSlideSelector  : '.bJS_previewSlider'

				, $slider               : {}
				, $previewSlider        : {}

				, progressInterval      : ''
				, onCustomProgressbar   : null
				, paginationActiveClassName : 'active'
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

			// init main slider
			opts.$slider = $el.find(opts.slideSelector).slick($.extend(opts.sliderOptions, {asNavFor: $el.find(opts.previewSlideSelector)}));
			// init preview slider
			opts.$previewSlider = $el.find(opts.previewSlideSelector).slick($.extend(opts.previewSliderOptions, {asNavFor: $el.find(opts.slideSelector)}));

			// setup progressbar
			handleProgressbar(opts.$slider[0].slick.slickCurrentSlide());

			// on slider change
			// update all progressbars and check if default or custom progressbar animation is required
			opts.$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
				handleProgressbar(nextSlide);
				currentSliderIndex = nextSlide;
			});

			return me;
		}


			/**
			 * handle progressbar
			 */
		function handleProgressbar(index) {

			var
				$nextSlide          = opts.$slider.find('[data-slick-index="'+index+'"]')
				, $nextPreviewSlide = opts.$previewSlider.find('[data-slick-index="'+index+'"]')
				, $nextProgressbar  = opts.$previewSlider.find('[data-slick-index="'+index+'"]').find(opts.progressbarSelector);

			updateProgressbar(index);

			if ($nextPreviewSlide.data("customprogressbar")) {
					// do custom progressbar stuff
				if ($.isFunction(opts.onCustomProgressbar)) {
					opts.onCustomProgressbar($nextSlide, $nextProgressbar, me);
				}
			} else {
					// start default progressbar animation
				me.startProgressbarAnimation(index);
			}
		}



			/**
			 * update progress bar
			 * @param index
			 */
		function updateProgressbar(index) {
			var $slider = opts.$previewSlider.find('[data-slick-index="'+index+'"]');

			$slider.addClass(opts.paginationActiveClassName).siblings().removeClass(opts.paginationActiveClassName);
			opts.$previewSlider.find(opts.progressbarSelector).css('width', '0%');
		}


			/**
			 * start progressbar animation
			 * @param index
			 */
		me.startProgressbarAnimation = function(index) {
			var
				width           = 0
				, $progressbar  = opts.$previewSlider.find('[data-slick-index="'+index+'"]').find(opts.progressbarSelector)
				, autoplaySpeed = opts.$slider[0].slick.slickGetOption('autoplaySpeed');

			clearInterval(opts.progressInterval);
			opts.progressInterval = setInterval(function() {
				if (width <= 100) {
					width++;
					$progressbar.css({width: width + '%'});
				} else {
					clearInterval(opts.progressInterval);
				}
			}, (autoplaySpeed/100));
		};


			/**
			 * stop slider
			 */
		me.stop = function() {
			clearInterval(opts.progressInterval);
			opts.$slider[0].slick.slickPause();
		};


			/**
			 * start slider
			 * @param index
			 */
		me.start = function(index) {
			updateProgressbar(index ? index : currentSliderIndex);
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

