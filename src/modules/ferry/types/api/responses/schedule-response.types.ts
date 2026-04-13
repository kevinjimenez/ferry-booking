export interface ScheduleResponse {
  id: string;
  route_id: string;
  ferry_id: string;
  departure_date: Date;
  departure_time: Date;
  arrival_time: Date;
  total_capacity: number;
  available_seats: number;
  cancellation_reason?: string;
  notes: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  ferries: FerryResponse;
  routes: RouteResponse;
}

export interface RouteResponse {
  id: string;
  origin_port_id: string;
  destination_port_id: string;
  distance_km: string;
  duration_minutes: number;
  base_price_resident: string;
  base_price_national: string;
  base_price_foreign: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface FerryResponse {
  id: string;
  name: string;
  register_code: string;
  capacity: number;
  operator_name: string;
  operator_phone: string;
  operator_email: string;
  year_built: number;
  amenities: string[];
  type: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
