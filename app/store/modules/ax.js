import Request from '../../js_sdk/luch-request/request';
import {
	AX,
	AX_LIST,
	AX_LIST_USER,
	AX_LIST_USER_FOCUS,
	AX_DETAIL,
	AX_LIST_STATUS,
	AX_CREATE_STATUS,
	AX_SEARCH
} from '../mutations_type';

import {
	API_AX,
	API_AX_USER,
	API_AX_USER_FOCUS,
	API_AX_SEARCH
} from '../api_url';

const http = new Request();
const state = {
	axList: [], //斧头列表
	axListUser: [], //用户斧头列表
	axFocusList: [], //关注的用户斧头列表
	axDetail: {},   //斧头详情
	axListStatus: false,
	axCreateStatus: false,
	axSearchList: []  //搜索结果
};

const getters = {
	
};

const mutations = {
	//设置斧头列表
	[AX_LIST](state, {list}){
		state.axList = list; 
	},
	
	//设置斧头列表
	[AX_LIST_USER](state, {list}){
		state.axListUser = list; 
	},

	//搜索斧头结果列表
	[AX_SEARCH](state, {list}){
		state.axSearchList = list;
	},

	//设置关注的用户斧头列表
	[AX_LIST_USER_FOCUS](state, {list}){
		state.axFocusList = list;
	},

	//设置斧头详情
	[AX_DETAIL](state, {detail}){
		state.axDetail = detail; 
	},
	
	//设置获取状态
	[AX_LIST_STATUS](state, {status}){ 
		state.axListStatus = status;
	},
	
	//设置创建状态
	[AX_CREATE_STATUS](state, {status}){ 
		state.axCreateStatus = status;
	}
};

const actions = {
	//创建斧头
	createAx({commit}, params){ 
		commit(AX_CREATE_STATUS, {status: false});
		http.post(API_AX, params)
			.then((res) => {
				commit(AX_CREATE_STATUS, {status: true});
			});
	},
	
	//获取所有斧头列表
	getAxList({commit}){
		commit(AX_LIST_STATUS, {status: false});
		http.get(API_AX)
			.then((res) => {
				commit(AX_LIST, {list:　res.data.data});
				commit(AX_LIST_STATUS, {status: true});
			});
	},
	
	//获取单个用户斧头列表
	getUserAxList({commit}, {author}){ 	 
		commit(AX_LIST_STATUS, {status: false});
		http.get(API_AX_USER + author)
			.then((res) => {
				commit(AX_LIST_USER, {list:　res.data.data});
				commit(AX_LIST_STATUS, {status: true});
			});
	},
	
	//获取斧头详情
	getAxDetail({commit}, {id}){
		return http.get(API_AX + `/${id}`)
			.then((res) => {
				commit(AX_DETAIL, {detail:　res.data.data});
				return Promise.resolve(res.data.data);
			});
	},

	//获取单个关注的用户斧头列表
	getUserFocusAxList({commit}, {user}){
		commit(AX_LIST_STATUS, {status: false});
		http.get(API_AX_USER_FOCUS + user)
			.then((res) => {
				commit(AX_LIST_USER_FOCUS, {list:　res.data.data});
				commit(AX_LIST_STATUS, {status: true});
			});
	},

	//搜索斧头
	searchAx({commit}, {keywords}){
		http.post(API_AX_SEARCH, {keywords})
			.then((res) => {
				commit(AX_SEARCH, {list:　res.data.data});
			});
	},
	
};

export default{
	state,
	getters,
	mutations,
	actions
}