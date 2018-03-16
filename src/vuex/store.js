import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
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
	userInfo: JSON.parse(window.localStorage.getItem('userInfo')),//用户信息
	AddressBackName: '',//收货地址管理页面返回页面名字
	OrderConfirmBackName: '',//订单确认页面返回页面名字
	shopCart: window.localStorage['shopCart'] ? JSON.parse(window.localStorage['shopCart']) : [],
};

const mutations = {
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
	SET_ADDRESSBACKNAME (state,obj) {
		//设定收货地址返回
		state.AddressBackName = obj.name;
	},
	SET_ORDERCONFIRMBACKNAME (state,obj) {
		//设定订单确认返回
		state.OrderConfirmBackName = obj.name;
	},
	ADD_SHOPCART (state,obj) {
		//购物车增加商品
		if(state.shopCart.length == 0)
			state.shopCart.push(obj);
		else{
			let flag = false;
			for(let i=0,len=state.shopCart.length;i<len;i++){
				if(state.shopCart[i]['id'] == obj['id']){
					if(state.shopCart[i]['size'] == obj['size']){
						flag = true;
						state.shopCart[i]['amount'] += obj['amount'];
						break;
					}
				}
				if((!flag) && (i==len-1))
					state.shopCart.push(obj);
			}
		}

		state.shopCart.sort((a,b) => {
			return a['id'] - b['id'];
		});
		
		window.localStorage.setItem('shopCart',JSON.stringify(state.shopCart));
	},
	DELETE_SHOPCART (state,obj) {
		//购物车删除商品
		state.shopCart.splice(obj.index,1);
		window.localStorage.setItem('shopCart',JSON.stringify(state.shopCart));
	},
	UPDATE_SHOPCART (state,obj) {
		//购物车更新商品
		state.shopCart.forEach((v,i) => {
			if(i == obj.index)
				for(let key in obj)
					v['key'] = obj['key'];
		});
		window.localStorage.setItem('shopCart',JSON.stringify(state.shopCart));
	},
};
const getters = {
	sum : state => {
		let totalPrice = 0;
        state.shopCart.forEach((item) => {
            if(item.isChecked)
                totalPrice += item.price * item.amount
        });
        return totalPrice;
	},
};

export default new Vuex.Store({
	state,
	mutations,
	getters,
});
