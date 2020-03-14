<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="username"
					type="text"
					maxlength="11"
					placeholder="用户名/电话"
				></wInput>
				<wInput
					v-model="password"
					type="password"
					maxlength="11"
					placeholder="密码"
				></wInput>
			</view>
			<wButton 
				text="登 录"
				:rotate="isRotate" 
				@click.native="startLogin"
			></wButton>
			
			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
			</view>
			
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
//	var _this;
import { mapState, mapActions } from 'vuex';
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	
	export default {
		data() {
			return {
				logoImage: require('../../static/img/logo.png'),
				username:'',     //用户/电话
				password:'',     //密码
				isRotate: false, //是否加载旋转
			};
		},

		components:{
			wInput,
			wButton,
		},

		methods: {
			...mapActions([
				'login'
			]),

			isLogin(){
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		_this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},

		    startLogin(){
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.username.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
				this.isRotate = true;
				 uni.showLoading({
				 	title: '登录中'
				 });
				 let params = {
				 	username: this.username,
					 password: this.password
				 };
				　this.login(params).then(res =>　{
					 if (res.code == 200) {
					 	try{
							uni.setStorageSync('myToken', res.data.token);
							uni.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '登录成功'
							});
							uni.reLaunch({
								url: '/pages/tabbar/home/home'
							});
						}catch (e){
					 		console.error(e);
						}
					 } else {
						 uni.showToast({
							 icon: 'none',
							 position: 'bottom',
							 title: res.msg
						 });
						 uni.setStorageSync('myToken', null);
					 }
					 this.isRotate = false;
					 uni.hideLoading();
				 });
				
		    },

			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
		}
	}
</script>

<style>
	@import "./css/icon.css";
	@import "./css/main.css";
</style>
