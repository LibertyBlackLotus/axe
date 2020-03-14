import Request from '../../js_sdk/luch-request/request';

import {
	USER,
	USER_CREATE_STATUS
} from '../mutations_type';

import {
	API_USER,
	API_USER_REGISTER,
	API_USER_LOGIN
} from '../api_url';

const http = new Request();

const state = {
	userInfo: {}, //用户信息
	userCreateStatus: false,
	
};

const getters = {
	
};

const mutations = {
	//设置获取状态
	[USER_CREATE_STATUS](state, {status}){
		state.userCreateStatus = status;
	},
	
};

const actions = {
	//注册用户
	registerUser({commit}, params){
		commit(USER_CREATE_STATUS, {status: false});
		return http.post(API_USER_REGISTER, params)
			.then((res) => {
				commit(USER_CREATE_STATUS, {status: false});
				return Promise.resolve(res.data);
			});
	},

	//登录
	login({commit}, params){
		commit(USER_CREATE_STATUS, {status: false});
		return http.post(API_USER_LOGIN, params)
			.then((res) => {
				commit(USER_CREATE_STATUS, {status: false});
				return Promise.resolve(res.data);
			});
	},

};

export default{
	state,
	getters,
	mutations,
	actions
}