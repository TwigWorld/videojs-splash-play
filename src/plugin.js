import videojs from 'video.js';

// Default options for the plugin.
const defaults = {
  cssClassPrefix: 'icon',
  largePlayerSize: 500
};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;

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
const splashPlay = function(options) {
  this.ready(() => {
    options = videojs.mergeOptions(defaults, options);

    const player = this;

    const button = player.addChild('button');

    button.controlText('Play Button');

    function play() {
      player.play();
    }
    button.on('click', play);

    function hideButton() {
      player.removeChild(button);
    }

    function resize() {
      // Add an additional class to the button if the player is larger
      const largeCssClass = 'vjs-splash-play-large';

      if (player.el().offsetWidth > options.largePlayerSize) {
        button.addClass(largeCssClass);
      } else {
        button.removeClass(largeCssClass);
      }
    }

    // Create the CSS class name for the button
    button.addClass('vjs-splash-play');
    const buttonClassName = player.isAudio() ?
      `${options.cssClassPrefix}-audio` :
      `${options.cssClassPrefix}-play`;

    button.addClass(options.cssClassPrefix);
    button.addClass(buttonClassName);

    // When the player is playing, hide the button
    player.on('play', hideButton);

    resize();
    player.on('playerresize', resize);
  });
};

// Register the plugin with video.js.
registerPlugin('splashPlay', splashPlay);

// Include the version number.
splashPlay.VERSION = '__VERSION__';

export default splashPlay;
