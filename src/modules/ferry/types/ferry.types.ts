export interface Ferry {
  id: string;
  origin: {
    time: string;
    // port: string;
    island: string;
    description: string;
    code: string;
  };
  destination: {
    time: string;
    // port: string;
    island: string;
    description: string;
    code: string;
  };
  duration: string;
  durationMinutes: number;
  price: number;
  currency: string;
  seats: number;
  ferry: {
    name: string;
    type: string;
    amenities: string[];
  };
}
