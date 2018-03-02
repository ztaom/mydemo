(function() {
	var txtarea = document.querySelector('.txtarea');
	var strToJson = '';
	var jsonFormat;
	document.querySelector('.format').onclick = function() {
		var newValue = txtarea.value;
		if(newValue == ''){
			txtarea.value = '';
		} else {
			// JSON.parse(newValue, function(k, v){
			// 	console.log(v);
			// })
			strToJson = JSON.parse(newValue);
			jsonFormat = JSON.stringify(strToJson, null, "\t");
			txtarea.value = jsonFormat;
		}
	};
	function init() {

	}
	init()
})()
