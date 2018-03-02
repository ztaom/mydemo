/**
 * 功能：封装Promise，为其提供defer功能
 */

module.exports = function() {
    var result = {};
    result.promise = new Promise(function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
};