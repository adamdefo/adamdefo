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
		};

		var TypeWriter = function (selector, params) {
			this.el = document.querySelector(selector);
			if (this.el) {
				this.$log = this.el.querySelector('.terminal__log');
				this.$codeField = this.el.querySelector('.terminal__code');
			}

			this.$input = this.el.querySelector('.terminal__input');
			this.inputValue = '';

			this._params = extend({}, this._params);
			extend(this._params, params);

			this.timer;

			this._init();
		};

		TypeWriter.prototype._params = {
			speed: 60, // скорость вывода символов
			timeout: 1800, // через какое время запустить терминал
			inTxt: '',
			outTxt: 'TypeWriter version 1.0.0' // выводимый текст
		};

		TypeWriter.prototype._in = function () {
			// console.log(this._params.inTxt);
		};

		TypeWriter.prototype._out = function () {
			var self = this, counter = 0;
			this._reset();
			this._show();
			if (!this.timer) {
				setTimeout( function () {
					self.timer = setInterval(function() {
						if (counter < self._params.outTxt.length) {
							self.$codeField.innerHTML += self._params.outTxt.charAt(counter);
							counter++;
						} else {
							clearInterval(self.timer);
							self.focusInput();
						}
					}, self._params.speed);
				}, self._params.timeout);
			}
		};

		TypeWriter.prototype._show = function () {
			if (!classie.hasClass(this.el, '_show')) {
				classie.add(this.el, '_show');
			}
		};

		TypeWriter.prototype._hide = function () {
			if (classie.hasClass(this.el, '_show')) {
				classie.remove(this.el, '_show');
			}
		};

		// сбрасываем таймер и очищаем вывод
		TypeWriter.prototype._reset = function () {
			clearInterval(this.timer);
			this.timer = undefined;
			this.$codeField.innerHTML = '';
		};

		TypeWriter.prototype.focusInput = function () {
			if (!classie.has(this.$input, 'terminal__input_focused')) {
				classie.add(this.$input, 'terminal__input_focused');
			}
			this.$input.focus();
		};

		TypeWriter.prototype.clearInput = function () {
			this.$input.value = '';
			this.inputValue = '';
		};

		// сбрасывает терминал на дефолтное состояние
		TypeWriter.prototype.resetTerminal = function () {
			this._out();
			this.clearInput();
		};

		TypeWriter.prototype._init = function () {
			this._out();
			this._initEvents();
		};

		TypeWriter.prototype._initEvents = function () {
			var self = this;

			this.el.addEventListener('click', function (ev) {
				self.focusInput();
			});

			this.$input.addEventListener('keydown', function (ev) {
				var keyCode = ev.keyCode || ev.which;
				if (keyCode === 13) { // press enter
					self.inputValue = self.$input.value.trim();
					if (self.inputValue) {
						self.$codeField.innerHTML += '\n' + self.inputValue;
						self.$log.scrollTop = self.$log.scrollHeight;
						self.clearInput();
					}
				}
			});

			document.addEventListener('keydown', function (ev) {
				var keyCode = ev.keyCode || ev.which;
				if (keyCode === 27) { // press esc
					self.resetTerminal();
				}
			});
		};

		window.TypeWriter = TypeWriter;

})(window);
