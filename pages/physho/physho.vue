<template>
  <view class="content relative1" :style="'height:'+ screenHeight +'px !important;'">
    <image class="pic_background" src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/physho.png"></image>
    <!-- Add your images below -->
    <image class="cloud1" src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/qiaoqiaohua"></image>
    <image @click="chat" class="cloud2" src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/qingsu"></image>
    <image @click="phone" class="hot-air-balloon" src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/xinlirexian"></image>
    <image @click="suggestion" class="boat" src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/xinlijianyi"></image>
    <!-- Your other content goes here -->
    <tqb-tabbar activeIndex="2" />
  </view>
</template>

<script>
	import tqbTabbar from '@/components/tqb-tabbar/tqb-tabbar.vue';
	export default {
		components: {
			tqbTabbar,
		},
		data() {
			return {
				screenHeight: 0,
			}
		},
		onShow() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		methods: {
			chat(){
				uni.navigateTo({
					url:'/pages/chat/chat'
				})
			},
			phone(){
				uni.navigateTo({
					url:'/pages/phone/phone'
				})
			},
			suggestion(){
				uni.navigateTo({
					url:'/pages/suggestion/suggestion'
				})
			}
		}
	}
</script>

<style lang="scss">
/* Your existing styles remain the same */
.pic_background {
  width: 100vw; /* viewport width */
  height: 100vh; /* viewport height */
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* Make sure this is below other content */
  object-fit: cover; /* Cover the area without stretching */
}

.cloud1 {
  position: absolute;
  top: 14.5vh; /* Adjust the value to position the cloud as needed */
  left: 9vw; /* Adjust the value to position the cloud as needed */
  width: 25vw; /* Set width as a percentage of the viewport width */
  height:10vw;
  z-index: 1;
}

.cloud2 {
  position: absolute;
  top: 15.5vh; /* Adjust the value to position the cloud as needed */
  right: 9.5vw; /* Adjust the value to position the cloud as needed */
  width: 24vw; /* Set width as a percentage of the viewport width */
  height:9vw;
  z-index: 1;
}

.hot-air-balloon {
  position: absolute;
  top: 37vh; /* Adjust the value to position the hot air balloon as needed */
  left: 75.5vw; /* Center horizontally */
  width: 34vw; /* Set width as a percentage of the viewport width */
  height:10vw;
  z-index: 2;
  transform: translateX(-50%); /* Center horizontally */
}

.boat {
  position: absolute;
  bottom: 25vh; /* Adjust the value to position the boat as needed */
  left: 20vw; /* Adjust the value to position the boat as needed */
  width: 34vw; /* Set width as a percentage of the viewport width */
  height:15vw;
  z-index: 3;
}
</style>
