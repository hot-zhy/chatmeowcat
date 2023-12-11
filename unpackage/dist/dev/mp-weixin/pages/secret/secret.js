"use strict";
const common_vendor = require("../../common/vendor.js");
const wybModal = () => "../../components/third-party/wyb-modal/wyb-modal.js";
const _sfc_main = {
  components: {
    wybModal
  },
  data() {
    return {
      inputValue: ""
    };
  },
  methods: {
    send() {
      this.$refs.modal.showModal();
    },
    onConfirmClick() {
      common_vendor.index.navigateTo({
        url: "/pages/wall/wall"
      });
    }
  }
};
if (!Array) {
  const _component_wyb_modal = common_vendor.resolveComponent("wyb-modal");
  _component_wyb_modal();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.inputValue,
    b: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    c: common_vendor.o((...args) => $options.send && $options.send(...args)),
    d: common_vendor.sr("modal", "2de85fda-0"),
    e: common_vendor.o($options.onConfirmClick),
    f: common_vendor.p({
      ["show-title"]: false,
      ["cancel-text"]: "关闭",
      ["confirm-text"]: "发送",
      custom: true,
      height: 300
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/secret/secret.vue"]]);
wx.createPage(MiniProgramPage);
