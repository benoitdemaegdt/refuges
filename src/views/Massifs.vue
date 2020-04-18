<template>
  <v-container fill-height fluid>
  
    <template v-if="!this.getMassifName">
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="display-2">Nous n'avons pas encore ajouté ce massif 😢</h1>
        </v-col>
      </v-row>
    </template>

    <template v-else-if="this.getCabanes.length === 0">
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="display-2">Les cabanes de ce massif seront bientôt disponibles 😁</h1>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="display-2">{{ massifName }}</h1>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col cols="6">
          <h1 class="display-4">⛰️</h1>
        </v-col>
        <v-col cols="6">
          <h1 class="display-4">🗺</h1>
        </v-col>
      </v-row>
    </template>

  </v-container>
</template>

<script>
// data
import massifs from '@/data/massifs.json';
import cabanes from '@/data/cabanes.json';

export default {
  name: 'Massifs',
  data: () => ({
    massifName: undefined,
  }),
  watch: {
    $route: {
      handler() {
        this.massifName = this.getMassifName;
      },
      immediate: true,
    }
  },
  computed: {
    getMassifName() {
      const massif = massifs.find(massif => massif.key === this.$route.params.name);
      return massif && massif.name;
    },
    getCabanes() {
      return cabanes.filter(cabane => cabane.massif === this.getMassifName);
    },
  },
};
</script>
