<script setup>
  import baseLayout from '@/components/base-layout.vue';
</script>

<template>
  <baseLayout>
    <template v-slot:sidebar>
      sidebar
    </template>
    <template v-slot:main>
      MAIN
    </template>
    <template v-slot:footer>
      footer
    </template>
  </baseLayout>
</template>