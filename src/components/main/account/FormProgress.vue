<script setup>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {useAPI} from "../../../stores/store.js";
import ProgressBar from "../../common/ProgressBar.vue";

name = "FormProgress"

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})
const api = useAPI()
const userIdiomas = reactive([])

onMounted(async () => {
  for (let i = 0; i < props.userData.userLanguages.length; i++) {
    await axios.get(api.URL + "/api/languages/" + props.userData.userLanguages[i].scoresLanguage + "?list=false").then(
        function (response) {
          userIdiomas.push({
            languageFlag: response.data.languageFlag,
            languageTitle: response.data.languageTitle,
            languageScores: props.userData.userLanguages[i].scores,
            languageLessonsLength: response.data.languageLessons.length
          })

        }
    )
  }
})

</script>

<template>
  <div class="account__block">
    <div class="account__subtitle subtitle">Прогресс</div>
    <div class="account__row" v-for="i in userIdiomas">
      <div class="account__flag">
        <img :src="'/src/assets/img/'+ i.languageFlag" alt="flag">
      </div>
      <ProgressBar :total="i.languageLessonsLength" :percent="i.languageScores"></ProgressBar>
      <div class="account__label">{{
          i.languageScores
        }}/{{ i.languageLessonsLength }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/mixins";
@import "src/assets/scss/commonStyle";

.account {
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

  &__label {
    padding: 5px 5px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    padding: 5px 0;
  }

  &__flag {
    img {
      border-radius: $radius;
      width: 60px;
      height: 35px;
    }
  }
}

@import "src/assets/scss/media";
</style>