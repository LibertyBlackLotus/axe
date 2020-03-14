<template>
	<view>
		<NAUIcard v-for="item in axFocusList"
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
		data() {
			return {

			};
		},

		components: {
			NAUIcard
		},

		computed: {
			...mapState({
				axFocusList: state => state.ax.axFocusList, //斧头列表
				axListStatus: state => state.ax.axListStatus //获取状态
			})
		},

		onLoad() {

		},

		onShow(){
			this.getUserFocusAxList({user: getUserId()});
		},

		watch: {
			axListStatus: function(newAxListStatus, oldAxListStatus) {
				if (newAxListStatus) {
					uni.stopPullDownRefresh();
				}
			}
		},

		onNavigationBarSearchInputConfirmed(obj){
			uni.navigateTo({
				url: '/pages/tabbar/home/searchResult?keywords=' + obj.text,
				animationType: 'pop-in',
				animationDuration: 200
			});
		},

		methods: {
			...mapActions([
				'getUserFocusAxList'
			]),

			onPullDownRefresh() {
				this.getUserFocusAxList({user: getUserId()});
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
