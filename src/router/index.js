import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

//路由懒加载,webpack2官网推荐使用, 属于es7范畴, 需要配合babel的syntax-dynamic-import插件使用(当前项目vue-cli版本已包含)
const router = new Router({
  routes: [
	  {
	    path: '/',
	    component: () => import('@/components/page/Index/Index.vue'),
	    children: [
	    	{
	    		path: '',
	    		name: 'Home',
	    		component: () => import('@/components/page/Home/Home.vue'),
	    	},
	    	{
	    		path: 'categories',
	    		name: 'Categories',
	    		component: () => import('@/components/page/Categories/Categories.vue'),
	    	},
	    	{
	    		path: 'cart',
	    		name: 'Cart',
	    		component: () => import('@/components/page/Cart/Cart.vue'),
	    	},
	    	{
	    		path: 'user',
	    		name: 'User',
	    		component: () => import('@/components/page/User/User.vue'),
	    		meta: {
			    	requireProp: true,//需要对跳转进行验证,详情在main.js
			    },
	    	}
	    ],
	  },
	  {
	  	path: '/app/shopdetail',
	  	name: 'ShopDetail',
	  	component: () => import('@/components/page/ShopDetail/ShopDetail.vue'),
	  },
	  {
	  	path: '/app/order',
	  	name: 'Order',
	  	component: () => import('@/components/page/Order/Order.vue'),
	  },
	  {
	  	path: '/app/orderconfirm',
	  	name: 'OrderConfirm',
	  	component: () => import('@/components/page/OrderConfirm/OrderConfirm.vue'),
	  },
	  {
	  	path: '/app/order/orderdetail',
	  	name: 'OrderDetail',
	  	component: () => import('@/components/page/OrderDetail/OrderDetail.vue'),
	  },
	  {
	  	path: '/app/orderconfirm/address',
	  	name: 'Address',
	  	component: () => import('@/components/page/Address/Address.vue'),
	  },
	  {
	  	path: '/app/orderconfirm/address/addressedit',
	  	name: 'AddressEdit',
	  	component: () => import('@/components/page/AddressEdit/AddressEdit.vue'),
	  },
	  {
	  	path: '/app/orderconfirm/address/addressadd',
	  	name: 'AddressAdd',
	  	component: () => import('@/components/page/AddressAdd/AddressAdd.vue'),
	  },
	  {
	  	path: '/app/login',
	  	name: 'Login',
	  	component: () => import('@/components/page/Login/Login.vue'),
	  },
    {
      path: '/app/login/register',
      name: 'Register',
      component: () => import('@/components/page/Register/Register.vue'),
    },
  ]
});

export default router;