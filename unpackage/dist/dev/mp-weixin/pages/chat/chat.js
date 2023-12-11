"use strict";
const uni_modules_zeroAi_js_sdk_zeroai = require("../../uni_modules/zero-ai/js_sdk/zeroai.js");
const common_vendor = require("../../common/vendor.js");
require("../../uni_modules/zero-ai/common/unicloud-co-task.js");
require("../../uni_modules/zero-ai/common/SliceMsgToLastMsg.js");
require("../../uni_modules/zero-ai/lib/markdown-it.min.js");
require("../../uni_modules/zero-ai/lib/highlight/highlight-uni.min.js");
require("../../uni_modules/zero-ai/lib/html-parser.js");
const _sfc_main = {
  mixins: [uni_modules_zeroAi_js_sdk_zeroai.zeroai]
};
if (!Array) {
  const _easycom_uni_ai_msg2 = common_vendor.resolveComponent("uni-ai-msg");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_zero_privacy = common_vendor.resolveComponent("zero-privacy");
  (_easycom_uni_ai_msg2 + _easycom_uni_icons2 + _easycom_uni_popup2 + _component_zero_privacy)();
}
const _easycom_uni_ai_msg = () => "../../uni_modules/zero-ai/components/uni-ai-msg/uni-ai-msg.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_ai_msg + _easycom_uni_icons + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.msgList.length === 0
  }, _ctx.msgList.length === 0 ? {} : {}, {
    b: common_vendor.f(_ctx.msgList, (msg, index, i0) => {
      return {
        a: common_vendor.sr("msg", "2d7ee3cc-0-" + i0, {
          "f": 1
        }),
        b: index,
        c: common_vendor.o(_ctx.changeAnswer, index),
        d: common_vendor.o(($event) => _ctx.removeMsg(index), index),
        e: "2d7ee3cc-0-" + i0,
        f: common_vendor.p({
          msg,
          ["show-cursor"]: index == _ctx.msgList.length - 1 && _ctx.msgList.length % 2 === 0 && _ctx.sseIndex,
          isLastMsg: index == _ctx.msgList.length - 1
        })
      };
    }),
    c: _ctx.msgList.length % 2 !== 0
  }, _ctx.msgList.length % 2 !== 0 ? common_vendor.e({
    d: _ctx.requestState == -100
  }, _ctx.requestState == -100 ? {
    e: common_vendor.o(_ctx.send),
    f: common_vendor.p({
      color: "#d22",
      type: "refresh-filled"
    })
  } : _ctx.msgList.length ? {} : {}, {
    g: _ctx.msgList.length
  }) : {}, {
    h: _ctx.sseIndex
  }, _ctx.sseIndex ? {
    i: common_vendor.o((...args) => _ctx.closeSseChannel && _ctx.closeSseChannel(...args))
  } : {}, {
    j: _ctx.scrollIntoView,
    k: common_vendor.o(_ctx.showHistory),
    l: common_vendor.p({
      type: "settings",
      size: "24",
      color: "#0396FF"
    }),
    m: !_ctx.isWidescreen,
    n: -1,
    o: _ctx.content,
    p: common_vendor.o(($event) => _ctx.content = $event.detail.value),
    q: common_vendor.p({
      type: "paperplane",
      size: "28",
      color: "#ffffff"
    }),
    r: common_vendor.o((...args) => _ctx.beforeSend && _ctx.beforeSend(...args)),
    s: _ctx.inputBoxDisabled || !_ctx.content,
    t: _ctx.inputBoxDisabled || !_ctx.content ? 1 : "",
    v: _ctx.msgList.length && _ctx.msgList.length % 2 !== 0 ? "ai正在回复中不能发送" : "",
    w: _ctx.footBoxPaddingBottom,
    x: common_vendor.o(_ctx.showHistory),
    y: common_vendor.p({
      type: "plusempty",
      size: "20",
      color: "#1aad19"
    }),
    z: common_vendor.o((...args) => _ctx.handleNewOne && _ctx.handleNewOne(...args)),
    A: common_vendor.f(_ctx.providerList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: index,
        c: item.value === _ctx.currentProvider ? 1 : "",
        d: common_vendor.o(($event) => _ctx.handleChangeProvider(item.value), index)
      };
    }),
    B: common_vendor.f(_ctx.historyList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.o(($event) => _ctx.handleRename(index), index),
        c: "2d7ee3cc-6-" + i0 + ",2d7ee3cc-4",
        d: common_vendor.o(($event) => _ctx.handleClearHistory(index), index),
        e: "2d7ee3cc-7-" + i0 + ",2d7ee3cc-4",
        f: common_vendor.o(() => {
        }, index),
        g: index,
        h: index === _ctx.currentMsgIndex ? 1 : "",
        i: common_vendor.o(($event) => _ctx.handleSelectHistory(index), index)
      };
    }),
    C: common_vendor.p({
      type: "compose",
      color: "#333",
      size: "22"
    }),
    D: common_vendor.p({
      type: "close",
      color: "#333",
      size: "22"
    }),
    E: _ctx.popupHeight,
    F: common_vendor.sr("history", "2d7ee3cc-4"),
    G: common_vendor.p({
      type: "left",
      ["background-color"]: "#fff"
    }),
    H: common_vendor.p({
      onNeed: false
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
