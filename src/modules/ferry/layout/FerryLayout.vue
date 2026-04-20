<template>
  <!--bg-light-gray-->
  <main class="min-h-screen h-screen bg-gray-50 flex flex-col">
    <router-view class="flex-1" />
  </main>
</template>

<script setup lang="ts"></script>

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
