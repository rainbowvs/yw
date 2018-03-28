<style lang="scss" scoped>
	@import 'Header.scss';
</style>

<template>
	<div class="header">
		<div class="container">
			<div class="left">
				<slot name="left"></slot>
			</div>
			<div class="mid">
				<slot name="mid"></slot>
			</div>
			<div class="right">
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data () {
			return {
				
			}
		},
	}
</script>