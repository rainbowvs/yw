<template>
	<div class="shopdetail">
		<my-header>
			<i slot="left" class="iconfont icon-return" @click="goBack"></i>
			<h1 slot="mid">商品详情</h1>
		</my-header>
		<div class="container">
			<img src="https://cdn.ctfmall.com/thumb2/AB35097.jpg" class="preview"/>
			<div class="spec">
				<ul>
					<li><h6>越王珠宝BG001 18K金共33分FG色 钻石女戒</h6></li>
					<li>价格：<span class="price">￥6896.00</span></li>
					<li>库存：450件</li>
					<li>
						<dl>
							<dt>圈口：</dt>
							<dd class="active">11</dd>
							<dd>12</dd>
							<dd>13</dd>
							<dd>14</dd>
							<dd>15</dd>
							<dd>16</dd>
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
						<i>模号：</i><span>F156901</span>
					</li>
					<li>
						<i>款式：</i><span>戒指</span>
					</li>
					<li>
						<i>系列：</i><span>无</span>
					</li>
					<li>
						<i>重量：</i><span>约2g</span>
					</li>
					<li>
						<i>工费：</i><span>￥48.00</span>
					</li>
					<li>
						<i>售后服务：</i><span>专柜联保 店铺保修 </span>
					</li>
				</ul>
			</div>
			<div class="pics">
				<h6>——商品图片——</h6>
				<ul>
					<li>
						<img src="http://cdn.ctfeshop.com.cn/path/AB35097.jpg"/>
					</li>
					<li>
						<img src="http://cdn.ctfeshop.com.cn/path/AB35097a.jpg"/>
					</li>
					<li>
						<img src="http://cdn.ctfeshop.com.cn/path/AB35097b.jpg"/>
					</li>
				</ul>
			</div>
			<div class="comment">
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

<style lang="scss">
	@import 'ShopDetail.scss';
</style>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				amount: 1,
			}
		},
		mounted () {
			this.addFunc(450,500,100);
			this.subtractFunc(500,100);
		},
		methods: {
			addCart () {
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
				if(this.amount > 450)
					this.amount = 450;
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
		}
	}
</script>