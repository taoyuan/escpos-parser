'use strict';

var iconv = require('iconv-lite');
iconv.extendNodeEncodings();

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('GB2312');
var data = require('./data');
var Parser = require('../').Parser;

var parser = new Parser();

var content = parser.parse(data);

console.log(decoder.write(new Buffer(content)));
