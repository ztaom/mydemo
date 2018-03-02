require('../index.html')
import Vue from 'vue'
// import App from './App.vue'
import Test from './Test.vue'



new Vue({
  el: '#vuetest',
  render: myTest => myTest(Test)
})






Vue.directive('mytest', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})

new Vue({
	el: '#test'
})

// var increments=  {
//   // props: ['componentMessage'],//驼峰命名的props需要转换成kebab-case（短横线隔开式）
//   template: '<button v-on:click="increment">{{ counter }} <slot text="作用域插槽"></slot></button>',
//   data: function () {
//   	return {
//   		counter: 0
//   	}
//   },
//   methods: {
//   	increment: function () {
//   		this.counter += 1
//   		this.$emit('increment')
//   	}
//   }
//   // data: function () {//组件里面的data必须是函数
//   // 	return {
//   // 	  componentMessage: 'A custom component!'
//   // 	}
//   // }
// }

// new Vue({
// 	el: '#app',
// 	data: {
// 		total: 0
// 	},
// 	methods: {
// 		incrementTotal: function () {
// 			this.total += 1
// 		}
// 	},
// 	components: {
// 		'button-counter': increments
// 	}
// })


// //直接写法
// var app = new Vue({
// 	el: '#app',
// 	data:{ //在单独组件的时候data必须为函数
// 		message: 'hello'
// 	}
// })
