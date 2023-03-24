<script>

import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import router from "../../router/index.js";
import Stage_4 from "../registration/Stage_4.vue";
import HomeBody from "./HomeBody.vue";
import NavigationPanel from "./NavigationPanel.vue";
import HeaderMain from "./Header-main.vue";

export default {
  name: "Home",
  components: {NavigationPanel, HomeBody, Stage_4, HeaderMain},
  setup(props, context) {
    const hasLanguages = ref(false)
    let userData = reactive({})
    let currLang = reactive({})

    onMounted(async () => {
      try {
        await axios.get("http://localhost:8080/api/users/data", {
          headers: {
            'authorization': localStorage.getItem("jwt")
          }
        }).then(
            function (response) {
              localStorage.setItem("userData", JSON.stringify({
                id: response.data.id,
                login: response.data.login,
                fName: response.data.fname,
                lName: response.data.lname,
                phoneNumber: response.data.phoneNumber,
                mail: response.data.mail,
                userLanguages: response.data.userLanguages,
                avatar: response.data.avatar,
              }))
              userData = JSON.parse(localStorage.getItem("userData"))
              if (userData.userLanguages.length > 0) {
                axios.get("http://localhost:8080/api/languages/" + userData.userLanguages[0].scoresLanguage + "?list=false")
                    .then(
                        function (response) {
                          localStorage.setItem("currLang", JSON.stringify({
                            languageId: response.data.languageId,
                            languageTitle: response.data.languageTitle,
                            languageFlag: response.data.languageFlag,
                            languageTeacher: response.data.languageTeacher,
                            languageCountOfUsers: response.data.languageCountOfUsers,
                            languageLessons: response.data.languageLessons,
                          }))
                          currLang = JSON.parse(localStorage.getItem("currLang"))
                          if (JSON.parse(localStorage.getItem("currLang"))) {
                            axios.get("http://localhost:8080/api/lessons?languageId=" + currLang.languageId)
                                .then(
                                    function (response) {
                                      currLang.languageLessons = response.data
                                      hasLanguages.value = true
                                      context.emit("loggedIn")
                                    }
                                )
                          }
                        })
              }
            })
      } catch (error) {
        await router.push("/")
      }

    })

    const LangSelected = () => {
      hasLanguages.value = true
      location.reload()
    }

    return {
      userData,
      currLang,
      hasLanguages,
      LangSelected,
    }
  }
}
</script>

<template>
  <HomeBody v-if="hasLanguages"></HomeBody>
  <Stage_4 v-else
           @LangSelected="LangSelected"></Stage_4>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

.main {
  padding-top: 70px;
}

@import "../../assets/scss/media.scss";
</style>