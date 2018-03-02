var Aside = React.createClass({
  getInitialState:function(){
    return {loading:true};
  },
  componentDidMount(){
    this.setState({loading: false})
  },
  render:function(){
    if (this.state.loading) {
      return <span>Loading...</span>;
    } else {
      return (
        <div className="inner">
          <h3>My</h3>
          <ul className="sdbox">
            <li><a href="https://www.gitbook.com/book/garyshue/">我的gitbook</a></li>
            <li><a href="flex.html">flex layout</a></li>
          </ul>
          <h3>说明书</h3>
          <ul className="sdbox fh">
            <li><a href="https://fakefish.github.io/react-webpack-cookbook/">webpack使用</a></li>
            <li><a href="http://jingyan.baidu.com/article/5d6edee221f0b399ebdeec7f.html">HTTP数据抓包Fiddler</a></li>
            <li><a href="http://react-china.org/">react交流论坛</a></li>
          </ul>
          <h3>效果资源</h3>
          <ul className="sdbox fh">
            <li><a href="https://connoratherton.com/loaders"> CSS 实现的加载动画</a></li>
            <li><a href="http://saeedalipoor.github.io/icono/"> CSS 图标库</a></li>
            <li><a href="http://gudh.github.io/ihover/dist/index.html"> CSS 图片悬停效果</a></li>
          </ul>
        </div>
      )
    }
  }
})
ReactDOM.render(
  <Aside />,
  document.getElementById('sideenter')
)