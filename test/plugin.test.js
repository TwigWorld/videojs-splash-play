import document from 'global/document';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';

const Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-splash-play', {

  beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },

  afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.splashPlay,
    'function',
    'videojs-splash-play plugin was registered'
  );

  this.player.splashPlay();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.equal(
    1,
    this.player.contentEl().getElementsByClassName('vjs-splash-play').length,
    'The plugin should create a splash play button element'
  );
});

QUnit.test('adds the default class to the player', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.splashPlay,
    'function',
    'videojs-splash-play plugin was registered'
  );

  this.player.splashPlay();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const icon = this.player.contentEl().getElementsByClassName('icon-play')[0];

  assert.ok(
    icon,
    'The plugin should create an icon element with the default css class'
  );
});

QUnit.test('adds a custom class to the player', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.splashPlay,
    'function',
    'videojs-splash-play plugin was registered'
  );

  this.player.splashPlay({
    cssClassPrefix: 'custom'
  });

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const icon = this.player.contentEl().getElementsByClassName('custom-play')[0];

  assert.ok(
    icon,
    'The plugin should create an icon element with the custom css class'
  );
});

QUnit.test('adds a class to the icon when the video is large', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.splashPlay,
    'function',
    'videojs-splash-play plugin was registered'
  );

  this.player.splashPlay();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const icon = this.player.contentEl().getElementsByClassName('vjs-splash-play-large')[0];

  assert.ok(
    icon,
    'The plugin should add a css class to the icon when the player is large'
  );

});

QUnit.test('removes a class on the icon when the video is small', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.splashPlay,
    'function',
    'videojs-splash-play plugin was registered'
  );

  this.player.el().style.height = '100px';
  this.player.el().style.width = '100px';

  this.player.splashPlay();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const icon = this.player.contentEl().getElementsByClassName('vjs-splash-play-large')[0];

  assert.notOk(
    icon,
    'The plugin should add a css class to the icon when the player is large'
  );
});
