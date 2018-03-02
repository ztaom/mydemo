import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';
import request from '@ali/lib-request';

export const CURRENT_ANSWER = 'CURRENT_ANSWER'; //当前停留在的问题索引
export const DEFAULT_CURRENT_ANSWER = 'DEFAULT_CURRENT_ANSWER'; //默认索引
export const UPDATE_ANSWER = 'UPDATE_ANSWER'; //更新问题答案
export const PRIZE_DATA = 'PRIZE_DATA'; //奖品接口
export const SET_POP_STATE = 'SET_POP_STATE'; //显示弹层

Vue.use(Vuex);
console.log(config);
/*eslint no-console: 0*/
const state = {
    mtConfig:config.mtData,
    mtopConfig:config.mtopConfig,
    answerData:JSON.parse(localStorage.getItem('answerData')) || '',
    current:JSON.parse(localStorage.getItem('answerCurrent')) || {'accuracy' : 0, 'index':0},
    prizeDate:'',
    pop:{
        isShow:false,
        resultPop:false,
        toast:false,
        share:false,
        msg:''
    },
};
function getArrayItems(arr, num){
    const tempArray = [];
    const returnArray = [];
    for (const index in arr) {
        tempArray.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    for (let i = 0; i < num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (tempArray.length > 0) {
            //在数组中产生一个随机索引
            const arrIndex = Math.floor(Math.random() * tempArray.length);
            //将此随机索引的对应的数组元素值复制出来
            returnArray[i] = tempArray[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            tempArray.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return returnArray;
}

const actions = {
    [CURRENT_ANSWER]({commit}, accuracy) {
        if (accuracy) {
            state.current.accuracy++;
        }
        state.current.index++;
        commit(CURRENT_ANSWER, state.current);
    },
    [DEFAULT_CURRENT_ANSWER]({commit}) {
        state.current.accuracy = 0;
        state.current.index = 0;
        commit(CURRENT_ANSWER, state.current);
    },
    [UPDATE_ANSWER]({commit}) {
        request.requestMtop({
            DEV:state.mtopConfig.prefix, //daily pre release
            api:'mtop.com.youku.aplatform.weakGet',
            bizType:'Junshilianmeng2.getExamTitle'
        }).then(res => {
            const data = getArrayItems(res.data.data, 5);
            commit(UPDATE_ANSWER, data);
        }, res => {
            console.log(JSON.stringify(res));
        });
    },
    [PRIZE_DATA]({ commit }) {
        return new Promise((resolve, reject) => {
            request.requestMtop({
                DEV:state.mtopConfig.prefix, //daily pre release
                api:'mtop.com.youku.aplatform.weakGet',
                bizType:'Junshilianmeng2.getPrize',
                bizParam: {
                    type:2,
                    position:'question'
                }
            }).then(res => {
                commit(PRIZE_DATA, res.data);
                resolve(res.data);
            }, res => {
                console.log(JSON.stringify(res));
                reject(res);
            });
        });
    }
};
const mutations = {
    [CURRENT_ANSWER](state, data) {
        localStorage.setItem('answerCurrent', JSON.stringify(data));
        state.current = data;
    },
    [UPDATE_ANSWER](state, data) {
        localStorage.setItem('answerData', JSON.stringify(data));
        state.answerData = data;
    },
    [SET_POP_STATE](state, [popName, popState, msg]) {
        state.pop.resultPop = false;
        state.pop.toast = false;
        state.pop.share = false;
        state.pop.isShow = popState;
        state.pop[popName] = popState;
        state.pop.msg = msg;
    },
    [PRIZE_DATA](state, data){
        state.prizeDate = data;
    }
};
export default new Vuex.Store({
    state,
    actions,
    mutations,
});