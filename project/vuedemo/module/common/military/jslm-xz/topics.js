import Browser from '../../../common/utils/browser'
import API from './API' 
import config from '../config'

class Topic{ 
	constructor(element){
		this.element = element;
		this.config = config;
		this.init();
	} 
	init(){
		this.getTopic();
	}
	getTopic(){
		let requestStr ={
				model:this.config.model,
				header:this.config.header
			};
		let data = {
				"requestStr":JSON.stringify(requestStr)
			};

		data = encodeURIComponent(JSON.stringify(data))
		API.getTopicAPI(data).then((res)=>{//社区
			var posts = res.data.data.posts,
				topics = res.data.data.topics,
				topicLen = topics.length,
				_tpl = '';
			if(topics.length == 0 && posts.length == 0){
				this.element.parentNode.style.display = 'none';
				return false;
			}
			_tpl += this.ReaderTopic(topics);
			_tpl += this.ReaderPosts(posts,topicLen);
			this.element.innerHTML = _tpl;
		},(res)=>{
			console.log(res)
		})
	}
	ReaderTopic(res){
		let tpl = ''
		$.each(res,function(index,item){
			let viewCount = this.formatNum(item.viewCount),//阅读
				discussCount = this.formatNum(item.discussCount),//讨论数
				planetId = item.id,
				// URL = item.h5DetailUrl.replace(/http/g,'https');
				// URL = Browser.isYouku ? item.nativeSchemaUrl : h5DetailUrl;
				h5detailurl = item.h5DetailUrl,
				nativeschemaurl = item.nativeSchemaUrl;

			tpl += `<li data-planetid="${planetId}" data-md="ht${index+1}" data-h5detailurl="${h5detailurl}?spm=a2h24.mdovt10803.ht.dht${index+1}" data-nativeschemaurl="${nativeschemaurl}&spma2h24.mdovt10803.ht.dht${index+1}">
				<em class="pic"><img src="${this.config.topicArr[index].pic}"></em>
                <dl class="txt">
                    <dt>${item.name}</dt>
                    <dd><em>阅读${viewCount}</em><em class="time">参与${discussCount}</em></dd>
                </dl>
            </li>`
		}.bind(this))
		return tpl;
	}
	ReaderPosts(res,len){
		let tpl = '';
		$.each(res,function(index,item){
			let likeCount = this.formatNum(item.likeCount),//点赞
				voteCount = this.formatNum(item.voteCount),//投票数
				viewCount = this.formatNum(item.viewCount),//阅读数
				gmtExpiration = item.gmtExpiration,//过期时间
				gmtCurrent = item.gmtCurrent,//当前时间
				plusHour = new Date(gmtExpiration - gmtCurrent).getHours(),
				planetId = item.id,
				h5detailurl = item.h5DetailUrl,
				nativeschemaurl = item.nativeSchemaUrl;
			if(voteCount){
				tpl += `<li data-planetid="${planetId}" data-md="ht3" data-h5detailurl="${h5detailurl}?spm=a2h24.mdovt10803.ht.dht3" data-nativeschemaurl="${nativeschemaurl}&spm=a2h24.mdovt10803.ht.dht3">
					<em class="pic"><img src="${this.config.topicArr[index+len].pic}"></em>
                    <dl class="txt">
                        <dt>${item.title}</dt>
                        <dd><em>${voteCount}已参与</em><em class="time">还剩${plusHour}小时</em></dd>
                    </dl>
                </li>`
			}else{
				tpl += `<li data-planetid="${planetId}" data-md="ht3" data-h5detailurl="${h5detailurl}?spm=a2h24.mdovt10803.ht.dht3" data-nativeschemaurl="${nativeschemaurl}&spm=a2h24.mdovt10803.ht.dht3">
					<em class="pic"><img src="${this.config.topicArr[index+len].pic}"></em>
                    <dl class="txt">
                        <dt>${item.title}</dt>
                        <dd><em>阅读${viewCount}</em><em class="time">点赞${likeCount}</em></dd>
                    </dl>
                </li>`
			}
		}.bind(this))
		return tpl;
	}
	formatNum(num){
		if(num > 10000){
			num = ((num)/10000).toFixed(2) + '万'
		}
		else if(num > 10000){
			num = ((num)/100000000).toFixed(2) + '亿'
		}
		return num;
	}
}
export default Topic