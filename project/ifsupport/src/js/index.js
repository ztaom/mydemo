require('../less/base.less')
require('../less/style.less')

import windVane from '@ali/lib-windvane'
import * as env from 'amfe-env';
console.log(env.os.name)

const promiseTest = document.querySelector('.demo');
if(!window.localStorage){
    alert("浏览器支持localstorage");

}else{
    var storage=window.localStorage;
    //写入a字段
    storage["a"]=1;
    //写入b字段
    storage.b=1;
    //写入c字段
    storage.setItem("c",3);
    console.log(typeof storage["a"]);
    console.log(typeof storage["b"]);
    console.log(typeof storage["c"]);
}
console.log(storage)