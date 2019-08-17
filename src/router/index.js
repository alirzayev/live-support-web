import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Login from "@/views/auth/login";
import Register from "@/views/auth/customer";
import CustomerChat from "@/views/auth/customer/start";
import App from "@/views/layouts/App";
import Dashboard from "@/views/home/dashboard";

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

const ifNoConversation = (to, from, next) => {
  if (to.params.id) {
    next();
    return;
  }
  next("/");
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/dashboard",
      name: "app",
      component: App,
      beforeEnter: ifAuthenticated,
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
      // beforeEnter: ifNotAuthenticated
    },
    {
      path: "/",
      name: "home",
      component: Register
      // beforeEnter: ifNotAuthenticated
    },
    {
      path: "/conversations",
      name: "customer chat",
      component: CustomerChat,
      beforeEnter: ifNoConversation
    }
  ]
});
