<style lang="scss" scoped>
	@import 'OrderConfirm.scss';
</style>

<template>
	<div class="orderconfirm">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">确认订单</h1>
		</my-header>
		<div class="container">
			<div class="address">
				<div class="top" @click="AddressClick">
					<i class="yuewang icon-location"></i>
					<h2>
						<template v-if="addressInfo">
							{{addressInfo.address}}
						</template>
						<template v-else>
							请填写收货地址
						</template>
					</h2>
					<i class="yuewang icon-enter"></i>
				</div>
				<div class="bottom">
					<ul>
						<li>
							<span>收货人: </span>
							<em>
								<template v-if="addressInfo">
									{{addressInfo.name}}
								</template>
								<template v-else>
									请填写收货人
								</template>
							</em>
						</li>
						<li>
							<span>手机号码: </span>
							<em>
								<template v-if="addressInfo">
									{{addressInfo.phone}}
								</template>
								<template v-else>
									请填写收货人联系电话
								</template>
							</em>
						</li>
					</ul>
				</div>
			</div>
			<div class="shopInfo">
				<ul v-for="v,i in shopList" v-if="v.isChecked">
					<li>
						<span>图片预览: </span>
						<img :src="v.poster"/>
					</li>
					<li>
						<span>名称: </span>
						<em v-text="v.name"></em>
					</li>
					<li>
						<span>材质: </span>
						<em v-text="v.material"></em>
					</li>
					<li>
						<span>重量: </span>
						<em v-text="`约${v.mass}g`"></em>
					</li>
					<li>
						<span>圈口: </span>
						<em v-text="v.size"></em>
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
						<span>配送方式: </span>
						<em>快递</em>
					</li>
					<li>
						<span>支付方式: </span>
						<em>在线支付</em>
					</li>
					<li>
						<span>买家留言: </span>
						<input type="text" v-model="remark" placeholder="如: 刻字要求等等" />
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<div class="left">
				<span>合计：</span>
				<em v-text="`￥${sum}`"></em>
			</div>
			<div class="right" @click="submitClick">
				提交订单
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				addressInfo: undefined,
				remark: '',
			}
		},
		created () {
			let that = this;
			
			let addressInfo = window.sessionStorage.getItem('addressInfo');
			if(addressInfo){
				//如果另选其他收货地址
				that.addressInfo = JSON.parse(addressInfo);
			}else{
				//获取默认地址
				that.$ajax({
					name: '获取默认收货地址',
					url: window.reqUrl + 'address.php',
					data: {
						handle: 'getAcquiescent',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						that.addressInfo = res.addressInfo;
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
			}
		},
		methods: {
			submitClick () {
				let that = this;
				if(!that.addressInfo){
					that.$store.commit('SHOW_TOAST',{
						text: '请选择收货地址',
					});
					return false;
				}
				
				let shops = [];
				that.shopList.forEach((v,i) => {
					shops.push({
						id: v.id,
						amount: v.amount,
						size: v.size,
					});
				});
				shops = JSON.stringify(shops);
				
				that.$ajax({
					name: '提交订单',
					url: window.reqUrl + 'order.php',
					data: {
						handle: 'set',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						shops: shops,
						aid: that.addressInfo['id'],
						state: 0,
						totalPrice: that.sum,
						remark: that.remark,
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
						});
						setTimeout(() => {
							if(window.sessionStorage.getItem('addressInfo'))
								window.sessionStorage.removeItem('addressInfo');
							if(this.$store.state.fromCart)
								that.$store.commit('EMPTY_SHOPCART');
							else
								that.$store.commit('EMPTY_BUY');
							that.$router.push({name: 'Pay',params: {oid: res.oid}});
						},1000);
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
			AddressClick () {
				//点击选择其他收货地址按钮事件
				this.$store.commit('SET_ADDRESSBACKNAME',{
					name: 'OrderConfirm',
				});
				this.$router.push({name: 'Address'});
			},
			goBack () {
				let that = this;
				if(window.sessionStorage.getItem('addressInfo'))
					window.sessionStorage.removeItem('addressInfo');
				that.$router.push({name: that.$store.state.OrderConfirmBackName});
			},
		},
		computed: {
			shopList () {
				if(this.$store.state.fromCart)
					return this.$store.state.shopCart;
				else
					return this.$store.state.buy;
			},
			sum () {
				//所有选中的商品的总价
				return this.$store.getters.sum;
			},
		},
		components: {
			'my-header': Header,
		},
	}
</script>