<template>
	<view>
		<view :style="{'height':1 + 'rpx'}"></view>
		<view class="main">
			<view class="main_btn" @click="btn">退出登录</view>
			<view class="main_btn" @click="btn2">注销账号</view>
		</view>
		<view class="showt" v-if="fase">
			<view class="showt_box">
				<view class="showt_title pdg">确定要退出登录吗？</view>
				<view class="showt_btn">
					<view class="showt_btnl" @click="on">取消</view>
					<view class="showt_btnr" @click="yes">確定</view>
				</view>
			</view>
		</view>
		<view class="showt" v-if="fase2">
			<view class="showt_box">
				<view class="showt_title pdg">注销账号后您的账号及账号的所有内容都将消失，不能再找回，请谨慎操作。您确定还要注销账号吗？</view>
				<view class="showt_btn">
					<view class="showt_btnl" @click="on2">取消</view>
					<view class="showt_btnr" @click="yes2">確定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that;
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	export default{
		data(){
			return{
				statusBarHeight: '',
				fase:false,
				token:'',
				fase2:false
			}
		},
		onLoad() {
			that = this;
			uni.getSystemInfo({
				success(e) {
					that.statusBarHeight = e.statusBarHeight;
				}
			})
			uni.getStorage({
				key: 'token',
				success: function (res) {
					that.token = res.data;
				},
				fail() {
					that.token = '';
				}
			});
		},
		methods:{
			back(){
				uni.navigateBack({
					
				})
			},
			on(){
				that.fase = false;
			},
			on2(){
				that.fase2 = false;
			},
			async yes(){
				that.fase = false;
				await mutations.logout()
				uni.removeStorage({
					key: 'token'
				});
			},
			yes2(){
				that.fase2 = false;
				uniCloud.callFunction({
					name: 'cloude'
				}).then((res) => {
					uni.showToast({
						title: '注销成功',
						duration: 3000
					});
					uni.removeStorage({
						key: 'token'
					});
					uni.redirectTo({
						url:"/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
					})
				}).catch((err) => {
					console.error(err)
				})
			},
			btn(){
				that.fase = true;
			},
			btn2(){
				that.fase2 = true;
			}
		}
	}
</script>

<style>
	@import '../../components/css/set.css';
</style>

