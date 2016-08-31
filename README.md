# mead-client

[![npm version](http://img.shields.io/npm/v/mead-client.svg?style=flat-square)](http://browsenpm.org/package/mead-client)[![Build Status](http://img.shields.io/travis/rexxars/mead-client/master.svg?style=flat-square)](https://travis-ci.org/rexxars/mead-client)[![Coverage Status](https://img.shields.io/coveralls/rexxars/mead-client/master.svg?style=flat-square)](https://coveralls.io/github/rexxars/mead-client)[![Dependency status](https://img.shields.io/david/rexxars/mead-client.svg?style=flat-square)](https://david-dm.org/rexxars/mead-client)

Javascript client for the [Mead image service](https://github.com/rexxars/mead).

## Installation

```shell
npm install --save mead-client
```

## Usage

```js
var MeadClient = require('mead-client');
var client = new MeadClient({
    host: 'https://sourceName.mead.host',
    token: 'secureUrlToken' // Or skip this if you don't sign your requests
});

var imageUrl = client.getUrl('/path/to/image.png', {w: 1280, h: 720})
```

## Browser usage

The NPM package ships with an UMD-bundle which is optimized for browsers. You can load it from [unpkg](https://unpkg.com/) by referencing the `umd`-field: https://unpkg.com/mead-client?main=umd

It will be available under `window.MeadClient` or as an AMD and CommonJS module under `mead-client`.

## License

MIT-licensed. See LICENSE.
