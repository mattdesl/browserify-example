# browserify-example

This is a bare-bones, no-bullshit example of building a static JavaScript demo with [budo](https://github.com/mattdesl/budo) and [browserify](https://github.com/substack/node-browserify).

The demo plays a synth sound with WebAudio and [ToneJS](https://github.com/Tonejs/Tone.js).

[<img src="http://i.imgur.com/Ocb4CVv.png" width="75%" />](https://mattdesl.github.io/browserify-example)

Click [here](https://mattdesl.github.io/browserify-example) to see the live demo. The source is [here](./index.js).

## Motivation

This template is for developers looking to tinker with JavaScript and npm modules, without getting caught up in Gulp/Grunt scripts, Webpack configuration, React/Angular/etc, and other [complex modern practices](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4#.t213ju5oj). It tries to Keep It Simple, Stupid (KISS) without sacrificing the developer experience.

It is the workflow I use for [prototyping](http://mattdesl.svbtle.com/some-javascript-sketches) with WebGL, canvas, and other APIs.

This demo uses [ToneJS](https://www.npmjs.com/package/tone) to interface with WebAudio, but this workflow supports many npm modules such as:

- [pixi.js](https://www.npmjs.com/package/pixi.js)
- [lodash](https://www.npmjs.com/package/lodash)
- [xhr](https://www.npmjs.com/package/xhr)
- [object-assign](https://www.npmjs.com/package/object-assign)
- [three](https://www.npmjs.com/package/three) (ThreeJS)
- [dom-css](https://www.npmjs.com/package/dom-css)

It uses [budo](https://github.com/mattdesl/budo) for development and bundles to a static JavaScript file with [browserify](https://github.com/substack/node-browserify) and [uglify-js](http://npmjs.com/package/uglify-js). It uses plain ES5 JavaScript (no transpilers) and CSS for styles, but I've included some instructions on [ES2015 Transpiling](#es2015-transpiling).

## Quick Start

You can clone this template for a quick start, or follow the [Custom Setup](#custom-setup) to get this working from scratch.

First, make sure `git`, `npm` (v3 or higher), and `node` (v6 or higher) is installed. It's recommended to download the latest versions of these tools.

Now clone this repo and `cd` into it, then install the project's dependencies:

```sh
git clone https://github.com/mattdesl/browserify-example.git
cd browserify-example

# now install dependencies
npm install
```

> :bulb: Also make sure you've fixed your [npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions) so you don't need to prefix everything with `sudo`

Now you can run the development server:

```sh
npm run start
```

It will start a development server on [http://localhost:9966/](http://localhost:9966/). Now, when you save the [./index.js](./index.js) file, the browser page will reload. When you change [./style.css](./style.css), the changes will be injected into the page.

You can publish a `bundle.js` file with the following command:

```sh
npm run build
```

Then, your static site is ready for a host like `gh-pages`, [surge.sh](https://surge.sh/) or DropBox.

## Custom Setup

The above will get you started immediately, but you might be left wondering how this project was set up. Here's how you can do it from scratch.

### boilerplate

Create a new folder and move into it:

```sh
mkdir my-app
cd my-app
```

Stub a new `package.json` file, you can just use default answers if you like:

```sh
npm init
```

Now create an `index.js` file, something like this:

```js
var url = require('url');
console.log(url.parse(window.location.href));
```

### dependencies

Once you've got a `package.json`, run the following:

```sh
# install our client-side dependencies
npm install tone --save

# install some build/dev tools
npm install budo browserify uglify-js --save-dev
```

It might take a couple minutes to install. Once finished, it should update your `package.json` with the new dependencies.

### scripts

Next, add a `"scripts"` field to your `package.json` file: 

```json
  "scripts": {
    "start": "budo index.js:bundle.js --live",
    "build": "browserify index.js | uglifyjs -cm > bundle.js"
  }
```

Now you can start the dev server:

```sh
npm run start
```

Open [http://localhost:9966/](http://localhost:9966/) and you should see our `console.log` in the DevTools.

> :bulb: You can also run [budo from the command-line](https://github.com/mattdesl/budo/blob/master/docs/command-line-usage.md) for quick development.

### release

To release, you need an [index.html](./index.html) and optional [style.css](./style.css). Make sure the HTML includes a `<script>` tag like so:

```html
...
<body>
  <!-- used by dev/build script -->
  <script src="bundle.js"></script>
</body>
```

You can run the following to build a static JavaScript bundle, ready for `gh-pages` or your host of choice!

```sh
npm run build
```

If you plan to put your project on GitHub, you might want to include a `.gitignore` to avoid including any npm dependencies.

```
bower_components
node_modules
*.log
.DS_Store
```

### ES2015 Transpiling

<sup>*(this step is optional)*</sup>

Follow these steps to add ES2015 support, using [Babel](https://babeljs.io).

Install [babelify](http://npmjs.com/package/babelify) (browserify transform for Babel) and a ES2015 language preset.

```sh
npm install babelify babel-preset-es2015 --save-dev
```

Add a `.babelrc` file to the directory:

```js
{
  presets: [ "es2015" ]
}
```

From here, you have two options.

##### Option A: Package Transforms

Add a `"browserify"` field to your `package.json` configuration:

```js
  ...
  "browserify": {
    "transform": [ "babelify" ]
  }
```

This is convenient, but not always the best course if you are building a *module* or library.

##### Option B: Explicit Transforms

Alternatively, you can explicitly list the transforms during the dev/build step. Use the `--transform` or `-t` flag:

```js
  "scripts": {
    "start": "budo index.js:bundle.js --live -- -t babelify",
    "build": "browserify index.js -t babelify | uglifyjs -cm > bundle.js"
  }
```

> :bulb: budo assumes all options after `--` are for browserify. 

### further reading

For more details on this workflow and its tools, including how to publish to `gh-pages`:

- [Rapid Prototyping](http://mattdesl.svbtle.com/rapid-prototyping) with budo + browserify
- [budo command-line usage](https://github.com/mattdesl/budo/blob/master/docs/command-line-usage.md)
- [browserify-handbook](https://github.com/substack/browserify-handbook)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/browserify-example/blob/master/LICENSE.md) for details.
