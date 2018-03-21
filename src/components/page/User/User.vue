<template>
	<div class="user">
		<div class="header">
			<img src="http://qzapp.qlogo.cn/qzapp/101303972/CD5220AFA905C8D4BAE834719D3B29F9/100" />
			<h6>rainbowvs</h6>
			<i class="yuewang icon-share"></i>
		</div>
		<div class="container">
			<div class="info">
				<ul>
					<li>
						<i>56</i>
						<span>收藏</span>
					</li>
					<li>
						<i>216</i>
						<span>我的足迹</span>
					</li>
					<li>
						<i>520</i>
						<span>购买记录</span>
					</li>
				</ul>
			</div>
			<div class="order">
				<h2 @click="$router.push({name: 'Order'})">我的订单</h2>
				<ul>
					<li>
						<img src="../../../../static/img/send.jpg"/>
						<span>待发货</span>
					</li>
					<li>
						<img src="../../../../static/img/pay.jpg"/>
						<span>待付款</span>
					</li>
					<li>
						<img src="../../../../static/img/receive.jpg"/>
						<span>待收货</span>
					</li>
					<li>
						<img src="../../../../static/img/evaluate.jpg"/>
						<span>评价</span>
					</li>
					<li>
						<img src="../../../../static/img/refund.jpg"/>
						<span>退款·售后</span>
					</li>
				</ul>
			</div>
			<div class="func">
				<ul>
					<li>
						<i class="yuewang icon-setup"></i>
						<span>账户设置</span>
					</li>
					<li>
						<i class="yuewang icon-service"></i>
						<span>客户服务</span>
					</li>
					<li>
						<i class="yuewang icon-about"></i>
						<span>关于我们</span>
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

<style lang="scss" scoped>
	@import 'User.scss';
</style>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods: {
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
						that.$store.commit('DEL_USERINFO');
						setTimeout(() => {
							that.$router.push({name: 'Home'});
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
	}
</script>