<template>
	<div class="orderconfirm">
		<my-header>
			<i slot="left" class="iconfont icon-return" @click="goBack"></i>
			<h1 slot="mid">确认订单</h1>
		</my-header>
		<div class="container">
			
		</div>
	</div>
</template>

<style lang="scss">
	@import 'OrderConfirm.scss';
</style>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				
			}
		},
		mounted () {
			
		},
		methods: {
			goBack () {
				this.$router.go(-1);
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>