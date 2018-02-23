import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
//	key: 'b81add887efb4a838d2e7989ab395e2f',//用户key,开发环境
	key: '',//生产环境
	loadingObj: {
		//loading组件对象
		show: false,
		count: 0,
	},
	toastObj: {
		//toast组件对象
		show: false,
		text: '',
	},
	timer: null,//计时器
};

const mutations = {
	SET_KEY (state,obj) {
		//设置key值
		state.key = obj.key;
	},
	UPDATE_PHOTOOBJ (state,obj) {
		//更新cordova拍照/相册返回图片对象
		state.photoObj = obj;
	},
	SHOW_LOADING (state) {
		//显示loading组件
		state.loadingObj['count']++;
		state.loadingObj['show'] = true;
	},
	HIDE_LOADING (state) {
		//隐藏loading组件
		state.loadingObj['count']--;
		if(state.loadingObj['count'] <= 0)
			state.loadingObj['show'] = false;
	},
	SHOW_TOAST (state,obj) {
		//显示toast组件
		clearTimeout(state.timer);
		state.toastObj['show'] = true;
		state.toastObj['text'] = obj.text;
		state.timer = setTimeout(() => {
			state.toastObj['show'] = false;
		},3000);
	},
	HIDE_TOAST (state,obj) {
		//隐藏toast组件
		clearTimeout(state.timer);
		state.toastObj['show'] = false;
	},
};

export default new Vuex.Store({
	state,
	mutations
});
