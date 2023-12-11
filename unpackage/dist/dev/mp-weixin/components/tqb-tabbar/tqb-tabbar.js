"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["activeIndex"],
  data() {
    return {
      tabBarList: [
        {
          pagePath: "/pages/play/play",
          selectedIconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_one.png",
          iconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_one_selected.png",
          text: "玩耍"
        },
        {
          pagePath: "/pages/index/index",
          selectedIconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_two.png",
          iconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_two_selected.png",
          text: "聊天"
        },
        {
          pagePath: "/pages/physho/physho",
          selectedIconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_two.png",
          iconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_two_selected.png",
          text: "心理"
        },
        {
          pagePath: "/pages/my/my",
          selectedIconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_three.png",
          iconPath: "https://chatcat-1312908194.cos.ap-shanghai.myqcloud.com/cat_three_selected.png",
          text: "我的"
        }
      ]
    };
  },
  watch: {
    visible: function(d) {
    }
  },
  methods: {
    switchClick(data, index) {
      if (index == this.activeIndex) {
        return;
      }
      common_vendor.index.switchTab({
        url: data.pagePath
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabBarList, (item, index, i0) => {
      return {
        a: $props.activeIndex == index ? item.selectedIconPath : item.iconPath,
        b: common_vendor.t(item.text),
        c: common_vendor.n($props.activeIndex == index ? "active" : ""),
        d: index,
        e: common_vendor.o(($event) => $options.switchClick(item, index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-569cb7f7"], ["__file", "E:/projects/chatcat/components/tqb-tabbar/tqb-tabbar.vue"]]);
wx.createComponent(Component);
