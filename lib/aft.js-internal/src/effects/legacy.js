/* eslint-disable no-console */
export default () => ({
    ease(...args) {
        console.warn('"effect.ease" is deprecated. Please use "effect.easing" instead');
        if (this.easing) {
            this.easing(...args);
        }
    },

    loop(...args) {
        console.warn('"effect.loop" is deprecated. Please use "effect.iteration" instead');
        if (this.iteration) {
            this.iteration(...args);
        }
    },

    loopAll(n = 1) {
        console.warn('"effect.loopAll" is deprecated. Please use animation\'s iteration instead');
        if (!this.repeatAll) {
            this.repeatAll = {};
        }

        this.repeatAll.count = n;
    },

    mode() {
        console.warn('"effect.mode" is deprecated.');
    }
});
/* eslint-enable no-console */