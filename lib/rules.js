'use strict';

var DLE = 0x10;
var ESC = 0x1B;
var FS = 0x1C;
var GS = 0x1D;

var CAN = 0x18;
var FF = 0x0C;

var S_EOT = String.fromCharCode(0x04);
var S_END = String.fromCharCode(0x05);
var S_DC4 = String.fromCharCode(0x14);
var S_FF = String.fromCharCode(0x0C);
var S_SP = String.fromCharCode(0x20);

// 命令字符, 设定值长度, 数据长度函数

var rules = module.exports = {};

rules[FF] = 0;
rules[CAN] = 0;

// 命令字符, 设定值长度, 数据长度函数
rules[ESC] = {
  FF: 0,
  SP: 1,
  '!': 1,
  '$': 2,
  '%': 1,
  '&': [0, 'ycc'],
  '*': [1, 'd16'],
  '-': 1,
  '2': 0,
  '3': 1,
  '=': 1,
  '?': 1,
  '@': 0,
  'D': [0, 'escd'],
  'E': 1,
  'G': 1,
  'J': 1,
  'L': 0,
  'M': 1,
  'R': 1,
  'S': 0,
  'T': 1,
  'V': 1,
  'W': 8,
  '\\': 2,
  'a': 1,
  'c': 2,
  'd': 1,
  'p': 3,
  't': 1,
  '{': 1,
  'B': 2, // Unknown Command
  'Z': [3, 'd16']
};

var S_DC41 = S_DC4 + '1';
var S_DC42 = S_DC4 + '2';
var S_DC48 = S_DC4 + '8';

rules[DLE] = {
  S_EOT: 1,
  S_END: 1,
  S_DC41: 2,
  S_DC42: 2,
  S_DC48: 7
};

rules[FS] = {
  'g1': [5, 'd16'],
  'g2': 7,
  '!': 1,
  '&': 0,
  '-': 1,
  '.': 0,
  '2': 74,
  'C': 1,
  'S': 2,
  'W': 1,
  'p': 2,
  'q': [0, 'fsq']
};

rules[GS] = {
  '!': 1,
  '$': 2,
  '(A': [0, 'd16'],
  '(D': [0, 'd16'],
  '(E': [0, 'd16'],
  '(H': [0, 'd16'],
  '(K': [0, 'd16'],
  '(L': [0, 'd16'],
  '8L': [0, 'd32'],
  '(N': [0, 'd16'],
  '*': [0, 'xy'],
  '/': 1,
  ':': 0,
  'B': 1,
  'H': 1,
  'I': 1,
  'L': 2,
  'P': 2,
  'V': [0, 'gsV'],
  'W': 2,
  '\\': 2,
  '^': 3,
  'a': 1,
  'b': 1,
  'f': 1,
  'g': 4,
  'h': 1,
  'k': [0, 'gsk'],
  'r': 1,
  'w': 1,
  'v': [2, 'gsv'],
  FF: 0,
  '#': 1,

  // SPRT code 2d type set
  'Z': 1
};
