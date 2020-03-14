<template>
	<view>
		<view class="content" v-if="axSearchList.length == 0">
			无结果
		</view>
		<NAUIcard v-for="item in axSearchList"
				:key="item._id"
		       :listData="item">
		</NAUIcard>  
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'; 
import NAUIcard from '@/components/NAUI-card/NAUI-card.vue';
import {getUserId} from '../../../utils/common';

export default {
	data(){
		return{
			keywords: '' //搜索关键词
		}
	},

	components: { 
		NAUIcard
	},

	computed: {
		...mapState({
			axSearchList: state => state.ax.axSearchList, //搜索结果列表
		})
	},

	onLoad(obj) {
		console.log(' search result onload--->', obj);
		try{
			this.keywords = obj.keywords;
			this.searchAx({keywords: this.keywords});   //搜索斧头
			this.addSearchRecordMethod();               //添加搜索记录
		}catch(e){
			console.error(e);
		}
	},

	methods: {
		...mapActions([
			'searchAx',
			'addSearchRecord'
		]),

		//添加搜索记录
		addSearchRecordMethod(){
			let params = {
				keywords: this.keywords,
				user: getUserId()
			};
			this.addSearchRecord(params);
		}
	}
};
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
