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
			<div class="scroller">
				<scroller :on-infinite="load" ref="sc">
					<ul>
						<li v-for="v,i in addresses">
							<div class="top" @click="addressClick(v,i)">
								<div class="userInfo">
									<span v-text="v.name"></span>
									<em v-text="v.phone"></em>
								</div>
								<p v-text="v.address"></p>
							</div>
							<div class="bottom">
								<div class="left" @click="acquiescentClick(v,i)">
									<template v-if="v.acquiescent">
										<i class="yuewang icon-radio-checked checked"></i>
										<span class="checked">默认地址</span>
									</template>
									<template v-else>
										<i class="yuewang icon-radio"></i>
										<span>设为默认</span>
									</template>
								</div>
								<div class="right">
									<span @click="$router.push({name: 'AddressEdit',params: {address: v,show: !v.acquiescent}})">
										<i class="yuewang icon-editor"></i>
										<em>编辑</em>
									</span>
									<span @click="deleteClick(v,i)">
										<i class="yuewang icon-recycle"></i>
										<em>删除</em>
									</span>
								</div>
							</div>
						</li>
					</ul>
				</scroller>
			</div>
		</div>
		<div class="footer" @click="$router.push({name: 'AddressAdd'})">
			<a href="javascript:;">新增收货地址</a>
		</div>
		<my-dialog ref="dialog" @sure="ok"></my-dialog>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				addresses: [],
				currentPage: 1,
				totalPage: 2,
			}
		},
		created () {
			this.load();
		},
		methods: {
			load () {
				let that = this;
				that.$ajax({
					name: '获取所有收货地址列表',
					url: window.reqUrl + 'address.php',
					data: {
						handle: 'getAll',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						page: that.currentPage,
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						res.addresses.forEach((v,i) => {
							if(v.acquiescent == 0)
								that.addresses.push({
									id: v.id,
									name: v.name,
									phone: v.phone,
									address: v.address,
									acquiescent: false,
									uid: v.uid,
									c_date: v.c_date,
								});
							else
								that.addresses.unshift({
									id: v.id,
									name: v.name,
									phone: v.phone,
									address: v.address,
									acquiescent: true,
									uid: v.uid,
									c_date: v.c_date,
								});
								
						});
						that.currentPage++;
						that.$refs.sc.finishInfinite(0);//1=>停止
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
			addressClick (item,index) {
				//点击选择收货地址事件
				if(this.$store.state.AddressBackName == 'User')
					return false;
				window.sessionStorage.setItem('addressInfo',JSON.stringify(item));
				this.$router.push({name: 'OrderConfirm'});
			},
			ok (params) {
				//确认删除按钮事件
				let that = this;
				that.$ajax({
					name: '删除收货地址',
					url: window.reqUrl + 'address.php',
					data: {
						handle: 'delete',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						id: params['id'],
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						that.addresses.splice(params['index'],1);
						that.$refs.dialog.close();
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
						});
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
			deleteClick (item,index) {
				//点击删除地址按钮事件
				this.$refs.dialog.open({
					text: '确定要删除该收获地址？',
					params: {
						id: item['id'],
						index: index,
					},
				});
			},
			acquiescentClick (item,index) {
				//点击设为默认按钮事件
				let that = this;
				if(item.acquiescent == true)
					return false;
				that.$ajax({
					name: '修改默认收货地址',
					url: window.reqUrl + 'address.php',
					data: {
						handle: 'update',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						id: item.id,
						acquiescent: true,
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						that.addresses.forEach((v,i) => {
							if(v.acquiescent)
								v.acquiescent = false;
						});
						item.acquiescent = true;
						let temp = that.addresses.splice(index,1)[0];
						that.addresses.splice(0,0,temp);
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
						});
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
				let that = this;
				that.$router.push({name: that.$store.state.AddressBackName});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>