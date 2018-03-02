import Browser from './browser'
import goldlog from './goldlog'
import bridge from '../bridge'
const userAgent = navigator.userAgent.toLowerCase();

class APP {
	constructor(option = {}){
		this._self = null;
		this._shade = null;
		this._parent = option.el || $(document.body);
		this._shadeClose = typeof option.shadeClose == 'undefined'?true:option.shadeClose;
		this._callback = option.callback || null;
		this.pageCode = option.pageCode||"military";
		this.posCode = option.pageCode||"upapp";
		this.close = option.close||true;
		// this.init();
	}

	getSupport(txt = '优酷版本太低，更新app'){
		let support = true;
		if(Browser.isYouku){
			if(!Browser.isWindvane && !window.WindVane){
				support = false;
				this.render(_text);
				return support;
			}else{
				return support
			}
		}else{
			support = true;
			return support
		}
	}

	render(txt){
		let _text = txt||'优酷客户端版本太低，请更新';
		try{
			_text = pageConfig.showText;
		}catch(e){

		}
		let __tpl = `
			<div class="dialog">
				<div class="dialog-content">
						<div class="toast bounceIn">
							<div class="clz"></div>
							<div class="toastCont">
								<span class="txt">${_text}</span>
								<span class="note"><em class="upApp">确定</em></span>
							</div>
						</div>
				</div>
				<div class="shade"></div>
			</div>
		`;
		this._self = $(__tpl);
		goldlog(this.pageCode,this.posCode,'SLD');
		this.setSty();
		this.bind();
		this._parent.append(this._self);
	}

	setSty(){
	
		this._content = $('.dialog-content', this._self).css({
			"position": "fixed",
			"left":'50%',
			"top":'50%',
			"-webkit-transform":"translate(-50%,-50%)",
			"transform":"translate(-50%,-50%)",
			"margin": "0 auto",
			"z-index": 100
		});
		this._shade = $('.shade', this._self).css({
			"position":"fixed",
			"width":"100%",
			"height":"100%",
			"background":"rgba(0,0,0,0.9)",
			"left":0,
			"top":0,
			"z-index":99
		})

	}
	bind(){
		let me = this;
		if(this._shadeClose){
			this._shade.on('click', function(){
				if(me.close){
					if(Browser.android){
			        	YoukuJSBridge.closeActivity({result:-1});
				    }else if(Browser.iOS){
				    	location.href = "youku://jsbclose";
			        }
				}
				me.close();
			})
		}
		this._self.on('click','.clz,.upApp',function(){
			if(me.close){
				if(Browser.android){
		        	YoukuJSBridge.closeActivity({result:-1});
			    }else if(Browser.iOS){
			    	location.href = "youku://jsbclose";
		        }
			}
			me.close();
		})

		this._self.on('touchmove', function(e){
			e.preventDefault();
			return false;
		});
		this._callback&&this._callback.call(this, this._self);
	}

	close(){
		this._self.remove();
	}
}
module.exports = APP;