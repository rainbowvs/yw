<style lang="scss" scoped>
	@import 'OrderDetail.scss';
</style>

<template>
	<div class="orderdetail">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">订单详情</h1>
		</my-header>
		<div class="container">
			<div class="address">
				<div class="left">
					<i class="yuewang icon-location"></i>
				</div>
				<div class="right">
					<p>
						<span>收货人：张三</span>
						<em>15099976289</em>
					</p>
					<p>收货地址：广州市白云区松洲街广州市白云区松洲街广州市白云区松洲街广州市白云区松洲街广州市白云区松洲街</p>
				</div>
			</div>
			<div class="shopInfo">
				<ul>
					<li>
						<span>名称: </span>
						<em>猴赛雷黄金足金吊坠</em>
					</li>
					<li>
						<span>规格: </span>
						<em>材质黄金</em>
					</li>
					<li>
						<span>数量: </span>
						<em>20</em>
					</li>
					<li>
						<span>金额: </span>
						<em>￥20</em>
					</li>
				</ul>
			</div>
			<div class="otherInfo">
				<ul>
					<li>
						<span>订单编号: </span>
						<em>180311132278</em>
					</li>
					<li>
						<span>订单状态: </span>
						<em>待付款</em>
					</li>
					<li>
						<span>配送方式: </span>
						<em>快递</em>
					</li>
					<li>
						<span>支付方式: </span>
						<em>在线支付</em>
					</li>
					<li>
						<span>买家留言: </span>
						<em>无</em>
					</li>
					<li>
						<span>下单时间: </span>
						<em>2018-03-11 15:02:18</em>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<div class="left">
				<span>合计：</span>
				<em>￥20</em>
			</div>
			<div class="right">
				立即支付
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
		created () {
			
		},
		methods: {
			AddressClick () {
				let that = this;
				that.$store.commit('SET_ADDRESSBACKNAME',{
					name: 'OrderConfirm',
				});
				that.$router.push({name: 'Address'});
			},
			goBack () {
				let that = this;
				that.$router.push({name: 'Order'});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>