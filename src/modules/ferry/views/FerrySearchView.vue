<template>
  <div class="h-full flex flex-col">
    <header class="flex flex-col items-center justify-center h-96 w-full gap-10">
      <BaseDivider label="Galápagos" color="secondary" class="w-1/11 self-center" size="sm" italic />
      <h1 class="text-7xl font-extrabold">Explora las Islas Galápagos</h1>
      <BaseDivider size="lg" color="secondary" class="w-16" />
      <h4 class="text-lg font-secondary-italic font-light w-160 text-center">
        Reserva tu ferry entre Santa Cruz, San Cristóbal e Isabela de forma rápida y segura
      </h4>
    </header>
    <section class="flex items-center justify-center">
      <FerrySearchForm />
    </section>
  </div>
</template>

<script setup lang="ts">
import CompassIcon from '@/shared/icons/CompassIcon.vue';
import FerryIcon from '@/shared/icons/FerryIcon.vue';
import ShieldCheckIcon from '@/shared/icons/ShieldCheckIcon.vue';
import BaseIconLabel from '@/shared/components/base/BaseIconLabel.vue';
import FerrySearchForm from '@/modules/ferry/components/forms/FerrySearchForm.vue';
import BaseDivider from '@/shared/components/base/BaseDivider.vue';
</script>
