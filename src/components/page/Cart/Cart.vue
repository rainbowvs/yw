<style lang="scss" scoped>
	@import 'Cart.scss';
</style>

<template>
	<div class="cart">
		<my-header>
			<span slot="left"></span>
			<span slot="right" @click="emptyClick">清空</span>
			<h1 slot="mid">购物车</h1>
		</my-header>
		<div class="container">
			<div class="list">
				<h2 @click="checkedAllClick">
					<template v-if="checkedAll">
						<i class="yuewang icon-checkbox-checked checkbox"></i>
					</template>
					<template v-else>
						<i class="yuewang icon-checkbox checkbox"></i>
					</template>
					<span>全选</span>
				</h2>
				<ul>
					<li v-for="shop,index in shops">
						<template v-if="shop.isChecked">
							<i class="yuewang icon-checkbox-checked checkbox" @click="checkedClick(shop,index)"></i>
						</template>
						<template v-else>
							<i class="yuewang icon-checkbox checkbox" @click="checkedClick(shop,index)"></i>
						</template>
						<div class="info">
							<img :src="shop.poster" />
							<div class="text">
								<p v-text="shop.name"></p>
								<template v-if="shop.size">
									<em v-text="`圈口：${shop.size}`"></em>
								</template>
								<template v-else-if="shop.length">
									<em v-text="`链长：${shop.length}cm`"></em>
								</template>
								<span v-text="`￥${shop.price}`"></span>
								<form>
									<a ref="subtract" href="javascript:;" class="subtract" @touchstart="subtractStartFunc($event,shop,index,500,100)" @touchend="subtractEndFunc(shop)">-</a>
									<input type="text" class="amount" v-model.number="shop.amount" maxlength="3" />
									<a ref="add" href="javascript:;" class="add" @touchstart="addStartFunc($event,shop,shop.inventory,index,500,100)" @touchend="addEndFunc(shop)">+</a>
								</form>
							</div>
						</div>
						<i class="yuewang icon-roundclose delete" @click="deleteClick(index)"></i>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<div class="left">
				<span>合计：</span>
				<em>￥{{sum}}</em>
			</div>
			<div class="right" @click="balanceClick">
				<a href="javascript:;">结算</a>
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
				
			}
		},
		methods: {
			balanceClick () {
				//点击结算按钮事件
				let temp = 0;
				this.shops.forEach((v,i) => {
					if(v.isChecked)
						temp++;
				});
				if(temp == 0){
					this.$store.commit('SHOW_TOAST',{
						text: '没有选中任何商品',
					});
					return false;
				}
				this.$store.commit('SET_ORDERCONFIRMBACKNAME',{
					name: 'Cart',
				});
				this.$store.commit('SET_FROMCART',true);
				this.$router.push({name: 'OrderConfirm'});
			},
			ok (n) {
				//点击确认删除按钮事件
				this.$store.commit('DELETE_SHOPCART',{
					index: n
				});
				this.$refs.dialog.close();
			},
			deleteClick (n) {
				//点击删除选中商品按钮事件
				this.$refs.dialog.open({
					text: '确认要删除该商品',
					params: n,
				});
			},
			checkedAllClick () {
				//点击全选按钮事件
				this.checkedAll = !this.checkedAll;
				this.shops.forEach((v,i) => {
					this.$store.commit('UPDATE_SHOPCART',{
						index: i,
						isChecked : this.checkedAll,
					});
				});
			},
			checkedClick (item,index) {
				//点击选中商品按钮事件
				item.isChecked = !item.isChecked;
				this.$store.commit('UPDATE_SHOPCART',{
					index: index,
					isChecked : item.isChecked,
				});
			},
			amountInput (e) {
//				setTimeout(() => {
//					//防止android系统输入法遮挡输入框
//					e.target.scrollIntoView(false);
//				},300);
			},
			addStartFunc (e,item,max,index,delay,interval) {
				let previous = null;
				item.timer = setInterval(() => {
					let now = +new Date();
					if(!previous)
						previous = now;
					if( now - previous > delay ){
						if(item.amount > 0 && item.amount < max){
							item.amount++;
							this.$store.commit('UPDATE_SHOPCART',{
								index: index,
								amount : item.amount,
							});
						}
					}
				},interval);
				if(item.amount > 0 && item.amount < max){
					item.amount++;
					this.$store.commit('UPDATE_SHOPCART',{
						index: index,
						amount : item.amount,
					});
				}
			},
			addEndFunc (item) {
				clearInterval(item.timer);
				item.timer = null;
			},
			subtractStartFunc (e,item,index,delay,interval) {
				let previous = null;
				item.timer = setInterval(() => {
					let now = +new Date();
					if(!previous)
						previous = now;
					if( now - previous > delay ){
						if(item.amount > 1){
							item.amount--;
							this.$store.commit('UPDATE_SHOPCART',{
								index: index,
								amount : item.amount,
							});
						}
					}
				},interval);
				if(item.amount > 1){
					item.amount--;
					this.$store.commit('UPDATE_SHOPCART',{
						index: index,
						amount : item.amount,
					});
				}
			},
			subtractEndFunc (item) {
				clearInterval(item.timer);
				item.timer = null;
			},
			emptyClick () {
				//点击清空购物车按钮事件
				this.$store.commit('EMPTY_SHOPCART');
			},
		},
		computed: {
			shops () {
				return this.$store.state.shopCart;
			},
			sum () {
				//所有选中的商品的总价
				return this.$store.getters.sum;
			},
			checkedAll: {
				get () {
					if(this.checkedCount == this.shops.length){
						if(this.checkedCount == 0)
							return false;
						else
							return true;
					}
					return false;
				},
				set (value) {
					this.shops.forEach((item) => {
						item.isChecked = value;
					});
					return value;
				}
			},
			checkedCount: {
				get () {
					let count = 0;
					this.shops.forEach((item) => {
						if(item.isChecked)
							count++;
					});
					return count;
				}
			}
		},
		components: {
			'my-header': Header,
		}
	}
</script>