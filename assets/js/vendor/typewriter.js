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

		var random = (min, max) => {
			var rand = min - 0.5 + Math.random() * (max - min + 1)
			rand = Math.round(rand);
			return rand;
		};

		var Terminal = function (selector, params) {
			this.el = document.querySelector(selector);
			if (this.el) {
				this.$log = this.el.querySelector('.terminal__log');
				this.$codeField = this.el.querySelector('.terminal__code');
			}

			// поле ввода
			this.$input = this.el.querySelector('.terminal__input');
			// значение поля
			this.inputValue = '';

			this._params = extend({}, this._params);
			extend(this._params, params);

			this.timer;
			this.timerInterval;
			this.answerIndex = 0;
			this.answerCounter = 0; // порядковый номер ответа из хранилища

			this._init();
		};

		Terminal.prototype._params = {
			context: '',
			isRandom: true, // рендомный ответ из хранилища
			speed: 30, // скорость вывода символов
			timeout: 800 // через какое время запустить терминал
		};

		Terminal.prototype._store = {
			answers: [
				'Че тебе от меня надо?',
				'Как тебя зовут?',
				'Сколько лет?'
			],
			iDontKnow: 'Не знаю что спросить и как ответить :('
		};

		Terminal.prototype._input = function (context) {
			this._params.context = context;
		};

		Terminal.prototype._output = function (context) {
			var self = this;
			var txt = context;
			if (!this.timer) {
				this.createTimer(txt);
			}
		};

		// создает таймер, который будет анимированно выводить текст
		Terminal.prototype.createTimer = function (txt) {
			var self = this, counter = 0;
			this.timer = setTimeout( function () {
				self.timerInterval = setInterval( function () {
					if (counter < txt.length) {
						self.$codeField.innerHTML += txt.charAt(counter);
						counter++;
					} else {
						self.$log.scrollTop = self.$log.scrollHeight;
						self.focusInput();
						self.resetTimer();
					}
				}, self._params.speed);
			}, self._params.timeout);
		};

		// сбрасываем таймер
		Terminal.prototype.resetTimer = function () {
			clearInterval(this.timerInterval);
			this.timerInterval = undefined;
			clearTimeout(this.timer);
			this.timer = undefined;
		};

		// отображает терминал
		Terminal.prototype._show = function () {
			if (!classie.hasClass(this.el, '_show')) {
				classie.add(this.el, '_show');
			}
		};

		// скрывает терминал
		Terminal.prototype._hide = function () {
			if (classie.hasClass(this.el, '_show')) {
				classie.remove(this.el, '_show');
			}
		};

		// переключатель показать/скрыть терминал
		Terminal.prototype._toggle = () => {
			classie.toggle(this.el, '_show');
		};

		Terminal.prototype.focusInput = function () {
			classie.add(this.$input, 'terminal__input_focused');
			this.$input.focus();
		};

		Terminal.prototype.clearInput = function () {
			this.$input.value = '';
			this.inputValue = '';
		};

		// очищает содержимое лога
		Terminal.prototype.clearLog = function () {
			this.$codeField.innerHTML = '';
		};

		// сбрасывает терминал на дефолтное состояние
		Terminal.prototype.resetTerminal = function () {
			this.resetTimer();
			this.clearLog();
			this.clearInput();
		};

		// инициализация терминала
		Terminal.prototype._init = function () {
			this._show();
			this._output(this._params.context);
			this._initEvents();
		};

		Terminal.prototype._initEvents = function () {
			var self = this;

			this.el.addEventListener('click', function (ev) {
				self.focusInput();
			});

			this.$input.addEventListener('keydown', function (ev) {
				var keyCode = ev.keyCode || ev.which;
				if (keyCode === 13) { // реагирует на enter когда input в фокусе
					self.inputValue = self.$input.value.trim();
					if (self.inputValue) {
						self.$codeField.innerHTML += '\n' + self.inputValue;
						self.$log.scrollTop = self.$log.scrollHeight;
						self.clearInput();

						self.$codeField.innerHTML += '\n';
						if (self._params.isRandom) {
							self.answerIndex = random(0, self._store.answers.length);
							self._output(self._store.answers[self.answerIndex]);
						} else {
							if (self.answerIndex >= (self._store.answers.length)) {
								self._output(self._store.iDontKnow);
							} else {
								self._output(self._store.answers[self.answerIndex]);
								self.answerIndex++;
							}
						}
					}
				}
			});

			document.addEventListener('keydown', function (ev) {
				var keyCode = ev.keyCode || ev.which;
				// console.log(keyCode)
				if (keyCode === 27) { // press esc
					self.resetTerminal();
				}
			});
		};

		window.Terminal = Terminal;

})(window);
