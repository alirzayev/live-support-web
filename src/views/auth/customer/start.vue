<template>
    <div class="auth-page loading">
        <div uk-height-viewport="offset-bottom: 80px" class="uk-flex uk-flex-center uk-flex-row">
            <div>
                <Chat id="chat-container" style="width: 600px; height: 400px; overflow-y: auto; " :conversation="conversation" :me="me"></Chat>
            </div>
        </div>
    </div>
</template>

<script>
import img from "./img/register.jpg";
import Chat from "../../../components/Chat";
import { CHAT_CONVERSATION } from "../../../store/actions/chat";
import { USER_REQUEST } from "../../../store/actions/user";
import { AUTH_LOGOUT } from "../../../store/actions/auth";

export default {
  components: { Chat },
  data() {
    return {
      img: img
    };
  },
  computed: {
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
    this.$store.dispatch(USER_REQUEST);
    let conversation_id = this.$route.params.id;
    this.$store.dispatch(CHAT_CONVERSATION, conversation_id).then(() => {});
  },
  updated() {
    var container = this.$el.querySelector("#chat-container");
    container.scrollTop = container.scrollHeight;
  }
};
</script>

<style lang="scss" scoped>
@import "./../styles/auth-styles";
</style>
