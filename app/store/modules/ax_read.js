import Request from '../../js_sdk/luch-request/request';
import {
	AX_READ,
	AX_READ_LIST,
	AX_READ_LIST_STATUS,
} from '../mutations_type';

import {
	API_AX_READ
} from '../api_url';

const http = new Request();
const state = {
	axReadList: [],     //阅读记录列表
	axReadListUser: [], //用户阅读记录列表
	status: false,
};

const getters = {
	
};

const mutations = {
	//所有阅读记录列表
	[AX_READ_LIST](state, {list}){
		state.axReadList = list;
	},
	
	//单个用户所有阅读记录列表
	[AX_READ](state, {list}){
		state.axReadListUser = list;
	},

	//设置获取状态
	[AX_READ_LIST_STATUS](state, {status}){
		state.status = status;
	},
	
};

const actions = {
	//创建阅读记录
	createAxRead({commit}, params){
		commit(AX_READ_LIST_STATUS, {status: false});
		http.post(API_AX_READ, params)
			.then((res) => {
				commit(AX_READ_LIST_STATUS, {status: true});
			});
	},
	
	//获取所有斧头列表
	getAxReadList({commit}){
		commit(AX_READ_LIST_STATUS, {status: false});
		http.get(API_AX_READ)
			.then((res) => {
				commit(AX_READ_LIST, {list:　res.data.data});
				commit(AX_READ_LIST_STATUS, {status: true});
			});
	},
	
	//获取单个用户阅读记录列表
	getUserAxReadList({commit}, {user}){
		http.get(API_AX_READ + `/user/${user}`)
			.then((res) => {
				commit(AX_READ, {list:　res.data.data});
			});
	}
	
};

export default{
	state,
	getters,
	mutations,
	actions
}