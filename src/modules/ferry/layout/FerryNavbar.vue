<template>
  <header class="bg-white shadow p-4 flex flex-row w-full justify-between items-center">
    <img src="/paradeisos-icon.svg" class="size-2xl" alt="Logo" />
    <div class="flex flex-row gap-10">
      <span
        v-for="lang in ['INICIO', 'RUTAS', 'CONTÁCTANOS']"
        :key="lang"
        class="text-sm font-semibold text-gray-600"
      >
        {{ lang }}
      </span>
    </div>
    <BaseButtonGroup
      v-model="selectedLang"
      :options="[
        { value: 'ES', label: 'ES' },
      ]"
    />
  </header>
</template>

<script setup lang="ts">
import BaseButtonGroup from '@/shared/components/base/BaseButtonGroup.vue';
import { ref } from 'vue';

const selectedLang = ref('ES');
</script>
