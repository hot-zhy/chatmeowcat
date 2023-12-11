<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/common/common.css';
	page,
	body {
		background-image: url('https://www.toptal.com/designers/subtlepatterns/uploads/sakura.png');
		background-size: cover;
		box-sizing: border-box;
	}

	.pix_box {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10000;
	}

	.one {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.two {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.pdg {
		width: fit-content;
	}

	.a {
		position: relative;
	}

	.a image {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.showt {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.2);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.showt_box {
		width: 520rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.showt_title {
		font-size: 34rpx;
		font-weight: 500;
		color: #333333;
		padding: 60rpx 30rpx;
		text-align: center;
		margin: auto;
	}

	.showt_btn {
		width: 100%;
		height: 88rpx;
		border-top: 1rpx solid rgba(0, 0, 0, 0.12);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.showt_btn view {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		font-weight: 500;
	}

	.showt_btnl {
		color: #999999;
		border-right: 1rpx solid rgba(0, 0, 0, 0.12);
		margin-left: -1rpx;
	}

	.custom {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100000;
	}

	.custom_box {
		width: 520rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
	}

	.custom_title {
		font-size: 34rpx;
		font-weight: 500;
		color: #333333;
		padding: 60rpx 30rpx;
		line-height: 42rpx;
		text-align: center;
	}

	.custom_btn {
		width: 100%;
		height: 88rpx;
		border-top: 1rpx solid rgba(0, 0, 0, 0.12);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.custom_btn view {
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		font-weight: 500;
	}

	.custom_btn_l {
		color: #999999;
		margin-left: -1rpx;
		border-right: 1rpx solid rgba(0, 0, 0, 0.12);
	}

	.custom_btn_r {
		color: #23A0F0;
	}
</style>
