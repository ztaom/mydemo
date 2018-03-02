import './less/guajiao.less';
import '@ali/ykfe-orbit-bridge';
import { browser } from '@ali/browser-detect';
import { logpop } from '@ali/lib-goldlog';
import request from '@ali/lib-request';
import Bridge from '@ali/lib-bridge';
import queryString from 'query-string';

// const pageData = {
//     'bottomRob':'//gw.alicdn.com/tfs/TB18snFgGagSKJjy0FgXXcRqFXa-92-92.png',
//     'changePic':{
//         'data': [
//             {'pic': '//gw.alicdn.com/bao/uploaded/TB1EsXWhfNNTKJjSspfXXbXIFXa-304-110.png'},
//             {'pic': '//gw.alicdn.com/bao/uploaded/TB1EsXWhfNNTKJjSspfXXbXIFXa-304-110.png'}
//         ],
//         'probability': false
//     },
//     'rotatePic': '//gw.alicdn.com/tfs/TB1Q_DkgPihSKJjy0FeXXbJtpXa-102-102.png',
//     'topRob': '//gw.alicdn.com/tfs/TB1vjHkgPihSKJjy0FeXXbJtpXa-80-80.png',
//     'hdIndex': '//h5.m.youku.com//ju/ohmygeneral.html',
//     'hbyLink': '//h5.m.youku.com//ju/redpacketrain.html?scene=vip_show&source=index&env=pre',
//     'DEV':'pre',
//     'openhby': true
// };
class Kakari{
    constructor(){
        this.args = queryString.parse(location.search);
        logpop.setActId('315721');
        logpop.setPageId('guajiao');
        this.MathRandom();
        this.showPop();

        this.bind();
        document.addEventListener('soku_closeH5', (data) => {
            this.closePop();
        }, false);
    }
    bind(){
        document.querySelector('.guajiao').addEventListener('click', this.returnLink.bind(this));
    }
    MathRandom(){
        this.randomNums = parseInt(Math.random() * 2);
        /*eslint no-undef: 0*/
        const picData = pageData.changePic.data,
            probability = pageData.changePic.probability,
            bigPic = picData[0].pic,
            bigRandomPic = picData[this.randomNums] ? picData[this.randomNums].pic : picData[0].pic;
        if (probability) {
            document.querySelector('.picleft').querySelector('.pic').style.backgroundImage = `url(${bigRandomPic})`;
            document.querySelector('.picright').querySelector('.pic').style.backgroundImage = `url(${bigRandomPic})`;
        } else {
            document.querySelector('.picleft').querySelector('.pic').style.backgroundImage = `url(${bigPic})`;
            document.querySelector('.picright').querySelector('.pic').style.backgroundImage = `url(${bigPic})`;
        }
    }
    returnLink(){
        /*eslint no-alert: 0*/
        if (this.isClick) return;
        this.isClick = true;
        if (this.args.debug) {
            alert(pageData.openhby);
        }
        if (pageData.openhby) {
            if (this.args.debug) {
                alert('红包雨逻辑');
            }
            request.sameMtop({
                DEV:pageData.DEV,
                api:'mtop.youku.communityplays.luckydrawservice.getprompt',
                type:'POST',
                data:{
                    model:{
                        scene:'yk_index'
                    },
                    header:{
                        utdid:Bridge.getUtdid()
                    }
                }
            }).then(data => {
                this.isClick = false;
                /*eslint no-unused-vars: 0*/
                this.restChance = data.data.data.restChance;
                this.startTimestamp = data.data.data.startTimestamp;
                this.endTimestamp = data.data.data.endTimestamp;
                const currentTime = new Date().getTime();
                if (currentTime >= this.startTimestamp && currentTime <= this.endTimestamp && this.restChance) {
                    //进入红包雨
                    logpop.goldlog('CLK', 'clickGo', {id: `pic_${this.randomNums + 1}`, qx: 'path_hby'});
                    // location.href = url;
                    const url = pageData.hbyLink.indexOf('?') > 0 ? `${pageData.hbyLink}&shouldHideNavigationBar=1&webview=1` : `${pageData.hbyLink}?shouldHideNavigationBar=1&webview=1`;
                    this.webViewUrl(url);
                } else {
                    logpop.goldlog('CLK', 'clickGo', {id: `pic_${this.randomNums + 1}`, qx: 'path_jk'});
                    Bridge.loadUrl({
                        link:pageData.hdIndex
                    });
                }
            }, data => {
                this.isClick = false;
                logpop.goldlog('CLK', 'clickGo', {id: `pic_${this.randomNums + 1}`, qx: 'path_jk'});
                Bridge.loadUrl({
                    link:pageData.hdIndex
                });
            });
        } else {
            if (this.args.debug) {
                alert('活动首页');
            }
            this.isClick = false;
            logpop.goldlog('CLK', 'clickGo', {id: `pic_${this.randomNums + 1}`, qx: 'path_jk'});
            Bridge.loadUrl({
                link:pageData.hdIndex
            });
        }
    }
    closePop(){
        document.querySelector('.wrap').classList.add('hide');
        window.WindVane.call('WVPopLayer', 'close', {});
    }
    showPop(){
        window.WindVane.call('WVPopLayer', 'display', {});
        document.querySelector('.wrap').classList.add('show');
        logpop.goldlog('EXP', 'exposure');
    }
    webViewUrl(linkhref){
        if (this.args.debug) {
            alert(linkhref);
        }

        if (!/^youku:\/\//.test(linkhref) && browser.isIOS) {
            linkhref = `youku://planet/web?url=${encodeURIComponent(linkhref)}`;
        }
        if (browser.isAndroid) {
            if (this.getVersions() <= 61130) {
                const url = `youku://planet/web?url=${encodeURIComponent(linkhref)}`;
                linkhref = `https://h.planet.youku.com/load.html?target=${encodeURIComponent(url)}`;
                if (this.args.debug) {
                    alert(linkhref);
                }
                window.WindVane.call('WVPopLayer', 'navToUrl', {'url': linkhref});
            } else {
                Bridge.loadUrl({
                    link:linkhref
                });
            }
        } else {
            orbit.bridge.jump(`${linkhref}`);
        }
    }
    getCookie(key) {
        const cookieName = `${encodeURIComponent(key)}=`,
            cookieStart = document.cookie.indexOf(cookieName);
        let cookieValue = null,
            cookieEnd;

        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    }
    getVersions(){
        const versionsArr = browser.version.split('.');
        const versions = versionsArr[0] * 10000 + versionsArr[1] * 100 + versionsArr[2] * 10;
        return versions;
    }
}
/*eslint no-unused-vars: 0*/
const kakari = new Kakari();
