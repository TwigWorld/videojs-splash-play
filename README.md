# videojs-splash-play

Replaces the default videojs play icon with a custom icon for video and audio players

## Installation

```sh
npm install --save videojs-splash-play
```

The npm installation is preferred, but Bower works, too.

```sh
bower install  --save videojs-splash-play
```

## Usage

To include videojs-splash-play on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-splash-play.min.js"></script>
<script>
  var player = videojs('my-video');

  player.splashPlay();
</script>
```

### Browserify

When using with Browserify, install videojs-splash-play via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-splash-play');

var player = videojs('my-video');

player.splashPlay();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-splash-play'], function(videojs) {
  var player = videojs('my-video');

  player.splashPlay();
});
```

## License

MIT. Copyright (c) Adam Oliver &lt;mail@adamoliver.net&gt;


[videojs]: http://videojs.com/
