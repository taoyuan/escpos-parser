'use strict';

var iconv = require('iconv-lite');
var Parser = require('../').Parser;

var parser = new Parser();

var result;

result = parser.parse(require('./receipt1'));
console.log('[receipt1]');
console.log(result.commands);
console.log(iconv.decode(result.content, 'GB2312'));
console.log('****************************');

result = parser.parse(require('./receipt2'));
console.log('[receipt2]');
console.log(result.commands);
console.log(iconv.decode(result.content, 'GB2312'));
console.log('****************************');
