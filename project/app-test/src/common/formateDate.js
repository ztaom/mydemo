export default {
    /**
     * 得到天数
     * @param t
     * @returns {string}
     */
    getDay(t) {
        return Math.floor(t / 1000 / 60 / 60 / 24);
    },

    /**
     * 得到小时
     * @param t
     * @returns {string}
     */
    getHour(t) {
        return Math.floor(t / 1000 / 60 / 60 % 24);
    },

    /**
     * 得到分钟
     * @param t
     * @returns {string}
     */
    getMinute(t) {
        return Math.floor(t / 1000 / 60 % 60);
    },

    /**
     * 得到秒数
     * @param t
     * @returns {string}
     */
    getSecond(t) {
        return Math.floor(t / 1000 % 60);
    },
};