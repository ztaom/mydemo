(function() {
var qrcode
var resdataDom = document.getElementById('res-data')
var formDom = $('.mockform')
var qrDom = document.getElementById('qrcode')
var configDom = $('#config-labels') 
var saveBtnDom = $('#save-btn') 
var configNameInputDom = $('#config-name')
var defaultMockKey = '__poplayer_default_mock__'
var defaultConfigKey = '__poplayer_default_config__'
var defaultMock
var pageURL
var defaultConfigs

function updateQRCode (url, resdata) {
	if (qrcode) {
		qrcode.clear()
		qrcode.makeCode(url)
	} else {
		qrcode = new QRCode(qrDom, {
			text: url,
			width: 256,
			height: 256,
			colorDark : '#000000',
			colorLight : '#ffffff',
			correctLevel : QRCode.CorrectLevel.H
		})
	}

	resdataDom.innerHTML = resdata
}

function getFormRawData(form) {
	var data = {}
	form.find('[name]').each(function () {
	var field = this
	var name = field.getAttribute('name')
	if (field.type == 'radio') {
		if (field.checked) {
		data[name] = field.value
		}
	} else if (field.type == 'checkbox') {
		if (field.checked) {
		if (field.hasAttribute('value')) {
			if (name in data) {
			data[name] += ( ',' + field.value )
			} else {
			data[name] = field.value
			}
		} else {
			data[name] = true
		}
		}
	} else {
		data[$(field).attr('name')] = $(field).val()
	}

	})
	return data
}

function setFormData(form, data, isSemantic) {
	form.find('[name]').each(function () {
		var field = this
		var val = data[$(field).attr('name')]
		if (val != null && val !== undefined) {
			if (field.type == 'radio') {
				if (field.value == val) {
					field.checked = true
				} else {
					field.checked = false
				}
				var $parent = $(field).parent()
				if ($parent.hasClass('ui') && $parent.hasClass('checkbox')) {
					//semantic-ui　需要把父元素也加上checked
					if (val == field.value) {
						$parent.addClass('checked')
					} else {
						$parent.removeClass('checked')
					}
				}
			} else if (field.type == 'checkbox') {
				var $parent = $(field).parent()
				var isBoolean = typeof val === 'boolean'

				var checked = ( isBoolean ) ? val : function () {
					var vs = val.split(',')
					for (var i = 0; i < vs.length; i++) {
						if (vs[i] == field.value) {
							return true
						}
					}
					return false
				}()

				if ($parent.hasClass('ui') && $parent.hasClass('checkbox')) {
					//semantic-ui　需要把父元素也加上checked
					if (checked) {
						$parent.addClass('checked')
					} else {
						$parent.removeClass('checked')
					}
				}

				if (checked) {
					field.checked = true
				} else {
					field.checked = false
				}

			} else if (field.tagName == 'p' || field.tagName == 'P') {
				$(field).html(val)

			} else {
				$(field).val(val)
			}
		}
	})
}

function initForm (){
	defaultMock = localStorage.getItem(defaultMockKey)

	if(defaultMock && defaultMock.length){
		try{
			defaultMock = JSON.parse(defaultMock)
		}catch(e){}
	} else {
		defaultMock = {
			uriandroid : 'com.taobao.tao.homepage.MainActivity3',
			uriios : 'TBHomeViewController'
		}
	}

	setFormData(formDom , defaultMock)
}

function initURL(){
	// get current tab url
	chrome.tabs.getSelected(null, function(tab) {
		pageURL = tab.url
		update()
	})
}

function init (){
	initForm()
	initURL()
	initConfigs()
	bindEvent()
}

function bindEvent() {
	// update when change the value of fields in form
	$('.field-input').on('change', update)

	bindAddConfig()
	bindAddConfigInput()
	bindDeleteConfig()
	bindSelectConfig()
}


function getFormData(dom){
	var data = getFormRawData(dom)

	if (!data.uriandroid) {
		data.uriandroid = defaultMock.uriandroid 
	}

	if (!data.uriios) {
		data.uriios = defaultMock.uriios
	}

	return data
}


function update(){
	var mockData = getFormData(formDom)

	console.log('request:', mockData)

	localStorage.setItem(defaultMockKey, JSON.stringify(mockData))

	mockData.url = pageURL

	var mockurl = 'http://mt2.alibaba-inc.com/core/poplayermock/mock.json'

	$.ajax({
		url : mockurl,
		data :{ 
			config: JSON.stringify(mockData) 
		},
		dataType: 'json',
		crossDomain: true,
		success: function (res) {
			console.log('response:', res)
			updateQRCode('http://huodong.m.taobao.com/act/xqfl9u.html?uuid='+ res.data  + '&t=' + new Date().getTime(), res.data)
	},
	error: function(e){ }
	})
}

function setConfigs(){
	var html = ''

	for (var prop in defaultConfigs) {
		html += [
			'<span class="config-label" data-config-name="',
			prop,
			'" title=\'',
			JSON.stringify(defaultConfigs[prop]),
			'\'>',
				prop,
				'<span class="config-label-close">+</span>',
			'</span>'
		].join('')
	}

	configDom[0].innerHTML = html

	localStorage.setItem(defaultConfigKey, JSON.stringify(defaultConfigs))
}

// init config
function initConfigs() {
	defaultConfigs = localStorage.getItem(defaultConfigKey)

	if(defaultConfigs && defaultConfigs.length){
		try{
			defaultConfigs = JSON.parse(defaultConfigs)
		}catch(e){}
	} else {
		defaultConfigs = {
			"手淘首页": {"uriandroid":"com.taobao.tao.homepage.MainActivity3","uriios":"TBHomeViewController","modalThreshold":"1","times":"0","enableHardwareAcceleration":true,"moreConfig":"{}","uuid":"false"}
		}
	}

	setConfigs()
}

function bindAddConfigInput () {
	function addConfigInput(){
		var name = configNameInputDom.val()

		if (name) {
			var formData = getFormData(formDom)

			defaultConfigs[name] = formData

			setConfigs()
		}

		configNameInputDom.hide()
	}

	// the enter key code
	configNameInputDom.keypress(function (e) {
		var key = e.which

		if(key == 13)  {
			addConfigInput()

			return false
		}
	})

	configNameInputDom.blur(function () {
		addConfigInput()
	})

}

// delete config
function bindDeleteConfig () {
	configDom.delegate('.config-label-close', 'click', function(e){
		e.stopPropagation()

		var parent = $(e.target.parentElement)

		var name = parent.data('config-name')

		delete defaultConfigs[name]

		setConfigs()
	})
}

// add config
function bindAddConfig() {
	saveBtnDom.on('click', function(){
		configNameInputDom.show()
		configNameInputDom.focus()
	})
}

// select config
function bindSelectConfig(){
	configDom.delegate('.config-label', 'click', function(e){
		var target = $(e.target)

		var name = target.data('config-name')

		var data = defaultConfigs[name]

		setFormData(formDom , data)

		update()
	})
}

init()

})()
