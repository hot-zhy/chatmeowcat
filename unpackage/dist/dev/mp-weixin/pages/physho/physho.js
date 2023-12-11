"use strict";
const common_vendor = require("../../common/vendor.js");
const tqbTabbar = () => "../../components/tqb-tabbar/tqb-tabbar.js";
const _sfc_main = {
  components: {
    tqbTabbar
  },
  data() {
    return {
      screenHeight: 0
    };
  },
  onShow() {
    this.screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
  },
  methods: {
    chat() {
      common_vendor.index.navigateTo({
        url: "/pages/chat/chat"
      });
    },
    phone() {
      common_vendor.index.navigateTo({
        url: "/pages/phone/phone"
      });
    },
    suggestion() {
      common_vendor.index.navigateTo({
        url: "/pages/suggestion/suggestion"
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
  return {
    a: common_vendor.o((...args) => $options.chat && $options.chat(...args)),
    b: common_vendor.o((...args) => $options.phone && $options.phone(...args)),
    c: common_vendor.o((...args) => $options.suggestion && $options.suggestion(...args)),
    d: common_vendor.p({
      activeIndex: "2"
    }),
    e: common_vendor.s("height:" + $data.screenHeight + "px !important;")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/physho/physho.vue"]]);
wx.createPage(MiniProgramPage);
