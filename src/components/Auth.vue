<script>


import {reactive, ref} from "vue";
import {useAPI, useUserData} from "../stores/store.js";
import axios from "axios";
import router from "../router/index.js";
import Header from "./Landing/Header.vue";

export default {
  name: "Registration",
  components: {Header},

  setup() {
    const userData = useUserData()
    const api = useAPI()
    const callback = ref({})
    const inputData = reactive({
      login: '',
      password: ''
    })
    console.log()
    const login = async () => {
      await axios.post(api.URL + "/api/users/login", inputData, {withCredentials: true})
          .then(
              function (response) {
                localStorage.setItem('jwt', response.data)
                router.push("/home")
              })
          .catch(
              function (error) {
                callback.value = error.response.data
              }
          )
    }
    return {
      userData,
      inputData,
      callback,
      login,
    };
  },
}
</script>

<template>
  <div class="main">
    <div class="container">
      <div class="reg__title title">Авторизация</div>
      <form @submit.prevent="login">
        <div class="reg__body">
          <div class="reg__subtitle subtitle">
          </div>
          <div class="reg__text">Используйте свой логин и пароль, чтобы авторизироваться. Если у вас нет
            аккаунта, пройдите
            <router-link to="/registration" class="reg__link">регистрацию</router-link>
          </div>
          <input type="text"
                 v-model="inputData.login"
                 class="reg__name"
                 placeholder="Введите логин">

          <input type="password" v-model="inputData.password" class="reg__name" placeholder="Введите пароль">
          <div class="reg__text"
               v-if="callback.errorCode === 404">Пользователя с таким логином не существует, или поле заполнено не
            верно
          </div>
          <div class="reg__text"
               v-else-if="callback.errorCode === 401">Пароль введен не верно
          </div>
          <input type="submit"
                 class="reg__button button__reverse"
                 value="Продолжить">
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";
@import "../assets/scss/commonStyle.scss";

.main {
  padding-top: 15vh;
  padding-bottom: 50vh;
}

.reg {
  &__title {
    text-align: center;
    padding: 50px;
    margin: 0 auto;
  }

  &__body {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
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
    padding: 10px;
    margin-bottom: 10px;
    max-width: 450px;
    text-align: center;
    border: 2px solid $primaryGrey;
    border-radius: $radius;
  }

  &__link {
    color: $primaryColor;
  }
}

.disabled {
  color: #9a9a9a;
  border-color: #9a9a9a;
}

@import "../assets/scss/media.scss";
</style>