<template>
	<view>
		<uni-nav-bar :fixed="true" :leftIcon="true" status-bar background-color="antiquewhite" left-text="返回" @clickLeft="naviback">
			<block>
				<view >
					<view class="d-flex" style="">
						<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/duihuan1.png" mode="" style="width: 300rpx;height: 80rpx;"></image>
						<view class="text-center d-flex a-center j-center font-md" style="margin-left: -160rpx;z-index: 999;">{{fishCount}}</view>
					</view>
				</view>
			</block>
		</uni-nav-bar>
		<left-swipe-tab :topheight="topHeight" :tabData="tabs"></left-swipe-tab>
	</view>
</template>

<script>
	import goods from "@/components/left-swipe-tab/goods.js";
	export default {
		data() {
			return {
				tabs:[],
				topHeight:44,
				fishCount:0
			}
		},
		onReady() {
			this.tabs=goods;
		},
		onLoad(){
			this.fishCount=uni.getStorageSync('FishCount')
		},
		methods: {
			naviback(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>

</style>
