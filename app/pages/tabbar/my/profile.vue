<template>
	<view>
		<uni-list>
			<uni-list-item title="头像"
						   :show-extra-icon="true"
						   :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}">
			</uni-list-item>
			<uni-list-item title="用户名"
						   :show-extra-icon="true"
						   :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}" >
			</uni-list-item>
			<uni-list-item title="性别"
						   :show-extra-icon="true"
						   :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}" >
			</uni-list-item>
			<uni-list-item title="生日"
						   :show-extra-icon="true"
						   :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}" >
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import {getUserId} from '../../../utils/common';
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		data() {
			return {

			}
		},

		components: {
			uniList,
			uniListItem
		},

		computed: {
			...mapState({
				axReadListUser: state => state.axRead.axReadListUser,  //用户浏览记录列表
			})
		},

		onLoad() {
//			this.getUserAxReadList({user: getUserId()});
		},

		methods: {
			...mapActions([
				'getUserAxReadList',   //获取用户浏览记录列表
			]),
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
