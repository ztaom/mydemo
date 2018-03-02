import HttpURL from '@ali/lib-httpurl';
/*eslint-disable */
function decode64(_1) {
    if (!_1) return '';
    var _2 = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
    var _3 = "";
    var _4, _5, _6;
    var _7, _8, _9, _a;
    var i = 0;
    _1 = _1.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
        _7 = _2.indexOf(_1.charAt(i++));
        _8 = _2.indexOf(_1.charAt(i++));
        _9 = _2.indexOf(_1.charAt(i++));
        _a = _2.indexOf(_1.charAt(i++));
        _4 = (_7 << 2) | (_8 >> 4);
        _5 = ((_8 & 15) << 4) | (_9 >> 2);
        _6 = ((_9 & 3) << 6) | _a;
        _3 = _3 + String.fromCharCode(_4);
        if (_9 != 64) {
            _3 = _3 + String.fromCharCode(_5);
        }
        if (_a != 64) {
            _3 = _3 + String.fromCharCode(_6);
        }
    } while (i < _1.length);
    return U8_16(_3);
}

function U8_16(_1) {
    var i, len, c;
    var char2, char3;
    var ary = [];
    len = _1.length;
    i = 0;
    while (i < len) {
        c = _1.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                ary.push(_1.charAt(i - 1));
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = _1.charCodeAt(i++);
                ary.push(String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F)));
                break;
            case 14:
                // 1110 xxxx 10xx xxxx 10xx xxxx
                char2 = _1.charCodeAt(i++);
                char3 = _1.charCodeAt(i++);
                ary.push(String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0)));
                break;
        }
    }
    return ary.join('');
}
export default {
    getVideoid(link, videoid) {
        let vid = '';
        if (link.split('id_').length > 1) {
            let reg = /id_([^\.^\?^_]*)(_|$|\.|\?)/i;
            vid = link.match(reg)[1];
            return vid.split('=')[0];
        }
        if (vid == '') {
            const url = new HttpURL(link);
            if (window.itemData && window.itemData.vcode) {
                return (window.itemData.vcode).split('=')[0];
            } else if (url.params[videoid]) {
                return (url.params[videoid]).split('=')[0];
            }
        }
        return vid;
    },

    getCookie(str) { //cookie组件会转码2次
        let cookie = document.cookie,
            name = str + '=',
            start = cookie.indexOf(name);

        if (start < 0) return null;

        start += name.length;

        let end = cookie.indexOf(';', start);
        end = end == -1 ? cookie.length : end;

        return cookie.substring(start, end);
    },

    htmlEncodeAll(e) {
        return null == e ? '' : e.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/'/g, '&quot;').replace(/'/g, '&apos;');
    },

    decodeVid(vid) {
        let cid = vid;
        if (vid && vid.indexOf('X') == 0) {
            cid = cid.substring(1, cid.length);
            cid = decode64(cid);
            cid = parseFloat(cid) >>> 2;
        }
        return cid;
    },
    isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    },
    // 指定日期&&时间，生成新的时间戳
    genSpeTime(now, time, type) {
        let d = new Date(now),
            startTime = {
                hour: time,
                min: 0,
                s: 0
            },
            endTime = {
                hour: time,
                min: 59,
                s: 59
            };
        let r;
        if ('start' == type) {
            r = d.setHours(startTime.hour) && d.setMinutes(startTime.min) && d.setSeconds(startTime.s);
        } else {
            r = d.setHours(endTime.hour) && d.setMinutes(endTime.min) && d.setSeconds(endTime.s);
        }
        return parseInt(r);
    }

};