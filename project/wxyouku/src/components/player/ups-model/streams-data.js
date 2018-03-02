import StreamSegmentData from './stream-segment-data';
const QUALITY_STREAM_ORDER = {
  '270p': ['3gphd'],
  '320p': ['mp4sd'],
  '480p': ['mp4hd'],
  '720p': ['mp4hd2v2']
};
const QUALITY_NAME_ORDER = {
  '270p': '省流',
  '320p': '标清',
  '480p': '高清',
  '720p': '超清'
};
/**
 * 流数据重构
 */
class StreamsData {
  constructor(streamData, dvdData) {
    this._streamsData = new Map();
    this._languageData = [];
    if (dvdData && dvdData.audiolang) {
      this._languageData = dvdData.audiolang;
    }
    if (streamData) {
      this._resetStreamData(streamData);
    }
  }
  /**
   * 获取语言清晰度流列表
   */
  getMediaStreamData(type = 'flv') {
    const langData = [];
    this._streamsData.forEach((value, key) => {
      const qualitys = this.getQualityList(key, type);
      if (qualitys.length > 0) {
        const data = {};
        data.id = key;
        data.name = this.getLangCodeToCN(key);

        data.qualityList = qualitys;
        langData.push(data);
      }
    });
    return langData;
  }
  /**
   * 获取清晰度列表
   */
  getQualityList(lang, type = 'flv') {
    const _qualityList = [];
    if (this._streamsData.has(lang)) {
      const tempQu = this._streamsData.get(lang);

      if (type !== 'mp4') {
        for (const key in QUALITY_NAME_ORDER) {
          if (tempQu.has(key)) {
            const st = this.getStreamByQuality(lang, key);
            const _data = this.buildStreamData(key, st);
            _qualityList.push(_data);
          }
        }
      } else {
        for (const tempQuality in QUALITY_NAME_ORDER) {
          if (tempQu.has(tempQuality)) {
            const st = this.getStreamByQuality(lang, tempQuality);
            const _index = QUALITY_STREAM_ORDER[tempQuality].indexOf(st.stream_type);
            if (st.segs && st.segs[0] && st.segs[0].src) {
              if (_index === 0) {
                const _data = this.buildStreamData(tempQuality, st);
                _qualityList.push(_data);
              }
            }
          }
        }
      }
    }
    return _qualityList;
  }
  /**
   * new
   * @param {String} type
   */
  buildStreamData(key, data) {
    const _data = {};
    _data.id = key;
    _data.name = QUALITY_NAME_ORDER[key];
    _data.width = data.width;
    _data.height = data.height;
    _data.duration = data.videoMilliSeconds;
    _data.segs = data.segs;
    _data.streamURL = data.streamURL;
    return _data;
  }
  _resetStreamData(data) {
    let i = 0;
    let j = 0;
    let k = 0;

    let item;
    const langArr = [];
    let lang;
    let audioLanguage = ''; // 语言
    let _defaultQuality = ''; // 清晰度
    // 初始化筛选语言
    for (i = 0; i < data.length; i++) {
      item = data[i];
      lang = item.audio_lang;

      if (langArr.indexOf(lang) === -1) {
        langArr.push(lang);
      }
    }
    // 将不同stream放入对应language
    for (i = 0; i < langArr.length; i++) {
      const videoQualityDict = new Map();
      for (j = 0; j < data.length; j++) {
        let videoStreamDict = new Map();
        item = data[j];
        audioLanguage = item.audio_lang;
        lang = langArr[i];
        if (lang !== audioLanguage) {
          continue;
        }
        _defaultQuality = item.stream_type;

        // 无分片信息及m3u8地址时不存入
        if (!item.segs) {
          continue;
        }
        // 重构分片数据
        let segs = [];

        let size = 0;
        let millisecondsAudio = 0;
        let millisecondsVideo = 0;

        // 根据清晰度返回流类型 一种清晰度可能对应多种流
        const quality = this.getIdByStreamType(_defaultQuality);
        if (quality === '0') {
          continue;
        }
        if (videoQualityDict.has(quality)) {
          videoStreamDict = videoQualityDict.get(quality);
        }
        // 相同清晰度要进行拼接
        if (videoStreamDict.has(_defaultQuality)) {
          segs = videoStreamDict.get(_defaultQuality).segs;
          size = videoStreamDict.get(_defaultQuality).size;
          millisecondsAudio = videoStreamDict.get(_defaultQuality).milliseconds_audio;
          millisecondsVideo = videoStreamDict.get(_defaultQuality).milliseconds_video;
        }
        if (item.size) {
          size += item.size;
        }
        if (item.milliseconds_audio) {
          millisecondsAudio += item.milliseconds_audio;
        }
        if (item.milliseconds_video) {
          millisecondsVideo += item.milliseconds_video;
        }
        for (k = segs.length; k < item.segs.length; k++) {
          const segObj = item.segs[k];
          if (!segObj) {
            break;
          }
          const _videoSegmentData = new StreamSegmentData(k, segObj);
          if (_videoSegmentData.src) {
            segs.push(_videoSegmentData);
          }
        }
        if (item.m3u8_url) {
          item.streamURL = item.m3u8_url;
        }
        item.segs = segs;
        item.size = size;
        item.audioMilliSeconds = millisecondsAudio;
        item.videoMilliSeconds = millisecondsVideo;

        videoStreamDict.set(_defaultQuality, item);

        videoQualityDict.set(quality, videoStreamDict);
      }
      this._streamsData.set(langArr[i], videoQualityDict);
    }
  }
  /**
   * 视频流数据
   */
  get streamData() {
    return this._streamsData;
  }
  /**
   * 根据流类型返回清晰度id
   * @param {String} value 流类型 例：mp4hd
   * 返回对应清晰度id 例：1-4
   */
  getIdByStreamType(_value) {
    let _level;
    for (_level in QUALITY_STREAM_ORDER) {
      const tempArr = QUALITY_STREAM_ORDER[_level];
      if (tempArr.indexOf(_value) !== -1) {
        return _level;
      }
    }
    return '0';
  }
  /**
   * 根据语言code 获取中文
   * @param {String} code 语言code
   */
  getLangCodeToCN(code) {
    let _language = code;
    for (let i = 0; i < this._languageData.length; i++) {
      if (this._languageData[i].langcode === code) {
        _language = this._languageData[i].lang;
      }
    }
    return _language;
  }
  /**
   * 根据语言 清晰度获取视频数据
   * @param {String} lang 语言
   * @param {int} quality 清晰度
   * @return {Array} 视频流数据
   */
  getStreamByQuality(lang, quality) {
    if (this._streamsData.has(lang)) {
      const tempQu = this._streamsData.get(lang);
      if (tempQu.has(quality)) {
        const tempStr = tempQu.get(quality);
        for (let i = 0; i < QUALITY_STREAM_ORDER[quality].length; i++) {
          if (tempStr.has(QUALITY_STREAM_ORDER[quality][i])) {
            return tempStr.get(QUALITY_STREAM_ORDER[quality][i]);
          }
        }
      }
    }
    return {};
  }
}

export default StreamsData;
