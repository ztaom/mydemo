/**
 * mtop 文档，https://lark.alipay.com/mtbsdkdocs/mtopjssdkdocs/gnkq0g
 */
import mtop from '@ali/lib-mtop';
import config from '../config';
export default {
    env: config.env,
    /**
     * 请求mtop
     * @param {*} args
     */
    request(args) {
        const bizParam = JSON.stringify(args.bizParam) || ''; //如果没有传递为''；否则是对象;

        //判断是否需要安全码
        if (/securySet/i.test(args.api)) {
            args.isSec = 1;
            args.asac = '1A17926KBJCQUMGN5OESL3';
        }

        //判断是否需要登录验证
        if (/weakGet/i.test(args.api)) {
            args.ecode = 0;
        } else {
            args.ecode = 1;
        }
        // 设置mtop config
        Object.assign(mtop.config, config.mtopConfig);
        const promise = mtop.request({
            api: args.api,
            v: '1.0',
            ecode: args.ecode, //一定有
            appKey: args.appKey || '23536927', //线上与预发：23536927  日常：4272
            type: args.type || 'get',
            isSec: args.isSec || 0,
            dataType: 'jsonp',
            timeout: 10000, // 非必须。接口超时设置，默认为20000ms
            data: {
                bizType: args.bizType,
                bizParam: `${bizParam}`, //如果没有传递为''；否则是对象
                asac: args.asac
            }
        },
        args.success,
        args.error
    );
        return promise;
    }
};