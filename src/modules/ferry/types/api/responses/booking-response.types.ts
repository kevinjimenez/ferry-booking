export interface BookingResponse {
  id: string;
  outbound_seat_hold_id: string;
  return_seat_hold_id: string;
  outbound_seat_holds: SeatHolds;
  return_seat_holds?: SeatHolds | null;
}

export interface SeatHolds {
  status: string;
  schedules: Schedules;
}

export interface Schedules {
  arrival_time: string;
  departure_time: string;
  ferries: Ferries;
  routes: Routes;
}

export interface Ferries {
  name: string;
  register_code: string;
  type: string;
  amenities: string[];
}

export interface Routes {
  base_price_national: string;
}
