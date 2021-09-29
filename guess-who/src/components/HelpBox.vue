<template>
  <div class="helpbox">
    <div
      v-for="(clue, index) in clueList"
      :key="index"
      class="helpbox__information"
    >
      <span>{{ clue.text }}</span>
    </div>
    <div class="helpbox__buttons">
      <Button @click="onGiveClue">Give me a clue</Button>
      <Button @click="onMakeItEasier">Make it easier</Button>
    </div>
  </div>
</template>

<script>
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
    toCapitalLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
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
            text: `Whoever is hiding has ${this.secretCharacter.hair} hair.`,
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
            text: `We've traced the character to ${this.toCapitalLetter(
              this.secretCharacter.homeRegion
            )}.`,
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
            text: `${this.toCapitalLetter(
              this.secretCharacter.mainRole
            )} is what this character is listed as.`,
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
/* .helpbox {
  display: flex;
} */
.helpbox__information {
  display: grid;
  grid-template-columns: 1fr;
  text-align: left;
  color: var(--blue-grey);
  border: 1px solid var(--blue-grey);
  margin: 1px 1px 12px 1px;
  padding: 6px;
}
.helpbox__buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
}
</style>
