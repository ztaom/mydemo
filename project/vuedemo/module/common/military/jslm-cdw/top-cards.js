//import PubSub from 'pubsub-js'
//import info from '../jslm-xz/info'
import Mtop from '../../../mtop'
import dialogs from '../jslm-xz/dialog-collect'
import Mobile from '../../../common/utils/mobile'
import Bridge from '../../../common/bridge'
import goldlog from '../../../common/utils/goldlog'
//首页头部卡组抽奖逻辑及锦囊任务弹层

class topCard{
	constructor(config){
		this.Tag = '头部卡组';
		this.config = config;
		this.clickStatus = true;
		this.clickFlg = null;
		this.inYouku = /Youku/.test(navigator.userAgent);
		this.loginStatus = config.isLogin;
		this.redMsg = $('.collbg .sub').html();//红色背影方案
		this.lottery = false;//是否开奖
		this.lotteryTime = false;//是否在开奖时间
		this._tabItem = $('.mainTab .tabTitle');
		this._tabItemDetail = $('.mainTab .tabContent');
		this.init();
	}

	init(){
		let me = this;
		this.renderCard(this.config.cards);
		this.renderConfig(this.config.res);
		this.render();
		this.bind();
	}

	update(){
		this.render(true)
	}

	render(status=false){
		this.getCardHome(status)
	}

	time(){
		let me = this;
		this.clickFlg = setTimeout(function(){
			me.clickStatus = true;
		}, 2000)
	}

	popMsg(message){
		dialogs('msg',{
			'data': {'msg': message},
			'callback': function(self){
				let me = this;
				$('.dialog-content', self).css('z-index',102);
				$('.shade', self).css('z-index',101);
				$('.clz', self).on('click', function(){me.close()});
				$('.note', self).on('click', function(){me.close()})
			}
		})
	}

	bind(){
		let me = this;
		$('.collbg .btn .award').on('click',function(){
			me.getTask.call(me, me.config);
			goldlog('military','jkjl','CLK');
		});
		$('.collbg .btn .card').on('click',function(){
			me.exchangeCardGroup.call(me, me.config);
			goldlog('military','jqkj','CLK');
		})
	}

	login(){
		let url = location.href;
		Mobile.showLogin({
			weburl: url,
	        callback: function(){
				location.reload();
	        }
		})
	}

	getCardHome(status){
		let me = this;
		if(!status){
			PubSub.subscribe('get-card-home', function(evtName, data){
				me.renderCardHome(data.data.result);
			})
		}else{
			me.updateRender(me.config);
		}
	}

	updateRender(config){
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
		},
		me = this;

