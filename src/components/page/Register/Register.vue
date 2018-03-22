<style lang="scss" scoped>
	@import 'Register.scss';
</style>

<template>
	<div class="register">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">注册</h1>
		</my-header>
		<div class="container">
			<form>
				<div id="phone" :class="{focus: phoneFocus}">
					<i class="yuewang icon-phone" :class="{focus: phoneFocus}"></i>
					<input type="text" v-model="phone" placeholder="请输入11位手机号码" maxlength="11" @focus="phoneFocus=true" @blur="phoneFocus=false"/>
				</div>
				<div id="name" :class="{focus: nameFocus}">
					<i class="yuewang icon-my" :class="{focus: nameFocus}"></i>
					<input type="text" v-model="name" placeholder="请输入20位以内的昵称" maxlength="20" @focus="nameFocus=true" @blur="nameFocus=false"/>
				</div>
				<div id="pwd" :class="{focus: pwdFocus}">
					<i class="yuewang icon-lock" :class="{focus: pwdFocus}"></i>
					<input type="password" v-model="pwd" placeholder="请输入6-12位密码" maxlength="12" @focus="pwdFocus=true" @blur="pwdFocus=false"/>
				</div>
				<div id="payPwd" :class="{focus: payPwdFocus}">
					<i class="yuewang icon-lock" :class="{focus: payPwdFocus}"></i>
					<input type="password" v-model="payPwd" placeholder="请输入6位数字支付密码" maxlength="6" @keyup="enterUp($event)" @focus="payPwdFocus=true" @blur="payPwdFocus=false"/>
				</div>
				<a href="javascript:;" @click="registerClick">注册</a>
			</form>
			<div class="other">
				<a href="javascript:;" @click="$router.push({name:'Login'})">登录账号</a>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				phone: '',
				name: '',
				pwd: '',
				payPwd: '',
				phoneFocus: false,
				nameFocus: false,
				pwdFocus: false,
				payPwdFocus: false,
			}
		},
		created () {
			
		},
		methods: {
			enterUp (e) {
				//回车模拟点击注册
				if(e.keyCode == 13)
					this.registerClick();
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
			checkName (name) {
				if(name == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写昵称',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(name)){
					this.$store.commit('SHOW_TOAST',{
						text: '昵称不得包含敏感字符',
					});
					return false;
				}else if(name.length >= 20){
					this.$store.commit('SHOW_TOAST',{
						text: '昵称长度不得超过20个字符',
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
				}else if(pwd.length < 6 || pwd.length > 12){
					this.$store.commit('SHOW_TOAST',{
						text: '密码长度范围在6-12个字符',
					});
					return false;
				}else if(!(/(?=.*\d)(?=.*[a-z])/g.test(pwd))){
					this.$store.commit('SHOW_TOAST',{
						text: '密码至少包含一个字母和一个数字',
					});
					return false;
				}
				return true;
			},
			checkPayPwd (pwd) {
				if(pwd == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写支付密码',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(pwd)){
					this.$store.commit('SHOW_TOAST',{
						text: '支付密码不得包含敏感字符',
					});
					return false;
				}else if(!(/\d{6}/g.test(pwd))){
					this.$store.commit('SHOW_TOAST',{
						text: '支付密码只能是6位数字',
					});
					return false;
				}
				return true;
			},
			registerClick () {
				//点击注册按钮事件
				let that = this;
				if(!(that.checkPhone(that.phone) && that.checkName(that.name) && that.checkPwd(that.pwd) && that.checkPayPwd(that.payPwd)))
					return false;
				that.$ajax({
					name: '注册',
					url: window.reqUrl + 'register.php',
					data: {
						phone: that.phone,
						pwd: that.pwd,
						name: that.name,
						payPwd: that.payPwd,
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
						that.$store.commit('SET_USERINFO',{
							userInfo: res.userInfo,
						});
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
			goBack () {
				this.$router.push({name: 'Home'});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>