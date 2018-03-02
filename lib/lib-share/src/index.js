/*!
 * by 山兔
 * Date: 2017.09.05
 */

/* eslint-disable */
let _mtop = '';
try {
    if (window.lib && window.lib.mtop) {
        _mtop = window.lib.mtop;
    } else {
        _mtop = require('@ali/lib-mtop');
    }
} catch (error) {
    console.log(error);
}

_mtop.config.prefix = 'acs';
_mtop.config.subDomain = '';
_mtop.config.mainDomain = 'youku.com';
//方式一
//监听方式
function listenerInit(config){
    document.addEventListener("WeixinJSBridgeReady", function onBridgeReady(){
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(){
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid"      : '',
                "img_url"    : config.shareImage,
                "img_width"  : "640",
                "img_height" : "640",
                "link"       : config.link,
                "desc"       : config.desc,
                "title"      : config.title
            }, function() { });
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(){
            WeixinJSBridge.invoke('shareTimeline',{
                "appid"      : '',
                "img_url"    : config.shareImage,
                "img_width"  : "640",
                "img_height" : "640",
                "link"       : config.link,
                "desc"       : config.desc,
                "title"      : config.timelineTitle
            }, function() { });
        });
    }, false);
}
//方式二
//微信分享JSSDK
const WxJssdk = {
	initData: null,
	init:function(initData){
        WxJssdk.initData = initData;
        const promise = _mtop.request({
            //通用参数
            api: 'mtop.youku.mplay.weixin.getWeixinJssdk',
            v: '1.0',
            ecode: 0,
            appKey: "23774304",
            H5Request: true,
            dataType: "json",
            data: {link:encodeURIComponent(location.href)}
        });
        promise.then(data => {
            WxJssdk.callback(data)
        },data => {
            console.log('getWeixinJssdk fail')
        });
	},
	callback:function(data){
        const reg = /test=1/i;
        const flag_debug = reg.test(window.location.href);
		wx.config({
		    debug: flag_debug,
		    appId: data.appId,
		    timestamp: data.timestamp,
		    nonceStr: data.nonceStr,
		    signature: data.signature,
		    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone']
		});
		wx.ready(function(){
			WxJssdk.shareTimeline();
			WxJssdk.shareAppMessage();
			WxJssdk.shareQQ();
			WxJssdk.shareQZone();
		});
	},
	//分享到朋友圈
	shareTimeline:function(){
        var data = WxJssdk.initData;
		wx.onMenuShareTimeline({
            title: data.timelineTitle,
            desc: data.desc,
		    link: data.link,
		    imgUrl: data.shareImage,
		    success: function () {},
		    cancel: function () {}
		});
	},
	//分享给好友
	shareAppMessage:function(){
		var data = WxJssdk.initData;
		wx.onMenuShareAppMessage({
		    title: data.title,
		    desc: data.desc,
		    link: data.link,
		    imgUrl: data.shareImage,
		    success: function () {},
		    cancel: function () {}
		});
	},
	//分享到QQ
	shareQQ:function(){
        var data = WxJssdk.initData;
		wx.onMenuShareQQ({
		    title: data.title, // 分享标题
		    desc: data.desc, // 分享描述
		    link: data.link, // 分享链接
		    imgUrl: data.shareImage, // 分享图标
		    success: function () {}
		});
	},
	//分享到QQ空间
	shareQZone:function(){
		var data = WxJssdk.initData;
		wx.onMenuShareQZone({
		    title: data.title, // 分享标题
		    desc: data.desc, // 分享描述
		    link: data.link, // 分享链接
		    imgUrl: data.shareImage, // 分享图标
		    success: function () {}
		});
	}
};
//钉钉分享
const DingTalk = {
    initData:null,
    init:function(initData){
		try{
            DingTalk.initData = initData;
			dd.ready(function() {
                const data = DingTalk.initData;
				dd.biz.navigation.setRight({
					show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
	                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
	                text: '',//控制显示文本，空字符串表示显示默认文本
	                onSuccess : function(result) {
						dd.biz.util.share({
							type: 0,//分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
							url: data.link,
							title: data.title,
							content: data.desc,
							image: data.shareImage,
							onSuccess : function() {},
							onFail : function(err) {}
						});
	                },
	                onFail : function(err) {}
				});
                dd.biz.navigation.setTitle({
                    title : data.title,
                    onSuccess : function(result) {},
                    onFail : function(err) {}
                });
			});
		}catch(e){
			console.log(e);
		}
	}
};
export default function shareH5( cfg = {} ){
    const ua = window.navigator.userAgent;
    let config = cfg;
    config.title = config.title || window.document.title;
    config.timelineTitle = config.timelineTitle || config.title || window.document.title; //朋友圈title
    config.desc = config.desc || '该视频来自「优酷」中国领先的视频网站,为您提供高清,流畅的视频体验';
    config.link = config.link || window.location.href;
    config.shareImage = config.shareImage || 'https://static.youku.com/h5/html/share/images/h5_300x300.png';
    if (/MicroMessenger/i.test(ua)) {
        listenerInit(config);
        WxJssdk.init(config);
    } else if (/DingTalk/i.test(ua)){
        DingTalk.init(config);
    }
}
window.shareH5 = shareH5;
