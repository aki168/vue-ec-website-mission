<script setup>
</script>

<template>
  <div class="wrapper">
    <aside class="sidebar">
      <slot name="sidebar" />
    </aside>
    <main class="main">
      <slot name="main" />
    </main>
  </div>
  <footer class="footer">
    <slot name="footer" />
  </footer>
</template>

<style scoped>
.wrapper {
  text-align: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.sidebar {
  background-color: #960000;
  color: aliceblue;
  height: 80vh;
}

.main {
  background-color: rgb(171, 74, 228);
  color: aliceblue;
  height: 80vh;
}

.footer {
  background-color: rgb(74, 184, 228);
  color: bisque;
  height: 20vh;
}
</style>