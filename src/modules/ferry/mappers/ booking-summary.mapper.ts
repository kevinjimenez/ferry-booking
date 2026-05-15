import type { Ferry } from '@/modules/ferry/types/ferry.types.ts';
import type { FareResponse } from '@/modules/ferry/types/api/responses/fare-response.types.ts';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import type { SearchFormValues } from '@/modules/ferry/types';

export class BookingSummaryMapper {
  static toFerryLegSummary = (ferry: Ferry, passengerCount: number, fare?: FareResponse | null) => ({
    origin: ferry.origin.port,
    destination: ferry.destination.port,
    ferry: ferry.ferry.name,
    departure: ferry.origin.time,
    arrival: ferry.destination.time,
    passengers: `${passengerCount} adultos`,
    fare: fare?.name,
    farePrice: fare ? formatCurrency(parseFloat(fare.price)) : undefined,
    basePrice: formatCurrency(ferry.price),
    price: formatCurrency(ferry.price + parseFloat(fare?.price ?? '0')),
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
