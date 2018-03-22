<style lang="scss" scoped>
	@import 'PaySuccess.scss';
</style>

<template>
	<div class="paysuccess">
		<my-header>
			<i slot="left"></i>
			<h1 slot="mid">支付成功</h1>
		</my-header>
		<div class="container">
			<div class="info">
				<i class="yuewang icon-roundcheck"></i>
				<span>支付成功</span>
				<a href="javascript:;" @click="$router.push({name: 'Order'})">返回订单页面</a>
				<a href="javascript:;" @click="$router.push({name: 'Categories'})">继续购物</a>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				
			}
		},
		methods: {
			
		},
		components: {
			'my-header': Header,
		}
	}
</script>