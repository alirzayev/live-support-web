import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Login from "@/views/auth/login";
import CustomerHome from "@/views/auth/customer";
import CustomerChat from "@/views/auth/customer/start";
import App from "@/views/layouts/App";
import Dashboard from "@/views/home/dashboard";
import { CHAT_CONVERSATION } from "../store/actions/chat";
import { USER_REQUEST } from "../store/actions/user";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("dashboard");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};


export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: CustomerHome,
      //beforeEnter: ifAuthenticated
    },
    {
      path: "/dashboard",
      name: "app",
      component: App,
      //beforeEnter: ifAuthenticated,
      children: [
        {
          path: "",
          name: "dashboard",
          component: Dashboard
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
      //beforeEnter: ifNotAuthenticated
    },
    {
      path: "/conversations/:id",
      name: "customer chat",
      component: CustomerChat,
    }
  ]
});
