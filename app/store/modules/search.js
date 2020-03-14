import Request from '../../js_sdk/luch-request/request';

import {
	SEARCH
} from '../mutations_type';

import {
	API_SEARCH
} from '../api_url';

const http = new Request();
const state = {
	search: [], //搜索记录列表
};

const getters = {};

const mutations = {
	//设置获取状态
	[SEARCH](state, {list}){
		state.search = list;
	}
};

const actions = {
	//添加搜索记录
	addSearchRecord({commit}, params){
		http.post(API_SEARCH, params)
			.then((res) => {
				commit(SEARCH, {list:　res.data.data});
			});
	},

	//删除搜索记录
	deleteSearchRecord({commit}, {id}){
		http.delete(API_SEARCH + `/${id}`)
			.then((res) => {
				commit(SEARCH, {list:　res.data.data});
			});
	},

	//获取搜索记录列表
	getSearchRecordList({commit}, {user}){
		http.get(API_SEARCH + `/user/${user}`)
			.then((res) => {
				commit(SEARCH, {list:　res.data.data});
			});
	}
};

export default{
	state,
	getters,
	mutations,
	actions
}