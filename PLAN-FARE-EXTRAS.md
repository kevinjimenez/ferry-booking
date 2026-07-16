# Plan: conectar selección de Fare Extras al ticket

## Contexto

Actualmente el paso "Confirma tu viaje" (`FerryTripSummaryView.vue`) ya **muestra** los fare extras disponibles (`useGetFareExtrasQuery`), pero el botón "+ Añadir" no hace nada:

```ts
// FerryTripSummaryView.vue
const handleAddService = () => {
  // TODO: implementar lógica de añadir servicio
};
```

Y el request que se envía al backend (`CreateTicketRequest`) no tiene ningún campo `extras` — por eso, aunque el usuario "agregue" un servicio en la UI, nunca llega al backend.

**Regla de negocio actual:** el fare extra es **uno por compra** (no por pasajero, no distinto entre ida/ida-vuelta). Se compra una sola vez por ticket, sin importar si es viaje solo de ida o ida y vuelta.

El backend ya soporta extras por pasajero (`PassengerExtraDto[]` dentro de cada `Passenger` del `CreateTicketDto`, ver `backend-paradeisos-ferrires/src/passengers/dto/create-passenger.dto.ts`), así que la forma más simple de representar "uno por compra" es: **adjuntar los extras seleccionados solo al pasajero principal** (`isPrimary === true`), no a todos.

---

## 1. Guardar la selección — `src/shared/constants/storage.constants.ts`

Agregar una nueva key de storage:

```ts
export const FERRY_STORAGE_KEYS = {
  ...
  FARE_OUTBOUND: 'ferry:fare:outbound',
  FARE_INBOUND: 'ferry:fare:inbound',
  FARE_EXTRAS: 'ferry:fare:extras', // 👈 nuevo
  ...
} as const;
```

---

## 2. Store — `src/modules/ferry/stores/ferry-selection.store.ts`

Este store ya guarda `outbound`/`inbound`/`outboundFare`/`inboundFare` con `useAppStorage`. Agregar ahí mismo el estado de extras seleccionados (denormalizado con `id` + `price`, para no tener que volver a cruzar contra la query en `useTripPrice`):

```ts
export interface SelectedExtra {
  id: string;
  price: number;
}

// dentro de useFerrySelectionStore(...)
const selectedExtras = useAppStorage<SelectedExtra[]>(
  FERRY_STORAGE_KEYS.FARE_EXTRAS,
  [],
  StorageEnum.SESSION,
  { serializer: StorageSerializers.object },
);

// Regla actual: "uno por compra" — no se puede agregar el mismo extra dos veces,
// y no hay diferenciación entre ida / ida-vuelta.
// 👉 SI ESTO CAMBIA (ej. un valor de extra para ida y otro para ida-vuelta),
//    reemplazar este único array por `outboundExtras` / `inboundExtras` separados,
//    y actualizar toggleExtra para recibir el "leg" (outbound | inbound).
const toggleExtra = (extra: SelectedExtra) => {
  const exists = selectedExtras.value.some(e => e.id === extra.id);
  selectedExtras.value = exists
    ? selectedExtras.value.filter(e => e.id !== extra.id)
    : [...selectedExtras.value, extra];
};
```

Agregar `selectedExtras` y `toggleExtra` al `return {...}` del store, y limpiar `selectedExtras.value = []` dentro de `reset()`.

---

## 3. Vista — `src/modules/ferry/views/FerryTripSummaryView.vue`

Reemplazar el TODO:

```ts
const handleAddService = (service: FareExtra) => {
  // 👉 "uno por compra": mismo extra para todo el ticket, sin importar ida/ida-vuelta.
  //    Si cambia la regla, aquí es donde habría que decidir a qué leg pertenece el extra.
  storeFerrySelection.toggleExtra({ id: service.id, price: service.price });
};
```

(Ajustar el tipo del parámetro — `ComplementaryServicesCard`/`ServiceAddonCard` actualmente tipan el evento `add` como `ServiceAddon` sin `id`; hay que agregarle `id: string` a esa interfaz para que TypeScript no se queje, ver punto 6).

---

## 4. Total mostrado — `src/modules/ferry/composables/useTripPrice.ts`

Sumar el total de extras al `grandTotal`:

```ts
const { selectedExtras } = storeToRefs(useFerrySelectionStore());

const extrasTotal = computed(
  () => selectedExtras.value.reduce((sum, e) => sum + e.price, 0),
);

// 👉 Extras es "uno por compra": se suma una sola vez, no se multiplica
//    por `passengerCount` ni se duplica para ida+vuelta.
//    Si cambia la regla (ej. un extra distinto por leg), sumar aquí
//    `outboundExtrasTotal` + `inboundExtrasTotal` en vez de un único `extrasTotal`.
const grandTotal = computed(() => outboundTotal.value + inboundTotal.value + extrasTotal.value);
```

Exportar `extrasTotal` también si se quiere mostrar desglosado en el resumen de compra.

---

## 5. Payload del ticket

