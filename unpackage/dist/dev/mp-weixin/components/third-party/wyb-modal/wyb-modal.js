"use strict";
const common_vendor = require("../../../common/vendor.js");
const wybPopup = () => "../wyb-popup/wyb-popup.js";
const _sfc_main = {
  components: {
    wybPopup
  },
  data() {
    return {
      ftColor: "#000",
      scaleLine: "scaleY(1)",
      confirmClick: false
    };
  },
  computed: {
    loadingColor() {
      let color = this.confirmColor.slice();
      let rgbList = this.hexToRgb(color);
      let top = "rgba(" + rgbList[0] + "," + rgbList[1] + "," + rgbList[2] + ", 0.3)";
      let bottom = "rgba(" + rgbList[0] + "," + rgbList[1] + "," + rgbList[2] + ", 0.3)";
      let right = "rgba(" + rgbList[0] + "," + rgbList[1] + "," + rgbList[2] + ", 0.3)";
      let left = "rgb(" + rgbList[0] + "," + rgbList[1] + "," + rgbList[2] + ")";
      return {
        top,
        bottom,
        right,
        left
      };
    }
  },
  props: {
    title: {
      type: String,
      default: "标题"
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: "内容"
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmColor: {
      type: String,
      default: "#007aff"
    },
    cancelColor: {
      type: String,
      default: "#000"
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    width: {
      type: [String, Number],
      default: 600
    },
    height: {
      type: [String, Number],
      default: 350
    },
    radius: {
      type: [String, Number],
      default: 5
    },
    maskClickClose: {
      type: Boolean,
      default: false
    },
    maskAlpha: {
      type: Number,
      default: 0.5
    },
    duration: {
      type: Number,
      default: 400
    },
    animation: {
      type: String,
      default: "zoom-lessen"
    },
    bgColor: {
      type: String,
      default: "#fff"
    },
    color: {
      type: String,
      default: ""
    },
    lineHeight: {
      type: [String, Number],
      default: 30
    },
    zoomLessenMulti: {
      type: Number,
      default: 1.2
    },
    slideMulti: {
      type: Number,
      default: 0.15
    },
    custom: {
      type: Boolean,
      default: false
    },
    negativeTop: {
      type: Number,
      default: 0
    },
    asyncClose: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Array,
      default() {
        return [20];
      }
    }
  },
  mounted() {
    this.getFtColor();
  },
  methods: {
    onBtnsTap(idx) {
      switch (idx) {
        case 0:
          this.hideModal();
          this.$emit("cancel");
          break;
        case 1:
          if (!this.confirmClick) {
            this.$emit("confirm");
          }
          if (this.asyncClose) {
            this.confirmClick = true;
          } else {
            this.hideModal();
          }
          break;
      }
    },
    getFtColor() {
      let r = 0, g = 0, b = 0;
      if (this.bgColor.indexOf("#") !== -1) {
        let arr = this.hexToRgb(this.bgColor);
        r = arr[0], g = arr[1], b = arr[2];
      } else {
        let hasAlpha = this.bgColor.indexOf("a") !== -1;
        let root = this.bgColor.slice();
        let idx = root.indexOf("(") + 1;
        root = root.substring(idx);
        let firstDotIdx = root.indexOf(",");
        r = parseFloat(root.substring(0, firstDotIdx));
        root = root.substring(firstDotIdx + 1);
        let secondDotIdx = root.indexOf(",");
        g = parseFloat(root.substring(0, secondDotIdx));
        root = root.substring(secondDotIdx + 1);
        if (hasAlpha) {
          let thirdDotIdx = root.indexOf(",");
          b = parseFloat(root.substring(0, thirdDotIdx));
        } else {
          b = parseFloat(root);
        }
      }
      if (r * 0.299 + g * 0.578 + b * 0.114 >= 192) {
        this.ftColor = this.color || "#000";
        this.scaleLine = "scaleY(1)";
      } else {
        this.ftColor = this.color || "#fff";
        this.scaleLine = "scaleY(0.5)";
      }
    },
    hexToRgb(color) {
      if (color.length === 4) {
        let arr = color.split("");
        color = "#" + arr[1] + arr[1] + arr[2] + arr[2] + arr[3] + arr[3];
      }
      let color16List = [color.substring(1, 3), color.substring(3, 5), color.substring(5, 7)];
      let r = parseInt(color16List[0], 16);
      let g = parseInt(color16List[1], 16);
      let b = parseInt(color16List[2], 16);
      return [r, g, b];
    },
    RGBChange(color, level, type) {
      if (color.length === 4) {
        let arr = color.split("");
        color = "#" + arr[1] + arr[1] + arr[2] + arr[2] + arr[3] + arr[3];
      }
      let color16List = [color.substring(1, 3), color.substring(3, 5), color.substring(5, 7)];
      let r = parseInt(color16List[0], 16);
      let g = parseInt(color16List[1], 16);
      let b = parseInt(color16List[2], 16);
      let rgbc = [r, g, b];
      for (var i = 0; i < 3; i++)
        type === "light" ? rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]) : rgbc[i] = Math.floor(rgbc[i] * (1 - level));
      let R = rgbc[0].toString(16);
      let G = rgbc[1].toString(16);
      let B = rgbc[2].toString(16);
      if (R.length === 1)
        R = "0" + R;
      if (G.length === 1)
        G = "0" + G;
      if (B.length === 1)
        B = "0" + B;
      return "#" + R + G + B;
    },
    showModal() {
      this.$refs.popup.show();
    },
    hideModal() {
      if (this.confirmClick) {
        this.confirmClick = false;
      }
      this.$refs.popup.hide();
    }
  }
};
if (!Array) {
  const _component_wyb_popup = common_vendor.resolveComponent("wyb-popup");
  _component_wyb_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showTitle
  }, $props.showTitle ? {
    b: common_vendor.t($props.title),
    c: $data.ftColor
  } : {}, {
    d: !$props.custom
  }, !$props.custom ? {
    e: common_vendor.t($props.content)
  } : {}, {
    f: $props.custom
  }, $props.custom ? {
    g: common_vendor.o(() => {
    }),
    h: common_vendor.o(() => {
    })
  } : {}, {
    i: $props.padding[0] + "rpx",
    j: $props.padding[1] || $props.padding[0] + "rpx",
    k: $props.padding[2] || $props.padding[0] + "rpx",
    l: $props.padding[3] || $props.padding[0] + "rpx",
    m: $props.lineHeight + "rpx",
    n: $data.ftColor,
    o: $data.scaleLine,
    p: $props.showCancel
  }, $props.showCancel ? {
    q: common_vendor.t($props.cancelText),
    r: $props.cancelColor || $data.ftColor,
    s: $props.radius + "px",
    t: common_vendor.o(($event) => $options.onBtnsTap(0))
  } : {}, {
    v: !$data.confirmClick
  }, !$data.confirmClick ? {
    w: common_vendor.t($props.confirmText)
  } : {}, {
    x: $props.asyncClose && $data.confirmClick
  }, $props.asyncClose && $data.confirmClick ? {
    y: "1.5px solid " + $options.loadingColor.top,
    z: "1.5px solid " + $options.loadingColor.right,
    A: "1.5px solid " + $options.loadingColor.bottom,
    B: "1.5px solid " + $options.loadingColor.left
  } : {}, {
    C: $props.confirmColor,
    D: $props.radius + "px",
    E: common_vendor.o(($event) => $options.onBtnsTap(1)),
    F: common_vendor.sr("popup", "5ec365e3-0"),
    G: common_vendor.p({
      type: "center",
      mode: "size-fixed",
      ["scroll-y"]: false,
      width: $props.width,
      height: $props.height,
      radius: $props.radius,
      ["mask-click-close"]: $props.maskClickClose,
      ["mask-alpha"]: $props.maskAlpha,
      duration: $props.duration,
      centerAnim: $props.animation,
      ["bg-color"]: $props.bgColor,
      ["slide-multi"]: $props.slideMulti,
      ["negative-top"]: $props.negativeTop,
      ["zoom-lessen-multi"]: $props.zoomLessenMulti
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/components/third-party/wyb-modal/wyb-modal.vue"]]);
wx.createComponent(Component);
