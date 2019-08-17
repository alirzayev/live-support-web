import { CHAT_CONVERSATIONS, CHAT_CONVERSATION } from "../actions/chat";
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
  }
};

const mutations = {
  [CHAT_CONVERSATIONS]: (state, resp) => {
    state.conversations = resp.data;
  },
  [CHAT_CONVERSATION]: (state, resp) => {
    state.conversation = resp.data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
