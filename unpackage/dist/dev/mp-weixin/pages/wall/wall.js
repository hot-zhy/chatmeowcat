"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      inputList: [
        "生活甜甜，好运连连",
        "别怕，有我在",
        "你要知道很多人在默默爱着你",
        "因为我也淋过雨，所以想给你撑伞",
        "那么善良的你，永远值得被爱",
        "如果事与愿违，一定是上天另有安排",
        "即使在谷底，你也是最美的花",
        "过去的日子镌刻着你的怀念，现在的日子书写着你的人生",
        "你听说过触底反弹吗？",
        "每个人都是渺小的伟大，兀自地发着光"
      ],
      indexBackgroundImage: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/pink.png",
      animationData: {}
    };
  },
  onShow() {
    var animation = common_vendor.index.createAnimation({
      duration: 3e4,
      timingFunction: "linear"
    });
    this.animation = animation;
    animation.scale(1.5, 1.5).translateY(-1500).rotate(30).step();
    this.animationData = animation.export();
    setTimeout(function() {
      animation.translate(30).step();
      this.animationData = animation.export();
    }.bind(this), 1e3);
  },
  methods: {
    naviback() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.naviback && $options.naviback(...args)),
    b: common_vendor.f($data.inputList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    c: `url(${$data.indexBackgroundImage})`,
    d: $data.animationData
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/wall/wall.vue"]]);
wx.createPage(MiniProgramPage);
