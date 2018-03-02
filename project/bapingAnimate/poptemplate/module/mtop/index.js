/*
 * mtop封装
 * ES6 原生提供了 Promise  http://www.jianshu.com/p/063f7e490e9a
 * 每个 Promise 都会提供一个 then() 函数
 * somePromise().then(functoin(){
 *    // do something
 * });
 *
 *
 *
*/

import mtop from '@ali/lib-mtop-open';

module.exports = {
	getMtopinfo( args , setting = 'dev' ){
	    let bizParam = JSON.stringify(args.bizParam);
	    var settingDefault = {};

	    if( setting == 'pre'){//预发
	        settingDefault.mtopDomain = 'pre-acs.youku.com' 
	        settingDefault.appKey = '23774304'
	    }else if(setting == 'dev'){//日常
	        settingDefault.mtopDomain = 'youku-acs.waptest.taobao.com' 
	        settingDefault.appKey = '4272'
	    }else{//线上
	        settingDefault.mtopDomain = 'acs.youku.com';
	        settingDefault.appKey = '23774304'
	    }

	    mtop.config.mtopDomain = args.mtopDomain || settingDefault.mtopDomain;

	    let promise = mtop.request({
	        api : args.api,
	        v: '1.0',
	        ecode: args.ecode, //一定有
	        appKey:args.appKey || settingDefault.appKey,
	        type:args.type,
	        dataType:"jsonp",
	        data:{
	            bizType:args.bizType,
	            bizParam:bizParam //如果没有传递为''；否则是对象
	        }
	    })

	    return promise;
	}

}