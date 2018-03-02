import UA from '../../../common/utils/browser';

// page video-list
(function() {
  'use strict';

  var data = [];
 
  window.callback = function(res) {

    if (res && res['video_list'].length > 0) {
      data = res['video_list'];
      setList(data);
    } else {
      // handle no data
    }
  };

  function setList(list) {
    var nodeArr = [];
    for (var i = 0, len = list.length > 4 ? 4 : list.length; i < len; i++) {
      var item = list[i];
      // var url = getPlayUrl(item['vid']);
      nodeArr.push('<li>');
      nodeArr.push('<span data-link="https://m.youku.com/video/id_'+item['vid']+'==.html?isWindVane=1&spm=a2h24.mdovt10803.sp.dsp'+(i+1)+';'+item['vid']+'" data-md=sp'+(i+1)+' data-spm=a2h24.mdovt10803.sp.dsp'+(i+1)+'>');
      nodeArr.push('<em class="pic"><img src="' + item['cover'] + '" alt="剧集封面"/></em>');
      nodeArr.push('<em class="txt"><b>' + item['name'] + '</b></em>');
      nodeArr.push('</span>');
      nodeArr.push('</li>');
    }
    var html = nodeArr.join('');
    var $list = document.querySelector('#video-list');
    $list.innerHTML = html;
  }

  function getPlayUrl(id) {
    // for html5
    var baseUrl = 'https://m.youku.com/video/id_' + id + '==.html?isWindVane=1';
    // if in youku android or ios App
    if (UA.isYouku) {
      // default is for android
      var protocol = 'youku://play';
      // for ios
      if (UA.iOS) {
        protocol = 'youku://jsbplay';
      }
      if (UA.isYoukuHD) {
        protocol = 'youkuhd://play'; 
      }
      baseUrl = protocol + '?vid=' + id + '&source=mplaypage'; 
    }
    return baseUrl;
  }


  
}());