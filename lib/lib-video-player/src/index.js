/**
 * Part of the source reference : https://github.com/videojs/video.js
 */

import Player from './player';
import log from './utils/log';
import * as Dom from './utils/dom.js';
/**
 * ```js
 *     var myvideo = video('my_video_id');
 * ```
 *
 * @param  {String|Element} id      video element or video element ID
 * @param  {Object=} options        Optional options object for config/settings
 * @return {Player}                 A player instance
 * @mixes video
 * @method video
 */

function video(id, options) {

  let tag; // Element of ID

  if (typeof id === 'string') {

    if (id.indexOf('#') === 0) {
      id = id.slice(1);
    }

    tag = Dom.getEl(id);

  } else {
    tag = id;
  }

  // Check for a useable element
  if (!tag || !tag.nodeName) {
    throw new TypeError('The element or ID supplied is not valid. (video)');
  }

  return new Player(tag, options);
};

// Custom Universal Module Definition (UMD)
if (typeof define === 'function' && define['amd']) {
  define('video', [], function() {
    return video;
  });

  // checking that module is an object too because of umdjs/umd#35
} else if (typeof exports === 'object' && typeof module === 'object') {
  module['exports'] = video;
}

window.lib || (window.lib = {})
lib.videoPlayer = video;

export default video;