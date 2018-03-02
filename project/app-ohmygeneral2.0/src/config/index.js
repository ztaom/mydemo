/**
 * 全局配置
 * mtopConfig为mtop接口配置
 */

// 环境配置
const env = '';

const config = {
    env,
    mtopConfig: {}
};

// 判断 日常/预发/线上
if (env === 'dev') {
    config.mtopConfig = {
        prefix: 'youku-acs',
        subDomain: 'waptest',
        mainDomain: 'taobao.com'
    };
    config.appKey = '4272';
} else if (env === 'pre') {
    config.mtopConfig = {
        prefix: 'pre-acs',
        subDomain: '',
        mainDomain: 'youku.com'
    };
    config.appKey = '23536927';
} else {
    config.mtopConfig = {
        prefix: 'acs',
        subDomain: '',
        mainDomain: 'youku.com'
    };
    config.appKey = '23536927';
}

export default config;
