<script setup>
</script>

<template>
  <div class="wrapper">
    <aside class="sidebar">
      <slot name="sidebar"/>
    </aside>
    <main class="main">
      <slot name="main"/>
    </main>
    <footer class="footer">
      <slot name="footer"/>
    </footer>
  </div>
</template>

<style scoped>
  .wrapper{
    text-align: center;
  }
  .sidebar{
    background-color: #960000;
    color: aliceblue;
    height: 20vh;
  }

  .main{
    background-color: rgb(171, 74, 228);
    color: aliceblue;
    height: 70vh;
  }
  .footer{
    background-color: rgb(74, 184, 228);
    color: bisque;
    height: 10vh;
  }
</style>