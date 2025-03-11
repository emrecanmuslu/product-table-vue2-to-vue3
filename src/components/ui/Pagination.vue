<template>
  <div class="pagination">
    <button
      @click="previousPage"
      :disabled="currentPage <= 1"
      class="pagination-button"
    >
      Önceki
    </button>
    <span class="page-info">
      Sayfa {{ currentPage }} / {{ totalPages }}
    </span>
    <button
      @click="nextPage"
      :disabled="currentPage >= totalPages"
      class="pagination-button"
    >
      Sonraki
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number as PropType<number>,
      required: true
    },
    totalPages: {
      type: Number as PropType<number>,
      required: true
    }
  },
  methods: {
    previousPage(): void {
      if (this.currentPage > 1) {
        this.$emit('page-changed', this.currentPage - 1);
      }
    },
    nextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-changed', this.currentPage + 1);
      }
    }
  }
});
</script>

<style lang="scss" scoped>

</style>
