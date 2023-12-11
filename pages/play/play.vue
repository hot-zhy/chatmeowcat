<template>
	<view class="content relative1" :style="'height:'+ screenHeight +'px !important;'">
		<image class="pic_background" src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/beijing2.gif" style="z-index: -1;">
		</image>
		<view class="container1">
			<view class="w-100">
				<!-- 四个 -->
				<view class="d-flex mb-4" style="margin-top:35vh;width: 90%;margin-left: 10vw;" >
					<view class="a-center j-center d-flex flex-1" @click="chatWithCat">
						<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/chat2.png" mode="widthFix"
							style="width: 150rpx;"></image>
					</view>
					<view class="d-flex a-center j-center flex-1" @click="eat">
						<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/chifan3.png" mode="widthFix"
							style="width: 150rpx;"></image>
					</view>
					<view class="d-flex a-center j-center flex-1" @click="sleep">
						<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/shujiao2.png" mode="widthFix"
							style="width: 150rpx;"></image>
					</view>
					<view class="d-flex a-center j-center flex-1" @click="smooth">
						<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/shunmao2.png" mode="widthFix"
							style="width: 150rpx;"></image>
					</view>
				</view>
				<view style="">
					<image :src="selectedAnimation" mode="" style=""></image>
				</view>

			</view>
		</view>
		<tqb-tabbar activeIndex="0" />
	</view>
</template>

<script>
	import tqbTabbar from '@/components/tqb-tabbar/tqb-tabbar.vue';
	export default {
		components: {
			tqbTabbar
		},
		data() {
			return {
				screenHeight: 0,
				selectedAnimation:"https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/chifan.gif",
				animationData: {},
				isShowFish:true,
				fishCount:44
			}
		},
		onShow() {
			this.image = 'https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/xinli.png'
			this.image = 'https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/zisha.png'
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			this.selectedAnimation='https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/chifan.gif'
		},
		methods: {
			onConfirmClick() {
				uni.navigateTo({
					url:'/pages/exchange/exchange'
				})
			},
			chatWithCat() {
				uni.navigateTo({
					url: '/pages/chat/chat'
				});
			},
			enterOut() {
				uni.switchTab({
					url: '/pages/index/index'
				})

			},
			eat(){
				var animation = uni.createAnimation({
					duration: 3000,
					timingFunction: 'ease-in-out'
				})
				this.animation = animation
				animation.scale(1.5, 1.5).translateY(-300).rotate(30).step()
				
				this.animationData = animation.export()
				
				setTimeout(function() {
					animation.translate(30).step()
					this.animationData = animation.export()
				}.bind(this), 3000)
				setTimeout(function(){
					this.isShowFish=false
				}.bind(this),6000)
				this.selectedAnimation='https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/chifan.gif'
				this.fishCount=this.fishCount+1
			},
			sleep(){
				var animation = uni.createAnimation({
					duration: 3000,
					timingFunction: 'ease-in-out'
				})
				this.animation = animation
				animation.scale(1.5, 1.5).translateY(-300).rotate(30).step()
				
				this.animationData = animation.export()
				
				setTimeout(function() {
					animation.translate(30).step()
					this.animationData = animation.export()
				}.bind(this), 3000)
				setTimeout(function(){
					this.isShowFish=false
				}.bind(this),6000)
				this.fishCount=this.fishCount+1
				this.selectedAnimation='https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/sleep.gif'
			},
			smooth(){
				var animation = uni.createAnimation({
					duration: 3000,
					timingFunction: 'ease-in-out'
				})
				this.animation = animation
				animation.scale(1.5, 1.5).translateY(-300).rotate(30).step()
				
				this.animationData = animation.export()
				
				setTimeout(function() {
					animation.translate(30).step()
					this.animationData = animation.export()
				}.bind(this), 3000)
				setTimeout(function(){
					this.isShowFish=false
				}.bind(this),6000)
				this.fishCount=this.fishCount+1
				uni.setStorageSync('FishCount',this.fishCount)
				this.selectedAnimation='https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/lumao.gif'
			}
		}
	}
</script>

<style lang="scss">
	.pic_background {
		height: 100%;
		width: 100%;
		position: absolute;
	
	}
	.introduction-container {
	  margin-top: 10vh;
	  display: flex;
	  align-items: center;
	  background-color: #F4A460;
	  border-radius: 30px;
	  padding: 5px;
	
	  .avatar {
	    width: 40px;
	    height: 40px;
	    border-radius: 50%;
	    margin-right: 10px;
	    background-size: cover;
	  }
	
	  .text-content {
	    flex-grow: 1;
	
	    .title {
	      font-size: 16px;
	      color: white;
	    }
	
	    .subtext {
	      font-size: 12px;
	      color: white;
	    }
	  }
	
	  .points {
	    background-color: #FFA500;
	    border-radius: 10px;
	    padding: 2px 5px;
	    font-size: 14px;
	    color: white;
	    margin-left: 10px;
	  }
	}
	.relative1 {
	  width: 100%;
	  min-height: 100%;
	  position: relative;
	}
	.pic_background {
	  height: 100%;
	  width: 100%;
	  position: absolute;
	}
	
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
