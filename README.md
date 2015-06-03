js-sliderWithProgressbar
===================

setup up slick slider (https://kenwheeler.github.io/slick/) with preview image and bootstrap progressbar 

### Initialization with AMD
	// init slider
	require(['js-sliderWithProgressbar'], function(slider) {
		me.slider = new slider(options);

		// stop slider
		//me.slider.pause();

		// resume slider
		//me.slider.resume();
		
		// get reference to slick slider
		//me.slider.getSlick();
	});
	
	
### default options
	var options = {
		sliderSelector          : '.bJS_slider'
		, previewSliderSelector : '.bJS_previewSlider'
		, progressBarSelector   : '.bJS_progressBar'
	
			// slick slider options
			// see: https://kenwheeler.github.io/slick/
		, sliderOptions : {
			slidesToShow     : 1
			, slidesToScroll : 1
			, arrows         : false
			, fade           : true
			, autoplay       : true
		}
		, previewSliderOptions: {
			slidesToShow     : 3
			, slidesToScroll : 1
			, dots           : false
			, focusOnSelect  : true
			, centerMode     : true
		}
	}