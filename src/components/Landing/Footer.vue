<script>
export default {
  name: "Footer"
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__body">
        <div class="footer__column">
          <p class="footer__title">Основное</p>
          <ul class="footer__list">
            <li class="footer__item"><a href="/">О компании</a></li>
            <li class="footer__item"><a href="/">Сотрудничество</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <p class="footer__title">Тех. поддержка</p>
          <ul class="footer__list">
            <li class="footer__item"><a href="/">Написать в поддержку</a></li>
            <li class="footer__item"><a href="/">FAQ</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <p class="footer__title">Правовая информация</p>
          <ul class="footer__list">
            <li class="footer__item"><a href="/">Условия конфиденциальности</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <p class="footer__title">Наши соцсети</p>
          <ul class="footer__list logo__list">
            <li class="footer__logo"><a href="https://vk.com"><img src="../../assets/img/icon_vk.png" alt="vk"></a>
            </li>
            <li class="footer__logo"><a href="https://telegram.org"><img src="../../assets/img/icon_telegram.png"
                                                                         alt="telegram"></a></li>
            <li class="footer__logo"><a href="https://dzen.ru"><img src="../../assets/img/icon_dzen.png"
                                                                    alt="instagram"></a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

.footer {
  background-color: $secondaryColor;
  color: #fff;
  z-index: 4;

  &__body {
    padding: 80px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__column {
    margin: 0 5px;
  }

  &__item {
    padding: 10px 0;
  }

  .logo__list {
    display: flex;
  }

  &__logo {
    padding: 10px 10px 0 0;

    img {
      width: 30px;
      height: 30px;
    }
  }

  &__title {
    text-decoration: underline;
    padding-bottom: 5px;
  }
}

@import "../../assets/scss/media.scss";
</style>