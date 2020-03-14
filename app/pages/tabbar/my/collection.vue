<template>
	<view>
		<view class="content" v-if="axCollectionListUser.length == 0">
			暂无收藏
		</view>
		<view v-if="axCollectionListUser.length > 0">
			<NAUIcard v-for="item in axCollectionListUser"
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
				axCollectionListUser: state => state.axCollection.axCollectionListUser,  //用户收藏列表
			})
		},

		onShow() {
			this.getUserCollectionList({user: getUserId()});
		},

		methods: {
			...mapActions([
				'getUserCollectionList',   //获取用户收藏列表
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
