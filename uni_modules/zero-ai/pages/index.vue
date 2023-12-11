<template>
	<!-- #ifdef H5 -->
	<view v-if="isWidescreen" class="zero-chat-box">
		<!-- #endif -->
		<view class="container">
			<text class="noData" v-if="msgList.length === 0">没有对话记录</text>
			<scroll-view :scroll-into-view="scrollIntoView" scroll-y="true" class="msg-list" :enable-flex="true">
				<uni-ai-msg ref="msg" v-for="(msg,index) in msgList" :key="index" :msg="msg"
					@changeAnswer="changeAnswer"
					:show-cursor="index == msgList.length - 1 && msgList.length%2 === 0 && sseIndex"
					:isLastMsg="index == msgList.length - 1" @removeMsg="removeMsg(index)"></uni-ai-msg>
				<template v-if="msgList.length%2 !== 0">
					<view v-if="requestState == -100" class="retries-box">
						<text>消息发送失败</text>
						<uni-icons @click="send" color="#d22" type="refresh-filled" class="retries-icon"></uni-icons>
					</view>
					<view class="tip-ai-ing" v-else-if="msgList.length">
						<text>小猫咪正在思考中...</text>
					</view>
				</template>
				<view @click="closeSseChannel" class="stop-responding" v-if="sseIndex"> ▣ 停止响应</view>
				<view id="last-msg-item" style="height: 1px;"></view>
			</scroll-view>

			<view class="foot-box" :style="{'padding-bottom':footBoxPaddingBottom}">
				<view class="foot-box-content">
					<!-- #ifndef H5 -->
					<view class="menu">
						<uni-icons class="menu-item" @click="showHistory" type="settings" size="24"
							color="#0396FF"></uni-icons>
					</view>
					<!-- #endif -->
					<view class="textarea-box">
						<textarea v-model="content" :cursor-spacing="15" class="textarea" :auto-height="!isWidescreen"
							placeholder="请输入要发给小猫咪的内容" :maxlength="-1" :adjust-position="false"
							:disable-default-padding="false" placeholder-class="input-placeholder"></textarea>
					</view>
					<view class="send-btn-box" :title="(msgList.length && msgList.length%2 !== 0) ? 'ai正在回复中不能发送':''">
						<!-- #ifdef H5 -->
						<text v-if="isWidescreen" class="send-btn-tip">↵ 发送 / shift + ↵ 换行</text>
						<!-- #endif -->
						<button @click="beforeSend" :disabled="inputBoxDisabled || !content" class="send"
							:class="{'send-disabled':inputBoxDisabled || !content}">
							<uni-icons type="paperplane" size="28" color='#ffffff'></uni-icons>
						</button>
					</view>
				</view>
			</view>

			<!-- #ifdef H5 -->
		</view>
		<!-- #endif -->
		<!-- // 聊天弹窗 -->
		<!-- #ifndef H5 -->
		<uni-popup ref="history" type='left' background-color="#fff">
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="history-pc">
				<!-- #endif -->

				<view class="history-content" :style="{height:popupHeight}">
					<view class="history-create" @click="handleNewOne">
						<uni-icons @click="showHistory" type="plusempty" size="20" color="#1aad19"></uni-icons>
						新建聊天
					</view>
					<view class="provider">
						<view>服务商:</view>
						<view v-for="(item,index) in providerList" :key="index" class="provider-item"
							:class="{ 'provider-selected': item.value === currentProvider }"
							@click="handleChangeProvider(item.value)">
							{{item.text}}
						</view>
					</view>
					<view class="history-list">

						<view v-for="(item,index) in historyList" :key="index" class="history-item"
							:class="{ 'history-selected': index === currentMsgIndex }"
							@click="handleSelectHistory(index)">
							<view class="history-title">{{item.title}}</view>

							<view class="history-icons" @click.stop>
								<uni-icons @click="handleRename(index)" class="icon" type="compose" color="#333"
									size="22"></uni-icons>
								<uni-icons @click="handleClearHistory(index)" class="icon" type="close" color="#333"
									size="22"></uni-icons>
							</view>
						</view>
					</view>
				</view>
				<!-- #ifndef H5 -->
		</uni-popup>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<zero-privacy :onNeed="false"></zero-privacy>
		<!-- #endif -->
	</view>
	<!-- #ifdef H5 -->
	</view>
	<!-- #endif -->
