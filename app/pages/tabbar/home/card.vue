<template>
    <view class="cu-card">
        <view>

            <view class="cu-list menu menu-avatar" v-if="false">
                <view class="cu-item">
                    <view class="cu-avatar round lg">
                        <image class="avatar round"
                               :src="listData.author.avatar? listData.author.avatar: defaultAvatar">
                        </image>
                    </view>
                    <view class="content padding-tbl">
                        <view class="henflex">
                            <view>{{ listData.author ? listData.author.username : '吃瓜群众' }}</view>
                        </view>
                        <view class="text-gray text-sm flex justify-between">{{ listData.create_time | formatTime }}</view>
                    </view>
                </view>
            </view>

            <view @click="toDetail(listData._id)" class="cardContent">
                <view class="text-content">{{ listData.title }}</view>
                <view class="">
                    <image mode="widthFix" :src="listData.ax[0]"></image>
                </view>
            </view>

            <view class="right">
                <view  class="heartArrowClass">
                    <image :src="heartArrow"></image>
                    <text>{{ listData.praises }}</text>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
	import {formatDate} from '../../../utils/common';
	export default {
		props: {
			listData: {
				type: Object
			}
		},

        data(){
			return {
		        defaultAvatar: require('../../../static/img/avatar.png'),
                heartArrow: require('../../../static/img/heartArrow.png')
            }
        },

		filters: {
			formatTime(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},

		methods: {
			toDetail(id) {
				//卡片详情跳转，信息及详情页自定义
				uni.navigateTo({
					url: '/pages/tabbar/home/detail?id=' + id,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
		}
	};
</script>
<style lang="scss" scoped>
    .cu-card {
        display: block;
        overflow: hidden;
        background-color: #fff;
        border-radius: 10rpx;
        padding: 10rpx;
        border-bottom:1px solid #f1f1f1;
    }

    .flex-sub {
        flex: 1;
    }

    .grid {
        display: flex;
        flex-wrap: wrap;
        /*padding: 10rpx 0;*/
    }

    .grid.col-1 > view {
        width: 100%;
    }

    .justify-between {
        justify-content: space-between;
    }

    .flex {
        display: flex;
    }

    .henflex {
        display: flex;
        flex-flow: row;
    }

    .cu-list.menu > .cu-item .content {
        line-height: 1.6em;
        flex: 1;
        font-size: 30rpx;
    }

    .cu-tag.badge {
        border-radius: 200rpx;
        position: absolute;
        top: -10rpx;
        right: -10rpx;
        font-size: 20rpx;
        padding: 0 10rpx;
        height: 28rpx;
        color: #fff;
    }

    .cu-avatar.lg {
        width: 80rpx;
        height: 80rpx;
        font-size: 2em;
    }

    .cu-avatar {
        font-variant: small-caps;
        margin: 0;
        padding: 0;
        display: inline-flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        background: #fff;
        color: #fff;
        white-space: nowrap;
        position: relative;
        width: 64rpx;
        height: 64rpx;
        background-size: cover;
        background-position: center;
        vertical-align: middle;
        font-size: 1.5em;
    }

    .cu-list.menu {
        display: block;
        overflow: hidden;
    }

    .cu-list + .cu-list {
        margin-top: 30rpx;
    }

    .cu-list.menu > .cu-item {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 100rpx;
        background: #fff;
        /*padding: 0 30rpx;*/
    }

    .cu-card > .cu-item.shadow-blur {
        overflow: initial;
    }

    .cu-card.no-card > .cu-item {
        margin: 0rpx;
        border-radius: 0rpx;
    }

    .cu-card .grid.grid-square {
        margin-bottom: -20rpx;
    }

    .cu-card.case .image {
        position: relative;
    }

    .cu-card.case .image image {
        width: 100%;
    }

    .cu-card.case .image .cu-tag {
        position: absolute;
        right: 0;
        top: 0;
    }

    .cu-card.case .image .cu-bar {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: transparent;
        padding: 0 30rpx;
        word-wrap: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .cu-card.case.no-card .image {
        margin: 30rpx 30rpx 0;
        overflow: hidden;
        border-radius: 10rpx;
    }

    .cu-card.dynamic {
        display: block;
    }

    .cu-card.dynamic > .cu-item {
        display: block;
        background-color: #fff;
        overflow: hidden;
    }

    .text-content {
        padding: 15rpx 15rpx;
        overflow: hidden;
        font-size: 30rpx;
    }

    .cu-card.dynamic > .cu-item .square-img {
        width: 100%;
        height: 200rpx;
        border-radius: 6rpx;
    }

    .cu-card.dynamic > .cu-item .only-img {
        width: 100%;
        height: 320rpx;
        border-radius: 6rpx;
    }

    .padding{
        padding: 5rpx;
    }

    .right{
        text-align: right;
    }
    .heartArrowClass{
        margin-right: 50rpx;
        image{
            width: 40rpx;
            height: 40rpx;
            margin-right: 5rpx;
        }
    }

    .cardContent{
    }
</style>
