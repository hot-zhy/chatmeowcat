<template>
	<view class="content">
		<view class="d-flex a-center j-center relative1" :style="'height:'+ screenHeight +'px !important;'">
			<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/bg4.png" class="pic_background" mode=""></image>
			<view class="container1">
				<view class="d-flex a-center j-center" :style="'margin-top:'+ screenHeight/6 +'px !important;'" >
					<image :src="avatar" style="width: 100rpx;height:100rpx;border-color: #af4416;border-width: 4upx;border: solid; border-radius: 100%;"></image>
					<view class="head_box_lb">
						<view class="heaD_box_la_1" v-if="isLogin" @click="sets">{{nickname}}</view>
					</view>
				</view>
				<view class="" :style="'margin-top:'+ screenHeight/10 +'px !important;'" style="">
					<view class="d-flex j-sb a-center mx-2" style="">
						<view class="" @click="sets">
							<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/shezhi.png" mode="widthFix" style="width: 180rpx;"></image>
						</view>
						<view class="">
							<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/maoBall.png" mode="widthFix" style="width: 180rpx;"></image>
						</view>
						<view class="">
							<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/maomi.png" mode="widthFix" style="width: 180rpx;"></image>
						</view>
					</view>
					<view class="d-flex j-sb a-center mx-2">
						<view class="" @click="exchange">
							<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/duihuan.png" mode="widthFix" style="width: 180rpx;"></image>
						</view>
						<view class="">
							<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/tongji.png" mode="widthFix" style="width: 180rpx;"></image>
						</view>
						<view class="">
							<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/ceshi.png" mode="widthFix" style="width: 180rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>


		<tqb-tabbar activeIndex="3" />
	</view>
</template>

<script>

	export default {
		data() {
			return {
				screenHeight:0,
				nickname:'zhy',
				avatar:'https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/catt.png',
				isLogin:false
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		onShow() {
			this.isLogin=uni.getStorageSync('isLogin')
			this.nickname=uni.getStorageSync('nickname')
		},
		methods: {
			exchange(){
				uni.navigateTo({
					url:'/pages/exchange/exchange'
				})
			},
		    sets(){
				uni.navigateTo({
					url:'/pages/set/set'
				})
			},
			login(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	@import '@/components/css/my.css';

	body {
		-webkit-font-smoothing: antialiased;
	}

	.border-custom {
		box-shadow:
			inset #221801 0 0 0 1px,
			inset #059c8e 0 0 0 1px,
			inset #0cab9c 0 0 0 2px,
			inset #48e4d6 0 0 0 3px,
			inset #e5f9f7 0 0 0 3.5px,
			inset #bfecf7 0 0 0 5px
	}
	
	.relative1 {

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
