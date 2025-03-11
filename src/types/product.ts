export interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  itemsPerPage: number
  sortDirection: SortDirection
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  inStock: boolean
  createdAt: string
}

export type SortDirection = 'asc' | 'desc';
