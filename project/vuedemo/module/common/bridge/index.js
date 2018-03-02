/* 优酷 app 能力封装 */

import Browser from '../utils/browser'
import queryString from 'query-string'
import WindVane from './WindVane'

module.exports = {
	/**
	 * 主动调起分享
	 * opts.title 标题
	 * opts.link 链接
	 * opts.img icon图
	 * opts.img_only 安卓分享 true只需要image字段,url无效
	 * 问题1：分享不能配置dec 2：如果从抽屉进去分享出去图片会出现播放标志 3.经测试IOS右上角分享不能自定义...
	**/
	share(opts = {}){
		var reg =new RegExp("http|https");
		opts.link = reg.test(opts.link.substr(0,7).toLowerCase()) ? opts.link : "https:" + opts.link;

		if(Browser.isWindvane){
			WindVane.share(opts);
			return;
		}
		if( Browser.iOS ){
			var prefix = 'youku';
			if( Browser.isPad ){
				prefix = 'youkuhd';
			}
			location.href = prefix + '://jsbshare?title=' + encodeURIComponent(opts.title) + '&weburl=' + encodeURIComponent(opts.link) + '&imageurl=' + encodeURIComponent(opts.img);
		}else{
			if( Browser.iOS ){
				var prefix = 'youku';
				if( Browser.isPad ){
					prefix = 'youkuhd';
				}
				location.href = prefix + '://jsbshare?title=' + encodeURIComponent(opts.title) + '&weburl=' + encodeURIComponent(opts.link) + '&imageurl=' + encodeURIComponent(opts.img);
			}else{
				YoukuJSBridge.showShareView(JSON.stringify({
					title: opts.title,
					url: opts.link,
					image: opts.img,
					img_only: opts.img_only || false
				}));
			}
		}
	},
	/**
	 * 右上角分享--和安卓app开发确认不支持...
	 * 问题1：分享不能配置dec 2：如果从抽屉进去分享出去图片会出现播放标志 3.经测试IOS右上角分享不能自定义...
	 */
	setShareInfo(opts = {}){
		if(Browser.iOS){
			var iOSMoreInfo = {
				url: opts.link || location.href,
				imageurl: opts.img || '',
				title: opts.title
			};
			if(!window.getMoreInfo){
				window.getMoreInfo = function (){
					return {
						show: 'yes',
						otherinfo: iOSMoreInfo
					}
				}
			}
		}else{
			try{
				YoukuJSBridge.setShareInfo(JSON.stringify({
					"url": opts.link || location.href,
					"title": opts.title || document.title,
					"image": opts.img || ""
				}))
			}catch(e){
				console.log('不支持')
			}
		}
	},
	/**
	 * 播放
	 * vid 视频id
	 */
	play(opts = {}){
		var prefix = 'youku';
		var host = 'play';

		if(Browser.iOS){
			if(Browser.isPad){
				prefix = 'youkuhd';	
			}else{
				// iphone的host
				host = 'jsbplay'
			}
		}
		location.href = prefix + '://' + host + '?source=mplaypage&vid=' + opts.vid + (opts.spm ? ('&spm='+opts.spm) : '');
	},
	/**
	 * 显示登录框
	 * opts.duid
	 * opts.weburl
	 * callback
	 */
	showLogin(opts = {}){
		opts.weburl = opts.weburl || location.href;
		if(Browser.isWindvane){
			WindVane.showLogin(opts)
		}else{
			if(Browser.iOS){
				var prefix = Browser.isPad ? 'youkuhd' : 'youku';
				location.href = prefix + '://jsblogin?' + queryString.stringify(opts);
			}else{
				if(opts.callback){
					window.showLoginViewCallback = function(arg){
						opts.callback(arg);
						window.showLoginViewCallback = undefined;
					}
				}
				YoukuJSBridge.showLoginView(JSON.stringify({}));
			}
		}
	},
	/**
	 * 加载url
	 */
	loadUrl(opts = {}){
		var shouldOverride = opts.shouldOverride || false;
        if(Browser.isWindvane){
        	WindVane.loadUrl(opts)
        }else{
        	if(Browser.android){
				var reg =new RegExp("http|https");
				opts.url = reg.test(opts.url.substr(0,7).toLowerCase()) ? opts.url : "http:" + opts.url;
	            YoukuJSBridge.loadUrl('{"url":"' + opts.url + '","shouldOverride":'+shouldOverride+'}')
	        }else if(Browser.iOS){
	            location.href = 'youku://jsbjump?weburl='+encodeURIComponent(opts.url);
	        }
        }
	},
	/**
	 * 跳转上传视频页面
	 */
	uploadVideo(opts = {}){
		if(Browser.iOS){
			var prefix = 'youku';
			if( Browser.isPad ){
				prefix = 'youkuhd';
			}
			location.href = prefix + '://jsbjumpupload';
		}else{
			YoukuJSBridge.showUploadVideoPage(JSON.stringify({
				topic: opts.topic
			}));
		}
	},
	/**
	 * 会员支付
	 */
	vipPay(opts = {}){
		//支付成功回调
		window.doPayCallback = function (params) {
			opts.callback(params);
			window.doPayCallback = undefined;	
		};
		if( Browser.iOS ){
			var prefix = 'youku';
			if( Browser.isPad ){
				prefix = 'youkuhd';
			}
			location.href = prefix + '://jsbpayment'
		}else{
			var url = 'vippay://pay?url_spm_id=xx&r_object_id=xx';
			URL.openURL(url, '_blank');
		}
	},
	/**
	 * 获取UTDID
	 */
	getUtdid(){
		var utdid = ua.replace(/.+UTDID\s*([^;\)]+).*/, '$1');
		// 没有正确的UA
		if(/;/.test(utdid)){
			utdid = '';
		}
		return utdid;
	},
	/**
	 * 获取OUID
	 */
	getOuid(){
		var ouid = ua.replace(/.+OUID\s*([^;\)]+).*/, '$1');
		// 没有正确的UA
		if(/;/.test(ouid)){
			ouid = '';
		}
		return ouid;
	},
	/**
	 * 关闭当前页面
	 * @return {[type]} [description]
	 */
	close(){
		if(Browser.isWindvane){
			WindVane.close();
			return;
		}
        if(Browser.android){
        	YoukuJSBridge.closeActivity({result:-1});
	    }else if(Browser.iOS){
	    	location.href = "youku://jsbclose";
        }
	}
}