<template>
  <footer class="footer">
    <span
      >Made by
      <a
        href="https://github.com/devMozart/"
        target="_blank"
        rel="noopener noreferrer"
        >Amadeus</a
      ></span
    >
    <span
      >All art belongs to
      <a
        href="https://www.leagueoflegends.com/"
        target="_blank"
        rel="noopener noreferrer"
        >Riot Games Inc</a
      ></span
    >
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  color: var(--light-grey);
  text-align: center;
  font-size: 12px;
  margin-top: 24px;
  margin-bottom: 12px;
}

.footer a {
  text-decoration: none;
  color: var(--blue-grey);
}

.footer a:hover {
  color: white;
}
</style>
