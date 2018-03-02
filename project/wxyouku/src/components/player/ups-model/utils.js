const Utils = {
  /**
  * 绑定get方法
  */
  defineGetter(target, key) {
    Object.defineProperty(target, key, {
      get() {
        return target[`_${key}`];
      }
    });
  }
};

export default Utils;
