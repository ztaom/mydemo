require('./less/base.less');
require('./less/outsite.less');
import { browser as Browser } from '@ali/browser-detect';
import { logh5 } from '@ali/lib-goldlog';
import callApp from '@ali/yk-callapp';
import HttpURL from '@ali/lib-httpurl';
import mtop from './mtop';

logh5.setActId('315721');
logh5.setPageId('outsite');

const
    _interface_ = {
        api: 'mtop.com.youku.aplatform.weakGet',
        bizType: {
            getShareInfo: `${window.outsiteData.bizTypePre}.Agent.GetShareCardInfo`
        },
        bizParam: {}
    },

    httpurl = new HttpURL(location.href),
    option = httpurl.params;

(function() {
    init();
})();

function init() {
    if ((typeof option.shareKey === 'string') && option.shareKey !== ('undefined' || 'null' || 'false' || '0')) {
        render();
    } else {
        openNormalSharePage();
    }
}

function render() {
    getData().then((ret) => {
        const result = ret.data && ret.data.data;
        if (0 === ret.data.code) {
            result.prizetime = `已有<em>${result.collectedUserCounts}</em>人集齐；${result.shareInfo.prizeDesc}`;
            template(result);
            listen();
        } else {
            openNormalSharePage();
        }
    }, (err) => {
        openNormalSharePage();
        console.log(err);
    });
}

// 打开普通分享页
function openNormalSharePage() {
    const shareUrl = (mtop.env === 'pro') ? window.outsiteData.normalShareUrl : window.outsiteData.shareUrlTest;
    location.href = shareUrl;
}

function getData() {
    const params = {
        api: _interface_.api,
        bizType: _interface_.bizType.getShareInfo,
        bizParam: _interface_.bizParam
    };

    //获取分享信息时生成的token，通过该参数服务端能映射出ytid(登录用户id)、shareType(来源分享页类型，1：赠卡、2：索卡、3：分享任务)、cardId(卡片id，赠卡/索卡/服务端自动发卡的卡片id)
    if (option.shareKey && typeof option.shareKey === 'string' && option.shareKey !== ('undefined' || 'null' || 'false' || '0')) {
        params.bizParam.shareKey = option.shareKey;
    }
    return mtop.request(params);
}

function template(data) {
    const bgPic = window.outsiteData.bgPic;
    const bgStyle = `background:url(${bgPic}) no-repeat center top; background-size:100% auto;`;
    const
        htmlTemp = ` <div id='outsite' style='${bgStyle}'>
            <div class='title'>
                <img src='${data.shareInfo.titlePic}' class='pic'>
            </div>
            <div class='card'>
                <div class='picwrap'><img src='${data.card.popicon}' class='pic'></div>
            </div>
            <input type='hidden' v-model='${data.shareType}' id='shareType'/>
            <div class='getbtn'><img src='${data.shareInfo.btnPic}' class='pic'></div>
            <div class='prizetime'>${data.prizetime}</div>
            <div class='banner'><img src='${window.outsiteData.banner}' class='pic'></div>
        </div>`;
    document.body.innerHTML = htmlTemp;
}

function listen() {
    const getbtn = document.querySelector('.getbtn');
    const shareType = document.getElementById('shareType');
    const gokey = (shareType === 1) ? 'cardgive_lkbtn' : 'cardask_lkbtn';
    getbtn.addEventListener('click', () => {
        logh5.goldlog('CLK', gokey);
        if (!Browser.isYouku && !Browser.isYoukuHD) {
            lunchApp();
        }
    });
}

function lunchApp() {
    const shareType = (option.shareType !== ('undefined' || 'null' || 'false' || '0')) ? option.shareType : '';
    const shareKey = (option.shareKey !== ('undefined' || 'null' || 'false' || '0')) ? option.shareKey : '';
    const sharekey = (option.sharekey !== ('undefined' || 'null' || 'false' || '0')) ? option.sharekey : '';
    const hdUrl = (mtop.env === 'pro') ? window.outsiteData.openUrl : window.outsiteData.openUrlTest;
    const openUrl = `${hdUrl}?shareType=${shareType}&shareKey=${shareKey}&sharekey=${sharekey}&_wvUseWKWebView=YES&isWindVane=1`;
    const ykconfig = {
        isNeedDownload: true,
        downloadUrl: window.outsiteData.downloadUrl, //下载页
        replace: false, //是否替换当前页面
        params: {
            'action': 'http', //http协议
            'url': openUrl, //打开url
            'source': window.outsiteData.source, //APP用source来统计唤起量
            'universalRedirect': window.outsiteData.downloadUrl
        },
        pathname: 'http', //http协议
        exdParams: {
            from: 'ohmygeneral'
        }
    };
    callApp.gotoPage(ykconfig);
}