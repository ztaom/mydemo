<script>
import IndexVideo from './indexVideo';
// import CardShow from './cardShow';
// import Task from './task';
// import PrizeShow from './prizeShow';
// import VideoList from './videoList';
// import StarList from './starList';
// import Ads from './ads';
// import BannerOne from './bannerOne';
// import BannerTwo from './bannerTwo';
// import BannerThree from './bannerThree';
// import Dialog from './dialog';
// import Main from './main';
// import Login from './login';
// import CommPop from './commPop';
import CardPop from './cardPop';
// import LowVersion from './lowVersion';
// import UnSafe from './unSafe';
// import TipsPop from './tipsPop';
import mtData from '../data/mt-data';

export default {
    name: 'index',
    components: {
        // 'page-indexVideo': () => import('./indexVideo'),
        'page-task': () => import('./task'),
        'page-cardShow': () => import('./cardShow'),
        'page-prizeShow': () => import('./prizeShow'),
        'page-videoList': () => import('./videoList'),
        'page-bannerOne': () => import('./bannerOne'),
        'page-bannerTwo': () => import('./bannerTwo'),
        'page-bannerThree': () => import('./bannerThree'),
        'page-starList': () => import('./starList'),
        'page-ads': () => import('./ads'),
        'page-main': () => import('./main'),
        'page-login': () => import('./login'),
        'page-commpop': () => import('./commPop'),
        // 'page-cardPop': () => import('./cardPop'),
        'page-lowVersion': () => import('./lowVersion'),
        'page-unSafe': () => import('./unSafe'),
        'page-tipsPop': () => import('./tipsPop'),
        'page-indexVideo': IndexVideo,
        // 'page-task': Task,
        // 'page-cardShow': CardShow,
        // 'page-prizeShow': PrizeShow,
        // 'page-videoList': VideoList,
        // 'page-bannerOne': BannerOne,
        // 'page-bannerTwo': BannerTwo,
        // 'page-bannerThree': BannerThree,
        // 'page-starList': StarList,
        // 'page-ads': Ads,
        // 'page-dialog': Dialog,
        // 'page-main': Main,
        // 'page-login': Login,
        // 'page-commpop': CommPop,
        'page-cardPop': CardPop,
        // 'page-lowVersion': LowVersion,
        // 'page-unSafe': UnSafe,
        // 'page-tipsPop': TipsPop,
    },
    render(createElement) {
        if (this.$store.state.initData) {
            mtData.setMTData(window.mgData);
            window.commonData.shareDefault = {
                shareTitle: '默认分享标题',
                shareUrl: '默认分享链接',
                shareDesc: '默认分享描述',
                shareImg: '默认分享图片',
                shareDocId: '默认分享文案对应id',
            };
            //待添加MT兜底数据
            if (window.mgData && window.mgData.defaultShareInfo) {
                window.commonData.shareDefault.shareTitle = window.mgData.defaultShareInfo.title || window.commonData.shareDefault.shareTitle;
                window.commonData.shareDefault.shareDesc = window.mgData.defaultShareInfo.desc || window.commonData.shareDefault.shareDesc;
                window.commonData.shareDefault.shareImg = window.mgData.defaultShareInfo.img || window.commonData.shareDefault.shareImg;
                window.commonData.shareDefault.shareUrl = window.mgData.defaultShareInfo.url || window.commonData.shareDefault.shareUrl;
                window.commonData.shareDefault.shareDocId = window.mgData.defaultShareInfo.shareDocId || window.commonData.shareDefault.shareDocId;
            }
            const templateArr = [
                createElement('page-main'),
                createElement('page-login'),
                createElement('page-commpop'),
                createElement('page-cardPop'),
                createElement('page-lowVersion'),
                createElement('page-unSafe'),
                createElement('page-tipsPop'),
                // createElement('page-dialog'),
            ];
            //遍历id和pic对应关系
            const itemDefault = [
                'page-indexVideo',
                'page-task',
                'page-cardShow',
                'page-prizeShow',
                'page-videoList',
                'page-bannerOne',
                'page-bannerTwo',
                'page-bannerThree',
                'page-starList',
                'page-ads'
            ];
            const dataStructure = window.mgData.structure;
            dataStructure.forEach((item, idx) => {
                const modList = item.mod || itemDefault[idx];
                templateArr.push(createElement(modList));
            });
            return createElement('div', templateArr);
        }
    }
};
</script>
