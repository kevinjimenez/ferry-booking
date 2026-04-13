export const ferryKeys = {
  all: ['ferries'] as const,
  ports: () => [...ferryKeys.all, 'ports'] as const,
  schedules: (params: { origin: string; destination: string; date: string }) =>
    [...ferryKeys.all, 'schedules', params] as const,
  // bookingHistory: (holdId: string) => [...ferryKeys.all, 'history', holdId] as const,
} as const;
