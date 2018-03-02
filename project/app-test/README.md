# app-aa

> 军师联盟2-虎啸龙吟

## Usage

> Prerequisites: Node.js 6.9.5+ npm version 3+ and Git.

``` bash
# install dependencies
tnpm install

# dev build localhost:80
npm run dev

# production build
npm run build

# check by eslint
npm run lint
```

## 约定
- src下的每个html是一个入口页面
- 与html页面同名的js文件为当前页面的js入口文件（如demo.html对应demo.js）
- 若不存在与页面同名的js文件，那么与页面同名的目录名下的index.js是入口文件（如demo.html对应demo/index.js）
- 图片字体等纯静态资源建议统一放在src/assets下，或在src下自行组织
- 非node module的第三方css库和js库强烈建议直接引用集团CDN地址（如zepto）
- 非node module的第三方css库和js库可放在src/static下，但是强烈不建议这样做。
- src/static是不能删除的，否则build会报错，切记。
- 要兼容哪些浏览器请自行修改package.json中的browserslist节点，比如搞定css3浏览器兼容就很容易。
- 可使用jade和decorators
- 可使用less sass stylus css postcss，也就是说不需要你手动写css前缀来兼容。
- Vue组件自己的css要写到自己的.vue文件，共用样式除外

## 其他
- 默认安装core-js模块，可用于polyfill，长期有放在构建工具polyfill的打算
