import { DefaultErrorData } from './default-data';
import Utils from './utils';
/**
 * 错误数据重构
 */
class ErrorData {
  constructor(data) {
    for (const key in DefaultErrorData) {
      this[`_${key}`] = DefaultErrorData[key];
      Utils.defineGetter(this, key);
    }

    if (data) {
      this._resetErrorData(data);
    }
  }
  /**
   * 重置专辑数据
   * @param {Object} data 播放服务返回
   */
  _resetErrorData(data) {
    if (data.hasOwnProperty('code')) {
      this._code = data.code;
    }
    if (data.hasOwnProperty('link')) {
      this._link = data.link;
    }
    if (data.hasOwnProperty('note')) {
      this._note = data.note;
    }
  }
}

export default ErrorData;
