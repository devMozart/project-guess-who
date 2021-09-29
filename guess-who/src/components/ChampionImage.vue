<template>
  <div class="image-container">
    <img v-show="correct" :src="image" />
    <canvas v-show="!correct" ref="canvas" width="360" height="400"></canvas>
  </div>
</template>

<script>
export default {
  name: "ChampionImage",
  props: {
    rank: { type: String, required: true },
    imgSrc: { type: String, required: true },
    correct: { type: Boolean, required: true },
  },
  data() {
    return {
      img: new Image(),
    };
  },
  computed: {
    image() {
      return require(`../assets/characters/${this.imgSrc}`);
    },
    difficulty() {
      if (this.rank === "challenger") {
        return 2;
      }
      if (this.rank === "diamond") {
        return 6;
      }

      return 10;
    },
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.setup();
      }
    };
  },
  watch: {
    rank() {
      this.pixelate();
    },
    imgSrc() {
      this.img.src = this.image;
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(this.img, 300, 400);
    },
  },
  methods: {
    setup() {
      let ctx = this.$refs.canvas.getContext("2d");

      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      this.img.src = this.image;
      this.img.onload = this.pixelate;
    },
    pixelate() {
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      let size = this.difficulty * 0.01,
        w = canvas.width * size,
        h = canvas.height * size;

      ctx.drawImage(this.img, 0, 0, w, h);
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
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
}
.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid var(--highlight-blue);
}
</style>
