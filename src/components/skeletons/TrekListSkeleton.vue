<template>
  <v-container>
    <v-row>
      <v-col v-for="n in 6" :key="n" cols="12" sm="4">
        <v-skeleton-loader max-width="300" type="card"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TrekListSkeleton',
}
</script>
