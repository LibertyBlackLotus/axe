<template>
	<view>
		<!--<ms-tabs :list="list" v-model="active">-->
			<!--<template v-slot:title="{title}">-->
				<!--<card v-for="item in axList"-->
					<!--:key="item._id"-->
					<!--:listData="item">-->
				<!--</card>-->
			<!--</template>-->
		<!--</ms-tabs>-->

		<card v-for="item in axList"
			  :key="item._id"
			  :listData="item">
		</card>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
//import sTabs from '@/components/s-tabs';
//import sTab from '@/components/s-tab';
import msTabs from '@/components/ms-tabs/ms-tabs';
import card from './card.vue';

export default {
	data() {
		return {
			list: [{
				title: 'test1'
			}, {
				title: 'test2'
			}],
			active: 0
		};
	},

	components: {
		msTabs,
		card
	},

	watch:{
		active() {
			console.log(this.active)
		}
	},

	computed: {
		...mapState({
			axList: state => state.ax.axList,             //斧头列表
			axListStatus: state => state.ax.axListStatus  //获取状态
		})
	},

	onLoad() {
		this.getAxList();   //获取斧头列表
		this.checkLogin();  //检测登录状态
	},

	watch: {
		axListStatus: function(newAxListStatus, oldAxListStatus) {
			if (newAxListStatus) {
				uni.stopPullDownRefresh();
			}
		}
	},

	onPullDownRefresh() {
		this.getAxList();   //获取斧头列表
	},

	onNavigationBarSearchInputConfirmed(obj){
		uni.navigateTo({
			url: './searchResult?keywords=' + obj.text,
			animationType: 'pop-in',
			animationDuration: 200
		});
	},

	methods: {
		...mapActions([
			'getAxList'
		]),

		//检测登录状态
		checkLogin() {
			try{
				let user =  uni.getStorageSync('userInfo');
				if(user){
					let token = uni.getStorage({
						key: 'myToken',
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
				}else{
					console.log('on user login-->');
					uni.redirectTo({
						url: '../../login/login'
					});
				}
			}catch(e){
				console.error(e);
			}
		},

		change (index) {
			console.log(index);
		}
	}
};
</script>

<style> 
</style>
