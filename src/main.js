// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/vuex/store'
import ajax from '../static/js/ajax.js'
import scroller from '@/components/module/vue-scroller'
import Loading from '@/components/module/Loading/Loading'
import Toast from '@/components/module/Toast/Toast'
import Dialog from '@/components/module/Dialog/Dialog'

//全局赋值ajax
Vue.prototype.$ajax = ajax;

Vue.use(scroller);
Vue.component('my-loading',Loading);
Vue.component('my-toast',Toast);
Vue.component('my-dialog',Dialog);

Vue.config.productionTip = false

window.reqUrl = 'http://192.168.1.101:8082/interface/';
//window.reqUrl = '../interface/';

//[全局]进入前触发,必须设置在实例之前
router.beforeEach((to, from, next) => {
	store.commit('SHOW_LOADING');
	store.commit('HIDE_TOAST');
	if(to.meta.requireProp){
		if(!(store.state.userInfo.hasOwnProperty('token') && store.state.userInfo['token'])){
			store.commit('HIDE_LOADING');//因为这里是中断当前路由跳转[还没触发afterEach钩子],再进行第二次路由跳转,所以要手动触发afterEach钩子
			next({name: 'Login'});
		}else{
			next();
		}
	}else{
		next(); // 确保一定要调用 next()
	}
});
//[全局]进入后触发
router.afterEach((to, from) => {
	store.commit('HIDE_LOADING');
});

/*注释*/
console.groupCollapsed('%c隐藏在角落的发光宝箱','color:gold;');
console.log('%c@author PZJ','font-size:16px;color:deepskyblue');
console.log('%c@version 1.0.0','font-size:16px;');
console.log('%c@date 2018-03-21','font-size:16px;');
console.log('仍有非常多的功能未完善，待续...');
console.groupEnd();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
