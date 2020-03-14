<template>
	<view>
		<view class="content" v-if="comment.length == 0">
			暂无评论
		</view>
		<view v-if="comment.length > 0" v-for="item in comment" :key="item._id" class="commentList">
			<view class="commentListImg">
				<image :src="item.author? item.author.avatar: defaultAvatar"></image>
			</view>
			<view class="info">
				<text>{{item.username}}</text>
				<text class="infoContent">{{item.content}}</text>
				<view class="time">
					<text>{{item.create_time | formatTime}}</text>
					<text>10回复</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {getUserId, formatDate} from '../../../utils/common';
export default {
	props: {
		ax: String, //斧头id
	},

	computed: {
		...mapState({
			comment: state => state.comment.comment,        //斧头评论
		})
	},

	data() {
		return {
			defaultAvatar: require('../../../static/img/avatar.png'),
		};
	},

	mounted() {
		this.getCommentList({ax: this.ax});
	},

	watch: {
		comment: function (newV, oldV) {
			 this.$emit('count', newV.length);
		}
	},

	filters: {
		formatTime(time) {
			let date = new Date(time);
			return formatDate(date, 'yyyy-MM-dd hh:mm');
		}
	},

	methods: {
		...mapActions([
			'getCommentList',
		]),
	}
};
</script>

<style lang="scss" scoped>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}

	.commentList{
		display: flex;
		padding: 10rpx 20rpx;
		.commentListImg{
			image{
				width: 50rpx;
				height: 50rpx;
				border-radius: 100%;
				margin-right: 20rpx;
			}
		}
		.info{
			display: flex;
			flex-direction: column;
			min-height: 100rpx;
			.infoContent{
				min-height: 80rpx;
			}
			.time{
				display: flex;
				text{
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
