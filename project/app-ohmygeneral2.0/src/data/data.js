import mtop from '../mtop';
import HttpURL from '@ali/lib-httpurl';
const httpurl = new HttpURL(location.href);

export default {
    // getCookie(cName) { //获取cookie
    //     const cookieList = document.cookie;
    //     if (cookieList.length > 0) {
    //         let cStart = cookieList.indexOf(`${cName}=`);
    //         if (parseInt(cStart) !== -1) {
    //             cStart = cStart + cName.length + 1;
    //             let cEnd = cookieList.indexOf(';', cStart);
    //             if (parseInt(cEnd) === -1) cEnd = cookieList.length;
    //             return unescape(cookieList.substring(cStart, cEnd));
    //         } else {
    //             return '';
    //         }
    //     } else {
    //         return '';
    //     }
    // },
    // getLoginState() { //判断是否登录
    //     const PSck = this.getCookie('P_sck');
    //     const yktk = this.getCookie('yktk');

    //     if (PSck.toString() !== '' || yktk.toString() !== '') {
    //         //已登录
    //         return true;
    //     } else {
    //         //未登录
    //         return false;
    //     }
    // },
    getLoginState() { //获取登录态
        const params = {
            api: 'mtop.com.youku.aplatform.weakGet',
            bizType: 'Ku_Login',
            bizParam: {}
        };
        return mtop.request(params);
    },
    async getInitData() { //基本信息接口
        const loginData = await this.getLoginState();
        console.log(loginData.data.isLogin);
        const loginState = (loginData && loginData.data && loginData.data.isLogin) || false;
        const reqType = loginState ? 'securySet' : 'weakGet';
        // alert(`reqType:${reqType}`);
        const params = {
            api: `mtop.com.youku.aplatform.${reqType}`,
            bizType: `${window.mgData.bizTypePre}.Agent.GetBaseInfo`,
            bizParam: {}
        };
        const option = httpurl.params;
        if (option.shareKey && Number(option.shareType)) {
            params.bizParam.shareType = Number(option.shareType); //shareType(来源分享页类型，1：赠卡、2：索卡、3：分享任务)
            params.bizParam.shareKey = option.shareKey; //获取分享信息时生成的token，通过该参数服务端能映射出ytid(登录用户id)、cardId(卡片id，赠卡/索卡/服务端自动发卡的卡片id)
        }
        return mtop.request(params);
    },
    getRecordData() {
        //获取卡片记录数据 更新state.recordData
        const params = {
            api: 'mtop.com.youku.aplatform.get',
            bizType: `${window.mgData.bizTypePre}.Agent.GetCardRecord`,
        };
        return mtop.request(params);
    },
    getPrizeData() { //开奖接口
        //请求成功后需要更新state.cardData、state.initData、state.openPrizeData
        const params = {
            api: 'mtop.com.youku.aplatform.securySet', //上线时替换为securySet
            bizType: `${window.mgData.bizTypePre}.JS2Activity.OpenPrize`,
        };
        return mtop.request(params);
    },
    setShareTask(token) {
        //首次完成分享得卡任务，请求数据库更新数据
        //请求成功后需要更新state.cardData、state.initData、state.taskData、state.tipsData
        const params = {
            api: 'mtop.com.youku.aplatform.securySet',
            bizType: `${window.mgData.bizTypePre}.Agent.GetShareTaskCard`,
            bizParam: {
                shareKey: token
            }
        };
        return mtop.request(params);
    },
    getShareInfo(option) { //获取分享信息
        const params = {
            api: 'mtop.com.youku.aplatform.securySet',
            bizType: `${window.mgData.bizTypePre}.Agent.ShareResponse`,
            bizParam: {
                shareType: option.shareType
            }
        };
        if (option.cardId) {
            params.bizParam.cardId = option.cardId;
        }
        return mtop.request(params);
    },
    getVideoPrize() { //看视频抽奖接口
        const params = {
            api: 'mtop.com.youku.aplatform.securySet', //上线时替换为securySet
            bizType: `${window.mgData.bizTypePre}.Agent.GetVideoPrize`,
        };
        return mtop.request(params);
    },
    organizeBaseData(res) {
        const hoMap = new Map(); //首页彩色卡片映射
        const baMap = new Map(); //首页灰色卡片映射
        const caMap = new Map(); //详情卡片映射
        const piMap = new Map(); //弹窗卡片映射
        let rolesList = [];
        if (res && res.roles && res.roles.length === 5) {
            rolesList = res.roles;
        } else {
            rolesList = window.mgData.dafaultInfo.roles;
        }

        rolesList.forEach(role => {
            hoMap.set(role.id, role.icon);
            baMap.set(role.id, role.backicon);
            caMap.set(role.id, role.cardicon);
            piMap.set(role.id, role.popicon);
        });

        const iMap = {
            homeIcon: hoMap,
            backIcon: baMap,
            cardIcon: caMap,
            popIcon: piMap
        };

        const coData = {
            rctime: res.rctime, //服务器当前时间戳
            openchamtime: res.openchamtime, //开奖时间（时间戳）
            endchamtime: res.endchamtime, //当期开奖结束时间
            tips: res.tips || null, //提示
            isLogin: res.islogin || false
        };

        const iData = {
            rctime: res.rctime, //服务器当前时间戳
            rcount: res.rcount || 0, //已经集齐总人数
        };

        const cadata = {
            isopencham: res.isopencham, //是否开过奖品
            tcount: res.tcount, //将军令总数
            avaliable: res.avaliable, //是否集齐
            roles: res.roles || null, //每个将军令对象
            allRoles: res.allRoles || null //所有卡片，包括一期二期
        };

        const dataList = {
            initData: iData,
            constData: coData,
            cardData: cadata,
            taskData: res.task,
            awardNews: res.awardNews,
            isLogin: res.islogin || false,
            iconMap: iMap
        };
        return dataList;
    },
    organizePrizeData(res) {
        const iData = {
            rctime: res.rctime, //服务器当前时间戳
            rcount: res.rcount || 0, //已经集齐总人数
        };

        const cadata = {
            isopencham: res.isopencham, //是否开过奖品
            tcount: res.tcount, //将军令总数
            avaliable: res.avaliable, //是否集齐
            roles: res.roles || null, //每个将军令对象
            allRoles: res.allRoles || null //所有卡片，包括一期二期
        };

        const opData = {
            awardcode: res.awardcode,
            openAward: res.openAward
        };

        const dataList = {
            initData: iData,
            cardData: cadata,
            openPrizeData: opData
        };
        return dataList;
    },
    organizeShareData(res) {
        const iData = {
            rctime: res.rctime, //服务器当前时间戳
            rcount: res.rcount || 0, //已经集齐总人数
        };

        const cadata = {
            isopencham: res.isopencham, //是否开过奖品
            tcount: res.tcount, //将军令总数
            avaliable: res.avaliable, //是否集齐
            roles: res.roles || null, //每个将军令对象
            allRoles: res.allRoles || null //所有卡片，包括一期二期
        };
        const stData = {
            isShowPop: res.cardCount ? true : false,
            cardCount: res.cardCount || null,
            cardList: res.cardList || null,
            randomAward: res.randomAward || null
        };

        const dataList = {
            initData: iData,
            cardData: cadata,
            taskData: res.task,
            awardNews: res.awardNews,
            shareTipsData: stData
        };
        return dataList;
    },
    getLetterCard() {
        //单卡抽奖页面接口
        const params = {
            api: 'mtop.com.youku.aplatform.SecurySet',
            bizType: 'agent_zh.Agent.GetSingleCardPrize'
        };
        return mtop.request(params);
    },
    openLetterCard() {
        //单卡抽奖页面接口
        const params = {
            api: 'mtop.com.youku.aplatform.SecurySet',
            bizType: 'agent_zh.Agent.OpenSingleCardPrize'
        };
        return mtop.request(params);
    }
};
