/**
 * 黄金令箭
 */
import queryString from 'query-string';

const _default = {

};
let config = {
    prefix: '/yt/youkuphoneplaypage.page404.speErrorInfo',
    sign: 'H1536906765'
};

const pendingQueue = [];

let shouldPending = true;

const log = {
    /**
     * 设置配置项
     */
    setConfig(args, isShouldPending = true) {
        shouldPending = isShouldPending;
        config = Object.asign({}, _default, args);
    },
    /**
     * 发送日志
     * @param {*} args
     * @param {*} callback
     */
    sendLog(args = {}, callback = () => {}) {
        if (shouldPending) {
            pendingQueue.push({
                args,
                callback
            });
            return;
        }
        if (window.goldlog) {
            window.goldlog.record(config.prefix, args.type || 'CLK', `${args.gokey}`, config.sign, () => {
                setTimeout(() => {
                    callback();
                }, 100);
            });


        } else {
            // 没有引入aplus
            const img = document.createElement('img');

            img.addEventListener('load', () => {
                callback();
            });
            img.addEventListener('error', () => {
                callback({ error: true });
            });
            img.src = `https://gm.mmstat.com/yt/youkuphoneplaypage.page404.speErrorInfo?${queryString.stringify(args.gokey)}&_t=${new Date().getTime()}`;
        }
    }
};

window.addEventListener('load', () => {
    shouldPending = false;

    while (pendingQueue.length > 0) {
        const item = pendingQueue.shift();
        log.sendLog(item.args, item.callback);
    }
});

export default log;