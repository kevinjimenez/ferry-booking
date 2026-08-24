export interface Ferry {
  id: string;
  origin: {
    time: string;
    island: string;
    description: string;
    code: string;
    pierName: string;
    portAddress: string;
  };
  destination: {
    time: string;
    island: string;
    description: string;
    code: string;
    pierName: string;
    portAddress: string;
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
