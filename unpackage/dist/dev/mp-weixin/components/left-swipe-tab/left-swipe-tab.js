"use strict";
const common_vendor = require("../../common/vendor.js");
const wybModal = () => "../third-party/wyb-modal/wyb-modal.js";
const _sfc_main = {
  components: {
    wybModal
  },
  name: "left-swipe-tab",
  props: {
    tabData: {
      type: Array,
      default: () => []
    },
    topheight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      arr: [],
      scrolltop: 0,
      active: 0,
      height: "",
      navCount: 0,
      navScroll: "",
      current: 0
    };
  },
  created() {
    this._ini();
  },
  methods: {
    onConfirmClick() {
      common_vendor.index.showToast({
        title: "兑换成功",
        icon: "none"
      });
    },
    exchange() {
      this.$refs.modal.showModal();
    },
    onNav(item, index) {
      this.active = index;
      this.scrolltop = this.arr[index];
    },
    _ini() {
      setTimeout(() => {
        this.$nextTick(() => {
          const wid = common_vendor.index.getSystemInfoSync();
          this.height = wid.windowHeight - this.topheight;
          this.navCount = Math.round(this.height / 50);
          common_vendor.index.createSelectorQuery().in(this).selectAll(".goods-item").boundingClientRect((rects) => {
            rects.forEach((rect) => {
              this.arr.push(rect.top - rects[0].top);
            });
          }).exec();
        });
      }, 100);
    }
  }
};
if (!Array) {
  const _component_u_divider = common_vendor.resolveComponent("u-divider");
  const _component_wyb_modal = common_vendor.resolveComponent("wyb-modal");
  (_component_u_divider + _component_wyb_modal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tabData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.onNav(item, index), item.name),
        c: $data.active == index ? 1 : "",
        d: item.name,
        e: item.id
      };
    }),
    b: $data.current,
    c: common_vendor.f($props.tabData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title[0]),
        b: common_vendor.t(item.title[1]),
        c: "da6000df-0-" + i0,
        d: common_vendor.p({
          text: item.name,
          textPosition: "left",
          textColor: "#000"
        }),
        e: common_vendor.f(item.goods, (i, k1, i1) => {
          return {
            a: common_vendor.o((...args) => $options.exchange && $options.exchange(...args), i),
            b: i.img,
            c: common_vendor.t(i.price),
            d: i
          };
        }),
        f: index
      };
    }),
    d: $data.scrolltop,
    e: common_vendor.s("height:" + $data.height + "px"),
    f: common_vendor.sr("modal", "da6000df-1"),
    g: common_vendor.o($options.onConfirmClick),
    h: common_vendor.p({
      ["show-title"]: false,
      ["cancel-text"]: "关闭",
      ["confirm-text"]: "好的",
      custom: true,
      height: 500
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-da6000df"], ["__file", "E:/projects/chatcat/components/left-swipe-tab/left-swipe-tab.vue"]]);
wx.createComponent(Component);
