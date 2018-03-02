import bridge from '@ali/lib-bridge';
const ua = window.navigator.userAgent;
const isIos = /iPhone|iPad/.test(ua);
let timer = null;
const animId = document.querySelector('#static');
const canvas = document.querySelector('#canvas');
let isBind = false;
function init() {
    onEnterFrame();
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
            source:'bpAnimate' //用于标识播放页类型 可选
        })
    } else {
        //跳转到webview
        window.webLink += currentSpm
        // alert(webLink)
        if(isIos) {
            window.WindVane.call('DYKBaseJSBridge', 'nativeOpen', {
                'url': 'youku://openWVH5?isWindVane=1&url='+webLink
            }, function (s) {
                //跳转成功
                window.HollywoodLog && window.HollywoodLog.click('jumTo.success', '跳转.成功');
            }, function (e) {
                window.HollywoodLog && window.HollywoodLog.click('jumTo.fail', '跳转.失败');
            });
        } else {
            window.WindVane.call('WVPopLayer', 'navToUrl', {
                'url': webLink
            }, function (s) {
                //跳转成功
                window.HollywoodLog && window.HollywoodLog.click('jumTo.success', '跳转.成功');
            }, function (e) {
                window.HollywoodLog && window.HollywoodLog.click('jumTo.fail', '跳转.失败');
            });
        }
    }
}

//执行关闭动画和poplayer
function closePoplayer() {
    canvas.classList.remove('show');
    window.WindVane.call('WVPopLayer', 'close', {});
}

//动画准备中
function onEnterFrame() {
    let canvasAnim = animId;
    if (!isBind) {
        isBind = true;
        //显示poplayer
        window.HollywoodLog && window.HollywoodLog.expose('page.expose', '页面.曝光');
        window.WindVane.call('WVPopLayer', 'display', {}, function() {
            // poplayer成功显示
            // alert('display')
            window.HollywoodLog && window.HollywoodLog.expose('display.success', 'poplayer.成功显示');
        }, function() {
            window.HollywoodLog && window.HollywoodLog.expose('display.fail', 'poplayer.显示失败');
        });
        setTimeout(function(){
            canvas.classList.add('show');
        },100)

        //动画设置显示一次，客户端会自动判断readtimes
        window.WindVane.call('WVPopLayer', 'increaseReadTimes', {});
        
        canvasAnim.addEventListener('click', function(){
            window.HollywoodLog && window.HollywoodLog.click('anim.click', '动画.点击');
            setTimeout(function(){
                jumpTo();
                closePoplayer();
            },100);
        })

        //点击关闭 关闭动画
        window.closeIcon.addEventListener('click', function() {
            window.HollywoodLog && window.HollywoodLog.click('closeIcon.click', '关闭icon.点击');
            closePoplayer();
        });
    }

    if(!timer){
        timer = setTimeout(function() {
            window.HollywoodLog && window.HollywoodLog.expose('anima.over', '动画.结束');
            closePoplayer();
        }, window.closeTime);
    }
}
window.onload = init;