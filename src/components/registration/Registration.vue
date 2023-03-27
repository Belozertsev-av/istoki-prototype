<script>

import {userRegPages} from "../../stores/store.js";
import Stage_1 from "./Stage_1.vue";
import Stage_2 from "./Stage_2.vue";
import Stage_3 from "./Stage_3.vue";
import Stage_4 from "./Stage_4.vue";
import Header from "../Landing/Header.vue";


export default {
  name: "Registration",
  components: {Stage_4, Stage_3, Stage_2, Stage_1, Header},
  setup() {
    const regPages = userRegPages()

    const setPage = () => {
      regPages.stage++
    }
    return {
      regPages,
      setPage
    };
  },
}
</script>

<template>
  <div class="main">
    <div class="container">
      <Stage_1 v-if="regPages.stage === 0"
               @setStage="setPage"></Stage_1>
      <Stage_2 v-if="regPages.stage === 1"
               @setStage="setPage"></Stage_2>
      <Stage_3 v-if="regPages.stage === 2"
               @setStage="setPage"></Stage_3>
      <Stage_4 v-if="regPages.stage === 3"
               @setStage="setPage"></Stage_4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

.main {
  padding-top: 15vh;
  padding-bottom: 50vh;
}

@import "../../assets/scss/media.scss";
</style>