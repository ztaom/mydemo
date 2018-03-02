import * as types from './mutation-types';
const mutations = {
    [types.SET_APP](state, platform) {
        state.platform = platform;
    },

    [types.IS_LOGIN](state, isLogin) {
        console.log(isLogin);
        state.isLogin = isLogin;
    },

    // 答题
    // 点击进入下一题
    [types.ADD_ITEMNUM](state, num) {
        state.answser.itemNum += num;
    },
    // 记录答案
    [types.REMBER_ANSWER](state, id) {
        state.answser.answerid.push(id);
    },
    // 记录做题时间
    [types.REMBER_TIME](state) {
        state.answser.timer = setInterval(() => {
            state.answser.allTime++;
        }, 1000);
    },
    // 初始化信息
    [types.INITIALIZE_DATA](state) {
        state.answser.itemNum = 1;
        state.answser.allTime = 0;
        state.answser.answerid = [];
    },

};

export default mutations;