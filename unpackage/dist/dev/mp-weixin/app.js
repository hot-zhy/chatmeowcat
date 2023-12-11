"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/play/play.js";
  "./pages/index/index.js";
  "./pages/list/list.js";
  "./pages/my/my.js";
  "./pages/my/home.js";
  "./pages/my/index.js";
  "./pages/my/set.js";
  "./pages/my/service.js";
  "./pages/secret/secret.js";
  "./pages/grid/grid.js";
  "./pages/chat/chat.js";
  "./pages/read/read.js";
  "./pages/listen/listen.js";
  "./pages/phone/phone.js";
  "./pages/exchange/exchange.js";
  "./pages/wall/wall.js";
  "./pages/set/set.js";
  "./pages/zero-chat/zero-chat.js";
  "./pages/privacy/privacy.js";
  "./pages/user/user.js";
  "./pages/physho/physho.js";
  "./pages/suggestion/suggestion.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/projects/chatcat/App.vue"]]);
require("./vue-devtools/hook.js");
require("./vue-devtools/backend.js");
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
