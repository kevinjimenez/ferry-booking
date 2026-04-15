<template>
  <div class="flex flex-col w-full gap-y-1.5">
    <small>{{ title }}</small>
    <LabelValue v-for="item in items" :key="item.label" :label="item.label" :value="item.value" />
  </div>
</template>
<script setup lang="ts">
import LabelValue from '@/shared/components/LabelValue.vue';

interface Item {
  label: string;
  value: string;
}

interface Props {
  title: string;
  items?: Item[];
}

withDefaults(defineProps<Props>(), {
  items: () => [],
});
</script>
