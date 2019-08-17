<template>
  <div class="auth-page loading">
    <main>
      <div class="content content--side">
        <header class="codrops-header uk-flex uk-flex-center">
          <h1 class="uk-margin-remove uk-text-center">Welcome to {{ $store.getters.appName }}</h1>
          <p class="">Fill in the form and get started today!</p>
        </header>
        <div class="form">
          <div class="form__item">
            <label class="form__label" for="username">Email Address</label>
            <input class="form__input" type="email" v-model='username' id="username">
          </div>
          <div class="form__item">
            <label class="form__label" for="password">Password</label>
            <div class="form__input-wrap">
              <input class="form__input" type="password" v-model="password" id="password">
              <p class="form__password-strength" id="strength-output"></p>
            </div>
          </div>
          <div class="form__item form__item--actions">
            <span>Forgot your password?
              <router-link class="form__link" to="/reset">Reset</router-link>
            </span>
            <button-spinner ref="loadingButton" @click="login();">Log in</button-spinner>
          </div>
        </div>
      </div>
      <div class="content content--side">
        <div class="poster" :style="'background-image:url('+ img +')'"></div>
        <div class="canvas-wrap">
          <canvas></canvas>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
}
</style>

<script>
import img from "./img/login.jpg";
import { AUTH_REQUEST } from "@/store/actions/auth";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      client_id: 2,
      grant_type: "password",
      client_secret: "HZ5h8H0PhNUlLhIEGdFTg7rbqCiaAQ5RqDJSWwjM",
      img: img
    };
  },
  methods: {
    login() {
      this.$refs.loadingButton.startLoading();
      const { username, password, grant_type, client_secret, client_id } = this;
      this.$store
        .dispatch(AUTH_REQUEST, {
          username,
          password,
          grant_type,
          client_id,
          client_secret
        })
        .then(() => {
          this.$refs.loadingButton.stopLoading();
          this.$router.push("/");
        })
        .catch(error => {
          this.$refs.loadingButton.stopLoading();
          this.$snack.danger({
            text: error.message
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../styles/auth-styles";
</style>
