
import { DefaultVideoData } from './default-data';
import Utils from './utils';
/**
 * 视频基本信息重构
 */
class VideoData {
  constructor(videoData, trialData) {
    for (const key in DefaultVideoData) {
      this[`_${key}`] = DefaultVideoData[key];
      Utils.defineGetter(this, key);
    }

    if (videoData) {
      this._resetVideoData(videoData, trialData);
    }
  }
  /**
   * 重置视频数据
   * @param {Object} videoData 视频数据
   * @param {Object} trialData 试看数据
   */
  _resetVideoData(videoData, trialData) {
    if (videoData.hasOwnProperty('id')) {
      this._id = videoData.id;
    }
    if (videoData.hasOwnProperty('encodeid')) {
      this._encodeId = videoData.encodeid;
    }
    if (videoData.hasOwnProperty('title')) {
      this._title = videoData.title;
    }
    if (videoData.hasOwnProperty('seconds')) {
      this._duration = videoData.seconds;
    }
    if (videoData.hasOwnProperty('ctype')) {
      this._videoType = videoData.ctype;
    }
    if (videoData.hasOwnProperty('logo')) {
      this._coverURL = videoData.logo;
    }
    if (videoData.hasOwnProperty('category_id')) {
      this._categoryId = videoData.category_id;
    }
    if (videoData.hasOwnProperty('category_letter_id')) {
      this._categoryLetterId = videoData.category_letter_id;
    }

    if (videoData.hasOwnProperty('subcategories')) {
      const _array = [];
      let i;
      for (i = 0; i < videoData.subcategories.length; i++) {
        if (videoData.subcategories[i].hasOwnProperty('id')) {
          _array.push(videoData.subcategories[i].id);
        }
      }
      this._categoryString = _array.join('|');
    }
    if (videoData.hasOwnProperty('tags')) {
      this._tags = videoData.tags;
    }

    this._resetVideoTypeData(videoData, trialData);
  }
  /**
   * 重置视频类型数据
   * @param {Object} videoData 视频数据
   * @param {Object} trialData 试看数据
   */
  _resetVideoTypeData(videoData, trialData) {
    if (trialData) {
      this._isTrial = true;
    }
    if (trialData && videoData.hasOwnProperty('privacy')) {
      // 订阅试看视频
      const isSubscribe = trialData.type === 'subscribe';
      const isFollower = videoData.privacy === 'follower';
      if (isSubscribe && isFollower) {
        this._isSubscribe = false;
      }
    }

    if (videoData.hasOwnProperty('transfer_mode')) {
      // 是否rtmp视频
      this._isRtmp = videoData.transfer_mode === 'rtmp';
    }
    if (videoData.hasOwnProperty('type')) {
      // 是否弹幕视频
      const _videoType = videoData.type;
      this._isDanmaku = _videoType.indexOf('bullet') > -1;

      if (videoData.hasOwnProperty('share_type')) {
        // 是否广告分成视频
        const isShare = _videoType.indexOf('share') > -1;
        if (isShare && videoData.share_type === 'ad') {
          this._isShareAd = true;
        }
      }
      // 全景视频
      this._isPanorama = _videoType.indexOf('panorama') > -1;
      // 付费视频
      this._isFee = _videoType.indexOf('fee') > -1;
      // 自频道视频
      this._isChannelVip = _videoType.indexOf('channel_vip') > -1;
    }
  }
}

export default VideoData;
