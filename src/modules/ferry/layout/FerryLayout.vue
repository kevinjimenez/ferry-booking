<template>
  <main class="min-h-screen bg-light-gray">
    layout
    <div class="flex flex-col justify-center items-center pb-5 w-full">
      <button class="btn-primary">button primary</button>
      <button class="btn-secondary">button secondary</button>
      <button class="btn-outline">button outline</button>
      <span class="card">card</span>
      <input class="input-field" />
    </div>
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
