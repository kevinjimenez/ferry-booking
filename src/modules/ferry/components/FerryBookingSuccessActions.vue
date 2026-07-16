<template>
  <div class="flex flex-col w-full gap-y-2">
    <BaseButton size="lg" :loading="isPending" :prefix-icon="DownloadIcon" icon-class="size-6"
      @click="emit('downloader')">Descargar Comprobante</BaseButton>
    <BaseButton size="lg" color="secondary" @click="emit('back')">Volver al inicio</BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import DownloadIcon from '@/shared/icons/DownloadIcon.vue';

withDefaults(defineProps<{ isPending?: boolean }>(), {
  isPending: false,
});
const emit = defineEmits<{ back: []; downloader: [] }>();
</script>
