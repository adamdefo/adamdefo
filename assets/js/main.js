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



 let vm = new Vue({
 	el: '#app',
 	data: function() {
 		return {
 			list: [
                {
                    id: 1,
                    name: 'Name 1'
                },
                {
                    id: 2,
                    name: 'Name 2'
                },
                {
                    id: 3,
                    name: 'Name 3'
                },
                {
                    id: 4,
                    name: 'Name 4'
                },
                {
                    id: 5,
                    name: 'Name 5'
                },
                {
                    id: 6,
                    name: 'Name 6'
                }
            ]
 		}
 	}
 });

var txt = `Привет!
					[Тестовый режим; нажми Ctrl+D to save and quit; нажми Ctrl+C to quit without saving]

					###команды

					- run
					- refresh
					- destroy
					- optimize ?`;

var tw = new TypeWriter('#typewriter', { outTxt: txt });
