function sendlog(src, errorcallback) {
  let id = "youku-uniplayer-stat";
  if(src.indexOf("http:") < 0 && src.indexOf("https:") < 0){
  	 src = "https:" + src;
  }
  let fr = document.createElement('img');
  if (errorcallback) {
    fr.addEventListener('error', errorcallback, false);
  }
  fr.src = src + '&r_=' + Math.floor(Math.random() * 10000);
  fr.id = id;
}
/**
 * 黄金令箭埋点统计方法
 * @param  {[type]} pageCode 所在页面标识码
 * @param  {[type]} code     所在位置标识码
 * @param  {[type]} action   具体操作 CLK EXP SLD OTHER
 * @return {[type]}          [description]
 */
function goldlog (pageCode,code,action,param) {
	let _str = "pageCode="+pageCode+"&actCode=card&posCode="+code;
	if(param){
		for(let key in param){
			_str += ("&"+key+"="+param[key]);
		}
	}
	if(!action){
		action = 'CLK';
	}
    
	try{
		goldlog.record('/yt/jslmhd.poplayer.baping',action,_str,'H1482418997');
	}catch(e){
		let _logUrl = '//gm.mmstat.com/yt/jslmhd.poplayer.baping?'+_str;
		sendlog(_logUrl);
	}
}
export default goldlog;
