<template>
  <v-container fluid class="pt-0">
    <v-row>

      <v-col :cols="isMobile ? 12 : 6">
        <v-skeleton-loader class="mb-6" type="article"></v-skeleton-loader>
        <v-skeleton-loader class="mb-6" type="list-item-three-line"></v-skeleton-loader>
        <v-skeleton-loader class="mb-6" type="list-item-three-line"></v-skeleton-loader>
        <v-skeleton-loader class="mb-6" type="list-item-three-line"></v-skeleton-loader>
        <v-skeleton-loader class="mb-6" type="list-item-three-line"></v-skeleton-loader>
      </v-col>

      <v-col v-if="!isMobile" cols="6" class="test">
        <v-skeleton-loader type="image"></v-skeleton-loader>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
// mixin
import LayoutMixin from '@/mixins/LayoutMixin.js';

export default {
  name: 'TrekDetailsSkeleton',
  mixins: [ LayoutMixin ],
}
</script>

<style scoped>
  /deep/ .v-skeleton-loader__image {
    height: 85vh;
  }
</style>
