<template>
  <v-container class="height-screen d-flex flex-column" fluid>
    <h1 class="text-center animated-title">Gerencie suas áreas</h1>
    <AreasManager />
  </v-container>
</template>
<script setup lang="ts">
import AreasManager from '@/components/AreasManager.vue'
</script>
<style lang="css" scoped>
.animated-title {
  font-size: 2.5rem;
  color: #212121;
  background-image: linear-gradient(to left, #212121 50%, #267bff 50%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: color-wipe 1.5s ease-out forwards;
}

@keyframes color-wipe {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>
