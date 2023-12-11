<template>
	<view>
		<view class="" @click="secret">
			<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/secret.png" mode="" style="width: 200rpx;height: 200rpx;" class="ml-2 mt-2"></image>
		</view>
		<view class="" @click="consult">
			<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cloud.png" mode="widthFix" style="width: 100%;"></image>
		</view>
		<view style="margin-left: 20rpx;bottom: 0;" @click="psychological">
			<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/popular.png" mode="" style="width: 400rpx;height: 400rpx;"></image>
		</view>
		<wyb-modal
		  ref="modal"
		  :show-title="false"
		  cancel-text="关闭"
		  confirm-text="去拨打"
		  :custom="true"
		  :height="800"
		  @confirm="onConfirmClick"
		>
		  <view class="">
		    <view class="font-lg font-weight mb-4 mt-4 text-center mx-4"
		      >心理援助热线</view
		    >
		    <view class="text-center font-md mx-5 mt-2" style="line-height: 1.5"
		      >温馨提示~免费援助热线不受区域限制，在全国可拨打以下任何一个电话求助！</view
		    >
		    <view  class="border" style="max-height: 400rpx;overflow: scroll;border-radius: 50rpx;">
				<view v-for="(item,index) in phones" :key="index" class="d-flex a-center w-100 j-center font-md ml-1 mt-3" @click="changePhone(item)"
				:class="item===selectedPhone?'selectedPhone':''">
					{{item}}
				</view>
			</view>
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
				selectedPhone:"",
				phones:[
					"北京：01082951332",
					"天津：022-88188858",
					"河北：0315-96312",
					"内蒙古：0471-12320（转5）",
					"辽宁：0434-5079512",
					"上海：021-96525",
					"浙江：0551-63666903",
					"安徽：0551-63666903",
					"福建：0592-5395159",
					"江西：027-85844666",
					"广东广州：020-81899120",
					"广东深圳：4009959959",
					"广东佛山：0757-82667888",
					"云南：0871-6501111",
					"新疆：0993-2851261"
				]
			}
		},
		onLoad() {
			this.selectedPhone="北京：01082951332"
		},
		methods: {
			secret(){
				uni.navigateTo({
					url:'/pages/secret/secret'
				})
			},
			consult(){
				this.$refs.modal.showModal() // 显示
			},
			onConfirmClick() {
				uni.makePhoneCall({
					phoneNumber:this.selectedPhone
				})
			},
			changePhone(phone){
				this.selectedPhone=phone
			},
			psychological(){
				uni.navigateTo({
					url:'/pages/read/read'
				})
			}
		}
	}
</script>

<style>
	page{
		background-image: url("https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/consult.png");
	}
	.selectedPhone{
		color: red;
	}

</style>
