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



// let vm = new Vue({
// 	el: '#app',
// 	data: function() {
// 		return {
// 			greet: 'Hello'
// 		}
// 	}
// });

var txt = `Привет!
					[Тестовый режим; нажми Ctrl+D to save and quit; нажми Ctrl+C to quit without saving]

					###команды

					- run
					- refresh
					- destroy
					- optimize 🥝`;

var tw = new TypeWriter(document.getElementById('typewriter'), { outTxt: txt });
