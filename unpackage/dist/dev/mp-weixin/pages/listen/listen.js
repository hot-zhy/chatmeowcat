"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      screenHeight: 0
    };
  },
  onLoad() {
    this.screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
  },
  methods: {
    naviback() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    play() {
    },
    stop() {
    },
    pause() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.play && $options.play(...args)),
    b: common_vendor.o((...args) => $options.pause && $options.pause(...args)),
    c: common_vendor.o((...args) => $options.stop && $options.stop(...args)),
    d: common_vendor.s("margin-top:" + $data.screenHeight / 4 + "px !important;"),
    e: common_vendor.s("height:" + $data.screenHeight + "px !important;")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/listen/listen.vue"]]);
wx.createPage(MiniProgramPage);
