<style lang="scss" scoped>
	@import 'PayPwd.scss';
</style>

<template>
	<div class="paypwd">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">修改支付密码</h1>
		</my-header>
		<div class="container">
			<form>
				<div id="pwd" :class="{focus: pwdFocus}">
					<i :class="{focus: pwdFocus}">登录密码</i>
					<input type="password" v-model="pwd" placeholder="请输入登录密码" maxlength="12" @focus="pwdFocus=true" @blur="pwdFocus=false"/>
				</div>
				<div id="payPwd" :class="{focus: payPwdFocus}">
					<i :class="{focus: payPwdFocus}">旧支付密码</i>
					<input type="password" v-model="payPwd" placeholder="请输入6位数字旧支付密码" maxlength="6" @focus="payPwdFocus=true" @blur="payPwdFocus=false"/>
				</div>
				<div id="newPayPwd" :class="{focus: newPayPwdFocus}">
					<i :class="{focus: newPayPwdFocus}">新支付密码</i>
					<input type="password" v-model="newPayPwd" placeholder="请输入6位数字新支付密码" maxlength="6" @focus="newPayPwdFocus=true" @blur="newPayPwdFocus=false"/>
				</div>
				<a href="javascript:;" @click="saveClick">保存</a>
			</form>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				pwd: '',
				payPwd: '',
				newPayPwd: '',
				pwdFocus: false,
				payPwdFocus: false,
				newPayPwdFocus: false,
			}
		},
		methods: {
			checkPwd (pwd) {
				if(pwd == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写登录密码',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(pwd)){
					this.$store.commit('SHOW_TOAST',{
						text: '登录密码不得包含敏感字符',
					});
					return false;
				}else if(pwd.length < 6 || pwd.length > 12){
					this.$store.commit('SHOW_TOAST',{
						text: '登录密码长度范围在6-12个字符',
					});
					return false;
				}else if(!(/(?=.*\d)(?=.*[a-z])/g.test(pwd))){
					this.$store.commit('SHOW_TOAST',{
						text: '登录密码至少包含一个字母和一个数字',
					});
					return false;
				}
				return true;
			},
			checkPayPwd (pwd) {
				if(pwd == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写旧支付密码',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(pwd)){
					this.$store.commit('SHOW_TOAST',{
						text: '旧支付密码不得包含敏感字符',
					});
					return false;
				}else if(!(/^\d{6}$/g.test(pwd))){
					this.$store.commit('SHOW_TOAST',{
						text: '旧支付密码只能是6位数字',
					});
					return false;
				}
				return true;
			},
			checkNewPayPwd (pwd) {
				if(pwd == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写新支付密码',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(pwd)){
					this.$store.commit('SHOW_TOAST',{
						text: '新支付密码不得包含敏感字符',
					});
					return false;
				}else if(!(/^\d{6}$/g.test(pwd))){
					this.$store.commit('SHOW_TOAST',{
						text: '新支付密码只能是6位数字',
					});
					return false;
				}
				return true;
			},
			saveClick () {
				//点击注册按钮事件
				let that = this;
				if(!(that.checkPwd(that.pwd) && that.checkPayPwd(that.payPwd) && that.checkNewPayPwd(that.newPayPwd)))
					return false;
				that.$ajax({
					name: '修改支付密码',
					url: window.reqUrl + 'user.php',
					data: {
						handle: 'updatePayPwd',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						pwd: that.pwd,
						payPwd: that.payPwd,
						newPayPwd: that.newPayPwd,
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
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
				this.$router.push({name: 'User'});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>