<script>

import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import router from "../../router/index.js";

export default {
  name: "Stage_4",
  setup(props, context) {
    const languages = ref([])


    onMounted(async () => {
      await axios.get("http://127.0.0.1:8080/api/languages?list=true")
          .then(response => languages.value = response.data)
          .catch(error => console.log(error))
    })

    async function selectLang(langId) {
      const userData = reactive(JSON.parse(localStorage.getItem("userData")))
      await axios.put("http://localhost:8080/api/users/" + userData.id + "/add?language=" + langId, null, {
        headers: {
          "content-type": "application/json",
        }
      })
          .then(function () {
            context.emit("LangSelected")
            location.reload()
          })
          .catch(function () {
            router.push("/")
          })
    }

    return {
      languages,
      selectLang
    };
  }
}
</script>

<template>
  <div class="main">
    <div class="container">
      <div class="reg__title title">Добро пожаловась в Roots Lang!</div>
      <div class="reg__body">
        <div class="reg__subtitle subtitle">Выберите язык, который вы хотите изучать</div>
        <div class="reg__block">
          <div class="reg__flag flag"
               v-for="lang in languages"
               @click="selectLang(lang.languageId)">
            <img :src="'src/assets/img/' + lang.languageFlag" alt="flag">
            <div class="reg__lang">{{ lang.languageTitle }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

.main {
  padding-top: 70px;
  padding-bottom: 200px;
  overflow-y: scroll;
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
    margin: 5px auto 5px 5px;
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
    flex-direction: column;
    justify-content: center;
    border: 2px solid $primaryGrey;
    border-radius: $radius;
  }

  &__flag {
    display: flex;
    justify-items: center;
    align-items: center;
    margin: 5px;
    padding: 5px;
    cursor: pointer;
    border: 2px solid $primaryGrey;
    border-radius: $radius;
  }

  &__lang {
    padding-left: 15px;
    font-size: 16px;
  }

  &__button {
    margin: 0 auto;
    width: fit-content;
    color: $primaryDark;
    border-color: $primaryDark;
  }
}

@import "../../assets/scss/media.scss";
</style>