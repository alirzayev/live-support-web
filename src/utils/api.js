import axios from "axios";
import { settings } from "@/settings";

const API_SERVER = settings.API_SERVER;
const API_ROOT = settings.API_ROOT;

export const api_routes = {
  user: {
    login: API_ROOT + "oauth/token",
    signup: API_SERVER + "auth/signup",
    me: API_SERVER + "user"
  },
  chat: {
    conversations: API_SERVER + "conversations"
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
          reject(error);
        });
    } catch (err) {
      reject(new Error(err));
    }
  });
