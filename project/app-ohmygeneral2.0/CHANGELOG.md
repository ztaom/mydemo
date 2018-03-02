#### 2017.09.18
- 增加 "process.env.CLOUD_BUILD_TYPE" 变量，该变量为云构建类型，可取值为 daily（日常） 和 publish（正式）

#### 2017.09.17
- 增加项目名默认值
- 云构建可支持其他group，需要创建时出入group名字

#### 2017.09.14
- 校验项目名，准守命名规范、不使用大写

#### 2017.09.11
- 默认引入 http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js

#### 2017.09.01
- 修复因Vue使用了 “&#10;” 而MT将 “&#10;” 转为换行导致语法错误的问题（仅将所有js打包到HTML会出问题）
