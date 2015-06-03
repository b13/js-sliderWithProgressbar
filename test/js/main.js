define('main',[
], function() {
	function initialize() {
		initSlider();
	}

		/**
		 * init slider
		 * @returns {*}
		 */
	function initSlider() {
		var
			me = this
			, s = {

			};

		function initialize() {

				// init slider
			require(['js-sliderWithProgressbar'], function(slider) {
				me.slider = new slider();

					// stop slider
				//me.slider.pause();

					// resume slider
				//me.slider.resume();
			});

			return me;
		}

		return initialize();
	}



	initialize();
});