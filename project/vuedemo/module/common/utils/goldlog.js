function sendlog(src, errorcallback) {
  let id = "youku-uniplayer-stat";
  if(src.indexOf("http:") < 0 && src.indexOf("https:") < 0){
  	 src = "https:" + src;
  }
  let fr = document.createElement('img');
  if (errorcallback) {
    fr.addEventListener('error', errorcallback, false);
  }
  document.getElementsByTagName("body")[0].append(fr);
  fr.src = src + '&r_=' + Math.floor(Math.random() * 10000);
  fr.id = id;
}
window.logStorage = [];
function sendLogStorage(){
	let _len = window.logStorage.length;
	if(_len > 0){
		for(let i = 0 ; i < _len ; i++ ){
			window.goldlog.record('/yt/cfslccn.cfslcs.cfslcs',window.logStorage[i].action,window.logStorage[i].content,'H1476877877');
		}
		window.logStorage = [];
	}
}
/**
 * 黄金令箭埋点统计方法
 * @param  {[type]} pageCode 所在页面标识码
 * @param  {[type]} code     所在位置标识码
 * @param  {[type]} action   具体操作 CLK EXP SLD OTHER
 * @return {[type]}          [description]
 */
function goldlog (code,action,param,logStr,checkStr) {
	let _str = "pageCode=springBreeze&actCode=spring&posCode="+code;
	let _logStr = logStr || '/yt/cfslccn.cfslcs.cfslcs';
	let _checkStr = checkStr || 'H1476877877';
	if(param){
		for(let key in param){
			_str += ("&"+key+"="+param[key]);
		}
	}
	if(!action){
		action = 'CLK';
	}
	if (window.goldlog && window.goldlog.record){
		window.goldlog.record(_logStr,action,_str,_checkStr);
		sendLogStorage();
	}else{
		logStorage.push({action:action,content:_str});
	}
    
	// try{
	// 	goldlog.record('/yt/cfslccn.cfslcs.cfslcs',action,_str,'H1476877877');
	// }catch(e){
	// 	let _logUrl = '//gm.mmstat.com/cfslccn.cfslcs.cfslcs?'+_str;
	// 	sendlog(_logUrl);
	// }
}
export default goldlog;
