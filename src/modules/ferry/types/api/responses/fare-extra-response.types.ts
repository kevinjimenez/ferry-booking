export interface FareExtraResponse {
  id: string;
  name: string;
  code: string;
  price: string;
  description: string;
  features: Feature[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Feature {
  text: string;
  included: boolean;
}
