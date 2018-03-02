import API from '../api';
import * as types from './mutation-types';

console.log(API);
const actions = {
    setApp({commit}, platform) {
        commit('SET_APP', platform);
    },

    getLogin({commit}) {
        API.getLogin((res) => {
            console.log(res);
            commit(types.IS_LOGIN, [res]);
            // resolve(res);
        }, (err) => {
            console.log(err);
            // reject(err);
        });
        // commit(types.IS_LOGIN, [true]);
        // return new Promise((resolve, reject) => {
        //     console.log(API.getLogin);
        //     commit(types.IS_LOGIN, true);
        // });
    },

    // 答题
    addNum({ commit, state }, id) {
        //点击下一题，记录答案id，判断是否是最后一题，如果不是则跳转下一题
        commit('REMBER_ANSWER', id);
        if (state.answser.itemNum < state.answser.itemDetail.length) {
            commit('ADD_ITEMNUM', 1);
        }
    },
    //初始化信息
    initializeData({ commit }) {
        commit('INITIALIZE_DATA');
    }
};

export default actions;