<template>
  <!--bg-light-gray-->
  <main class="min-h-screen h-screen bg-gray-50 flex flex-col">
    <FerryNavbar />
    <router-view class="flex-1" />
  </main>
</template>

<script setup lang="ts">
import FerryNavbar from '@/modules/ferry/layout/FerryNavbar.vue';
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
