<template>
    <view class="content">
        <view class="axAuthor">
            <view class="flex axAuthorImg">
                <image :src="userInfo.author.avatar? userInfo.author.avatar: defaultAvatar"></image>
            </view>
            <view class="flex authorItem">
                <view>
                    {{userInfo.username}}
                </view>
            </view>
            <view></view>
        </view>

        <uni-list>
            <uni-list-item title="收藏"
                           :show-extra-icon="true"
                           :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"
                           @click="navigateMethod('./collection')">
            </uni-list-item>
            <uni-list-item title="浏览历史"
                           :show-extra-icon="true"
                           :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"
                           @click="navigateMethod('./history')">
            </uni-list-item>
            <uni-list-item title="消息"
                           :show-extra-icon="true"
                           :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"
                           @click="navigateMethod('./message')">
            </uni-list-item>
            <uni-list-item title="搜索历史"
                           :show-extra-icon="true"
                           :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"
                           @click="navigateMethod('./searchRecord')">
            </uni-list-item>

            <uni-list-item title="设置"
                           :show-extra-icon="true"
                           :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"
                           @click="navigateMethod('./settings')">
            </uni-list-item>
        </uni-list>
    </view>
</template>

<script>
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import {getUserInfo} from '../../../utils/common';

	export default {
		data() {
			return {
				defaultAvatar: require('../../../static/img/avatar.png'),
                userInfo: {}
			};
		},

		components: {
			uniList,
            uniListItem
        },

		onLoad() {
            this.userInfo = getUserInfo();
		},

		methods: {
            //导航
			navigateMethod(path){
				uni.navigateTo({
					url: path,
					animationType: 'pop-in',
					animationDuration: 200
				});
            }
		}
	};
</script>

<style lang="scss" scoped>
    .axAuthor{
        display: flex;
        height: 200rpx;
        align-items: center;
        padding: 20rpx 50rpx;
        background-color: $main-color;
            .axAuthorImg{
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
</style>
