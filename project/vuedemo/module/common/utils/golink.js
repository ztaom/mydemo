/*页面连接跳转*/
import Polyfill from '@ali/lib-es6polyfill';
import mobile from './mobile'
import goldlog from './goldlog'
import orbitNavigator from '@ali/orbit-navigator'

module.exports = {
	init(mainId){
		this.body = $('body');
		this.main = mainId ? $(mainId) : $('.main');
		this._bind();
	},
	_bind(){
		this.main.on('click', '[data-link]', $.proxy(this.loadUrl, this));
		this.main.on('click', '[data-planetId]', $.proxy(this.loadPlanet, this));
	},
	loadUrl(e){
		var target = $(e.currentTarget),
			parmas = target.data('link'),
			Arr = parmas.split(';'),
			md = target.data('md') || '',
			mdPage = target.data('mdpage') || 'military';
		if(md != ''){
			goldlog(mdPage,md,'CLK');
		}

		if(Arr.length > 1){
			mobile.play({
				url:Arr[0],
				vid:Arr[1],
				spm:target.data('spm') || ''
			})
		}else{
			mobile.openUrl({
				url:parmas
			})
		}
		return false;
	},
	loadPlanet(e){
		var target = $(e.currentTarget),
			h5detailurl = target.data('h5detailurl'),
			nativeschemaurl = target.data('nativeschemaurl'),
			md = target.data('md') || '',
			mdPage = target.data('mdpage') || 'military';
		if(md != ''){
			goldlog(mdPage,md,'CLK');
		}	
		orbitNavigator.navigate({
			target : nativeschemaurl,
			fallback : h5detailurl,
			vi : '6.6.2.1',
			va : '6.6.3.3'
		});
		return false;
	}
}
