"use strict";
const common_vendor = require("../../common/vendor.js");
var that;
const _sfc_main = {
  data() {
    return {
      statusBarHeight: "",
      arr: "",
      version_nums: ""
    };
  },
  onLoad() {
    that = this;
    that.version_nums = that.version_num;
    common_vendor.index.getSystemInfo({
      success(e) {
        that.statusBarHeight = e.statusBarHeight;
      }
    });
    that.center();
  },
  methods: {
    back() {
      common_vendor.index.navigateBack({});
    },
    center() {
      common_vendor.Ds.callFunction({
        name: "cloudc"
      }).then((res) => {
        console.log(57, res);
        that.arr = res.result.data;
      }).catch((err) => {
        console.error(err);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: "1rpx",
    b: $data.arr
  }, $data.arr ? {
    c: common_vendor.f($data.arr, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.number),
        c: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/my/service.vue"]]);
wx.createPage(MiniProgramPage);
