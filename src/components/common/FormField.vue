<script setup>
import axios from "axios";
import {ref, watchEffect} from "vue";
import {useAPI} from "../../stores/store.js";

name = "FormField"
const api = useAPI()
const emit = defineEmits({
  'loginValidate': "",
  'mailValidate': "",
  'telValidate': "",
  'fNameValidate': "",
  'lNameValidate': "",
  'passwordValidate': "",
  'passwordCheck': null,
  'loginCheck': null,
  'mailCheck': null,
  'telCheck': null,
  'fNameCheck': null,
  'lNameCheck': null
})
const props = defineProps({
  form: {
    type: Object,
    required: true,
    default: {
      name: "field",
      field: "Поле",
      type: "text",
      value: "value",
      placeholder: "Заполните поле",
      regex: /^[а-яёА-ЯЁ a-zA-Z-]+$/i,
      alert: "неверный формат"
    }
  }
})
const model = ref(props.form.value)
const alert = ref("")
const check = ref("")

watchEffect(() => {
  if (!props.form.regex.test(model.value)) {
    if ((props.form.name === 'tel' && model.value === null || model.value === '') || (props.form.name === 'mail' && model.value === '')) {
      check.value = ""
      emit(props.form.name + 'Check', true)
    } else {
      check.value = props.form.alert
      emit(props.form.name + 'Check', false)
    }
  } else {
    check.value = ""
    if (props.form.name === "lName" || props.form.name === "fName" || props.form.name === 'password') {
      emit(props.form.name + 'Check', true)
      emit(props.form.name + 'Validate', model.value)
    } else if (alert.value === "")
      emit(props.form.name + 'Check', true)
    else
      emit(props.form.name + 'Check', false)
  }
})
const isReserved = async () => {
  if (props.form.name === 'tel') {
    await axios.get(api.URL + "/api/users/search?" + props.form.name + "=" + model.value, {responseType: "json"})
        .then(function (response) {
          if (response.data !== "error" && model.value !== props.form.value) {
            alert.value = "Такой " + props.form.field + " уже занят"
          } else {
            alert.value = ""
            emit(props.form.name + 'Validate', model.value)
          }
        })
  } else if (props.form.name !== 'lName' || props.form.name !== 'fName' || props.form.name !== 'password') {
    await axios.get(api.URL + "/api/users/search?" + props.form.name + "=" + model.value, {responseType: "json"})
        .then(function (response) {
          if (response.data !== "error" && model.value.toLowerCase() !== props.form.value.toLowerCase()) {
            alert.value = "Такой " + props.form.field + " уже занят"
          } else {
            alert.value = ""
            emit(props.form.name + 'Validate', model.value)
          }
        })
  }
}

</script>

<template>
  <div class="form__field">
    <div class="form__label">{{ props.form.field }}</div>
    <input :class="'form__' + props.form.name +' field'" v-model="model"
           :type="props.form.type"
           :placeholder="props.form.placeholder"
           @focusout="isReserved">
  </div>
  <div class="form__text" v-if="alert !== ''"> {{ alert }}</div>
  <div class="form__text" v-if="check !== ''"> {{ check }}</div>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/mixins.scss";
@import "src/assets/scss/commonStyle.scss";

.form {
  &__field {
    width: 100%;
    margin: 15px 0;

    input {
      font-size: 16px;
    }
  }

  &__label {
    padding: 5px 5px;
  }
}

@import "src/assets/scss/media.scss";
</style>