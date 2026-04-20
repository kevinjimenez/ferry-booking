# Ticket Creation Flow

Cómo se crea el ticket, se persiste su id y se comparte la data entre vistas.

---

## ⚠️ Reglas críticas antes de implementar

### No crear ticket si ya existe

Si el usuario navega hacia atrás y vuelve a submit, no debe crearse un ticket duplicado.

```ts
const onSubmit = handleSubmit(async values => {
  if (!ticketStore.ticketId) {          // ← solo crea si no existe
    const request = buildRequest(values.contact, values.passengers)
    const result = await createTicket(request)
    ticketStore.setTicket(result.id)
  }

  store.setFormValues(values)
  await goToPayment()
})
```

---

### Reset en cascada al cambiar ferry

Cuando el usuario cambia la selección del ferry, todos los datos derivados quedan inválidos y deben limpiarse:

```
Ferry cambia → booking inválido → ticket inválido → passengers inválido
```

En `handleChange` de `FerryTripSummaryView`:

```ts
const handleChange = () => {
  bookingStore.reset()      // limpia bookingId de sessionStorage
  ticketStore.reset()       // limpia ticketId de sessionStorage
  passengersStore.reset()   // limpia datos de pasajeros de sessionStorage
  // navegar a selección de ferry
}
```

**Importante:** el orden importa — primero reset, luego navegar. Si navegas antes, las vistas intermedias pueden leer ids obsoletos.

---

## Flujo completo

```
FerryPassengerDetailsView
  │
  ├── usePassengerDetailsForm (onSubmit)
  │     ├── buildRequest() → BookingMapper.toTicketRequest(...)
  │     ├── useCreateTicket().mutateAsync(request)
  │     │         │
  │     │         ▼
  │     │   POST /tickets → { id, ... }
  │     │
  │     ├── ticketStore.setTicket(result.id) → sessionStorage
  │     └── goToPayment()
  │
  ▼
FerryPaymentView / FerryTripSummaryView
  └── useTicketData() → useGetTicketQuery(ticketId) → vue-query cache
```

---

## Archivos a crear / modificar

### CREAR `ferry-ticket.store.ts`

```ts
// src/modules/ferry/stores/ferry-ticket.store.ts
import { defineStore } from 'pinia'
import { STORE_KEY } from '@/modules/ferry/constants/ store.constants.ts'
import { useAppStorage } from '@/shared/composables/useAppStorage'
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants'
import { StorageEnum } from '@/shared/enums'

export const useFerryTicketStore = defineStore(STORE_KEY.TICKET, () => {
  const ticketId = useAppStorage<string | null>(
    FERRY_STORAGE_KEYS.TICKET_ID,
    null,
    StorageEnum.SESSION,  // PII — nunca LOCAL
  )

  const setTicket = (id: string) => { ticketId.value = id }
  const reset = () => { ticketId.value = null }

  return { ticketId, setTicket, reset }
})
```

---

### MODIFICAR `store.constants.ts` — agregar TICKET

```ts
export const STORE_KEY = {
  SEARCH:      'ferry-search',
  SELECTION:   'ferry-selection',
  BOOKING:     'ferry-booking',
  PASSENGERS:  'ferry-passengers',
  TICKET:      'ferry-ticket',       // ← nuevo
} as const
```

---

### MODIFICAR `storage.constants.ts` — agregar TICKET_ID

```ts
export const FERRY_STORAGE_KEYS = {
  // ...existentes
  TICKET_ID: 'ferry:ticket:id',      // ← nuevo
} as const
```

---

### CREAR `get-ticket.query.ts`

```ts
// src/modules/ferry/queries/get-ticket.query.ts
import { useQuery, computed } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import { ferryKeys } from '@/modules/ferry/queries/keys/ferry.query-keys'
import { apiServices } from '@/shared/services'
import type { TicketResponse } from '@/modules/ferry/types/api/responses/ticket-response.types'

const getTicketQuery = async (id: string): Promise<TicketResponse> => {
  const response = await apiServices.get(`/tickets/${id}`)
  if (!response.data) throw new Error(`Failed to fetch ticket ${id}`)
  return response.data.data
}

export const useGetTicketQuery = (ticketId: Ref<string | null>) => {
  return useQuery({
    queryKey: computed(() => ferryKeys.ticket(ticketId.value!)),
    queryFn:  () => getTicketQuery(ticketId.value!),
    enabled:  computed(() => !!ticketId.value),
    staleTime: 1000 * 60 * 10,  // 10 minutos
  })
}
```

