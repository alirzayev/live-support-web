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

                    <button class="uk-button uk-button-default uk-position-top-right uk-margin-small-top uk-margin-small-right"
                            uk-toggle="target: .button-label">
                        <span class="button-label">Turn off the lights</span>
                        <span class="button-label" hidden>Turn on the lights</span>
                    </button>

                    <div v-if="conversation" class="uk-card uk-card-default uk-border-rounded uk-margin-large-top">

                        <div class="uk-card-body uk-padding-small">


                            <div v-for="message in conversation.messages" :key="message.id"  v-if="!isMe(message.user_id)" class="guest uk-grid-small uk-flex-bottom uk-flex-left" uk-grid>
                                <div class="uk-width-auto">
                                    <img class="uk-border-circle" width="32" height="32"
                                         src="https://getuikit.com/docs/images/avatar.jpg">
                                </div>
                                <div class="uk-width-auto">
                                    <div class="uk-card uk-card-body uk-card-small uk-card-default uk-border-rounded">
                                        <p class="uk-margin-remove">{{message.text}}</p>
                                    </div>
                                    <small class="uk-link-text">{{message.user.name}}</small>
                                </div>
                            </div>

                            <div v-for="message in conversation.messages" :key="message.id" v-if="isMe(message.user_id)" class="me uk-grid-small uk-flex-bottom uk-flex-right uk-text-right" uk-grid>
                                <div class="uk-width-auto">
                                    <div class="uk-card uk-card-body uk-card-small uk-card-primary uk-border-rounded">
                                        <p class="uk-margin-remove">{{message.text}}</p>
                                    </div>
                                </div>
                                <div class="uk-width-auto">
                                    <img class="uk-border-circle" width="32" height="32"
                                         src="https://getuikit.com/docs/images/avatar.jpg">

                                </div>
                            </div>

                        </div>

                        <div class="uk-card-footer uk-padding-remove">
                            <div class="uk-grid-small uk-flex-middle" uk-grid>
                                <div class="uk-width-auto">
                                    <a href="#" class="uk-icon-link uk-margin-small-left" uk-icon="icon: happy"></a>
                                </div>
                                <div class="uk-width-expand">
                                    <div class="uk-padding-small uk-padding-remove-horizontal">
                                    <textarea class="uk-textarea uk-padding-remove uk-border-remove" rows="1"
                                              placeholder="Escreva a mensagem..."></textarea>
                                    </div>
                                </div>
                                <div class="uk-width-auto">
                                    <ul class="uk-iconnav uk-margin-small-right">
                                        <li>
                                            <a href="#" uk-icon="icon: image"></a>
                                        </li>
                                        <li>
                                            <a href="#" uk-icon="icon: location"></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

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

export default {
  name: "Home",
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
    },
    isMe(id) {
      return this.me.id === id;
    }
  },
  mounted() {
    this.$store.dispatch(CHAT_CONVERSATIONS).then(() => {});
    this.$store.dispatch(USER_REQUEST).then(() => {});
  }
};
</script>
<style scoped>
.uk-card-small {
  & .uk-card-body {
    padding: 5px 8px;
    font-size: 13px;
  }
}

.uk-border-remove {
  border: 0 none;
}

textarea {
  background: none !important;
  resize: none;
}

@keyframes dot-anim {
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -6px);
  }
  0% {
    transform: translate(0, 0);
  }
}

% etc-pattern {
  width: 6px;
  height: 6px;
  background: #222;
  border-radius: 100%;
  display: inline-block;
  animation: dot-anim 1s infinite linear;
  transform: translate(0, 0);
}

.etc {
  display: block;
  position: relative;

  i {
    @extend % etc-pattern;

    & + i {
      margin-left: 3px;
    }

    & :nth-child(1) {
      animation-delay: 0.5s;
    }

    & :nth-child(2) {
      animation-delay: 0.4s;
    }

    & :nth-child(3) {
      animation-delay: 0.3s;
    }
  }
}

.uk-card {
  position: relative;
  z-index: 1;
}

.guest .uk-card:after,
.me .uk-card:after {
  width: 10px;
  height: 45px;
  position: absolute;
  bottom: 0;
}

.guest .uk-card:after {
  background: #fff;
  left: -4px;
  clip-path: polygon(100% 70%, 0% 100%, 100% 100%);
}

.me .uk-card:after {
  background: #1e87f0;
  right: -4px;
  clip-path: polygon(0 70%, 0% 100%, 100% 100%);
}

.conversation {
  cursor: pointer;
}
</style>
