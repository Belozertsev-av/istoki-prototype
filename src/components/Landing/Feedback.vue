<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {useAPI} from "../../stores/store.js";

export default {
  components: {Header, Footer},
  setup() {
    const api = useAPI()
    const feedback = ref([
      {
        feedbackId: 0,
        feedbackUser: {
          avatar: "",
          id: 0,
          firstName: "",
          lastName: ""
        },
        feedbackDate: null,
        feedbackBody: "",
        feedbackMark: 0
      }
    ])
    onMounted(async () => {
      await axios.get(api.URL + "/api/feedback?page=0")
          .then(function (response) {
            feedback.value = response.data
          })
          .catch(error => console.log(error))
    })
    return {
      feedback,
    }
  }
}
</script>

<template>
  <main class="main">
    <section class="feedback">
      <div class="container">
        <div class="feedback__title title">Отзывы</div>
        <div class="feedback__warning">Вы сможете оставить отзыв после регистрации в личном кабинете</div>
        <div class="feedback__block-body">
          <div class="feedback__block">
            <div class="feedback__body" v-for="item in feedback">
              <div class="feedback__subblock">
                <div class="feedback__avatar"><img :src="'src/assets/img/avatars/' + item.feedbackUser.avatar"
                                                   alt="avatar"></div>
                <div class="feedback__name subtitle">{{
                    item.feedbackUser.lastName + ' ' + item.feedbackUser.firstName
                  }}
                </div>
              </div>
              <div class="feedback__subblock">
                <div class="feedback__mark"
                     v-for="n in 5">
                  <div class="circle-gold" v-if="n <= item.feedbackMark"></div>
                </div>
                <div class="feedback__date"> {{ new Date(item.feedbackDate).toLocaleDateString() }}</div>
              </div>
              <div class="feedback__text text">{{ item.feedbackBody }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

.main {
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  min-height: 70vh;
}

.feedback {
  padding-bottom: 50px;

  &__title {
    text-align: center;
    @include adaptive-value("padding", 40, 20, 0);
    padding-bottom: 10px;
  }

  &__block-body {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__block {
    width: 1020px;
    display: flex;
    flex-wrap: wrap;
  }

  &__body {
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 500px;
    background-color: $primaryColor;
    border-radius: $radius;
    margin: 5px;
  }

  &__subblock {
    display: flex;
    padding: 5px 10px;
    justify-content: start;
    align-items: center;
  }

  &__avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 20px;
    border: 5px solid $primaryGold;
    padding: 5px;
    text-align: center;
    align-items: center;

    img {
      border-radius: 50%;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  &__mark {
    width: 12px;
    height: 12px;
    margin: 0 5px 0 0;
    border-radius: 50%;
    background-color: $primaryGrey;
    position: relative;

    .circle-gold {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: $primaryGold;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &__date {
    padding-left: 5px;
  }

  &__text {
    background-color: #fff;
    color: #000;
    border-radius: $radius;
    padding: 10px;
    min-height: 50px;
  }

  &__warning {
    font-size: 16px;
    text-align: center;
    @include adaptive-value("padding-bottom", 40, 20, 0);
  }
}

@import "../../assets/scss/media.scss";
</style>