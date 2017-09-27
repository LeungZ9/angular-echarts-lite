(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("echarts"));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "echarts"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("angular"), require("echarts")) : factory(root["angular"], root["echarts"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by LeungZ on 2017/9/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _angular = __webpack_require__(1);

var _angular2 = _interopRequireDefault(_angular);

var _echarts = __webpack_require__(2);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Angular directive
 */
var Directive = function () {
    function Directive() {
        _classCallCheck(this, Directive);

        /** @return {directive properties} */
        return {
            restrict: 'A',
            scope: {
                config: '=',
                instance: '=?',
                theme: '=?'
            },
            link: this.link_
        };
    }

    /** @private  */


    _createClass(Directive, [{
        key: 'link_',
        value: function link_(scope, element, attr) {
            /**
             * @param {echartsOptions} options
             * @private
             */
            function setOptions(options) {
                options = options || {};
                options.forceClear && chart.clear();
                if (options.series && options.series.length) {
                    chart.hideLoading();
                    chart.setOption(options, options.notMerge);
                    chart.resize();
                } else {
                    chart.showLoading('default', options.errorMsg || { text: '没有数据' });
                }
            }

            var chart = _echarts2.default.init(element[0], scope.theme);
            setOptions(scope.config);

            // Check for attribute "unwatch" whether to register scope watch
            if (!attr.hasOwnProperty('unwatch')) {
                scope.$watch(function () {
                    return scope.config;
                }, function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        setOptions(newValue);
                    }
                }, true);
                scope.$watch(function () {
                    return scope.theme;
                }, function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        chart.dispose();
                        chart = _echarts2.default.init(element[0], newValue);
                        chart.setOption(scope.config);
                    }
                }, true);
            }

            // Check for attribute "instance" whether to bind function
            // to get echarts instance
            if (attr.instance) {
                scope.$evalAsync(function () {
                    scope.instance = /** @return {echartsInstance} */function () {
                        return chart;
                    };
                });
            }
        }

        /** @return {directive } */

    }], [{
        key: 'factory',
        value: function factory() {
            return new Directive();
        }
    }]);

    return Directive;
}();

exports.default = _angular2.default.module('angular-echarts-lite', []).directive('lzChart', Directive.factory);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});