export interface CreateBookingRequest {
  outboundScheduleId: string;
  returnScheduleId?: string;
  totalPassengers: number;
}