---

### MODIFICAR `ferry.query-keys.ts` — agregar ticket key

```ts
export const ferryKeys = {
  all:       ['ferries'] as const,
  ports:     () => [...ferryKeys.all, 'ports'] as const,
  schedules: (params) => [...ferryKeys.all, 'schedules', params] as const,
  booking:   (id: string) => [...ferryKeys.all, 'booking', id] as const,
  ticket:    (id: string) => [...ferryKeys.all, 'ticket', id] as const,  // ← nuevo
}
```

---

### CREAR `useTicketData.ts`

Composable de acceso — igual que `useBookingData` para el booking.

```ts
// src/modules/ferry/composables/useTicketData.ts
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store'
import { useGetTicketQuery } from '@/modules/ferry/queries/get-ticket.query'
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation'
import { watchEffect } from 'vue'

export const useTicketData = () => {
  const ticketStore = useFerryTicketStore()
  const { goToSearch } = useFerryNavigation()

  watchEffect(() => {
    if (!ticketStore.ticketId) goToSearch()  // guard — redirige si no hay id
  })

  return useGetTicketQuery(ticketStore.ticketId)
}
```

---

### MODIFICAR `usePassengerDetailsForm.ts` — guardar ticket en onSubmit

```ts
import { useCreateTicket } from '@/modules/ferry/actions/create-ticket.action'
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store'

export const usePassengerDetailsForm = () => {
  const ticketStore = useFerryTicketStore()
  const { mutateAsync: createTicket } = useCreateTicket()
  const { buildRequest } = useCreateTicketRequest()  // ver abajo

  const onSubmit = handleSubmit(async values => {
    const request = buildRequest(values.contact, values.passengers)
    const result = await createTicket(request)

    ticketStore.setTicket(result.id)   // ← persiste en sessionStorage
    store.setFormValues(values)
    await goToPayment()
  })
}
```

---

### CREAR `useCreateTicketRequest.ts` — separar construcción del request

Extrae la lógica de `BookingMapper.toTicketRequest` fuera del form composable.

```ts
// src/modules/ferry/composables/useCreateTicketRequest.ts
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store'
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store'
import { useBookingQuery } from '@/modules/ferry/composables/useBookingQuery'
import { BookingMapper } from '@/modules/ferry/mappers/booking.mapper'
import type { PersonFormValues } from '@/modules/ferry/types/forms/passenger-details-form.types'

export const useCreateTicketRequest = () => {
  const searchStore = useFerrySearchStore()
  const selectionStore = useFerrySelectionStore()
  const { data: booking } = useBookingQuery()

  const buildRequest = (contact: PersonFormValues, passengers: PersonFormValues[]) => {
    return BookingMapper.toTicketRequest(
      searchStore.values.ticketType,
      selectionStore.outbound!.id,
      booking.value!.data,
      contact,
      passengers,
      selectionStore.inbound?.id,
    )
  }

  return { buildRequest }
}
```

---

### Uso en vistas posteriores

```ts
// FerryPaymentView.vue
const { data: ticket, isLoading } = useTicketData()

// Cualquier otra vista que necesite el ticket
const { data: ticket, isLoading } = useTicketData()
```

---

## Comportamiento por escenario

| Escenario | Resultado |
|---|---|
| Navegar de Payment → otra vista | vue-query usa cache, **0 requests** |
| Usuario hace **refresh** | Lee `ticketId` de sessionStorage, **1 request** |
| `ticketId` es `null` | Guard redirige a search automáticamente |
| Usuario cierra el tab | sessionStorage se limpia — correcto |

---

## Resumen de archivos

```
src/modules/ferry/
├── stores/
│   └── ferry-ticket.store.ts              ← CREAR
├── queries/
│   ├── keys/ferry.query-keys.ts           ← MODIFICAR (agregar ticket key)
│   └── get-ticket.query.ts                ← CREAR
├── composables/
│   ├── useTicketData.ts                   ← CREAR
│   └── useCreateTicketRequest.ts          ← CREAR
├── constants/
│   └── store.constants.ts                 ← MODIFICAR (agregar TICKET)
└── types/
    └── api/responses/
        └── ticket-response.types.ts       ← CREAR (según shape del API)

src/shared/constants/
└── storage.constants.ts                   ← MODIFICAR (agregar TICKET_ID)
```
