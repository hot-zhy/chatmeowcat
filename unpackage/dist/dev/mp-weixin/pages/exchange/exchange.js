"use strict";
const common_vendor = require("../../common/vendor.js");
const components_leftSwipeTab_goods = require("../../components/left-swipe-tab/goods.js");
const _sfc_main = {
  data() {
    return {
      tabs: [],
      topHeight: 44,
      fishCount: 0
    };
  },
  onReady() {
    this.tabs = components_leftSwipeTab_goods.goods;
  },
  onLoad() {
    this.fishCount = common_vendor.index.getStorageSync("FishCount");
  },
  methods: {
    naviback() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_left_swipe_tab2 = common_vendor.resolveComponent("left-swipe-tab");
  (_easycom_uni_nav_bar2 + _easycom_left_swipe_tab2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_left_swipe_tab = () => "../../components/left-swipe-tab/left-swipe-tab.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_left_swipe_tab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.fishCount),
    b: common_vendor.o($options.naviback),
    c: common_vendor.p({
      fixed: true,
      leftIcon: true,
      ["status-bar"]: true,
      ["background-color"]: "antiquewhite",
      ["left-text"]: "返回"
    }),
    d: common_vendor.p({
      topheight: $data.topHeight,
      tabData: $data.tabs
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/exchange/exchange.vue"]]);
wx.createPage(MiniProgramPage);
