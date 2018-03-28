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
			<img :src="shop.poster" class="preview"/>
			<div class="spec">
				<ul>
					<li><h6 v-text="shop.name"></h6></li>
					<li>价格：<span class="price">￥{{shop.price}}</span></li>
					<li>库存： {{shop.inventory}} 件</li>
					<li v-if="shop.size">
						<div class="size">圈口：</div>
						<dl>
							<dd v-for="v,i in shop.size" :class="{active: focus==i}" @click="sizeClick(i)" v-text="v"></dd>
						</dl>
					</li>
					<li v-if="shop.length">
						<div class="length">链长：</div>
						<dl>
							<dd v-for="v,i in shop.length" :class="{active: focus==i}" @click="lengthClick(i)" v-text="v"></dd>
						</dl>
					</li>
					<li>
						<span class="amount">数量：</span>
						<form>
							<a ref="subtract" href="javascript:;" class="subtract">-</a>
							<input ref="amount" type="text" name="amount" id="amount" v-model.number="amount" maxlength="3" @blur="format" @touchstart="amountInput($event)" />
							<a ref="add" href="javascript:;" class="add" @touchstart="lackShop(shop.inventory)">+</a>
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
						<i>款式：</i>
						<span>
							<template v-if="shop.style==0">戒指</template>
							<template v-else-if="shop.style==1">项链</template>
							<template v-else-if="shop.style==2">吊坠</template>
							<template v-else-if="shop.style==3">耳环</template>
						</span>
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
						<img :src="v" />
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<a href="javascript:;" class="addCart" @click="checkShop('addCartClick')">加入购物车</a>
			<a href="javascript:;" class="buy" @click="checkShop('buyClick')">立即购买</a>
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
				disabled: false,
			}
		},
		created () {
			let that = this;
			that.shop = JSON.parse(window.sessionStorage.getItem('focusItem'));
		},
		mounted () {
			this.addFunc(this.shop.inventory,500,100);
			this.subtractFunc(500,100);
		},
		methods: {
			lackShop (count) {
				if(count == 0){
					this.$store.commit('SHOW_TOAST',{
						text: '商品库存不足',
					});
					return false;
				}
			},
			checkShop (type) {
				//检查商品库存数量
				let that = this;
				
				if(that.disabled)
					return false;
				
				that.$ajax({
					name: '检查商品库存数量',
					url: window.reqUrl + 'shop.php',
					data: {
						handle: 'check',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						id: that.shop['id'],
						amount: that.amount,
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						if(type == 'buyClick')
							that.buyClick();
						else
							that.addCartClick();
					}else{
						if(res.status == 1)
							setTimeout(() => {
								that.$router.push({name: 'Login'});
							},1000);
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
						});
						that.disabled = true;
						setTimeout(() => {
							that.disabled = false;
						},4000);
					}
					that.$store.commit('HIDE_LOADING');
				}).catch(status => {
					that.$store.commit('HIDE_LOADING');
					that.$store.commit('SHOW_TOAST',{
						text: status
					});
				});
			},
			buyClick () {
				//点击立即购买按钮事件
				this.$store.commit('SET_BUY',{
					id: this.shop.id,
					price: this.shop.price,
					size: this.shop.size==undefined ? '' : this.shop.size[this.focus],
					length: this.shop.length==undefined ? '' : this.shop.length[this.focus],
					amount: this.amount,
					name: this.shop.name,
					mass: this.shop.mass,
					material: this.shop.material,
					poster: this.shop.poster,
					inventory: this.shop.inventory,
					isChecked: true,
				});
				this.$store.commit('SET_FROMCART',false);
				this.$store.commit('SET_ORDERCONFIRMBACKNAME',{
					name: 'ShopDetail',
				});
				this.$router.push({name: 'OrderConfirm'});
			},
			sizeClick (index) {
				//点击选择圈口大小按钮事件
				this.focus = index;
			},
			lengthClick (index) {
				//点击选择圈口大小按钮事件
				this.focus = index;
			},
			addCartClick () {
				//点击加入购物车按钮事件
				this.$store.commit('ADD_SHOPCART',{
					id: this.shop.id,
					price: this.shop.price,
					size: this.shop.size==undefined ? '' : this.shop.size[this.focus],
					length: this.shop.length==undefined ? '' : this.shop.length[this.focus],
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
				this.lackShop(max);
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
				this.$router.push({name: 'Categories'});
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