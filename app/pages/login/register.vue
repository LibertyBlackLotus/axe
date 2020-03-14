<template>
	<view class="register">
	
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput
						v-model="username"
						type="text"
						maxlength="11"
						placeholder="手机号"
					></wInput>
					<wInput
						v-model="password"
						type="password"
						maxlength="11"
						placeholder="登录密码"
						isShowPass
					></wInput>
					<!--<wInput-->
						<!--v-model="verCode"-->
						<!--type="number"-->
						<!--maxlength="4"-->
						<!--placeholder="验证码"-->
						<!---->
						<!--isShowCode-->
						<!--ref="runCode"-->
						<!--@setCode="getVerCode()"-->
					<!--&gt;</wInput>-->
					
				</view>
				
				<wButton 
					text="注 册"
					:rotate="isRotate" 
					@click.native="startReg"
				></wButton>
			
			<!-- 底部信息 -->
			<view class="footer">
				<text 
					@tap="isShowAgree" 
					class="cuIcon"
					:class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
				>同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: require('../../static/img/logo.png'),
				username:'', // 用户/电话
				password:'',  //密码
//				verCode:"",   //验证码
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
			}
		},

		components:{
			wInput,
			wButton,
		},

		methods: {
			...mapActions([
				'registerUser'
			]),

			isShowAgree(){
				//是否选择协议
				this.showAgree = !this.showAgree;
			},
//			getVerCode(){
//				//获取验证码
//				if (_this.username.length != 11) {
//				     uni.showToast({
//				        icon: 'none',
//						position: 'bottom',
//				        title: '手机号不正确'
//				    });
//				    return false;
//				}
//				console.log("获取验证码")
//				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
//				uni.showToast({
//				    icon: 'none',
//					position: 'bottom',
//				    title: '模拟倒计时触发'
//				});
//
//				setTimeout(function(){
//					_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
//					uni.showToast({
//					    icon: 'none',
//						position: 'bottom',
//					    title: '模拟倒计时终止'
//					});
//				},3000)
//			},
		    startReg() {
				//注册
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请先同意《协议》'
				    });
				    return false;
				}
				if (this.username.length != 11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
//		        if (this.password.length < 6) {
//		            uni.showToast({
//		                icon: 'none',
//						position: 'bottom',
//		                title: '密码不正确'
//		            });
//		            return false;
//		        }
//				if (this.verCode.length != 4) {
//				    uni.showToast({
//				        icon: 'none',
//						position: 'bottom',
//				        title: '验证码不正确'
//				    });
//				    return false;
//				}
				this.isRotate = true;
				let params = {
					username: this.username,
					password: this.password
				};
				this.registerUser(params).then(res => {
					console.log(' vue registerUser-->', res);
					if (res.code == 200) {
						uni.setStorageSync('myToken', res.data.token);
						uni.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '注册成功'
						});
						uni.reLaunch({
							url: '/pages/tabbar/home/home'
						});
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.msg
						});
						uni.setStorageSync('myToken', null);
					}
				});
		    }
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>