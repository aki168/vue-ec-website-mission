<script setup>
</script>

<template>
  <div>
    <router-view/>
    <!-- <router-view v-slot="{ Component }">
      <template v-if="Component">
        <suspense>

          <template #default>
            <component :is="Component"></component>
          </template>

          <template #fallback>
            <loading/>
          </template>

        </suspense>
      </template>
    </router-view> -->
  </div>
</template>

<style scoped>

</style>