<script setup>
//import '../../assets/js/jquery-3.6.1.js';
//import '../../assets/js/script.js';
import {onMounted} from "vue";
import router from "../../router/index.js";

onMounted(() => {
      if (localStorage.getItem('jwt')) {
        router.push("/home")
      }
    }
)
</script>


<template>
  <main class="main">
    <section class="greeting">
      <canvas id="space"></canvas>
      <div class="container">
        <div class="greeting__body">
          <div class="greeting__title title">Выучи языки кореных народов России вместе с Roots!</div>
          <div class="greeting__subtitle subtitle"> <span>На территории России проживают сотни
                                национальностей, и
                                говорят
                                на самых различных языках и дилектах.</span>
            <br>
            <span>Начни изучать языки своей родины
                                уже сейчас в
                                простой
                                игровой форме!</span>
            <br>
            <span>Достаточно всего лишь 15 минут в день!</span>
          </div>
          <div class="greeting__block">
            <router-link to="/registration" class="greeting__button button">Начать</router-link>
            <router-link to="/auth" class="greeting__button button__reverse">Войти</router-link>
          </div>
          <img class="greeting__robot" src="../../assets/img/robot.png" alt="robot Roots">
        </div>
      </div>
    </section>
    <section class="languages">
      <div class="container">
        <div class="languages__body">
          <div class="languages__arrow__left"></div>
          <div class="languages__item button__reverse">Якутский</div>
          <div class="languages__item button__reverse">Кабардинский</div>
          <div class="languages__item button__reverse">Татарский</div>
          <div class="languages__arrow__right"></div>
        </div>
      </div>
    </section>
    <section id="unique" class="unique">
      <div class="container">
        <div class="unique__body">
          <div class="unique__title title">Единственный в своем роде!</div>
          <div class="unique__block">
            <div class="unique__img"><img src="../../assets/img/unique.png" alt=""></div>
            <div class="unique__text">
              <p>Только у нас вы можете выучить языки кореных народов России с нуля! 3 больших курса
                и
                еще больше на подходе!</p>
              <p>Для того чтобы учиться с Roots не придется перекраивать ваш распорядок дня!
                Достаточно 15 минут в день, уроки построены таким образом, чтобы вы как можно
                быстрее смогли изьясняться на новом для вас языке!</p>
              <p>С Roots вам удасться не только изучить грамматику языка, но и узнать о
                культуре и истории народа на нем говорящим!
              </p>
              <p>Также вы можете закреплять пройденный материал на примере реальных диалогов! А если
                вы забыли какое-то слово, то вам поможет встроенный словарь Roots!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="fit">
      <div class="container">
        <div class="fit__body">
          <div class="fit__title title">Roots для каждого!</div>
          <div class="fit__block">
            <div class="fit__column">
              <div class="fit__img">
                <img src="../../assets/img/a1.png" alt="">
              </div>
              <div class="fit__textbody">
                <div class="fit__divider"></div>
                <div class="fit__subtitle subtitle">Хотите изучить язык с нуля</div>
                <div class="fit__text">Наши курсы составлены по принципу от
                  простого к сложному, Не пропускайте уроки и у вас все получится!
                </div>
              </div>
            </div>
            <div class="fit__column">
              <div class="fit__img">
                <img src="../../assets/img/a2.png" alt="">
              </div>
              <div class="fit__textbody">
                <div class="fit__divider"></div>
                <div class="fit__subtitle subtitle">Уже немного знаете язык</div>
                <div class="fit__text">Нет смысла тратить время на то, что вы уже занете!
                  Перескочите изученные темы и продолжайте
                  учить язык дальше вместе с Roots!
                </div>
              </div>
            </div>
            <div class="fit__column">
              <div class="fit__img">
                <img src="../../assets/img/a3.png" alt="">
              </div>
              <div class="fit__textbody">
                <div class="fit__divider"></div>
                <div class="fit__subtitle subtitle">У вас хороший уровень языка</div>
                <div class="fit__text">Повторение - мать учения. Практики грамматики, произношении и
                  аудировании никогда не бывает мало!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="lessons" class="lessons">
      <div class="container">
        <div class="lessons__body">
          <div class="lessons__title title">Что вас ждет c Roots</div>
          <div class="lessons__table">
            <div class="lessons__row">
              <div class="lessons__block-a">
                <div class="lessons__column">
                  <div class="lessons__subtitle subtitle">Уроки</div>
                  <div class="lessons__text">Небольшие уроки по 5-10 минут в игровой форме
                    расскажут вам о грамматике и произношении, а также научат воспринимать язык
                    на слух
                  </div>
                </div>
                <div class="lessons__img">
                  <img src="../../assets/img/lesson.png" alt="lessons">
                </div>
              </div>
              <div class="lessons__block-b">
                <div class="lessons__column">
                  <div class="lessons__subtitle subtitle">Диалоги</div>
                  <div class="lessons__text">Реальные жизненные ситуации, в которые
                    может попасть каждый в формате небольших диалогов. Помогут избавиться от
                    языкового барьера. а также улучшат навыки аудирования и произношения
                  </div>
                </div>
                <div class="lessons__img">
                  <img src="../../assets/img/dialog.png" alt="dialogs">
                </div>
              </div>
            </div>
            <div class="lessons__row reverse-row">
              <div class="lessons__block-b">
                <div class="lessons__column">
                  <div class="lessons__subtitle subtitle">Истории</div>
                  <div class="lessons__text">Небольшие рассказы об известных личностях или
                    исторических событиях региона изучаемого языка. Вы больше узнаете о
                    культуре,
                    истории и традициях кореных народов России
                  </div>
                </div>
                <div class="lessons__img">
                  <img src="../../assets/img/story.png" alt="stories">
                </div>
              </div>
              <div class="lessons__block-a">
                <div class="lessons__column">
                  <div class="lessons__subtitle subtitle">Словарь</div>
                  <div class="lessons__text">Все слова и фразы, которые вы изучите в течении
                    курса, будут автоматически записываться в словарь, где вы всегда сможете их
                    найти, если вдруг забыли
                  </div>
                </div>
                <div class="lessons__img">
                  <img src="../../assets/img/dic.png" alt="dictionary">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="about" class="about">
      <div class="container">
        <div class="about__title title">О нас</div>
        <div class="about__body">
          <div class="about__column">
            <div class="about__blue-block">
              <div class="about__subtitle subtitle">Кто мы?</div>
              <div class="about__text">Мы - небольшая команда энтузиастов из Питера. Каждый из нас
                приехал
                сюда из самых разных уголков нашей необъятной страны. Мы обьединили наши силы,
                знания и
                возможности чтобы подарить вам Roots Lang!
              </div>
            </div>
            <div class="about__yellow-block">
              <div class="about__subtitle subtitle">Почему бесплатно?</div>
              <div class="about__text">Это принципиальная позиция нашей команды. Весь контент доступен
                в полном объеме бесплатно для каждого пользователя! <br><br>Наша команда работает
                исключительно засчет донатов и не многочисленной рекламы
              </div>
            </div>
          </div>
          <div class="about__grey-block">
            <div class="about__subtitle subtitle">В чем наша цель?</div>
            <div class="about__text">В России проживает 193 народа, каждый из которых имеет свою
              уникальную культуру, язык и историю. Каждый день мы встречаем на улице, на работе
              или на
              учебе людей, представляющих эти народы и абсолютно ничего о них не знаем!<br><br>
              Из-за
              этого
              незнания происходит очень много конфликтов, а иногда даже зарождается вражда.
              <br><br>
              Мы в
              Roots Lang
              искренне верим, что если бы мы узнали друг друга поближе, то мир вокруг нас стал бы
              гораздо добрее и дружней!<br><br> Именно поэтому мы и создали этот портал, где любой
              желающий
              абсолютно бесплатно мог бы узнать больше о курльтуре своих друзей, коллег или просто
              знакомых!
            </div>
          </div>

        </div>
      </div>
    </section>
    <section class="join">
      <div class="container">
        <div class="join__body">
          <div class="join__title title">Присоединяйся к нам, и начни обучение уже сейчас!</div>
          <router-link to="/registration" class="join__button button">Начать</router-link>
        </div>
      </div>
    </section>
  </main>

