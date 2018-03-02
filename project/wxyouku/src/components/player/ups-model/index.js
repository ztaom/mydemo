import UseData from './ups-data';
import ErrorData from './error-data';
import VideoData from './video-data';
import TrialData from './trial-data';
import StreamsData from './streams-data';
import { DefaultPlayListData } from './default-data';
import Utils from './utils';
/**
 * ups接口返回数据
 * @author
 */
class PlayListData {
  constructor(data) {
    if (!data) {
      return null;
    }

    // 原始数据
    this._playlistData = data;

    this._upsData = new UseData(data.ups);

    if (data.error) {
      this._isError = true;
    }
    this._errorData = new ErrorData(data.error);

    this._videoData = new VideoData(data.video, data.trial);
    // 可选
    this._trialData = new TrialData(data.trial);
    // 视频流
    this._streamsData = new StreamsData(data.stream, data.dvd);
    for (const key in DefaultPlayListData) {
      Utils.defineGetter(this, key);
    }
  }
  /**
   * 获取原始数据
   */
  get playlistData() {
    return this._playlistData;
  }
  /**
   * 获取视频流数据
   */
  get streamsData() {
    return this._streamsData.streamData;
  }
  /**
   * 获取语言清晰度列表
   * @param {String} type
   */
  getMediaStreamData(type = 'flv') {
    return this._streamsData.getMediaStreamData(type);
  }
}

export default PlayListData;
