<template>
    <view class="cu-card">
        <view>
            <view class="cu-list menu menu-avatar">
                <view class="cu-item">
                    <view class="cu-avatar1">
                        <!-- 头像，匿名时显示统一的匿名头像，若需自定义请自行修改 -->
                        <image class=""
                               :src="listData.author.avatar? listData.author.avatar: defaultAvatar">
                        </image>
                    </view>
                    <view class="content1">
                        <view class="henflex">
                            <view>{{ listData.author ? listData.author.username : '吃瓜群众' }}</view>
                        </view>
                        <view class="text-gray text-sm flex justify-between">{{ listData.create_time | formatTime }}</view>
                    </view>
                </view>
            </view>
            <view @click="toDetail(listData._id)">
                <view class="text-content">{{ listData.title }}</view>
                <view class="grid col-1 flex-sub padding-lr">
                    <image mode="widthFix" :src="listData.ax[0]"/>
                </view>
            </view>

            <view class="text-gray text-sm text-right padding">
                <text class="right">浏览:{{ listData.reads }}</text>
                <text class="right">点赞:{{ listData.praises }}</text>
            </view>
        </view>
    </view>
</template>
<script>
	import {formatDate} from '../../utils/common';
	export default {
		name: 'NAUI-card',

		props: {
			listData: {
				type: Object
			}
		},

        data(){
			return {
		        defaultAvatar: require('../../static/img/avatar.png')
            }
        },

		filters: {
			formatTime(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},

		created: function (e) {
			// this.listData.creat_time = this.dateTimeFormatter(parseInt(this.listData.creat_time)*1000)
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
			dateTimeFormatter(t) {
				t = new Date(t).getTime();
				t = new Date(t);
				var year = t.getFullYear();
				var month = t.getMonth() + 1;
				month = this.checkAddZone(month);

				var date = t.getDate();
				date = this.checkAddZone(date);

				var hour = t.getHours();
				hour = this.checkAddZone(hour);

				var min = t.getMinutes();
				min = this.checkAddZone(min);

				var se = t.getSeconds();
				se = this.checkAddZone(se);

				return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + se;
			},
			checkAddZone(num) {
				return num < 10 ? '0' + num.toString() : num;
			}
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

    .cu-list.menu > .cu-item .content1 {
        flex: auto;
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

    .cu-avatar1 {
        margin: 0;
        padding: 0;
        background: #fff;
        flex: 0 0 100rpx;
        image{
            width: 64rpx;
            height: 64rpx;
        }
    }

    .cu-list.menu {
        display: block;
        overflow: hidden;
    }

    .cu-list + .cu-list {
        margin-top: 30rpx;
    }

    .cu-list.menu > .cu-item {
        display: flex;
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
        padding: 0 30rpx 0;
        max-height: 6.4em;
        overflow: hidden;
        font-size: 30rpx;
        line-height: 1.6;
        margin-left: 10rpx;
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
        margin: 10rpx;
    }
</style>
