'use strict';

const validate   = require('./validate');
const request    = require('request');
const formidable = require('formidable');
const form = new formidable.IncomingForm();

const pinLocal = function (req, apiKey, callback){
	form.parse(req, (err, fields) => {
		if (err)
			return callback(err);

		const IP = req.headers['x-forwarded-for']
			|| req.connection.remoteAddress
			|| req.socket.remoteAddress
			|| req.connection.socket.remoteAddress;
		
		fields.ip = fields.ip || IP;
	
		validate(fields, (error, data) => {
			if (error)
				return callback(error);
			
			request.post({
				url: 'http://www.pinlocal.com/api/lead/create/' + data.formType + '/' + apiKey,
				form: data,
				json: true
			}, (err, httpResponse, body) => callback(err, body)
			);
		});

	});
};

module.exports = pinLocal;
