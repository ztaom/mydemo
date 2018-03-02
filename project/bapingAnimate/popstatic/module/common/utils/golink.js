/*页面连接跳转*/
import mobile from './mobile'

function goLink(){
	$('.main').on('click','[data-link]',function(){
		var params = this.getAttribute('data-link'),
			arr = params.split(';');
		if(arr.length > 1){
			mobile.play({
				url:arr[0],
				vid:arr[1],
			})
		}else{
			mobile.openUrl({
				url:params
			})
		}
		return false;
	})
}

export default goLink