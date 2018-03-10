<style lang="scss" scoped>
	@import 'Index.scss';
</style>

<template>
	<div class="index">
		<router-view />
		<my-footer></my-footer>
	</div>
</template>

<script>
	import Footer from '@/components/module/Footer/Footer';
	export default {
		data () {
			return {
				
			}
		},
		methods: {
			
		},
		components: {
			'my-footer': Footer,
		}
	}
</script>