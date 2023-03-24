<template>
  <div class="back-screen">
    <div class="rolldown__body" v-on:click="closeMenu">
      <ul class="rolldown__menu">
        <router-link class="router_link"
                     to="/account"
                     v-on:click="closeMenu">
          <li class="rolldown__item">Аккаунт
          </li>
        </router-link>
        <li class="rolldown__item">
          Настройки
        </li>
        <li class="rolldown__item">
          Помощь
        </li>
      </ul>
      <div class="rolldown__divider"></div>
      <router-link class="router_link"
                   to="/"
                   v-on:click="logout">
        <div class="rolldown__item logout">Выход</div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "Rolldown_menu",
  emits: ['closeMenu', 'logout'],
  setup(props, context) {

    const logout = () => {
      localStorage.clear()
      context.emit("logout")
    }
    const closeMenu = () => {
      context.emit("closeMenu")
    }

    return {
      logout,
      closeMenu
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

.back-screen {
  cursor: default;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.rolldown {
  &__body {
    cursor: default;
    position: relative;
    background-color: #fff;
    border: 2px solid $primaryColor;
    border-radius: $radius;
    z-index: 5;
    top: 75px;
    left: 75%;
    width: 200px;
  }

  &__menu {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }

  &__divider {
    cursor: default;
    background-color: $secondaryGrey;
    height: 2px;
    width: 90%;
    margin: 0 auto;
    border-radius: $radius;
  }

  &__item {
    cursor: pointer;
    margin: 5px 10px;
    padding: 5px 10px;
    text-align: end;
    transition-duration: 0.2s;

    &:hover {
      background-color: $primaryGrey;
      border-radius: $radius;
    }
  }
}

.logout {
  margin: 10px 10px;
  padding: 5px 10px;
}

.router_link {
  color: $primaryDark;
}

@import "../../assets/scss/media.scss";
</style>