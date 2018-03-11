<style lang="scss" scoped>
	@import 'Order.scss';
</style>

<template>
	<div class="order">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">我的订单</h1>
		</my-header>
		<div class="container">
			<ul class="select">
				<li :class="{active: active==0}" @click="active=0">全部</li>
				<li :class="{active: active==1}" @click="active=1">待付款</li>
				<li :class="{active: active==2}" @click="active=2">待发货</li>
				<li :class="{active: active==3}" @click="active=3">待收货</li>
				<li :class="{active: active==4}" @click="active=4">待评价</li>
			</ul>
			<ul class="content">
				<li v-show="active==0">
					<div class="top">
						<span>越王珠宝自营店</span>
						<em>待付款</em>
					</div>
					<div class="mid">
						<div class="left">
							<img src="https://cdn.ctfmall.com/thumb/F156901.jpg"/>
						</div>
						<div class="right">
							<p>车花心形黄金足金戒指车花心形黄金足金戒指车花心形黄金足金戒指车花心形黄金足金戒指</p>
							<p>共{{1}}件商品</p>
							<p>
								合计<em>￥760.00</em>
							</p>
						</div>
					</div>
					<div class="bottom">
						<div class="left">
							<a href="javascript:;" @click="detailClick">订单详情</a>
							<a href="javascript:;">付款</a>
						</div>
						<div class="right">
							<a href="javascript:;">删除订单</a>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				alls: [
					{}
				],
				pays: [],
				deliveries: [],
				receives: [],
				evaluates: [],
				active: 0,
			}
		},
		created () {
			
		},
		methods: {
			detailClick () {
				let that = this;
				that.$router.push({name: 'OrderDetail'});
			},
			goBack () {
				this.$router.push({name: 'User'});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>