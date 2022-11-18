/*! WagtailLowdown v1.0.0 | (c) 2022 undefined | MIT License | git+https://github.com/nickmoreton/wagtail-lowdown.git */
(function () {
	'use strict';

	/**
	 * Element.matches() polyfill (simple version)
	 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	 */
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	document.addEventListener('click', function (event) {
		if (!event.target.matches('#click-me')) return;
		alert('You clicked me!');
	}, false);

})();
//# sourceMappingURL=main.js.map
