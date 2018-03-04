<template>
	<transition name="fade">
		<div class="loading" v-show="loading">
			<div class="mask"></div>
			<div class="container">
				<span></span>
			</div>
		</div>
	</transition>
</template>

<style lang="scss">
	@import 'Loading.scss';
</style>

<script>
	export default{
		data () {
			return {
				
			}
		},
		computed: {
			loading () {
				return this.$store.state.loadingObj['show'];
			}
		}
	}
</script>