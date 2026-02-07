export interface Price {
  size: string;
  price: number;
  label?: string; // For special cases like "100ml premium"
}

export interface Category {
  id: string;
  name: string;
  items: string[];
  prices: Price[];
}
