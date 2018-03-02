import Mtop from '../mtop';
import goldLog from '../common/goldLog';

const
    hdName = 'Junshilianmeng2',
    _interfaces = {
        bizType: {
            getLoginState: 'Ku_Login', //判断是否登录,
            getGameConfig: `${hdName}.getGameConfig`, // 查询游戏相关配置,
            getOpponent: `${hdName}.getOpponent`, // 获取对手,
            setRecord: `${hdName}.setRecord`, // 添加挑战记录,
            getTopRank: `${hdName}.getTopRank`, // 排行榜,
            getPrize: `${hdName}.getPrize`, // 权益发放,
            addPlayChance: `${hdName}.addPlayChance`, // 增加游戏资格,
            usePlayChance: `${hdName}.usePlayChance`, // 使用游戏资格,
            queryPlayChance: `${hdName}.queryPlayChance`, // 查询游戏资格,
            queryBoxStatus: `${hdName}.queryBoxStatus`, // 用户宝箱状态查询,
            grantBox: `${hdName}.grantBox`, // 发放用户宝箱,
            unlockBox: `${hdName}.unlockBox`, // 用户解锁宝箱,
            openBox: `${hdName}.openBox`, // 用户打开宝箱,
            getOpponentHistory: `${hdName}.getOpponentHistory`, // 我的挑战记录,
            useGameItem: `${hdName}.useGameItem`
        },
        weakGet: 'mtop.com.youku.aplatform.weakGet',
        get: 'mtop.com.youku.aplatform.get',
        securySet: 'mtop.com.youku.aplatform.securySet',
    };

