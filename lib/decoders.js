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

exports.ycc = function ycc(buf,offset){
  if(buf.length - offset <3) return buf.length;
  var k = buf[offset+2]-buf[offset+1]+1;
  var num = 3;
  for(var i=0; i<k; i++){
    num+=buf[offset+num]*buf[offset]+1;
  }
  return num;
};

exports.escd = function escd(buf,offset){
  var start = offset;
  while (offset < buf.length) {
    if (buf[offset++] === 0) break;
  }
  return offset - start;
};

exports.xy = function xy(buf,offset){
  if(buf.length - offset <2) return buf.length;
  return 2 + (buf[offset] * buf[offset+1] * 8);
};

/**
 *  GS V
 * @param buf
 * @param offset
 * @returns {*}
 */
exports.gsV = function gsvu(buf,offset){
  if(buf.length - offset <2) return buf.length;
  var m = buf[offset];
  if(m===0 || m===1 || m===48 || m===49) return 1;
  return 2;
};

exports.gsk = function gsk(buf,offset){
  if(buf.length - offset <3) return buf.length;
  if(buf[offset]>=0 && buf[offset]<=6){
    var start = offset;
    while (offset < buf.length) {
      if (buf[offset++] === 0) break;
    }
    return offset - start;
  }else{
    return 2+buf[offset+1];
  }
};

exports.fsq = function fsq(buf,offset){
  if(buf.length - offset <2) return buf.length;
  return 1 + ((buf.readUInt16LE(buf, offset+1) * buf.readUInt16LE(buf, offset+3) * 8 + 4) * buf[offset]);
};

/**
 * GS v
 * @param buf
 * @param offset
 * @returns {*}
 */
exports.gsv = function gsvl(buf,offset){
  if(buf.length - offset <4) return buf.length;
  return 4 + buf.readUInt16LE(buf, offset) * buf.readUInt16LE(buf, offset+2);
};
