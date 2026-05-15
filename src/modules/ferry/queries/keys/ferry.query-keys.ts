export const ferryKeys = {
  all: ['ferries'] as const,
  ports: () => [...ferryKeys.all, 'ports'] as const,
  schedules: (params: { origin: string; destination: string; date: string }) =>
    [...ferryKeys.all, 'schedules', params] as const,
  booking: (id: string) => [...ferryKeys.all, 'booking', id] as const,
  fares: () => [...ferryKeys.all, 'fares'] as const,
  fare_extras: () => [...ferryKeys.all, 'fare_extras'] as const,
  ticket: (id: string) => [...ferryKeys.all, 'ticket', id] as const,
} as const;
