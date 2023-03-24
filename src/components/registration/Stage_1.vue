<script>

import {useUserData} from "../../stores/store.js";
import {ref, watchEffect} from "vue";

export default {
  name: "Stage_1",
  emits: ['setStage'],
  setup(props, context) {
    const userData = useUserData()

    const regex = /^[а-яёА-ЯЁ a-zA-Z-]+$/i
    let isMatchName = ref(false)
    let isMatchLastName = ref(false)

    function nextPage() {
      context.emit('setStage')
    }

    watchEffect(() => {
      isMatchName.value = regex.test(userData.fName);

      isMatchLastName.value = regex.test(userData.lName);

    })
    return {
      userData,
      isMatchLastName,
      isMatchName,
      nextPage
    };
  },
}
</script>

<template>
  <div class="reg__title title">Регистрация</div>
  <form @submit.prevent="nextPage">
    <div class="reg__body">
      <div class="reg__subtitle subtitle">Скажите как вас зовут?</div>
      <input type="text" v-model="userData.fName" class="reg__name" placeholder="Введите ваше имя">
      <p class="right" v-if="isMatchName && userData.fName.length > 0">Поле заполнено верно</p>
      <p class="wrong" v-if="!isMatchName && userData.fName.length > 0">Поле заполнено неверно</p>
      <input type="text" v-model="userData.lName" class="reg__name"
             placeholder="Введите вашу фамилию">
      <p class="right" v-if="isMatchLastName && userData.lName.length > 0">Поле заполнено верно</p>
      <p class="wrong" v-if="!isMatchLastName  && userData.lName.length > 0">Поле заполнено неверно</p>
      <input type="submit"
             class="reg__button button__reverse"
             v-if="isMatchName && isMatchLastName"
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
    margin: 0 auto;
    min-width: 400px;
    color: #000;
    border-radius: $radius;
    padding: 20px;
    text-align: center;
    margin: 5px;
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
}

.disabled {
  color: #9a9a9a;
  border-color: #9a9a9a;
}

@import "../../assets/scss/media.scss";
</style>