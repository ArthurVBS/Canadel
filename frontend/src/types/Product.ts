interface Product {
  id?: string
  name: string,
  description: string,
  createdAt: string
  price: number
}

export function createEmptyProduct(): Product {
  return {
    name: '',
    description: '',
    createdAt: '',
    price: 0
  };
}

export type { Product }
