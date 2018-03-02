/* 优酷 app 能力封装安卓下windvane环境 */
import Browser from '../utils/browser'
import queryString from 'query-string'

module.exports = {
	/**
	 * WindVane的方式唤起分享组件
	 * @param  {Object} opts [description]
	 * @return {[type]}      [description]
	 */
	share(opts={}){
		let params = {
            'url': opts.link,
            'title': opts.title,
            'image': opts.img,
            'type': 'type_djyy',
            'desc': opts.desc ? opts.desc : opts.title
        };
        window.WindVane.call('WVBehavioursBridge', 'showShareView', params, function(e) {
            if(opts.success){
            	opts.success(e);
            }else{
            	//alert('success' + JSON.stringify(e));
            }
            //alert('success' + JSON.stringify(e));
        }, function(e) {
            if(opts.error){
            	opts.error();
            }else{
            	//alert('failure' + JSON.stringify(e));
            }
            //alert('failure' + JSON.stringify(e));
        });
	},
	/**
	 * 显示登录框
	 */
	showLogin(opts = {}){
        if(Browser.android){
			window.WindVane.call("WVLoginJSBridge", "showLoginView", "", function (e) {
				location.href = opts.weburl;
	        });
        }else if(Browser.iOS){
			var prefix = Browser.isPad ? 'youkuhd' : 'youku';
			location.href = prefix + '://jsblogin?' + queryString.stringify(opts);
        }
	},
	/**
	* 加载url
	*/
	loadUrl(opts = {}){
		var reg =new RegExp("http|https");
		opts.url = reg.test(opts.url.substr(0,7).toLowerCase()) ? opts.url : "https:" + opts.url;
		if(Browser.android){
			window.WindVane.call('WVLoadBridge', 'loadUrl', opts);
        }else if(Browser.iOS){
        	location.href = 'youku://jsbjump?weburl='+encodeURIComponent(opts.url);
			// window.WindVane.call('DYKBaseJSBridge', 'nativeOpen', {
			// 	'url': 'youku://openWVH5?url='+opts.url
			// });
        }
	},

	close(){
		if(Browser.android){
			var params = {};
			window.WindVane.call('WVActionJSBridge', 'closeActivity', params, function(e) {
			}, function(e) {
			});
		}else if(Browser.iOS){  
			location.href = "youku://jsbclose";
		}
	}
}