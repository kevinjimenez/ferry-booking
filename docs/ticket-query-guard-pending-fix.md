# Pendiente: guard de ticketId faltante en pago (bug real, no cosmético)

Detectado al revisar por qué `oxlint` marca `ticketStore`/`goToSearch` como
variables sin usar en dos composables — en ambos casos el motivo es un
`watchEffect` de redirección que quedó **comentado**, no un simple lint nitpick.

---

## `useTicketQuery.ts` — sí es un bug real

`src/modules/ferry/composables/useTicketQuery.ts`

```ts
const { goToSearch } = useFerryNavigation();
loggerServices.log('useTicketQuery', ticketId);

// watchEffect(async () => {
//   if (!ticketId) {
//     await goToSearch();
//   }
// });

return useGetTicketQuery(ticketId);
```

`useGetTicketQuery` ya trae `enabled: computed(() => !!ticketId.value)` (no
fetchea si no hay id), pero sin el redirect:

- **Si `ticketId` es null** (llega a `/payment` sin pasar por el flujo: recarga
  en mal momento, botón atrás, URL directa): la query queda deshabilitada para
  siempre → `isPending` se queda en `true` para siempre → el usuario ve el
  skeleton de carga infinito, nunca lo mandan de vuelta a buscar.
- **Si `ticketId` existe pero el fetch falla** (backend caído, red, ticket
  borrado): `isPending` pasa a `false` con `data` todavía `undefined`. En
  `src/modules/ferry/views/FerryPaymentView.vue:38-39`:

  ```vue
  :amount="toCents(Number(ticket!.subtotal))"
  :amount-without-tax="toCents(Number(ticket!.total))"
  ```

  El `v-else` (línea 6) renderiza este bloque en cuanto `isPending` es
  `false`, sin chequear error. `ticket!` con non-null assertion sobre
  `undefined` → **crash real** (TypeError: Cannot read properties of
  undefined).

### Fix propuesto

1. Reactivar/implementar bien el `watchEffect` de redirect en
   `useTicketQuery.ts` cuando `!ticketId`.
2. En `FerryPaymentView.vue`, agregar manejo del estado de error de la query
   (`isError` o similar) en vez de depender del `ticket!` sin chequear —
   mostrar un estado de error o redirigir, no dejar que reviente el `v-else`.

---

## `useTicketAction.ts` — el comentario ahí NO aplica, no reactivar tal cual

`src/modules/ferry/composables/useTicketAction.ts`

```ts
const ticketStore = useFerryTicketStore();
const { goToSearch } = useFerryNavigation();

// watchEffect( async () => {
//   if (!ticketStore.ticketId) await goToSearch(); // guard — redirige si no hay id
// });
```

Este composable se usa en `usePassengerDetailsForm.ts`, **antes** de crear el
ticket. Ahí es normal y esperado que `ticketStore.ticketId` todavía no exista
— ese es justo el momento en que se va a crear. Reactivar este guard tal cual
introduciría un bug nuevo: sacaría al usuario del checkout antes de poder
pagar.

### Fix propuesto

Simplemente borrar el bloque comentado (código muerto, no aplica aquí) — no
reactivarlo.

---

## Los otros errores de lint (sin riesgo, no tocar)

- `passenger-details.schema.ts` (×3) y `search-form.schema.ts` (×1) —
  `eslint-plugin-unicorn(no-thenable)` disparado por `then`/`otherwise` en
  `.when()` de yup. Son las claves reales de la API pública de yup, no una
  promesa mal usada. Falso positivo, no requiere cambio.
- `src/modules/ferry/types/payphone/index.ts` — archivo vacío, sin impacto
  funcional.
