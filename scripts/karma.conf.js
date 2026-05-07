const generate = require('videojs-generate-karma-config');

module.exports = function(config) {

  // see https://github.com/videojs/videojs-generate-karma-config
  // for options
  const options = {
    browsers(aboutToRun) {
      // Restrict to headless Chrome — Safari cannot launch via AppleScript in CI/sandboxed environments.
      return aboutToRun.filter((launcher) => (/^(Chrome|Firefox)Headless$/).test(launcher));
    }
  };

  config = generate(config, options);

  // any other custom stuff not supported by options here!
};
