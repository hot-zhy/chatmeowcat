"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniIdCo = common_vendor.Ds.importObject("uni-id-co");
const db = common_vendor.Ds.database();
const usersTable = db.collection("uni-id-users");
let hostUserInfo = common_vendor.index.getStorageSync("uni-id-pages-userInfo") || {};
const data = {
  userInfo: hostUserInfo,
  hasLogin: Object.keys(hostUserInfo).length != 0
};
const mutations = {
  // data不为空，表示传递要更新的值(注意不是覆盖是合并),什么也不传时，直接查库获取更新
  async updateUserInfo(data2 = false) {
    console.log(20, data2);
    if (data2) {
      usersTable.where("_id==$env.uid").update(data2).then((e) => {
        if (e.result.updated) {
          common_vendor.index.showToast({
            title: "更新成功",
            icon: "none",
            duration: 3e3
          });
          this.setUserInfo(data2);
        } else {
          common_vendor.index.showToast({
            title: "没有改变",
            icon: "none",
            duration: 3e3
          });
        }
      });
    } else {
      try {
        let res = await usersTable.where("'_id' == $cloudEnv_uid").field("mobile,nickname,username,email,avatar_file").get();
        this.setUserInfo(res.result.data[0]);
      } catch (e) {
        this.setUserInfo({}, { cover: true });
        console.error(e.message, e.errCode);
      }
    }
  },
  async setUserInfo(data2, { cover } = { cover: false }) {
    console.log("set-userInfo", data2);
    let userInfo = cover ? data2 : Object.assign(store.userInfo, data2);
    store.userInfo = Object.assign({}, userInfo);
    store.hasLogin = Object.keys(store.userInfo).length != 0;
    console.log("store.userInfo", store.userInfo);
    common_vendor.index.setStorage({
      key: "uni-id-pages-userInfo",
      data: store.userInfo
    });
    return data2;
  },
  async logout() {
    var _a;
    if (common_vendor.Ds.getCurrentUserInfo().tokenExpired > Date.now()) {
      try {
        await uniIdCo.logout();
      } catch (e) {
        console.error(e);
      }
    }
    common_vendor.index.removeStorageSync("uni_id_token");
    common_vendor.index.setStorageSync("uni_id_token_expired", 0);
    common_vendor.index.redirectTo({
      url: `/${((_a = common_vendor.pagesJson.uniIdRouter) == null ? void 0 : _a.loginPage) ?? "uni_modules/uni-id-pages/pages/login/login-withoutpwd"}`
    });
    common_vendor.index.$emit("uni-id-pages-logout");
    this.setUserInfo({}, { cover: true });
  },
  loginBack(e = {}) {
    const { uniIdRedirectUrl = "" } = e;
    let delta = 0;
    let pages = getCurrentPages();
    pages.forEach((page, index) => {
      if (pages[pages.length - index - 1].route.split("/")[3] == "login") {
        delta++;
      }
    });
    if (uniIdRedirectUrl) {
      return common_vendor.index.reLaunch({
        url: uniIdRedirectUrl
      });
    }
    if (delta) {
      const page = common_vendor.pagesJson.pages[0];
      return common_vendor.index.reLaunch({
        url: `/${page.path}`
      });
    }
    common_vendor.index.navigateBack({
      delta
    });
  },
  loginSuccess(e = {}) {
    const {
      showToast = true,
      toastText = "登录成功",
      autoBack = true,
      uniIdRedirectUrl = "",
      passwordConfirmed
    } = e;
    if (showToast) {
      common_vendor.index.showToast({
        title: toastText,
        icon: "none",
        duration: 3e3
      });
    }
    this.updateUserInfo();
    common_vendor.index.$emit("uni-id-pages-login-success");
    if (autoBack) {
      this.loginBack(uniIdRedirectUrl);
    }
  }
};
const store = common_vendor.reactive(data);
exports.mutations = mutations;
