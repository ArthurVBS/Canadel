interface Product {
  id?: number;
  name: string;
  description: string;
  createdAt?: string;
  price: number;
}

export function createEmptyProduct(): Product {
  return {
    name: '',
    description: '',
    price: 0,
  };
}

export type { Product };
