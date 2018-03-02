/**
 * get accuracy value
 * @param  {number|string} value
 * @return {number}
 */
export function accuracy(value) {
    return parseFloat(parseFloat(value).toFixed(6));
}

/**
 * convert degree to radian
 * @param  {number} degree
 * @return {number} radian
 */
export function deg2rad(degree) {
    return degree / 180 * Math.PI;
}