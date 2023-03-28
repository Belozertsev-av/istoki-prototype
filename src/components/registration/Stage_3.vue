<script>
import {useAPI, useUserData} from "../../stores/store.js";
import {ref, watchEffect} from "vue";
import axios from "axios";
import router from "../../router/index.js";

export default {
  name: "Stage_3",
  emits: ['setStage'],
  setup(props, context) {
    const api = useAPI()
    const userData = useUserData()
    let info = ref(0)
    const regexTel = /^[0-9+-]{11,14}$/i
    const regexEmail = /^([A-Za-z0-9_.-])+@([A-Za-z0-9_.-])+\.([A-Za-z]{2,4})$/
    let isMatchTel = ref(false)
    let isMatchEmail = ref(false)
    let isReserved = ref(false)

    async function checkReserve() {
      await axios.get(api.URL + "/api/users/search?tel=" + userData.phoneNumber, {responseType: "json"})
          .then(function (response) {
            isReserved.value = (response.data !== "error");
          })
    }

    async function registerAndContinue() {
      await axios.post(api.URL + "/api/users", userData, {
        headers: {
          "content-type": "application/json",
        }
      })
          .then(async function () {
            await axios.post(api.URL + "/api/users/login", userData, {withCredentials: true})
                .then(
                    function (response) {
                      localStorage.setItem('jwt', response.data)
                      router.push("/home")
                    })
          }).catch(function error() {
            router.push("/")
          })
    }

    watchEffect(() => {
      isMatchTel.value = (regexTel.test(userData.phoneNumber));

      isMatchEmail.value = regexEmail.test(userData.mail);

    })
    return {
      userData,
      isMatchTel,
      isMatchEmail,
      isReserved,
      checkReserve,
      registerAndContinue,
      info
    };
  },
}
</script>

<template>
  <div class="reg__title title">Регистрация</div>
  <form @submit.prevent="registerAndContinue">
    <div class="reg__body">
      <div class="reg__subtitle subtitle">Введите ваш номер телефона или e-mail</div>
      <div class="reg__text">Данные поля не обязательны! Они нужны для восстановления доступа к
        аккаунту в случае если вы забудете свой логин или пароль
      </div>
      <input type="tel"
             v-model="userData.phoneNumber"
             class="reg__name"
             placeholder="Введите номер телефона (необязательно)"
             @focusout="checkReserve">
      <p class="right" v-if="isMatchTel && userData.phoneNumber >= 11 && !isReserved">Поле заполнено верно</p>
      <p class="wrong" v-if="!isMatchTel && userData.phoneNumber > 11">Поле заполнено неверно</p>
      <p class="wrong" v-if="isReserved">Этот телефон уже зарегестрирован</p>
      <input type="email" v-model="userData.mail" class="reg__name"
             placeholder="Введите ваш e-mail (необязательно)">
      <p class="right" v-if="isMatchEmail && userData.mail.length > 5">Поле заполнено верно</p>
      <p class="wrong" v-if="!isMatchEmail && userData.mail.length > 5">Поле заполнено неверно</p>
      <div class="reg__text" v-if="!isMatchEmail">Пароль должен содержать буквы верхнего, нижнего регистра и
        цифры. Длина не менее 6
        символов
      </div>
      <input type="submit"
             class="reg__button button__reverse"
             v-if="(userData.mail === '' && (userData.phoneNumber === null || userData.phoneNumber === 0 || userData.phoneNumber === '')) || (userData.phoneNumber >= 11 || userData.mail.length > 5)"
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
    margin: 10px auto;
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