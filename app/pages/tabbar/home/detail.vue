<template>
	<view>  		 
		<NAUIcard :listData="axDetail"></NAUIcard>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'; 
import NAUIcard from '@/components/NAUI-card/NAUI-card.vue'
export default { 
	components: { 
		NAUIcard
	},

	computed: {
		...mapState({
			axDetail: state => state.ax.axDetail, //斧头详情
			axListStatus: state => state.ax.axListStatus //获取状态
		})
	},

	onLoad(obj) {
		console.log(' onload --->', obj ); 
		let {id} = obj;
		this.getAxDetail({id});
	},

	watch: {
		axListStatus: function(newAxListStatus, oldAxListStatus) {
			if (newAxListStatus) {
				uni.stopPullDownRefresh();
			}
		}
	},

	methods: {
		...mapActions(['getAxDetail']),
  
	}
};
</script>

<style> 
</style>
