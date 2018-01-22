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

			this._init();
		};

		TypeWriter.prototype._params = {
			speed: 60,
			timeout: 1800
		};

		TypeWriter.prototype._init = function () {
			console.log('Init TW');

			this._initEvents();
		};

		TypeWriter.prototype._initEvents = function () {
			document.addEventListener('keydown', function(ev) {
				var keyCode = ev.keyCode || ev.which;
				console.log(keyCode);
			});
		};

		window.TypeWriter = TypeWriter;

})(window);

var tw = new TypeWriter();