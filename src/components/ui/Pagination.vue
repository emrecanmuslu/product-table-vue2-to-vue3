<template>
  <div class="pagination">
    <button
      @click="previousPage"
      :disabled="props.currentPage <= 1"
      class="pagination-button"
    >
      Önceki
    </button>
    <span class="page-info">
      Sayfa {{ props.currentPage }} / {{ props.totalPages }}
    </span>
    <button
      @click="nextPage"
      :disabled="props.currentPage >= props.totalPages"
      class="pagination-button"
    >
      Sonraki
    </button>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'page-changed', page: number): void;
}>();

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('page-changed', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-changed', props.currentPage + 1);
  }
};
</script>

<style lang="scss" scoped>

</style>
