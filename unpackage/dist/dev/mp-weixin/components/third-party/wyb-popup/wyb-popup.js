"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      w: common_vendor.index.getSystemInfoSync().screenWidth,
      h: common_vendor.index.getSystemInfoSync().screenHeight,
      isShow: false,
      winReBottom: "",
      winReTop: "",
      sizeChange: false,
      contentOpacity: null,
      contentTransform: null,
      maskOpacity: 0
    };
  },
  computed: {
    autoCenterTop() {
      common_vendor.index.getSystemInfoSync().statusBarHeight;
      let windowHeight = common_vendor.index.getSystemInfoSync().windowHeight;
      let popupHeight = this.rpxToPx(this.height);
      let result = `${(windowHeight - popupHeight) / 2 - this.negativeTop}px`;
      return result;
    },
    autoTransform() {
      let result = "";
      switch (this.type) {
        case "center":
          if (this.centerAnim === "zoom-lessen") {
            result = `scale(${this.zoomLessenMulti})`;
          } else if (this.centerAnim === "slide-up") {
            result = `translateY(${100 * this.slideMulti}%)`;
          } else if (this.centerAnim === "slide-down") {
            result = `translateY(${-100 * this.slideMulti}%)`;
          } else if (this.centerAnim === "fade") {
            result = "auto";
          }
          break;
        case "bottom":
          result = "translateY(100%)";
          break;
        case "top":
          result = "translateY(-100%)";
          break;
        case "left":
          result = "translateX(-100%)";
          break;
        case "right":
          result = "translateX(100%)";
          break;
      }
      return result;
    },
    autoWidth() {
      if (this.type === "center") {
        return `${this.width}rpx`;
      } else {
        if (this.mode === "size-fixed") {
          if (this.type === "top" || this.type === "bottom") {
            return "100%";
          } else {
            return `${this.width}rpx`;
          }
        } else {
          if (this.type === "top" || this.type === "bottom") {
            return "100%";
          } else {
            return "auto";
          }
        }
      }
    },
    autoHeight() {
      if (this.type === "center") {
        return `${this.height}rpx`;
      } else {
        if (this.mode === "size-fixed") {
          if (this.type === "left" || this.type === "right") {
            return "100%";
          } else {
            return `${this.height}rpx`;
          }
        } else {
          if (this.type === "left" || this.type === "right") {
            return "100%";
          } else {
            return "auto";
          }
        }
      }
    },
    autoTop() {
      if (this.type === "center") {
        return this.autoCenterTop;
      } else if (this.type === "bottom") {
        return "auto";
      } else {
        return 0;
      }
    },
    autoBottom() {
      if (this.type === "center" || this.type === "top") {
        return "auto";
      } else {
        return 0;
      }
    },
    autoLeft() {
      if (this.type === "center") {
        return `${(this.w - this.rpxToPx(this.width)) / 2}px`;
      } else if (this.type === "right") {
        return "auto";
      } else {
        return 0;
      }
    },
    autoRight() {
      if (this.type === "center" || this.type === "left") {
        return "auto";
      } else {
        return 0;
      }
    }
  },
  props: {
    type: {
      type: String,
      default: "bottom"
    },
    mode: {
      type: String,
      default: "size-auto"
    },
    height: {
      type: [String, Number],
      default: 400
    },
    width: {
      type: [String, Number],
      default: 500
    },
    radius: {
      type: [String, Number],
      default: 0
    },
    zIndex: {
      type: [String, Number],
      default: 10076
    },
    maskClickClose: {
      type: Boolean,
      default: true
    },
    maskAlpha: {
      type: Number,
      default: 0.5
    },
    duration: {
      type: Number,
      default: 400
    },
    showCloseIcon: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: false
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    closeIconPos: {
      type: String,
      default: "top-right"
    },
    closeIcon: {
      type: String,
      default: ""
    },
    closeIconSize: {
      type: [String, Number],
      default: "20"
    },
    vertOffset: {
      type: [String, Number],
      default: "22"
    },
    horiOffset: {
      type: [String, Number],
      default: "22"
    },
    centerAnim: {
      type: String,
      default: "zoom-lessen"
    },
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    zoomLessenMulti: {
      type: Number,
      default: 1.15
    },
    slideMulti: {
      type: Number,
      default: 1
    },
    negativeTop: {
      type: Number,
      default: 0
    }
  },
  mounted() {
  },
  methods: {
    close() {
      this.maskClickClose && this.hide();
    },
    show() {
      this.isShow = true;
      this.$nextTick(() => {
        this.maskIn();
        this.contentIn();
        this.wait(this.duration + 1).then(() => {
          this.$emit("show", {
            pageScroll: false,
            overflow: "hidden"
          });
        });
      });
    },
    hide() {
      this.contentOut();
      this.maskOut();
      this.wait(this.duration + 1).then(() => {
        this.isShow = false;
        this.$emit("hide", {
          pageScroll: true,
          overflow: "scroll"
        });
      });
    },
    contentIn() {
      switch (this.type) {
        case "center":
          if (this.centerAnim === "zoom-lessen") {
            this.contentOpacity = 1;
            this.contentTransform = "scale(1)";
          } else if (this.centerAnim === "slide-up" || this.centerAnim === "slide-down") {
            this.contentOpacity = 1;
            this.contentTransform = "translateY(0)";
          } else if (this.centerAnim === "fade") {
            this.contentOpacity = 1;
          }
          break;
        case "bottom":
        case "top":
          this.contentTransform = "translateY(0)";
          break;
        case "left":
        case "right":
          this.contentTransform = "translateX(0)";
          break;
      }
    },
    contentOut() {
      this.contentOpacity = null;
      this.contentTransform = null;
    },
    maskIn() {
      this.maskOpacity = 1;
    },
    maskOut() {
      this.maskOpacity = 0;
    },
    rpxToPx(rpx) {
      return rpx / 750 * this.w;
    },
    wait(time) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isShow
  }, $data.isShow ? common_vendor.e({
    b: $props.showCloseIcon
  }, $props.showCloseIcon ? common_vendor.e({
    c: $props.showCloseIcon && $props.closeIcon
  }, $props.showCloseIcon && $props.closeIcon ? {
    d: $props.closeIcon,
    e: common_vendor.o((...args) => $options.hide && $options.hide(...args)),
    f: $props.closeIconSize + "rpx",
    g: $props.closeIconSize + "rpx"
  } : {}, {
    h: $props.showCloseIcon && !$props.closeIcon
  }, $props.showCloseIcon && !$props.closeIcon ? {
    i: common_vendor.o((...args) => $options.hide && $options.hide(...args))
  } : {}, {
    j: $props.closeIcon ? $props.closeIconSize + "rpx" : "auto",
    k: $props.closeIcon ? $props.closeIconSize + "rpx" : "auto",
    l: $props.closeIconPos === "top-right" || $props.closeIconPos === "top-left" ? $props.vertOffset + "rpx" : "auto",
    m: $props.closeIconPos === "bottom-right" || $props.closeIconPos === "bottom-left" ? $props.vertOffset + "rpx" : "auto",
    n: $props.closeIconPos === "bottom-left" || $props.closeIconPos === "top-left" ? $props.horiOffset + "rpx" : "auto",
    o: $props.closeIconPos === "bottom-right" || $props.closeIconPos === "top-right" ? $props.horiOffset + "rpx" : "auto"
  }) : {}, {
    p: $options.autoWidth,
    q: $options.autoHeight,
    r: $props.scrollY,
    s: $props.scrollX,
    t: common_vendor.o(() => {
    }),
    v: common_vendor.o(() => {
    }),
    w: $props.duration + "ms",
    x: $data.contentOpacity || ($props.type === "center" ? 0 : 1),
    y: $data.contentTransform || $options.autoTransform,
    z: $props.zIndex,
    A: $props.type === "center" || $props.type === "bottom" || $props.type === "left" ? $props.radius + "px" : 0,
    B: $props.type === "center" || $props.type === "bottom" || $props.type === "right" ? $props.radius + "px" : 0,
    C: $props.type === "center" || $props.type === "top" || $props.type === "left" ? $props.radius + "px" : 0,
    D: $props.type === "center" || $props.type === "top" || $props.type === "right" ? $props.radius + "px" : 0,
    E: $options.autoWidth,
    F: $options.autoHeight,
    G: $props.width + "rpx",
    H: $props.height + "rpx",
    I: $data.sizeChange && $props.type === "center" ? $data.winReTop : $options.autoTop,
    J: $options.autoBottom,
    K: $options.autoLeft,
    L: $options.autoRight,
    M: $props.bgColor,
    N: common_vendor.o((...args) => $options.close && $options.close(...args)),
    O: common_vendor.o(() => {
    }),
    P: $data.maskOpacity,
    Q: $props.duration + "ms",
    R: "rgba(0, 0, 0, " + $props.maskAlpha + ")",
    S: $props.zIndex - 1
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/components/third-party/wyb-popup/wyb-popup.vue"]]);
wx.createComponent(Component);
