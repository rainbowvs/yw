<template>
	<div class="login">
		<my-header>
			<i slot="left" class="iconfont icon-return" @click="goBack"></i>
			<h1 slot="mid">登录</h1>
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
				<a href="javascript:;">登录</a>
			</form>
			<div class="other">
				<a href="javascript:;" @click="$router.push({name:'Register'})">注册账号</a>
				<a href="javascript:;">忘记密码</a>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@import 'Login.scss';
</style>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				user: 'rainbowvs',
				pwd: '062513',
			}
		},
		mounted () {
			
		},
		methods: {
			goBack () {
				this.$router.go(-1);
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>