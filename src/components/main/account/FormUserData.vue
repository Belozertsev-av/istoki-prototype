<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import {useAPI} from "../../../stores/store.js";

name = "FormUserData"

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})
const api = useAPI()
const isActive = ref(true)
const newData = reactive(JSON.parse(localStorage.getItem("userData")))
if (newData.phoneNumber != null) newData.phoneNumber = '+7' + newData.phoneNumber.toString()
const regexLogin = /^[a-zA-Z0-9._-]{6,30}$/i
const regexTel = /^[0-9+-]{12}$/i
const regexMail = /^([A-Za-z0-9_.-])+@([A-Za-z0-9_.-])+\.([A-Za-z]{2,4})$/
const regexText = /^[а-яёА-ЯЁ a-zA-Z-]+$/i
const alert = reactive({
  checkTel: "",
  checkLogin: "",
  checkMail: "",
  checkFirstName: "",
  checkLastName: "",
  reservedTel: "",
  reservedLogin: "",
  reservedMail: "",
  result: ""

})

const isCheck = (field) => {
  if (field === "login" && newData.login !== props.userData.login) {
    if (!regexLogin.test(newData.login)) {
      alert.checkLogin = "Логин может содержать только латинские буквы, цифры и спецсимволы: ._-"
      isActive.value = false
      return false
    } else {
      alert.checkLogin = ""
      isActive.value = true
      return true
    }
  } else if (field === "fName") {
    if (!regexText.test(newData.fName)) {
      alert.checkFirstName = "Недопустимый формат"
      isActive.value = false
      return false
    } else {
      alert.checkFirstName = ""
      isActive.value = true
      return true
    }
  } else if (field === "lName") {
    if (!regexText.test(newData.lName)) {
      alert.checkLastName = "Недопустимый формат"
      isActive.value = false
      return false
    } else {
      alert.checkLastName = ""
      isActive.value = true
      return true
    }
  } else if (field === "tel" && newData.phoneNumber !== null) {
    if (!regexTel.test(newData.phoneNumber)) {
      alert.checkTel = "Телефон должен иметь вид: +79991113300"
      isActive.value = false
      return false
    } else {
      alert.checkTel = ""
      isActive.value = true
      return true
    }
  } else if (field === "mail" && newData.mail !== "") {
    if (!regexMail.test(newData.mail)) {
      alert.checkMail = "Адрес электронной почты указан неверно"
      isActive.value = false
      return false
    } else {
      alert.checkMail = ""
      isActive.value = true
      return true
    }

  }
}
const isReserved = async (field) => {
  if (field === "login") {
    await axios.get(api.URL + "/api/users/search?login=" + newData.login, {responseType: "json"})
        .then(function (response) {
          if (response.data !== "error" && newData.login.toLowerCase() !== props.userData.login.toLowerCase()) {
            alert.reservedLogin = "Такой логин уже занят"
            isActive.value = false
            return true
          } else {
            alert.reservedLogin = ""
            return false
          }
        })
  } else if (field === "mail") {
    await axios.get(api.URL + "/api/users/search?mail=" + newData.mail, {responseType: "json"})
        .then(function (response) {
          if (response.data !== "error" && newData.mail !== props.userData.mail) {
            alert.reservedMail = "Адрес электронной почты уже занят"
            isActive.value = false
            return true
          } else {
            alert.reservedMail = ""
            return false
          }
        })
  } else if (field === "tel") {
    await axios.get(api.URL + "/api/users/search?tel=" + newData.phoneNumber.toString().substring(2), {responseType: "json"})
        .then(function (response) {
          if (response.data !== "error" && newData.phoneNumber.substring(2) !== props.userData.phoneNumber.toString()) {
            alert.reservedTel = "Такой телефон уже занят"
            isActive.value = false
            return true
          } else {
            alert.reservedTel = ""
            isActive.value = true
            return false
          }
        })
  } else {
    return false
  }
}
const sendUpData = async () => {
  if (isActive) {
    newData.phoneNumber = newData.phoneNumber.substring(2)
    await axios.patch(api.URL + "/api/users/" + props.userData.id, newData, {
      headers: {
        "content-type": "application/json",
      }
    }).then(function () {
      alert.result = "Данные успешно обновлены"
      location.reload()
    })
  }
}
</script>

