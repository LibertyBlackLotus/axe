<template>
	<view>  		 
		<NAUIcard v-for="item in axList" 
				:key="item._id" 
				  :listData="item"></NAUIcard>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'; 
import NAUIcard from '@/components/NAUI-card/NAUI-card.vue'
export default {
	data() {
		return {};
	},

	components: { 
		NAUIcard
	},

	computed: {
		...mapState({
			axList: state => state.ax.axList, //斧头列表
			axListStatus: state => state.ax.axListStatus //获取状态
		})
	},

	onLoad() {
		this.checkLogin();
		this.getAxList();
	},

	watch: {
		axListStatus: function(newAxListStatus, oldAxListStatus) {
			if (newAxListStatus) {
				uni.stopPullDownRefresh();
			}
		}
	},

	methods: {
		...mapActions(['getAxList']),

		onPullDownRefresh() { 
			this.getAxList();
		},

		checkLogin() {
			console.log(' home checkLogin--->');
			let token = uni.getStorage({
				key: 'token',
				success: res => {
					console.log('home check token--->', res);
				},
				fail: err => {
					console.log('home check err-->', err);
					uni.redirectTo({
						url: '../../login/login'
					});
				}
			});
		}, 
	}
};
</script>

<style> 
</style>