### `src/modules/ferry/types/api/requests/create-ticket-request.types.ts`

Agregar el campo `extras` al `Passenger`:

```ts
export interface PassengerExtraRequest {
  extraId: string;
  quantity: number;
}

export interface Passenger extends Person {
  outboundFareId: string;
  returnFareId?: string | null;
  basePrice: number;
  isPrimary: boolean;
  checkedInOutbound: boolean;
  checkedInReturn: boolean;
  extras?: PassengerExtraRequest[]; // 👈 nuevo
}
```

### `src/modules/ferry/mappers/booking.mapper.ts`

En `toTicketRequest`, recibir la lista de extras seleccionados y adjuntarla **solo al pasajero primario**:

```ts
static toTicketRequest(
  tripType: string,
  outbound: string,
  booking: BookingResponse,
  contact: PersonFormValues,
  passengers: PersonFormValues[],
  basePrice: number,
  outboundFareId: string,
  inbound?: string,
  returnFareId?: string,
  selectedExtras: SelectedExtra[] = [], // 👈 nuevo parámetro
): CreateTicketRequest {
  return {
    ...
    passenger: passengers.map((passenger, index) => ({
      ...passenger,
      documentType: (passenger.documentType!.value as string).toLowerCase(),
      outboundFareId,
      returnFareId,
      basePrice,
      isPrimary: index === 0,
      checkedInOutbound: false,
      checkedInReturn: false,
      // 👉 "uno por compra": el extra se adjunta solo al pasajero principal (index 0),
      //    no a todos, para no duplicar el cobro por cada pasajero.
      //    Si la regla cambia a "uno por pasajero", quitar este `index === 0 ? ... : undefined`
      //    y mapear extras individuales por cada pasajero en vez de un array compartido.
      extras: index === 0
        ? selectedExtras.map(e => ({ extraId: e.id, quantity: 1 }))
        : undefined,
    })),
  };
}
```

### `src/modules/ferry/composables/useCreateTicketRequest.ts`

Pasar `selectedExtras` del store al mapper:

```ts
const buildBody = (values: PassengerDetailsFormValues) => {
  const { unitPriceTotal } = useTripPrice();
  const { contact, passengers } = values;
  return BookingMapper.toTicketRequest(
    searchStore.values.ticketType,
    selectionStore.outbound!.id,
    booking.value!,
    contact,
    passengers,
    unitPriceTotal.value,
    selectionStore.outboundFare!.id,
    selectionStore.inbound?.id,
    selectionStore.inboundFare?.id,
    selectionStore.selectedExtras, // 👈 nuevo argumento
  );
};
```

---

## 6. Tipos de `ComplementaryServicesCard` / `ServiceAddonCard`

Para que `handleAddService` reciba el `id` sin pelear con TypeScript:

- `src/modules/ferry/components/ComplementaryServicesCard.vue`: agregar `id: string` a `ServiceAddon`.
- Idealmente, unificar `ServiceAddon` con el tipo `FareExtra` (`src/modules/ferry/types/fare-extra.types.ts`) que ya tiene `id`, en vez de mantener dos interfaces casi idénticas — no es obligatorio para que funcione, pero evita que se desincronicen a futuro.

---

## Resumen — dónde se toca código

| Archivo | Qué cambia |
|---|---|
| `src/shared/constants/storage.constants.ts` | nueva key `FARE_EXTRAS` |
| `src/modules/ferry/stores/ferry-selection.store.ts` | estado `selectedExtras` + `toggleExtra()` + reset |
| `src/modules/ferry/views/FerryTripSummaryView.vue` | implementar `handleAddService` |
| `src/modules/ferry/composables/useTripPrice.ts` | sumar `extrasTotal` al `grandTotal` |
| `src/modules/ferry/types/api/requests/create-ticket-request.types.ts` | agregar `extras?` a `Passenger` |
| `src/modules/ferry/mappers/booking.mapper.ts` | mapear `selectedExtras` → `extras` del pasajero principal |
| `src/modules/ferry/composables/useCreateTicketRequest.ts` | pasar `selectionStore.selectedExtras` al mapper |
| `src/modules/ferry/components/ComplementaryServicesCard.vue` | agregar `id` a `ServiceAddon` |

## Dónde tocar si la regla cambia (ida ≠ ida y vuelta)

Todos los puntos marcados con 👉 arriba. En resumen, si el fare extra pasa a tener **valor/selección distinta por leg**:

1. `ferry-selection.store.ts`: separar `selectedExtras` en `outboundExtras` / `inboundExtras`.
2. `useTripPrice.ts`: sumar cada uno por separado (y multiplicar por `passengerCount` si aplica también ahí).
3. `booking.mapper.ts`: decidir a qué pasajero(s)/leg corresponde cada extra en vez de asumir "solo pasajero principal, un array compartido".
4. `FerryTripSummaryView.vue` / `ComplementaryServicesCard.vue`: la UI necesitaría indicar a qué leg pertenece cada servicio (ej. dos secciones, o un selector ida/vuelta por card).
