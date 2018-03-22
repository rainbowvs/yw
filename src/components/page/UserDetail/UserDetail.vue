<style lang="scss" scoped>
	@import 'UserDetail.scss';
</style>

<template>
	<div class="userdetail">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">修改资料</h1>
		</my-header>
		<div class="container">
			<form>
				<div id="name" :class="{focus: nameFocus}">
					<i :class="{focus: nameFocus}">新昵称</i>
					<input type="text" v-model="name" placeholder="请输入20位以内的新昵称" maxlength="20" @focus="nameFocus=true" @blur="nameFocus=false"/>
				</div>
				<div id="pwd" :class="{focus: pwdFocus}">
					<i :class="{focus: pwdFocus}">新密码</i>
					<input type="password" v-model="pwd" placeholder="请输入6-12位新密码" maxlength="12" @focus="pwdFocus=true" @blur="pwdFocus=false"/>
				</div>
				<div id="payPwd" :class="{focus: payPwdFocus}">
					<i :class="{focus: payPwdFocus}">新支付密码</i>
					<input type="password" v-model="payPwd" placeholder="请输入6位数字新支付密码" maxlength="6" @keyup="enterUp($event)" @focus="payPwdFocus=true" @blur="payPwdFocus=false"/>
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
				name: '',
				pwd: '',
				payPwd: '',
				nameFocus: false,
				pwdFocus: false,
				payPwdFocus: false,
			}
		},
		created () {
			this.name = this.$store.state.userInfo['name'];
			this.pwd = this.$store.state.userInfo['o_pwd'];
			this.payPwd = this.$store.state.userInfo['o_pay_pwd'];
		},
		methods: {
			enterUp (e) {
				//回车模拟点击保存
				if(e.keyCode == 13)
					this.saveClick();
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
			saveClick () {
				//点击注册按钮事件
				let that = this;
				if(!(that.checkName(that.name) && that.checkPwd(that.pwd) && that.checkPayPwd(that.payPwd)))
					return false;
				that.$ajax({
					name: '修改个人资料',
					url: window.reqUrl + 'user.php',
					data: {
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
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
				this.$router.push({name: 'User'});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>