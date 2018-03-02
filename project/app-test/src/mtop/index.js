import mtop from '@ali/lib-mtop';
import config from '../config';
export default {
    /**
     * 请求mtop
     * @param {*} args
     */
    request(args) {
        const bizParam = JSON.stringify(args.bizParam);
        //判断是否需要安全码
        if (/securySet/i.test(args.api)) {
            args.isSec = 1;
            args.asac = '1A17B2472AVQ0O78RZE0TA';
        }
        // 设置mtop config
        Object.assign(mtop.config, config.mtopConfig);

        const promise = new Promise((resolve, reject) => {

            mtop.request({
                api: args.api,
                v: '1.0',
                ecode: args.ecode || 0, //一定有
                appKey: args.appKey || config.appKey,
                type: args.type,
                isSec: args.isSec,
                dataType: 'jsonp',
                timeout: 10000, // 非必须。接口超时设置，默认为20000ms
                H5Request: config.H5Request === true ? true : undefined,
                data: {
                    bizType: args.bizType,
                    bizParam: `${bizParam}`, //如果没有传递为''；否则是对象
                    asac: args.asac
                }
            }).then((res) => {
                console.log(res);
                resolve([res, args]);
            }, (res) => {
                reject(res);
            });
        });
        return promise;
    }
};