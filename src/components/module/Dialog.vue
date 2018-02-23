<template>
	<div class="dialog">
		<div class="mask" :class="{'active': show}"></div>
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

<style lang="scss" scoped>
	@import '../../../static/scss/public.scss';
	.dialog{
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
            background-color: #000;
            transition: .2s;
            opacity: 0;
            &.active{
            	opacity: .502;
                visibility: visible;
            }
		}
		&>.container{
			visibility: hidden;
			text-align: center;
			position: fixed;
			top: 50%;
		    left: 50%;
		    transform: translate3d(-50%,-50%,0) scale(.7,.7);
		    width: 85%;
    		border-radius: 3px;
		    background: #fff;
		    box-sizing: border-box;
		    z-index: 100000;
		    transition: .2s;
		    opacity: 0;
            &.active{
            	opacity: 1;
                visibility: visible;
                transform: translate3d(-50%,-50%,0) scale(1,1);
            }
            &>.header{
        	    padding: 15px 0 0;
        	    &>h1{
        	    	text-align: center;
				    font-size: 16px;
				    font-weight: 700;
				    color: #333;
        	    }
            }
            &>.content{
            	border-bottom: 1px solid #ddd;
        	    padding: 10px 20px 15px;
			    min-height: 36px;
			    position: relative;
			    &>p{
		    	    color: #999;
				    line-height: 36px;
			    }
            }
            &>.footer{
            	@include flex(row);
            	&>button{
            		height: 40px;
            		width: 50%;
            		font-size: 16px;
            		background-color: transparent;
            		&:first-child{
            			border-right: 1px solid #ddd;
            			color: #999999;
            		}
            	}
            }
		}
	}
</style>