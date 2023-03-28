<script setup>
import FormField from "../../common/FormField.vue";
import {useAPI, useRegex} from "../../../stores/store.js";
import {reactive, ref} from "vue";
import axios from "axios";

name = "FormPass"

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})
const api = useAPI()
const regex = useRegex()
const newData = reactive(JSON.parse(localStorage.getItem("userData")))

const callback = ref('')
const isActive = ref(false)

const sendUpPass = async () => {
  if (isActive) {
    await axios.patch(api.URL + "/api/users/" + props.userData.id + "?pass=true", newData, {
      withCredentials: true,
      headers: {'content-type': 'application/json'}
    })
        .then(function (response) {
          if (response.status === 200)
            callback.value = response.data
        }).catch(
            function (error) {
              callback.value = "Произошла ошибка " + error.response.status + " при обновлении данных"
            }
        )
  }
}
</script>

<template>
  <form v-on:submit.prevent="sendUpPass" class="account__form">
    <div class="account__block">
      <div class="account__subtitle subtitle">Пароль</div>
      <FormField :form="{
                        name: 'password',
                        field: 'Новый пароль',
                        type: 'password',
                        value: props.userData.password,
                        placeholder: 'Введите новый пароль',
                        regex: regex.regexPassword,
                        alert: regex.alertPassword
                        }"
                 @password-validate="(arg) => newData.password = arg"
                 @password-check="(arg) => isActive = arg"></FormField>
      <input type="submit"
             value="Изменить"
             :disabled="!isActive"
             :class="{disabled: !isActive}"
             class="account__button button">
    </div>
  </form>
  <div class="form__text" v-if="callback !== ''"> {{ callback }}</div>
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

  &__button {
    background-color: $primaryColor;
    color: #fff;
    padding: 10px 20px;
    width: fit-content;
    margin: 10px auto 10px auto;
  }
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