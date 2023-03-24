<template>
  <footer class="nav">
    <SVG_sprites></SVG_sprites>
    <div class="container">
      <div class="nav__body">
        <ul class="nav__menu">
          <router-link to="/home">
            <li class="nav__item" :class="{'selected':$route.name === 'Home'}" id="home">
              <svg class="icon__svg">
                <use xlink:href="#lessons"></use>
              </svg>
              <div class="nav__label">Уроки</div>
            </li>
          </router-link>
          <li class="nav__item" :class="{'selected':$route.name === 'Dialogs'}" id="dialogs">
            <svg class="icon__svg">
              <use xlink:href="#dialogs"></use>
            </svg>
            <div class="nav__label">Диалоги</div>
          </li>
          <li class="nav__item" :class="{'selected':$route.name === 'Stories'}" id="stories">
            <svg class="icon__svg">
              <use xlink:href="#stories"></use>
            </svg>
            <div class="nav__label">Истории</div>
          </li>
          <li class="nav__item" :class="{'selected':$route.name === 'Dictionary'}" id="dictionary">
            <svg class="icon__svg">
              <use xlink:href="#dictionary"></use>
            </svg>
            <div class="nav__label">Словарь</div>
          </li>
          <li class="nav__item" :class="{'selected':$route.name === 'Rewards'}" id="rewards">
            <svg class="icon__svg">
              <use xlink:href="#rewards"></use>
            </svg>
            <div class="nav__label">Награды</div>
          </li>
          <router-link to="/account">
            <li class="nav__item" :class="{'selected':$route.name === 'Account'}" id="account">
              <svg class="icon__svg">
                <use xlink:href="#profile"></use>
              </svg>
              <div class="nav__label">Аккаунт</div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import SVG_sprites from "../SVG_sprites.vue";

export default {
  name: "NavigationPanel",
  components: {SVG_sprites},
  props: ['callback'],
  setup(props, context) {
    ;
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

.nav {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: $primaryDark;
  z-index: 10;
  border-top: 2px solid $primaryColor;

  &__body {
    padding: 20px 20px;
  }

  &__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__item {
    cursor: pointer;
    text-align: center;
    color: $secondaryGrey;

    &:not(.selected):hover {
      color: $primaryDark;

      .icon__svg {
        fill: $primaryDark;
      }
    }
  }

  .icon {
    &__svg {
      height: 40px;
      width: 40px;
      fill: $secondaryGrey;
    }
  }

  .selected {
    color: #595fff;
    position: relative;

    .icon__svg {
      fill: $primaryColor;
    }
  }
}

@import "../../assets/scss/media.scss";
</style>