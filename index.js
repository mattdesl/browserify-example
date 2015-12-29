/*
  This is a bare-bones, no-bullshit
  example of using browserify + npm.
 */

// Require some modules
var url = require('url');   // Node built-in
var Tone = require('tone'); // installed from npm

// An example of ToneJS
var synth = new Tone.SimpleSynth().toMaster();

// Setup events
window.addEventListener('touchstart', beep);
window.addEventListener('mousedown', beep);

function beep (ev) {
  ev.preventDefault()
  synth.triggerAttackRelease('C4', '8n');
}

// Small example of using a Node built-in
console.log(url.parse(window.location.href));
