<template>
  <div v-if="randomCharacter" class="game-container">
    <main class="game-container__content">
      <ChallengeBar :rank="rank" />
      <ImageContainer
        :correct="correct"
        :rank="rank"
        :imgSrc="randomCharacter.img"
      />
      <h1 :class="{ 'shake-animation': guessWasWrong }">
        {{ heading }}
      </h1>
      <div class="guessbox">
        <input
          type="text"
          title="Champion name"
          v-model="champion"
          list="champions"
          placeholder="Enter a champion"
          tabindex="1"
        />
        <datalist id="champions">
          <option v-for="(champion, index) in champions" :key="index">{{
            champion.name
          }}</option>
        </datalist>
        <Button tabindex="2" @click="onGuess">Guess!</Button>
      </div>
      <HelpBox
        :secretCharacter="randomCharacter"
        :correct="correct"
        @onMakeItEasier="changeRank"
        @onNewChampion="newChampion"
      />
    </main>
    <div />
    <Footer />
  </div>
</template>

<script>
import { characters } from "../data/characters";

import ChallengeBar from "./ChallengeBar.vue";
import ImageContainer from "./ImageContainer.vue";
import Button from "./Button.vue";
import HelpBox from "./HelpBox.vue";
import Footer from "./Footer.vue";

export default {
  name: "Game",
  components: { ChallengeBar, ImageContainer, Button, HelpBox, Footer },
  data() {
    return {
      randomCharacter: undefined,
      rank: "challenger",
      champion: "",
      champions: characters,
      correct: false,
      lastGuess: "",
      guessWasWrong: false,
    };
  },
  computed: {
    heading() {
      if (this.lastGuess === "") {
        return "Who hides among the pixels?";
      }

      if (this.correct) {
        return `You got it! The hidden champion is ${this.randomCharacter.name}`;
      } else {
        return `Nope, it's not ${this.lastGuess}!`;
      }
    },
  },
  mounted() {
    this.setup();
  },
  methods: {
    changeRank() {
      if (this.correct) {
        return;
      }

      if (this.rank === "challenger") {
        this.rank = "diamond";
        return;
      }
      if (this.rank === "diamond") {
        this.rank = "bronze";
        return;
      }
    },
    setup() {
      this.correct = false;
      this.rank = "challenger";
      this.lastGuess = "";
      this.champion = "";
      this.randomCharacter =
        characters[Math.floor(Math.random() * characters.length)];
    },
    newChampion() {
      this.setup();
    },
    onGuess() {
      if (this.correct) {
        return;
      }

      if (this.champion === this.randomCharacter.name) {
        this.correct = true;
      } else {
        this.correct = false;
        this.guessWasWrong = true;
        setTimeout(() => (this.guessWasWrong = false), 1000);
      }

      this.lastGuess = this.champion;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 12px 24px;
  max-width: 414px;
  min-height: 100vh;
  height: 100%;
  background-color: var(--dark);
}

.guessbox {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
  margin-bottom: 12px;
}

.guessbox input {
  width: 100%;
  margin: 1px;
  padding: 0 10px;
  border: 0;
  font-family: "Raleway", sans-serif;
  font-size: 14px;
}

.shake-animation {
  animation: shake 5s ease;
}

@media (max-width: 400px) {
  .game-container {
    padding: 6px 6px;
    overflow: auto;
  }
}
</style>
