<template>
	<view class="msg-item" v-if="!msg.isDelete">
		<view class="create_time-box" :class="{'reverse-time':!msg.isAi}">
			<uni-dateformat class="create_time" :date="msg.create_time" format="MM/dd hh:mm:ss"></uni-dateformat>
		</view>
		<view :class="{reverse:!msg.isAi}">
			<view class="content">
				<view v-if="msg.isAi" class="rich-text-box" :class="{'show-cursor':showCursor}" ref="rich-text-box">
					<rich-text v-if="nodes&&nodes.length" space="nbsp" :nodes="nodes" :user-select='true'
						@itemclick="trOnclick"></rich-text>
				</view>
				<view class="content-user" v-else>{{msgContent}}</view>
				<view class="menu-box" :class='{"menu-box-ai":msg.isAi}'>
					<!-- <uni-icons v-if="isLastMsg && msg.isAi" title="换一个答案" @click="changeAnswer" color="#ccc"
						class="change-answer" type="reload" size="22"></uni-icons> -->
					<view @click="copy" title="复制" class="copy-icon">
						<view class="copy-icon-a"></view>
						<view class="copy-icon-b"></view>
					</view>
					<!-- <uni-icons class="remove-msg" @click="removeMsg" type="trash" size="20" color="#ccc"></uni-icons> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入markdown-it库
	import MarkdownIt from '../../lib/markdown-it.min.js'

	// hljs是由 Highlight.js 经兼容性修改后的文件，请勿直接升级。否则会造成uni-app-vue3-Android下有兼容问题
	import hljs from '../../lib/highlight/highlight-uni.min.js'

	// 引入html-parser.js库
	import parseHtml from '../../lib/html-parser.js'


	// 为复制代码功能保留代码内容
	let codeDataList = []

	// 初始化 MarkdownIt库
	const markdownIt = MarkdownIt({
		// 在源码中启用 HTML 标签
		html: true,
		// 如果结果以 <pre ... 开头，内部包装器则会跳过。
		highlight: function(str, lang) {
			// if (lang && hljs.getLanguage(lang)) {
			// 	console.error('lang', lang)
			// 	try {
			// 		return '<pre class="hljs" style="padding: 5px 8px;margin: 5px 0;overflow: auto;display: block;"><code>' +
			// 			hljs.highlight('lang', str, true).value +
			// 			'</code></pre>';
			// 	} catch (__) {}
			// }
			// 经过highlight.js处理后的html
			let preCode = ""
			try {
				preCode = hljs.highlightAuto(str).value
			} catch (err) {
				// console.log('err',err);
				preCode = markdownIt.utils.escapeHtml(str);
			}


			// 以换行进行分割
			const lines = preCode.split(/\n/).slice(0, -1)
			// 添加自定义行号
			let html = lines.map((item, index) => {
				// 去掉空行
				if (item == '') {
					return ''
				}
				return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item +
					'</li>'
			}).join('')
			html = '<ol style="padding: 0px 30px;">' + html + '</ol>'

			// 代码复制功能
			codeDataList.push(str)
			let htmlCode =
				`<div style="background:#0d1117;margin:5px 0;color: #888;padding:5px 0;border-radius: 5px;">`
			// #ifndef MP-WEIXIN
			htmlCode += `<div style="text-align: end;font-size: 12px;">`
			htmlCode +=
				`${lang}<a class="copy-btn" code-data-index="${codeDataList.length - 1}" style="cursor: pointer;"> 复制代码 </a>`
			htmlCode += `</div>`
			// #endif
			htmlCode +=
				`<pre class="hljs" style="padding:8px;overflow: auto;display: block;border-radius: 5px;font-size:13px"><code>${html}</code></pre>`;
			htmlCode += '</div>'
			return htmlCode
		}
	})

	export default {
		name: "uni-ai-msg",
		data() {
			return {
				showMoreMenu: false
			};
		},
		mounted() {},
		created() {},
		props: {
			// 是否显示鼠标闪烁的效果
			showCursor: {
				type: [Boolean, Number],
				default () {
					return false
				}
			},
			isLastMsg: {
				type: Boolean,
				default () {
					return false
				}
			},
			msg: {
				type: Object,
				default () {
					return {
						content: "",
						isDelete: false
					}
				}
			},
		},
		computed: {
			msgContent() {
				return this.msg.content
			},
			nodes() {
				if (!this.msgContent) {
					return //处理特殊情况，比如网络异常导致的响应的 content 的值为空
				}
				let htmlString = ''
				// 修改转换结果的htmlString值 用于正确给界面增加鼠标闪烁的效果
				// 判断markdown中代码块标识符的数量是否为偶数
				if (this.msgContent.split("```").length % 2) {
					let msgContent = this.msgContent
					if (msgContent[msgContent.length - 1] != '\n') {
						msgContent += '\n'
					}
					msgContent += ' <span class="cursor">|</span>'
					htmlString = markdownIt.render(msgContent);
				} else {
					htmlString = markdownIt.render(this.msgContent) + ' \n <span class="cursor">|</span>';
				}

				// #ifndef APP-NVUE
				return htmlString
				// #endif

				// nvue模式下将htmlString转成htmlArray，其他情况rich-text内部转
				// 注：本示例项目还没使用nvue编译

				// #ifdef APP-NVUE
				return parseHtml(htmlString)
				// #endif
			}
		},
		methods: {

			// 复制文本内容到系统剪切板
			copy() {
				uni.setClipboardData({
					data: this.msgContent,
					showToast: false,
					success() {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						});
					}
				})
				// this.showMoreMenu = false
			},
			// 重新获取回答 (已禁用)
			changeAnswer() {
				this.$emit('changeAnswer')
			},
			// 删除消息 (已禁用)
			removeMsg() {
				this.$emit('removeMsg')
				this.showMoreMenu = false
			},
			// 代码片段复制 (不支持小程序)
			trOnclick(e) {
				console.log(e);
				let {
					attrs
				} = e.detail.node
				console.log({
					attrs
				});
				let {
					"code-data-index": codeDataIndex,
					"class": className
				} = attrs
				if (className == 'copy-btn') {
					// console.log('codeDataList[codeDataIndex]',codeDataList[codeDataIndex]);
					uni.setClipboardData({
						data: codeDataList[codeDataIndex],
						showToast: false,
						success() {
							uni.showToast({
								title: '复制成功',
								icon: 'none'
							});
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	view {
		box-sizing: border-box;
	}

	.msg-item {
		position: relative;
		width: 750rpx;
		display: flex;
		flex-direction: column;
		padding: 0 16rpx;
		padding-bottom: 15px;
	}

	.create_time-box {
		margin-top: 15px;

		.create_time {
			font-size: 12px;
			padding: 5px 0;
			padding-top: 0;
			color: #aaa;
		}
	}

	.reverse-time {
		display: flex;
		text-align: right;
		justify-content: flex-end;
	}

	.content {
		display: flex;
		position: relative;
		max-width: calc(100% - 80rpx);
		word-break: break-all;
		user-select: text;
		cursor: text;
		background-color: #FFF;
		border-radius: 0px 8px 8px 8px;
		padding: 16rpx 20rpx;
		flex-direction: column;
		color: #333333;
		font-size: 32rpx;

		.content-user {
			 white-space: pre-wrap;
			word-wrap: break-word;
			word-break: break-all;
		}

		::-webkit-scrollbar {
			display: none !important;
		}

	}

	.menu-box {
		display: flex;
		position: absolute;
		left: -22px;
		bottom: 0;
		width: 20px;
		flex-direction: column;
		height: 60px;
		justify-content: flex-end;
	}

	.menu-box-ai {
		left: auto;
		right: -22px;
	}

	.change-answer {
		margin-bottom: 5px;
		position: relative;
		transform: rotate(90deg);
	}

	.copy-icon {
		position: relative;
		height: 25px;
		width: 20px;
	}

	.copy-icon-a,
	.copy-icon-b {
		position: absolute;
		border: 1.5px solid #d4d4d4;
		width: 10px;
		height: 12px;
		background-color: #FFF;
		left: 3px;
		top: 4px;
		border-radius: 3px;
	}

	.copy-icon-b {
		top: 8px;
		left: 6px;
	}

	.copy-icon:hover .copy-icon-a,
	.copy-icon:hover .copy-icon-b,
	{
	border-color: #bbb;
	}

	.content ::v-deep rich-text {
		max-width: 100%;
		overflow: auto;
	}

	code .l:before {
		color: #516363;
		position: absolute;
		left: 15px;
		content: counter(step);
		counter-increment: step;
	}

	.reverse {
		display: flex;
		flex-direction: row-reverse;
	}

	.reverse .content {
		border-radius: 5px 0px 5px 5px;
		background: #0396FF;
		color: #ffffff;
	}

	.reverse-align {
		align-items: flex-end;
	}

	@import "./uni-ai-msg.scss";
</style>