import PubSub from 'pubsub-js'
import Mtop from '../../../mtop'
import defer from '../../../mtop/defer'
import config from '../config'
import Upgrade from '../../../common/utils/upgrade'

module.exports = {
	getLogin(){//判断是否登录
		let params = {
			mtopDomain:config.mtopDomain,
			appKey:config.appKey,
			// api:'com.youku.aplatform.'+(config.isLogin ? 'securySet' : 'weakGet'),
			api:'com.youku.aplatform.weakGet',
			ecode:0,
			bizType:'aacc.isLogin',
			bizParam:{
				//uid:781124763
			}
		}
		Mtop.getMtopinfo(params).then((res)=>{
			PubSub.publish('get-is-login', res);
		}, function (res) {
			let app = new Upgrade();
			if(app.getSupport() && (res.ret == 'HY_NO_HANDLER' || res.ret == 'HY_NO_HANDLER' || res.ret == 'HY_CLOSED' || res.ret == 'HY_NO_PERMISSION')){
				app.render('优酷版本太低，更新app');
			}else{
				app.render(config.mtopErrorTxt);
			}
			// alert(JSON.stringify(res))
		    // 失败回调
		    // resJson.retType为数字，可以通过lib.mtop.RESPONSE_TYPE枚举来获得具体信息
		})
	},
	getCardHome(){//未登录getCardHome
		let params = {
			mtopDomain:config.mtopDomain,
			appKey:config.appKey,
			api:'com.youku.aplatform.'+(config.isLogin ? 'securySet' : 'weakGet'),
			// api:'com.youku.aplatform.weakGet',
			ecode:0,
			bizType:'aacc.getCardHome',
			bizParam:{
				 //uid:781124763,
				 _r:new Date().getTime()
		    }
		}

		Mtop.getMtopinfo(params).then((res)=>{
			PubSub.publish('get-card-home', res);
		}, function (res) {
			// alert(JSON.stringify(res))
		    // 失败回调
		    // resJson.retType为数字，可以通过lib.mtop.RESPONSE_TYPE枚举来获得具体信息
		})
	},
	setloginChanelAPI(args){//未登录getCardHome
		let params = {
			mtopDomain:config.mtopDomain,
			appKey:config.appKey,
			api:'com.youku.aplatform.'+(config.isLogin ? 'securySet' : 'weakGet'),
			ecode:0,
			bizType:'aacc.setCardChannel',
			bizParam:{
				 channel:args.type,
				 // utdid:'daju'
				 // uid:37569820
			}
		}

		Mtop.getMtopinfo(params).then((res)=>{
			PubSub.publish('set-login-Chanel', res);
		})
	},
	setOtherChanelAPI(args){ 
		let params = {
			mtopDomain:config.mtopDomain,
			appKey:config.appKey,
			api:'com.youku.aplatform.'+(config.isLogin ? 'securySet' : 'weakGet'),
			ecode:0,
			bizType:'aacc.setSocialCard',
			bizParam:{
				 channel:args.type || 'social_youku',
				 token:args.token
			}
		}
		Mtop.getMtopinfo(params).then((res)=>{
			PubSub.publish('set-other-Chanel', res);
		},(res)=>{
		})
	},
	GiveCardApi(args){//好友点击转赠页立即领取,带token 访问集卡主页时调用
		let params = {
			mtopDomain:config.mtopDomain,
			appKey:config.appKey,
			api:'com.youku.aplatform.'+(config.isLogin ? 'securySet' : 'weakGet'),
			ecode:0,
			bizType:'aacc.setGiveCard',
			bizParam:{
				token:args.token || '9d5413880c435a7148dea268b080e562',
				// uid:'37569820'
			}
		}

		Mtop.getMtopinfo(params).then((res)=>{
			PubSub.publish('top-give-cards', res);
		})
	},
	setAskforCardAPI(args){//好友点击索要页立即领卡按钮，带token 访问集卡主页时调用
		let params = {
			mtopDomain:config.mtopDomain,
			appKey:config.appKey,
			api:'com.youku.aplatform.'+(config.isLogin ? 'securySet' : 'weakGet'),
			ecode:0,
			bizType:'aacc.setAskforCard',
			bizParam:{
				token:args.token || '9d5413880c435a7148dea268b080e562'
			}
		}

		Mtop.getMtopinfo(params).then((res)=>{
			PubSub.publish('top-ask-cards', res);
		})
	},
	getTopicAPI(data = {}){
		var deferred = defer();

		$.ajax({
            url: config.getcommunitycontentsURL+'gw/mtop.youku.community.counsellorservice.getcommunitycontents/1.0?data='+data,
            dataType: 'json',
            success: function(res){
            	deferred.resolve(res);
            },
            error: function(res){
				deferred.reject(res);
			}
        })

		return deferred.promise;
	}
}