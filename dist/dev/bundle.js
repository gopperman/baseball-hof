/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _setPathCookie = __webpack_require__(1);

	var _setPathCookie2 = _interopRequireDefault(_setPathCookie);

	var _dom = __webpack_require__(3);

	var _removeMobileHover = __webpack_require__(4);

	var _removeMobileHover2 = _interopRequireDefault(_removeMobileHover);

	var _track = __webpack_require__(6);

	var _track2 = _interopRequireDefault(_track);

	var _wireSocialButtons = __webpack_require__(7);

	var _wireSocialButtons2 = _interopRequireDefault(_wireSocialButtons);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _removeMobileHover2.default)();
	(0, _setPathCookie2.default)();

	// Add class to html if JS is loaded
	document.querySelector('html').classList.add('js-is-loaded');

	// Wire header social if present
	if (document.querySelectorAll('.g-header__share').length) {
		(0, _wireSocialButtons2.default)({
			facebook: '.g-header__share-button--fb',
			twitter: '.g-header__share-button--tw'
		});
	}

	var socials = (0, _dom.selectAll)('.journalist__social--link');
	socials.map(function (el) {
		el.addEventListener('click', function (e) {
			var regex = /@(.)*/;
			var s = el.textContent.match(regex);
			if (s.length) {
				(0, _track2.default)('Apps - Baseball HoF - Tweet - ' + s[0]);
			}
		});
	});

	var expanders = (0, _dom.selectAll)('.journalist__expand');
	expanders.map(function (el) {
		el.addEventListener('click', function (e) {
			(0, _dom.addClass)(el, 'journalist__expand--expanded');
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = setPathCookie;

	var _docCookies = __webpack_require__(2);

	var _docCookies2 = _interopRequireDefault(_docCookies);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function setPathCookie() {
		// remove previous pathUrl cookie
		_docCookies2.default.removeItem('pathUrl', '/', '.bostonglobe.com');

		// get current path to graphic and set pathUrl
		var redirect = '/Page/Boston/2011-2020/WebGraphics/Metro/BostonGlobe.com/apps/index.html?';
		var path = redirect + window.location.pathname;
		_docCookies2.default.setItem('pathUrl', path, 'Session', '/', '.bostonglobe.com');
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// from mozilla https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
	// removed encodeURI from setItem

	var docCookies = {

		getItem: function getItem(sKey) {
			if (!sKey) {
				return null;
			}
			return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		},

		setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
				return false;
			}
			var sExpires = "";
			if (vEnd) {
				switch (vEnd.constructor) {
					case Number:
						sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
						break;
					case String:
						sExpires = "; expires=" + vEnd;
						break;
					case Date:
						sExpires = "; expires=" + vEnd.toUTCString();
						break;
				}
			}
			document.cookie = sKey + "=" + sValue + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
			return true;
		},

		removeItem: function removeItem(sKey, sPath, sDomain) {
			if (!this.hasItem(sKey)) {
				return false;
			}
			document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
			return true;
		},

		hasItem: function hasItem(sKey) {
			if (!sKey) {
				return false;
			}
			return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
		},

		keys: function keys() {
			var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
			for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
				aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
			}
			return aKeys;
		}

	};

	exports.default = docCookies;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// DOM helper functions

	// private
	var selectionToArray = function selectionToArray(selection) {
		var len = selection.length;
		var result = [];
		for (var i = 0; i < len; i++) {
			result.push(selection[i]);
		}
		return result;
	};

	// public
	var select = function select(selector) {
		return document.querySelector(selector);
	};

	var selectAll = function selectAll(selector) {
		return selectionToArray(document.querySelectorAll(selector));
	};

	var find = function find(el, selector) {
		return selectionToArray(el.querySelectorAll(selector));
	};

	var removeClass = function removeClass(el, className) {
		return el.classList.remove(className);
	};

	var addClass = function addClass(el, className) {
		return el.classList.add(className);
	};

	var hasClass = function hasClass(el, className) {
		return el.classList.contains(className);
	};

	var jumpTo = function jumpTo(el) {
		if (document.body.scrollTop) document.body.scrollTop = el.offsetTop + 1;else document.documentElement.scrollTop = el.offsetTop + 1;
	};

	exports.select = select;
	exports.selectAll = selectAll;
	exports.find = find;
	exports.removeClass = removeClass;
	exports.addClass = addClass;
	exports.hasClass = hasClass;
	exports.jumpTo = jumpTo;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = removeMobileHover;

	var _isMobile = __webpack_require__(5);

	var _isMobile2 = _interopRequireDefault(_isMobile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Inspired by: https://gist.github.com/rcmachado/7303143 and http://mvartan.com/2014/12/20/fixing-sticky-hover-on-mobile-devices/

	function removeMobileHover() {
		if (_isMobile2.default.any()) {
			// Loop through each stylesheet
			for (var sheetI = document.styleSheets.length - 1; sheetI >= 0; sheetI--) {
				var sheet = document.styleSheets[sheetI];

				// Verify if cssRules exists in sheet
				if (sheet.cssRules) {
					// Loop through each rule in sheet
					for (var ruleI = sheet.cssRules.length - 1; ruleI >= 0; ruleI--) {
						var rule = sheet.cssRules[ruleI];

						// Verify rule has selector text
						if (rule.selectorText) {
							// Replace hover psuedo-class with active psuedo-class
							rule.selectorText = rule.selectorText.replace(':hover', ':active');
						}
					}
				}
			}
		}
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var isMobile = {
		android: function android() {
			return navigator.userAgent.match(/Android/i);
		},

		blackberry: function blackberry() {
			return navigator.userAgent.match(/BlackBerry/i);
		},

		ios: function ios() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},

		opera: function opera() {
			return navigator.userAgent.match(/Opera Mini/i);
		},

		windows: function windows() {
			return navigator.userAgent.match(/IEMobile/i);
		},

		any: function any() {
			return isMobile.android() || isMobile.blackberry() || isMobile.ios() || isMobile.opera() || isMobile.windows();
		}
	};

	exports.default = isMobile;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var track = function track(value) {
		if (window.location.hostname.indexOf('localhost') > -1) console.log(value);
		if (typeof s_gi === 'function') {
			var tracker = s_gi('nytbostonglobecom');
			s.linkTrackVars = 'eVar15,channel,prop1';
			s.linkTrackEvents = 'none';
			tracker.tl(true, 'o', value);
		}
	};

	exports.default = track;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = wireSocialButtons;
	function wireSocialButtons(params) {
		var href = window.location.href;
		var text = document.title;
		var encodedText = encodeURIComponent(text);

		var facebook = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(href);
		var facebookNode = document.querySelectorAll(params.facebook);

		for (var f = 0; f < facebookNode.length; f++) {
			facebookNode[f].setAttribute('href', facebook);
		}

		var twitter = 'https://twitter.com/intent/tweet?text=' + encodedText + '&via=BostonGlobe&url=' + encodeURI(href);
		var twitterNode = document.querySelectorAll(params.twitter);

		for (var t = 0; t < twitterNode.length; t++) {
			twitterNode[t].setAttribute('href', twitter);
		}
	}

/***/ }
/******/ ]);