<template>
	<view>
		<view class="mt-4 ml-2" @click="naviback">返回</view>
		<view class="w-100 d-flex a-center j-center">
			<view class="">
				<view class="text-center p-2" v-for="(item,index) in inputList" :key="index"
					style="width: 400rpx;height: 400rpx;margin-top:40rpx;"
					:style="{backgroundImage:`url(${indexBackgroundImage})`,backgroundSize:'cover'}"
					:animation="animationData">
					<p style="font-size: 30rpx;width: 150rpx;margin-top: 50rpx;margin-left: 110rpx;">{{item}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputList: [
					"生活甜甜，好运连连",
					"别怕，有我在",
					"你要知道很多人在默默爱着你",
					"因为我也淋过雨，所以想给你撑伞",
					"那么善良的你，永远值得被爱",
					"如果事与愿违，一定是上天另有安排",
					"即使在谷底，你也是最美的花",
					"过去的日子镌刻着你的怀念，现在的日子书写着你的人生",
					"你听说过触底反弹吗？",
					"每个人都是渺小的伟大，兀自地发着光"
				],
				indexBackgroundImage: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/pink.png",
				animationData: {}
			}
		},
		onShow() {
			var animation = uni.createAnimation({
				duration: 30000,
				timingFunction: 'linear'
			})
			this.animation = animation
			animation.scale(1.5, 1.5).translateY(-1500).rotate(30).step()

			this.animationData = animation.export()

			setTimeout(function() {
				animation.translate(30).step()
				this.animationData = animation.export()
			}.bind(this), 1000)
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
	page {
		background-image: url("https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/color.png");
	}
</style>
