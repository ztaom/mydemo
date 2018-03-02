/**
 * 全局配置
 * mtopConfig为mtop接口配置
 */

// 环境配置
const env = '';

// mt config
const mtData = window.pageData || {};

const config = {
    mtopConfig: {},
    mtData,
};

// 判断 日常/预发/线上
if (env === 'dev') {
    config.mtopConfig = {
        prefix: 'daily'
    };
} else if (env === 'pre') {
    config.mtopConfig = {
        prefix: 'pre',
    };
} else {
    config.mtopConfig = {
        prefix: 'release',
    };
}

export default config;
