<style lang="scss" scoped>
	@import 'Address.scss';
</style>

<template>
	<div class="address">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">收货地址管理</h1>
		</my-header>
		<div class="container">
			<ul>
				<li v-for="v,i in addresses">
					<div class="top">
						<div class="userInfo">
							<span v-text="v.name"></span>
							<em v-text="v.phone"></em>
						</div>
						<p v-text="v.address"></p>
					</div>
					<div class="bottom">
						<div class="left">
							<template v-if="v.isChecked">
								<i class="yuewang icon-radio-checked checked"></i>
								<span class="checked">默认地址</span>
							</template>
							<template v-else>
								<i class="yuewang icon-radio"></i>
								<span>设为默认</span>
							</template>
						</div>
						<div class="right">
							<span @click="$router.push({name: 'AddressEdit',params: {address: v}})">
								<i class="yuewang icon-editor"></i>
								<em>编辑</em>
							</span>
							<span>
								<i class="yuewang icon-recycle"></i>
								<em>删除</em>
							</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="footer" @click="$router.push({name: 'AddressAdd'})">
			<a href="javascript:;">新增收货地址</a>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				addresses: [
					{name: '张三',phone: '12345678911',address: '广东省广州市白云区金沙街道彩滨北路保利西海岸江岸花园122栋B梯1501房',isChecked: true,},
					{name: '张三',phone: '12345678911',address: '广东省广州市白云区金沙街道彩滨北路保利西海岸江岸花园122栋B梯1501房',isChecked: false,},
					{name: '张三',phone: '12345678911',address: '广东省广州市白云区金沙街道彩滨北路保利西海岸江岸花园122栋B梯1501房',isChecked: false,},
					{name: '张三',phone: '12345678911',address: '广东省广州市白云区金沙街道彩滨北路保利西海岸江岸花园122栋B梯1501房',isChecked: false,},
					{name: '张三',phone: '12345678911',address: '广东省广州市白云区金沙街道彩滨北路保利西海岸江岸花园122栋B梯1501房',isChecked: false,},
					{name: '张三',phone: '12345678911',address: '广东省广州市白云区金沙街道彩滨北路保利西海岸江岸花园122栋B梯1501房',isChecked: false,},
					{name: '张三',phone: '12345678911',address: '广东省广州市白云区金沙街道彩滨北路保利西海岸江岸花园122栋B梯1501房',isChecked: false,},
					{name: '张三',phone: '12345678911',address: '广东省广州市白云区金沙街道彩滨北路保利西海岸江岸花园122栋B梯1501房',isChecked: false,},
				],
			}
		},
		mounted () {
			
		},
		methods: {
			goBack () {
				let that = this;
				that.$router.push({name: that.$store.state.AddressBackName});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>