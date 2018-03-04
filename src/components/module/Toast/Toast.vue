<template>
	<div class="toast">
		<div class="mask" :class="{'active': toasting}"></div>
		<div class="container">
			<span v-text="text" :class="{'active': toasting}"></span>
		</div>
	</div>
</template>

<style lang="scss">
	@import 'Toast.scss';
</style>

<script>
	export default{
		data () {
			return {
				
			}
		},
		computed: {
			toasting () {
				return this.$store.state.toastObj['show'];
			},
			text () {
				return this.$store.state.toastObj['text'];
			}
		}
	}
</script>