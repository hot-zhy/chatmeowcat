
// 引入uni-config-center模块，并创建config对象
const {
	safeRequire,
} = require('./utils')
const createConfig = safeRequire('uni-config-center')
const config = createConfig({
	pluginId: 'zero-ai'
}).config()
// 引入uniCloud.database()方法，并创建db对象
const db = uniCloud.database();
// 创建userscollection对象
const userscollection = db.collection('uni-id-users')
// 引入uni-id-common模块
const uniIdCommon = require('uni-id-common')


module.exports = {
	_before: async function() {
		// 这里是云函数的前置方法，你可以在这里加入你需要逻辑

		// 判断否调用量本云对象的send方法
		if (this.getMethodName() == 'send') {
			
			if (config.assignRole) {
			
				/*先校验token（用户身份令牌）是否有效，并获得用户的_id*/
				// 获取客户端信息
				this.clientInfo = this.getClientInfo()
				// console.log(this.clientInfo);
			
				// 定义uni-id公共模块对象
				this.uniIdCommon = uniIdCommon.createInstance({
					clientInfo: this.clientInfo
				})
				// 校验token（用户身份令牌）是否有效，并获得用户的_id
				let res = await this.uniIdCommon.checkToken(this.clientInfo.uniIdToken)
				if (res.errCode) {
					// 如果token校验出错，则抛出错误
					throw res
				} else {
					// 通过token校验则，拿去用户id
					this.current_uid = res.uid
				}
							
				let userRes = await userscollection.doc(this.current_uid).field({'role':1}).get()
				let role = userRes.data[0].role
				if (!role.includes(config.assignRole)) {
					throw "roleNotAllow"
				}

			}
			// 从配置中心获取是否需要销毁积分
			if (config.spentScore) {

				/*先校验token（用户身份令牌）是否有效，并获得用户的_id*/
				// 获取客户端信息
				this.clientInfo = this.getClientInfo()
				// console.log(this.clientInfo);

				// 定义uni-id公共模块对象
				this.uniIdCommon = uniIdCommon.createInstance({
					clientInfo: this.clientInfo
				})
				// 校验token（用户身份令牌）是否有效，并获得用户的_id
				let res = await this.uniIdCommon.checkToken(this.clientInfo.uniIdToken)
				if (res.errCode) {
					// 如果token校验出错，则抛出错误
					throw res
				} else {
					// 通过token校验则，拿去用户id
					this.current_uid = res.uid
				}
				/* 判断剩余多少积分：拒绝对话、扣除配置的积分数 */
				let score = 0
				let scoreRes = await userscollection.doc(this.current_uid).field({
					'score': 1
				}).get()
				if (scoreRes.data[0] && scoreRes.data[0].score) {
					score = scoreRes.data[0].score
				}
				// 如果积分余额小于与uni-ai对话一次所需消耗的积分数 即 积分不足 则抛出错误提醒客户端
				if (score < config.spentScore) {
					throw "insufficientScore"
				}
				// 扣除对应的积分值
				await userscollection.doc(this.current_uid)
					.update({
						score: db.command.inc(-1 * config.spentScore)
					})
			}
		}
	},
	async _after(error, result) {
		// 打印错误和结果
		// console.log('_after',{error,result}); 
		// 如果有错误
		if (error) {
			// 如果是内容安全检测错误
			if (error.errCode == 60004 || error == "uni-sec-check:illegalData") {
				// 返回一个包含敏感内容提示和标记的响应体
				return {
					"data": {
						"reply": "内容涉及敏感",
						"illegal": true
					},
					"errCode": 0
				}
			}
			// 其他符合响应体规范的错误，直接返回
			else if (error.errCode && error.errMsg) {
				return error
			}
			// 如果是没有用户权限
			else if (error == 'roleNotAllow') {
				// 设置回复内容
				return {
					"data": {
						"reply": config.assignRoleErrorTips|| "当前用户角色没有权限",
						"roleNotAllow": true
					},
					"errCode": 0
				}
			}
			// 如果是积分不足错误
			else if (error == 'insufficientScore') {
				// 设置回复内容
				return {
					"data": {
						"reply": "用户积分不足，请看前往个人中心获取积分,或者联系作者申请vip",
						"insufficientScore": true
					},
					"errCode": 0
				}
			} else {
				// 如果是其他错误
				throw error // 直接抛出异常
			}
		}
		// 返回处理后的结果
		return result
	},
	// 发送消息
	async send({
		// 消息内容
		messages,
		// sse渠道对象
		sseChannel,
		// 服务商
		provider
	}) {
		// 初次调试时，可不从客户端获取数据，直接使用下面写死在云函数里的数据
		// messages =  [{
		// 	role: 'user',
		// 	content: 'uni-app是什么，20个字以内进行说明'
		// }]

		// 校验客户端提交的消息参数是否符合规范
		let res = checkMessages(messages)
		if (res.errCode) {
			throw new Error(res.errMsg)
		}

		// 向uni-ai发送消息
		let promiseTaskList = []
		let promiseTask = new Promise((resolve, reject) => {
			chatCompletion(messages)
				.then((res) => {
					console.log(' 获取到问题的回答，res.reply：', res.reply); //非sse 时才有值，sse 时消息直接发往客户端了
					resolve({
						type: "reply",
						data: res.reply
					});
				})
				.catch((error) => {
					reject(error)
				})
		});
		promiseTaskList.push(promiseTask)

		// 总结 start 如果需要总结可以去掉以下注释
		/**
				// 拿到最后一次对话的消息内容（去掉最后一次，还没得到答案的提问）
				let lastTimeMessages = messages.slice(0, -1)
				// 判断是否需要总结 (根据消息总长度是否大于800)
				if (lastTimeMessages.map(i => i.content).join('').length > 800) {
					// 获取总结
					lastTimeMessages.push({
						"content": "请简要总结上述全部对话",
						"role": "user"
					})
					let promiseTask = new Promise((resolve, reject) => {
						chatCompletion(lastTimeMessages, false).then((res) => {
								console.log('获取到总结，res：', res);
								resolve({
									type: "summarize",
									data: res.reply
								});
							})
							.catch((error) => {
								reject(error)
							})
					});
					promiseTaskList.push(promiseTask)
				}
				**/
		// 总结 end

		let promiseAllRes = await Promise.all(promiseTaskList)
		// console.log('Promise.all promiseRes',promiseAllRes);
		res = {
			data: {},
			errCode: 0
		}
		promiseAllRes.forEach(item => {
			switch (item.type) {
				case 'summarize':
					res.data.summarize = item.data
					break;
				case 'reply':
					res.data.reply = item.data
					break;
				default:
					break;
			}
		})
		return res


		// chatCompletion函数：对话完成
		/**
		 * 校验消息内容是否符合规范
		 * @param {Array} messages - 消息列表
		 * @param {Boolean} stream - 是否启用流式响应
		 * @returns {Promise} - 返回结果
		 */
		function chatCompletion(messages, stream = true) {
			// 从uni-config-center config获取 调用chatCompletion函数，传入messages、sseChannel、llm参数
			let {
				llm,
				chatCompletionOptions
			} = config


			let llmObj = Object.assign(llm)

			// 获取语言模型管理器
			if (provider) {
				llmObj = {
					provider: provider
				}
			}
			const llmManager = uniCloud.ai.getLLMManager(llmObj)
			return llmManager.chatCompletion({
				...chatCompletionOptions,
				messages,
				stream: stream && sseChannel !== false,
				sseChannel,
				streamEventForSSE: "optimizedMessage"
			})
		}

		/**
		 * 校验消息内容是否符合规范
		 * @param {Array} messages - 消息列表
		 * @returns {Object} - 返回校验结果
		 */
		function checkMessages(messages) {
			try {
				// 如果messages未定义
				if (messages === undefined) {
					// 抛出异常
					throw "messages为必传参数"
					// 如果messages不是数组
				} else if (!Array.isArray(messages)) {
					// 抛出异常
					throw "参数messages的值类型必须是[object,object...]"
				} else {
					// 否则 遍历messages
					messages.forEach(item => {
						// 如果item不是对象
						if (typeof item != 'object') {
							// 抛出异常
							throw "参数messages的值类型必须是[object,object...]"
						}
						// 定义itemRoleArr数组
						let itemRoleArr = ["assistant", "user", "system"]
						// 如果item的role属性不在itemRoleArr数组中
						if (!itemRoleArr.includes(item.role)) {
							// 抛出异常
							throw "参数messages[{role}]的值只能是：" + itemRoleArr.join('或')
						}
						// 如果item的content属性不是字符串
						if (typeof item.content != 'string') {
							// 抛出异常
							throw "参数messages[{content}]的值类型必须是字符串"
						}
					})
				}
				// 返回校验结果
				return {
					errCode: 0,
				}
				// 捕获异常
			} catch (errMsg) {
				// 返回异常信息
				return {
					errSubject: 'ai-demo',
					errCode: 'param-error',
					errMsg
				}
			}
		}
	}
}