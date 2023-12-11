<!--
 * @Description: 自定义 悬浮异形 tabbar 
-->
<template>
	<view class="tqb-tabbar">
		<view class="tqb-tabbar-body">
			<view class="tqb-tabbar-item" v-for="(item, index) in tabBarList" :key="index"
				@click="switchClick(item, index)">
				<view class="tabbar-item-body">
					<view class="tabbar-item-icon">
						<image :src="activeIndex == index ? item.selectedIconPath : item.iconPath"
							style="width: 100rpx; height: 100rpx;"></image>
					</view>
					<view :class="[activeIndex == index ? 'active' : '', 'tab-bar-text']">{{ item.text }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['activeIndex'],
	data() {
		return {
			tabBarList: [{
				pagePath: "/pages/play/play",
				selectedIconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_one.png",
				iconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_one_selected.png",
				text: "玩耍"
			},{
				pagePath: "/pages/index/index",
				selectedIconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_two.png",
				iconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_two_selected.png",
				text: "聊天"
			}, 
			{
				pagePath:"/pages/physho/physho",
				selectedIconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_two.png",
				iconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_two_selected.png",
				text: "心理"
			},
			{
				pagePath: "/pages/my/my",
				selectedIconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_three.png",
				iconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_three_selected.png",
				text: "我的"
			}
			]
		}
	},
	watch: {
		visible: function (d) {
			// todo anything
		}
	},
	methods: {
		switchClick(data, index) {
			if (index == this.activeIndex) {
				return
			}
			uni.switchTab({
				url: data.pagePath
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.tqb-tabbar {
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
}

.tqb-tabbar-body {
	border-radius: 80rpx;
	height: 150rpx;
	display: flex;
	background: linear-gradient(to right, #ffffff, #fdffe0);
	position: fixed;
	bottom: 45rpx;
	width: 704rpx;
	left: 24rpx;
	z-index: 1001;
	padding-top: 8rpx;
	box-shadow: 0px 0px 30rpx 9rpx rgba(13, 6, 0, 0.1);

	.tqb-tabbar-item {
		flex: 1;
		display: flex;
		justify-content: center;
		text-align: center;

		.tabbar-item-body {}

		.tabbar-item-icon {
			display: flex;
			justify-content: center;
		}

		.tab-bar-text {
			color: #999999;
			font-size: 28rpx;
			margin-top: 9rpx;
		}

		.active {
			color: #ce915b;
		}


	}
}


</style>
