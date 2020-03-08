<template>
	<view class="content">
		<waterfall :list='list' :space='16' :column='3'></waterfall>
	</view>
</template>

<script>
  import waterfall from '../../components/kcy-waterfall/waterfall'
  import dataList from '../../static/kcy-waterfall/data.json'
	export default {
    components: {
      waterfall
    },
		data() {
			return {
				list: []
			}
		},
		onLoad() {
      setTimeout(() => {
        this.list = dataList
      }, 20)
      
		},
		methods: {}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
