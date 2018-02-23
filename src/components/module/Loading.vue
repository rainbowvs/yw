<template>
	<div class="loading">
		<div class="mask" :class="{'active': loading}"></div>
		<div class="container" :class="{'active': loading}">
			<span></span>
		</div>
	</div>
</template>

<script>
	export default{
		data () {
			return {
				
			}
		},
		computed: {
			loading () {
				return this.$store.state.loadingObj['show'];
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../static/scss/public.scss';
	.loading{
		&>.mask{
			visibility: hidden;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            &.active{
                visibility: visible;
            }
		}
		&>.container{
			visibility: hidden;
			position: fixed;
			top: 50%;
		    left: 50%;
		    z-index: 10000;
		    @include flex(row);
		    transform: translate3d(-50%,-50%,0);
		    border-radius: 5px;
		    background: rgba(0,0,0,.502);
		    box-sizing: border-box;
		    width: 100px;
		    height: 100px;
		    opacity: 0;
		    transition: all .2s ease-in;
            &.active{
                visibility: visible;
                opacity: 1;
            }
			&>span{
				display: block;
				animation: rotate .8s infinite linear;
				border: 4px solid transparent;
				border-radius: 100%;
				border-top-color: #fff;
			    border-left-color: #fff;
			    border-bottom-color: #fff;
			    height: 30px;
			    width: 30px;
			}
		}
	}
	@keyframes rotate{
		from{
			transform: rotate(0deg);
		}
		to{
			transform: rotate(360deg);
		}
	}
</style>