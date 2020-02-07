/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_canvas_animation__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var canvas = document.getElementById('canvas');
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;

var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    new __WEBPACK_IMPORTED_MODULE_0__modules_canvas_animation__["a" /* default */](canvas);
    this.jsClass(document.querySelectorAll('.js-class'));
    this.detectScroll();
  }

  _createClass(App, [{
    key: "jsClass",
    value: function jsClass($btns) {
      for (var _i2 = 0; _i2 < $btns.length; _i2++) {
        var btn = $btns[_i2];
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var $target = document.querySelector(this.dataset.target);
          var type = this.dataset.type;
          var className = this.dataset["class"];

          switch (type) {
            case 'add':
              $target.classList.add(className);
              break;

            case 'remove':
              $target.classList.remove(className);
              break;

            default:
              $target.classList.toggle(className);
              break;
          }
        });
      }
    }
  }, {
    key: "detectScroll",
    value: function detectScroll() {
      var _this = this;

      window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;

        if (scrollTop > 0) {
          _this.$select('.header').classList.add('scrolled');
        } else {
          _this.$select('.header').classList.remove('scrolled');

          _this.$select('.nav').classList.remove('active');
        }
      });
    }
  }, {
    key: "$select",
    value: function $select(selector) {
      var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (all) {
        return document.querySelectorAll(selector);
      } else {
        return document.querySelector(selector);
      }
    }
  }]);

  return App;
}();

;
new App();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return canvasExplosion; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvasExplosion =
/*#__PURE__*/
function () {
  function canvasExplosion(canvas) {
    _classCallCheck(this, canvasExplosion);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dotColors = ['#5b25a1', '#2fc63c', '#21cae0', '#e21b1b', '#c46d0f', '#fcf00f', '#ffffff', '#17d660', '#ffa0f2', '#2e35f4', '#000000', '#37f2f2', '#5176bc', '#e03ec8'];
    this.maxDots = 1500;
    this.dots = [];
    this.bounce = true;
    this.maxVelocity = 6;
    this.init();
  }

  _createClass(canvasExplosion, [{
    key: "init",
    value: function init() {
      this.createDot(this.dotColors[Math.floor(this.randomize(0, this.dotColors.length))]);
      window.requestAnimationFrame(this.animateDot.bind(this));
    }
  }, {
    key: "createDot",
    value: function createDot(color) {
      if (this.dots.length < this.maxDots) {
        var rand = Math.floor(this.randomize(-2, 2));

        if (rand === 0) {
          rand++;
        }

        var dot = {
          x: this.canvas.width / 2,
          y: this.canvas.height / 2,
          size: 1,
          paths: {
            x: this.randomize(-rand, rand),
            y: this.randomize(-rand, rand)
          },
          fill: color,
          velocity: this.randomize(1, this.maxVelocity)
        };
        this.dots.push(dot);
        this.createDot(this.dotColors[Math.floor(this.randomize(0, this.dotColors.length))]);
      }
    }
  }, {
    key: "animateDot",
    value: function animateDot() {
      this.drawDot();
      window.requestAnimationFrame(this.animateDot.bind(this));
    }
  }, {
    key: "drawDot",
    value: function drawDot() {
      var _this = this;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.dots.forEach(function (dot) {
        dot.x += dot.paths.x * dot.velocity;
        dot.y += dot.paths.y * dot.velocity;

        if (_this.bounce) {
          if (dot.x < 0 || dot.x > _this.canvas.width) {
            dot.paths.x = -dot.paths.x;
          } else if (dot.y < 0 || dot.y > _this.canvas.height) {
            dot.paths.y = -dot.paths.y;
          }
        }

        _this.ctx.beginPath();

        _this.ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI, false);

        _this.ctx.fillStyle = dot.fill;

        _this.ctx.fill();
      });
    }
  }, {
    key: "randomize",
    value: function randomize(min, max) {
      return Math.random() * (max - min) + min;
    }
  }]);

  return canvasExplosion;
}();



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map