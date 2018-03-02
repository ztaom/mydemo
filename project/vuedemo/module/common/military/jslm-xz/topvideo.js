import Browser from '../../../common/utils/browser'
import sendlog from '../../../common/utils/goldlog'
class Video{ 
	constructor(dom,data){
		this.dom = dom;
		this.data = data;
		this.playbtn = $(this.dom.find(".video .pay")[0]);
		this.poster = $(this.dom.find(".video #player img")[0]);
		this.full = $(this.dom.find(".video .full")[0]);
		this.playerCover = $(this.dom.find(".cover_bg")[0]);
		this._autoVideo();
		this._bind();
		this.reader();
	}
	_autoVideo(){
		window.WindVane.call('WVNetwork', 'getNetworkType', {}, function(res) {
		    if(res.type.toLocaleUpperCase() == 'WIFI'){
		    	this.wifi = true;
				this.createPlayer(true);
		    }else{
		    	this.createPlayer();
		    }
		}.bind(this));	
	}
	_bind(){
		this.playerCover.on("click",$.proxy(this.playerContol, this));
		this.playbtn.on("click",$.proxy(this.playerContol, this));
		let _self = this;
		document.addEventListener("visibilitychange", function(){
            if(document.hidden){
            	_self.pauseOrPlay();
            }else{
				if(_self.wifi){
					_self.pauseOrPlay(true);
				}else{
					_self.pauseOrPlay();
				}
            }
        });
	}
	reader(){
		this.poster.attr('src',this.data.pic);
		this.full.attr('data-link','https://m.youku.com/video/id_'+this.data.vid+'.html?isWindVane=1&spm=a2h24.mdovt10803.tc.top.dvideoFull;'+this.data.vid);
		this.full.attr('data-md','videoFull');
		this.full.attr('data-spm','a2h24.mdovt10803.tc.top.dvideoFull');
	}
	playerContol(){
		this.poster.hide();
		if(this.player){
			if(this.playbtn.css("display")==='none'){
				this.player.pause();
				this.playbtn.show();
				sendlog('military','spzt','CLK');
			}else{
				this.player.play();
				this.playbtn.hide();
				sendlog('military','spbf','CLK');
			}
    	}else{
    		this.playbtn.hide();
    		this.createPlayer(true);
    	}
	}
    pauseOrPlay(ifplay){
    	if(!this.player){
    		return;
    	}
    	if(ifplay){
    		this.player.play();
    		this.poster.hide();
	    	this.playbtn.hide();
    	}else{
    		this.player.pause();
    		this.poster.show();
	    	this.playbtn.show();
    	}
    }
	createPlayer(ifPlay){
    	if(this.player){
    		return;
    	}
    	if(!Browser.android && ifPlay){
	    	this.poster.hide();
	    	this.playbtn.hide();
    	}
    	let  config = {
		    videoId:this.data.vidindex,//视频id
		    ccode:"0501",                                                                                                                              client_id:"6b0cc88390551a80",//优酷视频云创建应用的client_id
		    control:{
		        laguange:"",//默认使用的语言类型
		        hd:"mp4hd",//默认使用的码率
		        autoplay:true
		    },
		    events:{
		        'onPlayerReady': null,
		        'onPlayStart':null,
		        'onAdPlayStart':null,
		        'onPlayEnd': "",
		        'onPause': "",
		        'onPlay':"",
		        /*'onSwitchFullScreen': this.onSwitchFullScreen,*/
		        'onMediaSrcOK': null
		    }
		};
		if(!ifPlay){
			config.control.autoplay = false;
		}
		let id = "player";
		this.player = YKPlayer.Player(id,config);
		if(ifPlay){
			this.player.play();
		}
    }
}
export default Video