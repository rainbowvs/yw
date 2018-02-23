<template>
	<div class="categories">
		<my-header>
			<i slot="left" class="iconfont icon-sort" @click="sidebar_show=true"></i>
			<form slot="mid">
				<input type="text" placeholder="戒指" v-model="searchContent" autofocus />
				<i class="iconfont icon-search"></i>
			</form>
			<span slot="right" @click="searchContent=''">清空</span>
		</my-header>
		<div class="container" @scroll="lazyLoad" ref="scrollContainer">
			<div class="sidebar">
				<div class="mask" :class="{'active': sidebar_show}" @click="sidebar_show=false"></div>
				<div class="container" :class="{'active': sidebar_show}">
					<h2>款式</h2>
					<ul>
						<li v-for="type,index in types" v-text="type.name" :class="{'active': type.isChecked}" @click="typeClick(index)"></li>
					</ul>
				</div>
			</div>
			<div class="list">
				<ul>
					<li v-for="shop,index in searchShops" @click="shopClick(shop)">
						<a href="javascript:;">
							<template v-if="shop.isLoaded">
								<img :src="shop.poster"/>
							</template>
							<template v-else>
								<img src="../../../../static/img/1.gif"/>
							</template>
							<h6 v-text="shop.name"></h6>
							<span>￥{{shop.price}}</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@import 'Categories.scss';
</style>

<script>
	import Header from '@/components/module/Header';
	export default {
		data () {
			return {
				searchContent: '',
				sidebar_show: false,
				shops: [
					{id: 0,name: '车花心形黄金足金戒指',price: '760.00',poster: 'https://cdn.ctfmall.com/thumb/F156901.jpg',type: 0,isLoaded: false,},
					{id: 1,name: '时尚百搭黄金足金项链',price: '1349.60',poster: 'https://cdn.ctfmall.com/thumb/F159797.jpg',type: 1,isLoaded: false,},
					{id: 2,name: '生肖鸡吉星高照黄金足金吊坠',price: '688.80',poster: 'https://cdn.ctfmall.com/thumb/F200643.jpg',type: 2,isLoaded: false,},
					{id: 3,name: '心形车花银925耳环',price: '240.00',poster: 'https://cdn.ctfmall.com/thumb/AB35093.jpg',type: 3,isLoaded: false,},
					{id: 4,name: '【儿童首饰】吉祥转运珠黄金足金手镯',price: '1852.40',poster: 'https://cdn.ctfmall.com/thumb/F166381.jpg',type: 4,isLoaded: false,},
					{id: 5,name: '典雅十字银925手链',price: '360.00',poster: 'https://cdn.ctfmall.com/thumb/AB35097.jpg',type: 5,isLoaded: false,},
				],
				types: [
					{name: '戒指', type: 0,isChecked: false,},
					{name: '项链', type: 1,isChecked: false,},
					{name: '吊坠', type: 2,isChecked: false,},
					{name: '耳环', type: 3,isChecked: false,},
					{name: '手镯', type: 4,isChecked: false,},
					{name: '手链', type: 5,isChecked: false,},
				],
			}
		},
		mounted () {
			this.$nextTick(()=>{
				this.loadImage();
			});
		},
		methods: {
			loadImage () {
				let imgs = this.$refs.scrollContainer.querySelectorAll('.list img');
				let winH = this.$refs.scrollContainer.scrollTop + this.$refs.scrollContainer.clientHeight;
				for(let i = 0; i < imgs.length; i++)
					if(winH >= imgs[i].offsetTop)
						this.shops[i].isLoaded = true;
			},
			throttle(func,delay,minInterval){
				let timer = null;
				let previous = null;
				return () => {
					let now = +new Date();//+:一元运算符
					if(!previous)
						previous = now;
					if(minInterval && (now - previous > minInterval)){
						clearTimeout(timer);
						func && func();
						previous = now;
					}else{
						clearTimeout(timer);
						timer = setTimeout(() => {
							func && func();
							previous = null;
						},delay);
					}
				}
			},
			lazyLoad () {
				this.throttle(this.loadImage(),200,1000);
			},
			typeClick (index) {
				this.sidebar_show = false;
				this.types.forEach((titem,tindex) => {
					if(tindex == index)
						titem.isChecked = !titem.isChecked;
					else
						titem.isChecked = false;
				});
				this.loadImage();
			},
			shopClick (item) {
				this.$router.push({name: 'ShopDetail',params: item});
			},
		},
		computed: {
			searchShops () {
				//过滤
				let count = 0;
				let type = null;
				this.types.forEach((item,index) => {
					if(item.isChecked){
						count = 1;
						type = item.type;
					}
				});
				if(count == 0){
					//筛选所有类型
					if(this.searchContent){
						return this.shops.filter(shop => {
							return shop.name.indexOf(this.searchContent) > -1;
						});
					}
					return this.shops;
				}else{
					//筛选指定类型
					return this.shops.filter(shop => {
						return shop.type == type;
					});
				}
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>
