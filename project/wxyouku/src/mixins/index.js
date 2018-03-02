import wepy from 'wepy'

export default class Mixin extends wepy.mixin {
  data = {
  }
  methods = {
  }

  // 将特殊字符转成普通字符
  escape2Html(str) {
    const arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
  }
  
  // 获取字符串长度
  getObjLength(o) {
    let objLength = 0
    for (let i in o) {
      objLength++
    }
    return objLength
  }
}
