<script setup>
name = "FormPass"

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <form v-on:submit.prevent="sendUpPass" class="account__form">
    <div class="account__block">
      <div class="account__subtitle subtitle">Логин и пароль</div>
      <div class="account__field">
        <div class="account__label">Старый пароль:</div>
        <input class="account__password field" v-model="userData.password" type="password" placeholder="*****">
      </div>
      <div class="account__field">
        <div class="account__label">Новый пароль:</div>
        <input class="account__password field" v-model="userData.password" type="password"
               placeholder="*****">
      </div>
    </div>
    <input type="submit"
           value="Изменить"
           class="account__button button">
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

@import "src/assets/scss/media";
</style>