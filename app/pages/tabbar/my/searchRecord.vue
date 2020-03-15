<template>
	<view>
		<view class="content" v-if="search.length == 0">
			暂无记录
		</view>
		<view v-if="search.length > 0">
			<uni-list>
				<uni-list-item v-for="item in search"
							   :key="item._id"
							   :show-arrow="false"
							   :title="item.keywords"
							   :note="item.create_time | formatTime"
							   @click="toSearch(item.keywords)">
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import {getUserId, formatDate} from '../../../utils/common';
	import uniList from "@/components/uni-list/uni-list.vue";
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
	export default {
		components: {
			uniList,
			uniListItem
		},

		computed: {
			...mapState({
				search: state => state.search.search,  //用户搜索记录列表
			})
		},

		onShow() {
			this.getSearchRecordList({user: getUserId()});
		},

		filters: {
			formatTime(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},

		methods: {
			...mapActions([
				'getSearchRecordList',   //获取用户搜索记录列表
			]),

			toSearch(keywords){
				console.log('--toSearch-->', keywords );
				uni.redirectTo({
					url:  '/pages/tabbar/home/searchResult?keywords=' + keywords,
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
