import type { Ferry } from '@/modules/ferry/types/ferry.types.ts';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import type { SearchFormValues } from '@/modules/ferry/types';

export class BookingSummaryMapper {
  static toFerryLegSummary = (ferry: Ferry, passengerCount: number) => ({
    origin: ferry.origin.port,
    destination: ferry.destination.port,
    ferry: ferry.ferry.name,
    departure: ferry.origin.time,
    arrival: ferry.destination.time,
    passengers: `${passengerCount} adultos`,
    price: formatCurrency(ferry.price),
  });

  static toSearchSummaryCardProps = (
    values: SearchFormValues,
    averageDuration: string,
    reversed = false,
  ) => {
    const origin = reversed ? values.destination : values.origin;
    const destination = reversed ? values.origin : values.destination;
    return {
      originName: origin?.label ?? '',
      originIsland: (origin?.extra as Record<string, string>)?.name ?? '',
      destinationName: destination?.label ?? '',
      destinationIsland: (destination?.extra as Record<string, string>)?.name ?? '',
      date: values.outboundDate,
      passengers: values.passengerCount,
      duration: averageDuration,
    };
  };
}
