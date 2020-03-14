<template>
	<view class="content">
		设置
		<button type="primary" @tap="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

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

</style>
