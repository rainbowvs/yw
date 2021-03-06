﻿import Vue from 'vue';
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
	userInfo: window.sessionStorage['userInfo'] ? JSON.parse(window.sessionStorage['userInfo']) : {},//用户信息
	AddressBackName: '',//收货地址管理页面返回页面名字
	OrderConfirmBackName: '',//订单确认页面返回页面名字
	shopCart: window.localStorage['shopCart'] ? JSON.parse(window.localStorage['shopCart']) : [],//购物车
	buy: [],//立即购买
	fromCart: true,//从购物车拿商品
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
	SET_USERINFO (state,obj) {
		state['userInfo'] = obj['userInfo'];
		window.sessionStorage.setItem('userInfo',JSON.stringify(state.userInfo));
	},
	DEL_USERINFO (state,obj) {
		state['userInfo'] = {};
		window.sessionStorage.setItem('userInfo',JSON.stringify(state.userInfo));
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
					if(state.shopCart[i]['size']!='' && obj['size']!='' && state.shopCart[i]['size'] == obj['size']){
						flag = true;
						state.shopCart[i]['amount'] += obj['amount'];
						break;
					}else if(state.shopCart[i]['length']!='' && obj['length']!='' && state.shopCart[i]['length'] == obj['length']){
						flag = true;
						state.shopCart[i]['amount'] += obj['amount'];
						break;
					}else if(state.shopCart[i]['size']=='' && state.shopCart[i]['length']=='' && obj['size']=='' && obj['length']==''){
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
	EMPTY_SHOPCART (state,obj) {
		//清空购物车
		state.shopCart = [];
		window.localStorage.setItem('shopCart',JSON.stringify(state.shopCart));
	},
	SET_BUY (state,obj) {
		//存放立即购买的商品信息
		state.buy = [obj];
	},
	EMPTY_BUY (state,obj) {
		//清空立即购买的商品信息
		state.buy = [];
	},
	SET_FROMCART (state,bool) {
		//设置是否从购物车拿商品
		state.fromCart = bool;
	},
};
const getters = {
	sum : state => {
		let totalPrice = 0;
		if(state.fromCart){
			state.shopCart.forEach((item) => {
			    if(item.isChecked)
			        totalPrice += item.price * item.amount;
			});
		}else{
			state.buy.forEach((item) => {
			    if(item.isChecked)
			        totalPrice += item.price * item.amount;
			});
		}
        return totalPrice.toFixed(2);
	},
};

export default new Vuex.Store({
	state,
	mutations,
	getters,
});
