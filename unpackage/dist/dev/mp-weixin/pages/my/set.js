"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
var that;
const _sfc_main = {
  data() {
    return {
      statusBarHeight: "",
      fase: false,
      token: "",
      fase2: false
    };
  },
  onLoad() {
    that = this;
    common_vendor.index.getSystemInfo({
      success(e) {
        that.statusBarHeight = e.statusBarHeight;
      }
    });
    common_vendor.index.getStorage({
      key: "token",
      success: function(res) {
        that.token = res.data;
      },
      fail() {
        that.token = "";
      }
    });
  },
  methods: {
    back() {
      common_vendor.index.navigateBack({});
    },
    on() {
      that.fase = false;
    },
    on2() {
      that.fase2 = false;
    },
    async yes() {
      that.fase = false;
      await uni_modules_uniIdPages_common_store.mutations.logout();
      common_vendor.index.removeStorage({
        key: "token"
      });
    },
    yes2() {
      that.fase2 = false;
      common_vendor.Ds.callFunction({
        name: "cloude"
      }).then((res) => {
        common_vendor.index.showToast({
          title: "注销成功",
          duration: 3e3
        });
        common_vendor.index.removeStorage({
          key: "token"
        });
        common_vendor.index.redirectTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
        });
      }).catch((err) => {
        console.error(err);
      });
    },
    btn() {
      that.fase = true;
    },
    btn2() {
      that.fase2 = true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: "1rpx",
    b: common_vendor.o((...args) => $options.btn && $options.btn(...args)),
    c: common_vendor.o((...args) => $options.btn2 && $options.btn2(...args)),
    d: $data.fase
  }, $data.fase ? {
    e: common_vendor.o((...args) => $options.on && $options.on(...args)),
    f: common_vendor.o((...args) => $options.yes && $options.yes(...args))
  } : {}, {
    g: $data.fase2
  }, $data.fase2 ? {
    h: common_vendor.o((...args) => $options.on2 && $options.on2(...args)),
    i: common_vendor.o((...args) => $options.yes2 && $options.yes2(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/my/set.vue"]]);
wx.createPage(MiniProgramPage);
