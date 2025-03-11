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
  title: string
  price: number
  category: string
  rating: string
  stock: boolean
}

export type SortDirection = 'asc' | 'desc';
