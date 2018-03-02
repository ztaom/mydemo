<template>
	<div id="app">
		<p>Count is {{ count }}</p>
		<button @click='increment'>+5</button>
		<button @click='decrement'>-3</button>
	</div>
</template>
<script>
	import {mapGetters, mapActions} from 'vuex';
	export default {
		computed: mapGetters([
			'count'
		]),
		methods: mapActions([
			'increment',
			'decrement'
		])
	}
</script>