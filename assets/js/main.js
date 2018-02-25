// $(function() {

// 	$('#cover-slider').slick({
// 	  slidesToShow: 1,
// 	  slidesToScroll: 1,
// 		infinity: true,
// 	  arrows: false,
// 	  fade: true,
// 	  asNavFor: '#main-slider'
// 	});

// 	$('#main-slider').slick({
// 		dots: true,
// 	  slidesToShow: 1,
// 	  slidesToScroll: 1,
// 		infinity: true,
// 	  arrows: true,
// 		focusOnSelect: false,
// 		asNavFor: '#cover-slider',
// 		prevArrow: '.slider__arrow_prev',
// 		nextArrow: '.slider__arrow_next'
// 	});


// });

var txt = 'Hello! \n[Test mode is activated.] \n\n###commands: \n- press Esc for restart;';

var Adam = new Terminal('#adam', { context: txt, isRandom: false });
