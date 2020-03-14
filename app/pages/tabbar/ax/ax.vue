<template>
	<view>   
		<waterfall-flow :list="axListUser" @click="choose"></waterfall-flow>
		<view class="createButton" v-if="isShow">
			<button type="primary" @click="createAx" >创建斧头</button>
		</view>		
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';  
import WaterfallFlow from '@/components/nairenk-waterfall-flow/nairenk-waterfall-flow.vue'; 
import {getUserId} from '../../../utils/common';
export default {
	data() {
		return { 
			isShow: true,  //创建按钮是否显示
			timeout: null,
		};
	},
	
	components: { 
		WaterfallFlow
	},

	computed: {
		...mapState({
			axListUser: state => state.ax.axListUser,   //用户斧头列表
			axListStatus: state => state.ax.axListStatus //获取状态
		})
	},

	onLoad() { 
//		this.getUserAxList({author: getUserId()});	//获取用户斧头列表
	},
	
	onShow(){
		console.log('--onShow---id--->',  getUserId() );
		this.getUserAxList({author: getUserId()});
	},
	
	onPageScroll(e){
		console.log('---onPageScroll->', e);
		this.isShow = false; 
		// let that = this;  
		// if(that.scroll > e.scrollTop){  
		// 	console.log("向上滚动");  
		// }else{  
		// 	console.log("向下滚动");   
		// }  
		// that.scroll = e.scrollTop;  
		
		let _this = this;
		if(this.timeout){
			clearTimeout(this.timeout);
		};
		this.timeout = setTimeout(() => {
			_this.isShow = true;
		}, 500);
		
		
	},
	
	 watch: { 
	    axListStatus: function (newAxListStatus, oldAxListStatus) { 
	       if(newAxListStatus){
				uni.stopPullDownRefresh();
	       }
	    }
	  },

	onPullDownRefresh() {
		this.getUserAxList({author: getUserId()});
	},

	methods: {
		...mapActions([
			'getUserAxList'
		]),
		
		//点击一条斧头
		choose(){
			
		},
		
		//去创建斧头
		createAx(){
			uni.navigateTo({
				url: './add'
			});
		}
	}
};
</script>

<style lang="scss" scoped> 
	.createButton{
		position: fixed;
		bottom: 10rpx;
		right: 10rpx;
		display: flex;
		justify-content: center;
	}
	.createButton button{
		flex: auto;
	} 
</style>
