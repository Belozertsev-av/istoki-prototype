<script setup>
name = "ProgressBar"

const props = defineProps({
  percent: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    default: 0
  }
})


</script>

<template>
  <div class="progress-bar">
    <div class="progress" :style="[{'width': (props.percent / (props.total / 100)) + '%'}]"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/scss/mixins";
@import "src/assets/scss/commonStyle";


.progress-bar {
  background-color: $primaryGrey;
  border-radius: $radius;
  width: 100%;
  margin: 0 20px;
  height: 20px;
}

.progress {
  background-color: $primaryGold;
  border-radius: $radius;
  height: 20px;
  width: 50%;
  transition-duration: 0.2s;
}

@import "src/assets/scss/media";
</style>