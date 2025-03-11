<template>
  <div class="product-table-container">
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
    <div class="sorting-controls">
      <select :value="sortDirection" @change="handleSortChange($event)">
        <option value="asc">Fiyat: Artan</option>
        <option value="desc">Fiyat: Azalan</option>
      </select>
    </div>
    <div class="table-wrapper">
      <table class="product-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Ürün Adı</th>
          <th>Kategori</th>
          <th>Fiyat</th>
          <th>Değerlendirme</th>
          <th>Stok</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}₺</td>
          <td>{{ product.rating }} / 5</td>
          <td>{{ product.stock }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="handlePageChange"
    />
    <Loading v-if="loading"/>
  </div>
</template>

<script setup lang="ts">
import {computed, watch, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {SortDirection} from '@/types/product';
import Loading from "@/components/ui/Loading.vue";
import Pagination from "@/components/ui/Pagination.vue";
import {useProductsStore} from '@/store/modules/products';
import {storeToRefs} from 'pinia';

const productsStore = useProductsStore();
const route = useRoute();
const router = useRouter();

const {
  getProducts: products,
  getLoading: loading,
  getCurrentPage: currentPage,
  getTotalPages: totalPages,
  getSortDirection: sortDirection,
  getError: error
} = storeToRefs(productsStore);

const queryPage = computed(() => {
  return parseInt(route.query?.page as string) || 1;
});

const querySort = computed(() => {
  return (route.query?.sort as SortDirection) || 'asc';
});

const updateRouteQuery = () => {
  const currentQuery = route.query;
  const newQuery = {...currentQuery};

  if (newQuery.page !== currentPage.value.toString()) {
    newQuery.page = currentPage.value.toString();
  }

  if (newQuery.sort !== sortDirection.value) {
    newQuery.sort = sortDirection.value;
  }

  if (JSON.stringify(currentQuery) !== JSON.stringify(newQuery)) {
    router.replace({query: newQuery});
  }
};

const handlePageChange = (page: number) => {
  productsStore.changePage(page);
};

const handleSortChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  productsStore.changeSort(target.value as SortDirection);
};

watch(currentPage, () => {
  updateRouteQuery();
});

watch(sortDirection, () => {
  updateRouteQuery();
});

watch(route, (routeObj) => {
  if (routeObj.name === 'products') {
    updateRouteQuery();
  }
}, {deep: true});

onMounted(() => {
  const page = queryPage.value;
  const sort = querySort.value;

  if (page !== currentPage.value) {
    productsStore.changePage(page);
  }

  if (sort !== sortDirection.value) {
    productsStore.changeSort(sort);
  }

  if (!route.query?.page && !route.query?.sort) {
    updateRouteQuery();
  }

  productsStore.fetchProducts();
});
</script>

<style lang="scss">

</style>
