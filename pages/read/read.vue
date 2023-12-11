<template>
	<view>
		<uni-nav-bar :fixed="true" :leftIcon="true" status-bar background-color="#FEE2D5" left-text="返回" title="每日一文" @clickLeft="naviback">
		
		</uni-nav-bar>
		<view class="">
			<view class="font-weight mx-3 my-2" style="font-size: 40rpx;">
				生活没有那么奇妙，但有你才会变得美好。
			</view>
			<view class="mx-3" style="text-indent: 1em;">
				<p>我们有时会抱怨世界的不公，也会为忧愁所困扰，那些一个人走过的路和哀叹的夜，总是放大生活中的失落与无助，让人陷入无尽的忧郁黑洞，甚至想要放弃自己的生命。</p>
			</view>
			<view class="mx-3" style="text-indent: 1em;">
				但是，朋友，你知道吗？生活中同样也有一些细小的幸福因子等待你去发现。
			</view>
			<view class="w-100 my-2">
				<image src="http://p1.music.126.net/tXhlx3Nm36-4LE7BhmIfqQ==/109951163382013934.jpg" mode="widthFix" style="width: 100%;"></image>
			</view>
			<view class="text-center">
				✿✿✿
			</view>
			<view class="mx-3" style="text-indent: 1em;">
				有很多日常生活的画面值得纪念：荷叶心沉睡的露珠，火锅突突突冒出的热气，傍晚老爷爷老奶奶在公园散步，车水马龙穿梭而过的光影；
			</view>
			<view class="mx-3" style="text-indent: 1em;">
				有很多美妙空间的味道值得收藏：清晨小雨后泥土的清香，从厨房传来的妈妈牌饭菜香，茶舍温厚的檀香，夏日柠檬水冰镇后的酸甜。
			</view>
			<view class="my-2">
				<image src="http://p1.music.126.net/RsdTG5g-K0ziuw0h0Thgzg==/109951163382093360.jpg?size=400x225&imageView&thumbnail=580x0" mode="widthFix" style="width: 100%;"></image>
			</view>
			<view class="mx-3" style="text-indent: 1em;">
				那些被种种不如意所掩盖的美好，我们都想带你一起去发现。	
			</view>
			<view class="my-2">
				<image src="http://p1.music.126.net/kzRJDOVWVL9J40Jsxu-KLQ==/109951163382027521.jpg" mode="widthFix" style="width: 100%;"></image>
			</view>
			<view class="mx-3" style="text-indent: 1em;">
				我们也许无法100%感受到你的苦衷，但也希望尽我们100%的能力去帮助你，如果你有很多想说的话不知道该对谁倾诉，随时可以对我们的小猫咪敞开心怀，我们的小程序会尽我们所能帮助您。也欢迎你拨打以下热线，会有更多小哥哥小姐姐愿意倾听你的故事。
			</view>
			<view class="mx-3 mt-2" style="font-size: 40rpx;font-weight: 600;">
				各地区心理咨询热线：
			</view>
			<view class="mx-3 my-3 p-2" style="border:solid;border-radius: 30rpx;border-width: 0.2em;border-color: cadetblue;">
				【北京】010-82951332  <br>   【广州】020-81899120<br> 
				
				【深圳】0755-25629459  <br>  【杭州】0571-85029595<br> 
				
				【南京】025-83712977    <br>  【武汉】027-85844666<br> 
				
				【成都】028-87577510   <br>   【重庆】023-65372255<br> 
				
				【青岛】0532-86669120  <br>  【厦门】0592-5395159<br> 
			</view>
			<view>
				<p class="mx-3" style="text-indent: 1em;">如果在这个瞬间你感到失意，期待下个片刻你能够拥抱快乐。</p>
				<br> 
				
				<p class="mx-3" style="text-indent: 1em;">我们期待能够握紧你的手，带你去看世界更绚烂的那一抹光亮。</p>
			</view>
			<view class="w-100 my-2">
				<image src="http://p1.music.126.net/NbMtOk61P20Yzn7oFnZGXA==/109951163382100076.jpg?size=500x290&imageView&thumbnail=580x0" mode="widthFix" style="width: 100%;"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
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

</style>
