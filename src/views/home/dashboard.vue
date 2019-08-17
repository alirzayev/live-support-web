<template>
    <div uk-height-viewport="offset-bottom: 80px">
        <h1 class="uk-flex uk-flex-center">Welcome! {{me.name}}</h1>
        <div class="uk-flex uk-flex-center  uk-flex-row">
            <div class="uk-section">
                <div class="uk-container uk-width-large">

                    <ul v-for="conv in conversations" :key="conv.id" class="uk-list uk-list-striped">
                        <li class="conversation" @click="loadMessages(conv.id)">{{conv.subject}}</li>
                    </ul>
                </div>
            </div>
            <div class="uk-section">
                <div class="uk-container uk-width-large">

                    <button @click="logout" class="uk-button uk-button-default uk-position-top-right uk-margin-small-top uk-margin-small-right"
                            uk-toggle="target: .button-label">
                        <span class="button-label">Logout</span>
                    </button>
                    <Chat :conversation="conversation" :me="me"></Chat>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/actions/auth.js";
import {
  CHAT_CONVERSATIONS,
  CHAT_CONVERSATION
} from "../../store/actions/chat";
import { USER_REQUEST } from "../../store/actions/user";
import Chat from "../../components/Chat";

export default {
  name: "Home",
  components: { Chat },
  computed: {
    conversations() {
      return this.$store.getters.conversations;
    },
    conversation() {
      return this.$store.getters.conversation;
    },
    me() {
      return this.$store.getters.getProfile;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
    },
    loadMessages(conversation_id) {
      this.$store.dispatch(CHAT_CONVERSATION, conversation_id).then(() => {});
    }
  },
  mounted() {
    this.$store.dispatch(CHAT_CONVERSATIONS).then(() => {});
    this.$store.dispatch(USER_REQUEST).then(() => {});
  }
};
</script>