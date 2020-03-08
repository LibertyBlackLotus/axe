import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import ax from './modules/ax';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user,
		ax
	}
})