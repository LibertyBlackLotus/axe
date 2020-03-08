import Vue from 'vue'
import App from './App'
import store from './store';
import hxNavbar from "./components/hx-navbar/hx-navbar.vue";
import cuCustom from './colorui/components/cu-custom.vue'

Vue.component('cu-custom', cuCustom)
Vue.component('hx-navbar',hxNavbar);
Vue.config.productionTip = false;

// import './filters'; 
Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
	return new Date(dateStr).format('YYYY-MM-DD HH:mm:ss');
});

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
