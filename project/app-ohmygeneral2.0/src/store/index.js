import Vue from 'vue';
import Vuex from 'vuex';
import Data from '../data/data';
import * as types from './mutation-types';
// import Bus from '../common/bus.js';
// import fn from '../common/login';
import { logh5 } from '@ali/lib-goldlog';

Vue.use(Vuex);

const hoMap = new Map(); //首页彩色卡片映射
const baMap = new Map(); //首页灰色卡片映射
const caMap = new Map(); //详情卡片映射
const piMap = new Map(); //弹窗卡片映射

window.mgData.dafaultInfo.roles.forEach(role => {
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

const state = {
    initData: {
        rctime: null, //当前时间戳
        rcount: window.mgData.dafaultInfo.rcount, //已经集齐总人数默认为0
    },
    constData: {
        rctime: null, //当前时间戳
        tips: null, //提示
        openchamtime: null, //开奖时间
        endchamtime: null, //当期开奖结束时间
        isLogin: false, //默认为未登录
    },
    awardNews: [
        '12345 获得了一等奖',
        '67890 获得了二等奖'
    ],
    cardData: {
        isopencham: false, //是否开过奖品，默认为没开奖
        tcount: 0, //我的将军令总数，默认为0
        avaliable: false, //是否集齐,默认为没有集齐
        roles: window.mgData.dafaultInfo.roles,
        allRoles: '' //更新所有卡包列表数据
    },
    taskData: {
        sharedtask: true, //是否可用分享任务:true,可用(未完成);false,不可用(已完成)
        sharedtaskFinishCount: 0, //分享任务完成次数
        videotask: true, //是否可用视频观看任务:true,可用(未完成);false,不可用(已完成)
        videotaskFinishCount: 0, //观看视频完成次数
        startask: true, //是否可用星球任务:true,可用(未完成);false,不可用(已完成)
        startaskFinishCount: 0, //星球任务完成次数
        randomtask: true, //是否可用首次登录任务:true,可用(未完成);false,不可用(已完成)
        randomtaskFinishCount: 1, //访问任务完成次数
    },
    recordData: null,
    openPrizeData: null,
    isLogin: false, //默认为未登录
    dialogLoginShow: false, //诱导用户去登录弹窗是否显示
    dialogCHShow: false, //获得卡片记录弹窗是否显示
    iconMap: iMap, //3类卡片映射地址
    commPopData: null, //通用弹窗数据
    cardPopData: null, //得卡提示弹窗数据
    videoPrize: null, //看视频所得奖品
    detailIndex: -1, //【卡片详情】数据显示索引
    detailShow: false, //【卡片详情】显隐
    recordReload: false, //得卡明细页“重新加载”显隐
    showLowverion: false, //低版本提示弹窗，显隐
    noTouchmove: false,
    showSafeTip: false, //安全提示弹窗，显隐
    durOpenTime: null, //当前时间距离开奖时间的时间差
    durEndTime: null, //当前时间距离开奖结束时间的时间差
    lightTips: null, //轻提示弹窗，显隐
    showMasker: true, //透明全屏遮罩
    showMe: true, //透明全屏遮罩
};
const popObj = {
    text: window.mgData.baseInfo.dataErrorText, //'网络异常请稍后重试'
    isShowPop: true
};

const actions = {
    async getInitData(context) { //基本信息接口
        const params = {
            text: window.mgData.baseInfo.dataErrorText, //'网络异常请稍后重试'
            isShowPop: true,
            btnText: window.mgData.initPop.resetBtn, //'重试'按钮
            isShowBtn: true,
            reloadType: 'getInitData',
        };
        try {
            const res = await Data.getInitData();
            console.log('基本信息接口:', res);
            const retArray = res.ret && res.ret[0] && res.ret[0].split('::');
            if (retArray && retArray[0] === 'FLOW_CONTROL') {
                //走限流提示
                window.localStorage.setItem('errorLog', `getInitData接口限流:${JSON.stringify(res)}`);
                logh5.goldlog('EXP', `mtopError_getInitData_${JSON.stringify(res)}`);
                context.commit('LIGHT_TIP', params);
            } else {
                if (parseInt(res.data.code) === 0) {
                    context.commit('SHOW_MASKER', false); //隐藏全屏遮罩
                    context.commit(types.INIT_DATA, res.data.data);
                    //Bus.$emit(types.INIT_DATA, res.data.data);
                } else if (parseInt(res.data.code) === -8) {
                    context.commit(types.SAFE_TIP, true);
                }
            }
        } catch (e) {
            console.log(e);
            window.localStorage.setItem('errorLog', `GetBaseInfo错误日志:${JSON.stringify(e)}`);
            logh5.goldlog('EXP', `mtopError_GetBaseInfo_${JSON.stringify(e)}`);
            context.commit('LIGHT_TIP', params);
        }
    },
    async getRecordData(context) { //获取卡片记录接口
        try {
            const res = await Data.getRecordData();
            const retArray = res.ret && res.ret[0] && res.ret[0].split('::');
            if (retArray && retArray[0] === 'FLOW_CONTROL') {
                //走限流提示
                window.localStorage.setItem('errorLog', `getRecordData接口限流:${JSON.stringify(res)}`);
                logh5.goldlog('EXP', `mtopError_getRecordData_${JSON.stringify(res)}`);
                context.commit('RECORD_RELOAD', true);
            } else {
                context.commit('RECORD_RELOAD', false);
                context.commit(types.RECORD_DATA, res.data.data);
            }
        } catch (e) {
            console.log(e);
            window.localStorage.setItem('errorLog', `getRecordData错误日志:${JSON.stringify(e)}`);
            logh5.goldlog('EXP', `mtopError_getRecordData_${JSON.stringify(e)}`);
            context.commit('RECORD_RELOAD', true);
        }
    },
    async getPrizeData(context) { //开奖接口
        try {
            const res = await Data.getPrizeData();
            const retArray = res.ret && res.ret[0] && res.ret[0].split('::');
            if (retArray && retArray[0] === 'FLOW_CONTROL') {
                //走限流提示
                window.localStorage.setItem('errorLog', `getPrizeData接口限流:${JSON.stringify(res)}`);
                logh5.goldlog('EXP', `mtopError_getPrizeData_${JSON.stringify(res)}`);
                context.commit('LIGHT_TIP', popObj);
            } else {
                if (res.data && (parseInt(res.data.code) === 0)) {
                    context.commit(types.PRIZE_DATA, res.data.data);
                } else {
                    window.localStorage.setItem('errorLog', `getPrizeData接口限流:${JSON.stringify(res)}`);
                    logh5.goldlog('EXP', `mtopError_getPrizeData_${JSON.stringify(res)}`);
                    context.commit('LIGHT_TIP', popObj); //开奖接口，容错：文案提示重试
                }
            }
        } catch (e) {
            console.log('开奖接口异常：', e);
            window.localStorage.setItem('errorLog', `getPrizeData错误日志:${JSON.stringify(e)}`);
            logh5.goldlog('EXP', `mtopError_getPrizeData_${JSON.stringify(e)}`);
            context.commit('LIGHT_TIP', popObj); //开奖接口，容错：文案提示重试
        }
    },
    async setShareTask(context, shareKey) { //首次完成分享得卡任务，请求数据库更新数据
        try {
            const res = await Data.setShareTask(shareKey);
            const retArray = res.ret && res.ret[0] && res.ret[0].split('::');
            if (retArray && retArray[0] === 'FLOW_CONTROL') {
                //走限流提示
                window.localStorage.setItem('errorLog', `setShareTask接口限流:${JSON.stringify(res)}`);
                logh5.goldlog('EXP', `mtopError_setShareTask_${JSON.stringify(res)}`);
                context.commit('LIGHT_TIP', popObj);
            } else {
                if (res.data && parseInt(res.data.code) === 0) {
                    context.commit(types.SHARE_TASK, res.data.data);
                } else {
                    context.commit('LIGHT_TIP', popObj); //分享任务得卡接口，容错：文案提示重试
                }
            }
        } catch (e) {
            console.log(e);
            window.localStorage.setItem('errorLog', `setShareTask错误日志:${JSON.stringify(e)}`);
            logh5.goldlog('EXP', `mtopError_setShareTask_${JSON.stringify(e)}`);
            context.commit('LIGHT_TIP', popObj); //分享任务得卡接口，容错：文案提示重试
        }
    },
    async getVideoPrize(context) { //卡片详情，看视频n秒后请求抽奖
        try {
            const res = await Data.getVideoPrize();
            context.commit(types.VIDEO_PRIZE, res.data.data);
        } catch (e) {
            console.log(e);
            window.localStorage.setItem('errorLog', `getVideoPrize错误日志:${JSON.stringify(e)}`);
            logh5.goldlog('EXP', `mtopError_getVideoPrize_${JSON.stringify(e)}`);
            context.commit(types.VIDEO_PRIZE, 'error'); //看短视频抽奖，容错：提示没中奖
        }
    },
};

const mutations = {
    [types.INIT_DATA](state, payload) {
        const dataList = Data.organizeBaseData(payload);
        console.log('基本信息:', dataList);
        state.isLogin = dataList.isLogin;
        state.initData = dataList.initData;
        state.constData = dataList.constData;
        //如果roles对象丢失或者为空数组，则cardData数据不更新
        if (dataList.cardData.roles && dataList.cardData.roles.length === 5 || dataList.cardData.allRoles && dataList.cardData.allRoles.length > 0) {
            state.cardData = dataList.cardData;
        }
        state.showMe = true;
        state.taskData = dataList.taskData;
        state.iconMap = dataList.iconMap;
        state.awardNews = dataList.awardNews;
    },
    [types.RECORD_DATA](state, payload) {
        state.recordData = payload;
        console.log('卡片记录:', payload);
    },
    [types.PRIZE_DATA](state, payload) {
        if (payload === 'error') {
            state.openPrizeData = payload;
        } else {
            const dataList = Data.organizePrizeData(payload);
            console.log('开奖信息:', dataList);
            state.initData = dataList.initData;
            if (dataList.cardData.roles && dataList.cardData.roles.length === 5) { //如果roles对象丢失或者为空数组，则cardData数据不更新
                state.cardData = dataList.cardData;
            }
            if (dataList.cardData.allRoles && dataList.cardData.allRoles.length > 0) { //如果roles对象丢失或者为空数组，则cardData数据不更新
                state.cardData = dataList.cardData;
            }
            state.openPrizeData = dataList.openPrizeData;
        }
    },
    [types.SHARE_TASK](state, payload) {
        const dataList = Data.organizeShareData(payload);
        console.log('分享任务:', dataList);
        state.initData = dataList.initData;
        if (dataList.cardData.roles && dataList.cardData.roles.length === 5) { //如果roles对象丢失或者为空数组，则cardData数据不更新
            state.cardData = dataList.cardData;
        }
        if (dataList.cardData.allRoles && dataList.cardData.allRoles.length > 0) { //如果roles对象丢失或者为空数组，则cardData数据不更新
            state.cardData = dataList.cardData;
        }
        state.taskData = dataList.taskData;
        state.cardPopData = dataList.shareTipsData;
        state.showMe = true;
    },
    [types.VIDEO_PRIZE](state, payload) {
        state.videoPrize = payload;
        console.log('看视频抽奖:', payload);
    },
    [types.SHOW_LOGIN_TOAST](state, dialogLoginShow) {
        state.dialogLoginShow = (dialogLoginShow && !state.isLogin) ? true : false;
    },
    [types.SHOW_DIALOG](state, dialogName) {
        state[dialogName] = true;
    },
    [types.HIDE_DIALOG](state, dialogName) {
        state[dialogName] = false;
    },
    [types.NO_MOVE](state) {
        state.noTouchmove = false;
    },
    [types.YES_MOVE](state) {
        state.noTouchmove = true;
    },
    [types.COMMPOP_DATA](state, payload) {
        state.commPopData = payload;
    },
    [types.CARDPOP_DATA](state, payload) {
        state.cardPopData = payload;
    },
    [types.DETAIL_INDEX](state, payload) {
        state.detailIndex = payload;
    },
    [types.DETAIL_SHOW](state, payload) {
        state.detailShow = payload;
    },
    [types.RECORD_RELOAD](state, payload) {
        state.recordReload = payload;
    },
    [types.SHOW_LOWVERSION](state, payload) {
        state.showLowverion = payload;
    },
    [types.SAFE_TIP](state, payload) {
        state.showSafeTip = payload;
    },
    [types.DUROPENTIME](state, payload) {
        state.durOpenTime = payload;
    },
    [types.DURENDTIME](state, payload) {
        state.durEndTime = payload;
    },
    [types.UPDATE_ROLES](state, data) {
        state.cardData.allRoles = data;
    },
    [types.LIGHT_TIP](state, payload) {
        state.lightTips = payload;
    },
    [types.SHOW_MASKER](state, payload) {
        state.showMasker = payload;
    },
    [types.SHOW_ME](state, payload) {
        state.showMe = payload;
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions
});
