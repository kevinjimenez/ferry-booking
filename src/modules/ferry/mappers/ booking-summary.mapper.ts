import type { Ferry } from '@/modules/ferry/types/ferry.types.ts';
import type { FareResponse } from '@/modules/ferry/types/api/responses/fare-response.types.ts';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import type { SearchFormValues } from '@/modules/ferry/types';

export class BookingSummaryMapper {
  static toFerryLegSummary = (
    ferry: Ferry,
    passengerCount: number,
    fare?: FareResponse | null,
  ) => ({
    origin: ferry.origin.code,
    destination: ferry.destination.code,
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
      originDescription: `${(origin?.extra as Record<string, string>)?.description} (${(origin?.extra as Record<string, string>)?.code})`,
      destinationName: destination?.label ?? '',
      destinationDescription: `${(destination?.extra as Record<string, string>)?.description} (${(destination?.extra as Record<string, string>)?.code})`,
      date: values.outboundDate,
      passengers: values.passengerCount,
      duration: averageDuration,
    };
  };
}
