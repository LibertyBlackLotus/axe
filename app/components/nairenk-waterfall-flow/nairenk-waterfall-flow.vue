<template>
	<view class="flow-box">
		<view class="item"
			:class="left[index] == 1 ? 'left' : ''"
			:style="'top:' + top[index] + 'px;'"
			v-for="(item, index) in newList" :key="index"
			:data-index="index"
			 @click="choose">
			<view class="pic">
				<image class="image" 
				       mode="widthFix" 
					   lazy-load
					   :src="item.ax[0]" 
					   style="width: 100%; height: 250rpx; display: block;"  />				
			</view>
			<view class="content">
				<text>{{item.title}}</text>
				<text>{{item.create_time}}</text>				
				<!-- <view class="user" v-if="item.author.username">
					<image style="width: 40rpx; height: 40rpx; border-radius: 50%; margin-right: 10rpx;" 
						:src="item.author && item.author.avatar"></image>
					{{item.author && item.author.username}}
				</view> -->
			</view>
		</view>
		<view class="loading" v-show="loading" :style="'top: ' + loadingTop + 'px'" >
			<image src="/static/nairenk-waterfall-flow/loading.gif" style="width: 80rpx; height: 80rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 数据列表
			list: {
				type: Array,
				default() {
					return []
				}
			},
			// 加载动画
			loading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				mark: 0,
				newList: [],
				boxHeight: [],
				top: [], 
				left: [],
				loadingTop: 0
			}
		},
		watch: {
			// 数据
			list: function (newVal, oldVal) {
				this.mark = oldVal.length;
				if (newVal != oldVal) {
					this.newList = this.list;
					this.$nextTick(function () {
						setTimeout(() => {
							this.waterFall();
						}, 120)
					})
				}
			}
		},
		methods: {
			// 瀑布流定位
			waterFall() {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.flow-box .item').boundingClientRect(res => {
					let len = this.newList.length;
					let height = 0;
					for (let i = this.mark; i < len; i++) {
						height = res[i].height;
						if (i < 2) {
							this.$set(this.newList[i], 'top', 0);
							this.$set(this.newList[i], 'left', i);
							this.boxHeight.push(height);
							this.top.push(0);
							this.left.push(i);
						} else {
							let minHeight = this.boxHeight[0];
							let index = 0;
							if (minHeight > this.boxHeight[1]) {
								minHeight = this.boxHeight[1];
								index = 1;
							}
							this.boxHeight[index] = minHeight + height + 5;
							this.top.push(minHeight + 5);
							this.left.push(index);
							this.$set(this.newList[i], 'top', minHeight + 5);
							this.$set(this.newList[i], 'left', index);
							this.loadingTop = this.boxHeight[index];
						}
					}
				}).exec();
			},
			// 选中
			choose(e) {
				let index = e.currentTarget.dataset.index;
				this.$emit('click', this.newList[index]);
			}
		}
	}
</script>

<style scoped>
	.flow-box {
		position: relative;
		color: #1a1a1a;
		padding-bottom: var(--window-bottom);
		padding: 0 20rpx; 
	}
	.flow-box .item {
		position: absolute;
		left: 10rpx;
		width: calc(50% - 20rpx);
		border: 1rpx solid #f9f9f9;
		background: #fff;
		border-radius: 5%; 
	}
	.flow-box .left {
		left: 380rpx;
	}
	.flow-box .pic {
		background: #f6f6f6;
	}
	.flow-box .pic .image{
		border-radius: 5%;
	}
	.flow-box .content {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.flow-box .content text {
		width: 100%;
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}
	.flow-box .user {
		display: flex;
		width: 220rpx;
		overflow: hidden;
		font-size: 26rpx;
		color: #666;
	}
	.loading {
		position: absolute;
		width: 100%;
		text-align: center;
		padding: 20rpx 0;
	}
</style>
