<template>
  <div id="app">
	  <transition :name="transitionName">
		  <router-view class="child-view" />
	  </transition>
		<my-loading></my-loading>
		<my-toast></my-toast>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
  	//隐藏初始化加载动画
		let initLoading = document.getElementsByClassName('initLoading')[0];
		document.body.removeChild(initLoading);
  },
  data () {
    return {
    	transitionName: 'current', //绑定在组件上面的动效class
    }
	},
	watch: {
    '$route' (to, from){
	    const toDepth = to.path.split('/').length;
	    const fromDepth = from.path.split('/').length;
    	if(from.name == null)
    		this.transitionName = 'current';
    	else
    		this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
	}
}
</script>

<style lang="scss" scoped>
	#app{
	  width: 100%;
	  height: 100%;
		&>.child-view{
			overflow: hidden;
	    position: absolute;
			width: 100%;
			will-change: transform;
			&.slide-left-enter {
		    transform: translate3d(100%, 0, 0);
		  }
		  &.slide-left-enter-active {
		    animation: slide-left-enter .3s cubic-bezier(0.4,0.6,0.2,1) .01s 1 normal;
		  }
		  &.slide-left-leave-active {
		    animation: slide-left-leave .3s cubic-bezier(0.4,0.6,0.2,1) .01s 1 normal;
		  }
		  
		  &.slide-right-enter {
		    transform: translate3d(-100%, 0, 0);
		  }
		  &.slide-right-enter-active {
		    animation: slide-right-enter .3s cubic-bezier(0.4,0.6,0.2,1) .01s 1 normal;
		  }
		  &.slide-right-leave-active {
		    animation: slide-right-leave .3s cubic-bezier(0.4,0.6,0.2,1) .01s 1 normal;
		  }
		}
	}
	@keyframes slide-left-enter {
	  0% {
	    transform: translate3d(100%, 0, 0);
	  }
	  100% {
	    transform: translate3d(0, 0, 0);
	  }
	}
	@keyframes slide-left-leave {
	  0% {
	    transform: translate3d(0, 0, 0);
	  }
	  100% {
	    transform: translate3d(-100%, 0, 0);
	  }
	}
	@keyframes slide-right-enter {
	  0% {
	    transform: translate3d(-100%, 0, 0);
	  }
	  100% {
	    transform: translate3d(0, 0, 0);
	  }
	}
	@keyframes slide-right-leave {
	  0% {
	    transform: translate3d(0, 0, 0);
	  }
	  100% {
	    transform: translate3d(100%, 0, 0);
	  }
	}

</style>
