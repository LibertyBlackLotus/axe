<template>
	<view class="content">
		<button type="warn" size="mini" plain @tap="logout">退出登录</button>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue";
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
	export default {
		components: {
			uniList,
			uniListItem
		},

		methods: {
			//退出登录
			logout() {
				uni.removeStorageSync('userInfo');
				uni.removeStorage({
					key: 'myToken',
					success: () => {
						uni.redirectTo({
							url: '../../login/login'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		justify-content: center;
	}
</style>
