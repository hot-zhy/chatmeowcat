"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      screenHeight: 0,
      nickname: "zhy",
      avatar: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/catt.png",
      isLogin: false
    };
  },
  onLoad() {
    this.screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
  },
  onShow() {
    this.isLogin = common_vendor.index.getStorageSync("isLogin");
    this.nickname = common_vendor.index.getStorageSync("nickname");
  },
  methods: {
    exchange() {
      common_vendor.index.navigateTo({
        url: "/pages/exchange/exchange"
      });
    },
    sets() {
      common_vendor.index.navigateTo({
        url: "/pages/set/set"
      });
    },
    login() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    }
  }
};
if (!Array) {
  const _easycom_tqb_tabbar2 = common_vendor.resolveComponent("tqb-tabbar");
  _easycom_tqb_tabbar2();
}
const _easycom_tqb_tabbar = () => "../../components/tqb-tabbar/tqb-tabbar.js";
if (!Math) {
  _easycom_tqb_tabbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.avatar,
    b: $data.isLogin
  }, $data.isLogin ? {
    c: common_vendor.t($data.nickname),
    d: common_vendor.o((...args) => $options.sets && $options.sets(...args))
  } : {}, {
    e: common_vendor.s("margin-top:" + $data.screenHeight / 6 + "px !important;"),
    f: common_vendor.o((...args) => $options.sets && $options.sets(...args)),
    g: common_vendor.o((...args) => $options.exchange && $options.exchange(...args)),
    h: common_vendor.s("margin-top:" + $data.screenHeight / 10 + "px !important;"),
    i: common_vendor.s("height:" + $data.screenHeight + "px !important;"),
    j: common_vendor.p({
      activeIndex: "3"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
