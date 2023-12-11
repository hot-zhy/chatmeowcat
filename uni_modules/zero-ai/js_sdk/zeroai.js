// 导入uniCloud云对象task模块
import uniCoTask from '../common/unicloud-co-task.js';
import SliceMsgToLastMsg from '../common/SliceMsgToLastMsg.js';
let uniCoTaskList = []
uniCoTaskList.clear = function() {
	uniCoTaskList.forEach(task => task.abort())
	uniCoTaskList.slice(0, uniCoTaskList.length)
}

// 初始化sse通道
let sseChannel = false;

// 键盘的shift键是否被按下
let shiftKeyPressed = false
import uniAiMsg from '../components/uni-ai-msg/uni-ai-msg.vue'

export default {
	components: {
		uniAiMsg
	},
	data() {
		return {
			// 使聊天窗口滚动到指定元素id的值
			scrollIntoView: "",
			// 消息列表数据
			msgList: [],
			// 通讯请求状态
			requestState: 0, //0发送中 100发送成功 -100发送失败
			// 本地对话是否因积分不足而终止
			insufficientScore: false,
			// 输入框的消息内容
			content: "",
			// 记录流式响应次数
			sseIndex: 0,
			// 是否启用流式响应模式
			enableStream: true,
			// 当前屏幕是否为宽屏
			isWidescreen: false,
			llmModel: false,
			keyboardHeight: 0,
			// 历史消息列表
			historyList: [],
			// 当前选中的对话窗口
			currentMsgIndex: 0,
			providerList: [{
					text: 'azure',
					value: 'azure'
				},
				{
					text: 'minimax',
					value: 'minimax'
				}
			],
			// 选择服务商
			currentProvider: 'azure',
			// 异形屏底部安全距离
			safeBottom: 0,
			popupHeight: '100%',
		}
	},
	computed: {
		inputBoxDisabled() {
			if (this.sseIndex !== 0) {
				return true
			}
			return !!(this.msgList.length && this.msgList.length % 2 !== 0)
		},
		NODE_ENV() {
			return process.env.NODE_ENV
		},
		footBoxPaddingBottom() {
			return (this.keyboardHeight || this.safeBottom) + 'px'
		}
	},
	watch: {
		historyList: {
			handler(historyList) {
				uni.setStorage({
					"key": "zero-ai-chat",
					"data": historyList
				})
			},
			deep: true
		},
		insufficientScore(insufficientScore) {
			uni.setStorage({
				"key": "zero-ai-chat-insufficientScore",
				"data": insufficientScore
			})
		},
	},
	created() {

		this.currentProvider = uni.getStorageSync('zero-ai-provider') || 'azure'

		const arr = [{
			title: `New Chat`,
			msgList: [],
			provider: this.currentProvider
		}]
		this.historyList = uni.getStorageSync('zero-ai-chat') || arr
		this.currentMsgIndex = uni.getStorageSync('currentMsgIndex') || 0
		this.msgList = this.historyList[this.currentMsgIndex].msgList
		this.insufficientScore = uni.getStorageSync('zero-ai-chat-insufficientScore') || false
	},

	beforeMount() {
		
		// #ifdef H5
		uni.createMediaQueryObserver(this).observe({
			minWidth: 650,
		}, matches => {
			this.isWidescreen = matches;
		})
		// #endif
	},
	async mounted() {
		
		// #ifndef H5
		const sys = uni.getSystemInfoSync()
		this.safeBottom = sys.safeAreaInsets.bottom || 10
		this.popupHeight = sys.windowHeight + 'px'
		// #endif


		// 如果上一次对话中 最后一条消息ai未回复。添加错误处理

		let length = this.msgList.length
		if (length) {
			let lastMsg = this.msgList[length - 1]
			if (!lastMsg.isAi) {
				this.msgList.push({
					isAi: true,
					content: 'Something went wrong, please try again later.',
					create_time: Date.now()
				})
			}
		}

		this.$nextTick(() => {
			this.showLastMsg()
		})

		// #ifdef H5
		
		let adjunctKeydown = false
		const textareaDom = document.querySelector('.textarea-box textarea');
		if (textareaDom) {
			textareaDom.onkeydown = e => {
				if ([16, 17, 18, 93].includes(e.keyCode)) {
					adjunctKeydown = true;
				}
				if (e.keyCode == 13 && !adjunctKeydown) {
					e.preventDefault()
					setTimeout(() => {
						this.beforeSend();
					}, 300)
				}
			};
			textareaDom.onkeyup = e => {
				if ([16, 17, 18, 93].includes(e.keyCode)) {
					adjunctKeydown = false;
				}
			};

			let initialInnerHeight = window.innerHeight;
			if (uni.getSystemInfoSync().platform == "ios") {
				textareaDom.addEventListener('focus', () => {
					let interval = setInterval(function() {
						if (window.innerHeight !== initialInnerHeight) {
							clearInterval(interval)
							document.querySelector('.container').style.height = window
								.innerHeight + 'px'
							window.scrollTo(0, 0);
							this.showLastMsg()
						}
					}, 1);
				})
				textareaDom.addEventListener('blur', () => {
					document.querySelector('.container').style.height = initialInnerHeight + 'px'
				})
			} else {
				window.addEventListener('resize', (e) => {
					this.showLastMsg()
				})
			}
		}
		// #endif


		// #ifndef H5
		uni.onKeyboardHeightChange(e => {
			this.keyboardHeight = e.height
			this.$nextTick(() => {
				this.showLastMsg()
			})
		})
		// #endif
	},
	methods: {
		handleChangeProvider(val) {
			this.currentProvider = val
			uni.setStorage({
				"key": "zero-ai-provider",
				"data": this.currentProvider
			})
		},
		handleNewOne() {
			const obj = {
				title: `New Chat`,
				msgList: [],
				provider: 'azure'
			}
			this.historyList.unshift(obj)
			this.currentMsgIndex = 0
			this.msgList = this.historyList[this.currentMsgIndex].msgList
			// #ifndef H5
			this.closeHistory()
			// #endif
		},
		handleSelectHistory(index) {
			this.currentMsgIndex = index
			this.msgList = this.historyList[this.currentMsgIndex].msgList
			// #ifndef H5
			this.closeHistory()
			// #endif
		},
		handleClearHistory(index) {
			uni.showModal({
				title: "确认要删除选中对话？",
				content: '本操作不可撤销',
				complete: (e) => {
					if (e.confirm) {
						if (index === this.currentMsgIndex) {
							this.closeSseChannel()
							this.currentMsgIndex = 0
						}
						this.historyList.splice(index, 1)
						if (!this.historyList.length) {
							this.handleNewOne()
						}
						this.msgList = this.historyList[this.currentMsgIndex].msgList
					}
				}
			});

		},
		handleRename(index) {
			const title = this.historyList[index].title
			uni.showModal({
				title: '修改对话主题',
				editable: true,
				content: title,
				placeholderText: '请输入名称',
				success: (res) => {
					if (res.confirm) {
						this.historyList[index].title = res.content
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		showHistory() {
			this.$refs.history.open()
		},
		closeHistory() {
			this.$refs.history.close()
		},
		async checkIsOpenPush() {
			try {
				await uni.getPushClientId()
				this.checkIsOpenPush = () => {}
			} catch (err) {
				this.enableStream = false
			}
		},
		updateLastMsg(param) {
			let length = this.msgList.length
			if (length === 0) {
				return
			}
			let lastMsg = this.msgList[length - 1]

			if (typeof param == 'function') {
				let callback = param;
				callback(lastMsg)
			} else {
				const [data, cover = false] = arguments
				if (cover) {
					lastMsg = data
				} else {
					lastMsg = Object.assign(lastMsg, data)
				}
			}
			this.msgList.splice(length - 1, 1, lastMsg)
		},

		// 换一个答案
		async changeAnswer() {
			if (this.sseIndex) {
				this.closeSseChannel()
			}
			this.msgList.pop()
			this.updateLastMsg({
				illegal: false
			})
			this.insufficientScore = false
			this.send()
		},
		removeMsg(index) {
			if (this.msgList[index].isAi) {
				index -= 1
			}

			if (this.sseIndex && index == this.msgList.length - 2) {
				this.closeSseChannel()
			}

			this.msgList.splice(index, 2)
		},
		async beforeSend() {
			if (this.inputBoxDisabled) {
				return uni.showToast({
					title: 'ai正在回复中不能发送',
					icon: 'none'
				});
			}
			if (!this.content) {
				return uni.showToast({
					title: '内容不能为空',
					icon: 'none'
				});
			}

			this.msgList.push({
				isAi: false,
				content: this.content,
				create_time: Date.now()
			})

			this.showLastMsg()
			this.$nextTick(() => {
				this.content = ''
			})
			this.send() // 发送消息
		},
		async send() {
			this.requestState = 0
			uniCoTaskList.clear()
			if (this.afterChatCompletion && this.afterChatCompletion.clear) this.afterChatCompletion.clear()

			let messages = []
			let msgs = JSON.parse(JSON.stringify(this.msgList))

			// - 获取上下文的代码【start】-
			// 带总结的消息 index
			let findIndex = [...msgs].reverse().findIndex(item => item.summarize)
			if (findIndex != -1) {
				let aiSummaryIndex = msgs.length - findIndex - 1
				// 将带总结的消息的 内容 更换成 总结
				msgs[aiSummaryIndex].content = msgs[aiSummaryIndex].summarize
				msgs = msgs.splice(aiSummaryIndex)
			} else {
				msgs = msgs.splice(-10)
			}
			msgs = msgs.filter(msg => !msg.illegal)
			// - 获取上下文的代码【end】-

			// 如果：不希望带上上下文；请注释掉 上方：获取上下文的代码【start】-【end】。并添加，代码： msgs = [msgs.pop()]
		
			// 根据数据内容设置角色
			messages = msgs.map(item => {
				let role = "user"
				if (item.isAi) {
					role = item.summarize ? 'system' : 'assistant'
				}
				return {
					content: item.content,
					role
				}
			})

			console.log('send to ai messages:', messages);

			await this.checkIsOpenPush()

			let sseEnd, requestEnd;
			// 判断是否开启了流式响应模式
			if (this.enableStream) {
				// 创建消息通道
				sseChannel = new uniCloud.SSEChannel()

				this.sliceMsgToLastMsg = new SliceMsgToLastMsg(this)
				sseChannel.on('message', (message) => {
					if (this.sseIndex === 0) {
						this.msgList.push({
							isAi: true,
							content: message,
							create_time: Date.now()
						})
					} else {
						this.sliceMsgToLastMsg.addMsg(message)
					}
					this.showLastMsg()
					// 让流式响应计数值递增
					this.sseIndex++
				})

				sseChannel.on('end', (e) => {
					console.log('sse 结束', e)
					this.sliceMsgToLastMsg.t = 0
					if (e && typeof e == 'object' && e.errCode) {
						let setLastAiMsgContent = (content) => {
							if (this.sseIndex === 0) {
								this.msgList.push({
									isAi: true,
									content,
									create_time: Date.now()
								})
							} else {
								this.updateLastMsg(lastMsg => {
									lastMsg.content += content
								})
							}
							this.showLastMsg()
						}
						if (e.errCode == 60004) {
							let length = this.msgList.length
							if (length % 2) {
								this.msgList.push({
									isAi: true,
									content: "内容涉及敏感",
									illegal: true,
									create_time: Date.now()
								})
								length += 1
							}
							this.msgList[length - 2].illegal = true
							this.msgList[length - 1].illegal = true
							this.msgList[length - 1].content = "内容涉及敏感"

						} else {
							setLastAiMsgContent(e.errMsg)
						}
					}
					sseEnd()
				})
				await sseChannel.open(); // 等待通道开启

				(function fnSelf(that) {
					fnSelf.clear = () => {
						if (fnSelf.clear.sse) {
							fnSelf.clear.sse();
						}
						if (fnSelf.clear.request) {
							fnSelf.clear.request();
						}
					}
					Promise.all([
						new Promise((resolve, reject) => {
							sseEnd = resolve;
							fnSelf.clear.sse = reject;
						}),
						new Promise((resolve, reject) => {
							requestEnd = resolve;
							fnSelf.clear.request = reject;
						})
					]).then((e) => {
						sseChannel.close()
						that.sseIndex = 0
					}).catch((err) => {
					})
					that.afterChatCompletion = fnSelf
				})(this)
			}

			let task = uniCoTask({
				coName: "zero-ai",
				funName: "send",
				param: [{
					messages, // 消息列表
					sseChannel, // 消息通道
					provider: this.currentProvider
				}],
				config: {
					customUI: true
				},
				success: res => {
					this.requestState = 100
					if (!res.data) return

					let {
						reply,
						summarize,
						insufficientScore,
						illegal,
						roleNotAllow
					} = res.data

					// 特殊处理 - start
					if (this.enableStream == false && !reply) {
						//服务商检测到AI输出了敏感内容
						illegal = true
						reply = "内容涉及敏感"
					}
					// 特殊处理 - end

					// 非流式模式 && 内容涉及敏感
					if (this.enableStream == false && illegal) {
						console.error('内容涉及敏感');
						this.updateLastMsg({
							// 添加消息涉敏标记
							illegal: true
						})
					}

					// 非流式模式 或者流式模式，但列表还没有数据且已经进入异常的情况下
					if (this.enableStream == false || this.sseIndex == 0 && (illegal ||
							insufficientScore || roleNotAllow)) {
						this.msgList.push({
							create_time: Date.now(),
							isAi: true,
							content: reply,
							illegal
						})
					}

					if (insufficientScore) {
						this.insufficientScore = true
					}
					// 如果回调包含总结的内容，就设置总结
					if (summarize) {
						let index = this.msgList.length - 1;
						if (index % 2) {
							index -= 2
						} else {
							index -= 1
						}
						if (index < 1) {
							index = 1
						}
						let msg = this.msgList[index]
						msg.summarize = summarize
						this.msgList.splice(index, 1, msg)
					}

				},
				complete: e => {
					if (this.enableStream) {
						requestEnd()
					}
					this.$nextTick(() => {
						this.showLastMsg()
					})
				},
				fail: e => {
					console.error(e);
					this.requestState = -100
					this.msgList.push({
						isAi: true,
						content: 'Something went wrong, please try again later.' + JSON.stringify(e.message),
						create_time: Date.now(),
						provider: this.currentProvider
					})

					if (this.enableStream) {
						sseEnd()
					}
				}
			})
			uniCoTaskList.push(task)
		},
		closeSseChannel() {
			if (sseChannel) {
				sseChannel.close()
				sseChannel = false
				this.sliceMsgToLastMsg.end()
			}
			uniCoTaskList.clear()
			this.sseIndex = 0
		},
		showLastMsg() {
			this.$nextTick(() => {
				this.scrollIntoView = "last-msg-item"
				this.$nextTick(() => {
					this.scrollIntoView = ""
				})
			})
		},
		clearAllMsg(e) {
			uni.showModal({
				title: "确认要清空聊天记录？",
				content: '本操作不可撤销',
				complete: (e) => {
					if (e.confirm) {
						this.closeSseChannel()
						this.msgList.splice(0, this.msgList.length);
					}
				}
			});
		}
	}
}