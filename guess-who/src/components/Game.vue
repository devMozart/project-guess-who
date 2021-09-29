<template>
  <div v-if="randomCharacter" class="game-container">
    <ChallengeBar :rank="rank" />
    <ChampionImage
      :rank="rank"
      :imgSrc="randomCharacter.img"
      :correct="correct"
    />
    <div class="heading">{{ heading }}</div>
    <div class="guessbox">
      <input type="text" v-model="champion" list="champions" />
      <datalist id="champions">
        <option v-for="(champion, index) in champions" :key="index">{{
          champion.name
        }}</option>
      </datalist>
      <Button @click="onGuess">Guess!</Button>
    </div>
    <HelpBox
      :secretCharacter="randomCharacter"
      :correct="correct"
      @onMakeItEasier="changeRank"
    />
    <Button style="margin-top: 12px;" @click="newChampion">
      Try another champion
    </Button>
  </div>
</template>

<script>
import { characters } from "../data/characters";

import ChallengeBar from "./ChallengeBar.vue";
import ChampionImage from "./ChampionImage.vue";
import Button from "./Button.vue";
import HelpBox from "./HelpBox.vue";

export default {
  name: "Game",
  components: { ChallengeBar, ChampionImage, Button, HelpBox },
  data() {
    return {
      randomCharacter: undefined,
      img: new Image(),
      rank: "challenger",
      champion: "",
      champions: characters,
      correct: false,
      lastGuess: "",
    };
  },
  computed: {
    name() {
      return this.randomCharacter.name;
    },
    image() {
      return require(`../assets/characters/${this.randomCharacter.img}`);
    },
    heading() {
      if (this.lastGuess === "") {
        return "Who hides among the pixels?";
      }

      if (this.correct) {
        return `You got it! 🥳 The hidden champion is ${this.randomCharacter.name}`;
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
      }

      this.lastGuess = this.champion;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  max-width: 414px;
  height: 100vh;
  background-color: var(--dark);
}
.heading {
  color: var(--blue-grey);
  font-weight: 600;
  text-align: left;
  margin: 12px 0px;
}
.guessbox {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
  margin-bottom: 12px;
}
.guessbox input {
  margin: 1px;
  padding: 0;
  border: 0;
}
</style>
