<style lang="scss" scoped>
	@import 'ShopDetail.scss';
</style>

<template>
	<div class="shopdetail">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">商品详情</h1>
		</my-header>
		<div class="container">
			<img :src="shop.preview[0]" class="preview"/>
			<div class="spec">
				<ul>
					<li><h6 v-text="shop.name"></h6></li>
					<li>价格：<span class="price">￥{{shop.price}}</span></li>
					<li>库存：{{shop.inventory}}件</li>
					<li>
						<div class="size">圈口：</div>
						<dl>
							<dd v-for="v,i in shop.size" :class="{active: focus==i}" @click="sizeClick(i)" v-text="v"></dd>
						</dl>
					</li>
					<li>
						<span class="amount">数量：</span>
						<form>
							<a ref="subtract" href="javascript:;" class="subtract">-</a>
							<input ref="amount" type="text" name="amount" id="amount" v-model.number="amount" maxlength="3" @blur="format" @touchstart="amountInput($event)" />
							<a ref="add" href="javascript:;" class="add">+</a>
						</form>
					</li>
				</ul>
			</div>
			<div class="info">
				<h6>——详细参数——</h6>
				<ul>
					<li>
						<i>模号：</i><span v-text="shop.model"></span>
					</li>
					<li>
						<i>材质：</i><span v-text="shop.material"></span>
					</li>
					<li>
						<i>款式：</i><span v-text="shop.style"></span>
					</li>
					<li>
						<i>重量：</i><span>约{{shop.mass}}g</span>
					</li>
					<li>
						<i>工费：</i><span>￥{{shop.processingCost}}</span>
					</li>
					<li>
						<i>售后服务：</i><span>专柜联保 店铺保修 </span>
					</li>
				</ul>
			</div>
			<div class="pics">
				<h6>——商品图片——</h6>
				<ul>
					<li v-for="v,i in shop.preview">
						<img :src="v" v-if="i>0" />
					</li>
				</ul>
			</div>
			<div class="evaluate">
				<h6>——买家评论——</h6>
				<ul>
					<li>
						<i>rainbowvs</i>
						<p>很好,很满意,很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意很好,很满意</p>
						<span>2017-01-01</span>
					</li>
					<li>
						<i>rainbowvs</i>
						<p>很好,很满意</p>
						<span>2017-01-01</span>
					</li>
					<li>
						<i>rainbowvs</i>
						<p>很好,很满意</p>
						<span>2017-01-01</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<a href="javascript:;" class="addCart" @click="addCart">加入购物车</a>
			<a href="javascript:;" class="buy">立即购买</a>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				shop: null,
				amount: 1,
				focus: 0,
			}
		},
		created () {
			let that = this;
			that.shop = that.$route.params.shop;
		},
		mounted () {
			this.addFunc(this.shop.inventory,500,100);
			this.subtractFunc(500,100);
		},
		methods: {
			sizeClick (index) {
				this.focus = index;
			},
			addCart () {
				this.$store.commit('ADD_SHOPCART',{
					id: this.shop.id,
					price: this.shop.price,
					size: this.shop.size[this.focus],
					amount: this.amount,
					name: this.shop.name,
					mass: this.shop.mass,
					material: this.shop.material,
					poster: this.shop.poster,
					inventory: this.shop.inventory,
					isChecked: true,
				});
				this.$store.commit('SHOW_TOAST',{
					text: '加入购物车成功',
				});
			},
			amountInput (e) {
//				setTimeout(() => {
//					//防止android系统输入法遮挡输入框
//					e.target.scrollIntoView(false);
//				},300);
			},
			format () {
				if(/\D/.test(this.amount))
					this.amount = 1;
				if(/^[0]+/g.test(this.amount))
					this.amount = this.amount.replace(/^[0]+/g,"");
				if(this.amount > this.shop.inventory)
					this.amount = this.shop.inventory;
				if(this.amount < 1)
					this.amount = 1;
			},
			addFunc (max,delay,interval) {
				let timer = null;
				let previous = null;
				let add = this.$refs.add;
				add.addEventListener("touchstart",(e) => {
					timer = setInterval(() => {
						let now = +new Date();
						if(!previous)
							previous = now;
						if( now - previous > delay ){
							if(this.amount > 0 && this.amount < max)
								this.amount++;
						}
					},interval);
					if(this.amount > 0 && this.amount < max)
						this.amount++;
				},false);
				add.addEventListener("touchend",() => {
					clearInterval(timer);
					previous = null;
				},false);
			},
			subtractFunc (delay,interval) {
				let timer = null;
				let previous = null;
				let subtract = this.$refs.subtract;
				subtract.addEventListener("touchstart",(e) => {
					timer = setInterval(() => {
						let now = +new Date();
						if(!previous)
							previous = now;
						if( now - previous > delay ){
							if(this.amount > 1)
								this.amount--;
						}
					},interval);
					if(this.amount > 1)
						this.amount--;
				},false);
				subtract.addEventListener("touchend",() => {
					clearInterval(timer);
					previous = null;
				},false);
			},
			goBack () {
				this.$router.go(-1);
			},
		},
		components: {
			'my-header': Header,
		},
		computed: {
			shopCart () {
				return this.$store.state.shopCart;
			}
		}
	}
</script>