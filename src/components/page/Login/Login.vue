<style lang="scss" scoped>
	@import 'Login.scss';
</style>

<template>
	<div class="login">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">登录</h1>
		</my-header>
		<div class="container">
			<form>
				<div id="phone">
					<i class="yuewang icon-my"></i>
					<input type="text" v-model="phone" placeholder="请输入账号"/>
				</div>
				<div id="pwd">
					<i class="yuewang icon-lock"></i>
					<input type="password" v-model="pwd" placeholder="请输入密码"/>
				</div>
				<a href="javascript:;" @click="loginClick">登录</a>
			</form>
			<div class="other">
				<a href="javascript:;" @click="$router.push({name:'Register'})">注册账号</a>
				<a href="javascript:;">忘记密码</a>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				phone: '15099976289',
				pwd: '062513',
			}
		},
		mounted () {
			
		},
		methods: {
			loginClick () {
				let that = this;
				if(!(that.checkPhone(that.phone) && that.checkPwd(that.pwd)))
					return false;
				that.$ajax({
					name: '登录',
					url: window.reqUrl + 'login.php',
					data: {
						phone: that.phone,
						pwd: that.pwd,
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
						});
						//存储用户信息
						window.localStorage.setItem('userInfo',JSON.stringify(res.userInfo));
						setTimeout(() => {
							that.$router.push({name: 'User'});
						},1000);
					}else{
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
			checkPhone (phone) {
				if(phone == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写手机号码',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(phone)){
					this.$store.commit('SHOW_TOAST',{
						text: '手机不得包含敏感字符',
					});
					return false;
				}else if(!(/^1[3|4|5|8]\d{9}$/.test(phone))){
					this.$store.commit('SHOW_TOAST',{
						text: '请输入正确的手机号码',
					});
					return false;
				}
				return true;
			},
			checkPwd (pwd) {
				if(pwd == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写密码',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(pwd)){
					this.$store.commit('SHOW_TOAST',{
						text: '密码不得包含敏感字符',
					});
					return false;
				}else if(pwd.length < 6 || pwd.length > 16){
					this.$store.commit('SHOW_TOAST',{
						text: '密码长度范围在6-16个字符',
					});
					return false;
				}
				return true;
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