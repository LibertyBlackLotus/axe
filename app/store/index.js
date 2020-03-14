import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import userFriend from './modules/user_friend';
import ax from './modules/ax';
import axRead from './modules/ax_read';
import axCollection from './modules/ax_collection';
import axPraise from './modules/ax_praise';
import comment from './modules/comment';
import search from './modules/search';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user,
		ax,
		axRead,
		userFriend,
		axCollection,
		axPraise,
		comment,
		search
	}
})