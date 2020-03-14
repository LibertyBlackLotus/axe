import Request from '../../js_sdk/luch-request/request';
import {
	USER_FRIEND,
	USER_FRIEND_FOLLOWED,
	API_USER_FRIEND_STATUS
} from '../mutations_type';

import {
	API_USER_FRIEND
} from '../api_url';

const http = new Request();
const state = {
	userFriendList: [],     //用户好友列表
	status: false,
	followedStatus: false
};

const getters = {
	
};

const mutations = {
	//用户好友列表
	[USER_FRIEND](state, {list}){
		state.userFriendList = list;
	},

	//设置获取状态
	[API_USER_FRIEND_STATUS](state, {status}){
		state.status = status;
	},

	//设置关注状态
	[USER_FRIEND_FOLLOWED](state, {status}){
		state.followedStatus = status;
	},

};

const actions = {
	//关注
	followed({commit}, params){
		commit(API_USER_FRIEND_STATUS, {status: false});
		http.post(API_USER_FRIEND, params)
			.then((res) => {
				commit(API_USER_FRIEND_STATUS, {status: true});
				commit(USER_FRIEND_FOLLOWED, {status: true});
			});
	},

	//取消关注
	removeFollowed({commit}, params){
		http.delete(API_USER_FRIEND, params)
			.then((res) => {
				commit(USER_FRIEND_FOLLOWED, {status: false});
			});
	},
	
	//获取用户关注好友列表
	getFriendList({commit}, {user}){
		commit(API_USER_FRIEND_STATUS, {status: false});
		http.get(API_USER_FRIEND + `/user/${user}`)
			.then((res) => {
				commit(AX_READ_LIST, {list:　res.data.data});
				commit(API_USER_FRIEND_STATUS, {status: true});
			});
	},

	//判断是否关注了好友
	isFollowed({commit}, params){
		http.post(API_USER_FRIEND + '/isFollowed', params)
			.then((res) => {
				commit(USER_FRIEND_FOLLOWED, {status: res.data.data});
			});
	},

};

export default{
	state,
	getters,
	mutations,
	actions
}