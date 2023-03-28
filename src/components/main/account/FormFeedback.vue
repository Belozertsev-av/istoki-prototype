<script setup>
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import {useAPI} from "../../../stores/store.js";

name = "FormFeedback"
const api = useAPI()
const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})
const feedback = reactive({
  feedbackBody: "",
  feedbackDate: Date.now(),
  feedbackId: 0,
  feedbackMark: 0,
  feedbackUser: {
    avatar: props.userData.avatar,
    firstName: props.userData.fName,
    id: props.userData.id,
    lastName: props.userData.lName
  }
})
const isLoaded = ref(false)
const alert = ref("")

onMounted(async () => {
  await axios.get(api.URL + "/api/feedback/" + props.userData.id)
      .then(function (response) {
        feedback.feedbackBody = response.data.feedbackBody
        feedback.feedbackDate = response.data.feedbackDate
        feedback.feedbackMark = response.data.feedbackMark
        feedback.feedbackId = response.data.feedbackId
        feedback.feedbackUser = response.data.feedbackUser
        isLoaded.value = true
      }).catch(function () {
        isLoaded.value = false
      })
})
const onMouseEnter = () => {
  return true
}
const refreshFeedback = async () => {
  if (feedback.feedbackBody !== "" && feedback.feedbackMark !== 0) {
    if (isLoaded.value === false) {
      await axios.post(api.URL + "/api/feedback", feedback, {
        headers: {
          "content-type": "application/json",
        }
      })
          .then(function () {
            alert.value = "Ваш отзыв опубликован"
          }).catch(function () {
            alert.value = "Произошла ошибка при публикации отзыва"
          })
    } else {
      feedback.feedbackDate = Date.now()
      await axios.patch(api.URL + "/api/feedback/" + feedback.feedbackUser.id, feedback, {
        headers: {
          "content-type": "application/json",
        }
      })
          .then(function () {
            alert.value = "Ваш отзыв отредактирован"
          }).catch(function () {
            alert.value = "Произошла ошибка при редактировании отзыва"
          })
    }
  } else {
    alert.value = "Не заполнены все обязательные поля"
  }

}
</script>

<template>
  <form class="account__block" v-on:submit.prevent="refreshFeedback">
    <div class="account__subtitle subtitle">Отзыв</div>
    <div class="account__subtext">Вы можете оставить отзыв о вашем опыте обучения на
      нашей платформе.
    </div>
    <div class="account__field">
      <div class="account__feedback-body">
        <div class="account__feedback-mark">
          <div class="account__label on-blue"> {{ new Date(feedback.feedbackDate).toLocaleDateString() }}</div>
          <input
              type="radio"
              class="circle"
              v-model="feedback.feedbackMark"
              v-for="i of 5"
              :key="'star-' + i"
              name="rating"
              :value="6 - i"
              onmouseenter="onMouseEnter"
              :class="{colorize: onMouseEnter}"/>
          <div class="account__label on-blue">Оценка:</div>
        </div>
        <textarea class="account__feedback-text"
                  v-model="feedback.feedbackBody">{{ feedback.feedbackBody }}</textarea>
      </div>
      <input type="submit"
             value="Отправить"
             class="account__button button">
    </div>
    <div class="account__alert" id="alert" v-if="alert !== ''">
      {{ alert }}
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/mixins";
@import "src/assets/scss/commonStyle";

.account {
  &__alert {
    margin-top: 10px;
    border: 2px solid $secondaryGrey;
    padding: 10px 20px;
    border-radius: $radius;
    text-align: center;
  }

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

  &__subtext {
    margin-bottom: 10px;
  }

  &__field {
    width: 100%;
  }

  &__label {
    padding: 5px 5px;
  }

  &__feedback-body {
    background-color: $primaryColor;
    border-radius: $radius;
    padding: 10px;
  }

  &__button {
    background-color: $primaryColor;
    color: #fff;
    padding: 10px 20px;
    width: fit-content;
    margin: 10px auto 10px auto;
  }

  &__feedback-mark {
    display: flex;
    flex-direction: row-reverse;
    justify-content: left;
    align-items: center;
    padding-bottom: 10px;
  }

  &__feedback-text {
    border-radius: $radius;
    padding: 10px;
    min-height: 100px;
    width: 100%;
    background-color: #fff;
    resize: none;
  }
}

.circle {
  cursor: pointer;
  position: relative;
  width: 12px;
  height: 12px;
  margin: 0 4px;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: -5px;
    width: 12px;
    height: 12px;
    background-color: $primaryGrey;
    border-radius: 50%;
    margin: 0 4px;
  }


  &:checked {
    &::after, ~ .circle:after {
      background-color: $primaryGold;
    }
  }

  &:hover {
    &::after, ~ .circle:after {
      background-color: $primaryGold;
    }
  }

}

.on-blue {
  color: #fff;
}

@import "src/assets/scss/media";
</style>