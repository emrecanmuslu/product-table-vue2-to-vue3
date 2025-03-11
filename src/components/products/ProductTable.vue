<template>
  <div class="product-table-container">
    <div class="sorting-controls">
      <select :value="sortDirection" @change="changeSort($event.target.value)">
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
      @page-changed="changePage"
    />
    <Loading v-if="loading"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapGetters, mapActions} from 'vuex';
import {SortDirection} from '@/types/product';
import Loading from "@/components/ui/Loading.vue";
import Pagination from "@/components/ui/Pagination.vue";

export default defineComponent({
  name: 'ProductTable',
  components: {Pagination, Loading},
  computed: {
    ...mapGetters('products', [
      'products',
      'loading',
      'currentPage',
      'totalPages',
      'sortDirection'
    ]),
    queryPage(): number {
      return parseInt(this.$route.query?.page as string) || 1;
    },
    querySort(): SortDirection {
      return (this.$route.query?.sort as SortDirection) || 'asc';
    }
  },
  watch: {
    currentPage() {
      this.updateRouteQuery();
    },
    sortDirection() {
      this.updateRouteQuery();
    }
  },
  created(): void {
    const page = this.queryPage;
    const sort = this.querySort;

    if (page !== this.currentPage) {
      this.changePage(page);
    }

    if (sort !== this.sortDirection) {
      this.changeSort(sort);
    }

    if (!this.$route.query?.page && !this.$route.query?.sort) {
      this.updateRouteQuery();
    }

    this.fetchProducts()
  },
  methods: {
    ...mapActions('products', [
      'fetchProducts',
      'changePage',
      'changeSort'
    ]),
    updateRouteQuery(): void {
      const currentQuery = this.$route.query;
      const newQuery = {...currentQuery};

      if (newQuery.page !== this.currentPage.toString()) {
        newQuery.page = this.currentPage.toString();
      }

      if (newQuery.sort !== this.sortDirection) {
        newQuery.sort = this.sortDirection;
      }

      if (JSON.stringify(currentQuery) !== JSON.stringify(newQuery)) {
        this.$router.replace({query: newQuery});
      }
    },
  }
});
</script>

<style lang="scss">

</style>
