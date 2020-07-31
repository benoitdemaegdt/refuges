<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-col cols="6">
        <v-skeleton-loader class="mb-6" type="article"></v-skeleton-loader>
        <v-skeleton-loader class="mb-6" type="list-item-three-line"></v-skeleton-loader>
        <v-skeleton-loader class="mb-6" type="list-item-three-line"></v-skeleton-loader>
        <v-skeleton-loader class="mb-6" type="list-item-three-line"></v-skeleton-loader>
        <v-skeleton-loader class="mb-6" type="list-item-three-line"></v-skeleton-loader>
      </v-col>
        <v-col cols="6" class="test">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TrekDetailsSkeleton'
}
</script>

<style scoped>
  /deep/ .v-skeleton-loader__image {
    height: 85vh;
  }
</style>
