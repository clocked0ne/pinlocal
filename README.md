# pinlocal

> PinLocal API wrapper for submitting removal lead data via Node.js

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

## About

This is a Node.js application wrapper for the [PinLocal](https://www.pinlocal.com) API based on their provided API integration sample code, it should allow seamless transaction of form POSTs from your web frontend and response returned by the PinLocal API.

## Install

Requires Node.js `^6.2.2`

```bash
npm install --save pinlocal
```

## Usage

Below is a sample application to get you started, this expects you to provide form data from a website POST to the running application, along with your API Key provided by PinLocal.

```javascript
'use strict';

const http = require('http');
const pinlocal = require('pinlocal');

const PORT = parseInt(process.env.PORT) || 3210;
const API_KEY = process.env.API_KEY;

if (!API_KEY){
	process.exitCode = 1;
	throw new Error('Missing environment variable API_KEY');
}

function processForm (req, res){
	pinlocal(req, API_KEY, (err, response) => {
		console.dir(response);
		if (err){
			res.writeHead(400, { 'content-type': 'application/json' });
			return res.end(JSON.stringify(error));
		}

		res.writeHead(200, { 'content-type': 'application/json' });
		return res.end(JSON.stringify(response));

	});
}

http.createServer((req, res) => {
  if (req.method.toLowerCase() === 'post')
		processForm(req, res);
}).listen(PORT);

console.log('Server listening on port ' + PORT);
```

For full documentation please refer back to your provided PinLocal API integration documentation.

Enjoy responsibly!

## License

```
The MIT License (MIT)

Copyright (c) 2016 clocked0ne

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

[npm-url]: https://npmjs.org/package/pinlocal
[npm-image]: http://img.shields.io/npm/v/pinlocal.svg

[travis-url]: https://travis-ci.org/clocked0ne/pinlocal
[travis-image]: https://travis-ci.org/clocked0ne/pinlocal.svg
