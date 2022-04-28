'use strict';

exports.__esModule = true;

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default options for the plugin.
var defaults = {
  cssClassPrefix: 'icon',
  largePlayerSize: 500
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function splashPlay
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var splashPlay = function splashPlay(options) {
  var _this = this;

  this.ready(function () {
    options = _video2.default.mergeOptions(defaults, options);

    var player = _this;
    var splashButton = document.createElement('button');

    splashButton.setAttribute('aria-label', 'play button');

    function play() {
      player.play();
    }

    function hideButton() {
      splashButton.style.display = 'none';
    }

    function resize() {
      // Add an additional class to the button if the player is larger
      var button = document.querySelectorAll('#' + player.id() + ' .vjs-splash-play');
      var largeCssClass = 'vjs-splash-play-large';

      if (player.el().offsetWidth > options.largePlayerSize) {
        button[0].classList.add(largeCssClass);
      } else {
        button[0].classList.remove(largeCssClass);
      }
    }

    // Create the CSS class name for the button
    splashButton.className = 'vjs-splash-play';
    var buttonClassName = player.isAudio() ? options.cssClassPrefix + ' ' + options.cssClassPrefix + '-audio' : options.cssClassPrefix + ' ' + options.cssClassPrefix + '-play';

    splashButton.className += ' ' + buttonClassName;

    // Play on click
    splashButton.addEventListener('click', play);

    // Add the button to the player
    player.el().appendChild(splashButton);

    // When the player is playing, hide the button
    player.on('play', hideButton);

    player.on('dispose', function () {
      window.removeEventListener('resize', resize, true);
    });

    resize();

    window.addEventListener('resize', resize, true);
  });
};

// Register the plugin with video.js.
_video2.default.registerPlugin('splashPlay', splashPlay);

// Include the version number.
splashPlay.VERSION = '__VERSION__';

exports.default = splashPlay;