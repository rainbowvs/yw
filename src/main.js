// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/vuex/store'
import ajax from '../static/js/ajax.js'
import Loading from '@/components/module/Loading/Loading'
import Toast from '@/components/module/Toast/Toast'
import Dialog from '@/components/module/Dialog/Dialog'

//全局赋值ajax
Vue.prototype.$ajax = ajax;

Vue.component('my-loading',Loading);
Vue.component('my-toast',Toast);
Vue.component('my-dialog',Dialog);

Vue.config.productionTip = false

window.reqUrl = 'http://192.168.1.101:8082/interface/';

//[全局]进入前触发,必须设置在实例之前
router.beforeEach((to, from, next) => {
	store.commit('SHOW_LOADING');
	store.commit('HIDE_TOAST');
	if(to.meta.requireProp){
		let userInfo = window.localStorage.getItem('userInfo');
		if(userInfo){
			if(userInfo['token'] == ''){
				store.commit('HIDE_LOADING');//因为这里是中断当前路由跳转[还没触发afterEach钩子],再进行第二次路由跳转,所以要手动触发afterEach钩子
				next({name: 'Login'});
			}else{
				next();
			}
		}else{
			store.commit('HIDE_LOADING');
			next({name: 'Login'});
		}
	}else{
		next(); // 确保一定要调用 next()
	}
});
//[全局]进入后触发
router.afterEach((to, from) => {
	store.commit('HIDE_LOADING');
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