</template>

<script>
	import zeroai from '../js_sdk/zeroai.js';
	export default {
		mixins: [zeroai],
	}
</script>
<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	page {
		height: 100%;
		width: 100%;
	}


	.stop-responding {
		display: flex;
		font-size: 14px;
		border-radius: 3px;
		margin-bottom: 15px;
		background-color: #f0b00a;
		color: #FFF;
		width: 90px;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		justify-content: center;
		margin-bottom: 15px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.stop-responding:hover {
		box-shadow: 0 0 10px #aaa;
	}

	.container {
		height: 100%;
		background-color: #FAFAFA;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// border: 1px solid blue;
	}

	.foot-box {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		padding: 10px 0px;
		background-color: #FFF;
	}

	.foot-box-content {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.textarea-box {
		padding: 8px 10px;
		background-color: #f9f9f9;
		border-radius: 5px;
	}

	.textarea-box .textarea {
		max-height: 120px;
		font-size: 14px;
		/* #ifndef APP-NVUE */
		overflow: auto;
		/* #endif */
		width: 450rpx;
		font-size: 14px;
	}

	/* #ifdef H5 */
	/*隐藏滚动条*/
	.textarea-box .textarea::-webkit-scrollbar {
		width: 0;
	}

	/* #endif */

	.input-placeholder {
		color: #bbb;
		line-height: 18px;
	}

	.trash,
	.send {
		width: 50px;
		height: 30px;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}

	.trash {
		width: 30rpx;
		margin-left: 10rpx;
	}

	.menu {
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		margin-left: 20rpx;
	}

	.menu-item {
		width: 30rpx;
		// margin: 0 10rpx;
	}

	.send {
		width: 60px;
		height: 34px;
		border-radius: 30rpx;
		color: #FFF;
		display: flex;
		margin: 0;
		padding: 0;
		font-size: 14px;
		margin-right: 20rpx;
		background-color: #0396FF;
		border: none;
	}

	/* #ifndef H5 */
	.send {
		width: 110rpx;
		height: 60rpx;
		border-radius: 30rpx;
		margin: 0;
		padding: 0;
		// font-size: 14px;
		margin-right: 20rpx;
		color: #FFF;
		background-color: #0396FF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	.send::after {
		display: none;
	}

	/* #endif */


	.msg-list {
		height: 0; //不可省略，先设置为0 再由flex: 1;撑开才是一个滚动容器
		flex: 1;
		width: 750rpx;
		// border: 1px solid red;
	}

	.noData {
		margin-top: 15px;
		text-align: center;
		width: 750rpx;
		color: #aaa;
		font-size: 12px;
		justify-content: center;
	}

	.tip-ai-ing {
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 14px;
		color: #919396;
		padding: 15px 0;
	}

	.uni-link {
		margin-left: 5px;
		line-height: 20px;
	}

	/* #ifdef H5 */
	@media screen and (min-width:650px) {
		.foot-box {
			border-top: solid 1px #dde0e2;
		}

		.container,
		.container * {
			max-width: 950px;
		}

		.container {
			box-shadow: 0 0 5px #e0e1e7;
			height: calc(100vh - 88px);
			margin: 0 auto;
			border-radius: 10px;
			overflow: hidden;
			background-color: #FAFAFA;
		}

		page {
			background-color: #efefef;
		}

		.container .header {
			display: flex;
			height: 44px;
			line-height: 44px;
			border-bottom: 1px solid #F0F0F0;
			width: 100vw;
			justify-content: center;
			font-weight: 500;
		}

		.content {
			background-color: #f9f9f9;
			position: relative;
			max-width: 90%;
		}

		// .copy {
		// 	color: #888888;
		// 	position: absolute;
		// 	right: 8px;
		// 	top: 8px;
		// 	font-size: 12px;
		// 	cursor:pointer;
		// }
		// .copy :hover{
		// 	color: #4b9e5f;
		// }

		.foot-box,
		.foot-box-content,
		.msg-list,
		.msg-item,
		// .create_time,
		.noData,
		.textarea-box,
		.textarea,
		textarea-box {
			width: 100% !important;
		}

		.textarea-box,
		.textarea,
		textarea,
		textarea-box {
			height: 120px;
		}

		.foot-box,
		.textarea-box {
			background-color: #FFF;
		}

		.foot-box-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-end;
			padding-bottom: 0;
		}

		.pc-menu {
			display: flex;
			padding: 0 10px;
		}

		.pc-menu-item {
			height: 20px;
			justify-content: center;
			align-items: center;
			align-content: center;
			display: flex;
			margin-right: 10px;
			cursor: pointer;
		}

		.pc-trash {
			opacity: 0.8;
		}

		.pc-trash image {
			height: 15px;
		}


		.textarea-box,
		.textarea-box * {
			// border: 1px solid #000;
		}

		.send-btn-box {
			display: flex;
			align-items: baseline;
		}

		.send-btn-box .send-btn-tip {
			color: #919396;
			margin-right: 8px;
			font-size: 12px;
			line-height: 28px;
		}
	}

	/* #endif */
	.retries-box {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		color: #d2071b;
	}

	.retries-icon {
		margin-top: 1px;
		margin-left: 5px;
	}

	.history-content {
		width: 80vw;
		height: 100%;
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		padding-bottom: calc(env(safe-area-inset-bottom) + 40rpx);

		.history-create {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #1aad19;
			border: 1px solid #1aad19;
			padding: 15rpx 20rpx;
			margin: 10rpx 20rpx;
			border-radius: 10rpx;
		}

		.provider {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 10rpx 20rpx;
			padding: 20rpx 20rpx;
			border-radius: 10rpx;
			background-color: #f8f8f8;

			.provider-item {
				// width: 30%;
				flex: 1;
				text-align: center;
				color: #333333;
				padding: 10rpx 10rpx;
				border-radius: 50rpx;
				margin: 0 15rpx;
				background-color: #ffffff;
			}

			.provider-selected {
				// background-color: #f0ad4e33;
				border: 1px solid #f0ad4e;
				color: #f0ad4e;
			}
		}

		.history-list {
			padding: 0 20rpx;
			height: 0; //不可省略，先设置为0 再由flex: 1;撑开才是一个滚动容器
			flex: 1;
			overflow-y: auto;
		}

		.history-item {
			margin: 20rpx 0;
			color: #333333;
			border: 1px solid #e5e7eb;
			padding: 15rpx 20rpx;
			border-radius: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.history-title {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				word-break: break-all;
				white-space: nowrap;

			}

			.history-icons {
				.icon {
					margin-left: 15rpx;
				}
			}
		}

		.history-selected {
			background-color: #0396FF33;
			border: 1px solid #0396FF;
			color: #0396FF;

			.history-icons {
				text {
					color: #0396FF !important;
				}
			}
		}
	}

	.zero-chat-box {
		display: flex;
		flex-direction: row-reverse;
		justify-content: center;
		align-items: center;

		.container {
			flex: 1;
			margin: 0;
		}

		.history-pc {
			background-color: #fff;
			box-shadow: 0 0 5px #e0e1e7;
			margin-right: 5px;
			height: calc(100vh - 88px);
			border-radius: 5px;
			overflow: hidden;

			.history-content {
				width: 400px;
				padding-bottom: 0;

				.history-list {}
			}
		}
	}
</style>