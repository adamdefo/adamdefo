/**
 * http://www.adamdefo.ru
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
;(function(window) {

		'use strict';

		var extend = function (a, b) {
			for (var key in b) {
				if (b.hasOwnProperty(key)) {
					a[key] = b[key];
				}
			}
			return a;
		}

		var TypeWriter = function (el, params) {
			this.el = el;
			this._params = extend({}, this._params);
			extend(this._params, params);

			this.timer;
			this.counter = 0;

			this._init();
		};

		TypeWriter.prototype._params = {
			speed: 90, // скорость вывода символов
			timeout: 1800, // через какое время запустить терминал
			inTxt: '',
			outTxt: 'TypeWriter version 1.0.0' // выводимый текст
		};

		TypeWriter.prototype._init = function () {
			this._initEvents();
			this._in();
			this._out();
		};

		TypeWriter.prototype._in = function () {
			// console.log(this._params.inTxt);
		};

		TypeWriter.prototype._out = function () {
			var self = this;
			setTimeout( function () {
				self.timer = setInterval(function() {
					if (self.counter < self._params.outTxt.length) {
						self.el.innerHTML += self._params.outTxt.charAt(self.counter);
			      self.counter++;
			    } else {
						clearInterval(self.timer);
					}
				}, self._params.speed);
			}, self._params.timeout);
		};

		TypeWriter.prototype._reset = function () {
			this.counter = 0;
		};

		TypeWriter.prototype._initEvents = function () {
			document.addEventListener('keydown', function(ev) {
				var keyCode = ev.keyCode || ev.which;
				console.log(keyCode);
			});
		};

		window.TypeWriter = TypeWriter;

})(window);
