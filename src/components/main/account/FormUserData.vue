<script setup>
import {reactive, ref, watchEffect} from "vue";
import axios from "axios";
import {useAPI, useRegex} from "../../../stores/store.js";
import FormField from "./FormField.vue";

name = "FormUserData"

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})
const api = useAPI()
const regex = useRegex()
const newData = reactive(JSON.parse(localStorage.getItem("userData")))

const access = reactive({
  login: false,
  lName: false,
  fName: false,
  tel: false,
  mail: false,
})
const callback = ref('')
const isActive = ref(false)

watchEffect(() => {
  isActive.value = (access.login === true && access.mail === true && access.tel === true && access.lName === true && access.fName === true)
})

const sendUpData = async () => {
  if (isActive) {
    await axios.patch(api.URL + "/api/users/" + props.userData.id, newData, {headers: {'content-type': 'application/json'}})
        .then(function (response) {
          if (response.status === 200)
            callback.value = "Данные успешно обновлены"
        }).catch(
            function (error) {
              callback.value = "Произошла ошибка " + error.response.status + " при обновлении данных"
            }
        )
  }
}

</script>

<template>
  <form v-on:submit.prevent="sendUpData" class="account__form">
    <div class="account__block">
      <div class="account__subtitle subtitle">Личные данные</div>
      <FormField :form="{
                  name: 'login',
                  field: 'Логин',
                  type: 'text',
                  value: props.userData.login,
                  placeholder: 'Введите логин',
                  regex: regex.regexLogin,
                  alert: regex.alertLogin
                  }"
                 @login-validate="(arg) => newData.login = arg"
                 @login-check="(arg) => access.login = arg"></FormField>
      <FormField :form="{
                        name: 'mail',
                        field: 'E-mail',
                        type: 'mail',
                        value: props.userData.mail,
                        placeholder: 'Введите ваш e-mail',
                        regex: regex.regexMail,
                        alert: regex.alertMail
                        }"
                 @mail-validate="(arg) => newData.mail = arg"
                 @mail-check="(arg) => access.mail = arg"></FormField>
      <FormField :form="{
                        name: 'fName',
                        field: 'Имя',
                        type: 'text',
                        value: props.userData.fName,
                        placeholder: 'Введите ваше имя',
                        regex: regex.regexText,
                        alert: regex.alertText
                        }"
                 @f-name-validate="(arg) => newData.fName = arg"
                 @f-name-check="(arg) => access.fName = arg"></FormField>
      <FormField :form="{
                        name: 'lName',
                        field: 'Фамилия',
                        type: 'text',
                        value: props.userData.lName,
                        placeholder: 'Введите вашу фамилию',
                        regex: regex.regexText,
                        alert: regex.alertText
                        }"
                 @l-name-validate="(arg) => newData.lName = arg"
                 @l-name-check="(arg) => access.lName = arg"></FormField>
      <FormField :form="{
                        name: 'tel',
                        field: 'Телефон',
                        type: 'tel',
                        value: '+' + props.userData.phoneNumber,
                        placeholder: 'Введите ваш телефон',
                        regex: regex.regexTel,
                        alert: regex.alertTel
                        }"
                 @tel-validate="(arg) => newData.phoneNumber = arg"
                 @tel-check="(arg) => access.tel = arg"></FormField>
      <input type="submit"
             value="Изменить"
             :disabled="!isActive"
             :class="{disabled: !isActive}"
             class="account__button button">
    </div>
  </form>
  <div class="reg__text" v-if="callback !== ''"> {{ callback }}</div>
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