<template>
  <form v-on:submit.prevent="sendUpData" class="account__form">
    <div class="account__block">
      <div class="account__subtitle subtitle">Личные данные</div>
      <div class="account__field">
        <div class="account__label">Логин:</div>
        <input class="account__login field" v-model="newData.login"
               type="text"
               placeholder="ivan.Ov"
               @focusout="isReserved('login'); isCheck('login')">
      </div>
      <div class="reg__text" v-if="alert.checkLogin !== ''"> {{ alert.checkLogin }}</div>
      <div class="reg__text" v-if="alert.reservedLogin !== ''"> {{ alert.reservedLogin }}</div>
      <div class="account__field">
        <div class="account__label">Имя:</div>
        <input class="account__name field"
               v-model="newData.fName"
               type="text"
               placeholder="Иван"
               @focusout="isCheck('fName')">
      </div>
      <div class="reg__text" v-if="alert.checkFirstName !== ''"> {{ alert.checkFirstName }}</div>
      <div class="account__field">
        <div class="account__label">Фамилия:</div>
        <input class="account__last-name field"
               v-model="newData.lName"
               type="text"
               placeholder="Иванов"
               @focusout="isCheck('lName')">
      </div>
      <div class="reg__text" v-if="alert.checkLastName !== ''"> {{ alert.checkLastName }}</div>
      <div class="account__field">
        <div class="account__label">Электронная почта:</div>
        <input class="account__email field"
               v-model="newData.mail"
               type="email"
               placeholder="Не указана"
               @focusout="isReserved('mail'); isCheck('mail')">
      </div>
      <div class="reg__text" v-if="alert.checkMail !== ''"> {{ alert.checkMail }}</div>
      <div class="reg__text" v-if="alert.reservedMail !== ''"> {{ alert.reservedMail }}</div>
      <div class="account__field">
        <div class="account__label">Телефон:</div>
        <input class="account__tel field"
               v-model="newData.phoneNumber"
               type="tel"
               placeholder="+79516667722"
               @focusout="isReserved('tel'); isCheck('tel')">
      </div>
      <div class="reg__text" v-if="alert.checkTel !== ''"> {{ alert.checkTel }}</div>
      <div class="reg__text" v-if="alert.reservedTel !== ''"> {{ alert.reservedTel }}</div>
    </div>
    <div class="reg__text" v-if="alert.result !== ''"> {{ alert.result }}</div>
    <input type="submit"
           value="Изменить"
           class="account__button button"
           :disabled="!isActive"
           :class="{disabled: !isActive}">
  </form>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/mixins";
@import "src/assets/scss/commonStyle";

.account {
  &__form {
    display: flex;
    flex-direction: column;
  }

  &__block {
    border: 1px solid $primaryGrey;
    border-radius: $radius;
    padding: 20px;
    margin: 5px 0;
  }

  &__subtitle {
    text-align: center;
    margin-bottom: 10px;
  }

  &__field {
    width: 100%;
  }

  &__label {
    padding: 5px 5px;
  }

  &__button {
    background-color: $primaryColor;
    color: #fff;
    padding: 10px 20px;
    width: fit-content;
    margin: 10px auto 10px auto;
  }
}

.reg__text {
  padding: 10px;
  margin-bottom: 10px;
  max-width: 450px;
  text-align: center;
  border: 2px solid $primaryGrey;
  border-radius: $radius;
}

.disabled {
  background-color: #9a9a9a;

  &:active, &:hover {
    transform: none;
    background-color: #9a9a9a;
  }
}

@import "src/assets/scss/media";
</style>