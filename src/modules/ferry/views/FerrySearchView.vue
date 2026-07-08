<template>
  <div class="h-auto flex flex-col">
    <div v-if="showSplash" class="splash-overlay" :class="{ 'splash-out': splashLeaving }">
      <img src="/paradeisos-full.svg" class="splash-logo" alt="Logo" />
    </div>

    <header class="flex flex-col items-center justify-center h-72 sm:h-96 w-full gap-10">
      <BaseDivider label="Galápagos" color="secondary" class="w-40 lg:w-1/11 self-center" size="sm" italic />
      <h1 class="text-3xl sm:text-5xl lg:text-7xl font-extrabold min-h-[1.2em]">
        {{ displayedTitle }}<span class="cursor" :class="{ hidden: done }">|</span>
      </h1>
      <BaseDivider color="secondary" class="w-16 sm:border-[0.15rem] lg:border-[0.2rem]" />
      <h4 class="text-xs sm:text-base lg:text-lg font-secondary-italic font-light w-120 sm:w-140 lg:w-160 text-center">
        Reserva tu ferry entre Santa Cruz, San Cristóbal e Isabela de forma rápida y segura
      </h4>
    </header>
    <section class="flex items-center justify-center">
      <FerrySearchForm />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import FerrySearchForm from '@/modules/ferry/components/forms/FerrySearchForm.vue';
import BaseDivider from '@/shared/components/ui/BaseDivider.vue';

const TITLE = 'Explora las Islas Galápagos';
const SPLASH_DURATION = 1600;

const showSplash = ref(true);
const splashLeaving = ref(false);
const displayedTitle = ref('');
const done = ref(false);

let typeTimer: ReturnType<typeof setInterval>;
let splashTimer: ReturnType<typeof setTimeout>;
let typeStartTimer: ReturnType<typeof setTimeout>;

onMounted(() => {
  splashTimer = setTimeout(() => {
    splashLeaving.value = true;
    setTimeout(() => {
      showSplash.value = false;
    }, 500);

    typeStartTimer = setTimeout(() => {
      let i = 0;
      typeTimer = setInterval(() => {
        displayedTitle.value = TITLE.slice(0, ++i);
        if (i >= TITLE.length) {
          clearInterval(typeTimer);
          done.value = true;
        }
      }, 60);
    }, 500);
  }, SPLASH_DURATION);
});

onUnmounted(() => {
  clearInterval(typeTimer);
  clearTimeout(splashTimer);
  clearTimeout(typeStartTimer);
});
</script>

<style scoped>
.splash-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bgSweep 1.6s ease-in-out forwards;
  transition: opacity 0.5s ease;
}

.splash-out {
  opacity: 0;
}

@keyframes bgSweep {
  0% {
    background-color: #0e1327;
  }

  60% {
    background-color: #6b1224;
  }

  100% {
    background-color: #bc1d36;
  }
}

.splash-logo {
  width: 80px;
  filter: brightness(0) invert(1);
  animation: logoBurst 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes logoBurst {
  0% {
    transform: scale(25);
    opacity: 1;
  }

  60% {
    transform: scale(5);
    opacity: 0.95;
  }

  100% {
    transform: scale(1.5);
    opacity: 0.3;
  }
}

.cursor {
  animation: blink 0.8s step-start infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>
