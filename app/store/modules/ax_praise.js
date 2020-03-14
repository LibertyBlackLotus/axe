import Request from '../../js_sdk/luch-request/request';
import {
	AX_PRAISE,
	AX_PRAISE_STATUS,
} from '../mutations_type';

import {
	API_AX_PRAISE,
	API_AX_ISPRAISE
} from '../api_url';

const http = new Request();
const state = {
	status: false,
	isPraise: false,
};

const getters = {
	
};

const mutations = {

	//设置获取状态
	[AX_PRAISE_STATUS](state, {status}){
		state.status = status;
	},

	//是否点了赞
	[AX_PRAISE](state, {status}){
		state.isPraise = status;
	},
	
};

const actions = {
	//点赞
	thumbs({commit}, params){
		return http.post(API_AX_PRAISE, params)
			.then((res) => {
				commit(AX_PRAISE, {status: true});
				return Promise.resolve(res.data.data);
			});
	},

	//取消点赞
	removeThumbs({commit}, params){
		return http.delete(API_AX_PRAISE, params)
			.then((res) => {
				commit(AX_PRAISE, {status: false});
				return Promise.resolve(res.data.data);
			});
	},

	//判断是否点赞了
	isPraised({commit}, params){
		http.post(API_AX_ISPRAISE, params)
			.then((res) => {
				commit(AX_PRAISE, {status: res.data.data});
			});
	},

	
};

export default{
	state,
	getters,
	mutations,
	actions
}