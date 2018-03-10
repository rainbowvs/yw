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
			</ul>
		</div>
		<div class="footer">
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
			}
		},
		created () {
			this.addressInfo = this.$route.params.address;
		},
		methods: {
			goBack () {
				this.$router.push({name: 'Address'});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>