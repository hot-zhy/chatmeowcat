<template>
	<view :style="'height:'+ screenHeight +'px !important;'" class="relative1">
		<image class="pic_background" src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/beijing6.png"></image>
		<view class="w-100 container1" :style="'margin-top:'+screenHeight/4+'px !important;'">
			<view class="d-flex a-center j-center">
				<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/play.png" mode="" @click="play" style="height: 200rpx;width:300rpx;"></image>
			</view>
			<view class="d-flex a-center j-center">
				<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/pause.png" mode="" @click="pause" style="height: 200rpx;width: 300rpx;"></image>
			</view>
			<view class="d-flex a-center j-center">
				<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/stop.png" mode="" @click="stop" style="height: 200rpx;width: 300rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: 0
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		methods: {
			naviback(){
				uni.navigateBack({
					delta:1
				})
			},
			play(){
			},
			stop(){
			},
			pause(){
			}
		}
	}
</script>

<style>
.relative1 {
		min-height: 100%;
		width: 100%;
		position: relative;

	}



	.pic_background {
		height: 100%;
		width: 100%;
		position: absolute;

	}



	.container1 {

		height: 100%;

		width: 100%;

		flex-direction: column;

		position: absolute;

	}
</style>
