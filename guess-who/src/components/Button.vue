<template>
  <div class="button"><slot></slot></div>
</template>

<script>
export default {
  name: "Button",
};
</script>

<style scoped>
.button {
  cursor: pointer;
  text-align: center;
  width: 100%;
  background-color: var(--highlight-green);
  color: var(--blue-grey);
  padding: 12px 12px;
  margin: 1px;
}

.button:hover {
  color: white;
  border: 1px solid var(--blue-grey);
  margin: 0px;
  transition: color 400ms ease-in;
}
</style>
