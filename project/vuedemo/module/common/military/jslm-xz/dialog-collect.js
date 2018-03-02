import Dialog from '../../../common/utils/dialog'
let task = function(data){
	let renderItem = function(){//true 未完成 false已完成 
		let str = '',
		aElm = '';
		data.forEach((i,j)=>{
			if(i.urlnative){
				aElm = i.url.length > 0 ? ' data-planetId="" data-h5detailurl="'+i.url+'" data-nativeschemaurl="'+
				(i.urlnative ? i.urlnative : '')+'" data-mdpage="military" data-md="'+('jn-'+i.name)+'" ' : '';
			}else{
				aElm = i.url.length > 0 ? ' data-link="'+i.url+'" data-mdpage="military" data-md="'+('jn-'+i.name)+'" ' : '';
			}
			if(!i.status){
				str += '<li class="active '+(i.name=='share'?'share':i.tip.length>0?'tip':'')+'" '+(i.url.length>0?aElm:'')+' '+
				(i.tip.length>0?'_tip="'+i.tip+'"':'')+'><em class="txt">'+i.desc+'<i>'+i.act+
				'</i></em><em class="btn"><i>'+i.state+'</i></em></li>';
			}else{
				str += '<li class="'+(i.name=='share'?'share':i.tip.length>0?'tip':'')+'" '+(i.url.length>0?aElm:'')+' '+
				(i.tip.length>0?'_tip="'+i.tip+'"':'')+'><em class="txt">'+i.desc+'<i>'+i.act+
				'</i></em><em class="btn">'+i.state+'</em></li>';
			} 
			
		})
		return str;
	},

	__itemTpl = renderItem(),
	__tpl = `<div class="mycard">
            <div class="title"><span class="collect"><i class="raiders"></i></span></div>
            <div class="cardmod">
                <div class="scrollbar">
                    <div class="place"></div>
                </div>
                <div class="collectList">
                    <ul>
                        ${__itemTpl}
                    </ul>
                </div>
            </div>
            <div class="bottom"><em>* 优酷黄金会员完成任务得卡数翻倍 *</em></div>
            <div class="clz"></div>
        </div>`;
    return __tpl;
};
let cardRecord = function(data){
	let formateTime = function(time){
		var _date = new Date(time);
		return (_date.getMonth()+1)+'月'+_date.getDate()+'日';
	},
	renderItem = function(){
		let str = '';
		data.list.forEach((i,j)=>{
			str += '<dd><em class="col1">'+i.card+i.act+'</em><em class="col2">'+i.time.substr(0,10)+'</em><em class="col3">'+i.source+'</em></dd>';
		})        
	    return str;            

	},
	__itemTpl = renderItem(),
	__tpl = `<div class="mycard">
            <div class="title"><span class="record"></span></div>
            <div class="cardmod">
                <div class="recordList">
                <div class="ptit"><i class="tbg"></i></div>
                    <div class="pcon">
                        <dl>
                            ${__itemTpl}
                        </dl>
                    </div>
                </div>
            </div>
            <div class="clz"></div>
        </div>`;
	return __tpl;
};
let cardDailog = function(data){
	let len = data.length,
	cover = data[0].cover,
	str = '';
	
	str = '<li class="card1"><img src="'+cover+'"></li>';

	let __tpl = `<div class="fullclz clz"></div><div class="layer">
			<div class="layer-cont bounceIn">
				<div class="layer-title">
				   	<p>${len}</p>
			    </div>
			   <div class="manyCard">
			   		<ul>
						${str}
			   		</ul>
			   </div>
				</div>
			</div>
		`;
	return __tpl;
};
let redPacket = function(data){
	let str = ``;
	if(!!data.extend){
		str = `<p class="cashNum"><span>${data.award_content||0}</span> 元</p>
            <p class="cashInfo">支付宝红包</p>
            <p class="add"><img src="//img.alicdn.com/tfs/TB1IL9WRpXXXXbXaXXXXXXXXXXX-34-34.png"/></p>
            <p class="voucherNum"><span>${data.extend.award_content}</span> 元</p>
            <p class="voucherInfo">${data.extend.detail}</p>`;
	}else{
		str = `<p class="cashNum"><span>${data.award_content||0}</span> 元</p>
            <p class="cashInfo">支付宝红包</p>`;
	}
	let __tpl = `<div class="package">
	        <div class="clz"></div>
	        <div class="packageCon">${str}<em class="btn"></em></div>
	        <div class="note">提示: 已经领取的奖品请到【我的奖品】中查看。</div>
	    </div>`;
	return __tpl;
};
let dialog = function(type, option = {}){

	let __tpls = '';
	
	switch(type){
		case 'account':
		__tpls = `<div class="alipay"><span class="txt"><em class="title">优酷账号</em><em class="number">${option.data.account}</em></span><span class="note"><em>更换账号</em></span>
	        <div class="clz"></div>
	    </div>`;
	    break;
	    case 'cardPrompt':
		__tpls = `<div class="alipay"><span class="txt"><em class="title">您尚未集齐该军师卡，查看
			“锦囊”了解更多集卡方法。</em></span><span class="note"><em>查看锦囊</em></span>
	            <div class="clz"></div>
	    </div>`;
	    break;
	    case 'alipay':
		__tpls = `<div class="alipay"><span class="txt"><em class="title">将领取到xxxx支付宝账号</em></span><span class="note"><em class="active">更换账号</em><em>确定</em></span>
	        <div class="clz"></div>
	    </div>`;
	    break;
	    case 'redPacket':
		__tpls = redPacket(option.data);
	    break;
	    case 'member':
	    __tpls = `<div class="mycard">
                <div class="mywardTxt">
                    <em>恭喜您获得</em>
                    <span>${option.data.msg}</span>
                    <a class="receiveBtn" href="${option.data.url}">立即领取</a>
                </div>
            <div class="clz"></div>
        </div>`;
	    break;
	    case 'msg':
	    __tpls = `<div class="layer">
				<div class="toast bounceIn">
					<div class="clz"></div>
					<div class="toastCont">
						<div class="txt">${option.data.msg}</div>
						<span class="note"><em>确定</em></span>
					</div>
					</div>
				</div>`;
	    break;
	    case 'task':
	    __tpls = task(option.data);
	    break;
	    case 'cardRecord':
	    __tpls = cardRecord(option.data);
	    break;
	    case 'card':
	    __tpls = cardDailog(option.data);
	    break;
	}
	if(!__tpls) return;
	if(option.animate) __tpls = __tpls.replace(/class=\"\w*/,'$& bounceIn');
	option.tpl = __tpls;
	option.el = $('.main');
	let dialog = new Dialog(option),
	_top = $(document.body).scrollTop();
	$('.cardmod', dialog._content).on('touchmove', function(e){
		let wrap = $(e.srcElement).closest('.collectList').length?$(e.srcElement).closest('.collectList'):
		$(e.srcElement).closest('.pcon'),
		top = wrap.scrollTop(),
		sh = wrap[0].scrollHeight,
		h = wrap.height(),
		_h = $('ul', wrap).length > 0 ? $('ul', wrap).height():$('dl', wrap).height();
		
		if(_h > h){
			e.stopPropagation();
			// if(top <= 0 || top >= sh - h){
			// 	$(document.body).scrollTop(0);
			// }
			if(top == sh - h){
				wrap.scrollTop(top - 1);
			}
			if(top == 0){
				wrap.scrollTop(1);
			}
		}
		
	});
	$('.cardmod', dialog._content).on('touchend', function(e){
		setTimeout(function(){$(document.body).scrollTop(_top)})
	})
	return dialog;
}

module.exports = dialog;