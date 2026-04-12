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
        <!--TODO: here component re-use  -->
        <div class="flex items-center gap-1.5">
          <CompassIcon class="size-5 cursor-pointer text-gray-400" />
          <p class="text-gray-400 font-secondary-italic">3 Islas Principales</p>
        </div>

        <!--TODO: here component re-use  -->
        <div class="flex items-center gap-1.5">
          <FerryIcon class="size-5 cursor-pointer text-gray-400" />
          <p class="text-gray-400 font-secondary-italic">Salida Diarias</p>
        </div>

        <!--TODO: here component re-use  -->
        <div class="flex items-center gap-1.5">
          <ShieldCheckIcon class="size-5 cursor-pointer text-gray-400" />
          <p class="text-gray-400 font-secondary-italic">Cómodo y Seguro</p>
        </div>
      </div>
    </header>
    <section class="flex items-center justify-center">
      <div class="bg-white w-2/3 flex flex-col items-center justify-center p-10 rounded-md">
        <BaseButtonGroup class="w-full" v-model="ticketType" :options="TICKET_TYPE_OPTIONS" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CompassIcon from '@/shared/icons/CompassIcon.vue'
import FerryIcon from '@/shared/icons/FerryIcon.vue'
import ShieldCheckIcon from '@/shared/icons/ShieldCheckIcon.vue'
import BaseButtonGroup from '@/shared/components/BaseButtonGroup.vue'
import { TICKET_TYPE_OPTIONS } from '@/modules/ferry/constants'
import { useSearchForm } from '@/modules/ferry/composables'

const {
  // properties
  ticketType,
} = useSearchForm()
</script>
