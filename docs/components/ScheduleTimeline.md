# ScheduleTimeline

Muestra el tipo de trayecto, una línea visual de recorrido y la duración del viaje.

```
      ┌─────────────┐
      │   DIRECTO   │   ← badge outline neutral
      └─────────────┘

  ●───────────────────→   ← dot + hr + arrow

       02h 00min          ← text-text-muted
```

---

## Mapa de componentes

```
ScheduleTimeline                 ← ferry/components/  (específico de ferry)
├── BaseBadge                    ← shared/components/base/  (ya existe ✅)
├── TripTypeLabel                ← ferry/components/  (badge "DIRECTO" / "N paradas")
└── BaseRouteBar                 ← shared/components/base/  (candidato genérico ⬇)
```

### ¿Qué es genérico?

| Componente | ¿Dónde va? | Motivo |
|---|---|---|
| `BaseBadge` | `shared/` | Ya existe, se reutiliza tal cual |
| `BaseRouteBar` | `shared/` | Línea `● ─── →` sin lógica de negocio; podría usarse en órdenes, itinerarios, etc. |
| `TripTypeLabel` | `ferry/` | El texto "Directo / N paradas" es vocabulario de ferry |
| `ScheduleTimeline` | `ferry/` | Composición total con lógica de ferry |

---

## 1. `BaseRouteBar` — genérico

Barra horizontal reutilizable: punto de origen, línea(s) y flecha de destino.

```vue
<!-- src/shared/components/base/BaseRouteBar.vue -->
<template>
  <div class="flex items-center w-full gap-x-1">
    <!-- Origen -->
    <span class="size-2.5 rounded-full bg-neutral shrink-0" />

    <!-- Segmentos de línea + paradas opcionales -->
    <template v-for="(_, i) in segmentsCount" :key="i">
      <div class="flex-1 h-px bg-base-300" />
      <span
        v-if="i < stops"
        class="size-1.5 rounded-full bg-base-300 shrink-0"
      />
    </template>

    <!-- Destino -->
    <ArrowRightIcon class="size-4 text-text-muted shrink-0" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ArrowRightIcon from '@/shared/icons/ArrowRightIcon.vue';

const props = withDefaults(
  defineProps<{
    stops?: number; // paradas intermedias
  }>(),
  { stops: 0 },
);

// Una línea por cada segmento (paradas + 1)
const segmentsCount = computed(() => props.stops + 1);
</script>
```

**Clases DaisyUI/Tailwind usadas:**

| Clase | Origen | Rol |
|---|---|---|
| `bg-neutral` | DaisyUI token → `#0E1327` | Punto de origen sólido |
| `bg-base-300` | DaisyUI token → `#E2E8F0` | Línea y puntos de parada |
| `text-text-muted` | Custom token → `#94A3B8` | Color de la flecha |

---

## 2. `TripTypeLabel` — ferry

Badge que muestra "Directo" o "N paradas" usando `BaseBadge`.

```vue
<!-- src/modules/ferry/components/TripTypeLabel.vue -->
<template>
  <BaseBadge
    :label="label"
    class="badge-outline badge-sm uppercase tracking-widest font-semibold text-2xs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseBadge from '@/shared/components/base/BaseBadge.vue';

const props = withDefaults(
  defineProps<{
    type?: 'direct' | 'with-stops';
    stops?: number;
  }>(),
  { type: 'direct', stops: 0 },
);

const label = computed(() =>
  props.type === 'direct'
    ? 'Directo'
    : `${props.stops} parada${props.stops !== 1 ? 's' : ''}`,
);
</script>
```

**Clases DaisyUI usadas:**

| Clase | Rol |
|---|---|
| `badge-outline` | Borde visible, fondo transparente (estilo del diseño) |
| `badge-sm` | Tamaño reducido |
| `text-2xs` | Custom token `12px` — misma escala que `PortLabel` |
| `uppercase` + `tracking-widest` | Tipografía en versales del diseño |

---

## 3. `ScheduleTimeline` — ferry (composición final)

```vue
<!-- src/modules/ferry/components/ScheduleTimeline.vue -->
<template>
  <div class="flex flex-col items-center gap-y-2 w-full">
    <TripTypeLabel :type="type" :stops="stops" />
    <BaseRouteBar :stops="stops" />
    <span class="text-sm text-text-muted">{{ duration }}</span>
  </div>
</template>

<script setup lang="ts">
import TripTypeLabel from '@/modules/ferry/components/TripTypeLabel.vue';
import BaseRouteBar from '@/shared/components/base/BaseRouteBar.vue';

withDefaults(
  defineProps<{
    duration: string;
    type?: 'direct' | 'with-stops';
    stops?: number;
  }>(),
  { type: 'direct', stops: 0 },
);
</script>
```

---

## Uso

```vue
<!-- Trayecto directo — imagen del diseño -->
<ScheduleTimeline duration="02h 00min" />

<!-- Con paradas -->
<ScheduleTimeline duration="03h 30min" type="with-stops" :stops="2" />
```

---

## Tokens del proyecto usados

| Token | Valor | Uso en este componente |
|---|---|---|
| `--color-neutral` | `#0E1327` | Punto de origen (`bg-neutral`) |
| `--color-base-300` | `#E2E8F0` | Línea y puntos de parada |
| `--color-text-muted` | `#94A3B8` | Duración y flecha |
| `--text-2xs` | `12px` | Badge "DIRECTO" |
| `--text-sm` | `14px` | Texto de duración |
