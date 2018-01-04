/*
  This is a bare-bones, no-bullshit
  example of using browserify + npm.
 */

// Our third-party dependency from npm
const Tone = require('tone');

// An example of ToneJS
const synth = new Tone.SimpleSynth().toMaster();

// Setup events
window.addEventListener('touchstart', beep);
window.addEventListener('mousedown', beep);

function beep (ev) {
  ev.preventDefault()
  synth.triggerAttackRelease('C4', '8n');
}

// You can also use built-in Node modules
const url = require('url');

// e.g.
console.log(url.parse(window.location.href));
