<template>
  <div
    :class="[
      'w-full sm:w-fit flex flex-col shadow-sm p-7 gap-y-5 border border-t-4 bg-white',
      variant === 'secondary' ? 'border-secondary' : 'border-primary',
    ]"
  >
    <div class="flex flex-col items-start justify-center">
      <span class="uppercase text-secondary text-3xs font-extrabold">Tarifa</span>
      <h3 class="text-h3 font-extrabold">{{ name }}</h3>
      <div class="mt-8">
        <span class="text-ink-500 text-xs font-semibold">USD</span>
        <span class="text-secondary font-extrabold text-[44px]">{{ price }}</span>
        <span class="text-ink-500 text-2xs">/ pasajero · ruta</span>
      </div>
    </div>

    <BaseDivider class="w-full" />

    <div class="flex flex-col">
      <span class="text-xs mb-10">{{ description }}</span>

      <BaseIconLabel
        v-for="(feature, i) in features"
        :key="`${feature.text}-${i}`"
        :prefix-icon="feature.included ? CircleCheckIcon : CircleXIcon"
        :icon-class="`size-7 ${feature.included ? 'text-primary' : 'text-text-muted'}`"
      >
        <p :class="['text-xs leading-none', { 'line-through text-text-muted': !feature.included }]">
          {{ feature.text }}
        </p>
      </BaseIconLabel>
    </div>

    <BaseButton class="w-full" height="h-[3.5rem]" @click="emit('select')">
      <span class="text-sm font-bold uppercase">Elegir</span>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseDivider from '@/shared/components/base/BaseDivider.vue';
import BaseButton from '@/shared/components/base/BaseButton.vue';
import BaseIconLabel from '@/shared/components/base/BaseIconLabel.vue';
import CircleCheckIcon from '@/shared/icons/CircleCheckIcon.vue';
import CircleXIcon from '@/shared/icons/CircleXIcon.vue';

export interface FareFeature {
  text: string;
  included: boolean;
}

defineProps<{
  name: string;
  price: number;
  description: string;
  features: FareFeature[];
  variant?: string;
}>();

const emit = defineEmits<{ select: [] }>();
</script>
