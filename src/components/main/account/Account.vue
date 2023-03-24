<script setup>
import {onMounted, reactive} from "vue";
import router from "../../../router/index.js";
import FormUserData from "./FormUserData.vue";
import FormPass from "./FormPass.vue";
import FormAvatar from "./FormAvatar.vue";
import FormFeedback from "./FormFeedback.vue";
import FormProgress from "./FormProgress.vue";

name = "Account"

const emit = defineEmits(["loggedIn", "logout"])
const userData = reactive(JSON.parse(localStorage.getItem("userData")))


onMounted(() => {
  if (localStorage.getItem("jwt")) {
    emit('loggedIn')
  } else {
    router.push("/")
  }

})

const logout = () => {
  localStorage.clear()
  emit('logout')
}
</script>

<template>
  <div class="main">
    <div class="container">
      <div class="account__body">
        <div class="account__column">
          <div class="account__title title">Ваш аккаунт</div>
          <FormAvatar :user-data="userData"></FormAvatar>
          <FormUserData :user-data="userData"></FormUserData>
          <FormPass :user-data="userData"></FormPass>
        </div>
        <div class="account__column">
          <div class="account__title title">Настройки</div>
          <FormFeedback :user-data="userData"></FormFeedback>
          <FormProgress :user-data="userData"></FormProgress>
        </div>
        <router-link class="account__logout router_link"
                     to="/"
                     v-on:click="logout">
          <div class="account__button button">Выйти</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/mixins";
@import "src/assets/scss/commonStyle";

.container {
  @include adaptive-value("width", 1240, 500, 0)
}

.account {
  &__logout {
    display: none;
  }

  &__body {
    display: flex;
    margin: 100px auto 0 auto;
    justify-content: center;
    width: 100%;
  }

  &__column {
    display: flex;
    flex-direction: column;
    margin: 0 5px 100px 0;
  }

  &__title {
    margin-bottom: 30px;
    text-align: center;
  }

  &__button {
    background-color: $primaryColor;
    color: #fff;
    padding: 10px 20px;
    width: fit-content;
    margin: 10px auto 10px auto;
  }
}


@media screen and (max-width: 767px) {
  .container {
    width: 80%;
  }
}

@media screen and (max-width: 650px) {
  .container {
    width: 90%;
  }
}

@media screen and (max-width: 479px) {
  .container {
    width: 100%;
  }
}

@import "src/assets/scss/media";
</style>