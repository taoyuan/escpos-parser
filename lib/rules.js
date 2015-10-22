'use strict';

var DLE = 0x10;
var ESC = 0x1B;
var FS  = 0x1C;
var GS  = 0x1D;

var CAN = 0x18;
var FF  = 0x0C;

var EOT = String.fromCharCode(0x04);

// 命令字符, 设定值长度, 数据长度函数


var rules = module.exports = {};

rules[FF] = 0;
rules[CAN] = 0;

rules[DLE] = {

};

rules[ESC] = {
  '@': 0,
  'p': 3,
  '!': 1,
  'B': 2, // unknown command
  '*': [1, 'data'],
  '-': 1,
  '2': 0
};
rules[FS] = {
  '!': 1
};
rules[GS] = {
  'V': 'gsv'
};
