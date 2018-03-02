import { DefaultUPSData } from './default-data';
import Utils from './utils';
/**
 * ups数据
 */
class UPSData {
  constructor(data) {
    for (const key in DefaultUPSData) {
      this[`_${key}`] = DefaultUPSData[key];
      Utils.defineGetter(this, key);
    }

    if (data) {
      this._resetUpsData(data);
    }
  }
  /**
   * 重置数据
   * @param {Object} data 播放服务返回
   */
  _resetUpsData(data) {
    if (data.hasOwnProperty('ups_client_netip')) {
      this._clientIp = data.ups_client_netip;
    }
    if (data.hasOwnProperty('psid')) {
      this._psid = data.psid;
    }
    if (data.hasOwnProperty('pcad')) {
      this._isUpsLoadedAd = data.pcad;
    }
  }
}

export default UPSData;
