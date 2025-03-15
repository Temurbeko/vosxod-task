export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  description: string;
  isNew: boolean;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortField = "name" | "price";
export type SortOrder = "asc" | "desc";

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  onlyNew: boolean;
}
