const intervalTime = parseInt(window.mgData.baseInfo.intervalUpdate) * 1000 || 8000;//刷新接口的间隔时间
const durTime = parseInt(window.mgData.baseInfo.durUpdate) * 1000 || 600000;//刷新接口总时长
export default {
    formateDate(now, linkSign) {
        const
            d = new Date(now),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            date = d.getDate();
        if (linkSign === undefined || linkSign === null) {
            linkSign = '';
        }
        return `${year}${linkSign}${month}${linkSign}${date}`;
    },
    isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    goUpdateTime(store, type) {
        if (window.baseTimer) {
            clearTimeout(window.baseTimer);
        }
        window.localStorage.setItem('taskRandomTime', (new Date()).getTime());
        this.updateTime(store, type);
    },
    updateTime(store, type) {//重试getBaseInfo接口
        const that = this;
        const taskState = store.state.taskData[type];//获取任务状态，为true表示任务可做，即任务未完成
        if (!taskState) { //任务已完成，清除刷接口的定时器
            clearTimeout(window.baseTimer);
        } else {
            window.baseTimer = setTimeout(() => {
                const nowTime = (new Date()).getTime();
                const taskTime = parseInt(window.localStorage.getItem('taskRandomTime'));
                if (nowTime && taskTime && (nowTime - taskTime) < durTime) {//只在durTime秒之内刷新接口
                    store.dispatch('getInitData');
                    that.updateTime(store, type);
                } else {//配置的等待时间到了，清除刷接口的定时器
                    clearTimeout(window.baseTimer);
                }
            }, intervalTime);
        }
    },
};
