import videojs from 'video.js';

export default function splashPlayButton(options) {

    // Combine defaults with passed in options
    const DEFAULT_OPTIONS = {
        cssClassPrefix: 'icon',
        largePlayerSize: 500
    }
    options = Object.assign(DEFAULT_OPTIONS, options);

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
        hideButton();
    }

    function hideButton () {
        splashButton.style.display = 'none'
    }

    function resize () {
        // Add an additional class to the button if the player is larger
        let button = $(`#${player.id()}`).find('.vjs-splash-play');
        let largeCssClass = 'vjs-splash-play-large';

        if (player.el().offsetWidth > options.largePlayerSize) {
            button.addClass(largeCssClass);
        } else {
            button.removeClass(largeCssClass);
        }
    }
}

videojs.plugin('splashPlayButton', splashPlayButton);