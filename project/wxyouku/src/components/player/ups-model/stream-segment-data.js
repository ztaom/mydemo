import { DefaultSegmentData } from './default-data';
import Utils from './utils';
/**
 * 分片数据重构
 */
class StreamSegmentData {
  constructor(index, data) {
    for (const key in DefaultSegmentData) {
      this[`_${key}`] = DefaultSegmentData[key];
      Utils.defineGetter(this, key);
    }
    this._index = index;
    if (data) {
      this._resetSegmentData(data);
    }
  }
  /**
   * 重置分片数据
   * @param {Object} data 播放服务返回
   */
  _resetSegmentData(data) {
    if (data.hasOwnProperty('size')) {
      this._size = data.size;
    }
    if (data.hasOwnProperty('total_milliseconds_video')) {
      this._seconds = parseInt(data.total_milliseconds_video) / 1000;
    }
    if (data.hasOwnProperty('cdn_url')) {
      this._src = data.cdn_url;
      if (data.cdn_url.indexOf('vali') === -1) {
        let cdnArray = data.cdn_url.split('/');
        cdnArray = cdnArray.splice(3, cdnArray.length - 3);
        this._src = 'https://vali.cp31.ott.cibntv.net/' + cdnArray.join('/');
      } else if (data.cdn_url.indexOf('http://') === 0) {
        this._src = data.cdn_url.replace('http://', 'https://');
      }
    }
    if (data.hasOwnProperty('cdn_backup')) {
      if (data.cdn_backup instanceof Array) {
        if (data.cdn_backup.length > 0) this._backupURL = data.cdn_backup[0];
      }
    }
  }
}

export default StreamSegmentData;
