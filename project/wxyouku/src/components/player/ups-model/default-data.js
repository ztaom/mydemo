/**
 * 播放服务数据
 * clientIp String 用户ip
 * playerSessionId String 播放服务生成标记唯一一次播放
 * isUpsLoadedAd Boolean 播放服务是否加载前贴广告
 */
const DefaultUPSData = {
  clientIp: '',
  psid: '',
  isUpsLoadedAd: false
};
/**
 * 错误数据
 * code  String  错误码
 * link  String  跳转链接
 * note  String  错误提示
 */
const DefaultErrorData = {
  code: '',
  link: '',
  note: ''
};
/**
 * 视频数据
 * id int 视频数字ID
 * encodeId  String  视频编码ID
 * title  String  视频标题
 * duration  Number  视频长度，单位：秒
 * videoType String 视频类型 媒资／UGC／PGC
 * isShare Boolean 是否广告分成视频 type中包涵 share && share_type = ad
 * isDanmaku  Boolean 是否弹幕视频
 * isPanorama Boolean 是否全景视频
 * isFee Boolean 是否付费视频
 * isChannelVip Boolean 是否自频道视频
 * isSubscribe Boolean 是否为订阅视频 trialData.type = subscribe && privacy = follower
 * isRtmp Boolean 是否为Rtmp视频
 * isLimition Boolean 是否限播
 * categoryId 视频分类id
 * categoryString 视频二级分类
 * tags 视频标签
 * coverURL String 封面图
 */
const DefaultVideoData = {
  id: 0,
  encodeId: '',
  title: '',
  duration: 0,
  videoType: '',
  isShareAd: false,
  isDanmaku: false,
  isPanorama: false,
  isFee: false,
  isChannelVip: false,
  isSubscribe: false,
  isRtmp: false,
  isTrial: false,
  categoryId: 0,
  categoryLetterId: '',
  categoryString: '',
  tags: [],
  coverURL: ''
};
/**
 * 视频试看数据
 * time int 试看时长，单位：秒
 * type String 试看类型
 * note String 试看提示
 */
const DefaultTrialData = {
  type: '',
  time: 0,
  note: ''
};
/**
 * 单分片信息
 * duration 分片时长 单位：s
 * index 分片索引
 * size 分片大小
 * cdnURL cdn地址
 * backupURL cdn备份地址
 */
const DefaultSegmentData = {
  seconds: 0,
  index: -1,
  size: 0,
  src: '',
  backupURL: ''
};

const DefaultPlayListData = {
  upsData: null,
  errorData: null,
  videoData: null,
  trialData: null,
  isError: false
};

export {
  DefaultUPSData,
  DefaultErrorData,
  DefaultVideoData,
  DefaultTrialData,
  DefaultSegmentData,
  DefaultPlayListData
};
