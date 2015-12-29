/*
  This is a bare-bones, no-bullshit
  example of using browserify + npm.
 */

// Our third-party dependency from npm
var Tone = require('tone');

// An example of ToneJS
var synth = new Tone.SimpleSynth().toMaster();

// Setup events
window.addEventListener('touchstart', beep);
window.addEventListener('mousedown', beep);

function beep (ev) {
  ev.preventDefault()
  synth.triggerAttackRelease('C4', '8n');
}

// You can also use built-in Node modules
var url = require('url');

// e.g.
console.log(url.parse(window.location.href));
