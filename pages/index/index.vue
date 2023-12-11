<template>
	<view class="relative1" :style="'height:'+ screenHeight +'px !important;'">
		<image class="pic_background" src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/beijing.gif"></image>
		<view class="container1">
			<view class="d-flex j-sb mx-4 a-center" :style="'margin-top:'+screenHeight/10+'px !important;'">
				<view class="" @click="listen">
					<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/listen.png" mode="" style="width: 150rpx;height: 150rpx;"></image>
				</view>
				<view class="" @click="read">
					<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/read.png" mode="" style="width: 150rpx;height: 150rpx;"></image>
				</view>
				<view class="" @click="phone">
					<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/phone.png" mode="" style="width: 150rpx;height: 150rpx;"></image>
				</view>
			</view>
			<view class="d-flex j-center" @click="chatWithCat" style="width: 200rpx;" :style="'height:'+screenHeight/5+'px !important;'+'margin-top:'+screenHeight/40+'px !important;'">
				<image :src="image" style="width: 200rpx;height: 150rpx;"></image>
			</view>
			<view class="" style="margin-left: 100rpx;
			width: 200rpx; height: 200rpx;"  @click="enterHouse"></view>
			<tqb-tabbar activeIndex="1" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: 0,
				image: 'https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/bukaixin.png',
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		onShow() {
			this.image = 'https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/xinli.png'
			this.image = 'https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/zisha.png'
		},
		onBackPress() {

		},
		onHide() {

		},
		methods: {
			listen(){
				uni.navigateTo({
					url:'/pages/listen/listen'
				})
			},
			read(){
				uni.navigateTo({
					url:'/pages/read/read'
				})
			},
			phone(){
				uni.navigateTo({
					url:'/pages/phone/phone'
				})
			},
			enterHouse() {
				uni.switchTab({
					url: '/pages/play/play'
				})
			},
			chatWithCat() {
				uni.navigateTo({
					url: '/pages/zero-chat/zero-chat'
				});
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
