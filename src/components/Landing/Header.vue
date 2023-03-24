<script>
export default {
  name: "Header",
  data() {
    return {
      isActive: false
    }
  },
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <div class="header__logo">
          <router-link to="/">Roots</router-link>
        </div>
        <div class="header__burger" :class="{active: isActive}" @click="isActive = !isActive">
          <div class="header__burger_body"></div>
        </div>
        <div class="header__menu">
          <ul class="header__list">
            <li class="header__item">
              <router-link
                  :to="{ name: 'Landing', hash: '' }"
                  @click="(isActive) ? isActive = false : isActive">Главная
              </router-link>
            </li>
            <li class="header__item">
              <router-link
                  :to="{ name: 'Landing', hash: '#unique' }"
                  @click="(isActive) ? isActive = false : isActive">Преимущества
              </router-link>
            </li>
            <li class="header__item">
              <router-link
                  :to="{ name: 'Landing', hash: '#lessons' }"
                  @click="(isActive) ? isActive = false : isActive">Что вас ждет?
              </router-link>
            </li>
            <li class="header__item">
              <router-link
                  :to="{ name: 'Landing', hash: '#about' }"
                  @click="(isActive) ? isActive = false : isActive">О нас
              </router-link>
            </li>
            <li class="header__item">
              <router-link
                  to="/feedback"
                  @click="(isActive) ? isActive = false : isActive">Отзывы
              </router-link>
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

.header {
  background-color: $primaryColor;
  position: fixed;
  width: 100%;
  color: #fff;
  z-index: 10;

  &__body {
    display: flex;
    height: 70px;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    font-size: 30px;
    font-weight: 700;
    cursor: pointer;
  }

  &__burger {
    display: none;
    opacity: 0;
    transition-duration: 0.3s;
  }

  &__list {
    display: flex;
    align-items: center;
  }

  &__item {
    padding: 0 10px 0 10px;

    a {
      color: #fff;
      text-decoration: none;
    }
  }
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