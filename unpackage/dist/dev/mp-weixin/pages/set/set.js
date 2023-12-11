"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    devaste() {
    },
    logout() {
      common_vendor.index.showModal({
        title: "确定要退出登录吗",
        confirmText: "确定",
        cancelText: "取消",
        success(res) {
          if (res.confirm) {
            common_vendor.index.setStorageSync("isLogin", false);
            common_vendor.index.reLaunch({
              url: "/pages/my/my"
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.logout && $options.logout(...args)),
    b: common_vendor.o((...args) => $options.devaste && $options.devaste(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/set/set.vue"]]);
wx.createPage(MiniProgramPage);
