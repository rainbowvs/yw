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
	gradeList: [
		//年级转换数组
		{grade: 1, volume:1, cvolume: 1, cgrade: '一年级上册'},
		{grade: 1, volume:2, cvolume: 2, cgrade: '一年级下册'},
		{grade: 2, volume:1, cvolume: 3,  cgrade: '二年级上册'},
		{grade: 2, volume:2, cvolume: 4,  cgrade: '二年级下册'},
		{grade: 3, volume:1, cvolume: 5,  cgrade: '三年级上册'},
		{grade: 3, volume:2, cvolume: 6,  cgrade: '三年级下册'},
		{grade: 4, volume:1, cvolume: 7,  cgrade: '四年级上册'},
		{grade: 4, volume:2, cvolume: 8,  cgrade: '四年级下册'},
		{grade: 5, volume:1, cvolume: 9,  cgrade: '五年级上册'},
		{grade: 5, volume:2, cvolume: 10,  cgrade: '五年级下册'},
		{grade: 6, volume:1, cvolume: 11,  cgrade: '六年级上册'},
		{grade: 6, volume:2, cvolume: 12,  cgrade: '六年级下册'},
	],
};

const mutations = {
	SET_KEY (state,obj) {
		//设置key值
		state.key = obj.key;
	},
	SET_LOCAL (state,obj) {
		//设置内外网
		state.local = obj.local;
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
