export interface Ferry {
  id: string;
  origin: {
    time: string;
    port: string;
    island: string;
    address: string;
  };
  destination: {
    time: string;
    port: string;
    island: string;
    address: string;
  };
  duration: string;
  durationMinutes: number;
  price: number;
  currency: string;
  seats: number;
  ferry: {
    name: string
    type: string
    amenities: string[]
  };
}
