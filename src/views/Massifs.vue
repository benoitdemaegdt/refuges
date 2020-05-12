<template>
  <v-container fluid class="pt-0">
      <template v-if="!massif.name">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="display-2">Nous n'avons pas encore ajouté ce massif 😢</h1>
          </v-col>
        </v-row>
      </template>

      <template v-else-if="shacks.length === 0 && !isLoading">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="display-2">Les cabanes de ce massif seront bientôt disponibles 😁</h1>
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <v-row>
          <v-col cols="12" md="7" class="shack-list">
            <template v-if="isLoading">
              <v-skeleton-loader class="mb-6" type="list-item-two-line"></v-skeleton-loader>
              <v-skeleton-loader class="mb-6" type="image"></v-skeleton-loader>
              <v-skeleton-loader class="mb-6" type="image"></v-skeleton-loader>
              <v-skeleton-loader type="image"></v-skeleton-loader>
            </template>
            <template v-else>
              <div class="pt-10 pl-24">
                <p class="massif-subtitle mb-0">{{ shacks.length }} refuges, cabanes ou abris dans ce massif</p>
                <h1 class="massif-title">Cabanes {{ massif.connector }} {{ massif.name }}</h1>
                <v-select
                  class="mt-4"
                  style="width: 50%"
                  v-model="filterType"
                  :items="getTypes"
                  multiple
                  chips
                  deletable-chips
                  outlined
                  single-line
                  label="Type de refuge"
                  rounded
                ></v-select>
              </div>
              <div
                v-for="(cabane, index) in getPageCabanes"
                :key="cabane.key"
                @mouseenter="onMouseEnter(cabane, index)"
                @mouseleave="onMouseLeave"
              >
                <v-divider></v-divider>
                <ShackListItem :massif="massif" :shack="cabane"></ShackListItem>
              </div>
              <div v-if="shacks.length > cabanesPerPage" class="text-center mt-4">
                <v-pagination v-model="page" circle color="#78909C" :length="getPages"></v-pagination>
              </div>
            </template>
          </v-col>
          <v-col cols="5" class="map-col pa-0 hidden-sm-and-down">
            <div class="map-container">
              <Mapbox
                v-if="useMapboxGlMap"
                :massif="massif"
                :shacks="getPageCabanes"
                :mouseOveredShackIndex="mouseOveredCabaneIndex"
              ></Mapbox>
              <Map 
                v-else
                :massif="massif"
                :cabanes="getPageCabanes"
                :mouseOveredCabaneKey="mouseOveredCabaneKey"
              ></Map>
            </div>
          </v-col>
        </v-row>
      </template>

  </v-container>
</template>

<script>
// data
import massifs from '@/data/massifs.json';

// services
import { getShacksByMassif } from '@/services/MassifService';

// components
import ShackListItem from '@/components/ShackListItem';
import Map from '@/components/Map';
import Mapbox from '@/components/Mapbox';

export default {
  name: 'Massifs',
  components: {
    ShackListItem,
    Map,
    Mapbox,
  },
  data: () => ({
    useMapboxGlMap: process.env.VUE_APP_MAPBOX_GL_TOKEN,
    isLoading: true,
    massif: undefined,
    filterType: [],
    allShacks: [],
    mouseOveredCabaneKey: undefined,
    mouseOveredCabaneIndex: undefined,
    cabanesPerPage: 20,
    page: 1,
  }),
  watch: {
    $route: {
      async handler() {
        this.isLoading = true;
        this.page = 1;
        this.filterType = [];
        this.massif = massifs.find(massif => massif.key === this.$route.params.name);
        this.allShacks = await getShacksByMassif(this.massif);
        this.isLoading = false;
      },
      immediate: true,
    }
  },
  computed: {
    getTypes() {
      const types = this.allShacks.map(shack => shack.type);
      return [...new Set(types)];
    },
    shacks() {
      return this.allShacks
      .filter(shack => {
        return this.filterType.length === 0 ? true : this.filterType.includes(shack.type);
      });
    },
    getPageCabanes() {
      const startIdx = (this.page - 1) * this.cabanesPerPage;
      const endIdx = startIdx + this.cabanesPerPage;
      return this.shacks.slice(startIdx, endIdx);
    },
    getPages() {
      const modulo = this.shacks.length % this.cabanesPerPage;
      return Math.floor(this.shacks.length / this.cabanesPerPage) + (modulo && 1);
    }
  },
  methods: {
    onMouseEnter(cabane, index) {
      this.mouseOveredCabaneKey = cabane.key;
      this.mouseOveredCabaneIndex = index;
    },
    onMouseLeave() {
      this.mouseOveredCabaneKey = undefined;
      this.mouseOveredCabaneIndex = undefined;
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
