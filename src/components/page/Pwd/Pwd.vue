<style lang="scss" scoped>
	@import 'Pwd.scss';
</style>

<template>
	<div class="pwd">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">修改登录密码</h1>
		</my-header>
		<div class="container">
			<form>
				<div id="pwd" :class="{focus: pwdFocus}">
					<i :class="{focus: pwdFocus}">旧登录密码</i>
					<input type="password" v-model="pwd" placeholder="请输入旧登录密码" maxlength="12" @focus="pwdFocus=true" @blur="pwdFocus=false"/>
				</div>
				<div id="newPwd" :class="{focus: newPwdFocus}">
					<i :class="{focus: newPwdFocus}">新登录密码</i>
					<input type="password" v-model="newPwd" placeholder="请输入6~12位新登录密码" maxlength="12" @focus="newPwdFocus=true" @blur="newPwdFocus=false"/>
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
				newPwd: '',
				pwdFocus: false,
				newPwdFocus: false,
			}
		},
		methods: {
			checkPwd (pwd) {
				if(pwd == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写旧登录密码',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(pwd)){
					this.$store.commit('SHOW_TOAST',{
						text: '旧登录密码不得包含敏感字符',
					});
					return false;
				}else if(pwd.length < 6 || pwd.length > 12){
					this.$store.commit('SHOW_TOAST',{
						text: '旧登录密码长度范围在6-12个字符',
					});
					return false;
				}else if(!(/(?=.*\d)(?=.*[a-z])/g.test(pwd))){
					this.$store.commit('SHOW_TOAST',{
						text: '旧登录密码至少包含一个字母和一个数字',
					});
					return false;
				}
				return true;
			},
			checkNewPwd (pwd) {
				if(pwd == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写新登录密码',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(pwd)){
					this.$store.commit('SHOW_TOAST',{
						text: '新登录密码不得包含敏感字符',
					});
					return false;
				}else if(pwd.length < 6 || pwd.length > 12){
					this.$store.commit('SHOW_TOAST',{
						text: '新登录密码长度范围在6-12个字符',
					});
					return false;
				}else if(!(/(?=.*\d)(?=.*[a-z])/g.test(pwd))){
					this.$store.commit('SHOW_TOAST',{
						text: '新登录密码至少包含一个字母和一个数字',
					});
					return false;
				}
				return true;
			},
			checkEqual (x,y) {
				if(x == y){
					this.$store.commit('SHOW_TOAST',{
						text: '新登录密码不能与旧登录密码相同',
					});
					return false;
				}
				return true;
			},
			saveClick () {
				//点击注册按钮事件
				let that = this;
				if(!(that.checkPwd(that.pwd) && that.checkNewPwd(that.newPwd) && that.checkEqual(that.pwd,that.newPwd)))
					return false;
				that.$ajax({
					name: '修改登录密码',
					url: window.reqUrl + 'user.php',
					data: {
						handle: 'updatePwd',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						pwd: that.pwd,
						newPwd: that.newPwd,
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