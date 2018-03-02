/*
 * h5活动使用
 * 全局定义活动id参数，*.setActId('demo')
 * 每一个行为位置处参数，*.goldlog('clickbtn')
 *
 * 输出 actId=demo&posId=clickbtn2&param={"canyu":1}
 *
 */

let _logStr = '/yt/ykh5.ykh5.ykh5';
let _checkStr = 'H46956154';
let actId = null;
let pageId = null;

function sendImgLog(src, errorcallback) {
    const id = 'youku-uniplayer-stat';
    if (src.indexOf('http:') < 0 && src.indexOf('https:') < 0){
        src = `https:${src}`;
    }
    const fr = document.createElement('img');
    if (errorcallback) {
        fr.addEventListener('error', errorcallback, false);
    }
    fr.src = `${src}&r_=${Math.floor(Math.random() * 10000)}`;
    fr.id = id;
}
/**
 * 黄金令箭埋点统计方法 setActId('actid'), goldlog('posid', {'canyu':1})
 * @param  {[type]} actId      所在页面标识码
 * @param  {[type]} posId      所在位置标识码
 * @param  {[type]}       具体操作 CLK EXP SLD OTHER  默认用CLK
 * @return {[type]}            [description]
 */
const logh5 = {
    setLogName: (logName, logCheck) => {
        _logStr = logName;
        _checkStr = logCheck;
    },
    setActId: (id) => {
        actId = id;
    },
    setPageId: (id) => {
        pageId = id;
    },
    goldlog: (action, posId, param) => {
        let _str = `actId=${actId}&pageId=${pageId}&posId=${posId}`;
        const setAction = action || 'CLK';

        //业务扩展参数
        const exparam = {};
        if (JSON.stringify(exparam) !== '{}') {
            _str += `&exparam=${JSON.stringify(exparam)}`;
        }
        //常用订阅参数{'canyu':1}
        if (param) {
            _str += (`&param=${JSON.stringify(param)}`);
        }
        try {
            setTimeout(() => {
                window.goldlog.record(_logStr, setAction, _str, _checkStr);
            }, 500);
        } catch (e) {
            const _logUrl = `//gm.mmstat.com${_logStr}?${_str}`;
            sendImgLog(_logUrl);
        }
    }
};

module.exports = logh5;