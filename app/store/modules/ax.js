import {
	AX,
	AX_LIST,
	AX_LIST_USER,
	AX_DETAIL,
	AX_LIST_STATUS,
	AX_CREATE_STATUS
} from '../mutations_type';

import {
	API_AX,
	API_AX_USER
} from '../api_url';

const state = {
	axList: [], //斧头列表
	axListUser: [], //用户斧头列表
	axDetail: {},   //斧头详情
	axListStatus: false,
	axCreateStatus: false,
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
		uni.request({
			url: API_AX,
			method: 'POST',
			data: params,
			sslVerify: false,
			success: (res) => { 
			    commit(AX_CREATE_STATUS, {status: true}); 
			}
		}); 
	},
	
	//获取所有斧头列表
	getAxList({commit}){ 		
		commit(AX_LIST_STATUS, {status: false});
		uni.request({
			url: API_AX,
			method: 'GET', 
			sslVerify: false,
			success: (res) => { 
				commit(AX_LIST, {list:　res.data.data});
				commit(AX_LIST_STATUS, {status: true}); 
			}
		});  
	},
	
	//获取单个用户斧头列表
	getUserAxList({commit}, {author}){ 	 
		commit(AX_LIST_STATUS, {status: false});
		uni.request({
			url: API_AX_USER + author,
			method: 'GET', 
			sslVerify: false,
			success: (res) => { 
				commit(AX_LIST_USER, {list:　res.data.data});
				commit(AX_LIST_STATUS, {status: true}); 
			}
		});  
	},
	
	//获取斧头详情
	getAxDetail({commit}, {id}){ 	 
		// commit(AX_LIST_STATUS, {status: false});
		uni.request({
			url: API_AX + `/${id}`,
			method: 'GET', 
			sslVerify: false,
			success: (res) => { 
				console.log('---getAxDetail--->', res );
				commit(AX_DETAIL, {detail:　res.data.data});
				// commit(AX_LIST_STATUS, {status: true}); 
			}
		});  
	},
	
};

export default{
	state,
	getters,
	mutations,
	actions
}