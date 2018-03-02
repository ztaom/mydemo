import Dialog from '../../../common/utils/dialog'

module.exports = {
	init(res,config,params={}){
		let _tpl = '';
		switch(config.type){
			case 'card':
				_tpl = this.cardTpl(config,res);
				break;
			case 'toast':
				_tpl = this.toastTpl(res);
		}
		params.tpl = _tpl;
		const dialog = new Dialog(params)
		this.setClose();
	},
	setClose(){
		$('body').on('click','.clz',function(){
			$(this).parents('.dialog').remove()
		})
	},
	toastTpl(res){
		let btnHtml = !!res.isBtn ? `<span class="note"><em class="${res.btnClassName}" data-btnlink="${res.btnLink}" data-vid ="${res.vid}">${res.btnTxt}</em></span>` : ''
		let _tpl = `<div class="layer">
				<div class="toast bounceIn">
					<div class="clz"></div>
					<div class="toastCont">
						<span class="txt">${res.dec}</span>
						${btnHtml}
					</div>
					</div>
				</div>`;
		return _tpl;
	},
	cardTpl(config,res){
		let loginBtn = config.isLogin ? '' : '<div class="layer-btn" id="login"></div>',
			len = res.length,
			_tplList = '';
			
		_tplList = `<li class="card1" style="background-image:url(${res[0].cover})"></li>`
		
		let _tpl = `<div class="fullclz clz"></div><div class="layer" style="-webkit-transform:translateY(-55%);transform:translateY(-55%)">
				<div class="layer-cont bounceIn">
					<div class="layer-title">
					   	<p>${res.length}</p>
				    </div>
				   <div class="manyCard">
				   		<ul>${_tplList}</ul>
				   </div>${loginBtn}
					</div>
				</div>
				<div class="layer-tips">提示: 每位用户每天首次登陆，可获得一张军师卡。</div>`;
		return _tpl;
	}
}