<template>
	<div class="register">
		<my-header>
			<i slot="left" class="iconfont icon-return" @click="goBack"></i>
			<h1 slot="mid">注册</h1>
		</my-header>
		<div class="container">
			<form>
				<div id="user">
					<i class="iconfont icon-my"></i>
					<input type="text" v-model="user" placeholder="请输入账号"/>
				</div>
				<div id="pwd">
					<i class="iconfont icon-lock"></i>
					<input type="password" v-model="pwd" placeholder="请输入密码"/>
				</div>
				<div id="email">
					<i class="iconfont icon-mail"></i>
					<input type="email" v-model="email" placeholder="请输入邮箱"/>
				</div>
				<a href="javascript:;">注册</a>
			</form>
			<div class="other">
				<a href="javascript:;" @click="$router.push({name:'Login'})">登录账号</a>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@import 'Register.scss';
</style>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				user: 'rainbowvs',
				pwd: '062513',
				email: '527532711@qq.com',
			}
		},
		mounted () {
			
		},
		methods: {
			goBack () {
				this.$router.push({name: 'Home'});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>