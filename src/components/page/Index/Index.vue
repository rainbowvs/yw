<template>
	<div class="index">
		<router-view />
		<my-footer></my-footer>
	</div>
</template>

<style lang="scss">
	@import 'Index.scss';
</style>

<script>
	import Footer from '@/components/module/Footer';
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