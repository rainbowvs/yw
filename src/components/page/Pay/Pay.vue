<style lang="scss" scoped>
	@import 'Pay.scss';
</style>

<template>
	<div class="pay">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">支付</h1>
		</my-header>
		<div class="container">
			<h2>请输入6位数字支付密码：</h2>
			<form v-on:submit.prevent="payClick">
				<input ref="payInput" type="password" v-model="payPwd" autofocus maxlength="6" />
			</form>
		</div>
		<div class="footer" @click="payClick">
			<a href="javascript:;">确定支付</a>
		</div>
		<my-dialog ref="dialog" @sure="ok"></my-dialog>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				oid: '',
				payPwd: '',
			}
		},
		created () {
			this.oid = this.$route.params.oid; 
		},
		mounted () {
			setTimeout(() => {
				this.$refs.payInput.focus();
			},500);
		},
		methods: {
			ok () {
				this.$router.push({name: 'Order'});
			},
			enterUp (e) {
				//回车模拟点击登录
				if(e.keyCode == 13)
					this.payClick();
			},
			payClick () {
				//点击登录按钮事件
				let that = this;
				if(!that.checkPayPwd(that.payPwd))
					return false;
				that.$ajax({
					name: '支付',
					url: window.reqUrl + 'pay.php',
					data: {
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						oid: that.oid,
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
						setTimeout(() => {
							that.$router.push({name: 'PaySuccess'});
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
			goBack () {
				this.$refs.dialog.open({
					text: '放弃支付将会返回订单页面',
				});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>