(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ChatUI", [], factory);
	else if(typeof exports === 'object')
		exports["ChatUI"] = factory();
	else
		root["ChatUI"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _MainFrame = __webpack_require__(1);
	
	var _Dialog = __webpack_require__(11);
	
	var _eventEmitter = __webpack_require__(7);
	
	var _chatSettings = __webpack_require__(9);
	
	var _componentRender = __webpack_require__(13);
	
	var ChatUI = function ChatUI(chatData) {
	
	    return {
	        render: function render(querySelector, componentName) {
	            var baseEl = document.querySelector(querySelector);
	            if (!baseEl) {
	                throw new Error('Given selector ' + querySelector + ' is not match to any element');
	            }
	            _chatSettings.chatSettings.setSettings(chatData);
	            switch (componentName) {
	                case 'dialog':
	                    baseEl.appendChild((0, _componentRender.componentRender)(_Dialog.Dialog));
	                    break;
	                case 'mainFrame':
	                default:
	                    baseEl.appendChild((0, _componentRender.componentRender)(_MainFrame.MainFrame));
	                    break;
	            }
	            return {
	                on: function on(eventName, callback) {
	                    _eventEmitter.eventEmitter.addListener(eventName, callback);
	                },
	                off: function off(eventName, callback) {
	                    _eventEmitter.eventEmitter.removeListener(eventName, callback);
	                },
	                trigger: function trigger(eventName, data) {
	                    _eventEmitter.eventEmitter.emit(eventName, data);
	                }
	            };
	        }
	    };
	};
	
	exports.default = ChatUI;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MainFrame = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _general = __webpack_require__(2);
	
	var _header = __webpack_require__(3);
	
	var _Component2 = __webpack_require__(4);
	
	var _Header = __webpack_require__(5);
	
	var _Dialog = __webpack_require__(11);
	
	var _Input = __webpack_require__(20);
	
	var _eventEmitter = __webpack_require__(7);
	
	var _domHelper = __webpack_require__(21);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MainFrame = exports.MainFrame = function (_Component) {
	    _inherits(MainFrame, _Component);
	
	    function MainFrame() {
	        _classCallCheck(this, MainFrame);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainFrame).call(this));
	
	        _this.openChatClass = _general.LIB_NAME + '-mainframe_open';
	        return _this;
	    }
	
	    _createClass(MainFrame, [{
	        key: 'addEvents',
	        value: function addEvents() {
	            var _this2 = this;
	
	            _eventEmitter.eventEmitter.on(_header.CLOSE_CHAT, function (data) {
	                var closeSource = data && data.source ? data.source : _header.CHAT_CLOSED_SOURCE_CHAT;
	                _domHelper.domHelper.removeClass(_this2.refs.mainframe, _this2.openChatClass);
	                _eventEmitter.eventEmitter.emit(_header.CHAT_CLOSED, { source: closeSource });
	            });
	
	            _eventEmitter.eventEmitter.on(_header.OPEN_CHAT, function () {
	                _domHelper.domHelper.addClass(_this2.refs.mainframe, _this2.openChatClass);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.addEvents();
	
	            return {
	                div: {
	                    id: _general.LIB_NAME + '-mainframe',
	                    ref: 'mainframe',
	                    children: [{
	                        div: {
	                            className: _general.LIB_NAME + '-header-container',
	                            component: _Header.Header
	                        }
	                    }, {
	                        div: {
	                            className: _general.LIB_NAME + '-dialog-container',
	                            component: _Dialog.Dialog
	                        }
	                    }, {
	                        div: {
	                            className: _general.LIB_NAME + '-input-container',
	                            component: _Input.Input
	                        }
	                    }]
	                }
	            };
	        }
	    }]);

	    return MainFrame;
	}(_Component2.Component);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var LIB_NAME = exports.LIB_NAME = 'chat-ui';

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CLOSE_CHAT = exports.CLOSE_CHAT = 'close-chat';
	var CHAT_CLOSED = exports.CHAT_CLOSED = 'chat-closed';
	var CHAT_CLOSED_SOURCE_USER = exports.CHAT_CLOSED_SOURCE_USER = 'user';
	var CHAT_CLOSED_SOURCE_CHAT = exports.CHAT_CLOSED_SOURCE_CHAT = 'chat';
	var OPEN_CHAT = exports.OPEN_CHAT = 'open-chat';

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Component = exports.Component = function () {
	    function Component() {
	        _classCallCheck(this, Component);
	
	        this.refs = {};
	    }
	
	    _createClass(Component, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {}
	    }, {
	        key: '$$updateRefs',
	        value: function $$updateRefs(newRefs) {
	            this.refs = newRefs;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return {
	                div: {
	                    innerHTML: 'Basic Component'
	                }
	            };
	        }
	    }]);

	    return Component;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Header = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Component2 = __webpack_require__(4);
	
	var _general = __webpack_require__(2);
	
	var _header = __webpack_require__(3);
	
	var _templateEngine = __webpack_require__(6);
	
	var _eventEmitter = __webpack_require__(7);
	
	var _chatSettings = __webpack_require__(9);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Header = exports.Header = function (_Component) {
	    _inherits(Header, _Component);
	
	    function Header() {
	        _classCallCheck(this, Header);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this));
	
	        _this.onClose = function () {
	            // Event for mainframe to close the chat (remove 'open' class)
	            _eventEmitter.eventEmitter.emit(_header.CLOSE_CHAT, { source: _header.CHAT_CLOSED_SOURCE_USER });
	        };
	        return _this;
	    }
	
	    _createClass(Header, [{
	        key: 'render',
	        value: function render() {
	            var id = _general.LIB_NAME + '-header';
	            var closeBtnClass = _general.LIB_NAME + '-header__close';
	            var innerTemplate = '\n            <div class="' + closeBtnClass + '"></div>\n            <div class="' + _general.LIB_NAME + '-header__cell ' + _general.LIB_NAME + '-header__cell_image">\n                <div class="' + _general.LIB_NAME + '-header__image"\n                     <% if (avatar) { %>\n                     style="background-image: url(\'<% avatar %>\')"\n                     <% } %>\n                     >\n                </div>\n            </div>\n            <div class="' + _general.LIB_NAME + '-header__cell ' + _general.LIB_NAME + '-header__cell_title">\n                <div class="' + _general.LIB_NAME + '-header__title">\n                    <% title %>\n                </div>\n                <div class="' + _general.LIB_NAME + '-header__subtitle">\n                    <% subtitle %>\n                </div>\n            </div>\n        ';
	            var chatData = {
	                avatar: _chatSettings.chatSettings.getProperty('avatar'),
	                title: _chatSettings.chatSettings.getProperty('title'),
	                subtitle: _chatSettings.chatSettings.getProperty('subtitle')
	            };
	
	            return {
	                div: {
	                    id: id,
	                    innerHTML: (0, _templateEngine.templateEngine)(innerTemplate, chatData),
	                    click: this.onClose
	                }
	            };
	        }
	    }]);

	    return Header;
	}(_Component2.Component);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Absurd TemplateEngine
	 * https://github.com/krasimir/absurd/blob/master/lib/processors/html/helpers/TemplateEngine.js
	 * http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
	 * @param html {string}
	 * @param data {object}
	 * @returns {string}
	 * @constructor
	 */
	var templateEngine = exports.templateEngine = function templateEngine(html, data) {
	    var re = /<%(.+?)%>/g;
	    var reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;
	    var code = 'with(obj) { var r=[];\n';
	    var cursor = 0;
	    var result = void 0;
	    var match = void 0;
	    var add = function add(line, js) {
	        if (js) {
	            code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n';
	        } else {
	            code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '';
	        }
	        return add;
	    };
	    while (match = re.exec(html)) {
	        add(html.slice(cursor, match.index))(match[1], true);
	        cursor = match.index + match[0].length;
	    }
	    add(html.substr(cursor, html.length - cursor));
	    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
	    try {
	        result = new Function('obj', code).apply(data, [data]);
	    } catch (err) {
	        console.error('\'' + err.message + '\'', ' in \n\nCode:\n', code, '\n');
	    }
	    return result;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.eventEmitter = undefined;
	
	var _wolfy87Eventemitter = __webpack_require__(8);
	
	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ee = null;
	
	var eventEmitter = exports.eventEmitter = function () {
	    ee = ee || new _wolfy87Eventemitter2.default();
	    return ee;
	}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter v5.0.0 - git.io/ee
	 * Unlicense - http://unlicense.org/
	 * Oliver Caldwell - http://oli.me.uk/
	 * @preserve
	 */
	
	;(function () {
	    'use strict';
	
	    /**
	     * Class for managing events.
	     * Can be extended to provide event functionality in other classes.
	     *
	     * @class EventEmitter Manages event registering and emitting.
	     */
	    function EventEmitter() {}
	
	    // Shortcuts to improve speed and size
	    var proto = EventEmitter.prototype;
	    var exports = this;
	    var originalGlobalValue = exports.EventEmitter;
	
	    /**
	     * Finds the index of the listener for the event in its storage array.
	     *
	     * @param {Function[]} listeners Array of listeners to search through.
	     * @param {Function} listener Method to look for.
	     * @return {Number} Index of the specified listener, -1 if not found
	     * @api private
	     */
	    function indexOfListener(listeners, listener) {
	        var i = listeners.length;
	        while (i--) {
	            if (listeners[i].listener === listener) {
	                return i;
	            }
	        }
	
	        return -1;
	    }
	
	    /**
	     * Alias a method while keeping the context correct, to allow for overwriting of target method.
	     *
	     * @param {String} name The name of the target method.
	     * @return {Function} The aliased method
	     * @api private
	     */
	    function alias(name) {
	        return function aliasClosure() {
	            return this[name].apply(this, arguments);
	        };
	    }
	
	    /**
	     * Returns the listener array for the specified event.
	     * Will initialise the event object and listener arrays if required.
	     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	     * Each property in the object response is an array of listener functions.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Function[]|Object} All listener functions for the event.
	     */
	    proto.getListeners = function getListeners(evt) {
	        var events = this._getEvents();
	        var response;
	        var key;
	
	        // Return a concatenated array of all matching events if
	        // the selector is a regular expression.
	        if (evt instanceof RegExp) {
	            response = {};
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    response[key] = events[key];
	                }
	            }
	        }
	        else {
	            response = events[evt] || (events[evt] = []);
	        }
	
	        return response;
	    };
	
	    /**
	     * Takes a list of listener objects and flattens it into a list of listener functions.
	     *
	     * @param {Object[]} listeners Raw listener objects.
	     * @return {Function[]} Just the listener functions.
	     */
	    proto.flattenListeners = function flattenListeners(listeners) {
	        var flatListeners = [];
	        var i;
	
	        for (i = 0; i < listeners.length; i += 1) {
	            flatListeners.push(listeners[i].listener);
	        }
	
	        return flatListeners;
	    };
	
	    /**
	     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Object} All listener functions for an event in an object.
	     */
	    proto.getListenersAsObject = function getListenersAsObject(evt) {
	        var listeners = this.getListeners(evt);
	        var response;
	
	        if (listeners instanceof Array) {
	            response = {};
	            response[evt] = listeners;
	        }
	
	        return response || listeners;
	    };
	
	    /**
	     * Adds a listener function to the specified event.
	     * The listener will not be added if it is a duplicate.
	     * If the listener returns true then it will be removed after it is called.
	     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListener = function addListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var listenerIsWrapped = typeof listener === 'object';
	        var key;
	
	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
	                listeners[key].push(listenerIsWrapped ? listener : {
	                    listener: listener,
	                    once: false
	                });
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Alias of addListener
	     */
	    proto.on = alias('addListener');
	
	    /**
	     * Semi-alias of addListener. It will add a listener that will be
	     * automatically removed after its first execution.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addOnceListener = function addOnceListener(evt, listener) {
	        return this.addListener(evt, {
	            listener: listener,
	            once: true
	        });
	    };
	
	    /**
	     * Alias of addOnceListener.
	     */
	    proto.once = alias('addOnceListener');
	
	    /**
	     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	     * You need to tell it what event names should be matched by a regex.
	     *
	     * @param {String} evt Name of the event to create.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvent = function defineEvent(evt) {
	        this.getListeners(evt);
	        return this;
	    };
	
	    /**
	     * Uses defineEvent to define multiple events.
	     *
	     * @param {String[]} evts An array of event names to define.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvents = function defineEvents(evts) {
	        for (var i = 0; i < evts.length; i += 1) {
	            this.defineEvent(evts[i]);
	        }
	        return this;
	    };
	
	    /**
	     * Removes a listener function from the specified event.
	     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to remove the listener from.
	     * @param {Function} listener Method to remove from the event.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListener = function removeListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var index;
	        var key;
	
	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key)) {
	                index = indexOfListener(listeners[key], listener);
	
	                if (index !== -1) {
	                    listeners[key].splice(index, 1);
	                }
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Alias of removeListener
	     */
	    proto.off = alias('removeListener');
	
	    /**
	     * Adds listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	     * You can also pass it a regular expression to add the array of listeners to all events that match it.
	     * Yeah, this function does quite a bit. That's probably a bad thing.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListeners = function addListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(false, evt, listeners);
	    };
	
	    /**
	     * Removes listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be removed.
	     * You can also pass it a regular expression to remove the listeners from all events that match it.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListeners = function removeListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(true, evt, listeners);
	    };
	
	    /**
	     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	     * The first argument will determine if the listeners are removed (true) or added (false).
	     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added/removed.
	     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	     *
	     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
	        var i;
	        var value;
	        var single = remove ? this.removeListener : this.addListener;
	        var multiple = remove ? this.removeListeners : this.addListeners;
	
	        // If evt is an object then pass each of its properties to this method
	        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
	            for (i in evt) {
	                if (evt.hasOwnProperty(i) && (value = evt[i])) {
	                    // Pass the single listener straight through to the singular method
	                    if (typeof value === 'function') {
	                        single.call(this, i, value);
	                    }
	                    else {
	                        // Otherwise pass back to the multiple function
	                        multiple.call(this, i, value);
	                    }
	                }
	            }
	        }
	        else {
	            // So evt must be a string
	            // And listeners must be an array of listeners
	            // Loop over it and pass each one to the multiple method
	            i = listeners.length;
	            while (i--) {
	                single.call(this, evt, listeners[i]);
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Removes all listeners from a specified event.
	     * If you do not specify an event then all listeners will be removed.
	     * That means every event will be emptied.
	     * You can also pass a regex to remove all events that match it.
	     *
	     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeEvent = function removeEvent(evt) {
	        var type = typeof evt;
	        var events = this._getEvents();
	        var key;
	
	        // Remove different things depending on the state of evt
	        if (type === 'string') {
	            // Remove all listeners for the specified event
	            delete events[evt];
	        }
	        else if (evt instanceof RegExp) {
	            // Remove all events matching the regex.
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    delete events[key];
	                }
	            }
	        }
	        else {
	            // Remove all listeners in all events
	            delete this._events;
	        }
	
	        return this;
	    };
	
	    /**
	     * Alias of removeEvent.
	     *
	     * Added to mirror the node API.
	     */
	    proto.removeAllListeners = alias('removeEvent');
	
	    /**
	     * Emits an event of your choice.
	     * When emitted, every listener attached to that event will be executed.
	     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	     * So they will not arrive within the array on the other side, they will be separate.
	     * You can also pass a regular expression to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {Array} [args] Optional array of arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emitEvent = function emitEvent(evt, args) {
	        var listenersMap = this.getListenersAsObject(evt);
	        var listeners;
	        var listener;
	        var i;
	        var key;
	        var response;
	
	        for (key in listenersMap) {
	            if (listenersMap.hasOwnProperty(key)) {
	                listeners = listenersMap[key].slice(0);
	
	                for (i = 0; i < listeners.length; i++) {
	                    // If the listener returns true then it shall be removed from the event
	                    // The function is executed either with a basic call or an apply if there is an args array
	                    listener = listeners[i];
	
	                    if (listener.once === true) {
	                        this.removeListener(evt, listener.listener);
	                    }
	
	                    response = listener.listener.apply(this, args || []);
	
	                    if (response === this._getOnceReturnValue()) {
	                        this.removeListener(evt, listener.listener);
	                    }
	                }
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Alias of emitEvent
	     */
	    proto.trigger = alias('emitEvent');
	
	    /**
	     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {...*} Optional additional arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emit = function emit(evt) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        return this.emitEvent(evt, args);
	    };
	
	    /**
	     * Sets the current value to check against when executing listeners. If a
	     * listeners return value matches the one set here then it will be removed
	     * after execution. This value defaults to true.
	     *
	     * @param {*} value The new value to check for when executing listeners.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.setOnceReturnValue = function setOnceReturnValue(value) {
	        this._onceReturnValue = value;
	        return this;
	    };
	
	    /**
	     * Fetches the current value to check against when executing listeners. If
	     * the listeners return value matches this one then it should be removed
	     * automatically. It will return true by default.
	     *
	     * @return {*|Boolean} The current value to check for or the default, true.
	     * @api private
	     */
	    proto._getOnceReturnValue = function _getOnceReturnValue() {
	        if (this.hasOwnProperty('_onceReturnValue')) {
	            return this._onceReturnValue;
	        }
	        else {
	            return true;
	        }
	    };
	
	    /**
	     * Fetches the events object and creates one if required.
	     *
	     * @return {Object} The events storage object.
	     * @api private
	     */
	    proto._getEvents = function _getEvents() {
	        return this._events || (this._events = {});
	    };
	
	    /**
	     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	     *
	     * @return {Function} Non conflicting EventEmitter class.
	     */
	    EventEmitter.noConflict = function noConflict() {
	        exports.EventEmitter = originalGlobalValue;
	        return EventEmitter;
	    };
	
	    // Expose the class either via AMD, CommonJS or the global object
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return EventEmitter;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    else if (typeof module === 'object' && module.exports){
	        module.exports = EventEmitter;
	    }
	    else {
	        exports.EventEmitter = EventEmitter;
	    }
	}.call(this));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.chatSettings = undefined;
	
	var _eventEmitter = __webpack_require__(7);
	
	var _general = __webpack_require__(2);
	
	var _settings = __webpack_require__(10);
	
	var chatSettings = exports.chatSettings = function () {
	    var settings = {
	        // Chat title or name of the consultant
	        title: 'John Doe',
	        // Position or consultant description
	        subtitle: 'consultant',
	        // Avatar image of the consultant - string or boolean
	        avatar: false,
	        // Text for "send" button in chat window
	        sendText: 'Send',
	        // Placeholder text on the input
	        inputPlaceholder: 'Enter your message',
	        // Message that operator is typing
	        isTyping: '\n            <div class="' + _general.LIB_NAME + '-dots-loading">\n                <span class="dots-loading__dot">&#8226;</span>\n                <span class="dots-loading__dot">&#8226;</span>\n                <span class="dots-loading__dot">&#8226;</span>\n            </div>\n        '
	    };
	
	    return {
	        setSettings: function setSettings(newSettings) {
	            var settingsChanged = false;
	            for (var key in newSettings) {
	                if (settings.hasOwnProperty(key)) {
	                    settings[key] = newSettings[key];
	                    settingsChanged = true;
	                }
	            }
	            if (settingsChanged) {
	                _eventEmitter.eventEmitter.emit(_settings.SETTINGS_CHANGED);
	            }
	        },
	
	        getProperty: function getProperty(property) {
	            return settings[property];
	        }
	    };
	}();

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SETTINGS_CHANGED = exports.SETTINGS_CHANGED = 'settings-changed';

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Dialog = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Component2 = __webpack_require__(4);
	
	var _general = __webpack_require__(2);
	
	var _dialog = __webpack_require__(12);
	
	var _templateEngine = __webpack_require__(6);
	
	var _componentRender = __webpack_require__(13);
	
	var _dialogList = __webpack_require__(15);
	
	var _chatSettings = __webpack_require__(9);
	
	var _eventEmitter = __webpack_require__(7);
	
	var _sanitize = __webpack_require__(16);
	
	var _DialogBubble = __webpack_require__(19);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Dialog = exports.Dialog = function (_Component) {
	    _inherits(Dialog, _Component);
	
	    function Dialog() {
	        _classCallCheck(this, Dialog);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dialog).call(this));
	
	        _this.dialogListEl = null;
	
	        /**
	         * Add phrase to the dialog
	         * @param data {Object}
	         * @param data.side {string}
	         * @param data.message {string}
	         * @param data.type {string}
	         */
	        _this.addPhrase = function (data) {
	            if (!_this.dialogListEl) {
	                var dialogEl = _this.refs.dialogEl;
	                var $$dialogListEl = dialogEl.getElementsByClassName(_general.LIB_NAME + '-dialog-list');
	                if ($$dialogListEl) {
	                    _this.dialogListEl = $$dialogListEl[0];
	                }
	            }
	            var temporaryPhrase = _dialogList.dialogList.getTemporaryPhrase();
	            var message = void 0;
	            if (temporaryPhrase && data.type === _dialog.IS_TYPING) {
	                console.warn('There is already "is-typing" phrase in the dialog. You can\'t add another one.');
	                return;
	            }
	            var side = data.side === _dialog.SIDE_USER ? _dialog.SIDE_USER : _dialog.SIDE_CHAT;
	            if (data.type === _dialog.IS_TYPING) {
	                message = _chatSettings.chatSettings.getProperty('isTyping');
	            } else {
	                message = (0, _sanitize.sanitize)(typeof data === 'string' ? data : data.message);
	            }
	            var bubbleComponent = (0, _componentRender.componentRender)(_DialogBubble.DialogBubble, {
	                side: side,
	                message: message,
	                type: data.type
	            });
	            if (temporaryPhrase && side !== temporaryPhrase.side) {
	                _this.dialogListEl.insertBefore(bubbleComponent, temporaryPhrase.ref);
	            } else {
	                if (temporaryPhrase) {
	                    temporaryPhrase.ref.parentNode.removeChild(temporaryPhrase.ref);
	                }
	                _this.dialogListEl.appendChild(bubbleComponent);
	            }
	            if (side === _dialog.SIDE_USER) {
	                _eventEmitter.eventEmitter.emit(_dialog.USER_SEND_MESSAGE, data.message);
	            }
	            _this.scrollDialogDown();
	        };
	        return _this;
	    }
	
	    _createClass(Dialog, [{
	        key: 'scrollDialogDown',
	        value: function scrollDialogDown() {
	            this.refs.dialogEl.scrollTop = this.refs.dialogEl.scrollHeight;
	        }
	    }, {
	        key: 'addEvents',
	        value: function addEvents() {
	            var _this2 = this;
	
	            _eventEmitter.eventEmitter.addListener(_dialog.ADD_PHRASE, this.addPhrase);
	            _eventEmitter.eventEmitter.addListener(_dialog.IS_TYPING, function () {
	                _this2.addPhrase({
	                    type: _dialog.IS_TYPING
	                });
	            });
	            _eventEmitter.eventEmitter.on(_dialog.CLEAR_DIALOG, function () {
	                _this2.dialogListEl.innerHTML = '';
	                _dialogList.dialogList.clearDialog();
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var id = _general.LIB_NAME + '-dialog';
	            var innerTemplate = '\n            <div class="' + _general.LIB_NAME + '-dialog-list">\n            </div>\n        ';
	
	            this.addEvents();
	            return {
	                div: {
	                    id: id,
	                    innerHTML: (0, _templateEngine.templateEngine)(innerTemplate, {}),
	                    ref: 'dialogEl'
	                }
	            };
	        }
	    }]);

	    return Dialog;
	}(_Component2.Component);

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ADD_PHRASE = exports.ADD_PHRASE = 'add-phrase';
	var USER_SEND_MESSAGE = exports.USER_SEND_MESSAGE = 'user-send-message';
	var CLEAR_DIALOG = exports.CLEAR_DIALOG = 'clear-dialog';
	var IS_TYPING = exports.IS_TYPING = 'is-typing';
	var SIDE_USER = exports.SIDE_USER = 'user';
	var SIDE_CHAT = exports.SIDE_CHAT = 'chat';

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.componentRender = undefined;
	
	var _templateTreeRender = __webpack_require__(14);
	
	var componentRender = exports.componentRender = function componentRender(ComponentClass) {
	    var componentData = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	    var component = new ComponentClass();
	    var renderedComponent = (0, _templateTreeRender.templateTreeRender)(component.render(componentData));
	
	    component.$$updateRefs(renderedComponent.refs);
	
	    component.componentWillMount();
	
	    return renderedComponent.fragment;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.templateTreeRender = undefined;
	
	var _componentRender = __webpack_require__(13);
	
	/**
	 * Template Tree Render
	 * {
	 *     div: {
	 *         children: [
	 *              {
	 *                  span: {
	 *                      // ...
	 *                  }
	 *              }
	 *         ],
	 *         className: "header__title header__title_important"
	 *         ref: 'reference-name'    // reference object to the node
	 *         text: '',                // text node
	 *         innerHtml: '',           // inner html, can't be with "text" in the same element
	 *         click: function() {}     // event handler
	 *     }
	 * }
	 * @param tree {Object}
	 * @returns {Object}
	 */
	
	var templateTreeRender = exports.templateTreeRender = function templateTreeRender(tree) {
	    var fragment = document.createDocumentFragment();
	    var refs = {};
	
	    var createElement = function createElement(tagName, elementData) {
	        var element = document.createElement(tagName);
	        var events = ['click', 'submit'];
	        if (elementData.hasOwnProperty('text') && elementData.hasOwnProperty('innerHtml')) {
	            throw new Error('Element "' + tagName + '" has both "text" and "innerHtml" in object. Should be one');
	        }
	        for (var key in elementData) {
	            switch (true) {
	                case key === 'text':
	                    element.createTextNode(elementData[key]);
	                    break;
	                case key === 'innerHTML':
	                    element.innerHTML = elementData[key];
	                    break;
	                case key === 'children':
	                    for (var i = 0, len = elementData[key].length; i < len; i++) {
	                        for (var subKey in elementData[key][i]) {
	                            element.appendChild(createElement(subKey, elementData[key][i][subKey]));
	                        }
	                    }
	                    break;
	                case key === 'className':
	                    element.setAttribute('class', elementData[key]);
	                    break;
	                case key === 'ref':
	                    refs[elementData[key]] = element;
	                    break;
	                case key === 'component':
	                    element.appendChild((0, _componentRender.componentRender)(elementData[key]));
	                    break;
	                case events.indexOf(key) > -1:
	                    element.addEventListener(key, elementData[key]);
	                    break;
	                default:
	                    element.setAttribute(key, elementData[key]);
	            }
	        }
	        return element;
	    };
	
	    for (var key in tree) {
	        var el = createElement(key, tree[key]);
	        fragment.appendChild(el);
	    }
	
	    return {
	        fragment: fragment,
	        refs: refs
	    };
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.dialogList = undefined;
	
	var _dialog = __webpack_require__(12);
	
	var dialogList = exports.dialogList = function () {
	    var dialog = [];
	
	    return {
	        addPhrase: function addPhrase(newPhrase) {
	            var temporaryPhrase = void 0;
	            var temporaryPhraseIndex = void 0;
	            for (var i = 0, len = dialog.length; i < len; i++) {
	                if (dialog[i].type === _dialog.IS_TYPING) {
	                    temporaryPhrase = dialog[i];
	                    temporaryPhraseIndex = i;
	                }
	            }
	            if (temporaryPhrase && newPhrase.side !== temporaryPhrase.side) {
	                // insert before
	                dialog.splice(temporaryPhraseIndex, 0, newPhrase);
	            } else {
	                if (temporaryPhrase) {
	                    dialog.splice(temporaryPhraseIndex, 1);
	                }
	                dialog.push({
	                    side: newPhrase.side, // 'chat', 'user'
	                    message: newPhrase.message, // text of the message
	                    ref: newPhrase.ref || null, // bubble element reference
	                    type: newPhrase.type // 'is-typing'
	                });
	            }
	        },
	
	        getTemporaryPhrase: function getTemporaryPhrase() {
	            for (var i = 0, len = dialog.length; i < len; i++) {
	                if (dialog[i].type === _dialog.IS_TYPING) {
	                    return dialog[i];
	                }
	            }
	            return null;
	        },
	
	        clearDialog: function clearDialog() {
	            dialog = [];
	        }
	    };
	}();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.sanitize = undefined;
	
	var _htmlSanitizer = __webpack_require__(17);
	
	var sanitize = exports.sanitize = function sanitize(userInput) {
	    return (0, _htmlSanitizer.htmlSanitize)(userInput);
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.htmlSanitize = exports.html = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* eslint-disable */
	
	var _html4Defs = __webpack_require__(18);
	
	// Copyright (C) 2006 Google Inc.
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//      http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.
	
	/**
	 * @fileoverview
	 * An HTML sanitizer that can satisfy a variety of security policies.
	 *
	 * <p>
	 * The HTML sanitizer is built around a SAX parser and HTML element and
	 * attributes schemas.
	 *
	 * If the cssparser is loaded, inline styles are sanitized using the
	 * css property and value schemas.  Else they are remove during
	 * sanitization.
	 *
	 * If it exists, uses parseCssDeclarations, sanitizeCssProperty,  cssSchema
	 *
	 * @author mikesamuel@gmail.com
	 * @author jasvir@gmail.com
	 * \@requires html4, URI
	 * \@overrides window
	 * \@provides html, html_sanitize, defs
	 */
	
	// The Turkish i seems to be a non-issue, but abort in case it is.
	if ('I'.toLowerCase() !== 'i') {
	    throw 'I/i problem';
	}
	
	// TODO(kpreid): Refactor so there is no global introduced by these type
	// definitions.
	
	/**
	 * Contains types related to sanitizer policies.
	 * \@namespace
	 */
	var defs = {};
	
	/**
	 * A decision about what to do with a tag.
	 * @typedef {{ 'attribs': ?Array.<string>, 'tagName': ?string }}
	 */
	defs.TagPolicyDecision;
	
	/**
	 * A function that takes a tag name (canonical) and an array of attributes
	 * and decides what to do, returning null to indicate the tag should be dropped
	 * entirely from the output.
	 *
	 * @typedef {function(string, Array.<string>): ?defs.TagPolicyDecision}
	 */
	defs.TagPolicy;
	
	/**
	 * \@namespace
	 */
	var html = exports.html = function (html4) {
	
	    // For closure compiler
	    var parseCssDeclarations, sanitizeCssProperty, cssSchema;
	    if ('undefined' !== typeof window) {
	        parseCssDeclarations = window['parseCssDeclarations'];
	        sanitizeCssProperty = window['sanitizeCssProperty'];
	        cssSchema = window['cssSchema'];
	    }
	
	    // The keys of this object must be 'quoted' or JSCompiler will mangle them!
	    // This is a partial list -- lookupEntity() uses the host browser's parser
	    // (when available) to implement full entity lookup.
	    // Note that entities are in general case-sensitive; the uppercase ones are
	    // explicitly defined by HTML5 (presumably as compatibility).
	    var ENTITIES = {
	        'lt': '<',
	        'LT': '<',
	        'gt': '>',
	        'GT': '>',
	        'amp': '&',
	        'AMP': '&',
	        'quot': '"',
	        'apos': '\'',
	        'nbsp': ' '
	    };
	
	    // Patterns for types of entity/character reference names.
	    var decimalEscapeRe = /^#(\d+)$/;
	    var hexEscapeRe = /^#x([0-9A-Fa-f]+)$/;
	    // contains every entity per http://www.w3.org/TR/2011/WD-html5-20110113/named-character-references.html
	    var safeEntityNameRe = /^[A-Za-z][A-za-z0-9]+$/;
	    // Used as a hook to invoke the browser's entity parsing. <textarea> is used
	    // because its content is parsed for entities but not tags.
	    // TODO(kpreid): This retrieval is a kludge and leads to silent loss of
	    // functionality if the document isn't available.
	    var entityLookupElement = 'undefined' !== typeof window && window['document'] ? window['document'].createElement('textarea') : null;
	    /**
	     * Decodes an HTML entity.
	     *
	     * {\@updoc
	     * $ lookupEntity('lt')
	     * # '<'
	     * $ lookupEntity('GT')
	     * # '>'
	     * $ lookupEntity('amp')
	     * # '&'
	     * $ lookupEntity('nbsp')
	     * # '\xA0'
	     * $ lookupEntity('apos')
	     * # "'"
	     * $ lookupEntity('quot')
	     * # '"'
	     * $ lookupEntity('#xa')
	     * # '\n'
	     * $ lookupEntity('#10')
	     * # '\n'
	     * $ lookupEntity('#x0a')
	     * # '\n'
	     * $ lookupEntity('#010')
	     * # '\n'
	     * $ lookupEntity('#x00A')
	     * # '\n'
	     * $ lookupEntity('Pi')      // Known failure
	     * # '\u03A0'
	     * $ lookupEntity('pi')      // Known failure
	     * # '\u03C0'
	     * }
	     *
	     * @param {string} name the content between the '&' and the ';'.
	     * @return {string} a single unicode code-point as a string.
	     */
	    function lookupEntity(name) {
	        // TODO: entity lookup as specified by HTML5 actually depends on the
	        // presence of the ";".
	        if (ENTITIES.hasOwnProperty(name)) {
	            return ENTITIES[name];
	        }
	        var m = name.match(decimalEscapeRe);
	        if (m) {
	            return String.fromCharCode(parseInt(m[1], 10));
	        } else if (!!(m = name.match(hexEscapeRe))) {
	            return String.fromCharCode(parseInt(m[1], 16));
	        } else if (entityLookupElement && safeEntityNameRe.test(name)) {
	            entityLookupElement.innerHTML = '&' + name + ';';
	            var text = entityLookupElement.textContent;
	            ENTITIES[name] = text;
	            return text;
	        } else {
	            return '&' + name + ';';
	        }
	    }
	
	    function decodeOneEntity(_, name) {
	        return lookupEntity(name);
	    }
	
	    var nulRe = /\0/g;
	    function stripNULs(s) {
	        return s.replace(nulRe, '');
	    }
	
	    var ENTITY_RE_1 = /&(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/g;
	    var ENTITY_RE_2 = /^(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/;
	    /**
	     * The plain text of a chunk of HTML CDATA which possibly containing.
	     *
	     * {\@updoc
	     * $ unescapeEntities('')
	     * # ''
	     * $ unescapeEntities('hello World!')
	     * # 'hello World!'
	     * $ unescapeEntities('1 &lt; 2 &amp;&AMP; 4 &gt; 3&#10;')
	     * # '1 < 2 && 4 > 3\n'
	     * $ unescapeEntities('&lt;&lt <- unfinished entity&gt;')
	     * # '<&lt <- unfinished entity>'
	     * $ unescapeEntities('/foo?bar=baz&copy=true')  // & often unescaped in URLS
	     * # '/foo?bar=baz&copy=true'
	     * $ unescapeEntities('pi=&pi;&#x3c0;, Pi=&Pi;\u03A0') // FIXME: known failure
	     * # 'pi=\u03C0\u03c0, Pi=\u03A0\u03A0'
	     * }
	     *
	     * @param {string} s a chunk of HTML CDATA.  It must not start or end inside
	     *     an HTML entity.
	     */
	    function unescapeEntities(s) {
	        return s.replace(ENTITY_RE_1, decodeOneEntity);
	    }
	
	    var ampRe = /&/g;
	    var looseAmpRe = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi;
	    var ltRe = /[<]/g;
	    var gtRe = />/g;
	    var quotRe = /\"/g;
	
	    /**
	     * Escapes HTML special characters in attribute values.
	     *
	     * {\@updoc
	     * $ escapeAttrib('')
	     * # ''
	     * $ escapeAttrib('"<<&==&>>"')  // Do not just escape the first occurrence.
	     * # '&#34;&lt;&lt;&amp;&#61;&#61;&amp;&gt;&gt;&#34;'
	     * $ escapeAttrib('Hello <World>!')
	     * # 'Hello &lt;World&gt;!'
	     * }
	     */
	    function escapeAttrib(s) {
	        return ('' + s).replace(ampRe, '&amp;').replace(ltRe, '&lt;').replace(gtRe, '&gt;').replace(quotRe, '&#34;');
	    }
	
	    /**
	     * Escape entities in RCDATA that can be escaped without changing the meaning.
	     * {\@updoc
	     * $ normalizeRCData('1 < 2 &&amp; 3 > 4 &amp;& 5 &lt; 7&8')
	     * # '1 &lt; 2 &amp;&amp; 3 &gt; 4 &amp;&amp; 5 &lt; 7&amp;8'
	     * }
	     */
	    function normalizeRCData(rcdata) {
	        return rcdata.replace(looseAmpRe, '&amp;$1').replace(ltRe, '&lt;').replace(gtRe, '&gt;');
	    }
	
	    // TODO(felix8a): validate sanitizer regexs against the HTML5 grammar at
	    // http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html
	    // http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html
	    // http://www.whatwg.org/specs/web-apps/current-work/multipage/tokenization.html
	    // http://www.whatwg.org/specs/web-apps/current-work/multipage/tree-construction.html
	
	    // We initially split input so that potentially meaningful characters
	    // like '<' and '>' are separate tokens, using a fast dumb process that
	    // ignores quoting.  Then we walk that token stream, and when we see a
	    // '<' that's the start of a tag, we use ATTR_RE to extract tag
	    // attributes from the next token.  That token will never have a '>'
	    // character.  However, it might have an unbalanced quote character, and
	    // when we see that, we combine additional tokens to balance the quote.
	
	    var ATTR_RE = new RegExp('^\\s*' + '([-.:\\w]+)' + // 1 = Attribute name
	    '(?:' + ('\\s*(=)\\s*' + // 2 = Is there a value?
	    '(' + ( // 3 = Attribute value
	    // TODO(felix8a): maybe use backref to match quotes
	    '(\")[^\"]*(\"|$)' + // 4, 5 = Double-quoted string
	    '|' + '(\')[^\']*(\'|$)' + // 6, 7 = Single-quoted string
	    '|' +
	    // Positive lookahead to prevent interpretation of
	    // <foo a= b=c> as <foo a='b=c'>
	    // TODO(felix8a): might be able to drop this case
	    '(?=[a-z][-\\w]*\\s*=)' + '|' +
	    // Unquoted value that isn't an attribute name
	    // (since we didn't match the positive lookahead above)
	    '[^\"\'\\s]*') + ')') + ')?', 'i');
	
	    // false on IE<=8, true on most other browsers
	    var splitWillCapture = 'a,b'.split(/(,)/).length === 3;
	
	    // bitmask for tags with special parsing, like <script> and <textarea>
	    var EFLAGS_TEXT = html4.eflags['CDATA'] | html4.eflags['RCDATA'];
	
	    /**
	     * Given a SAX-like event handler, produce a function that feeds those
	     * events and a parameter to the event handler.
	     *
	     * The event handler has the form:{@code
	     * {
	     *   // Name is an upper-case HTML tag name.  Attribs is an array of
	     *   // alternating upper-case attribute names, and attribute values.  The
	     *   // attribs array is reused by the parser.  Param is the value passed to
	     *   // the saxParser.
	     *   startTag: function (name, attribs, param) { ... },
	     *   endTag:   function (name, param) { ... },
	     *   pcdata:   function (text, param) { ... },
	     *   rcdata:   function (text, param) { ... },
	     *   cdata:    function (text, param) { ... },
	     *   startDoc: function (param) { ... },
	     *   endDoc:   function (param) { ... }
	     * }}
	     *
	     * @param {Object} handler a record containing event handlers.
	     * @return {function(string, Object)} A function that takes a chunk of HTML
	     *     and a parameter.  The parameter is passed on to the handler methods.
	     */
	    function makeSaxParser(handler) {
	        // Accept quoted or unquoted keys (Closure compat)
	        var hcopy = {
	            cdata: handler.cdata || handler['cdata'],
	            comment: handler.comment || handler['comment'],
	            endDoc: handler.endDoc || handler['endDoc'],
	            endTag: handler.endTag || handler['endTag'],
	            pcdata: handler.pcdata || handler['pcdata'],
	            rcdata: handler.rcdata || handler['rcdata'],
	            startDoc: handler.startDoc || handler['startDoc'],
	            startTag: handler.startTag || handler['startTag']
	        };
	        return function (htmlText, param) {
	            return parse(htmlText, hcopy, param);
	        };
	    }
	
	    // Parsing strategy is to split input into parts that might be lexically
	    // meaningful (every ">" becomes a separate part), and then recombine
	    // parts if we discover they're in a different context.
	
	    // TODO(felix8a): Significant performance regressions from -legacy,
	    // tested on
	    //    Chrome 18.0
	    //    Firefox 11.0
	    //    IE 6, 7, 8, 9
	    //    Opera 11.61
	    //    Safari 5.1.3
	    // Many of these are unusual patterns that are linearly slower and still
	    // pretty fast (eg 1ms to 5ms), so not necessarily worth fixing.
	
	    // TODO(felix8a): "<script> && && && ... <\/script>" is slower on all
	    // browsers.  The hotspot is htmlSplit.
	
	    // TODO(felix8a): "<p title='>>>>...'><\/p>" is slower on all browsers.
	    // This is partly htmlSplit, but the hotspot is parseTagAndAttrs.
	
	    // TODO(felix8a): "<a><\/a><a><\/a>..." is slower on IE9.
	    // "<a>1<\/a><a>1<\/a>..." is faster, "<a><\/a>2<a><\/a>2..." is faster.
	
	    // TODO(felix8a): "<p<p<p..." is slower on IE[6-8]
	
	    var continuationMarker = {};
	    function parse(htmlText, handler, param) {
	        var m, p, tagName;
	        var parts = htmlSplit(htmlText);
	        var state = {
	            noMoreGT: false,
	            noMoreEndComments: false
	        };
	        parseCPS(handler, parts, 0, state, param);
	    }
	
	    function continuationMaker(h, parts, initial, state, param) {
	        return function () {
	            parseCPS(h, parts, initial, state, param);
	        };
	    }
	
	    function parseCPS(h, parts, initial, state, param) {
	        try {
	            if (h.startDoc && initial == 0) {
	                h.startDoc(param);
	            }
	            var m, p, tagName;
	            for (var pos = initial, end = parts.length; pos < end;) {
	                var current = parts[pos++];
	                var next = parts[pos];
	                switch (current) {
	                    case '&':
	                        if (ENTITY_RE_2.test(next)) {
	                            if (h.pcdata) {
	                                h.pcdata('&' + next, param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                            }
	                            pos++;
	                        } else {
	                            if (h.pcdata) {
	                                h.pcdata("&amp;", param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                            }
	                        }
	                        break;
	                    case '<\/':
	                        if (m = /^([-\w:]+)[^\'\"]*/.exec(next)) {
	                            if (m[0].length === next.length && parts[pos + 1] === '>') {
	                                // fast case, no attribute parsing needed
	                                pos += 2;
	                                tagName = m[1].toLowerCase();
	                                if (h.endTag) {
	                                    h.endTag(tagName, param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                                }
	                            } else {
	                                // slow case, need to parse attributes
	                                // TODO(felix8a): do we really care about misparsing this?
	                                pos = parseEndTag(parts, pos, h, param, continuationMarker, state);
	                            }
	                        } else {
	                            if (h.pcdata) {
	                                h.pcdata('&lt;/', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                            }
	                        }
	                        break;
	                    case '<':
	                        if (m = /^([-\w:]+)\s*\/?/.exec(next)) {
	                            if (m[0].length === next.length && parts[pos + 1] === '>') {
	                                // fast case, no attribute parsing needed
	                                pos += 2;
	                                tagName = m[1].toLowerCase();
	                                if (h.startTag) {
	                                    h.startTag(tagName, [], param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                                }
	                                // tags like <script> and <textarea> have special parsing
	                                var eflags = html4.ELEMENTS[tagName];
	                                if (eflags & EFLAGS_TEXT) {
	                                    var tag = { name: tagName, next: pos, eflags: eflags };
	                                    pos = parseText(parts, tag, h, param, continuationMarker, state);
	                                }
	                            } else {
	                                // slow case, need to parse attributes
	                                pos = parseStartTag(parts, pos, h, param, continuationMarker, state);
	                            }
	                        } else {
	                            if (h.pcdata) {
	                                h.pcdata('&lt;', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                            }
	                        }
	                        break;
	                    case '<\!--':
	                        // The pathological case is n copies of '<\!--' without '-->', and
	                        // repeated failure to find '-->' is quadratic.  We avoid that by
	                        // remembering when search for '-->' fails.
	                        if (!state.noMoreEndComments) {
	                            // A comment <\!--x--> is split into three tokens:
	                            //   '<\!--', 'x--', '>'
	                            // We want to find the next '>' token that has a preceding '--'.
	                            // pos is at the 'x--'.
	                            for (p = pos + 1; p < end; p++) {
	                                if (parts[p] === '>' && /--$/.test(parts[p - 1])) {
	                                    break;
	                                }
	                            }
	                            if (p < end) {
	                                if (h.comment) {
	                                    var comment = parts.slice(pos, p).join('');
	                                    h.comment(comment.substr(0, comment.length - 2), param, continuationMarker, continuationMaker(h, parts, p + 1, state, param));
	                                }
	                                pos = p + 1;
	                            } else {
	                                state.noMoreEndComments = true;
	                            }
	                        }
	                        if (state.noMoreEndComments) {
	                            if (h.pcdata) {
	                                h.pcdata('&lt;!--', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                            }
	                        }
	                        break;
	                    case '<\!':
	                        if (!/^\w/.test(next)) {
	                            if (h.pcdata) {
	                                h.pcdata('&lt;!', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                            }
	                        } else {
	                            // similar to noMoreEndComment logic
	                            if (!state.noMoreGT) {
	                                for (p = pos + 1; p < end; p++) {
	                                    if (parts[p] === '>') {
	                                        break;
	                                    }
	                                }
	                                if (p < end) {
	                                    pos = p + 1;
	                                } else {
	                                    state.noMoreGT = true;
	                                }
	                            }
	                            if (state.noMoreGT) {
	                                if (h.pcdata) {
	                                    h.pcdata('&lt;!', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                                }
	                            }
	                        }
	                        break;
	                    case '<?':
	                        // similar to noMoreEndComment logic
	                        if (!state.noMoreGT) {
	                            for (p = pos + 1; p < end; p++) {
	                                if (parts[p] === '>') {
	                                    break;
	                                }
	                            }
	                            if (p < end) {
	                                pos = p + 1;
	                            } else {
	                                state.noMoreGT = true;
	                            }
	                        }
	                        if (state.noMoreGT) {
	                            if (h.pcdata) {
	                                h.pcdata('&lt;?', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                            }
	                        }
	                        break;
	                    case '>':
	                        if (h.pcdata) {
	                            h.pcdata("&gt;", param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                        }
	                        break;
	                    case '':
	                        break;
	                    default:
	                        if (h.pcdata) {
	                            h.pcdata(current, param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	                        }
	                        break;
	                }
	            }
	            if (h.endDoc) {
	                h.endDoc(param);
	            }
	        } catch (e) {
	            if (e !== continuationMarker) {
	                throw e;
	            }
	        }
	    }
	
	    // Split str into parts for the html parser.
	    function htmlSplit(str) {
	        // can't hoist this out of the function because of the re.exec loop.
	        var re = /(<\/|<\!--|<[!?]|[&<>])/g;
	        str += '';
	        if (splitWillCapture) {
	            return str.split(re);
	        } else {
	            var parts = [];
	            var lastPos = 0;
	            var m;
	            while ((m = re.exec(str)) !== null) {
	                parts.push(str.substring(lastPos, m.index));
	                parts.push(m[0]);
	                lastPos = m.index + m[0].length;
	            }
	            parts.push(str.substring(lastPos));
	            return parts;
	        }
	    }
	
	    function parseEndTag(parts, pos, h, param, continuationMarker, state) {
	        var tag = parseTagAndAttrs(parts, pos);
	        // drop unclosed tags
	        if (!tag) {
	            return parts.length;
	        }
	        if (h.endTag) {
	            h.endTag(tag.name, param, continuationMarker, continuationMaker(h, parts, pos, state, param));
	        }
	        return tag.next;
	    }
	
	    function parseStartTag(parts, pos, h, param, continuationMarker, state) {
	        var tag = parseTagAndAttrs(parts, pos);
	        // drop unclosed tags
	        if (!tag) {
	            return parts.length;
	        }
	        if (h.startTag) {
	            h.startTag(tag.name, tag.attrs, param, continuationMarker, continuationMaker(h, parts, tag.next, state, param));
	        }
	        // tags like <script> and <textarea> have special parsing
	        if (tag.eflags & EFLAGS_TEXT) {
	            return parseText(parts, tag, h, param, continuationMarker, state);
	        } else {
	            return tag.next;
	        }
	    }
	
	    var endTagRe = {};
	
	    // Tags like <script> and <textarea> are flagged as CDATA or RCDATA,
	    // which means everything is text until we see the correct closing tag.
	    function parseText(parts, tag, h, param, continuationMarker, state) {
	        var end = parts.length;
	        if (!endTagRe.hasOwnProperty(tag.name)) {
	            endTagRe[tag.name] = new RegExp('^' + tag.name + '(?:[\\s\\/]|$)', 'i');
	        }
	        var re = endTagRe[tag.name];
	        var first = tag.next;
	        var p = tag.next + 1;
	        for (; p < end; p++) {
	            if (parts[p - 1] === '<\/' && re.test(parts[p])) {
	                break;
	            }
	        }
	        if (p < end) {
	            p -= 1;
	        }
	        var buf = parts.slice(first, p).join('');
	        if (tag.eflags & html4.eflags['CDATA']) {
	            if (h.cdata) {
	                h.cdata(buf, param, continuationMarker, continuationMaker(h, parts, p, state, param));
	            }
	        } else if (tag.eflags & html4.eflags['RCDATA']) {
	            if (h.rcdata) {
	                h.rcdata(normalizeRCData(buf), param, continuationMarker, continuationMaker(h, parts, p, state, param));
	            }
	        } else {
	            throw new Error('bug');
	        }
	        return p;
	    }
	
	    // at this point, parts[pos-1] is either "<" or "<\/".
	    function parseTagAndAttrs(parts, pos) {
	        var m = /^([-\w:]+)/.exec(parts[pos]);
	        var tag = {};
	        tag.name = m[1].toLowerCase();
	        tag.eflags = html4.ELEMENTS[tag.name];
	        var buf = parts[pos].substr(m[0].length);
	        // Find the next '>'.  We optimistically assume this '>' is not in a
	        // quoted context, and further down we fix things up if it turns out to
	        // be quoted.
	        var p = pos + 1;
	        var end = parts.length;
	        for (; p < end; p++) {
	            if (parts[p] === '>') {
	                break;
	            }
	            buf += parts[p];
	        }
	        if (end <= p) {
	            return void 0;
	        }
	        var attrs = [];
	        while (buf !== '') {
	            m = ATTR_RE.exec(buf);
	            if (!m) {
	                // No attribute found: skip garbage
	                buf = buf.replace(/^[\s\S][^a-z\s]*/, '');
	            } else if (m[4] && !m[5] || m[6] && !m[7]) {
	                // Unterminated quote: slurp to the next unquoted '>'
	                var quote = m[4] || m[6];
	                var sawQuote = false;
	                var abuf = [buf, parts[p++]];
	                for (; p < end; p++) {
	                    if (sawQuote) {
	                        if (parts[p] === '>') {
	                            break;
	                        }
	                    } else if (0 <= parts[p].indexOf(quote)) {
	                        sawQuote = true;
	                    }
	                    abuf.push(parts[p]);
	                }
	                // Slurp failed: lose the garbage
	                if (end <= p) {
	                    break;
	                }
	                // Otherwise retry attribute parsing
	                buf = abuf.join('');
	                continue;
	            } else {
	                // We have an attribute
	                var aName = m[1].toLowerCase();
	                var aValue = m[2] ? decodeValue(m[3]) : '';
	                attrs.push(aName, aValue);
	                buf = buf.substr(m[0].length);
	            }
	        }
	        tag.attrs = attrs;
	        tag.next = p + 1;
	        return tag;
	    }
	
	    function decodeValue(v) {
	        var q = v.charCodeAt(0);
	        if (q === 0x22 || q === 0x27) {
	            // " or '
	            v = v.substr(1, v.length - 2);
	        }
	        return unescapeEntities(stripNULs(v));
	    }
	
	    /**
	     * Returns a function that strips unsafe tags and attributes from html.
	     * @param {defs.TagPolicy} tagPolicy
	     *     A function that takes (tagName, attribs[]), where tagName is a key in
	     *     html4.ELEMENTS and attribs is an array of alternating attribute names
	     *     and values.  It should return a record (as follows), or null to delete
	     *     the element.  It's okay for tagPolicy to modify the attribs array,
	     *     but the same array is reused, so it should not be held between calls.
	     *     Record keys:
	     *        attribs: (required) Sanitized attributes array.
	     *        tagName: Replacement tag name.
	     * @return {function(string, Array)} A function that sanitizes a string of
	     *     HTML and appends result strings to the second argument, an array.
	     */
	    function makeHtmlSanitizer(tagPolicy) {
	        var stack;
	        var ignoring;
	        var emit = function emit(text, out) {
	            if (!ignoring) {
	                out.push(text);
	            }
	        };
	        return makeSaxParser({
	            'startDoc': function startDoc(_) {
	                stack = [];
	                ignoring = false;
	            },
	            'startTag': function startTag(tagNameOrig, attribs, out) {
	                if (ignoring) {
	                    return;
	                }
	                if (!html4.ELEMENTS.hasOwnProperty(tagNameOrig)) {
	                    return;
	                }
	                var eflagsOrig = html4.ELEMENTS[tagNameOrig];
	                if (eflagsOrig & html4.eflags['FOLDABLE']) {
	                    return;
	                }
	
	                var decision = tagPolicy(tagNameOrig, attribs);
	                if (!decision) {
	                    ignoring = !(eflagsOrig & html4.eflags['EMPTY']);
	                    return;
	                } else if ((typeof decision === 'undefined' ? 'undefined' : _typeof(decision)) !== 'object') {
	                    throw new Error('tagPolicy did not return object (old API?)');
	                }
	                if ('attribs' in decision) {
	                    attribs = decision['attribs'];
	                } else {
	                    throw new Error('tagPolicy gave no attribs');
	                }
	                var eflagsRep;
	                var tagNameRep;
	                if ('tagName' in decision) {
	                    tagNameRep = decision['tagName'];
	                    eflagsRep = html4.ELEMENTS[tagNameRep];
	                } else {
	                    tagNameRep = tagNameOrig;
	                    eflagsRep = eflagsOrig;
	                }
	                // TODO(mikesamuel): relying on tagPolicy not to insert unsafe
	                // attribute names.
	
	                // If this is an optional-end-tag element and either this element or its
	                // previous like sibling was rewritten, then insert a close tag to
	                // preserve structure.
	                if (eflagsOrig & html4.eflags['OPTIONAL_ENDTAG']) {
	                    var onStack = stack[stack.length - 1];
	                    if (onStack && onStack.orig === tagNameOrig && (onStack.rep !== tagNameRep || tagNameOrig !== tagNameRep)) {
	                        out.push('<\/', onStack.rep, '>');
	                    }
	                }
	
	                if (!(eflagsOrig & html4.eflags['EMPTY'])) {
	                    stack.push({ orig: tagNameOrig, rep: tagNameRep });
	                }
	
	                out.push('<', tagNameRep);
	                for (var i = 0, n = attribs.length; i < n; i += 2) {
	                    var attribName = attribs[i],
	                        value = attribs[i + 1];
	                    if (value !== null && value !== void 0) {
	                        out.push(' ', attribName, '="', escapeAttrib(value), '"');
	                    }
	                }
	                out.push('>');
	
	                if (eflagsOrig & html4.eflags['EMPTY'] && !(eflagsRep & html4.eflags['EMPTY'])) {
	                    // replacement is non-empty, synthesize end tag
	                    out.push('<\/', tagNameRep, '>');
	                }
	            },
	            'endTag': function endTag(tagName, out) {
	                if (ignoring) {
	                    ignoring = false;
	                    return;
	                }
	                if (!html4.ELEMENTS.hasOwnProperty(tagName)) {
	                    return;
	                }
	                var eflags = html4.ELEMENTS[tagName];
	                if (!(eflags & (html4.eflags['EMPTY'] | html4.eflags['FOLDABLE']))) {
	                    var index;
	                    if (eflags & html4.eflags['OPTIONAL_ENDTAG']) {
	                        for (index = stack.length; --index >= 0;) {
	                            var stackElOrigTag = stack[index].orig;
	                            if (stackElOrigTag === tagName) {
	                                break;
	                            }
	                            if (!(html4.ELEMENTS[stackElOrigTag] & html4.eflags['OPTIONAL_ENDTAG'])) {
	                                // Don't pop non optional end tags looking for a match.
	                                return;
	                            }
	                        }
	                    } else {
	                        for (index = stack.length; --index >= 0;) {
	                            if (stack[index].orig === tagName) {
	                                break;
	                            }
	                        }
	                    }
	                    if (index < 0) {
	                        return;
	                    } // Not opened.
	                    for (var i = stack.length; --i > index;) {
	                        var stackElRepTag = stack[i].rep;
	                        if (!(html4.ELEMENTS[stackElRepTag] & html4.eflags['OPTIONAL_ENDTAG'])) {
	                            out.push('<\/', stackElRepTag, '>');
	                        }
	                    }
	                    if (index < stack.length) {
	                        tagName = stack[index].rep;
	                    }
	                    stack.length = index;
	                    out.push('<\/', tagName, '>');
	                }
	            },
	            'pcdata': emit,
	            'rcdata': emit,
	            'cdata': emit,
	            'endDoc': function endDoc(out) {
	                for (; stack.length; stack.length--) {
	                    out.push('<\/', stack[stack.length - 1].rep, '>');
	                }
	            }
	        });
	    }
	
	    var ALLOWED_URI_SCHEMES = /^(?:https?|mailto)$/i;
	
	    function safeUri(uri, effect, ltype, hints, naiveUriRewriter) {
	        if (!naiveUriRewriter) {
	            return null;
	        }
	        try {
	            var parsed = URI.parse('' + uri);
	            if (parsed) {
	                if (!parsed.hasScheme() || ALLOWED_URI_SCHEMES.test(parsed.getScheme())) {
	                    var safe = naiveUriRewriter(parsed, effect, ltype, hints);
	                    return safe ? safe.toString() : null;
	                }
	            }
	        } catch (e) {
	            return null;
	        }
	        return null;
	    }
	
	    function log(logger, tagName, attribName, oldValue, newValue) {
	        if (!attribName) {
	            logger(tagName + " removed", {
	                change: "removed",
	                tagName: tagName
	            });
	        }
	        if (oldValue !== newValue) {
	            var changed = "changed";
	            if (oldValue && !newValue) {
	                changed = "removed";
	            } else if (!oldValue && newValue) {
	                changed = "added";
	            }
	            logger(tagName + "." + attribName + " " + changed, {
	                change: changed,
	                tagName: tagName,
	                attribName: attribName,
	                oldValue: oldValue,
	                newValue: newValue
	            });
	        }
	    }
	
	    function lookupAttribute(map, tagName, attribName) {
	        var attribKey;
	        attribKey = tagName + '::' + attribName;
	        if (map.hasOwnProperty(attribKey)) {
	            return map[attribKey];
	        }
	        attribKey = '*::' + attribName;
	        if (map.hasOwnProperty(attribKey)) {
	            return map[attribKey];
	        }
	        return void 0;
	    }
	    function getAttributeType(tagName, attribName) {
	        return lookupAttribute(html4.ATTRIBS, tagName, attribName);
	    }
	    function getLoaderType(tagName, attribName) {
	        return lookupAttribute(html4.LOADERTYPES, tagName, attribName);
	    }
	    function getUriEffect(tagName, attribName) {
	        return lookupAttribute(html4.URIEFFECTS, tagName, attribName);
	    }
	
	    /**
	     * Sanitizes attributes on an HTML tag.
	     * @param {string} tagName An HTML tag name in lowercase.
	     * @param {Array.<?string>} attribs An array of alternating names and values.
	     * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
	     *     apply to URI attributes; it can return a new string value, or null to
	     *     delete the attribute.  If unspecified, URI attributes are deleted.
	     * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
	     *     to attributes containing HTML names, element IDs, and space-separated
	     *     lists of classes; it can return a new string value, or null to delete
	     *     the attribute.  If unspecified, these attributes are kept unchanged.
	     * @return {Array.<?string>} The sanitized attributes as a list of alternating
	     *     names and values, where a null value means to omit the attribute.
	     */
	    function sanitizeAttribs(tagName, attribs, opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
	        // TODO(felix8a): it's obnoxious that domado duplicates much of this
	        // TODO(felix8a): maybe consistently enforce constraints like target=
	        for (var i = 0; i < attribs.length; i += 2) {
	            var attribName = attribs[i];
	            var value = attribs[i + 1];
	            var oldValue = value;
	            var atype = null,
	                attribKey;
	            if ((attribKey = tagName + '::' + attribName, html4.ATTRIBS.hasOwnProperty(attribKey)) || (attribKey = '*::' + attribName, html4.ATTRIBS.hasOwnProperty(attribKey))) {
	                atype = html4.ATTRIBS[attribKey];
	            }
	            if (atype !== null) {
	                switch (atype) {
	                    case html4.atype['NONE']:
	                        break;
	                    case html4.atype['SCRIPT']:
	                        value = null;
	                        if (opt_logger) {
	                            log(opt_logger, tagName, attribName, oldValue, value);
	                        }
	                        break;
	                    case html4.atype['STYLE']:
	                        if ('undefined' === typeof parseCssDeclarations) {
	                            value = null;
	                            if (opt_logger) {
	                                log(opt_logger, tagName, attribName, oldValue, value);
	                            }
	                            break;
	                        }
	                        var sanitizedDeclarations = [];
	                        parseCssDeclarations(value, {
	                            'declaration': function declaration(property, tokens) {
	                                var normProp = property.toLowerCase();
	                                sanitizeCssProperty(normProp, tokens, opt_naiveUriRewriter ? function (url) {
	                                    return safeUri(url, html4.ueffects.SAME_DOCUMENT, html4.ltypes.SANDBOXED, {
	                                        "TYPE": "CSS",
	                                        "CSS_PROP": normProp
	                                    }, opt_naiveUriRewriter);
	                                } : null);
	                                if (tokens.length) {
	                                    sanitizedDeclarations.push(normProp + ': ' + tokens.join(' '));
	                                }
	                            }
	                        });
	                        value = sanitizedDeclarations.length > 0 ? sanitizedDeclarations.join(' ; ') : null;
	                        if (opt_logger) {
	                            log(opt_logger, tagName, attribName, oldValue, value);
	                        }
	                        break;
	                    case html4.atype['ID']:
	                    case html4.atype['IDREF']:
	                    case html4.atype['IDREFS']:
	                    case html4.atype['GLOBAL_NAME']:
	                    case html4.atype['LOCAL_NAME']:
	                    case html4.atype['CLASSES']:
	                        value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
	                        if (opt_logger) {
	                            log(opt_logger, tagName, attribName, oldValue, value);
	                        }
	                        break;
	                    case html4.atype['URI']:
	                        value = safeUri(value, getUriEffect(tagName, attribName), getLoaderType(tagName, attribName), {
	                            "TYPE": "MARKUP",
	                            "XML_ATTR": attribName,
	                            "XML_TAG": tagName
	                        }, opt_naiveUriRewriter);
	                        if (opt_logger) {
	                            log(opt_logger, tagName, attribName, oldValue, value);
	                        }
	                        break;
	                    case html4.atype['URI_FRAGMENT']:
	                        if (value && '#' === value.charAt(0)) {
	                            value = value.substring(1); // remove the leading '#'
	                            value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
	                            if (value !== null && value !== void 0) {
	                                value = '#' + value; // restore the leading '#'
	                            }
	                        } else {
	                                value = null;
	                            }
	                        if (opt_logger) {
	                            log(opt_logger, tagName, attribName, oldValue, value);
	                        }
	                        break;
	                    default:
	                        value = null;
	                        if (opt_logger) {
	                            log(opt_logger, tagName, attribName, oldValue, value);
	                        }
	                        break;
	                }
	            } else {
	                value = null;
	                if (opt_logger) {
	                    log(opt_logger, tagName, attribName, oldValue, value);
	                }
	            }
	            attribs[i + 1] = value;
	        }
	        return attribs;
	    }
	
	    /**
	     * Creates a tag policy that omits all tags marked UNSAFE in html4-defs.js
	     * and applies the default attribute sanitizer with the supplied policy for
	     * URI attributes and NMTOKEN attributes.
	     * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
	     *     apply to URI attributes.  If not given, URI attributes are deleted.
	     * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
	     *     to attributes containing HTML names, element IDs, and space-separated
	     *     lists of classes.  If not given, such attributes are left unchanged.
	     * @return {defs.TagPolicy} A tagPolicy suitable for
	     *     passing to html.sanitize.
	     */
	    function makeTagPolicy(opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
	        return function (tagName, attribs) {
	            if (!(html4.ELEMENTS[tagName] & html4.eflags['UNSAFE'])) {
	                return {
	                    'attribs': sanitizeAttribs(tagName, attribs, opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger)
	                };
	            } else {
	                if (opt_logger) {
	                    log(opt_logger, tagName, undefined, undefined, undefined);
	                }
	            }
	        };
	    }
	
	    /**
	     * Sanitizes HTML tags and attributes according to a given policy.
	     * @param {string} inputHtml The HTML to sanitize.
	     * @param {function(string, Array.<?string>)} tagPolicy A function that
	     *     decides which tags to accept and sanitizes their attributes (see
	     *     makeHtmlSanitizer above for details).
	     * @return {string} The sanitized HTML.
	     */
	    function sanitizeWithPolicy(inputHtml, tagPolicy) {
	        var outputArray = [];
	        makeHtmlSanitizer(tagPolicy)(inputHtml, outputArray);
	        return outputArray.join('');
	    }
	
	    /**
	     * Strips unsafe tags and attributes from HTML.
	     * @param {string} inputHtml The HTML to sanitize.
	     * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
	     *     apply to URI attributes.  If not given, URI attributes are deleted.
	     * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
	     *     to attributes containing HTML names, element IDs, and space-separated
	     *     lists of classes.  If not given, such attributes are left unchanged.
	     */
	    function sanitize(inputHtml, opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
	        var tagPolicy = makeTagPolicy(opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger);
	        return sanitizeWithPolicy(inputHtml, tagPolicy);
	    }
	
	    // Export both quoted and unquoted names for Closure linkage.
	    var html = {};
	    html.escapeAttrib = html['escapeAttrib'] = escapeAttrib;
	    html.makeHtmlSanitizer = html['makeHtmlSanitizer'] = makeHtmlSanitizer;
	    html.makeSaxParser = html['makeSaxParser'] = makeSaxParser;
	    html.makeTagPolicy = html['makeTagPolicy'] = makeTagPolicy;
	    html.normalizeRCData = html['normalizeRCData'] = normalizeRCData;
	    html.sanitize = html['sanitize'] = sanitize;
	    html.sanitizeAttribs = html['sanitizeAttribs'] = sanitizeAttribs;
	    html.sanitizeWithPolicy = html['sanitizeWithPolicy'] = sanitizeWithPolicy;
	    html.unescapeEntities = html['unescapeEntities'] = unescapeEntities;
	    return html;
	}(_html4Defs.html4);
	
	var htmlSanitize = exports.htmlSanitize = html['sanitize'];
	
	// Exports for Closure compiler.  Note this file is also cajoled
	// for domado and run in an environment without 'window'
	// if (typeof window !== 'undefined') {
	//     window['html'] = html;
	//     window['html_sanitize'] = html_sanitize;
	// }

	/* eslint-enable */

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable */
	
	// Copyright Google Inc.
	// Licensed under the Apache Licence Version 2.0
	// Autogenerated at Thu Jun 02 04:35:24 MSK 2016
	// @overrides window
	// @provides html4
	var html4 = exports.html4 = {};
	html4.atype = {
	  'NONE': 0,
	  'URI': 1,
	  'URI_FRAGMENT': 11,
	  'SCRIPT': 2,
	  'STYLE': 3,
	  'HTML': 12,
	  'ID': 4,
	  'IDREF': 5,
	  'IDREFS': 6,
	  'GLOBAL_NAME': 7,
	  'LOCAL_NAME': 8,
	  'CLASSES': 9,
	  'FRAME_TARGET': 10,
	  'MEDIA_QUERY': 13
	};
	html4['atype'] = html4.atype;
	html4.ATTRIBS = {
	  '*::class': 9,
	  '*::dir': 0,
	  '*::draggable': 0,
	  '*::hidden': 0,
	  '*::id': 4,
	  '*::inert': 0,
	  '*::itemprop': 0,
	  '*::itemref': 6,
	  '*::itemscope': 0,
	  '*::lang': 0,
	  '*::onblur': 2,
	  '*::onchange': 2,
	  '*::onclick': 2,
	  '*::ondblclick': 2,
	  '*::onerror': 2,
	  '*::onfocus': 2,
	  '*::onkeydown': 2,
	  '*::onkeypress': 2,
	  '*::onkeyup': 2,
	  '*::onload': 2,
	  '*::onmousedown': 2,
	  '*::onmousemove': 2,
	  '*::onmouseout': 2,
	  '*::onmouseover': 2,
	  '*::onmouseup': 2,
	  '*::onreset': 2,
	  '*::onscroll': 2,
	  '*::onselect': 2,
	  '*::onsubmit': 2,
	  '*::ontouchcancel': 2,
	  '*::ontouchend': 2,
	  '*::ontouchenter': 2,
	  '*::ontouchleave': 2,
	  '*::ontouchmove': 2,
	  '*::ontouchstart': 2,
	  '*::onunload': 2,
	  '*::spellcheck': 0,
	  '*::style': 3,
	  '*::tabindex': 0,
	  '*::title': 0,
	  '*::translate': 0,
	  'a::accesskey': 0,
	  'a::coords': 0,
	  'a::href': 1,
	  'a::hreflang': 0,
	  'a::name': 7,
	  'a::onblur': 2,
	  'a::onfocus': 2,
	  'a::shape': 0,
	  'a::target': 10,
	  'a::type': 0,
	  'area::accesskey': 0,
	  'area::alt': 0,
	  'area::coords': 0,
	  'area::href': 1,
	  'area::nohref': 0,
	  'area::onblur': 2,
	  'area::onfocus': 2,
	  'area::shape': 0,
	  'area::target': 10,
	  'audio::controls': 0,
	  'audio::loop': 0,
	  'audio::mediagroup': 5,
	  'audio::muted': 0,
	  'audio::preload': 0,
	  'audio::src': 1,
	  'bdo::dir': 0,
	  'blockquote::cite': 1,
	  'br::clear': 0,
	  'button::accesskey': 0,
	  'button::disabled': 0,
	  'button::name': 8,
	  'button::onblur': 2,
	  'button::onfocus': 2,
	  'button::type': 0,
	  'button::value': 0,
	  'canvas::height': 0,
	  'canvas::width': 0,
	  'caption::align': 0,
	  'col::align': 0,
	  'col::char': 0,
	  'col::charoff': 0,
	  'col::span': 0,
	  'col::valign': 0,
	  'col::width': 0,
	  'colgroup::align': 0,
	  'colgroup::char': 0,
	  'colgroup::charoff': 0,
	  'colgroup::span': 0,
	  'colgroup::valign': 0,
	  'colgroup::width': 0,
	  'command::checked': 0,
	  'command::command': 5,
	  'command::disabled': 0,
	  'command::icon': 1,
	  'command::label': 0,
	  'command::radiogroup': 0,
	  'command::type': 0,
	  'data::value': 0,
	  'del::cite': 1,
	  'del::datetime': 0,
	  'details::open': 0,
	  'dir::compact': 0,
	  'div::align': 0,
	  'dl::compact': 0,
	  'fieldset::disabled': 0,
	  'font::color': 0,
	  'font::face': 0,
	  'font::size': 0,
	  'form::accept': 0,
	  'form::action': 1,
	  'form::autocomplete': 0,
	  'form::enctype': 0,
	  'form::method': 0,
	  'form::name': 7,
	  'form::novalidate': 0,
	  'form::onreset': 2,
	  'form::onsubmit': 2,
	  'form::target': 10,
	  'h1::align': 0,
	  'h2::align': 0,
	  'h3::align': 0,
	  'h4::align': 0,
	  'h5::align': 0,
	  'h6::align': 0,
	  'hr::align': 0,
	  'hr::noshade': 0,
	  'hr::size': 0,
	  'hr::width': 0,
	  'iframe::align': 0,
	  'iframe::frameborder': 0,
	  'iframe::height': 0,
	  'iframe::marginheight': 0,
	  'iframe::marginwidth': 0,
	  'iframe::width': 0,
	  'img::align': 0,
	  'img::alt': 0,
	  'img::border': 0,
	  'img::height': 0,
	  'img::hspace': 0,
	  'img::ismap': 0,
	  'img::name': 7,
	  'img::src': 9,
	  'img::usemap': 11,
	  'img::vspace': 0,
	  'img::width': 0,
	  'input::accept': 0,
	  'input::accesskey': 0,
	  'input::align': 0,
	  'input::alt': 0,
	  'input::autocomplete': 0,
	  'input::checked': 0,
	  'input::disabled': 0,
	  'input::inputmode': 0,
	  'input::ismap': 0,
	  'input::list': 5,
	  'input::max': 0,
	  'input::maxlength': 0,
	  'input::min': 0,
	  'input::multiple': 0,
	  'input::name': 8,
	  'input::onblur': 2,
	  'input::onchange': 2,
	  'input::onfocus': 2,
	  'input::onselect': 2,
	  'input::pattern': 0,
	  'input::placeholder': 0,
	  'input::readonly': 0,
	  'input::required': 0,
	  'input::size': 0,
	  'input::src': 1,
	  'input::step': 0,
	  'input::type': 0,
	  'input::usemap': 11,
	  'input::value': 0,
	  'ins::cite': 1,
	  'ins::datetime': 0,
	  'label::accesskey': 0,
	  'label::for': 5,
	  'label::onblur': 2,
	  'label::onfocus': 2,
	  'legend::accesskey': 0,
	  'legend::align': 0,
	  'li::type': 0,
	  'li::value': 0,
	  'map::name': 7,
	  'menu::compact': 0,
	  'menu::label': 0,
	  'menu::type': 0,
	  'meter::high': 0,
	  'meter::low': 0,
	  'meter::max': 0,
	  'meter::min': 0,
	  'meter::optimum': 0,
	  'meter::value': 0,
	  'ol::compact': 0,
	  'ol::reversed': 0,
	  'ol::start': 0,
	  'ol::type': 0,
	  'optgroup::disabled': 0,
	  'optgroup::label': 0,
	  'option::disabled': 0,
	  'option::label': 0,
	  'option::selected': 0,
	  'option::value': 0,
	  'output::for': 6,
	  'output::name': 8,
	  'p::align': 0,
	  'pre::width': 0,
	  'progress::max': 0,
	  'progress::min': 0,
	  'progress::value': 0,
	  'q::cite': 1,
	  'select::autocomplete': 0,
	  'select::disabled': 0,
	  'select::multiple': 0,
	  'select::name': 8,
	  'select::onblur': 2,
	  'select::onchange': 2,
	  'select::onfocus': 2,
	  'select::required': 0,
	  'select::size': 0,
	  'source::type': 0,
	  'table::align': 0,
	  'table::bgcolor': 0,
	  'table::border': 0,
	  'table::cellpadding': 0,
	  'table::cellspacing': 0,
	  'table::frame': 0,
	  'table::rules': 0,
	  'table::summary': 0,
	  'table::width': 0,
	  'tbody::align': 0,
	  'tbody::char': 0,
	  'tbody::charoff': 0,
	  'tbody::valign': 0,
	  'td::abbr': 0,
	  'td::align': 0,
	  'td::axis': 0,
	  'td::bgcolor': 0,
	  'td::char': 0,
	  'td::charoff': 0,
	  'td::colspan': 0,
	  'td::headers': 6,
	  'td::height': 0,
	  'td::nowrap': 0,
	  'td::rowspan': 0,
	  'td::scope': 0,
	  'td::valign': 0,
	  'td::width': 0,
	  'textarea::accesskey': 0,
	  'textarea::autocomplete': 0,
	  'textarea::cols': 0,
	  'textarea::disabled': 0,
	  'textarea::inputmode': 0,
	  'textarea::name': 8,
	  'textarea::onblur': 2,
	  'textarea::onchange': 2,
	  'textarea::onfocus': 2,
	  'textarea::onselect': 2,
	  'textarea::placeholder': 0,
	  'textarea::readonly': 0,
	  'textarea::required': 0,
	  'textarea::rows': 0,
	  'textarea::wrap': 0,
	  'tfoot::align': 0,
	  'tfoot::char': 0,
	  'tfoot::charoff': 0,
	  'tfoot::valign': 0,
	  'th::abbr': 0,
	  'th::align': 0,
	  'th::axis': 0,
	  'th::bgcolor': 0,
	  'th::char': 0,
	  'th::charoff': 0,
	  'th::colspan': 0,
	  'th::headers': 6,
	  'th::height': 0,
	  'th::nowrap': 0,
	  'th::rowspan': 0,
	  'th::scope': 0,
	  'th::valign': 0,
	  'th::width': 0,
	  'thead::align': 0,
	  'thead::char': 0,
	  'thead::charoff': 0,
	  'thead::valign': 0,
	  'tr::align': 0,
	  'tr::bgcolor': 0,
	  'tr::char': 0,
	  'tr::charoff': 0,
	  'tr::valign': 0,
	  'track::default': 0,
	  'track::kind': 0,
	  'track::label': 0,
	  'track::srclang': 0,
	  'ul::compact': 0,
	  'ul::type': 0,
	  'video::controls': 0,
	  'video::height': 0,
	  'video::loop': 0,
	  'video::mediagroup': 5,
	  'video::muted': 0,
	  'video::poster': 1,
	  'video::preload': 0,
	  'video::src': 1,
	  'video::width': 0
	};
	html4['ATTRIBS'] = html4.ATTRIBS;
	html4.eflags = {
	  'OPTIONAL_ENDTAG': 1,
	  'EMPTY': 2,
	  'CDATA': 4,
	  'RCDATA': 8,
	  'UNSAFE': 16,
	  'FOLDABLE': 32,
	  'SCRIPT': 64,
	  'STYLE': 128,
	  'VIRTUALIZED': 256
	};
	html4['eflags'] = html4.eflags;
	html4.ELEMENTS = {
	  'a': 0,
	  'abbr': 0,
	  'acronym': 0,
	  'address': 0,
	  'applet': 272,
	  'area': 2,
	  'article': 0,
	  'aside': 0,
	  'audio': 0,
	  'b': 0,
	  'base': 274,
	  'basefont': 274,
	  'bdi': 0,
	  'bdo': 0,
	  'big': 0,
	  'blockquote': 0,
	  'body': 305,
	  'br': 2,
	  'button': 0,
	  'canvas': 0,
	  'caption': 0,
	  'center': 0,
	  'cite': 0,
	  'code': 0,
	  'col': 2,
	  'colgroup': 1,
	  'command': 2,
	  'data': 0,
	  'datalist': 0,
	  'dd': 1,
	  'del': 0,
	  'details': 0,
	  'dfn': 0,
	  'dialog': 272,
	  'dir': 0,
	  'div': 0,
	  'dl': 0,
	  'dt': 1,
	  'em': 0,
	  'fieldset': 0,
	  'figcaption': 0,
	  'figure': 0,
	  'font': 0,
	  'footer': 0,
	  'form': 0,
	  'frame': 274,
	  'frameset': 272,
	  'h1': 0,
	  'h2': 0,
	  'h3': 0,
	  'h4': 0,
	  'h5': 0,
	  'h6': 0,
	  'head': 305,
	  'header': 0,
	  'hgroup': 0,
	  'hr': 2,
	  'html': 305,
	  'i': 0,
	  // 'iframe': 4, // I don't want user to use iframe
	  'img': 2,
	  'input': 2,
	  'ins': 0,
	  'isindex': 274,
	  'kbd': 0,
	  'keygen': 274,
	  'label': 0,
	  'legend': 0,
	  'li': 1,
	  'link': 274,
	  'map': 0,
	  'mark': 0,
	  'menu': 0,
	  'meta': 274,
	  'meter': 0,
	  'nav': 0,
	  'nobr': 0,
	  'noembed': 276,
	  'noframes': 276,
	  'noscript': 276,
	  'object': 272,
	  'ol': 0,
	  'optgroup': 0,
	  'option': 1,
	  'output': 0,
	  'p': 1,
	  'param': 274,
	  'pre': 0,
	  'progress': 0,
	  'q': 0,
	  's': 0,
	  'samp': 0,
	  'script': 84,
	  'section': 0,
	  'select': 0,
	  'small': 0,
	  'source': 2,
	  'span': 0,
	  'strike': 0,
	  'strong': 0,
	  'style': 148,
	  'sub': 0,
	  'summary': 0,
	  'sup': 0,
	  'table': 0,
	  'tbody': 1,
	  'td': 1,
	  'textarea': 8,
	  'tfoot': 1,
	  'th': 1,
	  'thead': 1,
	  'time': 0,
	  'title': 280,
	  'tr': 1,
	  'track': 2,
	  'tt': 0,
	  'u': 0,
	  'ul': 0,
	  'var': 0,
	  'video': 0,
	  'wbr': 2
	};
	html4['ELEMENTS'] = html4.ELEMENTS;
	html4.ELEMENT_DOM_INTERFACES = {
	  'a': 'HTMLAnchorElement',
	  'abbr': 'HTMLElement',
	  'acronym': 'HTMLElement',
	  'address': 'HTMLElement',
	  'applet': 'HTMLAppletElement',
	  'area': 'HTMLAreaElement',
	  'article': 'HTMLElement',
	  'aside': 'HTMLElement',
	  'audio': 'HTMLAudioElement',
	  'b': 'HTMLElement',
	  'base': 'HTMLBaseElement',
	  'basefont': 'HTMLBaseFontElement',
	  'bdi': 'HTMLElement',
	  'bdo': 'HTMLElement',
	  'big': 'HTMLElement',
	  'blockquote': 'HTMLQuoteElement',
	  'body': 'HTMLBodyElement',
	  'br': 'HTMLBRElement',
	  'button': 'HTMLButtonElement',
	  'canvas': 'HTMLCanvasElement',
	  'caption': 'HTMLTableCaptionElement',
	  'center': 'HTMLElement',
	  'cite': 'HTMLElement',
	  'code': 'HTMLElement',
	  'col': 'HTMLTableColElement',
	  'colgroup': 'HTMLTableColElement',
	  'command': 'HTMLCommandElement',
	  'data': 'HTMLElement',
	  'datalist': 'HTMLDataListElement',
	  'dd': 'HTMLElement',
	  'del': 'HTMLModElement',
	  'details': 'HTMLDetailsElement',
	  'dfn': 'HTMLElement',
	  'dialog': 'HTMLDialogElement',
	  'dir': 'HTMLDirectoryElement',
	  'div': 'HTMLDivElement',
	  'dl': 'HTMLDListElement',
	  'dt': 'HTMLElement',
	  'em': 'HTMLElement',
	  'fieldset': 'HTMLFieldSetElement',
	  'figcaption': 'HTMLElement',
	  'figure': 'HTMLElement',
	  'font': 'HTMLFontElement',
	  'footer': 'HTMLElement',
	  'form': 'HTMLFormElement',
	  'frame': 'HTMLFrameElement',
	  'frameset': 'HTMLFrameSetElement',
	  'h1': 'HTMLHeadingElement',
	  'h2': 'HTMLHeadingElement',
	  'h3': 'HTMLHeadingElement',
	  'h4': 'HTMLHeadingElement',
	  'h5': 'HTMLHeadingElement',
	  'h6': 'HTMLHeadingElement',
	  'head': 'HTMLHeadElement',
	  'header': 'HTMLElement',
	  'hgroup': 'HTMLElement',
	  'hr': 'HTMLHRElement',
	  'html': 'HTMLHtmlElement',
	  'i': 'HTMLElement',
	  'iframe': 'HTMLIFrameElement',
	  'img': 'HTMLImageElement',
	  'input': 'HTMLInputElement',
	  'ins': 'HTMLModElement',
	  'isindex': 'HTMLUnknownElement',
	  'kbd': 'HTMLElement',
	  'keygen': 'HTMLKeygenElement',
	  'label': 'HTMLLabelElement',
	  'legend': 'HTMLLegendElement',
	  'li': 'HTMLLIElement',
	  'link': 'HTMLLinkElement',
	  'map': 'HTMLMapElement',
	  'mark': 'HTMLElement',
	  'menu': 'HTMLMenuElement',
	  'meta': 'HTMLMetaElement',
	  'meter': 'HTMLMeterElement',
	  'nav': 'HTMLElement',
	  'nobr': 'HTMLElement',
	  'noembed': 'HTMLElement',
	  'noframes': 'HTMLElement',
	  'noscript': 'HTMLElement',
	  'object': 'HTMLObjectElement',
	  'ol': 'HTMLOListElement',
	  'optgroup': 'HTMLOptGroupElement',
	  'option': 'HTMLOptionElement',
	  'output': 'HTMLOutputElement',
	  'p': 'HTMLParagraphElement',
	  'param': 'HTMLParamElement',
	  'pre': 'HTMLPreElement',
	  'progress': 'HTMLProgressElement',
	  'q': 'HTMLQuoteElement',
	  's': 'HTMLElement',
	  'samp': 'HTMLElement',
	  'script': 'HTMLScriptElement',
	  'section': 'HTMLElement',
	  'select': 'HTMLSelectElement',
	  'small': 'HTMLElement',
	  'source': 'HTMLSourceElement',
	  'span': 'HTMLSpanElement',
	  'strike': 'HTMLElement',
	  'strong': 'HTMLElement',
	  'style': 'HTMLStyleElement',
	  'sub': 'HTMLElement',
	  'summary': 'HTMLElement',
	  'sup': 'HTMLElement',
	  'table': 'HTMLTableElement',
	  'tbody': 'HTMLTableSectionElement',
	  'td': 'HTMLTableDataCellElement',
	  'textarea': 'HTMLTextAreaElement',
	  'tfoot': 'HTMLTableSectionElement',
	  'th': 'HTMLTableHeaderCellElement',
	  'thead': 'HTMLTableSectionElement',
	  'time': 'HTMLTimeElement',
	  'title': 'HTMLTitleElement',
	  'tr': 'HTMLTableRowElement',
	  'track': 'HTMLTrackElement',
	  'tt': 'HTMLElement',
	  'u': 'HTMLElement',
	  'ul': 'HTMLUListElement',
	  'var': 'HTMLElement',
	  'video': 'HTMLVideoElement',
	  'wbr': 'HTMLElement'
	};
	html4['ELEMENT_DOM_INTERFACES'] = html4.ELEMENT_DOM_INTERFACES;
	html4.ueffects = {
	  'NOT_LOADED': 0,
	  'SAME_DOCUMENT': 1,
	  'NEW_DOCUMENT': 2
	};
	html4['ueffects'] = html4.ueffects;
	html4.URIEFFECTS = {
	  'a::href': 2,
	  'area::href': 2,
	  'audio::src': 1,
	  'blockquote::cite': 0,
	  'command::icon': 1,
	  'del::cite': 0,
	  'form::action': 2,
	  'img::src': 1,
	  'input::src': 1,
	  'ins::cite': 0,
	  'q::cite': 0,
	  'video::poster': 1,
	  'video::src': 1
	};
	html4['URIEFFECTS'] = html4.URIEFFECTS;
	html4.ltypes = {
	  'UNSANDBOXED': 2,
	  'SANDBOXED': 1,
	  'DATA': 0
	};
	html4['ltypes'] = html4.ltypes;
	html4.LOADERTYPES = {
	  'a::href': 2,
	  'area::href': 2,
	  'audio::src': 2,
	  'blockquote::cite': 2,
	  'command::icon': 1,
	  'del::cite': 2,
	  'form::action': 2,
	  'img::src': 1,
	  'input::src': 1,
	  'ins::cite': 2,
	  'q::cite': 2,
	  'video::poster': 1,
	  'video::src': 2
	};
	html4['LOADERTYPES'] = html4.LOADERTYPES;
	// export for Closure Compiler
	// if (typeof window !== 'undefined') {
	//   window['html4'] = html4;
	// }

	/* eslint-enable */

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DialogBubble = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Component2 = __webpack_require__(4);
	
	var _general = __webpack_require__(2);
	
	var _dialog = __webpack_require__(12);
	
	var _templateEngine = __webpack_require__(6);
	
	var _dialogList = __webpack_require__(15);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DialogBubble = exports.DialogBubble = function (_Component) {
	    _inherits(DialogBubble, _Component);
	
	    function DialogBubble() {
	        _classCallCheck(this, DialogBubble);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DialogBubble).call(this));
	
	        _this.side = '';
	        _this.message = '';
	        _this.type = null;
	        return _this;
	    }
	
	    _createClass(DialogBubble, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            _dialogList.dialogList.addPhrase({
	                side: this.side,
	                message: this.message,
	                ref: this.type === _dialog.IS_TYPING ? this.refs.bubbleContainer : null,
	                type: this.type
	            });
	        }
	
	        /**
	         * Render bubble element
	         * @param data {Object}
	         * @param data.side {String} - 'user', 'chat'
	         * @param data.message {String}
	         * @param data.type {String} - 'is-typing'
	         * @returns {Object}
	         */
	
	    }, {
	        key: 'render',
	        value: function render(data) {
	            var bubbleClass = _general.LIB_NAME + '-dialog-bubble';
	            var bubbleContainerClass = _general.LIB_NAME + '-dialog-bubble-container';
	            var innerTemplate = '\n            <div class="<% bubbleClass %>">\n                <div class="' + _general.LIB_NAME + '-dialog-bubble__text">\n                    <% message %>\n                </div>\n            </div>\n        ';
	
	            this.side = data.side;
	            this.message = data.message;
	            this.type = data.type;
	
	            var bubbleClasses = [];
	            bubbleClasses.push(bubbleClass);
	            if (data.side) {
	                bubbleClasses.push(bubbleClass + '_' + data.side);
	            }
	            if (data.type) {
	                bubbleClasses.push(bubbleClass + '_' + data.type);
	            }
	            data.bubbleClass = bubbleClasses.join(' ');
	
	            return {
	                div: {
	                    className: bubbleContainerClass,
	                    innerHTML: (0, _templateEngine.templateEngine)(innerTemplate, data),
	                    ref: 'bubbleContainer'
	                }
	            };
	        }
	    }]);

	    return DialogBubble;
	}(_Component2.Component);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Input = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Component2 = __webpack_require__(4);
	
	var _general = __webpack_require__(2);
	
	var _dialog = __webpack_require__(12);
	
	var _header = __webpack_require__(3);
	
	var _templateEngine = __webpack_require__(6);
	
	var _eventEmitter = __webpack_require__(7);
	
	var _chatSettings = __webpack_require__(9);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Input = exports.Input = function (_Component) {
	    _inherits(Input, _Component);
	
	    function Input() {
	        _classCallCheck(this, Input);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this));
	
	        _this.inputClass = _general.LIB_NAME + '-input__input-field';
	        _this.inputEl = null;
	
	        _this.onSubmit = function (event) {
	            event.preventDefault();
	            if (_this.inputEl.value !== '') {
	                _eventEmitter.eventEmitter.emit(_dialog.ADD_PHRASE, {
	                    side: _dialog.SIDE_USER,
	                    message: _this.inputEl.value
	                });
	                _this.inputEl.value = '';
	            }
	        };
	        return _this;
	    }
	
	    _createClass(Input, [{
	        key: 'addEvents',
	        value: function addEvents() {
	            var _this2 = this;
	
	            _eventEmitter.eventEmitter.on(_header.OPEN_CHAT, function () {
	                if (!_this2.inputEl) {
	                    var $$inputEl = _this2.refs.inputForm.getElementsByClassName(_this2.inputClass);
	                    if ($$inputEl) {
	                        _this2.inputEl = $$inputEl[0];
	                    }
	                }
	                setTimeout(function () {
	                    _this2.inputEl.focus();
	                });
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var data = {
	                sendText: _chatSettings.chatSettings.getProperty('sendText'),
	                inputPlaceholder: _chatSettings.chatSettings.getProperty('inputPlaceholder')
	            };
	
	            var id = _general.LIB_NAME + '-input';
	            var innerTemplate = '\n            <div class="' + _general.LIB_NAME + '-input__cell">\n                <input type="text" class="' + this.inputClass + '" placeholder="<% inputPlaceholder %>" />\n            </div>\n            <div class="' + _general.LIB_NAME + '-input__cell">\n                <button type="submit" class="' + _general.LIB_NAME + '-input__send">\n                    <% sendText %>\n                </button>\n            </div>\n        ';
	
	            this.addEvents();
	
	            return {
	                form: {
	                    id: id,
	                    innerHTML: (0, _templateEngine.templateEngine)(innerTemplate, data),
	                    ref: 'inputForm',
	                    submit: this.onSubmit
	                }
	            };
	        }
	    }]);

	    return Input;
	}(_Component2.Component);

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var domHelper = exports.domHelper = function () {
	    return {
	        removeClass: function removeClass(el, className) {
	            if (el.classList) {
	                el.classList.remove(className);
	            } else {
	                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	            }
	        },
	
	        addClass: function addClass(el, className) {
	            if (el.classList) {
	                el.classList.add(className);
	            } else {
	                el.className += ' ' + className;
	            }
	        },
	
	        hasClass: function hasClass(el, className) {
	            if (el.classList) {
	                el.classList.contains(className);
	            } else {
	                new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	            }
	        },
	
	        toggleClass: function toggleClass(el, className) {
	            if (el.classList) {
	                el.classList.toggle(className);
	            } else {
	                var classes = el.className.split(' ');
	                var existingIndex = classes.indexOf(className);
	
	                if (existingIndex >= 0) {
	                    classes.splice(existingIndex, 1);
	                } else {
	                    classes.push(className);
	                }
	
	                el.className = classes.join(' ');
	            }
	        }
	    };
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=chat-ui.js.map