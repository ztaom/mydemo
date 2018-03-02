/* 进入页面判断有无登陆/得卡接口调用 */
import PubSub from 'pubsub-js'
import queryString from 'query-string'
import Mobile from '../../../common/utils/mobile'
import sendlog from '../../../common/utils/goldlog'
import Mtop from '../../../mtop'
import API from './API'
import config from '../config'
import xhrAPI from './xhrAPI'
import Dialog from './dialogToast'
import topVideo from './topvideo'

class Receive{ 
	constructor(){
		//索取、赠送的时候
		this.args = queryString.parse(location.search);
		this.type = this.args.type || 'home';
		this.body = $('body');
		this.main = $('.main');
		this.num = 0;
		this.config = config;
		this.isLogin = this.config.isLogin;//判断是否登录
		this.xhrAPI = new xhrAPI();
		new topVideo(this.main,config.videoConfig);
		this.init();
	} 
	init(){
		this.changeStatus();
		this._bind();
		this._CardHome();
		this.leadInit();
		this.animationHideLayer();
	}
	changeStatus(){
		let cardupdate = localStorage.getItem('cardupdateindex') || {},
			isSupport = false,timerBack;
		document.addEventListener('visibilitychange',() => {
			if(!document.hidden){
				isSupport = true;
				clearInterval(timerBack);
				this.xhrAPI.getCardHome()
			}
		},false)
		timerBack = setInterval(()=>{
			if(cardupdate == '1' && !isSupport){
				clearInterval(timerBack);
				localStorage.removeItem('cardupdateindex')
				this.xhrAPI.getCardHome()
			}
		},1000)
	}
	_bind(){
		this.body.on('touchend', '#login,.login', $.proxy(this.login, this));
		this.main.on('click', '.popCover', $.proxy(this.popControl, this));
		this.body.on('webkitAnimationEnd animationend', '.layer-title,.manyCard li', $.proxy(this.animationEnd, this));
	}
	leadInit(){
		switch(this.type){
			case 'login':
				this.pubSetLoginChanel();
				break;
			case 'nu':
				this.pubSetLoginChanel();
				break;
			case 'give': 
				this.pubGiveChange();
				break;
			case 'ask':
				this.pubAskChanage();
				break;
			case 'home':
				this.xhrAPI.getCardHome()
				break;
			default://social_alipay  social_youku
				if(this.type.indexOf('social') >= 0){
					this.pubOtherChanel();
				}else{
					this.xhrAPI.getCardHome()
				}
		}
	}
	_CardHome(){
		PubSub.subscribe('get-card-home', (evtName, res)=>{//集卡首页进入获取所有未领取卡类型
			this.getCardshome(res);
		})
	}
	pubSetLoginChanel(){
		this.xhrAPI.setLoginChanel();
		PubSub.subscribe('set-login-Chanel', (evtName, res)=>{
			this.setLoginChanel(res);
		})
	}
	pubOtherChanel(){
		this.xhrAPI.setOtherChanel();
		PubSub.subscribe('set-other-Chanel', (evtName, res)=>{
			this.setOtherChanel(res)
		})
	}
	pubGiveChange(){
		this.xhrAPI.getGiveCard()
		PubSub.subscribe('top-give-cards', (evtName, res)=>{//赠卡
			this.setAfterAskGive(res);	
		})
	}
	pubAskChanage(){
		this.xhrAPI.getAskforCard()
		PubSub.subscribe('top-ask-cards', (evtName, res)=>{//索要卡
			this.setAfterAskGive(res);
		})
	}
	setLoginChanel(res){
		let cards = res.data.result.cards || [];
		if(cards.length > 0){ //如果卡cards > 0
			Dialog.init(cards,{type:'card',isLogin:this.isLogin});
			this.xhrAPI.getCardHome()
			this.channel = true;
		}else{
			this.xhrAPI.getCardHome();
		}
	}
	setOtherChanel(res){
		let cards = res.data.result.cards || [];

		if(cards.length > 0){ //如果卡cards > 0
			Dialog.init(cards,{type:'card',isLogin:this.isLogin});
			this.xhrAPI.getCardHome()
			this.channel = true;
		}else{
			this.xhrAPI.getCardHome();
		}
	}
	getCardshome(res){
		let data = res.data.result,
			cardstip = data.cardstip || {},
			cards = cardstip.cards || [],
			myCards = data.allcards,//卡包
			myCardCount = data.myCardCount || 0;
		// cards = [
		// 	{
		// 		desc: "司马懿之结发妻，人称“春小太岁”敢怒敢言，耿直豪爽，女中豪杰。",
		// 		coverGray: "//gw.alicdn.com/mt/TB175ISRXXXXXaUXpXXXXXXXXXX-1000-1331.png",
		// 	}
		// ]
		if(data.e.code == "NO_LOGIN"){
			let dialogData = {
				dec:data.e.desc
			}
			Dialog.init(dialogData,{type:'toast'},{shadeClose:true});
		}
		if(data.e.code == "SEC_DENIED"){
			let popCover = document.createElement('div');
			popCover.className = 'popCover';
			document.querySelector('.main').appendChild(popCover);
			this.setDialog();
			this.renderCard(this.config.cards)
		}

		this.timer = setInterval(()=>{
			this.callbackLog()
		},1000)
		
		if(cards.length > 0 && !this.channel){ //如果卡cards > 0
			Dialog.init(cards,{type:'card',isLogin:this.isLogin});
		}
		this.cardsAwardReader(data);
	}
	callbackLog(){
		if (this.isLogin && goldlog.aplus_pubsub && typeof goldlog.aplus_pubsub.publish === 'function') {
			var spm_ab = goldlog.spm_ab || [];
			goldlog.aplus_pubsub.subscribe('sendPV', function(status, spm_ab, send_pv_count){
				if (status === 'complete') {
					clearInterval(this.timer)
					history.replaceState(null, "", location.href.split('?')[0]+'?isWindVane=1')
				}
			});
		}
		if(this.num == 10){
			clearInterval(this.timer)
			history.replaceState(null, "", location.href.split('?')[0]+'?isWindVane=1')
		}
		this.num++;
	}
	animationHideLayer(){
		if(this.isLogin){
			setTimeout(function(){
				$('.manyCard').css('background','none');
				$('.manyCard li').addClass('fadeOutDownBig');
				$('.layer-title').addClass('fadeOutSideBig');
			},3000)
		}
	} 
	setAfterAskGive(res){
		let self = this,
			data = res.data.result,
			desc = data.e.desc,
			code = data.e.code;//NO_LOGIN
		let dialogData = {
			dec:desc,
			btnTxt:'确定'
		}
		if(!self.isLogin){
			dialogData.isBtn = true;
			dialogData.btnClassName = 'login'
		}

		// alert(JSON.stringify(data))

		Dialog.init(dialogData,{type:'toast'},{
			shadeClose:true,
			callback:function(dom){
				let me = this;
				$('.clz',dom).on('touchend', function(){
					self.xhrAPI.getCardHome()
				});
				me._shade.on('click', function(){
					self.xhrAPI.getCardHome()
				})
			}
		});
	}
	cardsAwardReader(data){
		let myCards = data.allcards,//卡包
			myCardCount = data.myCardCount || 0,
			myCardOpened = data.myCardOpened || 0,//全部未开卡
			myCardNoOpened = myCardCount - myCardOpened,//全部未开卡
			tpl = '';
		tpl = `<a href="#" onclick="javascript:;" data-link="//hudong.vip.youku.com/act/mili/awards.html?from=default&isWindVane=1&spm=a2h24.mdovt10803.top.dwdjp" data-md="wdjp" class="myAward">我的奖品</a>
			   <a href="#" onclick="javascript:;" data-link="//hudong.vip.youku.com/act/mili/cardlist.html?isWindVane=1&spm=a2h24.mdovt10803.top.dwdkp" data-md="wdkp" class="myCards">
					<em class="amount">我的卡片<b>${myCardCount > 999 ? '999+' : myCardCount}</b>张</em>
					<em class="num"><b>${myCardNoOpened > 99 ? '99+' : myCardNoOpened}</b>张未开奖</em>
				</a>`;
		if(this.isLogin){
			document.querySelector('.wardShow').style.height = '.93rem'
			document.querySelector('.wardShow').style.margin = '.2rem auto'
			document.querySelector('.wardShow').innerHTML = tpl
		}
	}
	login(){
		if(this.type == 'give' || this.type == 'ask'){
			var url = location.href;
		}else{
			var url = location.href.split('?')[0];
		}
		sendlog('military','dllk','CLK');
		Mobile.showLogin({
			weburl: url,
	        callback: function(){
				location.reload();
	        }
		})
	}
	popControl(){
		setTimeout(()=>{
			this.setDialog();
		},300)
	}
	animationEnd(){
		$('.dialog').remove();
		$('.manyCard li').removeClass('fadeOutDownBig');
		$('.layer-title').removeClass('fadeOutSideBig');
	}
	setDialog(){
		var self = this;
		let dialogData = {
			dec:this.config.securityConfig.tips,
			isBtn:true,
			btnClassName:'btnConfig',
			btnLink:this.config.securityConfig.btnLink,
			vid:this.config.securityConfig.vid,
			btnTxt:this.config.securityConfig.btnTip
		}
		sendlog('military','fwtp','SLD');
		Dialog.init(dialogData,{type:'toast'},{shadeClose:true,
			callback:function(dom){
				let me = this;
				$('.btnConfig',dom).on('click', function(e){
					me.close();
					self.popConfigLink(e);
				});
			}
		});
	}
	popConfigLink(e){
		var target = $(e.currentTarget),
			vid = $(target).data('vid'),
			url = $(target).data('btnlink');

		sendlog('military','tctz','CLK');
		if(vid){
			Mobile.play({
				url:'https://m.youku.com/video/id_'+vid+'==.html?isWindVane=1;',
				vid:vid,
				spm:'a2h24.mdovt10803.ht.dtctxz'
			})
		}else{
			Mobile.openUrl({
				url:$(target).data('btnlink')
			})
		}
	}	
	renderCard(data){
		let cardBox = $('.collbg .list ul'),
		elm = null,
		count = 0,
		str = '';
		data.forEach((i,j)=>{
			// <li><img src="./images/st02.png"><em class="award"></em></li>
			str += '<li><a href="//hudong.vip.youku.com/act/mili/detail.html?isWindVane=1&cid='+i.cid
			+'"><img src="'+(parseInt(i.myCardCount)?i.cover:i.coverGray)+'"></a>'+
			(i.myCardOpenedCount<i.myCardCount?'<em class="award"></em>':'')+
			(i.myCardCount>1?'<i class="num'+(parseInt(i.myCardCount)>9?'n':i.myCardCount)+'"></i>':'')+'</li>';
		})
		elm = $(str);
		cardBox.html('').append(elm);
	}
}
export default Receive
