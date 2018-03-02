let config = {
	ENV : '',
	isLogin:false,
	model : {},
	header:{}
};

//判断日常/预发/线上
if(config.ENV == 'DEV'){
	config.mtopDomain = 'youku-acs.waptest.taobao.com' 
	config.appKey = '4272'
	config.getcommunitycontentsURL = '//gw.ykc.1verge.test/'
}else if(config.ENV == 'PRE'){
	config.mtopDomain = 'pre-acs.youku.com'
	config.appKey = '23774304'
	config.getcommunitycontentsURL = '//pre-api-community.youku.com/'
}else{
	config.mtopDomain = 'acs.youku.com'
	config.appKey = '23774304'
	config.getcommunitycontentsURL = '//aserver.api.community.youku.com/'
}

export default config