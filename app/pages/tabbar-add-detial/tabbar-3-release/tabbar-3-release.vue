<template>
	<view class="content"> 
		<uni-list>
			<uni-list-item v-for="item in axList" 
				   :key="item._id" 
				   :title="item.ax">
				{{item.title}}
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
export default {
	props: {},

	data() {
		return {
			title: 'Hello'
		};
	},
	
	computed: {
		...mapState({			
			axList: state => state.ax.axList  //斧头列表
		})
	},
	
	onLoad() {
		this.getAxList();
	},
	
	methods: {
		...mapActions([
			'getAxList'
		])
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
