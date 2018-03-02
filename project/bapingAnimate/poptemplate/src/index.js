import bridge from '@ali/lib-bridge';
import {Browser} from '@ali/browser-detect';
import AeJson from './data.js';

let ua = window.navigator.userAgent;
let isIos = /iPhone|iPad/.test(ua);
let timer = null;
let animId = document.querySelector('#anim');
let canvas = document.querySelector('#canvas');
let isBind = false;
function init() {

    //动画执行
    let anim = aftui.playAnim({
        wrapper: animId,
        loop: false,
        path: AeJson
    });
    window.anim = anim;

    // 获取优酷版本
    const versionArr = (Browser.version).split('.');
    const youkuVersion = parseInt(versionArr[0] * 1000) + parseInt(versionArr[1] * 10) + parseInt(versionArr[2]);
    if (window.isCheckVersioon && youkuVersion >= (isIos ? window.iosVersion : window.adrVersion)) {
        showPop();
    } else if(window.isCheckVersioon == false){
        showPop()
    }

    //动画准备中
    anim.onEnterFrame = function() {
        let canvasAnim = animId;
        if (!isBind) {
            isBind = true;

            //显示poplayer
            setTimeout(function(){
                canvas.classList.add('show');
                window.HollywoodLog && window.HollywoodLog.expose('content.show', '页面内容.显示', params);
            },100)

            canvasAnim.addEventListener('click', function(){
                window.HollywoodLog && window.HollywoodLog.click('anim.click', '动画.点击', params);
                setTimeout(function(){
                    jumpTo();
                    closePoplayer();
                },100);
            })

            //点击关闭 关闭动画
            window.closeIcon.addEventListener('click', function() {
                window.HollywoodLog && window.HollywoodLog.click('closeIcon.click', '关闭icon.点击', params);
                closePoplayer();
            });
        }
    }

    //动画结束之后操作
    anim.onComplete = function() {
        anim.playSegments([70,160], true);
        window.HollywoodLog && window.HollywoodLog.expose('anima.over', '动画.结束', params);
    }
    if(!timer){
        timer = setTimeout(function() {
            window.HollywoodLog && window.HollywoodLog.expose('anima.over', '动画.结束', params);
            closePoplayer();
        }, window.closeTime);
    }

}

//显示poplayer
function showPop() {
    window.HollywoodLog && window.HollywoodLog.expose('page.expose', '页面.曝光', params);
    window.WindVane.call('WVPopLayer', 'display', {}, function() {
        // poplayer成功显示
        window.HollywoodLog && window.HollywoodLog.expose('display.success', 'poplayer.成功显示', params);
    }, function() {
        window.HollywoodLog && window.HollywoodLog.expose('display.fail', 'poplayer.显示失败', params);
    });
    //动画设置显示一次，客户端会自动判断readtimes
    window.WindVane.call('WVPopLayer', 'increaseReadTimes', {});
    
}

//跳转半屏
function halfSreen() {
    if(isIos) {
        window.WindVane.call('DYKBaseJSBridge', 'nativeOpen', {
            'url': `youku://playVideo?source=bpAnimate&half=1&s=${window.setShowId}&openHalfUrl=${window.webLink}&blockPop=1`
        }, function (s) {
            //跳转成功
            window.HollywoodLog && window.HollywoodLog.click('jumTo.success', '跳转.成功', params);
        }, function (e) {
            console.log('跳转失败');
            window.HollywoodLog && window.HollywoodLog.click('jumTo.fail', '跳转.失败', params);
        });
    } else {
        window.WindVane.call('WVPopLayer', 'navToUrl', {
            'url': `youku://play?source=bpAnimate&showid=${window.setShowId}&detail_action=startH5&openHalfUrl=${window.webLink}&blockPop=1`
        }, function (s) {
            //跳转成功
            window.HollywoodLog && window.HollywoodLog.click('jumTo.success', '跳转.成功', params);
        }, function (e) {
            //跳转失败
            console.log('跳转失败');
            window.HollywoodLog && window.HollywoodLog.click('jumTo.fail', '跳转.失败', params);
        });
    }
}


//点击跳转
function jumpTo() {
    //获取mt页面中的spm
    let currentSpm = null;
    if(typeof(g_SPM)!=='undefined') {
        currentSpm = '&spm=' + g_SPM.spm(document.documentElement);
    } else {
        currentSpm = '';
    }

    if(toPlayPage) {
        //跳转到播放页
        bridge.play({
            vid: window.setVid, //或者未编码的vid：752369169可能会不兼容，约定格式会编码后的vid
            showid: window.setVid, //剧集id，非数字id 可选 encodeid
            source:'bpAanimate' //用于标识播放页类型 可选
        })
    } else if(window.toHalfScreen) {
        halfSreen();
    } else {
        //跳转到webview
        window.webLink += currentSpm
        // alert(webLink)
        if(isIos) {
            window.WindVane.call('DYKBaseJSBridge', 'nativeOpen', {
                'url': 'youku://openWVH5?isWindVane=1&url='+webLink
            }, function (s) {
                //跳转成功
                window.HollywoodLog && window.HollywoodLog.click('jumTo.success', '跳转.成功', params);
            }, function (e) {
                console.log('跳转失败');
                window.HollywoodLog && window.HollywoodLog.click('jumTo.fail', '跳转.失败', params);
                location.href="youku://jsbjump?weburl="+encodeURIComponent(webLink);
            });
        } else {
            window.WindVane.call('WVPopLayer', 'navToUrl', {
                'url': webLink
            }, function (s) {
                //跳转成功
                window.HollywoodLog && window.HollywoodLog.click('jumTo.success', '跳转.成功', params);
            }, function (e) {
                //跳转失败
                console.log('跳转失败');
                window.HollywoodLog && window.HollywoodLog.click('jumTo.fail', '跳转.失败', params);
            });
        }
    }
}

//执行关闭动画和poplayer
function closePoplayer() {
    //销毁动画
    setTimeout(function(){
        anim.destroy()
        canvas.classList.remove('show');
        window.WindVane.call('WVPopLayer', 'close', {}); //关闭poplayer
    }, 300)
}

// 异步加载图片
let loadImg = function (url) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = url;
        img.onload = function () {
            resolve()  ;
        };
        img.onerror = function () {
            console.log('图片错误');
            reject()  ;
        };
    });
};
let imgArr;
let loadingImg = [];
for (let i=0; i<window.imgGroups.length; i++) {
    imgArr = loadImg(window.imgGroups[i].img);
    loadingImg.push(imgArr);
}
Promise.all(loadingImg).then(function () {
    console.log('图片加载完成')
    window.onload = init;
});