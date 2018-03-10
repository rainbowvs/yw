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
				<li>
					<i class="yuewang icon-radio-checked"></i>
					<span>设为默认</span>
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
				name: '',
				phone: '',
				address: '',
			}
		},
		created () {
			
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