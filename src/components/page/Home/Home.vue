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
			<img src="../../../../static/img/show.jpg"/>
			<div class="kind">
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