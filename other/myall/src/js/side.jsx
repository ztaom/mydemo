var Aside = React.createClass({
  render:function(){
    return (
      <div className="inner">
        <h3>My</h3>
        <ul className="sdbox">
          <li><a href="https://www.gitbook.com/book/garyshue/">我的gitbook</a></li>
          <li><a href="flex.html">flex layout</a></li>
          <li><a href="character.html">特殊字符集合</a></li>
        </ul>
        <h3>说明书</h3>
        <ul className="sdbox fh">
          <li><a href="https://github.com/ruanyf/webpack-demos">webpack使用</a></li>
          <li><a href="http://jingyan.baidu.com/article/5d6edee221f0b399ebdeec7f.html">HTTP数据抓包Fiddler</a></li>
          <li><a href="http://react-china.org/">react交流论坛</a></li>
          <li><a href="http://www.html-js.com/article/Front-end-sharing%202983">移动web开发技巧</a></li>
          <li><a href="http://www.codeceo.com/article/html-css-interview.html">前端面试题（比较特殊）</a></li>
          <li><a href="https://www.safaribooksonline.com/home/">safaribooksonline garyshue</a></li>
        </ul>
        <h3>效果资源</h3>
        <ul className="sdbox fh">
          <li><a href="https://connoratherton.com/loaders"> CSS 实现的加载动画</a></li>
          <li><a href="http://saeedalipoor.github.io/icono/"> CSS 图标库</a></li>
          <li><a href="http://gudh.github.io/ihover/dist/index.html"> CSS 图片悬停效果</a></li>
          <li><a href="http://mp.weixin.qq.com/s?__biz=MzAwNzgxMjYzMA==&mid=2649129466&idx=1&sn=e50f0049b096cf28b7cf707a4b5adb33#rd">前端开发工具集</a></li>
        </ul>
        <h3>在线工具</h3>
        <ul className="sdbox fh">
          <li><a href="https://tinypng.com/">图片压缩</a></li>
          <li><a href="https://editor.animatron.com/#p=3c8a19580a42eb5849680278">html5动画在线制作工具</a></li>
        </ul>
        
      </div>
    )
  }
})
ReactDOM.render(
  <Aside />,
  document.getElementById('sideenter')
)