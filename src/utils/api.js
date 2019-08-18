import axios from "axios";
import { settings } from "@/settings";
import router from "./../router";

const API_SERVER = settings.API_SERVER;
const API_ROOT = settings.API_ROOT;

export const api_routes = {
  user: {
    login: API_ROOT + "oauth/token",
    signup: API_SERVER + "customer-login",
    me: API_SERVER + "user"
  },
  chat: {
    conversations: API_SERVER + "conversations",
    messages: API_SERVER + "messages"
  }
};

export const apiCall = ({ url, method, ...args }) =>
  new Promise((resolve, reject) => {
    let token = localStorage.getItem("user-token") || "";

    if (token)
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    try {
      axios({
        method: method || "get",
        url: url,
        ...args
      })
        .then(resp => {
          resolve(resp.data);
        })
        .catch(error => {
          console.log("error", error.response);
          router.push("/");
          reject(error);
        });
    } catch (err) {
      console.log("error", err);
      reject(new Error(err.response));
    }
  });
