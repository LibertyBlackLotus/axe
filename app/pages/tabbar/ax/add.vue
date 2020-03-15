<template>
	<view class="axContent">
		<sunui-upimg :url="uploadUrl"
					 @set-aximg="setAxImg"
					 :header="header">
		</sunui-upimg>
		<view>
			<view class="axTitle"><input class="uni-input" v-model="title" placeholder="添加标题" /></view>
			<view class="axDesc"><textarea auto-height placeholder="心情状态,分享生活点滴" v-model="content" /></view>
		</view>
		<view class="publishAx">
			<button type="warn" size="mini" plain @click="publishAx">发布</button>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import sunuiUpimg from '@/components/sunui-upimg/sunui-upimg.vue';
import config from '../../../config';
import { getUserId } from '../../../utils/common';

export default {
	data() {
		return {
			uploadUrl: config.baseUrl + 'uploadArticleImg',
			axImg: [],
			title: '',
			content: '',
			updateImg: true,
			header: {}
		};
	},

	 components: {
	 	sunuiUpimg
	 },

	computed: {
		...mapState({
			axList: state => state.ax.axList, //斧头列表
			axCreateStatus: state => state.ax.axCreateStatus //创建状态
		})
	},

	onLoad(){
		let token = uni.getStorageSync('myToken');
		console.log('--onLoad--->', token);
		this.header = {'Authorization': 'Bearer ' + token};
	},

	watch: {
		axCreateStatus: function(newValue, oldValue) {
			if (newValue) {
				uni.navigateBack();
			}
		}
	},

	methods: {
		...mapActions(['createAx']),

		setAxImg(filePath) {
			if (filePath) {
				console.log(' filePath--->', filePath);
				this.axImg.push(config.server + filePath);
				console.log('push after--->', this.axImg);
			}
		},

		//发布斧头
		publishAx() {
			let { title, content } = this;
			if(!title || !content){
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '请填写标题或内容！'
				});
				return;
			}
			let params = {
				ax: this.axImg,
				title,
				content,
				author: getUserId(),
				state: 1
			};
			this.createAx(params);
			this.axImg = [];
			this.title = '';
			this.content = '';
			this.updateImg = false;
			setTimeout(() => {
				this.updateImg = true;
			}, 500);
		}
	}
};
</script>

<style lang="scss" scoped>
.axContent {
	padding: 25rpx;
	.publishAx{
		display: flex;
		justify-content: center;
		button{
			width: 100%;
		}
	}
}

.axTitle {
	padding: 10rpx;
	margin: 20rpx 0;
}

.axDesc {
	padding: 10rpx;
	margin: 20rpx 0;
}
</style>
