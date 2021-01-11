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
/***/ (function(module, exports) {

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(document).ready(function () {
  /**
  *   Tab Controls 
  */
  $('.section__head ul a').on('click', function (e) {
    e.preventDefault();
    var $btn = $(this);
    var $target = $($btn.attr('href'));
    $btn.parent().addClass('active').siblings().removeClass('active');
    $target.addClass('active').siblings().removeClass('active');
  });
  /**
  *   Youtube API 
  */

  $.get('https://www.googleapis.com/youtube/v3/channels', {
    part: 'contentDetails',
    forUsername: 'Kurzgesagt',
    key: 'AIzaSyATnzqIcJ92O_jTC5mvXxl2I1xLg8V0XCo'
  }).done(function (userData) {
    var pid = userData.items[0].contentDetails.relatedPlaylists.uploads;
    getVideos(pid);
  });

  function getVideos(pid) {
    $.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      part: 'snippet',
      maxResults: '6',
      playlistId: pid,
      key: 'AIzaSyATnzqIcJ92O_jTC5mvXxl2I1xLg8V0XCo'
    }).done(function (videoData) {
      appendVideos(videoData.items);
    });
  }

  function appendVideos(videos) {
    var $container = $('.tab-youtube .videos');

    var _iterator = _createForOfIteratorHelper(videos),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var video = _step.value;
        videoId = video.snippet.resourceId.videoId;
        var videoTemplate = "\n                <div class=\"video\">\n                    <iframe src=\"https://www.youtube.com/embed/".concat(videoId, "\"></iframe>\n                </div>\n            ");
        $container.append(videoTemplate);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  /**
  *   Unsplash API 
  */


  $('.search').on('submit', function (e) {
    e.preventDefault();
    var query = $(this).find('input').val();
    getImages(query);
  });

  function getImages(query) {
    $.get('https://api.unsplash.com/search/photos', {
      query: query,
      client_id: 'yxnOx6mk-UHiHjy8YkYRCDgj-Iq2EbwF8nynYtz8FCE'
    }).done(function (imageData) {
      appendImages(imageData.results);
    });
  }

  function appendImages(images) {
    var $container = $('.images');
    $container.empty();

    var _iterator2 = _createForOfIteratorHelper(images),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var image = _step2.value;
        var imageTemplate = "\n                <div class=\"image\">\n                    <img src=\"".concat(image.urls.small, "\">\n                </div>\n            ");
        $container.append(imageTemplate);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map