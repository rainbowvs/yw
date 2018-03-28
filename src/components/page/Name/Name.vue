<style lang="scss" scoped>
	@import 'Name.scss';
</style>

<template>
	<div class="name">
		<my-header>
			<i slot="left" class="yuewang icon-return" @click="goBack"></i>
			<h1 slot="mid">修改昵称</h1>
		</my-header>
		<div class="container">
			<form>
				<div id="name" :class="{focus: nameFocus}">
					<i :class="{focus: nameFocus}">新昵称</i>
					<input type="text" v-model="name" placeholder="请输入20位字符以内的新昵称" maxlength="20" @focus="nameFocus=true" @blur="nameFocus=false" />
				</div>
				<a href="javascript:;" @click="saveClick">保存</a>
			</form>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/module/Header/Header';
	export default {
		data () {
			return {
				name: this.$route.params.name,
				nameFocus: false,
			}
		},
		methods: {
			checkName (name) {
				if(name == ''){
					this.$store.commit('SHOW_TOAST',{
						text: '请输入新昵称',
					});
					return false;
				}else if(/and|or|\/|\'|\"|\;|\:|\?|\\|\s/g.test(name)){
					this.$store.commit('SHOW_TOAST',{
						text: '新昵称不得包含敏感字符',
					});
					return false;
				}else if(name.length >= 20){
					this.$store.commit('SHOW_TOAST',{
						text: '新昵称长度不得超过20个字符',
					});
					return false;
				}
				return true;
			},
			saveClick () {
				//点击注册按钮事件
				let that = this;
				if(!(that.checkName(that.name)))
					return false;
				that.$ajax({
					name: '修改昵称',
					url: window.reqUrl + 'user.php',
					data: {
						handle: 'updateName',
						uid: that.$store.state.userInfo['id'],
						token: that.$store.state.userInfo['token'],
						name: that.name,
					},
					beforeSend () {
						that.$store.commit('SHOW_LOADING');
					}
				}).then(res => {
					if(res.type == 'success'){
						that.$store.commit('SHOW_TOAST',{
							text: res.msg
						});
						that.$store.commit('SET_USERINFO',{
							userInfo: res.userInfo,
						});
						setTimeout(() => {
							that.$router.push({name: 'User'});
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
			goBack () {
				this.$router.push({name: 'User'});
			},
		},
		components: {
			'my-header': Header,
		}
	}
</script>