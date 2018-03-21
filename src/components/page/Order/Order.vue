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
			<div class="scroller">
				<scroller :on-infinite="load" ref="sc">
					<ul>
						<li v-for="v,i in orders">
							<div class="top">
								<span v-text="`订单编号：${v.oid}`"></span>
								<em>
									<template v-if="v.state==0">待付款</template>
									<template v-else-if="v.state==1">待付款</template>
									<template v-else-if="v.state==2">待发货</template>
									<template v-else-if="v.state==3">待收货</template>
									<template v-else-if="v.state==4">待评价</template>
									<template v-else-if="v.state==5">交易完成</template>
								</em>
							</div>
							<div class="mid">
								<div class="left">
									<img :src="v.shops[0].poster"/>
								</div>
								<div class="right">
									<p v-text="v.shops[0].name"></p>
									<p v-text="`共${v.shops.length}件商品`"></p>
									<p>
										合计<em>￥{{v.totalPrice}}</em>
									</p>
								</div>
							</div>
							<div class="bottom">
								<div class="left">
									<a href="javascript:;" @click="detailClick(v)">订单详情</a>
									<a href="javascript:;">付款</a>
								</div>
								<div class="right">
									<a href="javascript:;" @click="deleteClick(v,i)">删除订单</a>
								</div>
							</div>
						</li>
					</ul>
				</scroller>
			</div>
		</div>
		<my-dialog ref="dialog" @sure="ok"></my-dialog>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				orders: [],
				currentPage: 1,
				totalPage: 2,
			}
		},
		created () {
			this.load();
		},
		methods: {
			load () {
				let that = this;
				that.$ajax({
					name: '获取所有订单列表',
					url: window.reqUrl + 'order.php',
					data: {
						handle: 'get',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						page: that.currentPage,
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						res.orders.forEach((v,i) => {
							that.orders.push({
								addressContent: v.addressContent,
								addressName: v.addressName,
								addressPhone: v.addressPhone,
								cdate: v.cdate,
								oid: v.oid,
								remark: v.remark,
								state: v.state,
								totalPrice: v.totalPrice,
								shops: v.shops,
							});
						});
						that.currentPage++;
						that.$refs.sc.finishInfinite(0);//1=>停止
					}else{
						if(res.status == 1)
							setTimeout(() => {
								that.$router.push({name: 'Login'});
							},1000);
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
						});
					}
					that.$store.commit('HIDE_LOADING');
				}).catch(status => {
					that.$store.commit('HIDE_LOADING');
					that.$store.commit('SHOW_TOAST',{
						text: status
					});
				});
			},
			ok (params) {
				//点击确定删除该订单按钮事件
				let that = this;
				
				that.$ajax({
					name: '删除订单',
					url: window.reqUrl + 'order.php',
					data: {
						handle: 'del',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						oid: params.item['oid'],
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
						});
						that.$refs.dialog.close();
						that.orders.splice(params['index'],1);
					}else{
						if(res.status == 1)
							setTimeout(() => {
								that.$router.push({name: 'Login'});
							},1000);
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
						});
					}
					that.$store.commit('HIDE_LOADING');
				}).catch(status => {
					that.$store.commit('HIDE_LOADING');
					that.$store.commit('SHOW_TOAST',{
						text: status
					});
				});
			},
			deleteClick (item,index) {
				//点击删除订单按钮事件
				this.$refs.dialog.open({
					text: '确定要删除该订单',
					params: {
						item: item,
						index: index,
					},
				});
			},
			detailClick (item) {
				//点击订单详情按钮事件
				let that = this;
				that.$router.push({name: 'OrderDetail',params: {orderInfo: item}});
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