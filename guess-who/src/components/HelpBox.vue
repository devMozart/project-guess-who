<template>
  <div class="helpbox">
    <div class="helpbox__buttons">
      <div class="helpbox__buttons__row">
        <Button tabindex="3" @click="onGiveClue">Give me a clue</Button>
        <Button tabindex="4" @click="onMakeItEasier">Make it easier</Button>
      </div>
      <Button tabindex="5" @click="$emit('onNewChampion')">
        Try another champion
      </Button>
    </div>
    <h1 v-if="clueList.length > 0" class="fade-and-slide">
      Your list of clues
    </h1>
    <div
      v-for="(clue, index) in clueList"
      :key="index"
      class="helpbox__information"
    >
      <span>{{ clue.text }}</span>
    </div>
  </div>
</template>

<script>
import { getHairClue, getRoleClue, getHomelandClue } from "../data/textGenerator";
import Button from "./Button.vue";

export default {
  name: "HelpBox",
  components: { Button },
  props: {
    secretCharacter: { type: Object, required: true },
    correct: { type: Boolean, required: true },
  },
  data() {
    return {
      clueList: [],
    };
  },
  watch: {
    secretCharacter() {
      this.clueList = [];
    },
  },
  methods: {
    onMakeItEasier() {
      this.$emit("onMakeItEasier");
    },
    onGiveClue() {
      if (this.correct) {
        return;
      }
      if (this.clueList.filter((e) => e.category === "endofclue").length > 0) {
        return;
      }

      let clue;

      if (
        (this.clueList.filter((e) => e.category === "hair").length > 0 ||
          this.secretCharacter.hair === "none") &&
        (this.clueList.filter((e) => e.category === "homeregion").length > 0 ||
          this.secretCharacter.homeRegion === "none") &&
        (this.clueList.filter((e) => e.category === "mainrole").length > 0 ||
          this.secretCharacter.mainRole === "none")
      ) {
        clue = {
          text: "Sorry, there's no more clues to give!",
          category: "endofclue",
        };
        this.clueList.push(clue);
        return;
      }

      const randomCategory = Math.floor(Math.random() * 3);

      switch (randomCategory) {
        case 0:
          if (
            this.clueList.filter((e) => e.category === "hair").length > 0 ||
            this.secretCharacter.hair === "none"
          ) {
            this.onGiveClue();
            return;
          }
          clue = {
            text: getHairClue(this.secretCharacter.hair),
            category: "hair",
          };
          break;
        case 1:
          if (
            this.clueList.filter((e) => e.category === "homeregion").length >
              0 ||
            this.secretCharacter.homeRegion === "none"
          ) {
            this.onGiveClue();
            return;
          }
          clue = {
            text: getHomelandClue(this.secretCharacter.homeRegion),
            category: "homeregion",
          };
          break;
        case 2:
          if (
            this.clueList.filter((e) => e.category === "mainrole").length > 0 ||
            this.secretCharacter.mainRole === "none"
          ) {
            this.onGiveClue();
            return;
          }
          clue = {
            text: getRoleClue(this.secretCharacter.mainRole),
            category: "mainrole",
          };
          break;
        default:
          break;
      }

      this.clueList.push(clue);
    },
  },
};
</script>

<style scoped>
.helpbox {
  transition: all 2s ease-out;
}
.helpbox__information {
  display: grid;
  grid-template-columns: 1fr;
  text-align: left;
  color: var(--blue-grey);
  border: 1px solid var(--blue-grey);
  margin: 12px 1px 12px 1px;
  padding: 6px;

  animation: fade-in 1s, slide-down 1s;
  -webkit-animation: fade-in 1s, slide-down 1s;
  -moz-animation: fade-in 1s, slide-down 1s;
  -o-animation: fade-in 1s, slide-down 1s;
  -ms-animation: fade-in 1s, slide-down 1s;
}
.helpbox__buttons {
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 12px;
}
.helpbox__buttons__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
}

.fade-and-slide {
  animation: fade-in 1s, slide-down 1s;
}
</style>
