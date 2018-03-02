import mtop from './mtop';
import { logpop } from '@ali/lib-goldlog';
import HttpURL from '@ali/lib-httpurl';
const httpurl = new HttpURL(location.href);
const option = httpurl.params;
if (option.env) {
    window.lib.mtop.config.prefix = 'pre-acs';
}
logpop.setActId('315721'); //定义一个全局活动id（必选）
logpop.setPageId('play'); //定义一个全局子页面id（必选）
const ua = window.navigator.userAgent;
const isIos = /iPhone|iPad/.test(ua);
function domready() {
    return new Promise((resolve) => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded', resolve);
        }
    });
}
function getCookie(cName) {//获取cookie
    const cookieList = document.cookie;
    if (cookieList.length > 0) {
        let cStart = cookieList.indexOf(`${cName}=`);
        if (parseInt(cStart) !== -1) {
            cStart = cStart + cName.length + 1;
            let cEnd = cookieList.indexOf(';', cStart);
            if (parseInt(cEnd) === -1) cEnd = cookieList.length;
            return unescape(cookieList.substring(cStart, cEnd));
        } else {
            return '';
        }
    } else {
        return '';
    }
}
function getLoginState() {//判断是否登录
    const PSck = getCookie('P_sck');
    const yktk = getCookie('yktk');

    if (PSck.toString() !== '' || yktk.toString() !== '') {
        //已登录
        return true;
    } else {
        //未登录
        return false;
    }
}
function setVideoTask() {//看视频得卡请求
    const params = {
        api: 'mtop.com.youku.aplatform.securySet',
        bizType: `${window.bizTypePre}.Agent.GetVideoTaskCard`,
        bizParam: {}
    };
    return mtop.request(params);
}
async function getResult() {
    const horiz = document.getElementById('horiz');
    const vertical = document.getElementById('vertical');
    let closeTimer = null;
    const poplayerTime = (window.mgData && window.mgData.poplayerTime) || 5;//卡片展示时长
    try {
        const res = await setVideoTask();
        // eslint-disable-next-line
        if (parseInt(res.data.code) === 0 && parseInt(res.data.data.cardCount) > 0) {
            if (window.mgData.isFullsreen) {//横屏
                horiz.style.display = 'block';
                vertical.style.display = 'none';
                window.nowSreen = 2;
            } else {//竖屏
                horiz.style.display = 'none';
                vertical.style.display = 'block';
                window.nowSreen = 1;
            }
            closeTimer = setTimeout(() => {
                clearTimeout(closeTimer);
                window.WindVane.call('WVPopLayer', 'close', {}, () => {}, () => {});//关闭poplayer
            }, poplayerTime * 1000);
        }
    } catch (e) {
        console.log(e);
        window.WindVane.call('WVPopLayer', 'close', {}, () => {}, () => {});//关闭poplayer
    }
}
function getVideoInfo() {
    return new Promise((resolve, reject) => {
        window.WindVane.call('DJH5Player', 'videoinfo', {}, (e) => {
            // alert(`视频信息：${JSON.stringify(e)}`);
            if (e && e.param) {
                const videoInfo = e.param.videoinfo;
                try {
                    const videoId = videoInfo.video && videoInfo.video.encodeid;
                    const showId = videoInfo.show && videoInfo.show.id;
                    // alert(`${videoId}***${showId}`);
                    resolve({
                        vid: videoId,
                        showid: showId
                    });
                } catch (err) {
                    reject({
                        vid: null,
                        showid: null
                    });
                }
            } else {
                reject({
                    vid: null,
                    showid: null
                });
            }
        }, () => {
            reject({
                vid: null,
                showid: null
            });
        });
    });
}
function isSetVid(vidList, vid) {
    if (vid && vidList) {
        for (let i = 0; i < vidList.length; i++) {
            if (vidList[i] && vidList[i].vid === vid) {
                return true;
            }
        }
    }
    return false;
}
function playerEvent () {//开启横屏与竖屏的监听
    const horiz = document.getElementById('horiz');
    const vertical = document.getElementById('vertical');
    document.addEventListener('DJH5PlayerListener.fullscreen', () => {//横屏
        window.mgData.isFullsreen = true;
        if (window.nowSreen === 1) {
            horiz.style.display = 'block';
            vertical.style.display = 'none';
            window.nowSreen = 2;
        }
    }, false);
    document.addEventListener('DJH5PlayerListener.halfscreen', () => {//竖屏
        window.mgData.isFullsreen = false;
        if (window.nowSreen === 2) {
            horiz.style.display = 'none';
            vertical.style.display = 'block';
            window.nowSreen = 1;
        }
    }, false);
}
function openlistener() {//开启监听
    const params = {
        'play': 1,
        'pause': 1,
        'duration': 1,
        'hdchange': 1,
        'langchange': 1,
        'fullscreen': 1,
        'halfscreen': 1,
        'playend': 1,
        'playerror': 1,
        'start': 1,
    };
    return new Promise((resolve) => {
        window.WindVane.call('DJH5Player', 'openlistener', params, () => {
            console.log('READY!');
            resolve();
        }, () => {
            console.log('Player error');
        });
    });
}
domready().then(() => {
    window.WindVane.call('WVPopLayer', 'display', {});
    logpop.goldlog('EXP', 'exposure');
    //点击跳转
    const poplayer = document.querySelector('#poplayer');
    const webLink = 'https://h5.m.youku.com//ju/ohmygeneral.html?wvUseWKWebView=YES&isWindVane=1&type=playPoplayer';
    poplayer.addEventListener('click', () => {
        logpop.goldlog('CLK', 'clickBackomg');
        if (isIos){
            window.WindVane.call('DYKBaseJSBridge', 'nativeOpen', {
                'url': `youku://openWVH5?url=${webLink}`
            }, () => {
                // eslint-disable-next-line
                // alert(webLink);
            }, () => {
            });
        } else {
            window.WindVane.call('WVPopLayer', 'navToUrl', {
                'url': webLink
            }, () => {
                // eslint-disable-next-line
                // alert(webLink);
            }, () => {
            });
        }
    });
    window.mgData.isFullsreen = false;
    window.nowSreen = 0;
    openlistener().then(() => {//开启播放器监听，保证播放器信息与横屏竖屏监听成功
        playerEvent();
        const loginState = getLoginState();
        if (loginState) {
            let timer = null;
            if (timer) {
                clearTimeout(timer);
            }
            getVideoInfo().then((res) => {
                // alert(`节目id:${res.showid}`);
                window.bizTypePre = (window.mgData && window.mgData.bizTypePre) || 'agent_zh'; //接口前缀
                const videoTaskTime = (window.mgData && window.mgData.videoTaskTime) || 3; //看视频得卡的时长
                let showid = '315721';
                let vidList = null;
                if (window.mgData && window.mgData.videoConfig) {
                    showid = window.mgData.videoConfig.showid;
                    vidList = window.mgData.videoConfig.vidList;
                }
                const isVidOk = isSetVid(vidList, res.vid);
                if (isVidOk || (res.showid && (parseInt(showid) === parseInt(res.showid)))) {
                    timer = setTimeout(() => {
                        clearTimeout(timer);
                        // alert('完成视频任务');
                        getResult(); //看视频任务达成，获取请求发卡结果
                        logpop.goldlog('EXP', 'seetime');
                    }, videoTaskTime * 1000);
                }
            });
        }
    });
});