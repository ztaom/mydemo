// import 'babel-polyfill' <script src="//g.alicdn.com/mtb/lib-promise/3.1.1/polyfillB.js"></script>
import 'babel-polyfill'
import mtop from '../../module/mtop'
require('../less/base.less')
require('../less/style.less')

function callback(json){
    //console.log(json)
}
function getCards(){
        //获取卡
    let params = {
        api:'com.youku.aplatform.weakGet',
        ecode:0,
        bizType:'aacc.getCardInfo',
        bizParam:{}
    };
    
    mtop.getMtopinfo(params).then((res)=>{
        var arr = res.data.result.videos;
        var aLength = res.data.result.videos.length;
        var aString = []
        if(res.data.success){
            for (let i in arr){
                const item = arr[i].videotitle
                aString.push(item)
            }
            console.log(aString.join(""))
        }
    })
    
}
getCards()