</template>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/commonStyle.scss";

#space {
  position: absolute;
  top: 0;
  left: 0;
}

.greeting {
  background-color: $backgroundColor;

  &::after {
    content: "";
    position: absolute;
    top: 10%;
    left: 10%;
    background: #fff;
    height: 150px;
    width: 300px;
    border-radius: 100px;
    filter: blur(100px);
    transform: scale(0.8);
    opacity: 0.4;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 10%;
    right: 10%;
    background: #fff;
    height: 300px;
    width: 600px;
    border-radius: 100px;
    filter: blur(100px);
    transform: scale(0.8);
    opacity: 0.3;
  }

  &__body {
    @include adaptive-value("padding-left", 100, 0, 0);
    @include adaptive-value("padding-right", 100, 0, 0);
    color: #fff;
    height: 80vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  &__title {
    padding: 20vh 0 20px 0;
    color: #fff;
    z-index: 3;
  }

  &__subtitle {
    margin: 0 auto;
    padding: 0 30% 5vh 0;
    z-index: 3;
  }

  &__block {
    display: flex;
    z-index: 3;
  }

  &__robot {
    height: 500px;
    z-index: 2;
    position: absolute;
    right: 5vw;
    bottom: -15%;
  }

  &__button {
    margin: 0 50px 0 20px;
    transform: scale(1.3);

    &:active {
      content: "";
      transform: scale(1.25);
    }

    &:not(:last-child):active {
      content: "";
      background-color: #fff;
      transform: scale(1.25);
    }
  }
}

.languages {
  background-color: $primaryColor;
  z-index: 3;

  &__body {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;
  }

  &__arrow {
    &__left {
      height: 10px;
      border: 10px solid transparent;
      border-right: 10px solid #fff;
    }

    &__right {
      height: 10px;
      border: 10px solid transparent;
      border-left: 10px solid #fff;
    }
  }

  &__item {
    cursor: default;
  }
}

.unique {
  background-color: $primaryColor;
  z-index: 3;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    z-index: 3;
    bottom: -50px;
    left: 0;
    background-color: $primaryColor;
    height: 100px;
    width: 100%;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
  }

  &__body {
    padding: 50px 0;
  }

  &__title {
    text-align: center;
    color: #fff;
    padding-bottom: 20px;
  }

  &__block {
    margin: 0 auto;
    display: flex;
  }

  &__img {
    align-items: center;

    img {
      height: 250px;
    }
  }

  &__text {
    padding-left: 40px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      padding: 10px 0;
      position: relative;

      &::before {
        content: "●";
        position: absolute;
        left: -20px;
      }
    }
  }
}

