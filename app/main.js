import Vue from 'vue'
import App from './App'
import store from './store'; 
import hxNavbar from "./components/hx-navbar/hx-navbar.vue";
import cuCustom from './colorui/components/cu-custom.vue';
import Request from './js_sdk/luch-request/request';

Vue.component('cu-custom', cuCustom);
Vue.component('hx-navbar',hxNavbar);
Vue.config.productionTip = false;
const http = new Request();
Vue.prototype.$http = http;

// import './filters';
// Vue.filter('dateFormat', function (dateStr) {
// 	console.log('---filter--->', dateStr);
// 	console.log('---filter--after->', new Date(dateStr).format('YYYY-MM-DD HH:mm:ss'));
// 	return new Date(dateStr).format('YYYY-MM-DD HH:mm:ss');
// });

// 发送请求前的配置
http.interceptor.request((config, cancel) => {
	const token = uni.getStorageSync('myToken');
	console.log('before request---token---> ', token );
	if(token){
		http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局设定header的token验证，注意Bearer后有个空格
	}else { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		cancel('token 不存在', config) //  把修改后的config传入，之后响应就可以拿到修改后的config。 如果调用了cancel但是不传修改后的config，则catch((err) => {}) err.config 为request拦截器修改之前的config
	}
	return config;
});

// 响应拦截器，统一处理响应
http.interceptor.response(res => {
	if (res.status == '200') {
		return Promise.resolve(res);
	}else{
		return Promise.reject(res);
	}
}, (error) => {
	if (error.response && error.response.status) {
		switch (error.response.status) {
			// 401: 未登录
			// 未登录则跳转登录页面，并携带当前页面的路径
			// 在登录成功后返回当前页面，这一步需要在登录页操作。
			case 401:
				Message.info('请登录！');
				router.replace({
					path: '/login'
				});
				break;

			// 403 token过期
			// 登录过期对用户进行提示
			// 清除本地token
			// 跳转登录页面
			case 403:
				// Toast({
				// 	message: '登录过期，请重新登录',
				// 	duration: 1000,
				// 	forbidClick: true
				// });
				// 清除token
				uni.setStorageSync('myToken', null);
				// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
				setTimeout(() => {
					uni.reLaunch({
						path: '/pages/login/login'
					})
				}, 500);
				break;

			// 404请求不存在
			case 404:
				// Toast({
				// 	message: '网络请求不存在',
				// 	duration: 1500,
				// 	forbidClick: true
				// });
				break;
			// 其他错误，直接抛出错误提示
			default:
			// Toast({
			// 	message: error.response.data.message,
			// 	duration: 1500,
			// 	forbidClick: true
			// });
		}
	}
	return Promise.reject(error.response);
});

App.mpType = 'app';

const app = new Vue({
	store,
	...App
})
app.$mount()
