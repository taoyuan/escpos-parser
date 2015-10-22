'use strict';

var util = require('util');
var _ = require('lodash');
var ascii = require('./ascii');
var decoders = require('./decoders');

module.exports = Extractor;

function Extractor(rules) {
  if (!rules) {
    rules = require('./rules');
  }
  this.rules = rules;

  this.rules = _.transform(rules, function (result, group, key) {
    result[key] = _.transform(group, function(result, rule, key) {
      result[key] = Array.isArray(rule) ? rule : [rule];
    });
  });

}

/**
 *
 * @param buffer
 * @param {Boolean} [returnArray]
 * @returns {Buffer|Array}
 */
Extractor.prototype.parse = function (buffer, returnArray) {
  if (!Buffer.isBuffer(buffer)) buffer = new Buffer(buffer);

  var rules = this.rules;
  var content = [];
  var i, byte, group, found;
  var offset = 0;
  while (offset < buffer.length) {
    byte = buffer[offset++];
    group = rules[byte];

    if (_.isNumber(group)) {
      offset += group;
      continue;
    }

    if (group) {
      found = false;

      _.forEach(group, function (rule, key) {
        if (buffer.length < offset + key.length) return;

        found = true;
        for (i = 0; i < key.length; i++) {
          if (key.charCodeAt(i) !== buffer[offset + i]) {
            found = false;
            break;
          }
        }
        if (!found) return;

        offset += key.length;

        _.forEach(rule, function (item) {
          if (_.isString(item)) {
            item = decoders[item.toLowerCase()];
          }

          if (_.isNumber(item)) {
            offset += item;
          } else if (_.isFunction(item)) {
            offset += item(buffer, offset);
          }
        });

        return false;
      });

      if (!found) throw createUnknownDirectiveError(buffer, offset - 1);
    } else {
      content.push(byte);
    }
  }
  return returnArray ? content : new Buffer(content);
};

function createUnknownDirectiveError(buffer, offset) {
  return new Error(util.format('Can not parse commands - [%s %s] <(%d/%d) %s>'
    , ascii[buffer[offset]], ascii[buffer[offset + 1]], offset, buffer.length,
    hex(buffer.slice(offset, Math.min(buffer.length, offset + 10)))));
}

function hex(data, separator) {
  separator = separator || ' ';
  var str = '';
  _.forEach(data, function (b, index) {
    var hex = (b.toString(16));
    str += (hex.length < 2 ? '0' + hex : hex);
    if (separator.length > 0 && index < data.length - 1) {
      str += separator;
    }
  });
  return str;
}
