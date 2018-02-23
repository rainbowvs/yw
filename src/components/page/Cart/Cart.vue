<template>
	<div class="cart">
		<my-header>
			<span slot="left" @click="clean">清空</span>
			<h1 slot="mid">购物车</h1>
		</my-header>
		<div class="container">
			<div class="list">
				<h2 @click="checkedAll=!checkedAll">
					<template v-if="checkedAll">
						<i class="iconfont icon-checkbox-checked checkbox"></i>
					</template>
					<template v-else>
						<i class="iconfont icon-checkbox checkbox"></i>
					</template>
					<span>全选</span>
				</h2>
				<ul>
					<li v-for="shop,index in shops">
						<template v-if="shop.isChecked">
							<i class="iconfont icon-checkbox-checked checkbox" @click="checkedClick(shop)"></i>
						</template>
						<template v-else>
							<i class="iconfont icon-checkbox checkbox" @click="checkedClick(shop)"></i>
						</template>
						<div class="info">
							<img :src="shop.poster" />
							<div class="text">
								<p v-text="shop.name"></p>
								<span>￥{{shop.price}}</span>
								<form>
									<a ref="subtract" href="javascript:;" class="subtract" @touchstart="subtractStartFunc($event,shop,500,100)" @touchend="subtractEndFunc(shop)">-</a>
									<input type="text" class="amount" v-model.number="shop.amount" maxlength="3" />
									<a ref="add" href="javascript:;" class="add" @touchstart="addStartFunc($event,shop,450,500,100)" @touchend="addEndFunc(shop)">+</a>
								</form>
							</div>
						</div>
						<i class="iconfont icon-roundclose delete" @click="deleteClick(index)"></i>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<span>合计：￥{{0}}元</span>
			<a href="javascript:;" @click="$router.push({name: 'OrderConfirm'})">结算</a>
		</div>
		<my-dialog ref="dialog" @sure="ok"></my-dialog>
	</div>
</template>

<style lang="scss">
	@import 'Cart.scss';
</style>

<script>
	import Header from '@/components/module/Header';
	export default {
		data () {
			return {
				shops: [
					{id: 0,name: '车花心形黄金足金戒指车花心形黄金足金戒指车花心形黄金足金戒指',price: '760.00',poster: 'https://cdn.ctfmall.com/thumb/F156901.jpg',amount: 1,circumference: 11,timer: null,isChecked: false,},
					{id: 0,name: '车花心形黄金足金戒指车花心形黄金足金戒指车花心形黄金足金戒指',price: '760.00',poster: 'https://cdn.ctfmall.com/thumb/F156901.jpg',amount: 1,circumference: 11,timer: null,isChecked: false,},
					{id: 0,name: '车花心形黄金足金戒指车花心形黄金足金戒指车花心形黄金足金戒指',price: '760.00',poster: 'https://cdn.ctfmall.com/thumb/F156901.jpg',amount: 1,circumference: 11,timer: null,isChecked: false,},
				],
			}
		},
		mounted () {
			
		},
		methods: {
			ok (n) {
				this.shops.splice(n,1);
				this.$refs.dialog.close();
			},
			deleteClick (n) {
				this.$refs.dialog.open({
					text: '确认要删除该商品',
					params: n,
				});
			},
			checkedClick (item) {
				item.isChecked = !item.isChecked;
			},
			amountInput (e) {
//				setTimeout(() => {
//					//防止android系统输入法遮挡输入框
//					e.target.scrollIntoView(false);
//				},300);
			},
			addStartFunc (e,item,max,delay,interval) {
				let previous = null;
				item.timer = setInterval(() => {
					let now = +new Date();
					if(!previous)
						previous = now;
					if( now - previous > delay ){
						if(item.amount > 0 && item.amount < max)
							item.amount++;
					}
				},interval);
				if(item.amount > 0 && item.amount < max)
					item.amount++;
			},
			addEndFunc (item) {
				clearInterval(item.timer);
				item.timer = null;
			},
			subtractStartFunc (e,item,delay,interval) {
				let previous = null;
				item.timer = setInterval(() => {
					let now = +new Date();
					if(!previous)
						previous = now;
					if( now - previous > delay ){
						if(item.amount > 1)
							item.amount--;
					}
				},interval);
				if(item.amount > 1)
					item.amount--;
			},
			subtractEndFunc (item) {
				clearInterval(item.timer);
				item.timer = null;
			},
			clean () {
				this.shops = [];
			},
		},
		computed: {
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