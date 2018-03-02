require('./assets/less/base.less')
require('./assets/less/style.less')

import Vue from 'vue';

import store from './store'
import Counter from './components/Counter'


new Vue({
	el: '#app',
	store,
	render: h => h(Counter)
})


const DZ = document.querySelector('.dzanimate');
document.querySelector('.dzbtn').addEventListener('touchend', function(e){
	let dzNum = 0;
	let i = Math.floor( Math.random()*4+1 )
	let div = document.createElement("div");
	div.setAttribute('class', `a${i} animate`)
	DZ.appendChild(div)
	if(DZ.childNodes.length>100){
		DZ.innerHTML=''
	}

	dzNum = dzNum+1
	document.querySelector('#dznum').innerText = `${dzNum}`;
})






// console.log(Vuex.Store)
// Vue.use(Vuex);
// const store = new Vuex.Store({
// 	state: {
// 		count: 0
// 	},
// 	mutations: {
// 		increment (state) {
// 			state.count++
// 		}
// 	}
// })

// const Counter = {
// 	template: '<div>{{ count }}</div>',
// 	computed: {
// 		count () {
// 			return this.$store.state.count
// 		}
// 	}
// }

// const app = new Vue({
// 	el: '#app',
// 	store,
//   	components: { Counter },
// 	template: `
// 		<div id="app">
// 			<Counter></Counter>
// 		</div>
// 	`
// })





// import mtop from '../../module/mtop'

// function getCards(){
//         //获取卡
//     let params = {
//         api:'com.youku.aplatform.weakGet',
//         ecode:0,
//         bizType:'aacc.getCardInfo',
//         bizParam:{}
//     };
    
//     mtop.getMtopinfo(params).then((res)=>{
//         if(res.data.success){
//             console.log(res.data.result.e.desc)
//         }
//     })
    
// }
// getCards()



