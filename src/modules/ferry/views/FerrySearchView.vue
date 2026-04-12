<template>
  <div class="h-full flex flex-col">
    <header class="flex flex-col items-center justify-center h-96 w-full bg-primary gap-10">
      <div class="flex flex-col items-center gap-y-5">
        <h1 class="text-white text-4xl">Explora las Islas Galápagos</h1>

        <h4 class="text-gray-400 text-lg font-secondary-italic font-light w-3/4 text-center">
          Reserva tu ferry entre Santa Cruz, San Cristóbal e Isabela de forma rápida y segura
        </h4>
      </div>

      <div class="flex gap-5">
        <BaseIconLabel label="3 Islas Principales" :prefix-icon="CompassIcon" />

        <BaseIconLabel label="3 Islas Principales" :prefix-icon="FerryIcon" />

        <BaseIconLabel label="3 Islas Principales" :prefix-icon="ShieldCheckIcon" />
      </div>
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


</script>
