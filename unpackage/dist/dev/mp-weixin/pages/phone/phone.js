"use strict";
const common_vendor = require("../../common/vendor.js");
const wybModal = () => "../../components/third-party/wyb-modal/wyb-modal.js";
const _sfc_main = {
  components: {
    wybModal
  },
  data() {
    return {
      selectedPhone: "",
      phones: [
        "北京：01082951332",
        "天津：022-88188858",
        "河北：0315-96312",
        "内蒙古：0471-12320（转5）",
        "辽宁：0434-5079512",
        "上海：021-96525",
        "浙江：0551-63666903",
        "安徽：0551-63666903",
        "福建：0592-5395159",
        "江西：027-85844666",
        "广东广州：020-81899120",
        "广东深圳：4009959959",
        "广东佛山：0757-82667888",
        "云南：0871-6501111",
        "新疆：0993-2851261"
      ]
    };
  },
  onLoad() {
    this.selectedPhone = "北京：01082951332";
  },
  methods: {
    secret() {
      common_vendor.index.navigateTo({
        url: "/pages/secret/secret"
      });
    },
    consult() {
      this.$refs.modal.showModal();
    },
    onConfirmClick() {
      common_vendor.index.makePhoneCall({
        phoneNumber: this.selectedPhone
      });
    },
    changePhone(phone) {
      this.selectedPhone = phone;
    },
    psychological() {
      common_vendor.index.navigateTo({
        url: "/pages/read/read"
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
    a: common_vendor.o((...args) => $options.secret && $options.secret(...args)),
    b: common_vendor.o((...args) => $options.consult && $options.consult(...args)),
    c: common_vendor.o((...args) => $options.psychological && $options.psychological(...args)),
    d: common_vendor.f($data.phones, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $options.changePhone(item), index),
        d: common_vendor.n(item === $data.selectedPhone ? "selectedPhone" : "")
      };
    }),
    e: common_vendor.sr("modal", "a27f9790-0"),
    f: common_vendor.o($options.onConfirmClick),
    g: common_vendor.p({
      ["show-title"]: false,
      ["cancel-text"]: "关闭",
      ["confirm-text"]: "去拨打",
      custom: true,
      height: 800
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/projects/chatcat/pages/phone/phone.vue"]]);
wx.createPage(MiniProgramPage);
