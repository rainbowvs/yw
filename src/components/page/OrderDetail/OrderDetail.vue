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
						<span v-text="`收货人：${orderInfo.addressName}`"></span>
						<em v-text="orderInfo.addressPhone"></em>
					</p>
					<p v-text="`收货地址：${orderInfo.addressContent}`"></p>
				</div>
			</div>
			<div class="shopInfo">
				<ul v-for="v,i in orderInfo.shops">
					<li>
						<span>图片预览: </span>
						<img :src="v.poster"/>
					</li>
					<li>
						<span>名称: </span>
						<em v-text="v.name"></em>
					</li>
					<li>
						<span>规格: </span>
						<em v-text="v.material"></em>
					</li>
					<li>
						<span>数量: </span>
						<em v-text="v.amount"></em>
					</li>
					<li>
						<span>金额: </span>
						<em v-text="`￥${v.price}`"></em>
					</li>
				</ul>
			</div>
			<div class="otherInfo">
				<ul>
					<li>
						<span>订单编号: </span>
						<em v-text="orderInfo.oid"></em>
					</li>
					<li>
						<span>总金额: </span>
						<em v-text="`￥${orderInfo.totalPrice}`"></em>
					</li>
					<li>
						<span>订单状态: </span>
						<em>
							<template v-if="orderInfo.state==0">待付款</template>
							<template v-else-if="orderInfo.state==1">待发货</template>
							<template v-else-if="orderInfo.state==2">待收货</template>
							<template v-else-if="orderInfo.state==3">待评价</template>
							<template v-else-if="orderInfo.state==4">交易完成</template>
						</em>
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
						<em>
							<template v-if="orderInfo.remark==''">无</template>
							<template v-else>{{orderInfo.remark}}</template>
						</em>
					</li>
					<li>
						<span>下单时间: </span>
						<em>2018-03-11 15:02:18</em>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				orderInfo: {},
			}
		},
		created () {
			this.orderInfo = this.$route.params.orderInfo;
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