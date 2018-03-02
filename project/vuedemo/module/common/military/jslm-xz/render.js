import config from '../config'

class Render{ 
	constructor(){
		this.config = config;
		this.init();
	} 
	init(){
		this.headNotice();
		this.renderTit();
		this.setCollVip();
		this.setPageLink();
		this.setbonus();
		this.vipHdRender();
		this.renderExpress();
		this.renderCooper();
		this.renderGamead();
	}
	headNotice(){
		if(!this.config.res.headbagConfig.img) return false;
		let img = `<img src="${this.config.res.headbagConfig.img}" />`
		document.querySelector('.toprevue').innerHTML = img;
	}
	renderGamead(){
		let linkTxt = '',gameHtml = '';
		if(!this.config.res.gameConfig.img) return false;
		if(this.config.res.gameConfig.link){
			linkTxt = `data-link="${this.config.res.gameConfig.link}"`
		}
		gameHtml = `<div class="adGame" ${linkTxt} data-md="yxad"><img src="${this.config.res.gameConfig.img}" /></div>`
		if(this.config.res.pageConfig.adPlace == 'top'){
			$('.wardShow').after(gameHtml)
		}else{
			$('.topic').after(gameHtml)
		}
	}
	renderTit(){
		document.querySelector('.videoList .title p em').innerHTML = this.config.res.txtConfig.videoNum;
		document.querySelector('.topic .title p em').innerHTML = this.config.res.txtConfig.topicNum;
	}
	setCollVip(){
		document.querySelector('.collbg .logo').setAttribute('data-link','//sky.vip.youku.com/svip/JSLM/index?spm=a2h24.mdovt10803.kp.dhyqyan');
		document.querySelector('.collbg .logo').setAttribute('data-md','hyqyan');
	}
	setPageLink(){
		var pageLiks = this.config.pageLiks;
		document.querySelector('.myWard').setAttribute('data-planetid',pageLiks.rule_id);
		document.querySelector('.myWard').setAttribute('data-h5detailurl','https://m.planet.youku.com/post/'+pageLiks.rule_id + '?spm=a2h24.mdovt10803.top.dhdgz');
		document.querySelector('.myWard').setAttribute('data-nativeschemaurl','youku://planet/fans_post_detail?id='+pageLiks.rule_id + '&spm=a2h24.mdovt10803.top.dhdgz');
		document.querySelector('.myWard').setAttribute('data-md','hdgz');
	}
	setbonus(){
		var bonus = this.config.bonus;
		var html = `${bonus.preTxt}<em>${bonus.amount}</em>`
		$('.collbg .sub').html(html)
	}
	vipHdRender(){
		var VipArr = this.config.vipinfo,
			html = '',vipHtml ='';
		$.each(VipArr,function(index,item){
			html += `<p data-link="${item.link}" data-md="ybggw"><img src="${item.img}"/></p>`
		})
		vipHtml = `<div class="goldMember">${html}</div>`
		if(this.config.res.pageConfig.adPlace == 'top'){
			$('.topic').after(vipHtml)
		}else{
			$('.wardShow').after(vipHtml)
		}
	}
	renderExpress(){
		let thank = this.config.express,
			colArr = this.config.colArr,
			colHtml= '',
			thankArr = [];
	    for (var i = 0; i < thank.length; i++) {
	      var item = thank[i];
	      if(!item.img || !item.link) return false;
	      thankArr.push('<li data-link='+item.link+' data-md="dbggw'+(i+1)+'"><em>');
	      thankArr.push('<img src="'+item.img+'">');
	      thankArr.push('</em></li>');
	    }
	    var html = thankArr.join('');
	    $('.advList .content ul').append(html);

	    for(var i = 0;i<colArr.length;i++){
	    	var item = colArr[i];
	    	if(!item.pic || !item.link) return false;
	    	colHtml += '<em data-link='+item.link+' data-md="dbggw5"><img src="'+item.pic+'"></em>';
	    }
    	$('.advList .content .col').append(colHtml);
	}
	renderCooper(){
		let attend = this.config.cooperlist,
			attendArr = [];
		for (var i = 0; i < attend.length; i++) {
	      var item = attend[i];
	      if(!item.img) return false;
	      attendArr.push('<a '+(item.link ? 'data-link='+item.link : '')+' data-md="ext'+(i+1)+'">');
	      attendArr.push('<img src="'+item.img+'">');
	      attendArr.push('</a>');
	    }
	    let html = attendArr.join('');
   		$('.cooperlist').append(html);
	}
}
export default Render