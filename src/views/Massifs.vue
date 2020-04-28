<template>
  <v-container fluid class="pt-0">
      <template v-if="!getMassifName">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="display-2">Nous n'avons pas encore ajouté ce massif 😢</h1>
          </v-col>
        </v-row>
      </template>

      <template v-else-if="getAllCabanes.length === 0">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="display-2">Les cabanes de ce massif seront bientôt disponibles 😁</h1>
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <v-row>
          <v-col cols="12" md="7" class="shack-list">
            <div class="py-10 pl-24">
              <p class="massif-subtitle mb-0">{{ getSubtitle }}</p>
              <h1 class="massif-title">{{ getTitle }}</h1>
            </div>
            <div
              v-for="(cabane) in getPageCabanes"
              :key="cabane.key"
              @mouseenter="onMouseEnter(cabane)"
              @mouseleave="onMouseLeave"
            >
              <v-divider></v-divider>
              <ShackListItem :massifKey="getMassifKey" :shack="cabane"></ShackListItem>
            </div>
            <div v-if="getAllCabanes.length > cabanesPerPage" class="text-center mt-4">
              <v-pagination v-model="page" circle color="#78909C" :length="getPages"></v-pagination>
            </div>
          </v-col>
          <v-col cols="5" class="map-col pa-0 hidden-sm-and-down">
            <div class="map-container">
              <Map :cabanes="getPageCabanes" :mouseOveredCabaneKey="mouseOveredCabaneKey"></Map>
            </div>
          </v-col>
        </v-row>
      </template>

  </v-container>
</template>

<script>
// data
import massifs from '@/data/massifs.json';
import cabanes from '@/data/cabanes.json';

// components
import ShackListItem from '@/components/ShackListItem'
import Map from '@/components/Map'

export default {
  name: 'Massifs',
  components: {
    ShackListItem,
    Map,
  },
  data: () => ({
    massifName: undefined,
    mouseOveredCabaneKey: undefined,
    cabanesPerPage: 20,
    page: 1,
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
    getMassifKey() {
      const massif = massifs.find(massif => massif.key === this.$route.params.name);
      return massif && massif.key;
    },
    getTitle() {
      const massif = massifs.find(massif => massif.key === this.$route.params.name);
      return `Cabanes ${massif.connector} ${massif.name}`;
    },
    getSubtitle() {
      return `${this.getAllCabanes.length} refuges, cabanes ou abris dans ce massif`;
    },
    getAllCabanes() {
      return cabanes.filter(cabane => cabane.massif === this.getMassifName);
    },
    getPageCabanes() {
      const startIdx = (this.page - 1) * this.cabanesPerPage;
      const endIdx = startIdx + this.cabanesPerPage;
      return this.getAllCabanes.slice(startIdx, endIdx);
    },
    getPages() {
      const modulo = this.getAllCabanes.length % this.cabanesPerPage;
      return Math.floor(this.getAllCabanes.length / this.cabanesPerPage) + (modulo && 1);
    }
  },
  methods: {
    onMouseEnter(cabane) {
      this.mouseOveredCabaneKey = cabane.key;
    },
    onMouseLeave() {
      this.mouseOveredCabaneKey = undefined;
    },
  }
};
</script>

<style scoped>

/** left column : shack list */
.shack-list {
  padding-left: 24px !important;
  padding-right: 24px !important;
}

.massif-title {
  font-size: 32px;
  color: #222222;
}

.massif-subtitle {
  font-size: 16px;
  color: #222222;
}

/** right column : map */
.map-col {
  position: fixed;
  right: 0;
}

.map-container {
  height: calc(100vh - 64px);
}

/deep/ .v-pagination__item, /deep/ .v-pagination__navigation {
  outline: none !important;
}
</style>
