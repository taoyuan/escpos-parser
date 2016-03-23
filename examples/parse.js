'use strict';

var _ = require('lodash');
var iconv = require('iconv-lite');
var Parser = require('../').Parser;

var parser = new Parser();

var result;

// receipt 1
var buffer = require('./fixtures/1');
result = parser.parse(buffer);
console.log('[receipt1]');
console.log(result.commands);
console.log(iconv.decode(result.content, 'GB2312'));
console.log('****************************');

var commands = result.commands;
var command = _.find(commands, function (cmd) { // find cut command
  return cmd.ctrl === 'GS' && cmd.fn === 'V';
});

if (command) {
  console.log('Found cut command:');
  console.log(command);
} else {
  console.log('Not found cut command:');
}

console.log('****************************');

// receipt 2

result = parser.parse(require('./fixtures/2'));
console.log('[receipt2]');
console.log(result.commands);
console.log(iconv.decode(result.content, 'GB2312'));
console.log('****************************');
