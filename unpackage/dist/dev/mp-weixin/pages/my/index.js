"use strict";
const common_vendor = require("../../common/vendor.js");
var that;
const _sfc_main = {
  data() {
    return {
      fase: false,
      cont: ""
    };
  },
  onLoad() {
    that = this;
    that.center();
  },
  methods: {
    center() {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      common_vendor.Ds.callFunction({
        name: "cloudb"
      }).then((res) => {
        console.log(33, res);
        that.cont = res.result.data[0].content;
        that.fase = true;
        common_vendor.index.hideLoading();
      }).catch((err) => {
        console.error(err);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.fase
  }, $data.fase ? {
    b: $data.cont
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/my/index.vue"]]);
wx.createPage(MiniProgramPage);
