<script>
import SVG_sprites from "../SVG_sprites.vue";
import Rolldown_menu from "./Rolldown_menu.vue";
import {reactive, ref} from "vue";

export default {
  name: "HeaderMain",
  emits: ['logout', 'closeMenu'],
  components: {Rolldown_menu, SVG_sprites},
  setup(props, context) {
    const userData = reactive(JSON.parse(localStorage.getItem("userData")))
    let currLang = reactive(JSON.parse(localStorage.getItem("currLang")))
    const isClicked = ref(false)

    const logout = () => {
      context.emit("logout")
    }
    const toggleMenu = () => {
      isClicked.value = !isClicked.value
    }

    return {
      logout,
      userData,
      currLang,
      isClicked,
      toggleMenu,
    }
  },
}
</script>

<template>
  <header class="header">
    <SVG_sprites></SVG_sprites>
    <div class="container">
      <div class="header__body">
        <div class="header__main-logo">
          <router-link to="/home"
                       class="logo">Roots
          </router-link>
        </div>
        <div class="header__main-menu">
          <ul class="header__main-list">
            <li class="header__item">
              <div class="header__main-item flag">
                <img :src="'/src/assets/img/'+ currLang.languageFlag"
                     alt="flag">
              </div>
            </li>
            <li class="header__main-item">
              <div class="header__icon">
                <img src="src/assets/img/header-icons/memory_card.png" alt="">
                <div class="header__label subtitle">{{
                    userData.userLanguages[0].scores
                  }}/{{ currLang.languageLessons.length }}
                </div>
              </div>
            </li>
            <li class="header__main-item">
              <div class="header__icon">
                <img src="src/assets/img/header-icons/diod_off.png" alt="">
                <div class="header__label subtitle">0</div>
              </div>
            </li>
            <li class="header__main-item">
              <div class="header__icon">
                <img src="src/assets/img/header-icons/silicon.png" alt="">
                <div class="header__label subtitle">100</div>
              </div>
            </li>
            <li class="header__main-item">
              <div class="header__icon">
                <img src="src/assets/img/header-icons/battery.png" alt="">
                <div class="header__label subtitle">5</div>
              </div>
            </li>

            <li class="header__main-item minimize"
                @click="toggleMenu">
              <img class="icon__svg" :src="'src/assets/img/avatars/' + userData.avatar" alt="">
              <Rolldown_menu v-show="isClicked === true"
                             @logout="logout"
                             @closeMenu="toggleMenu">
              </Rolldown_menu>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

.icon__svg {
  width: 45px;
  height: 45px;
  fill: $primaryColor;
  object-fit: cover;
  border: 2.5px solid $primaryGold;
  padding: 2.5px;
  border-radius: 50%;

}

.flag {
  margin-right: 20px;
  cursor: pointer;
}

.header {
  background-color: #fff;
  position: fixed;
  width: 100%;
  color: $primaryDark;
  z-index: 10;
  border-bottom: 2px solid $primaryColor;

  &__body {
    display: flex;
    height: 70px;
    justify-content: stretch;
    align-items: center;
    width: 100%;
  }

  &__main-menu {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  &__main-logo {
    color: $primaryColor;
    font-size: 30px;
    font-weight: 700;
    cursor: pointer;
    min-width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 35px;
    }
  }

  &__label {
    padding: 0 10px;
  }

  &__burger {
    display: none;
    opacity: 0;
    transition-duration: 0.3s;
  }

  &__main-list {
    display: flex;
    align-items: center;
  }

  &__main-item {
    padding: 0 10px 0 10px;
    position: relative;
    cursor: pointer;

    a {
      color: $primaryDark;
      text-decoration: none;
    }
  }
}

.logo {
  color: $primaryColor;
}

.active {
  .header__burger_body {
    transform: rotate(45deg);
    transition-duration: 0.3s;

    &::before {
      display: none;
      transition-duration: 0.3s;
    }

    &::after {
      top: 0;
      left: 0;
      transform: rotate(90deg);
      transition-duration: 0.3s;
    }
  }

  + .header__menu {
    display: block;
    z-index: 5;
    background-color: $primaryColor;
    position: absolute;
    width: 100%;
    height: fit-content;
    padding-bottom: 20px;
    top: 50px;
    right: 0;
  }
}

@import "../../assets/scss/media.scss";

</style>