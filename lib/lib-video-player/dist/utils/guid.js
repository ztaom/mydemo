"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newGUID = newGUID;
/**
 * Unique ID for an element or function
 * @type {Number}
 * @private
 */
var _guid = 1;

/**
 * Get the next unique ID
 *
 * @return {String} 
 * @function newGUID
 */
function newGUID() {
  return _guid++;
}