/*!
WSKY.js - http://justinarmstrongcreative.com/wsky.js
Licensed under the MIT license - http://opensource.org/licenses/MIT

Copyright (c) 2015 Justin Armstrong
*/

jQuery(document).ready(function(){

	jQuery('.wsky').each(function(){

		var wsky 				= this; // The Element
		var wsky_animation		= jQuery(wsky).attr('wsky-animation'); // Animation
		var wsky_duration 		= jQuery(wsky).attr('wsky-duration') / 1000; // Duration divided into seconds
		wsky_duration			+= 's'; // Add an 's' for seconds

		// Hide all "In" animations by default
		//if (/fadeIn|bounceIn|flip/.test(wsky_animation)) {
		if (wsky_animation.indexOf("In") >= 0) {
			jQuery(wsky).css({
				//'visibility' : 'hidden',
				'opacity' : 0
			});
		}

		// Add the animation duration with all of the obligatory vendor prefixes
		jQuery(this).css({
			'animation-duration' : wsky_duration,
			'-webkit-animation-duration' : wsky_duration
		});

	});

});


jQuery(document).scroll(function(){

	jQuery('.wsky').each(function(){

		// Window info
		var win_height			= jQuery(window).height() // Window height
		var win_scroll			= jQuery(window).scrollTop(); // Window scroll top

		// Element info
		var wsky 				= this; // The Element
		var wsky_animation		= jQuery(wsky).attr('wsky-animation'); // Animation
		var wsky_delay 			= jQuery(wsky).attr('wsky-delay'); // Delay
		var wsky_offset 		= jQuery(wsky).attr('wsky-offset'); // Offset
		var wsky_start 			= jQuery(this).offset().top; // Element starting position
		var wsky_scroll			= wsky_start - win_scroll; // The position of the Element after scroll

		if (wsky_offset.indexOf("%") >= 0) {
			// If the offset is a percentage
			var wsky_offset 		= jQuery(wsky).attr('wsky-offset').replace(/\D/g,'') / 100; // Offset, cleaned and converted to a fraction
			var wsky_remainder		= 1 - wsky_offset; // Invert the offset so we are looking for the percentage of the screen from the bottom
			var wsky_fire			= win_height * wsky_remainder; // The point at which the animation will fire
		} else {
			// If the offset is in pixels
			var wsky_offset 		= jQuery(wsky).attr('wsky-offset').replace(/\D/g,''); // Offset, just cleaned
			var wsky_fire			= win_height - wsky_offset; // The point at which the animation will fire
		}

		// And now, we can make a baby dinosaur
		if (wsky_scroll <= wsky_fire) {
			setTimeout(function(){
				jQuery(wsky).addClass(wsky_animation); // Giveth

				// Show all "In" animations
				//if (/fadeIn|bounceIn|flipIn/.test(wsky_animation)) {
				if (wsky_animation.indexOf("In") >= 0) {
					jQuery(wsky).css({
						//'visibility' : 'visible',
						'opacity' : 1
					});
				}

				// Hide all "Out" animations
				//if (/fadeOut|bounceOut|flipOut/.test(wsky_animation)) {
				if (wsky_animation.indexOf("Out") >= 0) {
					jQuery(wsky).css({
						//'visibility' : 'hidden',
						'opacity' : 0
					});
				}
			}, wsky_delay);
		}

	});

});