<template>
    <div v-if="conversation" class="uk-card uk-card-default uk-border-rounded uk-margin-large-top">

        <div class="uk-card-body uk-padding-small">
            <div v-for="message in conversation.messages" :key="message.id">
                <div   v-if="!isMe(message.user_id)" class="guest uk-grid-small uk-flex-bottom uk-flex-left" uk-grid>
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
                <div  v-else class="me uk-grid-small uk-flex-bottom uk-flex-right uk-text-right" uk-grid>
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

        </div>

        <div class="uk-card-footer uk-padding-remove">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-auto">
                    <a href="#" class="uk-icon-link uk-margin-small-left" uk-icon="icon: happy"></a>
                </div>
                <div class="uk-width-expand">
                    <div class="uk-padding-small uk-padding-remove-horizontal">
                                    <textarea v-model="text" @keyup.enter="sendMessage" class="uk-textarea uk-padding-remove uk-border-remove" rows="1"
                                              placeholder="type your message...">

                                    </textarea>
                    </div>
                </div>
                <div class="uk-width-auto">
                    <ul class="uk-iconnav uk-margin-small-right">
                        <li>
                            <router-link @click.native="sendMessage" to="" uk-icon="icon: play"></router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { PUSH_MESSAGE, SEND_MESSAGE } from "../store/actions/chat";
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");
import { settings } from "@/settings";
const API_ROOT = settings.API_ROOT;

export default {
  data() {
    return {
      text: "",
      newMessage: {}
    };
  },
  props: {
    conversation: {
      type: Object,
      required: true
    },
    me: {
      type: Object,
      required: true
    }
  },
  name: "Chat",
  methods: {
    isMe(id) {
      return this.me.id === id;
    },
    sendMessage() {
      this.newMessage.user_id = this.me.id;
      this.newMessage.user = this.me;
      this.newMessage.text = this.text;
      this.newMessage.conversation_id = this.conversation.id;

      this.$store.dispatch(SEND_MESSAGE, this.newMessage);
      this.text = "";
    }
  },
  mounted() {
    window.Echo = new Echo({
      authEndpoint: API_ROOT + "broadcasting/auth",
      broadcaster: "pusher",
      key: "2e601e4694f93c372be4",
      cluster: "eu",
      forceTLS: true,
      auth: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user-token")
        }
      }
    });

    window.Echo.join("live-support")
      .here(users => {
        console.log("chat users", users);
      })
      .joining(user => {
        console.log("joined user", user.name);
      })
      .leaving(user => {
        console.log(user.name);
      })
      .listen("MessageSent", e => {
        console.log("event object", e);
        let message = {};
        message.id = e.message.id
        message.user_id = e.message.user_id;
        message.user = e.user;
        message.text = e.message.text;
        message.conversation_id = e.message.conversation_id;

        this.$store.commit(PUSH_MESSAGE, message);
      });
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
