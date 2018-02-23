<template>
	<div class="footer">
		<ul>
			<li :class="{'active': $route.name == 'Home'}" @click="goHome">
				<i class="iconfont icon-home"></i>
				<span>首页</span>
			</li>
			<li :class="{'active': $route.name == 'Categories'}" @click="goCategories">
				<i class="iconfont icon-cascades"></i>
				<span>分类</span>
			</li>
			<li :class="{'active': $route.name == 'Cart'}" @click="goCart">
				<i class="iconfont icon-cart"></i>
				<span>购物车</span>
			</li>
			<li :class="{'active': $route.name == 'User'}" @click="goUser">
				<i class="iconfont icon-my"></i>
				<span>我的</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		created () {
			
		},
		methods: {
			goHome () {
				this.$router.push({name: 'Home'});
			},
			goCategories () {
				this.$router.push({name: 'Categories'});
			},
			goCart () {
				this.$router.push({name: 'Cart'});
			},
			goUser () {
				this.$router.push({name: 'User'});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../static/scss/public.scss';
    .footer{
        box-sizing: border-box;
        border-top: 1px solid #D3D3D3;
        width: 100%;
        height: 50px;
        &>ul{
            width: 100%;
            height: 100%;
            @include flex(row,space-around);
            &>li{
                width: 25%;
                height: inherit;
                @include flex(column,center);
                &.active{
                	&>i{
                    	color: #e60012;
	                }
	                &>span{
	                    color: #e60012;
	                }
                }
                &>i{
                    font-size: 22px;
                }
                &>span{
                    font-size: 12px;
                }
            }
        }
    }
</style>