import { DefaultTrialData } from './default-data';
import Utils from './utils';
/**
 * 试看数据
 */
class TrialData {
  constructor(data) {
    for (const key in DefaultTrialData) {
      this[`_${key}`] = DefaultTrialData[key];
      Utils.defineGetter(this, key);
    }

    if (data) {
      this._resetTrialData(data);
    }
  }
  /**
   * 重置专辑数据
   * @param {Object} data 播放服务返回
   */
  _resetTrialData(data) {
    let _time = 0;
    if (data.hasOwnProperty('type')) {
      this._type = data.type;
    }
    if (data.hasOwnProperty('note')) {
      this._note = data.note;
    }

    switch (this._type) {
      case 'episodes':
      case 'cannot':
        _time = 0;
        break;
      case 'time':
      case 'subscribe':
      case 'h5':
      case 'zhuanti':
        if (data.hasOwnProperty('time')) {
          _time = data.time;
        }
        break;
      default:
        _time = 0;
        break;
    }
    this._time = _time;
  }
}

export default TrialData;
