import Polyfill from '@ali/lib-es6polyfill';
/* mtop 全新Promise方式的调用（推荐）*/
import mtop from '@ali/lib-mtop'
// import defer from './defer'

module.exports = {
	getMtopinfo( args , setting = 'dev'){
		let H5Request = window.springWind.isapp ? undefined : true;
		let bizParam = JSON.stringify(args.bizParam);
		var settingDefault = {},Reg = /securySet/;

		if( setting == 'production'){
			settingDefault.mtopDomain = 'pre-acs.youku.com' 
			settingDefault.appKey = '23774304'
		}else if(setting == 'DEV'){
			settingDefault.mtopDomain = 'youku-acs.waptest.taobao.com' 
			settingDefault.appKey = '4272'
		}else{
			settingDefault.mtopDomain = 'acs.youku.com' 
			settingDefault.appKey = '23774304'
		}
		//判断是否需要安全码
		if(Reg.test(args.api)){
			H5Request = undefined;
			args.isSec = 1;
			args.asac = '1A17523OKVNQCKI0VHPWTH'
		}

		mtop.config.mtopDomain = args.mtopDomain || settingDefault.mtopDomain;

		let promise = mtop.request({
			api : args.api,
			v: '1.0',
			ecode: args.ecode, //一定有
			appKey:args.appKey || settingDefault.appKey,
			type:args.type,
			H5Request: H5Request,
			isSec:args.isSec,
			dataType:"jsonp",
		 	timeout: 10000, // 非必须。接口超时设置，默认为20000ms
			data:{
				bizType:args.bizType,
				bizParam:bizParam, //如果没有传递为''；否则是对象
				asac:args.asac
			}
		})

		return promise;
	}
}