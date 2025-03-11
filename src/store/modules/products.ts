import {defineStore} from 'pinia'
import {Product, SortDirection} from '@/types/product'
import ProductService from "@/services/product.service"

export interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  itemsPerPage: number
  sortDirection: SortDirection
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    sortDirection: 'asc',
  }),
  getters: {
    getProducts: (state) => state.products,
    getLoading: (state) => state.loading,
    getCurrentPage: (state) => state.currentPage,
    getTotalPages: (state) => state.totalPages,
    getSortDirection: (state) => state.sortDirection,
    getError: (state) => state.error,
  },
  actions: {
    async fetchProducts() {
      try {
        this.loading = true
        this.error = null

        const response = await ProductService.getProducts(
          this.currentPage,
          this.itemsPerPage,
          this.sortDirection
        )

        this.products = response.data.products
        this.totalPages = Math.ceil(response.data.total / this.itemsPerPage)
      } catch (e: any) {
        this.error = 'Ürünler yüklenirken bir hata oluştu.'
        this.products = []
      } finally {
        this.loading = false
      }
    },
    async changePage(page: number): Promise<void> {
      this.currentPage = page
      return this.fetchProducts()
    },
    async changeSort(direction: SortDirection): Promise<void> {
      this.sortDirection = direction
      return this.fetchProducts()
    }
  }
})
