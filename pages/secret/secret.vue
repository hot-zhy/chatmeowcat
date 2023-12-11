<template>
	<view>
		<view class="d-flex w-100 j-center a-center mt-4">
			<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/input.png" mode="widthFix" style="width: 90%;position: absolute;top:20px;"></image>
			<textarea v-model="inputValue" style="margin-left: 10px;width: 80%;height: 200rpx;margin-top: 220px;" placeholder="你有什么秘密吗？"/>
		</view>
		<view class="text-right" style="width: 98%;margin-top: -12px;" @click="send">
			<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/send.png" mode="widthFix" style="width: 100rpx;"></image>
		</view>
		<view class="d-flex w-100 j-center">
			<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/luminate.png" mode="widthFix" style="width: 70%;position: absolute;bottom: 0;"></image>
		</view>
		<wyb-modal
		  ref="modal"
		  :show-title="false"
		  cancel-text="关闭"
		  confirm-text="发送"
		  :custom="true"
		  :height="300"
		  @confirm="onConfirmClick"
		>
		  <view class="">
		    <view class="font-lg font-weight mb-4 mt-4 text-center mx-4"
		      >发送您的秘密心事？</view
		    >
		  </view>
		  <view class="">
			  <view class="font-lg font-weight mb-4 mt-4 text-center mx-4"
			    style="color: blue;font-size: 30rpx;">《留言协议》</view
			  >
		  </view>
		</wyb-modal>
	</view>
</template>

<script>
	import wybModal from "@/components/third-party/wyb-modal/wyb-modal.vue";
	export default {
		components:{
			wybModal
		},
		data() {
			return {
				inputValue:""
			}
		},
		methods: {
			send(){
				this.$refs.modal.showModal() // 显示
			},
			onConfirmClick(){
				uni.navigateTo({
					url:'/pages/wall/wall'
				})
			}
		}
	}
</script>

<style>
page{
	background-image: url("https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/star.png");
	
}

</style>
