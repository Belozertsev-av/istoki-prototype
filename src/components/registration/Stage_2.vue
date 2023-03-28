<script>

import {useAPI, useUserData} from "../../stores/store.js";
import {ref, watchEffect} from "vue";
import axios from "axios";

export default {
  name: "Stage_2",
  emits: ['setStage'],
  setup(props, context) {
    const api = useAPI()
    const userData = useUserData()
    const r_password = ref('')
    let info = ref(0)

    const regexLogin = /^[a-zA-Z0-9._-]{6,30}$/i
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}/
    let isMatchLogin = ref(false)
    let isMatchPassword = ref(false)
    let isEquals = ref(false)
    let isReserved = ref(false)

    async function checkReserve() {
      await axios.get(api.URL + "/api/users/search?login=" + userData.login, {responseType: "json"})
          .then(function (response) {
            isReserved.value = response.data !== "error";
          })

      isReserved.value = info > 0;
    }

    function nextPage() {
      context.emit('setStage')
    }

    watchEffect(() => {
      isMatchLogin.value = (regexLogin.test(userData.login));

      isMatchPassword.value = regexPassword.test(userData.password);

      isEquals.value = userData.password === r_password.value;

    })
    return {
      userData,
      isMatchPassword,
      isMatchLogin,
      r_password,
      isEquals,
      nextPage,
      isReserved,
      checkReserve,
      info
    };
  },
}
</script>

<template>
  <div class="reg__title title">Регистрация</div>
  <form @submit.prevent="nextPage">
    <div class="reg__body">
      <div class="reg__subtitle subtitle">Придумайте себе логин и пароль</div>
      <input type="text"
             v-model="userData.login"
             class="reg__name"
             placeholder="Введите логин"
             @focusout="checkReserve">
      <p class="right" v-if="isMatchLogin && userData.login.length > 0 && !isReserved">Поле заполнено верно</p>
      <p class="wrong" v-if="!isMatchLogin && userData.login.length > 0">Поле заполнено неверно</p>
      <p class="wrong" v-if="isReserved">Этот логин уже занят</p>

      <div class="reg__text" v-if="!isMatchLogin">Логин может содержать только латинские буквы, цифры и некоторые
        спецсимволы
      </div>
      <input type="password" v-model="userData.password" class="reg__name" placeholder="Введите пароль">
      <p class="right" v-if="isMatchPassword && userData.password.length > 0">Поле заполнено верно</p>
      <p class="wrong" v-if="!isMatchPassword && userData.password.length > 0">Поле заполнено неверно</p>
      <input type="password" v-model="r_password" class="reg__name" placeholder="Повторите пароль">
      <p class="right" v-if="isEquals && r_password.length > 0">Пароли совпадают</p>
      <p class="wrong" v-if="!isEquals && r_password.length > 0">Пароли не совпадают</p>
      <div class="reg__text" v-if="!isMatchPassword">Пароль должен содержать буквы верхнего, нижнего регистра и
        цифры. Длина не менее 6
        символов
      </div>
      <input type="submit"
             class="reg__button button__reverse"
             v-if="isMatchLogin && isMatchPassword && isEquals && !isReserved"
             value="Продолжить">
      <input type="button"
             class="reg__button button__reverse disabled"
             disabled
             value="Продолжить"
             v-else>
    </div>
  </form>
</template>


<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

.reg {
  &__title {
    text-align: center;
    padding: 50px;
    margin: 0 auto;
  }

  &__body {
    display: flex;
    flex-direction: column;
    margin: 5px auto;
    min-width: 400px;
    color: #000;
    border-radius: $radius;
    padding: 20px;
    text-align: center;

  }

  &__subtitle {
    padding-bottom: 20px;
  }

  &__name {
    border-bottom: 3px solid $primaryGold;
    width: 100%;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 5px 10px;
  }

  &__block {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }

  &__flag {
    margin: 5px 10px;

    img {
      border-radius: $radius;
      height: 50px;
      width: 100px;
    }
  }

  &__lang {
    padding-top: 10px;
  }

  &__button {
    margin: 0 auto;
    width: fit-content;
    color: $primaryDark;
    border-color: $primaryDark;
  }

  &__text {
    padding: 10px 0;
    margin-bottom: 10px;
    max-width: 450px;
    text-align: center;
    border: 2px solid $primaryGrey;
    border-radius: $radius;
  }
}

.disabled {
  color: #9a9a9a;
  border-color: #9a9a9a;
}

@import "../../assets/scss/media.scss";
</style>