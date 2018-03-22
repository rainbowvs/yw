<style lang="scss" scoped>
	@import 'User.scss';
</style>

<template>
	<div class="user">
		<my-header>
			<i slot="left"></i>
			<h1 slot="mid">用户</h1>
		</my-header>
		<div class="container">
			<div class="base">
				<h2>
					<span>账号资料</span>
					<i @click="$router.push({name: 'UserDetail'})">修改</i>
				</h2>
				<ul>
					<li>
						<span>手机: </span>
						<em v-text="$store.state.userInfo.phone"></em>
					</li>
					<li>
						<span>昵称: </span>
						<em v-text="$store.state.userInfo.name"></em>
					</li>
					<li>
						<span>密码: </span>
						<em v-text="$store.state.userInfo.o_pwd"></em>
					</li>
					<li>
						<span>支付密码: </span>
						<em v-text="$store.state.userInfo.o_pay_pwd"></em>
					</li>
					<li>
						<span>注册时间: </span>
						<em v-text="$store.state.userInfo.r_date"></em>
					</li>
				</ul>
			</div>
			<div class="func">
				<ul>
					<li @click="addressClick">
						<i class="yuewang icon-brush"></i>
						<span>我的收货地址</span>
					</li>
					<li @click="$router.push({name: 'Order'})">
						<i class="yuewang icon-editor"></i>
						<span>我的订单</span>
					</li>
					<li @click="logoutClick">
						<i class="yuewang icon-logout"></i>
						<span>退出</span>
					</li>
				</ul>
			</div>
		</div>
		<my-dialog ref="dialog" @sure="ok"></my-dialog>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				
			}
		},
		methods: {
			addressClick () {
				this.$store.commit('SET_ADDRESSBACKNAME',{
					name: 'User',
				});
				this.$router.push({name: 'Address'});
			},
			ok () {
				//点击确定按钮事件
				let that = this;
				let userInfo = that.$store.state.userInfo;
				let [id,phone,token] = [userInfo['id'],userInfo['phone'],userInfo['token']];
				that.$ajax({
					name: '退出登录',
					url: window.reqUrl + 'logout.php',
					data: {
						id: id,
						phone: phone,
						token: token,
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
						});
						that.$refs.dialog.close();
						//移除用户信息
						setTimeout(() => {
							that.$router.push({name: 'Home'});
							that.$store.commit('DEL_USERINFO');
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
			logoutClick () {
				//点击退出登录按钮事件
				this.$refs.dialog.open({
					text: '确定要退出登录',
				});
			},
		},
		components: {
			'my-header': Header,
		},
	}
</script>