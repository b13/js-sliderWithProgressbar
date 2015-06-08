js-sliderWithProgressbar
===================

setup up slick slider (https://kenwheeler.github.io/slick/) with preview image and bootstrap progressbar 

### Initialization with AMD
	// init slider
	require(['js-sliderWithProgressbar'], function(slider) {
		
		$('.bJS_ct_slider').each(function() {
		
			me.slider = new slider($(this), options, sliderOptions, previewSliderOptions);
	
			// stop slider
			//me.slider.stop();
	
			// start slider
			//me.slider.start(index);
			
			// get reference to slick slider
			//me.slider.getSlick();
			
		});
	});
	
	
### default options
	
	var options = {
		progressbarSelector    : '.bJS_progressbar'
		, slideSelector        : '.bJS_slider'
		, previewSlideSelector : '.bJS_previewSlider'
		, progressInterval     : ''
			// add your own progressbar animation function to sync it i.e. with a video
			// function will be called if the current preview slider item (".b_previewItem") has the data-customprogressbar="true" property set
		, onCustomProgressbar : function($slide, $progressbar) {}
	}
	
		// slick slider options
		// see: https://kenwheeler.github.io/slick/
	var sliderOptions = {
		slidesToShow   : 1,
		slidesToScroll : 1,
		arrows         : false,
		fade           : true,
		autoplay       : true
	}
	
		// slick slider options
		// see: https://kenwheeler.github.io/slick/
	var previewSliderOptions = {
		slidesToShow   : 3,
		slidesToScroll : 1,
		dots           : false,
		focusOnSelect  : true,
		centerMode     : true
	}