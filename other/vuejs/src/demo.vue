<template>
	<div :class="[$style.blue, $style.fontsize]">
		{{ message }}
	</div>
</template>

<script>
	export default {
		name: 'demo',
		data () {
			return {
				message: 'This is demo0!'
			}
		},
		created () {
			console.log(this.$style.blue)
		}
	}
</script>

<style lang="scss" module>
.blue{color:blue}
.fontsize{font-size:20px}
</style>