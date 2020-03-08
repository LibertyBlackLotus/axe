<template>
	<view class="content">
		页面 - 5
		<button type="primary" @tap="logout">退出登录</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {
		//退出登录
		logout() {
			uni.removeStorageSync('userInfo');
			uni.removeStorage({
				key: 'token',
				success: () => {
					uni.redirectTo({
						url: '../../login/login'
					});
				}
			});
		}
	}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}
</style>
