/**
 * 全局配置
 * mtopConfig为mtop接口配置
 * urlConfig为从url获取的配置信息，fake测试用参数
 */

// 环境配置
const env = '';

// login类型，如果是native环境则全调起native登录；如果是其他环境login-mode为native则调起native，如果是h5则使用h5登录
// urlConfig['login-mode'] = urlConfig['login-mode'] || 'native';

// mt config
const mtData = window.aaData || {};

const config = {
    mtopConfig: {},
    mtData,
};

// 判断 日常/预发/线上
// 判断 日常/预发/线上
if (env === 'dev') {
    config.mtopConfig = {
        prefix: 'daily-acs',
        subDomain: '',
        mainDomain: 'youku.com'
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
