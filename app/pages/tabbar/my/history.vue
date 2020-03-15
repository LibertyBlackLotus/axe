<template>
	<view>
		<view class="content" v-if="axReadListUser.length == 0">
			暂无记录
		</view>
		<view v-if="axReadListUser.length > 0">
			<uni-list>
				<uni-list-item v-for="item in axReadListUser"
							   :key="item._id"
							   :show-arrow="false"
							   :title="item.title"
							   :note="item.create_time | formatTime"
							   @click="toDetail(item.ax)">
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
				axReadListUser: state => state.axRead.axReadListUser,  //用户浏览记录列表
			})
		},

		onShow() {
			this.getUserAxReadList({user: getUserId()});
		},

		filters: {
			formatTime(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},

		methods: {
			...mapActions([
				'getUserAxReadList',   //获取用户浏览记录列表
			]),

			toDetail(id) { 
				uni.redirectTo({
					url: '/pages/tabbar/home/detail?id=' + id,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400rpx;
		margin-top: 200rpx;
	}
</style>
