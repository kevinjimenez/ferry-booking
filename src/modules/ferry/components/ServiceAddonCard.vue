<template>
  <div
    :class="['flex flex-col border rounded-sm p-4 gap-y-3', isSelected ? 'border-secondary' : 'bg-white border-gray-200']">
    <!-- Icon + Title + Price -->
    <div class="flex items-start justify-between gap-x-3">
      <div class="flex items-start gap-x-3">
        <div class="flex items-center justify-center bg-gray-100 rounded-lg p-2 shrink-0">
          <template v-if="isSelected">
            <CircleCheckIcon class="size-5 font-bold text-secondary " />
          </template>
          <component v-else :is="icon" class="size-5 text-gray-600" />
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-bold text-gray-900">{{ title }}</span>
          <span class="text-xs text-gray-400 mt-0.5">{{ subtitle }}</span>
        </div>
      </div>
      <div class="flex flex-col items-end shrink-0">
        <span class="text-xs font-semibold text-gray-400 uppercase">USD</span>
        <span class="text-2xl font-extrabold text-secondary leading-none">{{ price }}</span>
      </div>
    </div>

    <!-- Bullet list -->
    <ul class="flex flex-col gap-y-1">
      <li v-for="item in items" :key="item" class="flex items-start gap-x-1.5 text-xs text-gray-600">
        <span class="mt-1 shrink-0">•</span>
        <span>{{ item }}</span>
      </li>
    </ul>

    <!-- Action -->
    <template v-if="isSelected">
      <BaseButton color="secondary" size="sm" @click="$emit('add')">Eliminar</BaseButton>
    </template>

    <BaseButton v-else variant="outline" size="sm" @click="$emit('add')">+ Añadir</BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import CircleCheckIcon from '@/shared/icons/CircleCheckIcon.vue';
import { computed, type Component } from 'vue';
import { useFerrySelectionStore } from '../stores/ferry-selection.store';

const props = defineProps<{
  id: string
  icon: Component;
  title: string;
  subtitle: string;
  price: number;
  items: string[];
}>();

const storeFerrySelection = useFerrySelectionStore();

const isSelected = computed(() =>
  storeFerrySelection.selectedExtras.some(extra => extra.id === props.id),
);

defineEmits<{ add: [] }>();
</script>
