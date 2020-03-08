<template>
	<view class="axContent">
		<view><sunui-upimg v-if="updateImg" :url="uploadUrl" @set-aximg="setAxImg"></sunui-upimg></view>
		<view>
			<view class="axTitle"><input class="uni-input" v-model="title" placeholder="添加标题" /></view>
			<view class="axDesc"><textarea auto-height placeholder="心情状态,分享生活点滴" v-model="content" /></view>
		</view>
		<button type="primary" @click="publishAx">发布</button>
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
			updateImg: true
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
		async publishAx() {
			console.log('--publishAx--');
			let { title, content } = this;
			let params = {
				ax: this.axImg,
				title,
				content,
				author: getUserId()
			};
			console.log('--publishAx-->', params);
			this.createAx(params);
			this.axImg = [];
			this.title = '';
			this.content = ''
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
