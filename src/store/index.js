import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import chat from "./modules/chat";
import settings from "./modules/settings";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth,
    user,
    settings,
    chat
  },
  strict: debug
});
