'use strict';

/**
 * @return {number}
 */
exports.d16 = exports.data16 = function data(buf, offset) {
  if (buf.length < offset + 2) return buf.length - offset;
  return 2 + buf.readUInt16LE(buf, offset);
};

exports.d = exports.data = exports.d16;

/**
 * @return {number}
 */
exports.d32 = exports.data32 = function data32(buf, offset) {
  if (buf.length < offset + 4) return buf.length - offset;
  return 4 + buf.readUInt32LE(buf, offset);
};

/**
 * @return {number}
 */
exports.gsv = function gsv(buffer, offset) {
  var m = buffer[offset];
  if (m === 0 || m === 48 || m === 1 || m === 49) return 1;
  return 2;
};
