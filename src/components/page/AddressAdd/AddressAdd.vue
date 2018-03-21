<style lang="scss" scoped>
	@import 'AddressAdd.scss';
</style>

<template>
	<div class="addressadd">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">添加新地址</h1>
		</my-header>
		<div class="container">
			<ul>
				<li>
					<label for="cnee">收货人：</label>
					<input type="text" id="cnee" v-model="name" />
				</li>
				<li>
					<label for="phone">手机：</label>
					<input type="text" id="phone" v-model="phone" />
				</li>
				<li>
					<label for="address">详细地址：</label>
					<input type="text" id="address" v-model="address" />
				</li>
				<li @click="acquiescent=!acquiescent" :class="{acquiescent: acquiescent}">
					<template v-if="acquiescent">
						<i class="yuewang icon-radio-checked"></i>
					</template>
					<template v-else>
						<i class="yuewang icon-radio"></i>
					</template>
					<span>设为默认</span>
				</li>
			</ul>
		</div>
		<div class="footer" @click="sureClick">
			<a href="javascript:;">确定</a>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				name: '阿里巴巴',
				phone: '15099976289',
				address: '中国杭州市滨江区网商路699号',
				acquiescent: true,
			}
		},
		created () {
			
		},
		methods: {
			sureClick () {
				let that = this;
				that.$ajax({
					name: '新增收货地址',
					url: window.reqUrl + 'address.php',
					data: {
						handle: 'set',
						uid: that.$store.state.userInfo['id'],
						phone: that.phone,
						name: that.name,
						address: that.address,
						acquiescent: that.acquiescent,
						token: that.$store.state.userInfo['token'],
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
							that.$router.push({name: 'Address'});
						},1000);
					}else{
						if(res.status == 1)
							setTimeout(() => {
								that.$router.push({name: 'Login'});
							},1000);
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
				this.$router.push({name: 'Address'});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>