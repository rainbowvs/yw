<style lang="scss" scoped>
	@import 'Categories.scss';
</style>

<template>
	<div class="categories">
		<my-header>
			<i slot="left" class="yuewang icon-sort" @click="sidebar_show=true"></i>
			<form slot="mid">
				<input type="text" placeholder="戒指" v-model="searchContent" autofocus />
				<i class="yuewang icon-search"></i>
			</form>
			<span slot="right" @click="searchContent=''">清空</span>
		</my-header>
		<div class="container" ref="scrollContainer">
			<div class="sidebar">
				<div class="mask" :class="{'active': sidebar_show}" @click="sidebar_show=false"></div>
				<div class="container" :class="{'active': sidebar_show}">
					<h2>材质</h2>
					<ul>
						<li v-for="type,index in types" v-text="type.name" :class="{'active': type.isChecked}" @click="typeClick(index)"></li>
					</ul>
				</div>
			</div>
			<div class="scroller">
				<scroller :on-infinite="load" ref="sc">
					<ul class="list">
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
				</scroller>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				searchContent: '',
				sidebar_show: false,
				shops: [],
				types: [
					{name: '黄金', type: 0,isChecked: false,},
					{name: '钻石', type: 1,isChecked: false,},
					{name: 'K金', type: 2,isChecked: false,},
					{name: '铂金', type: 3,isChecked: false,},
					{name: '珍珠', type: 4,isChecked: false,},
					{name: '银饰', type: 5,isChecked: false,},
					{name: '宝石', type: 6,isChecked: false,},
				],
				currentPage: 1,
				totalPage: 2,
			}
		},
		created () {
			this.load();
		},
		methods: {
			load () {
				let that = this;
				that.$ajax({
					name: '获取商品列表',
					url: window.reqUrl + 'shop.php',
					data: {
						phone: that.$store.state.userInfo['phone'],
						token: that.$store.state.userInfo['token'],
						handle: 'get',
						page: that.currentPage,
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
								size: v.size.split(','),
								style: v.style,
								type: v.type,
								isLoaded: false,
							});
							let img = new Image();
							img.src = v.poster;
							img.onload = () => {
								that.shops[i].isLoaded = true;
							}
						});
						that.currentPage++;
						that.$refs.sc.finishInfinite(0);//1=>停止
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
			typeClick (index) {
				//点击选中材质按钮事件
				this.sidebar_show = false;
				this.types.forEach((titem,tindex) => {
					if(tindex == index)
						titem.isChecked = !titem.isChecked;
					else
						titem.isChecked = false;
				});
			},
			shopClick (item) {
				//点击选中商品事件
				window.sessionStorage.setItem('focusItem',JSON.stringify(item));
				this.$router.push({name: 'ShopDetail'});
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
