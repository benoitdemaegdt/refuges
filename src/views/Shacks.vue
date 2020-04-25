<template>
  <v-container fill-height fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-4">{{ shack.name }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// data
import cabanes from '@/data/cabanes.json';

export default {
  name: 'Shack',
  data: () => ({
    shack: undefined,
  }),
  watch: {
    $route: {
      handler() {
        this.shack = cabanes.find(cabane => cabane.key === this.$route.params.cabane);
      },
      immediate: true,
    }
  },
}
</script>

<style>

</style>