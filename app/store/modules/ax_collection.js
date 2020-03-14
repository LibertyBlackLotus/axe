import Request from '../../js_sdk/luch-request/request';
import {
	AX_COLLECTION,
	AX_ISCOLLECTION,
	AX_COLLECTION_STATUS,
} from '../mutations_type';

import {
	API_AX_COLLECTION,
	API_AX_ISCOLLECTION
} from '../api_url';

const http = new Request();
const state = {
	axCollectionListUser: [], //用户收藏列表
	status: false,
	collected: false
};

const getters = {
	
};

const mutations = {
	//用户收藏列表
	[AX_COLLECTION](state, {list}){
		state.axCollectionListUser = list;
	},

	//设置获取状态
	[AX_COLLECTION_STATUS](state, {status}){
		state.status = status;
	},

	//设置获取状态
	[AX_ISCOLLECTION](state, {status}){
		state.collected = status;
	}
};

const actions = {
	//创建收藏
	createAxCollection({commit}, params){
		http.post(API_AX_COLLECTION, params)
			.then((res) => {
				commit(AX_ISCOLLECTION, {status: true});
			});
	},

	//取消收藏
	removeCollection({commit}, params){
		http.delete(API_AX_COLLECTION, params)
			.then((res) => {
				commit(AX_ISCOLLECTION, {status: false});
			});
	},

	//是否收藏
	isCollected({commit}, params){
		http.post(API_AX_ISCOLLECTION, params)
			.then((res) => {
				commit(AX_ISCOLLECTION, {status: res.data.data});
			});
	},

	//获取用户收藏列表
	getUserCollectionList({commit}, {user}){
		commit(AX_COLLECTION_STATUS, {status: false});
		http.get(API_AX_COLLECTION + `/user/${user}`)
			.then((res) => {
				commit(AX_COLLECTION, {list:　res.data.data});
				commit(AX_COLLECTION_STATUS, {status: false});
			});
	}
};

export default{
	state,
	getters,
	mutations,
	actions
}