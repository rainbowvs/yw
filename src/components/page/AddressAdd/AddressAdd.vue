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
					<input type="text" id="cnee" v-model="name" placeholder="请填写20位字符以内的收货人姓名" maxlength="20" />
				</li>
				<li>
					<label for="phone">手机：</label>
					<input type="text" id="phone" v-model="phone" placeholder="请填写11位收货人手机" maxlength="11" />
				</li>
				<li>
					<label for="address">详细地址：</label>
					<input type="text" id="address" v-model="address" placeholder="请填写60位字符以内的详细地址" maxlength="60" />
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
				name: '',
				phone: '',
				address: '',
				acquiescent: true,
			}
		},
		methods: {
			checkPhone (phone) {
				if(phone == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写手机号码',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(phone)){
					this.$store.commit('SHOW_TOAST',{
						text: '手机不得包含敏感字符',
					});
					return false;
				}else if(!(/^1[3|4|5|8]\d{9}$/.test(phone))){
					this.$store.commit('SHOW_TOAST',{
						text: '请输入正确的手机号码',
					});
					return false;
				}
				return true;
			},
			checkName (name) {
				if(name == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写姓名',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(name)){
					this.$store.commit('SHOW_TOAST',{
						text: '姓名不得包含敏感字符',
					});
					return false;
				}else if(name.length >= 20){
					this.$store.commit('SHOW_TOAST',{
						text: '姓名长度不得超过20个字符',
					});
					return false;
				}
				return true;
			},
			checkAddress (address) {
				if(address == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请填写详细地址',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(address)){
					this.$store.commit('SHOW_TOAST',{
						text: '详细地址不得包含敏感字符',
					});
					return false;
				}else if(address.length >= 60){
					this.$store.commit('SHOW_TOAST',{
						text: '详细地址长度不得超过60个字符',
					});
					return false;
				}
				return true;
			},
			sureClick () {
				let that = this;
				if(!(that.checkName(that.name) && that.checkPhone(that.phone) && that.checkAddress(that.address)))
					return false;
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