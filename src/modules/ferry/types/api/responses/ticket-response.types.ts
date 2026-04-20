export interface TicketResponse {
  id: string;
  paymentId: string;
  contact: string;
  passengers: string[];
  total: number;
  subtotal: number;
  taxes: number;
  serviceFee: number;
  discount: number;
}

export interface GetTicketResponse {
  id: string;
  status: string;
  ticket_code: string;
  qr_code: string;
  service_fee: string;
  total: string;
  subtotal: string;
  taxes: string;
  serviceFee: string;
  discount: string;
  currency: string;
  passengers: Passenger[];
  outbound_schedules: Schedules;
  return_schedules: Schedules;
}

export interface Schedules {
  departure_date: Date;
  departure_time: Date;
  arrival_time: Date;
  routes: Routes;
  ferries: Ferries;
}

export interface Ferries {
  name: string;
}

export interface Routes {
  origin_ports: NPorts;
  destination_ports: NPorts;
}

export interface NPorts {
  name: string;
  code: string;
  islands: Ferries;
}

export interface Passenger {
  first_name: string;
  last_name: string;
  document_number: string;
}

