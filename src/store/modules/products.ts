import {ActionContext} from 'vuex'
import {Product, ProductsState, SortDirection} from '@/types/product'
import ProductService from "@/services/product.service";

export default {
  namespaced: true,
  state: {
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    sortDirection: 'asc',
  },
  getters: {
    products: (state: ProductsState) => state.products,
    loading: (state: ProductsState) => state.loading,
    currentPage: (state: ProductsState) => state.currentPage,
    totalPages: (state: ProductsState) => state.totalPages,
    sortDirection: (state: ProductsState) => state.sortDirection,
    error: (state: ProductsState) => state.error,
  },
  mutations: {
    SET_PRODUCTS(state: ProductsState, products: Product[]) {
      state.products = products
    },
    SET_LOADING(state: ProductsState, loading: boolean) {
      state.loading = loading
    },
    SET_CURRENT_PAGE(state: ProductsState, page: number) {
      state.currentPage = page
    },
    SET_TOTAL_PAGES(state: ProductsState, total: number) {
      state.totalPages = total
    },
    SET_SORT_DIRECTION(state: ProductsState, direction: SortDirection) {
      state.sortDirection = direction
    },
    SET_ERROR(state: ProductsState, error: string | null) {
      state.error = error
    }
  },
  actions: {
    async fetchProducts({commit, state}: ActionContext<ProductsState, any>) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        const response = await ProductService.getProducts(
          state.currentPage,
          state.itemsPerPage,
          state.sortDirection
        )

        commit('SET_PRODUCTS', response.data.products)
        const totalPages = Math.ceil(response.data.total / state.itemsPerPage)
        commit('SET_TOTAL_PAGES', totalPages)
      } catch (e: any) {
        commit('SET_ERROR', 'Ürünler yüklenirken bir hata oluştu.')
        commit('SET_PRODUCTS', [])
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async changePage({commit, dispatch}: any, page: number): Promise<void> {
      commit('SET_CURRENT_PAGE', page);

      return dispatch('fetchProducts');
    },
    async changeSort({commit, dispatch}: any, direction: SortDirection): Promise<void> {
      commit('SET_SORT_DIRECTION', direction);

      return dispatch('fetchProducts');
    }
  }
}
