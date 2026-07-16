<template>
  <div class="flex flex-col w-full border border-gray-200 rounded-sm shadow-sm bg-white p-5 gap-y-5">
    <SectionCardHeader label="SERVICIOS DE ÚLTIMO MINUTO" title="Servicios complementarios" />

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <ServiceAddonCard v-for="service in services" :key="service.id" :id="service.id" :icon="service.icon"
        :title="service.title" :subtitle="service.subtitle" :price="service.price" :items="service.items"
        @add="$emit('add', service)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ServiceAddonCard from '@/modules/ferry/components/ServiceAddonCard.vue';
import SectionCardHeader from '@/shared/components/SectionCardHeader.vue';
import type { Component } from 'vue';

export interface ServiceAddon {
  id: string;
  icon: Component;
  title: string;
  subtitle: string;
  price: number;
  items: string[];
}



defineProps<{
  services: ServiceAddon[];
}>();

defineEmits<{ add: [service: ServiceAddon] }>();
</script>
