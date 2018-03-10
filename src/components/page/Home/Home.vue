<style lang="scss">
	@import 'Home.scss';
</style>

<template>
	<div class="home">
		<my-header>
			<h1 slot="left">越王</h1>
			<form slot="mid">
				<input type="text" placeholder="戒指" readonly @click="$router.push({name: 'Categories'})" />
				<i class="yuewang icon-search"></i>
			</form>
			<i slot="right" class="yuewang icon-message"></i>
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
			<div class="nav">
				<ul>
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/activity.png"/>
							<span>活动</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/rank.png"/>
							<span>排行榜</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/shopbag.png"/>
							<span>购物袋</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/coupon.png"/>
							<span>优惠券</span>
						</a>
					</li>
				</ul>
			</div>
			<img src="../../../../static/img/show.jpg"/>
			<div class="kind">
				<ul>
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/hot_pro.jpg"/>
						</a>
						<h6>热门产品</h6>
					</li>
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/latest_pro.jpg"/>
						</a>
						<h6>新品上架</h6>
					</li>
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/popular_pro.jpg"/>
						</a>
						<h6>爆款推荐</h6>
					</li>
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/hot_pro.jpg"/>
						</a>
						<h6>热门产品</h6>
					</li>
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/latest_pro.jpg"/>
						</a>
						<h6>新品上架</h6>
					</li>
					<li>
						<a href="javascript:void(0);">
							<img src="../../../../static/img/popular_pro.jpg"/>
						</a>
						<h6>爆款推荐</h6>
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
				]
			}
		},
		mounted () {
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
		},
		methods: {
			
		},
		components: {
			'my-header': Header,
		}
	}
</script>