<template>
  <div class="challenge-bar">
    <div class="challenge-bar__grid challenge-bar__text">
      <span class="text" :style="getOpacity('bronze')">Bronze</span>
      <span class="text" :style="getOpacity('diamond')">Diamond</span>
      <span class="text" :style="getOpacity('challenger')">Challenger</span>
    </div>
    <div class="challenge-bar__background">
      <div class="challenge-bar__grid">
        <img
          :style="getOpacity('bronze')"
          src="../assets/ranks/rank_bronze.png"
          alt="Bronze rank"
        />
        <img
          :style="getOpacity('diamond')"
          src="../assets/ranks/rank_diamond.png"
          alt="Diamond rank"
        />
        <img
          :style="getOpacity('challenger')"
          src="../assets/ranks/rank_challenger.png"
          alt="Challenger rank"
        />
      </div>
      <div
        class="challenge-bar__progress"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChallengeBar",
  props: {
    rank: { type: String, required: true },
  },
  computed: {
    progress() {
      if (this.rank === "challenger") {
        return 100;
      }
      if (this.rank === "diamond") {
        return 60;
      }

      return 25;
    },
  },
  methods: {
    getOpacity(rank) {
      if (rank === "challenger" && this.progress < 100) {
        return {
          opacity: "50%",
        };
      }
      if (rank === "diamond" && this.progress < 60) {
        return {
          opacity: "50%",
        };
      }
    },
  },
};
</script>

<style scoped>
.challenge-bar {
  margin-bottom: 6px;
}

.challenge-bar__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
}

.challenge-bar__grid img {
  width: 20px;
  z-index: 100;
  transition: opacity 500ms ease-in;
}

.challenge-bar__text {
  text-align: center;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 600;
  color: var(--blue-grey);
  margin-bottom: 2px;
}

.challenge-bar__text span {
  transition: opacity 500ms ease-in;
}

.challenge-bar__background {
  height: 24px;
  border-radius: 25px;
  background-color: var(--dark-grey);
}

.challenge-bar__progress {
  position: relative;
  background-color: var(--highlight-green);
  height: 24px;
  border-radius: 25px;
  top: -23px;
  z-index: 0;
  transition: width 500ms ease-in;
}
</style>
