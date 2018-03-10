<style lang="scss" scoped>
	@import 'Footer.scss';
</style>

<template>
	<div class="footer">
		<ul>
			<li :class="{'active': $route.name == 'Home'}" @click="goHome">
				<i class="yuewang icon-home"></i>
				<span>首页</span>
			</li>
			<li :class="{'active': $route.name == 'Categories'}" @click="goCategories">
				<i class="yuewang icon-cascades"></i>
				<span>分类</span>
			</li>
			<li :class="{'active': $route.name == 'Cart'}" @click="goCart">
				<i class="yuewang icon-cart"></i>
				<span>购物车</span>
			</li>
			<li :class="{'active': $route.name == 'User'}" @click="goUser">
				<i class="yuewang icon-my"></i>
				<span>我的</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		created () {
			
		},
		methods: {
			goHome () {
				this.$router.push({name: 'Home'});
			},
			goCategories () {
				this.$router.push({name: 'Categories'});
			},
			goCart () {
				this.$router.push({name: 'Cart'});
			},
			goUser () {
				this.$router.push({name: 'User'});
			},
		}
	}
</script>