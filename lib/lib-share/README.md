## lib-share

## H5站外微信、钉钉分享说明



### 首先，加载组件之前必须引入微信或者钉钉对应的apk
    var ua = window.navigator.userAgent.toLowerCase();
    if (/micromessenger/.test(ua)) {
        document.write('<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js" ><\/script>');
    }
    if (/dingtalk/.test(ua)) {
        document.write('<script src="//g.alicdn.com/dingding/open-develop/1.6.9/dingtalk.js" ><\/script>');
    }
    
### 其次组件调用方式有两种，推荐第一种

#### import引入，首先安装，tnpm install @ali/lib-shareh5 --save
    
    import share from '@ali/lib-shareh5';
    share({
        title: '', //对话框标题
        timelineTitle: '', //微信朋友圈显示标题
        desc: '', //对话框分享描述
        link: '', //分享链接
        shareImage: '' //图片地址必须加https或http
    });

注释:以上所有参数均为选填，其中title、timelineTitle和desc默认为页面标题，link默认页面url，shareImage默认为优酷logo图。

#### cnd地址引入，组件中含有mtop请求，所以需要引入mtop库
    <script src="//g.alicdn.com/mtb/lib-mtop/2.3.15/mtop.js"></script>
    <script src="//g.alicdn.com/mtb/lib-promise/3.1.3/polyfillB.js"></script>
    <script src="https://g.alicdn.com/ku/lib-share/0.0.7/lib-share.js" ></script>
    window.shareH5(); //参数同上

## 帮助
- 开发遇到问题可以联系 @山兔

