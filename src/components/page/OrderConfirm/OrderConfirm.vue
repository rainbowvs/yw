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
						<template v-if="false">
							请填写收货地址
						</template>
						<template v-else>
							广州市白云区松洲街广州市白云区松洲街广州市白云区松洲街广州市白云区松洲街
						</template>
					</h2>
					<i class="yuewang icon-enter"></i>
				</div>
				<div class="bottom">
					<ul>
						<li>
							<span>收货人: </span>
							<em>张三</em>
						</li>
						<li>
							<span>手机号码: </span>
							<em>15099976289</em>
						</li>
					</ul>
				</div>
			</div>
			<div class="shopInfo">
				<ul v-for="v,i in shopCart" v-if="v.isChecked">
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
						<span>数量: </span>
						<em v-text="v.amount"></em>
					</li>
					<li>
						<span>重量: </span>
						<em v-text="`约${v.mass}g`"></em>
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
						<input type="text" placeholder="如: 刻字要求等等" />
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<div class="left">
				<span>合计：</span>
				<em v-text="`￥${sum}`"></em>
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
			this.$ajax({
				name: '获取商品列表',
				url: window.reqUrl + 'shop.php',
				data: {
					phone: this.$store.state.userInfo['phone'],
					token: this.$store.state.userInfo['token'],
					handle: 'get',
					page: this.currentPage,
				},
				beforeSend () {
					this.$store.commit('SHOW_LOADING');
				}
			}).then(res => {
				if(res.type == 'success'){
					
				}else{
					if(res.status == 1)
						setTimeout(() => {
							this.$router.push({name: 'Login'});
						},1000);
					this.$store.commit('SHOW_TOAST',{
						text: res.msg
					});
				}
				this.$store.commit('HIDE_LOADING');
			}).catch(status => {
				this.$store.commit('HIDE_LOADING');
				this.$store.commit('SHOW_TOAST',{
					text: status
				});
			});
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
				that.$router.push({name: that.$store.state.OrderConfirmBackName});
			},
		},
		computed: {
			shopCart () {
				return this.$store.state.shopCart;
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