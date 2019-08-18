import {
  CHAT_CONVERSATIONS,
  CHAT_CONVERSATION,
  SEND_MESSAGE, PUSH_MESSAGE
} from "../actions/chat";
import { apiCall, api_routes } from "@/utils/api";

const state = {
  conversations: [],
  conversation: {}
};

const getters = {
  conversations: state => state.conversations,
  conversation: state => state.conversation
};

const actions = {
  [CHAT_CONVERSATIONS]: ({ commit, dispatch }) => {
    apiCall({ url: api_routes.chat.conversations })
      .then(resp => {
        commit(CHAT_CONVERSATIONS, resp);
      })
      .catch(err => {
        console.log(err);
      });
  },
  [CHAT_CONVERSATION]: ({ commit }, conversation_id) => {
    apiCall({
      url: api_routes.chat.conversations + "/" + conversation_id
    })
      .then(resp => {
        commit(CHAT_CONVERSATION, resp);
      })
      .catch(err => {
        console.log(err);
      });
  },

  [SEND_MESSAGE]: ({ commit }, data) => {
    apiCall({
      url: api_routes.chat.messages, data: data, method: "post"
    })
      .then(resp => {
        console.log('message', resp);
        commit(SEND_MESSAGE, resp);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const mutations = {
  [CHAT_CONVERSATIONS]: (state, resp) => {
    state.conversations = resp.data;
  },
  [CHAT_CONVERSATION]: (state, resp) => {
    state.conversation = resp.data;
  },
  [SEND_MESSAGE]: (state, resp) => {
    state.message = resp.data;
  },
  [PUSH_MESSAGE]: (state, message) => {
    state.conversation.messages.push(message)
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
