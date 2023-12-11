<template>
	<view>
		<button @click="logout">退出登录</button>
		<button @click="devaste">注销账号</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			devaste(){
				
			},
			logout(){
				uni.showModal({
					title:'确定要退出登录吗',
					confirmText:'确定',
					cancelText:'取消',
					success(res) {
						if(res.confirm){
							uni.setStorageSync('isLogin',false)
							uni.reLaunch({
								url:'/pages/my/my'
							})
						}
					}
				})
				
			}
		}
	}
</script>

<style>

</style>
