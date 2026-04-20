<template>
  <BaseCard :icon="UserIcon" title="Información de Contacto">
    <FerryPersonForm :name-prefix="namePrefix" />
  </BaseCard>
</template>
<script setup lang="ts">
import BaseCard from '@/shared/components/base/BaseCard.vue';
import FerryPersonForm from '@/modules/ferry/components/forms/FerryPersonForm.vue';
import UserIcon from '@/shared/icons/UserIcon.vue';

defineProps<{ namePrefix: string }>();
</script>