.fit {
  @include adaptive-value("padding-top", 100, 40, 0);
  z-index: 3;

  &__body {
    margin: 0 auto;
    text-align: center;
    padding: 30px 10px 0 30px;
  }

  &__title {
    padding-bottom: 50px;
    color: #3b3b3b;
  }

  &__block {
    display: flex;
    justify-content: center;
  }

  &__column {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    height: 350px;
    width: 300px;
  }

  &__img {
    background-color: $primaryColor;
    height: 40%;
    border-radius: $radius;
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin-top: 10px;
      height: 70%;
    }

    &::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      background-color: $primaryColor;
      border: 5px solid #fff;
      border-radius: $radius/1.5;
      transform: rotate(45deg);
      top: -15px;
      right: 44%;
    }
  }

  &__textbody {
    position: relative;
    top: -10px;
    z-index: 2;
    color: #fff;
    background-color: $primaryDark;
    height: 60%;
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
  }

  &__divider {
    height: 20px;
    margin: 0 auto;
    width: 70%;
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
    background-color: #fff;
  }

  &__subtitle {
    padding: 15px 0;
  }

  &__text {
    padding: 0 15px 15px 15px;
  }
}

.lessons {
  @include adaptive-value("padding-top", 100, 40, 0);
  @include adaptive-value("padding-bottom", 150, 80, 0);
  z-index: 3;

  &__body {
    margin: 0 auto;
    text-align: center;
  }

  &__title {
    padding-bottom: 50px;
  }

  &__table {
    display: flex;
    flex-direction: column;
  }

  &__row {
    display: flex;
    min-height: 250px;
  }

  &__column {
    display: flex;
    flex-direction: column;
  }

  &__block-a {
    width: 40%;
    background-color: $primaryColor;
    display: flex;
    color: #fff;
  }

  &__block-a,
  &__block-b {
    margin: 10px;
    padding: 10px;
    border-radius: $radius;
    align-items: center;

    img {
      width: 100px;
      margin: 0 20px;
    }
  }

  &__block-b {
    width: 60%;
    display: flex;
    flex-direction: row-reverse;
    background-color: $primaryGold;
  }

  &__subtitle {
    padding-bottom: 10px;
  }

  &__text {
    padding-bottom: 10px;
  }
}

.about {
  z-index: 3;
  background-color: $primaryColor;
  @include adaptive-value("padding-bottom", 100, 40, 0);
  position: relative;
  color: #fff;

  &::after {
    content: "";
    position: absolute;
    z-index: 3;
    bottom: -50px;
    left: 0;
    background-color: $primaryColor;
    height: 50px;
    width: 100%;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
  }

  &::before {
    content: "";
    position: absolute;
    z-index: 3;
    top: -50px;
    left: 0;
    background-color: $primaryColor;
    height: 50px;
    width: 100%;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%;
  }

  &__body {
    display: flex;
  }

  &__title {
    padding-bottom: 50px;
    text-align: center;
    z-index: 4;
  }

  &__column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    padding: 0 20px;
  }

  &__grey-block {
    background-color: #fff;
    color: #000;
    padding: 20px 20px 30px;
    border-radius: $radius;
  }

  &__yellow-block {
    background-color: $primaryGold;
    color: #000;
    padding: 20px 20px 30px;
    border-radius: $radius;
  }

  &__blue-block {
    padding: 20px 0;
  }

  &__subtitle {
    padding-bottom: 20px;
    text-align: center;
  }

  &__text {
    text-align: left;
  }
}

.join {
  @include adaptive-value("padding-top", 100, 40, 0);
  text-align: center;
  z-index: 3;

  &__body {
    padding-bottom: 50px;
  }

  &__title {
    padding-bottom: 50px;
  }

  &__button {
    background-color: $primaryColor;
    width: fit-content;
    color: #fff;
    margin: 0 auto;
    padding: 10px 40px;
    transform: scale(1.3);

    &:active {
      content: "";
      background-color: $primaryColorLight;
      transform: scale(1.25);
    }
  }
}


@import "../../assets/scss/media.scss";
</style>
