<template>
  <div class="image-container">
    <img v-if="correct" :src="require(`../assets/characters/${imgSrc}`)" />
    <ChampionImage v-else :rank="rank" :imgSrc="imgSrc" />
  </div>
</template>

<script>
import ChampionImage from "./ChampionImage.vue";

export default {
  name: "ImageContainer",
  components: { ChampionImage },
  props: {
    rank: { type: String, required: true },
    imgSrc: { type: String, required: true },
    correct: { type: Boolean, required: true },
  },
  data() {
    return {
      loading: false,
    };
  },
  watch: {
    correct(value) {
      if (value) {
        this.loading = true;
        setTimeout(() => (this.loading = false), 500);
      }
    },
  },
};
</script>

<style scoped>
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  border: 1px solid var(--highlight-blue);
}

.image-container img {
  width: 364px;
  height: 398px;
  object-fit: cover;
}

.fade-in {
  animation: fade-in 1s;
}
</style>
