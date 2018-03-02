<template>
	<div id="vuetest">
		{{ message }}
		<demo-component></demo-component>
	</div>
</template>

<script>
	import demoComponent from './demo.vue';
	export default {
		name: 'vuetest',
		components: { demoComponent },
		data () {
			return {
				message: 'hello!'
			}
		}
	}
</script>

<style lang="scss">
#vuetest{background:#eee}
.demo{font-size:20px}
</style>