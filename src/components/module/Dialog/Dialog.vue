<template>
	<div class="dialog">
		<div class="mask" :class="{'active': show}" @click="close"></div>
		<div class="container" :class="{'active': show}">
			<div class="header">
				<h1 v-text="title"></h1>
			</div>
			<div class="content">
				<p v-text="text"></p>
			</div>
			<div class="footer">
				<button id="no" @click="close" v-text="cancelText"></button>
				<button id="ok" @click="ok" v-text="okText"></button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import 'Dialog.scss';
</style>

<script>
	export default{
		data () {
			return {
				show: false,
				title: '提示',
				text: '',
				params: null,
				cancelText: '取消',
				okText: '确定',
			}
		},
		methods: {
			close () {
				this.show = false;
			},
			open (obj) {
				this.show = true;
				for(let x in obj)
					this[x] = obj[x];
			},
			ok () {
				this.$emit('sure',this.params);
			},
		},
	}
</script>