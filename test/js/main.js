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

			me.slider = [];

				// init slider
			require(['js-sliderWithProgressbar'], function(slider) {
				$('.bJS_ct_slider').each(function() {
					me.slider.push(new slider($(this), {}, {}));
				});
			});

			return me;
		}

		return initialize();
	}



	initialize();
});