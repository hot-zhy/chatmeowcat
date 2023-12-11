"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      screenHeight: 0,
      image: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/bukaixin.png"
    };
  },
  onLoad() {
    this.screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
  },
  onShow() {
    this.image = "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/xinli.png";
    this.image = "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/zisha.png";
  },
  onBackPress() {
  },
  onHide() {
  },
  methods: {
    listen() {
      common_vendor.index.navigateTo({
        url: "/pages/listen/listen"
      });
    },
    read() {
      common_vendor.index.navigateTo({
        url: "/pages/read/read"
      });
    },
    phone() {
      common_vendor.index.navigateTo({
        url: "/pages/phone/phone"
      });
    },
    enterHouse() {
      common_vendor.index.switchTab({
        url: "/pages/play/play"
      });
    },
    chatWithCat() {
      common_vendor.index.navigateTo({
        url: "/pages/zero-chat/zero-chat"
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
    a: common_vendor.o((...args) => $options.listen && $options.listen(...args)),
    b: common_vendor.o((...args) => $options.read && $options.read(...args)),
    c: common_vendor.o((...args) => $options.phone && $options.phone(...args)),
    d: common_vendor.s("margin-top:" + $data.screenHeight / 10 + "px !important;"),
    e: $data.image,
    f: common_vendor.o((...args) => $options.chatWithCat && $options.chatWithCat(...args)),
    g: common_vendor.s("height:" + $data.screenHeight / 5 + "px !important;margin-top:" + $data.screenHeight / 40 + "px !important;"),
    h: common_vendor.o((...args) => $options.enterHouse && $options.enterHouse(...args)),
    i: common_vendor.p({
      activeIndex: "1"
    }),
    j: common_vendor.s("height:" + $data.screenHeight + "px !important;")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
