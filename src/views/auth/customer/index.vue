<template>
  <div class="auth-page loading">
    <div uk-height-viewport="offset-bottom: 80px">
      <div class="uk-flex uk-flex-center uk-flex-row">
          <div v-if="!conversation" class="content content--side">
            <header class="codrops-header uk-flex uk-flex-center">
              <h1 class="uk-margin-remove uk-text-center">Welcome to {{ $store.getters.appName }}</h1>
              <p class="">Fill in the form and get started today!</p>
            </header>
            <div class="form">
              <div class="form__item">
                <label class="form__label" for="email">Full Name</label>
                <input class="form__input" type="text" v-model="name" id="name">
              </div>
              <div class="form__item">
                <label class="form__label" for="email">Email Address</label>
                <input class="form__input" type="email" v-model="email" id="email">
              </div>
              <div class="form__item">
                <label class="form__label" for="subject">Subject</label>
                <input class="form__input" type="text" v-model="subject" id="subject">
              </div>
              <div class="form__item form__item--actions uk-float-right">
                <button-spinner ref="loadingButton" @click="register();">Start</button-spinner>
              </div>
            </div>
          </div>
          <Chat v-else :conversation="conversation" :isMe="isMe()"></Chat>
      </div>
      </div>
    </div>
</template>

<script>
import img from "./img/register.jpg";
import { AUTH_SIGNUP } from "@/store/actions/auth";
import Chat from "../../../components/Chat";
import {
  CHAT_CONVERSATION,
  CHAT_CONVERSATIONS
} from "../../../store/actions/chat";
import { USER_REQUEST } from "../../../store/actions/user";
import { AUTH_LOGOUT } from "../../../store/actions/auth";
export default {
  components: { Chat },
  data() {
    return {
      img: img,
      name: "",
      email: "",
      subject: "",
      conversation: null
    };
  },
  methods: {
    register() {
      this.$refs.loadingButton.startLoading();
      const { name, email, subject } = this;
      this.$store
        .dispatch(AUTH_SIGNUP, { name, email, subject })
        .then(response => {
          this.$refs.loadingButton.stopLoading();
          console.log("res", response);
          this.conversation = response.conversation;
          this.$snack.success({
            text: "Successfully joined to " + this.$store.getters.appName
          });
          this.$router.push({
            name: "customer chat",
            params: { id: response.conversation.id }
          });
        })
        .catch(error => {
          this.$refs.loadingButton.stopLoading();
          this.$snack.danger({
            text: error.message
          });
        });
    },
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
    },
    isMe(id) {
      return this.me.id === id;
    }
  },
  mounted() {
    this.$store.dispatch(USER_REQUEST).then(() => {});
  }
};
</script>

<style lang="scss" scoped>
@import "./../styles/auth-styles";
</style>
