import PubSub from 'pubsub-js'
import Browser from '../../common/utils/browser'
import Bridge from '../../common/bridge'
import golink from '../../common/utils/golink'
import Upgrade from '../../common/utils/upgrade'
import Receive from './jslm-xz/receive'
import dialogs from './jslm-xz/dialog-collect'
import topCards from './jslm-cdw/top-cards'
import video from './video/list'
import config from './config'
import API from './jslm-xz/API'
import Topic from './jslm-xz/topics'
import Render from './jslm-xz/render'

class Alliance{
	constructor(){
		const app = new Upgrade();
		app.getSupport();
		golink.init();
		this.init();
	}
	init(){
		if(!Browser.ifSupport){
			let app = new Upgrade({pageCode:"military"});
			app.render();
	    }
		API.getLogin();
		window.deployCallback = function(res){
			config.res = res;
			config.topicArr = res.headerList;
			config.vipinfo = res.vipinfo;
			config.cooperlist = res.cooperlist;
			config.express = res.express;
			config.colArr = res.colArr;
			config.bonus = res.bonus;
			config.pageLiks = res.pageLiks;
			config.strategy_link = res.strategy_link;
			config.mtopErrorTxt = res.mtopErrorTxt;
			config.bubble = res.bubble;
			config.shareTxt = res.shareTxt;
			config.delayTime = res.delayTime;
			config.securityConfig = res.securityConfig;
			config.cards = res.cards;
			config.videoConfig = res.videoConfig;
			config.model = {
				topicIds:[res.model.split(',')[0],res.model.split(',')[1]],
				postIds:[res.model.split(',')[2]]
			};

			if(!Browser.isYouku){
				location.href = config.pageLiks.skip_link;
			}
			new Render();
			new Topic(document.querySelector('.circle ul'));
		}
		PubSub.subscribe('get-is-login', (evtName, res)=>{
			config.isLogin = res.data.result.islogin;
			this.pageShare(); 
			this.getReceive()
		})
	}
	getReceive(){
		new Receive();
		new topCards(config);
	}
	pageShare(){
		if(Browser.isYouku){
	        Bridge.setShareInfo({
	          link:config.pageLiks.skip_link || location.href, 
	          img:'http://gw.alicdn.com/tfs/TB1THzNRFXXXXaQXXXXXXXXXXXX-150-150.jpg', // 分享图标
	          title:'优酷军师联盟上线，一亿红包等你来抢！快来参与军师联盟集卡活动' // 分享标题
	        });
		}
	}
}
const alliance = new Alliance(config)