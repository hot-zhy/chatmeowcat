"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_zeroAi_common_unicloudCoTask = require("../common/unicloud-co-task.js");
const uni_modules_zeroAi_common_SliceMsgToLastMsg = require("../common/SliceMsgToLastMsg.js");
const uni_modules_zeroAi_lib_markdownIt_min = require("../lib/markdown-it.min.js");
const uni_modules_zeroAi_lib_highlight_highlightUni_min = require("../lib/highlight/highlight-uni.min.js");
require("../lib/html-parser.js");
let codeDataList = [];
const markdownIt = uni_modules_zeroAi_lib_markdownIt_min.mt({
  // 在源码中启用 HTML 标签
  html: true,
  // 如果结果以 <pre ... 开头，内部包装器则会跳过。
  highlight: function(str, lang) {
    let preCode = "";
    try {
      preCode = uni_modules_zeroAi_lib_highlight_highlightUni_min.$e.highlightAuto(str).value;
    } catch (err) {
      preCode = markdownIt.utils.escapeHtml(str);
    }
    const lines = preCode.split(/\n/).slice(0, -1);
    let html = lines.map((item, index) => {
      if (item == "") {
        return "";
      }
      return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + "</li>";
    }).join("");
    html = '<ol style="padding: 0px 30px;">' + html + "</ol>";
    codeDataList.push(str);
    let htmlCode = `<div style="background:#0d1117;margin:5px 0;color: #888;padding:5px 0;border-radius: 5px;">`;
    htmlCode += `<pre class="hljs" style="padding:8px;overflow: auto;display: block;border-radius: 5px;font-size:13px"><code>${html}</code></pre>`;
    htmlCode += "</div>";
    return htmlCode;
  }
});
const _sfc_main = {
  name: "uni-ai-msg",
  data() {
    return {
      showMoreMenu: false
    };
  },
  mounted() {
  },
  created() {
  },
  props: {
    // 是否显示鼠标闪烁的效果
    showCursor: {
      type: [Boolean, Number],
      default() {
        return false;
      }
    },
    isLastMsg: {
      type: Boolean,
      default() {
        return false;
      }
    },
    msg: {
      type: Object,
      default() {
        return {
          content: "",
          isDelete: false
        };
      }
    }
  },
  computed: {
    msgContent() {
      return this.msg.content;
    },
    nodes() {
      if (!this.msgContent) {
        return;
      }
      let htmlString = "";
      if (this.msgContent.split("```").length % 2) {
        let msgContent = this.msgContent;
        if (msgContent[msgContent.length - 1] != "\n") {
          msgContent += "\n";
        }
        msgContent += ' <span class="cursor">|</span>';
        htmlString = markdownIt.render(msgContent);
      } else {
        htmlString = markdownIt.render(this.msgContent) + ' \n <span class="cursor">|</span>';
      }
      return htmlString;
    }
  },
  methods: {
    // 复制文本内容到系统剪切板
    copy() {
      common_vendor.index.setClipboardData({
        data: this.msgContent,
        showToast: false,
        success() {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "none"
          });
        }
      });
    },
    // 重新获取回答 (已禁用)
    changeAnswer() {
      this.$emit("changeAnswer");
    },
    // 删除消息 (已禁用)
    removeMsg() {
      this.$emit("removeMsg");
      this.showMoreMenu = false;
    },
    // 代码片段复制 (不支持小程序)
    trOnclick(e) {
      console.log(e);
      let {
        attrs
      } = e.detail.node;
      console.log({
        attrs
      });
      let {
        "code-data-index": codeDataIndex,
        "class": className
      } = attrs;
      if (className == "copy-btn") {
        common_vendor.index.setClipboardData({
          data: codeDataList[codeDataIndex],
          showToast: false,
          success() {
            common_vendor.index.showToast({
              title: "复制成功",
              icon: "none"
            });
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  _easycom_uni_dateformat2();
}
const _easycom_uni_dateformat = () => "../../uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  _easycom_uni_dateformat();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.msg.isDelete
  }, !$props.msg.isDelete ? common_vendor.e({
    b: common_vendor.p({
      date: $props.msg.create_time,
      format: "MM/dd hh:mm:ss"
    }),
    c: !$props.msg.isAi ? 1 : "",
    d: $props.msg.isAi
  }, $props.msg.isAi ? common_vendor.e({
    e: $options.nodes && $options.nodes.length
  }, $options.nodes && $options.nodes.length ? {
    f: $options.nodes,
    g: common_vendor.o((...args) => $options.trOnclick && $options.trOnclick(...args))
  } : {}, {
    h: $props.showCursor ? 1 : ""
  }) : {
    i: common_vendor.t($options.msgContent)
  }, {
    j: common_vendor.o((...args) => $options.copy && $options.copy(...args)),
    k: $props.msg.isAi ? 1 : "",
    l: !$props.msg.isAi ? 1 : ""
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/uni_modules/zero-ai/components/uni-ai-msg/uni-ai-msg.vue"]]);
let uniCoTaskList = [];
uniCoTaskList.clear = function() {
  uniCoTaskList.forEach((task) => task.abort());
  uniCoTaskList.slice(0, uniCoTaskList.length);
};
let sseChannel = false;
const zeroai = {
  components: {
    uniAiMsg: Component
  },
  data() {
    return {
      // 使聊天窗口滚动到指定元素id的值
      scrollIntoView: "",
      // 消息列表数据
      msgList: [],
      // 通讯请求状态
      requestState: 0,
      //0发送中 100发送成功 -100发送失败
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
      providerList: [
        {
          text: "azure",
          value: "azure"
        },
        {
          text: "minimax",
          value: "minimax"
        }
      ],
      // 选择服务商
      currentProvider: "azure",
      // 异形屏底部安全距离
      safeBottom: 0,
      popupHeight: "100%"
    };
  },
  computed: {
    inputBoxDisabled() {
      if (this.sseIndex !== 0) {
        return true;
      }
      return !!(this.msgList.length && this.msgList.length % 2 !== 0);
    },
    NODE_ENV() {
      return "development";
    },
    footBoxPaddingBottom() {
      return (this.keyboardHeight || this.safeBottom) + "px";
    }
  },
  watch: {
    historyList: {
      handler(historyList) {
        common_vendor.index.setStorage({
          "key": "zero-ai-chat",
          "data": historyList
        });
      },
      deep: true
    },
    insufficientScore(insufficientScore) {
      common_vendor.index.setStorage({
        "key": "zero-ai-chat-insufficientScore",
        "data": insufficientScore
      });
    }
  },
  created() {
    this.currentProvider = common_vendor.index.getStorageSync("zero-ai-provider") || "azure";
    const arr = [{
      title: `New Chat`,
      msgList: [],
      provider: this.currentProvider
    }];
    this.historyList = common_vendor.index.getStorageSync("zero-ai-chat") || arr;
    this.currentMsgIndex = common_vendor.index.getStorageSync("currentMsgIndex") || 0;
    this.msgList = this.historyList[this.currentMsgIndex].msgList;
    this.insufficientScore = common_vendor.index.getStorageSync("zero-ai-chat-insufficientScore") || false;
  },
  beforeMount() {
  },
  async mounted() {
    const sys = common_vendor.index.getSystemInfoSync();
    this.safeBottom = sys.safeAreaInsets.bottom || 10;
    this.popupHeight = sys.windowHeight + "px";
    let length = this.msgList.length;
    if (length) {
      let lastMsg = this.msgList[length - 1];
      if (!lastMsg.isAi) {
        this.msgList.push({
          isAi: true,
          content: "Something went wrong, please try again later.",
          create_time: Date.now()
        });
      }
    }
    this.$nextTick(() => {
      this.showLastMsg();
    });
    common_vendor.index.onKeyboardHeightChange((e) => {
      this.keyboardHeight = e.height;
      this.$nextTick(() => {
        this.showLastMsg();
      });
    });
  },
  methods: {
    handleChangeProvider(val) {
      this.currentProvider = val;
      common_vendor.index.setStorage({
        "key": "zero-ai-provider",
        "data": this.currentProvider
      });
    },
    handleNewOne() {
      const obj = {
        title: `New Chat`,
        msgList: [],
        provider: "azure"
      };
      this.historyList.unshift(obj);
      this.currentMsgIndex = 0;
      this.msgList = this.historyList[this.currentMsgIndex].msgList;
      this.closeHistory();
    },
    handleSelectHistory(index) {
      this.currentMsgIndex = index;
      this.msgList = this.historyList[this.currentMsgIndex].msgList;
      this.closeHistory();
    },
    handleClearHistory(index) {
      common_vendor.index.showModal({
        title: "确认要删除选中对话？",
        content: "本操作不可撤销",
        complete: (e) => {
          if (e.confirm) {
            if (index === this.currentMsgIndex) {
              this.closeSseChannel();
              this.currentMsgIndex = 0;
            }
            this.historyList.splice(index, 1);
            if (!this.historyList.length) {
              this.handleNewOne();
            }
            this.msgList = this.historyList[this.currentMsgIndex].msgList;
          }
        }
      });
    },
    handleRename(index) {
      const title = this.historyList[index].title;
      common_vendor.index.showModal({
        title: "修改对话主题",
        editable: true,
        content: title,
        placeholderText: "请输入名称",
        success: (res) => {
          if (res.confirm) {
            this.historyList[index].title = res.content;
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    showHistory() {
      this.$refs.history.open();
    },
    closeHistory() {
      this.$refs.history.close();
    },
    async checkIsOpenPush() {
      try {
        await common_vendor.index.getPushClientId();
        this.checkIsOpenPush = () => {
        };
      } catch (err) {
        this.enableStream = false;
      }
    },
    updateLastMsg(param) {
      let length = this.msgList.length;
      if (length === 0) {
        return;
      }
      let lastMsg = this.msgList[length - 1];
      if (typeof param == "function") {
        let callback = param;
        callback(lastMsg);
      } else {
        const [data, cover = false] = arguments;
        if (cover) {
          lastMsg = data;
        } else {
          lastMsg = Object.assign(lastMsg, data);
        }
      }
      this.msgList.splice(length - 1, 1, lastMsg);
    },
    // 换一个答案
    async changeAnswer() {
      if (this.sseIndex) {
        this.closeSseChannel();
      }
      this.msgList.pop();
      this.updateLastMsg({
        illegal: false
      });
      this.insufficientScore = false;
      this.send();
    },
    removeMsg(index) {
      if (this.msgList[index].isAi) {
        index -= 1;
      }
      if (this.sseIndex && index == this.msgList.length - 2) {
        this.closeSseChannel();
      }
      this.msgList.splice(index, 2);
    },
    async beforeSend() {
      if (this.inputBoxDisabled) {
        return common_vendor.index.showToast({
          title: "ai正在回复中不能发送",
          icon: "none"
        });
      }
      if (!this.content) {
        return common_vendor.index.showToast({
          title: "内容不能为空",
          icon: "none"
        });
      }
      this.msgList.push({
        isAi: false,
        content: this.content,
        create_time: Date.now()
      });
      this.showLastMsg();
      this.$nextTick(() => {
        this.content = "";
      });
      this.send();
    },
    async send() {
      this.requestState = 0;
      uniCoTaskList.clear();
      if (this.afterChatCompletion && this.afterChatCompletion.clear)
        this.afterChatCompletion.clear();
      let messages = [];
      let msgs = JSON.parse(JSON.stringify(this.msgList));
      let findIndex = [...msgs].reverse().findIndex((item) => item.summarize);
      if (findIndex != -1) {
        let aiSummaryIndex = msgs.length - findIndex - 1;
        msgs[aiSummaryIndex].content = msgs[aiSummaryIndex].summarize;
        msgs = msgs.splice(aiSummaryIndex);
      } else {
        msgs = msgs.splice(-10);
      }
      msgs = msgs.filter((msg) => !msg.illegal);
      messages = msgs.map((item) => {
        let role = "user";
        if (item.isAi) {
          role = item.summarize ? "system" : "assistant";
        }
        return {
          content: item.content,
          role
        };
      });
      console.log("send to ai messages:", messages);
      await this.checkIsOpenPush();
      let sseEnd, requestEnd;
      if (this.enableStream) {
        sseChannel = new common_vendor.Ds.SSEChannel();
        this.sliceMsgToLastMsg = new uni_modules_zeroAi_common_SliceMsgToLastMsg.SliceMsgToLastMsg(this);
        sseChannel.on("message", (message) => {
          if (this.sseIndex === 0) {
            this.msgList.push({
              isAi: true,
              content: message,
              create_time: Date.now()
            });
          } else {
            this.sliceMsgToLastMsg.addMsg(message);
          }
          this.showLastMsg();
          this.sseIndex++;
        });
        sseChannel.on("end", (e) => {
          console.log("sse 结束", e);
          this.sliceMsgToLastMsg.t = 0;
          if (e && typeof e == "object" && e.errCode) {
            let setLastAiMsgContent = (content) => {
              if (this.sseIndex === 0) {
                this.msgList.push({
                  isAi: true,
                  content,
                  create_time: Date.now()
                });
              } else {
                this.updateLastMsg((lastMsg) => {
                  lastMsg.content += content;
                });
              }
              this.showLastMsg();
            };
            if (e.errCode == 60004) {
              let length = this.msgList.length;
              if (length % 2) {
                this.msgList.push({
                  isAi: true,
                  content: "内容涉及敏感",
                  illegal: true,
                  create_time: Date.now()
                });
                length += 1;
              }
              this.msgList[length - 2].illegal = true;
              this.msgList[length - 1].illegal = true;
              this.msgList[length - 1].content = "内容涉及敏感";
            } else {
              setLastAiMsgContent(e.errMsg);
            }
          }
          sseEnd();
        });
        await sseChannel.open();
        (function fnSelf(that) {
          fnSelf.clear = () => {
            if (fnSelf.clear.sse) {
              fnSelf.clear.sse();
            }
            if (fnSelf.clear.request) {
              fnSelf.clear.request();
            }
          };
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
            sseChannel.close();
            that.sseIndex = 0;
          }).catch((err) => {
          });
          that.afterChatCompletion = fnSelf;
        })(this);
      }
      let task = uni_modules_zeroAi_common_unicloudCoTask.main({
        coName: "zero-ai",
        funName: "send",
        param: [{
          messages,
          // 消息列表
          sseChannel,
          // 消息通道
          provider: this.currentProvider
        }],
        config: {
          customUI: true
        },
        success: (res) => {
          this.requestState = 100;
          if (!res.data)
            return;
          let {
            reply,
            summarize,
            insufficientScore,
            illegal,
            roleNotAllow
          } = res.data;
          if (this.enableStream == false && !reply) {
            illegal = true;
            reply = "内容涉及敏感";
          }
          if (this.enableStream == false && illegal) {
            console.error("内容涉及敏感");
            this.updateLastMsg({
              // 添加消息涉敏标记
              illegal: true
            });
          }
          if (this.enableStream == false || this.sseIndex == 0 && (illegal || insufficientScore || roleNotAllow)) {
            this.msgList.push({
              create_time: Date.now(),
              isAi: true,
              content: reply,
              illegal
            });
          }
          if (insufficientScore) {
            this.insufficientScore = true;
          }
          if (summarize) {
            let index = this.msgList.length - 1;
            if (index % 2) {
              index -= 2;
            } else {
              index -= 1;
            }
            if (index < 1) {
              index = 1;
            }
            let msg = this.msgList[index];
            msg.summarize = summarize;
            this.msgList.splice(index, 1, msg);
          }
        },
        complete: (e) => {
          if (this.enableStream) {
            requestEnd();
          }
          this.$nextTick(() => {
            this.showLastMsg();
          });
        },
        fail: (e) => {
          console.error(e);
          this.requestState = -100;
          this.msgList.push({
            isAi: true,
            content: "Something went wrong, please try again later." + JSON.stringify(e.message),
            create_time: Date.now(),
            provider: this.currentProvider
          });
          if (this.enableStream) {
            sseEnd();
          }
        }
      });
      uniCoTaskList.push(task);
    },
    closeSseChannel() {
      if (sseChannel) {
        sseChannel.close();
        sseChannel = false;
        this.sliceMsgToLastMsg.end();
      }
      uniCoTaskList.clear();
      this.sseIndex = 0;
    },
    showLastMsg() {
      this.$nextTick(() => {
        this.scrollIntoView = "last-msg-item";
        this.$nextTick(() => {
          this.scrollIntoView = "";
        });
      });
    },
    clearAllMsg(e) {
      common_vendor.index.showModal({
        title: "确认要清空聊天记录？",
        content: "本操作不可撤销",
        complete: (e2) => {
          if (e2.confirm) {
            this.closeSseChannel();
            this.msgList.splice(0, this.msgList.length);
          }
        }
      });
    }
  }
};
exports.Component = Component;
exports.zeroai = zeroai;
