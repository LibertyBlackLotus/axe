<template>
	<view class="axDetail">
		<nav-bar transparentFixedFontColor="#FFF" type="transparentFixed" :title="axDetail.title">
		    <!-- <view class="transparent_fixed_preview" slot="transparentFixedRight" @click="onPreview">预览</view> -->
		    <!-- <view class="preview" slot="right" @click="onPreview">预览</view> -->
		</nav-bar>
		<view>
			<image :src="axDetail.ax[0]" mode="widthFix"></image> 
		</view>
		<view>
			<view class="axAuthor">
				<view class="axAuthorImg">
					<image :src="axDetail.author.avatar? axDetail.author.avatar: defaultAvatar"></image>
				</view>
				<view class="flex authorItem">
					<view>
						{{axDetail.author.username}}
					</view>
					<view>
						{{axDetail.create_time | formatTime}}
					</view>
				</view>
				<view class="flex" v-if="userId != axDetail.author._id">
					<button type="warn" size="mini" plain="true" @click="followedFriend(true)" v-if="!followedStatus">关注</button>
					<button type="default" size="mini"  @click="followedFriend(false)" v-if="followedStatus">已关注</button>
				</view>
			</view>
			<view class="axContent">
				{{axDetail.content}}
			</view>

			<!-- 评论panel -->
			<view class="axCommentPanel">
				<view>
					<input class="commentContent" placeholder="写评论" v-model="content" />
				</view>
				<view class="axCommentPanelImg" >
					<min-badge :count="commentCount">
						<image :src="commentIcon" class="img"></image>
					</min-badge>
					<view>
						<image :src="collected? collectActiveIcon: collectIcon"
							   class="img"
							   @click="collectMethod(collected)"></image>
					</view>
					<min-badge :count="axDetail.praises" >
						<image :src="isPraise? thumbsActiveIcon: thumbsIcon"
							   class="img"
							   @click="thumbsMethod(isPraise)"></image>
					</min-badge>
					<button type="default" size="mini" @click="publishComment" class="commentButton">发送</button>
				</view>
			</view>

		</view>

		<!-- 评论 -->
		<comment :ax="axId" @count="count"></comment>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import minBadge from '@/components/min-badge/min-badge';
import navBar from "@/components/zhouWei-navBar";
import comment from './comment.vue';
import {getUserId, getUserInfo, formatDate} from '../../../utils/common';
export default { 
	components: {
		navBar,
		comment,
		minBadge
	},

	data() {
		return {
			defaultAvatar: require('../../../static/img/avatar.png'),
			userId: getUserId(),
			userInfo: getUserInfo(),
			commentIcon: require('../../../static/img/comment.png'),
			collectIcon: require('../../../static/img/collect.png'),
			collectActiveIcon: require('../../../static/img/collectActive.png'),
			thumbsIcon: require('../../../static/img/thumbs.png'),
			thumbsActiveIcon: require('../../../static/img/thumbsActive.png'),
			shareIcon: require('../../../static/img/share.png'),
			shareActiveIcon: require('../../../static/img/shareActive.png'),
			axId : '',
			content: '',
			commentCount: 0
		};
	},

	computed: {
		...mapState({
			axDetail: state => state.ax.axDetail,                      //斧头详情
			followedStatus: state => state.userFriend.followedStatus,  //是否关注了用户
			isPraise: state => state.axPraise.isPraise,                //是否点了赞
			collected: state => state.axCollection.collected,          //是否收藏了
		})
	},

	onLoad(obj) {
		let {id} = obj;
		this.axId = id;
		try{
			this.getAxDetailMethod();
			this.isPraisedMethod();
			this.isCollectedMethod();
		}catch (e){
			console.error(e);
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
			'getAxDetail',
			'createAxRead',
			'followed',
			'removeFollowed',
			'isFollowed',
			'thumbs',
			'removeThumbs',
			'isPraised',
			'createAxCollection',
			'removeCollection',
			'isCollected',
			'addComment'
		]),

		//获取斧头详情
		getAxDetailMethod(){
			this.getAxDetail({id: this.axId}).then(res => {
				let params = {
					user: this.userId,
					friend: res.author._id
				};
				this.isFollowed(params); //判断是否关注了用户
				this.readRecord();       //添加阅读记录
			});
		},

		//判断是否点赞了
		isPraisedMethod(){
			let params = {
				ax: this.axId,
				user: this.userId
			};
			this.isPraised(params);
		},

		//判断是否收藏了
		isCollectedMethod(){
			let params = {
				ax: this.axId,
				user: this.userId
			};
			this.isCollected(params);
		},

		//添加阅读记录
		readRecord(){
			let params = {
				ax: this.axId,
				user: this.userId,
				title: this.axDetail.title
			};
			this.createAxRead(params);
		},

		//关注用户
		followedFriend(focus){
			let params = {
				user: this.userId,
				friend: this.axDetail.author._id
			};
			if(focus){
				this.followed(params);
			}else{
				this.removeFollowed(params);
			}
		},

		//点赞操作
		thumbsMethod(isPraise){
			let params = {
				ax: this.axId,
				user: this.userId
			};
			if(isPraise){
				this.removeThumbs(params).then(res => {  //取消点赞
					this.getAxDetailMethod();
				});
			}else{
				this.thumbs(params).then(res => {    //点赞
					this.getAxDetailMethod();
				});
			}
		},

		//收藏操作
		collectMethod(isCollected){
			let params = {
				ax: this.axId,
				user: this.userId
			};
			if(isCollected){
				this.removeCollection(params).then(res => {  //取消收藏
					this.getAxDetailMethod();
				});
			}else{
				this.createAxCollection(params).then(res => {    //收藏
					this.getAxDetailMethod();
				});
			}
		},

		//发布评论
		publishComment(){
			let params = {
				content: this.content,
				ax: this.axId,
				username: this.userInfo.username
			};
			this.addComment(params);
			this.content = '';
		},

		count(count){
			this.commentCount = count;
		}
	}
};
</script>

<style lang="scss" scoped>
	.axDetail{
		padding-bottom: 100rpx;
	}
	.axAuthor{
		display: flex;
		height: 100rpx;
		align-items: center;
		padding: 10rpx 30rpx;
		.axAuthorImg{
			flex: 0 0 100rpx;
			image{
				width: 50rpx;
				height:50rpx;
				border-radius: 100%;
			}
		}
		.flex{
			flex: auto;
		}
		.authorItem{
			display: flex;
			flex-direction: column;
		}
	}

	.axContent{
		min-height: 300rpx;
		padding: 10rpx 30rpx;
	}

	.axCommentPanel{
		display: flex;
		height: 90rpx;
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		border-top: 1px solid #b0bec5;
		padding: 5rpx 10rpx;
		z-index: 1000;
		align-items: center;
		.commentContent{
			background-color: #f1f1f1;
			border-radius: 5%;
			padding: 0 10rpx;
		}
		.axCommentPanelImg{
			display: flex;
			align-items: center;
			.img{
				width: 40rpx;
				height: 40rpx;
				margin: 0 20rpx;
			}
			.commentButton{
				margin-left: 50rpx;
			}
		}
	}
</style>
