# Booking Data Flow

Cómo se comparte y persiste la data del booking entre las vistas de pasajeros, pago y resumen de viaje.

---

## Problema

Al crear un booking se obtiene un `bookingId`. Las vistas posteriores (passengers, payment, trip summary) necesitan la data del booking. Si el usuario hace refresh, la data en memoria se pierde pero el `bookingId` debe sobrevivir para poder re-fetchear.

---

## Arquitectura

```
Crear booking
     │
     ▼
useBookingStore  ──── bookingId ────▶ sessionStorage  (persiste al refresh)
                                            │
                                            ▼
                                  useGetBookingQuery(bookingId)
                                            │
                                            ▼
                                    vue-query cache  (en memoria, compartido)
                                     /      |       \
                                    /       |        \
                          Passengers   Payment   TripSummary
```

**Regla:** Pinia + sessionStorage guarda solo el `bookingId`. vue-query fetcha y cachea la data usando ese id.

---

## Implementación

### 1. Query key — `ferry.query-keys.ts`

```ts
export const ferryKeys = {
  all: ['ferries'] as const,
  ports: () => [...ferryKeys.all, 'ports'] as const,
  schedules: (params: { origin: string; destination: string; date: string }) =>
    [...ferryKeys.all, 'schedules', params] as const,
  booking: (id: string) => [...ferryKeys.all, 'booking', id] as const, // ← nuevo
}
```

---

### 2. Query function — `get-booking.query.ts`

```ts
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import type { Ref } from 'vue'
import { ferryKeys } from '@/modules/ferry/queries/keys/ferry.query-keys'
import { apiServices } from '@/shared/services'
import type { BookingResponse } from '@/modules/ferry/types/api/responses/booking-response.types'

const getBookingQuery = async (id: string): Promise<BookingResponse> => {
  const response = await apiServices.get(`/bookings/${id}`)

  if (!response.data) throw new Error(`Failed to fetch booking ${id}`)

  return response.data.data
}

export const useGetBookingQuery = (bookingId: Ref<string | null>) => {
  return useQuery({
    queryKey: computed(() => ferryKeys.booking(bookingId.value!)),
    queryFn: () => getBookingQuery(bookingId.value!),
    enabled: computed(() => !!bookingId.value), // no fetcha si no hay id
  })
}
```

**`enabled`** evita que la query corra si el `bookingId` aún es `null`.

---

### 3. Composable de acceso — `useBookingData.ts`

Encapsula el boilerplate para no repetirlo en cada vista.

```ts
// src/modules/ferry/composables/useBookingData.ts
import { useBookingStore } from '@/modules/ferry/stores/ferry-booking.store'
import { useGetBookingQuery } from '@/modules/ferry/queries/get-booking.query'

export const useBookingData = () => {
  const bookingStore = useBookingStore()
  return useGetBookingQuery(bookingStore.bookingId)
}
```

---

### 4. Uso en vistas

Cada vista llama `useBookingData()` — vue-query devuelve la cache si ya existe, o fetcha una vez si no.

```ts
// FerryPassengerDetailsView.vue
const { data: booking, isLoading } = useBookingData()

// FerryPaymentView.vue — misma cache, 0 requests adicionales
const { data: booking, isLoading } = useBookingData()

// FerryTripSummaryView.vue — igual
const { data: booking, isLoading } = useBookingData()
```

---

## Comportamiento por escenario

| Escenario | Resultado |
|---|---|
| Navegar de Passengers → Payment | vue-query usa cache, **0 requests** |
| Navegar de Payment → TripSummary | vue-query usa cache, **0 requests** |
| Usuario hace **refresh** en Payment | Lee `bookingId` de sessionStorage, **1 request**, comparte cache de nuevo |
| Usuario cierra el tab | sessionStorage se limpia, booking se pierde — correcto |
| `bookingId` es `null` | Query no corre (`enabled: false`) |

---

## Cuándo se pierde la cache y qué hacer

### Casos en que vue-query pierde la cache

| Escenario | Por qué |
|---|---|
| **Refresh de página** | La memoria se limpia completamente |
| **Cerrar y reabrir tab** | Igual, memoria limpia |
| **`staleTime` vencido + componente desmontado** | vue-query libera cache inactiva |

### Refresh / reabrir tab
No hay problema — `bookingId` sigue en sessionStorage, vue-query re-fetcha automáticamente al montar la vista. Es el flujo normal.

Configura un `staleTime` generoso — el booking no cambia frecuentemente:

```ts
export const useGetBookingQuery = (bookingId: Ref<string | null>) => {
  return useQuery({
    queryKey: computed(() => ferryKeys.booking(bookingId.value!)),
    queryFn: () => getBookingQuery(bookingId.value!),
    enabled: computed(() => !!bookingId.value),
    staleTime: 1000 * 60 * 10,  // 10 minutos
  })
}
```

### Caso problemático — `bookingId` se pierde

Si el usuario borra sessionStorage manualmente o el navegador lo limpia, no hay id para re-fetchear. La solución es redirigir al inicio del flujo desde `useBookingData`:

```ts
// useBookingData.ts
export const useBookingData = () => {
  const bookingStore = useBookingStore()
  const { goToSearch } = useFerryNavigation()

  watchEffect(() => {
    if (!bookingStore.bookingId) goToSearch()
  })

  return useGetBookingQuery(bookingStore.bookingId)
}
```

Cualquier vista que use `useBookingData` queda protegida automáticamente — sin repetir la lógica de guardia en cada una.

---

## Por qué no Pinia para la data del booking

| | Pinia | vue-query |
|---|---|---|
| Al refresh | pierde la data | re-fetcha automático con el id |
| Cache entre vistas | manual | automático, compartido |
| Loading / error state | manual | incluido |
| Deduplicación de requests | manual | automático |

Pinia ya hace su trabajo guardando el `bookingId` en sessionStorage. vue-query hace el resto.

---

## Archivos involucrados

```
src/modules/ferry/
├── queries/
│   ├── keys/ferry.query-keys.ts         ← agregar booking key
│   └── get-booking.query.ts             ← nuevo
├── composables/
│   └── useBookingData.ts                ← nuevo
├── stores/
│   └── ferry-booking.store.ts           ← ya existe, guarda bookingId en sessionStorage
└── types/
    └── api/responses/
        └── booking-response.types.ts    ← nuevo (según shape del API)
```