export default {
    /**
     * 1.
     * 获取游戏相关配置
     * @param {*} args，接口需要的参数
     * @param {*} success
     * @param {*} errorCb
     */
    getGameConfig(success, errorCb) {
        const params = {
            api: _interfaces.weakGet,
            bizType: _interfaces.bizType.getGameConfig,
            bizParam: ''
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                success(result);
            } else {
                errorCb();
            }
        }, (err) => {
            const gokey = `page=junshi2&longua=${JSON.stringify(navigator.userAgent)}&info=${JSON.stringify(err)}&curl=${location.href}`;
            goldLog.sendLog({
                gokey
            });
            errorCb(err);
        });
    },

    /**
     * 2.
     * 选择武将 & 选择对手
     * @param {*} args，接口需要的参数
     * @param {*} cb
     * @param {*} errorCb
     */
    getOpponent(cb, errorCb) {
        const params = {
            api: _interfaces.weakGet,
            bizType: _interfaces.bizType.getOpponent,
            bizParam: ''
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                cb(result.data);
            }
        }, (err) => {
            console.log(err);
            errorCb(err);
        });
    },

    /**
     * 3.
     * 登录用户开始游戏，需要使用游戏资格 || 再玩一次，消耗游戏资格
     * @param {*} args，接口需要的参数
     * @param {*} cb
     * @param {*} errorCb
     */
    usePlayChance(cb, errorCb) {
        const params = {
            api: _interfaces.get,
            bizType: _interfaces.bizType.usePlayChance,
            bizParam: ''
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                cb(result.data);
            } else if (1003 === result.code) {
                errorCb(result.data);
            }
        }, (err) => {
            errorCb(err);
        });
    },

    /**
     * 4
     * 查询当前用户的游戏资格
     * @param {*} args，接口需要的参数
     * @param {*} callback
     * @param {*} errorCb
     */

    queryPlayChance(callback, errorcb) {
        const params = {
            api: _interfaces.get,
            bizType: _interfaces.bizType.queryPlayChance,
            bizParam: ''
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                callback(result.data);
            }
        }, (err) => {
            errorcb(err);
        });
    },

    /**
     * 5.
     * 找好友PK，分享成功回来增加一次游戏资格
     * @param {*} args，接口需要的参数
     * type//1:星球任务,2:看剧任务,3:分享任务,4:每日免费资格领取
     * @param {*} callback
     * @param {*} errorCb
     */
    addPlayChance(args, callback, errorCb) {
        const data = {
            taskId: args.taskId
        };
        const params = {
            api: _interfaces.get,
            bizType: _interfaces.bizType.addPlayChance,
            bizParam: data
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                callback(result.data);
            } else {
                errorCb(res.data);
            }
        }, (err) => {
            errorCb(err);
        });
    },


    /**
     * 6.
     * 解锁宝箱
     * @param {*} args，接口需要的参数
     * @param {*} callback
     * @param {*} errorCb
     */
    unlockBox(args, callback, errorCb) {
        console.log('args', args);
        const data = {
            boxId: args.boxId,
            seq: args.seq,
        };
        console.log('data', data);
        const params = {
            api: _interfaces.get,
            bizType: _interfaces.bizType.unlockBox,
            bizParam: data
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            callback(result);
        }, (err) => {
            errorCb(err);
        });
    },

    /**
     * 7.
     *  打开宝箱
     * @param {*} args，接口需要的参数
     * @param {*} callback
     * @param {*} errorCb
     */
    openBox(args, callback, errorCb) {
        const data = {
            boxId: args.boxId,
            seq: args.seq,
        };
        const params = {
            api: _interfaces.get,
            bizType: _interfaces.bizType.openBox,
            bizParam: data
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                callback(result.data);
            } else {
                errorCb(res);
            }
        }, (err) => {
            errorCb(err);
        });
    },

    /**
     * 8.
     *  添加挑战记录
     * @param {*} args，接口需要的参数
     * @param {*} callback
     * @param {*} errorCb
     */
    setRecord(args, callback, errorCb) {
        const params = {
            api: _interfaces.weakGet,
            bizType: _interfaces.bizType.setRecord,
            bizParam: args
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            console.log(res);
            if (0 === result.code) {
                callback(result.data, res.data.sysTime);
            }
        }, (err) => {
            console.log(err);
            errorCb(err);
        });
    },

    /**
     * 9.
     *  我的挑战记录
     * @param {*} args，接口需要的参数
     * @param {*} callback
     * @param {*} errorCb
     */
    getOpponentHistory(args, callback, errorCb) {
        const data = {
            page: args.page, // 页数（当前页码默认为：1）
            pageSize: args.pageSize, //每页个数（每页个数 默认：20
        };
        const params = {
            api: _interfaces.get,
            bizType: _interfaces.bizType.getOpponentHistory,
            bizParam: data
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                callback(result.data);
            }
        }, (err) => {
            errorCb(err);
        });
    },

    /**
     * 10.
     * 排行榜
     * @param {*} args，无
     * @param {*} callback
     * @param {*} errorCb
     */
    getTopRank(callback, errorCb) {
        const params = {
            api: _interfaces.weakGet,
            bizType: _interfaces.bizType.getTopRank,
            bizParam: ''
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                callback(result.data);
            } else if (1033 === result.code) {
                errorCb(result.code);
            }
        }, (err) => {
            console.log(err);
            errorCb(err);
        });
    },

    /**
     * 11.
     * 排行榜
     * @param {*} args，无
     * @param {*} callback
     * @param {*} errorCb
     */
    getPrize(args, callback, errorCb) {
        const data = {
            type: args.type, // 权益类型 （排行榜：1， 答题页：2）
            position: args.position, //统计（排行榜：'rank',答题：'question'）
        };
        const params = {
            api: _interfaces.securySet,
            bizType: _interfaces.bizType.getPrize,
            bizParam: data
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                callback(result.data.prize);
            } else {
                errorCb(result);
            }
            // RANK_YESTERDAY_NO_PRIZE(1030, "您昨日没有上榜"),
            // RANK_YESTERDAY_GET_PRIZE(1031, "已领取"),
            // GET_PRIZE_ERROR(1032, "领取失败"),
            // RANK_TODAY_IS_EMPTY(1033, "排行榜为空"),
            // OUTSIDE_PRIZE_GET(1034, "权益已领取"),
            // OUTSIDE_PRIZE_ERROR(1035, "领取权益失败"),
        }, (err) => {
            errorCb(err);
        });
    },
    /**
     * 12.
     * 判断用户登录与否
     * @param {*} args，无
     * @param {*} callback
     * @param {*} errorCb
     */
    getLogin(callback, errorCb) {
        const params = {
            api: _interfaces.weakGet,
            bizType: _interfaces.bizType.getLoginState,
            bizParam: ''
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === res.retType) {
                callback(result);
            }
        }, (err) => {
            errorCb(err);
        });
    },
    /**
     * 15.
     * 上报使用游戏道具
     * @param {*} args，无
     * @param {*} cb
     * @param {*} errorCb
     */
    useGameItem(cb, errorCb) {
        const params = {
            api: _interfaces.get,
            bizType: _interfaces.bizType.useGameItem,
            bizParam: ''
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                cb(result.data);
            }
        }, (err) => {
            errorCb(err);
        });
    },
    /**
     * 16.
     * 查询宝箱状态
     * @param {*} cb
     * @param {*} errorCb
     */
    queryBoxStatus(cb, errorCb) {
        const params = {
            api: _interfaces.get,
            bizType: _interfaces.bizType.queryBoxStatus,
            bizParam: ''
        };
        Mtop.request(params).then(([res]) => {
            const result = res.data;
            if (0 === result.code) {
                cb(result.data);
            }
        }, (err) => {
            errorCb(err);
        });
    }

};