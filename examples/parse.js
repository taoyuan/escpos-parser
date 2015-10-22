'use strict';

var iconv = require('iconv-lite');
iconv.extendNodeEncodings();

var data = require('./data');
var Parser = require('../').Parser;

var parser = new Parser();

var content = parser.parse(data);

console.log(content.toString('GB2312'));
