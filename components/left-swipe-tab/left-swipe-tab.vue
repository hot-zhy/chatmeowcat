<template>
	<!-- 主体部分 -->
	<view class="main">
		<!-- 左侧选项区 -->
		<swiper class="left" :duration="500" vertical :display-multiple-items="6" style="height: 700rpx;"
			 :current="current" >
			<swiper-item class="nav-item" :class="{'ac':active == index}" v-for="(item,index) in tabData" :key="item.name" :item-id="item.id">
				<view @click="onNav(item,index)">
					{{item.name}}
				</view>
			</swiper-item>
		</swiper>
		<!-- 右侧内容区 -->
		<scroll-view class="right" scroll-y scroll-with-animation enable-back-to-top :scroll-top="scrolltop"
			:style="'height:'+height+'px'">
			<view class="goods-item" v-for="(item,index) in tabData" :key="index"
			style="background-color: #F7F8F9;">
				<text style="padding-left: 10rpx;">{{item.title[0]}}</text>
				<text style="font-family:SimHei;font-weight:bold;padding-left: 10rpx;">{{item.title[1]}}</text>
				<u-divider :text="item.name" textPosition="left" textColor="#000"></u-divider>
				<view class="d-flex a-center j-sb mx-3 flex-wrap">
					<view v-for="i in item.goods" :key="i" style="background-color: antiquewhite;border-radius: 30rpx;margin-bottom: 20rpx;" class="py-2 pl-2 pr-3">
						<image @click="exchange" class="image" :src="i.img" />
						<view class="d-flex a-center j-center">
							<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/fish.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
							<view class="text-center ml-1">{{i.price}}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<wyb-modal
		  ref="modal"
		  :show-title="false"
		  cancel-text="关闭"
		  confirm-text="好的"
		  :custom="true"
		  :height="500"
		  @confirm="onConfirmClick"
		>
		  <view class="">
		    <view class="font-lg font-weight mb-4 mt-4 text-center mx-4"
		      >确定要兑换它吗？</view
		    >
			<view class="d-flex a-center j-center">
				<image src="https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/play_ball.png" style="width: 200rpx;height: 200rpx;"></image>
			</view>
		    <view class="text-center font-md mx-5 mt-2" style="line-height: 1.5"
		      >花费为1小鱼干哦~</view
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
		name: 'left-swipe-tab',
		props:{
			tabData:{
				type:Array,
				default: () => []
			},
			topheight:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				arr:[],
				scrolltop:0,
				active: 0,
				height:'',
				navCount:0,
				navScroll:'',
				current:0,
			}
		},
		created() {
			this._ini();
		},
		methods:{
			onConfirmClick(){
				uni.showToast({
					title:'兑换成功',
					icon:'none'
				})
			},
			exchange(){
				this.$refs.modal.showModal() // 显示
			},
			onNav(item,index){
				// 当前点击的选项
				this.active = index;
				// 当前点击的选项的对应的产品的高度
				this.scrolltop = this.arr[index];
				// console.log('当前高度:',this.arr[index]);
			},
			_ini() {
				setTimeout(()=>{
					this.$nextTick(()=>{
						// 若是上面需要增加搜索框等其他组件需要把他的高度获取出来 这样才能计算出我们分类的高度
						const wid = uni.getSystemInfoSync()
						// console.log('可使用窗口高度:',wid.windowHeight);
						// console.log('顶部组件this.topheight:',this.topheight);
						this.height = wid.windowHeight - this.topheight;
						// console.log('选项导航高度:',this.height);
						this.navCount = Math.round(this.height / 50 );
						// 获取每个分类的高度
						uni.createSelectorQuery().in(this).selectAll('.goods-item').boundingClientRect((rects) => {
							// console.log('rects:',JSON.stringify(rects));
							rects.forEach((rect) => {
								// console.log('rect.top:',rect.top);
								this.arr.push(rect.top - rects[0].top);
							})
						}).exec()
					})
				},100)
			}
		}
	}
</script>
<style lang="scss" scoped>
	// 左侧导航背景颜色
	$leftbackground:#F7F8F9;
	//左侧导航文字颜色
	$leftcolor:#505660;
	//左侧选中背景
	$leftacbg:antiquewhite;
	//左侧选中文字颜色
	$leftacclo:black;
	////////////////////////////
	.main{
		background-color: #F7F8F9;
		display: flex;
		.left{
			width: 30%;
			background-color: $leftbackground;
			.nav-item {
				// height: 200%;
				line-height: 104rpx;
				font-size: 28rpx;
				color: $leftcolor;
				text-align: center;
			}
			.ac {
				color: $leftacclo;
				font-size: 30rpx;
				background: $leftacbg;
			}
		}
		.right{
			.goods-item{
				margin-bottom: 20rpx;
				padding-top: 20rpx;
				background-color: #fff;
				.image {
					margin: 0 5%;
					width: 200rpx;
					height: 200rpx;
					border-radius: 20rpx;
					margin-bottom: 5rpx;
				}
			}
		}
	}
</style>

