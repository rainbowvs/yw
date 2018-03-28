<style lang="scss">
	@import 'Home.scss';
</style>

<template>
	<div class="home">
		<my-header>
			<i class="yuewang icon-ring" slot="left"></i>
			<h1 slot="mid">越王珠宝移动商城</h1>
		</my-header>
		<div class="container">
			<div class="swiper-container">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="banner,index in banners">
			        	<img :src="banner"/>
			        </div>
			    </div>
			    <div class="swiper-pagination"></div>
			</div>
			<!--<img src="../../../../static/img/show.jpg"/>-->
			<!--<div class="kind">
				<ul>
					<li @click="$router.push({name: 'Categories'})">
						<a href="javascript:void(0);">
							<img src="../../../../static/img/hot_pro.jpg"/>
						</a>
						<h6>热门产品</h6>
					</li>
					<li @click="$router.push({name: 'Categories'})">
						<a href="javascript:void(0);">
							<img src="../../../../static/img/latest_pro.jpg"/>
						</a>
						<h6>新品上架</h6>
					</li @click="$router.push({name: 'Categories'})">
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/popular_pro.jpg"/>
						</a>
						<h6>爆款推荐</h6>
					</li>
				</ul>
			</div>-->
			<div class="recommend">
				<h2>随机推荐</h2>
				<ul>
					<li v-for="shop,index in shops" @click="shopClick(shop)">
						<a href="javascript:;">
							<img :src="shop.poster"/>
							<h6 v-text="shop.name"></h6>
							<span>￥{{shop.price}}</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css';
	export default {
		data () {
			return {
				banners: [
					require('../../../../static/img/banner1.jpg'),
					require('../../../../static/img/banner2.jpg'),
					require('../../../../static/img/banner3.jpg'),
				],
				shops: [],
			}
		},
		mounted () {
			let that = this;
			
			let swiper = new Swiper('.swiper-container', {
                pagination: {
                	el: '.swiper-pagination',
                	clickable: true,
            	},
                loop: true,
                autoplay: {
                	delay: 3000,
                	disableOnInteraction: false,
                },
            });
            
            that.$ajax({
				name: '获取随机商品列表',
				url: window.reqUrl + 'shop.php',
				data: {
					phone: that.$store.state.userInfo['phone'],
					token: that.$store.state.userInfo['token'],
					handle: 'getRand',
				},
				beforeSend () {
					that.$store.commit('SHOW_LOADING');
				}
			}).then(res => {
				if(res.type == 'success'){
					res.shops.forEach((v,i) => {
						that.shops.push({
							cdate: v.c_date,
							inventory: v.inventory,
							id: v.id,
							name: v.name,
							mass: v.mass,
							material: v.material,
							model: v.model,
							poster: v.poster,
							preview: v.preview.split(','),
							price: v.price,
							processingCost: v.processing_cost,
							purchased: v.purchased,
							size: v.size=='' ? '' : v.size.split(','),
							length: v.length=='' ? '' : v.length.split(','),
							style: v.style,
							type: v.type,
						});
					});
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
		methods: {
			shopClick (item) {
				//点击选中随机推荐商品事件
				window.sessionStorage.setItem('focusItem',JSON.stringify(item));
				this.$router.push({name: 'ShopDetail'});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>