const lockClicked = (self) => {
  self.buttonClicked = true
  setTimeout(() => {
    self.buttonClicked = false
  }, 500)
};
/**
 * 格式化数字
 * @param {Int} num
 */
const formatNumber = (num) => {
  if (num >= 10000 && num < 100000000) {
    num = num / 10000;
    num = `${num.toFixed(1).toString().replace('.0', '')}万`;
  } else if (num >= 100000000) {
    num = num / 100000000;
    num = `${num.toFixed(1).toString().replace('.0', '')}亿`;
  }
  return num;
};
/**
 * 格式化字符串
 * @param {String} str
 */
const formatString = (str) => {
  let strlen = 0;
  let substr = '';
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      // 如果是汉字，则字符串长度加2
      strlen += 2;
    } else {
      strlen++;
    }
  }
  if (strlen > 28) {
    substr = str.substring(0, 28);
    substr = `${substr}...`;
  } else {
    substr = str.substring(0, strlen);
  }
  return substr;
}
const changeHttps = (link) => {
  if (link && link.indexOf('http://') === 0) {
    link = link.replacce('http://', 'https://');
  }
  return link;
}
export {
  lockClicked, formatNumber, formatString, changeHttps
}
