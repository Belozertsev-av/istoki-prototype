<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import {useAPI} from "../../../stores/store.js";

name = "FormAvatar"

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})
const api = useAPI()
const userData = reactive(props.userData)
let isDragStarted = ref(false)
const photo = ref(null)


const sendPhoto = async (event) => {

  photo.value = event.target.files[0]
  const formData = new FormData()
  formData.append('file', photo.value)

  isDragStarted.value = false


  await axios.post(api.URL + "/api/files?currAvatar=" + userData.avatar, formData, {
    withCredentials: true, headers: {
      "content-type": "multipart/form-data",
    }
  }).then(
      async function (response) {
        await axios.patch(api.URL + "/api/users/" + userData.id, {
          "avatar": response.data,
          "userLanguages": userData.userLanguages
        }, {
          headers: {
            "content-type": "application/json",
          }
        }).then(
            async function () {
              await axios.get(api.URL + "/api/users/data", {
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
                    userData.value = JSON.parse(localStorage.getItem("userData"))
                  }).catch()
              location.reload()
            }
        ).catch()
      }
  ).catch()
}

</script>

<template>
  <div class="account__block">
    <div class="account__avatar">
      <img :src="'/src/assets/img/avatars/'+ props.userData.avatar" alt="avatar">
      <div class="account__drop-area"
           :class="{'drag-active': isDragStarted}">
        <input class="account__file"
               ref="photo"
               type="file"
               title=""
               accept=".jpg,.jpeg,.png,.bmp,.svg,.webp"
               @dragenter="isDragStarted = true"
               @dragleave="isDragStarted = false"
               @change="sendPhoto">
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

  &__avatar {
    position: relative;
    text-align: center;
    width: 200px;
    height: 200px;
    margin: 0 auto 20px;

    img {
      padding: 6px;
      border: 3px solid $primaryGold;
      border-radius: 50%;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &__file {
    margin: 5px auto;
    padding: 0 20px;
  }

  &__drop-area {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    transition-duration: 0.2s;

    &:after {
      content: "+";
      position: absolute;
      pointer-events: none;
      background-color: $primaryGold;
      bottom: 0;
      right: 0;
      width: 60px;
      height: 60px;
      color: #fff;
      font-size: 36px;
      line-height: 52px;
      margin: 0 auto;
      border-radius: 50%;
    }
  }

  &__file {
    position: relative;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}

.drag-active {
  background-color: #ffffff;
  border: 4px dotted $primaryGrey;
  border-radius: 50%;
  transition-duration: 0.2s;

  &:after {
    content: "Перетащите изображение в выделенную область";
    position: absolute;
    pointer-events: none;
    background: none;
    left: 0;
    top: 30%;
    width: 100%;
    height: fit-content;
    color: $primaryGrey;
    font-size: 20px;
    line-height: 20px;
    border-radius: 0;
  }
}

@import "src/assets/scss/media";
</style>