		Mtop.getMtopinfo(params).then((res)=>{
			if(res.data.success){
				if(res.data.result.e.code.toLocaleUpperCase() == 'SUCCESS'){
					me.renderCardHome(res.data.result);
					me.updateCardNum(res);
				}
			}
		})
	}

	updateCardNum(res){
		let data = res.data.result,
			myCardCount = data.myCardCount || 0,
			myCardOpened = data.myCardOpened || 0;//全部未开卡

		$('.wardShow .amount b').html(myCardCount>999?'999+':myCardCount);
		$('.wardShow .num b').html(myCardCount-myCardOpened>99?'99+':myCardCount-myCardOpened);
	}

	renderCardHome(data){
		let schedules = data.schedules[0],
		starttime = this.dateFormate(schedules.starttime),
		endtime = this.dateFormate(schedules.endtime),
		//是否集齐五张卡
		awardStatus = this.cardStatus(schedules),
		taskSchedule = this.taskSchedule(data.channels),
		topInfo = (schedules.isNow && schedules.isCurrent?'<b>'+(schedules.allExchangedCount || 0)+'</b>人已兑奖':
			'<b>'+(schedules.allfinished || 0)+'</b>人已集齐')+
			'，第<em>'+schedules.seq+'</em>期<i class="start">'+starttime+'</i>-24:00开奖';
		//是否在开奖时间
		this.lotteryTime = schedules.isNow && schedules.isCurrent;
		$('.collbg .note .num').html(topInfo);
		//任务进度
		if(parseInt(taskSchedule)){
			$('.collbg .award .num').html(taskSchedule).show();
		}else{$('.collbg .award .num').hide();}
		if(schedules.isExchanged === true){ 
			$('.collbg .sub').html('已开奖！请到<span>我的奖品</span>查看');
			$('.collbg .sub span').on('click', function(){
				Mobile.openUrl({'url': '//hudong.vip.youku.com/act/mili/awards.html?isWindVane=1'});
			})
		}
		this.renderCard(schedules.cards);
		if(typeof schedules.isCurrent == 'undefined'){
			$('.collbg .btn').hide();
			return;
		}
		if(awardStatus){
			if(schedules.isExchanged !== true){
				//$('.collbg').addClass('csign')
				$('.collbg').removeClass('csign')
			}
		}else{
			//$('.collbg').addClass('csign')
		}
		
	}

	taskSchedule(data){
		let len = data.length,
		    rate = len;
		data.forEach((i,j)=>{
			if(i.status === true){
				rate--;
			}
		})
		//return rate+'/'+len;
		return rate;
	}

	cardStatus(data){//五张卡是否集齐
		let status = true,
		cards = data.cards;
		// cards.forEach((i,j)=>{
		// 	status = status || !!i.myCardCount;
		// })
		$.each(cards,function(i,item){
			if(!item.myCardCount){
				status = false;
				return false;
			}
		})
		return status;
	}

	renderCard(data){
		let cardBox = $('.collbg .list ul'),
		elm = null,
		count = 0,
		str = '';
		data.forEach((i,j)=>{
			// <li><img src="./images/st02.png"><em class="award"></em></li>
			str += '<li><span data-link="//hudong.vip.youku.com/act/mili/detail.html?isWindVane=1&cid='+i.cid
			+'&spm=a2h24.mdovt10803.kp.d'+(j+1)+'" data-md="kp'+(j+1)+'"><img src="'+(parseInt(i.myCardCount)?i.cover:i.coverGray)+'">'+
			(i.myCardOpenedCount<i.myCardCount?'<em class="award"></em>':'')+
			(i.myCardCount>1?'<i class="num'+(i.myCardCount>9?'n':i.myCardCount)+'"></i>':'')+'</a></li>';
		})
		elm = $(str);
		cardBox.html('').append(elm);
	}

	renderConfig(config){
		let headNotice = config.headNotice,
		hoverButton = config.hoverButton,
		headerNotice = $('#headerNotice'),
		passPrize = $('.passPrize');
		if(headNotice.img.length){
			$('img', headerNotice).attr('src', headNotice.img);
			if(headNotice.link.length){
				headerNotice.on('click', function(){
					Mobile.openUrl({'url': headNotice.link});
				})
			}
			headerNotice.show();
		}
		if(hoverButton.show == true){
			passPrize.html(hoverButton.word).show();
			passPrize.on('click', function(){
				Mobile.openUrl({'url': hoverButton.link});
			})
		}
	}

	dateFormate(time){
		let date =  new Date(time);
		return (date.getMonth() + 1) + '月' + date.getDate()+'日' + date.getHours()+':'
		+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
	}

	exchangeCardGroup(config){
		//卡组兑奖
		if(!this.clickStatus) return;
		this.clickStatus = false;
		
		let that = this, 
		params = {
			mtopDomain:config.mtopDomain,
			appKey:config.appKey,
			api:'com.youku.aplatform.securySet',
			ecode:0,
			bizType:'aacc.exchangeCardGroup',
			bizParam:{}
		}
		
		if(this.loginStatus){
			Mtop.getMtopinfo(params).then((res)=>{
				if(res.data.success){
					if(res.data.result.e.code.toLocaleUpperCase() == 'SUCCESS'){
						that.clickStatus = true;
						clearTimeout(that.clickFlg);
						dialogs('redPacket',{
							'callback': function(self){
								let me = this;
								$('.clz',self).on('click', function(){
									me.close();
									location.reload();
									//Mobile.openUrl({'url':location.href})
								});
								$('.btn',self).on('click', function(){
									me.close();
									//location.href = '//hudong.vip.youku.com/act/mili/awards.html?isWindVane=1';
									Mobile.openUrl({'url': '//hudong.vip.youku.com/act/mili/awards.html?isWindVane=1&spm=a2h24.mdovt10803.top.dtc'});
									goldlog('military','tc','CLK');
									setTimeout(function(){
										location.reload();
									},500)
								})
							},
							'data':res.data.result.prize,
							animate : true
						});
						$('.collbg').attr('class', 'collbg csign');
						$('.collbg .sub').html('已开奖！请到<span>我的奖品</span>查看');
						$('.collbg .sub span').on('click', function(){
							Mobile.openUrl({'url': '//hudong.vip.youku.com/act/mili/awards.html?isWindVane=1'});
						})
						
					}else{
						that.popMsg(res.data.result.e.desc)
					}
				}else{
					that.popMsg('对不起，当前兑奖人数太多，请稍后再试');
				}
			})
		}else{
			this.login();
		}
		that.time();
	}

	getTask(config){
		//获取锦囊任务
		if(!this.clickStatus) return;
		this.clickStatus = false;

		let that = this,
		params = {
			mtopDomain:config.mtopDomain,
			appKey:config.appKey,
			api:'com.youku.aplatform.get',
			ecode:0,
			bizType:'aacc.getChannelFinish',
			bizParam:{}
		};
		if(this.loginStatus){
			Mtop.getMtopinfo(params).then((res)=>{
				if(res.data.success){
					if(res.data.result.e.code.toLocaleUpperCase() == 'SUCCESS'){
						that.clickStatus = true;
						clearTimeout(that.clickFlg);
						dialogs('task',{
							'callback': function(self){
								// 社区跳转需要标签上需要添加的一些参数：
								// data-planetId  获取属性选择器click 值可为空
								// data-h5detailurl  跳转H5
								// data-nativeschemaurl  跳转schema
								// data-mdpage   页面spm 如没有log统计可不加
								// data-md   黄金令箭值 如没有log统计可不加
								let me = this,
								tips = $('.tip', self),
								share = $('.share',self);
								$('.clz',self).on('click', function(){
									me.close();
								});

								
								if(share.length > 0){
									share.on('click', function(){
										that.pageShare.call(that,that.getShareData(res.data.result.data));
										me.close();
									})
								}
								if(tips.length > 0){
									tips.off('click');
									tips.on('click', function(e){
										that.popMsg($(this).attr('_tip'));
										if($(this).parent()[0].nodeName.toLocaleUpperCase() === 'A'){
											$(this).parent().on('click', function(){return false;})
										}
										return false;
									})
								} 
								if(that.config.strategy_link){
									let raiders = $('.raiders', self);
									raiders.attr('data-planetId','');
									raiders.attr('data-h5detailurl','https://m.planet.youku.com/post-app/'+that.config.strategy_link);
									raiders.attr('data-nativeschemaurl','youku://planet/fans_post_detail?id='+that.config.strategy_link);
									raiders.attr('data-mdpage','military');
									raiders.attr('md','jn-community');
								}

							},
							data : res.data.result.data,
							animate : true
						})
					}else{
						that.popMsg(res.data.result.e.desc)
					}
				}else{
					
				}
			});
		}else{
			this.login();
		}

		that.time();
	}

	getShareData(data){
		let share = {};
		data.forEach((i,j)=>{
			if(i.name == 'share'){
				share = i;
			}
		})
		return share;
	}

	pageShare(opts={}){
		// opts.title 标题
		// opts.link 链接
		// opts.img icon图
		// opts.img_only
		let me = this;
		if(this.inYouku){
			Bridge.share({
				link: opts.shareinfo.url,
				img: opts.shareinfo.img,
				title: opts.shareinfo.title,
				success : function(){}
			});
			setTimeout(function(){
				me.setCardChannel.call(me, me.config);
			},me.config.delayTime*1000 || 5000);
			goldlog('military','fxym','CLK');
		}	
	}

	setCardChannel(config){
		let params = {
			mtopDomain:config.mtopDomain,
			appKey:config.appKey,
			api:'com.youku.aplatform.securySet',
			ecode:0,
			bizType:'aacc.setCardChannel',
			bizParam:{'channel':'share'}
		},
		that = this;
       
		Mtop.getMtopinfo(params).then((res)=>{
			if(res.data.success){
				if(res.data.result.e.code.toLocaleUpperCase() == 'SUCCESS'){
					if(res.data.result.cards.length > 0){
						// dialogs('card',{
						// 	'callback': function(self){
						// 		let me = this;
						// 		that.update();
						// 		$('.clz',self).on('click', function(){
						// 			me.close();
						// 		});
						// 	},
						// 	data : res.data.result.cards,
						// 	animate : true
						// })
						that.popMsg(that.config.shareTxt.replace('n', res.data.result.cards.length));
						that.update();
					}
				}else{
					
				}
			}
		})
	}

}

module.exports = topCard;