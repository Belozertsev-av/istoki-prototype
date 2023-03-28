<script setup>
import Header from "./components/Landing/Header.vue";
import {ref} from "vue";
import Footer from "./components/Landing/Footer.vue";
import HeaderMain from "./components/main/Header-main.vue";
import NavigationPanel from "./components/main/NavigationPanel.vue";

name = "App"

let isLoggedIn = ref(false)
const callback = ""
</script>


<template>
  <div class="wrapper">
    <Header v-if="!isLoggedIn"></Header>
    <HeaderMain v-else
                @logout="isLoggedIn = false"></HeaderMain>
    <router-view v-slot="{ Component }"
                 @loggedIn="isLoggedIn = true"
                 @logout="isLoggedIn = false">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component"/>
      </transition>
      <Footer v-if="!isLoggedIn"></Footer>
      <NavigationPanel class="nav-panel"
                       v-if="isLoggedIn"
                       :callback="callback"></NavigationPanel>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/scss/mixins.scss";
@import "assets/scss/commonStyle.scss";

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
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

.nav-panel {
  display: none;
}

@import "src/assets/scss/media.scss";

</style>
