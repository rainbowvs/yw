<style lang="scss" scoped>
	@import 'AddressEdit.scss';
</style>

<template>
	<div class="addressedit">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">修改地址</h1>
		</my-header>
		<div class="container">
			<ul>
				<li>
					<label for="cnee">收货人：</label>
					<input type="text" id="cnee" v-model="addressInfo.name" />
				</li>
				<li>
					<label for="phone">手机：</label>
					<input type="text" id="phone" v-model="addressInfo.phone" />
				</li>
				<li>
					<label for="address">详细地址：</label>
					<input type="text" id="address" v-model="addressInfo.address" />
				</li>
				<li v-if="acquiescent_show" @click="addressInfo.acquiescent=!addressInfo.acquiescent" :class="{acquiescent: addressInfo.acquiescent}">
					<template v-if="addressInfo.acquiescent">
						<i class="yuewang icon-radio-checked"></i>
					</template>
					<template v-else>
						<i class="yuewang icon-radio"></i>
					</template>
					<span>设为默认</span>
				</li>
			</ul>
		</div>
		<div class="footer" @click="saveClick">
			<a href="javascript:;">保存</a>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				addressInfo: null,
				acquiescent_show: false,
			}
		},
		created () {
			this.addressInfo = this.$route.params.address;
			this.acquiescent_show = this.$route.params.show;
		},
		methods: {
			saveClick () {
				let that = this;
				that.$ajax({
					name: '编辑收货地址',
					url: window.reqUrl + 'address.php',
					data: {
						handle: 'edit',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						id: that.addressInfo.id,
						name: that.addressInfo.name,
						phone: that.addressInfo.phone,
						address: that.addressInfo.address,
						acquiescent: that.addressInfo.acquiescent,
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