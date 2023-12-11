"use strict";
const common_vendor = require("../../common/vendor.js");
const tqbTabbar = () => "../../components/tqb-tabbar/tqb-tabbar.js";
const _sfc_main = {
  components: {
    tqbTabbar
  },
  data() {
    return {
      screenHeight: 0,
      selectedAnimation: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/chifan.gif",
      animationData: {},
      isShowFish: true,
      fishCount: 44
    };
  },
  onShow() {
    this.image = "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/xinli.png";
    this.image = "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/zisha.png";
    this.screenHeight = common_vendor.index.getSystemInfoSync().windowHeight;
    this.selectedAnimation = "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/chifan.gif";
  },
  methods: {
    onConfirmClick() {
      common_vendor.index.navigateTo({
        url: "/pages/exchange/exchange"
      });
    },
    chatWithCat() {
      common_vendor.index.navigateTo({
        url: "/pages/chat/chat"
      });
    },
    enterOut() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    eat() {
      var animation = common_vendor.index.createAnimation({
        duration: 3e3,
        timingFunction: "ease-in-out"
      });
      this.animation = animation;
      animation.scale(1.5, 1.5).translateY(-300).rotate(30).step();
      this.animationData = animation.export();
      setTimeout(function() {
        animation.translate(30).step();
        this.animationData = animation.export();
      }.bind(this), 3e3);
      setTimeout(function() {
        this.isShowFish = false;
      }.bind(this), 6e3);
      this.selectedAnimation = "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/chifan.gif";
      this.fishCount = this.fishCount + 1;
    },
    sleep() {
      var animation = common_vendor.index.createAnimation({
        duration: 3e3,
        timingFunction: "ease-in-out"
      });
      this.animation = animation;
      animation.scale(1.5, 1.5).translateY(-300).rotate(30).step();
      this.animationData = animation.export();
      setTimeout(function() {
        animation.translate(30).step();
        this.animationData = animation.export();
      }.bind(this), 3e3);
      setTimeout(function() {
        this.isShowFish = false;
      }.bind(this), 6e3);
      this.fishCount = this.fishCount + 1;
      this.selectedAnimation = "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/sleep.gif";
    },
    smooth() {
      var animation = common_vendor.index.createAnimation({
        duration: 3e3,
        timingFunction: "ease-in-out"
      });
      this.animation = animation;
      animation.scale(1.5, 1.5).translateY(-300).rotate(30).step();
      this.animationData = animation.export();
      setTimeout(function() {
        animation.translate(30).step();
        this.animationData = animation.export();
      }.bind(this), 3e3);
      setTimeout(function() {
        this.isShowFish = false;
      }.bind(this), 6e3);
      this.fishCount = this.fishCount + 1;
      common_vendor.index.setStorageSync("FishCount", this.fishCount);
      this.selectedAnimation = "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/new/lumao.gif";
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
    a: common_vendor.o((...args) => $options.chatWithCat && $options.chatWithCat(...args)),
    b: common_vendor.o((...args) => $options.eat && $options.eat(...args)),
    c: common_vendor.o((...args) => $options.sleep && $options.sleep(...args)),
    d: common_vendor.o((...args) => $options.smooth && $options.smooth(...args)),
    e: $data.selectedAnimation,
    f: common_vendor.p({
      activeIndex: "0"
    }),
    g: common_vendor.s("height:" + $data.screenHeight + "px !important;")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/play/play.vue"]]);
wx.createPage(MiniProgramPage);
