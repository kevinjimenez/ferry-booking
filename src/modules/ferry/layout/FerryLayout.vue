<template>
  <!--bg-light-gray-->
  <main class="min-h-screen bg-gray-50">
    <router-view />
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
