import queryString from 'query-string'
import API from './API'
import config from '../config'

class GETAPI{ 
	constructor(){
		this.config = config;

		this.args = queryString.parse(location.search);
	}
	getCardHome(){
		API.getCardHome();
	}
	setLoginChanel(){
		API.setloginChanelAPI(this.args);
	}
	setOtherChanel(){
		API.setOtherChanelAPI(this.args);
	}
	getGiveCard(){
		API.GiveCardApi(this.args)
	}
	getAskforCard(){
		API.setAskforCardAPI(this.args)
	}
}
export default GETAPI