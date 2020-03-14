import Request from '../../js_sdk/luch-request/request';

import {
	COMMENT
} from '../mutations_type';

import {
	API_COMMENT
} from '../api_url';

const http = new Request();

const state = {
	comment: [], //评论列表
};

const getters = {};

const mutations = {
	//设置获取状态
	[COMMENT](state, {list}){
		state.comment = list;
	}
};

const actions = {
	//添加评论
	addComment({commit}, params){
		http.post(API_COMMENT, params)
			.then((res) => {
				commit(COMMENT, {list:　res.data.data});
			});
	},

	//删除评论
	deleteComment({commit}, {id}){
		http.delete(API_COMMENT + `/${id}`)
			.then((res) => {
				commit(COMMENT, {list:　res.data.data});
			});
	},

	//获取评论列表
	getCommentList({commit}, {ax}){
		http.get(API_COMMENT + `/${ax}`)
			.then((res) => {
				commit(COMMENT, {list:　res.data.data});
			});
	}
};

export default{
	state,
	getters,
	mutations,
	actions
}