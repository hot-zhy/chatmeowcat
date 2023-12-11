<template>
	<view>
		<view v-if="fase">
			<view class="cont" v-html="cont"></view>
		</view>
	</view>
</template>

<script>
	var that;
	export default{
		data(){
			return{
				fase:false,
				cont:''
			}
		},
		onLoad() {
			that = this;
			that.center();
		},
		methods:{
			center(){
				uni.showLoading({
					title:'加载中'
				})
				uniCloud.callFunction({
					name: 'cloudb'
				}).then((res) => {
					console.log(33,res)
					that.cont = res.result.data[0].content;
					that.fase = true;
					uni.hideLoading();
				}).catch((err) => {
					console.error(err)
				})
			},
		}
	}
</script>

<style>
	.cont{
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
		line-height: 56rpx;
		padding: 30rpx;
	}
</style>
