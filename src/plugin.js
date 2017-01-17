import videojs from 'video.js';

// Default options for the plugin.
const defaults = {
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
const splashPlay = function(options) {
  this.ready(() => {
    options = videojs.mergeOptions(defaults, options);

    let player = this;
    let splashButton = document.createElement("div");

    // Create the CSS class name for the button
    splashButton.className = "vjs-splash-play";
    let buttonClassName = player.isAudio() ?
        `${options.cssClassPrefix} ${options.cssClassPrefix}-audio` :
        `${options.cssClassPrefix} ${options.cssClassPrefix}-play`;
    splashButton.className += ` ${buttonClassName}`;

    // Play on click
    splashButton.addEventListener('click', play);

    // Add the button to the player
    player.el().appendChild(splashButton);

    // When the player is playing, hide the button
    player.on('play', hideButton);

    resize();

    window.addEventListener('resize', resize, true);

    function play () {
        player.play();
    }

    function hideButton () {
        splashButton.style.display = 'none'
    }

    function resize () {
        // Add an additional class to the button if the player is larger
        let button = document.querySelectorAll(`#${player.id()} .vjs-splash-play`);
        let largeCssClass = 'vjs-splash-play-large';

        if (player.el().offsetWidth > options.largePlayerSize) {
            button[0].classList.add(largeCssClass);
        } else {
            button[0].classList.remove(largeCssClass);
        }
    }

  });
};

// Register the plugin with video.js.
videojs.plugin('splashPlay', splashPlay);

// Include the version number.
splashPlay.VERSION = '__VERSION__';

export default splashPlay;
