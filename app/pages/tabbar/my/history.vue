<template>
	<view>
		<view class="content" v-if="axReadListUser.length == 0">
			暂无记录
		</view>
		<view v-if="axReadListUser.length > 0">
			<NAUIcard v-for="item in axReadListUser"
					  :key="item._id"
					  :listData="item">
			</NAUIcard>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import {getUserId} from '../../../utils/common';
	import NAUIcard from '@/components/NAUI-card/NAUI-card.vue';
	export default {
		data() {
			return {

			}
		},

		components: {
			NAUIcard
		},

		computed: {
			...mapState({
				axReadListUser: state => state.axRead.axReadListUser,  //用户浏览记录列表
			})
		},

		onLoad() {
			this.getUserAxReadList({user: getUserId()});
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
		height: 400upx;
		margin-top: 200upx;
	}
</style>
