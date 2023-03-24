<script>
import {reactive, ref} from "vue";
import axios from "axios";
import SVG_sprites from "../SVG_sprites.vue";

export default {
  name: "HomeBody",
  components: {SVG_sprites},
  setup() {
    const userData = reactive(JSON.parse(localStorage.getItem("userData")))
    const currLang = reactive(JSON.parse(localStorage.getItem("currLang")))
    const currExc = reactive({
      excId: 0,
      excTitle: "",
      excLesson: 0,
      excQuestions: []
    })
    const errorText = ref("")

    const checked = ref(null)
    const isClicked = async (i) => {
      await axios.get("http://localhost:8080/api/exercises?lessonId=" + i.lessonId).then(
          function (response) {
            currExc.excId = response.data.excId
            currExc.excTitle = response.data.excTitle
            currExc.excLesson = response.data.excLesson
            currExc.excQuestions = response.data.excQuestions
          }
      )

      if (checked.value !== i.lessonId) checked.value = i.lessonId
      else checked.value = null

    }

    return {
      userData,
      currLang,
      currExc,
      isClicked,
      checked,
      errorText
    }
  },
}

</script>

<template>
  <div class="main">
    <SVG_sprites></SVG_sprites>
    <div class="home">
      <div class="container">
        <div class="home__body">
          <div class="home__sidebar">
            <div class="home__nav">
              <ul class="home__tabs">
                <li class="home__tab subtitle selected">
                  <svg class="icon__svg">
                    <use xlink:href="#lessons"></use>
                  </svg>
                  <div class="home__label">Уроки</div>
                </li>
                <li class="home__tab subtitle">
                  <svg class="icon__svg">
                    <use xlink:href="#dialogs"></use>
                  </svg>
                  <div class="home__label">Диалоги</div>
                </li>
                <li class="home__tab subtitle">
                  <svg class="icon__svg">
                    <use xlink:href="#stories"></use>
                  </svg>
                  <div class="home__label">Истории</div>
                </li>
                <li class="home__tab subtitle">
                  <svg class="icon__svg">
                    <use xlink:href="#dictionary"></use>
                  </svg>
                  <div class="home__label">Словарь</div>
                </li>
              </ul>
            </div>
            <div class="home__rewards">
              <div class="rewards__title-block">
                <div class="rewards__title subtitle">Награды</div>
              </div>
              <div class="rewards__body">
                <div class="rewards__items">
                  <div class="rewards__item" v-for="item in 6">
                    <div class="rewards__icon icon"></div>
                    <div class="rewards__text">Приветствующий</div>
                  </div>
                </div>
              </div>
              <div class="rewards__foot-block">
                <div class="rewards__link">Смотреть все</div>
              </div>
            </div>
          </div>
          <div class="home__main">
            <div class="home__lesson" v-for="i in currLang.languageLessons">
              <div class="main__item"
                   @click="isClicked(i)">
                <div class="main__title subtitle">{{ i.lessonTitle }}</div>
                <div class="main__icon icon-big">
                  <img src="src/assets/img/lesson_icon.png" alt="icon">
                </div>
                <div class="main__progressbar"></div>
              </div>
              <transition name="slide-fade" mode="in-out">
                <div class="main__item-block"
                     v-if="checked === i.lessonId">
                  <div class="main__subitem" v-for="j in i.lessonExc">
                    <div class="main__title">{{ j.excTitle }}</div>
                    <div class="main__icon icon">
                      <img src="src/assets/img/lesson_icon.png" alt="icon">
                    </div>
                    <div class="main__progressbar mini"></div>
                  </div>
                </div>
              </transition>
              <div class="main__divider"
                   v-if="currLang.languageLessons.length > 1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

.icon {
  &__svg {
    height: 25px;
    width: 25px;
    margin-right: 10px;
    fill: $primaryDark;
  }
}

.home {

  &__body {
    display: flex;
    justify-content: stretch;
    width: 100%;
  }

  &__sidebar {
    padding-top: 30px;
    width: 300px;
    display: flex;
    flex-direction: column;
    position: fixed;

  }

  &__nav {
    width: 100%;
    padding-bottom: 30px;
  }

  &__tabs {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__tab {
    cursor: pointer;
    padding: 10px 20px;
    width: 100%;
    transition-duration: 0.2s;
    display: flex;
    align-items: center;


    img {
      height: 30px;
      margin-right: 10px;
    }

    &:not(.selected):hover {
      background-color: $primaryGrey;
      border-radius: $radius;
    }
  }

  &__rewards {
    min-height: 450px;
    border: 2px solid $primaryGrey;
    border-radius: $radius;
    display: flex;
    flex-direction: column;
  }

  &__main {
    display: flex;
    flex-direction: column;
    padding: 30px 0 0 300px;
    margin: 0 auto;
    align-items: center;
  }

  &__lesson {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
  }
}

.rewards {

  &__title-block {
    color: #fff;
    background-color: $primaryColor;
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
  }

  &__foot-block {
    color: $primaryColor;
    background-color: $primaryGrey;
  }

  &__link {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 700;
  }

  &__title {
    padding: 10px 20px;
  }

  &__body {
    width: 100%;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    margin: 0 auto;
  }


  &__items {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 0;
  }

  &__item {
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
  }


  &__icon {
    background-color: $primaryGold;
  }

  &__text {
    padding: 5px 5px 0 5px;
  }
}

.main {

  &__item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  &__title {
    padding: 0 0 10px 0;
  }

  &__icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $primaryColor;

    img {
      width: 50%;
      height: 50%;
    }
  }

  &__progressbar {
    margin: 10px 0;
    position: relative;
    width: 100%;
    height: 20px;
    background-color: $primaryGrey;
    border-radius: $radius;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 20px;
      background-color: $primaryGold;
      border-radius: $radius;
    }
  }

  &__item-block {
    display: flex;
    justify-content: space-around;
    transition-duration: 0.2s;
  }

  &__subitem {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin: 0 15px;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  &__divider {
    align-self: center;
    margin: 20px auto;
    background-color: $primaryDark;
    border-radius: 6px;
    width: 6px;
    height: 25px;
  }
}

.selected {
  background-color: $primaryColor;
  color: #fff;
  border-radius: $radius;

  .icon__svg {
    fill: #fff;
  }
}

.mini {
  height: 16px;

  &:after {
    height: 16px;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}


@import "../../assets/scss/media.scss";
</style>