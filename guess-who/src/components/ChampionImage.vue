<template>
  <canvas
    ref="canvas"
    :class="{ 'fade-in': loading }"
    width="364"
    height="398"
  ></canvas>
</template>

<script>
export default {
  name: "ChampionImage",
  props: {
    rank: { type: String, required: true },
    imgSrc: { type: String, required: true },
  },
  data() {
    return {
      img: new Image(),
      loading: false,
    };
  },
  computed: {
    image() {
      return require(`../assets/characters/${this.imgSrc}`);
    },
    difficulty() {
      if (this.rank === "challenger") {
        return 1;
      }
      if (this.rank === "diamond") {
        return 4;
      }

      return 8;
    },
  },
  mounted() {
    this.load();
    this.setup();
  },
  watch: {
    rank() {
      this.pixelate();
    },
    imgSrc() {
      this.load();
      this.img.src = this.image;
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(this.img, 300, 400);
    },
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 500);
    },
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
.fade-in {
  animation: fade-in 1s;
}
</style>
